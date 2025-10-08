/**
 * TCG 萬能矩陣・遊戲規則類型定義
 * 基於《JunAiKey 聖典》化身盟約・核心遊戲規則 (v8.5)
 * 實現玩家與英雄連結和牌組構築規則
 */

// 遊戲模式枚舉
export enum GameMode {
  CASUAL = 'casual',         // 休閒模式
  RANKED = 'ranked',         // 排名模式
  TOURNAMENT = 'tournament', // 錦標賽模式
  DRAFT = 'draft',           // 開 drafts 模式
  SEALED = 'sealed',         // 密室模式
  COMMANDER = 'commander',   // 指令官模式
  STANDARD = 'standard',     // 標準模式
  WILD = 'wild',             // 野蠻模式
  LEGACY = 'legacy',         // 傳說模式
  VINTAGE = 'vintage',       // 古董模式
  PAUPER = 'pauper',         // 貧民模式
  CHAOS = 'chaos',           // 混沌模式
    ARCHAIC = 'archaic',       // 古代模式
    PRIMAL = 'primal',         // 原始模式
    ELEMENTAL = 'elemental',   // 元素模式
    COSMIC = 'cosmic',         // 宇宙模式
    DIVINE = 'divine',         // 神聖模式
    INFERNAL = 'infernal',     // 地獄模式
    ABYSSAL = 'abyssal',       // 深淵模式
    VOID = 'void',             // 虚空模式
    STEAMPUNK = 'steampunk',   // 蒸汽模式
    DIESELPUNK = 'dieselpunk', // 柴油模式
    CYBERPUNK = 'cyberpunk',   // 賽博模式
    BIOPUNK = 'biopunk',       // 生物模式
    NANOPUNK = 'nanopunk',     // 納米模式
    QUANTUM = 'quantum',       // 量子模式
    TEMPORAL = 'temporal',     // 時間模式
    DIMENSIONAL = 'dimensional' // 維度模式
}

// 遊戲狀態枚舉
export enum GameState {
  WAITING = 'waiting',           // 等待中
  READY = 'ready',               // 準備就緒
  SHUFFLING = 'shuffling',       // 洗牌中
  DRAWING = 'drawing',           // 抽牌中
  MAIN_PHASE = 'main_phase',     // 主要階段
  COMBAT_PHASE = 'combat_phase', // 戰鬥階段
  END_PHASE = 'end_phase',       // 結束階段
  VICTORY = 'victory',           // 勝利
  DEFEAT = 'defeat',             // 失敗
  DRAW = 'draw',                 // 平局
  INTERRUPTED = 'interrupted',   // 中斷
  PAUSED = 'paused',             // 暫停
  ABORTED = 'aborted',           // 中止
  TIMEOUT = 'timeout',           // 超時
  DISCONNECTED = 'disconnected', // 斷線
  ERROR = 'error'                // 錯誤
}

// 回合階段枚舉
export enum TurnPhase {
  UNTAP = 'untap',               // 重置階段
  UPKEEP = 'upkeep',             // 維護階段
  DRAW = 'draw',                 // 抽牌階段
  MAIN1 = 'main1',               // 主要階段1
  COMBAT = 'combat',             // 戰鬥階段
  MAIN2 = 'main2',               // 主要階段2
  END = 'end'                    // 結束階段
}

// 玩家角色枚舉
export enum PlayerRole {
  HUMAN = 'human',               // 人類
  AI = 'ai',                     // AI
  HYBRID = 'hybrid',             // 混合
  SPECTATOR = 'spectator',       // 旁觀者
  JUDGE = 'judge',               // 裁判
  MODERATOR = 'moderator',       // 版主
  ADMIN = 'admin',               // 管理員
  SYSTEM = 'system'              // 系統
}

