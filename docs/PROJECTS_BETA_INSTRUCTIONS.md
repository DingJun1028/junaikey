# GitHub Projects (beta) 使用說明

## 什麼是 GitHub Projects (beta)

GitHub Projects (beta) 是 GitHub 推出的新一代專案管理工具，提供更靈活和強大的功能來組織和追蹤工作。

### 主要特點

- **自定義欄位**：可以創建各種類型的自定義欄位（文字、數字、日期、單選、多選等）
- **多視圖支持**：支援看板、表格、時間軸等多種視圖方式
- **跨倉庫支持**：可以將多個倉庫的 Issues 和 PRs 加入同一個專案
- **自動化工作流**：支援使用 GraphQL API 進行自動化操作

### 限制說明

⚠️ **重要限制**：

1. **無法通過文件配置**：Projects (beta) 無法像 Issues 或 Actions 那樣通過配置文件自動創建
2. **需要手動創建**：必須通過 GitHub UI 或使用 GraphQL API 手動創建
3. **需要適當權限**：創建和管理 Projects 需要倉庫管理員或組織成員權限
4. **API 存取**：GraphQL API 需要具有 `project` scope 的 Personal Access Token

## 啟用 Projects (beta) 的操作步驟

### 在倉庫 Settings 中啟用

1. **前往 Settings**
   - 導航到倉庫主頁
   - 點擊頂部的 `Settings` 標籤

2. **啟用 Projects 功能**
   - 在左側導航欄中找到 `Features` 區域
   - 確認 `Projects` 選項已勾選
   - 如果未勾選，請勾選以啟用

3. **訪問 Projects**
   - 點擊倉庫頂部的 `Projects` 標籤
   - 或訪問 `https://github.com/{OWNER}/{REPO}/projects`

### 創建新的 Project (beta)

#### 方法一：使用 GitHub UI

1. **創建專案**
   - 前往倉庫的 `Projects` 標籤
   - 點擊 `New project` 按鈕
   - 選擇 `New project (beta)`
   - 輸入專案名稱：`Documentation Roadmap (beta)`
   - 輸入描述：針對 docs/wiki 中「下一步建議」的工作看板
   - 選擇模板或從空白開始

2. **創建自定義欄位**

   按照以下順序創建欄位：

   **a. Status 欄位**
   - 點擊表格右上角的 `+` 圖標
   - 選擇 `New field`
   - 欄位名稱：`Status`
   - 欄位類型：`Single select`
   - 添加選項：
     - Backlog
     - To do
     - In progress
     - Review
     - Done
   - 設定預設值：`Backlog`

   **b. Priority 欄位**
   - 欄位名稱：`Priority`
   - 欄位類型：`Single select`
   - 添加選項：
     - Low
     - Medium
     - High
   - 設定預設值：`Medium`

   **c. Area 欄位**
   - 欄位名稱：`Area`
   - 欄位類型：`Single select`
   - 添加選項：
     - Content
     - Visual
     - Interaction
     - I18n
   - 設定預設值：`Content`

   **d. Estimate 欄位**
   - 欄位名稱：`Estimate`
   - 欄位類型：`Number`
   - 說明：預估工時（小時）

   **e. Assignee 欄位**
   - 欄位名稱：`Assignee`
   - 欄位類型：`Assignees`（內建欄位類型）

3. **創建視圖**

   **a. Board by Status（預設視圖）**
   - 點擊視圖名稱旁的下拉選單
   - 選擇 `New view`
   - 視圖名稱：`Board by Status`
   - 視圖類型：`Board`
   - Group by：`Status`
   - Sort by：`Priority` (High → Low)

   **b. Table all fields**
   - 新增視圖，名稱：`Table all fields`
   - 視圖類型：`Table`
   - 顯示所有欄位
   - Sort by：`Priority` (High → Low)

   **c. Roadmap (by Priority)**
   - 新增視圖，名稱：`Roadmap (by Priority)`
   - 視圖類型：`Board`
   - Group by：`Priority`
   - Sort by：`Area`

