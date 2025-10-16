# 快速參考：合併衝突解決 | Quick Reference: Merge Conflict Resolution

> **一頁速查卡 | One-Page Cheat Sheet**

---

## 🚀 快速開始 | Quick Start

```bash
# 1. 克隆完整倉庫
git clone https://github.com/DingJun1028/junaikey.git
cd junaikey

# 2. 對每個有衝突的 PR 執行
git checkout <pr-branch>
git merge origin/main

# 3. 如果有衝突，解決它們
# 編輯衝突文件，移除 <<<<<<<, =======, >>>>>>> 標記

# 4. 完成合併
git add .
git commit -m "Resolve merge conflicts with main"
git push origin <pr-branch>
```

---

## 📋 PR 處理順序 | PR Processing Order

### ✅ 第一批（簡單）
```bash
# PR #15 - .gitignore
git checkout copilot/fix-main-branch-divergence
git merge origin/main
# 合併所有 .gitignore 規則
git push origin copilot/fix-main-branch-divergence

# PR #12 - 依賴更新
git checkout dependabot/npm_and_yarn/npm_and_yarn-d4e0f13e56
git merge origin/main
npm install  # 重新生成 lock file
git push origin dependabot/npm_and_yarn/npm_and_yarn-d4e0f13e56
```

### ⚙️ 第二批（中等）
```bash
# PR #14 - 部署工作流程
git checkout copilot/fix-deployment-workflow-issues
git merge origin/main
# 合併 deploy.yml 的改進
git push origin copilot/fix-deployment-workflow-issues

# PR #19 - 部署最佳實踐
git checkout copilot/improve-github-deployment-practices
git merge origin/main
# 保留所有文檔和腳本
git push origin copilot/improve-github-deployment-practices
```

### 🔥 第三批（複雜）
```bash
# PR #17 - 標籤系統
git checkout copilot/initialize-local-tag-system
git merge origin/main
# 仔細合併依賴項和代碼
git push origin copilot/initialize-local-tag-system

# PR #2 - 文件上傳
git checkout DingJun1028-patch-2
git merge origin/main
# 可能需要大量手動編輯
git push origin DingJun1028-patch-2
```

---

## 🛠️ 常用命令 | Common Commands

### 查看衝突狀態
```bash
git status                    # 查看衝突文件
git diff --check              # 檢查衝突標記
git diff origin/main          # 查看與主分支的差異
```

### 解決衝突
```bash
# 選擇我們的版本（當前分支）
git checkout --ours <file>

# 選擇他們的版本（主分支）
git checkout --theirs <file>

# 手動編輯
code <file>  # 或使用其他編輯器
```

### 取消合併
```bash
git merge --abort             # 取消合併，回到合併前狀態
git reset --hard HEAD         # 強制重置到最新提交
```

---

## ✅ 驗證檢查 | Verification Checklist

```bash
# 基本驗證
□ git status                  # 沒有 "both modified" 文件
□ git diff --check            # 沒有衝突標記
□ npm run lint                # Lint 通過
□ npm run build               # 構建成功
□ npm test                    # 測試通過

# GitHub 驗證
□ PR 顯示 "可以合併"
□ CI/CD 檢查全部通過
□ 沒有未解決的評論
```

---

## 🎯 衝突解決原則 | Conflict Resolution Principles

### 依賴項（package.json）
```json
{
  "dependencies": {
    // ✅ 保留所有依賴
    // ✅ 使用最新版本號
    // ❌ 不要刪除任何一方的依賴
  }
}
```

### 配置文件
- ✅ 合併所有配置選項
- ✅ 保留兩方的環境變數
- ❌ 不要簡單地選擇一方

### 代碼文件
- ✅ 保留主分支的核心邏輯
- ✅ 保留 PR 的新功能
- ⚠️ 確保代碼語義正確

### 文檔文件
- ✅ 合併兩方的內容
- ✅ 確保格式一致
- ❌ 不要留下重複的章節

---

## 🚨 緊急情況 | Emergency Situations

### 衝突太複雜？
```bash
# 創建臨時分支進行實驗
git checkout -b temp-merge-test
git merge origin/main
# 如果失敗
git checkout <pr-branch>
git branch -D temp-merge-test
```

### 需要重新開始？
```bash
# 重置到遠程分支狀態
git fetch origin
git reset --hard origin/<pr-branch>
```

### 不小心提交了衝突標記？
```bash
# 修正最後一次提交
git add <fixed-file>
git commit --amend --no-edit
git push --force-with-lease origin <pr-branch>
```

---

## 📞 獲取幫助 | Get Help

### 詳細文檔
- 📖 [完整解決指南](./MERGE_CONFLICT_RESOLUTION_GUIDE.md)
- 📊 [實施計劃](./MERGE_RESOLUTION_IMPLEMENTATION.md)

### 外部資源
- [Git 官方文檔](https://git-scm.com/docs)
- [GitHub 衝突解決](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/addressing-merge-conflicts)
- [Atlassian Git 教程](https://www.atlassian.com/git/tutorials/using-branches/merge-conflicts)

### 視覺化工具
- VSCode Git 擴展
- GitHub Desktop
- GitKraken
- Beyond Compare

---

## 💡 小技巧 | Pro Tips

```bash
# 查看衝突的具體內容
git log --merge --oneline

# 查看每個分支的最後一次提交
git log --oneline --graph --all -10

# 查找所有衝突標記
grep -r "<<<<<<< HEAD" .
grep -r "=======" .
grep -r ">>>>>>>" .

# 使用 difftool 視覺化比較
git difftool origin/main

# 顯示衝突文件的兩個版本
git show :1:<file>    # 共同祖先
git show :2:<file>    # 當前分支（ours）
git show :3:<file>    # 合併分支（theirs）
```

---

## 📊 進度追蹤 | Progress Tracking

```markdown
- [ ] PR #15 - .gitignore (5 min) ⏱️
- [ ] PR #12 - 依賴更新 (10 min) ⏱️
- [ ] PR #14 - 部署工作流程 (20 min) ⏱️
- [ ] PR #19 - 部署最佳實踐 (30 min) ⏱️
- [ ] PR #17 - 標籤系統 (45 min) ⏱️
- [ ] PR #2 - 文件上傳 (60 min) ⏱️
```

**預計總時間**: 2.5-3.5 小時

---

**更新日期**: 2025-10-16  
**版本**: 1.0  
**狀態**: ✅ 就緒
