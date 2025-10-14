# 🔐 GitHub Secrets 配置完全指南

本指南將幫助您完整設置 GitHub Actions 自動部署所需的所有 Secrets。

## 📋 必需的 Secrets

### 1. SSH_PRIVATE_KEY

**用途**: SSH 私鑰，用於 GitHub Actions 連接到您的伺服器

**如何生成**:

```bash
# 在本地電腦執行
ssh-keygen -t ed25519 -C "github-actions-junaikey" -f ~/.ssh/junaikey_deploy

# 不要設置密碼（直接按 Enter），以便 GitHub Actions 可以自動使用
```

**獲取私鑰內容**:

```bash
cat ~/.ssh/junaikey_deploy
```

複製完整輸出，包括：
```
-----BEGIN OPENSSH PRIVATE KEY-----
b3BlbnNzaC1rZXktdjEAAAAABG5vbmUAAAAEbm9uZQAAAAAAAAABAAAAMwAAAAtz...
(多行內容)
...xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx=
-----END OPENSSH PRIVATE KEY-----
```

**複製公鑰到伺服器**:

```bash
# 方法 1: 使用 ssh-copy-id (推薦)
ssh-copy-id -i ~/.ssh/junaikey_deploy.pub your_user@your_server_ip

# 方法 2: 手動複製
cat ~/.ssh/junaikey_deploy.pub
# 然後在伺服器上執行:
# mkdir -p ~/.ssh
# echo "公鑰內容" >> ~/.ssh/authorized_keys
# chmod 600 ~/.ssh/authorized_keys
```

**測試連接**:

```bash
ssh -i ~/.ssh/junaikey_deploy your_user@your_server_ip
# 應該可以無密碼登入
```

---

### 2. SERVER_IP

**用途**: 伺服器的 IP 地址或域名

**範例**:
- IP 地址: `192.168.1.100`
- 域名: `server.example.com`

**如何獲取**:

在伺服器上執行：
```bash
# 獲取公網 IP
curl ifconfig.me

# 或
hostname -I
```

---

### 3. SERVER_USER

**用途**: SSH 登入的用戶名

**範例**:
- Ubuntu: `ubuntu`
- Debian: `debian`
- 自定義用戶: `yourusername`
- Root (不推薦): `root`

**如何確認**:

在伺服器上執行：
```bash
whoami
```

---

### 4. SERVER_PATH (可選)

**用途**: 伺服器上的部署目錄路徑

**預設值**: `/opt/junaikey`

**範例**:
- 標準路徑: `/opt/junaikey`
- 自定義路徑: `/home/ubuntu/apps/junaikey`
- Nginx 路徑: `/var/www/junaikey`

---

## 🔧 在 GitHub 設置 Secrets

### 步驟 1: 進入 Settings

1. 打開您的 GitHub 倉庫
2. 點擊 **Settings** (設定)
3. 在左側菜單找到 **Secrets and variables**
4. 點擊 **Actions**

### 步驟 2: 添加 Secrets

點擊 **New repository secret** 按鈕，然後：

#### Secret 1: SSH_PRIVATE_KEY
```
Name: SSH_PRIVATE_KEY
Value: (貼上完整的私鑰內容，包括 BEGIN 和 END 行)
```

#### Secret 2: SERVER_IP
```
Name: SERVER_IP
Value: 192.168.1.100
```

#### Secret 3: SERVER_USER
```
Name: SERVER_USER
Value: ubuntu
```

#### Secret 4: SERVER_PATH (可選)
```
Name: SERVER_PATH
Value: /opt/junaikey
```

### 步驟 3: 驗證

所有 Secrets 添加後，您應該看到：

```
✓ SSH_PRIVATE_KEY       Updated X minutes ago
✓ SERVER_IP             Updated X minutes ago
✓ SERVER_USER           Updated X minutes ago
✓ SERVER_PATH           Updated X minutes ago (可選)
```

---

## 🧪 測試 Secrets 配置

### 1. 本地測試 SSH 連接

```bash
# 使用您設置的相同信息測試
ssh -i ~/.ssh/junaikey_deploy SERVER_USER@SERVER_IP "echo 'Connection successful!'"
```

### 2. 測試部署目錄訪問

```bash
ssh -i ~/.ssh/junaikey_deploy SERVER_USER@SERVER_IP << 'EOF'
  cd SERVER_PATH
  pwd
  ls -la
EOF
```

### 3. 測試 systemctl 權限

```bash
ssh -i ~/.ssh/junaikey_deploy SERVER_USER@SERVER_IP "sudo systemctl status mcp-server"
# 應該不需要密碼
```

### 4. 觸發測試部署

創建一個測試提交：

