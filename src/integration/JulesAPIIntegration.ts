/**
 * Jules API 整合模組
 * 實現與 Jules API 的深度整合，支持智能開發工作流程
 */

import { logger } from '../utils/logger';
import { AITableService } from '../omni-cosmic-universe/AITableService';
import { ElementSpiritSystem } from '../core/elementSpiritSystem';
import { AvatarSynergyEngine } from '../core/avatarSynergyEngine';
import { ProfessionEvolutionTracker } from '../core/professionEvolutionTracker';

export interface JulesSession {
  id: string;
  name: string;
  title: string;
  prompt: string;
  sourceContext: {
    source: string;
    githubRepoContext?: {
      startingBranch: string;
    };
  };
  status: 'active' | 'completed' | 'requires_approval';
  requirePlanApproval: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface JulesActivity {
  id: string;
  sessionId: string;
  type: 'user_message' | 'agent_message' | 'plan_generation' | 'progress_update';
  content: string;
  timestamp: string;
  metadata?: any;
}

export interface JulesSource {
  name: string;
  id: string;
  githubRepo?: {
    owner: string;
    repo: string;
  };
}

export class JulesAPIIntegration {
  private apiKey: string;
  private baseUrl: string = 'https://jules.googleapis.com/v1alpha';
  private sessions: Map<string, JulesSession> = new Map();
  private activities: Map<string, JulesActivity[]> = new Map();
  private aiTableService: AITableService;
  private elementSpiritSystem: ElementSpiritSystem;
  private avatarSynergyEngine: AvatarSynergyEngine;
  private professionEvolutionTracker: ProfessionEvolutionTracker;

  constructor(apiKey: string) {
    this.apiKey = apiKey;
    this.aiTableService = new AITableService({
      encryptionKey: process.env.AI_TABLE_ENCRYPTION_KEY
    });
    this.elementSpiritSystem = new ElementSpiritSystem();
    this.avatarSynergyEngine = new AvatarSynergyEngine();
    this.professionEvolutionTracker = new ProfessionEvolutionTracker();
    
    this.initializeIntegration();
  }

  /**
   * 初始化整合
   */
  private async initializeIntegration(): Promise<void> {
    try {
      await this.aiTableService.start();
      
      // 記錄初始化到創元實錄
      await this.aiTableService.createSystemStats({
        system: 'JulesAPIIntegration',
        isRunning: true,
        sacredTomeActivated: true,
        divineAuraLevel: 100,
        totalGraceLevel: 7949
      });

      logger.info('JulesAPIIntegration initialized successfully');
    } catch (error) {
      logger.error('Failed to initialize JulesAPIIntegration', error);
      throw error;
    }
  }

