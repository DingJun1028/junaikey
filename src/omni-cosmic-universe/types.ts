/**
 * 萬能世界卡牌互動系統類型定義
 * 符合四大宇宙公理的系統類型
 */

export type CardType = 'EVENT' | 'PROBLEM' | 'SOLUTION' | 'ARTIFACT' | 'UNIT' | 'PLANESWALKER';
export type ElementColor = '🔵' | '🔴' | '🟢' | '⚪' | '⚫' | '💫' | '🟡' | '🩶' | '🌪';
export type Rarity = 'COMMON' | 'UNCOMMON' | 'RARE' | 'MYTHIC' | 'LEGENDARY';
export type BalanceDimension = 'PERFORMANCE' | 'SECURITY' | 'MAINTAINABILITY';
export type Axiom = 'BALANCE' | 'CHRONICLE' | 'GRAVITY' | 'UNIFIED';
export type Pillar = 'SIMPLICITY' | 'SPEED' | 'STABILITY' | 'EVOLUTION';

// D3 生命周期数据节点类型
export interface LifecycleNode {
  id?: string;
  name: string;
  type: 'event' | 'problem' | 'solution';
  y: number;
  color?: ElementColor;
}

// D3 连接线类型
export interface LifecycleLink {
  source: { x: number; y: number };
  target: { x: number; y: number };
}

// 卡牌基础结构 (万能元钥原则)
export interface OmniKeyCard {
  id: string;
  name: string;
  type: CardType;
  color: ElementColor;
  rarity: Rarity;
  description: string;
  cosmicLink: {
    axiom: Axiom;
    pillar: Pillar;
  };
  commit: {
    author: string;
    cycle: string;
    purpose: string;
  };
}

// 事件卡 (从环境到感知)
export interface EventCard extends OmniKeyCard {
  triggerCondition: string;
  detectedBy: string; // 万能监控体或接口协议
  relatedModule: string; // 对应的万能同心圆模块
  timestamp: Date;
}

// 问题状况卡 (从感知到诊断)
export interface ProblemCard extends OmniKeyCard {
  severity: number; // 1-10级别
  impact: BalanceDimension[];
  causeAnalysis: string;
  relatedEventIds: string[];
}

// 问题解决卡 (从诊断到行动)
export interface SolutionCard extends OmniKeyCard {
  requiredResources: string[]; // 需要调用的资源/神器
  executingAgents: string[]; // 执行代理
  entropyReduction: number; // 预期熵减值
  chronicleRecord: boolean; // 是否创元实录
}

// 系统状态 (符合终始一如公理)
export interface SystemState {
  entropy: number; // 系统熵值 (越低越好)
  balance: {
    performance: number;
    security: number;
    maintainability: number;
  };
  cards: {
    events: EventCard[];
    problems: ProblemCard[];
    solutions: SolutionCard[];
  };
  evolution: {
    cycle: number;
    loyalty: number;
  };
}

// AITable 相关类型定义
export interface AITableRecord {
  id: string;
  title: string;
  content: string;
  category: string;
  tags: string[];
  timestamp: Date;
  source: 'junai' | 'user' | 'system' | 'external';
  confidence: number;
  metadata?: Record<string, any>;
}

export interface AITableConfig {
  baseId: string;
  tableName: string;
  apiKey: string;
  viewId?: string;
  syncEnabled: boolean;
  bidirectional: boolean;
}
