import React, { useState, useEffect } from 'react'
import { Rune, RuneSystem as RuneSystemType, Element } from '@/core/types'
import { cn, generateRuneSymbol } from '@/lib/utils'
import { geminiService } from '@/config/gemini'

interface RuneSystemProps {
  className?: string
  onStateChange?: (state: RuneSystemType) => void
}

const RuneSystem: React.FC<RuneSystemProps> = ({ className, onStateChange }) => {
  const [runeSystem, setRuneSystem] = useState<RuneSystemType>({
    activeRunes: [],
    runePool: [],
    combinationRules: [],
    powerLevel: 50
  })

  const [selectedElement, setSelectedElement] = useState<Element>('Quantum')
  const [isGenerating, setIsGenerating] = useState(false)
  const [generationProgress, setGenerationProgress] = useState(0)

  // Initialize with some basic runes
  useEffect(() => {
    const initialRunes: Rune[] = [
      {
        symbol: generateRuneSymbol('Fire', 75),
        name: '烈焰印記 Fire Sigil',
        power: 75,
        element: 'Fire',
        effects: [
          { type: 'ProcessingBoost', magnitude: 0.25, duration: 300, target: 'Engine' },
          { type: 'EnergyAmplification', magnitude: 0.15, duration: 600, target: 'System' }
        ]
      },
      {
        symbol: generateRuneSymbol('Water', 60),
        name: '流水符文 Water Rune',
        power: 60,
        element: 'Water',
        effects: [
          { type: 'DataFlow', magnitude: 0.20, duration: 450, target: 'Network' },
          { type: 'Cleansing', magnitude: 0.30, duration: 200, target: 'Errors' }
        ]
      },
      {
        symbol: generateRuneSymbol('Quantum', 90),
        name: '量子核心 Quantum Core',
        power: 90,
        element: 'Quantum',
        effects: [
          { type: 'Superposition', magnitude: 0.40, duration: 800, target: 'Matrix' },
          { type: 'Entanglement', magnitude: 0.35, duration: 1000, target: 'System' },
          { type: 'CoherenceBoost', magnitude: 0.25, duration: 600, target: 'State' }
        ]
      }
    ]

    setRuneSystem(prev => {
      const updated = {
        ...prev,
        runePool: initialRunes,
        activeRunes: [initialRunes[2]], // Start with Quantum Core active
        powerLevel: 75
      }
      onStateChange?.(updated)
      return updated
    })
  }, [onStateChange])

  const elements: Element[] = ['Fire', 'Water', 'Earth', 'Air', 'Quantum', 'Void']

  const generateNewRune = async () => {
    setIsGenerating(true)
    setGenerationProgress(0)

    // Simulate generation progress
    const progressInterval = setInterval(() => {
      setGenerationProgress(prev => Math.min(prev + 10, 90))
    }, 100)

    try {
      // Use Gemini AI to generate rune (with fallback)
      const runeData = await geminiService.generateRune(
        selectedElement,
        Math.floor(Math.random() * 40) + 60, // Power between 60-100
        'Enhance system harmony'
      )

      clearInterval(progressInterval)
      setGenerationProgress(100)

      const newRune: Rune = {
        symbol: runeData.symbol,
        name: runeData.name,
        power: Math.floor(Math.random() * 40) + 60,
        element: selectedElement,
        effects: runeData.effects.map((effect: string, index: number) => ({
          type: effect.split(':')[0] || `Effect${index}`,
          magnitude: Math.random() * 0.3 + 0.1,
          duration: Math.floor(Math.random() * 500) + 300,
          target: ['System', 'Engine', 'Network', 'Matrix'][Math.floor(Math.random() * 4)]
        }))
      }

      setTimeout(() => {
        setRuneSystem(prev => {
          const updated = {
            ...prev,
            runePool: [...prev.runePool, newRune],
            powerLevel: Math.min(100, prev.powerLevel + 5)
          }
          onStateChange?.(updated)
          return updated
        })
        setIsGenerating(false)
        setGenerationProgress(0)
      }, 500)

    } catch (error) {
      clearInterval(progressInterval)
      setIsGenerating(false)
      setGenerationProgress(0)
    }
  }

  const activateRune = (rune: Rune) => {
    setRuneSystem(prev => {
      if (prev.activeRunes.length >= 3) {
        return prev // Max 3 active runes
      }

      const updated = {
        ...prev,
        activeRunes: [...prev.activeRunes, rune],
        powerLevel: Math.min(100, prev.powerLevel + rune.power * 0.1)
      }
      onStateChange?.(updated)
      return updated
    })
  }

  const deactivateRune = (runeIndex: number) => {
    setRuneSystem(prev => {
      const rune = prev.activeRunes[runeIndex]
      const updated = {
        ...prev,
        activeRunes: prev.activeRunes.filter((_, i) => i !== runeIndex),
        powerLevel: Math.max(0, prev.powerLevel - (rune?.power || 0) * 0.1)
      }
      onStateChange?.(updated)
      return updated
    })
  }

  const getElementColor = (element: Element) => {
    const colors = {
      Fire: 'from-red-500 to-orange-500',
      Water: 'from-blue-500 to-cyan-500',
      Earth: 'from-green-500 to-emerald-500',
      Air: 'from-gray-400 to-slate-500',
      Quantum: 'from-purple-500 to-violet-500',
      Void: 'from-black to-gray-800'
    }
    return colors[element]
  }

  return (
    <div className={cn(
      "bg-gradient-to-br from-blue-500/10 to-purple-500/10 border border-blue-500/30 rounded-lg p-6",
      className
    )}>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-xl font-bold text-blue-300 mb-1">
            🔮 符文系統 Rune System
          </h3>
          <p className="text-sm text-slate-400">
            Symbolic computation framework
          </p>
        </div>
        <div className="text-right">
          <div className="text-sm font-medium text-blue-300">
            Power Level: {runeSystem.powerLevel.toFixed(0)}%
          </div>
          <div className="text-xs text-slate-400">
            Active: {runeSystem.activeRunes.length}/3
          </div>
        </div>
      </div>

      {/* Power Level Indicator */}
      <div className="mb-6">
        <div className="w-full bg-slate-700 rounded-full h-3">
          <div 
            className="bg-gradient-to-r from-blue-500 to-purple-500 h-3 rounded-full transition-all duration-1000"
            style={{ width: `${runeSystem.powerLevel}%` }}
          />
        </div>
      </div>

      {/* Active Runes */}
      <div className="mb-6">
        <h4 className="text-md font-semibold text-blue-300 mb-3">Active Runes</h4>
        <div className="grid grid-cols-3 gap-3">
          {Array.from({ length: 3 }).map((_, index) => {
            const rune = runeSystem.activeRunes[index]
            return (
              <div
                key={index}
                className={cn(
                  "aspect-square border-2 border-dashed rounded-lg flex flex-col items-center justify-center transition-all duration-300",
                  rune 
                    ? `border-${rune.element === 'Fire' ? 'red' : rune.element === 'Water' ? 'blue' : rune.element === 'Quantum' ? 'purple' : 'gray'}-400 bg-gradient-to-br ${getElementColor(rune.element)}/20 cursor-pointer hover:shadow-lg`
                    : "border-slate-600 bg-slate-800/30"
                )}
                onClick={() => rune && deactivateRune(index)}
              >
                {rune ? (
                  <>
                    <div className="text-2xl mb-1">{rune.symbol}</div>
                    <div className="text-xs text-center font-medium">{rune.name.split(' ')[0]}</div>
                    <div className="text-xs text-slate-300">{rune.power}</div>
                  </>
                ) : (
                  <div className="text-slate-500 text-xs">Empty Slot</div>
                )}
              </div>
            )
          })}
        </div>
      </div>

      {/* Rune Generation */}
      <div className="mb-6">
        <h4 className="text-md font-semibold text-blue-300 mb-3">Generate New Rune</h4>
        <div className="flex items-center space-x-3 mb-3">
          <select
            value={selectedElement}
            onChange={(e) => setSelectedElement(e.target.value as Element)}
            className="bg-slate-800 border border-slate-600 rounded px-3 py-2 text-sm text-slate-200"
            disabled={isGenerating}
          >
            {elements.map(element => (
              <option key={element} value={element}>{element}</option>
            ))}
          </select>
          
          <button
            onClick={generateNewRune}
            disabled={isGenerating}
            className={cn(
              "px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 flex-1",
              isGenerating 
                ? "bg-slate-600 text-slate-400 cursor-not-allowed"
                : "bg-gradient-to-r from-blue-500 to-purple-500 text-white hover:shadow-lg"
            )}
          >
            {isGenerating ? (
              <div className="flex items-center justify-center space-x-2">
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                <span>Generating... {generationProgress}%</span>
              </div>
            ) : (
              "✨ Generate Rune"
            )}
          </button>
        </div>

        {isGenerating && (
          <div className="w-full bg-slate-700 rounded-full h-2">
            <div 
              className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full transition-all duration-300"
              style={{ width: `${generationProgress}%` }}
            />
          </div>
        )}
      </div>

      {/* Rune Pool */}
      <div>
        <h4 className="text-md font-semibold text-blue-300 mb-3">
          Rune Pool ({runeSystem.runePool.length})
        </h4>
        <div className="grid grid-cols-4 gap-2 max-h-32 overflow-y-auto">
          {runeSystem.runePool.map((rune, index) => (
            <div
              key={index}
              className={cn(
                "aspect-square border border-opacity-50 rounded-lg p-2 cursor-pointer transition-all duration-200 hover:shadow-lg",
                `border-${rune.element === 'Fire' ? 'red' : rune.element === 'Water' ? 'blue' : rune.element === 'Quantum' ? 'purple' : 'gray'}-400`,
                `bg-gradient-to-br ${getElementColor(rune.element)}/10 hover:${getElementColor(rune.element)}/20`,
                runeSystem.activeRunes.includes(rune) && "opacity-50"
              )}
              onClick={() => !runeSystem.activeRunes.includes(rune) && activateRune(rune)}
            >
              <div className="flex flex-col items-center justify-center h-full">
                <div className="text-lg mb-1">{rune.symbol}</div>
                <div className="text-xs text-center font-medium leading-tight">{rune.name.split(' ')[0]}</div>
                <div className="text-xs text-slate-300">{rune.power}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Active Effects Display */}
      {runeSystem.activeRunes.length > 0 && (
        <div className="mt-6 p-3 bg-black/20 rounded-lg">
          <div className="text-sm font-medium text-blue-300 mb-2">Active Effects</div>
          <div className="space-y-1 text-xs">
            {runeSystem.activeRunes.flatMap(rune => 
              rune.effects.map((effect, i) => (
                <div key={`${rune.name}-${i}`} className="flex justify-between text-slate-300">
                  <span>{effect.type} (+{(effect.magnitude * 100).toFixed(0)}%)</span>
                  <span className="text-slate-400">{effect.target}</span>
                </div>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  )
}

export default RuneSystem