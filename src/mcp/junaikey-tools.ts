/**
 * JunAiKey MCP 工具集
 * 整合 Element Mastery、Avatar Synergy、Profession Evolution 三大系統
 */

import { ElementSpiritSystem } from '../core/elementSpiritSystem';
import { AvatarSynergyEngine } from '../core/avatarSynergyEngine';
import { ProfessionEvolutionTracker } from '../core/professionEvolutionTracker';
import { logger, info, debug, error } from '../utils/logger';

export interface JunAiKeyTool {
  name: string;
  description: string;
  parameters: any;
  execute: (params: any) => Promise<any>;
}

export interface SystemStats {
  elementSpirit: any;
  avatarSynergy: any;
  professionEvolution: any;
  overall: {
    totalLevel: number;
    totalMastery: number;
    totalSynergy: number;
    totalReputation: number;
  };
}

export class JunAiKeyTools {
  private elementSpiritSystem: ElementSpiritSystem;
  private avatarSynergyEngine: AvatarSynergyEngine;
  private professionEvolutionTracker: ProfessionEvolutionTracker;
  private tools: Map<string, JunAiKeyTool> = new Map();

  constructor() {
    this.elementSpiritSystem = new ElementSpiritSystem();
    this.avatarSynergyEngine = new AvatarSynergyEngine();
    this.professionEvolutionTracker = new ProfessionEvolutionTracker();
    
    this.initializeTools();
    info('JunAiKeyTools', 'Initialized JunAiKey MCP Tools');
  }

