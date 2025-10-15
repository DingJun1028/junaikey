/**
 * JunAiKey 萬能宇宙系統統一匯出
 * 整合所有萬能宇宙相關功能，提供統一的 API 介面
 */

export { OmniCosmicUniverse } from './OmniCosmicUniverse';
export { CosmicGenerator } from './index.tsx';

// 重新匯出類型定義
export type {
  AITableConfig,
  AITableRecord,
  SystemState,
  DatabaseConfig,
  SyncConfig
} from './types';

export type {
  BestPractice,
  BestPracticeRule,
  BestPracticeExample,
  BestPracticeResult,
  BestPracticeConfig
} from '../best-practices';

export type {
  DualDevelopmentConfig,
  GitBranch,
  PullRequest,
  Conflict,
  DevelopmentProgress
} from '../integration';

export type {
  VibeCodingConfig
} from '../cline';

// 重新匯出服務類
export { AITableIntegration } from './AITableIntegration';
export { AITableService } from './AITableService';