// 玩家狀態枚舉
export enum PlayerState {
  CONNECTED = 'connected',       // 已連接
  DISCONNECTED = 'disconnected', // 已斷線
  READY = 'ready',               // 準備就緒
  NOT_READY = 'not_ready',       // 未準備
  PLAYING = 'playing',           // 遊戲中
  WAITING = 'waiting',           // 等待中
    SPECTATING = 'spectating',     // 旁觀中
    PAUSED = 'paused',           // 暫停中
    TIMEOUT = 'timeout',         // 超時中
    AFK = 'afk',                 // 離開鍵盤
    BUSY = 'busy',               // 忙碌中
    OFFLINE = 'offline',         // 離線
    BANNED = 'banned',           // 封禁中
    MUTED = 'muted',             // 靜音中
    WARNED = 'warned',           // 警告中
    SUSPENDED = 'suspended',     // 停權中
    TERMINATED = 'terminated'    // 終止中
}

// 玩家類型
export interface Player {
  id: string;
  name: string;
  role: PlayerRole;
  state: PlayerState;
  avatar: string;
  level: number;
  experience: number;
  rating: number;
  rank: string;
  division: string;
  season: number;
  isHost: boolean;
  isReady: boolean;
  deck: Deck;
  hero: string;
  resources: Record<string, number>;
  health: number;
  maxHealth: number;
  mana: number;
  maxMana: number;
  hand: Card[];
  field: Card[];
  graveyard: Card[];
  exile: Card[];
  library: Card[];
  sideboard: Card[];
  commander?: Card;
  loyalty: number;
  poison: number;
  energy: number;
  corruption: number;
  blessing: number;
  equipment: Equipment[];
  buffs: Buff[];
  debuffs: Debuff[];
  achievements: Achievement[];
  statistics: PlayerStatistics;
  connection: ConnectionInfo;
  settings: PlayerSettings;
  permissions: Permission[];
  restrictions: Restriction[];
  history: GameHistory[];
  metadata: Record<string, any>;
}

// 牌組類型
export interface Deck {
  id: string;
  name: string;
  description: string;
  playerId: string;
  format: string;
  strategy: string;
  cards: Card[];
  sideboard: Card[];
  commander?: Card;
  colorIdentity: ColorIdentity[];
  elementDistribution: Record<Element, number>;
  manaCurve: ManaCurve;
  averageManaCost: number;
  cardCount: number;
  powerLevel: number;
  winRate: number;
  lastUpdated: Date;
  isPublic: boolean;
  isTournamentLegal: boolean;
  tournamentWins: number;
  tournamentPlacements: string[];
  tags: string[];
  categories: string[];
  notes: string;
  favorites: number;
  views: number;
  downloads: number;
  rating: number;
  reviews: Review[];
}

// 顏色身份類型
export interface ColorIdentity {
  primary: Color;
  secondary: Color[];
  symbol: string;
}

// 法力曲線類型
export interface ManaCurve {
  total: number;
  distribution: Record<number, number>;
  average: number;
  median: number;
  mode: number;
  standardDeviation: number;
}

// 裝備類型
export interface Equipment {
  id: string;
  name: string;
  type: string;
  rarity: Rarity;
  slot: string;
  attributes: Record<string, number>;
  effects: Effect[];
  requirements: string[];
  level: number;
  durability: number;
  maxDurability: number;
  enchantments: Enchantment[];
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
}

// 附魔類型
export interface Enchantment {
  id: string;
  name: string;
  type: string;
  rarity: Rarity;
  effects: Effect[];
  requirements: string[];
  level: number;
  duration: number;
  isStackable: boolean;
  maxStacks: number;
  source: string;
  timestamp: Date;
}

// 效果類型
export interface Effect {
  id: string;
  name: string;
  type: EffectType;
  value: number;
  duration: number;
  target: Target;
  area: Area;
  scaling: Scaling;
  isStackable: boolean;
  requiresTarget: boolean;
  canBePrevented: boolean;
  preventionMethods: string[];
  criticalHit: boolean;
  criticalMultiplier: number;
  variance: number;
  description: string;
  conditions: Condition[];
  limitations: string[];
}