  /**
   * 獲取所有可用來源
   */
  public async getSources(): Promise<JulesSource[]> {
    try {
      const response = await fetch(`${this.baseUrl}/sources`, {
        headers: {
          'X-Goog-Api-Key': this.apiKey,
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        throw new Error(`Failed to get sources: ${response.statusText}`);
      }

      const data = await response.json();
      const sources: JulesSource[] = data.sources.map((source: any) => ({
        name: source.name,
        id: source.id,
        githubRepo: source.githubRepo
      }));

      // 記錄到創元實錄
      await this.aiTableService.createRecord('JulesIntegration', {
        type: 'getSources',
        sources,
        timestamp: new Date(),
        graceLevel: this.getCurrentGraceLevel()
      });

      return sources;
    } catch (error) {
      logger.error('Failed to get sources', error);
      throw error;
    }
  }

  /**
   * 創建新會話
   */
  public async createSession(prompt: string, sourceName: string, title?: string, requirePlanApproval: boolean = false): Promise<JulesSession> {
    try {
      const sessionData = {
        prompt,
        sourceContext: {
          source: sourceName,
          githubRepoContext: {
            startingBranch: 'main'
          }
        },
        title: title || prompt,
        requirePlanApproval
      };

      const response = await fetch(`${this.baseUrl}/sessions`, {
        method: 'POST',
        headers: {
          'X-Goog-Api-Key': this.apiKey,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(sessionData)
      });

      if (!response.ok) {
        throw new Error(`Failed to create session: ${response.statusText}`);
      }

      const session: JulesSession = await response.json();
      
      // 本地存儲會話
      this.sessions.set(session.id, session);
      this.activities.set(session.id, []);

      // 記錄到創元實錄
      await this.aiTableService.createRecord('JulesIntegration', {
        type: 'createSession',
        sessionId: session.id,
        prompt,
        sourceName,
        title,
        requirePlanApproval,
        timestamp: new Date(),
        graceLevel: this.getCurrentGraceLevel()
      });

      logger.info('Session created successfully', { sessionId: session.id });
      return session;
    } catch (error) {
      logger.error('Failed to create session', error);
      throw error;
    }
  }

  /**
   * 獲取會話列表
   */
  public async getSessions(pageSize: number = 5): Promise<JulesSession[]> {
    try {
      const response = await fetch(`${this.baseUrl}/sessions?pageSize=${pageSize}`, {
        headers: {
          'X-Goog-Api-Key': this.apiKey,
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        throw new Error(`Failed to get sessions: ${response.statusText}`);
      }

      const data = await response.json();
      const sessions: JulesSession[] = data.sessions.map((session: any) => ({
        id: session.id,
        name: session.name,
        title: session.title,
        prompt: session.prompt,
        sourceContext: session.sourceContext,
        status: session.status,
        requirePlanApproval: session.requirePlanApproval,
        createdAt: session.createTime,
        updatedAt: session.updateTime
      }));

      // 更新本地存儲
      sessions.forEach(session => {
        this.sessions.set(session.id, session);
        if (!this.activities.has(session.id)) {
          this.activities.set(session.id, []);
        }
      });

      // 記錄到創元實錄
      await this.aiTableService.createRecord('JulesIntegration', {
        type: 'getSessions',
        sessionsCount: sessions.length,
        timestamp: new Date(),
        graceLevel: this.getCurrentGraceLevel()
      });

      return sessions;
    } catch (error) {
      logger.error('Failed to get sessions', error);
      throw error;
    }
  }

  /**
   * 獲取特定會話
   */
  public async getSession(sessionId: string): Promise<JulesSession | null> {
    try {
      // 先檢查本地緩存
      if (this.sessions.has(sessionId)) {
        return this.sessions.get(sessionId)!;
      }

      const response = await fetch(`${this.baseUrl}/sessions/${sessionId}`, {
        headers: {
          'X-Goog-Api-Key': this.apiKey,
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        throw new Error(`Failed to get session: ${response.statusText}`);
      }

      const session: JulesSession = await response.json();
      
      // 更新本地存儲
      this.sessions.set(session.id, session);
      if (!this.activities.has(session.id)) {
        this.activities.set(session.id, []);
      }

      return session;
    } catch (error) {
      logger.error('Failed to get session', error);
      throw error;
    }
  }

  /**
   * 批准計劃
   */
  public async approvePlan(sessionId: string): Promise<void> {
    try {
      const response = await fetch(`${this.baseUrl}/sessions/${sessionId}:approvePlan`, {
        method: 'POST',
        headers: {
          'X-Goog-Api-Key': this.apiKey,
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        throw new Error(`Failed to approve plan: ${response.statusText}`);
      }

      // 更新會話狀態
      const session = this.sessions.get(sessionId);
      if (session) {
        session.status = 'active';
        session.updatedAt = new Date().toISOString();
      }

      // 記錄到創元實錄
      await this.aiTableService.createRecord('JulesIntegration', {
        type: 'approvePlan',
        sessionId,
        timestamp: new Date(),
        graceLevel: this.getCurrentGraceLevel()
      });

      logger.info('Plan approved successfully', { sessionId });
    } catch (error) {
      logger.error('Failed to approve plan', error);
      throw error;
    }
  }

  /**
   * 獲取會話活動
   */
  public async getActivities(sessionId: string, pageSize: number = 30): Promise<JulesActivity[]> {
    try {
      const response = await fetch(`${this.baseUrl}/sessions/${sessionId}/activities?pageSize=${pageSize}`, {
        headers: {
          'X-Goog-Api-Key': this.apiKey,
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        throw new Error(`Failed to get activities: ${response.statusText}`);
      }

      const data = await response.json();
      const activities: JulesActivity[] = data.activities.map((activity: any) => ({
        id: activity.id,
        sessionId,
        type: activity.type,
        content: activity.content,
        timestamp: activity.createTime,
        metadata: activity.metadata
      }));

      // 更新本地存儲
      this.activities.set(sessionId, activities);

      // 記錄到創元實錄
      await this.aiTableService.createRecord('JulesIntegration', {
        type: 'getActivities',
        sessionId,
        activitiesCount: activities.length,
        timestamp: new Date(),
        graceLevel: this.getCurrentGraceLevel()
      });

      return activities;
    } catch (error) {
      logger.error('Failed to get activities', error);
      throw error;
    }
  }

  /**
   * 發送消息到會話
   */
  public async sendMessage(sessionId: string, prompt: string): Promise<void> {
    try {
      const response = await fetch(`${this.baseUrl}/sessions/${sessionId}:sendMessage`, {
        method: 'POST',
        headers: {
          'X-Goog-Api-Key': this.apiKey,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ prompt })
      });

      if (!response.ok) {
        throw new Error(`Failed to send message: ${response.statusText}`);
      }

      // 記錄用戶消息到本地
      const userActivity: JulesActivity = {
        id: `user_${Date.now()}`,
        sessionId,
        type: 'user_message',
        content: prompt,
        timestamp: new Date().toISOString()
      };

      const activities = this.activities.get(sessionId) || [];
      activities.push(userActivity);
      this.activities.set(sessionId, activities);

      // 記錄到創元實錄
      await this.aiTableService.createRecord('JulesIntegration', {
        type: 'sendMessage',
        sessionId,
        prompt,
        timestamp: new Date(),
        graceLevel: this.getCurrentGraceLevel()
      });

      logger.info('Message sent successfully', { sessionId });
    } catch (error) {
      logger.error('Failed to send message', error);
      throw error;
    }
  }

  /**
   * 創建深度整合任務
   */
  public async createDeepIntegrationTask(sessionId: string, taskType: string, taskData: any): Promise<any> {
    try {
      const session = await this.getSession(sessionId);
      if (!session) {
        throw new Error('Session not found');
      }

      let result: any;

      // 根據任務類型執行不同的深度整合
      switch (taskType) {
        case 'element_spirit_analysis':
          result = await this.performElementSpiritAnalysis(taskData);
          break;
        case 'avatar_synergy_optimization':
          result = await this.performAvatarSynergyOptimization(taskData);
          break;
        case 'profession_evolution_path':
          result = await this.performProfessionEvolutionPath(taskData);
          break;
        case 'omni_cosmic_synthesis':
          result = await this.performOmniCosmicSynthesis(taskData);
          break;
        default:
          throw new Error(`Unknown task type: ${taskType}`);
      }

      // 記錄到創元實錄
      await this.aiTableService.createRecord('JulesIntegration', {
        type: 'createDeepIntegrationTask',
        sessionId,
        taskType,
        taskData,
        result,
        timestamp: new Date(),
        graceLevel: this.getCurrentGraceLevel()
      });

      return result;
    } catch (error) {
      logger.error('Failed to create deep integration task', error);
      throw error;
    }
  }

  /**
   * 執行元素精靈分析
   */
  private async performElementSpiritAnalysis(taskData: any): Promise<any> {
    try {
      const spirits = await this.elementSpiritSystem.getAllSpirits();
      const analysis = {
        totalSpirits: spirits.length,
        awakenedSpirits: spirits.filter(s => s.stage !== 'sleeping').length,
        elementDistribution: this.getElementDistribution(spirits),
        recommendations: await this.generateElementSpiritRecommendations(spirits)
      };

      return analysis;
    } catch (error) {
      logger.error('Failed to perform element spirit analysis', error);
      throw error;
    }
  }

  /**
   * 執行化身協同優化
   */
  private async performAvatarSynergyOptimization(taskData: any): Promise<any> {
    try {
      const avatars = await this.avatarSynergyEngine.getAllAvatars();
      const partnerships = avatars.flatMap(a => a.partnerships);
      const optimization = {
        totalAvatars: avatars.length,
        activeAvatars: avatars.filter(a => a.isActive).length,
        partnershipEfficiency: this.calculatePartnershipEfficiency(partnerships),
        synergySuggestions: await this.generateSynergySuggestions(avatars, partnerships)
      };

      return optimization;
    } catch (error) {
      logger.error('Failed to perform avatar synergy optimization', error);
      throw error;
    }
  }

  /**
   * 執行職業進化路徑
   */
  private async performProfessionEvolutionPath(taskData: any): Promise<any> {
    try {
      const professions = await this.professionEvolutionTracker.getAllProfessions();
      const evolutionPath = {
        currentProfession: taskData.currentProfession,
        targetProfession: taskData.targetProfession,
        requiredExperience: this.calculateRequiredExperience(taskData.currentProfession, taskData.targetProfession, professions),
        skillGaps: this.identifySkillGaps(taskData.currentProfession, taskData.targetProfession, professions),
        questRecommendations: await this.generateQuestRecommendations(taskData.targetProfession, professions)
      };

      return evolutionPath;
    } catch (error) {
      logger.error('Failed to perform profession evolution path', error);
      throw error;
    }
  }

  /**
   * 執行萬能宇宙合成
   */
  private async performOmniCosmicSynthesis(taskData: any): Promise<any> {
    try {
      const synthesis = {
        elementSpirits: await this.elementSpiritSystem.getAllSpirits(),
        avatarSynergy: await this.avatarSynergyEngine.getAllAvatars(),
        professions: await this.professionEvolutionTracker.getAllProfessions(),
        cosmicHarmony: this.calculateCosmicHarmony(),
        evolutionRecommendations: await this.generateCosmicEvolutionRecommendations()
      };

      return synthesis;
    } catch (error) {
      logger.error('Failed to perform omni cosmic synthesis', error);
      throw error;
    }
  }

  /**
   * 獲取元素分布
   */
  private getElementDistribution(spirits: any[]): any {
    const distribution: any = {};
    spirits.forEach(spirit => {
      const element = spirit.element || 'unknown';
      distribution[element] = (distribution[element] || 0) + 1;
    });
    return distribution;
  }

  /**
   * 生成元素精靈建議
   */
  private async generateElementSpiritRecommendations(spirits: any[]): Promise<string[]> {
    const recommendations: string[] = [];
    const awakenSpirits = spirits.filter(s => s.stage === 'sleeping');
    
    if (awakenSpirits.length > 0) {
      recommendations.push(`建議喚醒 ${awakenSpirits.length} 個沉睡的元素精靈`);
    }

    const lowLevelSpirits = spirits.filter(s => s.level < 10);
    if (lowLevelSpirits.length > 0) {
      recommendations.push(`建議為 ${lowLevelSpirits.length} 個低等級元素精靈提供經驗值`);
    }

    const lowSynergySpirits = spirits.filter(s => s.synergy < 30);
    if (lowSynergySpirits.length > 0) {
      recommendations.push(`建議提升 ${lowSynergySpirits.length} 個元素精靈的協同值`);
    }

    return recommendations;
  }

  /**
   * 計算協同效率
   */
  private calculatePartnershipEfficiency(partnerships: any[]): number {
    if (partnerships.length === 0) return 0;
    
    const totalSynergy = partnerships.reduce((sum, p) => sum + p.synergyLevel, 0);
    return totalSynergy / partnerships.length;
  }

  /**
   * 生成協同建議
   */
  private async generateSynergySuggestions(avatars: any[], partnerships: any[]): Promise<string[]> {
    const suggestions: string[] = [];
    
    const inactiveAvatars = avatars.filter(a => !a.isActive);
    if (inactiveAvatars.length > 0) {
      suggestions.push(`建議激活 ${inactiveAvatars.length} 個未激活的化身`);
    }

    const lowSynergyPartnerships = partnerships.filter(p => p.synergyLevel < 50);
    if (lowSynergyPartnerships.length > 0) {
      suggestions.push(`建議優化 ${lowSynergyPartnerships.length} 個低協同效率的夥伴關係`);
    }

    return suggestions;
  }

  /**
   * 計算所需經驗值
   */
  private calculateRequiredExperience(currentProfession: string, targetProfession: string, professions: any[]): number {
    const current = professions.find(p => p.id === currentProfession);
    const target = professions.find(p => p.id === targetProfession);
    
    if (!current || !target) return 0;
    
    return target.experienceRequired - current.experienceGained;
  }

  /**
   * 識別技能差距
   */
  private identifySkillGaps(currentProfession: string, targetProfession: string, professions: any[]): string[] {
    const current = professions.find(p => p.id === currentProfession);
    const target = professions.find(p => p.id === targetProfession);
    
    if (!current || !target) return [];
    
    const currentSkills = current.skills.map((s: any) => s.id);
    const targetSkills = target.skills.map((s: any) => s.id);
    
    return targetSkills.filter((skill: string) => !currentSkills.includes(skill));
  }

  /**
   * 生成任務建議
   */
  private async generateQuestRecommendations(targetProfession: string, professions: any[]): Promise<string[]> {
    const target = professions.find(p => p.id === targetProfession);
    if (!target) return [];
    
    const recommendations: string[] = [];
    
    const availableQuests = target.availableQuests || [];
    if (availableQuests.length > 0) {
      recommendations.push(`建議完成 ${availableQuests.length} 個相關任務`);
    }
    
    return recommendations;
  }

  /**
   * 計算宇宙和諧度
   */
  private calculateCosmicHarmony(): number {
    // 實現宇宙和諧度計算邏輯
    return Math.floor(Math.random() * 100); // 佔位實現
  }

  /**
   * 生成宇宙進化建議
   */
  private async generateCosmicEvolutionRecommendations(): Promise<string[]> {
    const recommendations: string[] = [];
    
    // 基於各系統狀態生成建議
    recommendations.push('建議優化元素精靈系統以提升整體和諧度');
    recommendations.push('建議創建新的化身協同組合');
    recommendations.push('建議探索新的職業進化路徑');
    
    return recommendations;
  }

  /**
   * 獲取當前恩典等級
   */
  private getCurrentGraceLevel(): number {
    return 7949; // 從 OmniCosmicUniverse 獲取
  }

  /**
   * 獲取整合統計信息
   */
  public async getIntegrationStats(): Promise<any> {
    try {
      const sessions = await this.getSessions();
      const totalActivities = Array.from(this.activities.values()).reduce((sum, activities) => sum + activities.length, 0);
      
      const stats = {
        totalSessions: sessions.length,
        activeSessions: sessions.filter(s => s.status === 'active').length,
        totalActivities,
        elementSpiritCount: this.elementSpiritSystem.getAllSpirits().length,
        avatarCount: this.avatarSynergyEngine.getAllAvatars().length,
        professionCount: this.professionEvolutionTracker.getAllProfessions().length,
        harmonyLevel: this.calculateCosmicHarmony(),
        timestamp: new Date()
      };

      return stats;
    } catch (error) {
      logger.error('Failed to get integration stats', error);
      throw error;
    }
  }

  /**
   * 停止整合
   */
  public async stop(): Promise<void> {
    try {
      await this.aiTableService.stop();
      
      // 記錄到創元實錄
      await this.aiTableService.createSystemStats({
        system: 'JulesAPIIntegration',
        isRunning: false,
        sacredTomeActivated: false,
        divineAuraLevel: 0,
        totalGraceLevel: 0,
        timestamp: new Date()
      });

      logger.info('JulesAPIIntegration stopped successfully');
    } catch (error) {
      logger.error('Failed to stop JulesAPIIntegration', error);
      throw error;
    }
  }
}