  /**
   * 初始化所有工具
   */
  private initializeTools(): void {
    // 元素精靈系統工具
    this.registerTool({
      name: 'awaken_spirit',
      description: '喚醒元素精靈',
      parameters: {
        type: 'object',
        properties: {
          spiritId: { type: 'string', description: '元素精靈ID' }
        },
        required: ['spiritId']
      },
      execute: async (params) => {
        const result = this.elementSpiritSystem.awakenSpirit(params.spiritId);
        return { success: result.success, message: result.message, rewards: result.rewards };
      }
    });

    this.registerTool({
      name: 'add_spirit_experience',
      description: '增加元素精靈經驗值',
      parameters: {
        type: 'object',
        properties: {
          spiritId: { type: 'string', description: '元素精靈ID' },
          amount: { type: 'number', description: '經驗值數量' }
        },
        required: ['spiritId', 'amount']
      },
      execute: async (params) => {
        const result = this.elementSpiritSystem.addExperience(params.spiritId, params.amount);
        return { success: result.success, message: result.message, rewards: result.rewards };
      }
    });

    this.registerTool({
      name: 'evolve_spirit',
      description: '進化元素精靈',
      parameters: {
        type: 'object',
        properties: {
          spiritId: { type: 'string', description: '元素精靈ID' },
          targetStage: { type: 'string', description: '目標階段' }
        },
        required: ['spiritId', 'targetStage']
      },
      execute: async (params) => {
        const result = this.elementSpiritSystem.evolveSpirit(params.spiritId, params.targetStage);
        return { success: result.success, message: result.message, rewards: result.rewards };
      }
    });

    // 化身協同系統工具
    this.registerTool({
      name: 'activate_avatar',
      description: '激活化身',
      parameters: {
        type: 'object',
        properties: {
          avatarId: { type: 'string', description: '化身ID' }
        },
        required: ['avatarId']
      },
      execute: async (params) => {
        const success = this.avatarSynergyEngine.activateAvatar(params.avatarId);
        return { success, message: success ? '化身已激活' : '激活失敗' };
      }
    });

    this.registerTool({
      name: 'create_partnership',
      description: '創建協同夥伴關係',
      parameters: {
        type: 'object',
        properties: {
          avatarId1: { type: 'string', description: '第一個化身ID' },
          avatarId2: { type: 'string', description: '第二個化身ID' }
        },
        required: ['avatarId1', 'avatarId2']
      },
      execute: async (params) => {
        const success = this.avatarSynergyEngine.createPartnership(params.avatarId1, params.avatarId2);
        return { success, message: success ? '協同關係已創建' : '創建失敗' };
      }
    });

    this.registerTool({
      name: 'perform_synergy_attack',
      description: '執行協同攻擊',
      parameters: {
        type: 'object',
        properties: {
          attackerIds: { type: 'array', items: { type: 'string' }, description: '攻擊者化身ID列表' },
          targetId: { type: 'string', description: '目標ID' }
        },
        required: ['attackerIds', 'targetId']
      },
      execute: async (params) => {
        const result = this.avatarSynergyEngine.performSynergyAttack(params.attackerIds, params.targetId);
        return { success: result.success, message: result.message, effectiveness: result.effectiveness };
      }
    });

    this.registerTool({
      name: 'use_synergy_combo',
      description: '使用協同組合',
      parameters: {
        type: 'object',
        properties: {
          comboId: { type: 'string', description: '協同組合ID' },
          avatarIds: { type: 'array', items: { type: 'string' }, description: '化身ID列表' }
        },
        required: ['comboId', 'avatarIds']
      },
      execute: async (params) => {
        const result = this.avatarSynergyEngine.useSynergyCombo(params.comboId, params.avatarIds);
        return { success: result.success, message: result.message, effectiveness: result.effectiveness };
      }
    });

    // 職業進化系統工具
    this.registerTool({
      name: 'activate_profession',
      description: '激活職業',
      parameters: {
        type: 'object',
        properties: {
          professionId: { type: 'string', description: '職業ID' }
        },
        required: ['professionId']
      },
      execute: async (params) => {
        const success = this.professionEvolutionTracker.activateProfession(params.professionId);
        return { success, message: success ? '職業已激活' : '激活失敗' };
      }
    });

    this.registerTool({
      name: 'add_profession_experience',
      description: '增加職業經驗值',
      parameters: {
        type: 'object',
        properties: {
          professionId: { type: 'string', description: '職業ID' },
          amount: { type: 'number', description: '經驗值數量' }
        },
        required: ['professionId', 'amount']
      },
      execute: async (params) => {
        const result = this.professionEvolutionTracker.addExperience(params.professionId, params.amount);
        return { success: result.success, message: result.message, rewards: result.rewards };
      }
    });

    this.registerTool({
      name: 'learn_skill',
      description: '學習技能',
      parameters: {
        type: 'object',
        properties: {
          professionId: { type: 'string', description: '職業ID' },
          skillId: { type: 'string', description: '技能ID' }
        },
        required: ['professionId', 'skillId']
      },
      execute: async (params) => {
        const result = this.professionEvolutionTracker.learnSkill(params.professionId, params.skillId);
        return { success: result.success, message: result.message, rewards: result.rewards };
      }
    });

    this.registerTool({
      name: 'accept_quest',
      description: '接受任務',
      parameters: {
        type: 'object',
        properties: {
          questId: { type: 'string', description: '任務ID' },
          professionId: { type: 'string', description: '職業ID' }
        },
        required: ['questId', 'professionId']
      },
      execute: async (params) => {
        const result = this.professionEvolutionTracker.acceptQuest(params.questId, params.professionId);
        return { success: result.success, message: result.message, rewards: result.rewards };
      }
    });

    this.registerTool({
      name: 'update_quest_progress',
      description: '更新任務進度',
      parameters: {
        type: 'object',
        properties: {
          questId: { type: 'string', description: '任務ID' },
          objectiveId: { type: 'string', description: '目標ID' },
          progress: { type: 'number', description: '進度數量' }
        },
        required: ['questId', 'objectiveId', 'progress']
      },
      execute: async (params) => {
        const result = this.professionEvolutionTracker.updateQuestProgress(params.questId, params.objectiveId, params.progress);
        return { success: result.success, message: result.message, rewards: result.rewards };
      }
    });

    // 系統統計工具
    this.registerTool({
      name: 'get_system_stats',
      description: '獲取系統統計信息',
      parameters: {
        type: 'object',
        properties: {
          detailed: { type: 'boolean', description: '是否獲取詳細信息' }
        },
        required: []
      },
      execute: async (params) => {
        return this.getSystemStats(params.detailed || false);
      }
    });

    this.registerTool({
      name: 'get_all_spirits',
      description: '獲取所有元素精靈',
      parameters: {
        type: 'object',
        properties: {},
        required: []
      },
      execute: async (params) => {
        return this.elementSpiritSystem.getAllSpirits();
      }
    });

    this.registerTool({
      name: 'get_all_avatars',
      description: '獲取所有化身',
      parameters: {
        type: 'object',
        properties: {},
        required: []
      },
      execute: async (params) => {
        return this.avatarSynergyEngine.getAllAvatars();
      }
    });

    this.registerTool({
      name: 'get_all_professions',
      description: '獲取所有職業',
      parameters: {
        type: 'object',
        properties: {},
        required: []
      },
      execute: async (params) => {
        return this.professionEvolutionTracker.getAllProfessions();
      }
    });

    debug('JunAiKeyTools', `Registered ${this.tools.size} tools`);
  }