4. **添加工作項目**

   **方式 A：直接創建 Draft Issues**
   - 在看板中點擊 `+ Add item`
   - 輸入項目標題
   - 按 `Enter` 創建
   - 點擊項目卡片，填寫詳細資訊和欄位值

   **方式 B：從 Issues 添加**
   - 先在倉庫中創建 Issues
   - 在 Project 中點擊 `+ Add item`
   - 選擇 `Add item from repository`
   - 搜尋並選擇要添加的 Issue

   **建議項目列表**（參考 docs/projects/PROJECTS_BETA_TEMPLATE.md）：
   1. 創建各元素的詳細說明頁面（Content, Medium, 16h）
   2. 編寫各平台整合的詳細教程（Content, Medium, 20h）
   3. 添加更多實戰範例和案例研究（Content, Medium, 24h）
   4. 添加各化身的技能樹圖（Visual, Medium, 12h）
   5. 添加架構圖和流程圖（Visual, High, 16h）
   6. 創建元素和化身的視覺展示（Visual, Medium, 20h）
   7. 製作視頻教程（Visual, Low, 40h）
   8. 設計文檔專用 Banner（Visual, Low, 8h）
   9. 啟用 GitHub Discussions 討論區（Interaction, Medium, 2h）
   10. 創建 GitHub Projects 看板（Interaction, High, 4h）
   11. 設置 Issue 模板（Interaction, Medium, 4h）
   12. 添加 PR 模板（Interaction, Medium, 3h）
   13. 英文版文檔（I18n, High, 40h）
   14. 簡體中文版（I18n, Medium, 20h）
   15. 日語版（可選）（I18n, Low, 40h）

#### 方法二：使用 GraphQL API

使用 GraphQL API 可以自動化創建和配置 Project。以下是完整的操作流程和範例。

##### 前置準備

1. **創建 Personal Access Token (PAT)**
   - 前往 GitHub Settings → Developer settings → Personal access tokens → Tokens (classic)
   - 點擊 `Generate new token (classic)`
   - 選擇所需的 scopes：
     - `repo`（完整倉庫存取）
     - `project`（Projects 存取）
     - `write:org`（如果是組織專案）
   - 生成並保存 Token

2. **獲取所需的 ID**

   需要取得以下 ID 以便後續操作：
   - 倉庫擁有者的 Node ID
   - 創建後的 Project ID
   - 創建後的 Field IDs
   - 創建後的 Item IDs
   - Single select 選項的 Option IDs

##### GraphQL API 範例

**1. 創建 Project**

```graphql
mutation CreateProject {
  createProjectV2(input: {
    ownerId: "REPO_OWNER_NODE_ID"
    title: "Documentation Roadmap (beta)"
    repositoryId: "REPOSITORY_NODE_ID"
  }) {
    projectV2 {
      id
      title
      number
    }
  }
}
```

使用 curl 呼叫：

```bash
curl -X POST https://api.github.com/graphql \
  -H "Authorization: bearer YOUR_PERSONAL_ACCESS_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "query": "mutation CreateProject { createProjectV2(input: { ownerId: \"REPO_OWNER_NODE_ID\", title: \"Documentation Roadmap (beta)\", repositoryId: \"REPOSITORY_NODE_ID\" }) { projectV2 { id title number } } }"
  }'
```

**占位符說明**：
- `REPO_OWNER_NODE_ID`：倉庫擁有者（用戶或組織）的 Node ID
- `REPOSITORY_NODE_ID`：倉庫的 Node ID
- `YOUR_PERSONAL_ACCESS_TOKEN`：你的 Personal Access Token

**獲取 Node IDs 的方法**：

```bash
# 獲取倉庫擁有者和倉庫的 Node ID
curl -X POST https://api.github.com/graphql \
  -H "Authorization: bearer YOUR_PERSONAL_ACCESS_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "query": "query { repository(owner: \"DingJun1028\", name: \"junaikey\") { id owner { id } } }"
  }'
```

**2. 創建自定義欄位**

**a. 創建 Status 欄位（Single Select）**

```graphql
mutation CreateStatusField {
  createProjectV2Field(input: {
    projectId: "PROJECT_V2_ID"
    dataType: SINGLE_SELECT
    name: "Status"
    singleSelectOptions: [
      {name: "Backlog", color: GRAY, description: "待辦清單"},
      {name: "To do", color: YELLOW, description: "待做"},
      {name: "In progress", color: BLUE, description: "進行中"},
      {name: "Review", color: ORANGE, description: "審查中"},
      {name: "Done", color: GREEN, description: "已完成"}
    ]
  }) {
    projectV2Field {
      ... on ProjectV2SingleSelectField {
        id
        name
        options {
          id
          name
        }
      }
    }
  }
}
```

curl 呼叫：

