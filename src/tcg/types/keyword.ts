/**
 * TCG 萬能矩陣・關鍵詞體系類型定義
 * 基於《JunAiKey 聖典》平衡敕令・遊戲關鍵詞體系 (v8.4)
 * 實現十二大元素的對稱關鍵詞體系
 */

// 關鍵詞類型枚舉
export enum KeywordType {
  ELEMENTAL = 'elemental',     // 元素關鍵詞
  COMBAT = 'combat',           // 戰鬥關鍵詞
  SUPPORT = 'support',         // 支援關鍵詞
  UTILITY = 'utility',         // 實用關鍵詞
  CONDITIONAL = 'conditional', // 條件關鍵詞
  TRIGGER = 'trigger',         // 觸發關鍵詞
  EFFECT = 'effect',           // 效果關鍵詞
  MECHANIC = 'mechanic',       // 機制關鍵詞
  MODIFIER = 'modifier',       // 修飾關鍵詞
  STATE = 'state',             // 狀態關鍵詞
  BUFF = 'buff',               // 增益關鍵詞
  DEBUFF = 'debuff',           // 減益關鍵詞
  PASSIVE = 'passive',         // 被動關鍵詞
  ACTIVE = 'active',           // 主動關鍵詞
  ULTIMATE = 'ultimate',       // 終極關鍵詞
  LEGENDARY = 'legendary',     // 傳說關鍵詞
  MYTHIC = 'mythic',           // 神話關鍵詞
  COSMIC = 'cosmic',           // 宇宙關鍵詞
  DIVINE = 'divine'            // 神聖關鍵詞
}

// 關鍵詞稀有度枚舉
export enum KeywordRarity {
  COMMON = 'common',           // 普通
  UNCOMMON = 'uncommon',       // 不普通
  RARE = 'rare',               // 稀有
  EPIC = 'epic',               // 史詩
  LEGENDARY = 'legendary',     // 傳說
  MYTHIC = 'mythic',           // 神話
  COSMIC = 'cosmic',           // 宇宙
  DIVINE = 'divine'            // 神聖
}

// 關鍵詞分類
export enum KeywordCategory {
  OFFENSIVE = 'offensive',     // 攻擊類
  DEFENSIVE = 'defensive',     // 防禦類
  SUPPORTIVE = 'supportive',   // 支援類
  UTILITY = 'utility',         // 實用類
  STRATEGIC = 'strategic',     // 戰略類
  TACTICAL = 'tactical',       // 戰術類
  ELEMENTAL = 'elemental',     // 元素類
  COSMIC = 'cosmic',           // 宇宙類
  DIVINE = 'divine',           // 神聖類
  CORRUPTED = 'corrupted',     // 腐化類
  BLESSED = 'blessed',         // 祝福類
  NEUTRAL = 'neutral'          // 中立類
}

// 關鍵詞效果類型
export enum KeywordEffectType {
  DAMAGE = 'damage',           // 傷害效果
  HEALING = 'healing',         // 治療效果
  BUFF = 'buff',               // 增益效果
  DEBUFF = 'debuff',           // 減益效果
  SHIELD = 'shield',           // 护盾效果
  BARRIER = 'barrier',         // 障碍效果
  WARD = 'ward',               // 守护效果
  CURSE = 'curse',             // 诅咒效果
  BLESSING = 'blessing',       // 祝福效果
  TRANSFORMATION = 'transformation', // 变形效果
  SUMMON = 'summon',           // 召唤效果
  TELEPORT = 'teleport',       // 传送效果
  CONTROL = 'control',         // 控制效果
  MANIPULATION = 'manipulation', // 操控效果
  CREATION = 'creation',       // 创造效果
  DESTRUCTION = 'destruction', // 摧毁效果
  PROTECTION = 'protection',   // 保护效果
  VULNERABILITY = 'vulnerability', // 脆弱效果
  IMMUNITY = 'immunity',       // 免疫效果
  RESISTANCE = 'resistance',   // 抵抗效果
  WEAKNESS = 'weakness',       // 弱点效果
  ADVANTAGE = 'advantage',     // 优势效果
  DISADVANTAGE = 'disadvantage', // 劣势效果
  SYNERGY = 'synergy',         // 协同效果
  ANTAGONISM = 'antagonism',   // 对抗效果
  HARMONY = 'harmony',         // 和谐效果
  CHAOS = 'chaos',             // 混乱效果
  ORDER = 'order',             // 秩序效果
  BALANCE = 'balance',         // 平衡效果
  IMBALANCE = 'imbalance',     // 不平衡效果
  STABILITY = 'stability',     // 稳定效果
  INSTABILITY = 'instability', // 不稳定效果
  GROWTH = 'growth',           // 成长效果
  DECAY = 'decay',             // 衰败效果
  EVOLUTION = 'evolution',     // 进化效果
  DEVOLUTION = 'devolution',   // 退化效果
  ASCENSION = 'ascension',     // 升华效果
  DESCENSION = 'descension',   // 堕落效果
  ENLIGHTENMENT = 'enlightenment', // 启蒙效果
  IGNORANCE = 'ignorance',     // 无知效果
  WISDOM = 'wisdom',           // 智慧效果
  FOLLY = 'folly',             // 愚蠢效果
  COURAGE = 'courage',         // 勇气效果
  FEAR = 'fear',               // 恐惧效果
  LOVE = 'love',               // 爱效果
  HATE = 'hate',               // 恨效果
  HOPE = 'hope',               // 希望效果
  DESPAIR = 'despair',         // 绝望效果
  LIGHT = 'light',             // 光效果
  DARKNESS = 'darkness',       // 暗效果
  LIFE = 'life',               // 生命效果
  DEATH = 'death'              // 死亡效果
}

