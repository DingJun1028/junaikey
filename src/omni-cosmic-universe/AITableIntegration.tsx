/**
 * AITable.ai 雙向同步智慧知識庫整合
 * 實現萬能雙向同步永憶智慧知識庫
 */

import React, { useState, useEffect, useRef } from 'react';
import type { SystemState, AITableRecord, AITableConfig } from './types';

export const AITableIntegration: React.FC<{ 
  state: SystemState; 
  onSyncComplete?: (records: AITableRecord[]) => void 
}> = ({ state, onSyncComplete }) => {
  const [config, setConfig] = useState<AITableConfig>({
    baseId: '',
    tableName: '萬能智慧知識庫',
    apiKey: '',
    syncEnabled: false,
    bidirectional: true
  });
  
  const [records, setRecords] = useState<AITableRecord[]>([]);
  const [isSyncing, setIsSyncing] = useState(false);
  const [syncStatus, setSyncStatus] = useState<'idle' | 'syncing' | 'success' | 'error'>('idle');
  const [lastSyncTime, setLastSyncTime] = useState<Date | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  
  // 模擬 AITable 數據
  const mockRecords: AITableRecord[] = [
    {
      id: 'aitable-1',
      title: '系統架構優化方案',
      content: '基於四大宇宙公理，我們需要優化萬能宇宙儀表板的性能和用戶體驗...',
      category: '系統設計',
      tags: ['架構', '性能', '優化'],
      timestamp: new Date(Date.now() - 86400000),
      source: 'system',
      confidence: 0.95,
      metadata: { importance: 'high', relatedTo: 'cosmic-universe' }
    },
    {
      id: 'aitable-2',
      title: '元素精靈進化路徑',
      content: '鋒靈、森靈等12種元素精靈的進化條件和能力提升方案...',
      category: '元素精靈',
      tags: ['進化', '能力', '覺醒'],
      timestamp: new Date(Date.now() - 172800000),
      source: 'junai',
      confidence: 0.88,
      metadata: { evolutionStage: 'resonance' }
    }
  ];

  // 獲取類別列表
  const categories = ['all', ...Array.from(new Set(mockRecords.map(r => r.category)))];

  // 過濾記錄
  const filteredRecords = records.filter(record => {
    const matchesSearch = searchQuery === '' || 
      record.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      record.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
      record.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    
    const matchesCategory = selectedCategory === 'all' || record.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });

  // 雙向同步函數
  const performBidirectionalSync = async () => {
    setIsSyncing(true);
    setSyncStatus('syncing');
    
    try {
      // 模擬同步到 AITable
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // 模擬從 AITable 獲取數據
      const updatedRecords = [...mockRecords, ...records];
      setRecords(updatedRecords);
      setLastSyncTime(new Date());
      setSyncStatus('success');
      
      // 調用回調函數
      if (onSyncComplete) {
        onSyncComplete(updatedRecords);
      }
      
      // 更新系統狀態
      console.log('萬能雙向同步完成，記錄數量:', updatedRecords.length);
    } catch (error) {
      setSyncStatus('error');
      console.error('同步失敗:', error);
    } finally {
      setIsSyncing(false);
    }
  };

  // 單向同步到 AITable
  const syncToAITable = async () => {
    setIsSyncing(true);
    setSyncStatus('syncing');
    
    try {
      // 模擬將系統數據同步到 AITable
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      setSyncStatus('success');
      setLastSyncTime(new Date());
      
      console.log('同步到 AITable 完成');
    } catch (error) {
      setSyncStatus('error');
      console.error('同步到 AITable 失敗:', error);
    } finally {
      setIsSyncing(false);
    }
  };

  // 從 AITable 獲取數據
  const syncFromAITable = async () => {
    setIsSyncing(true);
    setSyncStatus('syncing');
    
    try {
      // 模擬從 AITable 獲取數據
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      setRecords(mockRecords);
      setLastSyncTime(new Date());
      setSyncStatus('success');
      
      console.log('從 AITable 獲取數據完成');
    } catch (error) {
      setSyncStatus('error');
      console.error('從 AITable 獲取數據失敗:', error);
    } finally {
      setIsSyncing(false);
    }
  };

  // 添加新記錄
  const addNewRecord = (record: Omit<AITableRecord, 'id' | 'timestamp'>) => {
    const newRecord: AITableRecord = {
      ...record,
      id: `aitable-${Date.now()}`,
      timestamp: new Date()
    };
    
    setRecords(prev => [newRecord, ...prev]);
  };

  // 初始化記錄
  useEffect(() => {
    setRecords(mockRecords);
  }, []);

  return (
    <div className="aitable-integration bg-gray-800 rounded-lg p-6 mt-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-bold mb-2 text-emerald-400">
          <i className="fas fa-database mr-2"></i>
          萬能雙向同步永憶智慧知識庫
        </h3>
        
        <div className="flex items-center space-x-2">
          <div className={`w-3 h-3 rounded-full ${syncStatus === 'success' ? 'bg-green-500' : syncStatus === 'error' ? 'bg-red-500' : syncStatus === 'syncing' ? 'bg-yellow-500 animate-pulse' : 'bg-gray-500'}`}></div>
          <span className="text-sm text-gray-400">
            {syncStatus === 'idle' && '待機中'}
            {syncStatus === 'syncing' && '同步中...'}
            {syncStatus === 'success' && '同步完成'}
            {syncStatus === 'error' && '同步失敗'}
          </span>
        </div>
      </div>

      {/* 配置區域 */}
      <div className="mb-6 p-4 bg-gray-700 rounded-lg">
        <h4 className="text-lg font-medium mb-3 text-emerald-300">AITable 配置</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">Base ID</label>
            <input
              type="text"
              className="w-full p-2 bg-gray-600 border border-gray-500 rounded text-white"
              value={config.baseId}
              onChange={(e) => setConfig({...config, baseId: e.target.value})}
              placeholder="輸入 AITable Base ID"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">API Key</label>
            <input
              type="password"
              className="w-full p-2 bg-gray-600 border border-gray-500 rounded text-white"
              value={config.apiKey}
              onChange={(e) => setConfig({...config, apiKey: e.target.value})}
              placeholder="輸入 AITable API Key"
            />
          </div>
        </div>
        
        <div className="flex items-center mt-3 space-x-4">
          <label className="flex items-center">
            <input
              type="checkbox"
              className="mr-2"
              checked={config.syncEnabled}
              onChange={(e) => setConfig({...config, syncEnabled: e.target.checked})}
            />
            <span className="text-sm">啟用同步</span>
          </label>
          
          <label className="flex items-center">
            <input
              type="checkbox"
              className="mr-2"
              checked={config.bidirectional}
              onChange={(e) => setConfig({...config, bidirectional: e.target.checked})}
              disabled={!config.syncEnabled}
            />
            <span className="text-sm">雙向同步</span>
          </label>
        </div>
      </div>

      {/* 同步控制 */}
      <div className="mb-6 flex flex-wrap gap-3">
        <button
          onClick={performBidirectionalSync}
          disabled={isSyncing || !config.syncEnabled}
          className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <i className="fas fa-sync-alt mr-2"></i>
          雙向同步
        </button>
        
        <button
          onClick={syncToAITable}
          disabled={isSyncing || !config.syncEnabled || !config.bidirectional}
          className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <i className="fas fa-upload mr-2"></i>
          同步到 AITable
        </button>
        
        <button
          onClick={syncFromAITable}
          disabled={isSyncing || !config.syncEnabled}
          className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <i className="fas fa-download mr-2"></i>
          從 AITable 獲取
        </button>
        
        {lastSyncTime && (
          <div className="text-sm text-gray-400 flex items-center">
            <i className="fas fa-clock mr-1"></i>
            最後同步: {lastSyncTime.toLocaleString('zh-TW')}
          </div>
        )}
      </div>

      {/* 搜索和過濾 */}
      <div className="mb-4 flex flex-col md:flex-row gap-3">
        <div className="flex-1">
          <input
            type="text"
            placeholder="搜索知識庫..."
            className="w-full p-2 bg-gray-700 border border-gray-600 rounded text-white"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        
        <select
          className="p-2 bg-gray-700 border border-gray-600 rounded text-white"
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
        >
          {categories.map(category => (
            <option key={category} value={category}>
              {category === 'all' ? '所有類別' : category}
            </option>
          ))}
        </select>
      </div>

      {/* 記錄列表 */}
      <div className="space-y-3 max-h-96 overflow-y-auto">
        {filteredRecords.length === 0 ? (
          <div className="text-center text-gray-400 py-8">
            <i className="fas fa-inbox text-3xl mb-2"></i>
            <p>沒有找到匹配的記錄</p>
          </div>
        ) : (
          filteredRecords.map(record => (
            <div key={record.id} className="p-4 bg-gray-700 rounded-lg hover:bg-gray-600 transition-colors">
              <div className="flex items-start justify-between mb-2">
                <h4 className="font-medium text-white">{record.title}</h4>
                <div className="flex items-center space-x-2">
                  <span className={`px-2 py-1 text-xs rounded ${
                    record.source === 'junai' ? 'bg-blue-600' :
                    record.source === 'user' ? 'bg-green-600' :
                    record.source === 'system' ? 'bg-purple-600' :
                    'bg-gray-600'
                  }`}>
                    {record.source === 'junai' ? 'Jun.AI' :
                     record.source === 'user' ? '用戶' :
                     record.source === 'system' ? '系統' : '外部'}
                  </span>
                  <span className="text-xs text-gray-400">
                    {record.timestamp.toLocaleString('zh-TW')}
                  </span>
                </div>
              </div>
              
              <p className="text-gray-300 text-sm mb-3 line-clamp-2">
                {record.content}
              </p>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <span className="text-xs text-gray-400">類別: {record.category}</span>
                  <span className="text-xs text-gray-400">信心度: {(record.confidence * 100).toFixed(0)}%</span>
                </div>
                
                <div className="flex flex-wrap gap-1">
                  {record.tags.map(tag => (
                    <span key={tag} className="px-2 py-1 text-xs bg-emerald-600 text-white rounded">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* 統計信息 */}
      <div className="mt-6 pt-4 border-t border-gray-700">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
          <div>
            <div className="text-2xl font-bold text-emerald-400">{records.length}</div>
            <div className="text-xs text-gray-400">總記錄數</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-blue-400">
              {records.filter(r => r.source === 'junai').length}
            </div>
            <div className="text-xs text-gray-400">Jun.AI 生成</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-purple-400">
              {new Set(records.map(r => r.category)).size}
            </div>
            <div className="text-xs text-gray-400">知識類別</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-yellow-400">
              {(records.reduce((sum, r) => sum + r.confidence, 0) / records.length * 100).toFixed(0)}%
            </div>
            <div className="text-xs text-gray-400">平均信心度</div>
          </div>
        </div>
      </div>
    </div>
  );
};

// 導出 AITable 工具函數
export class AITableUtils {
  /**
   * 將系統狀態轉換為 AITable 記錄
   */
  static systemStateToRecords(state: SystemState): AITableRecord[] {
    const records: AITableRecord[] = [];
    
    // 轉換事件記錄
    state.cards.events.forEach((event: any) => {
      records.push({
        id: `event-${event.id}`,
        title: `事件: ${event.name}`,
        content: event.description,
        category: '系統事件',
        tags: ['事件', event.type.toLowerCase()],
        timestamp: event.timestamp,
        source: 'system',
        confidence: 0.9,
        metadata: { 
          cycle: state.evolution.cycle,
          entropy: state.entropy,
          relatedModule: event.relatedModule
        }
      });
    });
    
    // 轉換問題記錄
    state.cards.problems.forEach((problem: any) => {
      records.push({
        id: `problem-${problem.id}`,
        title: `問題: ${problem.name}`,
        content: problem.causeAnalysis,
        category: '系統問題',
        tags: ['問題', '診斷', ...problem.impact.map((i: any) => i.toLowerCase())],
        timestamp: new Date(),
        source: 'system',
        confidence: 0.8,
        metadata: { 
          severity: problem.severity,
          impact: problem.impact,
          relatedEvents: problem.relatedEventIds
        }
      });
    });
    
    // 轉換解決方案記錄
    state.cards.solutions.forEach((solution: any) => {
      records.push({
        id: `solution-${solution.id}`,
        title: `解決方案: ${solution.name}`,
        content: solution.description,
        category: '系統解決',
        tags: ['解決方案', solution.type.toLowerCase()],
        timestamp: new Date(),
        source: 'system',
        confidence: 0.85,
        metadata: { 
          entropyReduction: solution.entropyReduction,
          chronicleRecord: solution.chronicleRecord,
          resources: solution.requiredResources
        }
      });
    });
    
    return records;
  }
  
  /**
   * 生成 AITable 配置的默認值
   */
  static getDefaultConfig(): AITableConfig {
    return {
      baseId: '',
      tableName: '萬能智慧知識庫',
      apiKey: '',
      syncEnabled: false,
      bidirectional: true
    };
  }
}
