/**
 * TCG 萬能矩陣・卡牌原型機關類型定義
 * 基於《JunAiKey 聖典》萬能卡牌原型機關 (v1.4)
 * 實現卡牌系統的完整架構
 */

// 卡牌類型枚舉
export enum CardType {
  UNIT = 'unit',          // 單位卡
  SPELL = 'spell',        // 法術卡
  ARTIFACT = 'artifact',  // 神器卡
  ENCHANTMENT = 'enchantment', // 附魔卡
  LAND = 'land',          // 地牌卡
  PLANESWALKER = 'planeswalker', // 平面行者卡
  INSTANT = 'instant',    // 瞬間卡
  SORCERY = 'sorcery',    // 巫術卡
  EQUIPMENT = 'equipment', // 裝備卡
  TOKEN = 'token',        // 代幣卡
  VANGUARD = 'vanguard'   // 先鋒卡
}

// 卡牌稀有度枚舉
export enum CardRarity {
  COMMON = 'common',      // 普通
  UNCOMMON = 'uncommon',  // 不普通
  RARE = 'rare',          // 稀有
  EPIC = 'epic',          // 史詩
  LEGENDARY = 'legendary', // 傳說
  MYTHIC = 'mythic',      // 神話
  COSMIC = 'cosmic'       // 宇宙
}

// 卡牌色法枚舉
export enum CardColor {
  COLORLESS = 'colorless', // 無色
  WHITE = 'white',        // 白色
  BLUE = 'blue',          // 藍色
  BLACK = 'black',        // 黑色
  RED = 'red',            // 紅色
  GREEN = 'green',        // 綠色
  GOLDEN = 'golden',      // 金色
  PRISMATIC = 'prismatic' // 棱鏡色
}

// 卡牌狀態枚舉
export enum CardState {
  UNPLAYABLE = 'unplayable',   // 不可使用
  PLAYABLE = 'playable',       // 可使用
  EXHAUSTED = 'exhausted',     // 疲勞
  TAPPED = 'tapped',           // 已使用
  DESTROYED = 'destroyed',     // 已摧毀
  BANISHED = 'banished',       // 已放逐
  SILENCED = 'silenced',       // 已沉默
  SHACKLED = 'shackled'        // 已束縛
}

// 卡牌位置枚舉
export enum CardLocation {
  DECK = 'deck',           // 牌庫
  HAND = 'hand',           // 手牌
  FIELD = 'field',         // 場上
  GRAVEYARD = 'graveyard', // 墓地
  EXILE = 'exile',         // 放逐區
  LIMBO = 'limbo',         // 遊走區
  SIDEBOARD = 'sideboard', // 側牌區
  COMMAND = 'command'      // 指令區
}

// 卡牌能力類型
export enum AbilityType {
  PASSIVE = 'passive',     // 被動能力
  ACTIVE = 'active',       // 主動能力
  TRIGGERED = 'triggered', // 觸發能力
  REACTION = 'reaction',   // 反應能力
  CONTINUOUS = 'continuous', // 持續能力
  ULTIMATE = 'ultimate'    // 終極能力
}

// 卡牌分類
export interface CardCategory {
  id: string;
  name: string;
  description: string;
  parentCategory?: string;
  tags: string[];
  restrictions: string[];
}

// 卡牌屬性
export interface CardAttributes {
  attack?: number;         // 攻擊力
  defense?: number;        // 防禦力
  health?: number;         // 生命值
  manaCost?: number;       // 法力消耗
  power?: number;          // 力量
  toughness?: number;      // 韌性
  loyalty?: number;        // 忠誠度
  energy?: number;         // 能量
  corruption?: number;     // 邪惡值
  blessing?: number;       // 祝福值
  mastery?: number;        // 精通度
  resonance?: number;      // 共鳴度
  costReduction?: number;  // 成本降低
  bonus?: Record<string, number>; // 其他屬性加成
}

