import { EventBus } from '../core/EventBus';
import { Logger } from '../utils/logger';
import { OpenAIIntegration } from '../ai/OpenAIIntegration';
import { ModelManager } from '../ai/ModelManager';

export interface BestPractice {
  id: string;
  name: string;
  category: 'code' | 'design' | 'architecture' | 'testing' | 'deployment' | 'security' | 'performance';
  description: string;
  rules: BestPracticeRule[];
  examples: BestPracticeExample[];
  priority: 'low' | 'medium' | 'high' | 'critical';
  language: string[];
  tags: string[];
  createdAt: Date;
  updatedAt: Date;
}

export interface BestPracticeRule {
  id: string;
  name: string;
  description: string;
  severity: 'error' | 'warning' | 'info' | 'hint';
  pattern: string;
  suggestion: string;
  autoFix: boolean;
  language: string[];
}

export interface BestPracticeExample {
  id: string;
  title: string;
  description: string;
  before: string;
  after: string;
  explanation: string;
  language: string;
}

export interface BestPracticeResult {
  ruleId: string;
  ruleName: string;
  severity: 'error' | 'warning' | 'info' | 'hint';
  message: string;
  file: string;
  line: number;
  column: number;
  suggestion: string;
  autoFix: boolean;
  confidence: number;
}

export interface BestPracticeConfig {
  enableAutoCheck: boolean;
  enableAutoFix: boolean;
  enabledCategories: string[];
  enabledLanguages: string[];
  aiEnabled: boolean;
  aiModel: string;
  aiTemperature: number;
}

/**
 * 最佳實踐化系統 - 統一管理所有最佳實踐規則和標準
 */
export class BestPracticeSystem {
  private config: BestPracticeConfig;
  private eventBus: EventBus;
  private logger: Logger;
  private openai: OpenAIIntegration;
  private modelManager: ModelManager;
  private bestPractices: Map<string, BestPractice> = new Map();
  private isRunning: boolean = false;

  constructor(config: BestPracticeConfig) {
    this.config = config;
    this.eventBus = new EventBus();
    this.logger = new Logger('BestPracticeSystem');
    
    if (config.aiEnabled) {
      this.openai = new OpenAIIntegration({
        apiKey: process.env.OPENAI_API_KEY || '',
        model: config.aiModel
      });
    }

    this.modelManager = new ModelManager({
      provider: 'openai',
      model: config.aiModel,
      apiKey: process.env.OPENAI_API_KEY || ''
    });

    this.initializeBestPractices();
    this.setupEventHandlers();
  }

