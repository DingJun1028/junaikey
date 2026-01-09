# 🚀 JunAiKey 繼承系統快速入門指南

## 30 秒快速開始

### 情境一：我只想要文檔和最佳實踐

```bash
# 克隆或下載 JunAiKey
git clone https://github.com/DingJun1028/junaikey.git .junaikey

# 只繼承文檔
node .junaikey/scripts/inherit-repository.cjs --mode=documentation-only
```

✅ 完成！文檔已複製到 `docs/junaikey-inherited/`

### 情境二：我想選擇性繼承特定模組

```bash
# 1. 添加為子模組
git submodule add https://github.com/DingJun1028/junaikey.git .junaikey

# 2. 複製配置範例
cp .junaikey/.junaikey-inherit.example.json .junaikey-inherit.json

# 3. 編輯配置文件，啟用你需要的模組
nano .junaikey-inherit.json

# 4. 執行繼承（先乾跑測試）
node .junaikey/scripts/inherit-repository.cjs --dry-run

# 5. 確認無誤後正式執行
node .junaikey/scripts/inherit-repository.cjs
```

### 情境三：我想要完整繼承

```bash
# 完整繼承所有模組和文檔
git submodule add https://github.com/DingJun1028/junaikey.git .junaikey
node .junaikey/scripts/inherit-repository.cjs --mode=full
```

---

## 📝 配置文件快速參考

`.junaikey-inherit.json` 的最小配置：

```json
{
  "version": "1.0.0",
  "source": {
    "repository": "DingJun1028/junaikey",
    "branch": "main",
    "modules": [
      {
        "name": "best-practices",
        "path": "JUNAIKEY_BEST_PRACTICES.md",
        "enabled": true
      }
    ]
  },
  "target": {
    "framework": "react",
    "typescript": true
  },
  "inheritance": {
    "mode": "selective"
  }
}
```

---

## 🎯 常用模組選擇指南

### 想要架構設計模式？
啟用這些模組：
- `best-practices` - 最佳實踐文檔
- `architecture-patterns` - 架構模式（文檔概念）

### 想要同步管理功能？
啟用這些模組：
- `sync-matrix` - 雙線開發管理器
- 依賴: `logger`, `eventBus`

### 想要 AI 整合？
啟用這些模組：
- `ai-integration` - Jules API 整合
- 依賴: `sync-matrix`, `logger`

### 想要知識管理系統？
啟用這些模組：
- `knowledge-base` - 雙向同步知識庫（概念）
- `best-practices` - 包含知識管理方法

---

## 🛠️ 命令行選項

```bash
# 查看幫助
node .junaikey/scripts/inherit-repository.cjs --help

# 乾跑模式（不修改文件）
node .junaikey/scripts/inherit-repository.cjs --dry-run

# 指定配置文件
node .junaikey/scripts/inherit-repository.cjs --config=my-config.json

# 指定繼承模式
node .junaikey/scripts/inherit-repository.cjs --mode=selective
# 模式選項: full | selective | documentation-only

# 詳細輸出
node .junaikey/scripts/inherit-repository.cjs --verbose
```

---

## 🔍 故障排除

### 問題：找不到配置文件
**解決**：腳本會自動從 `.junaikey-inherit.example.json` 創建配置文件

### 問題：模組依賴缺失
**解決**：查看終端輸出的依賴檢查結果，手動啟用缺失的依賴模組

### 問題：構建或測試失敗
**解決**：這是正常的，繼承的代碼可能需要適配。查看生成的報告文件 `junaikey-inheritance-report.md`

### 問題：文件衝突
**解決**：配置文件中設置 `conflictResolution` 為 `rename` 或 `skip`

---

## 📚 下一步

1. ✅ 繼承完成後，查看生成的報告：`junaikey-inheritance-report.md`
2. 📖 閱讀詳細文檔：
   - [REPOSITORY_INHERITANCE.md](./REPOSITORY_INHERITANCE.md) - 完整指南
   - [TECH_SYNC_MANIFEST.md](./TECH_SYNC_MANIFEST.md) - 模組清單
3. 🔧 根據你的項目需求調整繼承的代碼
4. 🧪 運行測試確保一切正常
5. 🚀 開始使用 JunAiKey 的技術和最佳實踐！

---

## 🤝 獲取幫助

- 📖 查看 [完整文檔](./REPOSITORY_INHERITANCE.md)
- 💬 提交 [GitHub Issue](https://github.com/DingJun1028/junaikey/issues)
- 🗨️ 參與 [GitHub Discussions](https://github.com/DingJun1028/junaikey/discussions)

---

**🌟 讓技術永續傳承，從繼承 JunAiKey 開始！**
