/**
 * JunAiKey 雙線開發整合系統統一匯出
 * 整合所有雙線開發相關功能，提供統一的 API 介面
 */

export { DualDevelopmentManager } from './DualDevelopmentManager';

// 重新匯出類型定義
export type {
  DualDevelopmentConfig,
  GitBranch,
  PullRequest,
  Conflict,
  DevelopmentProgress
} from './DualDevelopmentManager';