// 關鍵詞效果
export interface KeywordEffect {
  id: string;
  type: KeywordEffectType;
  name: string;
  description: string;
  value: number;
  duration: number;
  target: 'self' | 'ally' | 'enemy' | 'all' | 'random' | 'specified';
  targetRestrictions: string[];
  area: 'single' | 'group' | 'all' | 'random' | 'specified';
  element?: string;
  scaling: 'linear' | 'exponential' | 'logarithmic' | 'fixed';
  scalingFactor?: number;
  isStackable: boolean;
  requiresTarget: boolean;
  canBePrevented: boolean;
  preventionMethods: string[];
  criticalHit: boolean;
  criticalMultiplier: number;
  variance: number;
  conditions: KeywordCondition[];
  limitations: string[];
}

// 關鍵詞條件
export interface KeywordCondition {
  id: string;
  type: 'health' | 'mana' | 'turn' | 'phase' | 'location' | 'state' | 'element' | 'keyword' | 'card' | 'player' | 'opponent' | 'field' | 'graveyard' | 'deck' | 'hand' | 'exile';
  operator: 'equal' | 'greater' | 'less' | 'greater_equal' | 'less_equal' | 'not_equal' | 'contains' | 'matches' | 'starts_with' | 'ends_with';
  value: any;
  description: string;
  checkFrequency: 'on_activation' | 'on_start' | 'on_end' | 'on_phase' | 'on_turn' | 'continuous';
  isNegated: boolean;
  priority: number;
}

// 關鍵詞限制
export interface KeywordLimitation {
  id: string;
  type: 'frequency' | 'duration' | 'target' | 'element' | 'rarity' | 'cost' | 'level' | 'class' | 'profession' | 'faction';
  value: any;
  description: string;
  penalty: number;
  isStackable: boolean;
  isRemovable: boolean;
  removalConditions: string[];
}

// 關鍵詞平衡性
export interface KeywordBalance {
  id: string;
  keywordId: string;
  powerLevel: number;
  usageRate: number;
  winRate: number;
  banRate: number;
  restrictionCount: number;
  metaShare: number;
  popularityIndex: number;
  versatility: number;
  synergyScore: number;
  counterScore: number;
  effectiveness: number;
  efficiency: number;
  fairness: number;
  funFactor: number;
  balanceRating: 'overpowered' | 'strong' | 'balanced' | 'weak' | 'underpowered';
  recommendations: string[];
  lastAnalyzed: Date;
  nextReview: Date;
}

// 關鍵詞關係
export interface KeywordRelationship {
  id: string;
  primary: string;
  secondary: string;
  type: 'synergy' | 'antagonism' | 'combination' | 'counter' | 'enhancement' | 'suppression' | 'replacement' | 'substitution';
  strength: number; // 關係強度 (0-100)
  description: string;
  effects: KeywordEffect[];
  conditions: KeywordCondition[];
  requirements: string[];
  cooldown: number;
  duration: number;
  isStackable: boolean;
  isLimited: boolean;
  limit: number;
  priority: number;
}

