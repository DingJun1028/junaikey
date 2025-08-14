#!/usr/bin/env python3
"""
Straico Cost Management Orchestrator

This is an example implementation of cost governance for Straico AI services.
It demonstrates:
- Dual pricing mode optimization (per-word vs per-message)
- Cost tracking and budget enforcement
- Automatic fallback strategies
- Request queuing and rate limiting

Usage:
    from example_orchestrator import StraicoOrchestrator
    
    orchestrator = StraicoOrchestrator()
    response = await orchestrator.process_request("Your prompt here")

Note: This is example/template code. Adapt it to your specific needs.
"""

import asyncio
import json
import logging
import os
import time
from datetime import datetime, timedelta
from typing import Dict, List, Optional, Union, Any
from dataclasses import dataclass, asdict
from enum import Enum

# Note: Install these dependencies as needed
# pip install aiohttp python-dotenv

try:
    import aiohttp
    from dotenv import load_dotenv
except ImportError as e:
    print(f"Missing dependency: {e}")
    print("Install with: pip install aiohttp python-dotenv")
    exit(1)

# Load environment configuration
load_dotenv()


class PricingMode(Enum):
    PER_WORD = "per_word"
    PER_MESSAGE = "per_message"


@dataclass
class CostEstimate:
    """Cost estimation for a request"""
    estimated_cost: float
    mode: PricingMode
    model: str
    word_count: int
    reasoning: str


@dataclass
class UsageStats:
    """Usage statistics and cost tracking"""
    total_requests: int = 0
    total_cost: float = 0.0
    daily_cost: float = 0.0
    monthly_cost: float = 0.0
    last_reset: datetime = None


@dataclass
class StraicoResponse:
    """Standardized response from Straico API"""
    content: str
    cost: float
    mode: PricingMode
    model: str
    words_processed: int
    coins_used: int
    success: bool
    error: Optional[str] = None
    cached: bool = False