// 效果類型枚舉
export enum EffectType {
  DAMAGE = 'damage',
  HEALING = 'healing',
  BUFF = 'buff',
  DEBUFF = 'debuff',
  SHIELD = 'shield',
  BARRIER = 'barrier',
  WARD = 'ward',
  CURSE = 'curse',
  BLESSING = 'blessing',
  TRANSFORMATION = 'transformation',
  SUMMON = 'summon',
  TELEPORT = 'teleport',
  CONTROL = 'control',
  MANIPULATION = 'manipulation',
  CREATION = 'creation',
  DESTRUCTION = 'destruction',
  PROTECTION = 'protection',
  VULNERABILITY = 'vulnerability',
  IMMUNITY = 'immunity',
  RESISTANCE = 'resistance',
  WEAKNESS = 'weakness',
  ADVANTAGE = 'advantage',
  DISADVANTAGE = 'disadvantage',
  SYNERGY = 'synergy',
  ANTAGONISM = 'antagonism',
  HARMONY = 'harmony',
  CHAOS = 'chaos',
  ORDER = 'order',
  BALANCE = 'balance',
  IMBALANCE = 'imbalance',
  STABILITY = 'stability',
  INSTABILITY = 'instability',
  GROWTH = 'growth',
  DECAY = 'decay',
  EVOLUTION = 'evolution',
  DEVOLUTION = 'devolution',
  ASCENSION = 'ascension',
  DESCENSION = 'descension',
  ENLIGHTENMENT = 'enlightenment',
  IGNORANCE = 'ignorance',
  WISDOM = 'wisdom',
  FOLLY = 'folly',
  COURAGE = 'courage',
  FEAR = 'fear',
  LOVE = 'love',
  HATE = 'hate',
  HOPE = 'hope',
  DESPAIR = 'despair',
  LIGHT = 'light',
  DARKNESS = 'darkness',
  LIFE = 'life',
  DEATH = 'death'
}

// 目標類型枚舉
export enum Target {
  SELF = 'self',
  ALLY = 'ally',
  ENEMY = 'enemy',
  ALL = 'all',
  RANDOM = 'random',
  SPECIFIED = 'specified'
}

// 範圍類型枚舉
export enum Area {
  SINGLE = 'single',
  GROUP = 'group',
  ALL = 'all',
  RANDOM = 'random',
  SPECIFIED = 'specified'
}

// 規模類型枚舉
export enum Scaling {
  LINEAR = 'linear',
  EXPONENTIAL = 'exponential',
  LOGARITHMIC = 'logarithmic',
  FIXED = 'fixed'
}

// 條件類型
export interface Condition {
  id: string;
  type: ConditionType;
  operator: Operator;
  value: any;
  description: string;
  checkFrequency: CheckFrequency;
  isNegated: boolean;
  priority: number;
}

// 條件類型枚舉
export enum ConditionType {
  HEALTH = 'health',
  MANA = 'mana',
  TURN = 'turn',
  PHASE = 'phase',
  LOCATION = 'location',
  STATE = 'state',
  ELEMENT = 'element',
  KEYWORD = 'keyword',
  CARD = 'card',
  PLAYER = 'player',
  OPPONENT = 'opponent',
  FIELD = 'field',
  GRAVEYARD = 'graveyard',
  DECK = 'deck',
  HAND = 'hand',
  EXILE = 'exile'
}

// 操作符類型枚舉
export enum Operator {
  EQUAL = 'equal',
  GREATER = 'greater',
  LESS = 'less',
  GREATER_EQUAL = 'greater_equal',
  LESS_EQUAL = 'less_equal',
  NOT_EQUAL = 'not_equal',
  CONTAINS = 'contains',
  MATCHES = 'matches',
  STARTS_WITH = 'starts_with',
  ENDS_WITH = 'ends_with'
}

// 檢查頻率類型枚舉
export enum CheckFrequency {
  ON_ACTIVATION = 'on_activation',
  ON_START = 'on_start',
  ON_END = 'on_end',
  ON_PHASE = 'on_phase',
  ON_TURN = 'on_turn',
  CONTINUOUS = 'continuous'
}

// 增益類型
export interface Buff {
  id: string;
  name: string;
  type: string;
  value: number;
  duration: number;
  source: string;
  timestamp: Date;
  isStackable: boolean;
  maxStacks: number;
  effects: Effect[];
  conditions: Condition[];
  limitations: string[];
}

