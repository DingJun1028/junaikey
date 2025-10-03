import React, { useState, useEffect } from 'react'
import { EngineState } from '@/core/types'
import { cn, calculateEfficiency, formatNumber } from '@/lib/utils'

interface CoreEngineProps {
  className?: string
  onStateChange?: (state: EngineState) => void
}

const CoreEngine: React.FC<CoreEngineProps> = ({ className, onStateChange }) => {
  const [engineState, setEngineState] = useState<EngineState>({
    active: true,
    processingPower: 85,
    efficiency: 0.92,
    lastUpdate: new Date()
  })

  const [metrics, setMetrics] = useState({
    throughput: 1250,
    responseTime: 45,
    errorRate: 0.1,
    uptime: 99.98
  })

  const [isOptimizing, setIsOptimizing] = useState(false)

  useEffect(() => {
    const interval = setInterval(() => {
      setEngineState(prev => {
        const newProcessingPower = Math.max(10, Math.min(100, 
          prev.processingPower + (Math.random() - 0.5) * 2
        ))
        
        const newEfficiency = calculateEfficiency(metrics) / 100
        
        const updated = {
          ...prev,
          processingPower: newProcessingPower,
          efficiency: newEfficiency,
          lastUpdate: new Date()
        }

        onStateChange?.(updated)
        return updated
      })

      setMetrics(prev => ({
        throughput: Math.max(0, prev.throughput + (Math.random() - 0.5) * 100),
        responseTime: Math.max(1, prev.responseTime + (Math.random() - 0.5) * 10),
        errorRate: Math.max(0, Math.min(5, prev.errorRate + (Math.random() - 0.5) * 0.1)),
        uptime: Math.max(95, Math.min(100, prev.uptime + (Math.random() - 0.5) * 0.01))
      }))
    }, 2000)

    return () => clearInterval(interval)
  }, [metrics, onStateChange])

  const handleOptimize = async () => {
    setIsOptimizing(true)
    
    // Simulate optimization process
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    setEngineState(prev => ({
      ...prev,
      processingPower: Math.min(100, prev.processingPower + 10),
      efficiency: Math.min(1, prev.efficiency + 0.05)
    }))
    
    setMetrics(prev => ({
      ...prev,
      throughput: prev.throughput * 1.15,
      responseTime: prev.responseTime * 0.9,
      errorRate: prev.errorRate * 0.8,
      uptime: Math.min(100, prev.uptime + 0.1)
    }))
    
    setIsOptimizing(false)
  }

  const getStatusColor = () => {
    if (!engineState.active) return 'text-red-400'
    if (engineState.efficiency > 0.9) return 'text-green-400'
    if (engineState.efficiency > 0.7) return 'text-yellow-400'
    return 'text-orange-400'
  }

  const getStatusText = () => {
    if (!engineState.active) return '🔴 Offline'
    if (engineState.efficiency > 0.9) return '🟢 Optimal'
    if (engineState.efficiency > 0.7) return '🟡 Normal'
    return '🟠 Suboptimal'
  }

  return (
    <div className={cn(
      "bg-gradient-to-br from-red-500/10 to-orange-500/10 border border-red-500/30 rounded-lg p-6",
      className
    )}>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-xl font-bold text-red-300 mb-1">
            ⚡ 核心引擎 Core Engine
          </h3>
          <p className="text-sm text-slate-400">
            Primary computational system
          </p>
        </div>
        <div className={cn("text-sm font-medium", getStatusColor())}>
          {getStatusText()}
        </div>
      </div>

      {/* Engine Metrics */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="space-y-3">
          <div>
            <div className="flex justify-between text-sm mb-1">
              <span className="text-slate-300">Processing Power</span>
              <span className="text-red-300">{engineState.processingPower.toFixed(1)}%</span>
            </div>
            <div className="w-full bg-slate-700 rounded-full h-2">
              <div 
                className="bg-gradient-to-r from-red-500 to-orange-500 h-2 rounded-full transition-all duration-1000"
                style={{ width: `${engineState.processingPower}%` }}
              />
            </div>
          </div>

          <div>
            <div className="flex justify-between text-sm mb-1">
              <span className="text-slate-300">Efficiency</span>
              <span className="text-red-300">{(engineState.efficiency * 100).toFixed(1)}%</span>
            </div>
            <div className="w-full bg-slate-700 rounded-full h-2">
              <div 
                className="bg-gradient-to-r from-green-500 to-emerald-500 h-2 rounded-full transition-all duration-1000"
                style={{ width: `${engineState.efficiency * 100}%` }}
              />
            </div>
          </div>
        </div>

        <div className="space-y-2 text-xs">
          <div className="flex justify-between">
            <span className="text-slate-400">Throughput:</span>
            <span className="text-slate-200">{formatNumber(metrics.throughput)} ops/sec</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-400">Response Time:</span>
            <span className="text-slate-200">{metrics.responseTime.toFixed(1)}ms</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-400">Error Rate:</span>
            <span className="text-slate-200">{metrics.errorRate.toFixed(2)}%</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-400">Uptime:</span>
            <span className="text-slate-200">{metrics.uptime.toFixed(2)}%</span>
          </div>
        </div>
      </div>

      {/* Real-time Activity Indicator */}
      <div className="mb-6">
        <div className="text-sm text-slate-300 mb-2">System Activity</div>
        <div className="flex space-x-1">
          {Array.from({ length: 20 }).map((_, i) => (
            <div
              key={i}
              className={cn(
                "w-1 bg-gradient-to-t rounded-full transition-all duration-500",
                engineState.active ? "from-red-500 to-orange-400" : "from-slate-600 to-slate-700"
              )}
              style={{
                height: `${Math.random() * 30 + 10}px`,
                animationDelay: `${i * 100}ms`
              }}
            />
          ))}
        </div>
      </div>

      {/* Control Panel */}
      <div className="flex justify-between items-center">
        <div className="text-xs text-slate-400">
          Last Update: {engineState.lastUpdate.toLocaleTimeString()}
        </div>
        
        <button
          onClick={handleOptimize}
          disabled={isOptimizing}
          className={cn(
            "px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200",
            isOptimizing 
              ? "bg-slate-600 text-slate-400 cursor-not-allowed"
              : "bg-gradient-to-r from-red-500 to-orange-500 text-white hover:shadow-lg hover:shadow-red-500/25"
          )}
        >
          {isOptimizing ? (
            <div className="flex items-center space-x-2">
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              <span>Optimizing...</span>
            </div>
          ) : (
            "⚡ Optimize Engine"
          )}
        </button>
      </div>

      {/* Quantum Core Visualization */}
      <div className="mt-6 p-4 bg-black/20 rounded-lg">
        <div className="text-sm font-medium text-red-300 mb-3">Quantum Core Matrix</div>
        <div className="grid grid-cols-8 gap-1">
          {Array.from({ length: 64 }).map((_, i) => (
            <div
              key={i}
              className={cn(
                "w-3 h-3 rounded-sm transition-all duration-300",
                engineState.active ? "bg-red-500/60 animate-pulse" : "bg-slate-600/30"
              )}
              style={{
                animationDelay: `${(i % 8) * 100}ms`,
                opacity: engineState.active ? Math.random() * 0.8 + 0.2 : 0.3
              }}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

export default CoreEngine