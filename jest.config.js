/**
 * JunAiKey Jest 測試配置
 * 提供完整的測試環境配置，包含覆蓋率報告、模擬設定等
 */

module.exports = {
  // 測試環境
  testEnvironment: 'jsdom',
  
  // 測試檔案模式
  testMatch: [
    '**/__tests__/**/*.ts',
    '**/?(*.)+(spec|test).ts',
    '**/*.test.tsx',
    '**/*.spec.tsx'
  ],
  
  // 排除的檔案
  testPathIgnorePatterns: [
    '/node_modules/',
    '/dist/',
    '/coverage/'
  ],
  
  // 模組副檔名
  moduleFileExtensions: [
    'ts',
    'tsx',
    'js',
    'jsx',
    'json',
    'node'
  ],
  
  // 轉譯器設定
  transform: {
    '^.+\\.ts$': 'ts-jest',
    '^.+\\.tsx$': 'ts-jest',
  },
  
  // 轉譯排除
  transformIgnorePatterns: [
    '/node_modules/'
  ],
  
  // 測試覆蓋率設定
  collectCoverage: true,
  collectCoverageFrom: [
    'src/**/*.ts',
    '!src/**/*.d.ts',
    '!src/**/*.test.ts',
    '!src/**/*.spec.ts'
  ],
  coverageDirectory: 'coverage',
  coverageReporters: [
    'text',
    'lcov',
    'html',
    'json-summary'
  ],
  coverageThreshold: {
    global: {
      branches: 80,
      functions: 80,
      lines: 80,
      statements: 80
    }
  },
  
  // 測試設定
  testTimeout: 10000,
  verbose: true,
  forceExit: true,
  
  // 模組名稱對映
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1'
  },
  
  // 設定檔案
  setupFilesAfterEnv: [
    '<rootDir>/src/test/setup.ts'
  ],
  
  // 測試全域變數
  globals: {
    'ts-jest': {
      tsconfig: 'tsconfig.json'
    }
  }
};
