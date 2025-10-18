# 📚 Junaikey TypeScript + Markdown 開發工具鏈

## 🎯 專案概述

這是一個完整的 VS Code 工作區，專為 TypeScript 和 Markdown 開發設計，提供了一鍵執行、偵錯、預覽和自動檢查的完整工具鏈。

### ✨ 主要特性

- 📝 **即時 Markdown 預覽** - 支援圖表、公式、幻燈片
- 🔧 **TypeScript 編譯與偵錯** - 完整的 TypeScript 開發環境
- 🧪 **自動化測試** - Jest 測試框架整合
- 🔍 **代碼品質檢查** - ESLint + Prettier + Markdownlint
- ⚡ **熱重載開發** - ts-node-dev 支援
- 📱 **跨平台支援** - 支援 iOS 和瀏覽器預覽

## 🚀 快速開始

### 環境要求

- Node.js >= 16.0.0
- VS Code (推薦最新版本)
- npm 或 yarn

### 安裝步驟

1. **克隆專案**
   ```bash
   git clone <repository-url>
   cd junaikey-markdown-typescript-toolchain
   ```

2. **安裝依賴**
   ```bash
   npm install
   ```

3. **構建專案**
   ```bash
   npm run build
   ```

4. **運行範例**
   ```bash
   npm start
   ```

### VS Code 插件推薦

安裝以下 VS Code 插件以獲得最佳開發體驗：

| 插件 | 功能 | 必要性 |
|------|------|--------|
| **Markdown Preview Enhanced** | 即時 Markdown 預覽 | 必裝 |
| **Markdownlint** | Markdown 語法檢查 | 必裝 |
| **ESLint** | TypeScript 語法檢查 | 必裝 |
| **Prettier - Code Formatter** | 自動格式化 | 必裝 |
| **Code Runner** | 一鍵執行代碼 | 推薦 |
| **TypeScript Importer** | 自動導入模組 | 推薦 |
| **Jest** | Jest 測試支援 | 推薦 |

## 📁 專案結構

```
junaikey-markdown-typescript-toolchain/
├── src/                              # TypeScript 源碼目錄
│   ├── index.ts                      # 主程式入口
│   ├── utils.ts                      # 工具函式庫
│   └── test/                         # 測試文件
│       └── setup.ts                  # 測試設置
├── docs/                            # Markdown 文件目錄
│   ├── guide.md                     # 詳細使用指南
│   └── readme.md                    # 專案說明文件
├── dist/                            # TypeScript 編譯輸出
├── .vscode/                         # VS Code 配置目錄
│   ├── launch.json                  # 偵錯配置
│   └── tasks.json                   # 自動化任務
├── node_modules/                    # 依賴包
├── coverage/                        # 測試覆蓋率報告
├── .gitignore                       # Git 忽略檔案
├── package.json                     # 專案配置和腳本
├── tsconfig.json                    # TypeScript 設定
├── jest.config.js                   # Jest 測試配置
├── .eslintrc.json                   # ESLint 設定
├── .prettierrc                      # Prettier 設定
└── .markdownlint.json               # Markdown 檢查設定
```

## 🛠️ 開發工具

### 構建工具

```bash
# 構建 TypeScript 專案
npm run build

# 監聽模式構建
npm run watch

# 清理構建文件
npm run clean
```

### 測試工具

```bash
# 運行所有測試
npm test

# 運行測試並生成覆蓋率報告
npm run test:coverage

# 監聽模式運行測試
npm run test:watch
```

### 代碼品質

```bash
# 檢查 TypeScript 代碼
npm run lint:ts

# 檢查 Markdown 文件
npm run lint:md

# 統一代碼格式化
npm run lint

# 自動格式化代碼
npm run format
```

### 開發服務

```bash
# 熱重載開發
npm run start

# 生成文檔
npm run docs
```

## 📖 使用指南

### TypeScript 開發

1. **編寫代碼**：在 `src/` 目錄下創建 `.ts` 文件
2. **編譯測試**：使用 `npm run build` 編譯代碼
3. **偵錯調試**：在 VS Code 中設置斷點，按 `F5` 開始偵錯
4. **熱重載**：使用 `npm run start` 啟動熱重載開發模式

### Markdown 開發

1. **編寫文檔**：在 `docs/` 目錄下創建 `.md` 文件
2. **即時預覽**：打開文件後按 `Ctrl+Shift+V` 預覽
3. **語法檢查**：使用 `npm run lint:md` 檢查語法
4. **導出分享**：使用 `Markdown Preview Enhanced` 導出各種格式

### 自動化任務

VS Code 任務 (`Ctrl+Shift+B`) 提供以下功能：

- **構建專案**：編譯 TypeScript 代碼
- **運行測試**：執行所有測試
- **代碼檢查**：檢查代碼品質
- **啟動服務**：啟動熱重載服務

## 🧪 測試範例

### 單元測試

```typescript
// src/utils.test.ts
import { Calculator } from './utils';

describe('Calculator', () => {
  let calc: Calculator;

  beforeEach(() => {
    calc = new Calculator();
  });

  test('should add two numbers', () => {
    expect(calc.add(1, 2)).toBe(3);
  });

  test('should subtract two numbers', () => {
    expect(calc.subtract(5, 3)).toBe(2);
  });

  test('should throw error when dividing by zero', () => {
    expect(() => calc.divide(5, 0)).toThrow('除數不能為 0');
  });
});
```

