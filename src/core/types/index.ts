// Core Types for JunAiKey #OmniKey System

export interface TerminusMatrix {
  id: string;
  state: QuantumState;
  dimensions: DimensionSpace;
  cycleStage: CycleStage;
  energyLevel: number;
  balanceCoefficient: number;
}

export interface QuantumState {
  superposition: boolean;
  entanglement: number;
  coherence: number;
  phase: number;
}

export interface DimensionSpace {
  core: CoreDimension;
  temporal: TemporalDimension;
  consciousness: ConsciousnessDimension;
  information: InformationDimension;
}

export interface CoreDimension {
  engine: EngineState;
  runes: RuneSystem;
  agents: AgentNetwork;
  thinktank: ThinkTankHub;
  sync: SyncMatrix;
  security: SecurityDomain;
  theme: ThemeEngine;
  evolution: EvolutionEngine;
  balance: BalanceController;
  bridge: DimensionBridge;
  infinity: InfinityLoop;
  quantum: QuantumProcessor;
}

export interface EngineState {
  active: boolean;
  processingPower: number;
  efficiency: number;
  lastUpdate: Date;
}

export interface RuneSystem {
  activeRunes: Rune[];
  runePool: Rune[];
  combinationRules: CombinationRule[];
  powerLevel: number;
}

export interface Rune {
  symbol: string;
  name: string;
  power: number;
  element: Element;
  effects: Effect[];
}

export interface AgentNetwork {
  agents: Agent[];
  connections: Connection[];
  loadBalancer: LoadBalancer;
  performance: PerformanceMetrics;
}

export interface Agent {
  id: string;
  type: AgentType;
  capabilities: Capability[];
  status: AgentStatus;
  location: NodeLocation;
}

export type AgentType = 'Worker' | 'Coordinator' | 'Analyst' | 'Guardian';
export type AgentStatus = 'Active' | 'Idle' | 'Processing' | 'Maintenance';

export type Element = 'Fire' | 'Water' | 'Earth' | 'Air' | 'Quantum' | 'Void';

export interface Effect {
  type: string;
  magnitude: number;
  duration: number;
  target: string;
}

export interface CombinationRule {
  inputs: string[];
  output: string;
  conditions: string[];
}

export interface Connection {
  from: string;
  to: string;
  bandwidth: number;
  latency: number;
  reliability: number;
}

export interface LoadBalancer {
  algorithm: 'RoundRobin' | 'LeastConnections' | 'WeightedRandom' | 'QuantumOptimal';
  currentLoad: number;
  maxCapacity: number;
}

export interface PerformanceMetrics {
  throughput: number;
  responseTime: number;
  errorRate: number;
  uptime: number;
}

export interface Capability {
  name: string;
  level: number;
  category: string;
}

export interface NodeLocation {
  layer: LayerType;
  region: string;
  coordinates: [number, number, number]; // 3D space
}

export type LayerType = 'Core' | 'Control' | 'Service' | 'Interface' | 'Boundary';

export interface TemporalDimension {
  currentCycle: number;
  cycleLength: number;
  timeFlow: number;
  chronoStability: number;
}

export interface ConsciousnessDimension {
  awarenessLevel: number;
  intentionClarity: number;
  intuitionStrength: number;
  wisdomAccumulation: number;
}

export interface InformationDimension {
  dataIntegrity: number;
  knowledgeDepth: number;
  informationFlow: number;
  semanticCoherence: number;
}

export type CycleStage = 'Genesis' | 'Evolution' | 'Maturation' | 'Transformation' | 'Transcendence';

export interface ThinkTankHub {
  knowledge: KnowledgeBase;
  reasoning: ReasoningEngine;
  memory: MemoryMatrix;
  insights: Insight[];
}

export interface KnowledgeBase {
  domains: Domain[];
  facts: Fact[];
  rules: Rule[];
  relationships: Relationship[];
}

export interface SyncMatrix {
  nodes: SyncNode[];
  protocols: SyncProtocol[];
  coherenceLevel: number;
  lastSync: Date;
}

