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
    metadata?: Record<string, any> | null,
    traceId?: string
  ): LogEntry {
    return {
      timestamp: new Date().toISOString(),
      level,
      category,
      message,
      metadata: metadata === undefined ? undefined : metadata,
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

  // 使用寬鬆的 any[] 參數解析，支援多種呼叫形式
  debug(...args: any[]): void {
    // 支援：debug('message') | debug('category', 'message') | debug('category', 'message', metadata)
    let category = 'General';
    let message = '';
    let metadata: Record<string, any> | null | undefined;
    let traceId: string | undefined;

    if (args.length === 1) {
      message = args[0];
    } else if (args.length >= 2) {
      if (typeof args[1] === 'string') {
        category = args[0];
        message = args[1];
        if (args.length >= 3) {
          if (typeof args[2] === 'string') traceId = args[2];
          else metadata = args[2];
        }
        if (args.length >= 4) traceId = args[3];
      } else {
        message = args[0];
        metadata = args[1];
        if (typeof args[2] === 'string') traceId = args[2];
      }
    }

    const entry = this.createLogEntry(LogLevel.DEBUG, category, message, metadata, traceId);
    this.logEntry(entry);
  }

  info(...args: any[]): void {
    let category = 'General';
    let message = '';
    let metadata: Record<string, any> | null | undefined;
    let traceId: string | undefined;

    if (args.length === 1) {
      message = args[0];
    } else if (args.length >= 2) {
      if (typeof args[1] === 'string') {
        category = args[0];
        message = args[1];
        if (args.length >= 3) {
          if (typeof args[2] === 'string') traceId = args[2];
          else metadata = args[2];
        }
        if (args.length >= 4) traceId = args[3];
      } else {
        message = args[0];
        metadata = args[1];
        if (typeof args[2] === 'string') traceId = args[2];
      }
    }

    const entry = this.createLogEntry(LogLevel.INFO, category, message, metadata, traceId);
    this.logEntry(entry);
  }

  warn(...args: any[]): void {
    let category = 'General';
    let message = '';
    let metadata: Record<string, any> | null | undefined;
    let traceId: string | undefined;

    if (args.length === 1) {
      message = args[0];
    } else if (args.length >= 2) {
      if (typeof args[1] === 'string') {
        category = args[0];
        message = args[1];
        if (args.length >= 3) {
          if (typeof args[2] === 'string') traceId = args[2];
          else metadata = args[2];
        }
        if (args.length >= 4) traceId = args[3];
      } else {
        message = args[0];
        metadata = args[1];
        if (typeof args[2] === 'string') traceId = args[2];
      }
    }

    const entry = this.createLogEntry(LogLevel.WARN, category, message, metadata, traceId);
    this.logEntry(entry);
  }

  error(...args: any[]): void {
    // 支援多種呼叫： (category, message), (category, message, error), (category, message, error, metadata), (message), (message, metadata)
    let category = 'General';
    let message = '';
    let metadata: Record<string, any> | null | undefined;
    let traceId: string | undefined;
    let err: Error | undefined;

    if (args.length === 1) {
      message = args[0];
    } else if (args.length >= 2) {
      category = args[0];
      message = args[1];

      if (args.length === 3) {
        if (args[2] instanceof Error) err = args[2];
        else if (typeof args[2] === 'string') traceId = args[2];
        else metadata = args[2];
      }

      if (args.length >= 4) {
        if (args[2] instanceof Error) {
          err = args[2];
          metadata = args[3];
        } else {
          metadata = args[2];
          if (typeof args[3] === 'string') traceId = args[3];
        }
      }
    }

    const entry = this.createLogEntry(LogLevel.ERROR, category, message, {
      ...metadata,
      error: err ? { message: err.message, stack: err.stack, name: err.name } : undefined
    }, traceId);

    this.logEntry(entry);
  }

  fatal(...args: any[]): void {
    let category = 'General';
    let message = '';
    let metadata: Record<string, any> | null | undefined;
    let traceId: string | undefined;
    let err: Error | undefined;

    if (args.length === 1) {
      message = args[0];
    } else if (args.length >= 2) {
      category = args[0];
      message = args[1];

      if (args.length === 3) {
        if (args[2] instanceof Error) err = args[2];
        else if (typeof args[2] === 'string') traceId = args[2];
        else metadata = args[2];
      }

      if (args.length >= 4) {
        if (args[2] instanceof Error) {
          err = args[2];
          metadata = args[3];
        } else {
          metadata = args[2];
          if (typeof args[3] === 'string') traceId = args[3];
        }
      }
    }

    const entry = this.createLogEntry(LogLevel.FATAL, category, message, {
      ...metadata,
      error: err ? { message: err.message, stack: err.stack, name: err.name } : undefined
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

// Export Logger as an alias for JunAiKeyLogger for compatibility
export { JunAiKeyLogger as Logger };

// 快捷方法
export const debug = (category: string, message?: string, metadata?: Record<string, any> | null) => 
  logger.debug(category, message, metadata);

export const info = (category: string, message?: string, metadata?: Record<string, any> | null) => 
  logger.info(category, message, metadata);

export const warn = (category: string, message?: string, metadata?: Record<string, any> | null) => 
  logger.warn(category, message, metadata);

export const error = (category: string, message?: string | Error, metadata?: Record<string, any> | null) => 
  logger.error(category, typeof message === 'string' ? message : undefined, message instanceof Error ? message : undefined, metadata as any);

export const fatal = (category: string, message?: string | Error, metadata?: Record<string, any> | null) => 
  logger.fatal(category, typeof message === 'string' ? message : undefined, message instanceof Error ? message : undefined, metadata as any);

// 將快捷函式註冊為全域函式，並提供型別宣告以解決測試中未匯入的使用情況
declare global {
  function debug(category: string, message?: string, metadata?: Record<string, any> | null): void;
  function info(category: string, message?: string, metadata?: Record<string, any> | null): void;
  function warn(category: string, message?: string, metadata?: Record<string, any> | null): void;
  function error(category: string, message?: string | Error, metadata?: Record<string, any> | null): void;
  function fatal(category: string, message?: string | Error, metadata?: Record<string, any> | null): void;
}

// 在 runtime 掛載到 globalThis
if (typeof globalThis !== 'undefined') {
  (globalThis as any).debug = debug;
  (globalThis as any).info = info;
  (globalThis as any).warn = warn;
  (globalThis as any).error = error;
  (globalThis as any).fatal = fatal;
}
