/**
 * Agent Coordinator - 代理協調器
 * 負責協調多個代理之間的任務分配和衝突解決
 */

import { EventBus } from '../core/EventBus';
import { logger } from '../utils/logger';
import { Agent, AgentRunResult } from './AgentManager';

export interface Task {
  id: string;
  type: 'code_review' | 'merge_conflict' | 'feature_development' | 'bug_fix' | 'test_creation';
  title: string;
  description: string;
  priority: 'low' | 'medium' | 'high' | 'critical';
  status: 'pending' | 'assigned' | 'in_progress' | 'completed' | 'failed' | 'conflict';
  assignedAgentId?: string;
  result?: AgentRunResult;
  createdAt: Date;
  updatedAt: Date;
  completedAt?: Date;
  dependencies?: string[]; // Task IDs that must be completed first
  metadata?: Record<string, any>;
}

export interface TaskValidationResult {
  isValid: boolean;
  correctness: number; // 0-100
  issues: ValidationIssue[];
  suggestions: string[];
  autoFixable: boolean;
}

export interface ValidationIssue {
  severity: 'error' | 'warning' | 'info';
  message: string;
  location?: string;
  code?: string;
}

export interface ConflictResolution {
  taskId: string;
  conflictType: 'duplicate' | 'incompatible' | 'dependency' | 'resource';
  resolution: 'merge' | 'prioritize' | 'sequential' | 'reject';
  mergedResult?: any;
  reason: string;
}

/**
 * Agent Coordinator - 協調多個代理的任務執行
 */
export class AgentCoordinator {
  private tasks: Map<string, Task> = new Map();
  private eventBus: EventBus;
  private logger;
  private validationRules: Map<string, (result: any) => TaskValidationResult> = new Map();

  constructor(config: { eventBus: EventBus }) {
    this.eventBus = config.eventBus;
    this.logger = logger;
    this.setupDefaultValidationRules();
  }

  /**
   * 設置默認驗證規則
   */
  private setupDefaultValidationRules(): void {
    // Code review validation
    this.validationRules.set('code_review', (result: any) => {
      const issues: ValidationIssue[] = [];
      let correctness = 100;

      if (!result.files || result.files.length === 0) {
        issues.push({
          severity: 'error',
          message: 'No files reviewed',
          code: 'NO_FILES'
        });
        correctness -= 50;
      }

      if (!result.comments || result.comments.length === 0) {
        issues.push({
          severity: 'warning',
          message: 'No review comments provided',
          code: 'NO_COMMENTS'
        });
        correctness -= 20;
      }

      return {
        isValid: correctness >= 50,
        correctness,
        issues,
        suggestions: issues.length > 0 ? ['Review more thoroughly', 'Add detailed comments'] : [],
        autoFixable: false
      };
    });

    // Merge conflict validation
    this.validationRules.set('merge_conflict', (result: any) => {
      const issues: ValidationIssue[] = [];
      let correctness = 100;

      if (!result.resolved) {
        issues.push({
          severity: 'error',
          message: 'Conflicts not resolved',
          code: 'UNRESOLVED'
        });
        correctness = 0;
      }

      if (result.conflictMarkers && result.conflictMarkers.length > 0) {
        issues.push({
          severity: 'error',
          message: `${result.conflictMarkers.length} conflict markers remaining`,
          code: 'CONFLICT_MARKERS'
        });
        correctness -= 30;
      }

      return {
        isValid: correctness >= 70,
        correctness,
        issues,
        suggestions: issues.length > 0 ? ['Resolve all conflicts', 'Remove conflict markers'] : [],
        autoFixable: true
      };
    });

    // Feature development validation
    this.validationRules.set('feature_development', (result: any) => {
      const issues: ValidationIssue[] = [];
      let correctness = 100;

      if (!result.tests || result.tests.length === 0) {
        issues.push({
          severity: 'warning',
          message: 'No tests created',
          code: 'NO_TESTS'
        });
        correctness -= 15;
      }

      if (!result.documentation) {
        issues.push({
          severity: 'warning',
          message: 'No documentation provided',
          code: 'NO_DOCS'
        });
        correctness -= 10;
      }

      if (result.lintErrors && result.lintErrors.length > 0) {
        issues.push({
          severity: 'error',
          message: `${result.lintErrors.length} lint errors`,
          code: 'LINT_ERRORS'
        });
        correctness -= 25;
      }

      return {
        isValid: correctness >= 60,
        correctness,
        issues,
        suggestions: ['Add tests', 'Update documentation', 'Fix lint errors'],
        autoFixable: true
      };
    });
  }

