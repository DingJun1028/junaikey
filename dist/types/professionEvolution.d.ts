/**
 * JunAiKey 職業進化系統型別定義
 * 實現 Profession Evolution - 職業進化系統的核心架構
 */
export declare enum MainProfession {
    INSIGHT = "insight",// 洞察主修
    CONSTRUCTION = "construction",// 構築主修
    CREATION = "creation",// 創造主修
    EXECUTION = "execution"
}
export declare enum Specialization {
    ANALYST = "analyst",// 數據分析師
    PREDICTOR = "predictor",// 預測大師
    DETECTIVE = "detective",// 真相偵探
    STRATEGIST = "strategist",// 戰略家
    ARCHITECT = "architect",// 系統架構師
    ENGINEER = "engineer",// 系統工程師
    OPTIMIZER = "optimizer",// 性能優化師
    SECURITY = "security",// 安全專家
    DESIGNER = "designer",// 創意設計師
    INNOVATOR = "innovator",// 創新者
    CREATOR = "creator",// 創造者
    ARTIST = "artist",// 藝術家
    COMMANDER = "commander",// 指揮官
    OPERATOR = "operator",// 操作員
    EXECUTOR = "executor",// 執行者
    LEADER = "leader"
}
export interface ProfessionSkill {
    id: string;
    name: string;
    description: string;
    level: number;
    maxLevel: number;
    requirements: SkillRequirement[];
    effects: SkillEffect[];
    unlockedAt: Date;
    lastUsedAt?: Date;
}
export interface SkillRequirement {
    type: 'level' | 'skill' | 'item' | 'achievement';
    target: string;
    value: number | string;
}
export interface SkillEffect {
    type: 'buff' | 'debuff' | 'ability' | 'passive';
    value: number;
    duration?: number;
    target: 'self' | 'ally' | 'enemy' | 'all';
    description: string;
}
export interface ProfessionProgress {
    level: number;
    experience: number;
    experienceToNext: number;
    skillPoints: number;
    mastery: number;
    reputation: number;
    achievements: string[];
    unlockedSkills: string[];
}
export interface ProfessionEvolution {
    id: string;
    mainProfession: MainProfession;
    specialization: Specialization;
    name: string;
    description: string;
    color: string;
    icon: string;
    progress: ProfessionProgress;
    skills: ProfessionSkill[];
    activeEffects: ActiveEffect[];
    unlockedAt: Date;
    lastProgressAt?: Date;
    isActive: boolean;
    mentor?: string;
    students: string[];
}
export interface ActiveEffect {
    id: string;
    name: string;
    type: 'buff' | 'debuff';
    duration: number;
    remaining: number;
    potency: number;
    source: string;
    description: string;
}
export interface ProfessionQuest {
    id: string;
    title: string;
    description: string;
    profession: MainProfession;
    difficulty: 'beginner' | 'intermediate' | 'advanced' | 'expert' | 'master';
    objectives: QuestObjective[];
    rewards: QuestReward[];
    progress: number;
    status: 'available' | 'active' | 'completed' | 'failed';
    timeLimit?: Date;
    prerequisites: string[];
}
export interface QuestObjective {
    id: string;
    description: string;
    type: 'skill' | 'achievement' | 'task' | 'combat' | 'creation';
    target: string;
    progress: number;
    completed: boolean;
    required: number;
}
export interface QuestReward {
    type: 'experience' | 'skill_point' | 'skill' | 'reputation' | 'item' | 'title';
    amount: number;
    description: string;
}
export interface ProfessionNetwork {
    nodes: Map<string, ProfessionEvolution>;
    edges: Map<string, ProfessionRelationship[]>;
    totalMastery: number;
    activeProfessions: number;
    networkEffects: NetworkEffect[];
}
export interface ProfessionRelationship {
    partnerId: string;
    relationshipType: 'mentor' | 'student' | 'colleague' | 'rival';
    synergyLevel: number;
    sharedSkills: string[];
    collaborationBonus: number;
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
export interface ProfessionResult {
    success: boolean;
    newLevel?: number;
    newMastery?: number;
    message: string;
    rewards?: QuestReward[];
}
export interface ProfessionStats {
    totalProfessions: number;
    activeProfessions: number;
    averageLevel: number;
    totalMastery: number;
    totalReputation: number;
    professionDistribution: Record<MainProfession, number>;
    specializationDistribution: Record<Specialization, number>;
}
//# sourceMappingURL=professionEvolution.d.ts.map