# Straico Cost Governance

This directory contains scaffolding and examples for implementing cost governance when using Straico AI services.

## Overview

Straico provides two pricing modes:
- **Per Word**: Pay based on the number of words processed
- **Per Message**: Pay a fixed rate per message/request

Understanding and managing these costs is crucial for sustainable AI integration.

## Pricing Modes

### Per Word Pricing
- Charges based on input + output tokens/words
- Better for short, frequent interactions
- Predictable cost per token
- Good for chatbot scenarios with brief exchanges

### Per Message Pricing  
- Fixed cost per API call regardless of length
- Better for long-form content generation
- More cost-effective for lengthy documents
- Good for document analysis, long-form writing

## Cost Management Strategy

### 1. Monitoring and Thresholds
- **80% Warning Threshold**: Alert users when approaching budget limit
- **100% Hard Limit**: Stop processing to prevent overage
- **Daily/Monthly Quotas**: Set per-user or per-agent limits

### 2. Dynamic Mode Switching
```
If (estimated_words < threshold):
    use per_word_mode
Else:
    use per_message_mode
```

### 3. Fallback Strategies
When costs exceed thresholds:
1. **Switch to cheaper mode** (if available)
2. **Enable RAG** to reduce token usage
3. **Use simpler models** (e.g., GPT-3.5 instead of GPT-4)
4. **Queue requests** for off-peak processing
5. **Graceful degradation** with cached responses

## Implementation Components

### Files in this directory:

- `config.example.env`: Environment variables for cost control
- `example_orchestrator.py`: Sample cost management orchestrator
- `README.md`: This documentation

### Required Environment Variables

```bash
# Straico Configuration
STRAICO_API_KEY=your_api_key_here
STRAICO_DEFAULT_MODE=per_word  # or per_message
STRAICO_MODEL=gpt-4-turbo      # default model

# Cost Governance
STRAICO_DAILY_BUDGET=100.00    # USD
STRAICO_MONTHLY_BUDGET=2000.00 # USD
STRAICO_WARN_THRESHOLD=0.8     # 80%
STRAICO_HARD_LIMIT=1.0         # 100%

# Fallback Configuration
STRAICO_ENABLE_RAG=true
STRAICO_FALLBACK_MODEL=gpt-3.5-turbo
STRAICO_ENABLE_CACHING=true
```

## Usage Patterns

### 1. Simple Request
```python
from orchestrator import StraicoOrchestrator

orchestrator = StraicoOrchestrator()
response = await orchestrator.process_request(
    prompt="Analyze this document...",
    max_cost=5.00  # per-request budget
)
```

### 2. Batch Processing
```python
# Process multiple requests with shared budget
responses = await orchestrator.process_batch(
    requests=batch_requests,
    total_budget=50.00,
    priority_order=['high', 'medium', 'low']
)
```

### 3. Cost Estimation
```python
# Estimate costs before processing
estimate = orchestrator.estimate_cost(
    prompt="Long document analysis...",
    model="gpt-4-turbo"
)

if estimate.cost > user_budget:
    # Switch to cheaper alternative or request approval
    response = orchestrator.process_with_fallback(prompt)
```

## Best Practices

### 1. Pre-processing
- **Chunk large documents** to optimize pricing mode selection
- **Remove unnecessary content** (formatting, metadata)
- **Use summarization** for very long inputs

### 2. Caching
- **Cache similar requests** to avoid repeated API calls
- **Store intermediate results** for multi-step processes
- **Implement semantic caching** for similar but not identical requests

### 3. Monitoring
- **Log all requests** with cost information
- **Track usage patterns** to optimize mode selection
- **Monitor model performance vs cost** ratios

### 4. User Experience
- **Show cost estimates** before expensive operations
- **Provide cost-conscious alternatives** (faster/cheaper models)
- **Graceful degradation** when budgets are exceeded

## Integration with CI/CD

The cost governance system should integrate with your deployment pipeline:

1. **Development**: Unlimited local testing with warnings
2. **Staging**: Production-like cost limits for realistic testing
3. **Production**: Strict cost controls with monitoring and alerts

## Monitoring and Alerts

Set up monitoring for:
- Daily/monthly spending
- Cost per request trends
- Model usage patterns
- Error rates due to cost limits
- User satisfaction vs cost ratios

## Emergency Procedures

If costs spike unexpectedly:
1. **Immediate**: Activate hard limits to stop processing
2. **Short-term**: Switch all requests to cheapest available options
3. **Medium-term**: Analyze usage patterns and adjust thresholds
4. **Long-term**: Optimize prompts and implement better cost controls