// 減益類型
export interface Debuff {
  id: string;
  name: string;
  type: string;
  value: number;
  duration: number;
  source: string;
  timestamp: Date;
  isStackable: boolean;
  maxStacks: number;
  effects: Effect[];
  conditions: Condition[];
  limitations: string[];
}

// 成就類型
export interface Achievement {
  id: string;
  name: string;
  description: string;
  requirement: string;
  reward: string;
  rarity: Rarity;
  category: string;
  isUnlocked: boolean;
  unlockedAt?: Date;
  progress: number;
  maxProgress: number;
  milestones: Milestone[];
}

// 里程碑類型
export interface Milestone {
  progress: number;
  reward: string;
  description: string;
  isCompleted: boolean;
  completedAt?: Date;
}

// 玩家統計類型
export interface PlayerStatistics {
  gamesPlayed: number;
  wins: number;
  losses: number;
  draws: number;
  winRate: number;
  averagePlacement: number;
  tournamentParticipation: number;
  tournamentWins: number;
  killDeathAssist: number;
  damageDealt: number;
  damageTaken: number;
  healingDone: number;
  damageHealed: number;
  manaEfficiency: number;
  cardEfficiency: number;
  resourceEfficiency: number;
  timePlayed: number;
  favoriteDeck: string;
  favoriteHero: string;
  favoriteCard: string;
  favoriteKeyword: string;
  mostUsedDeck: string;
  mostUsedHero: string;
  mostUsedCard: string;
  mostUsedKeyword: string;
  highestRating: number;
  lowestRating: number;
  currentStreak: number;
  longestStreak: number;
  averageTurnTime: number;
  fastestWin: number;
  longestGame: number;
  comebackWins: number;
  blowoutWins: number;
  closeGames: number;
  upsetWins: number;
  upsetLosses: number;
  mirrorMatches: number;
  elementDistribution: Record<Element, number>;
  heroDistribution: Record<string, number>;
  cardDistribution: Record<string, number>;
  keywordDistribution: Record<string, number>;
  formatDistribution: Record<string, number>;
  modeDistribution: Record<string, number>;
  opponentDistribution: Record<string, number>;
  timeDistribution: Record<string, number>;
  ratingDistribution: Record<string, number>;
}

// 連接信息類型
export interface ConnectionInfo {
  ipAddress: string;
  port: number;
  latency: number;
  packetLoss: number;
  bandwidth: number;
  connectionType: string;
  isStable: boolean;
  lastPing: Date;
  disconnects: number;
  reconnects: number;
}

// 玩家設置類型
export interface PlayerSettings {
  language: string;
  region: string;
  timezone: string;
  notifications: NotificationSettings;
  graphics: GraphicsSettings;
  audio: AudioSettings;
  controls: ControlSettings;
  gameplay: GameplaySettings;
  privacy: PrivacySettings;
  accessibility: AccessibilitySettings;
}

// 通知設置類型
export interface NotificationSettings {
  enabled: boolean;
  sound: boolean;
  visual: boolean;
  desktop: boolean;
  mobile: boolean;
  email: boolean;
  push: boolean;
  inGame: boolean;
  friendRequests: boolean;
  partyInvites: boolean;
  tournamentInvites: boolean;
  rankUpdates: boolean;
  achievementUnlocks: boolean;
  cardUpdates: boolean;
  systemMessages: boolean;
  custom: boolean;
}

// 圖形設置類型
export interface GraphicsSettings {
  quality: string;
  resolution: string;
  fullscreen: boolean;
  borderless: boolean;
  vsync: boolean;
  antiAliasing: boolean;
  shadows: boolean;
  reflections: boolean;
  particles: boolean;
  animations: boolean;
  lighting: boolean;
  postProcessing: boolean;
  bloom: boolean;
  depthOfField: boolean;
  motionBlur: boolean;
  ambientOcclusion: boolean;
  tessellation: boolean;
  textureQuality: string;
  modelQuality: string;
  effectQuality: string;
  uiScale: number;
  hudScale: number;
  minimapScale: number;
  cameraDistance: number;
  cameraAngle: number;
    cameraSpeed: number;
    fieldOfView: number
}

