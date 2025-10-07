import { EventBus } from '../core/EventBus';
import { logger } from '../utils/logger';
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
  private logger = logger; // 使用匯入的 logger 實例
  private openai?: OpenAIIntegration; // 可能未初始化
  private sessions: Map<string, VibeSession> = new Map();
  private isRunning: boolean = false;

  constructor(config: VibeConfig) {
    this.config = config;
    this.eventBus = new EventBus();

    if (config.enableAI) {
      this.openai = new OpenAIIntegration({
        apiKey: process.env.OPENAI_API_KEY || '',
        model: config.aiModel
      });
    }

    this.setupEventHandlers();
  }

  private setupEventHandlers(): void {
    this.eventBus.on('session_started', this.handleSessionStart.bind(this));
    this.eventBus.on('session_ended', this.handleSessionEnd.bind(this));
    this.eventBus.on('code_change', this.handleCodeChange.bind(this));
    this.eventBus.on('ai_suggestion', this.handleAISuggestion.bind(this));
  }

  public async start(): Promise<void> {
    this.isRunning = true;
    this.logger.info('Vibe Coding started');
    this.eventBus.emit('vibe_coding_started', { timestamp: new Date() });
  }

  public async stop(): Promise<void> {
    this.isRunning = false;
    this.logger.info('Vibe Coding stopped');
    this.eventBus.emit('vibe_coding_stopped', { timestamp: new Date() });
  }

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

  public getSession(sessionId: string): VibeSession | null {
    return this.sessions.get(sessionId) || null;
  }

  public endSession(sessionId: string): boolean {
    const session = this.sessions.get(sessionId);
    if (!session) return false;

    session.endTime = new Date();
    this.sessions.set(sessionId, session);

    this.eventBus.emit('session_ended', session);
    this.logger.info('Session ended', { sessionId });

    return true;
  }

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

    if (this.config.enableAI) {
      await this.generateAISuggestions(session, code, context);
    }

    if (this.config.enableErrorDetection) {
      await this.detectCodeErrors(session, code);
    }
  }

  private async generateAISuggestions(session: VibeSession, code: string, context: any): Promise<void> {
    if (!this.openai) {
      this.logger.warn('OpenAIIntegration 未初始化，無法生成 AI 建議');
      return;
    }

    try {
      const prompt = `Generate coding suggestions for the following ${session.language} code:\n\n${code}\n\nContext: ${JSON.stringify(context)}\n`;

      const response = await this.openai.generateText(prompt, {
        messages: [
          { role: 'system', content: 'You are an expert code assistant providing helpful suggestions.' },
          { role: 'user', content: prompt }
        ]
      });

      if (response && response.content) {
        try {
          const parsed = JSON.parse(response.content);
          const items = Array.isArray(parsed.suggestions) ? parsed.suggestions : [];

          items.forEach((suggestion: any) => {
            const vibeSuggestion: VibeSuggestion = {
              id: `suggestion_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
              type: suggestion.type || 'completion',
              title: suggestion.title || 'Suggestion',
              description: suggestion.description || '',
              code: suggestion.code || '',
              language: session.language,
              priority: suggestion.priority || 'medium',
              confidence: typeof suggestion.confidence === 'number' ? suggestion.confidence : 0.5,
              context: context
            };

            session.suggestions.push(vibeSuggestion);
          });

          this.eventBus.emit('ai_suggestions_generated', { sessionId: session.id, suggestions: parsed.suggestions || [] });
          this.logger.info('AI suggestions generated', { sessionId: session.id, count: items.length });
        } catch (e) {
          this.logger.warn('AI 建議解析失敗', e);
        }
      }
    } catch (error) {
      this.logger.error('Failed to generate AI suggestions', error);
    }
  }

  private async detectCodeErrors(session: VibeSession, code: string): Promise<void> {
    if (!this.openai) {
      this.logger.warn('OpenAIIntegration 未初始化，無法檢測代碼錯誤');
      return;
    }

    try {
      const prompt = `Analyze the following ${session.language} code for potential errors and issues:\n\n${code}\n`;

      const response = await this.openai.generateText(prompt, {
        messages: [
          { role: 'system', content: 'You are a code analyzer that detects errors and issues.' },
          { role: 'user', content: prompt }
        ]
      });

      if (response && response.content) {
        try {
          const parsed = JSON.parse(response.content);
          const errs = Array.isArray(parsed.errors) ? parsed.errors : [];

          errs.forEach((err: any) => {
            const suggestion: VibeSuggestion = {
              id: `error_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
              type: 'optimization',
              title: `Error: ${err.type || 'issue'}`,
              description: `${err.message || ''}\nFix: ${err.suggestion || ''}`,
              code: err.suggestion || '',
              language: session.language,
              priority: err.type === 'security' ? 'critical' : 'high',
              confidence: typeof err.confidence === 'number' ? err.confidence : 0.9,
              context: { line: typeof err.line === 'number' ? err.line : undefined }
            };

            session.suggestions.push(suggestion);
          });

          this.eventBus.emit('code_errors_detected', { sessionId: session.id, errors: parsed.errors || [] });
          this.logger.info('Code errors detected', { sessionId: session.id, count: errs.length });
        } catch (e) {
          this.logger.warn('代碼錯誤解析失敗', e);
        }
      }
    } catch (error) {
      this.logger.error('Failed to detect code errors', error);
    }
  }

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

  public async getAutoCompleteSuggestions(code: string, cursorPosition: number, context: any): Promise<string[]> {
    if (!this.config.enableAutoComplete) return [];
    if (!this.openai) {
      this.logger.warn('OpenAIIntegration 未初始化，無法取得自動完成建議');
      return [];
    }

    try {
      const prompt = `Provide code completion suggestions for the following code at position ${cursorPosition}:\n\n${code}\n\nContext: ${JSON.stringify(context)}\n`;

      const response = await this.openai.generateText(prompt, {
        messages: [
          { role: 'system', content: 'You are an autocomplete assistant providing code completions.' },
          { role: 'user', content: prompt }
        ]
      });

      if (response && response.content) {
        const suggestions = response.content.split('\n').map(s => s.trim()).filter(s => s !== '');
        return suggestions.slice(0, 5);
      }
    } catch (error) {
      this.logger.error('Failed to generate autocomplete suggestions', error);
    }

    return [];
  }

  public async reviewCode(code: string, language: string): Promise<VibeImprovement[]> {
    if (!this.config.enableCodeReview) return [];
    if (!this.openai) {
      this.logger.warn('OpenAIIntegration 未初始化，無法進行代碼審查');
      return [];
    }

    try {
      const prompt = `Review the following ${language} code and suggest improvements:\n\n${code}\n`;

      const response = await this.openai.generateText(prompt, {
        messages: [
          { role: 'system', content: 'You are a code reviewer that provides improvement suggestions.' },
          { role: 'user', content: prompt }
        ]
      });

      if (response && response.content) {
        try {
          const parsed = JSON.parse(response.content);
          const items = Array.isArray(parsed.improvements) ? parsed.improvements : [];

          const improvements: VibeImprovement[] = items.map((imp: any) => ({
            id: `improvement_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
            category: (imp.category as VibeImprovement['category']) || 'maintainability',
            description: imp.description || '',
            before: imp.before || '',
            after: imp.after || '',
            impact: (imp.impact as VibeImprovement['impact']) || 'positive',
            effort: (imp.effort as VibeImprovement['effort']) || 'medium'
          }));

          return improvements;
        } catch (e) {
          this.logger.warn('Review 解析失敗', e);
        }
      }
    } catch (error) {
      this.logger.error('Failed to review code', error);
    }

    return [];
  }

  public async suggestRefactoring(code: string, language: string): Promise<VibeImprovement[]> {
    if (!this.config.enableRefactoring) return [];
    if (!this.openai) {
      this.logger.warn('OpenAIIntegration 未初始化，無法產生重構建議');
      return [];
    }

    try {
      const prompt = `Analyze the following ${language} code and suggest refactoring opportunities:\n\n${code}\n`;

      const response = await this.openai.generateText(prompt, {
        messages: [
          { role: 'system', content: 'You are a refactoring expert that identifies improvement opportunities.' },
          { role: 'user', content: prompt }
        ]
      });

      if (response && response.content) {
        try {
          const parsed = JSON.parse(response.content);
          const items = Array.isArray(parsed.refactorings) ? parsed.refactorings : [];

          const improvements: VibeImprovement[] = items.map((ref: any) => ({
            id: `refactor_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
            category: 'maintainability',
            description: ref.description || '',
            before: ref.before || '',
            after: ref.after || '',
            impact: 'positive',
            effort: 'medium'
          }));

          return improvements;
        } catch (e) {
          this.logger.warn('Refactor 解析失敗', e);
        }
      }
    } catch (error) {
      this.logger.error('Failed to suggest refactoring', error);
    }

    return [];
  }

  public async generateDocumentation(code: string, language: string, type: 'comment' | 'docstring' | 'readme'): Promise<string> {
    if (!this.config.enableDocumentation) return '';
    if (!this.openai) {
      this.logger.warn('OpenAIIntegration 未初始化，無法生成文件');
      return '';
    }

    try {
      const prompt = `Generate ${type} documentation for the following ${language} code:\n\n${code}\n`;

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

  public getSessionStats(sessionId: string): any {
    const session = this.sessions.get(sessionId);
    if (!session) return null;

    return {
      sessionId: session.id,
      filePath: session.filePath,
      language: session.language,
      duration: session.endTime ? session.endTime.getTime() - session.startTime.getTime() : Date.now() - session.startTime.getTime(),
      interactions: session.interactions.length,
      suggestions: session.suggestions.length,
      improvements: session.improvements.length,
      acceptedSuggestions: session.interactions.filter(i => i.accepted).length
    };
  }

  public getAllSessions(): VibeSession[] {
    return Array.from(this.sessions.values());
  }

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

  public isVibeCodingRunning(): boolean {
    return this.isRunning;
  }

  // 缺失的事件處理器 stub，避免未宣告錯誤
  private handleSessionStart(session: VibeSession): void {
    this.logger.debug('Session started event', { sessionId: session.id });
  }

  private handleSessionEnd(session: VibeSession): void {
    this.logger.debug('Session ended event', { sessionId: session.id });
  }
}
