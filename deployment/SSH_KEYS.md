# 🔑 JunAiKey SSH Keys Registry

本文件記錄所有授權訪問 JunAiKey 專案的 SSH 公鑰。

## 📋 目錄

- [概述](#概述)
- [授權的 SSH 金鑰](#授權的-ssh-金鑰)
- [如何添加新金鑰](#如何添加新金鑰)
- [如何驗證金鑰](#如何驗證金鑰)
- [安全最佳實踐](#安全最佳實踐)

---

## 🎯 概述

此文件維護所有授權設備和服務的 SSH 公鑰列表，用於：

- Git 操作 (clone, pull, push)
- 伺服器部署訪問
- 自動化工作流程

**重要提示**：
- 此文件僅記錄公鑰指紋，不包含完整的公鑰內容
- 實際的公鑰應添加到 GitHub 帳戶或伺服器的 `~/.ssh/authorized_keys`
- 私鑰必須妥善保管，永遠不要提交到版本控制

---

## 🔐 授權的 SSH 金鑰

### 1. WorkingCopy @ iPhone

**設備**: iPhone  
**應用**: WorkingCopy  
**用戶**: 14062025  
**金鑰類型**: SSH  
**指紋 (SHA256)**: `0g4yEBh09KUlUDM6f47kMlGlxF99d13zmUJ2KDSjk84`  
**添加日期**: 2025-10-18  
**用途**: iOS 設備上的 Git 操作  
**狀態**: ✅ 已授權

**說明**:  
此金鑰用於在 iPhone 上使用 WorkingCopy 應用程式進行 Git 操作，包括克隆倉庫、拉取更新和推送變更。

**如何使用**:
1. 在 WorkingCopy 應用中生成 SSH 金鑰（如果尚未生成）
2. 複製公鑰
3. 添加到 GitHub 帳戶的 SSH 金鑰設置中
4. 使用 SSH URL 克隆倉庫：`git@github.com:DingJun1028/junaikey.git`

---

### 2. GitHub Actions Deploy Key

**服務**: GitHub Actions  
**工作流程**: 自動部署  
**金鑰類型**: ed25519  
**用途**: CI/CD 自動化部署到生產伺服器  
**狀態**: ✅ 已授權

**說明**:  
用於 GitHub Actions 工作流程自動部署到伺服器。私鑰儲存在 GitHub Secrets 中 (`SSH_PRIVATE_KEY`)。

詳細配置請參考：[SECRETS.md](./SECRETS.md)

---

## 📝 如何添加新金鑰

### 步驟 1: 生成 SSH 金鑰

#### 在 macOS/Linux/Windows (Git Bash) 上：

```bash
# 生成 ed25519 金鑰（推薦）
ssh-keygen -t ed25519 -C "your_email@example.com" -f ~/.ssh/junaikey_key

# 或生成 RSA 金鑰（相容性較好）
ssh-keygen -t rsa -b 4096 -C "your_email@example.com" -f ~/.ssh/junaikey_key
```

#### 在 iOS (WorkingCopy) 上：

1. 打開 WorkingCopy 應用
2. 點擊設置 (Settings)
3. 選擇 SSH Keys
4. 點擊 "+" 創建新金鑰
5. 輸入描述性名稱（例如：junaikey-iphone）
6. 複製公鑰

### 步驟 2: 獲取金鑰指紋

```bash
# 獲取 SHA256 指紋
ssh-keygen -lf ~/.ssh/junaikey_key.pub

# 輸出範例：
# 256 SHA256:0g4yEBh09KUlUDM6f47kMlGlxF99d13zmUJ2KDSjk84 your_email@example.com (ED25519)
```

### 步驟 3: 添加公鑰到 GitHub

1. 複製公鑰內容：
   ```bash
   cat ~/.ssh/junaikey_key.pub
   ```

2. 前往 GitHub 設置：
   - 登入 GitHub
   - 點擊右上角頭像 → Settings
   - 左側菜單選擇 "SSH and GPG keys"
   - 點擊 "New SSH key"
   - 貼上公鑰內容
   - 添加描述性標題（例如：WorkingCopy-iPhone）
   - 點擊 "Add SSH key"

### 步驟 4: 測試連接

```bash
# 測試 GitHub SSH 連接
ssh -T git@github.com

# 成功訊息：
# Hi username! You've successfully authenticated, but GitHub does not provide shell access.
```

### 步驟 5: 更新此文件

在此文件中添加新金鑰的記錄，包括：
- 設備/服務名稱
- 金鑰類型
- SHA256 指紋
- 用途說明
- 添加日期

---

## 🔍 如何驗證金鑰

### 驗證本地金鑰

```bash
# 列出所有已添加的 SSH 金鑰
ssh-add -l

# 驗證特定金鑰的指紋
ssh-keygen -lf ~/.ssh/junaikey_key.pub
```

### 驗證 GitHub 連接

```bash
# 測試 SSH 連接
ssh -T git@github.com

# 使用特定金鑰測試
ssh -T -i ~/.ssh/junaikey_key git@github.com

# 詳細模式（用於調試）
ssh -vT git@github.com
```

### 驗證伺服器訪問

```bash
# 測試伺服器 SSH 連接
ssh -i ~/.ssh/junaikey_key user@server_ip "echo 'Connection successful!'"
```

---

## 🔒 安全最佳實踐

### 1. 金鑰管理

- ✅ 為不同用途使用不同的 SSH 金鑰
- ✅ 使用強密碼保護私鑰（除非用於自動化）
- ✅ 定期輪換 SSH 金鑰（建議每 6-12 個月）
- ✅ 當設備遺失或金鑰洩露時，立即撤銷相關金鑰
- ❌ 永遠不要共享私鑰
- ❌ 永遠不要將私鑰提交到版本控制

### 2. 金鑰權限

```bash
# 設置正確的文件權限
chmod 700 ~/.ssh
chmod 600 ~/.ssh/id_*
chmod 644 ~/.ssh/*.pub
chmod 600 ~/.ssh/authorized_keys
chmod 644 ~/.ssh/known_hosts
```

### 3. SSH 配置

在 `~/.ssh/config` 中配置主機別名：

```
# GitHub
Host github.com
  HostName github.com
  User git
  IdentityFile ~/.ssh/junaikey_key
  IdentitiesOnly yes

# JunAiKey 伺服器
Host junaikey-server
  HostName server.example.com
  User deploy
  IdentityFile ~/.ssh/junaikey_deploy
  IdentitiesOnly yes
```

### 4. 撤銷金鑰

當金鑰需要撤銷時：

1. 從 GitHub 刪除金鑰：
   - Settings → SSH and GPG keys
   - 找到要刪除的金鑰
   - 點擊 "Delete"

2. 從伺服器刪除金鑰：
   ```bash
   # 編輯 authorized_keys
   ssh user@server "nano ~/.ssh/authorized_keys"
   # 刪除對應的公鑰行
   ```

3. 更新此文件，標記金鑰狀態為 "❌ 已撤銷"

### 5. 監控和審計

- 定期檢查 GitHub 帳戶中的授權金鑰
- 監控 SSH 登入日誌
- 使用 GitHub 的安全日誌功能
- 啟用雙因素認證 (2FA)

---

## 📚 相關資源

### 官方文檔

- [GitHub SSH 金鑰文檔](https://docs.github.com/en/authentication/connecting-to-github-with-ssh)
- [WorkingCopy SSH 設置指南](https://workingcopyapp.com/manual/ssh-keys)
- [OpenSSH 金鑰管理](https://www.openssh.com/manual.html)

### 內部文檔

- [部署指南](./README.md)
- [GitHub Secrets 配置](./SECRETS.md)
- [完整設置指南](./COMPLETE_SETUP_GUIDE.md)

---

## 📞 支援

如有 SSH 金鑰相關問題，請：

1. 查看本文檔的常見問題部分
2. 參考 [deployment/README.md](./README.md) 故障排除章節
3. 在 GitHub Issues 提問
4. 聯繫團隊管理員

---

**最後更新**: 2025-10-18  
**維護者**: JunAiKey Team
