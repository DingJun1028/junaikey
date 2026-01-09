/**
 * AgentCoordinator 測試
 */

import { AgentCoordinator, Task, TaskValidationResult } from '../AgentCoordinator';
import { EventBus } from '../../core/EventBus';

describe('AgentCoordinator', () => {
  let coordinator: AgentCoordinator;
  let eventBus: EventBus;

  beforeEach(() => {
    eventBus = new EventBus();
    coordinator = new AgentCoordinator({ eventBus });
  });

  describe('Task Management', () => {
    it('should create a new task', () => {
      const taskId = coordinator.createTask({
        type: 'feature_development',
        title: 'Implement new feature',
        description: 'Add user authentication',
        priority: 'high'
      });

      expect(taskId).toBeDefined();
      expect(taskId).toContain('task_');

      const task = coordinator.getTask(taskId);
      expect(task).toBeDefined();
      expect(task?.title).toBe('Implement new feature');
      expect(task?.status).toBe('pending');
    });

    it('should assign task to agent', () => {
      const taskId = coordinator.createTask({
        type: 'code_review',
        title: 'Review PR',
        description: 'Review pull request #123',
        priority: 'medium'
      });

      const assigned = coordinator.assignTask(taskId, 'agent_1');
      expect(assigned).toBe(true);

      const task = coordinator.getTask(taskId);
      expect(task?.assignedAgentId).toBe('agent_1');
      expect(task?.status).toBe('assigned');
    });

    it('should not assign task with incomplete dependencies', () => {
      const dep1 = coordinator.createTask({
        type: 'bug_fix',
        title: 'Fix bug',
        description: 'Fix critical bug',
        priority: 'critical'
      });

      const taskId = coordinator.createTask({
        type: 'feature_development',
        title: 'New feature',
        description: 'Depends on bug fix',
        priority: 'medium',
        dependencies: [dep1]
      });

      const assigned = coordinator.assignTask(taskId, 'agent_1');
      expect(assigned).toBe(false);
    });

    it('should update task status', () => {
      const taskId = coordinator.createTask({
        type: 'test_creation',
        title: 'Write tests',
        description: 'Write unit tests',
        priority: 'low'
      });

      const updated = coordinator.updateTaskStatus(taskId, 'in_progress');
      expect(updated).toBe(true);

      const task = coordinator.getTask(taskId);
      expect(task?.status).toBe('in_progress');
    });
  });

  describe('Task Validation', () => {
    it('should validate code review task', () => {
      const taskId = coordinator.createTask({
        type: 'code_review',
        title: 'Review code',
        description: 'Review changes',
        priority: 'medium'
      });

      coordinator.updateTaskStatus(taskId, 'completed', {
        success: true,
        output: {
          files: ['file1.ts', 'file2.ts'],
          comments: ['Good code', 'Needs improvement']
        },
        executionTime: 1000,
        timestamp: new Date()
      });

      const validation = coordinator.validateTaskResult(taskId);
      expect(validation.isValid).toBe(true);
      expect(validation.correctness).toBe(100);
      expect(validation.issues).toHaveLength(0);
    });

    it('should detect missing files in code review', () => {
      const taskId = coordinator.createTask({
        type: 'code_review',
        title: 'Review code',
        description: 'Review changes',
        priority: 'medium'
      });

      coordinator.updateTaskStatus(taskId, 'completed', {
        success: true,
        output: {
          files: [],
          comments: ['Some comment']
        },
        executionTime: 1000,
        timestamp: new Date()
      });

      const validation = coordinator.validateTaskResult(taskId);
      expect(validation.isValid).toBe(false);
      expect(validation.correctness).toBeLessThan(100);
      expect(validation.issues.length).toBeGreaterThan(0);
    });

    it('should validate merge conflict resolution', () => {
      const taskId = coordinator.createTask({
        type: 'merge_conflict',
        title: 'Resolve conflicts',
        description: 'Resolve merge conflicts',
        priority: 'high'
      });

      coordinator.updateTaskStatus(taskId, 'completed', {
        success: true,
        output: {
          resolved: true,
          conflictMarkers: []
        },
        executionTime: 2000,
        timestamp: new Date()
      });

      const validation = coordinator.validateTaskResult(taskId);
      expect(validation.isValid).toBe(true);
      expect(validation.correctness).toBe(100);
    });
  });

  describe('Conflict Detection', () => {
    it('should detect duplicate tasks', () => {
      const task1 = coordinator.createTask({
        type: 'feature_development',
        title: 'Add login feature',
        description: 'Implement user login',
        priority: 'high'
      });

      const task2 = coordinator.createTask({
        type: 'feature_development',
        title: 'Add Login Feature',
        description: 'Implement user login',
        priority: 'medium'
      });

      const conflicts = coordinator.detectConflicts([task1, task2]);
      expect(conflicts.length).toBeGreaterThan(0);
      expect(conflicts[0].conflictType).toBe('duplicate');
    });

    it('should detect circular dependencies', () => {
      const task1 = coordinator.createTask({
        type: 'bug_fix',
        title: 'Fix bug A',
        description: 'Fix issue A',
        priority: 'high'
      });

      const task2 = coordinator.createTask({
        type: 'bug_fix',
        title: 'Fix bug B',
        description: 'Fix issue B',
        priority: 'high',
        dependencies: [task1]
      });

      // Manually add circular dependency (in real scenario this would be prevented)
      const task = coordinator.getTask(task1);
      if (task) {
        task.dependencies = [task2];
      }

      const conflicts = coordinator.detectConflicts([task1, task2]);
      expect(conflicts.some(c => c.conflictType === 'dependency')).toBe(true);
    });

    it('should detect resource conflicts', () => {
      const task1 = coordinator.createTask({
        type: 'feature_development',
        title: 'Feature A',
        description: 'Implement feature A',
        priority: 'high'
      });

      const task2 = coordinator.createTask({
        type: 'feature_development',
        title: 'Feature B',
        description: 'Implement feature B',
        priority: 'medium'
      });

      coordinator.assignTask(task1, 'agent_1');
      coordinator.assignTask(task2, 'agent_1');
      coordinator.updateTaskStatus(task1, 'in_progress');
      coordinator.updateTaskStatus(task2, 'in_progress');

      const conflicts = coordinator.detectConflicts([task1, task2]);
      expect(conflicts.some(c => c.conflictType === 'resource')).toBe(true);
    });
  });

  describe('Conflict Resolution', () => {
    it('should resolve conflicts by merging', () => {
      const task1 = coordinator.createTask({
        type: 'feature_development',
        title: 'Add feature',
        description: 'Description 1',
        priority: 'high'
      });

      const task2 = coordinator.createTask({
        type: 'feature_development',
        title: 'Add feature',
        description: 'Description 2',
        priority: 'medium'
      });

      const conflicts = coordinator.detectConflicts([task1, task2]);
      expect(conflicts.length).toBeGreaterThan(0);

      const resolved = coordinator.resolveConflict(conflicts[0]);
      expect(resolved).toBe(true);
    });

    it('should resolve conflicts by prioritizing', () => {
      const task1 = coordinator.createTask({
        type: 'bug_fix',
        title: 'Fix critical bug',
        description: 'Fix issue',
        priority: 'critical'
      });

      coordinator.assignTask(task1, 'agent_1');
      coordinator.updateTaskStatus(task1, 'in_progress');

      const conflict = {
        taskId: task1,
        conflictType: 'resource' as const,
        resolution: 'prioritize' as const,
        reason: 'Higher priority task in progress'
      };

      const resolved = coordinator.resolveConflict(conflict);
      expect(resolved).toBe(true);
    });
  });

  describe('Statistics', () => {
    it('should calculate task statistics', () => {
      coordinator.createTask({
        type: 'feature_development',
        title: 'Feature 1',
        description: 'Desc 1',
        priority: 'high'
      });

      coordinator.createTask({
        type: 'bug_fix',
        title: 'Bug fix 1',
        description: 'Desc 2',
        priority: 'critical'
      });

      const stats = coordinator.getTaskStats();
      expect(stats.total).toBe(2);
      expect(stats.byStatus.pending).toBe(2);
      expect(stats.byType.feature_development).toBe(1);
      expect(stats.byType.bug_fix).toBe(1);
      expect(stats.byPriority.high).toBe(1);
      expect(stats.byPriority.critical).toBe(1);
    });
  });
});