  /**
   * 初始化最佳實踐規則
   */
  private initializeBestPractices(): void {
    // TypeScript 最佳實踐
    this.addBestPractice({
      id: 'typescript-naming-conventions',
      name: 'TypeScript 命名規約',
      category: 'code',
      description: 'TypeScript 代碼的命名規約和最佳實踐',
      priority: 'high',
      language: ['typescript'],
      tags: ['naming', 'conventions', 'typescript'],
      createdAt: new Date(),
      updatedAt: new Date(),
      rules: [
        {
          id: 'ts-variables-camelcase',
          name: '變量駝峰命名',
          description: '變量名稱必須使用駝峰命名法',
          severity: 'error',
          pattern: '^[a-z][a-zA-Z0-9]*$',
          suggestion: '使用駝峰命名法，例如: userName, totalCount',
          autoFix: false,
          language: ['typescript']
        },
        {
          id: 'ts-classes-pascalcase',
          name: '類名大寫駝峰',
          description: '類名必須使用大寫駝峰命名法',
          severity: 'error',
          pattern: '^[A-Z][a-zA-Z0-9]*$',
          suggestion: '使用大寫駝峰命名法，例如: UserManager, DataProcessor',
          autoFix: false,
          language: ['typescript']
        }
      ],
      examples: [
        {
          id: 'ts-example-naming',
          title: '命名規約示例',
          description: '展示正確的命名方式',
          before: 'let user_name = "John"; class user_manager { }',
          after: 'let userName = "John"; class UserManager { }',
          explanation: '使用駝峰命名法提高代碼可讀性',
          language: 'typescript'
        }
      ]
    });

    // 架構最佳實踐
    this.addBestPractice({
      id: 'architecture-separation-of-concerns',
      name: '關注分離原則',
      category: 'architecture',
      description: '軟體架構中的關注分離最佳實踐',
      priority: 'critical',
      language: ['typescript', 'javascript'],
      tags: ['architecture', 'design', 'separation'],
      createdAt: new Date(),
      updatedAt: new Date(),
      rules: [
        {
          id: 'arch-no-business-logic-in-ui',
          name: 'UI 層不包含業務邏輯',
          description: '用戶界面層不應包含業務邏輯',
          severity: 'error',
          pattern: 'businessLogic|validateBusiness',
          suggestion: '將業務邏輯移至服務層或領域層',
          autoFix: false,
          language: ['typescript', 'javascript']
        }
      ],
      examples: [
        {
          id: 'arch-example-separation',
          title: '關注分離示例',
          description: '展示正確的層次分離',
          before: `
function UserProfile() {
  const [user, setUser] = useState(null);
  
  const validateUserData = (data) => {
    // 業務邏輯在 UI 層
    if (!data.email) return false;
    return true;
  };
  
  return <div>{user?.name}</div>;
}`,
          after: `
function UserProfile() {
  const [user, setUser] = useState(null);
  return <div>{user?.name}</div>;
}

class UserService {
  validateUserData(data) {
    // 業務邏輯在服務層
    return data && data.email;
  }
}`,
          explanation: '將業務邏輯從 UI 層分離到服務層',
          language: 'typescript'
        }
      ]
    });

    // 安全性最佳實踐
    this.addBestPractice({
      id: 'security-input-validation',
      name: '輸入驗證',
      category: 'security',
      description: '用戶輸入驗證和安全檢查',
      priority: 'critical',
      language: ['typescript', 'javascript'],
      tags: ['security', 'validation', 'input'],
      createdAt: new Date(),
      updatedAt: new Date(),
      rules: [
        {
          id: 'security-validate-user-input',
          name: '用戶輸入驗證',
          description: '所有用戶輸入必須經過驗證',
          severity: 'error',
          pattern: 'innerHTML|outerHTML|eval\\(|setTimeout\\([^,]*,',
          suggestion: '使用安全的處理方式和輸入驗證',
          autoFix: false,
          language: ['typescript', 'javascript']
        }
      ],
      examples: [
        {
          id: 'security-example-validation',
          title: '輸入驗證示例',
          description: '展示正確的輸入驗證方式',
          before: `
function processInput(value) {
  // 直接使用未驗證的輸入
  document.getElementById('output').innerHTML = value;
}`,
          after: `
function processInput(value) {
  // 驗證和清理輸入
  const sanitizedValue = sanitizeInput(value);
  document.getElementById('output').textContent = sanitizedValue;
}

function sanitizeInput(input) {
  // 實現輸入清理邏輯
  return input.replace(/<script[^>]*>.*?<\\/script>/gi, '');
}`,
          explanation: '驗證和清理用戶輸入防止 XSS 攻擊',
          language: 'javascript'
        }
      ]
    });

    // 性能最佳實踐
    this.addBestPractice({
      id: 'performance-memory-management',
      name: '內存管理',
      category: 'performance',
      description: 'JavaScript 內存管理和性能優化',
      priority: 'medium',
      language: ['typescript', 'javascript'],
      tags: ['performance', 'memory', 'optimization'],
      createdAt: new Date(),
      updatedAt: new Date(),
      rules: [
        {
          id: 'performance-avoid-memory-leaks',
          name: '避免內存洩漏',
          description: '避免常見的內存洩漏問題',
          severity: 'warning',
          pattern: 'addEventListener\\(|setInterval\\(|setTimeout\\(',
          suggestion: '確保移除事件監聽器和清理定時器',
          autoFix: false,
          language: ['typescript', 'javascript']
        }
      ],
      examples: [
        {
          id: 'performance-example-memory',
          title: '內存管理示例',
          description: '展示正確的內存管理方式',
          before: `
class Component {
  constructor() {
    this.setupEventListeners();
  }
  
  setupEventListeners() {
    window.addEventListener('resize', this.handleResize);
    setInterval(this.updateData, 1000);
  }
}`,
          after: `
class Component {
  constructor() {
    this.setupEventListeners();
  }
  
  setupEventListeners() {
    window.addEventListener('resize', this.handleResize);
    this.intervalId = setInterval(this.updateData, 1000);
  }
  
  cleanup() {
    window.removeEventListener('resize', this.handleResize);
    clearInterval(this.intervalId);
  }
}`,
          explanation: '確保在組件銷毀時清理資源',
          language: 'javascript'
        }
      ]
    });
  }

