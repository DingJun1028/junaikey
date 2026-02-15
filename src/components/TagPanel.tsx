/**
 * TagPanel Component
 * Frontend UI component for the JunAiKey Omni-Tag System
 * Displays tags, allows tag management, and provides feedback interface
 */

import React, { useState, useEffect, useCallback } from 'react';
import type { Tag, DataItem } from '../intelligent-tagging-system';

interface TagPanelProps {
  dataId?: string;
  serverUrl?: string;
  onTagClick?: (tag: Tag) => void;
  onFeedbackSubmit?: (feedback: FeedbackData) => void;
  className?: string;
}

interface FeedbackData {
  dataId: string;
  action: 'accept' | 'reject' | 'modify';
  originalTags?: Tag[];
  correctedTags?: Tag[];
  reason?: string;
}

interface ServerResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
}

const TagPanel: React.FC<TagPanelProps> = ({
  dataId,
  serverUrl = 'http://localhost:3001',
  onTagClick,
  onFeedbackSubmit,
  className = ''
}) => {
  const [dataItem, setDataItem] = useState<DataItem | null>(null);
  const [tags, setTags] = useState<Tag[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [editMode, setEditMode] = useState(false);
  const [newTagName, setNewTagName] = useState('');
  const [selectedTags, setSelectedTags] = useState<Set<string>>(new Set());

  // Fetch data and tags from server
  const fetchData = useCallback(async () => {
    if (!dataId) return;

    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`${serverUrl}/api/data/${dataId}`);
      const result: ServerResponse<DataItem> = await response.json();

      if (result.success && result.data) {
        setDataItem(result.data);
        setTags(result.data.tags || []);
      } else {
        setError(result.error || 'Failed to fetch data');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Network error');
    } finally {
      setLoading(false);
    }
  }, [dataId, serverUrl]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  // Handle tag click
  const handleTagClick = (tag: Tag) => {
    if (editMode) {
      setSelectedTags(prev => {
        const newSet = new Set(prev);
        if (newSet.has(tag.id)) {
          newSet.delete(tag.id);
        } else {
          newSet.add(tag.id);
        }
        return newSet;
      });
    }
    onTagClick?.(tag);
  };

  // Submit feedback
  const handleFeedback = async (action: 'accept' | 'reject' | 'modify') => {
    if (!dataId || !dataItem) return;

    const feedback: FeedbackData = {
      dataId,
      action,
      originalTags: tags,
      correctedTags: action === 'modify' ? tags.filter(t => !selectedTags.has(t.id)) : undefined,
      reason: action === 'reject' ? 'User rejected tags' : undefined
    };

    try {
      const response = await fetch(`${serverUrl}/api/feedback`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(feedback)
      });

      const result = await response.json();

      if (result.success) {
        onFeedbackSubmit?.(feedback);
        if (action === 'modify') {
          setTags(feedback.correctedTags || []);
          setSelectedTags(new Set());
          setEditMode(false);
        }
      } else {
        setError(result.error || 'Failed to submit feedback');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Network error');
    }
  };

  // Add new tag
  const handleAddTag = () => {
    if (!newTagName.trim()) return;

    const newTag: Tag = {
      id: `tag_${Date.now()}`,
      name: newTagName.trim().toLowerCase(),
      weight: 1.0,
      semanticType: 'user-added',
      source: 'user',
      confidence: 1.0,
      createdAt: new Date(),
      updatedAt: new Date()
    };

    setTags([...tags, newTag]);
    setNewTagName('');
  };

  // Get tag color based on source and confidence
  const getTagColor = (tag: Tag): string => {
    if (tag.source === 'user') return '#3b82f6';
    if (tag.source === 'system') return '#10b981';
    if (tag.confidence > 0.9) return '#8b5cf6';
    if (tag.confidence > 0.7) return '#6366f1';
    return '#6b7280';
  };

  if (loading) {
    return (
      <div className={`tag-panel loading ${className}`}>
        <div style={{ display: 'flex', gap: '0.5rem' }}>
          <div style={{ height: '2rem', width: '5rem', backgroundColor: '#d1d5db', borderRadius: '0.375rem' }}></div>
          <div style={{ height: '2rem', width: '6rem', backgroundColor: '#d1d5db', borderRadius: '0.375rem' }}></div>
          <div style={{ height: '2rem', width: '4rem', backgroundColor: '#d1d5db', borderRadius: '0.375rem' }}></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={`tag-panel error ${className}`}>
        <div style={{ backgroundColor: '#fee2e2', border: '1px solid #f87171', color: '#991b1b', padding: '0.75rem 1rem', borderRadius: '0.375rem' }}>
          <strong>Error:</strong> {error}
        </div>
      </div>
    );
  }

  return (
    <div className={`tag-panel ${className}`} style={{ padding: '1rem', backgroundColor: '#f9fafb', borderRadius: '0.5rem', border: '1px solid #e5e7eb' }}>
      <div className="tag-panel-header" style={{ marginBottom: '1rem' }}>
        <h3 style={{ fontSize: '1.25rem', fontWeight: 'bold', marginBottom: '0.5rem', color: '#111827' }}>
          🏷️ Smart Tags
        </h3>
        {dataItem && (
          <p style={{ fontSize: '0.875rem', color: '#6b7280' }}>
            Data ID: {dataItem.id} | Type: {dataItem.type}
          </p>
        )}
      </div>

      <div className="tag-list" style={{ marginBottom: '1rem' }}>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
          {tags.length === 0 ? (
            <p style={{ color: '#9ca3af', fontStyle: 'italic' }}>No tags available</p>
          ) : (
            tags.map(tag => (
              <button
                key={tag.id}
                onClick={() => handleTagClick(tag)}
                className={`tag-badge ${selectedTags.has(tag.id) ? 'selected' : ''}`}
                style={{
                  padding: '0.5rem 0.75rem',
                  borderRadius: '9999px',
                  fontSize: '0.875rem',
                  fontWeight: '500',
                  color: 'white',
                  backgroundColor: selectedTags.has(tag.id) ? '#ef4444' : getTagColor(tag),
                  border: editMode ? '2px solid #fff' : 'none',
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                  outline: 'none',
                  boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.05)'
                }}
                title={`Source: ${tag.source} | Confidence: ${(tag.confidence * 100).toFixed(0)}%`}
              >
                {tag.name}
                <span style={{ marginLeft: '0.25rem', fontSize: '0.75rem', opacity: 0.8 }}>
                  {(tag.confidence * 100).toFixed(0)}%
                </span>
              </button>
            ))
          )}
        </div>
      </div>

      {editMode && (
        <div className="add-tag-form" style={{ marginBottom: '1rem' }}>
          <div style={{ display: 'flex', gap: '0.5rem' }}>
            <input
              type="text"
              value={newTagName}
              onChange={(e) => setNewTagName(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleAddTag()}
              placeholder="Add new tag..."
              style={{
                flex: 1,
                padding: '0.5rem',
                border: '1px solid #d1d5db',
                borderRadius: '0.375rem',
                outline: 'none',
                fontSize: '0.875rem'
              }}
            />
            <button
              onClick={handleAddTag}
              style={{
                padding: '0.5rem 1rem',
                backgroundColor: '#3b82f6',
                color: 'white',
                borderRadius: '0.375rem',
                border: 'none',
                cursor: 'pointer',
                fontWeight: '500',
                fontSize: '0.875rem'
              }}
            >
              Add
            </button>
          </div>
        </div>
      )}

      <div className="tag-actions" style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
        <button
          onClick={() => setEditMode(!editMode)}
          style={{
            padding: '0.5rem 1rem',
            backgroundColor: editMode ? '#6b7280' : '#8b5cf6',
            color: 'white',
            borderRadius: '0.375rem',
            border: 'none',
            cursor: 'pointer',
            fontSize: '0.875rem',
            fontWeight: '500'
          }}
        >
          {editMode ? 'Cancel Edit' : 'Edit Tags'}
        </button>

        {editMode && (
          <>
            <button
              onClick={() => handleFeedback('modify')}
              disabled={selectedTags.size === 0}
              style={{
                padding: '0.5rem 1rem',
                backgroundColor: selectedTags.size === 0 ? '#d1d5db' : '#10b981',
                color: 'white',
                borderRadius: '0.375rem',
                border: 'none',
                cursor: selectedTags.size === 0 ? 'not-allowed' : 'pointer',
                fontSize: '0.875rem',
                fontWeight: '500',
                opacity: selectedTags.size === 0 ? 0.6 : 1
              }}
            >
              Remove Selected ({selectedTags.size})
            </button>
          </>
        )}

        {!editMode && (
          <>
            <button
              onClick={() => handleFeedback('accept')}
              style={{
                padding: '0.5rem 1rem',
                backgroundColor: '#10b981',
                color: 'white',
                borderRadius: '0.375rem',
                border: 'none',
                cursor: 'pointer',
                fontSize: '0.875rem',
                fontWeight: '500'
              }}
            >
              ✓ Accept
            </button>
            <button
              onClick={() => handleFeedback('reject')}
              style={{
                padding: '0.5rem 1rem',
                backgroundColor: '#ef4444',
                color: 'white',
                borderRadius: '0.375rem',
                border: 'none',
                cursor: 'pointer',
                fontSize: '0.875rem',
                fontWeight: '500'
              }}
            >
              ✗ Reject
            </button>
            <button
              onClick={fetchData}
              style={{
                padding: '0.5rem 1rem',
                backgroundColor: '#6b7280',
                color: 'white',
                borderRadius: '0.375rem',
                border: 'none',
                cursor: 'pointer',
                fontSize: '0.875rem',
                fontWeight: '500'
              }}
            >
              🔄 Refresh
            </button>
          </>
        )}
      </div>

      {tags.length > 0 && (
        <div className="tag-stats" style={{ marginTop: '1rem', fontSize: '0.75rem', color: '#9ca3af' }}>
          <p>
            Total: {tags.length} tags | 
            AI: {tags.filter(t => t.source === 'ai').length} | 
            User: {tags.filter(t => t.source === 'user').length} | 
            System: {tags.filter(t => t.source === 'system').length}
          </p>
        </div>
      )}
    </div>
  );
};

export default TagPanel;
