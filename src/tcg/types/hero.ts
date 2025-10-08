/**
 * TCG 萬能矩陣・英雄系統類型定義
 * 基於《JunAiKey 聖典》三位一體・宇宙總綱 (v8.1)
 * 實現萬能化身系統的完整架構
 */

// 英雄類型枚舉
export enum HeroClass {
  WARRIOR = 'warrior',      // 戰士
  MAGE = 'mage',           // 法師
  PRIEST = 'priest',       // 祭司
  ROGUE = 'rogue',         // 盜賊
  PALADIN = 'paladin',     // 聖騎士
  SHAMAN = 'shaman',       // 薩滿
  HUNTER = 'hunter',       // 獵人
  WARLOCK = 'warlock',     // 惡魔術士
  MONK = 'monk',           // 武僧
  DEATHKNIGHT = 'deathknight', // 死亡騎士
  DRUID = 'druid',         // 德魯伊
  DEMONHUNTER = 'demonhunter' // 惡魔獵人
}

// 英雄職業枚舉
export enum HeroProfession {
  ELEMENTALIST = 'elementalist',     // 元素師
  NECROMANCER = 'necromancer',       // 死靈法師
  ILLUSIONIST = 'illusionist',       // 幻術師
  ENCHANTER = 'enchanter',           // 附魔師
  SUMMONER = 'summoner',             // 召喚師
  PYROMANCER = 'pyromancer',         // 火焰法師
  CRYOMANCER = 'cryomancer',         // 冰霜法師
  ELECTROMANCER = 'electromancer',   // 閃電法師
  GEOLOGIST = 'geologist',           // 地質學家
  AEROMANCER = 'aeromancer',         // 風暴法師
  CHRONOMANCER = 'chronomancer',     // 時光法師
  TELEPORTER = 'teleporter',         // 傳送師
  SHAPESHIFTER = 'shapeshifter',     // 變形師
  BARD = 'bard',                     // 吟遊詩人
  ASSASSIN = 'assassin',             // 刺客
  RANGER = 'ranger',                 // 遊俠
  BERSERKER = 'berserker',           // 狂戰士
  GUARDIAN = 'guardian',             // 守護者
  TEMPLAR = 'templar',               // 聖殿騎士
  Vindicator = 'vindicator',         // 辯護者
  CRUSADER = 'crusader',             // 十字軍
  MENDER = 'mender',                 // 治療者
  AUGUR = 'augur',                   // 預言家
  MYSTIC = 'mystic',                 // 神秘學家
  PROPHET = 'prophet',               // 先知
  ORACLE = 'oracle',                 // 神諭者
  WARDEN = 'warden',                 // 看守者
  PROTECTOR = 'protector',           // 保護者
  CHAMPION = 'champion',             // 冠軍
  LEGEND = 'legend',                 // 傳說
  MYTHIC = 'mythic',                 // 神話
  COSMIC = 'cosmic'                  // 宇宙
}

// 英雄稀有度枚舉
export enum HeroRarity {
  COMMON = 'common',      // 普通
  UNCOMMON = 'uncommon',  // 不普通
  RARE = 'rare',          // 稀有
  EPIC = 'epic',          // 史詩
  LEGENDARY = 'legendary', // 傳說
  MYTHIC = 'mythic',      // 神話
  COSMIC = 'cosmic',      // 宇宙
  DIVINE = 'divine'       // 神聖
}

// 英雄狀態枚舉
export enum HeroState {
  AVAILABLE = 'available',     // 可用
  LOCKED = 'locked',           // 鎖定
  ACTIVE = 'active',          // 激活
  INACTIVE = 'inactive',      // 未激活
  BANISHED = 'banished',      // 已放逐
  EXILED = 'exiled',          // 已流放
  CORRUPTED = 'corrupted',    // 已腐化
  BLESSED = 'blessed',        // 已祝福
  TRANSFORMED = 'transformed', // 已變形
  EVOLVED = 'evolved',        // 已進化
  AWAKENED = 'awakened',      // 已覺醒
  TRANSCENDED = 'transcended', // 已超越
  ASCENDED = 'ascended'       // 已昇華
}

