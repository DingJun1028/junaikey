# 「萬能中心」核心宣言 (Omni-Center Manifest) v2.0

## 1. 設計哲學 (Design Philosophy)

「萬能中心」是一個數位化的「創世紀方舟」，旨在系統性地存放、管理與處理所有「創元實錄」中的核心概念藍圖。此版本已全面升級至 TypeScript 技術棧，以實現類型安全、模組化和更佳的開發體驗。

其核心原則是：
- **類型安全 (Type-Safe):** 所有數據結構均由 TypeScript 接口嚴格定義，確保數據一致性。
- **模組化 (Modular):** 每個藍圖都是一個獨立的、可導入的 TypeScript 模組。
- **自動化 (Automated):** 通過 `engine.ts` 腳本，提供標準化的流程來處理與部署藍圖。

## 2. 目錄結構 (Directory Structure)

`omni_center` 的結構旨在實現清晰的分離與管理：

- `/src/blueprints`: **藍圖專區 (Blueprint Zone)**。此處存放所有核心的概念定義文件 (`.ts`)。
- `/src/interfaces.ts`: 定義項目中所有共享的 TypeScript 接口。
- `/src/engine.ts`: **創世引擎 (Genesis Engine)**。一個用於與「藍圖專區」互動的自動化腳本。
- `/package.json`: 定義項目依賴與腳本。
- `/tsconfig.json`: TypeScript 編譯器配置。
- `/MANIFEST.md`: 本宣言。

## 3. 自動化流程 (Automation Flow)

`engine.ts` 腳本是與「萬能中心」互動的主要介面。

### 安裝依賴
在第一次使用前，請先在 `omni_center` 目錄下運行：
`npm install`

### 使用指令
使用 `ts-node` 來執行引擎指令：
`npx ts-node src/engine.ts <command> [arguments]`

**可用指令:**
- `list`: 列出「藍圖專區」中的所有藍圖。
- `validate <name>`: 驗證指定藍圖的結構。
- `deploy <name>`: 模擬將藍圖提交至生產管線的過程。
