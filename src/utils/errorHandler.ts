/**
 * JunAiKey 錯誤處理系統
 * 提供全局錯誤監控、報告和處理功能
 */

import { logger, LogLevel } from './logger';

export enum ErrorType {
  VALIDATION = 'VALIDATION',
  AUTHENTICATION = 'AUTHENTICATION',
  AUTHORIZATION = 'AUTHORIZATION',
  NOT_FOUND = 'NOT_FOUND',
  RATE_LIMIT = 'RATE_LIMIT',
  EXTERNAL_SERVICE = 'EXTERNAL_SERVICE',
  INTERNAL = 'INTERNAL',
  NETWORK = 'NETWORK',
  TIMEOUT = 'TIMEOUT',
  UNKNOWN = 'UNKNOWN',
  FATAL = 'FATAL'
}

export interface ErrorContext {
  userId?: string;
  sessionId?: string;
  requestId?: string;
  action?: string;
  resource?: string;
  timestamp: string;
  traceId?: string;
  // 允許額外自訂欄位（例如 field, service, operation 等），提高靈活性
  [key: string]: any;
}

// 改為使用 IJunAiKeyError 介面名稱，避免與類別同名衝突
export interface IJunAiKeyError extends Error {
  type: ErrorType;
  code: string;
  statusCode?: number;
  context?: ErrorContext;
  retryable?: boolean;
  details?: Record<string, any>;
}

export class JunAiKeyError extends Error implements IJunAiKeyError {
  // 屬性宣告與介面一致（retryable 保持可選），避免型別/修飾元不一致錯誤
  public type: ErrorType;
  public code: string;
  public statusCode?: number;
  public context?: ErrorContext;
  public retryable?: boolean;
  public details?: Record<string, any>;

  constructor(
    type: ErrorType,
    code: string,
    message: string,
    statusCode?: number,
    context?: ErrorContext,
    retryable = false,
    details?: Record<string, any>
  ) {
    super(message);
    this.name = 'JunAiKeyError';
    this.type = type;
    this.code = code;
    this.statusCode = statusCode;
    this.context = context;
    this.retryable = retryable;
    this.details = details;
    
    // 維持正確的 call stack
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, JunAiKeyError);
    }
  }
}

export class ErrorMonitor {
  private errorCallbacks: Array<(error: JunAiKeyError) => void> = [];

  // 註冊錯誤處理回調
  onError(callback: (error: JunAiKeyError) => void): void {
    this.errorCallbacks.push(callback);
  }

  // 通知所有註冊的回調
  private notifyError(error: JunAiKeyError): void {
    this.errorCallbacks.forEach(callback => {
      try {
        callback(error);
      } catch (callbackError) {
        logger.error('ErrorMonitor', 'Error in error callback', callbackError as Error);
      }
    });
  }

  // 記錄和報告錯誤
  reportError(
    error: Error | JunAiKeyError,
    type: ErrorType = ErrorType.UNKNOWN,
    code: string = 'UNKNOWN_ERROR',
    context?: Partial<ErrorContext>,
    details?: Record<string, any>
  ): JunAiKeyError {
    const junaiError = error instanceof JunAiKeyError 
      ? error 
      : new JunAiKeyError(
          type,
          code,
          error.message,
          undefined,
          {
            timestamp: new Date().toISOString(),
            ...context
          },
          false,
          details
        );

    // 記錄錯誤日誌
    logger.error(
      'ErrorMonitor',
      `Error occurred: ${junaiError.code} - ${junaiError.message}`,
      junaiError,
      {
        type: junaiError.type,
        code: junaiError.code,
        statusCode: junaiError.statusCode,
        retryable: junaiError.retryable,
        context: junaiError.context,
        details: junaiError.details
      }
    );

    // 通知監控系統
    this.notifyError(junaiError);

    return junaiError;
  }

  // 創建特定類型的錯誤
  createError(
    type: ErrorType,
    code: string,
    message: string,
    statusCode?: number,
    context?: Partial<ErrorContext>,
    retryable = false,
    details?: Record<string, any>
  ): JunAiKeyError {
    return new JunAiKeyError(
      type,
      code,
      message,
      statusCode,
      {
        timestamp: new Date().toISOString(),
        ...context
      },
      retryable,
      details
    );
  }