// 英雄來源枚舉
export enum HeroOrigin {
  ORIGINAL = 'original',      // 原創
  LEGENDARY = 'legendary',    // 傳說
  MYTHICAL = 'mythical',      // 神話
  COSMIC = 'cosmic',          // 宇宙
  DIVINE = 'divine',          // 神聖
  ELEMENTAL = 'elemental',    // 元素
  ANCESTRAL = 'ancestral',    // 祖先
  CELESTIAL = 'celestial',    // 天界
  INFERNAL = 'infernal',      // 炎魔
   ABYSSAL = 'abyssal',        // 淵狱
   VOID = 'void',              // 虚空
   STEAM = 'steam',            // 蒸汽
   DIESEL = 'diesel',          // 柴油
   GEAR = 'gear',              // 齒輪
   CLOCKWORK = 'clockwork',    // 发条
   ARCANE = 'arcane',          // 奥术
   PSIONIC = 'psionic',        // 精神
   BIOLOGICAL = 'biological',  // 生物
   CYBERNETIC = 'cybernetic',  // 控制论
   NANOTECH = 'nanotech',      // 纳米技术
   QUANTUM = 'quantum',        // 量子
   TEMPORAL = 'temporal',      // 时空
   DIMENSIONAL = 'dimensional' // 维度
}

// 英雄技能類型
export enum HeroSkillType {
  PASSIVE = 'passive',        // 被動技能
  ACTIVE = 'active',          // 主動技能
  ULTIMATE = 'ultimate',      // 終極技能
  TRAIT = 'trait',            // 特性技能
  SIGNATURE = 'signature',    // 署名技能
  LEGENDARY = 'legendary',    // 傳說技能
  MYTHIC = 'mythic',          // 神話技能
  COSMIC = 'cosmic',          // 宇宙技能
  DIVINE = 'divine'           // 神聖技能
}

// 英雄技能等級
export enum HeroSkillRank {
  BASIC = 'basic',            // 基礎
  ADVANCED = 'advanced',      // 進階
  EXPERT = 'expert',          // 專家
  MASTER = 'master',          // 大師
  GRANDMASTER = 'grandmaster', // 宗師
  LEGENDARY = 'legendary',    // 傳說
  MYTHIC = 'mythic',          // 神話
  COSMIC = 'cosmic',          // 宇宙
  DIVINE = 'divine'           // 神聖
}

// 英雄技能
export interface HeroSkill {
  id: string;
  name: string;
  description: string;
  type: HeroSkillType;
  rank: HeroSkillRank;
  element: string;
  cooldown: number;
  manaCost: number;
  energyCost: number;
  healthCost?: number;
  requirements: string[];
  effects: HeroSkillEffect[];
  maxLevel: number;
  currentLevel: number;
  isUnlocked: boolean;
  unlockConditions: string[];
  synergy: string[];
  counters: string[];
  isStackable: boolean;
  area: 'single' | 'group' | 'all' | 'random';
  range: number;
  duration?: number;
  isToggleable: boolean;
  isChanneling: boolean;
  channelTime?: number;
  interruptible: boolean;
  hidden: boolean;
  secret: boolean;
}

// 英雄技能效果
export interface HeroSkillEffect {
  type: 'damage' | 'heal' | 'buff' | 'debuff' | 'transform' | 'summon' | 'teleport' | 'clone' | 'illusion' | 'curse' | 'bless' | 'shield' | 'barrier' | 'ward' | 'resurrection' | 'banish' | 'exile' | 'control' | 'manipulate' | 'create' | 'modify' | 'destroy' | 'protect' | 'enhance' | 'weaken' | 'strengthen' | 'weaken' | 'empower' | 'empower' | 'weaken' | 'strengthen';
  value: number;
  duration?: number;
  target: 'self' | 'ally' | 'enemy' | 'all' | 'random' | 'specified';
  targetRestrictions: string[];
  area: 'single' | 'group' | 'all' | 'random' | 'specified';
  scaling: 'linear' | 'exponential' | 'logarithmic' | 'fixed';
  scalingFactor?: number;
  isStackable: boolean;
  requiresTarget: boolean;
  canBePrevented: boolean;
  preventionMethods: string[];
  criticalHit: boolean;
  criticalMultiplier: number;
  variance: number;
  description: string;
}

