# JunAiKey MCP 快速參考 (Quick Reference)

## 🎯 專案概述 (Project Overview)

JunAiKey 奧義系統現已整合 **Model Context Protocol (MCP)**，提供 Node.js TypeScript SDK，支援三種整合方式：

1. **依賴庫 (Dependency Library)** - 作為 npm 套件使用
2. **源碼整合 (Source Integration)** - Git submodule 或直接複製
3. **MCP 伺服器/客戶端 (MCP Server/Client)** - 獨立運行的服務

## ⚡ 快速命令 (Quick Commands)

```bash
# 安裝 (Install)
npm install

# 建置 (Build)
npm run build

# 運行 MCP 伺服器 (Run MCP Server)
npm run mcp-server

# 運行範例客戶端 (Run Example Client)
npm run mcp-client

# 開發模式 (Development Mode)
npm run dev
```

## 🛠️ 可用工具 (Available Tools)

### 1. junaikey_analyze
```json
{
  "name": "junaikey_analyze",
  "arguments": {
    "text": "要分析的文本"
  }
}
```

### 2. junaikey_transform
```json
{
  "name": "junaikey_transform",
  "arguments": {
    "input": "要轉換的數據",
    "mode": "encode"  // or "decode"
  }
}
```

## 📁 核心檔案 (Core Files)

| 檔案 | 說明 |
|------|------|
| `src/mcpServer.ts` | MCP 伺服器實作 |
| `src/mcpClient.ts` | MCP 客戶端範例 |
| `src/index.ts` | 主入口點 |
| `package.json` | 專案配置 |
| `tsconfig.json` | TypeScript 配置 |
| `mcp-config.json` | MCP 配置範例 |

## 🔗 在 AI 助手中使用 (Using with AI Assistants)

### Claude Desktop
編輯 `claude_desktop_config.json`:
```json
{
  "mcpServers": {
    "junaikey": {
      "command": "node",
      "args": ["/absolute/path/to/junaikey/dist/mcpServer.js"]
    }
  }
}
```

### GitHub Copilot
使用專案中的 `mcp-config.json` 檔案。

## 💡 使用範例 (Usage Examples)

### TypeScript
```typescript
import { Client } from "@modelcontextprotocol/sdk/client/index.js";

const client = new Client(
  { name: "my-app", version: "1.0.0" },
  { capabilities: {} }
);

// Connect and use tools
const result = await client.callTool({
  name: "junaikey_analyze",
  arguments: { text: "測試文本" }
});
```

### JavaScript
```javascript
const { Client } = require("@modelcontextprotocol/sdk/client/index.js");

async function main() {
  const client = new Client(
    { name: "my-app", version: "1.0.0" },
    { capabilities: {} }
  );
  // ... use client
}
```

## 📚 文檔連結 (Documentation Links)

- **詳細使用指南**: `USAGE.md`
- **整合範例**: `INTEGRATION.md`
- **專案說明**: `README.md`

## 🔧 技術棧 (Tech Stack)

- **Runtime**: Node.js v18+
- **Language**: TypeScript 5.3+
- **Protocol**: Model Context Protocol (MCP)
- **SDK**: @modelcontextprotocol/sdk v1.0.4+

## 🆘 常見問題 (Troubleshooting)

### Q: 伺服器無法啟動
```bash
# 確認相依套件已安裝
npm install

# 重新建置
npm run build
```

### Q: 型別錯誤
```bash
# 清除並重建
rm -rf dist node_modules
npm install
npm run build
```

### Q: 找不到模組
```bash
# 檢查 Node.js 版本
node --version  # 需要 v18 或更高

# 確認在正確目錄
pwd  # 應該在專案根目錄
```

## 📄 授權 (License)

MIT License - 詳見 `LICENSE` 檔案

---

**需要協助？**
- 查看 `USAGE.md` 取得詳細使用說明
- 查看 `INTEGRATION.md` 取得整合範例
- 查看 GitHub Issues 或建立新 Issue
