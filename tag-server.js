/**
 * JunAiKey Tag Server
 * Backend API server for the Omni-Tag System
 * Provides REST API endpoints for tag management, querying, and feedback
 */

const express = require('express');
const cors = require('cors');
const { EventEmitter } = require('events');

const app = express();
const PORT = process.env.TAG_SERVER_PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// In-memory storage (replace with database in production)
const dataStore = new Map();
const tagIndex = new Map(); // tag name -> Set of dataIds
const dataTagIndex = new Map(); // dataId -> Set of tags
const feedbackStore = [];
const eventBus = new EventEmitter();

// Metrics
const metrics = {
  totalDataItems: 0,
  totalTags: 0,
  averageTaggingTime: 0,
  tagAccuracy: 0,
  systemThroughput: 0,
  activeUsers: 0,
  lastUpdated: new Date()
};

/**
 * Helper function to generate tags (simplified AI simulation)
 */
function generateTags(content, type = 'text') {
  const timestamp = Date.now();
  const tags = [];
  
  // Simple keyword extraction for demo
  if (type === 'text' && typeof content === 'string') {
    const words = content.toLowerCase().match(/\b\w+\b/g) || [];
    const uniqueWords = [...new Set(words)];
    
    // Take top words as tags (simplified)
    uniqueWords.slice(0, 5).forEach((word, idx) => {
      tags.push({
        id: `tag_${timestamp}_${idx}`,
        name: word,
        weight: 1.0 - (idx * 0.1),
        semanticType: 'keyword',
        source: 'ai',
        confidence: 0.85 + (Math.random() * 0.1),
        createdAt: new Date(),
        updatedAt: new Date(),
        metadata: {}
      });
    });
  }
  
  return tags;
}

/**
 * Index tags bidirectionally
 */
function indexTags(dataId, tags) {
  // Update tag -> dataIds mapping
  tags.forEach(tag => {
    if (!tagIndex.has(tag.name)) {
      tagIndex.set(tag.name, new Set());
    }
    tagIndex.get(tag.name).add(dataId);
  });
  
  // Update dataId -> tags mapping
  dataTagIndex.set(dataId, new Set(tags.map(t => t.name)));
  
  // Update metrics
  metrics.totalTags = tagIndex.size;
}

// ========== API ENDPOINTS ==========

/**
 * Health check endpoint
 */
app.get('/health', (req, res) => {
  res.json({
    status: 'healthy',
    timestamp: new Date(),
    uptime: process.uptime(),
    metrics
  });
});

/**
 * Ingest new data and generate tags
 * POST /api/data/ingest
 */
app.post('/api/data/ingest', async (req, res) => {
  const startTime = Date.now();
  
  try {
    const { id, content, type, source } = req.body;
    
    if (!id || !content) {
      return res.status(400).json({ error: 'Missing required fields: id, content' });
    }
    
    // Generate tags
    const tags = generateTags(content, type || 'text');
    
    // Create data item
    const dataItem = {
      id,
      content,
      type: type || 'text',
      source: source || 'user',
      tags,
      version: 1,
      createdAt: new Date(),
      updatedAt: new Date()
    };
    
    // Store data
    dataStore.set(id, dataItem);
    
    // Index tags
    indexTags(id, tags);
    
    // Update metrics
    metrics.totalDataItems = dataStore.size;
    metrics.averageTaggingTime = Date.now() - startTime;
    metrics.lastUpdated = new Date();
    
    // Emit event
    eventBus.emit('data_ingested', { dataId: id, tags });
    
    res.status(201).json({
      success: true,
      data: dataItem,
      taggingTime: Date.now() - startTime
    });
  } catch (error) {
    console.error('Error ingesting data:', error);
    res.status(500).json({ error: 'Internal server error', message: error.message });
  }
});

/**
 * Get data by ID
 * GET /api/data/:id
 */
app.get('/api/data/:id', (req, res) => {
  const { id } = req.params;
  const dataItem = dataStore.get(id);
  
  if (!dataItem) {
    return res.status(404).json({ error: 'Data not found' });
  }
  
  res.json({ success: true, data: dataItem });
});

/**
 * Query data by tags
 * GET /api/tags/query?tags=tag1,tag2,tag3
 */
