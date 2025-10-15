# 雙向無礙體系部署指南 (Bidirectional Seamless System Deployment Guide)

## 階段一：WebContainer 內部運行 ✅ (已完成)

本階段已經在 WebContainer 中啟動本地後端服務和前端應用，實現了「萬能標籤」系統的核心功能。

### 啟動步驟

#### 1. 啟動後端服務
```bash
npm run start-server
```

這將啟動 Express 服務，並初始化標籤系統的 SQLite 數據庫（在 `./data/junaikey_memory.db`），同時啟動每日的標籤權重衰減任務。

後端服務將運行在：`http://localhost:3002`

#### 2. 啟動前端應用
```bash
npm run dev
```

這將啟動 React 應用，運行在：`http://localhost:3000`

### 驗證功能

1. 在瀏覽器中打開 `http://localhost:3000`
2. 您將看到萬能標籤系統面板（TagPanel 組件）
3. 可以嘗試：
   - 添加新標籤
   - 移除標籤
   - 查看標籤歷史紀錄
   - 觀察即時同步效果（每30秒自動刷新）

### API 端點

後端提供以下 REST API：

- `GET /health` - 健康檢查
- `GET /api/tags` - 獲取所有標籤
- `POST /api/tags` - 創建新標籤
- `PUT /api/tags/:id` - 更新標籤
- `DELETE /api/tags/:id` - 刪除標籤
- `GET /api/tags/:id/history` - 獲取標籤歷史
- `GET /api/data-items` - 獲取數據項
- `POST /api/data-items` - 創建數據項
- `POST /api/data-items/:id/tags` - 關聯標籤到數據項
- `DELETE /api/data-items/:id/tags/:tagId` - 移除數據項的標籤

---

## 階段二：WebContainer 外部部署與配置

此階段涉及與 Supabase、AITable 和 Boost.Space 等外部服務的整合，需要在本地開發環境或通過 CI/CD 管道完成。

### 🔷 步驟 1：部署 Supabase Edge Function

#### 1.1 安裝並登錄 Supabase CLI

```bash
# 安裝 Supabase CLI
npm install -g supabase

# 登錄到您的 Supabase 帳戶
supabase login
```

#### 1.2 創建 Supabase 專案配置

```bash
# 初始化 Supabase 配置（如果尚未完成）
supabase init

# 連接到您的 Supabase 專案
supabase link --project-ref YOUR_PROJECT_REF
```

#### 1.3 創建數據表

在 Supabase 專案的 SQL Editor 中執行以下 SQL：

```sql
-- 創建 AITable 事件接收表
CREATE TABLE aitable_events (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  event_type text,
  datasheet_id text,
  payload jsonb,
  received_at timestamp with time zone DEFAULT timezone('utc'::text, now())
);

-- 啟用 Realtime 廣播
ALTER PUBLICATION supabase_realtime ADD TABLE aitable_events;

-- 創建索引以提升查詢效能
CREATE INDEX idx_aitable_events_received_at ON aitable_events(received_at);
CREATE INDEX idx_aitable_events_datasheet_id ON aitable_events(datasheet_id);
```

#### 1.4 部署 Edge Function

創建 Edge Function 文件：

```bash
# 創建 Edge Function 目錄結構
mkdir -p supabase/functions/ingest_aitable_webhook
```

創建 `supabase/functions/ingest_aitable_webhook/index.ts`：

```typescript
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.7.1';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  // 處理 CORS preflight 請求
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseKey);

    const payload = await req.json();
    
    // 將 AITable webhook 數據插入數據庫
    const { data, error } = await supabase
      .from('aitable_events')
      .insert({
        event_type: payload.event_type,
        datasheet_id: payload.datasheet_id,
        payload: payload
      });

    if (error) throw error;

    return new Response(
      JSON.stringify({ success: true, data }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200 
      }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({ success: false, error: error.message }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 400 
      }
    );
  }
});
```

部署 Edge Function：

```bash
# 部署到 Supabase
supabase functions deploy ingest_aitable_webhook
```

Edge Function URL 格式：
```
https://YOUR_SUPABASE_PROJECT_REF.supabase.co/functions/v1/ingest_aitable_webhook
```

---

### 🔷 步驟 2：更新 StayScript (Tampermonkey/Greasemonkey)

#### 2.1 安裝 Tampermonkey 或 Greasemonkey