// 關鍵詞組合
export interface KeywordCombination {
  id: string;
  name: string;
  description: string;
  keywords: string[];
  effects: KeywordEffect[];
  conditions: KeywordCondition[];
  requirements: string[];
  rarity: KeywordRarity;
  category: KeywordCategory;
  powerLevel: number;
  unlockConditions: string[];
  isStackable: boolean;
  maxStacks: number;
  cooldown: number;
  duration: number;
  area: 'single' | 'group' | 'all' | 'random' | 'specified';
  range: number;
  priority: number;
  color: string;
  icon: string;
  sound: string;
  particle: string;
  light: string;
  glow: string;
  shadow: string;
  material: string;
  texture: string;
  model: string;
  animation: string;
}

// 關鍵詞譜系
export interface KeywordLineage {
  id: string;
  name: string;
  description: string;
  evolutionPath: string[];
  baseKeyword: string;
  finalForm: string;
  evolutionRequirements: string[];
  specialAbilities: string[];
  progression: KeywordEvolutionStage[];
}

// 關鍵詞進化階段
export interface KeywordEvolutionStage {
  stage: number;
  name: string;
  description: string;
  requirements: string[];
  unlocks: string[];
  bonuses: Record<string, number>;
  transformations: string[];
  abilities: string[];
  effects: KeywordEffect[];
  appearance: string;
  stats: Record<string, number>;
  level: number;
  maxLevel: number;
}

// 關鍵詞樹
export interface KeywordTree {
  id: string;
  name: string;
  description: string;
  category: KeywordCategory;
  keywords: KeywordNode[];
  root: string;
  connections: KeywordConnection[];
  prerequisites: string[];
  bonuses: Record<string, number>;
  maxPoints: number;
  currentPoints: number;
}

// 關鍵詞節點
export interface KeywordNode {
  id: string;
  keywordId: string;
  position: { x: number; y: number };
  connections: string[];
  prerequisites: string[];
  cost: number;
  maxLevel: number;
  currentLevel: number;
  isUnlocked: boolean;
  isActive: boolean;
  bonuses: Record<string, number>;
  effects: KeywordEffect[];
  description: string;
  icon: string;
  color: string;
}

// 關鍵詞連接
export interface KeywordConnection {
  from: string;
  to: string;
  type: 'prerequisite' | 'enhancement' | 'synergy' | 'antagonism';
  strength: number;
  description: string;
  requirements: string[];
}

// 關鍵詞收藏
export interface KeywordCollection {
  id: string;
  playerId: string;
  keywordId: string;
  level: number;
  maxLevel: number;
  experience: number;
  mastery: number;
  unlockedEffects: string[];
  unlockedCombinations: string[];
  unlockedTrees: string[];
  isFavorite: boolean;
  notes: string;
  unlockedAt: Date;
  lastUsedAt: Date;
  usageCount: number;
  effectiveness: number;
  efficiency: number;
  versatility: number;
  synergyScore: number;
  counterScore: number;
  balanceRating: string;
  rating: number;
  reviews: KeywordReview[];
}

// 關鍵詞評價
export interface KeywordReview {
  id: string;
  keywordId: string;
  reviewerId: string;
  rating: number;
  title: string;
  content: string;
  pros: string[];
  cons: string[];
  suggestions: string[];
  powerLevel: number;
  balanceRating: string;
  effectiveness: number;
  efficiency: number;
  versatility: number;
  synergyScore: number;
  counterScore: number;
  funFactor: number;
  recommendedFormat: string[];
  createdAt: Date;
  updatedAt: Date;
  isVerified: boolean;
  helpfulCount: number;
}

// 關鍵詞統計
export interface KeywordStatistics {
  keywordId: string;
  usageCount: number;
  winRate: number;
  usageRate: number;
  metaShare: number;
  popularityIndex: number;
  powerLevel: number;
  versatility: number;
  synergyScore: number;
  counterScore: number;
  effectiveness: number;
  efficiency: number;
  balanceRating: string;
  banRate: number;
  restrictionCount: number;
  averageRating: number;
  reviewCount: number;
  lastUsedAt: Date;
  effectivenessOverTime: Record<string, number>;
  usageOverTime: Record<string, number>;
  winRateOverTime: Record<string, number>;
  metaShareOverTime: Record<string, number>;
  popularityOverTime: Record<string, number>;
}

// 關鍵詞市場
export interface KeywordMarket {
  id: string;
  keywordId: string;
  price: number;
  quantity: number;
  condition: 'mint' | 'near_mint' | 'excellent' | 'good' | 'fair' | 'poor';
  isFoil: boolean;
  isSigned: boolean;
  sellerId: string;
  listingDate: Date;
  lastUpdated: Date;
  isActive: boolean;
  salesHistory: KeywordSale[];
}

