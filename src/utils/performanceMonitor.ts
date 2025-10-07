/**
 * JunAiKey 效能監控系統
 * 提供應用程式效能監控、分析和報告功能
 */

import { logger, LogLevel } from './logger';
import { performance } from 'perf_hooks';

export interface PerformanceMetric {
  name: string;
  duration: number;
  timestamp: string;
  metadata?: Record<string, any>;
  tags?: string[];
}

export interface PerformanceThreshold {
  warning: number;
  critical: number;
}

export interface PerformanceConfig {
  enableConsoleLogging: boolean;
  enableMetricsCollection: boolean;
  enableAlerting: boolean;
  thresholds: {
    [metric: string]: PerformanceThreshold;
  };
  sampleRate: number; // 0..1
}

export class PerformanceMonitor {
  private metrics: PerformanceMetric[] = [];
  private maxMetricsSize: number = 1000; // Maximum number of metrics to retain
  private activeTimers: Map<string, { startTime: number; tags?: string[]; name?: string; metadata?: Record<string, any> }> = new Map();
  private config: PerformanceConfig;
  private alertCallbacks: Array<(metric: PerformanceMetric) => void> = [];

  constructor(config: Partial<PerformanceConfig> = {}) {
    this.config = {
      enableConsoleLogging: true,
      enableMetricsCollection: true,
      enableAlerting: true,
      thresholds: {
        response_time: { warning: 1000, critical: 5000 },
        memory_usage: { warning: 85, critical: 95 },
        cpu_usage: { warning: 80, critical: 90 }
      },
      sampleRate: 1,
      ...config
    };
  }

  // 開始計時
  startTimer(name: string, tags?: string[], metadata?: Record<string, any>): string {
    const timerId = `${Date.now()}_${Math.random().toString(36).substring(2, 11)}`;
    // 正確儲存完整的 timer 資訊
    this.activeTimers.set(timerId, { startTime: performance.now(), tags, name, metadata });

    if (this.config.enableConsoleLogging) {
      logger.debug('PerformanceMonitor', `Timer started: ${name}`, { timerId, tags, metadata });
    }

    return timerId;
  }

  // 結束計時並記錄指標
  endTimer(timerId: string, metadata?: Record<string, any>): PerformanceMetric | null {
    const timerData = this.activeTimers.get(timerId);
    const startTime = timerData?.startTime;

    if (!startTime) {
      logger.warn('PerformanceMonitor', `Timer not found: ${timerId}`);
      return null;
    }

    const endTime = performance.now();
    const duration = endTime - startTime;

    const metricName = timerData?.name || metadata?.originalName || 'unknown';

    const metric: PerformanceMetric = {
      name: metricName,
      duration,
      timestamp: new Date().toISOString(),
      tags: timerData?.tags || [],
      metadata: { ...(timerData?.metadata || {}), ...(metadata || {}) }
    };

    this.activeTimers.delete(timerId);

    // 檢查是否需要記錄（基於取樣率）
    try {
      const sampleThreshold = Math.max(0, Math.min(1, this.config.sampleRate));
      if (Math.random() <= sampleThreshold) {
        this.recordMetric(metric);
      }
    } catch (err) {
      // 若 sampleRate 或記錄發生錯誤，不應阻斷主流程
      logger.warn('PerformanceMonitor', 'Sampling or recording metric failed', err as Error);
    }

    if (this.config.enableConsoleLogging) {
      logger.info('PerformanceMonitor', `Timer completed: ${metric.name}`, {
        duration: `${duration.toFixed(2)}ms`,
        ...metric.metadata
      });
    }

    return metric;
  }

  // 直接記錄效能指標
  recordMetric(metric: PerformanceMetric): void {
    if (!this.config.enableMetricsCollection) {
      return;
    }

    this.metrics.push(metric);

    // Ensure the metrics array does not exceed the maximum size
    while (this.metrics.length > this.maxMetricsSize) {
      this.metrics.shift(); // 移除最舊的指標
    }

    // 檢查是否需要觸發警報
    if (this.config.enableAlerting) {
      this.checkThresholds(metric);
    }
  }