// 英雄屬性
export interface HeroAttributes {
  strength: number;         // 力量
  agility: number;          // 敏捷
  intelligence: number;     // 智力
  vitality: number;         // 生命
  wisdom: number;           // 智慧
  charisma: number;         // 魅力
  luck: number;             // 運氣
  endurance: number;        // 耐力
  willpower: number;        // 意志
  faith: number;            // 信仰
  spirit: number;           // 靈魂
  soul: number;             // 心靈
  mastery: number;          // 精通
  resonance: number;        // 共鳴
  connection: number;       // 連結
  influence: number;        // 影響力
  authority: number;        // 權威
  power: number;            // 力量
  control: number;          // 控制
  precision: number;        // 精準
  speed: number;            // 速度
  defense: number;          // 防禦
  offense: number;          // 攻擊
  magic: number;            // 魔法
  technology: number;       // 科技
  nature: number;           // 自然
  cosmic: number;           // 宇宙
  divine: number;           // 神聖
  corruption: number;       // 邪惡
  blessing: number;         // 祝福
  curse: number;            // 詛咒
  protection: number;       // 保護
  vulnerability: number;    // 脆弱
  immunity: number;         // 免疫
  resistance: number;       // 抵抗
  weakness: number;         // 弱點
  advantage: number;        // 優勢
  disadvantage: number;     // 劣勢
  bonus: Record<string, number>; // 其他屬性加成
}

// 英雄裝備槽位
export interface HeroEquipmentSlot {
  slot: string;
  equipped: string | null;
  restrictions: string[];
  bonuses: Record<string, number>;
}

// 英雄裝備
export interface HeroEquipment {
  id: string;
  name: string;
  type: string;
  rarity: HeroRarity;
  slot: string;
  attributes: HeroAttributes;
  effects: HeroSkillEffect[];
  requirements: string[];
  level: number;
  durability: number;
  maxDurability: number;
  enchantments: string[];
  setBonus: Record<string, number>;
  isBound: boolean;
  isSoulbound: boolean;
  isUnique: boolean;
  stackable: boolean;
  quantity: number;
  value: number;
  tradeable: boolean;
  description: string;
  flavorText: string;
  icon: string;
  model: string;
  animation: string;
  sound: string;
  particle: string;
  light: string;
  glow: string;
  shadow: string;
  material: string;
  texture: string;
  color: string;
  size: number;
  weight: number;
  volume: number;
}

// 英雄進化路徑
export interface HeroEvolutionPath {
  id: string;
  name: string;
  description: string;
  requirements: string[];
  stages: HeroEvolutionStage[];
  specialAbilities: string[];
  bonuses: Record<string, number>;
  isAvailable: boolean;
  progress: number;
  maxProgress: number;
}

// 英雄進化階段
export interface HeroEvolutionStage {
  stage: number;
  name: string;
  description: string;
  requirements: string[];
  unlocks: string[];
  bonuses: Record<string, number>;
  transformations: string[];
  abilities: string[];
  appearance: string;
  stats: HeroAttributes;
  level: number;
  maxLevel: number;
}

// 英雄天賦樹
export interface HeroTalentTree {
  id: string;
  name: string;
  description: string;
  points: number;
  maxPoints: number;
  branches: HeroTalentBranch[];
  prerequisites: string[];
  bonuses: Record<string, number>;
}

// 英雄天賦分支
export interface HeroTalentBranch {
  id: string;
  name: string;
  description: string;
  talents: HeroTalent[];
  position: { x: number; y: number };
  connections: string[];
  color: string;
}

// 英雄天賦
export interface HeroTalent {
  id: string;
  name: string;
  description: string;
  rank: HeroSkillRank;
  maxRank: number;
  currentRank: number;
  cost: number;
  prerequisites: string[];
  effects: HeroSkillEffect[];
  isPassive: boolean;
  isToggleable: boolean;
  isUnlocked: boolean;
  position: { x: number; y: number };
  icon: string;
  color: string;
}

