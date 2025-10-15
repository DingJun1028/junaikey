/**
 * JunAiKey 萬能標籤系統後端服務
 * 實現智能標籤生成、管理、雙向追蹤的完整後端系統
 */

import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import Database from 'better-sqlite3';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const PORT = process.env.TAG_SERVER_PORT || 3002;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Initialize SQLite Database
const dbPath = path.join(__dirname, 'data', 'junaikey_memory.db');
const db = new Database(dbPath);

// 創建標籤表
db.exec(`
  CREATE TABLE IF NOT EXISTS tags (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    weight REAL DEFAULT 1.0,
    semantic_type TEXT,
    source TEXT CHECK(source IN ('ai', 'user', 'system')),
    confidence REAL DEFAULT 1.0,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    metadata TEXT
  );

  CREATE TABLE IF NOT EXISTS data_items (
    id TEXT PRIMARY KEY,
    content TEXT,
    type TEXT CHECK(type IN ('text', 'image', 'audio', 'video', 'structured')),
    version INTEGER DEFAULT 1,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    source TEXT
  );

  CREATE TABLE IF NOT EXISTS data_item_tags (
    data_item_id TEXT,
    tag_id TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (data_item_id, tag_id),
    FOREIGN KEY (data_item_id) REFERENCES data_items(id) ON DELETE CASCADE,
    FOREIGN KEY (tag_id) REFERENCES tags(id) ON DELETE CASCADE
  );

  CREATE TABLE IF NOT EXISTS tag_history (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    tag_id TEXT,
    action TEXT CHECK(action IN ('created', 'updated', 'deleted', 'weight_decayed')),
    old_value TEXT,
    new_value TEXT,
    timestamp DATETIME DEFAULT CURRENT_TIMESTAMP,
    user_id TEXT,
    FOREIGN KEY (tag_id) REFERENCES tags(id)
  );

  CREATE INDEX IF NOT EXISTS idx_tags_name ON tags(name);
  CREATE INDEX IF NOT EXISTS idx_tags_weight ON tags(weight);
  CREATE INDEX IF NOT EXISTS idx_data_items_type ON data_items(type);
  CREATE INDEX IF NOT EXISTS idx_tag_history_tag_id ON tag_history(tag_id);
  CREATE INDEX IF NOT EXISTS idx_tag_history_timestamp ON tag_history(timestamp);
`);

console.log(`✅ 數據庫初始化完成: ${dbPath}`);

// ==================== API 路由 ====================

// 健康檢查
app.get('/health', (req, res) => {
  res.json({ 
    status: 'ok', 
    timestamp: new Date().toISOString(),
    database: dbPath
  });
});

// 獲取所有標籤
app.get('/api/tags', (req, res) => {
  try {
    const tags = db.prepare(`
      SELECT * FROM tags 
      ORDER BY weight DESC, updated_at DESC
    `).all();
    
    res.json({ 
      success: true, 
      tags: tags.map(tag => ({
        ...tag,
        metadata: tag.metadata ? JSON.parse(tag.metadata) : {}
      }))
    });
  } catch (error) {
    console.error('獲取標籤失敗:', error);
    res.status(500).json({ success: false, error: error.message });
  }
});

// 創建標籤
app.post('/api/tags', (req, res) => {
  try {
    const { id, name, weight = 1.0, semanticType, source = 'user', confidence = 1.0, metadata = {} } = req.body;
    
    if (!id || !name) {
      return res.status(400).json({ success: false, error: '缺少必要參數: id, name' });
    }

    const stmt = db.prepare(`
      INSERT INTO tags (id, name, weight, semantic_type, source, confidence, metadata)
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `);
    
    stmt.run(id, name, weight, semanticType, source, confidence, JSON.stringify(metadata));
    
    // 記錄歷史
    db.prepare(`
      INSERT INTO tag_history (tag_id, action, new_value)
      VALUES (?, 'created', ?)
    `).run(id, JSON.stringify({ name, weight, semanticType, source }));
    
    res.json({ success: true, tag: { id, name, weight, semanticType, source, confidence, metadata } });
  } catch (error) {
    console.error('創建標籤失敗:', error);
    res.status(500).json({ success: false, error: error.message });
  }
});

