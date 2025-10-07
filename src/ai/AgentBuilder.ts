import { OpenAIIntegration } from './OpenAIIntegration';
import { ModelManager } from './ModelManager';
import { EventBus } from '../core/EventBus';

export interface AgentWorkflow {
  id: string;
  name: string;
  description: string;
  nodes: AgentNode[];
  edges: AgentEdge[];
  createdAt: Date;
  updatedAt: Date;
}

export interface AgentNode {
  id: string;
  type: 'llm' | 'tool' | 'condition' | 'knowledge' | 'logic';
  name: string;
  config: any;
  position: { x: number; y: number };
}

export interface AgentEdge {
  id: string;
  source: string;
  target: string;
  condition?: string;
}

export interface AgentConfig {
  model: string;
  tools: any[];
  knowledgeBase?: any[];
  logicFlow?: any[];
  guardrails?: any[];
}

export interface AgentBuilderConfig {
  workflowId?: string;
  defaultModel: string;
  enableDebug: boolean;
  eventBus: EventBus;
}

/**
 * Agent Builder - 視覺化代理工作流建構器
 * 整合 AgentKit 功能，提供視覺化介面和程式碼生成
 */
export class AgentBuilder {
  private workflow!: AgentWorkflow;
  private config: AgentBuilderConfig;
  private modelManager: ModelManager;
  private eventBus: EventBus;
  private debugEnabled: boolean;

  constructor(config: AgentBuilderConfig) {
    this.config = config;
    this.eventBus = config.eventBus;
    this.debugEnabled = config.enableDebug;
    this.modelManager = new ModelManager({
      provider: 'openai',
      model: config.defaultModel,
      apiKey: process.env.OPENAI_API_KEY || ''
    });

    this.initializeWorkflow();
  }

  /**
   * 初始化工作流
   */
  private initializeWorkflow(): void {
    this.workflow = {
      id: this.config.workflowId || this.generateWorkflowId(),
      name: 'New Agent Workflow',
      description: 'Created with Agent Builder',
      nodes: [],
      edges: [],
      createdAt: new Date(),
      updatedAt: new Date()
    };

    this.log('Agent workflow initialized', { workflowId: this.workflow.id });
  }

  /**
   * 生成工作流ID
   */
  private generateWorkflowId(): string {
    return `workflow_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }

  /**
   * 添加節點
   */
  public addNode(node: Omit<AgentNode, 'id'>): string {
    const nodeId = `node_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    const newNode: AgentNode = {
      ...node,
      id: nodeId
    };

    this.workflow.nodes.push(newNode);
    this.workflow.updatedAt = new Date();

    this.log('Node added', { nodeId: newNode.id, type: node.type });
    this.eventBus.emit('node_added', newNode);

    return nodeId;
  }

