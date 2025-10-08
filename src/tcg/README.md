# TCG 萬能矩陣系統

## 📜 系統概述

TCG 萬能矩陣系統是基於《JunAiKey 聖典》核心編纂總結建立的完整 Trading Card Game 系統，包含四大核心成果：

### 🔥 萬能卡牌原型機關 (v1.4)
定義卡牌的基本結構和屬性，實現卡牌系統的核心架構。

### 🌌 三位一體・宇宙總綱 (v8.1)
定義十二大元素、對應英雄、色法的關聯，建立遊戲世界的基礎規則。

### ⚖️ 平衡敕令・遊戲關鍵詞體系 (v8.4)
為十二大元素建立對稱的關鍵詞體系，確保遊戲平衡性。

### 🤝 化身盟約・核心遊戲規則 (v8.5)
定義玩家與英雄的連結和牌組構築規則，實現遊戲核心機制。

## 📁 系統結構

```
src/tcg/
├── types/                 # 類型定義
│   ├── card.ts           # 卡牌相關類型
│   ├── element.ts        # 元素系統類型
│   ├── hero.ts           # 英雄系統類型
│   ├── keyword.ts        # 關鍵詞體系類型
│   └── game.ts           # 遊戲規則類型
├── core/                 # 核心系統
│   ├── cardSystem.ts     # 卡牌原型機關
│   ├── universe.ts       # 宇宙總綱系統
│   ├── balance.ts        # 平衡敕令系統
│   └── avatar.ts         # 化身盟約系統
├── engine/               # 遊戲引擎
│   ├── gameEngine.ts     # 遊戲引擎核心
│   ├── battleEngine.ts   # 戰鬥引擎
│   └── effectEngine.ts   # 效果引擎
├── data/                 # 數據定義
│   ├── elements.ts       # 十二大元素數據
│   ├── heroes.ts         # 萬能英雄數據
│   ├── cards.ts          # 卡牌數據
│   └── keywords.ts       # 關鍵詞數據
├── utils/                # 工具函數
│   ├── validators.ts     # 驗證工具
│   ├── calculators.ts    # 計算工具
│   └── helpers.ts        # 輔助工具
└── tests/                # 測試文件
    ├── unit/             # 單元測試
    ├── integration/      # 整合測試
    └── e2e/              # 端到端測試
```

## 🎯 核心特性

### 1. 十二大元素系統
- 火、水、土、風、雷、光、暗、金、木、時、空、靈
- 每個元素都有對應的色法和關鍵詞體系
- 元素之間存在相生相剋的關係

### 2. 萬能化身系統
- 每個元素對應一個萬能史詩英雄
- 英雄具有獨特的能力和技能
- 玩家可以與英雄建立盟約關係

### 3. 對稱平衡系統
- 基於平衡敕令的關鍵詞體系
- 確保每個元素都有相對應的克制和被克制關係
- 動態平衡機制

### 4. 牌組構築規則
- 基於化身盟約的構築限制
- 色法組合規則
- 強度平衡系統

## 🔧 開發指南

### 開發原則
- 使用 TypeScript 和繁體中文註釋
- 遵循 JunAiKey 開發聖典的規範
- 保持代碼的可讀性和可維護性

### 類型定義
- 所有類型都應定義在 `types/` 目錄下
- 使用嚴格的 TypeScript 類型定義
- 確保類型的完整性和一致性

### 系統實現
- 核心系統應在 `core/` 目錄下實現
- 遊戲引擎在 `engine/` 目錄下實現
- 使用依賴注入和模塊化設計

## 🚀 快速開始

```typescript
import { TCGEngine } from './engine/gameEngine';
import { Element } from './types/element';

// 初始化遊戲引擎
const engine = new TCGEngine();

// 創建玩家
const player = engine.createPlayer('Player 1');

// 結合英雄
const hero = engine.getHeroByElement(Element.FIRE);
player.bindHero(hero);

// 構築牌組
const deck = player.buildDeck([
  { element: Element.FIRE, count: 20 },
  { element: Element.LIGHT, count: 10 }
]);

// 開始遊戲
const game = engine.startGame(player1, player2);
```

## 📊 系統統計

| 模塊 | 完成度 | 狀態 |
|------|--------|------|
| 卡牌原型機關 | 0% | 🚧 待開發 |
| 宇宙總綱 | 0% | 🚧 待開發 |
| 平衡敕令 | 0% | 🚧 待開發 |
| 化身盟約 | 0% | 🚧 待開發 |
| 遊戲引擎 | 0% | 🚧 待開發 |

## 🎯 開發路徑

### 第一階段 (核心架構)
1. 完成類型定義
2. 實現卡牌原型機關
3. 建立元素系統

### 第二階段 (核心系統)
1. 實現宇宙總綱
2. 建立平衡敕令
3. 實現化身盟約

### 第三階段 (遊戲引擎)
1. 開發遊戲引擎核心
2. 實現戰鬥系統
3. 完善效果引擎

### 第四階段 (完善與優化)
1. 建立測試套件
2. 性能優化
3. 文檔完善

---

*TCG 萬能矩陣系統 - 基於《JunAiKey 聖典》核心編纂總結*