// 英雄聯盟
export interface HeroAlliance {
  id: string;
  name: string;
  description: string;
  members: string[];
  leader: string;
  coLeaders: string[];
  officers: string[];
  rules: string[];
  bonuses: Record<string, number>;
  territory: string[];
  resources: Record<string, number>;
  reputation: number;
  level: number;
  exp: number;
  expToNext: number;
  isActive: boolean;
  warDeclarations: string[];
  alliances: string[];
  enemies: string[];
  history: string[];
}

// 英雄成就
export interface HeroAchievement {
  id: string;
  name: string;
  description: string;
  requirement: string;
  reward: string;
  rarity: 'bronze' | 'silver' | 'gold' | 'platinum' | 'diamond';
  category: string;
  isUnlocked: boolean;
  unlockedAt?: Date;
  progress: number;
  maxProgress: number;
  milestones: HeroAchievementMilestone[];
}

// 英雄成就里程碑
export interface HeroAchievementMilestone {
  progress: number;
  reward: string;
  description: string;
  isCompleted: boolean;
  completedAt?: Date;
}

// 英雄統計
export interface HeroStatistics {
  id: string;
  playerId: string;
  heroId: string;
  class: HeroClass;
  profession: HeroProfession;
  level: number;
  experience: number;
  battles: number;
  wins: number;
  losses: number;
  winRate: number;
  kills: number;
  deaths: number;
  assists: number;
  kda: number;
  damageDealt: number;
  damageTaken: number;
  healingDone: number;
  damageHealed: number;
  criticalHits: number;
  criticalHitRate: number;
  dodgeRate: number;
  blockRate: number;
  parryRate: number;
  manaUsed: number;
  manaEfficiency: number;
  skillUsage: Record<string, number>;
  skillEfficiency: Record<string, number>;
  equipmentWorn: Record<string, number>;
  achievementsUnlocked: number;
  totalAchievements: number;
  playTime: number;
  lastPlayedAt: Date;
  favoriteSkill: string;
  weapon: string;
  specialization: string;
  role: string;
  rating: number;
  rank: string;
  division: string;
  season: number;
  peakRating: number;
  currentStreak: number;
  longestStreak: number;
  isVeteran: boolean;
  isChampion: boolean;
  isLegend: boolean;
  isMythic: boolean;
  isCosmic: boolean;
  isDivine: boolean;
}

// 英雄稱號
export interface HeroTitle {
  id: string;
  name: string;
  description: string;
  rarity: HeroRarity;
  requirements: string[];
  effects: HeroSkillEffect[];
  isActive: boolean;
  earnedAt: Date;
  icon: string;
  color: string;
  prefix: boolean;
  suffix: boolean;
}

// 英雄傳記
export interface HeroBiography {
  id: string;
  heroId: string;
  background: string;
  personality: string;
  appearance: string;
  history: string[];
  relationships: Record<string, string>;
  motivations: string[];
  fears: string[];
  goals: string[];
  secrets: string[];
  abilities: string[];
  equipment: string[];
  allies: string[];
  enemies: string[];
  locations: string[];
  events: string[];
  quotes: string[];
  isComplete: boolean;
  lastUpdated: Date;
}

// 英雄任務
export interface HeroQuest {
  id: string;
  name: string;
  description: string;
  objectives: HeroQuestObjective[];
  rewards: HeroQuestReward[];
  requirements: string[];
  timeLimit?: number;
  isRepeatable: boolean;
  maxRepeats?: number;
  currentRepeats: number;
  isDaily: boolean;
  isWeekly: boolean;
  isMonthly: boolean;
  isActive: boolean;
  isCompleted: boolean;
  progress: Record<string, number>;
  acceptedAt: Date;
  completedAt?: Date;
  expiredAt?: Date;
  questGiver: string;
  questType: string;
  difficulty: 'trivial' | 'simple' | 'normal' | 'challenging' | 'hard' | 'extreme' | 'impossible';
  category: string;
  tags: string[];
}