class StraicoOrchestrator:
    """
    Main orchestrator for managing Straico API calls with cost governance
    """
    
    def __init__(self, config_file: Optional[str] = None):
        # Load configuration
        self.api_key = os.getenv('STRAICO_API_KEY', '')
        self.base_url = os.getenv('STRAICO_BASE_URL', 'https://api.straico.com/v1')
        self.default_mode = PricingMode(os.getenv('STRAICO_DEFAULT_MODE', 'per_word'))
        self.default_model = os.getenv('STRAICO_MODEL', 'gpt-4-turbo')
        
        # Budget limits
        self.daily_budget = float(os.getenv('STRAICO_DAILY_BUDGET', '100.0'))
        self.monthly_budget = float(os.getenv('STRAICO_MONTHLY_BUDGET', '2000.0'))
        self.warn_threshold = float(os.getenv('STRAICO_WARN_THRESHOLD', '0.8'))
        self.hard_limit = float(os.getenv('STRAICO_HARD_LIMIT', '1.0'))
        
        # Cost optimization
        self.word_threshold = int(os.getenv('STRAICO_WORD_THRESHOLD', '1000'))
        self.mode_switch_factor = float(os.getenv('STRAICO_MODE_SWITCH_FACTOR', '0.9'))
        
        # Fallback settings
        self.enable_fallbacks = os.getenv('STRAICO_ENABLE_FALLBACKS', 'true').lower() == 'true'
        self.fallback_model = os.getenv('STRAICO_FALLBACK_MODEL', 'gpt-3.5-turbo')
        self.enable_caching = os.getenv('STRAICO_ENABLE_CACHING', 'true').lower() == 'true'
        
        # Internal state
        self.usage_stats = UsageStats(last_reset=datetime.now())
        self.cache = {}  # Simple in-memory cache (use Redis in production)
        self.request_queue = []
        
        # Setup logging
        logging.basicConfig(level=logging.INFO)
        self.logger = logging.getLogger(__name__)
    
    async def process_request(self, 
                            prompt: str,
                            model: Optional[str] = None,
                            max_cost: Optional[float] = None,
                            priority: str = 'normal') -> StraicoResponse:
        """
        Process a single AI request with cost optimization
        
        Args:
            prompt: The input prompt
            model: AI model to use (optional)
            max_cost: Maximum cost for this request (optional)
            priority: Request priority (high, normal, low)
        
        Returns:
            StraicoResponse with the result and cost information
        """
        
        # Check if we have budget available
        if not await self._check_budget_available():
            return StraicoResponse(
                content="", cost=0.0, mode=self.default_mode,
                model=model or self.default_model, words_processed=0,
                coins_used=0, success=False,
                error="Budget exceeded. Request denied."
            )
        
        # Check cache first
        if self.enable_caching:
            cached_response = self._get_cached_response(prompt, model)
            if cached_response:
                self.logger.info("Returning cached response")
                cached_response.cached = True
                return cached_response
        
        # Estimate costs for different modes
        estimate = await self._estimate_optimal_cost(prompt, model)
        
        # Check if estimated cost exceeds limits
        if max_cost and estimate.estimated_cost > max_cost:
            if self.enable_fallbacks:
                self.logger.warning(f"Cost ${estimate.estimated_cost:.2f} exceeds limit ${max_cost:.2f}. Trying fallback.")
                return await self._try_fallback_request(prompt, max_cost)
            else:
                return StraicoResponse(
                    content="", cost=0.0, mode=estimate.mode,
                    model=estimate.model, words_processed=0,
                    coins_used=0, success=False,
                    error=f"Estimated cost ${estimate.estimated_cost:.2f} exceeds limit ${max_cost:.2f}"
                )
        
        # Make the actual API call
        try:
            response = await self._make_api_call(prompt, estimate.mode, estimate.model)
            
            # Update usage statistics
            self._update_usage_stats(response.cost)
            
            # Cache successful responses
            if self.enable_caching and response.success:
                self._cache_response(prompt, estimate.model, response)
            
            return response
            
        except Exception as e:
            self.logger.error(f"API call failed: {e}")
            return StraicoResponse(
                content="", cost=0.0, mode=estimate.mode,
                model=estimate.model, words_processed=0,
                coins_used=0, success=False,
                error=f"API call failed: {str(e)}"
            )
    
    async def process_batch(self,
                          requests: List[Dict[str, Any]],
                          total_budget: float,
                          priority_order: List[str] = None) -> List[StraicoResponse]:
        """
        Process multiple requests with shared budget management
        """
        responses = []
        remaining_budget = total_budget
        
        # Sort requests by priority if specified
        if priority_order:
            priority_map = {p: i for i, p in enumerate(priority_order)}
            requests = sorted(requests, key=lambda x: priority_map.get(x.get('priority', 'normal'), 999))
        
        for request in requests:
            if remaining_budget <= 0:
                self.logger.warning("Batch budget exhausted")
                break
            
            response = await self.process_request(
                prompt=request['prompt'],
                model=request.get('model'),
                max_cost=min(remaining_budget, request.get('max_cost', remaining_budget))
            )
            
            responses.append(response)
            if response.success:
                remaining_budget -= response.cost
        
        return responses
    
    async def _estimate_optimal_cost(self, prompt: str, model: Optional[str] = None) -> CostEstimate:
        """
        Estimate the optimal pricing mode and cost for a request
        """
        word_count = len(prompt.split())
        model = model or self.default_model
        
        # Estimate costs for both modes (simplified calculation)
        # In real implementation, these would be based on actual Straico pricing
        per_word_cost = word_count * 0.001  # $0.001 per word (example)
        per_message_cost = 0.50  # $0.50 per message (example)
        
        # Choose optimal mode based on cost and thresholds
        if word_count < self.word_threshold:
            optimal_mode = PricingMode.PER_WORD
            estimated_cost = per_word_cost
            reasoning = f"Short prompt ({word_count} words) - per-word is cheaper"
        else:
            if per_message_cost < per_word_cost * self.mode_switch_factor:
                optimal_mode = PricingMode.PER_MESSAGE
                estimated_cost = per_message_cost
                reasoning = f"Long prompt ({word_count} words) - per-message is cheaper"
            else:
                optimal_mode = PricingMode.PER_WORD
                estimated_cost = per_word_cost
                reasoning = f"Per-word still cheaper despite length ({word_count} words)"
        
        return CostEstimate(
            estimated_cost=estimated_cost,
            mode=optimal_mode,
            model=model,
            word_count=word_count,
            reasoning=reasoning
        )
    
    async def _make_api_call(self, prompt: str, mode: PricingMode, model: str) -> StraicoResponse:
        """
        Make the actual API call to Straico
        
        Note: This is a placeholder implementation.
        Replace with actual Straico API integration.
        """
        
        # Placeholder implementation - replace with actual Straico API calls
        async with aiohttp.ClientSession() as session:
            headers = {
                'Authorization': f'Bearer {self.api_key}',
                'Content-Type': 'application/json'
            }
            
            payload = {
                'prompt': prompt,
                'model': model,
                'pricing_mode': mode.value,
                'max_tokens': 2000
            }
            
            # Simulate API call delay
            await asyncio.sleep(0.1)
            
            # Mock response (replace with actual API integration)
            mock_response = {
                'content': f"Mock response for: {prompt[:50]}...",
                'usage': {
                    'total_tokens': len(prompt.split()) + 100,
                    'cost_usd': 0.50,
                    'coins_used': 100,
                    'pricing_mode': mode.value
                }
            }
            
            return StraicoResponse(
                content=mock_response['content'],
                cost=mock_response['usage']['cost_usd'],
                mode=mode,
                model=model,
                words_processed=mock_response['usage']['total_tokens'],
                coins_used=mock_response['usage']['coins_used'],
                success=True
            )
    
    async def _try_fallback_request(self, prompt: str, max_cost: float) -> StraicoResponse:
        """
        Try fallback strategies when cost limits are exceeded
        """
        self.logger.info("Attempting fallback strategies...")
        
        # Strategy 1: Use cheaper model
        fallback_estimate = await self._estimate_optimal_cost(prompt, self.fallback_model)
        if fallback_estimate.estimated_cost <= max_cost:
            self.logger.info(f"Using fallback model: {self.fallback_model}")
            return await self._make_api_call(prompt, fallback_estimate.mode, self.fallback_model)
        
        # Strategy 2: Truncate prompt
        truncated_prompt = prompt[:len(prompt)//2] + "\n\n[Prompt truncated due to cost limits]"
        truncated_estimate = await self._estimate_optimal_cost(truncated_prompt)
        if truncated_estimate.estimated_cost <= max_cost:
            self.logger.info("Using truncated prompt")
            return await self._make_api_call(truncated_prompt, truncated_estimate.mode, truncated_estimate.model)
        
        # Strategy 3: Return error if no fallback works
        return StraicoResponse(
            content="", cost=0.0, mode=PricingMode.PER_WORD,
            model=self.fallback_model, words_processed=0,
            coins_used=0, success=False,
            error="All fallback strategies exceeded cost limits"
        )
    
    async def _check_budget_available(self) -> bool:
        """Check if we have budget available for new requests"""
        daily_used = self.usage_stats.daily_cost / self.daily_budget
        monthly_used = self.usage_stats.monthly_cost / self.monthly_budget
        
        if daily_used >= self.hard_limit or monthly_used >= self.hard_limit:
            self.logger.error("Hard budget limit exceeded")
            return False
        
        if daily_used >= self.warn_threshold or monthly_used >= self.warn_threshold:
            self.logger.warning(f"Budget warning: Daily {daily_used:.1%}, Monthly {monthly_used:.1%}")
        
        return True
    
    def _update_usage_stats(self, cost: float):
        """Update usage statistics"""
        self.usage_stats.total_requests += 1
        self.usage_stats.total_cost += cost
        self.usage_stats.daily_cost += cost
        self.usage_stats.monthly_cost += cost
        
        # Reset daily/monthly counters as needed (simplified)
        now = datetime.now()
        if self.usage_stats.last_reset.date() < now.date():
            self.usage_stats.daily_cost = cost  # Reset daily counter
        
        self.usage_stats.last_reset = now
    
    def _get_cached_response(self, prompt: str, model: Optional[str]) -> Optional[StraicoResponse]:
        """Get cached response if available"""
        cache_key = f"{prompt}:{model or self.default_model}"
        return self.cache.get(cache_key)
    
    def _cache_response(self, prompt: str, model: str, response: StraicoResponse):
        """Cache a successful response"""
        cache_key = f"{prompt}:{model}"
        self.cache[cache_key] = response
        
        # Simple cache size management (use proper cache in production)
        max_cache_size = int(os.getenv('STRAICO_CACHE_MAX_SIZE', '1000'))
        if len(self.cache) > max_cache_size:
            # Remove oldest entries
            old_keys = list(self.cache.keys())[:-max_cache_size//2]
            for key in old_keys:
                del self.cache[key]
    
    def get_usage_report(self) -> Dict[str, Any]:
        """Generate usage and cost report"""
        return {
            'usage_stats': asdict(self.usage_stats),
            'budget_status': {
                'daily_used_percent': (self.usage_stats.daily_cost / self.daily_budget) * 100,
                'monthly_used_percent': (self.usage_stats.monthly_cost / self.monthly_budget) * 100,
                'daily_remaining': max(0, self.daily_budget - self.usage_stats.daily_cost),
                'monthly_remaining': max(0, self.monthly_budget - self.usage_stats.monthly_cost),
            },
            'configuration': {
                'default_mode': self.default_mode.value,
                'default_model': self.default_model,
                'fallbacks_enabled': self.enable_fallbacks,
                'caching_enabled': self.enable_caching,
            }
        }


# Example usage and testing
async def main():
    """Example usage of the Straico orchestrator"""
    
    print("🔑 Straico Cost Governance Example")
    print("=" * 50)
    
    # Initialize orchestrator
    orchestrator = StraicoOrchestrator()
    
    # Example 1: Simple request
    print("\n1. Simple Request Test:")
    response = await orchestrator.process_request(
        prompt="What is the capital of France?",
        max_cost=1.00
    )
    
    print(f"   Response: {response.content[:50]}...")
    print(f"   Cost: ${response.cost:.2f}")
    print(f"   Success: {response.success}")
    
    # Example 2: Batch processing
    print("\n2. Batch Processing Test:")
    batch_requests = [
        {'prompt': 'Explain machine learning', 'priority': 'high'},
        {'prompt': 'What is Python?', 'priority': 'low'},
        {'prompt': 'Describe cloud computing', 'priority': 'medium'},
    ]
    
    batch_responses = await orchestrator.process_batch(
        requests=batch_requests,
        total_budget=5.00,
        priority_order=['high', 'medium', 'low']
    )
    
    for i, response in enumerate(batch_responses):
        print(f"   Request {i+1}: ${response.cost:.2f} - {response.success}")
    
    # Example 3: Usage report
    print("\n3. Usage Report:")
    report = orchestrator.get_usage_report()
    print(f"   Total requests: {report['usage_stats']['total_requests']}")
    print(f"   Total cost: ${report['usage_stats']['total_cost']:.2f}")
    print(f"   Daily budget used: {report['budget_status']['daily_used_percent']:.1f}%")
    
    print("\n✅ Example completed successfully!")


if __name__ == "__main__":
    # Run the example
    asyncio.run(main())