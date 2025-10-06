/**
 * JunAiKey 元素精靈系統型別定義
 * 實現 Element Mastery - 元素精通系統的核心架構
 */

export enum ElementType {
  ORDER = 'order',           // 秩序
  GROWTH = 'growth',         // 成長
  THOUGHT = 'thought',       // 思緒
  ACTION = 'action',         // 行動
  STABILITY = 'stability',   // 穩定
  GUIDANCE = 'guidance',     // 導引
  CHAOS = 'chaos',           // 混沌
  NULL = 'null',             // 通用
  CHANGE = 'change',         // 變革
  ESSENCE = 'essence',       // 本質
  MACHINE = 'machine',       // 機械
  ASTRAL = 'astral'          // 雙耀星辰
}

export interface SpiritAbility {
  id: string;
  name: string;
  description: string;
  cooldown: number;
  manaCost: number;
  effects: AbilityEffect[];
}

export interface AbilityEffect {
  type: 'damage' | 'heal' | 'buff' | 'debuff' | 'transform' | 'summon';
  value: number;
  duration?: number;
  target: 'self' | 'enemy' | 'ally' | 'all';
}

export enum SpiritStage {
  SLEEPING = 'sleeping',     // 沉睡
  AWAKENED = 'awakened',     // 覺醒
  RESONANCE = 'resonance',   // 共鳴
  FUSION = 'fusion',         // 融合
  TRANSCENDENCE = 'transcendence', // 超越
  LEGEND = 'legend',         // 傳說
  ETERNAL = 'eternal'        // 永恆
}

export interface ElementSpirit {
  id: string;
  name: string;
  type: ElementType;
  color: string;
  description: string;
  stage: SpiritStage;
  level: number;
  experience: number;
  experienceToNext: number;
  mastery: number;          // 0-100
  abilities: SpiritAbility[];
  passiveEffects: string[];
  unlockedAt: Date;
  lastUsedAt?: Date;
  synergy: number;          // 協同值 0-100
}

export interface ElementSpiritConfig {
  defaultStage: SpiritStage;
  maxLevel: number;
  experienceMultiplier: number;
  masteryRate: number;
}

export const SPIRIT_CONFIG: Record<ElementType, ElementSpiritConfig> = {
  [ElementType.ORDER]: {
    defaultStage: SpiritStage.SLEEPING,
    maxLevel: 50,
    experienceMultiplier: 1.0,
    masteryRate: 0.8
  },
  [ElementType.GROWTH]: {
    defaultStage: SpiritStage.SLEEPING,
    maxLevel: 50,
    experienceMultiplier: 1.2,
    masteryRate: 0.9
  },
  [ElementType.THOUGHT]: {
    defaultStage: SpiritStage.SLEEPING,
    maxLevel: 50,
    experienceMultiplier: 1.1,
    masteryRate: 0.85
  },
  [ElementType.ACTION]: {
    defaultStage: SpiritStage.SLEEPING,
    maxLevel: 50,
    experienceMultiplier: 1.3,
    masteryRate: 0.95
  },
  [ElementType.STABILITY]: {
    defaultStage: SpiritStage.SLEEPING,
    maxLevel: 50,
    experienceMultiplier: 0.9,
    masteryRate: 0.75
  },
  [ElementType.GUIDANCE]: {
    defaultStage: SpiritStage.SLEEPING,
    maxLevel: 50,
    experienceMultiplier: 1.0,
    masteryRate: 0.8
  },
  [ElementType.CHAOS]: {
    defaultStage: SpiritStage.SLEEPING,
    maxLevel: 50,
    experienceMultiplier: 1.4,
    masteryRate: 1.0
  },
  [ElementType.NULL]: {
    defaultStage: SpiritStage.SLEEPING,
    maxLevel: 50,
    experienceMultiplier: 1.0,
    masteryRate: 0.7
  },
  [ElementType.CHANGE]: {
    defaultStage: SpiritStage.SLEEPING,
    maxLevel: 50,
    experienceMultiplier: 1.15,
    masteryRate: 0.88
  },
  [ElementType.ESSENCE]: {
    defaultStage: SpiritStage.SLEEPING,
    maxLevel: 50,
    experienceMultiplier: 1.05,
    masteryRate: 0.82
  },
  [ElementType.MACHINE]: {
    defaultStage: SpiritStage.SLEEPING,
    maxLevel: 50,
    experienceMultiplier: 1.25,
    masteryRate: 0.92
  },
  [ElementType.ASTRAL]: {
    defaultStage: SpiritStage.SLEEPING,
    maxLevel: 100,
    experienceMultiplier: 2.0,
    masteryRate: 1.0
  }
};

export interface SpiritEvolutionResult {
  success: boolean;
  newStage?: SpiritStage;
  message: string;
  rewards?: string[];
}

export interface SpiritCombatData {
  currentHP: number;
  maxHP: number;
  currentMana: number;
  maxMana: number;
  activeEffects: CombatEffect[];
}

export interface CombatEffect {
  id: string;
  name: string;
  type: 'buff' | 'debuff';
  duration: number;
  potency: number;
  source: string;
}
