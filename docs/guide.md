# 🚀 Junaikey TypeScript + Markdown 開發工具鏈使用指南

## 📋 目錄

1. [專案介紹](#專案介紹)
2. [快速開始](#快速開始)
3. [環境設置](#環境設置)
4. [專案結構](#專案結構)
5. [開發工作流](#開發工作流)
6. [TypeScript 開發](#typescript-開發)
7. [Markdown 開發](#markdown-開發)
8. [偵錯與測試](#偵錯與測試)
9. [代碼品質檢查](#代碼品質檢查)
10. [最佳實踐](#最佳實踐)
11. [常見問題](#常見問題)
12. [進階功能](#進階功能)

## 🎯 專案介紹

這是一個完整的 VS Code 工作區，專為 TypeScript 和 Markdown 開發設計，提供了一鍵執行、偵錯、預覽和自動檢查的完整工具鏈。

### ✨ 主要特性

- 📝 **即時 Markdown 預覽** - 支援圖表、公式、幻燈片
- 🔧 **TypeScript 編譯與偵錯** - 完整的 TypeScript 開發環境
- 🧪 **自動化測試** - Jest 測試框架整合
- 🔍 **代碼品質檢查** - ESLint + Prettier + Markdownlint
- ⚡ **熱重載開發** - ts-node-dev 支援
- 📱 **跨平台支援** - 支援 iOS 和瀏覽器預覽

## 🚀 快速開始

### 1. 安裝依賴

```bash
npm install
```

### 2. 建立專案

```bash
npm run build
```

### 3. 運行範例

```bash
npm start
```

### 4. 開始開發

```bash
# 開啟熱重載開發模式
npm run watch

# 或使用 VS Code 任務
# Ctrl+Shift+B 執行構建
# F5 開始偵錯
```

## 🔧 環境設置

### 必裝 VS Code 插件

| 插件 | 功能 |
|------|------|
| **Markdown Preview Enhanced** | 即時 Markdown 預覽，支援圖表、公式、幻燈片 |
| **Markdownlint** | Markdown 語法檢查，支持 CI/CD |
| **ESLint** | TypeScript 語法檢查與格式化 |
| **Prettier - Code Formatter** | 自動格式化 TS/JS/MD 文件 |
| **Code Runner** | 支援一鍵執行 TS/JS/MD 片段 |

### 推薦插件

| 插件 | 功能 |
|------|------|
| **TypeScript Importer** | 自動導入 TypeScript 模組 |
| **Jest** | Jest 測試框架支援 |
| **GitLens** | Git 增強功能 |

## 📁 專案結構

```
project-root/
├─ src/                    # TypeScript 源碼
│   ├─ index.ts           # 主程式入口
│   ├─ utils.ts           # 工具函式庫
│   ├─ test/              # 測試文件
│   │   └─ setup.ts       # 測試設置
│   └─ ...                # 其他源碼
├─ docs/                  # Markdown 文件
│   ├─ guide.md           # 使用指南
│   └─ readme.md          # 專案說明
├─ dist/                  # TypeScript 編譯輸出
├─ .vscode/               # VS Code 配置
│   ├─ launch.json        # 偵錯設定
│   └─ tasks.json         # 自動化任務
├─ node_modules/          # 依賴包
├─ coverage/              # 測試覆蓋率報告
├─ .gitignore            # Git 忽略檔案
├─ package.json          # 專案配置
├─ tsconfig.json         # TypeScript 設定
├─ jest.config.js        # Jest 測試配置
├─ .eslintrc.json        # ESLint 設定
├─ .prettierrc          # Prettier 設定
└─ .markdownlint.json    # Markdown 檢查設定
```

## 🔄 開發工作流

### 基本流程

1. **編寫 TypeScript** → `src/index.ts`
2. **編寫 Markdown 文件** → `docs/*.md`
3. **一鍵執行 VS Code 任務** → `Ctrl+Shift+B`
4. **偵錯** → `F5` 開始偵錯
5. **即時預覽** → `Ctrl+Shift+V`
6. **快速執行** → `Code Runner` 或 `ts-node-dev`

### 快捷鍵

| 功能 | 快捷鍵 |
|------|--------|
| 執行任務 | `Ctrl+Shift+B` |
| 開始偵錯 | `F5` |
| 預覽 Markdown | `Ctrl+Shift+V` |
| 格式化代碼 | `Shift+Alt+F` |
| 運行測試 | `Ctrl+Shift+T` |

## 💻 TypeScript 開發

### 編譯設定

`tsconfig.json` 提供了完整的 TypeScript 編譯設定：

```json
{
  "compilerOptions": {
    "target": "ES2022",
    "module": "commonjs",
    "outDir": "./dist",
    "strict": true,
    "esModuleInterop": true,
    "sourceMap": true
  }
}
```

### 偵錯配置

在 `src/index.ts` 中設置斷點，然後按 `F5` 開始偵錯：

```typescript
function debugExample() {
  const result = calculateSomething(); // 在這裡設置斷點
  console.log(result);
}
```

### 熱重載開發

使用 `ts-node-dev` 進行熱重載開發：

```bash
npm run watch
# 或
ts-node-dev src/index.ts
```

## 📝 Markdown 開發

### 即時預覽

使用 `Markdown Preview Enhanced` 插件：

1. 打開 `docs/guide.md`
2. 按 `Ctrl+Shift+V` 或右鍵選擇 `Open Preview`
3. 支援以下功能：
   - 📊 圖表 (mermaid, PlantUML)
   - 🧮 數學公式 (LaTeX)
   - 🎨 語法高亮
   - 📱 響應式預覽

### Markdown 語法檢查

`markdownlint` 會自動檢查 Markdown 語法：

```bash
npm run lint:md
```

### 導出功能

使用 `Markdown Preview Enhanced` 導出功能：

1. 點擊預覽面板右上角菜單
2. 選擇導出格式 (HTML, PDF, Word, 等)
3. 自定義樣式和配置

## 🐛 偵錯與測試

### VS Code 偵錯

1. 在 `src/index.ts` 中設置斷點
2. 按 `F5` 選擇 "Launch TS"
3. 使用調試控制台：
   - 變數監控
   - 堆疊追蹤
   - 即時輸出

### Jest 測試

#### 運行測試

```bash
npm test
```

#### 測試覆蓋率

```bash
npm run test -- --coverage
```

#### 測試文件範例

```typescript
// src/utils.test.ts
import { Calculator } from './utils';

describe('Calculator', () => {
  test('should add two numbers', () => {
    const calc = new Calculator();
    expect(calc.add(1, 2)).toBe(3);
  });
});
```

### 自動化測試任務

在 `.vscode/tasks.json` 中配置：

```json
{
  "label": "Run Tests",
  "type": "shell",
  "command": "npm test",
  "group": "test"
}
```

## 🔍 代碼品質檢查

### ESLint

```bash
npm run lint:ts
```

### Prettier

```bash
npx prettier --write .
```

### Markdownlint

```bash
npm run lint:md
```

### 統一檢查

```bash
npm run lint
```

## 📋 最佳實踐

### TypeScript 最佳實踐

1. **類型安全** - 始終使用類型註解
2. **嚴格模式** - 啟用所有嚴格檢查
3. **錯誤處理** - 正確使用 try-catch
4. **代碼組織** - 使用模組化設計
5. **文檔註解** - 為所有公開 API 添加 JSDoc

### Markdown 最佳實踐

1. **結構化** - 使用層級標題
2. **一致性** - 統一的語法風格
3. **可讀性** - 適當的段落和列表
4. **圖片** - 使用相對路徑
5. **連結** - 使用描述性的連結文字

### 版本控制

1. **提交前檢查** - 執行 `npm run lint`
2. **提交訊息** - 使用清晰的提交訊息
3. **分支管理** - 使用功能分支
4. **代碼審查** - 維護代碼品質

## ❓ 常見問題

### Q: 如何解決 TypeScript 編譯錯誤？

A: 檢查 `tsconfig.json` 設定，確保所有依賴都已安裝，並查看錯誤訊息進行修正。

### Q: Markdown 預覽不顯示圖表？

A: 確保已安裝 `Markdown Preview Enhanced` 插件，並檢查圖表語法是否正確。

### Q: 如何自訂 ESLint 規則？

A: 修改 `.eslintrc.json` 文件，添加或修改規則配置。

### Q: 測試失敗如何調試？

A: 使用 `console.log` 或 VS Code 的調試工具，檢查測試失敗的原因。

## 🚀 進階功能

### CI/CD 整合

#### GitHub Actions

```yaml
# .github/workflows/ci.yml
name: CI
on: [push, pull_request]
jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
      - run: npm ci
      - run: npm run lint
      - run: npm test
```

#### 自動化部署

```bash
# package.json
{
  "scripts": {
    "deploy": "npm run build && gh-pages -d dist"
  }
}
```

### 自動化腳本

```bash
# 創建新的 TypeScript 文件
echo 'export function hello() { console.log("Hello World!"); }' > src/new-file.ts

# 檢查所有文件
npm run lint && npm test

# 清理構建文件
rm -rf dist coverage
```

### 擴展功能

#### 添加新的工具類

```typescript
// src/tools/stringUtils.ts
export class StringUtils {
  static capitalize(str: string): string {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }
}
```

#### 自動化文檔生成

```bash
# 安裝文檔生成工具
npm install -D typedoc

# package.json
{
  "scripts": {
    "docs": "typedoc src --out docs/api"
  }
}
```

## 🎉 總結

這套 TypeScript + Markdown 開發工具鏈提供了完整的開發環境，從編寫、測試到部署的全流程支援。通過合理配置和使用，可以大幅提升開發效率和代碼品質。

### 快速回顧

- ✅ 一鍵構建和偵錯
- ✅ 自動化測試和品質檢查
- ✅ 即時預覽和熱重載
- ✅ 跨平台支援
- ✅ 可擴展的架構

開始使用這套工具鏈，讓您的開發體驗更加高效和愉快！🚀