// 英雄任務目標
export interface HeroQuestObjective {
  id: string;
  description: string;
  type: 'kill' | 'collect' | 'deliver' | 'escort' | 'explore' | 'interact' | 'craft' | 'learn' | 'master' | 'complete';
  target: string;
  quantity: number;
  currentQuantity: number;
  isCompleted: boolean;
  isOptional: boolean;
  bonus?: string;
}

// 英雄任務獎勵
export interface HeroQuestReward {
  type: 'experience' | 'gold' | 'item' | 'equipment' | 'skill' | 'title' | 'achievement' | 'reputation' | 'unlock';
  amount: number;
  itemId?: string;
  description: string;
  isGuaranteed: boolean;
  isRandom: boolean;
  randomOptions?: string[];
}

// 英雄基礎結構
export interface BaseHero {
  id: string;
  name: string;
  title: string;
  description: string;
  class: HeroClass;
  profession: HeroProfession;
  rarity: HeroRarity;
  element: string;
  origin: HeroOrigin;
  level: number;
  maxLevel: number;
  experience: number;
  experienceToNext: number;
  attributes: HeroAttributes;
  baseStats: HeroAttributes;
  growthRates: HeroAttributes;
  skills: HeroSkill[];
  talents: HeroTalentTree[];
  evolutionPaths: HeroEvolutionPath[];
  equipment: HeroEquipment[];
  titles: HeroTitle[];
  achievements: HeroAchievement[];
  statistics: HeroStatistics;
  biography: HeroBiography;
  quests: HeroQuest[];
  isActive: boolean;
  isAvailable: boolean;
  isLocked: boolean;
  isHidden: boolean;
  isHighlighted: boolean;
  metadata: Record<string, any>;
}

// 完整英雄結構
export interface OmniKeyHero extends BaseHero {
  state: HeroState;
  faction: string;
  alliance: string | null;
  powerLevel: number;
  cosmicAlignment: number;
  divineBlessing: number;
  corruptionLevel: number;
  soulConnection: number;
  masteryLevel: number;
  resonanceLevel: number;
  controlLevel: number;
  influenceLevel: number;
  authorityLevel: number;
  evolutionStage: number;
  currentEvolutionPath: string | null;
  unlockedTalents: string[];
  equippedTitles: string[];
  activeSkills: string[];
  passiveEffects: HeroSkillEffect[];
  activeEffects: HeroSkillEffect[];
  equipmentSlots: HeroEquipmentSlot[];
  inventory: string[];
  currency: Record<string, number>;
  resources: Record<string, number>;
  reputation: Record<string, number>;
  relationships: Record<string, number>;
  battleHistory: string[];
  achievementsHistory: string[];
  questsHistory: string[];
  equipmentHistory: string[];
  skillHistory: string[];
  appearance: {
    model: string;
    texture: string;
    color: string;
    size: number;
    animation: string;
    effects: string[];
  };
  voice: {
    dialogue: string[];
    sounds: string[];
    music: string;
  };
  lore: {
    background: string;
    story: string[];
    legends: string[];
    myths: string[];
  };
  isPlayable: boolean;
  isCustom: boolean;
  isCommunityContent: boolean;
  rating: number;
  popularity: number;
  winRate: number;
  usageRate: number;
  banRate: number;
  tier: string;
}

// 英雄收藏
export interface HeroCollection {
  id: string;
  playerId: string;
  heroId: string;
  level: number;
  maxLevel: number;
  experience: number;
  skills: string[];
  talents: string[];
  equipment: string[];
  achievements: string[];
  quests: string[];
  titles: string[];
  isFavorite: boolean;
  notes: string;
  unlockedAt: Date;
  lastPlayedAt: Date;
  playCount: number;
  winCount: number;
  lossCount: number;
  winRate: number;
  rating: number;
  rank: string;
}

