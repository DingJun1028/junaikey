/**
 * TagPanel - 萬能標籤面板組件
 * 實現標籤添加、移除、歷史查看和即時同步功能
 */

import React, { useState, useEffect } from 'react';

interface Tag {
  id: string;
  name: string;
  weight: number;
  semantic_type?: string;
  source: 'ai' | 'user' | 'system';
  confidence: number;
  created_at: string;
  updated_at: string;
  metadata?: Record<string, any>;
}

interface TagHistory {
  id: number;
  tag_id: string;
  action: 'created' | 'updated' | 'deleted' | 'weight_decayed';
  old_value?: string;
  new_value?: string;
  timestamp: string;
  user_id?: string;
}

interface TagPanelProps {
  serverUrl?: string;
}

export const TagPanel: React.FC<TagPanelProps> = ({ 
  serverUrl = 'http://localhost:3002' 
}) => {
  const [tags, setTags] = useState<Tag[]>([]);
  const [selectedTagId, setSelectedTagId] = useState<string | null>(null);
  const [history, setHistory] = useState<TagHistory[]>([]);
  const [newTagName, setNewTagName] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showHistory, setShowHistory] = useState(false);

  // 加載標籤列表
  const loadTags = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${serverUrl}/api/tags`);
      const data = await response.json();
      if (data.success) {
        setTags(data.tags);
      } else {
        setError(data.error || '加載標籤失敗');
      }
    } catch (err) {
      setError('無法連接到標籤服務器');
      console.error('加載標籤失敗:', err);
    } finally {
      setLoading(false);
    }
  };

  // 加載標籤歷史
  const loadHistory = async (tagId: string) => {
    try {
      const response = await fetch(`${serverUrl}/api/tags/${tagId}/history`);
      const data = await response.json();
      if (data.success) {
        setHistory(data.history);
        setShowHistory(true);
      }
    } catch (err) {
      console.error('加載歷史失敗:', err);
    }
  };

  // 添加新標籤
  const addTag = async () => {
    if (!newTagName.trim()) return;
    
    try {
      const newTag = {
        id: `tag-${Date.now()}`,
        name: newTagName.trim(),
        weight: 1.0,
        semanticType: 'user-defined',
        source: 'user',
        confidence: 1.0,
        metadata: {}
      };

      const response = await fetch(`${serverUrl}/api/tags`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newTag)
      });

      const data = await response.json();
      if (data.success) {
        setNewTagName('');
        loadTags();
      } else {
        setError(data.error || '添加標籤失敗');
      }
    } catch (err) {
      setError('添加標籤失敗');
      console.error('添加標籤失敗:', err);
    }
  };

  // 刪除標籤
  const deleteTag = async (tagId: string) => {
    if (!confirm('確定要刪除此標籤嗎？')) return;
    
    try {
      const response = await fetch(`${serverUrl}/api/tags/${tagId}`, {
        method: 'DELETE'
      });

      const data = await response.json();
      if (data.success) {
        loadTags();
      } else {
        setError(data.error || '刪除標籤失敗');
      }
    } catch (err) {
      setError('刪除標籤失敗');
      console.error('刪除標籤失敗:', err);
    }
  };

  // 組件掛載時加載標籤
  useEffect(() => {
    loadTags();
    
    // 設置定時刷新（每30秒）實現即時同步
    const interval = setInterval(loadTags, 30000);
    return () => clearInterval(interval);
  }, [serverUrl]);

  return (
    <div className="tag-panel" style={{
      padding: '20px',
      backgroundColor: '#1a1a2e',
      borderRadius: '8px',
      color: '#eee'
    }}>
      <h2 style={{ 
        marginBottom: '20px',
        color: '#00d4ff',
        fontWeight: 'bold'
      }}>
        🏷️ 萬能標籤系統
      </h2>

      {error && (
        <div style={{
          padding: '10px',
          marginBottom: '15px',
          backgroundColor: '#ff4444',
          borderRadius: '4px',
          color: '#fff'
        }}>
          {error}
          <button 
            onClick={() => setError(null)}
            style={{
              marginLeft: '10px',
              background: 'none',
              border: 'none',
              color: '#fff',
              cursor: 'pointer'
            }}
          >
            ✕
          </button>
        </div>
      )}

      {/* 添加標籤區域 */}
      <div style={{ marginBottom: '20px' }}>
        <div style={{ display: 'flex', gap: '10px' }}>
          <input
            type="text"
            value={newTagName}
            onChange={(e) => setNewTagName(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && addTag()}
            placeholder="輸入新標籤名稱..."
            style={{
              flex: 1,
              padding: '10px',
              backgroundColor: '#16213e',
              border: '1px solid #00d4ff',
              borderRadius: '4px',
              color: '#fff',
              outline: 'none'
            }}
          />
          <button
            onClick={addTag}
            disabled={!newTagName.trim()}
            style={{
              padding: '10px 20px',
              backgroundColor: '#00d4ff',
              border: 'none',
              borderRadius: '4px',
              color: '#1a1a2e',
              fontWeight: 'bold',
              cursor: 'pointer',
              opacity: newTagName.trim() ? 1 : 0.5
            }}
          >
            添加標籤
          </button>
          <button
            onClick={loadTags}
            style={{
              padding: '10px 20px',
              backgroundColor: '#4CAF50',
              border: 'none',
              borderRadius: '4px',
              color: '#fff',
              fontWeight: 'bold',
              cursor: 'pointer'
            }}
          >
            🔄 刷新
          </button>
        </div>
      </div>

      {/* 標籤列表 */}
      <div style={{ marginBottom: '20px' }}>
        <h3 style={{ marginBottom: '10px', color: '#00d4ff' }}>
          標籤列表 ({tags.length})
        </h3>
        {loading ? (
          <div style={{ textAlign: 'center', padding: '20px' }}>
            載入中...
          </div>
        ) : tags.length === 0 ? (
          <div style={{ 
            textAlign: 'center', 
            padding: '20px',
            color: '#888'
          }}>
            暫無標籤，請添加第一個標籤
          </div>
        ) : (
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
            gap: '10px'
          }}>
            {tags.map(tag => (
              <div
                key={tag.id}
                style={{
                  padding: '12px',
                  backgroundColor: '#16213e',
                  borderRadius: '4px',
                  border: selectedTagId === tag.id ? '2px solid #00d4ff' : '1px solid #333',
                  cursor: 'pointer'
                }}
                onClick={() => setSelectedTagId(tag.id)}
              >
                <div style={{ 
                  display: 'flex', 
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginBottom: '8px'
                }}>
                  <span style={{ 
                    fontWeight: 'bold',
                    color: '#00d4ff'
                  }}>
                    {tag.name}
                  </span>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      deleteTag(tag.id);
                    }}
                    style={{
                      background: 'none',
                      border: 'none',
                      color: '#ff4444',
                      cursor: 'pointer',
                      fontSize: '16px'
                    }}
                  >
                    🗑️
                  </button>
                </div>
                <div style={{ fontSize: '12px', color: '#888' }}>
                  <div>權重: {tag.weight.toFixed(2)}</div>
                  <div>來源: {tag.source}</div>
                  <div>信心度: {(tag.confidence * 100).toFixed(0)}%</div>
                </div>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    loadHistory(tag.id);
                  }}
                  style={{
                    marginTop: '8px',
                    padding: '4px 8px',
                    backgroundColor: '#0f3460',
                    border: '1px solid #00d4ff',
                    borderRadius: '3px',
                    color: '#00d4ff',
                    fontSize: '11px',
                    cursor: 'pointer',
                    width: '100%'
                  }}
                >
                  查看歷史
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* 歷史記錄面板 */}
      {showHistory && (
        <div style={{
          position: 'fixed',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          backgroundColor: '#1a1a2e',
          border: '2px solid #00d4ff',
          borderRadius: '8px',
          padding: '20px',
          maxWidth: '600px',
          maxHeight: '500px',
          overflow: 'auto',
          zIndex: 1000,
          boxShadow: '0 4px 20px rgba(0, 212, 255, 0.3)'
        }}>
          <div style={{ 
            display: 'flex', 
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '15px'
          }}>
            <h3 style={{ color: '#00d4ff', margin: 0 }}>
              📜 標籤歷史記錄
            </h3>
            <button
              onClick={() => setShowHistory(false)}
              style={{
                background: 'none',
                border: 'none',
                color: '#ff4444',
                fontSize: '20px',
                cursor: 'pointer'
              }}
            >
              ✕
            </button>
          </div>
          {history.length === 0 ? (
            <div style={{ textAlign: 'center', color: '#888' }}>
              暫無歷史記錄
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {history.map(record => (
                <div
                  key={record.id}
                  style={{
                    padding: '10px',
                    backgroundColor: '#16213e',
                    borderRadius: '4px',
                    fontSize: '13px'
                  }}
                >
                  <div style={{ 
                    display: 'flex', 
                    justifyContent: 'space-between',
                    marginBottom: '5px'
                  }}>
                    <span style={{ 
                      color: record.action === 'deleted' ? '#ff4444' : '#4CAF50',
                      fontWeight: 'bold'
                    }}>
                      {record.action}
                    </span>
                    <span style={{ color: '#888' }}>
                      {new Date(record.timestamp).toLocaleString('zh-TW')}
                    </span>
                  </div>
                  {record.old_value && (
                    <div style={{ color: '#888' }}>
                      舊值: {record.old_value}
                    </div>
                  )}
                  {record.new_value && (
                    <div style={{ color: '#00d4ff' }}>
                      新值: {record.new_value}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* 背景遮罩 */}
      {showHistory && (
        <div
          onClick={() => setShowHistory(false)}
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.7)',
            zIndex: 999
          }}
        />
      )}
    </div>
  );
};

export default TagPanel;
