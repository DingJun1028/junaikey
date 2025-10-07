import { EventBus } from '../core/EventBus';
import { Logger } from '../utils/logger';
import { OpenAIIntegration } from '../ai/OpenAIIntegration';

export interface VibeConfig {
  enableAI: boolean;
  aiModel: string;
  aiTemperature: number;
  aiMaxTokens: number;
  enableAutoComplete: boolean;
  enableCodeReview: boolean;
  enableErrorDetection: boolean;
  enableRefactoring: boolean;
  enableDocumentation: boolean;
}

export interface VibeSession {
  id: string;
  filePath: string;
  language: string;
  startTime: Date;
  endTime?: Date;
  interactions: VibeInteraction[];
  suggestions: VibeSuggestion[];
  improvements: VibeImprovement[];
}

export interface VibeInteraction {
  id: string;
  type: 'code_change' | 'ai_suggestion' | 'error_fix' | 'refactor';
  timestamp: Date;
  description: string;
  code: string;
  confidence: number;
  accepted: boolean;
}

export interface VibeSuggestion {
  id: string;
  type: 'completion' | 'optimization' | 'best_practice' | 'security';
  title: string;
  description: string;
  code: string;
  language: string;
  priority: 'low' | 'medium' | 'high' | 'critical';
  confidence: number;
  context: any;
}

export interface VibeImprovement {
  id: string;
  category: 'performance' | 'readability' | 'maintainability' | 'security';
  description: string;
  before: string;
  after: string;
  impact: 'positive' | 'neutral' | 'negative';
  effort: 'low' | 'medium' | 'high';
}

/**
 * Vibe Coding - Cline 的智能編碼助手
 * 提供自動完成、代碼審查、錯誤檢測等功能
 */
export class VibeCoding {
  private config: VibeConfig;
  private eventBus: EventBus;
  private logger: Logger;
  private openai: OpenAIIntegration;
  private sessions: Map<string, VibeSession> = new Map();
  private isRunning: boolean = false;

  constructor(config: VibeConfig) {
    this.config = config;
    this.eventBus = new EventBus();
    this.logger = new Logger('VibeCoding');
    
    if (config.enableAI) {
      this.openai = new OpenAIIntegration({
        apiKey: process.env.OPENAI_API_KEY || '',
        model: config.aiModel
      });
    }

    this.setupEventHandlers();
  }

  /**
   * 設置事件處理器
   */
  private setupEventHandlers(): void {
    this.eventBus.on('session_started', this.handleSessionStart.bind(this));
    this.eventBus.on('session_ended', this.handleSessionEnd.bind(this));
    this.eventBus.on('code_change', this.handleCodeChange.bind(this));
    this.eventBus.on('ai_suggestion', this.handleAISuggestion.bind(this));
  }

  /**
   * 啟動 Vibe Coding
   */
  public async start(): Promise<void> {
    this.isRunning = true;
    this.logger.info('Vibe Coding started');
    this.eventBus.emit('vibe_coding_started', { timestamp: new Date() });
  }

  /**
   * 停止 Vibe Coding
   */
  public async stop(): Promise<void> {
    this.isRunning = false;
    this.logger.info('Vibe Coding stopped');
    this.eventBus.emit('vibe_coding_stopped', { timestamp: new Date() });
  }

  /**
   * 創建編碼會話
   */
  public createSession(filePath: string, language: string): string {
    const sessionId = `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    
    const session: VibeSession = {
      id: sessionId,
      filePath,
      language,
      startTime: new Date(),
      interactions: [],
      suggestions: [],
      improvements: []
    };

    this.sessions.set(sessionId, session);
    this.eventBus.emit('session_started', session);
    
    this.logger.info('Session created', { sessionId, filePath, language });
    return sessionId;
  }

  /**
   * 獲取會話
   */
  public getSession(sessionId: string): VibeSession | null {
    return this.sessions.get(sessionId) || null;
  }

  /**
   * 結束會話
   */
  public endSession(sessionId: string): boolean {
    const session = this.sessions.get(sessionId);
    if (!session) return false;

    session.endTime = new Date();
    this.sessions.set(sessionId, session);
    
    this.eventBus.emit('session_ended', session);
    this.logger.info('Session ended', { sessionId });
    
    return true;
  }

  /**
   * 處理代碼變更
   */
  private async handleCodeChange(sessionId: string, code: string, context: any): Promise<void> {
    const session = this.sessions.get(sessionId);
    if (!session) return;

    const interaction: VibeInteraction = {
      id: `interaction_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      type: 'code_change',
      timestamp: new Date(),
      description: 'Code changed',
      code,
      confidence: 1.0,
      accepted: true
    };

    session.interactions.push(interaction);

