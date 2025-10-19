# Agent Manager (代理經理) 文檔

## 概述

Agent Manager 是 JunAiKey 系統中負責管理和協調所有代理（Agents）的核心組件。它提供了完整的任務管理、衝突解決和分支合併功能。

## 核心組件

### 1. AgentCoordinator (代理協調器)

負責協調多個代理之間的任務分配和衝突解決。

#### 主要功能

- **任務管理**
  - 創建任務
  - 分配任務給代理
  - 更新任務狀態
  - 追蹤任務依賴關係

- **任務驗證**
  - 代碼審查驗證
  - 合併衝突解決驗證
  - 功能開發驗證
  - 自定義驗證規則

- **衝突檢測**
  - 重複任務檢測
  - 循環依賴檢測
  - 資源衝突檢測

- **衝突解決**
  - 合併策略
  - 優先級策略
  - 順序執行策略
  - 拒絕策略

#### 使用示例

```typescript
import { AgentCoordinator } from '@junaikey/ai';
import { EventBus } from '@junaikey/core';

const eventBus = new EventBus();
const coordinator = new AgentCoordinator({ eventBus });

// 創建任務
const taskId = coordinator.createTask({
  type: 'feature_development',
  title: '實現用戶登錄功能',
  description: '添加用戶認證系統',
  priority: 'high'
});

// 分配任務給代理
coordinator.assignTask(taskId, 'agent_001');

// 更新任務狀態
coordinator.updateTaskStatus(taskId, 'in_progress');

// 完成任務並驗證
coordinator.updateTaskStatus(taskId, 'completed', {
  success: true,
  output: {
    files: ['auth.ts', 'login.tsx'],
    tests: ['auth.test.ts'],
    documentation: true,
    lintErrors: []
  },
  executionTime: 5000,
  timestamp: new Date()
});

// 驗證任務結果
const validation = coordinator.validateTaskResult(taskId);
console.log('任務正確度:', validation.correctness);
console.log('驗證通過:', validation.isValid);
```

### 2. BranchManager (分支管理器)

負責管理 Git 分支的創建、合併和衝突解決。

#### 主要功能

- **分支管理**
  - 創建新分支
  - 追蹤分支狀態
  - 刪除已合併分支
  - 分支統計

- **合併請求**
  - 創建合併請求
  - 批准/拒絕合併請求
  - 合併操作
  - 合併歷史追蹤

- **衝突解決**
  - 自動檢測衝突
  - 手動解決衝突
  - 批量解決衝突
  - 衝突策略（ours/theirs/manual）

#### 使用示例

```typescript
import { BranchManager } from '@junaikey/ai';
import { EventBus } from '@junaikey/core';

const eventBus = new EventBus();
const branchManager = new BranchManager({ 
  eventBus,
  mainBranch: 'main'
});

// 創建分支
branchManager.createBranch({
  name: 'feature/user-auth',
  author: 'developer@example.com'
});

// 創建合併請求
const mrId = branchManager.createMergeRequest({
  sourceBranch: 'feature/user-auth',
  targetBranch: 'main',
  title: '添加用戶認證功能',
  description: '實現登錄、註冊和密碼重置功能',
  author: 'developer@example.com'
});

// 檢查是否有衝突
const mr = branchManager.getMergeRequest(mrId);
if (mr.conflicts && mr.conflicts.length > 0) {
  // 解決衝突
  mr.conflicts.forEach(conflict => {
    branchManager.resolveConflict(
      mrId,
      conflict.file,
      'manual',
      '// 手動解決的內容'
    );
  });
}

// 批准並合併
branchManager.approveMergeRequest(mrId);
const result = await branchManager.merge(mrId);
console.log('合併成功:', result.success);
console.log('提交哈希:', result.commit);
```

### 3. Enhanced AgentManager (增強的代理管理器)

整合了 AgentCoordinator 和 BranchManager 的完整代理管理系統。

#### 主要功能

- 創建並分配任務
- 執行任務並驗證結果
- 檢測並解決任務衝突
- 為任務創建分支
- 創建合併請求
- 合併任務到主線
- 系統狀態監控

#### 使用示例

```typescript
import { AgentManager } from '@junaikey/ai';
import { EventBus } from '@junaikey/core';

const eventBus = new EventBus();
const agentManager = new AgentManager({
  eventBus,
  defaultModel: 'gpt-4',
  enableDebug: true,
  mainBranch: 'main'
});

// 啟動管理器
await agentManager.start();

// 創建代理
const agentId = await agentManager.createAgent({
  name: '代碼審查代理',
  description: '負責代碼審查和質量檢查',
  workflow: { type: 'code_review' },
  model: 'gpt-4'
});

// 創建並分配任務
const taskId = await agentManager.createAndAssignTask({
  type: 'code_review',
  title: '審查 PR #123',
  description: '審查用戶認證相關代碼',
  priority: 'high',
  agentId: agentId
});

// 為任務創建分支
agentManager.createTaskBranch({
  taskId,
  branchName: 'task/code-review-123',
  author: 'agent@junaikey.com'
});

// 執行任務並驗證
const { taskResult, validation } = await agentManager.executeTaskWithValidation(
  taskId,
  { agentId, input: { prNumber: 123 } }
);

// 如果驗證通過，創建合併請求
if (validation.isValid) {
  const mrId = agentManager.createTaskMergeRequest({
    taskId,
    sourceBranch: 'task/code-review-123',
    title: '代碼審查完成 #123',
    description: `審查結果：正確度 ${validation.correctness}%`,
    author: 'agent@junaikey.com'
  });

  // 合併到主線
  const mergeResult = await agentManager.mergeTaskToMain(taskId, mrId);
  console.log('合併狀態:', mergeResult.success);
}

// 獲取系統狀態
const status = agentManager.getSystemStatus();
console.log('系統狀態:', status);
```

