# JunAiKey MCP 使用指南 (Usage Guide)

## 什麼是 MCP？(What is MCP?)

MCP (Model Context Protocol) 是一個標準協議，用於讓 AI 模型能夠與應用程式無縫溝通。本專案整合了 MCP，提供 JunAiKey 奧義系統的工具介面。

MCP (Model Context Protocol) is a standard protocol that enables seamless communication between AI models and applications. This project integrates MCP to provide tool interfaces for the JunAiKey Esoteric System.

## 快速開始 (Quick Start)

### 1. 安裝相依套件 (Install Dependencies)

```bash
npm install
```

### 2. 建置專案 (Build Project)

```bash
npm run build
```

### 3. 運行 MCP 伺服器 (Run MCP Server)

```bash
npm run mcp-server
```

### 4. 運行 MCP 客戶端範例 (Run MCP Client Example)

```bash
npm run mcp-client
```

## 可用的工具 (Available Tools)

### 1. junaikey_analyze

分析文本並應用 JunAiKey 奧義系統原理。

**參數 (Parameters):**
- `text` (string): 要分析的文本

**範例 (Example):**
```typescript
{
  name: "junaikey_analyze",
  arguments: {
    text: "JunAiKey 奧義系統測試"
  }
}
```

### 2. junaikey_transform

使用 JunAiKey 原理轉換數據（編碼/解碼）。

**參數 (Parameters):**
- `input` (string): 要轉換的輸入數據
- `mode` (string): 轉換模式 ("encode" 或 "decode")

**範例 (Example):**
```typescript
// 編碼 (Encode)
{
  name: "junaikey_transform",
  arguments: {
    input: "Hello from JunAiKey!",
    mode: "encode"
  }
}

// 解碼 (Decode)
{
  name: "junaikey_transform",
  arguments: {
    input: "SGVsbG8gZnJvbSBKdW5BaUtleSE=",
    mode: "decode"
  }
}
```

## 在 AI 助手中使用 (Using with AI Assistants)

### Claude Desktop 設定 (Claude Desktop Configuration)

1. 編輯 Claude Desktop 配置文件：
   - macOS: `~/Library/Application Support/Claude/claude_desktop_config.json`
   - Windows: `%APPDATA%\Claude\claude_desktop_config.json`

2. 添加 JunAiKey MCP 伺服器：

```json
{
  "mcpServers": {
    "junaikey": {
      "command": "node",
      "args": ["/path/to/junaikey/dist/mcpServer.js"]
    }
  }
}
```

3. 重啟 Claude Desktop

### GitHub Copilot 設定 (GitHub Copilot Configuration)

使用提供的 `mcp-config.json` 文件配置 GitHub Copilot。

## 開發 (Development)

### 添加新工具 (Adding New Tools)

1. 在 `src/mcpServer.ts` 的 `ListToolsRequestSchema` 處理器中添加工具定義
2. 在 `CallToolRequestSchema` 處理器中添加工具實作
3. 重新建置專案：`npm run build`

### 測試 (Testing)

運行客戶端範例來測試伺服器功能：

```bash
npm run mcp-client
```

## 技術架構 (Technical Architecture)

```
┌─────────────────┐
│   AI Assistant  │
│  (Claude/GPT)   │
└────────┬────────┘
         │
         │ MCP Protocol
         │
┌────────▼────────┐
│  JunAiKey MCP   │
│     Server      │
└────────┬────────┘
         │
         │ Tool Calls
         │
┌────────▼────────┐
│   JunAiKey      │
│   Functions     │
└─────────────────┘
```

## 專案結構 (Project Structure)

```
junaikey/
├── src/
│   ├── index.ts          # 主入口點
│   ├── mcpServer.ts      # MCP 伺服器實作
│   └── mcpClient.ts      # MCP 客戶端範例
├── dist/                 # 編譯後的 JavaScript
├── mcp-config.json       # MCP 配置範例
├── package.json          # 專案配置
└── tsconfig.json         # TypeScript 配置
```

## 進階使用 (Advanced Usage)

### 自訂傳輸層 (Custom Transport)

除了 stdio，您也可以使用其他傳輸層：

```typescript
import { SSEServerTransport } from "@modelcontextprotocol/sdk/server/sse.js";

// 使用 SSE 傳輸
const transport = new SSEServerTransport("/messages", res);
await server.connect(transport);
```

### 添加資源提供者 (Adding Resource Providers)

```typescript
server.setRequestHandler(ListResourcesRequestSchema, async () => {
  return {
    resources: [
      {
        uri: "junaikey://data/example",
        name: "Example Data",
        mimeType: "application/json"
      }
    ]
  };
});
```

## 疑難排解 (Troubleshooting)

### 伺服器無法啟動 (Server Won't Start)

1. 確認已安裝所有相依套件：`npm install`
2. 確認已建置專案：`npm run build`
3. 檢查 Node.js 版本 (需要 v18 或更高)

### AI 助手無法連接 (AI Assistant Can't Connect)

1. 確認 MCP 伺服器正在運行
2. 檢查配置文件路徑是否正確
3. 查看伺服器日誌輸出

## 授權 (License)

MIT License - 詳見 `LICENSE` 文件
