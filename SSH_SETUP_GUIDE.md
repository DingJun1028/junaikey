# 🔑 SSH 金鑰設置快速指南

本指南幫助您快速設置 SSH 金鑰以訪問 JunAiKey 專案。

## 📱 iOS (WorkingCopy) 設置

如果您使用 iPhone/iPad 上的 WorkingCopy 應用來管理 Git 倉庫，請按照以下步驟操作：

### 步驟 1: 在 WorkingCopy 中生成 SSH 金鑰

1. 打開 **WorkingCopy** 應用
2. 點擊右上角的 **⚙️ 設置** (Settings)
3. 向下滾動找到 **🔑 SSH Keys**
4. 點擊右上角的 **+** 按鈕
5. 輸入金鑰描述，例如：`JunAiKey-iPhone`
6. 點擊 **Generate** 生成新金鑰
7. 金鑰生成後，點擊金鑰查看詳情

### 步驟 2: 複製公鑰

1. 在金鑰詳情頁面，找到 **Public Key** 部分
2. 點擊 **Copy** 按鈕複製公鑰
3. 公鑰格式類似：
   ```
   ssh-ed25519 AAAAC3NzaC1lZDI1NTE5AAAAIxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx WorkingCopy@iPhone
   ```

### 步驟 3: 添加公鑰到 GitHub