    // 如果啟用了 AI 功能，生成建議
    if (this.config.enableAI) {
      await this.generateAISuggestions(session, code, context);
    }

    // 如果啟用了錯誤檢測，檢測代碼問題
    if (this.config.enableErrorDetection) {
      await this.detectCodeErrors(session, code);
    }
  }

  /**
   * 生成 AI 建議
   */
  private async generateAISuggestions(session: VibeSession, code: string, context: any): Promise<void> {
    try {
      const prompt = `
Generate coding suggestions for the following ${session.language} code:

${code}

Context: ${JSON.stringify(context)}

Provide suggestions in JSON format with the following structure:
{
  "suggestions": [
    {
      "type": "completion|optimization|best_practice|security",
      "title": "Brief title",
      "description": "Detailed description",
      "code": "Improved code snippet",
      "priority": "low|medium|high|critical",
      "confidence": 0.0-1.0
    }
  ]
}
`;

      const response = await this.openai.generateText(prompt, {
        messages: [
          { role: 'system', content: 'You are an expert code assistant providing helpful suggestions.' },
          { role: 'user', content: prompt }
        ]
      });

      if (response.content) {
        const suggestions = JSON.parse(response.content);
        
        suggestions.suggestions.forEach((suggestion: any) => {
          const vibeSuggestion: VibeSuggestion = {
            id: `suggestion_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
            type: suggestion.type,
            title: suggestion.title,
            description: suggestion.description,
            code: suggestion.code,
            language: session.language,
            priority: suggestion.priority,
            confidence: suggestion.confidence,
            context: context
          };

          session.suggestions.push(vibeSuggestion);
        });

        this.eventBus.emit('ai_suggestions_generated', { sessionId: session.id, suggestions });
        this.logger.info('AI suggestions generated', { sessionId: session.id, count: suggestions.suggestions.length });
      }
    } catch (error) {
      this.logger.error('Failed to generate AI suggestions', error);
    }
  }

  /**
   * 檢測代碼錯誤
   */
  private async detectCodeErrors(session: VibeSession, code: string): Promise<void> {
    try {
      const prompt = `
Analyze the following ${session.language} code for potential errors and issues:

${code}

Provide error detection results in JSON format:
{
  "errors": [
    {
      "type": "syntax|runtime|logic|security",
      "message": "Error description",
      "line": number,
      "suggestion": "Fix suggestion"
    }
  ]
}
`;

      const response = await this.openai.generateText(prompt, {
        messages: [
          { role: 'system', content: 'You are a code analyzer that detects errors and issues.' },
          { role: 'user', content: prompt }
        ]
      });

      if (response.content) {
        const errors = JSON.parse(response.content);
        
        errors.errors.forEach((error: any) => {
          const suggestion: VibeSuggestion = {
            id: `error_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
            type: 'optimization',
            title: `Error: ${error.type}`,
            description: `${error.message}\nFix: ${error.suggestion}`,
            code: error.suggestion,
            language: session.language,
            priority: error.type === 'security' ? 'critical' : 'high',
            confidence: 0.9,
            context: { line: error.line }
          };

          session.suggestions.push(suggestion);
        });

        this.eventBus.emit('code_errors_detected', { sessionId: session.id, errors });
        this.logger.info('Code errors detected', { sessionId: session.id, count: errors.errors.length });
      }
    } catch (error) {
      this.logger.error('Failed to detect code errors', error);
    }
  }

  /**
   * 處理 AI 建議
   */
  private async handleAISuggestion(sessionId: string, suggestion: VibeSuggestion): Promise<void> {
    const session = this.sessions.get(sessionId);
    if (!session) return;

    const interaction: VibeInteraction = {
      id: `interaction_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      type: 'ai_suggestion',
      timestamp: new Date(),
      description: suggestion.title,
      code: suggestion.code,
      confidence: suggestion.confidence,
      accepted: false
    };

    session.interactions.push(interaction);
    this.logger.info('AI suggestion handled', { sessionId, suggestionId: suggestion.id });
  }

  /**
   * 獲取自動完成建議
   */
  public async getAutoCompleteSuggestions(code: string, cursorPosition: number, context: any): Promise<string[]> {
    if (!this.config.enableAutoComplete) return [];

    try {
      const prompt = `
Provide code completion suggestions for the following code at position ${cursorPosition}:

${code}

Context: ${JSON.stringify(context)}

Provide 3-5 completion suggestions as strings:
`;

      const response = await this.openai.generateText(prompt, {
        messages: [
          { role: 'system', content: 'You are an autocomplete assistant providing code completions.' },
          { role: 'user', content: prompt }
        ]
      });

      if (response.content) {
        const suggestions = response.content.split('\n').filter(s => s.trim() !== '');
        return suggestions.slice(0, 5); // 限制為5個建議
      }
    } catch (error) {
      this.logger.error('Failed to generate autocomplete suggestions', error);
    }

    return [];
  }

  /**
   * 代碼審查
   */
  public async reviewCode(code: string, language: string): Promise<VibeImprovement[]> {
    if (!this.config.enableCodeReview) return [];

    try {
      const prompt = `
Review the following ${language} code and suggest improvements:

${code}

Provide improvements in JSON format:
{
  "improvements": [
    {
      "category": "performance|readability|maintainability|security",
      "description": "Improvement description",
      "before": "Original code snippet",
      "after": "Improved code snippet",
      "impact": "positive|neutral|negative",
      "effort": "low|medium|high"
    }
  ]
}
`;

      const response = await this.openai.generateText(prompt, {
        messages: [
          { role: 'system', content: 'You are a code reviewer that provides improvement suggestions.' },
          { role: 'user', content: prompt }
        ]
      });

      if (response.content) {
        const result = JSON.parse(response.content);
        const improvements: VibeImprovement[] = result.improvements.map((imp: any) => ({
          id: `improvement_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
          category: imp.category,
          description: imp.description,
          before: imp.before,
          after: imp.after,
          impact: imp.impact,
          effort: imp.effort
        }));

        return improvements;
      }
    } catch (error) {
      this.logger.error('Failed to review code', error);
    }

    return [];
  }

  /**
   * 代碼重構建議
   */
  public async suggestRefactoring(code: string, language: string): Promise<VibeImprovement[]> {
    if (!this.config.enableRefactoring) return [];

    try {
      const prompt = `
Analyze the following ${language} code and suggest refactoring opportunities:

${code}

Provide refactoring suggestions in JSON format:
{
  "refactorings": [
    {
      "description": "Refactoring description",
      "before": "Original code",
      "after": "Refactored code",
      "benefits": ["Benefit 1", "Benefit 2"]
    }
  ]
}
`;

      const response = await this.openai.generateText(prompt, {
        messages: [
          { role: 'system', content: 'You are a refactoring expert that identifies improvement opportunities.' },
          { role: 'user', content: prompt }
        ]
      });

      if (response.content) {
        const result = JSON.parse(response.content);
        const improvements: VibeImprovement[] = result.refactorings.map((ref: any) => ({
          id: `refactor_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
          category: 'maintainability',
          description: ref.description,
          before: ref.before,
          after: ref.after,
          impact: 'positive',
          effort: 'medium'
        }));

        return improvements;
      }
    } catch (error) {
      this.logger.error('Failed to suggest refactoring', error);
    }

    return [];
  }

  /**
   * 生成文檔
   */
  public async generateDocumentation(code: string, language: string, type: 'comment' | 'docstring' | 'readme'): Promise<string> {
    if (!this.config.enableDocumentation) return '';

    try {
      const prompt = `
Generate ${type} documentation for the following ${language} code:

${code}

Provide documentation in the appropriate format:
`;

      const response = await this.openai.generateText(prompt, {
        messages: [
          { role: 'system', content: `You are a documentation expert that generates ${type} documentation.` },
          { role: 'user', content: prompt }
        ]
      });

      return response.content || '';
    } catch (error) {
      this.logger.error('Failed to generate documentation', error);
    }

    return '';
  }

  /**
   * 獲取會話統計信息
   */
  public getSessionStats(sessionId: string): any {
    const session = this.sessions.get(sessionId);
    if (!session) return null;

    return {
      sessionId: session.id,
      filePath: session.filePath,
      language: session.language,
      duration: session.endTime ? 
        session.endTime.getTime() - session.startTime.getTime() : 
        Date.now() - session.startTime.getTime(),
      interactions: session.interactions.length,
      suggestions: session.suggestions.length,
      improvements: session.improvements.length,
      acceptedSuggestions: session.interactions.filter(i => i.accepted).length
    };
  }

  /**
   * 獲取所有會話
   */
  public getAllSessions(): VibeSession[] {
    return Array.from(this.sessions.values());
  }

  /**
   * 清理過期會話
   */
  public cleanupOldSessions(maxAge: number = 24 * 60 * 60 * 1000): void {
    const now = Date.now();
    const expiredSessions: string[] = [];

    for (const [sessionId, session] of this.sessions) {
      if (session.endTime && (now - session.endTime.getTime() > maxAge)) {
        expiredSessions.push(sessionId);
      }
    }

    expiredSessions.forEach(sessionId => {
      this.sessions.delete(sessionId);
      this.logger.info('Expired session cleaned up', { sessionId });
    });
  }

  /**
   * 檢查 Vibe Coding 是否運行中
   */
  public isVibeCodingRunning(): boolean {
    return this.isRunning;
  }
}
