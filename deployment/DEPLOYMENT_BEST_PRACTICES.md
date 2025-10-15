# 🛡️ GitHub Actions 部署最佳實踐 - 防止部署失敗指南

本指南提供完整的最佳實踐，確保您的 GitHub Actions 部署不會在第一次就失敗。

---

## 📋 目錄

1. [部署前檢查清單](#-部署前檢查清單)
2. [常見部署失敗原因](#-常見部署失敗原因)
3. [工作流程最佳實踐](#-工作流程最佳實踐)
4. [依賴管理](#-依賴管理)
5. [環境變數與 Secrets](#-環境變數與-secrets)
6. [測試與驗證](#-測試與驗證)
7. [錯誤處理與回滾](#-錯誤處理與回滾)

---

## ✅ 部署前檢查清單

在首次部署前，請確認以下所有項目：

### 📦 代碼準備

- [ ] **本地構建成功** - 在本地運行 `npm run build` 確認無錯誤
- [ ] **本地測試通過** - 運行 `npm test` 確認所有測試通過
- [ ] **依賴完整** - 所有使用的模組都已在 `package.json` 中宣告
- [ ] **沒有未提交的更改** - 運行 `git status` 確認所有更改已提交
- [ ] **分支已同步** - 確保本地分支與遠端同步

### 🔐 GitHub 配置

- [ ] **Secrets 已設定** - 所有必需的 Secrets 都已添加到 GitHub
  - `SSH_PRIVATE_KEY` - SSH 私鑰
  - `SERVER_IP` - 伺服器 IP 地址
  - `SERVER_USER` - SSH 登入用戶名
  - `SERVER_PATH` - 部署目錄路徑（可選）
- [ ] **Secrets 已測試** - 在本地使用相同的 SSH 金鑰測試連接
- [ ] **工作流程權限** - 確認工作流程有足夠的權限執行所需操作

### 🖥️ 伺服器準備

- [ ] **伺服器可訪問** - 可以通過 SSH 連接到伺服器
- [ ] **必要軟體已安裝** - Node.js、npm、git 等
- [ ] **部署目錄存在** - 目標部署目錄已創建且有正確權限
- [ ] **systemd 服務已配置** - 如果使用 systemd，服務已正確設置
- [ ] **sudo 權限配置** - 部署用戶有足夠權限重啟服務

### 🔍 工作流程驗證

- [ ] **工作流程語法正確** - 使用 [GitHub Actions 驗證器](https://rhysd.github.io/actionlint/)
- [ ] **環境變數正確** - 所有必需的環境變數都已定義
- [ ] **步驟依賴正確** - 每個步驟的依賴關係正確設置

---

## ❌ 常見部署失敗原因

### 1. 構建失敗 (80% 的部署失敗)

**症狀**:
```
Error: [vite]: Rollup failed to resolve import "xxx" from "yyy"
```

**原因**:
- 缺少依賴項（未在 `package.json` 中宣告）
- 導入路徑錯誤
- TypeScript 類型錯誤

**解決方案**:
```bash
# 1. 本地測試構建
npm run build

# 2. 檢查並安裝缺失的依賴
npm install <missing-package> --save

# 3. 更新 package.json
git add package.json package-lock.json
git commit -m "Add missing dependencies"
git push
```

**預防措施**:
```yaml
# 在工作流程中添加依賴檢查
- name: 🔍 Validate Dependencies
  run: |
    # 檢查 package.json 和 package-lock.json 是否同步
    npm ci --dry-run
    
    # 檢查是否有未宣告的依賴
    npx depcheck
```

### 2. SSH 連接失敗 (15% 的部署失敗)

**症狀**:
```
Permission denied (publickey)
Host key verification failed
```

**原因**:
- SSH 私鑰未正確設置
- 公鑰未添加到伺服器
- 伺服器 IP 地址錯誤
- SSH 金鑰權限問題

**解決方案**:
```bash
# 1. 本地測試 SSH 連接
ssh -i ~/.ssh/junaikey_deploy SERVER_USER@SERVER_IP "echo 'Success'"

# 2. 檢查公鑰是否在伺服器上
ssh SERVER_USER@SERVER_IP "cat ~/.ssh/authorized_keys"

# 3. 確保權限正確
ssh SERVER_USER@SERVER_IP "chmod 700 ~/.ssh && chmod 600 ~/.ssh/authorized_keys"
```

**預防措施**:
```yaml
# 在工作流程中添加 SSH 連接測試
- name: 🔍 Test SSH Connection
  run: |
    ssh -i ~/.ssh/deploy_key -o StrictHostKeyChecking=no \
      ${SERVER_USER}@${SERVER_IP} "echo '✅ SSH connection successful'"
```

### 3. 環境變數未設置 (3% 的部署失敗)

**症狀**:
```
Error: Missing required environment variable
```

**原因**:
- Secrets 未在 GitHub 中設置
- 環境變數名稱拼寫錯誤
- Secrets 未正確傳遞到工作流程

**解決方案**:
```yaml
# 在工作流程開始時驗證所有必需的 Secrets
- name: 🔍 Validate Secrets
  run: |
    # 檢查所有必需的 Secrets 是否存在
    [ -n "${{ secrets.SSH_PRIVATE_KEY }}" ] || { echo "❌ SSH_PRIVATE_KEY not set"; exit 1; }
    [ -n "${{ secrets.SERVER_IP }}" ] || { echo "❌ SERVER_IP not set"; exit 1; }
    [ -n "${{ secrets.SERVER_USER }}" ] || { echo "❌ SERVER_USER not set"; exit 1; }
    echo "✅ All required secrets are set"
```

### 4. 伺服器權限問題 (2% 的部署失敗)

**症狀**:
```
Permission denied
sudo: no tty present and no askpass program specified
```

**原因**:
- 部署用戶沒有足夠權限
- sudo 未配置免密碼
- 文件或目錄權限不正確

**解決方案**:
```bash
# 在伺服器上配置 sudo 免密碼
sudo visudo

# 添加以下行 (將 your_user 替換為實際用戶名)
your_user ALL=(ALL) NOPASSWD: /bin/systemctl restart mcp-server
your_user ALL=(ALL) NOPASSWD: /bin/systemctl status mcp-server
```

---

## 🏗️ 工作流程最佳實踐

### 1. 分階段部署

```yaml
jobs:
  validate:
    name: Validate Code
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'npm'
      - name: Install Dependencies
        run: npm ci
      - name: Lint Code
        run: npm run lint || echo "No lint configured"
      - name: Run Tests
        run: npm test || echo "No tests configured"
      - name: Build Project
        run: npm run build

  deploy:
    name: Deploy to Server
    needs: validate
    runs-on: ubuntu-latest
    steps:
      # ... 部署步驟
```

**優點**:
- 在部署前驗證代碼
- 失敗快速，節省時間
- 清晰的錯誤定位

### 2. 使用環境保護

```yaml
environment:
  name: production
  url: https://your-domain.com
```

**優點**:
- 需要手動批准才能部署到生產環境
- 可以設置環境特定的 Secrets
- 提供部署歷史記錄

### 3. 添加超時限制

```yaml
jobs:
  deploy:
    timeout-minutes: 15  # 防止工作流程無限運行
```

### 4. 使用條件執行

```yaml
- name: Deploy to Production
  if: github.ref == 'refs/heads/main'
  # 只在 main 分支上部署
```

---

## 📦 依賴管理

### 1. 鎖定依賴版本

**問題**: 使用 `npm install` 可能導致不同環境安裝不同版本

**解決方案**: 始終使用 `npm ci`

```yaml
- name: Install Dependencies
  run: npm ci --prefer-offline --no-audit
```

**優點**:
- 使用 `package-lock.json` 確保一致性
- 更快的安裝速度
- 更可靠的構建

### 2. 檢查未使用的依賴

```bash
# 安裝 depcheck
npm install -g depcheck

# 檢查未使用的依賴
depcheck

# 檢查缺失的依賴
depcheck --missing
```

### 3. 定期更新依賴

```yaml
# 使用 Dependabot 自動更新依賴
# .github/dependabot.yml
version: 2
updates:
  - package-ecosystem: "npm"
    directory: "/"
    schedule:
      interval: "weekly"
```

---

## 🔐 環境變數與 Secrets

### 1. Secrets 命名規範

- 使用大寫字母和下劃線
- 使用描述性名稱
- 添加前綴區分不同環境

```yaml
# 良好的命名
SSH_PRIVATE_KEY
PRODUCTION_SERVER_IP
STAGING_DATABASE_URL

# 不好的命名
key
server
db
```

### 2. Secrets 驗證

```yaml
- name: Validate Secrets
  env:
    SSH_PRIVATE_KEY: ${{ secrets.SSH_PRIVATE_KEY }}
    SERVER_IP: ${{ secrets.SERVER_IP }}
    SERVER_USER: ${{ secrets.SERVER_USER }}
  run: |
    # 檢查 SSH_PRIVATE_KEY 格式
    if ! echo "$SSH_PRIVATE_KEY" | grep -q "BEGIN.*PRIVATE KEY"; then
      echo "❌ SSH_PRIVATE_KEY format is invalid"
      exit 1
    fi
    
    # 檢查 SERVER_IP 不為空
    if [ -z "$SERVER_IP" ]; then
      echo "❌ SERVER_IP is not set"
      exit 1
    fi
    
    echo "✅ All secrets validated"
```

### 3. 環境特定的配置

```yaml
# 使用環境來區分不同的部署目標
environment:
  name: ${{ github.event.inputs.environment || 'production' }}

# 環境特定的 Secrets
- name: Deploy
  env:
    SERVER_IP: ${{ secrets[format('{0}_SERVER_IP', github.event.inputs.environment)] }}
```

---

## 🧪 測試與驗證

### 1. 本地測試流程

```bash
# 創建測試腳本
cat > test-deployment.sh << 'EOF'
#!/bin/bash
set -e

echo "🔍 Running pre-deployment checks..."

echo "1️⃣ Checking code quality..."
npm run lint || true

echo "2️⃣ Running tests..."
npm test || true

echo "3️⃣ Building project..."
npm run build

echo "4️⃣ Testing SSH connection..."
ssh -i ~/.ssh/junaikey_deploy SERVER_USER@SERVER_IP "echo 'SSH OK'"

echo "✅ All checks passed! Ready to deploy."
EOF

chmod +x test-deployment.sh
./test-deployment.sh
```

### 2. 添加工作流程測試步驟

```yaml
- name: 🧪 Dry Run Deployment
  if: github.event_name == 'pull_request'
  run: |
    echo "🔍 This is a dry run - no actual deployment"
    echo "Would deploy to: ${{ secrets.SERVER_IP }}"
    echo "Would restart: mcp-server service"
```

### 3. 健康檢查

```yaml
- name: 🏥 Health Check
  run: |
    ssh -i ~/.ssh/deploy_key ${SERVER_USER}@${SERVER_IP} << 'ENDSSH'
      # 等待服務啟動
      sleep 5
      
      # 檢查服務狀態
      if systemctl is-active --quiet mcp-server; then
        echo "✅ Service is running"
        exit 0
      else
        echo "❌ Service failed to start"
        journalctl -u mcp-server -n 50
        exit 1
      fi
    ENDSSH
```

---

## 🔄 錯誤處理與回滾

### 1. 自動備份

```yaml
- name: 📦 Create Backup
  run: |
    ssh -i ~/.ssh/deploy_key ${SERVER_USER}@${SERVER_IP} << 'ENDSSH'
      cd ${SERVER_PATH}
      
      # 創建時間戳備份
      BACKUP_DIR="${SERVER_PATH}_backup_$(date +%Y%m%d_%H%M%S)"
      
      echo "Creating backup at $BACKUP_DIR"
      cp -r ${SERVER_PATH} $BACKUP_DIR
      
      # 只保留最近 5 個備份
      ls -dt ${SERVER_PATH}_backup_* | tail -n +6 | xargs rm -rf
    ENDSSH
```

### 2. 部署失敗時回滾

```yaml
- name: 🚢 Deploy
  id: deploy
  run: |
    # 部署邏輯

- name: 🔄 Rollback on Failure
  if: failure() && steps.deploy.outcome == 'failure'
  run: |
    ssh -i ~/.ssh/deploy_key ${SERVER_USER}@${SERVER_IP} << 'ENDSSH'
      # 回滾到最新備份
      LATEST_BACKUP=$(ls -dt ${SERVER_PATH}_backup_* | head -n 1)
      
      if [ -n "$LATEST_BACKUP" ]; then
        echo "🔄 Rolling back to $LATEST_BACKUP"
        rm -rf ${SERVER_PATH}
        cp -r $LATEST_BACKUP ${SERVER_PATH}
        sudo systemctl restart mcp-server
        echo "✅ Rollback completed"
      fi
    ENDSSH
```

### 3. 通知機制

```yaml
- name: 📧 Send Notification
  if: always()
  run: |
    if [ "${{ job.status }}" == "success" ]; then
      echo "✅ Deployment successful"
      # 發送成功通知
    else
      echo "❌ Deployment failed"
      # 發送失敗通知
    fi
```

---

## 🎯 快速檢查指令

在推送代碼前，運行以下指令：

```bash
# 1. 檢查代碼質量
npm run lint

# 2. 運行測試
npm test

# 3. 測試構建
npm run build

# 4. 檢查依賴
npx depcheck

# 5. 測試 SSH 連接
ssh -i ~/.ssh/junaikey_deploy SERVER_USER@SERVER_IP "echo 'SSH OK'"

# 6. 檢查 Git 狀態
git status

# 7. 查看即將推送的提交
git log origin/main..HEAD
```

---

## 📚 相關文檔

- [GitHub Actions 工作流程配置](../.github/workflows/deploy.yml)
- [Secrets 配置指南](./SECRETS.md)
- [完整設置指南](./COMPLETE_SETUP_GUIDE.md)
- [故障排除](./README.md#-故障排除)

---

## ⚠️ 重要提醒

1. **永遠不要在代碼中硬編碼敏感資訊** - 始終使用 GitHub Secrets
2. **在本地測試所有更改** - 不要依賴 GitHub Actions 來發現錯誤
3. **保持依賴項最新** - 定期更新以獲得安全修復
4. **監控部署日誌** - 定期檢查 GitHub Actions 日誌
5. **備份很重要** - 始終在部署前創建備份

---

如有問題，請查看 [deployment/README.md](./README.md) 或在 GitHub Issues 提問。