在您的瀏覽器中安裝以下任一擴展：
- [Tampermonkey](https://www.tampermonkey.net/)
- [Greasemonkey](https://www.greasespot.net/)

#### 2.2 創建新腳本

將以下內容保存為新的 UserScript：

```javascript
// ==UserScript==
// @name         JunAiKey 萬能水晶同步腳本
// @namespace    http://junaikey.ai/
// @version      2.0
// @description  實現 AITable、Supabase 和 Boost.Space 的雙向無縫同步
// @match        https://aitable.ai/*
// @match        https://*.aitable.ai/*
// @require      https://unpkg.com/@supabase/supabase-js@2.7.1/dist/umd/supabase.js
// @grant        GM_xmlhttpRequest
// @connect      supabase.co
// @connect      boost.space
// ==/UserScript==

(function() {
    'use strict';

    // 配置
    const SUPABASE_URL = 'YOUR_SUPABASE_URL';
    const SUPABASE_ANON_KEY = 'YOUR_SUPABASE_ANON_KEY';
    const BOOST_WEBHOOK_URL = 'YOUR_BOOST_SPACE_WEBHOOK_URL';

    // 初始化 Supabase 客戶端
    const supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

    // 監聽 AITable 變更事件
    function setupAITableListeners() {
        // 監聽記錄創建/更新
        window.addEventListener('aitable:record:change', async (event) => {
            const recordData = event.detail;
            
            // 發送到 Supabase
            await syncToSupabase(recordData);
            
            // 發送到 Boost.Space
            await syncToBoostSpace(recordData);
        });
    }

    // 同步到 Supabase
    async function syncToSupabase(data) {
        try {
            const { error } = await supabase
                .from('aitable_events')
                .insert({
                    event_type: 'record_changed',
                    datasheet_id: data.datasheetId,
                    payload: data
                });
            
            if (error) {
                console.error('Supabase 同步失敗:', error);
            } else {
                console.log('✅ 已同步到 Supabase');
            }
        } catch (err) {
            console.error('Supabase 同步錯誤:', err);
        }
    }

    // 同步到 Boost.Space
    async function syncToBoostSpace(data) {
        GM_xmlhttpRequest({
            method: 'POST',
            url: BOOST_WEBHOOK_URL,
            headers: {
                'Content-Type': 'application/json'
            },
            data: JSON.stringify(data),
            onload: function(response) {
                if (response.status === 200) {
                    console.log('✅ 已同步到 Boost.Space');
                } else {
                    console.error('Boost.Space 同步失敗:', response);
                }
            },
            onerror: function(error) {
                console.error('Boost.Space 同步錯誤:', error);
            }
        });
    }

    // 訂閱 Supabase Realtime 更新
    function subscribeToSupabaseUpdates() {
        supabase
            .channel('aitable_events')
            .on('postgres_changes', 
                { event: 'INSERT', schema: 'public', table: 'aitable_events' },
                (payload) => {
                    console.log('📨 收到 Supabase 更新:', payload);
                    // 在此處理反向同步到 AITable
                }
            )
            .subscribe();
    }

    // 初始化
    console.log('🌟 JunAiKey 萬能水晶同步腳本已啟動');
    setupAITableListeners();
    subscribeToSupabaseUpdates();
})();
```

**重要：** 替換以下配置值：
- `YOUR_SUPABASE_URL`
- `YOUR_SUPABASE_ANON_KEY`
- `YOUR_BOOST_SPACE_WEBHOOK_URL`

---

### 🔷 步驟 3：配置 AITable Webhook

#### 3.1 登錄 AITable

訪問 [AITable.ai](https://aitable.ai) 並登錄您的帳戶。

#### 3.2 設置 Webhook

1. 導航到您想要觸發同步的 Datasheet（例如 TaskNodes 或 AgentFlows）
2. 點擊 Datasheet 右上角的「...」菜單
3. 選擇「自動化」或「Webhook」
4. 創建新的 Webhook：
   - **名稱**: JunAiKey Sync
   - **目標 URL**: `https://YOUR_SUPABASE_PROJECT_REF.supabase.co/functions/v1/ingest_aitable_webhook`
   - **觸發條件**: 
     - 當記錄被創建時
     - 當記錄被更新時
     - 當記錄被刪除時
5. 保存 Webhook

#### 3.3 測試 Webhook

在 AITable 中創建或更新一條記錄，然後檢查：
1. Supabase 的 `aitable_events` 表是否有新數據
2. 瀏覽器控制台是否顯示同步成功消息

---

### 🔷 步驟 4：配置 Boost.Space 自動化

#### 4.1 登錄 Boost.Space

訪問 [Boost.Space](https://boost.space) 並登錄您的帳戶。

#### 4.2 創建 Webhook 接收器

1. 在 Boost.Space 中創建新的 Scenario（場景）
2. 添加「Webhooks」模組作為觸發器
3. 選擇「Custom Webhook」
4. 複製生成的 Webhook URL（這就是您的 `BOOST_WEBHOOK_URL`）
5. 配置數據映射：
   - 解析接收到的 JSON payload
   - 映射到您的代理模組字段

#### 4.3 配置代理模組操作

在 Scenario 中添加操作步驟：
1. **條件判斷**: 根據事件類型執行不同操作
2. **創建記錄**: 如果是新數據，在代理模組中創建新記錄
3. **更新記錄**: 如果是更新，修改現有記錄
4. **刪除記錄**: 如果是刪除事件，移除記錄

#### 4.4 測試自動化

1. 觸發一個測試事件（在 AITable 中創建記錄）
2. 檢查 Boost.Space 的執行歷史
3. 驗證代理模組中的數據是否正確同步

---

## 系統架構圖

```
┌─────────────┐       ┌──────────────┐       ┌─────────────┐
│             │       │              │       │             │
│   AITable   │──────▶│   Supabase   │◀─────▶│ Boost.Space │
│  (數據源)    │       │  Edge Func   │       │   (代理模組)  │
│             │       │              │       │             │
└─────────────┘       └──────────────┘       └─────────────┘
       │                      │                      │
       │                      │                      │
       ▼                      ▼                      ▼
┌─────────────────────────────────────────────────────────┐
│              JunAiKey 萬能標籤系統本地服務              │
│           (SQLite DB + Express API + React)            │
└─────────────────────────────────────────────────────────┘
                            │
                            ▼
                    ┌───────────────┐
                    │  StayScript   │
                    │ (UserScript)  │
                    └───────────────┘
```

---

## 故障排除

### 問題 1: Supabase Edge Function 部署失敗

**解決方案**:
```bash
# 檢查 Supabase CLI 版本
supabase --version

# 更新 CLI
npm update -g supabase

# 重新登錄
supabase logout
supabase login
```

### 問題 2: AITable Webhook 未觸發

**檢查項目**:
1. Webhook URL 是否正確
2. Supabase Edge Function 是否正常運行
3. AITable 的觸發條件是否正確設置
4. 檢查 AITable 的 Webhook 日誌

### 問題 3: Boost.Space 未接收數據

**檢查項目**:
1. Webhook URL 是否正確配置在 StayScript 中
2. 瀏覽器控制台是否有錯誤消息
3. Boost.Space Scenario 是否處於啟用狀態
4. 檢查 Boost.Space 的執行歷史

---

## 安全建議

1. **API 密鑰管理**: 
   - 使用環境變量存儲敏感信息
   - 定期輪換 API 密鑰
   - 不要將密鑰提交到版本控制系統

2. **Webhook 驗證**:
   - 在 Edge Function 中驗證 Webhook 簽名
   - 使用 HTTPS 確保數據傳輸安全

3. **權限控制**:
   - 使用 Supabase RLS (Row Level Security) 策略
   - 限制 API 密鑰的權限範圍

---

## 完成確認清單

- [ ] 本地後端服務運行正常 (port 3002)
- [ ] 本地前端應用運行正常 (port 3000)
- [ ] TagPanel 組件顯示正確
- [ ] 標籤的 CRUD 操作功能正常
- [ ] Supabase 專案已創建並配置
- [ ] Edge Function 已部署
- [ ] `aitable_events` 表已創建
- [ ] StayScript 已安裝並配置
- [ ] AITable Webhook 已設置
- [ ] Boost.Space Scenario 已創建
- [ ] 端到端測試通過

---

## 支持與資源

- [JunAiKey 文檔](https://github.com/DingJun1028/junaikey)
- [Supabase 文檔](https://supabase.com/docs)
- [AITable 文檔](https://aitable.ai/help)
- [Boost.Space 文檔](https://docs.boost.space)

---

**祝您成功實現「雙向無礙」體系的「零摩擦終始一如」宏大願景！** 🌟
