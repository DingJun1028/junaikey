/**
 * TCG 萬能矩陣・敘事系統類型定義
 * 基於《JunAiKey 聖典》活體敘事引擎・雙曜星辰協議
 * 實現英雄台詞、故事模式、劇情分支與世界觀連結
 */

// 敘事類型枚舉
export enum NarrativeType {
  HERO_DIALOGUE = 'hero_dialogue',        // 英雄對話
  STORY_MODE = 'story_mode',             // 劇情模式
  CHAPTER = 'chapter',                  // 章節
  CUTSCENE = 'cutscene',                // 過場動畫
  DIALOGUE = 'dialogue',                // 對話系統
  BRANCH = 'branch',                    // 劇情分支
  WORLD_EVENT = 'world_event',          // 世界事件
  CHARACTER_MEMORY = 'character_memory', // 角色記憶
  LORE_ENTRY = 'lore_entry',            // 背景敘事
  QUEST = 'quest',                      // 任務系統
  ACHIEVEMENT = 'achievement'           // 成就系統
}

// 敘事觸發類型
export enum NarrativeTrigger {
  GAME_START = 'game_start',            // 遊戲開始
  GAME_END = 'game_end',              // 遊戲結束
  TURN_START = 'turn_start',          // 回合開始
  TURN_END = 'turn_end',              // 回合結束
  CARD_PLAY = 'card_play',            // 打出卡牌
  CARD_DRAW = 'card_draw',            // 抽牌
  CARD_DEATH = 'card_death',          // 卡牌死亡
  ATTACK = 'attack',                  // 攻擊
  HEAL = 'heal',                      // 治療
  EFFECT_TRIGGER = 'effect_trigger',  // 效果觸發
  HERO_POWER = 'hero_power',          // 英雄權能
  LEVEL_UP = 'level_up',              // 覺醒晉級
  UNLOCK = 'unlock',                  // 解鎖內容
  ACHIEVEMENT_UNLOCK = 'achievement_unlock', // 成就解鎖
  STORY_CHOICE = 'story_choice',      // 劇情選擇
  WORLD_STATE_CHANGE = 'world_state_change' // 世界狀態變化
}

// 敘事風格枚舉
export enum NarrativeStyle {
  EPIC = 'epic',                      // 史詩
  DRAMATIC = 'dramatic',              // 戲劇性
  MYSTICAL = 'mystical',              // 神秘
  PHILOSOPHICAL = 'philosophical',    // 哲學
  INSPIRATIONAL = 'inspirational',    // 靈感
  HUMOROUS = 'humorous',              // 幽默
  SERIOUS = 'serious',                // 嚴肅
  POETIC = 'poetic',                  // 詩意
  TECHNOLOGICAL = 'technological',    // 科技感
  FANTASY = 'fantasy'                 // 奇幻
}

// 敘事語音類型
export enum VoiceType {
  HERO_INTRO = 'hero_intro',          // 英雄登場
  HERO_VICTORY = 'hero_victory',      // 英雄勝利
  HERO_DEFEAT = 'hero_defeat',        // 英雄失敗
  HERO_POWER = 'hero_power',          // 英雄權能
  BATTLE_CRY = 'battle_cry',          // 戰吼
  TAUNT = 'taunt',                    // 嘲諷
  GREETING = 'greeting',              // 問候
  FAREWELL = 'farewell',              // 告別
  STORYTELLING = 'storytelling',      // 講故事
  WISDOM = 'wisdom',                  // 智慧
  ENCOURAGEMENT = 'encouragement',    // 鼓勵
  WARNING = 'warning',                // 警告
  THREAT = 'threat'                   // 威脅
}

// 敘事對話
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

// 敘事章節
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

// 敘事選擇
export interface NarrativeChoice {
  id: string;
  text: string;
  consequence: string;
  nextChapter?: string;
  effects?: string[];
  requirements?: string[];
}

// 敘事獎勵
export interface NarrativeReward {
  type: string;
  id: string;
  amount: number;
  description: string;
}

// 敘事劇情
export interface NarrativeStory {
  id: string;
  title: string;
  description: string;
  theme: string;
  style: NarrativeStyle;
  chapters: NarrativeChapter[];
  worldState: WorldState;
  characters: CharacterState[];
  timeline: TimelineEvent[];
}

// 世界狀態
export interface WorldState {
  id: string;
  name: string;
  description: string;
  currentState: string;
  history: WorldEvent[];
  locations: Location[];
  factions: Faction[];
  timeline: TimelineEvent[];
}

// 世界事件
export interface WorldEvent {
  id: string;
  name: string;
  type: string;
  description: string;
  timestamp: Date;
  location: string;
  participants: string[];
  effects: string[];
  impact: number;
}

// 位置
export interface Location {
  id: string;
  name: string;
  description: string;
  type: string;
  inhabitants: string[];
  events: string[];
  connections: string[];
}

// 勢力
export interface Faction {
  id: string;
  name: string;
  description: string;
  leader: string;
  members: string[];
  territory: string[];
  ideology: string;
  relationships: Map<string, number>;
}

// 角色狀態
export interface CharacterState {
  id: string;
  name: string;
  title: string;
  description: string;
  currentLocation: string;
  currentChapter: string;
  memories: CharacterMemory[];
  relationships: Map<string, number>;
  development: CharacterDevelopment[];
}