// 關鍵詞交易記錄
export interface KeywordSale {
  id: string;
  keywordId: string;
  sellerId: string;
  buyerId: string;
  price: number;
  quantity: number;
  condition: string;
  saleDate: Date;
  platform: string;
  transactionId: string;
}

// 關鍵詞基礎結構
export interface BaseKeyword {
  id: string;
  name: string;
  description: string;
  type: KeywordType;
  category: KeywordCategory;
  rarity: KeywordRarity;
  element: string;
  faction: string;
  cost: number;
  cooldown: number;
  duration: number;
  maxLevel: number;
  currentLevel: number;
  effects: KeywordEffect[];
  conditions: KeywordCondition[];
  limitations: KeywordLimitation[];
  relationships: KeywordRelationship[];
  combinations: KeywordCombination[];
  isStackable: boolean;
  maxStacks: number;
  area: 'single' | 'group' | 'all' | 'random' | 'specified';
  range: number;
  priority: number;
  hidden: boolean;
  secret: boolean;
  isActive: boolean;
  isAvailable: boolean;
  isLocked: boolean;
  isHidden: boolean;
  isHighlighted: boolean;
  metadata: Record<string, any>;
}

// 完整關鍵詞結構
export interface OmniKeyKeyword extends BaseKeyword {
  powerLevel: number;
  masteryLevel: number;
  resonanceLevel: number;
  controlLevel: number;
  influenceLevel: number;
  authorityLevel: number;
  cosmicAlignment: number;
  divineBlessing: number;
  corruptionLevel: number;
  soulConnection: number;
  unlockedEffects: string[];
  unlockedCombinations: string[];
  unlockedTrees: string[];
  passiveEffects: KeywordEffect[];
  activeEffects: KeywordEffect[];
  history: string[];
  balance: KeywordBalance;
  collection?: KeywordCollection;
  market?: KeywordMarket;
  statistics: KeywordStatistics;
  rating: number;
  winRate: number;
  usageRate: number;
  banRate: number;
  tier: string;
  metaShare: number;
  popularityIndex: number;
  effectiveness: number;
  efficiency: number;
  versatility: number;
  synergyScore: number;
  counterScore: number;
  funFactor: number;
  recommendedFormat: string[];
  restrictions: string[];
  lastUsedAt: Date;
  lastUpdatedAt: Date;
  isPlayable: boolean;
  isCustom: boolean;
  isCommunityContent: boolean;
}

// 關鍵詞搜索過濾器
export interface KeywordSearchFilter {
  name?: string;
  type?: KeywordType;
  category?: KeywordCategory;
  rarity?: KeywordRarity;
  element?: string;
  faction?: string;
  cost?: { min?: number; max?: number };
  cooldown?: { min?: number; max?: number };
  duration?: { min?: number; max?: number };
  effects?: KeywordEffectType[];
  conditions?: string[];
  limitations?: string[];
  relationships?: string[];
  combinations?: string[];
  isStackable?: boolean;
  area?: string;
  range?: { min?: number; max?: number };
  powerLevel?: { min?: number; max?: number };
  masteryLevel?: { min?: number; max?: number };
  resonanceLevel?: { min?: number; max?: number };
  controlLevel?: { min?: number; max?: number };
  influenceLevel?: { min?: number; max?: number };
  authorityLevel?: { min?: number; max?: number };
  cosmicAlignment?: { min?: number; max?: number };
  divineBlessing?: { min?: number; max?: number };
  corruptionLevel?: { min?: number; max?: number };
  soulConnection?: { min?: number; max?: number };
  isCustom?: boolean;
  communityContent?: boolean;
  rating?: { min?: number; max?: number };
  winRate?: { min?: number; max?: number };
  usageRate?: { min?: number; max?: number };
  banRate?: { min?: number; max?: number };
  metaShare?: { min?: number; max?: number };
  popularityIndex?: { min?: number; max?: number };
  effectiveness?: { min?: number; max?: number };
  efficiency?: { min?: number; max?: number };
  versatility?: { min?: number; max?: number };
  synergyScore?: { min?: number; max?: number };
  counterScore?: { min?: number; max?: number };
  funFactor?: { min?: number; max?: number };
}

