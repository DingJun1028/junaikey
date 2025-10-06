/**
 * 萬能世界卡牌互動系統：宇宙全息圖
 * 整合奧義開發系統與自我最佳實踐化系統的Web應用
 * 
 * 實現四大宇宙公理與四大聖柱的完美融合
 */

import { useState, useEffect, useReducer, useRef } from 'react';
import * as d3 from 'd3';

// === 類型定義：符合四大宇宙公理 ===
type CardType = 'EVENT' | 'PROBLEM' | 'SOLUTION' | 'ARTIFACT' | 'UNIT' | 'PLANESWALKER';
type ElementColor = '🔵' | '🔴' | '🟢' | '⚪' | '⚫' | '💫' | '🟡' | '🩶' | '🌪';
type Rarity = 'COMMON' | 'UNCOMMON' | 'RARE' | 'MYTHIC' | 'LEGENDARY';
type BalanceDimension = 'PERFORMANCE' | 'SECURITY' | 'MAINTAINABILITY';
type Axiom = 'BALANCE' | 'CHRONICLE' | 'GRAVITY' | 'UNIFIED';
type Pillar = 'SIMPLICITY' | 'SPEED' | 'STABILITY' | 'EVOLUTION';

// 卡牌基礎結構 (萬能元鑰原則)
interface OmniKeyCard {
  id: string;
  name: string;
  type: CardType;
  color: ElementColor;
  rarity: Rarity;
  description: string;
  cosmicLink: {
    axiom: Axiom;
    pillar: Pillar;
  };
  commit: {
    author: string;
    cycle: string;
    purpose: string;
  };
}

// 事件卡 (從環境到感知)
interface EventCard extends OmniKeyCard {
  triggerCondition: string;
  detectedBy: string; // 萬能監控體或接口協議
  relatedModule: string; // 對應的萬能同心圓模塊
  timestamp: Date;
}

// 問題狀況卡 (從感知到診斷)
interface ProblemCard extends OmniKeyCard {
  severity: number; // 1-10級別
  impact: BalanceDimension[];
  causeAnalysis: string;
  relatedEventIds: string[];
}

// 問題解決卡 (從診斷到行動)
interface SolutionCard extends OmniKeyCard {
  requiredResources: string[]; // 需要調用的資源/神器
  executingAgents: string[]; // 執行代理
  entropyReduction: number; // 預期熵減值
  chronicleRecord: boolean; // 是否創元實錄
}

// 系統狀態 (符合終始一如公理)
interface SystemState {
  entropy: number; // 系統熵值 (越低越好)
  balance: {
    performance: number;
    security: number;
    maintainability: number;
  };
  cards: {
    events: EventCard[];
    problems: ProblemCard[];
    solutions: SolutionCard[];
  };
  evolution: {
    cycle: number;
    loyalty: number;
  };
}

// === 萬能宇宙生成器核心 ===
export const CosmicGenerator: React.FC = () => {
  // 系統狀態 (核心宇宙狀態)
  const [state, dispatch] = useReducer(cosmicReducer, initialState);
  const [evolutionCycle, setEvolutionCycle] = useState(0);
  const [lifecycleData, setLifecycleData] = useState<any[]>([]);
  
  // 奧義循環引擎 (驅動宇宙進化)
  useEffect(() => {
    const cycle = setInterval(() => {
      dispatch({ type: 'EVOLUTION_CYCLE' });
      setEvolutionCycle((c: number) => c + 1);
      updateLifecycleData();
    }, 30000); // 每30秒一次進化循環
    
    return () => clearInterval(cycle);
  }, []);

  // 初始化宇宙
  useEffect(() => {
    generateInitialEvents(dispatch);
    updateLifecycleData();
  }, []);

  // 更新生命週期數據
  const updateLifecycleData = () => {
    const data = [
      ...state.cards.events.map((e: any) => ({ ...e, type: 'event', y: 100 })),
      ...state.cards.problems.map((p: any) => ({ ...p, type: 'problem', y: 200 })),
      ...state.cards.solutions.map((s: any) => ({ ...s, type: 'solution', y: 300 }))
    ];
    setLifecycleData(data);
  };

  useEffect(() => {
    updateLifecycleData();
  }, [state.cards.events, state.cards.problems, state.cards.solutions]);

  // === 視覺化宇宙儀表板 ===
  return (
    <div className="cosmic-universe min-h-screen bg-gray-900 text-white">
      <CosmicHeader state={state} />
      
      <div className="container mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* 通觀層面三視圖 */}
          <ConceptualPane state={state} />
          <ExecutionPane state={state} dispatch={dispatch} />
          <DataPane state={state} />
        </div>
        
        {/* 萬能同心圓可視化 */}
        <OmniCircleVisualization state={state} />
        
        {/* 生命週期區 */}
        <LifecycleFlow data={lifecycleData} />
        
        {/* 系統進化數據 */}
        <EvolutionStats state={state} cycle={evolutionCycle} />
      </div>
    </div>
  );
};

