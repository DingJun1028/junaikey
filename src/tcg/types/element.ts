/**
 * TCG 萬能矩陣・元素系統類型定義
 * 基於《JunAiKey 聖典》三位一體・宇宙總綱 (v8.1)
 * 實現十二大元素的完整定義
 */

// 十二大元素枚舉
export enum Element {
  FIRE = 'fire',          // 火 - 熱情、行動、破壞
  WATER = 'water',        // 水 - 思緒、流動、感知
  EARTH = 'earth',        // 土 - 穩定、根基、防禦
  WIND = 'wind',          // 風 - 自由、變化、速度
  THUNDER = 'thunder',    // 雷 - 力量、爆發、秩序
  LIGHT = 'light',        // 光 - 照明、純淨、引導
  DARK = 'dark',          // 暗 - 隱匿、潛能、混沌
  METAL = 'metal',        // 金 - 秩序、策略、價值
  WOOD = 'wood',          // 木 - 成長、創造、繁殖
  TIME = 'time',          // 時 - 序列、循環、命運
  SPACE = 'space',        // 空 - 跨越、距離、維度
  SPIRIT = 'spirit'       // 靈 - 本質、意識、心靈
}

// 元素色法定義
export interface ElementColor {
  primary: string;        // 主要色碼
  secondary: string;      // 次要色碼
  symbol: string;         // 元素符號
  rgb: string;            // RGB 色碼
  hex: string;            // HEX 色碼
}

// 元素特性定義
export interface ElementTraits {
  name: string;           // 元素名稱 (繁體中文)
  description: string;    // 元素描述
  category: 'natural' | 'cosmic' | 'elemental' | 'spiritual'; // 元素分類
  strength: 'offensive' | 'defensive' | 'support' | 'balanced'; // 元素強項
  affinity: Element[];    // 元素親和力 (相生)
  weakness: Element[];    // 元素弱點 (相剋)
  symbolism: string[];    // 象徵意義
  associatedConcepts: string[]; // 相關概念
}

// 元素等級
export enum ElementRank {
  BASIC = 'basic',        // 基礎元素
  ADVANCED = 'advanced',  // 進階元素
  ELITE = 'elite',        // 精英元素
  LEGENDARY = 'legendary', // 傳說元素
  MYTHIC = 'mythic',      // 神話元素
  COSMIC = 'cosmic'       // 宇宙元素
}

// 元素精通度
export interface ElementMastery {
  element: Element;
  rank: ElementRank;
  level: number;          // 1-100
  experience: number;     // 當前經驗值
  experienceToNext: number; // 下一級所需經驗值
  abilities: string[];    // 已掌握能力
  unlockedAbilities: string[]; // 已解鎖能力
  masteryPercentage: number; // 精通百分比
}

// 元素相關係矩陣
export interface ElementMatrix {
  element: Element;
  strengths: Record<Element, number>; // 對其他元素的克制係數 (0-2)
  resistances: Record<Element, number>; // 對其他元素的抵抗係數 (0-2)
  synergies: Record<Element, number>;  // 對其他元素的協同係數 (0-2)
  combinations: Record<Element, string[]>; // 元素組合效果
}

// 元素技能效果
export interface ElementSkill {
  id: string;
  name: string;
  description: string;
  element: Element;
  manaCost: number;
  cooldown: number;
  effects: ElementEffect[];
  prerequisites: string[]; // 前置條件
  maxLevel: number;
  currentLevel: number;
}

// 元素效果定義
export interface ElementEffect {
  type: 'damage' | 'heal' | 'buff' | 'debuff' | 'transform' | 'summon' | 'shield';
  value: number;
  duration?: number;
  target: 'self' | 'ally' | 'enemy' | 'all';
  area: 'single' | 'group' | 'all';
  potency: number; // 效果強度 (0-100)
  element: Element;
}

// 元素陣營
export interface ElementFaction {
  id: string;
  name: string;
  description: string;
  elements: Element[];
  leader: string;
  philosophy: string;
  advantages: string[];
  disadvantages: string[];
  colorTheme: ElementColor;
}

// 元素組合效果
export interface ElementCombination {
  primary: Element;
  secondary: Element;
  name: string;
  description: string;
  effects: ElementEffect[];
  rarity: 'common' | 'uncommon' | 'rare' | 'epic' | 'legendary';
  requirements: string[];
}

// 元素克制關係
export interface ElementCounter {
  attacker: Element;
  defender: Element;
  multiplier: number; // 克制倍率 (0.5-2.0)
  description: string;
  mechanics: string;
}