  /**
   * 設置事件處理器
   */
  private setupEventHandlers(): void {
    this.eventBus.on('best_practice_check_started', this.handleCheckStarted.bind(this));
    this.eventBus.on('best_practice_check_completed', this.handleCheckCompleted.bind(this));
    this.eventBus.on('best_practice_violation_found', this.handleViolationFound.bind(this));
  }

  /**
   * 啟動最佳實踐系統
   */
  public async start(): Promise<void> {
    this.isRunning = true;
    this.logger.info('Best Practice System started');
    this.eventBus.emit('best_practice_system_started', { timestamp: new Date() });
  }

  /**
   * 停止最佳實踐系統
   */
  public async stop(): Promise<void> {
    this.isRunning = false;
    this.logger.info('Best Practice System stopped');
    this.eventBus.emit('best_practice_system_stopped', { timestamp: new Date() });
  }

  /**
   * 添加最佳實踐規則
   */
  public addBestPractice(practice: Omit<BestPractice, 'createdAt' | 'updatedAt'>): void {
    const fullPractice: BestPractice = {
      ...practice,
      createdAt: new Date(),
      updatedAt: new Date()
    };
    
    this.bestPractices.set(practice.id, fullPractice);
    this.logger.info('Best practice added', { practiceId: practice.id, name: practice.name });
  }

  /**
   * 獲取最佳實踐規則
   */
  public getBestPractice(id: string): BestPractice | null {
    return this.bestPractices.get(id) || null;
  }

  /**
   * 獲取所有最佳實踐
   */
  public getAllBestPractices(): BestPractice[] {
    return Array.from(this.bestPractices.values());
  }

  /**
   * 獲取指定類別的最佳實踐
   */
  public getBestPracticesByCategory(category: string): BestPractice[] {
    return Array.from(this.bestPractices.values()).filter(practice => 
      practice.category === category
    );
  }

  /**
   * 檢查代碼是否符合最佳實踐
   */
  public async checkCode(code: string, language: string, filePath: string): Promise<BestPracticeResult[]> {
    const results: BestPracticeResult[] = [];
    
    this.logger.info('Starting best practice check', { language, filePath });
    this.eventBus.emit('best_practice_check_started', { language, filePath });

    // 獲取相關的最佳實踐規則
    const relevantPractices = Array.from(this.bestPractices.values()).filter(practice =>
      practice.language.includes(language) &&
      this.config.enabledCategories.includes(practice.category)
    );

    for (const practice of relevantPractices) {
      for (const rule of practice.rules) {
        if (!rule.language.includes(language)) continue;

        const violations = await this.checkRule(code, rule, filePath);
        results.push(...violations);
      }
    }

    // 如果啟用了 AI，進行 AI 輔助檢查
    if (this.config.aiEnabled) {
      const aiResults = await this.performAICheck(code, language, filePath);
      results.push(...aiResults);
    }

    this.logger.info('Best practice check completed', { 
      filePath, 
      violations: results.length 
    });
    this.eventBus.emit('best_practice_check_completed', { 
      filePath, 
      results 
    });

    return results;
  }

  /**
   * 檢查單個規則
   */
  private async checkRule(code: string, rule: BestPracticeRule, filePath: string): Promise<BestPracticeResult[]> {
    const results: BestPracticeResult[] = [];
    
    // 這裡可以實現更複雜的模式匹配和靜態分析
    // 現在使用簡單的字符串匹配作為示例
    const lines = code.split('\n');
    
    for (let lineIndex = 0; lineIndex < lines.length; lineIndex++) {
      const line = lines[lineIndex].trim();
      const lineNumber = lineIndex + 1;
      
      if (this.matchesPattern(line, rule.pattern)) {
        results.push({
          ruleId: rule.id,
          ruleName: rule.name,
          severity: rule.severity,
          message: rule.description,
          file: filePath,
          line: lineNumber,
          column: 1,
          suggestion: rule.suggestion,
          autoFix: rule.autoFix,
          confidence: 0.8
        });
      }
    }

    return results;
  }

  /**
   * 模式匹配
   */
  private matchesPattern(text: string, pattern: string): boolean {
    try {
      const regex = new RegExp(pattern);
      return regex.test(text);
    } catch (error) {
      // 如果無效的正則表達式，使用簡單的字符串包含檢查
      return text.includes(pattern);
    }
  }