app.get('/api/tags/query', (req, res) => {
  const { tags } = req.query;
  
  if (!tags) {
    return res.status(400).json({ error: 'Missing tags parameter' });
  }
  
  const tagList = tags.split(',').map(t => t.trim().toLowerCase());
  const dataIds = new Set();
  
  // Find all data items with any of the requested tags
  tagList.forEach(tag => {
    const ids = tagIndex.get(tag);
    if (ids) {
      ids.forEach(id => dataIds.add(id));
    }
  });
  
  // Retrieve data items
  const results = Array.from(dataIds).map(id => dataStore.get(id)).filter(Boolean);
  
  res.json({
    success: true,
    count: results.length,
    tags: tagList,
    data: results
  });
});

/**
 * Get all tags for a data item
 * GET /api/data/:id/tags
 */
app.get('/api/data/:id/tags', (req, res) => {
  const { id } = req.params;
  const dataItem = dataStore.get(id);
  
  if (!dataItem) {
    return res.status(404).json({ error: 'Data not found' });
  }
  
  res.json({
    success: true,
    dataId: id,
    tags: dataItem.tags
  });
});

/**
 * Submit user feedback on tags
 * POST /api/feedback
 */
app.post('/api/feedback', (req, res) => {
  try {
    const { dataId, action, originalTags, correctedTags, reason } = req.body;
    
    if (!dataId || !action) {
      return res.status(400).json({ error: 'Missing required fields: dataId, action' });
    }
    
    const feedback = {
      id: `feedback_${Date.now()}`,
      dataId,
      action, // 'accept' | 'reject' | 'modify'
      originalTags,
      correctedTags,
      reason,
      timestamp: new Date()
    };
    
    feedbackStore.push(feedback);
    
    // If tags were corrected, update the data item
    if (action === 'modify' && correctedTags) {
      const dataItem = dataStore.get(dataId);
      if (dataItem) {
        dataItem.tags = correctedTags;
        dataItem.updatedAt = new Date();
        dataItem.version += 1;
        
        // Re-index tags
        indexTags(dataId, correctedTags);
      }
    }
    
    // Emit event for learning
    eventBus.emit('user_feedback', feedback);
    
    res.json({ success: true, feedback });
  } catch (error) {
    console.error('Error processing feedback:', error);
    res.status(500).json({ error: 'Internal server error', message: error.message });
  }
});

/**
 * Get system metrics
 * GET /api/metrics
 */
app.get('/api/metrics', (req, res) => {
  res.json({
    success: true,
    metrics: {
      ...metrics,
      feedbackCount: feedbackStore.length,
      dataStoreSize: dataStore.size,
      tagIndexSize: tagIndex.size
    }
  });
});

/**
 * Get all available tags
 * GET /api/tags
 */
app.get('/api/tags', (req, res) => {
  const tags = Array.from(tagIndex.entries()).map(([name, dataIds]) => ({
    name,
    count: dataIds.size,
    dataIds: Array.from(dataIds)
  }));
  
  res.json({
    success: true,
    count: tags.length,
    tags
  });
});

/**
 * Delete data item
 * DELETE /api/data/:id
 */
app.delete('/api/data/:id', (req, res) => {
  const { id } = req.params;
  const dataItem = dataStore.get(id);
  
  if (!dataItem) {
    return res.status(404).json({ error: 'Data not found' });
  }
  
  // Remove from tag index
  dataItem.tags.forEach(tag => {
    const ids = tagIndex.get(tag.name);
    if (ids) {
      ids.delete(id);
      if (ids.size === 0) {
        tagIndex.delete(tag.name);
      }
    }
  });
  
  // Remove from data store
  dataStore.delete(id);
  dataTagIndex.delete(id);
  
  // Update metrics
  metrics.totalDataItems = dataStore.size;
  metrics.totalTags = tagIndex.size;
  metrics.lastUpdated = new Date();
  
  res.json({ success: true, message: 'Data deleted successfully' });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Unhandled error:', err);
  res.status(500).json({ error: 'Internal server error', message: err.message });
});

// Start server
if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`🏷️  JunAiKey Tag Server running on port ${PORT}`);
    console.log(`📊 Health check: http://localhost:${PORT}/health`);
    console.log(`📈 Metrics: http://localhost:${PORT}/api/metrics`);
  });
}

module.exports = app;
