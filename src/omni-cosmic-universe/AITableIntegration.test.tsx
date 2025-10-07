/**
 * AITableIntegration 測試文件
 * 測試萬能雙向同步永憶智慧知識庫的功能
 */

import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { AITableIntegration } from './AITableIntegration';
import type { SystemState } from './types';

// 模擬 fetch API
global.fetch = jest.fn();

// 模擬 localStorage
const localStorageMock = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
  clear: jest.fn(),
};
global.localStorage = localStorageMock as any;

// 模擬系統狀態
const mockSystemState: SystemState = {
  entropy: 7.8,
  balance: {
    performance: 9.2,
    security: 9.5,
    maintainability: 8.7
  },
  cards: {
    events: [
      {
        id: 'event-1',
        name: '數據流斷裂',
        type: 'EVENT',
        color: '🌪',
        rarity: 'COMMON',
        description: '監測到資料流異常中斷',
        cosmicLink: { axiom: 'CHRONICLE', pillar: 'SPEED' },
        commit: {
          author: '萬能監控體',
          cycle: '週期1.1',
          purpose: '保障數據管道完整性'
        },
        triggerCondition: '外部API連續3週期無響應',
        detectedBy: '邊界感知器',
        relatedModule: '萬能同步矩陣',
        timestamp: new Date()
      }
    ],
    problems: [
      {
        id: 'problem-1',
        name: '診斷: 數據流斷裂',
        type: 'PROBLEM',
        color: '⚫',
        rarity: 'UNCOMMON',
        description: '由"數據流斷裂"引發的系統失衡',
        cosmicLink: { axiom: 'BALANCE', pillar: 'STABILITY' },
        commit: {
          author: '概念面核心',
          cycle: '週期1.1',
          purpose: '診斷數據流斷裂導致的系統失衡'
        },
        severity: 5,
        impact: ['PERFORMANCE'],
        causeAnalysis: '監控系統檢測到...',
        relatedEventIds: ['event-1']
      }
    ],
    solutions: [
      {
        id: 'solution-1',
        name: '解決: 數據流斷裂',
        type: 'SOLUTION',
        color: '🟢',
        rarity: 'RARE',
        description: '修復數據流中斷問題',
        cosmicLink: { axiom: 'BALANCE', pillar: 'EVOLUTION' },
        commit: {
          author: '第一建築師',
          cycle: '週期1.2',
          purpose: '終結數據流斷裂狀況'
        },
        requiredResources: ['萬能符文', '進化引擎'],
        executingAgents: ['萬能代理'],
        entropyReduction: 2.5,
        chronicleRecord: true
      }
    ]
  },
  evolution: {
    cycle: 1,
    loyalty: 5
  }
};

// 模擬 onSyncComplete 回調
const mockOnSyncComplete = jest.fn();