1. 在 iPhone 上打開 Safari 瀏覽器
2. 訪問 [GitHub.com](https://github.com) 並登入
3. 點擊右上角頭像 → **Settings**
4. 在左側菜單中選擇 **SSH and GPG keys**
5. 點擊 **New SSH key** 綠色按鈕
6. 填寫表單：
   - **Title**: `WorkingCopy @ iPhone-14062025`（或其他描述性名稱）
   - **Key**: 貼上剛才複製的公鑰
7. 點擊 **Add SSH key**
8. 如果需要，輸入 GitHub 密碼確認

### 步驟 4: 在 WorkingCopy 中克隆倉庫

1. 返回 **WorkingCopy** 應用
2. 點擊右上角的 **+** 按鈕
3. 選擇 **Clone repository**
4. 在 URL 欄位輸入 SSH URL：
   ```
   git@github.com:DingJun1028/junaikey.git
   ```
5. 點擊 **Clone**
6. 首次連接時，會提示確認 GitHub 的指紋，點擊 **Accept**
7. 克隆完成後，您就可以在 iPhone 上編輯和推送代碼了！

### 步驟 5: 驗證設置（可選）

1. 在 WorkingCopy 中，打開克隆的倉庫
2. 嘗試進行一次提交和推送操作
3. 如果成功推送，說明 SSH 金鑰設置正確

---

## 💻 桌面設置 (macOS/Linux/Windows)

### macOS / Linux

```bash
# 1. 生成 SSH 金鑰
ssh-keygen -t ed25519 -C "your_email@example.com" -f ~/.ssh/junaikey_key

# 2. 將金鑰添加到 SSH agent
eval "$(ssh-agent -s)"
ssh-add ~/.ssh/junaikey_key

# 3. 複製公鑰
cat ~/.ssh/junaikey_key.pub | pbcopy  # macOS
# 或
cat ~/.ssh/junaikey_key.pub  # Linux (手動複製)

# 4. 測試連接
ssh -T git@github.com

# 5. 克隆倉庫
git clone git@github.com:DingJun1028/junaikey.git
```

### Windows (Git Bash)

```bash
# 1. 生成 SSH 金鑰
ssh-keygen -t ed25519 -C "your_email@example.com" -f ~/.ssh/junaikey_key

# 2. 啟動 SSH agent
eval "$(ssh-agent -s)"
ssh-add ~/.ssh/junaikey_key

# 3. 複製公鑰
cat ~/.ssh/junaikey_key.pub | clip

# 4. 測試連接
ssh -T git@github.com

# 5. 克隆倉庫
git clone git@github.com:DingJun1028/junaikey.git
```

然後訪問 [GitHub SSH 設置頁面](https://github.com/settings/keys) 添加公鑰。

---

## 🔍 常見問題

### Q1: WorkingCopy 顯示 "Authentication failed"

**解決方案**:
1. 確認公鑰已正確添加到 GitHub
2. 檢查 URL 是否使用 SSH 格式（`git@github.com:...`）而非 HTTPS
3. 嘗試刪除並重新添加 SSH 金鑰

### Q2: 如何查看 SSH 金鑰指紋？

在 WorkingCopy 中：
1. 設置 → SSH Keys
2. 點擊金鑰
3. 查看 **Fingerprint** 欄位

在桌面終端中：
```bash
ssh-keygen -lf ~/.ssh/junaikey_key.pub
```

### Q3: 可以在多個設備使用同一個 SSH 金鑰嗎？

**不推薦**。建議為每個設備生成獨立的 SSH 金鑰，這樣：
- 更容易追蹤哪個設備進行了操作
- 如果一個設備遺失，只需撤銷該設備的金鑰
- 更符合安全最佳實踐

### Q4: SSH 金鑰和 HTTPS 有什麼區別？

| 特性 | SSH | HTTPS |
|------|-----|-------|
| 認證方式 | 金鑰對 | 用戶名/密碼或令牌 |
| 安全性 | 更高 | 中等 |
| 設置複雜度 | 較複雜 | 簡單 |
| 推薦用途 | 開發、自動化 | 臨時訪問 |

**建議**: 日常開發使用 SSH，臨時訪問使用 HTTPS。

### Q5: 忘記 SSH 金鑰密碼怎麼辦？

如果設置了密碼但忘記了：
1. 無法恢復密碼
2. 需要生成新的 SSH 金鑰
3. 刪除舊金鑰，添加新金鑰到 GitHub

---

## 📚 進階設置

### SSH Config 配置

創建或編輯 `~/.ssh/config` 文件：

```
# GitHub 主帳戶
Host github.com
  HostName github.com
  User git
  IdentityFile ~/.ssh/junaikey_key
  IdentitiesOnly yes

# GitHub 工作帳戶（如果有多個帳戶）
Host github-work
  HostName github.com
  User git
  IdentityFile ~/.ssh/junaikey_work_key
  IdentitiesOnly yes
```

使用時：
```bash
# 主帳戶
git clone git@github.com:DingJun1028/junaikey.git

# 工作帳戶
git clone git@github-work:company/project.git
```

### 金鑰指紋記錄

當前專案已授權的 SSH 金鑰：

| 設備 | 指紋 (SHA256) | 狀態 |
|------|---------------|------|
| WorkingCopy @ iPhone | `0g4yEBh09KUlUDM6f47kMlGlxF99d13zmUJ2KDSjk84` | ✅ 已授權 |

完整金鑰列表請查看：[deployment/SSH_KEYS.md](./deployment/SSH_KEYS.md)

---

## 🔗 相關資源

### 官方文檔
- [GitHub SSH 文檔](https://docs.github.com/en/authentication/connecting-to-github-with-ssh)
- [WorkingCopy 幫助](https://workingcopyapp.com/manual)

### 專案文檔
- [完整 SSH 金鑰註冊表](./deployment/SSH_KEYS.md)
- [部署指南](./deployment/README.md)
- [GitHub Secrets 配置](./deployment/SECRETS.md)

---

## 🆘 需要幫助？

如果遇到問題：

1. 查看本指南的[常見問題](#常見問題)部分
2. 檢查 [deployment/SSH_KEYS.md](./deployment/SSH_KEYS.md) 的故障排除章節
3. 在 [GitHub Issues](https://github.com/DingJun1028/junaikey/issues) 提問
4. 聯繫專案維護者

---

**祝您設置順利！** 🎉

如果本指南對您有幫助，請考慮給專案加星 ⭐️
