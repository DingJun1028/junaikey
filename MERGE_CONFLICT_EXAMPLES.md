# 合併衝突實戰案例 | Merge Conflict Real-World Examples

> **目的 | Purpose:** 提供真實場景下的合併衝突解決案例，幫助快速學習和應對具體問題

---

## 📚 案例總覽 | Case Study Overview

本文檔包含以下實戰案例：

1. **package.json 依賴衝突** - 最常見的場景
2. **.gitignore 規則衝突** - 簡單但重要
3. **工作流程配置衝突** - CI/CD 相關
4. **代碼邏輯衝突** - 需要仔細分析
5. **文檔內容衝突** - 格式和內容
6. **多文件級聯衝突** - 複雜場景

---

## 案例 1: package.json 依賴衝突

### 場景描述

**背景:**
- 主分支更新了 `react` 從 18.2.0 到 18.3.0
- PR 分支添加了新依賴 `zustand` 和 `axios`
- 合併時 `package.json` 產生衝突

### 衝突內容

```json
<<<<<<< HEAD
{
  "dependencies": {
    "react": "^18.3.0",
    "react-dom": "^18.3.0"
  }
}
=======
{
  "dependencies": {
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "zustand": "^4.3.8",
    "axios": "^1.4.0"
  }
}
>>>>>>> pr-branch
```

### 解決步驟

1. **分析衝突**
   - 主分支: 升級了 React 版本
   - PR 分支: 添加了新依賴
   - 目標: 保留兩者的改進

2. **手動解決**
   ```json
   {
     "dependencies": {
       "react": "^18.3.0",
       "react-dom": "^18.3.0",
       "zustand": "^4.3.8",
       "axios": "^1.4.0"
     }
   }
   ```

3. **驗證和完成**
   ```bash
   # 移除衝突標記後
   git add package.json
   
   # 重新生成 lock file
   npm install
   git add package-lock.json
   
   # 完成合併
   git commit -m "Resolve package.json conflict: merge React upgrade with new dependencies"
   
   # 驗證
   npm run build
   npm test
   ```

### 關鍵要點

- ✅ **保留所有依賴項**：不要刪除任何一方的依賴
- ✅ **使用最新版本**：優先選擇較新的版本號
- ✅ **重新生成 lock file**：確保依賴樹一致
- ⚠️ **注意兼容性**：檢查依賴之間的版本兼容性

---

## 案例 2: .gitignore 規則衝突

### 場景描述

**背景:**
- 主分支添加了 `node_modules/` 和 `dist/`
- PR 分支添加了 `.env` 和 `*.log`
- 合併時 `.gitignore` 產生衝突

### 衝突內容

```
<<<<<<< HEAD
# Dependencies
node_modules/

# Build output
dist/
=======
# Environment files
.env
.env.local

# Logs
*.log
npm-debug.log*
>>>>>>> pr-branch
```

### 解決步驟

1. **合併所有規則**
   ```
   # Dependencies
   node_modules/
   
   # Build output
   dist/
   
   # Environment files
   .env
   .env.local
   
   # Logs
   *.log
   npm-debug.log*
   ```

2. **優化組織**
   ```
   # Dependencies
   node_modules/
   
   # Build output
   dist/
   build/
   
   # Environment files
   .env
   .env.local
   .env.*.local
   
   # Logs
   *.log
   npm-debug.log*
   yarn-debug.log*
   yarn-error.log*
   
   # Editor directories
   .vscode/
   .idea/
   ```

3. **驗證**
   ```bash
   git add .gitignore
   git commit -m "Merge .gitignore rules from both branches"
   
   # 測試忽略規則
   git status  # 確保不該追蹤的文件被忽略
   ```

### 關鍵要點

- ✅ **合併所有規則**：保留兩方的忽略模式
- ✅ **按類別組織**：使用註釋分組
- ✅ **去除重複**：檢查並移除重複項
- 💡 **額外優化**：可以添加更多常見忽略規則

