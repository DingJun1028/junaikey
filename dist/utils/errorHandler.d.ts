/**
 * JunAiKey 錯誤處理系統
 * 提供全局錯誤監控、報告和處理功能
 */
export declare enum ErrorType {
    VALIDATION = "VALIDATION",
    AUTHENTICATION = "AUTHENTICATION",
    AUTHORIZATION = "AUTHORIZATION",
    NOT_FOUND = "NOT_FOUND",
    RATE_LIMIT = "RATE_LIMIT",
    EXTERNAL_SERVICE = "EXTERNAL_SERVICE",
    INTERNAL = "INTERNAL",
    NETWORK = "NETWORK",
    TIMEOUT = "TIMEOUT",
    UNKNOWN = "UNKNOWN",
    FATAL = "FATAL"
}
export interface ErrorContext {
    userId?: string;
    sessionId?: string;
    requestId?: string;
    action?: string;
    resource?: string;
    timestamp: string;
    traceId?: string;
    [key: string]: any;
}
export interface IJunAiKeyError extends Error {
    type: ErrorType;
    code: string;
    statusCode?: number;
    context?: ErrorContext;
    retryable?: boolean;
    details?: Record<string, any>;
}
export declare class JunAiKeyError extends Error implements IJunAiKeyError {
    type: ErrorType;
    code: string;
    statusCode?: number;
    context?: ErrorContext;
    retryable?: boolean;
    details?: Record<string, any>;
    constructor(type: ErrorType, code: string, message: string, statusCode?: number, context?: ErrorContext, retryable?: boolean, details?: Record<string, any>);
}
export declare class ErrorMonitor {
    private errorCallbacks;
    onError(callback: (error: JunAiKeyError) => void): void;
    private notifyError;
    reportError(error: Error | JunAiKeyError, type?: ErrorType, code?: string, context?: Partial<ErrorContext>, details?: Record<string, any>): JunAiKeyError;
    createError(type: ErrorType, code: string, message: string, statusCode?: number, context?: Partial<ErrorContext>, retryable?: boolean, details?: Record<string, any>): JunAiKeyError;
    handleUncaughtException(error: Error): void;
    handleUnhandledRejection(reason: any): void;
    initialize(): void;
}
export declare const errorMonitor: ErrorMonitor;
export declare const reportError: (error: Error | JunAiKeyError, type?: ErrorType, code?: string, context?: Partial<ErrorContext>, details?: Record<string, any>) => JunAiKeyError;
export declare const createError: (type: ErrorType, code: string, message: string, statusCode?: number, context?: Partial<ErrorContext>, retryable?: boolean, details?: Record<string, any>) => JunAiKeyError;
export declare const Errors: {
    ValidationError: (message: string, field?: string) => JunAiKeyError;
    AuthenticationError: (message?: string) => JunAiKeyError;
    AuthorizationError: (message?: string) => JunAiKeyError;
    NotFoundError: (resource: string, id?: string) => JunAiKeyError;
    RateLimitError: (message?: string, retryAfter?: number) => JunAiKeyError;
    ExternalServiceError: (service: string, message: string, retryable?: boolean) => JunAiKeyError;
    InternalError: (message: string, details?: Record<string, any>) => JunAiKeyError;
    NetworkError: (message: string, retryable?: boolean) => JunAiKeyError;
    TimeoutError: (operation: string) => JunAiKeyError;
    UnknownError: (message: string) => JunAiKeyError;
};
//# sourceMappingURL=errorHandler.d.ts.map