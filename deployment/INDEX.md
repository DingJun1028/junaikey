# 📚 JunAiKey 部署文檔索引

歡迎來到 JunAiKey MCP Server 部署文檔中心！

## 🎯 快速導航

### 新手入門

1. **[完整設置指南](COMPLETE_SETUP_GUIDE.md)** ⭐ **推薦首先閱讀**
   - 從零開始的完整教程
   - 包含所有設置步驟
   - 詳細的故障排除
   - 架構圖和流程說明

2. **[快速參考卡](QUICKREF.md)**
   - 一頁紙速查表
   - 常用命令集合
   - 快速故障排除

### 詳細文檔

3. **[部署指南](README.md)**
   - 完整的部署流程
   - 伺服器設置詳解
   - 進階配置選項
   - 監控和維護

4. **[GitHub Secrets 配置](SECRETS.md)**
   - SSH 金鑰生成
   - Secrets 設置步驟
   - 安全最佳實踐
   - 常見問題解答

## 📂 文件結構

```
deployment/
├── 📘 INDEX.md                      # 本文件 - 文檔索引
├── ⭐ COMPLETE_SETUP_GUIDE.md       # 完整設置指南（推薦）
├── 📖 README.md                     # 詳細部署指南
├── 🔐 SECRETS.md                    # GitHub Secrets 配置
├── 📋 QUICKREF.md                   # 快速參考卡
│
├── 🔧 setup-server.sh               # 一鍵伺服器設置腳本
├── 💾 backup.sh                     # 備份腳本
├── 🏥 health-check.sh               # 健康檢查腳本
├── ⏮️ rollback.sh                    # 回滾腳本
└── ⚙️ mcp-server.service            # systemd 服務配置
```

## 🚀 三種使用路徑

### 路徑 1: 快速上手（5 分鐘）

適合：已有 Linux 伺服器，想要快速部署

1. 閱讀 [快速參考卡](QUICKREF.md)
2. 執行一鍵設置腳本
3. 配置 3 個 GitHub Secrets
4. 推送代碼測試

### 路徑 2: 完整學習（30 分鐘）

適合：想要深入了解每個步驟

1. 閱讀 [完整設置指南](COMPLETE_SETUP_GUIDE.md)
2. 按步驟設置伺服器
3. 配置 GitHub Secrets
4. 驗證和測試部署

### 路徑 3: 深入定制（1-2 小時）

適合：需要定制化配置

1. 閱讀 [部署指南](README.md)
2. 閱讀 [Secrets 配置](SECRETS.md)
3. 根據需求修改配置
4. 設置進階功能（多環境、監控等）

## 📖 推薦閱讀順序

### 首次部署

1. [完整設置指南](COMPLETE_SETUP_GUIDE.md) - 了解整體流程
2. [GitHub Secrets 配置](SECRETS.md) - 配置認證信息
3. [快速參考卡](QUICKREF.md) - 保存常用命令

### 日常運維

1. [快速參考卡](QUICKREF.md) - 查找命令
2. [部署指南](README.md) - 解決具體問題

### 進階配置

1. [部署指南](README.md) - 進階配置章節
2. [GitHub Secrets 配置](SECRETS.md) - 安全最佳實踐

## 🎯 按需求查找

### 我想...