  // 檢查效能閾值
  private checkThresholds(metric: PerformanceMetric): void {
    const threshold = this.config.thresholds[metric.name];

    if (!threshold) {
      return;
    }

    if (metric.duration >= threshold.critical) {
      this.triggerAlert(metric, 'critical');
    } else if (metric.duration >= threshold.warning) {
      this.triggerAlert(metric, 'warning');
    }
  }

  // 觸發警報
  private triggerAlert(metric: PerformanceMetric, level: 'warning' | 'critical'): void {
    const alertLevel = level === 'critical' ? LogLevel.ERROR : LogLevel.WARN;

    if (alertLevel === LogLevel.ERROR) {
      logger.error(
        'PerformanceMonitor',
        `Performance ${level.toUpperCase()} alert: ${metric.name} exceeded threshold`,
        undefined,
        { metric, threshold: this.config.thresholds[metric.name] }
      );
    } else {
      logger.warn(
        'PerformanceMonitor',
        `Performance ${level.toUpperCase()} alert: ${metric.name} exceeded threshold`,
        { metric, threshold: this.config.thresholds[metric.name] }
      );
    }

    // 通知所有警報回調
    this.alertCallbacks.forEach(callback => {
      try {
        callback(metric);
      } catch (callbackError) {
        logger.error('PerformanceMonitor', 'Error in alert callback', callbackError as Error);
      }
    });
  }

  // 註冊警報回調
  onAlert(callback: (metric: PerformanceMetric) => void): void {
    this.alertCallbacks.push(callback);
  }

  // 取得效能指標
  getMetrics(filter?: {
    name?: string;
    tags?: string[];
    startTime?: string;
    endTime?: string;
  }): PerformanceMetric[] {
    let filteredMetrics = [...this.metrics];

    if (filter?.name) {
      filteredMetrics = filteredMetrics.filter(metric => metric.name === filter.name);
    }

    if (filter?.tags) {
      filteredMetrics = filteredMetrics.filter(metric =>
        metric.tags?.some(tag => filter.tags!.includes(tag))
      );
    }

    if (filter?.startTime) {
      filteredMetrics = filteredMetrics.filter(metric => metric.timestamp >= filter.startTime!);
    }

    if (filter?.endTime) {
      filteredMetrics = filteredMetrics.filter(metric => metric.timestamp <= filter.endTime!);
    }

    return filteredMetrics;
  }

  // 取得統計資訊
  getStatistics(metricName: string): {
    count: number;
    average: number;
    min: number;
    max: number;
    p95: number;
    p99: number;
  } | null {
    const metrics = this.getMetrics({ name: metricName });

    if (metrics.length === 0) {
      return null;
    }

    const durations = metrics.map(m => m.duration).sort((a, b) => a - b);

    return {
      count: durations.length,
      average: durations.reduce((sum, duration) => sum + duration, 0) / durations.length,
      min: durations[0],
      max: durations[durations.length - 1],
      p95: this.calculatePercentile(durations, 95),
      p99: this.calculatePercentile(durations, 99)
    };
  }

  // 計算百分位數
  private calculatePercentile(sortedValues: number[], percentile: number): number {
    const index = Math.ceil((percentile / 100) * sortedValues.length) - 1;
    return sortedValues[Math.max(0, Math.min(index, sortedValues.length - 1))];
  }

  // 取得記憶體使用狀況
  getMemoryUsage(): {
    used: number;
    total: number;
    percentage: number;
  } | null {
    if (typeof process !== 'undefined' && (process as any).memoryUsage) {
      const memoryUsage = (process as any).memoryUsage();
      const total = memoryUsage.heapTotal || 0;
      const used = memoryUsage.heapUsed || 0;
      const percentage = total > 0 ? (used / total) * 100 : 0;

      return {
        used: Math.round(used / 1024 / 1024), // MB
        total: Math.round(total / 1024 / 1024), // MB
        percentage: Math.round(percentage * 100) / 100
      };
    }

    return null;
  }

