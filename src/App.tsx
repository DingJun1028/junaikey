import { useState } from 'react'
import TerminusMatrix from './core/components/TerminusMatrix'
import CoreEngine from './dimensions/engine/CoreEngine'
import RuneSystem from './dimensions/runes/RuneSystem'
import QuantumWisdom from './components/QuantumWisdom'
import { TerminusMatrix as TerminusMatrixType } from './core/types'
import './styles/globals.css'

function App() {
  const [matrixState, setMatrixState] = useState<TerminusMatrixType | null>(null)

  const handleMatrixStateChange = (state: TerminusMatrixType) => {
    setMatrixState(state)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <header className="text-center mb-12">
          <h1 className="text-6xl font-bold omnikey-text mb-4">
            JunAiKey #OmniKey
          </h1>
          <p className="text-xl text-slate-300 mb-2">
            量子聖典版 Quantum Sacred Edition
          </p>
          <p className="text-lg text-slate-400">
            智慧系統 · 終始矩陣 · 萬能進化無限循環
          </p>
          <div className="mt-6 text-sm text-slate-500">
            Self-Evolving Multi-Dimensional Computational Universe
          </div>
        </header>

        {/* Main Content */}
        <main className="space-y-8">
          {/* Terminus Matrix Core */}
          <section className="mb-12">
            <TerminusMatrix 
              className="max-w-6xl mx-auto"
              onStateChange={handleMatrixStateChange}
            />
          </section>

          {/* MECE Architecture Layers */}
          <section className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6 max-w-7xl mx-auto">
            {/* Core Layer */}
            <div className="bg-gradient-to-br from-red-500/20 to-orange-500/20 p-6 rounded-lg border border-red-500/30">
              <h3 className="text-lg font-semibold text-red-300 mb-3">
                核心層 Core Layer
              </h3>
              <div className="space-y-2 text-sm text-slate-300">
                <div>🔥 Terminus Matrix Engine</div>
                <div>⚡ Quantum Processor</div>
                <div>🌌 Reality Interface</div>
              </div>
              <div className="mt-4 text-xs text-slate-400">
                Status: {matrixState?.dimensions.core.engine.active ? '🟢 Active' : '🔴 Inactive'}
              </div>
            </div>

            {/* Control Layer */}
            <div className="bg-gradient-to-br from-blue-500/20 to-cyan-500/20 p-6 rounded-lg border border-blue-500/30">
              <h3 className="text-lg font-semibold text-blue-300 mb-3">
                控制層 Control Layer
              </h3>
              <div className="space-y-2 text-sm text-slate-300">
                <div>🎛️ System Orchestration</div>
                <div>⚖️ Balance Controller</div>
                <div>🔄 Evolution Manager</div>
              </div>
              <div className="mt-4 text-xs text-slate-400">
                Balance: {matrixState ? (matrixState.balanceCoefficient * 100).toFixed(1) : '0'}%
              </div>
            </div>

            {/* Service Layer */}
            <div className="bg-gradient-to-br from-green-500/20 to-emerald-500/20 p-6 rounded-lg border border-green-500/30">
              <h3 className="text-lg font-semibold text-green-300 mb-3">
                服務層 Service Layer
              </h3>
              <div className="space-y-2 text-sm text-slate-300">
                <div>🤖 Agent Network</div>
                <div>🧠 Think Tank Hub</div>
                <div>🔮 Rune System</div>
              </div>
              <div className="mt-4 text-xs text-slate-400">
                Agents: {matrixState?.dimensions.core.agents.agents.length || 0}
              </div>
            </div>

            {/* Interface Layer */}
            <div className="bg-gradient-to-br from-purple-500/20 to-pink-500/20 p-6 rounded-lg border border-purple-500/30">
              <h3 className="text-lg font-semibold text-purple-300 mb-3">
                接口層 Interface Layer
              </h3>
              <div className="space-y-2 text-sm text-slate-300">
                <div>🎨 Theme Engine</div>
                <div>💫 User Experience</div>
                <div>📊 Data Visualization</div>
              </div>
              <div className="mt-4 text-xs text-slate-400">
                Theme: {matrixState?.dimensions.core.theme.currentTheme.name || 'Quantum'}
              </div>
            </div>

            {/* Boundary Layer */}
            <div className="bg-gradient-to-br from-yellow-500/20 to-amber-500/20 p-6 rounded-lg border border-yellow-500/30">
              <h3 className="text-lg font-semibold text-yellow-300 mb-3">
                邊界層 Boundary Layer
              </h3>
              <div className="space-y-2 text-sm text-slate-300">
                <div>🛡️ Security Domain</div>
                <div>🔗 External APIs</div>
                <div>🌐 Integration Hub</div>
              </div>
              <div className="mt-4 text-xs text-slate-400">
                Security: {matrixState?.dimensions.core.security.integrity || 100}%
              </div>
            </div>
          </section>

          {/* Functional Dimensions Grid */}
          <section className="max-w-7xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-8 omnikey-text">
              十二維度系統 Twelve Dimensional System
            </h2>
            
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {[
                { name: '核心引擎', en: 'Core Engine', icon: '⚡', color: 'from-red-400 to-red-600' },
                { name: '符文系統', en: 'Rune System', icon: '🔮', color: 'from-blue-400 to-blue-600' },
                { name: '代理網絡', en: 'Agent Network', icon: '🤖', color: 'from-green-400 to-green-600' },
                { name: '智庫中樞', en: 'Think Tank', icon: '🧠', color: 'from-purple-400 to-purple-600' },
                { name: '同步矩陣', en: 'Sync Matrix', icon: '🔄', color: 'from-cyan-400 to-cyan-600' },
                { name: '安全域', en: 'Security Domain', icon: '🛡️', color: 'from-orange-400 to-orange-600' },
                { name: '主題引擎', en: 'Theme Engine', icon: '🎨', color: 'from-pink-400 to-pink-600' },
                { name: '進化引擎', en: 'Evolution Engine', icon: '🧬', color: 'from-indigo-400 to-indigo-600' },
                { name: '平衡控制器', en: 'Balance Controller', icon: '⚖️', color: 'from-teal-400 to-teal-600' },
                { name: '維度橋接', en: 'Dimension Bridge', icon: '🌉', color: 'from-yellow-400 to-yellow-600' },
                { name: '無限循環', en: 'Infinity Loop', icon: '∞', color: 'from-violet-400 to-violet-600' },
                { name: '量子態', en: 'Quantum State', icon: '⚛️', color: 'from-emerald-400 to-emerald-600' }
              ].map((dimension, index) => (
                <div 
                  key={index}
                  className={`bg-gradient-to-br ${dimension.color} p-4 rounded-lg text-white shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer group`}
                >
                  <div className="text-2xl mb-2 group-hover:animate-pulse">{dimension.icon}</div>
                  <div className="font-semibold text-sm mb-1">{dimension.name}</div>
                  <div className="text-xs opacity-80">{dimension.en}</div>
                  <div className="mt-2 text-xs">
                    Active: {Math.floor(Math.random() * 100)}%
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Quantum State Display */}
          {matrixState && (
            <section className="max-w-4xl mx-auto bg-black/20 rounded-lg p-6 border border-purple-500/30">
              <h3 className="text-xl font-semibold mb-4 omnikey-text">
                Current Quantum State
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                <div className="space-y-1">
                  <div className="font-medium text-purple-300">Superposition</div>
                  <div className="text-slate-300">
                    {matrixState.state.superposition ? '🟢 Active' : '🔴 Collapsed'}
                  </div>
                </div>
                <div className="space-y-1">
                  <div className="font-medium text-purple-300">Entanglement</div>
                  <div className="text-slate-300">
                    {(matrixState.state.entanglement * 100).toFixed(1)}%
                  </div>
                </div>
                <div className="space-y-1">
                  <div className="font-medium text-purple-300">Coherence</div>
                  <div className="text-slate-300">
                    {(matrixState.state.coherence * 100).toFixed(1)}%
                  </div>
                </div>
                <div className="space-y-1">
                  <div className="font-medium text-purple-300">Energy Level</div>
                  <div className="text-slate-300">
                    {matrixState.energyLevel.toFixed(1)}%
                  </div>
                </div>
              </div>
            </section>
          )}

          {/* Interactive Dimension Components */}
          <section className="max-w-7xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-8 omnikey-text">
              Interactive Dimension Components
            </h2>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
              {/* Core Engine */}
              <CoreEngine />
              
              {/* Rune System */}
              <RuneSystem />
            </div>

            {/* Quantum Wisdom */}
            <div className="mb-8">
              <QuantumWisdom matrixState={matrixState} />
            </div>
          </section>
        </main>

        {/* Footer */}
        <footer className="mt-16 text-center text-slate-500">
          <div className="mb-4">
            <div className="text-sm">
              「終始一如」的核心公理 · Core Axiom of "Beginning and End as One"
            </div>
            <div className="text-xs mt-1">
              Value circulation through infinite evolution cycle
            </div>
          </div>
          <div className="text-xs">
            Powered by React + TypeScript + Firebase + Google Gemini + Shadcn UI + Tailwind CSS
          </div>
        </footer>
      </div>
    </div>
  )
}

export default App