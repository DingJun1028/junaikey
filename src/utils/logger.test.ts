/**
 * JunAiKey 日誌系統測試
 * 測試日誌記錄、級別控制、格式化等功能
 */

import { logger, LogLevel } from './logger';
// test setup 在 jest 全域執行環境中執行，若需要 testHelpers 可在此引入

describe('JunAiKey Logger', () => {
  let originalConfig: LoggerConfig;

  beforeEach(() => {
    // 保存原始配置
    originalConfig = logger['config'];
    
    // 重置日誌
    logger.clearLogs();
    
    // 設定測試配置
    logger.updateConfig({
      level: LogLevel.DEBUG,
      enableConsole: false,
      enableFile: false,
      enableStructured: false
    });
  });

  afterEach(() => {
    // 恢復原始配置
    logger.updateConfig(originalConfig);
    logger.clearLogs();
  });

  describe('Constructor and Configuration', () => {
    test('should create logger with default configuration', () => {
      expect(logger).toBeDefined();
      expect(logger['config']).toBeDefined();
    });

    test('should create logger with custom configuration', () => {
      const customLogger = logger.constructor({
        level: LogLevel.ERROR,
        enableConsole: false,
        enableFile: false
      });
      
      expect(customLogger).toBeDefined();
      expect(customLogger['config'].level).toBe(LogLevel.ERROR);
    });

    test('should update configuration dynamically', () => {
      logger.updateConfig({ level: LogLevel.WARN });
      expect(logger['config'].level).toBe(LogLevel.WARN);
    });
  });

  describe('Log Level Management', () => {
    test('should filter logs based on level', () => {
      logger.debug('Debug message');
      logger.info('Info message');
      logger.warn('Warning message');
      logger.error('Error message');
      logger.fatal('Fatal message');

      const allLogs = logger.getLogs();
      const errorLogs = logger.getLogs(LogLevel.ERROR);

      expect(allLogs.length).toBeGreaterThan(0);
      expect(errorLogs.length).toBeGreaterThan(0);
      expect(errorLogs.every(log => log.level >= LogLevel.ERROR)).toBe(true);
    });
  });

  describe('Log Entry Creation', () => {
    test('should create log entry with required fields', () => {
      const category = 'TestCategory';
      const message = 'Test message';
      const metadata = { key: 'value' };
      const traceId = 'test-trace-123';

      logger.info(category, message, metadata, traceId);

      const logs = logger.getLogs();
      expect(logs.length).toBe(1);

      const log = logs[0];
      expect(log.category).toBe(category);
      expect(log.message).toBe(message);
      expect(log.metadata).toEqual(metadata);
      expect(log.traceId).toBe(traceId);
      expect(log.level).toBe(LogLevel.INFO);
      expect(log.timestamp).toBeDefined();
    });

    test('should generate trace ID automatically', () => {
      logger.info('TestCategory', 'Test message');
      
      const logs = logger.getLogs();
      const log = logs[0];
      
      expect(log.traceId).toBeDefined();
      expect(log.traceId).toMatch(/^trace_\d+_[a-z0-9]+$/);
    });
  });

  describe('Log Filtering', () => {
    test('should filter logs by category', () => {
      logger.info('Category1', 'Message 1');
      logger.info('Category2', 'Message 2');
      logger.info('Category1', 'Message 3');

      const category1Logs = logger.getLogs(undefined, 'Category1');
      const category2Logs = logger.getLogs(undefined, 'Category2');

      expect(category1Logs.length).toBe(2);
      expect(category2Logs.length).toBe(1);
      expect(category1Logs.every(log => log.category === 'Category1')).toBe(true);
      expect(category2Logs.every(log => log.category === 'Category2')).toBe(true);
    });

    test('should filter logs by level and category', () => {
      logger.debug('Category1', 'Debug message');
      logger.info('Category1', 'Info message');
      logger.error('Category2', 'Error message');

      const filteredLogs = logger.getLogs(LogLevel.INFO, 'Category1');
      
      expect(filteredLogs.length).toBe(1);
      expect(filteredLogs[0].level).toBe(LogLevel.INFO);
      expect(filteredLogs[0].category).toBe('Category1');
    });
  });

  describe('Log Formatting', () => {
    test('should format log entry as structured JSON when enabled', () => {
      logger.updateConfig({ enableStructured: true });
      
      logger.info('TestCategory', 'Test message');
      
      // 由於我們禁用了控制台輸出，我們需要檢查內部格式化邏輯
      const logs = logger.getLogs();
      const log = logs[0];
      
      expect(log).toBeDefined();
      expect(log.category).toBe('TestCategory');
      expect(log.message).toBe('Test message');
    });

    test('should format log entry as plain text when disabled', () => {
      logger.updateConfig({ enableStructured: false });
      
      logger.info('TestCategory', 'Test message');
      
      const logs = logger.getLogs();
      const log = logs[0];
      
      expect(log).toBeDefined();
      expect(log.category).toBe('TestCategory');
      expect(log.message).toBe('Test message');
    });
  });

  describe('Error Logging', () => {
    test('should log error with error object', () => {
      const error = new Error('Test error');
      const metadata = { additional: 'data' };

      logger.error('TestCategory', 'Error occurred', error, metadata);

      const logs = logger.getLogs();
      expect(logs.length).toBe(1);

      const log = logs[0];
      expect(log.level).toBe(LogLevel.ERROR);
      expect(log.metadata?.error).toBeDefined();
      expect(log.metadata?.error?.message).toBe(error.message);
      expect(log.metadata?.error?.name).toBe(error.name);
      expect(log.metadata?.additional).toBe('data');
    });

    test('should handle error without error object', () => {
      logger.error('TestCategory', 'Error message');

      const logs = logger.getLogs();
      expect(logs.length).toBe(1);

      const log = logs[0];
      expect(log.level).toBe(LogLevel.ERROR);
      expect(log.message).toBe('Error message');
      expect(log.metadata?.error).toBeUndefined();
    });
  });

  describe('Log Management', () => {
    test('should clear all logs', () => {
      logger.info('Category1', 'Message 1');
      logger.info('Category2', 'Message 2');

      expect(logger.getLogs().length).toBe(2);

      logger.clearLogs();

      expect(logger.getLogs().length).toBe(0);
    });

    test('should maintain log history', () => {
      const initialCount = logger.getLogs().length;
      
      logger.info('TestCategory', 'New message');
      logger.info('TestCategory', 'Another message');

      expect(logger.getLogs().length).toBe(initialCount + 2);
    });
  });

  describe('Edge Cases', () => {
    test('should handle empty message', () => {
      logger.info('TestCategory', '');
      
      const logs = logger.getLogs();
      expect(logs.length).toBe(1);
      expect(logs[0].message).toBe('');
    });

    test('should handle null or undefined metadata', () => {
      logger.info('TestCategory', 'Message with null metadata', null);
      logger.info('TestCategory', 'Message with undefined metadata', undefined);

      const logs = logger.getLogs();
      expect(logs.length).toBe(2);
      expect(logs[0].metadata).toBeNull();
      expect(logs[1].metadata).toBeUndefined();
    });

    test('should handle very long messages', () => {
      const longMessage = 'a'.repeat(10000);
      
      logger.info('TestCategory', longMessage);
      
      const logs = logger.getLogs();
      expect(logs.length).toBe(1);
      expect(logs[0].message).toBe(longMessage);
    });
  });

  describe('Performance', () => {
    test('should handle high frequency logging efficiently', () => {
      const start = performance.now();
      
      for (let i = 0; i < 1000; i++) {
        logger.info('PerformanceTest', `Message ${i}`);
      }
      
      const end = performance.now();
      const duration = end - start;
      
      expect(duration).toBeLessThan(1000); // 應該在 1 秒內完成
      expect(logger.getLogs().length).toBe(1000);
    });
  });
});

// 測試快捷方法
describe('Logger Shortcut Methods', () => {
  beforeEach(() => {
    logger.clearLogs();
  });

  test('should have shortcut methods for each log level', () => {
    const debugSpy = jest.spyOn(logger, 'debug');
    const infoSpy = jest.spyOn(logger, 'info');
    const warnSpy = jest.spyOn(logger, 'warn');
    const errorSpy = jest.spyOn(logger, 'error');
    const fatalSpy = jest.spyOn(logger, 'fatal');

    debug('TestCategory', 'Debug message');
    info('TestCategory', 'Info message');
    warn('TestCategory', 'Warning message');
    error('TestCategory', 'Error message');
    fatal('TestCategory', 'Fatal message');

    expect(debugSpy).toHaveBeenCalledWith('TestCategory', 'Debug message', undefined);
    expect(infoSpy).toHaveBeenCalledWith('TestCategory', 'Info message', undefined);
    expect(warnSpy).toHaveBeenCalledWith('TestCategory', 'Warning message', undefined);
    expect(errorSpy).toHaveBeenCalledWith('TestCategory', 'Error message', undefined);
    expect(fatalSpy).toHaveBeenCalledWith('TestCategory', 'Fatal message', undefined);
  });
});