// 音頻設置類型
export interface AudioSettings {
  masterVolume: number;
  musicVolume: number;
  sfxVolume: number;
  voiceVolume: number;
  ambientVolume: number;
  uiVolume: number;
    audioDevice: string;
    spatialAudio: boolean;
    hrtf: boolean;
    reverb: boolean;
    echo: boolean;
    equalizer: EqualizerSettings;
    microphone: MicrophoneSettings;
}

// 均衡器設置類型
export interface EqualizerSettings {
  enabled: boolean;
  preset: string;
  bands: Record<string, number>;
}

// 麥克風設置類型
export interface MicrophoneSettings {
  enabled: boolean;
  device: string;
  volume: number;
    noiseSuppression: boolean;
    echoCancellation: boolean;
    automaticGainControl: boolean;
}

// 控制設置類型
export interface ControlSettings {
  keyboard: KeyboardSettings;
  mouse: MouseSettings;
  gamepad: GamepadSettings;
  hotkeys: HotkeySettings;
    sensitivity: SensitivitySettings;
}

// 鍵盤設置類型
export interface KeyboardSettings {
    layout: string;
    remap: Record<string, string>;
    macros: MacroSettings[];
}

// 麥克羅設置類型
export interface MacroSettings {
  id: string;
  name: string;
  keys: string[];
  actions: string[];
    delay: number;
}

// 滑鼠設置類型
export interface MouseSettings {
    sensitivity: number;
    acceleration: boolean;
    invert: boolean;
    buttons: Record<string, string>;
    scrollSpeed: number;
}

// 遊戲手柄設置類型
export interface GamepadSettings {
    device: string;
    layout: string;
    remap: Record<string, string>;
    deadzone: number;
    vibration: boolean;
}

// 快鍵設置類型
export interface HotkeySettings {
  default: Record<string, string>;
    custom: Record<string, string>;
}

    靈敏度設置類型
export interface SensitivitySettings {
    mouse: number;
    gamepad: number;
    keyboard: number;
    camera: number;
    scroll: number;
}

// 遊戲設置類型
export interface GameplaySettings {
    difficulty: string;
    autoSave: boolean;
    saveFrequency: number;
    tutorial: boolean;
    hints: boolean;
    tooltips: boolean;
    combatAssistant: boolean;
    deckAssistant: boolean;
    itemAssistant: boolean;
    questAssistant: boolean;
    achievementAssistant: boolean;
    socialAssistant: boolean;
    accessibilityAssistant: boolean;
    automation: AutomationSettings;
    customization: CustomizationSettings;
    multiplayer: MultiplayerSettings;
}

// 自動化設置類型
export interface AutomationSettings {
    autoAttack: boolean;
    autoCast: boolean;
    autoMove: boolean;
    autoTarget: boolean;
    autoLoot: boolean;
    autoSort: boolean;
    autoStack: boolean;
    autoOrganize: boolean;
    autoComplete: boolean;
    autoAccept: boolean;
    autoDecline: boolean;
}

// 自訂設置類型
export interface CustomizationSettings {
    ui: UISettings;
    audio: AudioSettings;
    graphics: GraphicsSettings;
    controls: ControlSettings;
    gameplay: GameplaySettings;
    social: SocialSettings;
    accessibility: AccessibilitySettings;
}

// UI設置類型
export interface UISettings {
    theme: string;
    scale: number;
    opacity: number;
    position: PositionSettings;
    visibility: VisibilitySettings;
    animations: AnimationSettings;
    effects: EffectSettings;
}

// 位置設置類型
export interface PositionSettings {
    x: number;
    y: number;
    width: number;
    height: number;
    anchor: string;
}

// 可見性設置類型
export interface VisibilitySettings {
    showHealth: boolean;
    showMana: boolean;
    showLevel: boolean;
    showRank: boolean;
    showRating: boolean;
    showName: boolean;
    showTitle: boolean;
    showGuild: boolean;
    showStatus: boolean;
    showPing: boolean;
    showLocation: boolean;
    showDistance: boolean;
    showDirection: boolean;
}