```bash
# 在本地倉庫
git commit --allow-empty -m "Test deployment"
git push origin main
```

然後前往 **Actions** 頁面查看部署日誌。

---

## 🔒 安全最佳實踐

### 1. 限制 SSH 金鑰使用

在伺服器的 `~/.ssh/authorized_keys` 文件中，可以限制金鑰用途：

```bash
# 編輯 authorized_keys
nano ~/.ssh/authorized_keys

# 在公鑰前添加選項：
command="/opt/junaikey/deployment/deploy-only.sh",no-port-forwarding,no-X11-forwarding,no-agent-forwarding ssh-ed25519 AAAA...
```

### 2. 使用專用部署用戶

```bash
# 創建專用用戶
sudo useradd -m -s /bin/bash deploy

# 設置目錄權限
sudo chown -R deploy:deploy /opt/junaikey

# 配置 sudo 權限
echo "deploy ALL=(ALL) NOPASSWD: /bin/systemctl restart mcp-server" | sudo tee /etc/sudoers.d/mcp-server
```

### 3. 定期輪換 SSH 金鑰

建議每 3-6 個月輪換一次 SSH 金鑰：

```bash
# 生成新金鑰
ssh-keygen -t ed25519 -C "github-actions-junaikey-$(date +%Y%m)" -f ~/.ssh/junaikey_deploy_new

# 複製到伺服器
ssh-copy-id -i ~/.ssh/junaikey_deploy_new.pub SERVER_USER@SERVER_IP

# 測試新金鑰
ssh -i ~/.ssh/junaikey_deploy_new SERVER_USER@SERVER_IP "echo 'New key works!'"

# 更新 GitHub Secret
# 然後刪除舊金鑰
```

### 4. 監控部署活動

設置 Slack 或 Email 通知（見下方）。

---

## 📢 可選的 Secrets

### SLACK_WEBHOOK_URL

**用途**: 接收部署通知到 Slack

**如何設置**:

1. 在 Slack 中創建 Incoming Webhook:
   - 前往 https://api.slack.com/apps
   - 創建新應用
   - 啟用 Incoming Webhooks
   - 添加 Webhook to Workspace
   - 複製 Webhook URL

2. 添加到 GitHub Secrets:
```
Name: SLACK_WEBHOOK_URL
Value: https://hooks.slack.com/services/T00000000/B00000000/XXXXXXXXXXXXXXXXXXXX
```

3. 取消註釋 `.github/workflows/deploy.yml` 中的 Slack 通知部分

---

## 🆘 常見問題

### Q1: 私鑰包含換行符，如何處理？

**A**: 直接複製整個私鑰內容，包括所有換行符。GitHub Secrets 會正確處理。

### Q2: SSH 連接超時

**A**: 檢查：
- 伺服器是否運行
- 防火牆是否允許 SSH (port 22)
- SERVER_IP 是否正確
- 網絡連接是否正常

### Q3: Permission denied (publickey)

**A**: 檢查：
- 公鑰是否正確添加到 `~/.ssh/authorized_keys`
- 文件權限: `chmod 600 ~/.ssh/authorized_keys`
- 目錄權限: `chmod 700 ~/.ssh`
- 使用正確的用戶名

### Q4: sudo 需要密碼

**A**: 配置 sudoers:
```bash
sudo visudo -f /etc/sudoers.d/mcp-server
# 添加:
your_user ALL=(ALL) NOPASSWD: /bin/systemctl restart mcp-server
```

### Q5: 如何更新 Secret？

**A**: 在 GitHub Secrets 頁面：
1. 點擊 Secret 名稱旁的 **Update**
2. 輸入新值
3. 點擊 **Update secret**

---

## 📝 檢查清單

部署前請確認：

- [ ] SSH 私鑰已生成
- [ ] SSH 公鑰已添加到伺服器
- [ ] 可以無密碼 SSH 登入伺服器
- [ ] 所有必需的 Secrets 已添加到 GitHub
- [ ] 伺服器已運行設置腳本 (`setup-server.sh`)
- [ ] systemd 服務已安裝並運行
- [ ] sudo 免密碼已配置
- [ ] 部署目錄存在且有正確權限
- [ ] 已進行本地測試
- [ ] 已創建測試提交驗證部署

---

## 🔗 相關文檔

- [GitHub Actions Secrets 官方文檔](https://docs.github.com/en/actions/security-guides/encrypted-secrets)
- [SSH 金鑰管理最佳實踐](https://www.ssh.com/academy/ssh/keygen)
- [完整部署指南](./README.md)

---

如有問題，請查看 [deployment/README.md](./README.md) 或在 GitHub Issues 提問。
