import React, { useState, useEffect, useMemo } from 'react';
import { TerminusMatrix as TerminusMatrixType, CycleStage } from '../types';
import { cn } from '@/lib/utils';

interface TerminusMatrixProps {
  className?: string;
  initialState?: Partial<TerminusMatrixType>;
  onStateChange?: (state: TerminusMatrixType) => void;
}

const TerminusMatrix: React.FC<TerminusMatrixProps> = ({
  className,
  initialState,
  onStateChange
}) => {
  const [matrix, setMatrix] = useState<TerminusMatrixType>(() => ({
    id: crypto.randomUUID(),
    state: {
      superposition: true,
      entanglement: 0.8,
      coherence: 0.9,
      phase: 0
    },
    dimensions: {
      core: {
        engine: { active: true, processingPower: 100, efficiency: 0.95, lastUpdate: new Date() },
        runes: { activeRunes: [], runePool: [], combinationRules: [], powerLevel: 50 },
        agents: { agents: [], connections: [], loadBalancer: { algorithm: 'QuantumOptimal', currentLoad: 0, maxCapacity: 1000 }, performance: { throughput: 0, responseTime: 0, errorRate: 0, uptime: 100 } },
        thinktank: { knowledge: { domains: [], facts: [], rules: [], relationships: [] }, reasoning: { algorithms: [], accuracy: 0, processingTime: 0 }, memory: { shortTerm: { capacity: 1000, utilization: 0, retention: 0.9, access: [] }, longTerm: { capacity: 10000, utilization: 0, retention: 0.95, access: [] }, episodic: { capacity: 5000, utilization: 0, retention: 0.8, access: [] }, semantic: { capacity: 15000, utilization: 0, retention: 0.98, access: [] } }, insights: [] },
        sync: { nodes: [], protocols: [], coherenceLevel: 0.9, lastSync: new Date() },
        security: { shields: [], protocols: [], threatLevel: 0, integrity: 100 },
        theme: { currentTheme: { name: 'Quantum', colors: { primary: '#8b5cf6', secondary: '#a855f7', accent: '#c084fc', background: '#0f0f23', surface: '#1a1a3e', text: '#e2e8f0' }, typography: { fontFamily: 'Inter', fontSize: 16, lineHeight: 1.5, fontWeight: 400 }, effects: [] }, availableThemes: [], customizations: [], adaptiveMode: true },
        evolution: { generationCount: 1, mutationRate: 0.01, fitnessMetrics: [], evolutionHistory: [] },
        balance: { equilibrium: 0.5, forces: [], adjustmentRules: [], stability: 0.9 },
        bridge: { bridges: [], transferProtocols: [], synchronization: 0.95 },
        infinity: { iterations: 0, convergence: 0, loopStability: 1.0, optimizationTargets: [] },
        quantum: { qubits: 64, entanglementMatrix: [], decoherenceRate: 0.001, quantumGates: [] }
      },
      temporal: { currentCycle: 1, cycleLength: 3600, timeFlow: 1.0, chronoStability: 0.98 },
      consciousness: { awarenessLevel: 0.7, intentionClarity: 0.8, intuitionStrength: 0.6, wisdomAccumulation: 0.1 },
      information: { dataIntegrity: 0.99, knowledgeDepth: 0.3, informationFlow: 0.85, semanticCoherence: 0.9 }
    },
    cycleStage: 'Genesis' as CycleStage,
    energyLevel: 100,
    balanceCoefficient: 1.0,
    ...initialState
  }));

  const [animationPhase, setAnimationPhase] = useState(0);

  // Quantum state evolution effect
  useEffect(() => {
    const interval = setInterval(() => {
      setMatrix(prevMatrix => {
        const newPhase = (prevMatrix.state.phase + 0.01) % (2 * Math.PI);
        const newCoherence = Math.max(0.1, prevMatrix.state.coherence - 0.001);
        const newEntanglement = Math.sin(newPhase) * 0.3 + 0.7;

        const updatedMatrix: TerminusMatrixType = {
          ...prevMatrix,
          state: {
            ...prevMatrix.state,
            phase: newPhase,
            coherence: newCoherence,
            entanglement: newEntanglement
          },
          dimensions: {
            ...prevMatrix.dimensions,
            temporal: {
              ...prevMatrix.dimensions.temporal,
              currentCycle: prevMatrix.dimensions.temporal.currentCycle + 1
            }
          }
        };

        onStateChange?.(updatedMatrix);
        return updatedMatrix;
      });

      setAnimationPhase(prev => (prev + 1) % 360);
    }, 100);

    return () => clearInterval(interval);
  }, [onStateChange]);

  const matrixVisualization = useMemo(() => {
    const cells = [];
    const size = 8;
    
    for (let i = 0; i < size; i++) {
      for (let j = 0; j < size; j++) {
        const intensity = Math.sin((i + j + animationPhase * 0.1) * 0.5) * 0.5 + 0.5;
        const hue = (i * j + animationPhase) % 360;
        
        cells.push(
          <div
            key={`${i}-${j}`}
            className={cn(
              "w-4 h-4 rounded-sm transition-all duration-200",
              intensity > 0.7 ? "quantum-glow" : ""
            )}
            style={{
              backgroundColor: `hsl(${hue}, 70%, ${intensity * 50 + 30}%)`,
              opacity: matrix.state.coherence
            }}
          />
        );
      }
    }
    
    return cells;
  }, [animationPhase, matrix.state.coherence]);

  const cycleStageColor = {
    Genesis: 'from-green-400 to-blue-500',
    Evolution: 'from-blue-400 to-purple-500',
    Maturation: 'from-purple-400 to-pink-500',
    Transformation: 'from-pink-400 to-red-500',
    Transcendence: 'from-red-400 to-yellow-500'
  };

  return (
    <div className={cn("terminus-matrix p-6 rounded-lg shadow-xl", className)}>
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold omnikey-text mb-2">
          終始矩陣 Terminus Matrix
        </h2>
        <div className="text-sm text-muted-foreground">
          Cycle: {matrix.dimensions.temporal.currentCycle} | 
          Stage: {matrix.cycleStage} | 
          Energy: {matrix.energyLevel.toFixed(1)}%
        </div>
      </div>

      <div className="grid grid-cols-2 gap-6">
        {/* Matrix Visualization */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Quantum State Matrix</h3>
          <div className="grid grid-cols-8 gap-1 p-4 bg-black/20 rounded-lg">
            {matrixVisualization}
          </div>
          
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span>Coherence:</span>
              <span>{(matrix.state.coherence * 100).toFixed(1)}%</span>
            </div>
            <div className="flex justify-between">
              <span>Entanglement:</span>
              <span>{(matrix.state.entanglement * 100).toFixed(1)}%</span>
            </div>
            <div className="flex justify-between">
              <span>Phase:</span>
              <span>{matrix.state.phase.toFixed(3)}</span>
            </div>
          </div>
        </div>

        {/* Dimensional Status */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Dimensional Status</h3>
          
          <div className="space-y-3">
            <div className="p-3 bg-white/5 rounded-lg">
              <div className="font-medium mb-2">Consciousness Dimension</div>
              <div className="grid grid-cols-2 gap-2 text-xs">
                <div>Awareness: {(matrix.dimensions.consciousness.awarenessLevel * 100).toFixed(0)}%</div>
                <div>Clarity: {(matrix.dimensions.consciousness.intentionClarity * 100).toFixed(0)}%</div>
                <div>Intuition: {(matrix.dimensions.consciousness.intuitionStrength * 100).toFixed(0)}%</div>
                <div>Wisdom: {(matrix.dimensions.consciousness.wisdomAccumulation * 100).toFixed(0)}%</div>
              </div>
            </div>

            <div className="p-3 bg-white/5 rounded-lg">
              <div className="font-medium mb-2">Information Dimension</div>
              <div className="grid grid-cols-2 gap-2 text-xs">
                <div>Integrity: {(matrix.dimensions.information.dataIntegrity * 100).toFixed(1)}%</div>
                <div>Depth: {(matrix.dimensions.information.knowledgeDepth * 100).toFixed(0)}%</div>
                <div>Flow: {(matrix.dimensions.information.informationFlow * 100).toFixed(0)}%</div>
                <div>Coherence: {(matrix.dimensions.information.semanticCoherence * 100).toFixed(0)}%</div>
              </div>
            </div>

            <div className="p-3 bg-white/5 rounded-lg">
              <div className="font-medium mb-2">Temporal Dimension</div>
              <div className="grid grid-cols-2 gap-2 text-xs">
                <div>Time Flow: {matrix.dimensions.temporal.timeFlow.toFixed(2)}x</div>
                <div>Stability: {(matrix.dimensions.temporal.chronoStability * 100).toFixed(1)}%</div>
                <div>Cycle Length: {matrix.dimensions.temporal.cycleLength}s</div>
                <div>Current: #{matrix.dimensions.temporal.currentCycle}</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Cycle Stage Indicator */}
      <div className="mt-6">
        <div className="text-sm font-medium mb-2">Evolution Stage: {matrix.cycleStage}</div>
        <div className={cn(
          "h-2 rounded-full bg-gradient-to-r",
          cycleStageColor[matrix.cycleStage]
        )}>
          <div 
            className="h-full bg-white/20 rounded-full transition-all duration-1000"
            style={{ 
              width: `${(matrix.dimensions.temporal.currentCycle % matrix.dimensions.temporal.cycleLength) / matrix.dimensions.temporal.cycleLength * 100}%` 
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default TerminusMatrix;