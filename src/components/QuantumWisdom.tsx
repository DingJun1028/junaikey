import React, { useState, useEffect } from 'react'
import { TerminusMatrix } from '@/core/types'
import { cn } from '@/lib/utils'
import { geminiService } from '@/config/gemini'

interface QuantumWisdomProps {
  className?: string
  matrixState?: TerminusMatrix | null
}

const QuantumWisdom: React.FC<QuantumWisdomProps> = ({ className, matrixState }) => {
  const [wisdom, setWisdom] = useState<string>('')
  const [isGenerating, setIsGenerating] = useState(false)
  const [lastUpdate, setLastUpdate] = useState<Date>(new Date())

  const generateWisdom = async () => {
    if (!matrixState) return
    
    setIsGenerating(true)
    try {
      const newWisdom = await geminiService.generateQuantumWisdom(matrixState)
      setWisdom(newWisdom)
      setLastUpdate(new Date())
    } catch (error) {
      console.error('Failed to generate wisdom:', error)
      setWisdom('🌌 The quantum realm speaks in silence, teaching us that sometimes the deepest wisdom comes from within the matrix of our own consciousness.')
    }
    setIsGenerating(false)
  }

  useEffect(() => {
    if (matrixState && !wisdom) {
      generateWisdom()
    }
  }, [matrixState, wisdom])

  // Auto-generate wisdom every 30 seconds when matrix state changes significantly
  useEffect(() => {
    if (!matrixState) return
    
    const interval = setInterval(() => {
      if (Math.random() > 0.7) { // 30% chance every 30 seconds
        generateWisdom()
      }
    }, 30000)

    return () => clearInterval(interval)
  }, [matrixState])

  const formatWisdom = (text: string) => {
    // Split by newlines and format bilingual content
    const lines = text.split('\n').filter(line => line.trim())
    return lines.map((line, index) => (
      <p key={index} className={cn(
        "mb-2 last:mb-0",
        line.includes('🌌') || line.includes('⚛️') || line.includes('🔮') ? "text-purple-200" : "text-slate-300"
      )}>
        {line.trim()}
      </p>
    ))
  }

  return (
    <div className={cn(
      "bg-gradient-to-br from-purple-500/10 to-indigo-500/10 border border-purple-500/30 rounded-lg p-6",
      className
    )}>
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-bold text-purple-300">
          🌌 量子智慧 Quantum Wisdom
        </h3>
        <button
          onClick={generateWisdom}
          disabled={isGenerating || !matrixState}
          className={cn(
            "px-3 py-1 rounded text-xs font-medium transition-all duration-200",
            isGenerating || !matrixState
              ? "bg-slate-600 text-slate-400 cursor-not-allowed"
              : "bg-purple-600 text-white hover:bg-purple-500"
          )}
        >
          {isGenerating ? (
            <div className="flex items-center space-x-1">
              <div className="w-3 h-3 border border-white border-t-transparent rounded-full animate-spin" />
              <span>Channeling...</span>
            </div>
          ) : (
            "✨ New Insight"
          )}
        </button>
      </div>

      <div className="min-h-[120px] max-h-[300px] overflow-y-auto">
        {wisdom ? (
          <div className="prose prose-invert max-w-none">
            {formatWisdom(wisdom)}
          </div>
        ) : (
          <div className="flex items-center justify-center h-32 text-slate-400">
            <div className="text-center">
              <div className="text-2xl mb-2">🧘‍♂️</div>
              <div className="text-sm">Awaiting quantum consciousness...</div>
            </div>
          </div>
        )}
      </div>

      {wisdom && (
        <div className="mt-4 pt-3 border-t border-purple-500/20 text-xs text-slate-400 text-right">
          Last insight: {lastUpdate.toLocaleTimeString()}
        </div>
      )}

      {/* Meditation Animation */}
      <div className="mt-4 flex justify-center">
        <div className="relative">
          <div className="w-16 h-16 border-2 border-purple-500/30 rounded-full animate-pulse" />
          <div className="absolute inset-2 w-12 h-12 border border-purple-400/20 rounded-full animate-ping" />
          <div className="absolute inset-4 w-8 h-8 bg-gradient-to-r from-purple-500/20 to-indigo-500/20 rounded-full animate-pulse" />
          <div className="absolute inset-6 w-4 h-4 bg-purple-400/60 rounded-full animate-bounce" />
        </div>
      </div>
    </div>
  )
}

export default QuantumWisdom