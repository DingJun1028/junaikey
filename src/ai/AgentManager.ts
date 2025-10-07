import { AgentBuilder } from './AgentBuilder';
import { OpenAIIntegration } from './OpenAIIntegration';
import { ModelManager } from './ModelManager';
import { EventBus } from '../core/EventBus';
import { Logger } from '../utils/logger';

export interface Agent {
  id: string;
  name: string;
  description: string;
  workflow: any;
  model: string;
  status: 'active' | 'inactive' | 'error';
  createdAt: Date;
  updatedAt: Date;
  lastRun?: Date;
}

export interface AgentRunConfig {
  agentId: string;
  input: any;
  parameters?: any;
  timeout?: number;
}

export interface AgentRunResult {
  success: boolean;
  output?: any;
  error?: string;
  executionTime: number;
  timestamp: Date;
}

export interface AgentStats {
  totalAgents: number;
  activeAgents: number;
  totalRuns: number;
  averageExecutionTime: number;
  successRate: number;
}

/**
 * Agent Manager - 統一管理所有代理的執行和生命週期
 */
export class AgentManager {
  private agents: Map<string, Agent> = new Map();
  private agentBuilder: AgentBuilder;
  private modelManager: ModelManager;
  private eventBus: EventBus;
  private logger: Logger;
  private isRunning: boolean = false;

  constructor(config: {
    eventBus: EventBus;
    defaultModel: string;
    enableDebug: boolean;
  }) {
    this.eventBus = config.eventBus;
    this.logger = new Logger('AgentManager');
    this.modelManager = new ModelManager({
      provider: 'openai',
      model: config.defaultModel,
      apiKey: process.env.OPENAI_API_KEY || ''
    });

    this.agentBuilder = new AgentBuilder({
      defaultModel: config.defaultModel,
      enableDebug: config.enableDebug,
      eventBus: config.eventBus
    });

    this.setupEventHandlers();
  }

  /**
   * 設置事件處理器
   */
  private setupEventHandlers(): void {
    this.eventBus.on('agent_created', this.handleAgentCreated.bind(this));
    this.eventBus.on('agent_updated', this.handleAgentUpdated.bind(this));
    this.eventBus.on('agent_deleted', this.handleAgentDeleted.bind(this));
    this.eventBus.on('agent_run', this.handleAgentRun.bind(this));
  }

  /**
   * 處理代理創建事件
   */
  private handleAgentCreated(agent: Agent): void {
    this.logger.info('Agent created', { agentId: agent.id, name: agent.name });
  }

  /**
   * 處理代理更新事件
   */
  private handleAgentUpdated(agent: Agent): void {
    this.logger.info('Agent updated', { agentId: agent.id, name: agent.name });
  }

  /**
   * 處理代理刪除事件
   */
  private handleAgentDeleted(agentId: string): void {
    this.logger.info('Agent deleted', { agentId });
  }

  /**
   * 處理代理運行事件
   */
  private handleAgentRun(result: AgentRunResult): void {
    this.logger.info('Agent run completed', { 
      agentId: result.agentId,
      success: result.success,
      executionTime: result.executionTime 
    });
  }

