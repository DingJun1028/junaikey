# 📚 Jun.AI.Key # API 文件庫

> 統一管理 JunAiKey 專案的 API 金鑰與腳本的中央管理平台

---

## 📊 API 平台快速對照總表

| 平台名稱 | 主要功能/簡介 | BaseURL | End Point | 保險庫 | 認證方式 | 金鑰取得 | 官方文件 | 熱門相似服務 | 環境變數建議 |
| :---------------- | :-------------------------------- | :-------------------------------- | :-------- | :-- | :---------------------- | :----------------- | :------------------------------------------------------------------- | :----------------- | :------------------------------- |
| **Jun.AI.Key** | 本專案，API 金鑰與腳本的中央管理平台 | N/A (本地應用) | | | 讀取 .env | N/A | N/A | N/A | (管理所有金鑰) |
| **OpenAI** | 主流 LLM (GPT-4o)、語音、圖像生成 | `AITable.ai` | | | Bearer Token | OpenAI 平台後台 | [OpenAI API 文件](https://platform.openai.com/docs/api-reference) | Gemini, Claude | `OPENAI_API_KEY` |
| **Notion** | 整合式筆記、資料庫、專案管理、輕量級 CMS | `https://api.notion.com/v1/` | | | Bearer Token | 建立內部整合 | [Notion API 文件](https://developers.notion.com/) | Coda, Asana | `NOTION_API_KEY` |
| **AITable.ai** | AI 原生線上資料庫，視覺化工作流 (Airtable + AI) | `https://api.aitable.ai/v1/` | | | Bearer Token | 用戶中心 > 開發者 | [AITable.ai API 文件](https://developers.aitable.com/api/introduction) | Airtable, Supabase | `AITABLE_API_KEY` |
| **Supabase** | 開源 BaaS，Postgres 資料庫即服務 | `https://{proj}.supabase.co` | | | `anon` & `service_role` | 專案設定 > API | [Supabase API 文件](https://supabase.com/docs) | Firebase, Appwrite | `SUPABASE_ANON_KEY` |
| **Straico AI** | 聚合型 LLM 平台，簡化多模型調用 | `https://api.straico.com/v0/` | | | Bearer Token | Straico 後台申請 | [Straico AI API 文件](https://straico.com/docs) | - | `STRAICO_API_KEY` |
| **GitHub** | 代碼託管、CI/CD、Webhook 自動化 | `https://api.github.com/` | | | Personal Access Token | Developer settings | [GitHub API 文件](https://docs.github.com/rest) | GitLab, Bitbucket | `GITHUB_TOKEN` |
| **Google Cloud** | 雲端服務全家桶 (AI, 存儲, 函數) | 各服務不同 | | | Service Account, OAuth | GCP 控制台 | [Google Cloud API 文件](https://cloud.google.com/apis) | AWS, Azure | `GOOGLE_APPLICATION_CREDENTIALS` |
| **Boost.space** | 無代碼自動化，模組化資料同步 (iPaaS) | `https://api.boost.space/v1/` | | | Bearer Token | Dashboard 開通 | [Boost.space API 文件](https://developers.boost.space/) | Zapier, Make, n8n | `BOOST_API_KEY` |
| **Taskade** | 團隊協作、AI 任務與工作流管理 | `https://openapi.taskade.com/v1/` | | | Bearer Token | Taskade 後台設定 | [Taskade API 文件](https://developers.taskade.com/v1/introduction) | Notion, Trello | `TASKADE_API_KEY` |
| **Capacities** | 新一代物件導向筆記、第二大腦 | (尚未公開) | | | Capacities API Key | 官方邀請/後台 | [Capacities API 文件](https://capacities.io/help) | Obsidian, Mem.ai | `CAPACITIES_API_KEY` |
| **Mymemoai** | AI 驅動的個人筆記與知識管理 | (尚無公開資訊) | | | API Key (推測) | 使用者後台 (推測) | (尚無公開文件) | Mem.ai, Capacities | `MYMEMOAI_API_KEY` |
| **InfoFlow** | OA 協同辦公、內部流程自動化 | `http://{your_ip}:{port}/` | | | 無驗證或 Token | 本地部署/管理後台 | 本地 Swagger 文檔 | 致遠 G6, 泛微 OA | (依需求自訂) |
| **Scripting App** | macOS 本地腳本自動化工具 (JavaScript) | 本地文件系統 | | | 本地用戶權限 | N/A | [Scripting App 文件](https://scripting.app/docs/) | Alfred, Raycast | (讀取 .env) |

---

## 🔑 專案 `.env` 範本

請將以下內容複製到您專案根目錄的 `.env` 檔案中，並填入您自己的金鑰。

```text
# 專案 .env 範本
# 請將 "your_..." 替換成你自己的金鑰或數值

# --- 核心基礎設施 (Supabase) ---
SUPABASE_URL=https://adsngsbgdrtvgyfjozuk.supabase.co
SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFkc25nc2JnZHJ0dmd5ZmpvenVrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDg2NzE3MDMsImV4cCI6MjA2NDI0NzcwM30.6_gtclPe78pxz9OoZCHzBX-5qKTN8ggNE3CiJAdikMs
SUPABASE_SERVICE_ROLE_KEY=pvL6uNwXQnVPVkrefaYyUfTFRPW_sY-2Hk4oiJ5aekU
# --- Supabase DB 連接（若需直接用資料庫層接入） ---
SUPABASE_DB_HOST=db.adsngsbgdrtvgyfjozuk.supabase.co
SUPABASE_DB_PORT=5432
SUPABASE_DB_NAME=postgres
SUPABASE_DB_USER=postgres
SUPABASE_DB_PASSWORD=A127178099S1421680s
# --- 主要 AI 服務 (OpenAI & Straico) ---
OPENAI_API_KEY=sk-your_openai_api_key_here
STRAICO_API_KEY=kD-your_straico_api_key_here
STRAICO_BASE_URL=https://api.straico.com/v0/

# --- 筆記、資料庫與知識管理 ---
NOTION_API_KEY=secret_your_notion_integration_token_here
AITABLE_API_KEY=usk_your_aitable_api_key_here
CAPACITIES_API_KEY=jR8fwACIt0sj1CJ0WVHvcUZxS6WyRLmPzRrKvye143y9i6iIgZ
CAPACITIES_USER_ID=6psPaTwAVtmF3tqTFHGI
MYMEMOAI_API_KEY=your_mymemoai_api_key_here

# --- 自動化與開發工具 ---
BOOST_API_KEY=your_boost_space_api_key_here
GITHUB_TOKEN=ghp_your_personal_access_token_here
TASKADE_API_KEY=your_taskade_api_key_here

# --- 其他雲端服務 (Google Cloud) ---
# 此為檔案路徑，指向你的 service account JSON 金鑰檔
GOOGLE_APPLICATION_CREDENTIALS=/path/to/your/gcp-credentials.json

# --- Capacities Webhook ---
CAPACITIES_WEBHOOK_URL=https://hook.integrator.boost.space/uwxl26
```

---

## 🚀 各 App 詳細請求與使用場景範例

### **Jun.AI.Key**
- **請求範例**：N/A (不適用)
- **使用場景**：作為一個安全的「密鑰保險庫」。所有應用程式和腳本都從這個唯一的 `.env` 檔案讀取配置，而不是將金鑰分散或硬編碼在各處。

### **OpenAI**
- **請求範例 (curl)**：
```bash
curl https://api.openai.com/v1/chat/completions \
  -H "Authorization: Bearer $OPENAI_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{"model": "gpt-4o", "messages": [{"role": "user", "content": "用三點總結相對論的核心概念。"}]}'
```
- **使用場景**：智能客服摘要機器人。監聽客服對話，自動生成包含「客戶問題、解決方案、客戶情緒」的摘要。

### **Notion**
- **請求範例 (curl)**：
```bash
curl -X POST 'https://api.notion.com/v1/databases/{your_database_id}/query' \
  -H 'Authorization: Bearer $NOTION_API_KEY' \
  -H 'Notion-Version: 2022-06-28'
```
- **使用場景**：個人作品集網站的後端。將 Notion 作為輕量級 CMS，網站透過 API 讀取 Notion 資料庫內容。

### **AITable.ai**
- **請求範例 (curl)**：
```bash
curl -X POST "https://api.aitable.ai/v1/datasheets/{your_datasheet_id}/records" \
  -H "Authorization: Bearer $AITABLE_API_KEY" \
  -H "Content-Type: application/json" \
  --data '{"records": [{"fields": {"Task Name": "Prepare Q3 Report", "Status": "To Do"}}]}'
```
- **使用場景**：智能用戶回饋管道。自動對回饋內容進行情感分析、打標籤並提取關鍵詞。

### **Supabase**
- **請求範例 (curl)**：
```bash
curl "https://$SUPABASE_URL/rest/v1/profiles?select=*" \
  -H "apikey: $SUPABASE_ANON_KEY" \
  -H "Authorization: Bearer $SUPABASE_ANON_KEY"
```
- **使用場景**：獨立開發者專案的全能後端。處理用戶認證、儲存用戶資料、管理文件上傳。

### **Straico AI**
- **請求範例 (curl)**：
```bash
curl https://api.straico.com/v0/completions \
  -H "Authorization: Bearer $STRAICO_API_KEY" \
  -H 'Content-Type: application/json' \
  -d '{"model": "claude-3-sonnet-20240229", "prompt": "你好，克勞德！"}'
```
- **使用場景**：多模型 AI 遊樂場。用戶可選擇不同 LLM，後端統一透過 Straico API 發送請求。

### **GitHub**
- **請求範例 (curl)**：
```bash
curl -L -X POST https://api.github.com/repos/{owner}/{repo}/issues \
  -H "Accept: application/vnd.github+json" \
  -H "Authorization: Bearer $GITHUB_TOKEN" \
  -d '{"title":"自動化任務：更新文檔","body":"API 偵測到新功能上線，請更新相關文檔。","labels":["documentation"]}'
```
- **使用場景**：CI/CD 流程與專案管理的聯動。自動建立 Bug Issue 並指派給開發團隊。

### **Taskade**
- **請求範例 (curl)**：
```bash
curl -X GET "https://openapi.taskade.com/v1/workspaces/{your_workspace_id}/projects" \
  -H "Authorization: Bearer $TASKADE_API_KEY"
```
- **使用場景**：自動化新客戶入職流程。從模板創建標準任務並 @ 相關團隊成員。

### **Boost.space**
- **請求範例 (curl)**：
```bash
curl https://api.boost.space/v1/modules \
  -H "Authorization: Bearer $BOOST_API_KEY"
```
- **使用場景**：跨系統數據同步中心。自動將 AITable.ai 中的銷售線索同步到 Mailchimp 和 QuickBooks。

### **Google Cloud**
- **請求範例 (curl)**：
```bash
curl -X POST -H "Authorization: Bearer $(gcloud auth print-access-token)" \
  -H "Content-Type: application/json; charset=utf-8" \
  "https://vision.googleapis.com/v1/images:annotate" \
  -d '{"requests": [{"image": {"source": {"imageUri": "https://.../image.jpg"}}, "features": [{"type": "LABEL_DETECTION"}]}]}'
```
- **使用場景**：發票與收據自動化處理。OCR 辨識圖片中的店家名稱、金額、日期等資訊。

### **Scripting App**
- **請求範例 (JavaScript)**：
```javascript
const notionKey = process.env.NOTION_API_KEY;
const dbId = "your_database_id";

let response = await fetch(`https://api.notion.com/v1/databases/${dbId}/query`, {
  method: 'POST',
  headers: {
    'Authorization': `Bearer ${notionKey}`,
    'Notion-Version': '2022-06-28'
  }
});
let data = await response.json();
let taskCount = data.results.length;

await applescript(`display notification "您今天在 Notion 中有 ${taskCount} 項任務。" with title "每日任務提醒"`);
```
- **使用場景**：個人化每日簡報。整合行程、任務、天氣資訊以系統通知推送。

---

## 🔗 API Endpoint 對照表

| 平台名稱 | 主要功能 | BaseURL（如適用） | **常用 Endpoint** | 認證方式/密鑰 | 備註說明 |
| :---------------- | :------ | :------------------------------------ | :------------------------------- | :----------------- | :---------------------------------------------- |
| **Jun.AI.Key** | 金鑰管理 | N/A (本地應用) | N/A | 讀取 .env | 本地管理密鑰的工具，無服務 API endpoint |
| **OpenAI** | LLM、AI | `https://api.openai.com/v1/` | `/chat/completions` | Bearer Token | 也支援 `/completions`, `/embeddings`, `/audio/...` |
| **Notion** | 筆記/資料庫 | `https://api.notion.com/v1/` | `/databases/{id}/query` | Bearer Token | 亦有 `/pages` (CRUD 頁面), `/blocks`, `/search` |
| **AITable.ai** | AI 資料庫 | `https://api.aitable.ai/v1/` | `/datasheets/{id}/records` | Bearer Token | 各 datasheet（表格）有獨立 id |
| **Supabase** | BaaS | `https://adsngsbgdrtvgyfjozuk.supabase.co/rest/v1/` | `/{table_name}` 例：`/profiles` | anon/service_role | RESTful 路徑直接對應資料表名 |
| **Straico AI** | LLM 聚合 | `https://api.straico.com/v0/` | `/completions` | Bearer Token | 依模型設定不同 prompt，路徑設計與 OpenAI 類似 |
| **GitHub** | 代碼管理 | `https://api.github.com` | `/repos/{owner}/{repo}/issues` | Personal Token | 還有 `/pulls`, `/releases`,... |
| **Google Cloud** | 雲端服務 | 各服務皆不同 | 例：`/v1/images:annotate` (Vision) | OAuth/token | 如 NLP 用 `/v1/documents:analyzeEntities` 等 |
| **Boost.space** | 自動化整合 | `https://api.boost.space/v1/` | `/modules` | Bearer Token | 其餘模組請參官方 swagger |
| **Taskade** | 任務協作 | `https://openapi.taskade.com/v1/` | `/workspaces/{id}/projects` | Bearer Token | 也可操作 `/tasks`, `/users` 等 |
| **Capacities** | 筆記第二大腦 | (尚未公開) | / | Capacities API Key | API 還未公開，endpoint 未知 |
| **Mymemoai** | AI 筆記知識 | (尚未公開) | / | API Key(推測) | 未公開文件/入口 |
| **InfoFlow/OA** | 流程辦公 | `http://{your_ip}:{port}/` | 視系統自訂 | 無驗證/Token | Swagger 文檔為主 |
| **Scripting App** | 本地腳本自動化 | 本地 FS | 本地調用，不對外 | 本地權限 | 和雲 API 不同，只調用本地腳本 |

---

## 🔒 安全與流程最佳實踐

### 1. 密鑰管理原則
- 所有金鑰僅儲存在 `.env`，嚴禁硬編碼與 public repo
- production/deploy 時，環境變數自動注入，不上傳本機金鑰
- 高權限 Service key 只用於伺服器，不可傳至用戶端、公開端
- 不同平台、不同行為應各用獨立 key（不應共用 token）

### 2. 定期維護
- 定期密鑰 Rotate，權限異動及時審查
- .env.example 版本與 onboarding 文檔須同步維護
- 團隊協作，密鑰擁有權設專人負責，流動/異常即時回收

### 3. 部署安全
- CI/CD 配置使用部署商環境變數功能
- 不讓明文密鑰出現於程式提交紀錄
- 生管單一檔案，降低維運風險

---

## ❓ 常見疑問釋疑

### Q: 沒用到的金鑰可以不申請嗎？
**A**: 可不申請；但只要串接就必須調用並安全管理，不可與他人/其他專案共用。

### Q: 單一金鑰外洩風險？
**A**: 立即註銷並更換，平台多有重置註銷流程；嚴禁多系統共用同一密鑰。

### Q: 如何做權限分區？
**A**: 用 service 角色與 anon 角色分開配置，根據端點限制最小權限原則。

### Q: CI/CD 如何配置？
**A**: 使用部署商環境變數功能，不讓明文密鑰出現於程式提交紀錄。

---

## 📋 團隊交付提醒

### 1. 文件管理
- 本 `.env` 統一版只交付給可信成員，並確保每一次的密鑰整理、專案移交同步更新
- 建議每個新上線服務都增加一欄與用途說明，提升日後追蹤與維護效率

### 2. 技術交接
- 隨時增刪新服務欄位，團隊所有分支/新成員均需參照
- 以本文件及 `.env` 為專案 API 密鑰管理唯一標準版

### 3. 風險控管
- 生管單一檔案，降低維運風險，可作為審查、技術支援和安全審閱依據
- 如將專案交給新團隊/外部廠商，僅需本交付包與實體私密金鑰，即可完全銜接所有 API 平台串接

---

## 🎯 最佳交付建議

### 核心交付包
- **JUNAIKEY_API_LIBRARY.md** (本文件)
- **.env** (包含實際金鑰的配置檔)
- **.env.example** (範本檔，用於新環境設置)

### 交付流程
1. **準備階段**：整理所有 API 金鑰，填入 `.env` 檔案
2. **文檔化**：更新 API 文件庫，包含所有平台配置和使用範例
3. **團隊分享**：將交付包分享給相關成員，確保密鑰安全
4. **持續維護**：定期更新金鑰和文檔，確保資訊最新

### 安全檢查清單
- [ ] 所有金鑰已填入 `.env` 檔案
- [ ] `.env` 已加入 `.gitignore`，不會上傳到版本控制
- [ ] 已建立 `.env.example` 範本
- [ ] 團隊成員已了解安全最佳實踐
- [ ] 定期密鑰更換機制已建立

---

## 🚀 快速開始指南

### 1. 環境設置
```bash
# 複製環境範本
cp .env.example .env

# 編輯 .env 檔案，填入您的 API 金鑰
nano .env
```

### 2. 導入環境變數
```bash
# 在專案根目錄執行
export $(cat .env | xargs)
```

### 3. 測試連接
```bash
# 測試 OpenAI 連接
curl -X POST "https://api.openai.com/v1/chat/completions" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $OPENAI_API_KEY" \
  -d '{"model": "gpt-4o", "messages": [{"role": "user", "content": "Hello"}]}'
```

---

## 📞 技術支援

### 文件資源
- **官方文件**：各平台 API 文件連結請參考上表
- **JunAiKey 文件**：請參考 `README.md` 和 `SYSTEM_MANIFEST.md`
- **最佳實踐**：請參考 `JUNAIKEY_BEST_PRACTICES.md`

### 問題回報
- **API 連接問題**：檢查金鑰是否正確，網路連接是否正常
- **權限問題**：確認 API 金鑰權限是否足夠
- **功能問題**：參考官方文件或技術支援

### 連絡方式
- **GitHub Issues**：在專案倉庫建立 Issue
- **技術社群**：加入相關技術社群討論
- **官方支援**：聯繫各平台官方技術支援

---

## 📝 更新日誌

### v1.0.0 (2024-10-06)
- 初始版本發布
- 包含 13 個主要 API 平台的配置文件
- 提供完整的 `.env` 範本和使用範例
- 建立安全最佳實踐指南

### 計畫中的更新
- [ ] 新增更多 API 平台支援
- [ ] 自動化金鑰管理腳本
- [ ] 整合測試範例
- [ ] 多環境配置支援

---

**🎯 最終提醒**：本文件是 JunAiKey 專案 API 管理的核心文檔，請確保團隊成員都能遵循其中的指導方針，確保專案的安全性和可維護性。