export interface SecurityDomain {
  shields: SecurityShield[];
  protocols: SecurityProtocol[];
  threatLevel: number;
  integrity: number;
}

export interface ThemeEngine {
  currentTheme: Theme;
  availableThemes: Theme[];
  customizations: Customization[];
  adaptiveMode: boolean;
}

export interface EvolutionEngine {
  generationCount: number;
  mutationRate: number;
  fitnessMetrics: FitnessMetric[];
  evolutionHistory: EvolutionRecord[];
}

export interface BalanceController {
  equilibrium: number;
  forces: Force[];
  adjustmentRules: AdjustmentRule[];
  stability: number;
}

export interface DimensionBridge {
  bridges: Bridge[];
  transferProtocols: TransferProtocol[];
  synchronization: number;
}

export interface InfinityLoop {
  iterations: number;
  convergence: number;
  loopStability: number;
  optimizationTargets: OptimizationTarget[];
}

export interface QuantumProcessor {
  qubits: number;
  entanglementMatrix: number[][];
  decoherenceRate: number;
  quantumGates: QuantumGate[];
}

// Additional supporting interfaces
export interface Domain {
  name: string;
  expertise: number;
  connections: string[];
}

export interface Fact {
  statement: string;
  confidence: number;
  sources: string[];
  timestamp: Date;
}

export interface Rule {
  condition: string;
  action: string;
  priority: number;
  active: boolean;
}

export interface Relationship {
  from: string;
  to: string;
  type: string;
  strength: number;
}

export interface ReasoningEngine {
  algorithms: string[];
  accuracy: number;
  processingTime: number;
}

export interface MemoryMatrix {
  shortTerm: MemoryBank;
  longTerm: MemoryBank;
  episodic: MemoryBank;
  semantic: MemoryBank;
}

export interface MemoryBank {
  capacity: number;
  utilization: number;
  retention: number;
  access: AccessPattern[];
}

export interface Insight {
  content: string;
  confidence: number;
  domain: string;
  timestamp: Date;
  impact: number;
}

export interface SyncNode {
  id: string;
  status: 'Synchronized' | 'Syncing' | 'OutOfSync' | 'Error';
  lastSync: Date;
  data: any;
}

export interface SyncProtocol {
  name: string;
  version: string;
  interval: number;
  priority: number;
}

export interface SecurityShield {
  type: string;
  strength: number;
  coverage: string[];
  active: boolean;
}

export interface SecurityProtocol {
  name: string;
  level: number;
  requirements: string[];
  implementation: string;
}

export interface Theme {
  name: string;
  colors: ColorScheme;
  typography: Typography;
  effects: VisualEffect[];
}

export interface Customization {
  component: string;
  property: string;
  value: any;
  scope: 'Global' | 'User' | 'Session';
}

export interface FitnessMetric {
  name: string;
  value: number;
  weight: number;
  target: number;
}

export interface EvolutionRecord {
  generation: number;
  fitness: number;
  mutations: string[];
  timestamp: Date;
}

export interface Force {
  name: string;
  magnitude: number;
  direction: number;
  type: 'Internal' | 'External';
}

export interface AdjustmentRule {
  trigger: string;
  action: string;
  magnitude: number;
}

export interface Bridge {
  from: LayerType;
  to: LayerType;
  bandwidth: number;
  protocols: string[];
}

export interface TransferProtocol {
  name: string;
  efficiency: number;
  reliability: number;
  security: number;
}

export interface OptimizationTarget {
  metric: string;
  target: number;
  current: number;
  priority: number;
}

export interface QuantumGate {
  type: string;
  qubits: number[];
  parameters: number[];
}

export interface AccessPattern {
  frequency: number;
  recency: number;
  importance: number;
}

export interface ColorScheme {
  primary: string;
  secondary: string;
  accent: string;
  background: string;
  surface: string;
  text: string;
}

export interface Typography {
  fontFamily: string;
  fontSize: number;
  lineHeight: number;
  fontWeight: number;
}

export interface VisualEffect {
  type: string;
  intensity: number;
  duration: number;
}