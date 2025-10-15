# 🚀 JunAiKey 部署快速參考卡

## 📦 一鍵部署三步驟

```bash
# 步驟 0: 部署前檢查（推薦）⭐ 新增
bash deployment/pre-deployment-check.sh

# 步驟 1: 在伺服器執行
bash <(curl -s https://raw.githubusercontent.com/DingJun1028/junaikey/main/deployment/setup-server.sh)

# 步驟 2: 在 GitHub 設置 3 個 Secrets
# SSH_PRIVATE_KEY, SERVER_IP, SERVER_USER

# 步驟 3: 推送代碼即可自動部署
git push origin main
```

## 🔐 必需的 GitHub Secrets

| Secret | 說明 | 範例 |
|--------|------|------|
| `SSH_PRIVATE_KEY` | SSH 私鑰完整內容 | `-----BEGIN OPENSSH...` |
| `SERVER_IP` | 伺服器 IP 或域名 | `192.168.1.100` |
| `SERVER_USER` | SSH 登入用戶 | `ubuntu` |
| `SERVER_PATH` | 部署路徑（可選） | `/opt/junaikey` |

## 📂 部署文件結構

```
deployment/
├── README.md                    # 完整部署指南
├── SECRETS.md                   # GitHub Secrets 配置指南
├── DEPLOYMENT_BEST_PRACTICES.md # 部署最佳實踐（新）⭐
├── setup-server.sh              # 一鍵伺服器設置腳本 ⭐
├── pre-deployment-check.sh      # 部署前檢查腳本（新）⭐
├── mcp-server.service           # systemd 服務配置
├── backup.sh                    # 備份腳本
├── health-check.sh              # 健康檢查腳本
└── rollback.sh                  # 回滾腳本

.github/workflows/
└── deploy.yml                   # GitHub Actions 部署工作流程 ⭐
```

## 🛠️ 常用命令

### 伺服器端

```bash
# 查看服務狀態
sudo systemctl status mcp-server

# 查看實時日誌
sudo journalctl -u mcp-server -f

# 重啟服務
sudo systemctl restart mcp-server

# 健康檢查
bash /opt/junaikey/deployment/health-check.sh

# 手動備份
bash /opt/junaikey/deployment/backup.sh

# 回滾
bash /opt/junaikey/deployment/rollback.sh junaikey_20240101_120000
```

### 本地開發

```bash
# 部署前檢查（推薦）⭐
bash deployment/pre-deployment-check.sh

# 生成 SSH 金鑰
ssh-keygen -t ed25519 -C "github-actions" -f ~/.ssh/junaikey_deploy

# 複製公鑰到伺服器
ssh-copy-id -i ~/.ssh/junaikey_deploy.pub user@server_ip

# 測試 SSH 連接
ssh -i ~/.ssh/junaikey_deploy user@server_ip

# 查看私鑰（用於 GitHub Secret）
cat ~/.ssh/junaikey_deploy

# 本地構建測試
npm run build

# 本地運行測試
npm test
```

## 🔄 部署流程圖

```
┌─────────────────┐
│   開發者推送代碼    │
│   git push       │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│ GitHub Actions  │
│   自動觸發        │
└────────┬────────┘
         │
         ├─── 🔧 設置環境 (Node.js 20)
         ├─── 📦 安裝依賴 (npm ci)
         ├─── 🏗️ 構建項目 (npm run build)
         ├─── 🧪 運行測試 (npm test)
         │
         ▼
┌─────────────────┐
│  SSH 連接伺服器   │
│  使用私鑰認證     │
└────────┬────────┘
         │
         ├─── 📥 拉取最新代碼 (git pull)
         ├─── 📦 安裝依賴 (npm ci)
         ├─── 🏗️ 構建項目 (npm run build)
         ├─── 🔄 重啟服務 (systemctl restart)
         │
         ▼
┌─────────────────┐
│  ✅ 部署完成      │
│  📢 發送通知      │
└─────────────────┘
```