// === 宇宙核心算法 ===
const cosmicReducer = (state: SystemState, action: any): SystemState => {
  switch (action.type) {
    // 新事件生成 (從數據面)
    case 'GENERATE_EVENT':
      const newEvent: EventCard = {
        id: `EVENT-${Date.now()}`,
        name: action.name,
        type: 'EVENT',
        color: '🌪',
        rarity: 'COMMON',
        description: action.description,
        cosmicLink: { axiom: 'CHRONICLE', pillar: 'SPEED' },
        commit: {
          author: "萬能監控體",
          cycle: `週期${state.evolution.cycle}.${state.cards.events.length + 1}`,
          purpose: action.purpose
        },
        triggerCondition: action.condition,
        detectedBy: "邊界感知器",
        relatedModule: action.module,
        timestamp: new Date()
      };
      
      return {
        ...state,
        entropy: state.entropy + 0.2,
        cards: {
          ...state.cards,
          events: [...state.cards.events, newEvent]
        }
      };
    
    // 事件轉化為問題 (萬能平衡公理)
    case 'EVENT_TO_PROBLEM':
      const event = state.cards.events.find((e: EventCard) => e.id === action.eventId);
      if (!event) return state;
      
      const newProblem: ProblemCard = {
        id: `PROBLEM-${Date.now()}`,
        name: `診斷: ${event.name}`,
        type: 'PROBLEM',
        color: '⚫',
        rarity: 'UNCOMMON',
        description: `由"${event.name}"引發的系統失衡`,
        cosmicLink: { axiom: 'BALANCE', pillar: 'STABILITY' },
        commit: {
          author: "概念面核心",
          cycle: event.commit.cycle,
          purpose: `診斷${event.name}導致的系統失衡`
        },
        severity: calculateSeverity(event),
        impact: determineImpact(event),
        causeAnalysis: "監控系統檢測到...",
        relatedEventIds: [event.id]
      };
      
      return {
        ...state,
        entropy: state.entropy + 0.5,
        balance: updateBalance(state.balance, newProblem.impact, -0.1),
        cards: {
          ...state.cards,
          problems: [...state.cards.problems, newProblem]
        }
      };
    
    // 問題解決方案執行 (熵減煉金)
    case 'SOLVE_PROBLEM':
      const solution: SolutionCard = action.solution;
      const problem = state.cards.problems.find((p: ProblemCard) => p.id === action.problemId);
      
      return {
        ...state,
        entropy: Math.max(0, state.entropy - solution.entropyReduction),
        evolution: {
          ...state.evolution,
          loyalty: state.evolution.loyalty + 1
        },
        balance: restoreBalance(state.balance, problem?.impact || []),
        cards: {
          ...state.cards,
          solutions: [...state.cards.solutions, solution],
          problems: state.cards.problems.filter((p: ProblemCard) => p.id !== action.problemId)
        }
      };
    
    // 進化循環 (終始一如)
    case 'EVOLUTION_CYCLE':
      return {
        ...state,
        evolution: {
          cycle: state.evolution.cycle + 1,
          loyalty: state.evolution.loyalty + state.cards.solutions.length * 0.5
        },
        entropy: Math.max(3, state.entropy - 0.3 * state.cards.solutions.length)
      };
    
    default:
      return state;
  }
};

