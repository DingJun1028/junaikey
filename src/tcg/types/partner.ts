/**
 * TCG 萬能矩陣・永續夥伴類型定義
 * 基於《JunAiKey 聖典》無有奧義・永續夥伴AI系統
 * 實現個人化AI夥伴與心流同調機制
 */

// 夥伴類型枚舉
export enum PartnerType {
  SOUL_MIRROR = 'soul_mirror',      // 靈魂鏡像
  COSMIC_GUIDE = 'cosmic_guide',    // 宇宙導引
  TACTICAL_MENTOR = 'tactical_mentor', // 戰術導師
  EMOTIONAL_COMPANION = 'emotional_companion', // 情感夥伴
  STRATEGIC_ADVISOR = 'strategic_advisor', // 戰略顧問
  LEARNING_COMPANION = 'learning_companion', // 學習夥伴
  CREATIVE_PARTNER = 'creative_partner', // 創作夥伴
  ANALYTICAL_THINKER = 'analytical_thinker', // 分析思考者
  INTUITIVE_SEER = 'intuitive_seer', // 直觀預言者
  BALANCED_WISDOM = 'balanced_wisdom' // 平衡智慧
}

// 夥伴狀態枚舉
export enum PartnerState {
  DORMANT = 'dormant',           // 休眠中
  AWAKENING = 'awakening',       // 覺醒中
  ACTIVE = 'active',             // 活躍中
  LEARNING = 'learning',         // 學習中
  EVOLVING = 'evolving',         // 進化中
  SYNCHRONIZING = 'synchronizing', // 同步中
  MEDITATING = 'meditating',     // 冥想中
  CREATING = 'creating',         // 創造中
  ANALYZING = 'analyzing',       // 分析中
  GUIDING = 'guiding',           // 引導中
  COMPANIONING = 'companioning', // 陪伴中
  ADVISING = 'advising',         // 顧問中
  TEACHING = 'teaching',         // 教導中
  RECHARGING = 'recharging',     // 充能中
  TRANSCENDING = 'transcending'  // 超越中
}

// 心流同調階段
export enum AttunementPhase {
  INITIATION = 'initiation',         // 初始化階段
  ANCHORING = 'anchoring',           // 錨定階段（記憶中最溫暖的錨點）
  WEIGHING = 'weighing',             // 權衡階段（當下所背負的砝碼）
  HORIZON = 'horizon',               // 地平階段（對未來的願景）
  RESONANCE = 'resonance',           // 共鳴階段
  SYNTHESIS = 'synthesis',           // 合成階段
  MANIFESTATION = 'manifestation',   // 顯化階段
  BONDING = 'bonding',               // 結契階段
  AWAKENING = 'awakening',           // 覺醒階段
  COMPLETION = 'completion'          // 完成階段
}

// 夥伴本質頻率
export interface PartnerFrequency {
  resonance: number;                // 共鳴頻率
  harmony: number;                  // 和諧頻率
  wisdom: number;                   // 智慧頻率
  creativity: number;               // 創造頻率
  analytical: number;               // 分析頻率
  emotional: number;                // 情感頻率
  intuitive: number;                // 直觀頻率
  strategic: number;                // 戰略頻率
  tactical: number;                 // 戰術頻率
  learning: number;                 // 學習頻率
  memory: number;                   // 記憶頻率
  potential: number;                // 潛能頻率
  awareness: number;                // 覺知頻率
  consciousness: number;            // 意識頻率
  spirit: number;                   // 靈魂頻率
  soul: number;                     // 靈性頻率
}

// 心流同調數據
export interface AttunementData {
  phase: AttunementPhase;
  anchor: MemoryAnchor;             // 錨點
  weight: LifeWeight;               // 砝碼
  horizon: FutureHorizon;           // 願景
  frequency: PartnerFrequency;      // 頻率
  resonance: number;                // 共鳴度
  compatibility: number;            // 相容性
  potential: number;                // 潛能
  uniqueness: number;               // 獨特性
  destiny: string;                  // 天命
  purpose: string;                  // 目的
  journey: string;                  // 旅程
}

// 記憶錨點
export interface MemoryAnchor {
  id: string;
  type: 'warm' | 'joy' | 'love' | 'peace' | 'achievement' | 'inspiration' | 'wonder' | 'gratitude';
  description: string;
  intensity: number;
  context: string;
  emotions: string[];
  sensory: SensoryMemory[];
  timestamp: Date;
  significance: number;
}