// 英雄系統配置
export interface HeroSystemConfig {
  maxHeroLevel: number;
  maxTalentPoints: number;
  maxEvolutionStage: number;
  enableCustomHeroes: boolean;
  enableCommunityContent: boolean;
  allowHeroTrading: boolean;
  allowHeroRenting: boolean;
  maxCollectionSize: number;
  heroPricingModel: string;
  rarityDistribution: Record<HeroRarity, number>;
  classBalance: Record<HeroClass, number>;
  professionBalance: Record<HeroProfession, number>;
  elementBalance: Record<string, number>;
  enableAlliances: boolean;
  maxAllianceMembers: number;
  enablePvP: boolean;
  enablePvE: true;
  enableTournaments: true;
  enableLeaderboards: true;
  enableAchievements: true;
  enableQuests: true;
  enableRewards: true;
  enableCurrencies: true;
  enableResources: true;
  enableReputation: true;
  enableRelationships: true;
  enableBiography: true;
  enableLore: true;
  enableVoice: true;
  enableAppearance: true;
  enableCustomization: true;
  enableCosmicAlignment: true;
  enableDivineBlessing: true;
  enableCorruption: true;
  enableSoulConnection: true;
  enableMastery: true;
  enableResonance: true;
  enableControl: true;
  enableInfluence: true;
  enableAuthority: true;
}

// 英雄系統錯誤
export interface HeroSystemError {
  code: string;
  message: string;
  heroId?: string;
  details: Record<string, any>;
  timestamp: Date;
  severity: 'low' | 'medium' | 'high' | 'critical';
}

// 英雄系統結果
export interface HeroSystemResult {
  success: boolean;
  message: string;
  data?: any;
  error?: HeroSystemError;
  timestamp: Date;
}

// 英雄系統狀態
export interface HeroSystemState {
  heroes: Map<string, OmniKeyHero>;
  collections: Map<string, HeroCollection>;
  alliances: Map<string, HeroAlliance>;
  leaderboards: Map<string, HeroStatistics[]>;
  achievements: Map<string, HeroAchievement>;
  quests: Map<string, HeroQuest>;
  config: HeroSystemConfig;
  activeHeroes: string[];
  recentActivity: string[];
  errors: HeroSystemError[];
}

// 英雄系統管理器接口
export interface IHeroSystemManager {
  initialize(): Promise<HeroSystemResult>;
  createHero(heroData: Partial<OmniKeyHero>): Promise<HeroSystemResult>;
  getHero(heroId: string): OmniKeyHero | null;
  getHeroesByClass(heroClass: HeroClass): OmniKeyHero[];
  getHeroesByProfession(profession: HeroProfession): OmniKeyHero[];
  getHeroesByElement(element: string): OmniKeyHero[];
  getHeroesByFaction(faction: string): OmniKeyHero[];
  levelUpHero(heroId: string, experience: number): Promise<HeroSystemResult>;
  unlockSkill(heroId: string, skillId: string): Promise<HeroSystemResult>;
  learnTalent(heroId: string, talentId: string): Promise<HeroSystemResult>;
  evolveHero(heroId: string, evolutionPathId: string): Promise<HeroSystemResult>;
  equipItem(heroId: string, itemId: string, slot: string): Promise<HeroSystemResult>;
  unequipItem(heroId: string, slot: string): Promise<HeroSystemResult>;
  addAchievement(heroId: string, achievementId: string): Promise<HeroSystemResult>;
  startQuest(heroId: string, questId: string): Promise<HeroSystemResult>;
  completeQuest(heroId: string, questId: string): Promise<HeroSystemResult>;
  createAlliance(allianceData: Partial<HeroAlliance>): Promise<HeroSystemResult>;
  joinAlliance(heroId: string, allianceId: string): Promise<HeroSystemResult>;
  leaveAlliance(heroId: string, allianceId: string): Promise<HeroSystemResult>;
  getLeaderboard(): HeroStatistics[];
  getStatistics(heroId: string): HeroStatistics | null;
  updateConfig(config: Partial<HeroSystemConfig>): Promise<HeroSystemResult>;
  getState(): HeroSystemState;
  reset(): Promise<HeroSystemResult>;
}
