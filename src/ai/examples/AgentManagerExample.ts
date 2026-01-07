/**
 * Agent Manager Usage Example
 * 示範如何使用 Agent Manager 系統的完整工作流程
 */

import { AgentManager } from '../AgentManager';
import { EventBus } from '../../core/EventBus';

/**
 * 示例 1: 基本任務工作流程
 */
async function basicTaskWorkflow() {
  console.log('=== 基本任務工作流程示例 ===\n');

  // 1. 初始化系統
  const eventBus = new EventBus();
  const agentManager = new AgentManager({
    eventBus,
    defaultModel: 'gpt-4',
    enableDebug: true,
    mainBranch: 'main'
  });

  // 啟動管理器
  await agentManager.start();
  console.log('✓ Agent Manager 已啟動\n');

  // 2. 創建代理
  const codeReviewAgentId = await agentManager.createAgent({
    name: '代碼審查專家',
    description: '負責代碼質量檢查和審查',
    workflow: { type: 'code_review' },
    model: 'gpt-4'
  });
  console.log(`✓ 創建代理: ${codeReviewAgentId}\n`);

  // 3. 創建並分配任務
  const taskId = await agentManager.createAndAssignTask({
    type: 'code_review',
    title: '審查用戶認證功能',
    description: '審查新增的用戶登錄和註冊功能',
    priority: 'high',
    agentId: codeReviewAgentId
  });
  console.log(`✓ 創建任務: ${taskId}\n`);

  // 4. 為任務創建分支
  agentManager.createTaskBranch({
    taskId,
    branchName: 'task/code-review-auth',
    author: 'agent@junaikey.com'
  });
  console.log('✓ 創建任務分支\n');

  // 5. 執行任務並驗證
  const { taskResult, validation } = await agentManager.executeTaskWithValidation(
    taskId,
    {
      agentId: codeReviewAgentId,
      input: {
        files: ['auth.ts', 'login.tsx', 'register.tsx'],
        prNumber: 123
      }
    }
  );

  console.log(`✓ 任務執行結果: ${taskResult.success ? '成功' : '失敗'}`);
  console.log(`✓ 驗證結果: 正確度 ${validation.correctness}%`);
  console.log(`✓ 是否有效: ${validation.isValid ? '是' : '否'}\n`);

  // 6. 如果驗證通過，創建合併請求
  if (validation.isValid) {
    const mrId = agentManager.createTaskMergeRequest({
      taskId,
      sourceBranch: 'task/code-review-auth',
      title: '代碼審查完成: 用戶認證功能',
      description: `審查結果：正確度 ${validation.correctness}%\n\n所有檢查項目都已通過。`,
      author: 'agent@junaikey.com'
    });

    console.log(`✓ 創建合併請求: ${mrId}\n`);

    // 7. 合併到主線
    if (mrId) {
      const mergeResult = await agentManager.mergeTaskToMain(taskId, mrId);
      console.log(`✓ 合併狀態: ${mergeResult.success ? '成功' : '失敗'}`);
      console.log(`✓ 提交: ${mergeResult.commit || 'N/A'}\n`);
    }
  }

  // 8. 獲取系統狀態
  const status = agentManager.getSystemStatus();
  console.log('=== 系統狀態 ===');
  console.log(`代理總數: ${status.agents.totalAgents}`);
  console.log(`活躍代理: ${status.agents.activeAgents}`);
  console.log(`任務總數: ${status.tasks.total}`);
  console.log(`分支總數: ${status.branches.total}`);
  console.log(`合併請求: ${status.branches.mergeRequests.total}\n`);
}

/**
 * 示例 2: 多任務並行處理與衝突解決
 */
