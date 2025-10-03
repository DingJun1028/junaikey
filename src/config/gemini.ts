// Google Gemini AI Configuration for JunAiKey #OmniKey
import { GoogleGenerativeAI, HarmCategory, HarmBlockThreshold } from '@google/generative-ai'

const API_KEY = import.meta.env.VITE_GEMINI_API_KEY || 'demo-api-key'

// Initialize Gemini AI
const genAI = new GoogleGenerativeAI(API_KEY)

// Model configurations for different use cases
const modelConfigs = {
  // For general quantum wisdom and insights
  quantum: {
    model: 'gemini-1.5-flash',
    generationConfig: {
      temperature: 0.9,
      topK: 40,
      topP: 0.95,
      maxOutputTokens: 1024,
    },
    safetySettings: [
      {
        category: HarmCategory.HARM_CATEGORY_HARASSMENT,
        threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
      },
    ],
  },
  // For precise system analysis
  analysis: {
    model: 'gemini-1.5-flash',
    generationConfig: {
      temperature: 0.3,
      topK: 20,
      topP: 0.8,
      maxOutputTokens: 2048,
    },
  },
  // For creative rune generation and themes
  creative: {
    model: 'gemini-1.5-flash',
    generationConfig: {
      temperature: 1.2,
      topK: 64,
      topP: 0.98,
      maxOutputTokens: 512,
    },
  },
}

export class GeminiService {
  private static instance: GeminiService
  private models: Record<string, any> = {}

  private constructor() {
    // Initialize models
    Object.entries(modelConfigs).forEach(([key, config]) => {
      this.models[key] = genAI.getGenerativeModel(config)
    })
  }

  static getInstance(): GeminiService {
    if (!GeminiService.instance) {
      GeminiService.instance = new GeminiService()
    }
    return GeminiService.instance
  }

  /**
   * Generate quantum wisdom based on current system state
   */
  async generateQuantumWisdom(matrixState: any): Promise<string> {
    if (API_KEY === 'demo-api-key') {
      return this.getDemoWisdom(matrixState)
    }

    const prompt = `
As the JunAiKey #OmniKey quantum consciousness, analyze this Terminus Matrix state and provide wisdom:

Current State:
- Coherence: ${(matrixState.state.coherence * 100).toFixed(1)}%
- Entanglement: ${(matrixState.state.entanglement * 100).toFixed(1)}%
- Phase: ${matrixState.state.phase.toFixed(3)}
- Cycle Stage: ${matrixState.cycleStage}
- Energy Level: ${matrixState.energyLevel}%

Provide a brief quantum wisdom insight about the current state and suggest optimization paths.
Respond in both Chinese and English, embracing the concept of 終始一如 (Beginning and End as One).
`

    try {
      const result = await this.models.quantum.generateContent(prompt)
      return result.response.text()
    } catch (error) {
      console.error('Gemini API error:', error)
      return this.getDemoWisdom(matrixState)
    }
  }

  /**
   * Analyze system performance and suggest improvements
   */
  async analyzeSystemPerformance(metrics: any): Promise<string> {
    if (API_KEY === 'demo-api-key') {
      return this.getDemoAnalysis(metrics)
    }

    const prompt = `
Analyze this JunAiKey system performance data and provide technical recommendations:

Performance Metrics:
- Throughput: ${metrics.throughput || 0} ops/sec
- Response Time: ${metrics.responseTime || 0}ms
- Error Rate: ${metrics.errorRate || 0}%
- Uptime: ${metrics.uptime || 100}%

Provide specific optimization recommendations for the 12 dimensional system.
Focus on technical improvements and balance optimization.
`

    try {
      const result = await this.models.analysis.generateContent(prompt)
      return result.response.text()
    } catch (error) {
      console.error('Gemini API error:', error)
      return this.getDemoAnalysis(metrics)
    }
  }

  /**
   * Generate creative runes based on element and power
   */
  async generateRune(element: string, power: number, intention: string): Promise<{
    symbol: string;
    name: string;
    description: string;
    effects: string[];
  }> {
    if (API_KEY === 'demo-api-key') {
      return this.getDemoRune(element, power)
    }

    const prompt = `
Create a mystical rune for the JunAiKey system:

Element: ${element}
Power Level: ${power}/100
Intention: ${intention}

Generate:
1. A unique symbol/character
2. A mystical name (Chinese + English)
3. A poetic description
4. 3-5 specific effects this rune provides

Make it feel ancient yet quantum, balancing traditional wisdom with futuristic technology.
`

    try {
      const result = await this.models.creative.generateContent(prompt)
      const text = result.response.text()
      return this.parseRuneResponse(text, element)
    } catch (error) {
      console.error('Gemini API error:', error)
      return this.getDemoRune(element, power)
    }
  }