---

## 案例 3: GitHub Actions 工作流程衝突

### 場景描述

**背景:**
- 主分支更新了部署步驟，添加了測試
- PR 分支修復了 SSH 配置問題
- `.github/workflows/deploy.yml` 產生衝突

### 衝突內容

```yaml
<<<<<<< HEAD
jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - name: Run tests
        run: |
          npm install
          npm test
      - name: Deploy
        run: npm run deploy
=======
jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - name: Setup SSH
        uses: webfactory/ssh-agent@v0.5.4
        with:
          ssh-private-key: ${{ secrets.SSH_PRIVATE_KEY }}
      - name: Deploy
        run: npm run deploy
>>>>>>> pr-branch
```

### 解決步驟

1. **合併兩個版本的改進**
   ```yaml
   jobs:
     deploy:
       runs-on: ubuntu-latest
       steps:
         - uses: actions/checkout@v3
         
         - name: Install dependencies
           run: npm install
         
         - name: Run tests
           run: npm test
         
         - name: Setup SSH
           uses: webfactory/ssh-agent@v0.5.4
           with:
             ssh-private-key: ${{ secrets.SSH_PRIVATE_KEY }}
         
         - name: Deploy
           run: npm run deploy
   ```

2. **提交**
   ```bash
   git add .github/workflows/deploy.yml
   git commit -m "Merge deployment workflow: add tests and fix SSH setup"
   ```

### 關鍵要點

- ✅ **保留所有步驟**：測試和 SSH 配置都很重要
- ✅ **正確順序**：測試應在部署前執行
- ✅ **清晰命名**：每個步驟都有描述性名稱
- ⚠️ **測試工作流**：確保合併後的工作流能正常運行

---

## 案例 4: 代碼邏輯衝突

### 場景描述

**背景:**
- 主分支重構了錯誤處理邏輯
- PR 分支添加了新的 API 端點
- 在同一個函數中產生衝突

### 衝突內容

```typescript
<<<<<<< HEAD
export async function handleRequest(req: Request): Promise<Response> {
  try {
    const data = await fetchData(req.url);
    return new Response(JSON.stringify(data), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error) {
    console.error('Request failed:', error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500 }
    );
  }
}
=======
export async function handleRequest(req: Request): Promise<Response> {
  const url = new URL(req.url);
  
  if (url.pathname === '/api/users') {
    const users = await getUsers();
    return new Response(JSON.stringify(users));
  }
  
  const data = await fetchData(req.url);
  return new Response(JSON.stringify(data));
}
>>>>>>> pr-branch
```

### 解決步驟

1. **分析兩個版本的目的**
   - 主分支: 添加了完整的錯誤處理
   - PR 分支: 添加了新的路由邏輯
   - 需要: 保留兩者的邏輯

2. **合併後的代碼**
   ```typescript
   export async function handleRequest(req: Request): Promise<Response> {
     try {
       const url = new URL(req.url);
       
       // 新的 API 端點處理
       if (url.pathname === '/api/users') {
         const users = await getUsers();
         return new Response(JSON.stringify(users), {
           status: 200,
           headers: { 'Content-Type': 'application/json' }
         });
       }
       
       // 原有的數據獲取邏輯
       const data = await fetchData(req.url);
       return new Response(JSON.stringify(data), {
         status: 200,
         headers: { 'Content-Type': 'application/json' }
       });
     } catch (error) {
       // 統一的錯誤處理
       console.error('Request failed:', error);
       return new Response(
         JSON.stringify({ error: error.message }),
         { 
           status: 500,
           headers: { 'Content-Type': 'application/json' }
         }
       );
     }
   }
   ```

3. **測試**
   ```bash
   git add src/handler.ts
   git commit -m "Merge request handler: add new API endpoint with error handling"
   
   # 運行測試
   npm test
   
   # 手動測試新端點
   curl http://localhost:3000/api/users
   ```

### 關鍵要點