// 卡牌能力
export interface CardAbility {
  id: string;
  name: string;
  description: string;
  type: AbilityType;
  cost: CardAttributes;
  effects: CardEffect[];
  conditions: CardCondition[];
  limitations: string[];
  cooldown?: number;
  duration?: number;
  maxCharges?: number;
  currentCharges?: number;
  isStackable: boolean;
  targetRestrictions: string[];
  area: 'single' | 'group' | 'all' | 'random';
  range: number;
  priority: number;
  hidden: boolean;
  secret: boolean;
}

// 卡牌效果
export interface CardEffect {
  type: 'damage' | 'heal' | 'buff' | 'debuff' | 'transform' | 'summon' | 'destroy' | 'banish' | 'move' | 'draw' | 'discard' | 'search' | 'exile' | 'return' | 'copy' | 'steal' | 'exchange' | 'control' | 'manipulate' | 'create' | 'modify';
  value: number;
  duration?: number;
  target: 'self' | 'ally' | 'enemy' | 'all' | 'random' | 'specified';
  targetRestrictions: string[];
  area: 'single' | 'group' | 'all' | 'random' | 'specified';
  element?: string;
  scaling?: 'linear' | 'exponential' | 'logarithmic' | 'fixed';
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

// 卡牌條件
export interface CardCondition {
  type: 'health' | 'mana' | 'turn' | 'phase' | 'location' | 'state' | 'element' | 'ability' | 'card' | 'player' | 'opponent' | 'field' | 'graveyard';
  operator: 'equal' | 'greater' | 'less' | 'greater_equal' | 'less_equal' | 'not_equal' | 'contains' | 'matches';
  value: any;
  description: string;
  checkFrequency: 'on_activation' | 'on_start' | 'on_end' | 'on_phase' | 'on_turn' | 'continuous';
  isNegated: boolean;
}

// 卡牌資質
export interface CardStats {
  level: number;          // 等級
  experience: number;     // 經驗值
  power: number;          // 力量
  toughness: number;      // 韌性
  mastery: number;        // 精通度
  upgrades: number;       // 升級次數
  evolution: number;      // 進化階段
  enhancements: CardEnhancement[];
  modifications: CardModification[];
}

// 卡牌強化
export interface CardEnhancement {
  id: string;
  name: string;
  description: string;
  type: 'attribute' | 'ability' | 'effect' | 'resistance' | 'immunity';
  value: number;
  duration?: number;
  isStackable: boolean;
  source: string;
  timestamp: Date;
}

// 卡牌修改
export interface CardModification {
  id: string;
  name: string;
  description: string;
  type: 'permanent' | 'temporary' | 'conditional';
  value: any;
  duration?: number;
  conditions: CardCondition[];
  isRemovable: boolean;
  source: string;
  timestamp: Date;
}

// 卡牌歷史記錄
export interface CardHistory {
  id: string;
  action: string;
  description: string;
  timestamp: Date;
  location: CardLocation;
  player: string;
  game: string;
  details: Record<string, any>;
}

// 卡牌收藏
export interface CardCollection {
  id: string;
  playerId: string;
  cardId: string;
  quantity: number;
  foil: boolean;
  signed: boolean;
  condition: 'mint' | 'near_mint' | 'excellent' | 'good' | 'fair' | 'poor';
  dateAcquired: Date;
  purchasePrice: number;
  currentValue: number;
  isTradable: boolean;
  notes: string;
}

// 卡牌合併
export interface CardSynergy {
  primary: string;        // 主要卡牌ID
  secondary: string;      // 次要卡牌ID
  effect: string;         // 合併效果
  multiplier: number;     // 效果倍率
  conditions: string[];   // 合併條件
  requirements: string[]; // 合併要求
}

// 卡牌譜系
export interface CardLineage {
  id: string;
  name: string;
  description: string;
  evolutionPath: string[];
  baseCard: string;
  finalForm: string;
  evolutionRequirements: string[];
  specialAbilities: string[];
}

// 卡牌基礎結構
export interface BaseCard {
  id: string;
  name: string;
  description: string;
  type: CardType;
  rarity: CardRarity;
  color: CardColor;
  cost: number;
  power: number;
  toughness: number;
  abilities: CardAbility[];
  categories: string[];
  tags: string[];
  restrictions: string[];
  artist: string;
  illustrator: string;
  releaseDate: Date;
  version: string;
  isCustom: boolean;
  communityContent: boolean;
  rating: number;
  playCount: number;
  winRate: number;
}

// 完整卡牌結構
export interface OmniKeyCard extends BaseCard {
  element: string;        // 所屬元素
  faction: string;        // 所屬陣營
  stats: CardStats;       // 卡牌屬性
  attributes: CardAttributes; // 卡牌數值
  currentLocation: CardLocation; // 當前位置
  currentState: CardState; // 當前狀態
  owner: string;          // 擁有者
  controller: string;     // 控制者
  history: CardHistory[]; // 歷史記錄
  synergies: CardSynergy[]; // 協同效果
  lineage?: CardLineage;  // 卡牌譜系
  collection?: CardCollection; // 收藏資訊
  isActive: boolean;
  isHighlighted: boolean;
  isFaceDown: boolean;
  isLocked: boolean;
  isHidden: boolean;
  metadata: Record<string, any>;
}

// 單位卡
export interface UnitCard extends OmniKeyCard {
  type: CardType.UNIT;
  health: number;
  attack: number;
  movement: number;
  range: number;
  skills: string[];
  equipment: string[];
  abilities: CardAbility[];
}

// 法術卡
export interface SpellCard extends OmniKeyCard {
  type: CardType.SPELL;
  spellSchool: string;
  spellLevel: number;
  castingTime: string;
  range: number;
  components: string[];
  materialComponents: string;
  ritual: boolean;
  concentration: boolean;
}

// 神器卡
export interface ArtifactCard extends OmniKeyCard {
  type: CardType.ARTIFACT;
  artifactType: string;
  manaStorage: number;
  chargeTime: number;
  passiveEffects: CardEffect[];
  activeEffects: CardEffect[];
}

// 平面行者卡
export interface PlaneswalkerCard extends OmniKeyCard {
  type: CardType.PLANESWALKER;
  loyalty: number;
  startingLoyalty: number;
  abilities: CardAbility[];
  ultimateAbility: CardAbility;
  planeswalkerType: string;
}

// 代幣卡
export interface TokenCard extends OmniKeyCard {
  type: CardType.TOKEN;
  isGenerated: boolean;
  parentCard: string;
  tokenType: string;
  lifespan: number;
}

// 卡牌組
export interface CardDeck {
  id: string;
  name: string;
  description: string;
  playerId: string;
  cards: OmniKeyCard[];
  sideboard: OmniKeyCard[];
  commander?: string;
  format: string;
  strategy: string;
  cardCount: number;
  averageManaCost: number;
  colorDistribution: Record<CardColor, number>;
  elementDistribution: Record<string, number>;
  powerLevel: number;
  winRate: number;
  lastUpdated: Date;
  isPublic: boolean;
  isTournamentLegal: boolean;
  tournamentWins: number;
  tournamentPlacements: string[];
}

// 卡牌設計師
export interface CardDesigner {
  id: string;
  name: string;
  title: string;
  bio: string;
  style: string[];
  notableWorks: string[];
  awards: string[];
  joinDate: Date;
  lastActivity: Date;
  followerCount: number;
  followingCount: number;
}

// 卡牌評價
export interface CardReview {
  id: string;
  cardId: string;
  reviewerId: string;
  rating: number;
  title: string;
  content: string;
  pros: string[];
  cons: string[];
  suggestions: string[];
  playability: number;
  powerLevel: number;
  funFactor: number;
  recommendedFormat: string[];
  createdAt: Date;
  updatedAt: Date;
  isVerified: boolean;
  helpfulCount: number;
}

// 卡牌市場
export interface CardMarket {
  id: string;
  cardId: string;
  price: number;
  quantity: number;
  condition: 'mint' | 'near_mint' | 'excellent' | 'good' | 'fair' | 'poor';
  isFoil: boolean;
  isSigned: boolean;
  sellerId: string;
  listingDate: Date;
  lastUpdated: Date;
  isActive: boolean;
  salesHistory: CardSale[];
}

// 卡牌交易記錄
export interface CardSale {
  id: string;
  cardId: string;
  sellerId: string;
  buyerId: string;
  price: number;
  quantity: number;
  condition: string;
  saleDate: Date;
  platform: string;
  transactionId: string;
}

// 卡牌統計
export interface CardStatistics {
  cardId: string;
  playCount: number;
  winRate: number;
  usageRate: number;
  averagePlacement: number;
  tournamentParticipation: number;
  tournamentWins: number;
  metaShare: number;
  popularityIndex: number;
  powerLevel: number;
  versatility: number;
  synergyScore: number;
  banRate: number;
  restrictionCount: number;
}

// 卡牌搜索過濾器
export interface CardSearchFilter {
  name?: string;
  type?: CardType;
  rarity?: CardRarity;
  color?: CardColor;
  element?: string;
  faction?: string;
  cost?: { min?: number; max?: number };
  power?: { min?: number; max?: number };
  toughness?: { min?: number; max?: number };
  abilities?: string[];
  tags?: string[];
  artist?: string;
  releaseDate?: { start?: Date; end?: Date };
  format?: string;
  isCustom?: boolean;
  communityContent?: boolean;
  rating?: { min?: number; max?: number };
}

// 卡牌搜索結果
export interface CardSearchResult {
  cards: OmniKeyCard[];
  total: number;
  page: number;
  pageSize: number;
  filters: CardSearchFilter;
  sortOptions: string[];
  hasMore: boolean;
  searchTime: number;
}

// 卡牌系統配置
export interface CardSystemConfig {
  maxDeckSize: number;
  minDeckSize: number;
  maxCardCopies: number;
  maxSideboardSize: number;
  enabledFormats: string[];
  bannedCards: string[];
  restrictedCards: string[];
  customCardRules: Record<string, any>;
  enableMarketplace: boolean;
  enableTrading: boolean;
  enableCustomCards: boolean;
  enableCommunityContent: boolean;
  maxCollectionSize: number;
  cardPricingModel: string;
  rarityDistribution: Record<CardRarity, number>;
}

// 卡牌系統錯誤
export interface CardSystemError {
  code: string;
  message: string;
  cardId?: string;
  details: Record<string, any>;
  timestamp: Date;
  severity: 'low' | 'medium' | 'high' | 'critical';
}

// 卡牌系統結果
export interface CardSystemResult {
  success: boolean;
  message: string;
  data?: any;
  error?: CardSystemError;
  timestamp: Date;
}

// 卡牌系統狀態
export interface CardSystemState {
  cards: Map<string, OmniKeyCard>;
  decks: Map<string, CardDeck>;
  collections: Map<string, CardCollection>;
  market: Map<string, CardMarket>;
  statistics: Map<string, CardStatistics>;
  config: CardSystemConfig;
  activeDecks: string[];
  recentActivity: CardHistory[];
  errors: CardSystemError[];
}

// 卡牌系統管理器接口
export interface ICardSystemManager {
  initialize(): Promise<CardSystemResult>;
  createCard(cardData: Partial<OmniKeyCard>): Promise<CardSystemResult>;
  getCard(cardId: string): OmniKeyCard | null;
  searchCards(filter: CardSearchFilter): Promise<CardSearchResult>;
  createDeck(deckData: Partial<CardDeck>): Promise<CardSystemResult>;
  getDeck(deckId: string): CardDeck | null;
  updateDeck(deckId: string, updates: Partial<CardDeck>): Promise<CardSystemResult>;
  deleteDeck(deckId: string): Promise<CardSystemResult>;
  addCardToDeck(deckId: string, cardId: string, quantity: number): Promise<CardSystemResult>;
  removeCardFromDeck(deckId: string, cardId: string, quantity: number): Promise<CardSystemResult>;
  validateDeck(deck: CardDeck): Promise<CardSystemResult>;
  getStatistics(cardId: string): CardStatistics | null;
  getMarketData(cardId: string): CardMarket | null;
  createCollection(collectionData: Partial<CardCollection>): Promise<CardSystemResult>;
  updateConfig(config: Partial<CardSystemConfig>): Promise<CardSystemResult>;
  getState(): CardSystemState;
  reset(): Promise<CardSystemResult>;
}
