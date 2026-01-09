/**
 * Branch Manager - 分支管理器
 * 負責管理 Git 分支的創建、合併和衝突解決
 */

import { EventBus } from '../core/EventBus';
import { logger } from '../utils/logger';

export interface Branch {
  name: string;
  commit: string;
  author: string;
  createdAt: Date;
  updatedAt: Date;
  isMerged: boolean;
  targetBranch?: string;
}

export interface MergeRequest {
  id: string;
  sourceBranch: string;
  targetBranch: string;
  title: string;
  description: string;
  author: string;
  status: 'pending' | 'approved' | 'rejected' | 'merged' | 'conflicted';
  conflicts?: MergeConflict[];
  createdAt: Date;
  updatedAt: Date;
  mergedAt?: Date;
}

export interface MergeConflict {
  file: string;
  type: 'content' | 'delete' | 'rename';
  currentVersion: string;
  incomingVersion: string;
  resolved: boolean;
  resolution?: 'ours' | 'theirs' | 'manual';
  resolvedContent?: string;
}

export interface MergeResult {
  success: boolean;
  mergeRequestId?: string;
  conflicts?: MergeConflict[];
  message: string;
  commit?: string;
}

/**
 * Branch Manager - 管理分支和合併操作
 */
export class BranchManager {
  private branches: Map<string, Branch> = new Map();
  private mergeRequests: Map<string, MergeRequest> = new Map();
  private eventBus: EventBus;
  private logger;
  private mainBranch: string = 'main';

  constructor(config: { 
    eventBus: EventBus;
    mainBranch?: string;
  }) {
    this.eventBus = config.eventBus;
    this.mainBranch = config.mainBranch || 'main';
    this.logger = logger;
  }

  /**
   * 創建新分支
   */
  public createBranch(config: {
    name: string;
    from?: string;
    author: string;
  }): boolean {
    if (this.branches.has(config.name)) {
      this.logger.warn('Branch already exists', { branchName: config.name });
      return false;
    }

    const branch: Branch = {
      name: config.name,
      commit: this.generateCommitHash(),
      author: config.author,
      createdAt: new Date(),
      updatedAt: new Date(),
      isMerged: false,
      targetBranch: config.from || this.mainBranch
    };

    this.branches.set(config.name, branch);
    this.eventBus.emit('branch_created', branch);
    this.logger.info('Branch created', { branchName: config.name });

    return true;
  }

