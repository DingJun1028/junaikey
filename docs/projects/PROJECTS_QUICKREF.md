# GitHub Projects (beta) 快速參考指南

## 📋 快速索引

- [常用操作](#常用操作)
- [欄位管理](#欄位管理)
- [項目管理](#項目管理)
- [視圖管理](#視圖管理)
- [自動化](#自動化)
- [快捷鍵](#快捷鍵)

## 🚀 常用操作

### 存取專案

```bash
# 直接 URL
https://github.com/{OWNER}/{REPO}/projects/{NUMBER}

# 例如
https://github.com/DingJun1028/junaikey/projects/1
```

### 快速啟用

1. **Settings** → **Features** → 勾選 **Projects**
2. **Projects** 標籤 → **New project** → **New project (beta)**
3. 填寫專案名稱和描述

## 📊 欄位管理

### 欄位類型速查

| 類型 | 用途 | 範例 |
|------|------|------|
| **Text** | 文字說明 | 備註、描述 |
| **Number** | 數值資料 | 工時、優先級數值 |
| **Date** | 日期時間 | 截止日期、開始日期 |
| **Single select** | 單選選項 | 狀態、優先級、類別 |
| **Iteration** | 迭代週期 | Sprint 1, Sprint 2 |
| **Assignees** | 指派成員 | 負責人 |

### 建議的欄位設定

#### 狀態欄位 (Status)
```
- Backlog (灰色)
- To do (黃色)
- In progress (藍色)
- Review (橙色)
- Done (綠色)
```

#### 優先級欄位 (Priority)
```
- High (紅色)
- Medium (黃色)
- Low (灰色)
```

#### 領域欄位 (Area)
```
- Content (藍色) - 內容撰寫
- Visual (紫色) - 視覺設計
- Interaction (綠色) - 互動功能
- I18n (橙色) - 國際化
- DevOps (灰色) - 部署運維
```

## 📝 項目管理

### 創建項目

#### 方法一：快速創建 (Draft Issue)
1. 在看板中點擊 **+ Add item**
2. 輸入標題後按 **Enter**
3. 點擊卡片設置詳細資訊

#### 方法二：從 Issue 添加
1. 點擊 **+ Add item**
2. 選擇 **Add item from repository**
3. 搜尋並選擇 Issue

#### 方法三：直接從 Issue 添加
1. 打開 Issue 頁面
2. 右側欄 **Projects** → 選擇專案
3. 自動添加到專案

### 批量操作

#### 批量更新狀態
1. 在表格視圖中選擇多個項目
2. 使用 **Shift + 點擊** 選擇範圍
3. 拖曳到新的狀態列

#### 批量設置欄位
1. 選擇多個項目
2. 在表格視圖中直接編輯
3. 按 **Tab** 快速切換欄位

## 👁️ 視圖管理

### 常用視圖類型

#### Board (看板)
- **用途**：視覺化工作流程
- **適合**：依狀態、優先級分組
- **設置**：Group by → Status/Priority

#### Table (表格)
- **用途**：詳細資料檢視
- **適合**：批量編輯、數據分析
- **設置**：顯示所有欄位

#### Roadmap (路線圖)
- **用途**：時間軸規劃
- **適合**：按日期排程
- **設置**：需要 Date 欄位

### 視圖快速設置

```
建議視圖配置：

1️⃣ Board by Status
   - Type: Board
   - Group by: Status
   - Sort by: Priority (High → Low)

2️⃣ Table all fields
   - Type: Table
   - Display: All fields
   - Sort by: Priority, Status

3️⃣ Roadmap by Priority
   - Type: Board
   - Group by: Priority
   - Sort by: Area
```

## 🔄 自動化

### GraphQL API 快速範例

#### 獲取專案資訊

```graphql
query {
  repository(owner: "DingJun1028", name: "junaikey") {
    projectsV2(first: 5) {
      nodes {
        id
        title
        number
      }
    }
  }
}
```

#### 添加項目

```graphql
mutation {
  addProjectV2DraftIssue(input: {
    projectId: "PROJECT_ID"
    title: "新任務"
    body: "任務描述"
  }) {
    projectV2Item {
      id
    }
  }
}
```

#### 更新項目狀態

```graphql
mutation {
  updateProjectV2ItemFieldValue(input: {
    projectId: "PROJECT_ID"
    itemId: "ITEM_ID"
    fieldId: "FIELD_ID"
    value: {
      singleSelectOptionId: "OPTION_ID"
    }
  }) {
    projectV2Item {
      id
    }
  }
}
```

### curl 快速命令

```bash
# 設定變數
GITHUB_TOKEN="your_token"
API_URL="https://api.github.com/graphql"

# 執行查詢
curl -X POST "$API_URL" \
  -H "Authorization: bearer $GITHUB_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"query": "query { viewer { login } }"}'
```

## ⌨️ 快捷鍵

### 一般操作

| 快捷鍵 | 功能 |
|--------|------|
| `?` | 顯示快捷鍵說明 |
| `c` | 創建新項目 |
| `/` | 搜尋項目 |
| `Esc` | 關閉對話框 |

### 項目操作

| 快捷鍵 | 功能 |
|--------|------|
| `Enter` | 編輯項目 |
| `e` | 編輯欄位 |
| `Space` | 選擇/取消選擇 |
| `Shift + Click` | 範圍選擇 |

### 視圖操作

| 快捷鍵 | 功能 |
|--------|------|
| `v` | 切換視圖 |
| `f` | 篩選項目 |
| `s` | 排序項目 |
| `g` | 分組設定 |

## 🔧 工作流程建議

### 每日工作流

```
1. 檢視 Board by Status
   - 查看 "In progress" 欄位
   - 更新進度

2. 處理 To do 項目
   - 選擇高優先級項目
   - 移動到 In progress
   - 指派給自己

3. 完成後移動到 Review
   - 關聯 Pull Request
   - 請求代碼審查

4. 審查通過後標記 Done
   - 關閉 Issue
   - 記錄實際工時
```

### 每週規劃流程

```
1. 回顧上週進度
   - 檢視完成項目
   - 分析實際工時

2. 規劃本週任務
   - 從 Backlog 選擇項目
   - 移動到 To do
   - 調整優先級

3. 評估工作量
   - 檢查 Estimate 總和
   - 平衡團隊負載

4. 同步團隊狀態
   - 更新 Assignee
   - 討論潛在風險
```

## 📊 最佳實踐

### 欄位設置

- ✅ **必備欄位**：Status, Priority, Assignee
- ✅ **建議欄位**：Estimate, Area, Due Date
- ✅ **可選欄位**：Dependencies, Tags, Sprint

### 視圖配置

- ✅ **主視圖**：Board by Status（日常工作）
- ✅ **詳細視圖**：Table all fields（數據管理）
- ✅ **規劃視圖**：Roadmap by Priority（策略規劃）

### 項目管理

- ✅ **標題清晰**：使用動詞開頭，描述具體任務
- ✅ **估時合理**：基於歷史數據，預留緩衝時間
- ✅ **狀態及時**：每日更新，保持資訊時效性
- ✅ **責任明確**：每個項目都應有 Assignee

## 🔍 故障排除

### 常見問題

#### Q: 項目欄位無法更新？
```bash
# 檢查權限
1. 確認你有專案編輯權限
2. 刷新頁面重試
3. 清除瀏覽器快取
```

#### Q: GraphQL API 返回錯誤？
```bash
# 驗證 Token
curl -H "Authorization: bearer $GITHUB_TOKEN" \
  https://api.github.com/user

# 檢查 scope
- 需要 'repo' scope
- 需要 'project' scope
```

#### Q: 無法添加 Issue 到專案？
```bash
# 確認設置
1. Issue 是否在同一倉庫或組織
2. 專案是否設為 Public 或已授權
3. Issue 是否已被刪除
```

## 📚 延伸閱讀

- [GitHub Projects (beta) 官方文檔](https://docs.github.com/en/issues/planning-and-tracking-with-projects)
- [GraphQL API 參考](https://docs.github.com/en/graphql)
- [Projects V2 自動化指南](https://docs.github.com/en/issues/planning-and-tracking-with-projects/automating-your-project)

## 🎯 相關文檔

- [PROJECTS_BETA_INSTRUCTIONS.md](../PROJECTS_BETA_INSTRUCTIONS.md) - 完整使用說明
- [PROJECTS_BETA_TEMPLATE.md](./PROJECTS_BETA_TEMPLATE.md) - 專案模板

---

**💡 提示**：將此文檔加入書籤，快速查詢 Projects 操作！