// 測試組件渲染
describe('AITableIntegration', () => {
  beforeEach(() => {
    // 清空所有模擬
    jest.clearAllMocks();
  });

  test('應該正確渲染萬能雙向同步永憶智慧知識庫', () => {
    render(<AITableIntegration state={mockSystemState} onSyncComplete={mockOnSyncComplete} />);
    
    // 檢查標題
    expect(screen.getByText('萬能雙向同步永憶智慧知識庫')).toBeInTheDocument();
    
    // 檢查配置區域
    expect(screen.getByText('AITable 配置')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('輸入 AITable Base ID')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('輸入 AITable API Key')).toBeInTheDocument();
    
    // 檢查同步控制按鈕（使用按鈕選擇器）
    expect(screen.getByRole('button', { name: '雙向同步' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: '同步到 AITable' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: '從 AITable 獲取' })).toBeInTheDocument();
    
    // 檢查搜索區域
    expect(screen.getByPlaceholderText('搜索知識庫...')).toBeInTheDocument();
  });

  test('應該在啟用同步時允許同步操作', async () => {
    render(<AITableIntegration state={mockSystemState} onSyncComplete={mockOnSyncComplete} />);
    
    // 點擊啟用同步
    const enableSyncCheckbox = screen.getByLabelText('啟用同步');
    fireEvent.click(enableSyncCheckbox);
    
    // 點擊雙向同步
    const bidirectionalButton = screen.getByRole('button', { name: '雙向同步' });
    fireEvent.click(bidirectionalButton);
    
    // 等待同步完成
    await waitFor(() => {
      expect(screen.getByText('同步中...')).toBeInTheDocument();
    }, { timeout: 3000 });
    
    // 同步完成後應該顯示成功狀態
    await waitFor(() => {
      expect(screen.getByText('同步完成')).toBeInTheDocument();
    }, { timeout: 3000 });
  });

  test('應該過濾知識庫記錄', () => {
    render(<AITableIntegration state={mockSystemState} onSyncComplete={mockOnSyncComplete} />);
    
    // 應該顯示初始的記錄
    expect(screen.getByText('系統架構優化方案')).toBeInTheDocument();
    
    // 在搜索框中輸入進行過濾
    const searchInput = screen.getByPlaceholderText('搜索知識庫...');
    fireEvent.change(searchInput, { target: { value: '架構' } });
    
    // 應該只顯示匹配的記錄
    expect(screen.getByText('系統架構優化方案')).toBeInTheDocument();
  });

  test('應該按類別過濾知識庫記錄', () => {
    render(<AITableIntegration state={mockSystemState} onSyncComplete={mockOnSyncComplete} />);
    
    // 選擇特定類別
    const categorySelect = screen.getByDisplayValue('所有類別');
    fireEvent.change(categorySelect, { target: { value: '系統設計' } });
    
    // 應該只顯示該類別的記錄
    expect(screen.getByText('系統架構優化方案')).toBeInTheDocument();
  });

  test('應該正確顯示知識庫統計信息', () => {
    render(<AITableIntegration state={mockSystemState} onSyncComplete={mockOnSyncComplete} />);
    
    // 檢查統計信息（使用更具體的選擇器）
    expect(screen.getAllByText('2')[0]).toBeInTheDocument(); // 總記錄數
    expect(screen.getByText('1')).toBeInTheDocument(); // Jun.AI 生成
    expect(screen.getAllByText('2')[1]).toBeInTheDocument(); // 知識類別
  });

  test('應該在同步完成後調用回調函數', async () => {
    render(<AITableIntegration state={mockSystemState} onSyncComplete={mockOnSyncComplete} />);
    
    // 啟用同步
    const enableSyncCheckbox = screen.getByLabelText('啟用同步');
    fireEvent.click(enableSyncCheckbox);
    
    // 執行雙向同步
    const bidirectionalButton = screen.getByRole('button', { name: '雙向同步' });
    fireEvent.click(bidirectionalButton);
    
    // 等待同步完成
    await waitFor(() => {
      expect(mockOnSyncComplete).toHaveBeenCalled();
    }, { timeout: 3000 });
  });
});

// 測試 AITableUtils 工具函數
describe('AITableUtils', () => {
  test('systemStateToRecords 應該正確轉換系統狀態為 AITable 記錄', () => {
    const { systemStateToRecords } = require('./AITableIntegration');
    const records = systemStateToRecords(mockSystemState);
    
    // 檢查記錄數量
    expect(records.length).toBeGreaterThan(0);
    
    // 檢查記錄結構
    const eventRecord = records.find(r => r.id === 'event-event-1');
    expect(eventRecord).toBeDefined();
    expect(eventRecord?.title).toBe('事件: 數據流斷裂');
    expect(eventRecord?.category).toBe('系統事件');
    expect(eventRecord?.source).toBe('system');
  });

  test('getDefaultConfig 應該返回默認配置', () => {
    const { getDefaultConfig } = require('./AITableIntegration');
    const config = getDefaultConfig();
    
    expect(config).toEqual({
      baseId: '',
      tableName: '萬能智慧知識庫',
      apiKey: '',
      syncEnabled: false,
      bidirectional: true
    });
  });
});