  /**
   * 創建新代理
   */
  public async createAgent(config: {
    name: string;
    description: string;
    workflow: any;
    model: string;
  }): Promise<string> {
    const agentId = `agent_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    
    const agent: Agent = {
      id: agentId,
      name: config.name,
      description: config.description,
      workflow: config.workflow,
      model: config.model,
      status: 'inactive',
      createdAt: new Date(),
      updatedAt: new Date()
    };

    this.agents.set(agentId, agent);
    this.eventBus.emit('agent_created', agent);

    this.logger.info('Agent created successfully', { 
      agentId, 
      name: config.name 
    });

    return agentId;
  }

  /**
   * 獲取代理
   */
  public getAgent(agentId: string): Agent | null {
    return this.agents.get(agentId) || null;
  }

  /**
   * 獲取所有代理
   */
  public getAllAgents(): Agent[] {
    return Array.from(this.agents.values());
  }

  /**
   * 更新代理
   */
  public async updateAgent(
    agentId: string, 
    updates: Partial<Agent>
  ): Promise<boolean> {
    const agent = this.agents.get(agentId);
    if (!agent) return false;

    const updatedAgent = { ...agent, ...updates, updatedAt: new Date() };
    this.agents.set(agentId, updatedAgent);
    
    this.eventBus.emit('agent_updated', updatedAgent);
    this.logger.info('Agent updated successfully', { agentId });

    return true;
  }

  /**
   * 刪除代理
   */
  public async deleteAgent(agentId: string): Promise<boolean> {
    const agent = this.agents.get(agentId);
    if (!agent) return false;

    this.agents.delete(agentId);
    this.eventBus.emit('agent_deleted', agentId);
    this.logger.info('Agent deleted successfully', { agentId });

    return true;
  }

  /**
   * 啟動代理
   */
  public async startAgent(agentId: string): Promise<boolean> {
    const agent = this.agents.get(agentId);
    if (!agent) return false;

    agent.status = 'active';
    agent.updatedAt = new Date();
    
    this.agents.set(agentId, agent);
    this.eventBus.emit('agent_started', agent);
    
    this.logger.info('Agent started', { agentId, name: agent.name });
    return true;
  }

  /**
   * 停止代理
   */
  public async stopAgent(agentId: string): Promise<boolean> {
    const agent = this.agents.get(agentId);
    if (!agent) return false;

    agent.status = 'inactive';
    agent.updatedAt = new Date();
    
    this.agents.set(agentId, agent);
    this.eventBus.emit('agent_stopped', agent);
    
    this.logger.info('Agent stopped', { agentId, name: agent.name });
    return true;
  }

  /**
   * 運行代理
   */
  public async runAgent(config: AgentRunConfig): Promise<AgentRunResult> {
    const startTime = Date.now();
    const agent = this.agents.get(config.agentId);
    
    if (!agent) {
      return {
        success: false,
        error: 'Agent not found',
        executionTime: Date.now() - startTime,
        timestamp: new Date()
      };
    }

    if (agent.status !== 'active') {
      return {
        success: false,
        error: 'Agent is not active',
        executionTime: Date.now() - startTime,
        timestamp: new Date()
      };
    }

    try {
      const result = await this.executeAgent(agent, config);
      
      // 更新代理狀態
      agent.lastRun = new Date();
      this.agents.set(config.agentId, agent);

      const runResult: AgentRunResult = {
        success: true,
        output: result,
        executionTime: Date.now() - startTime,
        timestamp: new Date()
      };

      this.eventBus.emit('agent_run', runResult);
      return runResult;
    } catch (error) {
      const runResult: AgentRunResult = {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
        executionTime: Date.now() - startTime,
        timestamp: new Date()
      };

      this.eventBus.emit('agent_run', runResult);
      return runResult;
    }
  }

  /**
   * 執行代理邏輯
   */
  private async executeAgent(agent: Agent, config: AgentRunConfig): Promise<any> {
    const openai = new OpenAIIntegration({
      apiKey: process.env.OPENAI_API_KEY || '',
      model: agent.model
    });

    // 根據代理類型執行不同的邏輯
    switch (agent.workflow.type) {
      case 'chat':
        return await openai.generateText(config.input, {
          messages: agent.workflow.messages || [],
          tools: agent.workflow.tools || []
        });

      case 'analysis':
        if (agent.workflow.imageAnalysis) {
          return await openai.analyzeImage(
            config.input.imageUrl,
            config.input.question,
            agent.model
          );
        }

        if (agent.workflow.fileAnalysis) {
          return await openai.analyzeFile(
            config.input.fileUrl,
            config.input.question,
            agent.model
          );
        }

        return await openai.generateText(config.input, {
          messages: agent.workflow.messages || []
        });

      case 'workflow':
        return await this.executeWorkflow(agent, config);

      default:
        throw new Error(`Unknown agent type: ${agent.workflow.type}`);
    }
  }

  /**
   * 執行工作流代理
   */
  private async executeWorkflow(agent: Agent, config: AgentRunConfig): Promise<any> {
    const workflow = agent.workflow;
    let currentStep = 0;
    let result = config.input;

    for (const step of workflow.steps) {
      const openai = new OpenAIIntegration({
        apiKey: process.env.OPENAI_API_KEY || '',
        model: step.model || agent.model
      });

      switch (step.type) {
        case 'generate':
          const generateResult = await openai.generateText(result, {
            messages: step.messages || []
          });
          result = generateResult.content;
          break;

        case 'analyze':
          if (step.imageAnalysis) {
            const analyzeResult = await openai.analyzeImage(
              step.imageUrl,
              step.question,
              step.model || agent.model
            );
            result = analyzeResult.content;
          }
          break;

        case 'function_call':
          const functionResult = await openai.useTools(
            result,
            step.tools || [],
            step.model || agent.model
          );
          result = functionResult.content;
          break;
      }

      currentStep++;
    }

    return result;
  }

  /**
   * 批量運行代理
   */
  public async runAgents(configs: AgentRunConfig[]): Promise<AgentRunResult[]> {
    const results: AgentRunResult[] = [];
    
    for (const config of configs) {
      const result = await this.runAgent(config);
      results.push(result);
    }

    return results;
  }

  /**
   * 獲取代理統計信息
   */
  public getAgentStats(): AgentStats {
    const agents = Array.from(this.agents.values());
    const activeAgents = agents.filter(a => a.status === 'active').length;
    
    // 這裡可以從歷史記錄中計算統計信息
    const stats: AgentStats = {
      totalAgents: agents.length,
      activeAgents,
      totalRuns: 0, // 需要從歷史記錄中獲取
      averageExecutionTime: 0, // 需要從歷史記錄中計算
      successRate: 0 // 需要從歷史記錄中計算
    };

    return stats;
  }

  /**
   * 啟動代理管理器
   */
  public async start(): Promise<void> {
    this.isRunning = true;
    this.logger.info('Agent Manager started');
    this.eventBus.emit('agent_manager_started', { timestamp: new Date() });
  }

  /**
   * 停止代理管理器
   */
  public async stop(): Promise<void> {
    this.isRunning = false;
    this.logger.info('Agent Manager stopped');
    this.eventBus.emit('agent_manager_stopped', { timestamp: new Date() });
  }

  /**
   * 檢查管理器狀態
   */
  public isRunning(): boolean {
    return this.isRunning;
  }
}