- ✅ **理解意圖**：分析每個版本想要達成的目標
- ✅ **保留邏輯**：確保兩個改進都被包含
- ✅ **測試覆蓋**：測試所有代碼路徑
- ⚠️ **代碼質量**：確保合併後代碼仍然清晰易讀

---

## 案例 5: README 文檔衝突

### 場景描述

**背景:**
- 主分支更新了安裝說明
- PR 分支添加了 API 使用示例
- `README.md` 在同一區域產生衝突

### 衝突內容

```markdown
<<<<<<< HEAD
## Installation

```bash
npm install junaikey
```

## Quick Start

Run the following command to start:
```bash
npm start
```
=======
## Installation

Download and install from GitHub:
```bash
git clone https://github.com/user/junaikey.git
cd junaikey
npm install
```

## API Usage

```javascript
import { JunAiKey } from 'junaikey';

const key = new JunAiKey();
await key.initialize();
```
>>>>>>> pr-branch
```

### 解決步驟

1. **合併並組織內容**
   ```markdown
   ## Installation
   
   ### Via NPM
   ```bash
   npm install junaikey
   ```
   
   ### From Source
   ```bash
   git clone https://github.com/user/junaikey.git
   cd junaikey
   npm install
   ```
   
   ## Quick Start
   
   Run the following command to start:
   ```bash
   npm start
   ```
   
   ## API Usage
   
   ```javascript
   import { JunAiKey } from 'junaikey';
   
   const key = new JunAiKey();
   await key.initialize();
   ```
   ```

2. **提交**
   ```bash
   git add README.md
   git commit -m "Merge README: combine installation methods and add API examples"
   ```

### 關鍵要點

- ✅ **組織結構**：使用小標題組織不同的內容
- ✅ **保留所有信息**：不要丟失任何有用的文檔
- ✅ **格式一致**：確保 Markdown 格式正確
- 💡 **增強可讀性**：可以添加更多示例和說明

---

## 案例 6: 多文件級聯衝突

### 場景描述

**背景:**
- 一個大型 PR 影響了多個文件
- 主分支也有多處更新
- 產生了 5+ 個文件的衝突

### 涉及文件

1. `package.json` - 依賴衝突
2. `src/config.ts` - 配置衝突
3. `src/api/index.ts` - 代碼衝突
4. `.github/workflows/test.yml` - 工作流衝突
5. `README.md` - 文檔衝突

### 解決策略

1. **按優先級處理**
   ```bash
   # 1. 先解決配置文件（影響其他文件）
   git checkout --ours package.json
   npm install
   git add package.json package-lock.json
   
   # 2. 解決配置代碼
   # 手動編輯 src/config.ts
   git add src/config.ts
   
   # 3. 解決 API 代碼
   # 手動編輯 src/api/index.ts
   git add src/api/index.ts
   
   # 4. 解決工作流
   # 手動編輯 .github/workflows/test.yml
   git add .github/workflows/test.yml
   
   # 5. 最後解決文檔
   # 手動編輯 README.md
   git add README.md
   ```

2. **逐步驗證**
   ```bash
   # 每解決一組相關文件後測試
   npm run build
   npm test
   
   # 全部解決後再次完整測試
   npm run lint
   npm run build
   npm test
   
   # 完成合併
   git commit -m "Resolve multiple merge conflicts across configuration, code, and docs"
   ```

### 關鍵要點

- ✅ **分而治之**：按依賴關係順序處理
- ✅ **頻繁測試**：每解決一組就測試
- ✅ **保持專注**：一次只處理相關的衝突
- ⚠️ **細心檢查**：多文件衝突容易遺漏
- 💡 **創建檢查清單**：跟蹤已解決的文件

---

## 🎯 通用解決模式 | Common Resolution Patterns

### 模式 1: 配置合併

**適用於**: package.json, .gitignore, tsconfig.json 等