  /**
   * 創建合併請求
   */
  public createMergeRequest(config: {
    sourceBranch: string;
    targetBranch?: string;
    title: string;
    description: string;
    author: string;
  }): string | null {
    const sourceBranch = this.branches.get(config.sourceBranch);
    if (!sourceBranch) {
      this.logger.error('Source branch not found', { 
        sourceBranch: config.sourceBranch 
      });
      return null;
    }

    const targetBranch = config.targetBranch || this.mainBranch;
    if (!this.branches.has(targetBranch)) {
      this.logger.error('Target branch not found', { targetBranch });
      return null;
    }

    const mrId = `mr_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    
    const mergeRequest: MergeRequest = {
      id: mrId,
      sourceBranch: config.sourceBranch,
      targetBranch,
      title: config.title,
      description: config.description,
      author: config.author,
      status: 'pending',
      createdAt: new Date(),
      updatedAt: new Date()
    };

    // Check for conflicts
    const conflicts = this.detectConflicts(config.sourceBranch, targetBranch);
    if (conflicts.length > 0) {
      mergeRequest.status = 'conflicted';
      mergeRequest.conflicts = conflicts;
    }

    this.mergeRequests.set(mrId, mergeRequest);
    this.eventBus.emit('merge_request_created', mergeRequest);
    this.logger.info('Merge request created', { 
      mrId, 
      sourceBranch: config.sourceBranch,
      targetBranch 
    });

    return mrId;
  }

  /**
   * 檢測合併衝突
   */
  private detectConflicts(sourceBranch: string, targetBranch: string): MergeConflict[] {
    const conflicts: MergeConflict[] = [];

    // 模擬衝突檢測邏輯
    // 在實際應用中，這裡應該調用 Git API 或執行 Git 命令
    const source = this.branches.get(sourceBranch);
    const target = this.branches.get(targetBranch);

    if (!source || !target) return conflicts;

    // 模擬一些常見的衝突場景
    if (Math.random() > 0.7) { // 30% 機率有衝突
      conflicts.push({
        file: 'src/example.ts',
        type: 'content',
        currentVersion: '// Target version',
        incomingVersion: '// Source version',
        resolved: false
      });
    }

    return conflicts;
  }

  /**
   * 解決衝突
   */
  public resolveConflict(
    mrId: string,
    file: string,
    resolution: 'ours' | 'theirs' | 'manual',
    content?: string
  ): boolean {
    const mr = this.mergeRequests.get(mrId);
    if (!mr || !mr.conflicts) {
      this.logger.error('Merge request or conflicts not found', { mrId });
      return false;
    }

    const conflict = mr.conflicts.find(c => c.file === file);
    if (!conflict) {
      this.logger.error('Conflict not found for file', { mrId, file });
      return false;
    }

    conflict.resolved = true;
    conflict.resolution = resolution;
    
    if (resolution === 'manual' && content) {
      conflict.resolvedContent = content;
    } else if (resolution === 'ours') {
      conflict.resolvedContent = conflict.currentVersion;
    } else if (resolution === 'theirs') {
      conflict.resolvedContent = conflict.incomingVersion;
    }

    // 檢查是否所有衝突都已解決
    const allResolved = mr.conflicts.every(c => c.resolved);
    if (allResolved) {
      mr.status = 'approved';
      mr.updatedAt = new Date();
    }

    this.mergeRequests.set(mrId, mr);
    this.eventBus.emit('conflict_resolved', { 
      mrId, 
      file, 
      resolution,
      allResolved 
    });
    this.logger.info('Conflict resolved', { mrId, file, resolution });

    return true;
  }

  /**
   * 批量解決衝突
   */
  public resolveAllConflicts(
    mrId: string,
    strategy: 'ours' | 'theirs'
  ): boolean {
    const mr = this.mergeRequests.get(mrId);
    if (!mr || !mr.conflicts) return false;

    mr.conflicts.forEach(conflict => {
      if (!conflict.resolved) {
        conflict.resolved = true;
        conflict.resolution = strategy;
        conflict.resolvedContent = strategy === 'ours' 
          ? conflict.currentVersion 
          : conflict.incomingVersion;
      }
    });

    mr.status = 'approved';
    mr.updatedAt = new Date();
    this.mergeRequests.set(mrId, mr);

    this.eventBus.emit('all_conflicts_resolved', { mrId, strategy });
    this.logger.info('All conflicts resolved', { mrId, strategy });

    return true;
  }

  /**
   * 批准合併請求
   */
  public approveMergeRequest(mrId: string): boolean {
    const mr = this.mergeRequests.get(mrId);
    if (!mr) return false;

    // Check if there are unresolved conflicts
    if (mr.conflicts && mr.conflicts.some(c => !c.resolved)) {
      this.logger.warn('Cannot approve merge request with unresolved conflicts', { mrId });
      return false;
    }

    mr.status = 'approved';
    mr.updatedAt = new Date();
    this.mergeRequests.set(mrId, mr);

    this.eventBus.emit('merge_request_approved', { mrId });
    this.logger.info('Merge request approved', { mrId });

    return true;
  }

  /**
   * 拒絕合併請求
   */
  public rejectMergeRequest(mrId: string, reason?: string): boolean {
    const mr = this.mergeRequests.get(mrId);
    if (!mr) return false;

    mr.status = 'rejected';
    mr.updatedAt = new Date();
    this.mergeRequests.set(mrId, mr);

    this.eventBus.emit('merge_request_rejected', { mrId, reason });
    this.logger.info('Merge request rejected', { mrId, reason });

    return true;
  }

  /**
   * 執行合併
   */
  public async merge(mrId: string): Promise<MergeResult> {
    const mr = this.mergeRequests.get(mrId);
    if (!mr) {
      return {
        success: false,
        message: 'Merge request not found'
      };
    }

    if (mr.status !== 'approved') {
      return {
        success: false,
        message: 'Merge request not approved'
      };
    }

    // Check if all conflicts are resolved
    if (mr.conflicts && mr.conflicts.some(c => !c.resolved)) {
      return {
        success: false,
        conflicts: mr.conflicts.filter(c => !c.resolved),
        message: 'Unresolved conflicts exist'
      };
    }

    // Perform the merge
    const sourceBranch = this.branches.get(mr.sourceBranch);
    const targetBranch = this.branches.get(mr.targetBranch);

    if (!sourceBranch || !targetBranch) {
      return {
        success: false,
        message: 'Branch not found'
      };
    }

    // Update branch status
    sourceBranch.isMerged = true;
    sourceBranch.updatedAt = new Date();
    this.branches.set(mr.sourceBranch, sourceBranch);

    // Update merge request status
    mr.status = 'merged';
    mr.mergedAt = new Date();
    mr.updatedAt = new Date();
    this.mergeRequests.set(mrId, mr);

    const commitHash = this.generateCommitHash();

    this.eventBus.emit('branch_merged', { 
      mrId, 
      sourceBranch: mr.sourceBranch,
      targetBranch: mr.targetBranch,
      commit: commitHash
    });

    this.logger.info('Branch merged successfully', { 
      mrId, 
      sourceBranch: mr.sourceBranch,
      targetBranch: mr.targetBranch 
    });

    return {
      success: true,
      mergeRequestId: mrId,
      message: 'Merge completed successfully',
      commit: commitHash
    };
  }

  /**
   * 生成提交哈希
   */
  private generateCommitHash(): string {
    return `commit_${Date.now()}_${Math.random().toString(36).substr(2, 16)}`;
  }

  /**
   * 獲取分支
   */
  public getBranch(name: string): Branch | null {
    return this.branches.get(name) || null;
  }

  /**
   * 獲取所有分支
   */
  public getAllBranches(): Branch[] {
    return Array.from(this.branches.values());
  }

  /**
   * 獲取合併請求
   */
  public getMergeRequest(mrId: string): MergeRequest | null {
    return this.mergeRequests.get(mrId) || null;
  }

  /**
   * 獲取所有合併請求
   */
  public getAllMergeRequests(): MergeRequest[] {
    return Array.from(this.mergeRequests.values());
  }

  /**
   * 獲取待處理的合併請求
   */
  public getPendingMergeRequests(): MergeRequest[] {
    return Array.from(this.mergeRequests.values()).filter(
      mr => mr.status === 'pending' || mr.status === 'conflicted'
    );
  }

  /**
   * 獲取分支統計
   */
  public getBranchStats(): {
    total: number;
    merged: number;
    active: number;
    mergeRequests: {
      total: number;
      pending: number;
      approved: number;
      merged: number;
      rejected: number;
      conflicted: number;
    };
  } {
    const branches = Array.from(this.branches.values());
    const mergeRequests = Array.from(this.mergeRequests.values());

    return {
      total: branches.length,
      merged: branches.filter(b => b.isMerged).length,
      active: branches.filter(b => !b.isMerged).length,
      mergeRequests: {
        total: mergeRequests.length,
        pending: mergeRequests.filter(mr => mr.status === 'pending').length,
        approved: mergeRequests.filter(mr => mr.status === 'approved').length,
        merged: mergeRequests.filter(mr => mr.status === 'merged').length,
        rejected: mergeRequests.filter(mr => mr.status === 'rejected').length,
        conflicted: mergeRequests.filter(mr => mr.status === 'conflicted').length
      }
    };
  }

  /**
   * 刪除已合併的分支
   */
  public deleteMergedBranch(branchName: string): boolean {
    const branch = this.branches.get(branchName);
    if (!branch) return false;

    if (!branch.isMerged) {
      this.logger.warn('Cannot delete unmerged branch', { branchName });
      return false;
    }

    if (branchName === this.mainBranch) {
      this.logger.error('Cannot delete main branch', { branchName });
      return false;
    }

    this.branches.delete(branchName);
    this.eventBus.emit('branch_deleted', { branchName });
    this.logger.info('Branch deleted', { branchName });

    return true;
  }

  /**
   * 清理已合併的分支
   */
  public cleanupMergedBranches(): number {
    let deletedCount = 0;
    const branches = Array.from(this.branches.values());

    branches.forEach(branch => {
      if (branch.isMerged && branch.name !== this.mainBranch) {
        if (this.deleteMergedBranch(branch.name)) {
          deletedCount++;
        }
      }
    });

    this.logger.info('Merged branches cleaned up', { deletedCount });
    return deletedCount;
  }
}