async function multiTaskWithConflictResolution() {
  console.log('=== 多任務並行處理與衝突解決示例 ===\n');

  const eventBus = new EventBus();
  const agentManager = new AgentManager({
    eventBus,
    defaultModel: 'gpt-4',
    enableDebug: true,
    mainBranch: 'main'
  });

  await agentManager.start();

  // 創建多個代理
  const agent1 = await agentManager.createAgent({
    name: '功能開發代理 A',
    description: '負責功能開發',
    workflow: { type: 'feature_development' },
    model: 'gpt-4'
  });

  const agent2 = await agentManager.createAgent({
    name: '功能開發代理 B',
    description: '負責功能開發',
    workflow: { type: 'feature_development' },
    model: 'gpt-4'
  });

  // 創建多個任務
  const task1 = await agentManager.createAndAssignTask({
    type: 'feature_development',
    title: '添加用戶個人資料功能',
    description: '實現用戶資料編輯頁面',
    priority: 'high',
    agentId: agent1
  });

  const task2 = await agentManager.createAndAssignTask({
    type: 'feature_development',
    title: '添加用戶個人資料功能',  // 重複的任務標題
    description: '實現用戶資料顯示頁面',
    priority: 'medium',
    agentId: agent2
  });

  const task3 = await agentManager.createAndAssignTask({
    type: 'bug_fix',
    title: '修復登錄錯誤',
    description: '修復登錄頁面的錯誤處理',
    priority: 'critical',
    agentId: agent1  // 同一個代理被分配多個任務
  });

  console.log(`✓ 創建了 3 個任務\n`);

  // 檢測衝突
  const { conflicts, resolved } = agentManager.detectAndResolveTaskConflicts([
    task1!, task2!, task3!
  ]);

  console.log(`檢測到 ${conflicts.length} 個衝突`);
  console.log(`解決了 ${resolved} 個衝突\n`);

  conflicts.forEach((conflict, index) => {
    console.log(`衝突 ${index + 1}:`);
    console.log(`  類型: ${conflict.conflictType}`);
    console.log(`  解決方案: ${conflict.resolution}`);
    console.log(`  原因: ${conflict.reason}\n`);
  });

  // 獲取更新後的任務狀態
  const coordinator = agentManager.getCoordinator();
  const allTasks = coordinator.getAllTasks();
  console.log('=== 所有任務狀態 ===');
  allTasks.forEach(task => {
    console.log(`${task.title} - ${task.status} (優先級: ${task.priority})`);
  });
  console.log();
}

/**
 * 示例 3: 分支管理和衝突解決
 */
async function branchManagementExample() {
  console.log('=== 分支管理和衝突解決示例 ===\n');

  const eventBus = new EventBus();
  const agentManager = new AgentManager({
    eventBus,
    defaultModel: 'gpt-4',
    enableDebug: false,
    mainBranch: 'main'
  });

  await agentManager.start();

  const branchManager = agentManager.getBranchManager();

  // 創建主分支（通常已存在）
  branchManager.createBranch({
    name: 'main',
    author: 'system'
  });

  // 創建多個功能分支
  const branches = [
    'feature/user-profile',
    'feature/payment-system',
    'feature/notifications'
  ];

  branches.forEach(branch => {
    branchManager.createBranch({
      name: branch,
      author: 'developer@junaikey.com'
    });
    console.log(`✓ 創建分支: ${branch}`);
  });
  console.log();

  // 為第一個分支創建合併請求
  const mrId = branchManager.createMergeRequest({
    sourceBranch: 'feature/user-profile',
    targetBranch: 'main',
    title: '添加用戶個人資料功能',
    description: '實現用戶資料編輯和顯示功能',
    author: 'developer@junaikey.com'
  });

  console.log(`✓ 創建合併請求: ${mrId}\n`);

  // 檢查是否有衝突
  const mr = branchManager.getMergeRequest(mrId!);
  if (mr?.conflicts && mr.conflicts.length > 0) {
    console.log(`檢測到 ${mr.conflicts.length} 個衝突\n`);

    // 解決所有衝突
    const resolved = branchManager.resolveAllConflicts(mrId!, 'theirs');
    console.log(`✓ 批量解決衝突: ${resolved ? '成功' : '失敗'}\n`);
  } else {
    console.log('✓ 沒有檢測到衝突\n');
  }

  // 批准並合併
  branchManager.approveMergeRequest(mrId!);
  console.log('✓ 批准合併請求\n');

  const mergeResult = await branchManager.merge(mrId!);
  console.log(`合併結果: ${mergeResult.success ? '成功' : '失敗'}`);
  console.log(`提交哈希: ${mergeResult.commit}\n`);

  // 清理已合併的分支
  const deletedCount = branchManager.cleanupMergedBranches();
  console.log(`✓ 清理了 ${deletedCount} 個已合併分支\n`);

  // 獲取分支統計
  const stats = branchManager.getBranchStats();
  console.log('=== 分支統計 ===');
  console.log(`總分支數: ${stats.total}`);
  console.log(`已合併: ${stats.merged}`);
  console.log(`活躍分支: ${stats.active}`);
  console.log(`合併請求總數: ${stats.mergeRequests.total}`);
  console.log(`待處理: ${stats.mergeRequests.pending}`);
  console.log(`已批准: ${stats.mergeRequests.approved}`);
  console.log(`已合併: ${stats.mergeRequests.merged}\n`);
}

/**
 * 運行所有示例
 */
async function runAllExamples() {
  try {
    await basicTaskWorkflow();
    console.log('\n' + '='.repeat(60) + '\n');
    
    await multiTaskWithConflictResolution();
    console.log('\n' + '='.repeat(60) + '\n');
    
    await branchManagementExample();
    
    console.log('✓ 所有示例執行完成！');
  } catch (error) {
    console.error('執行示例時發生錯誤:', error);
  }
}

// 導出示例函數
export {
  basicTaskWorkflow,
  multiTaskWithConflictResolution,
  branchManagementExample,
  runAllExamples
};

// 如果直接運行此文件，執行所有示例
if (require.main === module) {
  runAllExamples();
}