  // 取得 CPU 使用率（簡化版本）
  async getCPUUsage(): Promise<number | null> {
    try {
      const startUsage = process.cpuUsage();

      // 等待一小段時間
      await new Promise(resolve => setTimeout(resolve, 100));

      const endUsage = process.cpuUsage(startUsage);
      // user + system microseconds over sample interval
      const MICROSECONDS_IN_ONE_SECOND = 1_000_000; // microseconds in one second
      const elapsedSeconds = 0.1; // sample duration in seconds (100ms)
      const usagePercentage = ((endUsage.user + endUsage.system) / MICROSECONDS_IN_ONE_SECOND) / elapsedSeconds * 100;

      return Math.min(100, Math.max(0, usagePercentage));
    } catch (error) {
      logger.error('PerformanceMonitor', 'Failed to get CPU usage', error as Error);
      return null;
    }
  }

  // 清理舊的指標
  cleanup(olderThanDays: number = 7): void {
    const cutoffDate = new Date();
    cutoffDate.setDate(cutoffDate.getDate() - olderThanDays);

    this.metrics = this.metrics.filter(metric => new Date(metric.timestamp) > cutoffDate);

    logger.info('PerformanceMonitor', `Cleaned up metrics older than ${olderThanDays} days`);
  }

  // 更新配置
  updateConfig(newConfig: Partial<PerformanceConfig>): void {
    this.config = { ...this.config, ...newConfig };
    logger.info('PerformanceMonitor', 'Configuration updated');
  }

  // 取得所有指標
  getAllMetrics(): PerformanceMetric[] {
    return [...this.metrics];
  }

  // 清空所有指標
  clearMetrics(): void {
    this.metrics = [];
    logger.info('PerformanceMonitor', 'All metrics cleared');
  }
}

// 建立全局效能監控實例
export const performanceMonitor = new PerformanceMonitor({
  enableConsoleLogging: true,
  enableMetricsCollection: true,
  enableAlerting: true
});

// 裝飾器：方法效能監控
export function monitorPerformance(name?: string, tags?: string[]) {
  return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    const originalMethod = descriptor.value;

    descriptor.value = async function (...args: any[]) {
      const metricName = name || `${target.constructor.name}.${propertyKey}`;
      const timerId = performanceMonitor.startTimer(metricName, tags);

      try {
        const result = await originalMethod.apply(this, args);
        performanceMonitor.endTimer(timerId);
        return result;
      } catch (error) {
        performanceMonitor.endTimer(timerId, { error: true });
        throw error;
      }
    };

    return descriptor;
  };
}

// 裝飾器：類別效能監控
export function monitorClassPerformance() {
  return function <T extends new (...args: any[]) => any>(constructor: T) {
    return class extends constructor {
      constructor(...args: any[]) {
        super(...args);

        // 監控類別的所有方法
        const prototype = constructor.prototype;
        const propertyNames = Object.getOwnPropertyNames(prototype).filter(
          name => name !== 'constructor' && typeof prototype[name] === 'function'
        );

        propertyNames.forEach(propertyName => {
          const originalMethod = prototype[propertyName];
          if (typeof originalMethod === 'function') {
            prototype[propertyName] = async function (...args: any[]) {
              const timerId = performanceMonitor.startTimer(`${constructor.name}.${propertyName}`);
              try {
                const result = await originalMethod.apply(this, args);
                performanceMonitor.endTimer(timerId);
                return result;
              } catch (error) {
                performanceMonitor.endTimer(timerId, { error: true });
                throw error;
              }
            };
          }
        });
      }
    } as any;
  };
}

// 快捷方法
export const startTimer = (name: string, tags?: string[], metadata?: Record<string, any>) =>
  performanceMonitor.startTimer(name, tags, metadata);

export const endTimer = (timerId: string, metadata?: Record<string, any>) =>
  performanceMonitor.endTimer(timerId, metadata);

export const recordMetric = (metric: PerformanceMetric) =>
  performanceMonitor.recordMetric(metric);
