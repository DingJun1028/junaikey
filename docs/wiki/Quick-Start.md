# 🚀 JunAiKey 快速開始指南

歡迎使用 JunAiKey！這份指南將幫助您在 5 分鐘內快速上手。

## 📋 前置要求

在開始之前，請確保您的系統已安裝：

- **Node.js** >= 18.0.0
- **npm** >= 8.0.0
- **Git** >= 2.30.0

### 檢查版本

```bash
node --version   # 應該 >= v18.0.0
npm --version    # 應該 >= 8.0.0
git --version    # 應該 >= 2.30.0
```

## 🎯 5 分鐘快速開始

### 步驟 1：克隆倉庫（1 分鐘）

```bash
# 克隆項目
git clone https://github.com/DingJun1028/junaikey.git

# 進入項目目錄
cd junaikey
```

### 步驟 2：安裝依賴（2 分鐘）

```bash
npm install
```

這將安裝所有必要的依賴包。首次安裝可能需要幾分鐘。

### 步驟 3：配置環境（1 分鐘）

```bash
# 複製環境變數範例文件
cp .env.example .env
```

基本功能無需配置即可使用。如需完整功能，請參考[環境配置指南](#-環境配置)。

### 步驟 4：啟動開發服務器（1 分鐘）

```bash
npm run dev
```

您應該會看到類似以下的輸出：

```
  VITE v5.0.0  ready in 1234 ms

  ➜  Local:   http://localhost:3000/
  ➜  Network: use --host to expose
  ➜  press h to show help
```

### 步驟 5：開始使用！

在瀏覽器中打開 http://localhost:3000，您將看到 JunAiKey 的歡迎頁面！

## 🎮 核心功能體驗

### 1. OmniKey 萬能球體

點擊螢幕中央的發光球體，這是您的「歸鄉之錨」：

- **單擊**：返回首頁
- **長按**：打開快捷菜單
- **拖動**：移動位置（僅移動端）

### 2. 元素卡牌系統

在左側邊欄，您可以看到 12 大元素精靈：

1. 🟡 **鋒靈（秩序）** - 燦金色
2. 🟢 **森靈（成長）** - 翡翠綠
3. 🔵 **湧靈（思緒）** - 深海藍
4. 🔴 **焰靈（行動）** - 緋紅色
5. 🟤 **磐靈（穩定）** - 赭石棕

點擊任一卡牌查看詳細信息和解鎖進度。

### 3. 六向同步

進入「同步中心」，體驗一鍵同步到多個平台：

```
首頁 → 同步中心 → 添加平台 → 測試同步
```

## ⚙️ 環境配置

### 基礎配置（可選）

編輯 `.env` 文件：

```env
# 服務器端口（默認: 3000）
PORT=3000

# 環境模式（development/production）
NODE_ENV=development
```

### 完整配置（高級功能）

如果您需要使用完整功能，請配置以下服務：

#### 1. Supabase（數據存儲）

```env
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_key
```

獲取方式：
1. 前往 [Supabase](https://supabase.com/)
2. 創建新項目
3. 在 Settings > API 中找到 URL 和 Key

#### 2. AI 服務（可選）

```env
# Straico AI
VITE_STRAICO_API_KEY=your_straico_key

# OpenAI
VITE_OPENAI_API_KEY=your_openai_key

# Google Gemini
VITE_GEMINI_API_KEY=your_gemini_key
```

#### 3. 同步平台（可選）

```env
# Notion
NOTION_TOKEN=your_notion_token
NOTION_DB_FAVORITES=your_database_id

# Capacities
CAPACITIES_TOKEN=your_capacities_token

# AITable
AITABLE_TOKEN=your_aitable_token
AITABLE_TABLE_ID=your_table_id
```

詳細配置說明請參考 [環境配置文檔](./Environment-Configuration.md)。

## 🧪 驗證安裝

### 運行測試

```bash
npm test
```

您應該看到所有測試通過：

```
 PASS  src/components/Button.test.tsx
 PASS  src/utils/format.test.ts

Test Suites: 2 passed, 2 total
Tests:       10 passed, 10 total
```

### 檢查健康狀態

訪問健康檢查端點：

```bash
curl http://localhost:3000/health
```

應該返回：

```json
{
  "status": "ok",
  "version": "6.6.0",
  "timestamp": "2025-10-16T23:00:00.000Z"
}
```

## 📱 移動端使用

### iOS Safari

JunAiKey 完美支持 iOS Safari：

1. 在 Safari 中打開 http://localhost:3000
2. 點擊分享按鈕
3. 選擇「加入主畫面」
4. 享受原生 App 般的體驗！

### Android Chrome

1. 在 Chrome 中打開網站
2. 點擊菜單（三個點）
3. 選擇「添加到主屏幕」
4. 完成！

## 🔧 常見問題

### Q1: npm install 失敗

**解決方案**：
```bash
# 清理 npm 緩存
npm cache clean --force

# 刪除 node_modules
rm -rf node_modules package-lock.json

# 重新安裝
npm install
```

### Q2: 端口已被占用

**解決方案**：
```bash
# 方法 1：更改端口
PORT=3001 npm run dev

# 方法 2：殺掉占用進程（macOS/Linux）
lsof -ti:3000 | xargs kill -9

# 方法 2：殺掉占用進程（Windows）
netstat -ano | findstr :3000
taskkill /PID <PID> /F
```

### Q3: 找不到模組錯誤

**解決方案**：
```bash
# 確保在項目根目錄
pwd

# 重新安裝依賴
npm install

# 重新構建
npm run build
```

### Q4: TypeScript 類型錯誤

**解決方案**：
```bash
# 清理構建緩存
npm run clean

# 重新構建
npm run build
```

## 📚 下一步

### 深入學習

- 📖 [系統總覽](./System-Overview.md) - 了解 JunAiKey 架構
- 🎮 [六式奧義循環](./Six-Sacred-Arts.md) - 掌握核心概念
- 🃏 [元素卡牌系統](./Element-Card-System.md) - 理解元素機制

### 功能探索

- 🔄 [六向同步指南](./Six-Way-Sync.md) - 設置多平台同步
- 🧠 [AI 代理使用](./AI-Agent-Guide.md) - 使用 AI 功能
- 📊 [數據管理](./Data-Management.md) - 管理您的數據

### 開發參與

- 🛠️ [開發指南](../readme.md) - 開發環境設置
- 🤝 [貢獻指南](./Contributing.md) - 參與項目開發
- 💡 [最佳實踐](../../JUNAIKEY_BEST_PRACTICES.md) - 編碼規範

## 🎓 教程與範例

### 視頻教程（規劃中）
- 🎥 [5 分鐘上手 JunAiKey]()
- 🎥 [元素系統詳解]()
- 🎥 [六向同步設置]()

### 實戰範例
- 📝 [個人知識管理]() - 使用 JunAiKey 管理筆記
- 🎨 [創意工作流]() - 收集和組織靈感
- 👥 [團隊協作]() - 團隊知識共享

## 🆘 獲取幫助

### 社區支援
- 💬 [GitHub Discussions](https://github.com/DingJun1028/junaikey/discussions) - 提問討論
- 🐛 [Issue Tracker](https://github.com/DingJun1028/junaikey/issues) - 報告問題
- 📧 Email: team@junaikey.com

### 實時交流
- 💬 [Discord 社區](https://discord.gg/junaikey) - 即時聊天
- 📱 [Telegram 群組](https://t.me/junaikey) - 中文社區

## 🎉 恭喜！

您已經成功完成 JunAiKey 的快速開始！

現在您可以：
- ✅ 使用 OmniKey 萬能球體
- ✅ 探索元素卡牌系統
- ✅ 體驗六向同步功能
- ✅ 開始您的 JunAiKey 之旅

**下一步**：閱讀[系統總覽](./System-Overview.md)深入了解 JunAiKey 的核心理念！

---

*有任何問題？查看[常見問題](./FAQ.md)或在[討論區](https://github.com/DingJun1028/junaikey/discussions)提問*