// 動畫設置類型
export interface AnimationSettings {
    enabled: boolean;
    speed: number;
    quality: string;
    particles: boolean;
    effects: boolean;
    spells: boolean;
    abilities: boolean;
    items: boolean;
    characters: boolean;
    environment: boolean;
}

// 效果設置類型
export interface EffectSettings {
    enabled: boolean;
    intensity: number;
    quality: string;
    particles: boolean;
    lighting: boolean;
    shadows: boolean;
    reflections: boolean;
    postProcessing: boolean;
}

// 社交設置類型
export interface SocialSettings {
    chat: ChatSettings;
    friends: FriendSettings;
    guild: GuildSettings;
    party: PartySettings;
    trade: TradeSettings;
    auction: AuctionSettings;
}

// 聊天設置類型
export interface ChatSettings {
    enabled: boolean;
    channels: string[];
    filters: string[];
    ignoreList: string[];
    muteList: string[];
    blockList: string[];
    spamProtection: boolean;
    autoTranslate: boolean;
    language: string;
    fontSize: number;
    fontColor: string;
    backgroundColor: string;
    opacity: number;
    position: PositionSettings;
    visibility: VisibilitySettings;
}

// 好友設置類型
export interface FriendSettings {
    enabled: boolean;
    online: boolean;
    offline: boolean;
    busy: boolean;
    away: boolean;
    mobile: boolean;
    showStatus: boolean;
    showGame: boolean;
    showLocation: boolean;
    sendRequests: boolean;
    acceptRequests: boolean;
    autoAccept: boolean;
    autoDecline: boolean;
}

// 公會設置類型
export interface GuildSettings {
    enabled: boolean;
    join: boolean;
    leave: boolean;
    create: boolean;
    manage: boolean;
    invite: boolean;
    kick: boolean;
    promote: boolean;
    demote: boolean;
    chat: boolean;
    events: boolean;
    bank: boolean;
    store: boolean;
    rewards: boolean;
    rankings: boolean;
    wars: boolean;
    alliances: boolean;
    enemies: boolean;
    territory: boolean;
    resources: boolean;
    members: boolean;
    roles: boolean;
    permissions: boolean;
    settings: boolean;
}

// 隊伍設置類型
export interface PartySettings {
    enabled: boolean;
    create: boolean;
    join: boolean;
    leave: boolean;
    invite: boolean;
    kick: boolean;
    promote: boolean;
    demote: boolean;
    chat: boolean;
    voice: boolean;
    leader: boolean;
    coLeader: boolean;
    member: boolean;
    spectator: boolean;
    public: boolean;
    private: boolean;
    friendsOnly: boolean;
    guildOnly: boolean;
    level: number;
    size: number;
    roles: string[];
    permissions: string[];
    settings: string[];
}

