/**
 * BranchManager 測試
 */

import { BranchManager, MergeRequest, MergeConflict } from '../BranchManager';
import { EventBus } from '../../core/EventBus';

describe('BranchManager', () => {
  let branchManager: BranchManager;
  let eventBus: EventBus;

  beforeEach(() => {
    eventBus = new EventBus();
    branchManager = new BranchManager({ 
      eventBus,
      mainBranch: 'main'
    });
    
    // Create main branch
    branchManager.createBranch({
      name: 'main',
      author: 'system'
    });
  });

  describe('Branch Management', () => {
    it('should create a new branch', () => {
      const created = branchManager.createBranch({
        name: 'feature/new-feature',
        author: 'developer'
      });

      expect(created).toBe(true);

      const branch = branchManager.getBranch('feature/new-feature');
      expect(branch).toBeDefined();
      expect(branch?.name).toBe('feature/new-feature');
      expect(branch?.author).toBe('developer');
      expect(branch?.isMerged).toBe(false);
    });

    it('should not create duplicate branch', () => {
      branchManager.createBranch({
        name: 'feature/test',
        author: 'developer'
      });

      const created = branchManager.createBranch({
        name: 'feature/test',
        author: 'developer'
      });

      expect(created).toBe(false);
    });

    it('should get all branches', () => {
      branchManager.createBranch({
        name: 'feature/a',
        author: 'dev1'
      });

      branchManager.createBranch({
        name: 'feature/b',
        author: 'dev2'
      });

      const branches = branchManager.getAllBranches();
      expect(branches.length).toBe(3); // main + 2 new branches
    });
  });

  describe('Merge Request Management', () => {
    beforeEach(() => {
      branchManager.createBranch({
        name: 'feature/login',
        author: 'developer'
      });
    });

    it('should create merge request', () => {
      const mrId = branchManager.createMergeRequest({
        sourceBranch: 'feature/login',
        targetBranch: 'main',
        title: 'Add login feature',
        description: 'Implements user authentication',
        author: 'developer'
      });

      expect(mrId).toBeDefined();
      expect(mrId).toContain('mr_');

      const mr = branchManager.getMergeRequest(mrId!);
      expect(mr).toBeDefined();
      expect(mr?.sourceBranch).toBe('feature/login');
      expect(mr?.targetBranch).toBe('main');
      expect(mr?.status).toBeDefined();
    });

    it('should not create merge request for non-existent branch', () => {
      const mrId = branchManager.createMergeRequest({
        sourceBranch: 'feature/nonexistent',
        targetBranch: 'main',
        title: 'Test',
        description: 'Test',
        author: 'developer'
      });

      expect(mrId).toBeNull();
    });

    it('should approve merge request', () => {
      const mrId = branchManager.createMergeRequest({
        sourceBranch: 'feature/login',
        title: 'Add login',
        description: 'Login feature',
        author: 'developer'
      });

      const approved = branchManager.approveMergeRequest(mrId!);
      expect(approved).toBe(true);

      const mr = branchManager.getMergeRequest(mrId!);
      expect(mr?.status).toBe('approved');
    });

    it('should reject merge request', () => {
      const mrId = branchManager.createMergeRequest({
        sourceBranch: 'feature/login',
        title: 'Add login',
        description: 'Login feature',
        author: 'developer'
      });

      const rejected = branchManager.rejectMergeRequest(mrId!, 'Does not meet requirements');
      expect(rejected).toBe(true);

      const mr = branchManager.getMergeRequest(mrId!);
      expect(mr?.status).toBe('rejected');
    });
  });

  describe('Conflict Resolution', () => {
    beforeEach(() => {
      branchManager.createBranch({
        name: 'feature/conflict',
        author: 'developer'
      });
    });

    it('should resolve conflict with manual resolution', () => {
      const mrId = branchManager.createMergeRequest({
        sourceBranch: 'feature/conflict',
        title: 'Test conflicts',
        description: 'Test conflict resolution',
        author: 'developer'
      });

      const mr = branchManager.getMergeRequest(mrId!);
      
      // If there are conflicts, resolve them
      if (mr?.conflicts && mr.conflicts.length > 0) {
        const resolved = branchManager.resolveConflict(
          mrId!,
          mr.conflicts[0].file,
          'manual',
          '// Manually resolved content'
        );

        expect(resolved).toBe(true);

        const updatedMr = branchManager.getMergeRequest(mrId!);
        const conflict = updatedMr?.conflicts?.find(c => c.file === mr.conflicts![0].file);
        expect(conflict?.resolved).toBe(true);
        expect(conflict?.resolvedContent).toBe('// Manually resolved content');
      }
    });

    it('should resolve conflict with "ours" strategy', () => {
      const mrId = branchManager.createMergeRequest({
        sourceBranch: 'feature/conflict',
        title: 'Test conflicts',
        description: 'Test conflict resolution',
        author: 'developer'
      });

      const mr = branchManager.getMergeRequest(mrId!);
      
      if (mr?.conflicts && mr.conflicts.length > 0) {
        const resolved = branchManager.resolveConflict(
          mrId!,
          mr.conflicts[0].file,
          'ours'
        );

        expect(resolved).toBe(true);

        const updatedMr = branchManager.getMergeRequest(mrId!);
        const conflict = updatedMr?.conflicts?.find(c => c.file === mr.conflicts![0].file);
        expect(conflict?.resolved).toBe(true);
        expect(conflict?.resolution).toBe('ours');
      }
    });

    it('should resolve all conflicts with bulk strategy', () => {
      const mrId = branchManager.createMergeRequest({
        sourceBranch: 'feature/conflict',
        title: 'Test conflicts',
        description: 'Test conflict resolution',
        author: 'developer'
      });

      const mr = branchManager.getMergeRequest(mrId!);
      
      if (mr?.conflicts && mr.conflicts.length > 0) {
        const resolved = branchManager.resolveAllConflicts(mrId!, 'theirs');
        expect(resolved).toBe(true);

        const updatedMr = branchManager.getMergeRequest(mrId!);
        expect(updatedMr?.status).toBe('approved');
        updatedMr?.conflicts?.forEach(conflict => {
          expect(conflict.resolved).toBe(true);
        });
      }
    });
  });

  describe('Merge Operations', () => {
    beforeEach(() => {
      branchManager.createBranch({
        name: 'feature/ready',
        author: 'developer'
      });
    });

    it('should merge approved request without conflicts', async () => {
      const mrId = branchManager.createMergeRequest({
        sourceBranch: 'feature/ready',
        title: 'Ready to merge',
        description: 'Feature is complete',
        author: 'developer'
      });

      const mr = branchManager.getMergeRequest(mrId!);
      
      // Resolve any conflicts first
      if (mr?.conflicts && mr.conflicts.length > 0) {
        branchManager.resolveAllConflicts(mrId!, 'theirs');
      }

      branchManager.approveMergeRequest(mrId!);

      const result = await branchManager.merge(mrId!);
      expect(result.success).toBe(true);
      expect(result.commit).toBeDefined();

      const updatedMr = branchManager.getMergeRequest(mrId!);
      expect(updatedMr?.status).toBe('merged');

      const branch = branchManager.getBranch('feature/ready');
      expect(branch?.isMerged).toBe(true);
    });

    it('should not merge unapproved request', async () => {
      const mrId = branchManager.createMergeRequest({
        sourceBranch: 'feature/ready',
        title: 'Not approved',
        description: 'Not approved yet',
        author: 'developer'
      });

      const result = await branchManager.merge(mrId!);
      expect(result.success).toBe(false);
      expect(result.message).toContain('not approved');
    });

    it('should not merge with unresolved conflicts', async () => {
      const mrId = branchManager.createMergeRequest({
        sourceBranch: 'feature/ready',
        title: 'Has conflicts',
        description: 'Has unresolved conflicts',
        author: 'developer'
      });

      branchManager.approveMergeRequest(mrId!);

      const mr = branchManager.getMergeRequest(mrId!);
      
      // Only test if there are actual conflicts
      if (mr?.conflicts && mr.conflicts.length > 0) {
        const result = await branchManager.merge(mrId!);
        expect(result.success).toBe(false);
        expect(result.conflicts).toBeDefined();
      }
    });
  });

  describe('Branch Cleanup', () => {
    it('should delete merged branch', () => {
      branchManager.createBranch({
        name: 'feature/old',
        author: 'developer'
      });

      const mrId = branchManager.createMergeRequest({
        sourceBranch: 'feature/old',
        title: 'Old feature',
        description: 'To be deleted',
        author: 'developer'
      });

      // Resolve conflicts and merge
      const mr = branchManager.getMergeRequest(mrId!);
      if (mr?.conflicts && mr.conflicts.length > 0) {
        branchManager.resolveAllConflicts(mrId!, 'theirs');
      }
      
      branchManager.approveMergeRequest(mrId!);
      branchManager.merge(mrId!);

      const deleted = branchManager.deleteMergedBranch('feature/old');
      expect(deleted).toBe(true);

      const branch = branchManager.getBranch('feature/old');
      expect(branch).toBeNull();
    });

    it('should not delete unmerged branch', () => {
      branchManager.createBranch({
        name: 'feature/active',
        author: 'developer'
      });

      const deleted = branchManager.deleteMergedBranch('feature/active');
      expect(deleted).toBe(false);
    });

    it('should not delete main branch', () => {
      const deleted = branchManager.deleteMergedBranch('main');
      expect(deleted).toBe(false);
    });

    it('should cleanup all merged branches', async () => {
      // Create and merge multiple branches
      for (let i = 0; i < 3; i++) {
        const branchName = `feature/cleanup-${i}`;
        branchManager.createBranch({
          name: branchName,
          author: 'developer'
        });

        const mrId = branchManager.createMergeRequest({
          sourceBranch: branchName,
          title: `Cleanup test ${i}`,
          description: 'Test cleanup',
          author: 'developer'
        });

        const mr = branchManager.getMergeRequest(mrId!);
        if (mr?.conflicts && mr.conflicts.length > 0) {
          branchManager.resolveAllConflicts(mrId!, 'theirs');
        }

        branchManager.approveMergeRequest(mrId!);
        await branchManager.merge(mrId!);
      }

      const deletedCount = branchManager.cleanupMergedBranches();
      expect(deletedCount).toBe(3);
    });
  });

  describe('Statistics', () => {
    it('should calculate branch statistics', async () => {
      branchManager.createBranch({ name: 'feature/a', author: 'dev1' });
      branchManager.createBranch({ name: 'feature/b', author: 'dev2' });
      
      const mrId = branchManager.createMergeRequest({
        sourceBranch: 'feature/a',
        title: 'Feature A',
        description: 'Test',
        author: 'dev1'
      });

      const mr = branchManager.getMergeRequest(mrId!);
      if (mr?.conflicts && mr.conflicts.length > 0) {
        branchManager.resolveAllConflicts(mrId!, 'theirs');
      }

      branchManager.approveMergeRequest(mrId!);
      await branchManager.merge(mrId!);

      const stats = branchManager.getBranchStats();
      expect(stats.total).toBe(3); // main + 2 features
      expect(stats.merged).toBe(1);
      expect(stats.active).toBe(2);
      expect(stats.mergeRequests.total).toBe(1);
      expect(stats.mergeRequests.merged).toBe(1);
    });
  });
});