// 元素反應類型
export enum ElementReaction {
  VAPORIZE = 'vaporize',     // 蒸發
  MELT = 'melt',             // 融化
  OVERLOAD = 'overload',     // 遅載
  SUPERCONDUCT = 'superconduct', // 超導
  ELECTROCHARGE = 'electrocharge', // 雷擊
  FREEZE = 'freeze',         // 凍結
  SWIRL = 'swirl',           // 旋渦
  CRYSTALLIZE = 'crystallize', // 結晶
  BLOOM = 'bloom',           // 繁花
  BURGEON = 'burgeon',       // 爆花
  HYPERBLOOM = 'hyperbloom', // 超繁
  AGGRAVATE = 'aggravate'    // 激化
}

// 元素反應定義
export interface ElementReactionDefinition {
  reaction: ElementReaction;
  name: string;
  description: string;
  requiredElements: [Element, Element]; // 需要的元素組合
  effects: ElementEffect[];
  conditions: string[];
  mechanics: string;
}

// 元素數據庫
export interface ElementDatabase {
  elements: Record<Element, ElementTraits>;
  colors: Record<Element, ElementColor>;
  matrix: ElementMatrix[];
  factions: ElementFaction[];
  combinations: ElementCombination[];
  counters: ElementCounter[];
  reactions: ElementReactionDefinition[];
  mastery: ElementMastery[];
}

// 元系統統計
export interface ElementSystemStats {
  totalElements: number;
  unlockedElements: number;
  averageMastery: number;
  mostUsedElement: Element;
  leastUsedElement: Element;
  elementDistribution: Record<Element, number>;
  combinationSuccessRate: number;
  reactionFrequency: Record<ElementReaction, number>;
}

// 元素成就
export interface ElementAchievement {
  id: string;
  name: string;
  description: string;
  requirement: string;
  reward: string;
  element: Element;
  rarity: 'bronze' | 'silver' | 'gold' | 'platinum' | 'diamond';
  unlockedAt?: Date;
  progress: number;
  maxProgress: number;
}

// 元素挑戰
export interface ElementChallenge {
  id: string;
  name: string;
  description: string;
  difficulty: 'easy' | 'normal' | 'hard' | 'extreme' | 'impossible';
  requirements: string[];
  objectives: string[];
  rewards: string[];
  element: Element;
  timeLimit?: number;
  isActive: boolean;
}

// 元素統計分析
export interface ElementAnalytics {
  usage: Record<Element, number>;
  effectiveness: Record<Element, number>;
  popularity: Record<Element, number>;
  winRate: Record<Element, number>;
  masteryGrowth: Record<Element, number>;
  combinationEffectiveness: Record<string, number>;
  reactionFrequency: Record<ElementReaction, number>;
}

// 元系統配置
export interface ElementSystemConfig {
  enableReactions: boolean;
  enableCombinations: boolean;
  enableCounters: boolean;
  maxMasteryLevel: number;
  experienceMultiplier: number;
  criticalHitChance: number;
  criticalHitMultiplier: number;
  reactionBonus: number;
  combinationBonus: number;
  counterBonus: number;
}

// 元系統事件
export interface ElementSystemEvent {
  type: 'element_unlocked' | 'mastery_level_up' | 'combination_success' | 'reaction_triggered' | 'counter_success';
  element: Element;
  timestamp: Date;
  details: Record<string, any>;
  playerId: string;
  gameId?: string;
}

// 元系統錯誤
export interface ElementSystemError {
  code: string;
  message: string;
  element?: Element;
  details: Record<string, any>;
  timestamp: Date;
  severity: 'low' | 'medium' | 'high' | 'critical';
}

// 元系統結果
export interface ElementSystemResult {
  success: boolean;
  message: string;
  data?: any;
  error?: ElementSystemError;
  timestamp: Date;
}

// 元系統狀態
export interface ElementSystemState {
  elements: Record<Element, boolean>;
  mastery: ElementMastery[];
  activeEffects: ElementEffect[];
  combinations: string[];
  reactions: ElementReaction[];
  counters: ElementCounter[];
  stats: ElementSystemStats;
  config: ElementSystemConfig;
  events: ElementSystemEvent[];
  errors: ElementSystemError[];
}

// 元系統管理器接口
export interface IElementSystemManager {
  initialize(): Promise<ElementSystemResult>;
  unlockElement(element: Element): Promise<ElementSystemResult>;
  increaseMastery(element: Element, experience: number): Promise<ElementSystemResult>;
  triggerCombination(primary: Element, secondary: Element): Promise<ElementSystemResult>;
  triggerReaction(elements: Element[]): Promise<ElementSystemResult>;
  calculateDamage(attacker: Element, defender: Element, baseDamage: number): Promise<number>;
  getMasteryInfo(element: Element): ElementMastery | null;
  getElementInfo(element: Element): ElementTraits | null;
  getCounterInfo(attacker: Element, defender: Element): ElementCounter | null;
  getCombinationInfo(primary: Element, secondary: Element): ElementCombination | null;
  getAnalytics(): ElementAnalytics;
  updateConfig(config: Partial<ElementSystemConfig>): Promise<ElementSystemResult>;
  getState(): ElementSystemState;
  reset(): Promise<ElementSystemResult>;
}