```bash
curl -X POST https://api.github.com/graphql \
  -H "Authorization: bearer YOUR_PERSONAL_ACCESS_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "query": "mutation CreateStatusField { createProjectV2Field(input: { projectId: \"PROJECT_V2_ID\", dataType: SINGLE_SELECT, name: \"Status\", singleSelectOptions: [{name: \"Backlog\", color: GRAY}, {name: \"To do\", color: YELLOW}, {name: \"In progress\", color: BLUE}, {name: \"Review\", color: ORANGE}, {name: \"Done\", color: GREEN}] }) { projectV2Field { ... on ProjectV2SingleSelectField { id name options { id name } } } } }"
  }'
```

**b. 創建 Priority 欄位（Single Select）**

```graphql
mutation CreatePriorityField {
  createProjectV2Field(input: {
    projectId: "PROJECT_V2_ID"
    dataType: SINGLE_SELECT
    name: "Priority"
    singleSelectOptions: [
      {name: "Low", color: GRAY},
      {name: "Medium", color: YELLOW},
      {name: "High", color: RED}
    ]
  }) {
    projectV2Field {
      ... on ProjectV2SingleSelectField {
        id
        name
        options {
          id
          name
        }
      }
    }
  }
}
```

**c. 創建 Area 欄位（Single Select）**

```graphql
mutation CreateAreaField {
  createProjectV2Field(input: {
    projectId: "PROJECT_V2_ID"
    dataType: SINGLE_SELECT
    name: "Area"
    singleSelectOptions: [
      {name: "Content", color: BLUE},
      {name: "Visual", color: PURPLE},
      {name: "Interaction", color: GREEN},
      {name: "I18n", color: ORANGE}
    ]
  }) {
    projectV2Field {
      ... on ProjectV2SingleSelectField {
        id
        name
        options {
          id
          name
        }
      }
    }
  }
}
```

**d. 創建 Estimate 欄位（Number）**

```graphql
mutation CreateEstimateField {
  createProjectV2Field(input: {
    projectId: "PROJECT_V2_ID"
    dataType: NUMBER
    name: "Estimate"
  }) {
    projectV2Field {
      ... on ProjectV2Field {
        id
        name
      }
    }
  }
}
```

**3. 創建項目（Draft Issue）**

```graphql
mutation CreateItem {
  addProjectV2DraftIssue(input: {
    projectId: "PROJECT_V2_ID"
    title: "創建各元素的詳細說明頁面"
    body: "為系統中的各個元素創建詳細的說明文檔，包括用途、屬性、方法等"
  }) {
    projectV2Item {
      id
    }
  }
}
```

**4. 更新項目欄位值**

**a. 更新 Single Select 欄位（如 Status）**

```graphql
mutation UpdateItemStatus {
  updateProjectV2ItemFieldValue(input: {
    projectId: "PROJECT_V2_ID"
    itemId: "ITEM_ID"
    fieldId: "STATUS_FIELD_ID"
    value: {
      singleSelectOptionId: "BACKLOG_OPTION_ID"
    }
  }) {
    projectV2Item {
      id
    }
  }
}
```

**b. 更新 Number 欄位（如 Estimate）**

```graphql
mutation UpdateItemEstimate {
  updateProjectV2ItemFieldValue(input: {
    projectId: "PROJECT_V2_ID"
    itemId: "ITEM_ID"
    fieldId: "ESTIMATE_FIELD_ID"
    value: {
      number: 16
    }
  }) {
    projectV2Item {
      id
    }
  }
}
```

**5. 從現有 Issue 添加項目**

```graphql
mutation AddIssueToProject {
  addProjectV2ItemById(input: {
    projectId: "PROJECT_V2_ID"
    contentId: "ISSUE_NODE_ID"
  }) {
    item {
      id
    }
  }
}
```

獲取 Issue Node ID：

```bash
curl -X POST https://api.github.com/graphql \
  -H "Authorization: bearer YOUR_PERSONAL_ACCESS_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "query": "query { repository(owner: \"DingJun1028\", name: \"junaikey\") { issue(number: 1) { id title } } }"
  }'
```

##### 完整自動化腳本範例

以下是一個完整的 bash 腳本範例，展示如何使用 GraphQL API 創建完整的 Project：

