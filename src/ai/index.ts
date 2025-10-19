/**
 * JunAiKey AI 模組統一匯出
 * 整合所有 AI 相關功能，提供統一的 API 介面
 */

export { OpenAIIntegration } from './OpenAIIntegration';
export { ModelManager } from './ModelManager';
export { AgentBuilder } from './AgentBuilder';
export { AgentManager } from './AgentManager';
export { AgentCoordinator } from './AgentCoordinator';
export { BranchManager } from './BranchManager';

// 重新匯出類型定義
export type {
  OpenAIConfig,
  ChatMessage,
  FunctionTool,
  WebSearchTool,
  FileSearchTool,
  MCPTool,
  Tool,
  ChatOptions,
  ChatResponse
} from './OpenAIIntegration';

export type {
  ModelProvider,
  ModelConfig
} from './ModelManager';

export type {
  AgentWorkflow,
  AgentNode,
  AgentEdge,
  AgentConfig,
  AgentBuilderConfig
} from './AgentBuilder';

export type {
  Agent,
  AgentRunConfig,
  AgentRunResult,
  AgentStats
} from './AgentManager';

export type {
  Task,
  TaskValidationResult,
  ValidationIssue,
  ConflictResolution
} from './AgentCoordinator';

export type {
  Branch,
  MergeRequest,
  MergeConflict,
  MergeResult
} from './BranchManager';
