/**
 * JunAiKey 化身協同系統型別定義
 * 實現 Avatar Synergy - 化身協同系統的核心架構
 */
export declare enum AvatarRole {
    SYNTHESIS_GUIDE = "synthesis_guide",// 協同引導者
    TRUTH_OBSERVER = "truth_observer",// 真理觀測者
    ENLIGHTMENT_GUIDE = "enlightment_guide",// 啟蒙光導師
    MATRIX_CONNECTOR = "matrix_connector",// 矩陣連結師
    ENTROPY_ALCHEMIST = "entropy_alchemist",// 熵減煉金術士
    SOULSCRIBE = "soulscribe",// 靈魂書記官
    CREATION_PROGRAMMER = "creation_programmer",// 創世程式設計師
    AGENT_COMMANDER = "agent_commander",// 代理指揮官
    AXIOM_WATCHER = "axiom_watcher",// 公理守望者
    PRIME_ARCHITECT = "prime_architect",// 第一架構師
    HOLY_KEYMASTER = "holy_keymaster"
}
export interface AvatarAbility {
    id: string;
    name: string;
    description: string;
    cooldown: number;
    energyCost: number;
    effects: AbilityEffect[];
    synergyModifiers?: Record<AvatarRole, number>;
}
export interface AbilityEffect {
    type: 'damage' | 'heal' | 'buff' | 'debuff' | 'transform' | 'summon' | 'coordinate' | 'manifest';
    value: number;
    duration?: number;
    target: 'self' | 'ally' | 'enemy' | 'all' | 'coordinate';
    area?: 'single' | 'group' | 'all';
}
export interface AvatarStats {
    level: number;
    experience: number;
    energy: number;
    maxEnergy: number;
    health: number;
    maxHealth: number;
    coordination: number;
    synergy: number;
    mastery: number;
}
export interface AvatarSynergy {
    id: string;
    role: AvatarRole;
    name: string;
    description: string;
    color: string;
    element: string;
    stats: AvatarStats;
    abilities: AvatarAbility[];
    activeEffects: ActiveEffect[];
    unlockedAt: Date;
    lastActivatedAt?: Date;
    isActive: boolean;
    currentMission?: Mission;
    partnerships: Partnership[];
}
export interface ActiveEffect {
    id: string;
    name: string;
    type: 'buff' | 'debuff';
    duration: number;
    remaining: number;
    potency: number;
    source: string;
}
export interface Partnership {
    partnerId: string;
    partnerRole: AvatarRole;
    synergyLevel: number;
    sharedAbilities: string[];
    coordinationBonus: number;
}
export interface Mission {
    id: string;
    title: string;
    description: string;
    difficulty: 'easy' | 'medium' | 'hard' | 'legendary';
    objectives: Objective[];
    rewards: Reward[];
    progress: number;
    status: 'active' | 'completed' | 'failed';
    timeLimit?: Date;
}
export interface Objective {
    id: string;
    description: string;
    target: string;
    progress: number;
    completed: boolean;
    type: 'collect' | 'defeat' | 'create' | 'coordinate' | 'manifest';
}
export interface Reward {
    type: 'experience' | 'energy' | 'ability' | 'coordination' | 'synergy' | 'item';
    amount: number;
    description: string;
}
export interface SynergyCombo {
    id: string;
    name: string;
    description: string;
    requiredAvatars: AvatarRole[];
    effects: AbilityEffect[];
    cooldown: number;
    energyCost: number;
    unlockLevel: number;
}
export interface AvatarEvolutionResult {
    success: boolean;
    newLevel?: number;
    newSynergy?: number;
    message: string;
    rewards?: Reward[];
}
export interface CoordinationResult {
    success: boolean;
    effectiveness: number;
    synergyBonus: number;
    totalPower: number;
    message: string;
}
export interface SynergyNetwork {
    nodes: Map<string, AvatarSynergy>;
    edges: Map<string, Partnership[]>;
    totalSynergy: number;
    activeCoordinates: number;
    networkEffects: NetworkEffect[];
}
export interface NetworkEffect {
    id: string;
    name: string;
    description: string;
    type: 'buff' | 'debuff' | 'transform';
    potency: number;
    affectedNodes: string[];
    duration: number;
}
//# sourceMappingURL=avatarSynergy.d.ts.map