```bash
#!/bin/bash

# 設定變數
GITHUB_TOKEN="YOUR_PERSONAL_ACCESS_TOKEN"
OWNER="DingJun1028"
REPO="junaikey"
API_URL="https://api.github.com/graphql"

# 函數：執行 GraphQL 查詢
function graphql_query() {
  local query=$1
  curl -s -X POST "$API_URL" \
    -H "Authorization: bearer $GITHUB_TOKEN" \
    -H "Content-Type: application/json" \
    -d "{\"query\": \"$query\"}"
}

# 1. 獲取倉庫和擁有者的 Node ID
echo "獲取倉庫資訊..."
RESPONSE=$(graphql_query "query { repository(owner: \\\"$OWNER\\\", name: \\\"$REPO\\\") { id owner { id } } }")
REPO_ID=$(echo $RESPONSE | jq -r '.data.repository.id')
OWNER_ID=$(echo $RESPONSE | jq -r '.data.repository.owner.id')

echo "Repository ID: $REPO_ID"
echo "Owner ID: $OWNER_ID"

# 2. 創建 Project
echo "創建 Project..."
RESPONSE=$(graphql_query "mutation { createProjectV2(input: { ownerId: \\\"$OWNER_ID\\\", title: \\\"Documentation Roadmap (beta)\\\", repositoryId: \\\"$REPO_ID\\\" }) { projectV2 { id number } } }")
PROJECT_ID=$(echo $RESPONSE | jq -r '.data.createProjectV2.projectV2.id')

echo "Project ID: $PROJECT_ID"

# 3. 創建欄位
echo "創建 Status 欄位..."
# ... 添加其他欄位創建步驟 ...

# 4. 創建項目
echo "創建項目..."
# ... 添加項目創建步驟 ...

echo "完成！"
```

**注意**：實際使用時需要：
1. 替換所有占位符（`REPO_OWNER_NODE_ID`、`PROJECT_V2_ID` 等）
2. 處理 API 回應並提取所需的 ID
3. 加入錯誤處理和重試邏輯
4. 考慮 API 速率限制

## 關聯 Project 與 Issues

### 將 Project 卡片轉換為 Issue

1. 點擊 Draft Issue 卡片
2. 在右側面板中點擊 `Convert to issue`
3. 選擇目標倉庫
4. Issue 將自動創建並保持在 Project 中

### 將現有 Issue 添加到 Project

1. 在 Project 中點擊 `+ Add item`
2. 選擇 `Add item from repository`
3. 搜尋並選擇要添加的 Issue
4. Issue 將出現在 Project 中，並可以設定自定義欄位

### 從 Issue 頁面添加到 Project

1. 打開任一 Issue
2. 在右側欄找到 `Projects`
3. 點擊齒輪圖標
4. 選擇要添加到的 Project
5. Issue 將自動添加到 Project 中

## 最佳實踐建議

### 工作流程

1. **規劃階段**
   - 使用 Draft Issues 快速記錄想法
   - 設定 Status 為 Backlog
   - 初步評估 Priority 和 Estimate

2. **執行階段**
   - 將 Draft Issues 轉換為正式 Issues
   - 更新 Status 為 To do → In progress
   - 指派 Assignee

3. **審查階段**
   - 完成後更新 Status 為 Review
   - 關聯 Pull Request
   - 經審核後標記為 Done

### 定期維護

- **每週回顧**：檢視 Board by Status 視圖，確認進度
- **優先級調整**：根據實際需求調整項目優先級
- **工時追蹤**：更新實際花費的時間，優化未來估算
- **定期清理**：將完成的項目歸檔或移除

### 團隊協作

- 使用 Assignee 明確責任歸屬
- 在項目卡片中添加評論進行討論
- 使用 @mentions 通知相關成員
- 定期同步項目狀態

## 故障排除

### 常見問題

**Q: 無法看到 Projects (beta) 選項？**
A: 確認你有足夠的權限，並且在倉庫 Settings → Features 中啟用了 Projects。

**Q: GraphQL API 返回權限錯誤？**
A: 檢查 Personal Access Token 是否包含 `project` scope。

**Q: 項目欄位無法更新？**
A: 確認使用正確的 Field ID 和 Option ID，可以先查詢 Project 結構來獲取正確的 IDs。

**Q: 如何批量導入項目？**
A: 使用 GraphQL API 編寫腳本，或使用第三方工具如 GitHub CLI extensions。

## 參考資源

- [GitHub Projects (beta) 官方文檔](https://docs.github.com/en/issues/planning-and-tracking-with-projects)
- [GraphQL API 文檔](https://docs.github.com/en/graphql)
- [Projects V2 Schema](https://docs.github.com/en/graphql/reference/objects#projectv2)

## 總結

GitHub Projects (beta) 提供了強大的專案管理能力，但需要通過 UI 或 API 手動設置。本文檔提供了詳細的操作步驟和 API 範例，幫助你快速建立 Documentation Roadmap 專案。

如有任何問題或建議，歡迎在 GitHub Discussions 中討論！
