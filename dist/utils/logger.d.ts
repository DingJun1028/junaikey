/**
 * JunAiKey 日誌記錄系統
 * 提供結構化日誌記錄功能，支援不同級別的日誌輸出
 */
export declare enum LogLevel {
    DEBUG = 0,
    INFO = 1,
    WARN = 2,
    ERROR = 3,
    FATAL = 4
}
export interface LogEntry {
    timestamp: string;
    level: LogLevel;
    category: string;
    message: string;
    metadata?: Record<string, any> | null;
    traceId?: string;
}
export interface LoggerConfig {
    level: LogLevel;
    enableConsole: boolean;
    enableFile: boolean;
    filePath?: string;
    enableStructured: boolean;
}
declare class JunAiKeyLogger {
    private config;
    private logs;
    constructor(config?: Partial<LoggerConfig>);
    private createLogEntry;
    private generateTraceId;
    private formatLogEntry;
    private logEntry;
    debug(...args: any[]): void;
    info(...args: any[]): void;
    warn(...args: any[]): void;
    error(...args: any[]): void;
    fatal(...args: any[]): void;
    getLogs(level?: LogLevel, category?: string): LogEntry[];
    clearLogs(): void;
    updateConfig(newConfig: Partial<LoggerConfig>): void;
}
export declare const logger: JunAiKeyLogger;
export declare const debug: (category: string, message?: string, metadata?: Record<string, any> | null) => void;
export declare const info: (category: string, message?: string, metadata?: Record<string, any> | null) => void;
export declare const warn: (category: string, message?: string, metadata?: Record<string, any> | null) => void;
export declare const error: (category: string, message?: string | Error, metadata?: Record<string, any> | null) => void;
export declare const fatal: (category: string, message?: string | Error, metadata?: Record<string, any> | null) => void;
declare global {
    function debug(category: string, message?: string, metadata?: Record<string, any> | null): void;
    function info(category: string, message?: string, metadata?: Record<string, any> | null): void;
    function warn(category: string, message?: string, metadata?: Record<string, any> | null): void;
    function error(category: string, message?: string | Error, metadata?: Record<string, any> | null): void;
    function fatal(category: string, message?: string | Error, metadata?: Record<string, any> | null): void;
}
export {};
//# sourceMappingURL=logger.d.ts.map