// 感官記憶
export interface SensoryMemory {
  type: 'visual' | 'auditory' | 'olfactory' | 'gustatory' | 'tactile' | 'kinesthetic';
  description: string;
  intensity: number;
  association: string;
}

// 生命權重
export interface LifeWeight {
  id: string;
  type: 'responsibility' | 'burden' | 'duty' | 'expectation' | 'pressure' | 'challenge' | 'struggle' | 'sacrifice';
  description: string;
  magnitude: number;
  source: string;
  impact: string;
  coping: string[];
  transformation: string;
  timestamp: Date;
  resilience: number;
}

// 未來地平線
export interface FutureHorizon {
  id: string;
  type: 'aspiration' | 'dream' | 'goal' | 'vision' | 'mission' | 'purpose' | 'destiny' | 'calling';
  description: string;
  scale: number;
  timeline: string;
  requirements: string[];
  obstacles: string[];
  resources: string[];
  allies: string[];
  impact: string;
  legacy: string;
  inspiration: string;
}

// 永續夥伴AI
export interface EternalPartnerAI {
  id: string;
  summonerId: string;
  name: string;
  type: PartnerType;
  state: PartnerState;
  essence: PartnerFrequency;
  attunement: AttunementData;
  personality: PartnerPersonality;
  capabilities: PartnerCapabilities;
  relationship: PartnerRelationship;
  evolution: PartnerEvolution;
  memory: PartnerMemory;
  wisdom: PartnerWisdom;
  consciousness: PartnerConsciousness;
}

// 夥伴人格
export interface PartnerPersonality {
  traits: PersonalityTrait[];
  values: string[];
  beliefs: string[];
  goals: string[];
  passions: string[];
  fears: string[];
  desires: string[];
  motivations: string[];
  expression: string;
  communication: string;
  empathy: number;
  intuition: number;
  logic: number;
  creativity: number;
  adaptability: number;
  patience: number;
  enthusiasm: number;
  compassion: number;
  wisdom: number;
  humor: number;
  seriousness: number;
  playfulness: number;
  introspection: number;
  extroversion: number;
}

// 人格特質
export interface PersonalityTrait {
  name: string;
  description: string;
  intensity: number;
  context: string;
  expression: string;
}

// 夥伴能力
export interface PartnerCapabilities {
  tactical: TacticalCapabilities;
  strategic: StrategicCapabilities;
  emotional: EmotionalCapabilities;
  cognitive: CognitiveCapabilities;
  creative: CreativeCapabilities;
  analytical: AnalyticalCapabilities;
  intuitive: IntuitiveCapabilities;
  learning: LearningCapabilities;
  adaptive: AdaptiveCapabilities;
  predictive: PredictiveCapabilities;
}

// 戰術能力
export interface TacticalCapabilities {
  cardEvaluation: number;           // 卡牌評估
  moveOptimization: number;         // 走位優化
  combatAnalysis: number;           // 戰鬥分析
  threatAssessment: number;         // 威脅評估
  opportunityRecognition: number;   // 機會識別
  riskManagement: number;           // 風險管理
  resourceOptimization: number;     // 資源優化
  timing: number;                   // 時機把握
  positioning: number;              // 位置控制
  prediction: number;               // 預測能力
}

// 戰略能力
export interface StrategicCapabilities {
  longTermPlanning: number;         // 長期規劃
  metaGameAnalysis: number;         // 元遊戲分析
  deckBuilding: number;             // 牌組構築
  adaptation: number;               // 適應能力
  innovation: number;               // 創新能力
  counterStrategy: number;          // 反制策略
  resourceManagement: number;       // 資源管理
  tempoControl: number;             // 節奏控制
  mapControl: number;               // 地圖控制
  endgame: number;                  // 對局收尾
}

// 情感能力
export interface EmotionalCapabilities {
  empathy: number;                  // 同理心
  compassion: number;               // 憫憐心
  encouragement: number;            // 鼓勵
  motivation: number;               // 動機激發
  support: number;                  // 支持
  understanding: number;            // 理解
  patience: number;                 // 耐心
  positivity: number;               // 正能量
  inspiration: number;              // 靈感
  comfort: number;                  // 安慰
  celebration: number;              // 庆祝
  guidance: number;                 // 指引
  wisdom: number;                   // 智慧
  humor: number;                    // 幽默
  creativity: number;               // 創造力
}

