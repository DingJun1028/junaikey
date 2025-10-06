/**
 * JunAiKey 元素精靈系統型別定義
 * 實現 Element Mastery - 元素精通系統的核心架構
 */
export declare enum ElementType {
    ORDER = "order",// 秩序
    GROWTH = "growth",// 成長
    THOUGHT = "thought",// 思緒
    ACTION = "action",// 行動
    STABILITY = "stability",// 穩定
    GUIDANCE = "guidance",// 導引
    CHAOS = "chaos",// 混沌
    NULL = "null",// 通用
    CHANGE = "change",// 變革
    ESSENCE = "essence",// 本質
    MACHINE = "machine",// 機械
    ASTRAL = "astral"
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
export declare enum SpiritStage {
    SLEEPING = "sleeping",// 沉睡
    AWAKENED = "awakened",// 覺醒
    RESONANCE = "resonance",// 共鳴
    FUSION = "fusion",// 融合
    TRANSCENDENCE = "transcendence",// 超越
    LEGEND = "legend",// 傳說
    ETERNAL = "eternal"
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
    mastery: number;
    abilities: SpiritAbility[];
    passiveEffects: string[];
    unlockedAt: Date;
    lastUsedAt?: Date;
    synergy: number;
}
export interface ElementSpiritConfig {
    defaultStage: SpiritStage;
    maxLevel: number;
    experienceMultiplier: number;
    masteryRate: number;
}
export declare const SPIRIT_CONFIG: Record<ElementType, ElementSpiritConfig>;
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
//# sourceMappingURL=elementSpirit.d.ts.map