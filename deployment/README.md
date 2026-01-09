# 🚀 JunAiKey MCP Server 部署指南

完整的自動化部署方案，實現一鍵從 GitHub 部署到 Linux 伺服器。

## 📋 目錄

- [前置需求](#-前置需求)
- [伺服器設置](#-伺服器設置)
- [GitHub Secrets 配置](#-github-secrets-配置)
- [部署流程](#-部署流程)
- [故障排除](#-故障排除)
- [進階配置](#-進階配置)

---

## ✅ 前置需求

### 本地環境
- Node.js 18+ 
- Git
- SSH 金鑰對

### 伺服器環境
- Ubuntu 20.04+ / Debian 10+ / CentOS 8+ (任何支援 systemd 的 Linux)
- Node.js 18+
- Git
- systemd
- sudo 權限

---

## 🖥️ 伺服器設置

### 1️⃣ 安裝必要軟體

```bash
# Ubuntu/Debian
sudo apt update
sudo apt install -y git nodejs npm

# CentOS/RHEL
sudo yum install -y git nodejs npm

# 驗證安裝
node --version  # 應該是 v18 或更高
git --version
```

### 2️⃣ 創建部署目錄

```bash
# 創建應用目錄
sudo mkdir -p /opt/junaikey
sudo chown $USER:$USER /opt/junaikey

# 克隆專案 (首次部署)
cd /opt/junaikey
git clone https://github.com/DingJun1028/junaikey.git .

# 或者設置為空的 git 倉庫
git init
git remote add origin https://github.com/DingJun1028/junaikey.git
git fetch origin
git checkout -b main origin/main
```

### 3️⃣ 安裝依賴並構建

```bash
cd /opt/junaikey
npm ci --production
npm run build
```

### 4️⃣ 設置 systemd 服務

```bash
# 複製服務文件
sudo cp /opt/junaikey/deployment/mcp-server.service /etc/systemd/system/

# 編輯服務文件 (根據需要調整路徑和用戶)
sudo nano /etc/systemd/system/mcp-server.service

# 重新載入 systemd
sudo systemctl daemon-reload

# 啟用服務 (開機自動啟動)
sudo systemctl enable mcp-server

# 啟動服務
sudo systemctl start mcp-server

# 檢查狀態
sudo systemctl status mcp-server
```

### 5️⃣ 配置 SSH 免密碼登入

在**本地電腦**上生成 SSH 金鑰（如果還沒有）：

```bash
# 生成新的 SSH 金鑰對
ssh-keygen -t ed25519 -C "github-actions-deploy" -f ~/.ssh/junaikey_deploy
```

將公鑰複製到伺服器：

```bash
# 方法 1: 使用 ssh-copy-id
ssh-copy-id -i ~/.ssh/junaikey_deploy.pub your_user@your_server_ip

# 方法 2: 手動複製
cat ~/.ssh/junaikey_deploy.pub | ssh your_user@your_server_ip "mkdir -p ~/.ssh && cat >> ~/.ssh/authorized_keys"
```

測試連接：

```bash
ssh -i ~/.ssh/junaikey_deploy your_user@your_server_ip
```

### 6️⃣ 配置 sudo 免密碼 (重要！)

為了讓 GitHub Actions 能夠重啟服務，需要配置 sudo 免密碼：

```bash
# 創建 sudoers 配置
sudo visudo -f /etc/sudoers.d/mcp-server

# 添加以下內容 (將 your_user 替換為實際用戶名)
your_user ALL=(ALL) NOPASSWD: /bin/systemctl restart mcp-server
your_user ALL=(ALL) NOPASSWD: /bin/systemctl status mcp-server
your_user ALL=(ALL) NOPASSWD: /bin/systemctl stop mcp-server
your_user ALL=(ALL) NOPASSWD: /bin/systemctl start mcp-server

# 保存並退出 (Ctrl+X, Y, Enter)

# 驗證配置
sudo -l
```

---

## 🔐 GitHub Secrets 配置

在 GitHub 倉庫中設置以下 Secrets：

1. 進入倉庫 → **Settings** → **Secrets and variables** → **Actions**
2. 點擊 **New repository secret**
3. 添加以下 Secrets：

### 必要的 Secrets

| Secret 名稱 | 說明 | 範例 |
|------------|------|------|
| `SSH_PRIVATE_KEY` | SSH 私鑰內容 (完整內容，包括 BEGIN 和 END 行) | `-----BEGIN OPENSSH PRIVATE KEY-----\n...` |
| `SERVER_IP` | 伺服器 IP 地址或域名 | `192.168.1.100` 或 `server.example.com` |
| `SERVER_USER` | SSH 登入用戶名 | `ubuntu` 或 `root` |

### 可選的 Secrets

| Secret 名稱 | 說明 | 預設值 |
|------------|------|--------|
| `SERVER_PATH` | 部署目錄路徑 | `/opt/junaikey` |
| `SLACK_WEBHOOK_URL` | Slack 通知 Webhook URL | - |

### 如何獲取 SSH_PRIVATE_KEY

```bash
# 顯示私鑰內容
cat ~/.ssh/junaikey_deploy

# 複製完整輸出，包括:
# -----BEGIN OPENSSH PRIVATE KEY-----
# ... (中間的所有內容)
# -----END OPENSSH PRIVATE KEY-----
```

---

## 🚀 部署流程

### 自動部署

每次推送到 `main` 分支時，GitHub Actions 會自動：

1. ✅ 檢出代碼
2. ✅ 設置 Node.js 環境
3. ✅ 安裝依賴
4. ✅ 構建項目
5. ✅ 運行測試（如果有）
6. ✅ 通過 SSH 連接到伺服器
7. ✅ 拉取最新代碼
8. ✅ 安裝生產依賴
9. ✅ 重新構建
10. ✅ 重啟 MCP Server 服務
11. ✅ 發送通知

### 手動部署

可以在 GitHub Actions 頁面手動觸發部署：

1. 進入倉庫 → **Actions**
2. 選擇 **Deploy MCP Server** workflow
3. 點擊 **Run workflow**
4. 選擇環境（production 或 staging）
5. 點擊 **Run workflow**

### 本地測試部署腳本

在推送前，可以在本地測試 SSH 連接：

```bash
# 測試 SSH 連接
ssh -i ~/.ssh/junaikey_deploy your_user@your_server_ip "echo 'Connection successful!'"

# 測試部署命令
ssh -i ~/.ssh/junaikey_deploy your_user@your_server_ip << 'ENDSSH'
  cd /opt/junaikey
  git status
  sudo systemctl status mcp-server
ENDSSH
```

---

## 🔧 故障排除

### 問題 1: SSH 連接失敗

**錯誤訊息**: `Permission denied (publickey)`

**解決方案**:
```bash
# 1. 檢查公鑰是否在伺服器上
ssh your_user@your_server_ip "cat ~/.ssh/authorized_keys"

# 2. 檢查 SSH 金鑰權限
ssh your_user@your_server_ip "chmod 700 ~/.ssh && chmod 600 ~/.ssh/authorized_keys"

# 3. 重新複製公鑰
ssh-copy-id -i ~/.ssh/junaikey_deploy.pub your_user@your_server_ip
```

### 問題 2: systemctl 需要密碼

**錯誤訊息**: `sudo: a password is required`

**解決方案**:
```bash
# 配置 sudo 免密碼 (參見上方步驟 6)
sudo visudo -f /etc/sudoers.d/mcp-server
```

### 問題 3: 服務無法啟動

**解決方案**:
```bash
# 查看服務日誌
sudo journalctl -u mcp-server -n 50 --no-pager

# 檢查服務狀態
sudo systemctl status mcp-server

# 測試手動啟動
cd /opt/junaikey
node dist/mcpServer.js
```

### 問題 4: npm 構建失敗

**錯誤訊息**: `npm ERR! missing script: build`

**解決方案**:
```bash
# 檢查 package.json 中是否有 build 腳本
cd /opt/junaikey
cat package.json | grep -A 5 "scripts"

# 如果沒有 build 腳本，可以跳過或添加
# 在 GitHub Actions workflow 中使用 continue-on-error: true
```

### 問題 5: 服務重啟但還在運行舊版本

**解決方案**:
```bash
# 完全停止並重啟
sudo systemctl stop mcp-server
sleep 2
sudo systemctl start mcp-server

# 檢查進程
ps aux | grep mcpServer
```

---

## 🎯 進階配置

### 1️⃣ 添加環境變數

編輯 systemd 服務文件：

```bash
sudo nano /etc/systemd/system/mcp-server.service
```

在 `[Service]` 區段添加：

```ini
Environment="NODE_ENV=production"
Environment="API_KEY=your_api_key"
Environment="PORT=3000"
```

或使用環境文件：

```ini
EnvironmentFile=/opt/junaikey/.env
```

重新載入並重啟：

```bash
sudo systemctl daemon-reload
sudo systemctl restart mcp-server
```

### 2️⃣ 配置回滾機制

在伺服器上保留舊版本：

```bash
# 創建備份腳本
sudo nano /opt/junaikey/deployment/backup.sh
```

```bash
#!/bin/bash
BACKUP_DIR="/opt/junaikey-backups"
TIMESTAMP=$(date +%Y%m%d_%H%M%S)

mkdir -p $BACKUP_DIR
cp -r /opt/junaikey $BACKUP_DIR/junaikey_$TIMESTAMP

# 只保留最近 5 個備份
ls -t $BACKUP_DIR | tail -n +6 | xargs -I {} rm -rf $BACKUP_DIR/{}
```

在部署前執行備份：

```bash
bash /opt/junaikey/deployment/backup.sh
```

### 3️⃣ 添加健康檢查

創建健康檢查腳本：

```bash
# 創建健康檢查腳本
cat > /opt/junaikey/deployment/health-check.sh << 'EOF'
#!/bin/bash
if systemctl is-active --quiet mcp-server; then
    echo "✅ MCP Server is running"
    exit 0
else
    echo "❌ MCP Server is not running"
    exit 1
fi
EOF

chmod +x /opt/junaikey/deployment/health-check.sh
```

### 4️⃣ 配置日誌輪轉

```bash
# 創建日誌輪轉配置
sudo nano /etc/logrotate.d/mcp-server
```

```
/var/log/mcp-server/*.log {
    daily
    rotate 7
    compress
    delaycompress
    notifempty
    create 0640 www-data www-data
    sharedscripts
    postrotate
        systemctl reload mcp-server > /dev/null 2>&1 || true
    endscript
}
```

### 5️⃣ 配置 Slack 通知

1. 創建 Slack Incoming Webhook
2. 在 GitHub Secrets 添加 `SLACK_WEBHOOK_URL`
3. 在 `.github/workflows/deploy.yml` 中取消註釋 Slack 通知部分

### 6️⃣ 多環境部署

創建不同的服務文件：

```bash
# Production
/etc/systemd/system/mcp-server-production.service

# Staging  
/etc/systemd/system/mcp-server-staging.service
```

使用不同的工作目錄和端口。

---

## 📊 監控與維護

### 查看服務狀態

```bash
# 查看服務狀態
sudo systemctl status mcp-server

# 查看實時日誌
sudo journalctl -u mcp-server -f

# 查看最近 100 行日誌
sudo journalctl -u mcp-server -n 100 --no-pager

# 查看今天的日誌
sudo journalctl -u mcp-server --since today
```

### 重啟服務

```bash
# 重啟服務
sudo systemctl restart mcp-server

# 停止服務
sudo systemctl stop mcp-server

# 啟動服務
sudo systemctl start mcp-server

# 重新載入配置
sudo systemctl daemon-reload
```

### 更新部署

```bash
# 手動更新 (如果自動部署失敗)
cd /opt/junaikey
git pull origin main
npm ci --production
npm run build
sudo systemctl restart mcp-server
```

---

## 🔒 安全最佳實踐

1. **使用專用的部署用戶**：不要使用 root 用戶
2. **限制 sudo 權限**：只允許特定命令
3. **使用 SSH 金鑰**：禁用密碼登入
4. **定期更新**：保持系統和依賴更新
5. **監控日誌**：定期檢查異常活動
6. **備份數據**：定期備份重要數據
7. **防火牆配置**：只開放必要端口
8. **使用 HTTPS**：如果有 web 界面
9. **環境變數**：敏感信息使用環境變數
10. **最小權限原則**：服務只擁有必要的權限

---

## 📚 相關資源

- [GitHub Actions 文檔](https://docs.github.com/en/actions)
- [systemd 文檔](https://www.freedesktop.org/software/systemd/man/)
- [SSH 金鑰管理](https://www.ssh.com/academy/ssh/keygen)
- [Node.js 最佳實踐](https://github.com/goldbergyoni/nodebestpractices)

---

## 🆘 獲取幫助

如果遇到問題：

1. 檢查 GitHub Actions 日誌
2. 查看伺服器上的服務日誌
3. 參考故障排除部分
4. 在 GitHub Issues 提問

---

## 📝 授權

MIT License - 詳見 LICENSE 文件
