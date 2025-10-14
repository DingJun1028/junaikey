# 🎯 完美自動化部署 - 完全設置指南

這是一份從零到完成的完整指南，幫助您實現 **一鍵完美部署** JunAiKey MCP Server。

---

## 📚 目錄

1. [概述](#-概述)
2. [架構說明](#-架構說明)
3. [完整設置流程](#-完整設置流程)
4. [驗證部署](#-驗證部署)
5. [日常使用](#-日常使用)
6. [故障排除](#-故障排除)

---

## 🌟 概述

### 部署目標

實現從 GitHub 自動部署到 Linux 伺服器的完整自動化流程：

```
開發者 push → GitHub Actions → SSH 到伺服器 → 拉取代碼 → 構建 → 重啟服務 → 通知
```

### 特色功能

✅ **完全自動化** - 推送即部署，無需手動操作  
✅ **安全可靠** - SSH 金鑰認證，最小權限設計  
✅ **錯誤處理** - 完善的錯誤檢測和通知機制  
✅ **一鍵回滾** - 自動備份，支援快速回滾  
✅ **健康監控** - 內建健康檢查和狀態監控  
✅ **詳細日誌** - 完整的部署和運行日誌  

---

## 🏗️ 架構說明

### 部署架構圖

```
┌─────────────────────────────────────────────────────────────────┐
│                         GitHub Repository                        │
│  ┌──────────────┐  ┌──────────────┐  ┌─────────────────────┐   │
│  │  Source Code │  │ .github/     │  │   deployment/       │   │
│  │  (main 分支)  │  │  workflows/  │  │  - setup-server.sh  │   │
│  │              │  │  deploy.yml  │  │  - backup.sh        │   │
│  └──────────────┘  └──────────────┘  │  - health-check.sh  │   │
│                                       │  - rollback.sh      │   │
│                                       └─────────────────────┘   │
└────────────────────────┬────────────────────────────────────────┘
                         │ Push to main
                         ▼
┌─────────────────────────────────────────────────────────────────┐
│                      GitHub Actions Runner                       │
│  1. Checkout code          2. Setup Node.js                     │
│  3. Install dependencies   4. Build project                     │
│  5. Run tests             6. Setup SSH key                      │
└────────────────────────┬────────────────────────────────────────┘
                         │ SSH Connection
                         ▼
┌─────────────────────────────────────────────────────────────────┐
│                        Linux Server                              │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │  /opt/junaikey/ (部署目錄)                                 │  │
│  │  - Git repository (拉取最新代碼)                           │  │
│  │  - npm ci (安裝依賴)                                       │  │
│  │  - npm run build (構建項目)                               │  │
│  └──────────────────────────────────────────────────────────┘  │
│                         │                                        │
│                         ▼                                        │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │  systemd Service: mcp-server                             │  │
│  │  - Restart service (systemctl restart mcp-server)        │  │
│  │  - Check status (systemctl status mcp-server)            │  │
│  │  - Auto-start on boot                                    │  │
│  └──────────────────────────────────────────────────────────┘  │
│                         │                                        │
│                         ▼                                        │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │  MCP Server Running                                      │  │
│  │  - Listen on stdio                                       │  │
│  │  - Serve JunAiKey tools                                  │  │
│  │  - Log to journald                                       │  │
│  └──────────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────────┘
```

### 安全設計

```
GitHub Actions                    Linux Server
─────────────                     ────────────
SSH Private Key ──────SSH────────> Public Key in ~/.ssh/authorized_keys
(GitHub Secret)                    
                                  Limited sudo permissions:
                                  - systemctl restart mcp-server
                                  - systemctl status mcp-server
                                  
                                  systemd Service Isolation:
                                  - Run as non-root user
                                  - Protected directories
                                  - Resource limits
```

---

## 🚀 完整設置流程

### 階段一：本地準備（5 分鐘）

#### 1. 生成 SSH 金鑰對

```bash
# 在本地電腦執行
ssh-keygen -t ed25519 -C "github-actions-junaikey-deploy" -f ~/.ssh/junaikey_deploy

# 不要設置密碼（直接按 Enter 兩次）
# 這會生成兩個文件：
# - ~/.ssh/junaikey_deploy (私鑰，保密！)
# - ~/.ssh/junaikey_deploy.pub (公鑰，可以公開)
```

#### 2. 查看並保存私鑰

```bash
# 顯示私鑰內容
cat ~/.ssh/junaikey_deploy

# 複製完整輸出，稍後會用到
# 應該看起來像這樣：
# -----BEGIN OPENSSH PRIVATE KEY-----
# b3BlbnNzaC1rZXktdjEAAAAABG5vbmU...
# ... (多行)
# -----END OPENSSH PRIVATE KEY-----
```

⚠️ **重要**: 保存這個私鑰，不要外洩！

---

### 階段二：伺服器設置（10 分鐘）

#### 1. 登入伺服器

```bash
# 使用您現有的方式登入伺服器
ssh your_user@your_server_ip
```

#### 2. 執行一鍵設置腳本

```bash
# 方式 1: 從 GitHub 直接執行 (推薦)
bash <(curl -s https://raw.githubusercontent.com/DingJun1028/junaikey/main/deployment/setup-server.sh)

# 方式 2: 手動執行
cd /opt/junaikey
git clone https://github.com/DingJun1028/junaikey.git .
bash deployment/setup-server.sh
```

這個腳本會自動：
- ✅ 檢查必要軟體（Node.js, Git, systemd）
- ✅ 創建部署目錄
- ✅ 克隆 Git 倉庫
- ✅ 安裝依賴
- ✅ 構建項目
- ✅ 安裝 systemd 服務
- ✅ 配置 sudo 權限
- ✅ 啟動服務

#### 3. 添加 SSH 公鑰

```bash
# 在伺服器上執行
mkdir -p ~/.ssh
chmod 700 ~/.ssh

# 編輯 authorized_keys
nano ~/.ssh/authorized_keys

# 貼上您在步驟 1.2 生成的公鑰（.pub 文件內容）
# 保存並退出 (Ctrl+X, Y, Enter)

# 設置權限
chmod 600 ~/.ssh/authorized_keys
```

或者從本地電腦執行：

```bash
# 在本地電腦執行
ssh-copy-id -i ~/.ssh/junaikey_deploy.pub your_user@your_server_ip
```

#### 4. 測試 SSH 連接

```bash
# 在本地電腦執行
ssh -i ~/.ssh/junaikey_deploy your_user@your_server_ip "echo 'SSH 連接成功！'"

# 如果看到 "SSH 連接成功！" 表示配置正確
```

---

### 階段三：GitHub 配置（5 分鐘）

#### 1. 進入 GitHub Secrets 設置

1. 打開您的 GitHub 倉庫: https://github.com/DingJun1028/junaikey
2. 點擊 **Settings** (設定)
3. 左側選單找到 **Secrets and variables**
4. 點擊 **Actions**
5. 點擊 **New repository secret**

#### 2. 添加必要的 Secrets

**Secret 1: SSH_PRIVATE_KEY**
```
Name: SSH_PRIVATE_KEY
Value: (貼上階段一步驟 1.2 保存的私鑰完整內容)
```

**Secret 2: SERVER_IP**
```
Name: SERVER_IP
Value: your_server_ip (例如: 192.168.1.100 或 server.example.com)
```

**Secret 3: SERVER_USER**
```
Name: SERVER_USER  
Value: your_username (例如: ubuntu 或 root)
```

**Secret 4: SERVER_PATH (可選)**
```
Name: SERVER_PATH
Value: /opt/junaikey (如果使用默認路徑可以不設置)
```

#### 3. 驗證 Secrets

確認所有 Secrets 已添加：
- ✅ SSH_PRIVATE_KEY
- ✅ SERVER_IP
- ✅ SERVER_USER

---

### 階段四：測試部署（5 分鐘）

#### 1. 創建測試提交

```bash
# 在本地倉庫
git commit --allow-empty -m "Test: Verify automated deployment"
git push origin main
```

#### 2. 查看部署日誌

1. 前往 GitHub 倉庫頁面
2. 點擊 **Actions** 標籤
3. 選擇最新的 "Deploy MCP Server" workflow
4. 查看部署進度和日誌

#### 3. 驗證部署成功

在伺服器上執行：

```bash
# 檢查服務狀態
sudo systemctl status mcp-server

# 應該看到：
# ● mcp-server.service - JunAiKey MCP Server
#    Loaded: loaded (/etc/systemd/system/mcp-server.service; enabled; vendor preset: enabled)
#    Active: active (running) since ...

# 查看最近日誌
sudo journalctl -u mcp-server -n 20 --no-pager

# 運行健康檢查
bash /opt/junaikey/deployment/health-check.sh
```

---

## ✅ 驗證部署

### 檢查清單

- [ ] **伺服器端**
  - [ ] Node.js 18+ 已安裝
  - [ ] Git 已安裝
  - [ ] 部署目錄 `/opt/junaikey` 存在
  - [ ] Git 倉庫已克隆
  - [ ] systemd 服務已安裝
  - [ ] 服務正在運行
  - [ ] sudo 免密碼已配置

- [ ] **本地端**
  - [ ] SSH 金鑰已生成
  - [ ] 可以無密碼 SSH 登入伺服器
  - [ ] 本地倉庫可以推送到 GitHub

- [ ] **GitHub 端**
  - [ ] 所有必需的 Secrets 已設置
  - [ ] deploy.yml workflow 存在
  - [ ] Actions 已啟用

- [ ] **部署測試**
  - [ ] 測試提交已觸發部署
  - [ ] GitHub Actions 執行成功
  - [ ] 伺服器服務已更新並重啟
  - [ ] 服務運行正常

---

## 🎮 日常使用

### 自動部署

```bash
# 只需推送到 main 分支，自動部署即會觸發
git add .
git commit -m "Update feature XYZ"
git push origin main

# GitHub Actions 會自動：
# 1. 檢出代碼
# 2. 安裝依賴
# 3. 構建項目
# 4. SSH 到伺服器
# 5. 拉取最新代碼
# 6. 重啟服務
```

### 手動部署

```bash
# 在 GitHub Actions 頁面點擊 "Run workflow"
# 選擇環境: production 或 staging
```

### 查看部署狀態

```bash
# 在伺服器執行
sudo systemctl status mcp-server
```

### 查看日誌

```bash
# 實時日誌
sudo journalctl -u mcp-server -f

# 最近 100 行
sudo journalctl -u mcp-server -n 100 --no-pager

# 今天的日誌
sudo journalctl -u mcp-server --since today
```

### 健康檢查

```bash
# 運行健康檢查
bash /opt/junaikey/deployment/health-check.sh
```

### 備份

```bash
# 手動備份
bash /opt/junaikey/deployment/backup.sh

# 查看所有備份
ls -lht /opt/junaikey-backups/
```

### 回滾

```bash
# 列出可用備份
bash /opt/junaikey/deployment/rollback.sh

# 回滾到特定版本
bash /opt/junaikey/deployment/rollback.sh junaikey_20240101_120000
```

---

## 🔧 故障排除

### 問題 1: GitHub Actions SSH 連接失敗

**症狀**: `Permission denied (publickey)`

**解決方案**:

```bash
# 1. 確認公鑰在伺服器上
ssh your_user@your_server_ip "cat ~/.ssh/authorized_keys"

# 2. 重新複製公鑰
ssh-copy-id -i ~/.ssh/junaikey_deploy.pub your_user@your_server_ip

# 3. 檢查權限
ssh your_user@your_server_ip "chmod 700 ~/.ssh && chmod 600 ~/.ssh/authorized_keys"

# 4. 測試連接
ssh -i ~/.ssh/junaikey_deploy your_user@your_server_ip "echo 'Success'"
```

### 問題 2: systemctl 需要密碼

**症狀**: `sudo: a password is required`

**解決方案**:

```bash
# 在伺服器執行
sudo visudo -f /etc/sudoers.d/mcp-server

# 添加以下內容（替換 your_user）：
your_user ALL=(ALL) NOPASSWD: /bin/systemctl restart mcp-server
your_user ALL=(ALL) NOPASSWD: /bin/systemctl status mcp-server
your_user ALL=(ALL) NOPASSWD: /bin/systemctl stop mcp-server
your_user ALL=(ALL) NOPASSWD: /bin/systemctl start mcp-server

# 保存並退出，然後測試
sudo systemctl status mcp-server  # 應該不需要密碼
```

### 問題 3: 服務無法啟動

**症狀**: `failed (Result: exit-code)`

**解決方案**:

```bash
# 查看詳細錯誤
sudo journalctl -u mcp-server -n 50 --no-pager

# 測試手動啟動
cd /opt/junaikey
node dist/mcpServer.js

# 檢查依賴
npm list
npm ci

# 檢查 Node.js 版本
node --version  # 應該是 v18 或更高
```

### 問題 4: 構建失敗

**症狀**: `npm ERR! missing script: build`

**解決方案**:

```bash
# 檢查 package.json
cd /opt/junaikey
cat package.json | grep -A 5 '"scripts"'

# 如果沒有 build 腳本，可以跳過這步
# 在 deploy.yml 中已設置 continue-on-error: true
```

### 問題 5: Git pull 失敗

**症狀**: `Your local changes would be overwritten`

**解決方案**:

```bash
# 在伺服器執行
cd /opt/junaikey
git reset --hard HEAD
git clean -fd
git pull origin main
```

---

## 📊 監控與維護

### 定期檢查

建議每週執行：

```bash
# 1. 健康檢查
bash /opt/junaikey/deployment/health-check.sh

# 2. 查看服務狀態
sudo systemctl status mcp-server

# 3. 檢查磁盤空間
df -h /opt/junaikey

# 4. 清理舊日誌（保留最近 7 天）
sudo journalctl --vacuum-time=7d
```

### 自動化監控

可以設置 cron job：

```bash
# 編輯 crontab
crontab -e

# 添加每小時健康檢查
0 * * * * /opt/junaikey/deployment/health-check.sh > /tmp/mcp-health.log 2>&1

# 添加每天備份
0 2 * * * /opt/junaikey/deployment/backup.sh > /tmp/mcp-backup.log 2>&1
```

---

## 🎉 完成！

恭喜！您已經完成了完整的自動化部署設置。

現在您可以：
- ✅ 推送代碼到 GitHub，自動部署到伺服器
- ✅ 查看實時日誌和服務狀態
- ✅ 使用健康檢查監控服務
- ✅ 在需要時快速回滾到舊版本
- ✅ 自動備份和恢復

### 下一步

- 🔔 設置 Slack 通知（參見 SECRETS.md）
- 🏗️ 配置多環境部署（staging/production）
- 📊 添加監控儀表板
- 🔒 定期輪換 SSH 金鑰

---

## 📚 相關文檔

- [完整部署指南](./README.md)
- [GitHub Secrets 配置](./SECRETS.md)
- [快速參考卡](./QUICKREF.md)
- [GitHub Actions 文檔](https://docs.github.com/en/actions)

---

**需要幫助？** 查看 [GitHub Issues](https://github.com/DingJun1028/junaikey/issues) 或聯繫支援團隊。

**🌟 享受自動化部署帶來的效率提升！**