### 集成測試

```typescript
// src/integration.test.ts
import { Calculator } from './utils';

describe('Integration Tests', () => {
  test('should perform complex calculation', () => {
    const calc = new Calculator();
    const result = calc.add(calc.multiply(2, 3), calc.power(2, 3));
    expect(result).toBe(17);
  });
});
```

## 🔧 配置說明

### TypeScript 配置 (`tsconfig.json`)

```json
{
  "compilerOptions": {
    "target": "ES2022",
    "module": "commonjs",
    "outDir": "./dist",
    "strict": true,
    "esModuleInterop": true,
    "sourceMap": true,
    "declaration": true,
    "noImplicitAny": true,
    "noUnusedLocals": true
  }
}
```

### ESLint 配置 (`.eslintrc.json`)

```json
{
  "extends": [
    "eslint:recommended",
    "@typescript-eslint/recommended"
  ],
  "rules": {
    "no-unused-vars": "error",
    "@typescript-eslint/no-explicit-any": "warn"
  }
}
```

### Jest 配置 (`jest.config.js`)

```javascript
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  collectCoverageFrom: [
    'src/**/*.ts',
    '!src/**/*.d.ts'
  ]
};
```

## 🚀 進階功能

### CI/CD 整合

#### GitHub Actions

```yaml
# .github/workflows/ci.yml
name: CI/CD Pipeline

on:
  push:
    branches: [ main ]
  pull_request:
    branches: [ main ]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
      - run: npm ci
      - run: npm run lint
      - run: npm test
      - run: npm run build

  deploy:
    needs: test
    runs-on: ubuntu-latest
    if: github.ref == 'refs/heads/main'
    steps:
      - uses: actions/checkout@v3
      - run: npm run deploy
```

### 自動化部署

```bash
# package.json
{
  "scripts": {
    "deploy": "npm run build && gh-pages -d dist",
    "deploy:prod": "npm run build && firebase deploy"
  }
}
```

### 文檔生成

```bash
# 安裝文檔生成工具
npm install -D typedoc

# package.json
{
  "scripts": {
    "docs": "typedoc src --out docs/api",
    "docs:serve": "npx serve docs/api"
  }
}
```

## 🎨 自訂配置

### 添加新的 ESLint 規則

```json
// .eslintrc.json
{
  "rules": {
    "no-console": "off",
    "@typescript-eslint/explicit-function-return-type": "error"
  }
}
```

### 自訂 Prettier 格式

```json
// .prettierrc
{
  "printWidth": 100,
  "tabWidth": 2,
  "useTabs": false,
  "semi": true,
  "singleQuote": true
}
```

### 擴展 Markdown 規則

```json
// .markdownlint.json
{
  "default": true,
  "MD013": {
    "line_length": 80
  },
  "MD024": {
    "allow_different_nesting": true
  }
}
```

## 📊 效能監控

### 測試覆蓋率

```bash
npm run test:coverage
```

### 構建效能

```bash
# 分析構建時間
npm run build -- --reporter=verbose

# 壓力測試
npm run stress-test
```

## 🔍 故障排除

### 常見問題

#### Q: TypeScript 編譯錯誤

```bash
# 檢查 TypeScript 版本
npx tsc --version

# 重新安裝依賴
rm -rf node_modules package-lock.json
npm install
```

#### Q: 測試失敗

```bash
# 執行測試並顯示詳細資訊
npm test -- --verbose

# 生成測試報告
npm run test:coverage
```

#### Q: Markdown 預覽問題

1. 確保已安裝 `Markdown Preview Enhanced` 插件
2. 檢查 Markdown 語法是否正確
3. 重啟 VS Code

#### Q: 依賴衝突

```bash
# 檢查依賴樹
npm ls

# 更新依賴
npm update

# 清理快取
npm cache clean --force
```

## 📞 支援與社群

### 文件資源

- [TypeScript 官方文件](https://www.typescriptlang.org/docs/)
- [VS Code 文件](https://code.visualstudio.com/docs)
- [Markdown 語法說明](https://www.markdownguide.org/basic-syntax/)
- [Jest 測試框架](https://jestjs.io/docs/getting-started)

### 社群資源

- [GitHub Issues](https://github.com/your-repo/issues)
- [Discussions](https://github.com/your-repo/discussions)
- [Stack Overflow](https://stackoverflow.com/questions/tagged/typescript)

### 貢獻指南

1. Fork 專案
2. 創建功能分支
3. 提交變更
4. 推送到分支
5. 創建 Pull Request

## 📄 授權訊息

MIT License - 詳見 [LICENSE](../LICENSE) 文件

## 🙏 致謝

感謝以下開源專案和工具的貢獻：

- [TypeScript](https://www.typescriptlang.org/)
- [VS Code](https://code.visualstudio.com/)
- [Jest](https://jestjs.io/)
- [ESLint](https://eslint.org/)
- [Prettier](https://prettier.io/)
- [Markdownlint](https://github.com/DavidAnson/markdownlint)

---

**🎉 開始使用這套強大的開發工具鏈，讓您的開發體驗更加高效和愉快！**