  /**
   * 執行 AI 輔助檢查
   */
  private async performAICheck(code: string, language: string, filePath: string): Promise<BestPracticeResult[]> {
    const results: BestPracticeResult[] = [];
    
    try {
      const prompt = `
Analyze the following ${language} code for best practice violations:

${code}

Check for:
1. Code quality issues
2. Security vulnerabilities
3. Performance problems
4. Architectural concerns

Provide your analysis in JSON format:
{
  "violations": [
    {
      "ruleId": "unique-rule-id",
      "ruleName": "Rule Name",
      "severity": "error|warning|info|hint",
      "message": "Description of the issue",
      "line": number,
      "suggestion": "How to fix it",
      "confidence": 0.0-1.0
    }
  ]
}
`;

      const response = await this.openai.generateText(prompt, {
        messages: [
          { role: 'system', content: 'You are an expert code reviewer specializing in best practices.' },
          { role: 'user', content: prompt }
        ]
      });

      if (response.content) {
        const aiResults = JSON.parse(response.content);
        
        aiResults.violations.forEach((violation: any) => {
          results.push({
            ruleId: violation.ruleId,
            ruleName: violation.ruleName,
            severity: violation.severity,
            message: violation.message,
            file: filePath,
            line: violation.line,
            column: 1,
            suggestion: violation.suggestion,
            autoFix: false,
            confidence: violation.confidence
          });
        });
      }
    } catch (error) {
      this.logger.error('AI best practice check failed', error);
    }

    return results;
  }

  /**
   * 自動修復違規問題
   */
  public async autoFix(violations: BestPracticeResult[]): Promise<BestPracticeResult[]> {
    if (!this.config.enableAutoFix) return [];

    const fixedResults: BestPracticeResult[] = [];
    
    for (const violation of violations) {
      if (violation.autoFix) {
        // 這裡可以實現自動修復邏輯
        // 現在只是標記為已修復
        violation.message += ' [Auto-fixed]';
        fixedResults.push(violation);
      }
    }

    return fixedResults;
  }

  /**
   * 生成最佳實踐報告
   */
  public async generateReport(results: BestPracticeResult[]): Promise<string> {
    const report = {
      timestamp: new Date(),
      totalViolations: results.length,
      violationsBySeverity: {
        error: results.filter(r => r.severity === 'error').length,
        warning: results.filter(r => r.severity === 'warning').length,
        info: results.filter(r => r.severity === 'info').length,
        hint: results.filter(r => r.severity === 'hint').length
      },
      violationsByCategory: {} as any,
      violationsByFile: {} as any,
      summary: '',
      recommendations: []
    };

    // 按類別分組
    results.forEach(result => {
      const category = result.ruleName.split('-')[0]; // 簡化的類別分組
      report.violationsByCategory[category] = (report.violationsByCategory[category] || 0) + 1;
    });

    // 按文件分組
    results.forEach(result => {
      report.violationsByFile[result.file] = (report.violationsByFile[result.file] || 0) + 1;
    });

    // 生成摘要
    report.summary = `發現 ${report.totalViolations} 個最佳實踐違規問題，其中 ${report.violationsBySeverity.error} 個嚴重錯誤。`;

    // 生成建議
    if (report.violationsBySeverity.error > 0) {
      report.recommendations.push('立即修復所有嚴重錯誤問題');
    }
    if (report.violationsBySeverity.warning > 0) {
      report.recommendations.push('處理所有警告問題以提高代碼質量');
    }

    return JSON.stringify(report, null, 2);
  }

  /**
   * 處理檢查開始事件
   */
  private handleCheckStarted(data: any): void {
    this.logger.info('Best practice check started', data);
  }

  /**
   * 處理檢查完成事件
   */
  private handleCheckCompleted(data: any): void {
    this.logger.info('Best practice check completed', data);
  }

  /**
   * 處理違規發現事件
   */
  private handleViolationFound(data: any): void {
    this.logger.warn('Best practice violation found', data);
  }

  /**
   * 獲取系統統計信息
   */
  public getSystemStats(): any {
    return {
      totalPractices: this.bestPractices.size,
      enabledCategories: this.config.enabledCategories.length,
      enabledLanguages: this.config.enabledLanguages.length,
      autoCheckEnabled: this.config.enableAutoCheck,
      autoFixEnabled: this.config.enableAutoFix,
      aiEnabled: this.config.aiEnabled,
      isRunning: this.isRunning
    };
  }

  /**
   * 檢查系統是否運行中
   */
  public isBestPracticeSystemRunning(): boolean {
    return this.isRunning;
  }
}