// 關鍵詞搜索結果
export interface KeywordSearchResult {
  keywords: OmniKeyKeyword[];
  total: number;
  page: number;
  pageSize: number;
  filters: KeywordSearchFilter;
  sortOptions: string[];
  hasMore: boolean;
  searchTime: number;
}

// 關鍵詞系統配置
export interface KeywordSystemConfig {
  maxKeywordLevel: number;
  maxMasteryLevel: number;
  maxResonanceLevel: number;
  maxControlLevel: number;
  maxInfluenceLevel: number;
  maxAuthorityLevel: number;
  maxCosmicAlignment: number;
  maxDivineBlessing: number;
  maxCorruptionLevel: number;
  maxSoulConnection: number;
  enableCustomKeywords: boolean;
  enableCommunityContent: boolean;
  allowKeywordTrading: boolean;
  allowKeywordRenting: boolean;
  maxCollectionSize: number;
  keywordPricingModel: string;
  rarityDistribution: Record<KeywordRarity, number>;
  typeDistribution: Record<KeywordType, number>;
  categoryDistribution: Record<KeywordCategory, number>;
  elementBalance: Record<string, number>;
  factionBalance: Record<string, number>;
  enableMarketplace: boolean;
  enableTrading: boolean;
  enableCombinations: boolean;
  enableRelationships: boolean;
  enableTrees: boolean;
  enableLineage: boolean;
  enableBalance: boolean;
  enableStatistics: boolean;
  enableReviews: boolean;
  enableRatings: boolean;
  enableRecommendations: boolean;
  enableAutoBalance: boolean;
  balanceFrequency: number;
  balanceThreshold: number;
  enableTournaments: boolean;
  enableLeaderboards: boolean;
  enableAchievements: boolean;
  enableQuests: boolean;
  enableRewards: boolean;
  enableCurrencies: boolean;
  enableResources: boolean;
  enableReputation: boolean;
  enableBiography: boolean;
  enableLore: boolean;
  enableVoice: boolean;
  enableAppearance: boolean;
  enableCustomization: boolean;
}

// 關鍵詞系統錯誤
export interface KeywordSystemError {
  code: string;
  message: string;
  keywordId?: string;
  details: Record<string, any>;
  timestamp: Date;
  severity: 'low' | 'medium' | 'high' | 'critical';
}

// 關鍵詞系統結果
export interface KeywordSystemResult {
  success: boolean;
  message: string;
  data?: any;
  error?: KeywordSystemError;
  timestamp: Date;
}

// 關鍵詞系統狀態
export interface KeywordSystemState {
  keywords: Map<string, OmniKeyKeyword>;
  collections: Map<string, KeywordCollection>;
  markets: Map<string, KeywordMarket>;
  trees: Map<string, KeywordTree>;
  lineages: Map<string, KeywordLineage>;
  relationships: Map<string, KeywordRelationship>;
  combinations: Map<string, KeywordCombination>;
  statistics: Map<string, KeywordStatistics>;
  config: KeywordSystemConfig;
  activeKeywords: string[];
  recentActivity: string[];
  errors: KeywordSystemError[];
  balanceStatus: {
    lastBalance: Date;
    nextBalance: Date;
    isBalancing: boolean;
    balanceProgress: number;
    balanceResults: string[];
  };
}

// 關鍵詞系統管理器接口
export interface IKeywordSystemManager {
  initialize(): Promise<KeywordSystemResult>;
  createKeyword(keywordData: Partial<OmniKeyKeyword>): Promise<KeywordSystemResult>;
  getKeyword(keywordId: string): OmniKeyKeyword | null;
  searchKeywords(filter: KeywordSearchFilter): Promise<KeywordSearchResult>;
  getKeywordsByType(keywordType: KeywordType): OmniKeyKeyword[];
  getKeywordsByCategory(category: KeywordCategory): OmniKeyKeyword[];
  getKeywordsByElement(element: string): OmniKeyKeyword[];
  getKeywordsByFaction(faction: string): OmniKeyKeyword[];
  getKeywordsByRarity(rarity: KeywordRarity): OmniKeyKeyword[];
  levelUpKeyword(keywordId: string, experience: number): Promise<KeywordSystemResult>;
  unlockEffect(keywordId: string, effectId: string): Promise<KeywordSystemResult>;
  unlockCombination(keywordId: string, combinationId: string): Promise<KeywordSystemResult>;
  unlockTree(keywordId: string, treeId: string): Promise<KeywordSystemResult>;
  createRelationship(primaryId: string, secondaryId: string, relationship: KeywordRelationship): Promise<KeywordSystemResult>;
  createCombination(combination: KeywordCombination): Promise<KeywordSystemResult>;
  createTree(tree: KeywordTree): Promise<KeywordSystemResult>;
  getBalanceInfo(keywordId: string): KeywordBalance | null;
  getStatistics(keywordId: string): KeywordStatistics | null;
  getMarketData(keywordId: string): KeywordMarket | null;
  balanceKeywords(): Promise<KeywordSystemResult>;
  updateConfig(config: Partial<KeywordSystemConfig>): Promise<KeywordSystemResult>;
  getState(): KeywordSystemState;
  reset(): Promise<KeywordSystemResult>;
}