  // 處理未捕獲的異常
  handleUncaughtException(error: Error): void {
    const junaiError = this.reportError(
      error,
      ErrorType.INTERNAL,
      'UNCAUGHT_EXCEPTION',
      undefined,
      { uncaught: true }
    );

    // 根據錯誤類型決定是否退出進程
    if (junaiError.type === ErrorType.FATAL || junaiError.type === ErrorType.INTERNAL) {
      logger.fatal('ErrorMonitor', 'Fatal error occurred, shutting down', junaiError);
      process.exit(1);
    }
  }

  // 處理未處理的 Promise 拒絕
  handleUnhandledRejection(reason: any): void {
    const error = reason instanceof Error ? reason : new Error(String(reason));
    const junaiError = this.reportError(
      error,
      ErrorType.INTERNAL,
      'UNHANDLED_REJECTION',
      undefined,
      { unhandled: true }
    );

    logger.fatal('ErrorMonitor', 'Unhandled promise rejection', junaiError);
    process.exit(1);
  }

  // 初始化全局錯誤處理
  initialize(): void {
    // 處理未捕獲的異常
    process.on('uncaughtException', (error) => {
      this.handleUncaughtException(error);
    });

    // 處理未處理的 Promise 拒絕
    process.on('unhandledRejection', (reason) => {
      this.handleUnhandledRejection(reason);
    });

    logger.info('ErrorMonitor', 'Global error handlers initialized');
  }
}

// 建立全局錯誤監控實例
export const errorMonitor = new ErrorMonitor();

// 快捷方法
export const reportError = (
  error: Error | JunAiKeyError,
  type: ErrorType = ErrorType.UNKNOWN,
  code: string = 'UNKNOWN_ERROR',
  context?: Partial<ErrorContext>,
  details?: Record<string, any>
): JunAiKeyError => errorMonitor.reportError(error, type, code, context, details);

export const createError = (
  type: ErrorType,
  code: string,
  message: string,
  statusCode?: number,
  context?: Partial<ErrorContext>,
  retryable = false,
  details?: Record<string, any>
): JunAiKeyError => errorMonitor.createError(type, code, message, statusCode, context, retryable, details);

// 預定義的錯誤類型
export const Errors = {
  // 驗證錯誤
  ValidationError: (message: string, field?: string) => 
    createError(ErrorType.VALIDATION, 'VALIDATION_ERROR', message, undefined, { field }),

  // 認證錯誤
  AuthenticationError: (message = 'Authentication failed') => 
    createError(ErrorType.AUTHENTICATION, 'AUTHENTICATION_ERROR', message, 401),

  // 授權錯誤
  AuthorizationError: (message = 'Authorization failed') => 
    createError(ErrorType.AUTHORIZATION, 'AUTHORIZATION_ERROR', message, 403),

  // 未找到錯誤
  NotFoundError: (resource: string, id?: string) => 
    createError(ErrorType.NOT_FOUND, 'NOT_FOUND', `${resource} not found`, 404, { resource, id }),

  // 速率限制錯誤
  RateLimitError: (message = 'Rate limit exceeded', retryAfter?: number) => 
    createError(ErrorType.RATE_LIMIT, 'RATE_LIMIT_ERROR', message, 429, undefined, true, { retryAfter }),

  // 外部服務錯誤
  ExternalServiceError: (service: string, message: string, retryable = true) => 
    createError(ErrorType.EXTERNAL_SERVICE, 'EXTERNAL_SERVICE_ERROR', message, 502, { service }, retryable),

  // 內部錯誤
  InternalError: (message: string, details?: Record<string, any>) => 
    createError(ErrorType.INTERNAL, 'INTERNAL_ERROR', message, 500, undefined, false, details),

  // 網絡錯誤
  NetworkError: (message: string, retryable = true) => 
    createError(ErrorType.NETWORK, 'NETWORK_ERROR', message, undefined, undefined, retryable),

  // 超時錯誤
  TimeoutError: (operation: string) => 
    createError(ErrorType.TIMEOUT, 'TIMEOUT_ERROR', `${operation} timed out`, undefined, { operation }, true),

  // 未知錯誤
  UnknownError: (message: string) => 
    createError(ErrorType.UNKNOWN, 'UNKNOWN_ERROR', message)
};

// 自動初始化全局錯誤處理
errorMonitor.initialize();