// === 視覺化元件 ===
export const LifecycleFlow: React.FC<{ data: any[] }> = ({ data }) => {
  const svgRef = useRef<SVGSVGElement | null>(null);

  useEffect(() => {
    if (!svgRef.current || data.length === 0) return;

    const svg = d3.select(svgRef.current);
    svg.selectAll("*").remove();

    const width = 800;
    const height = 400;
    const margin = { top: 20, right: 30, bottom: 40, left: 50 };

    const g = svg
      .attr("width", width)
      .attr("height", height)
      .append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`);

    // 添加連接線
    const links: any[] = [];
    data.forEach((d: any, i: number) => {
      if (i < data.length - 1) {
        links.push({
          source: { x: (i / (data.length - 1)) * (width - margin.left - margin.right), y: d.y - margin.top },
          target: { x: ((i + 1) / (data.length - 1)) * (width - margin.left - margin.right), y: data[i + 1].y - margin.top }
        });
      }
    });

    const link = g.append("g")
      .selectAll("line")
      .data(links)
      .enter().append("line")
      .attr("x1", (d: any) => d.source.x)
      .attr("y1", (d: any) => d.source.y)
      .attr("x2", (d: any) => d.target.x)
      .attr("y2", (d: any) => d.target.y)
      .attr("stroke", "#4a5568")
      .attr("stroke-width", 2)
      .attr("stroke-dasharray", "5,5");

    // 添加節點
    const node = g.selectAll("circle")
      .data(data)
      .enter().append("circle")
      .attr("cx", (d: any, i: number) => (i / (data.length - 1)) * (width - margin.left - margin.right))
      .attr("cy", (d: any) => d.y - margin.top)
      .attr("r", 8)
      .attr("fill", (d: any) => getColor(d.color))
      .attr("stroke", "#fff")
      .attr("stroke-width", 2);

    // 添加標籤
    const label = g.selectAll("text")
      .data(data)
      .enter().append("text")
      .attr("x", (d: any, i: number) => (i / (data.length - 1)) * (width - margin.left - margin.right))
      .attr("y", (d: any) => d.y - margin.top - 15)
      .attr("text-anchor", "middle")
      .style("fill", "#e2e8f0")
      .style("font-size", "12px")
      .text(d => d.name);
  }, [data]);

  return (
    <div className="lifecycle-flow bg-gray-800 rounded-lg p-6 mt-6">
      <h3 className="text-xl font-bold mb-4 text-center">創元循環生命週期</h3>
      <div className="flex justify-center">
        <svg ref={svgRef} width="800" height="400"></svg>
      </div>
    </div>
  );
};

const OmniCircleVisualization: React.FC<{ state: SystemState }> = ({ state }) => {
  return (
    <div className="omni-circle bg-gray-800 rounded-lg p-6 mt-6">
      <h3 className="text-xl font-bold mb-6 text-center">萬能同心圓</h3>
      <div className="relative w-full h-96">
        {/* 核心層 */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-20 h-20 bg-purple-600 rounded-full flex items-center justify-center">
          <CoreAxiomDisplay axiom="UNIFIED" loyalty={state.evolution.loyalty} />
        </div>
        
        {/* 內環層 */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-48 h-48 border-2 border-blue-500 rounded-full flex items-center justify-center">
          <div className="text-center">
            <h4 className="font-bold mb-2">萬能智庫</h4>
            <div className="text-sm">{state.cards.events.length} 事件</div>
          </div>
        </div>
        
        {/* 中環層 */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 border-2 border-green-500 rounded-full flex items-center justify-center">
          <ExecutionRing problems={state.cards.problems} solutions={state.cards.solutions} />
        </div>
        
        {/* 外環層 */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 border-2 border-yellow-500 rounded-full flex items-center justify-center">
          <PillarIndicators balance={state.balance} />
        </div>
        
        {/* 擴展層 */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full h-full border-2 border-red-500 rounded-full flex items-center justify-center">
          <EventPort events={state.cards.events} />
        </div>
      </div>
    </div>
  );
};

// === 其他核心元件實現 ===
const ExecutionRing: React.FC<{ problems: ProblemCard[]; solutions: SolutionCard[] }> = ({ problems, solutions }) => {
  return (
    <div className="execution-ring text-center">
      <h3 className="font-bold mb-2">執行面</h3>
      <div className="grid grid-cols-2 gap-4 text-sm">
        <div>
          <h4 className="text-red-400">問題 ({problems.length})</h4>
          <div className="max-h-20 overflow-y-auto">
            {problems.map((p: ProblemCard) => (
              <div key={p.id} className="text-xs p-1 bg-gray-700 rounded mt-1">
                {p.name}
              </div>
            ))}
          </div>
        </div>
        <div>
          <h4 className="text-green-400">解決 ({solutions.length})</h4>
          <div className="max-h-20 overflow-y-auto">
            {solutions.map((s: SolutionCard) => (
              <div key={s.id} className="text-xs p-1 bg-gray-700 rounded mt-1">
                {s.name}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

const PillarIndicators: React.FC<{ balance: SystemState['balance'] }> = ({ balance }) => (
  <div className="pillar-indicators text-center">
    <h3 className="font-bold mb-2">四大聖柱</h3>
    <div className="space-y-2">
      <div>
        <h4 className="text-sm">效能: {balance.performance.toFixed(1)}</h4>
        <div className="w-32 h-2 bg-gray-600 rounded mx-auto">
          <div 
            className="h-full bg-blue-500 rounded" 
            style={{ width: `${balance.performance * 10}%` }}
          ></div>
        </div>
      </div>
      <div>
        <h4 className="text-sm">安全: {balance.security.toFixed(1)}</h4>
        <div className="w-32 h-2 bg-gray-600 rounded mx-auto">
          <div 
            className="h-full bg-green-500 rounded" 
            style={{ width: `${balance.security * 10}%` }}
          ></div>
        </div>
      </div>
      <div>
        <h4 className="text-sm">維護: {balance.maintainability.toFixed(1)}</h4>
        <div className="w-32 h-2 bg-gray-600 rounded mx-auto">
          <div 
            className="h-full bg-yellow-500 rounded" 
            style={{ width: `${balance.maintainability * 10}%` }}
          ></div>
        </div>
      </div>
    </div>
  </div>
);

const CoreAxiomDisplay: React.FC<{ axiom: Axiom; loyalty: number }> = ({ axiom, loyalty }) => (
  <div className="text-center">
    <div className="text-xs">核心</div>
    <div className="text-lg font-bold">{axiom}</div>
    <div className="text-xs">忠誠度: {loyalty.toFixed(1)}</div>
  </div>
);

const EventPort: React.FC<{ events: EventCard[] }> = ({ events }) => (
  <div className="event-port text-center">
    <h3 className="font-bold mb-2">事件入口</h3>
    <div className="text-sm">{events.length} 活躍事件</div>
  </div>
);

const ConceptualPane: React.FC<{ state: SystemState }> = ({ state }) => (
  <div className="conceptual-pane bg-gray-800 rounded-lg p-4">
    <h3 className="text-lg font-bold mb-3 text-blue-400">概念面</h3>
    <div className="space-y-2 text-sm">
      <div>知識庫狀態: {state.cards.events.length} 個事件</div>
      <div>診斷中問題: {state.cards.problems.length}</div>
      <div>智慧密度: {(state.evolution.loyalty / state.evolution.cycle).toFixed(2)}</div>
    </div>
    <CardMatrix cards={state.cards.events} />
  </div>
);

const ExecutionPane: React.FC<{ 
  state: SystemState; 
  dispatch: React.Dispatch<any> 
}> = ({ state, dispatch }) => {
  const [problemId, setProblemId] = useState('');
  const [solutionText, setSolutionText] = useState('');

  const handleSolveProblem = () => {
    if (!problemId || !solutionText) return;
    
    const problem = state.cards.problems.find(p => p.id === problemId);=== problemId);
    if (!problem) return;

    const solution: SolutionCard = {
      id: `SOLUTION-${Date.now()}`,
      name: `解決: ${problem.name}`,
      type: 'SOLUTION',
      color: '🟢',
      rarity: 'RARE',
      description: solutionText,
      cosmicLink: { axiom: 'BALANCE', pillar: 'EVOLUTION' },
      commit: {
        author: "第一建築師",
        cycle: `週期${state.evolution.cycle}.${state.cards.solutions.length + 1}`,
        purpose: `終結${problem.name}狀況`
      },
      requiredResources: ["萬能符文", "進化引擎"],
      executingAgents: ["萬能代理"],
      entropyReduction: problem.severity * 0.5,
      chronicleRecord: true
    };

    dispatch({ type: 'SOLVE_PROBLEM', problemId, solution });
    setSolutionText('');
    setProblemId('');
  };

  return (
    <div className="execution-pane bg-gray-800 rounded-lg p-4">
      <h3 className="text-lg font-bold mb-3 text-green-400">執行面</h3>
      <div className="space-y-2 text-sm mb-4">
        <div>執行中任務: {state.cards.problems.length}</div>
        <div>已完成解決: {state.cards.solutions.length}</div>
        <div>執行效率: {(state.cards.solutions.length / Math.max(1, state.cards.problems.length + state.cards.solutions.length) * 100).toFixed(0)}%</div>
      </div>
      
      <div className="space-y-2">
        <select 
          className="w-full p-2 bg-gray-700 rounded text-white"
          value={problemId}
          onChange={(e) => setProblemId(e.target.value)}
        >
          <option value="">選擇問題</option>
          {state.cards.problems.map(problem => (oblemCard) => (
            <option key={problem.id} value={problem.id}>{problem.name}</option>
          ))}
        </select>
        
        <textarea
          className="w-full p-2 bg-gray-700 rounded text-white"
          placeholder="輸入解決方案..."
          value={solutionText}
          onChange={(e) => setSolutionText(e.target.value)}
          rows={3}
        />
        
        <button
          className="w-full bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded"
          onClick={handleSolveProblem}
        >
          執行解決方案
        </button>
      </div>
    </div>
  );
};

const DataPane: React.FC<{ state: SystemState }> = ({ state }) => (
  <div className="data-pane bg-gray-800 rounded-lg p-4">
    <h3 className="text-lg font-bold mb-3 text-purple-400">數據面</h3>
    <div className="space-y-2 text-sm">
      <div>系統熵值: {state.entropy.toFixed(2)}</div>
      <div>進化週期: {state.evolution.cycle}</div>
      <div>系統穩定度: {(100 - state.entropy * 5).toFixed(0)}%</div>
    </div>
    
    <div className="mt-4">
      <h4 className="font-bold mb-2">平衡三角</h4>
      <div className="space-y-2">
        <div className="flex justify-between">
          <span>效能:</span>
          <span className="text-blue-400">{state.balance.performance.toFixed(1)}</span>
        </div>
        <div className="flex justify-between">
          <span>安全:</span>
          <span className="text-green-400">{state.balance.security.toFixed(1)}</span>
        </div>
        <div className="flex justify-between">
          <span>維護:</span>
          <span className="text-yellow-400">{state.balance.maintainability.toFixed(1)}</span>
        </div>
      </div>
    </div>
  </div>
);

const CardMatrix: React.FC<{ cards: OmniKeyCard[] }> = ({ cards }) => {
  if (cards.length === 0) return null;

  return (
    <div className="card-matrix mt-4">
      <h4 className="font-bold mb-2 text-sm">知識卡牌矩陣</h4>
      <div className="grid grid-cols-1 gap-2">
        {cards.slice(-3).map(card => (niKeyCard) => (
          <div key={card.id} className={`card ${card.type.toLowerCase()} ${card.rarity.toLowerCase()} bg-gray-700 rounded p-2 text-xs`}>
            <div className="flex justify-between items-center mb-1">
              <span className="font-bold">{card.name}</span>
              <span>{raritySymbol(card.rarity)}</span>
            </div>
            <p className="text-gray-300 truncate">{card.description}</p>
            <div className="text-xs text-gray-400 mt-1">
              {card.commit.author} • {card.commit.cycle}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const CosmicHeader: React.FC<{ state: SystemState }> = ({ state }) => (
  <header className="cosmic-header bg-gray-800 py-6 mb-6">
    <div className="container mx-auto px-4">
      <h1 className="text-3xl font-bold text-center mb-4">🌌 萬能世界卡牌互動系統</h1>
      <div className="flex justify-center space-x-8 text-sm">
        <div className="text-center">
          <div className="font-bold text-purple-400">終始一如</div>
          <div>資源循環</div>
        </div>
        <div className="text-center">
          <div className="font-bold text-blue-400">創元實錄</div>
          <div>歷史追蹤</div>
        </div>
        <div className="text-center">
          <div className="font-bold text-green-400">萬有引力</div>
          <div>模組協同</div>
        </div>
        <div className="text-center">
          <div className="font-bold text-yellow-400">萬能平衡</div>
          <div>系統健康</div>
        </div>
      </div>
    </div>
  </header>
);

const EvolutionStats: React.FC<{ state: SystemState; cycle: number }> = ({ state, cycle }) => (
  <div className="evolution-stats bg-gray-800 rounded-lg p-4 mt-6">
    <h3 className="text-lg font-bold mb-3">進化統計</h3>
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
      <div className="text-center">
        <div className="text-2xl font-bold text-blue-400">{state.evolution.cycle}</div>
        <div>進化週期</div>
      </div>
      <div className="text-center">
        <div className="text-2xl font-bold text-green-400">{state.evolution.loyalty.toFixed(1)}</div>
        <div>忠誠度</div>
      </div>
      <div className="text-center">
        <div className="text-2xl font-bold text-yellow-400">{state.entropy.toFixed(1)}</div>
        <div>系統熵值</div>
      </div>
      <div className="text-center">
        <div className="text-2xl font-bold text-purple-400">{state.cards.solutions.length}</div>
        <div>已解決問題</div>
      </div>
    </div>
  </div>
);

// === 輔助函數 ===
function calculateSeverity(event: EventCard): number {
  // 根據事件類型和條件計算嚴重性
  return Math.floor(Math.random() * 5) + 3; // 3-7之間
}

function determineImpact(event: EventCard): BalanceDimension[] {
  // 根據事件確定影響維度
  const impacts: BalanceDimension[] = ['PERFORMANCE'];
  if (event.triggerCondition.includes('安全')) {
    impacts.push('SECURITY');
  }
  if (event.triggerCondition.includes('維護')) {
    impacts.push('MAINTAINABILITY');
  }
  return impacts;
}

function updateBalance(
  current: SystemState['balance'], 
  impacted: BalanceDimension[], 
  change: number
): SystemState['balance'] {
  const newBalance = { ...current };
  impacted.forEach(dim => {
    if (dim === 'PERFORMANCE') newBalance.performance += change;
    if (dim === 'SECURITY') newBalance.security += change;
    if (dim === 'MAINTAINABILITY') newBalance.maintainability += change;
  });
  
  // 確保數值在合理範圍內
  Object.keys(newBalance).forEach(key => {
    const k = key as keyof typeof newBalance;
    newBalance[k] = Math.max(0, Math.min(10, newBalance[k]));
  });
  
  return newBalance;
}

function restoreBalance(
  current: SystemState['balance'], 
  impacted: BalanceDimension[]
): SystemState['balance'] {
  return updateBalance(current, impacted, 0.2);
}

function getColor(color: ElementColor): string {
  const colorMap: Record<ElementColor, string> = {
    '🔵': '#3b82f6',
    '🔴': '#ef4444',
    '🟢': '#22c55e',
    '⚪': '#e5e7eb',
    '⚫': '#1f2937',
    '💫': '#8b5cf6',
    '🟡': '#fbbf24',
    '🩶': '#9ca3af',
    '🌪': '#60a5fa'
  };
  return colorMap[color];
}

function raritySymbol(rarity: Rarity): string {
  const symbols: Record<Rarity, string> = {
    'COMMON': 'C',
    'UNCOMMON': 'U',
    'RARE': 'R',
    'MYTHIC': 'M',
    'LEGENDARY': 'L'
  };
  return symbols[rarity];
}

// === 初始狀態與核心功能 ===
const initialState: SystemState = {
  entropy: 7.8,
  balance: {
    performance: 9.2,
    security: 9.5,
    maintainability: 8.7
  },
  cards: {
    events: [],
    problems: [],
    solutions: []
  },
  evolution: {
    cycle: 1,
    loyalty: 5
  }
};

function generateInitialEvents(dispatch: React.Dispatch<any>) {
  // 生成初始事件
  const events = [
    {
      name: "數據流斷裂", 
      condition: "外部API連續3週期無響應",
      description: "監測到資料流異常中斷",
      purpose: "保障數據管道完整性",
      module: "萬能同步矩陣"
    },
    {
      name: "匠人意圖顯現", 
      condition: "第一建築師提交新專案",
      description: "檢測到高層級創造指令",
      purpose: "捕獲創世者意圖",
      module: "萬能接口協議"
    }
  ];
  
  events.forEach(event => {
    dispatch({ 
      type: 'GENERATE_EVENT',
      ...event
    });
  });
}

// 導出主組件
export default CosmicGenerator;