// 更新標籤
app.put('/api/tags/:id', (req, res) => {
  try {
    const { id } = req.params;
    const { name, weight, semanticType, confidence, metadata } = req.body;
    
    const updates = [];
    const values = [];
    
    if (name !== undefined) { updates.push('name = ?'); values.push(name); }
    if (weight !== undefined) { updates.push('weight = ?'); values.push(weight); }
    if (semanticType !== undefined) { updates.push('semantic_type = ?'); values.push(semanticType); }
    if (confidence !== undefined) { updates.push('confidence = ?'); values.push(confidence); }
    if (metadata !== undefined) { updates.push('metadata = ?'); values.push(JSON.stringify(metadata)); }
    
    updates.push('updated_at = CURRENT_TIMESTAMP');
    values.push(id);
    
    const stmt = db.prepare(`
      UPDATE tags 
      SET ${updates.join(', ')}
      WHERE id = ?
    `);
    
    const result = stmt.run(...values);
    
    if (result.changes > 0) {
      // 記錄歷史
      db.prepare(`
        INSERT INTO tag_history (tag_id, action, new_value)
        VALUES (?, 'updated', ?)
      `).run(id, JSON.stringify({ name, weight, semanticType, confidence }));
      
      res.json({ success: true });
    } else {
      res.status(404).json({ success: false, error: '標籤不存在' });
    }
  } catch (error) {
    console.error('更新標籤失敗:', error);
    res.status(500).json({ success: false, error: error.message });
  }
});

// 刪除標籤
app.delete('/api/tags/:id', (req, res) => {
  try {
    const { id } = req.params;
    
    // 記錄刪除歷史
    const tag = db.prepare('SELECT * FROM tags WHERE id = ?').get(id);
    if (tag) {
      db.prepare(`
        INSERT INTO tag_history (tag_id, action, old_value)
        VALUES (?, 'deleted', ?)
      `).run(id, JSON.stringify(tag));
    }
    
    const stmt = db.prepare('DELETE FROM tags WHERE id = ?');
    const result = stmt.run(id);
    
    if (result.changes > 0) {
      res.json({ success: true });
    } else {
      res.status(404).json({ success: false, error: '標籤不存在' });
    }
  } catch (error) {
    console.error('刪除標籤失敗:', error);
    res.status(500).json({ success: false, error: error.message });
  }
});

// 獲取標籤歷史
app.get('/api/tags/:id/history', (req, res) => {
  try {
    const { id } = req.params;
    const history = db.prepare(`
      SELECT * FROM tag_history 
      WHERE tag_id = ? 
      ORDER BY timestamp DESC
      LIMIT 100
    `).all(id);
    
    res.json({ success: true, history });
  } catch (error) {
    console.error('獲取標籤歷史失敗:', error);
    res.status(500).json({ success: false, error: error.message });
  }
});

// 獲取數據項
app.get('/api/data-items', (req, res) => {
  try {
    const items = db.prepare(`
      SELECT di.*, 
        GROUP_CONCAT(t.name, ',') as tag_names,
        GROUP_CONCAT(t.id, ',') as tag_ids
      FROM data_items di
      LEFT JOIN data_item_tags dit ON di.id = dit.data_item_id
      LEFT JOIN tags t ON dit.tag_id = t.id
      GROUP BY di.id
      ORDER BY di.updated_at DESC
    `).all();
    
    res.json({ 
      success: true, 
      items: items.map(item => ({
        ...item,
        tags: item.tag_names ? item.tag_names.split(',').map((name, i) => ({
          id: item.tag_ids.split(',')[i],
          name
        })) : []
      }))
    });
  } catch (error) {
    console.error('獲取數據項失敗:', error);
    res.status(500).json({ success: false, error: error.message });
  }
});