  /**
   * 創建新任務
   */
  public createTask(config: {
    type: Task['type'];
    title: string;
    description: string;
    priority: Task['priority'];
    dependencies?: string[];
    metadata?: Record<string, any>;
  }): string {
    const taskId = `task_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    
    const task: Task = {
      id: taskId,
      type: config.type,
      title: config.title,
      description: config.description,
      priority: config.priority,
      status: 'pending',
      dependencies: config.dependencies || [],
      metadata: config.metadata,
      createdAt: new Date(),
      updatedAt: new Date()
    };

    this.tasks.set(taskId, task);
    this.eventBus.emit('task_created', task);
    this.logger.info('Task created', { taskId, type: config.type, title: config.title });

    return taskId;
  }

  /**
   * 分配任務給代理
   */
  public assignTask(taskId: string, agentId: string): boolean {
    const task = this.tasks.get(taskId);
    if (!task) {
      this.logger.error('Task not found', { taskId });
      return false;
    }

    // Check if dependencies are completed
    if (task.dependencies && task.dependencies.length > 0) {
      const incompleteDeps = task.dependencies.filter(depId => {
        const dep = this.tasks.get(depId);
        return !dep || dep.status !== 'completed';
      });

      if (incompleteDeps.length > 0) {
        this.logger.warn('Task has incomplete dependencies', { 
          taskId, 
          incompleteDeps 
        });
        return false;
      }
    }

    task.assignedAgentId = agentId;
    task.status = 'assigned';
    task.updatedAt = new Date();

    this.tasks.set(taskId, task);
    this.eventBus.emit('task_assigned', { taskId, agentId });
    this.logger.info('Task assigned to agent', { taskId, agentId });

    return true;
  }

  /**
   * 更新任務狀態
   */
  public updateTaskStatus(
    taskId: string, 
    status: Task['status'], 
    result?: AgentRunResult
  ): boolean {
    const task = this.tasks.get(taskId);
    if (!task) return false;

    task.status = status;
    task.result = result;
    task.updatedAt = new Date();

    if (status === 'completed' || status === 'failed') {
      task.completedAt = new Date();
    }

    this.tasks.set(taskId, task);
    this.eventBus.emit('task_status_updated', { taskId, status, result });
    this.logger.info('Task status updated', { taskId, status });

    return true;
  }

  /**
   * 驗證任務結果的正確性
   */
  public validateTaskResult(taskId: string): TaskValidationResult {
    const task = this.tasks.get(taskId);
    if (!task || !task.result) {
      return {
        isValid: false,
        correctness: 0,
        issues: [{ 
          severity: 'error', 
          message: 'Task or result not found',
          code: 'NOT_FOUND'
        }],
        suggestions: [],
        autoFixable: false
      };
    }

    const validator = this.validationRules.get(task.type);
    if (!validator) {
      // Default validation - just check success
      return {
        isValid: task.result.success,
        correctness: task.result.success ? 100 : 0,
        issues: task.result.success ? [] : [{ 
          severity: 'error', 
          message: task.result.error || 'Task failed',
          code: 'TASK_FAILED'
        }],
        suggestions: [],
        autoFixable: false
      };
    }

    const validation = validator(task.result.output);
    this.logger.info('Task validation completed', { 
      taskId, 
      isValid: validation.isValid,
      correctness: validation.correctness 
    });

    return validation;
  }

  /**
   * 檢測任務衝突
   */
  public detectConflicts(taskIds: string[]): ConflictResolution[] {
    const conflicts: ConflictResolution[] = [];
    const tasks = taskIds.map(id => this.tasks.get(id)).filter(Boolean) as Task[];

    // Check for duplicate tasks
    for (let i = 0; i < tasks.length; i++) {
      for (let j = i + 1; j < tasks.length; j++) {
        const task1 = tasks[i];
        const task2 = tasks[j];

        // Same type and similar title
        if (task1.type === task2.type && this.areSimilar(task1.title, task2.title)) {
          conflicts.push({
            taskId: task2.id,
            conflictType: 'duplicate',
            resolution: 'merge',
            reason: `Duplicate of task ${task1.id}`,
            mergedResult: this.mergeTasks(task1, task2)
          });
        }

        // Incompatible dependencies
        if (task1.dependencies?.includes(task2.id) && task2.dependencies?.includes(task1.id)) {
          conflicts.push({
            taskId: task1.id,
            conflictType: 'dependency',
            resolution: 'sequential',
            reason: 'Circular dependency detected'
          });
        }

        // Resource conflicts (same agent, different priority)
        if (task1.assignedAgentId === task2.assignedAgentId && 
            task1.priority !== task2.priority &&
            task1.status === 'in_progress' && 
            task2.status === 'in_progress') {
          conflicts.push({
            taskId: task2.id,
            conflictType: 'resource',
            resolution: 'prioritize',
            reason: `Agent ${task1.assignedAgentId} already working on higher priority task`
          });
        }
      }
    }

    this.logger.info('Conflict detection completed', { 
      taskCount: tasks.length, 
      conflictCount: conflicts.length 
    });

    return conflicts;
  }

  /**
   * 檢查兩個字符串是否相似
   */
  private areSimilar(str1: string, str2: string): boolean {
    const normalized1 = str1.toLowerCase().trim();
    const normalized2 = str2.toLowerCase().trim();
    
    // Simple similarity check
    if (normalized1 === normalized2) return true;
    
    // Check if one contains the other
    if (normalized1.includes(normalized2) || normalized2.includes(normalized1)) {
      return normalized1.length > 5 && normalized2.length > 5;
    }
    
    return false;
  }

  /**
   * 合併兩個任務
   */
  private mergeTasks(task1: Task, task2: Task): Task {
    return {
      ...task1,
      description: `${task1.description}\n\nMerged with: ${task2.description}`,
      priority: task1.priority === 'critical' || task2.priority === 'critical' ? 'critical' :
                task1.priority === 'high' || task2.priority === 'high' ? 'high' :
                task1.priority === 'medium' || task2.priority === 'medium' ? 'medium' : 'low',
      dependencies: Array.from(new Set([
        ...(task1.dependencies || []),
        ...(task2.dependencies || [])
      ])),
      metadata: {
        ...task1.metadata,
        ...task2.metadata,
        mergedFrom: [task1.id, task2.id]
      }
    };
  }

  /**
   * 解決衝突
   */
  public resolveConflict(conflict: ConflictResolution): boolean {
    const task = this.tasks.get(conflict.taskId);
    if (!task) return false;

    switch (conflict.resolution) {
      case 'merge':
        if (conflict.mergedResult) {
          this.tasks.set(conflict.taskId, conflict.mergedResult);
          this.eventBus.emit('conflict_resolved', { 
            taskId: conflict.taskId, 
            resolution: 'merged' 
          });
        }
        break;

      case 'prioritize':
        task.status = 'pending';
        task.updatedAt = new Date();
        this.tasks.set(conflict.taskId, task);
        this.eventBus.emit('conflict_resolved', { 
          taskId: conflict.taskId, 
          resolution: 'deprioritized' 
        });
        break;

      case 'sequential':
        // Add dependency to ensure sequential execution
        task.status = 'pending';
        task.updatedAt = new Date();
        this.tasks.set(conflict.taskId, task);
        this.eventBus.emit('conflict_resolved', { 
          taskId: conflict.taskId, 
          resolution: 'sequenced' 
        });
        break;

      case 'reject':
        task.status = 'failed';
        task.updatedAt = new Date();
        task.completedAt = new Date();
        this.tasks.set(conflict.taskId, task);
        this.eventBus.emit('conflict_resolved', { 
          taskId: conflict.taskId, 
          resolution: 'rejected' 
        });
        break;
    }

    this.logger.info('Conflict resolved', { 
      taskId: conflict.taskId, 
      resolution: conflict.resolution 
    });

    return true;
  }

  /**
   * 獲取任務
   */
  public getTask(taskId: string): Task | null {
    return this.tasks.get(taskId) || null;
  }

  /**
   * 獲取所有任務
   */
  public getAllTasks(): Task[] {
    return Array.from(this.tasks.values());
  }

  /**
   * 獲取按狀態過濾的任務
   */
  public getTasksByStatus(status: Task['status']): Task[] {
    return Array.from(this.tasks.values()).filter(task => task.status === status);
  }

  /**
   * 獲取代理的任務
   */
  public getAgentTasks(agentId: string): Task[] {
    return Array.from(this.tasks.values()).filter(
      task => task.assignedAgentId === agentId
    );
  }

  /**
   * 獲取任務統計
   */
  public getTaskStats(): {
    total: number;
    byStatus: Record<Task['status'], number>;
    byType: Record<Task['type'], number>;
    byPriority: Record<Task['priority'], number>;
    averageCompletionTime: number;
  } {
    const tasks = Array.from(this.tasks.values());
    const stats = {
      total: tasks.length,
      byStatus: {} as Record<Task['status'], number>,
      byType: {} as Record<Task['type'], number>,
      byPriority: {} as Record<Task['priority'], number>,
      averageCompletionTime: 0
    };

    let totalCompletionTime = 0;
    let completedCount = 0;

    tasks.forEach(task => {
      // Count by status
      stats.byStatus[task.status] = (stats.byStatus[task.status] || 0) + 1;
      
      // Count by type
      stats.byType[task.type] = (stats.byType[task.type] || 0) + 1;
      
      // Count by priority
      stats.byPriority[task.priority] = (stats.byPriority[task.priority] || 0) + 1;

      // Calculate completion time
      if (task.completedAt) {
        completedCount++;
        totalCompletionTime += task.completedAt.getTime() - task.createdAt.getTime();
      }
    });

    if (completedCount > 0) {
      stats.averageCompletionTime = totalCompletionTime / completedCount;
    }

    return stats;
  }
}