  /**
   * 添加邊
   */
  public addEdge(edge: Omit<AgentEdge, 'id'>): string {
    const edgeId = `edge_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    const newEdge: AgentEdge = {
      ...edge,
      id: edgeId
    };

    this.workflow.edges.push(newEdge);
    this.workflow.updatedAt = new Date();

    this.log('Edge added', { edgeId: newEdge.id, source: edge.source, target: edge.target });
    this.eventBus.emit('edge_added', newEdge);

    return edgeId;
  }

  /**
   * 移除節點
   */
  public removeNode(nodeId: string): boolean {
    const nodeIndex = this.workflow.nodes.findIndex(node => node.id === nodeId);
    if (nodeIndex === -1) return false;

    // 移除相關的邊
    this.workflow.edges = this.workflow.edges.filter(
      edge => edge.source !== nodeId && edge.target !== nodeId
    );

    this.workflow.nodes.splice(nodeIndex, 1);
    this.workflow.updatedAt = new Date();

    this.log('Node removed', { nodeId });
    this.eventBus.emit('node_removed', { nodeId });

    return true;
  }

  /**
   * 移除邊
   */
  public removeEdge(edgeId: string): boolean {
    const edgeIndex = this.workflow.edges.findIndex(edge => edge.id === edgeId);
    if (edgeIndex === -1) return false;

    this.workflow.edges.splice(edgeIndex, 1);
    this.workflow.updatedAt = new Date();

    this.log('Edge removed', { edgeId });
    this.eventBus.emit('edge_removed', { edgeId });

    return true;
  }

  /**
   * 更新節點配置
   */
  public updateNode(nodeId: string, config: any): boolean {
    const node = this.workflow.nodes.find(n => n.id === nodeId);
    if (!node) return false;

    node.config = { ...node.config, ...config };
    this.workflow.updatedAt = new Date();

    this.log('Node updated', { nodeId, config });
    this.eventBus.emit('node_updated', { nodeId, config });

    return true;
  }

  /**
   * 獲取工作流
   */
  public getWorkflow(): AgentWorkflow {
    return { ...this.workflow };
  }

  /**
   * 設置工作流配置
   */
  public setWorkflowConfig(config: AgentConfig): void {
    this.workflow.description = `Configured with model: ${config.model}`;
    this.workflow.updatedAt = new Date();

    this.log('Workflow configured', { config });
    this.eventBus.emit('workflow_configured', config);
  }

  /**
   * 生成代理代碼
   */
  public generateAgentCode(language: 'typescript' | 'python' | 'javascript'): string {
    const template = this.getLanguageTemplate(language);
    const code = template
      .replace('{{WORKFLOW_ID}}', this.workflow.id)
      .replace('{{MODEL_NAME}}', this.config.defaultModel)
      .replace('{{NODES}}', JSON.stringify(this.workflow.nodes, null, 2))
      .replace('{{EDGES}}', JSON.stringify(this.workflow.edges, null, 2));

    this.log('Agent code generated', { language, workflowId: this.workflow.id });
    this.eventBus.emit('code_generated', { 
      language, 
      code, 
      workflowId: this.workflow.id 
    });

    return code;
  }

  /**
   * 獲取語言模板
   */
  private getLanguageTemplate(language: string): string {
    const templates: Record<string, string> = {
      typescript: `
import { Agent } from '@openai/agents';

const agent = new Agent({
  name: "JunAiKey Agent",
  instructions: "You are a helpful assistant built with Agent Builder.",
  model: "{{MODEL_NAME}}",
  tools: [
    // Tools will be inserted here
  ],
  knowledge_base: [
    // Knowledge base will be inserted here
  ],
  workflow: {
    id: "{{WORKFLOW_ID}}",
    nodes: {{NODES}},
    edges: {{EDGES}}
  }
});

// Export the agent
export default agent;
`,
      python: `
from agents import Agent

agent = Agent(
    name="JunAiKey Agent",
    instructions="You are a helpful assistant built with Agent Builder.",
    model="{{MODEL_NAME}}",
    tools=[
        # Tools will be inserted here
    ],
    knowledge_base=[
        # Knowledge base will be inserted here
    ],
    workflow={
        "id": "{{WORKFLOW_ID}}",
        "nodes": {{NODES}},
        "edges": {{EDGES}}
    }
)

# Export the agent
__all__ = ["agent"]
`,
      javascript: `
const { Agent } = require('@openai/agents');

const agent = new Agent({
  name: "JunAiKey Agent",
  instructions: "You are a helpful assistant built with Agent Builder.",
  model: "{{MODEL_NAME}}",
  tools: [
    // Tools will be inserted here
  ],
  knowledge_base: [
    // Knowledge base will be inserted here
  ],
  workflow: {
    id: "{{WORKFLOW_ID}}",
    nodes: {{NODES}},
    edges: {{EDGES}}
  }
});

// Export the agent
module.exports = agent;
`
    };

    return templates[language] || templates.typescript;
  }

  /**
   * 部署代理到 ChatKit
   */
  public async deployToChatKit(): Promise<string> {
    try {
      const chatKitConfig = {
        workflowId: this.workflow.id,
        nodes: this.workflow.nodes,
        edges: this.workflow.edges,
        model: this.config.defaultModel
      };

      // 這裡可以實現實際的 ChatKit 部署邏輯
      const deploymentId = await this.simulateChatKitDeployment(chatKitConfig);

      this.log('Agent deployed to ChatKit', { 
        deploymentId, 
        workflowId: this.workflow.id 
      });
      this.eventBus.emit('agent_deployed', { 
        deploymentId, 
        workflowId: this.workflow.id 
      });

      return deploymentId;
    } catch (error) {
      console.error('Failed to deploy agent to ChatKit:', error);
      throw error;
    }
  }

  /**
   * 模擬 ChatKit 部署
   */
  private async simulateChatKitDeployment(config: any): Promise<string> {
    // 模擬部署過程
    await new Promise(resolve => setTimeout(resolve, 1000));
    return `deployment_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }

  /**
   * 評估代理性能
   */
  public async evaluateAgent(testData: any[]): Promise<any> {
    try {
      const evaluationResults = {
        workflowId: this.workflow.id,
        totalTests: testData.length,
        passedTests: 0,
        failedTests: 0,
        averageResponseTime: 0,
        successRate: 0
      };

      // 模擬測試執行
      for (const test of testData) {
        const startTime = Date.now();
        const result = await this.runTest(test);
        const responseTime = Date.now() - startTime;

        if (result.success) {
          evaluationResults.passedTests++;
        } else {
          evaluationResults.failedTests++;
        }

        evaluationResults.averageResponseTime += responseTime;
      }

      // 計算平均響應時間和成功率
      evaluationResults.averageResponseTime = 
        evaluationResults.averageResponseTime / evaluationResults.totalTests;
      evaluationResults.successRate = 
        evaluationResults.passedTests / evaluationResults.totalTests;

      this.log('Agent evaluation completed', evaluationResults);
      this.eventBus.emit('agent_evaluated', evaluationResults);

      return evaluationResults;
    } catch (error) {
      console.error('Failed to evaluate agent:', error);
      throw error;
    }
  }

  /**
   * 運行單個測試
   */
  private async runTest(test: any): Promise<any> {
    // 模擬測試運行
    await new Promise(resolve => setTimeout(resolve, Math.random() * 1000 + 500));
    
    return {
      success: Math.random() > 0.2, // 80% 成功率
      responseTime: Math.random() * 2000 + 1000,
      result: test
    };
  }

  /**
   * 日誌記錄
   */
  private log(message: string, data?: any): void {
    if (this.debugEnabled) {
      console.log(`[AgentBuilder] ${message}`, data || '');
    }
  }
}
