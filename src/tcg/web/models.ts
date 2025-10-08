/**
 * TCG 萬能矩陣・Web版核心數據結構
 * 基於《JunAiKey 聖典》創世引擎SDK・TypeScript轉譯版
 * 適用於現代Web技術棧的統一類型定義
 */

// 核心枚舉定義
export enum Faction {
    Neutral = "Neutral",
    Fire = "Fire",
    Water = "Water",
    Earth = "Earth",
    Wind = "Wind",
    Lightning = "Lightning",
    Light = "Light",
    Dark = "Dark",
    Metal = "Metal",
    Wood = "Wood",
    Spirit = "Spirit",
    Time = "Time",
    Void = "Void"
}

export enum Rarity {
    Common = "Common",
    Uncommon = "Uncommon",
    Rare = "Rare",
    Mythic = "Mythic"
}

export enum CardType {
    Creature = "Creature",
    Spell = "Spell",
    Artifact = "Artifact",
    Domain = "Domain",
    Genesis = "Genesis",
    Universal = "Universal"
}

export enum GameState {
    Setup = "Setup",
    PlayerTurn = "PlayerTurn",
    OpponentTurn = "OpponentTurn",
    Resolving = "Resolving",
    GameOver = "GameOver"
}

export enum Keyword {
    Guardian = "Guardian",        // 守護
    Flying = "Flying",           // 飛行
    Haste = "Haste",             // 先攻
    DivineShield = "DivineShield", // 神聖護盾
    Stun = "Stun",               // 眩暈
    Suspend = "Suspend",         // 懸停
    Foretell = "Foretell",       // 預言
    Exile = "Exile",             // 放逐
    Resonance = "Resonance",     // 共鳴
    Synergy = "Synergy"          // 協同
}

export enum EffectTrigger {
    OnPlay = "OnPlay",
    OnEnterPlay = "OnEnterPlay",
    OnDeath = "OnDeath",
    OnTurnStart = "OnTurnStart",
    OnTurnEnd = "OnTurnEnd",
    OnAttack = "OnAttack",
    OnDefend = "OnDefend",
    AfterDamage = "AfterDamage",
    OnHeal = "OnHeal",
    OnBuff = "OnBuff",
    OnDebuff = "OnDebuff"
}

export enum NarrativeType {
    HeroDialogue = "hero_dialogue",
    StoryMode = "story_mode",
    Chapter = "chapter",
    Cutscene = "cutscene",
    Dialogue = "dialogue",
    Branch = "branch",
    WorldEvent = "world_event",
    CharacterMemory = "character_memory",
    LoreEntry = "lore_entry",
    Quest = "quest",
    Achievement = "achievement"
}

export enum NarrativeTrigger {
    GameStart = "game_start",
    GameEnd = "game_end",
    TurnStart = "turn_start",
    TurnEnd = "turn_end",
    CardPlay = "card_play",
    CardDraw = "card_draw",
    CardDeath = "card_death",
    Attack = "attack",
    Heal = "heal",
    EffectTrigger = "effect_trigger",
    HeroPower = "hero_power",
    LevelUp = "level_up",
    Unlock = "unlock",
    AchievementUnlock = "achievement_unlock",
    StoryChoice = "story_choice",
    WorldStateChange = "world_state_change"
}

export enum NarrativeStyle {
    Epic = "epic",
    Dramatic = "dramatic",
    Mystical = "mystical",
    Philosophical = "philosophical",
    Inspirational = "inspirational",
    Humorous = "humorous",
    Serious = "serious",
    Poetic = "poetic",
    Technological = "technological",
    Fantasy = "fantasy"
}

export enum VoiceType {
    HeroIntro = "hero_intro",
    HeroVictory = "hero_victory",
    HeroDefeat = "hero_defeat",
    HeroPower = "hero_power",
    BattleCry = "battle_cry",
    Taunt = "taunt",
    Greeting = "greeting",
    Farewell = "farewell",
    Storytelling = "storytelling",
    Wisdom = "wisdom",
    Encouragement = "encouragement",
    Warning = "warning",
    Threat = "threat"
}

export enum AIMode {
    Suggestion = "suggestion",
    FullAuto = "full_auto",
    Hybrid = "hybrid"
}