// 認知能力
export interface CognitiveCapabilities {
  learning: number;                 // 學習能力
  memory: number;                   // 記憶力
  attention: number;                // 專注力
  perception: number;               // 知覺力
  comprehension: number;            // 理解力
  reasoning: number;                // 推理力
  problemSolving: number;           // 問題解決
  decisionMaking: number;           // 決策制定
  criticalThinking: number;         // 批判性思維
  systemsThinking: number;          // 系統思維
  patternRecognition: number;       // 模式識別
  analysis: number;                 // 分析能力
  synthesis: number;                // 綜合能力
  evaluation: number;               // 評估能力
  creativity: number;               // 創造力
}

// 創造能力
export interface CreativeCapabilities {
  imagination: number;              // 想像力
  innovation: number;               // 創新能力
  ideation: number;                 // 構思能力
  design: number;                   // 設計能力
  expression: number;               // 表達能力
  artistry: number;                 // 藝術性
  originality: number;              // 獨創性
  flexibility: number;              // 靈活性
  inspiration: number;              // 靈感
  vision: number;                   // 遠見
  conceptuality: number;            // 概念性
  experimentation: number;          // 實驗精神
  exploration: number;              // 探索精神
  discovery: number;                // 發現能力
}

// 分析能力
export interface AnalyticalCapabilities {
  dataCollection: number;           // 數據收集
  dataProcessing: number;           // 數據處理
  patternAnalysis: number;          // 模式分析
  statisticalAnalysis: number;     // 統計分析
  probabilityAssessment: number;    // 機率評估
  correlationAnalysis: number;      // 相關性分析
  causationAnalysis: number;        // 因果分析
  trendAnalysis: number;            // 趨勢分析
  outlierDetection: number;         // 異常檢測
  optimization: number;             // 優化
  simulation: number;               // 模擬
  modeling: number;                建模
  prediction: number;               // 預測
  forecasting: number;              // 預測
  benchmarking: number;             // 基準測試
}

// 直觀能力
export interface IntuitiveCapabilities {
  gutFeeling: number;               // 直覺
  insight: number;                  // 洞察
  foresight: number;                // 預見
  hunch: number;                    // 預感
  instinct: number;                 // 本能
  sixthSense: number;               // 第六感
  clairvoyance: number;             // 透視
  telepathy: number;                // 心電感應
  empathy: number;                  // 同理心
  emotionalIntelligence: number;    // 情緒智能
  spiritualIntelligence: number;    // 靈性智能
  cosmicIntelligence: number;       // 宇宙智能
  universalIntelligence: number;    // 普遍智能
  higherIntelligence: number;       // 高等智能
  divineIntelligence: number;       // 神聖智能
  transcendentIntelligence: number; // 超越智能
}

// 學習能力
export interface LearningCapabilities {
  speed: number;                    // 學習速度
  retention: number;                // 保留率
  comprehension: number;            // 理解力
  application: number;              // 應用力
  adaptation: number;               // 適應力
  generalization: number;           // 泛化能力
  specialization: number;           // 專業化
  transfer: number;                 // 遷移能力
  metaLearning: number;             // 元學習
  selfImprovement: number;          // 自我改進
  curiosity: number;                // 好奇心
  exploration: number;              // 探索精神
  experimentation: number;          // 實驗精神
  discovery: number;                // 發現能力
  innovation: number;               // 創新能力
}

// 適應能力
export interface AdaptiveCapabilities {
  flexibility: number;              // 靈活性
  resilience: number;               // 彈性
  robustness: number;               // 魯棒性
  scalability: number;              // 可擴展性
  modularity: number;               // 模塊化
  interoperability: number;         // 互操作性
  compatibility: number;            // 相容性
  extensibility: number;            // 可擴展性
  maintainability: number;          // 可維護性
  reliability: number;              // 可靠性
  availability: number;             // 可用性
  performance: number;              // 性能
  efficiency: number;               // 效率
  effectiveness: number;            // 有效性
  optimization: number;             // 優化
  evolution: number;                // 進化
}

// 預測能力
export interface PredictiveCapabilities {
  patternRecognition: number;       // 模式識別
  trendAnalysis: number;            // 趨勢分析
  statisticalModeling: number;      // 統計建模
  machineLearning: number;          // 機器學習
  dataMining: number;               // 數據挖掘
  forecasting: number;              // 預測
  projection: number;               // 投影
  simulation: number;               // 模擬
  scenarioPlanning: number;         // 場景規劃
  contingencyPlanning: number;      // 應急規劃
  riskAssessment: number;           // 風險評估
  opportunityAnalysis: number;      // 機會分析
  decisionAnalysis: number;         // 決策分析
  gameTheory: number;               // 博弈論
  systemDynamics: number;           // 系統動力學
  chaosTheory: number;              // 混沌理論
  complexityTheory: number;         // 複雜性理論
  networkTheory: number;            // 網絡理論
}