- **首次部署** → [完整設置指南](COMPLETE_SETUP_GUIDE.md)
- **查看命令** → [快速參考卡](QUICKREF.md)
- **設置 SSH** → [Secrets 配置](SECRETS.md)
- **解決錯誤** → [部署指南 - 故障排除](README.md#-故障排除)
- **配置備份** → [部署指南 - 進階配置](README.md#-進階配置)
- **多環境部署** → [部署指南 - 多環境部署](README.md#6️⃣-多環境部署)
- **安全加固** → [Secrets 配置 - 安全最佳實踐](SECRETS.md#-安全最佳實踐)

## 🛠️ 部署腳本說明

### setup-server.sh
**用途**: 一鍵完成伺服器初始化設置

**功能**:
- ✅ 檢查系統需求
- ✅ 創建部署目錄
- ✅ 克隆 Git 倉庫
- ✅ 安裝依賴和構建
- ✅ 配置 systemd 服務
- ✅ 設置 sudo 權限
- ✅ 啟動服務

**使用**:
```bash
bash deployment/setup-server.sh
```

### backup.sh
**用途**: 備份當前部署

**功能**:
- 📦 創建完整備份
- 🗂️ 管理備份版本（保留最近 5 個）
- 📊 顯示備份列表

**使用**:
```bash
bash deployment/backup.sh
```

### health-check.sh
**用途**: 檢查服務健康狀態

**功能**:
- 🏥 檢查服務運行狀態
- 📝 顯示最近日誌
- ⚠️ 檢測錯誤

**使用**:
```bash
bash deployment/health-check.sh
```

### rollback.sh
**用途**: 回滾到舊版本

**功能**:
- ⏮️ 列出可用備份
- 🔄 恢復到指定版本
- 💾 備份當前版本

**使用**:
```bash
# 列出備份
bash deployment/rollback.sh

# 回滾到指定版本
bash deployment/rollback.sh junaikey_20240101_120000
```

## ⚙️ 配置文件說明

### mcp-server.service
**systemd 服務配置文件**

**配置項**:
- 用戶和工作目錄
- 啟動命令
- 自動重啟策略
- 環境變數
- 安全設置

**位置**: `/etc/systemd/system/mcp-server.service`

## 🔗 外部資源

- [GitHub Actions 官方文檔](https://docs.github.com/en/actions)
- [systemd 服務管理](https://www.freedesktop.org/software/systemd/man/)
- [SSH 金鑰管理](https://www.ssh.com/academy/ssh/keygen)
- [Node.js 最佳實踐](https://github.com/goldbergyoni/nodebestpractices)

## 🆘 獲取幫助

### 尋找答案

1. **檢查文檔** - 按上面的導航查找相關文檔
2. **查看示例** - 每個文檔都有詳細的命令示例
3. **故障排除** - 查看各文檔的故障排除章節

### 仍然需要幫助？

- 📝 [GitHub Issues](https://github.com/DingJun1028/junaikey/issues)
- 💬 [Discord 社群](https://discord.gg/junaikey)
- 📧 [Email 支援](mailto:team@junaikey.com)

## 📊 部署流程總覽

```
┌────────────────────────────────────────────────────────────┐
│                     部署準備階段                            │
│  1️⃣ 生成 SSH 金鑰                                          │
│  2️⃣ 設置伺服器（運行 setup-server.sh）                     │
│  3️⃣ 配置 GitHub Secrets                                    │
└────────────────┬───────────────────────────────────────────┘
                 │
                 ▼
┌────────────────────────────────────────────────────────────┐
│                  自動部署流程                               │
│  開發者 Push → GitHub Actions → SSH 連接 → 拉取代碼       │
│  → 安裝依賴 → 構建 → 重啟服務 → 通知                      │
└────────────────┬───────────────────────────────────────────┘
                 │
                 ▼
┌────────────────────────────────────────────────────────────┐
│                    運維管理                                 │
│  • 查看日誌: journalctl -u mcp-server -f                   │
│  • 健康檢查: health-check.sh                               │
│  • 備份: backup.sh                                         │
│  • 回滾: rollback.sh                                       │
└────────────────────────────────────────────────────────────┘
```

## 🎓 學習路徑

### 初級（了解基礎）
- ✅ 了解 GitHub Actions 是什麼
- ✅ 了解 SSH 金鑰認證
- ✅ 了解 systemd 服務管理
- ✅ 完成首次部署

### 中級（掌握運維）
- ✅ 理解完整部署流程
- ✅ 能夠查看和分析日誌
- ✅ 能夠解決常見問題
- ✅ 配置監控和備份

### 高級（定制優化）
- ✅ 多環境部署配置
- ✅ 自定義部署流程
- ✅ 性能優化和調優
- ✅ 安全加固和審計

---

## 📝 更新日誌

### 2024-01-14
- ✅ 創建完整部署文檔體系
- ✅ 添加一鍵設置腳本
- ✅ 優化 GitHub Actions 工作流程
- ✅ 添加健康檢查和備份功能

---

**🌟 祝您部署順利！如有問題，請參考相應文檔或聯繫支援團隊。**
