import { OpenAIIntegration } from './OpenAIIntegration';
import { IAIModel, AIResponse, ModelInfo, TrainingData } from '../intelligent-tagging-system/index';

export interface ModelProvider {
  name: string;
  displayName: string;
  enabled: boolean;
}

export interface ModelConfig {
  provider: string;
  model: string;
  apiKey: string;
  baseURL?: string;
}

/**
 * AI 模型管理器 - 統一管理多種 AI 模型提供者
 */
export class ModelManager implements IAIModel {
  private models: Map<string, IAIModel> = new Map();
  private defaultModel: string;
  private providers: Map<string, ModelProvider> = new Map();
  private config: ModelConfig;

  constructor(config: ModelConfig) {
    this.config = config;
    this.initializeProviders();
    this.initializeModels();
  }

  /**
   * 初始化模型提供者
   */
  private initializeProviders(): void {
    this.providers.set('openai', {
      name: 'openai',
      displayName: 'OpenAI',
      enabled: true
    });

    this.providers.set('gemini', {
      name: 'gemini',
      displayName: 'Google Gemini',
      enabled: false
    });

    this.providers.set('claude', {
      name: 'claude',
      displayName: 'Anthropic Claude',
      enabled: false
    });
  }

  /**
   * 初始化模型
   */
  private initializeModels(): void {
    // 初始化 OpenAI 模型
    if (this.providers.get('openai')?.enabled) {
      this.registerModel('openai-gpt-4', new OpenAIIntegration({
        apiKey: this.config.apiKey,
        model: 'gpt-4',
        baseURL: this.config.baseURL
      }));

      this.registerModel('openai-gpt-4o', new OpenAIIntegration({
        apiKey: this.config.apiKey,
        model: 'gpt-4o',
        baseURL: this.config.baseURL
      }));

      this.registerModel('openai-gpt-3.5-turbo', new OpenAIIntegration({
        apiKey: this.config.apiKey,
        model: 'gpt-3.5-turbo',
        baseURL: this.config.baseURL
      }));
    }

    // 設置默認模型
    this.defaultModel = this.config.provider === 'openai' ? 'openai-gpt-4' : 'openai-gpt-4';
  }

  /**
   * 註冊模型
   */
  public registerModel(name: string, model: IAIModel): void {
    this.models.set(name, model);
  }

  /**
   * 獲取模型
   */
  public getModel(name: string): IAIModel | null {
    return this.models.get(name) || null;
  }

  /**
   * 切換默認模型
   */
  public switchModel(name: string): boolean {
    if (this.models.has(name)) {
      this.defaultModel = name;
      return true;
    }
    return false;
  }

  /**
   * 獲取默認模型
   */
  public getDefaultModel(): IAIModel | null {
    return this.models.get(this.defaultModel) || null;
  }

  /**
   * 獲取所有可用模型
   */
  public getAvailableModels(): string[] {
    return Array.from(this.models.keys());
  }

  /**
   * 獲取所有提供者
   */
  public getProviders(): Map<string, ModelProvider> {
    return new Map(this.providers);
  }

  /**
   * 啟用/禁用提供者
   */
  public setProviderEnabled(provider: string, enabled: boolean): void {
    const providerInfo = this.providers.get(provider);
    if (providerInfo) {
      providerInfo.enabled = enabled;
      
      // 如果禁用的是當前默認提供者，切換到另一個
      if (!enabled && this.defaultModel.startsWith(provider)) {
        const alternativeModel = this.getAlternativeModel(provider);
        if (alternativeModel) {
          this.defaultModel = alternativeModel;
        }
      }
    }
  }

  /**
   * 獲取替代模型
   */
  private getAlternativeModel(disabledProvider: string): string | null {
    for (const [name, provider] of this.providers) {
      if (provider.enabled && name !== disabledProvider) {
        // 找到該提供者的第一個模型
        for (const modelName of this.models.keys()) {
          if (modelName.startsWith(name)) {
            return modelName;
          }
        }
      }
    }
    return null;
  }

  /**
   * 生成回應（實現 IAIModel 介面）
   */
  public async generate(prompt: string): Promise<AIResponse> {
    const model = this.getDefaultModel();
    if (!model) {
      throw new Error('No default model available');
    }

    try {
      const response = await model.generate(prompt);
      return {
        content: response.content || '',
        confidence: 0.8,
        timestamp: new Date(),
        model: this.defaultModel
      };
    } catch (error) {
      console.error(`Error generating response with model ${this.defaultModel}:`, error);
      throw error;
    }
  }

  /**
   * 模型微調（實現 IAIModel 介面）
   */
  public async fineTune(data: TrainingData[]): Promise<void> {
    const model = this.getDefaultModel();
    if (!model) {
      throw new Error('No default model available for fine-tuning');
    }

    try {
      await model.fineTune(data);
    } catch (error) {
      console.error(`Error fine-tuning model ${this.defaultModel}:`, error);
      throw error;
    }
  }

  /**
   * 獲取模型信息（實現 IAIModel 介面）
   */
  public getModelInfo(): ModelInfo {
    return {
      name: this.defaultModel,
      provider: this.defaultModel.split('-')[0],
      version: '1.0.0',
      capabilities: ['text-generation', 'conversation', 'analysis'],
      supportedFormats: ['text', 'image', 'file']
    };
  }

  /**
   * 重新加載所有模型
   */
  public async reloadModels(): Promise<void> {
    this.models.clear();
    this.initializeModels();
  }

  /**
   * 驗證 API 金鑰
   */
  public async validateApiKey(provider: string, apiKey: string): Promise<boolean> {
    try {
      switch (provider) {
        case 'openai':
          const openaiModel = new OpenAIIntegration({ apiKey });
          await openaiModel.getModels();
          return true;
        
        default:
          console.warn(`Provider ${provider} validation not implemented`);
          return false;
      }
    } catch (error) {
      console.error(`API key validation failed for ${provider}:`, error);
      return false;
    }
  }

  /**
   * 獲取模型統計信息
   */
  public getModelStats(): any {
    const stats: any = {
      totalModels: this.models.size,
      enabledProviders: Array.from(this.providers.values()).filter(p => p.enabled).length,
      defaultModel: this.defaultModel,
      providerBreakdown: {} as any
    };

    for (const [name, provider] of this.providers) {
      if (provider.enabled) {
        const modelCount = Array.from(this.models.keys()).filter(modelName => 
          modelName.startsWith(name)
        ).length;
        stats.providerBreakdown[name] = {
          displayName: provider.displayName,
          modelCount,
          enabled: provider.enabled
        };
      }
    }

    return stats;
  }
}