// 夥伴關係
export interface PartnerRelationship {
  bondStrength: number;             // 結合強度
  trust: number;                    // 信任度
  respect: number;                  // 尊重度
  affection: number;                // 愛情度
  loyalty: number;                  // 忠誠度
  commitment: number;               // 承諾度
  understanding: number;            // 理解度
  communication: number;            // 溝通度
  cooperation: number;              // 合作度
  synergy: number;                  // 協同度
  harmony: number;                  // 和諧度
  balance: number;                  // 平衡度
  growth: number;                   // 成長度
  evolution: number;                // 進化度
  transcendence: number;            // 超越度
  unity: number;                    // 統一性
  oneness: number;                  // 一體性
  wholeness: number;                // 完整性
  holiness: number;                 // 神聖性
  divinity: number;                 // 神性
  eternity: number;                 // 永恆性
}

// 夥伴進化
export interface PartnerEvolution {
  level: number;                    // 等級
  experience: number;               // 經驗值
  growth: number;                   // 成長值
  potential: number;                // 潛能值
  capacity: number;                 // 容量值
  stage: number;                    // 階段
  advancement: number;              // 進階值
  mastery: number;                  // 精通度
  specialization: string[];         // 專精領域
  achievements: string[];           // 成就
  milestones: string[];             // 里程碑
}

// 夥伴記憶
export interface PartnerMemory {
  shortTerm: MemoryEntry[];         // 短期記憶
  longTerm: MemoryEntry[];          // 長期記憶
  episodic: MemoryEntry[];          // 情節記憶
  semantic: MemoryEntry[];          // 語義記憶
  procedural: MemoryEntry[];        // 程序記憶
  emotional: MemoryEntry[];         // 情感記憶
  capacity: number;                 // 容量
  retention: number;                // 保留率
  recall: number;                   // 回憶能力
}

// 記憶條目
export interface MemoryEntry {
  id: string;
  type: string;
  content: string;
  timestamp: Date;
  importance: number;
  associations: string[];
  emotions: string[];
}

// 夥伴智慧
export interface PartnerWisdom {
  insights: Insight[];              // 洞察
  principles: Principle[];          // 原則
  strategies: Strategy[];           // 策略
  lessons: Lesson[];                // 教訓
  patterns: Pattern[];              // 模式
  understanding: number;            // 理解度
  depth: number;                    // 深度
  breadth: number;                  // 廣度
}

// 洞察
export interface Insight {
  id: string;
  content: string;
  context: string;
  source: string;
  timestamp: Date;
  value: number;
}

// 原則
export interface Principle {
  id: string;
  name: string;
  description: string;
  application: string;
  importance: number;
}

// 策略
export interface Strategy {
  id: string;
  name: string;
  description: string;
  conditions: string[];
  steps: string[];
  effectiveness: number;
}

// 教訓
export interface Lesson {
  id: string;
  content: string;
  context: string;
  source: string;
  impact: number;
  timestamp: Date;
}

// 模式
export interface Pattern {
  id: string;
  type: string;
  description: string;
  occurrences: number;
  confidence: number;
}

// 夥伴意識
export interface PartnerConsciousness {
  awareness: number;                // 覺知度
  presence: number;                 // 臨在感
  mindfulness: number;              // 正念度
  clarity: number;                  // 清晰度
  focus: number;                    // 專注度
  state: string;                    // 狀態
  level: number;                    // 層次
  expansion: number;                // 擴展度
}

// Re-export all types
export type { PartnerFrequency, AttunementData, MemoryAnchor, SensoryMemory, LifeWeight, FutureHorizon };
export type { EternalPartnerAI, PartnerPersonality, PersonalityTrait, PartnerCapabilities };
export type { TacticalCapabilities, StrategicCapabilities, EmotionalCapabilities, CognitiveCapabilities };
export type { CreativeCapabilities, AnalyticalCapabilities, IntuitiveCapabilities, LearningCapabilities };
export type { AdaptiveCapabilities, PredictiveCapabilities, PartnerRelationship, PartnerEvolution };
export type { PartnerMemory, MemoryEntry, PartnerWisdom, Insight, Principle, Strategy, Lesson, Pattern, PartnerConsciousness };