// 基礀接口定義
export interface Vector3 {
    x: number;
    y: number;
    z: number;
}

export interface CardData {
    cardID: string;
    cardName: string;
    effectDescription: string;
    flavorText: string;
    genesisPointCost: number;
    faction: Faction;
    rarity: Rarity;
    cardType: CardType;
    cardArtUrl: string;
    keywords: Keyword[];
    heroRestriction?: string;
    createdAt: Date;
    updatedAt: Date;
}

export interface CreatureData extends CardData {
    power: number;
    health: number;
    attack?: number;
    defense?: number;
    abilities: CreatureAbility[];
}

export interface CreatureAbility {
    id: string;
    name: string;
    description: string;
    trigger: EffectTrigger;
    effect: string;
    cost?: number;
    cooldown?: number;
}

export interface SpellData extends CardData {
    spellType: string;
    targetType: "self" | "ally" | "enemy" | "all" | "random";
    areaOfEffect?: number;
    duration?: number;
}

export interface ArtifactData extends CardData {
    artifactType: string;
    passiveEffect: string;
    activeEffect?: string;
    charges?: number;
}

export interface HeroData {
    heroID: string;
    heroName: string;
    title: string;
    description: string;
    faction: Faction;
    maxHealth: number;
    activePower: HeroPower;
    passiveTalents: HeroTalent[];
    starChartAbilities: StarChartAbility[];
    soulboundArmamentID?: string;
    arcanaCardID?: string;
    unlocked: boolean;
    level: number;
    experience: number;
}

export interface HeroPower {
    id: string;
    name: string;
    description: string;
    cost: number;
    cooldown: number;
    effect: string;
}

export interface HeroTalent {
    id: string;
    name: string;
    description: string;
    requirement: string;
    effect: string;
    unlocked: boolean;
}

export interface StarChartAbility {
    id: string;
    name: string;
    description: string;
    position: number;
    requirement: string;
    effect: string;
    prerequisites: string[];
}

export interface EternalPartnerData extends HeroData {
    equippedRelicIDs: string[];
    personality: PartnerPersonality;
    capabilities: PartnerCapabilities;
    relationship: PartnerRelationship;
    evolution: PartnerEvolution;
}

export interface RelicData {
    relicID: string;
    relicName: string;
    relicDescription: string;
    relicIconUrl: string;
    rarity: Rarity;
    effect: string;
    requirement?: string;
}

export interface EffectData {
    effectID: string;
    cardID: string;
    trigger: EffectTrigger;
    effectDescription: string;
    effectValue?: number;
    effectDuration?: number;
    isStackable: boolean;
    targetType: string;
    conditions?: string[];
}

export interface PlayerData {
    playerID: string;
    playerName: string;
    level: number;
    experience: number;
    unlockedCardIDs: string[];
    unlockedHeroIDs: string[];
    ownedDeckIDs: string[];
    currentEquippedHeroID: string;
    totalWins: number;
    totalLosses: number;
    lastLoginTime: Date;
    playerSettings: PlayerSettings;
    achievements: Achievement[];
    quests: Quest[];
}

export interface PlayerSettings {
    masterVolume: number;
    musicVolume: number;
    sfxVolume: number;
    resolutionWidth: number;
    resolutionHeight: number;
    language: string;
    theme: string;
    autoSuggest: boolean;
    animationQuality: "low" | "medium" | "high";
    soundEnabled: boolean;
}

export interface Achievement {
    achievementID: string;
    name: string;
    description: string;
    iconUrl: string;
    unlocked: boolean;
    unlockDate?: Date;
    progress: number;
    total: number;
}

export interface Quest {
    questID: string;
    name: string;
    description: string;
    objectives: QuestObjective[];
    rewards: QuestReward[];
    completed: boolean;
    progress: number;
}

export interface QuestObjective {
    id: string;
    description: string;
    target: number;
    current: number;
    type: string;
}

export interface QuestReward {
    type: string;
    id: string;
    amount: number;
    description: string;
}

export interface DeckData {
    deckID: string;
    deckName: string;
    heroID: string;
    cardIDs: string[];
    description: string;
    isPublic: boolean;
    createdAt: Date;
    updatedAt: Date;
    wins: number;
    losses: number;
}