  /**
   * 註冊工具
   */
  private registerTool(tool: JunAiKeyTool): void {
    this.tools.set(tool.name, tool);
    debug('JunAiKeyTools', `Registered tool: ${tool.name}`);
  }

  /**
   * 獲取工具列表
   */
  public getTools(): JunAiKeyTool[] {
    return Array.from(this.tools.values());
  }

  /**
   * 執行工具
   */
  public async executeTool(name: string, params: any): Promise<any> {
    const tool = this.tools.get(name);
    if (!tool) {
      throw new Error(`Tool not found: ${name}`);
    }

    try {
      info('JunAiKeyTools', `Executing tool: ${name} with params:`, params);
      const result = await tool.execute(params);
      info('JunAiKeyTools', `Tool execution successful: ${name}`);
      return result;
    } catch (err) {
      const errorObj = err instanceof Error ? err : new Error(String(err));
      error('JunAiKeyTools', `Tool execution failed: ${name}`, errorObj);
      throw errorObj;
    }
  }

  /**
   * 獲取系統統計信息
   */
  private getSystemStats(detailed: boolean): SystemStats {
    const elementStats = this.elementSpiritSystem.getSystemStats();
    const avatarStats = this.avatarSynergyEngine.getSystemStats();
    const professionStats = this.professionEvolutionTracker.getSystemStats();

    const overall = {
      totalLevel: elementStats.averageLevel + avatarStats.averageLevel + professionStats.averageLevel,
      totalMastery: elementStats.totalMastery + avatarStats.totalSynergy + professionStats.totalMastery,
      totalSynergy: avatarStats.totalSynergy,
      totalReputation: professionStats.totalReputation
    };

    const stats: SystemStats = {
      elementSpirit: detailed ? elementStats : { total: elementStats.totalSpirits, awakened: elementStats.awakenedSpirits },
      avatarSynergy: detailed ? avatarStats : { total: avatarStats.totalAvatars, active: avatarStats.activeAvatars },
      professionEvolution: detailed ? professionStats : { total: professionStats.totalProfessions, active: professionStats.activeProfessions },
      overall
    };

    return stats;
  }

  /**
   * 獲取元素精靈系統
   */
  public getElementSpiritSystem(): ElementSpiritSystem {
    return this.elementSpiritSystem;
  }

  /**
   * 獲取化身協同引擎
   */
  public getAvatarSynergyEngine(): AvatarSynergyEngine {
    return this.avatarSynergyEngine;
  }

  /**
   * 獲取職業進化追蹤器
   */
  public getProfessionEvolutionTracker(): ProfessionEvolutionTracker {
    return this.professionEvolutionTracker;
  }
}

// 導出單例實例
export const junaikeyTools = new JunAiKeyTools();