**原則**:
```
1. 列出所有配置項
2. 合併不衝突的項
3. 對於衝突項，選擇較優或較新的值
4. 保留兩方的唯一配置
```

### 模式 2: 代碼邏輯合併

**適用於**: .ts, .js, .tsx 等源代碼

**原則**:
```
1. 理解兩個版本的業務邏輯
2. 保留主分支的核心邏輯
3. 插入 PR 的新功能
4. 確保合併後語義正確
5. 重構以提高可讀性
```

### 模式 3: 文檔內容合併

**適用於**: README.md, .md 文檔

**原則**:
```
1. 合併所有獨特的內容
2. 使用標題組織結構
3. 移除重複的章節
4. 統一格式和風格
5. 確保鏈接有效
```

---

## 🛠️ 實用技巧 | Practical Tips

### 技巧 1: 使用 Git 三方比較工具

```bash
# 查看衝突的三個版本
git show :1:file.txt  # 共同祖先
git show :2:file.txt  # 當前分支 (ours)
git show :3:file.txt  # 合併分支 (theirs)

# 使用可視化工具
git mergetool
```

### 技巧 2: 分階段提交

```bash
# 解決一部分衝突後先添加
git add file1.js file2.js

# 繼續解決其他衝突
# 解決後再添加
git add file3.js

# 全部解決後才提交
git commit
```

### 技巧 3: 使用臨時分支測試

```bash
# 創建測試分支
git checkout -b test-merge-solution

# 嘗試解決方案
# 如果成功
git checkout original-branch
git merge test-merge-solution

# 如果失敗
git checkout original-branch
git branch -D test-merge-solution
```

### 技巧 4: 自動化檢查

```bash
# 檢查是否還有衝突標記
grep -r "<<<<<<< HEAD" .
grep -r "=======" .
grep -r ">>>>>>>" .

# 如果沒有輸出，說明已清理乾淨
```

---

## 📊 衝突複雜度評估 | Conflict Complexity Assessment

### 簡單衝突 (5-10 分鐘)
- ✅ .gitignore 規則
- ✅ README 添加內容
- ✅ 簡單配置更新

### 中等衝突 (15-30 分鐘)
- ⚠️ package.json 依賴
- ⚠️ 工作流程配置
- ⚠️ 類型定義文件

### 複雜衝突 (30-60 分鐘)
- 🔴 核心業務邏輯
- 🔴 多文件級聯
- 🔴 重構與新功能

### 評估標準
```
簡單: 內容追加，無邏輯衝突
中等: 配置合併，需要理解上下文
複雜: 邏輯衝突，需要深入理解業務
```

---

## 🎓 學習路徑 | Learning Path

### 新手 (Beginner)
1. 從簡單的 .gitignore 衝突開始
2. 練習 README 文檔衝突
3. 學習使用 Git 基本命令

### 中級 (Intermediate)
1. 處理 package.json 依賴衝突
2. 解決工作流程配置衝突
3. 學習使用可視化工具

### 高級 (Advanced)
1. 解決複雜的代碼邏輯衝突
2. 處理多文件級聯衝突
3. 制定衝突解決策略

---

## 📞 獲取更多幫助 | Get More Help

### 相關文檔
- 📖 [快速參考](./MERGE_CONFLICT_QUICK_REFERENCE.md) - 常用命令
- 📋 [詳細指南](./MERGE_CONFLICT_RESOLUTION_GUIDE.md) - 完整步驟
- 📊 [實施計劃](./MERGE_RESOLUTION_IMPLEMENTATION.md) - 策略規劃

### 外部資源
- [Pro Git Book](https://git-scm.com/book/en/v2)
- [GitHub Skills](https://skills.github.com/)
- [Git Merge Conflicts Tutorial](https://www.atlassian.com/git/tutorials/using-branches/merge-conflicts)

---

**創建時間**: 2025-10-18  
**版本**: 1.0  
**狀態**: ✅ 生產就緒  
**維護**: junaikey 項目團隊