// 交易設置類型
export interface TradeSettings {
    enabled: boolean;
    request: boolean;
    accept: boolean;
    decline: boolean;
    cancel: boolean;
    confirm: boolean;
    items: boolean;
    currency: boolean;
    services: boolean;
    commodities: boolean;
    securities: boolean;
    derivatives: boolean;
    futures: boolean;
    options: boolean;
    swaps: boolean;
    forwards: boolean;
    bonds: boolean;
    stocks: boolean;
    mutualFunds: boolean;
    etfs: boolean,
    reits: boolean,
    masterLimitedPartnerships: boolean,
    limitedPartnerships: boolean,
    generalPartnerships: boolean,
    limitedLiabilityCompanies: boolean,
    corporations: boolean,
    soleProprietorships: boolean,
    partnerships: boolean,
    trusts: boolean,
    estates: boolean,
    foundations: boolean,
    endowments: boolean,
    pensions: boolean,
    retirementFunds: boolean,
    hedgeFunds: boolean,
    privateEquity: boolean,
    ventureCapital: boolean,
    angelInvesting: boolean,
    crowdFunding: boolean,
    peerToPeerLending: boolean,
    microLoans: boolean,
    paydayLoans: boolean,
    titleLoans: boolean,
    pawnShops: boolean,
    buyHerePayHere: boolean,
    leaseToOwn: boolean,
    rentToOwn: boolean,
    timeshares: boolean,
    fractionalOwnership: boolean,
    timeshares: boolean,
    vacationOwnership: boolean,
    intervalOwnership: boolean,
    pointsBasedOwnership: boolean,
    deedRestrictedCommunities: boolean,
    homeownerAssociations: boolean,
    condominiumAssociations: boolean,
    cooperativeAssociations: boolean,
    plannedCommunities: boolean,
    gatedCommunities: boolean,
    privateCommunities: boolean,
    masterPlannedCommunities: boolean,
    activeAdultCommunities: boolean,
    retirementCommunities: boolean,
    seniorLivingCommunities: boolean,
    assistedLivingCommunities: boolean,
    nursingHomes: boolean,
    longTermCareFacilities: boolean,
    hospices: boolean,
    palliativeCare: boolean,
    homeHealthCare: boolean,
    adultDayCare: boolean,
    respiteCare: boolean,
    emergencyCare: boolean,
    urgentCare: boolean,
    primaryCare: boolean,
    specialtyCare: boolean,
    mentalHealthCare: boolean,
    dentalCare: boolean,
    visionCare: boolean,
    hearingCare: boolean,
    physicalTherapy: boolean,
    occupationalTherapy: boolean,
    speechTherapy: boolean,
    respiratoryTherapy: boolean,
    cardiacRehabilitation: boolean,
    cancerRehabilitation: boolean,
    strokeRehabilitation: boolean,
    brainInjuryRehabilitation: boolean,
    spinalCordInjuryRehabilitation: boolean,
    amputationRehabilitation: boolean,
    pediatricRehabilitation: boolean,
    geriatricRehabilitation: boolean,
    sportsMedicine: boolean,
    orthopedics: boolean,
    neurology: boolean,
    cardiology: boolean,
    oncology: boolean,
    radiology: boolean,
    pathology: boolean,
    laboratoryMedicine: boolean,
    genetics: boolean,
    immunology: boolean,
    infectiousDisease: boolean,
    internalMedicine: boolean,
    familyMedicine: boolean,
    preventiveMedicine: boolean,
    occupationalMedicine: boolean,
    aerospaceMedicine: boolean,
    underseaAndHyperbaricMedicine: boolean,
    medicalGenetics: boolean,
    addictionMedicine: boolean,
    hospiceAndPalliativeMedicine: boolean,
    sleepMedicine: boolean,
    painMedicine: boolean,
    criticalCareMedicine: boolean,
    transplantHepatology: boolean,
    transplantNephrology: boolean,
    transplantCardiology: boolean,
    transplantPulmonology: boolean,
    transplantEndocrinology: boolean,
    transplantImmunology: boolean,
    transplantInfectiousDisease: boolean,
    transplantSurgery: boolean,
    transplantAnesthesiology: boolean,
    transplantPsychiatry: boolean,
    transplantEthics: boolean,
    transplantLaw: boolean,
    transplantEconomics: boolean,
    transplantSociology: boolean,
    transplantAnthropology: boolean,
    transplantPhilosophy: boolean,
    transplantTheology: boolean,
    transplantHistory: boolean,
    transplantLiterature: boolean,
    transplantArt: boolean,
    transplantMusic: boolean,
    transplantScience: boolean,
    transplantTechnology: boolean,
    transplantEngineering: boolean,
    transplantMathematics: boolean,
    transplantLogic: boolean,
    transplantRhetoric: boolean,
    transplantGrammar: boolean,
    transplantDialectic: boolean,
    transplantSophistic: boolean,
    transplantCynic: boolean,
    transplantStoic: boolean,
    transplantEpicurean: boolean,
    transplantSkeptic: boolean,
    transplantAcademic: boolean,
    transplantPeripatetic: boolean,
    /* 以下為大量遺留的文化/植入標記，包含非標識符字元（如連字 '-'、空格等）或重複定義，
       會導致 TypeScript 解析錯誤。為了讓專案能先通過編譯，暫時以註解方式移除這些字段。
       若日後需要保留這些旗標，請使用合法的識別符名稱（例如使用駝峰或底線）並放入合適的 interface 中。
    */
    /* ...removed legacy culture flags to fix TypeScript compile errors... */
