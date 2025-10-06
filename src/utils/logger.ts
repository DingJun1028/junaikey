/**
 * JunAiKey 日誌記錄系統
 * 提供結構化日誌記錄功能，支援不同級別的日誌輸出
 */

export enum LogLevel {
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
  metadata?: Record<string, any>;
  traceId?: string;
}

export interface LoggerConfig {
  level: LogLevel;
  enableConsole: boolean;
  enableFile: boolean;
  filePath?: string;
  enableStructured: boolean;
}

class JunAiKeyLogger {
  private config: LoggerConfig;
  private logs: LogEntry[] = [];

  constructor(config: Partial<LoggerConfig> = {}) {
    this.config = {
      level: LogLevel.INFO,
      enableConsole: true,
      enableFile: false,
      enableStructured: true,
      ...config
    };
  }

  private createLogEntry(
    level: LogLevel,
    category: string,
    message: string,
    metadata?: Record<string, any>,
    traceId?: string
  ): LogEntry {
    return {
      timestamp: new Date().toISOString(),
      level,
      category,
      message,
      metadata,
      traceId: traceId || this.generateTraceId()
    };
  }

  private generateTraceId(): string {
    return `trace_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }

  private formatLogEntry(entry: LogEntry): string {
    if (this.config.enableStructured) {
      return JSON.stringify(entry);
    }

    const levelName = LogLevel[entry.level];
    const metadataStr = entry.metadata ? ` | ${JSON.stringify(entry.metadata)}` : '';
    return `[${entry.timestamp}] [${levelName}] [${entry.category}] ${entry.message}${metadataStr}`;
  }

  private logEntry(entry: LogEntry): void {
    // 檢查日誌級別
    if (entry.level < this.config.level) {
      return;
    }

    // 儲存日誌
    this.logs.push(entry);

    // 控制台輸出
    if (this.config.enableConsole) {
      const formatted = this.formatLogEntry(entry);
      
      switch (entry.level) {
        case LogLevel.DEBUG:
          console.debug(formatted);
          break;
        case LogLevel.INFO:
          console.info(formatted);
          break;
        case LogLevel.WARN:
          console.warn(formatted);
          break;
        case LogLevel.ERROR:
        case LogLevel.FATAL:
          console.error(formatted);
          break;
        default:
          console.log(formatted);
      }
    }

    // 檔案輸出（可擴展）
    if (this.config.enableFile && this.config.filePath) {
      // TODO: 實作檔案輸出
    }
  }

  debug(category: string, message: string, metadata?: Record<string, any>, traceId?: string): void {
    const entry = this.createLogEntry(LogLevel.DEBUG, category, message, metadata, traceId);
    this.logEntry(entry);
  }

  info(category: string, message: string, metadata?: Record<string, any>, traceId?: string): void {
    const entry = this.createLogEntry(LogLevel.INFO, category, message, metadata, traceId);
    this.logEntry(entry);
  }

  warn(category: string, message: string, metadata?: Record<string, any>, traceId?: string): void {
    const entry = this.createLogEntry(LogLevel.WARN, category, message, metadata, traceId);
    this.logEntry(entry);
  }

  error(category: string, message: string, error?: Error, metadata?: Record<string, any>, traceId?: string): void {
    const entry = this.createLogEntry(LogLevel.ERROR, category, message, {
      ...metadata,
      error: error ? {
        message: error.message,
        stack: error.stack,
        name: error.name
      } : undefined
    }, traceId);
    this.logEntry(entry);
  }

  fatal(category: string, message: string, error?: Error, metadata?: Record<string, any>, traceId?: string): void {
    const entry = this.createLogEntry(LogLevel.FATAL, category, message, {
      ...metadata,
      error: error ? {
        message: error.message,
        stack: error.stack,
        name: error.name
      } : undefined
    }, traceId);
    this.logEntry(entry);
  }

  getLogs(level?: LogLevel, category?: string): LogEntry[] {
    let filteredLogs = [...this.logs];

    if (level !== undefined) {
      filteredLogs = filteredLogs.filter(log => log.level >= level);
    }

    if (category) {
      filteredLogs = filteredLogs.filter(log => log.category === category);
    }

    return filteredLogs;
  }

  clearLogs(): void {
    this.logs = [];
  }

  updateConfig(newConfig: Partial<LoggerConfig>): void {
    this.config = { ...this.config, ...newConfig };
  }
}

// 建立全域日誌實例
export const logger = new JunAiKeyLogger({
  level: LogLevel.DEBUG,
  enableConsole: true,
  enableFile: false
});

// 快捷方法
export const debug = (category: string, message: string, metadata?: Record<string, any>) => 
  logger.debug(category, message, metadata);

export const info = (category: string, message: string, metadata?: Record<string, any>) => 
  logger.info(category, message, metadata);

export const warn = (category: string, message: string, metadata?: Record<string, any>) => 
  logger.warn(category, message, metadata);

export const error = (category: string, message: string, error?: Error, metadata?: Record<string, any>) => 
  logger.error(category, message, error, metadata);

export const fatal = (category: string, message: string, error?: Error, metadata?: Record<string, any>) => 
  logger.fatal(category, message, error, metadata);
