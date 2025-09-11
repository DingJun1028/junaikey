import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// JunAiKey Utility Functions

/**
 * Calculate quantum coherence based on multiple factors
 */
export function calculateCoherence(
  entanglement: number,
  phase: number,
  stability: number
): number {
  return Math.min(1, (entanglement * 0.4 + Math.cos(phase) * 0.3 + stability * 0.3))
}

/**
 * Generate quantum-inspired random values
 */
export function quantumRandom(seed?: number): number {
  const base = seed ? Math.sin(seed * 12.9898) * 43758.5453 : Math.random()
  return (base % 1 + 1) % 1
}

/**
 * Create a stable identifier for matrix elements
 */
export function createMatrixId(prefix: string = 'matrix'): string {
  const timestamp = Date.now().toString(36)
  const random = Math.random().toString(36).substr(2, 5)
  return `${prefix}-${timestamp}-${random}`
}

/**
 * Calculate balance coefficient for energy distribution
 */
export function calculateBalance(forces: number[]): number {
  if (forces.length === 0) return 1.0
  
  const sum = forces.reduce((acc, force) => acc + force, 0)
  const mean = sum / forces.length
  const variance = forces.reduce((acc, force) => acc + Math.pow(force - mean, 2), 0) / forces.length
  
  return Math.max(0.1, 1 - Math.sqrt(variance) / mean)
}

/**
 * Format quantum phase for display
 */
export function formatPhase(phase: number): string {
  const normalized = ((phase % (2 * Math.PI)) / (2 * Math.PI)) * 360
  return `${normalized.toFixed(1)}°`
}

/**
 * Generate color based on quantum state
 */
export function quantumColor(
  phase: number,
  coherence: number,
  saturation: number = 70
): string {
  const hue = (phase / (2 * Math.PI)) * 360
  const lightness = 30 + (coherence * 40)
  return `hsl(${hue}, ${saturation}%, ${lightness}%)`
}

/**
 * Create a dimensional bridge connection
 */
export function createBridge(
  fromLayer: string,
  toLayer: string,
  bandwidth: number = 1000
): { id: string; from: string; to: string; bandwidth: number; timestamp: Date } {
  return {
    id: createMatrixId('bridge'),
    from: fromLayer,
    to: toLayer,
    bandwidth,
    timestamp: new Date()
  }
}

/**
 * Calculate optimization target progress
 */
export function calculateProgress(current: number, target: number): number {
  if (target === 0) return current === 0 ? 100 : 0
  return Math.min(100, Math.max(0, (current / target) * 100))
}

/**
 * Generate runic symbol based on element and power
 */
export function generateRuneSymbol(element: string, power: number): string {
  const elementSymbols: Record<string, string[]> = {
    Fire: ['🔥', '⚡', '☀️', '💥'],
    Water: ['💧', '🌊', '❄️', '💎'],
    Earth: ['🗿', '⛰️', '🌍', '💎'],
    Air: ['💨', '🌪️', '☁️', '🕊️'],
    Quantum: ['⚛️', '🔮', '✨', '🌌'],
    Void: ['🕳️', '🌑', '⚫', '🌌']
  }
  
  const symbols = elementSymbols[element] || elementSymbols.Quantum
  const index = Math.floor((power / 100) * symbols.length)
  return symbols[Math.min(index, symbols.length - 1)]
}

/**
 * Calculate system efficiency based on multiple metrics
 */
export function calculateEfficiency(metrics: {
  throughput: number;
  responseTime: number;
  errorRate: number;
  uptime: number;
}): number {
  const throughputScore = Math.min(100, metrics.throughput / 10) / 100
  const responseScore = Math.max(0, (1000 - metrics.responseTime) / 1000)
  const errorScore = Math.max(0, (100 - metrics.errorRate) / 100)
  const uptimeScore = metrics.uptime / 100
  
  return (throughputScore * 0.3 + responseScore * 0.2 + errorScore * 0.2 + uptimeScore * 0.3) * 100
}

/**
 * Generate evolution mutation
 */
export function generateMutation(
  currentValue: number,
  mutationRate: number,
  bounds: [number, number] = [0, 1]
): number {
  const mutation = (Math.random() - 0.5) * mutationRate * 2
  const newValue = currentValue + mutation
  return Math.max(bounds[0], Math.min(bounds[1], newValue))
}

/**
 * Format large numbers with appropriate suffixes
 */
export function formatNumber(num: number): string {
  const suffixes = ['', 'K', 'M', 'B', 'T', 'Q']
  let index = 0
  
  while (num >= 1000 && index < suffixes.length - 1) {
    num /= 1000
    index++
  }
  
  return `${num.toFixed(1)}${suffixes[index]}`
}

/**
 * Create temporal cycle information
 */
export function createCycle(
  stage: string,
  duration: number,
  startTime: Date = new Date()
): {
  stage: string;
  start: Date;
  end: Date;
  duration: number;
  progress: number;
} {
  const end = new Date(startTime.getTime() + duration * 1000)
  const now = new Date()
  const elapsed = Math.max(0, now.getTime() - startTime.getTime())
  const progress = Math.min(100, (elapsed / (duration * 1000)) * 100)
  
  return {
    stage,
    start: startTime,
    end,
    duration,
    progress
  }
}