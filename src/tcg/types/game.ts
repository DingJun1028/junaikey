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
  MAIN PHASE = 'main_phase',     // 主要階段
  COMBAT PHASE = 'combat_phase', // 戰鬥階段
  END PHASE = 'end_phase',       // 結束階段
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
   移植Pythagorean: boolean,
   移植Platonic: boolean,
   移植Aristotelian: boolean,
   移植Hellenistic: boolean,
   移植Neoplatonic: boolean,
   移植Alexandrian: boolean,
   移植Byzantine: boolean,
   移植Scholastic: boolean,
   移植Thomistic: boolean,
   移植Franciscan: boolean,
   移植Augustinian: boolean,
   移植Mystical: boolean,
   移植Esoteric: boolean,
   移植Hermetic: boolean,
   移植Gnostic: boolean,
   移植Manichaean: boolean,
   移植Mithraic: boolean,
   移植Druidic: boolean,
   移植Celtic: boolean,
   移植Germanic: boolean,
   移植Norse: boolean,
   移植Slavic: boolean,
   移植Baltic: boolean,
   移植Finnic: boolean,
   移植Uralic: boolean,
   移植Turkic: boolean,
   移植Mongolic: boolean,
   移植Tungusic: boolean,
   移植Koreanic: boolean,
   移植Japonic: boolean,
   移植Ainu: boolean,
   移植Tai: boolean,
   移植Austroasiatic: boolean,
   植入Austronesian: boolean,
   植入Malayo-Polynesian: boolean,
   植入Melanesian: boolean,
   植入Micronesian: boolean,
   植入Polynesian: boolean,
   植入Papuan: boolean,
   植入Australian: boolean,
   植入TorresStraitIslander: boolean,
   植入Maori: boolean,
   植入Hawaiian: boolean,
   植入Tahitian: boolean,
   植入Samoan: boolean,
   植入Tongan: boolean,
   植入Fijian: boolean,
   植入Niuean: boolean,
   植入Tokelauan: boolean,
   植入Tuvaluan: boolean,
   植入Kiribati: boolean,
   植入Marshallese: boolean,
   植入Chamorro: boolean,
   植入Palauan: boolean,
   植入Fijian: boolean,
   植入SolomonIslands: boolean,
   植入Vanuatu: boolean,
   植入NewCaledonia: boolean,
   植入PapuaNewGuinea: boolean,
   植入WestPapua: boolean,
   植入TimorLeste: boolean,
   植入Indonesia: boolean,
   植入Malaysia: boolean,
   植入Singapore: boolean,
   植入Brunei: boolean,
   植入Thailand: boolean,
   植入Laos: boolean,
   植入Cambodia: boolean,
   植入Vietnam: boolean,
   植入China: boolean,
   植入Taiwan: boolean,
   植入HongKong: boolean,
   植入Macao: boolean,
   植入Japan: boolean,
   植入Korea: boolean,
   植入Mongolia: boolean,
   植入Russia: boolean,
   植入Kazakhstan: boolean,
   植入Uzbekistan: boolean,
   植入Turkmenistan: boolean,
   植入Tajikistan: boolean,
   植入Kyrgyzstan: boolean,
   植入Georgia: boolean,
   植入Armenia: boolean,
   植入Azerbaijan: boolean,
}