// 關鍵詞分析工具
export interface KeywordAnalyzer {
  analyzePowerLevel(keyword: OmniKeyKeyword): number;
  analyzeBalance(keyword: OmniKeyKeyword): KeywordBalance;
  analyzeSynergy(keyword: OmniKeyKeyword, otherKeywords: OmniKeyKeyword[]): number;
  analyzeCounter(keyword: OmniKeyKeyword, otherKeywords: OmniKeyKeyword[]): number;
  analyzeEffectiveness(keyword: OmniKeyKeyword): number;
  analyzeEfficiency(keyword: OmniKeyKeyword): number;
  analyzeVersatility(keyword: OmniKeyKeyword): number;
  analyzeFunFactor(keyword: OmniKeyKeyword): number;
  analyzeMetaShare(keyword: OmniKeyKeyword): number;
  analyzePopularity(keyword: OmniKeyKeyword): number;
  analyzeUsageRate(keyword: OmniKeyKeyword): number;
  analyzeWinRate(keyword: OmniKeyKeyword): number;
  analyzeBanRate(keyword: OmniKeyKeyword): number;
  analyzeRestrictions(keyword: OmniKeyKeyword): number;
}

// 關鍵詞平衡工具
export interface KeywordBalancer {
  balanceKeyword(keyword: OmniKeyKeyword): KeywordBalance;
  balanceKeywords(keywords: OmniKeyKeyword[]): KeywordBalance[];
  adjustPowerLevel(keyword: OmniKeyKeyword, adjustment: number): KeywordBalance;
  adjustCooldown(keyword: OmniKeyKeyword, adjustment: number): KeywordBalance;
  adjustDuration(keyword: OmniKeyKeyword, adjustment: number): KeywordBalance;
  adjustCost(keyword: OmniKeyKeyword, adjustment: number): KeywordBalance;
  adjustEffects(keyword: OmniKeyKeyword, adjustments: Record<string, number>): KeywordBalance;
  adjustConditions(keyword: OmniKeyKeyword, adjustments: Record<string, number>): KeywordBalance;
  adjustLimitations(keyword: OmniKeyKeyword, adjustments: Record<string, number>): KeywordBalance;
  generateRecommendations(keyword: OmniKeyKeyword): string[];
  validateBalance(keyword: OmniKeyKeyword): boolean;
  calculateBalanceScore(keyword: OmniKeyKeyword): number;
}

// 關鍵詞關係分析工具
export interface KeywordRelationshipAnalyzer {
  analyzeRelationship(primary: OmniKeyKeyword, secondary: OmniKeyKeyword): KeywordRelationship;
  analyzeSynergy(primary: OmniKeyKeyword, secondary: OmniKeyKeyword): number;
  analyzeAntagonism(primary: OmniKeyKeyword, secondary: OmniKeyKeyword): number;
  analyzeCombination(primary: OmniKeyKeyword, secondary: OmniKeyKeyword): KeywordCombination;
  analyzeCounter(primary: OmniKeyKeyword, secondary: OmniKeyKeyword): number;
  analyzeEnhancement(primary: OmniKeyKeyword, secondary: OmniKeyKeyword): number;
  analyzeSuppression(primary: OmniKeyKeyword, secondary: OmniKeyKeyword): number;
  analyzeReplacement(primary: OmniKeyKeyword, secondary: OmniKeyKeyword): number;
  analyzeSubstitution(primary: OmniKeyKeyword, secondary: OmniKeyKeyword): number;
  generateRelationships(primary: OmniKeyKeyword, secondaries: OmniKeyKeyword[]): KeywordRelationship[];
  validateRelationship(relationship: KeywordRelationship): boolean;
  calculateRelationshipStrength(relationship: KeywordRelationship): number;
}