## 🆘 故障排除

### 快速診斷

```bash
# 運行部署前檢查
bash deployment/pre-deployment-check.sh
```

### 常見問題

| 問題 | 快速診斷 | 解決方案 |
|------|----------|----------|
| **構建失敗** | `npm run build` 本地測試 | 檢查缺失依賴，參考 [部署最佳實踐](DEPLOYMENT_BEST_PRACTICES.md#1-構建失敗-80-的部署失敗) |
| **SSH 連接失敗** | `ssh -i ~/.ssh/junaikey_deploy user@ip` | 檢查公鑰是否在伺服器 `~/.ssh/authorized_keys` |
| **Secrets 未設置** | 查看 GitHub Actions 日誌 | 前往 Settings → Secrets → Actions 檢查 |
| **systemctl 需要密碼** | `sudo systemctl status mcp-server` | 配置 `/etc/sudoers.d/mcp-server` |
| **服務無法啟動** | `sudo journalctl -u mcp-server -n 50` | 查看錯誤日誌 |
| **權限錯誤** | `ls -la /opt/junaikey` | 檢查目錄所有權 `chown` |

### 詳細故障排除

完整的故障排除指南請參考：
- [部署最佳實踐 - 常見部署失敗原因](DEPLOYMENT_BEST_PRACTICES.md#-常見部署失敗原因)
- [完整部署指南 - 故障排除](README.md#-故障排除)

## 📚 詳細文檔

- **[部署最佳實踐](./DEPLOYMENT_BEST_PRACTICES.md)** ⭐ **防止部署失敗必讀**
- [完整部署指南](./README.md) - 包含所有配置和故障排除
- [Secrets 配置指南](./SECRETS.md) - 詳細的 SSH 和 Secrets 設置
- [GitHub Actions 文檔](https://docs.github.com/en/actions)
- [systemd 服務管理](https://www.freedesktop.org/software/systemd/man/)

## ✅ 部署檢查清單

### 部署前（本地）
- [ ] 運行 `bash deployment/pre-deployment-check.sh` 通過
- [ ] 本地構建成功 `npm run build`
- [ ] 本地測試通過 `npm test`
- [ ] 所有更改已提交 `git status`

### 伺服器準備
- [ ] 伺服器已安裝 Node.js 18+, Git, systemd
- [ ] 已創建部署目錄 `/opt/junaikey`
- [ ] 已執行 `setup-server.sh` 腳本
- [ ] systemd 服務已安裝並運行
- [ ] sudo 免密碼已配置

### GitHub 配置
- [ ] SSH 金鑰已生成並複製到伺服器
- [ ] 可以無密碼 SSH 登入伺服器
- [ ] GitHub Secrets 已全部設置
  - [ ] SSH_PRIVATE_KEY
  - [ ] SERVER_IP
  - [ ] SERVER_USER
  - [ ] SERVER_PATH (可選)

### 驗證
- [ ] 已測試提交觸發部署
- [ ] 已驗證服務正常運行
- [ ] 已檢查 GitHub Actions 日誌

## 🌟 進階功能

### Slack 通知

1. 創建 Slack Incoming Webhook
2. 添加 `SLACK_WEBHOOK_URL` 到 GitHub Secrets
3. 取消註釋 `deploy.yml` 中的 Slack 通知部分

### 多環境部署

```bash
# 在 GitHub Actions 手動運行
選擇環境: production 或 staging
```

### 自動回滾

```bash
# 在伺服器執行定時任務
*/5 * * * * /opt/junaikey/deployment/health-check.sh || /opt/junaikey/deployment/rollback.sh
```

---

💡 **提示**: 首次部署建議先在測試環境驗證，確認無誤後再部署到生產環境。

📧 **支援**: 遇到問題？查看 [完整部署指南](./README.md) 或在 [GitHub Issues](https://github.com/DingJun1028/junaikey/issues) 提問。