// 拍賣設置類型
export interface AuctionSettings {
    enabled: boolean;
    bid: boolean,
    buy: boolean,
    sell: boolean,
    list: boolean,
    search: boolean,
    filter: boolean,
    sort: boolean,
    paginate: boolean,
    watch: boolean,
    notify: boolean,
    checkout: boolean,
    payment: boolean,
    shipping: boolean,
    insurance: boolean,
    escrow: boolean,
    verification: boolean,
    rating: boolean,
    review: boolean,
    feedback: boolean,
    dispute: boolean,
    arbitration: boolean,
    mediation: boolean,
    negotiation: boolean,
    settlement: boolean,
    compensation: boolean,
    restitution: boolean,
    reimbursement: boolean,
    indemnification: boolean,
    guarantee: boolean,
    warranty: boolean,
    insurance: boolean,
    bond: boolean,
    surety: boolean,
    collateral: boolean,
    security: boolean,
    deposit: boolean,
    margin: boolean,
    leverage: boolean,
    financing: boolean,
    credit: boolean,
    debit: boolean,
    loan: boolean,
    mortgage: boolean,
    lien: boolean,
    encumbrance: boolean,
    easement: boolean,
    license: boolean,
    permit: boolean,
    certification: boolean,
    accreditation: boolean,
    qualification: boolean,
    authorization: boolean,
    permission: boolean,
    approval: boolean,
    acceptance: boolean,
    agreement: boolean,
    contract: boolean,
    treaty: boolean,
    pact: boolean,
    compact: boolean,
    covenant: boolean,
    promise: boolean,
    commitment: boolean,
    obligation: boolean,
    duty: boolean,
    responsibility: boolean,
    liability: boolean,
    accountability: boolean,
    answerability: boolean,
    culpability: boolean,
    blameworthiness: boolean,
    guilt: boolean,
    innocence: boolean,
    exoneration: boolean,
    absolution: boolean,
    pardon: boolean,
    forgiveness: boolean,
    mercy: boolean,
    grace: boolean,
    charity: boolean,
    philanthropy: boolean,
    altruism: boolean,
    benevolence: boolean,
    kindness: boolean,
    compassion: boolean,
    empathy: boolean,
    sympathy: boolean,
    understanding: boolean,
    comprehension: boolean,
    cognition: boolean,
    perception: boolean,
    sensation: boolean,
    feeling: boolean,
    emotion: boolean,
    passion: boolean,
    desire: boolean,
    want: boolean,
    need: boolean,
    requirement: boolean,
    necessity: boolean,
    essential: boolean,
    fundamental: boolean,
    basic: boolean,
    simple: boolean,
    easy: boolean,
    difficult: boolean,
    hard: boolean,
    tough: boolean,
    strong: boolean,
    weak: boolean,
    fragile: boolean,
    delicate: boolean,
    vulnerable: boolean,
    susceptible: boolean,
    resistant: boolean,
    immune: boolean,
    protected: boolean,
    safe: boolean,
    secure: boolean,
    stable: boolean,
    balanced: boolean,
    equal: boolean,
    same: boolean,
    different: boolean,
    unique: boolean,
    special: boolean,
    particular: boolean,
    specific: boolean,
    general: boolean,
    common: boolean,
    ordinary: boolean,
    normal: boolean,
    regular: boolean,
    irregular: boolean,
    abnormal: boolean,
    unusual: boolean,
    rare: boolean,
    scarce: boolean,
    limited: boolean,
    abundant: boolean,
    plentiful: boolean,
    sufficient: boolean,
    inadequate: boolean,
    deficient: boolean,
    surplus: boolean,
    excess: boolean,
    moderate: boolean,
    average: boolean,
    mean: boolean,
    median: boolean,
    mode: boolean,
    range: boolean,
    variance: boolean,
    standardDeviation: boolean,
    probability: boolean,
    likelihood: boolean,
    chance: boolean,
    risk: boolean,
    danger: boolean,
    hazard: boolean,
    threat: boolean,
    peril: boolean,
    jeopardy: boolean,
    predicament: boolean,
    dilemma: boolean,
    quandary: boolean,
    plight: boolean,
    trouble: boolean,
    problem: boolean,
    issue: boolean,
    matter: boolean,
    affair: boolean,
    business: boolean,
    concern: boolean,
    worry: boolean,
    anxiety: boolean,
    stress: boolean,
    pressure: boolean,
    tension: boolean,
    strain: boolean,
    effort: boolean,
    endeavor: boolean,
    attempt: boolean,
    try: boolean,
    trial: boolean,
    test: boolean,
    examination: boolean,
    inspection: boolean,
    investigation: boolean,
    inquiry: boolean,
    research: boolean,
    study: boolean,
    analysis: boolean,
    examination: boolean,
    scrutiny: boolean,
    observation: boolean,
    perception: boolean,
    awareness: boolean,
    consciousness: boolean,
    mindfulness: boolean,
    attention: boolean,
    focus: boolean,
    concentration: boolean,
    meditation: boolean,
    contemplation: boolean,
    reflection: boolean,
    introspection: boolean,
    selfKnowledge: boolean,
    wisdom: boolean,
    knowledge: boolean,
    learning: boolean,
    education: boolean,
    teaching: boolean,
    instruction: boolean,
    guidance: boolean,
    direction: boolean,
    leadership: boolean,
    management: boolean,
    administration: boolean,
    governance: boolean,
    politics: boolean,
    policy: boolean,
    strategy: boolean,
    tactic: boolean,
    plan: boolean,
    program: boolean,
    project: boolean,
    initiative: boolean,
    campaign: boolean,
    movement: boolean,
    cause: boolean,
    mission: boolean,
    vision: boolean,
    goal: boolean,
    objective: boolean,
    target: boolean,
    purpose: boolean,
    intention: boolean,
    motive: boolean,
    reason: boolean,
    rationale: boolean,
    justification: boolean,
    explanation: boolean,
    description: boolean,
    account: boolean,
    narrative: boolean,
    story: boolean,
    tale: boolean,
    legend: boolean,
    myth: boolean,
    folklore: boolean,
    tradition: boolean,
    custom: boolean,
    practice: boolean,
    habit: boolean,
    routine: boolean,
    ritual: boolean,
    ceremony: boolean,
    celebration: boolean,
    festival: boolean,
    holiday: boolean,
    vacation: boolean,
    break: boolean,
    rest: boolean,
    relaxation: boolean,
    leisure: boolean,
    recreation: boolean,
    entertainment: boolean,
    amusement: boolean,
    fun: boolean,
    enjoyment: boolean,
    pleasure: boolean,
    happiness: boolean,
    joy: boolean,
    delight: boolean,
    ecstasy: boolean,
    euphoria: boolean,
    bliss: boolean,
    paradise: boolean,
    heaven: boolean,
    nirvana: boolean,
    enlightenment: boolean,
    awakening: boolean,
    realization: boolean,
    understanding: boolean,
    comprehension: boolean,
    cognition: boolean,
    perception: boolean,
    sensation: boolean,
    feeling: boolean,
    emotion: boolean,
    passion: boolean,
    desire: boolean,
    want: boolean,
    need: boolean,
    requirement: boolean,
    necessity: boolean,
    essential: boolean,
    fundamental: boolean,
    basic: boolean,
    simple: boolean,
    easy: boolean,
    difficult: boolean,
    hard: boolean,
    tough: boolean,
    strong: boolean,
    weak: boolean,
    fragile: boolean,
    delicate: boolean,
    vulnerable: boolean,
    susceptible: boolean,
    resistant: boolean,
    immune: boolean,
    protected: boolean,
    safe: boolean,
    secure: boolean,
    stable: boolean,
    balanced: boolean,
    equal: boolean,
    same: boolean,
    different: boolean,
    unique: boolean,
    special: boolean,
    particular: boolean,
    specific: boolean,
    general: boolean,
    common: boolean,
    ordinary: boolean,
    normal: boolean,
    regular: boolean,
    irregular: boolean,
    abnormal: boolean,
    unusual: boolean,
    rare: boolean,
    scarce: boolean,
    limited: boolean,
    abundant: boolean,
    plentiful: boolean,
    sufficient: boolean,
    inadequate: boolean,
    deficient: boolean,
    surplus: boolean,
    excess: boolean,
    moderate: boolean,
    average: boolean,
    mean: boolean,
    median: boolean,
    mode: boolean,
    range: boolean,
    variance: boolean,
    standardDeviation: boolean,
    probability: boolean,
    likelihood: boolean,
    chance: boolean,
    risk: boolean,
    danger: boolean,
    hazard: boolean,
    threat: boolean,
    peril: boolean,
    jeopardy: boolean,
    predicament: boolean,
    dilemma: boolean,
    quandary: boolean,
    plight: boolean,
    trouble: boolean,
    problem: boolean,
    issue: boolean,
    matter: boolean,
    affair: boolean,
    business: boolean,
    concern: boolean,
    worry: boolean,
    anxiety: boolean,
    stress: boolean,
    pressure: boolean,
    tension: boolean,
    strain: boolean,
    effort: boolean,
    endeavor: boolean,
    attempt: boolean,
    try: boolean,
    trial: boolean,
    test: boolean,
    examination: boolean,
    inspection: boolean,
    investigation: boolean,
    inquiry: boolean,
    research: boolean,
    study: boolean,
    analysis: boolean,
    examination: boolean,
    scrutiny: boolean,
    observation: boolean,
    perception: boolean,
    awareness: boolean,
    consciousness: boolean,
    mindfulness: boolean,
    attention: boolean,
    focus: boolean,
    concentration: boolean,
    meditation: boolean,
    contemplation: boolean,
    reflection: boolean,
    introspection: boolean,
    selfKnowledge: boolean,
    wisdom: boolean,
    knowledge: boolean,
    learning: boolean,
    education: boolean,
    teaching: boolean,
    instruction: boolean,
    guidance: boolean,
    direction: boolean,
    leadership: boolean,
    management: boolean,
    administration: boolean,
    governance: boolean,
    politics: boolean,
    policy: boolean,
    strategy: boolean,
    tactic: boolean,
    plan: boolean,
    program: boolean,
    project: boolean,
    initiative: boolean,
    campaign: boolean,
    movement: boolean,
    cause: boolean,
    mission: boolean,
    vision: boolean,
    goal: boolean,
    objective: boolean,
    target: boolean,
    purpose: boolean,
    intention: boolean,
    motive: boolean,
    reason: boolean,
    rationale: boolean,
    justification: boolean,
    explanation: boolean,
    description: boolean,
    account: boolean,
    narrative: boolean,
    story: boolean,
    tale: boolean,
    legend: boolean,
    myth: boolean,
    folklore: boolean,
    tradition: boolean,
    custom: boolean,
    practice: boolean,
    habit: boolean,
    routine: boolean,
    ritual: boolean,
    ceremony: boolean,
    celebration: boolean,
    festival: boolean,
    holiday: boolean,
    vacation: boolean,
    break: boolean,
    rest: boolean,
    relaxation: boolean,
    leisure: boolean,
    recreation: boolean,
    entertainment: boolean,
    amusement: boolean,
    fun: boolean,
    enjoyment: boolean,
    pleasure: boolean,
    happiness: boolean,
    joy: boolean,
    delight: boolean,
    ecstasy: boolean,
    euphoria: boolean,
    bliss: boolean,
    paradise: boolean,
    heaven: boolean,
    nirvana: boolean,
    enlightenment: boolean,
    awakening: boolean,
    realization: boolean,
    understanding: boolean,
    comprehension: boolean,
    cognition: boolean,
    perception: boolean,
    sensation: boolean,
    feeling: boolean,
    emotion: boolean,
    passion: boolean,
    desire: boolean,
    want: boolean,
    need: boolean,
    requirement: boolean,
    necessity: boolean,
    essential: boolean,
    fundamental: boolean,
    basic: boolean,
    simple: boolean,
    easy: boolean,
    difficult: boolean,
    hard: boolean,
    tough: boolean,
    strong: boolean,
    weak: boolean,
    fragile: boolean,
    delicate: boolean,
    vulnerable: boolean,
    susceptible: boolean,
    resistant: boolean,
    immune: boolean,
    protected: boolean,
    safe: boolean,
    secure: boolean,
    stable: boolean,
    balanced: boolean,
    equal: boolean,
    same: boolean,
    different: boolean,
    unique: boolean,
    special: boolean,
    particular: boolean,
    specific: boolean,
    general: boolean,
    common: boolean,
    ordinary: boolean,
    normal: boolean,
    regular: boolean,
    irregular: boolean,
    abnormal: boolean,
    unusual: boolean,
    rare: boolean,
    scarce: boolean,
    limited: boolean,
    abundant: boolean,
    plentiful: boolean,
    sufficient: boolean,
    inadequate: boolean,
    deficient: boolean,
    surplus: boolean,
    excess: boolean,
    moderate: boolean,
    average: boolean,
    mean: boolean,
    median: boolean,
    mode: boolean,
    range: boolean,
    variance: boolean,
    standardDeviation: boolean,
    probability: boolean,
    likelihood: boolean,
    chance: boolean,
    risk: boolean,
    danger: boolean,
    hazard: boolean,
    threat: boolean,
    peril: boolean,
    jeopardy: boolean,
    predicament: boolean,
    dilemma: boolean,
    quandary: boolean,
    plight: boolean,
    trouble: boolean,
    problem: boolean,
    issue: boolean,
    matter: boolean,
    affair: boolean,
    business: boolean,
    concern: boolean,
    worry: boolean,
    anxiety: boolean,
    stress: boolean,
    pressure: boolean,
    tension: boolean,
    strain: boolean,
    effort: boolean,
    endeavor: boolean,
    attempt: boolean,
    try: boolean,
    trial: boolean,
    test: boolean,
    examination: boolean,
    inspection: boolean,
    investigation: boolean,
    inquiry: boolean,
    research: boolean,
    study: boolean,
    analysis: boolean,
    examination: boolean,
    scrutiny: boolean,
    observation: boolean,
    perception: boolean,
    awareness: boolean,
    consciousness: boolean,
    mindfulness: boolean,
    attention: boolean,
    focus: boolean,
    concentration: boolean,
    meditation: boolean,
    contemplation: boolean,
    reflection: boolean,
    introspection: boolean,
    selfKnowledge: boolean,
    wisdom: boolean,
    knowledge: boolean,
    learning: boolean,
    education: boolean,
    teaching: boolean,
    instruction: boolean,
    guidance: boolean,
    direction: boolean,
    leadership: boolean,
    management: boolean,
    administration: boolean,
    governance: boolean,
    politics: boolean,
    policy: boolean,
    strategy: boolean,
    tactic: boolean,
    plan: boolean,
    program: boolean,
    project: boolean,
    initiative: boolean,
    campaign: boolean,
    movement: boolean,
    cause: boolean,
    mission: boolean,
    vision: boolean,
    goal: boolean,
    objective