export interface NarrativeDialogue {
    id: string;
    characterId: string;
    characterName: string;
    voiceType: VoiceType;
    text: string;
    style: NarrativeStyle;
    context: string;
    emotion: string;
    intensity: number;
    duration: number;
    audioClip?: string;
    animation?: string;
    effects?: string[];
}

export interface NarrativeChapter {
    id: string;
    title: string;
    description: string;
    order: number;
    duration: number;
    type: NarrativeType;
    trigger: NarrativeTrigger;
    prerequisites: string[];
    unlockedContent: string[];
    choices?: NarrativeChoice[];
    dialogues: NarrativeDialogue[];
    cutscenes?: string[];
    battles?: string[];
    rewards?: NarrativeReward[];
}

export interface NarrativeChoice {
    id: string;
    text: string;
    consequence: string;
    nextChapter?: string;
    effects?: string[];
    requirements?: string[];
}

export interface NarrativeReward {
    type: string;
    id: string;
    amount: number;
    description: string;
}

export interface PlayerBehavior {
    playerId: string;
    playStyle: string;
    decisionPattern: string[];
    favoriteStrategies: string[];
    emotionalResponse: string[];
    narrativeEngagement: number;
    adaptationRate: number;
}

// 事件系統接口
export interface GameEvent {
    type: string;
    timestamp: Date;
    playerId: string;
    data: any;
}

export interface EventHandler<T> {
    (data: T): void;
}

export class EventEmitter<T> {
    private handlers: Set<EventHandler<T>> = new Set();

    subscribe(handler: EventHandler<T>): void {
        this.handlers.add(handler);
    }

    unsubscribe(handler: EventHandler<T>): void {
        this.handlers.delete(handler);
    }

    emit(data: T): void {
        this.handlers.forEach(handler => handler(data));
    }
}

// UI組件接口
export interface ButtonComponent {
    interactable: boolean;
    onClick: {
        addListener(callback: () => void): void;
        removeListener(callback: () => void): void;
    };
}

export interface AudioSource {
    PlayOneShot(clip: AudioClip): void;
}

export interface AudioClip {
    name: string;
    url: string;
    duration: number;
}

export interface PointerEventData {
    pointerEnter: GameObject | null;
    position: Vector3;
}

export interface GameObject {
    id: string;
    name: string;
    transform: { position: Vector3 };
    active: boolean;
}

// 狀態管理接口
export interface GameStateStore {
    gameState: GameState;
    player: PlayerController;
    opponent: PlayerController;
    activePlayer?: PlayerController;
    initializeGame: (playerHero: HeroData, opponentHero: HeroData) => void;
    startTurn: (turnPlayer: PlayerController) => void;
    endTurn: () => void;
    updateGameState: (newState: GameState) => void;
}

export interface PlayerStore {
    currentPlayer: PlayerController;
    opponent: PlayerController;
    updateCurrentPlayer: (player: PlayerController) => void;
    updateOpponent: (player: PlayerController) => void;
}

export interface UIStore {
    gameStateUI: GameState;
    playerStatsUI: PlayerStats;
    handUI: CardData[];
    battlefieldUI: BattlefieldState;
    updateGameStateUI: (state: GameState) => void;
    updatePlayerStatsUI: (stats: PlayerStats) => void;
    updateHandUI: (hand: CardData[]) => void;
    updateBattlefieldUI: (battlefield: BattlefieldState) => void;
}

export interface PlayerStats {
    health: number;
    genesisPoints: number;
    maxGenesisPoints: number;
    mana: number;
    maxMana: number;
}

export interface BattlefieldState {
    playerUnits: UnitState[];
    opponentUnits: UnitState[];
    environmentEffects: EnvironmentEffect[];
}

export interface UnitState {
    id: string;
    name: string;
    position: string;
    power: number;
    health: number;
    maxHealth: number;
    status: string[];
    effects: EffectState[];
    canAttack: boolean;
    hasAttacked: boolean;
}

export interface EffectState {
    id: string;
    type: string;
    duration: number;
    intensity: number;
    source: string;
    stacks: number;
}

export interface EnvironmentEffect {
    id: string;
    type: string;
    area: string;
    duration: number;
    effects: string[];
}
