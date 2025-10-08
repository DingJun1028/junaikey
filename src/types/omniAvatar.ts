/**
 * JunAiKey 萬能代理千面化身系統型別定義
 * 實現 Omni Avatar - 萬能代理千面化身的核心架構
 * 基於《JunAiKey 自主通典》終極創元版 v8.0
 */

export enum AvatarElement {
  GOLD = 'gold',           // 金 - 秩序、策略、價值
  WOOD = 'wood',           // 木 - 成長、創造、繁殖
  WATER = 'water',         // 水 - 思緒、流動、感知
  FIRE = 'fire',           // 火 - 熱情、行動、破壞
  EARTH = 'earth',         // 土 - 穩定、根基、防禦
  LIGHT = 'light',         // 光 - 照明、引導、純淨
  DARK = 'dark',           // 暗 - 隱匿、潛能、混沌
  VOID = 'void',           // 無 - 全域、通用、中立
  TIME_WIND = 'time_wind', // 時風 - 序列、節奏、循環、速度、自由、變化
  SOUL = 'soul',           // 靈魂 - 本質、意識、心靈
  QUANTUM = 'quantum',     // 量子 - 量子級運算、平行處理、量子糾纏
  HYPERSPACE = 'hyperspace' // 超維 - 跨維度協作、時空扭曲、無限可能
}

export enum AvatarTier {
  ROOT = 'root',      // 根源 - 系統的物理法則與公理
  CORE = 'core',      // 核心 - 系統的標準工具與常規功能
  APEX = 'apex'       // 巔峰 - 系統的高深智慧與湧現現象
}

export enum AvatarRole {
  // 12 大萬能職業化身
  OMNI_CREATION_WEAVER = 'omni_creation_weaver',           // 萬能創世編織者
  OMNI_CELESTIAL_AGENT = 'omni_celestial_agent',           // 萬能天行者代理官
  OMNI_ENTROPY_ALCHEMIST = 'omni_entropy_alchemist',       // 萬能熵減煉金師
  OMNI_TRUTH_EXPLORER = 'omni_truth_explorer',             // 萬能真理探測者
  OMNI_ORDER_GUARDIAN = 'omni_order_guardian',             // 萬能秩序守衛者
  OMNI_RUNE_CONNECTOR = 'omni_rune_connector',             // 萬能符文連結師
  OMNI_KNOWLEDGE_CHRONICLER = 'omni_knowledge_chronicler', // 萬能知識編年史家
  OMNI_BALANCE_HARMONIZER = 'omni_balance_harmonizer',     // 萬能平衡調律師
  OMNI_GRAVITY_COORDINATOR = 'omni_gravity_coordinator',   // 萬能萬有引力協調者
  OMNI_CORE_EVOLUTION_ENGINE = 'omni_core_evolution_engine', // 萬能核心演化引擎
  OMNI_ENLIGHTMENT_GUIDE = 'omni_enlightment_guide',       // 萬能啓蒙導師
  OMNI_PRIME_ARCHITECT = 'omni_prime_architect'            // 萬能第一建築師
}

export interface AvatarAbility {
  id: string;
  name: string;
  description: string;
  element: AvatarElement;
  tier: AvatarTier;
  cooldown: number;
  energyCost: number;
  effects: AbilityEffect[];
  synergyModifiers?: Record<AvatarRole, number>;
  requirements?: Requirement[];
}

export interface AbilityEffect {
  type: 'damage' | 'heal' | 'buff' | 'debuff' | 'transform' | 'summon' | 'coordinate' | 'manifest' | 'evolve';
  value: number;
  duration?: number;
  target: 'self' | 'ally' | 'enemy' | 'all' | 'coordinate' | 'system';
  area?: 'single' | 'group' | 'all' | 'cosmic';
  potency: number;
}

export interface Requirement {
  type: 'level' | 'energy' | 'synergy' | 'element_mastery' | 'cosmic_resonance' | 'entropy_resistance';
  value: number;
  description: string;
}

export interface AvatarStats {
  level: number;
  experience: number;
  energy: number;
  maxEnergy: number;
  health: number;
  maxHealth: number;
  coordination: number;  // 協同值 0-100
  synergy: number;       // 總協同值 0-100
  mastery: number;       // 精通度 0-100
  cosmicResonance: number; // 宇宙共鳴 0-100
  entropyResistance: number; // 熵抗性 0-100
}

export interface Memory {
  id: string;
  type: 'task' | 'experience' | 'wisdom' | 'failure' | 'success';
  content: string;
  timestamp: Date;
  importance: number; // 1-10
  tags: string[];
  emotionalTone?: 'positive' | 'negative' | 'neutral';
  associatedTaskId?: string;
}