// 創建數據項
app.post('/api/data-items', (req, res) => {
  try {
    const { id, content, type = 'text', source = 'user', tagIds = [] } = req.body;
    
    if (!id || !content) {
      return res.status(400).json({ success: false, error: '缺少必要參數: id, content' });
    }

    const stmt = db.prepare(`
      INSERT INTO data_items (id, content, type, source)
      VALUES (?, ?, ?, ?)
    `);
    
    stmt.run(id, JSON.stringify(content), type, source);
    
    // 關聯標籤
    const tagStmt = db.prepare(`
      INSERT INTO data_item_tags (data_item_id, tag_id)
      VALUES (?, ?)
    `);
    
    for (const tagId of tagIds) {
      tagStmt.run(id, tagId);
    }
    
    res.json({ success: true, item: { id, content, type, source, tagIds } });
  } catch (error) {
    console.error('創建數據項失敗:', error);
    res.status(500).json({ success: false, error: error.message });
  }
});

// 關聯標籤到數據項
app.post('/api/data-items/:id/tags', (req, res) => {
  try {
    const { id } = req.params;
    const { tagId } = req.body;
    
    if (!tagId) {
      return res.status(400).json({ success: false, error: '缺少必要參數: tagId' });
    }

    const stmt = db.prepare(`
      INSERT OR IGNORE INTO data_item_tags (data_item_id, tag_id)
      VALUES (?, ?)
    `);
    
    stmt.run(id, tagId);
    
    res.json({ success: true });
  } catch (error) {
    console.error('關聯標籤失敗:', error);
    res.status(500).json({ success: false, error: error.message });
  }
});

// 移除數據項的標籤
app.delete('/api/data-items/:id/tags/:tagId', (req, res) => {
  try {
    const { id, tagId } = req.params;
    
    const stmt = db.prepare(`
      DELETE FROM data_item_tags 
      WHERE data_item_id = ? AND tag_id = ?
    `);
    
    const result = stmt.run(id, tagId);
    
    res.json({ success: true, deleted: result.changes > 0 });
  } catch (error) {
    console.error('移除標籤失敗:', error);
    res.status(500).json({ success: false, error: error.message });
  }
});

// ==================== 每日權重衰減任務 ====================
function dailyWeightDecay() {
  try {
    const decayFactor = 0.95; // 每天衰減5%
    
    const stmt = db.prepare(`
      UPDATE tags 
      SET weight = weight * ?,
          updated_at = CURRENT_TIMESTAMP
      WHERE source != 'system'
    `);
    
    const result = stmt.run(decayFactor);
    
    // 記錄衰減歷史
    if (result.changes > 0) {
      db.prepare(`
        INSERT INTO tag_history (tag_id, action, old_value, new_value)
        SELECT id, 'weight_decayed', 
               CAST(weight / ? AS TEXT),
               CAST(weight AS TEXT)
        FROM tags 
        WHERE source != 'system'
      `).run(decayFactor);
    }
    
    console.log(`✅ 每日權重衰減完成，更新了 ${result.changes} 個標籤`);
  } catch (error) {
    console.error('權重衰減失敗:', error);
  }
}

// 每24小時執行一次權重衰減
const TWENTY_FOUR_HOURS = 24 * 60 * 60 * 1000;
setInterval(dailyWeightDecay, TWENTY_FOUR_HOURS);

// 服務器啟動時執行一次
dailyWeightDecay();

// ==================== 啟動服務器 ====================
app.listen(PORT, () => {
  console.log(`🌟 JunAiKey 萬能標籤系統後端服務已啟動`);
  console.log(`📡 服務地址: http://localhost:${PORT}`);
  console.log(`💾 數據庫路徑: ${dbPath}`);
  console.log(`⏰ 每日權重衰減任務已啟動`);
});

// 優雅關閉
process.on('SIGINT', () => {
  console.log('\n正在關閉服務器...');
  db.close();
  process.exit(0);
});

process.on('SIGTERM', () => {
  console.log('\n正在關閉服務器...');
  db.close();
  process.exit(0);
});