// 角色記憶
export interface CharacterMemory {
  id: string;
  eventId: string;
  description: string;
  emotion: string;
  intensity: number;
  timestamp: Date;
  impact: number;
}

// 角色發展
export interface CharacterDevelopment {
  id: string;
  type: string;
  description: string;
  level: number;
  experience: number;
  unlockedAbilities: string[];
  milestone: string;
}

// 時間線事件
export interface TimelineEvent {
  id: string;
  name: string;
  type: string;
  description: string;
  date: Date;
  duration: number;
  participants: string[];
  location: string;
  significance: number;
  consequences: string[];
}

// 敘事管理器
export interface NarrativeManager {
  currentStory: NarrativeStory;
  currentChapter: NarrativeChapter;
  worldState: WorldState;
  characterStates: Map<string, CharacterState>;
  timeline: TimelineEvent[];
  
  startStory(storyId: string): Promise<void>;
  progressChapter(): Promise<void>;
  makeChoice(choiceId: string): Promise<void>;
  triggerEvent(eventId: string): Promise<void>;
  updateWorldState(changes: Partial<WorldState>): Promise<void>;
  addCharacterMemory(characterId: string, memory: CharacterMemory): Promise<void>;
  getDialogues(context: string): Promise<NarrativeDialogue[]>;
  generateDynamicDialogue(characterId: string, context: string): Promise<NarrativeDialogue>;
}

// 雙曜星辰引擎
export interface GeminiNarrativeEngine {
  narrativeManager: NarrativeManager;
  dialogueGenerator: DialogueGenerator;
  storyGenerator: StoryGenerator;
  characterGenerator: CharacterGenerator;
  worldGenerator: WorldGenerator;
  
  generateDynamicContent(context: string): Promise<string>;
  adaptToPlayerBehavior(behavior: PlayerBehavior): Promise<void>;
  maintainNarrativeConsistency(): Promise<void>;
  personalizeExperience(playerId: string): Promise<void>;
}

// 對話生成器
export interface DialogueGenerator {
  generateHeroDialogue(heroId: string, context: string, trigger: NarrativeTrigger): Promise<NarrativeDialogue>;
  generateDynamicResponse(playerAction: string, gameState: GameState): Promise<NarrativeDialogue>;
  adaptDialogueStyle(style: NarrativeStyle, context: string): Promise<string>;
  generateVoiceOver(dialogue: NarrativeDialogue): Promise<string>;
}

// 故事生成器
export interface StoryGenerator {
  generateStory(theme: string, style: NarrativeStyle): Promise<NarrativeStory>;
  generateChapter(storyId: string, order: number): Promise<NarrativeChapter>;
  generateBranchingChoices(chapter: NarrativeChapter): Promise<NarrativeChoice[]>;
  generateWorldEvents(worldState: WorldState): Promise<WorldEvent[]>;
  integratePlayerChoices(choices: NarrativeChoice[]): Promise<void>;
}

// 角色生成器
export interface CharacterGenerator {
  generateCharacter(characterId: string, archetype: string): Promise<CharacterState>;
  generateCharacterMemories(characterId: string, background: string): Promise<CharacterMemory[]>;
  generateCharacterRelationships(characterId: string, otherCharacters: string[]): Promise<Map<string, number>>;
  generateCharacterDevelopment(characterId: string, storyProgress: number): Promise<CharacterDevelopment[]>;
}

// 世界生成器
export interface WorldGenerator {
  generateWorld(theme: string, scale: number): Promise<WorldState>;
  generateLocations(worldId: string, count: number): Promise<Location[]>;
  generateFactions(worldId: string): Promise<Faction[]>;
  generateWorldEvents(worldId: string, duration: number): Promise<WorldEvent[]>;
  integrateStoryEvents(story: NarrativeStory): Promise<void>;
}

// 玩家行為
export interface PlayerBehavior {
  playerId: string;
  playStyle: string;
  decisionPattern: string[];
  favoriteStrategies: string[];
  emotionalResponse: string[];
  narrativeEngagement: number;
  adaptationRate: number;
}

// 遊戲狀態
export interface GameState {
  currentTurn: number;
  currentPhase: string;
  playerHealth: number;
  opponentHealth: number;
  playerResources: Map<string, number>;
  opponentResources: Map<string, number>;
  battlefieldState: BattlefieldState;
  handState: HandState;
  deckState: DeckState;
}

// 戰場狀態
export interface BattlefieldState {
  playerUnits: UnitState[];
  opponentUnits: UnitState[];
  environmentEffects: EnvironmentEffect[];
}

// 單位狀態
export interface UnitState {
  id: string;
  name: string;
  position: string;
  power: number;
  health: number;
  status: string[];
  effects: EffectState[];
}

// 效果狀態
export interface EffectState {
  id: string;
  type: string;
  duration: number;
  intensity: number;
  source: string;
}

// 環境效果
export interface EnvironmentEffect {
  id: string;
  type: string;
  area: string;
  duration: number;
  effects: string[];
}

// 手牌狀態
export interface HandState {
  playerCards: CardState[];
  opponentCardCount: number;
  maxHandSize: number;
}

// 牌組狀態
export interface DeckState {
  playerDeck: CardState[];
  opponentDeck: CardState[];
  remainingCards: number;
}

// 卡牌狀態
export interface CardState {
  id: string;
  name: string;
  cost: number;
  type: string;
  position: string;
  status: string[];
}