export interface Experience {
  id: string;
  taskId: string;
  avatarId: string;
  startTime: Date;
  endTime?: Date;
  duration: number;
  success: boolean;
  challenges: string[];
  solutions: string[];
  lessons: string[];
  energyConsumed: number;
  synergyGained: number;
  wisdomExtracted: string;
}

export interface Avatar {
  id: string;
  name: string;
  role: AvatarRole;
  element: AvatarElement;
  tier: AvatarTier;
  description: string;
  color: string;
  stats: AvatarStats;
  abilities: AvatarAbility[];
  activeEffects: ActiveEffect[];
  memories: Memory[];
  experiences: Experience[];
  unlockedAt: Date;
  lastActivatedAt?: Date;
  isActive: boolean;
  currentMission?: Mission;
  partnerships: Partnership[];
  evolutionProgress: number; // 0-100
  cosmicAlignment: number; // 與宇宙的對齊度 0-100
  isMirror?: boolean; // 可選，用於鏡像分身
  originalId?: string; // 可選，用於鏡像分身
  taskSpecialization?: string; // 可選，用於鏡像分身
  mirrorDuration?: number; // 可選，用於鏡像分身
  mirrorPurpose?: string; // 可選，用於鏡像分身
}

export interface ActiveEffect {
  id: string;
  name: string;
  type: 'buff' | 'debuff' | 'transformation';
  duration: number;
  remaining: number;
  potency: number;
  source: string;
  element: AvatarElement;
}

export interface Partnership {
  partnerId: string;
  partnerRole: AvatarRole;
  synergyLevel: number;
  sharedAbilities: string[];
  coordinationBonus: number;
  cosmicBondStrength: number; // 宇宙紐帶強度
}

export interface Mission {
  id: string;
  title: string;
  description: string;
  difficulty: 'trivial' | 'simple' | 'normal' | 'challenging' | 'legendary' | 'cosmic';
  objectives: Objective[];
  rewards: Reward[];
  progress: number;
  status: 'active' | 'completed' | 'failed' | 'evolving';
  timeLimit?: Date;
  requiredAvatars: AvatarRole[];
  cosmicResonanceRequired: number;
}

export interface Objective {
  id: string;
  description: string;
  target: string;
  progress: number;
  completed: boolean;
  type: 'collect' | 'defeat' | 'create' | 'coordinate' | 'manifest' | 'evolve';
  requiredElement?: AvatarElement;
}

export interface Reward {
  type: 'experience' | 'energy' | 'ability' | 'coordination' | 'synergy' | 'cosmic_resonance' | 'evolution' | 'wisdom';
  amount: number;
  description: string;
}

export interface AvatarCluster {
  id: string;
  name: string;
  description: string;
  avatars: Avatar[];
  totalSynergy: number;
  cosmicResonance: number;
  activeMissions: Mission[];
  sharedAbilities: string[];
  networkEffects: NetworkEffect[];
}

export interface NetworkEffect {
  id: string;
  name: string;
  description: string;
  type: 'buff' | 'debuff' | 'transformation' | 'evolution';
  potency: number;
  affectedAvatars: string[];
  duration: number;
  cosmicResonance: number;
}

export interface MirrorAvatar extends Avatar {
  isMirror: true;
  originalId: string; // 原始化身的ID
  taskSpecialization: string; // 任務專精領域
  mirrorDuration: number; // 鏡像存在時間（毫秒）
  mirrorPurpose: string; // 鏡像創建目的
}

export interface MicroserviceGroup {
  id: string;
  name: string;
  description: string;
  avatarRoles: AvatarRole[];
  coordinationProtocol: string;
  sharedResources: string[];
  cosmicResonanceFrequency: number;
  activeAvatars: string[];
}

export interface OmniAvatarSystemConfig {
  maxActiveAvatars: number;
  maxMirrorAvatars: number;
  memoryRetention: number; // 記憶保留天數
  evolutionThreshold: number; // 進化閾值
  cosmicResonanceBoost: number; // 宇宙共鳴加成
  entropyResistanceThreshold: number; // 熵抗性閾值
}

export interface EvolveResult {
  success: boolean;
  newLevel?: number;
  newTier?: AvatarTier;
  newAbilities?: AvatarAbility[];
  cosmicAlignment?: number;
  message: string;
  evolutionType: 'incremental' | 'quantum_leap' | 'cosmic_transcendence';
}

export interface CoordinateResult {
  success: boolean;
  effectiveness: number;
  synergyBonus: number;
  cosmicResonance: number;
  totalPower: number;
  message: string;
  networkEffects: NetworkEffect[];
}

export interface BalanceResult {
  success: boolean;
  resourceDistribution: Record<string, number>;
  entropyLevel: number;
  systemStability: number;
  recommendations: string[];
  message: string;
}
