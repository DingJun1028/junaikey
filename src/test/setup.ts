/**
 * JunAiKey 測試環境設定
 * 提供全域的測試設定和清理功能
 */

import { logger } from '../utils/logger';
import { errorMonitor } from '../utils/errorHandler';
import { performanceMonitor } from '../utils/performanceMonitor';

// 設定測試環境變數
process.env.NODE_ENV = 'test';
process.env.LOG_LEVEL = 'error';

// 測試計數器
let testCount = 0;
let failedTests = 0;

// 清理函數
export function cleanup(): void {
  // 清理日誌
  logger.clearLogs();
  
  // 清理效能指標
  performanceMonitor.clearMetrics();
  
  // 重置錯誤監控
  errorMonitor.initialize();
}

// 測試前設定
beforeAll(() => {
  logger.info('TestSetup', 'Starting test environment setup');
  
  // 建立測試用的日誌配置
  logger.updateConfig({
    level: 3, // 只記錄 ERROR 級別
    enableConsole: false,
    enableFile: false
  });
});

// 每個測試前設定
beforeEach(() => {
  testCount++;
  logger.info('TestSetup', `Starting test #${testCount}`);
  
  // 清理之前的測試狀態
  cleanup();
});

// 每個測試後清理
afterEach(() => {
  logger.info('TestSetup', `Completed test #${testCount}`);
  
  // 檢查是否有未捕獲的錯誤
  const logs = logger.getLogs(3); // 只檢查 ERROR 級別
  if (logs.length > 0) {
    failedTests++;
    logger.error('TestSetup', `Test #${testCount} had errors`, undefined, { errorCount: logs.length });
  }
});

// 所有測試完成後
afterAll(() => {
  logger.info('TestSetup', 'All tests completed');
  logger.info('TestSetup', `Summary: ${testCount} tests run, ${failedTests} tests failed`);
  
  // 輸出效能統計
  const performanceStats = performanceMonitor.getStatistics('test_duration');
  if (performanceStats) {
    logger.info('TestSetup', 'Performance statistics:', performanceStats);
  }
  
  // 如果有測試失敗，退出碼為 1
  if (failedTests > 0) {
    console.log(`\n🚨 Test Summary: ${testCount} tests run, ${failedTests} tests failed`);
    // 不直接退出，讓 Jest 處理退出碼
  }
});

// 全局測試工具
export const testUtils = {
  // 延遲函數
  delay: (ms: number): Promise<void> => new Promise(resolve => setTimeout(resolve, ms)),
  
  // 生成測試資料
  generateTestData: (length: number = 10): string => {
    return Math.random().toString(36).substring(2, length + 2);
  },
  
  // 模擬錯誤
  createError: (type: string, message: string): Error => {
    const error = new Error(message);
    (error as any).type = type;
    return error;
  },
  
  // 驗證物件結構
  validateObjectStructure: (obj: any, expectedStructure: any): boolean => {
    if (typeof obj !== 'object' || obj === null) return false;
    if (typeof expectedStructure !== 'object' || expectedStructure === null) return false;
    
    for (const key in expectedStructure) {
      if (!(key in obj)) return false;
      if (typeof expectedStructure[key] === 'object' && expectedStructure[key] !== null) {
        if (!testUtils.validateObjectStructure(obj[key], expectedStructure[key])) {
          return false;
        }
      }
    }
    
    return true;
  },
  
  // 檢查陣列包含
  arrayContains: (array: any[], item: any): boolean => {
    return array.some(element => {
      if (typeof element === 'object' && element !== null && typeof item === 'object' && item !== null) {
        return JSON.stringify(element) === JSON.stringify(item);
      }
      return element === item;
    });
  }
};

// 匯出測試設定
export default {
  cleanup,
  testUtils,
  testCount,
  failedTests
};
