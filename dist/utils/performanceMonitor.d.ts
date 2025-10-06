/**
 * JunAiKey 效能監控系統
 * 提供應用程式效能監控、分析和報告功能
 */
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
    sampleRate: number;
}
export declare class PerformanceMonitor {
    private metrics;
    private activeTimers;
    private config;
    private alertCallbacks;
    constructor(config?: Partial<PerformanceConfig>);
    startTimer(name: string, tags?: string[], metadata?: Record<string, any>): string;
    endTimer(timerId: string, metadata?: Record<string, any>): PerformanceMetric | null;
    recordMetric(metric: PerformanceMetric): void;
    private checkThresholds;
    private triggerAlert;
    onAlert(callback: (metric: PerformanceMetric) => void): void;
    getMetrics(filter?: {
        name?: string;
        tags?: string[];
        startTime?: string;
        endTime?: string;
    }): PerformanceMetric[];
    getStatistics(metricName: string): {
        count: number;
        average: number;
        min: number;
        max: number;
        p95: number;
        p99: number;
    } | null;
    private calculatePercentile;
    getMemoryUsage(): {
        used: number;
        total: number;
        percentage: number;
    } | null;
    getCPUUsage(): Promise<number | null>;
    cleanup(olderThanDays?: number): void;
    updateConfig(newConfig: Partial<PerformanceConfig>): void;
    getAllMetrics(): PerformanceMetric[];
    clearMetrics(): void;
}
export declare const performanceMonitor: PerformanceMonitor;
export declare function monitorPerformance(name?: string, tags?: string[]): (target: any, propertyKey: string, descriptor: PropertyDescriptor) => PropertyDescriptor;
export declare function monitorClassPerformance(): <T extends new (...args: any[]) => any>(constructor: T) => {
    new (...args: any[]): {
        [x: string]: any;
    };
} & T;
export declare const startTimer: (name: string, tags?: string[], metadata?: Record<string, any>) => string;
export declare const endTimer: (timerId: string, metadata?: Record<string, any>) => PerformanceMetric | null;
export declare const recordMetric: (metric: PerformanceMetric) => void;
//# sourceMappingURL=performanceMonitor.d.ts.map