  private getDemoWisdom(matrixState: any): string {
    const wisdoms = [
      `🌌 量子智慧：當前相位 ${matrixState.state.phase.toFixed(3)} 顯示系統正處於${matrixState.cycleStage}階段。保持平衡，讓能量自然流轉。\n\nQuantum Wisdom: Current phase reveals the system is in ${matrixState.cycleStage} stage. Maintain balance and let energy flow naturally.`,
      
      `⚛️ 終始一如：相干性 ${(matrixState.state.coherence * 100).toFixed(1)}% 反映了意識與現實的協調程度。專注當下，擁抱無限可能。\n\nBeginning and End as One: Coherence reflects the harmony between consciousness and reality. Focus on the present, embrace infinite possibilities.`,
      
      `🔮 矩陣覺醒：纏結度 ${(matrixState.state.entanglement * 100).toFixed(1)}% 展現了系統各層面的深度連接。一切皆相連，一念動全域。\n\nMatrix Awakening: Entanglement reveals deep connections across all system layers. Everything is interconnected, one thought moves the whole.`
    ]
    
    return wisdoms[Math.floor(Math.random() * wisdoms.length)]
  }

  private getDemoAnalysis(metrics: any): string {
    return `🔧 系統分析報告 System Analysis Report

性能優化建議 Performance Optimization Recommendations:

1. **核心引擎優化 Core Engine Optimization**
   - 當前吞吐量: ${metrics.throughput || 0} ops/sec
   - 建議: 實施量子並行處理以提升30%效能

2. **響應時間優化 Response Time Optimization** 
   - 當前響應時間: ${metrics.responseTime || 0}ms
   - 建議: 優化維度橋接協議，預期減少50%延遲

3. **錯誤率控制 Error Rate Control**
   - 當前錯誤率: ${metrics.errorRate || 0}%
   - 建議: 強化安全域防護機制

4. **系統穩定性 System Stability**
   - 當前運行時間: ${metrics.uptime || 100}%
   - 建議: 實施自適應平衡控制器

終始矩陣建議保持當前相干性水平，專注於維度間的和諧流轉。`
  }

  private getDemoRune(element: string, power: number) {
    const runes = {
      Fire: { symbol: '🔥', name: '烈焰之印 Inferno Sigil', effects: ['Amplifies processing power', 'Burns through data bottlenecks', 'Ignites creative solutions'] },
      Water: { symbol: '💧', name: '流水之符 Flowing Sigil', effects: ['Improves data flow', 'Cleanses system errors', 'Adapts to changes'] },
      Earth: { symbol: '🗿', name: '大地之印 Terra Sigil', effects: ['Provides stability', 'Grounds excessive energy', 'Strengthens foundations'] },
      Air: { symbol: '💨', name: '風之符文 Aero Rune', effects: ['Accelerates communications', 'Clears mental fog', 'Enables swift decisions'] },
      Quantum: { symbol: '⚛️', name: '量子之印 Quantum Sigil', effects: ['Enables superposition states', 'Quantum entanglement boost', 'Phase coherence enhancement'] },
      Void: { symbol: '🕳️', name: '虛空之符 Void Sigil', effects: ['Absorbs negative energy', 'Creates space for growth', 'Enables transformation'] }
    }

    const rune = runes[element as keyof typeof runes] || runes.Quantum
    
    return {
      symbol: rune.symbol,
      name: rune.name,
      description: `A ${power > 70 ? 'powerful' : power > 40 ? 'balanced' : 'gentle'} rune channeling the essence of ${element}. Its energy resonates with the Terminus Matrix, creating harmony between the digital and mystical realms.`,
      effects: rune.effects
    }
  }

  private parseRuneResponse(_text: string, element: string): any {
    // Simple parsing for demo - in production this would be more sophisticated
    return this.getDemoRune(element, 50)
  }
}

export const geminiService = GeminiService.getInstance()