## 任務類型

系統支持以下任務類型：

1. **code_review** - 代碼審查
2. **merge_conflict** - 合併衝突解決
3. **feature_development** - 功能開發
4. **bug_fix** - 錯誤修復
5. **test_creation** - 測試創建

## 驗證規則

每種任務類型都有對應的驗證規則：

### Code Review 驗證

- 檢查是否有文件被審查
- 檢查是否有審查評論
- 正確度計算：基於審查完整性

### Merge Conflict 驗證

- 檢查衝突是否已解決
- 檢查是否還有衝突標記
- 正確度計算：基於解決狀態

### Feature Development 驗證

- 檢查是否有測試
- 檢查是否有文檔
- 檢查 Lint 錯誤
- 正確度計算：基於代碼質量

## 衝突解決策略

### 任務衝突

1. **duplicate** - 合併重複任務
2. **dependency** - 順序執行有依賴關係的任務
3. **resource** - 根據優先級分配資源

### 分支衝突

1. **ours** - 使用當前分支的版本
2. **theirs** - 使用傳入分支的版本
3. **manual** - 手動解決並提供內容

## 事件系統

系統通過 EventBus 發出以下事件：

### 任務事件

- `task_created` - 任務創建
- `task_assigned` - 任務分配
- `task_status_updated` - 任務狀態更新
- `conflict_resolved` - 衝突解決

### 分支事件

- `branch_created` - 分支創建
- `branch_merged` - 分支合併
- `branch_deleted` - 分支刪除
- `merge_request_created` - 合併請求創建
- `merge_request_approved` - 合併請求批准
- `merge_request_rejected` - 合併請求拒絕

### 代理事件

- `agent_created` - 代理創建
- `agent_started` - 代理啟動
- `agent_stopped` - 代理停止
- `agent_run` - 代理執行完成

## 最佳實踐

### 1. 任務管理

```typescript
// 使用優先級管理任務
coordinator.createTask({
  type: 'bug_fix',
  title: '修復關鍵錯誤',
  priority: 'critical', // 使用適當的優先級
  dependencies: [] // 明確指定依賴
});
```

### 2. 衝突處理

```typescript
// 定期檢查衝突
const tasks = coordinator.getAllTasks();
const taskIds = tasks.map(t => t.id);
const conflicts = coordinator.detectConflicts(taskIds);

// 及時解決衝突
conflicts.forEach(conflict => {
  coordinator.resolveConflict(conflict);
});
```

### 3. 分支清理

```typescript
// 定期清理已合併的分支
const deletedCount = branchManager.cleanupMergedBranches();
console.log(`清理了 ${deletedCount} 個已合併分支`);
```

### 4. 監控系統狀態

```typescript
// 定期檢查系統狀態
const status = agentManager.getSystemStatus();
if (status.tasks.byStatus.failed > 5) {
  console.warn('警告：失敗任務過多');
}
```

## 架構圖

```
┌─────────────────────────────────────────────────┐
│           AgentManager (代理管理器)              │
│                                                 │
│  ┌───────────────────┐  ┌──────────────────┐   │
│  │ AgentCoordinator  │  │  BranchManager   │   │
│  │   (任務協調器)     │  │   (分支管理器)    │   │
│  │                   │  │                  │   │
│  │ - 任務管理        │  │ - 分支管理       │   │
│  │ - 任務驗證        │  │ - 合併請求       │   │
│  │ - 衝突檢測        │  │ - 衝突解決       │   │
│  │ - 衝突解決        │  │ - 分支清理       │   │
│  └───────────────────┘  └──────────────────┘   │
│              │                    │             │
│              └────────┬───────────┘             │
│                       │                         │
│                  ┌────▼────┐                    │
│                  │ EventBus│                    │
│                  └─────────┘                    │
└─────────────────────────────────────────────────┘
```

## 擴展性

### 添加自定義驗證規則

```typescript
// 在 AgentCoordinator 中添加自定義驗證規則
coordinator.validationRules.set('custom_task', (result) => {
  return {
    isValid: result.customCheck === true,
    correctness: result.customCheck ? 100 : 0,
    issues: [],
    suggestions: [],
    autoFixable: false
  };
});
```

### 添加自定義衝突解決策略

```typescript
// 擴展 resolveConflict 方法以支持新策略
class CustomAgentCoordinator extends AgentCoordinator {
  public resolveConflict(conflict: ConflictResolution): boolean {
    if (conflict.resolution === 'custom') {
      // 實現自定義解決邏輯
      return true;
    }
    return super.resolveConflict(conflict);
  }
}
```

## 故障排除

### 常見問題

**Q: 任務無法分配給代理？**
A: 檢查任務的依賴是否都已完成。

**Q: 合併請求無法創建？**
A: 確保源分支存在且任務已完成並通過驗證。

**Q: 衝突無法解決？**
A: 檢查衝突類型，確保使用正確的解決策略。

## 性能優化

- 使用批量操作處理多個任務
- 定期清理已完成的任務和已合併的分支
- 使用事件系統進行異步處理
- 實現任務隊列以避免資源競爭

## 安全考慮

- 驗證所有任務輸入
- 限制分支操作權限
- 記錄所有關鍵操作
- 實現回滾機制

## 版本歷史

- v1.0.0 - 初始版本
  - AgentCoordinator 實現
  - BranchManager 實現
  - 集成到 AgentManager
  - 完整的測試覆蓋

## 貢獻

歡迎貢獻！請參閱 [CONTRIBUTING.md](../CONTRIBUTING.md) 了解更多信息。

## 許可證

MIT License - 詳見 [LICENSE](../LICENSE) 文件
