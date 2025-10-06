/**
 * JunAiKey 職業進化追蹤器核心實現
 * 實現 Profession Evolution - 職業進化系統的核心邏輯
 */

import {
  MainProfession,
  Specialization,
  ProfessionSkill,
  SkillRequirement,
  SkillEffect,
  ProfessionProgress,
  ProfessionEvolution,
  ActiveEffect,
  ProfessionQuest,
  QuestObjective,
  QuestReward,
  ProfessionNetwork,
  ProfessionRelationship,
  NetworkEffect,
  ProfessionResult,
  ProfessionStats
} from '../types/professionEvolution';
import { logger, info, debug, error } from '../utils/logger';

export class ProfessionEvolutionTracker {
  private professions: Map<string, ProfessionEvolution> = new Map();
  private activeProfessions: Set<string> = new Set();
  private professionNetwork: ProfessionNetwork;
  private availableQuests: Map<string, ProfessionQuest> = new Map();

  constructor() {
    this.professionNetwork = {
      nodes: new Map(),
      edges: new Map(),
      totalMastery: 0,
      activeProfessions: 0,
      networkEffects: []
    };
    this.initializeDefaultProfessions();
    this.initializeProfessionNetwork();
    this.initializeDefaultQuests();
  }

  /**
   * 初始化預設職業
   */
  private initializeDefaultProfessions(): void {
    const defaultProfessions: Omit<ProfessionEvolution, 'id'>[] = [
      {
        mainProfession: MainProfession.INSIGHT,
        specialization: Specialization.ANALYST,
        name: '數據分析師',
        description: '精通數據洞察與分析，洞悉系統本質',
        color: '#0080FF',
        icon: '📊',
        progress: {
          level: 1,
          experience: 0,
          experienceToNext: 100,
          skillPoints: 0,
          mastery: 0,
          reputation: 0,
          achievements: [],
          unlockedSkills: []
        },
        skills: [],
        activeEffects: [],
        unlockedAt: new Date(),
        isActive: false,
        students: []
      },
      {
        mainProfession: MainProfession.CONSTRUCTION,
        specialization: Specialization.ARCHITECT,
        name: '系統架構師',
        description: '專注於系統設計與構建，打造完美架構',
        color: '#FFD700',
        icon: '🏗️',
        progress: {
          level: 1,
          experience: 0,
          experienceToNext: 100,
          skillPoints: 0,
          mastery: 0,
          reputation: 0,
          achievements: [],
          unlockedSkills: []
        },
        skills: [],
        activeEffects: [],
        unlockedAt: new Date(),
        isActive: false,
        students: []
      },
      {
        mainProfession: MainProfession.CREATION,
        specialization: Specialization.DESIGNER,
        name: '創意設計師',
        description: '專注於創意設計與創新，構思未來可能',
        color: '#00FF00',
        icon: '🎨',
        progress: {
          level: 1,
          experience: 0,
          experienceToNext: 100,
          skillPoints: 0,
          mastery: 0,
          reputation: 0,
          achievements: [],
          unlockedSkills: []
        },
        skills: [],
        activeEffects: [],
        unlockedAt: new Date(),
        isActive: false,
        students: []
      },
      {
        mainProfession: MainProfession.EXECUTION,
        specialization: Specialization.COMMANDER,
        name: '指揮官',
        description: '專注於任務執行與管理，引領團隊前行',
        color: '#FF0000',
        icon: '⚔️',
        progress: {
          level: 1,
          experience: 0,
          experienceToNext: 100,
          skillPoints: 0,
          mastery: 0,
          reputation: 0,
          achievements: [],
          unlockedSkills: []
        },
        skills: [],
        activeEffects: [],
        unlockedAt: new Date(),
        isActive: false,
        students: []
      }
    ];

    defaultProfessions.forEach((profession, index) => {
      const id = `profession_${MainProfession[profession.mainProfession]}_${index + 1}`;
      this.professions.set(id, { ...profession, id });
    });

    debug('ProfessionEvolutionTracker', `Initialized ${defaultProfessions.length} default professions`);
  }

  /**
   * 初始化職業網絡
   */
  private initializeProfessionNetwork(): void {
    this.professions.forEach((profession, id) => {
      this.professionNetwork.nodes.set(id, profession);
    });

    debug('ProfessionEvolutionTracker', 'Initialized profession network');
  }

  /**
   * 初始化預設任務
   */
  private initializeDefaultQuests(): void {
    const defaultQuests: ProfessionQuest[] = [
      {
        id: 'first_analysis',
        title: '初次分析',
        description: '完成第一次數據分析任務',
        profession: MainProfession.INSIGHT,
        difficulty: 'beginner',
        objectives: [
          {
            id: 'analyze_data',
            description: '分析系統數據',
            type: 'task',
            target: 'system_data',
            progress: 0,
            completed: false,
            required: 1
          }
        ],
        rewards: [
          {
            type: 'experience',
            amount: 50,
            description: '獲得 50 經驗值'
          },
          {
            type: 'skill_point',
            amount: 1,
            description: '獲得 1 技能點'
          }
        ],
        progress: 0,
        status: 'available',
        prerequisites: []
      },
      {
        id: 'first_construction',
        title: '初次構建',
        description: '完成第一次系統構建任務',
        profession: MainProfession.CONSTRUCTION,
        difficulty: 'beginner',
        objectives: [
          {
            id: 'construct_system',
            description: '構建系統模塊',
            type: 'task',
            target: 'system_module',
            progress: 0,
            completed: false,
            required: 1
          }
        ],
        rewards: [
          {
            type: 'experience',
            amount: 50,
            description: '獲得 50 經驗值'
          },
          {
            type: 'skill_point',
            amount: 1,
            description: '獲得 1 技能點'
          }
        ],
        progress: 0,
        status: 'available',
        prerequisites: []
      }
    ];

    defaultQuests.forEach(quest => {
      this.availableQuests.set(quest.id, quest);
    });

    debug('ProfessionEvolutionTracker', `Initialized ${defaultQuests.length} default quests`);
  }

  /**
   * 獲取職業
   */
  public getProfession(id: string): ProfessionEvolution | undefined {
    return this.professions.get(id);
  }

  /**
   * 獲取所有職業
   */
  public getAllProfessions(): ProfessionEvolution[] {
    return Array.from(this.professions.values());
  }

  /**
   * 激活職業
   */
  public activateProfession(id: string): boolean {
    const profession = this.professions.get(id);
    if (!profession) {
      error('ProfessionEvolutionTracker', `Profession not found: ${id}`);
      return false;
    }

    profession.isActive = true;
    profession.lastProgressAt = new Date();
    this.activeProfessions.add(id);

    // 添加初始技能
    if (profession.skills.length === 0) {
      profession.skills = this.generateDefaultSkills(profession.mainProfession, profession.specialization);
    }

    info('ProfessionEvolutionTracker', `Profession activated: ${profession.name}`);

    return true;
  }

  /**
   * 停用職業
   */
  public deactivateProfession(id: string): boolean {
    const profession = this.professions.get(id);
    if (!profession) {
      error('ProfessionEvolutionTracker', `Profession not found: ${id}`);
      return false;
    }

    profession.isActive = false;
    this.activeProfessions.delete(id);

    info('ProfessionEvolutionTracker', `Profession deactivated: ${profession.name}`);

    return true;
  }

  /**
   * 獲取激活的職業
   */
  public getActiveProfessions(): ProfessionEvolution[] {
    return Array.from(this.activeProfessions)
      .map(id => this.professions.get(id))
      .filter(profession => profession !== undefined) as ProfessionEvolution[];
  }

  /**
   * 生成預設技能
   */
  private generateDefaultSkills(mainProfession: MainProfession, specialization: Specialization): ProfessionSkill[] {
    const skills: ProfessionSkill[] = [];

    switch (mainProfession) {
      case MainProfession.INSIGHT:
        skills.push({
          id: 'data_analysis',
          name: '數據分析',
          description: '分析數據並提取有價值的信息',
          level: 1,
          maxLevel: 10,
          requirements: [],
          effects: [
            {
              type: 'buff',
              value: 20,
              duration: 60,
              target: 'self',
              description: '提升洞察力 20%'
            }
          ],
          unlockedAt: new Date()
        });
        break;

      case MainProfession.CONSTRUCTION:
        skills.push({
          id: 'system_design',
          name: '系統設計',
          description: '設計高效能的系統架構',
          level: 1,
          maxLevel: 10,
          requirements: [],
          effects: [
            {
              type: 'buff',
              value: 15,
              duration: 45,
              target: 'self',
              description: '提升構建效率 15%'
            }
          ],
          unlockedAt: new Date()
        });
        break;

      case MainProfession.CREATION:
        skills.push({
          id: 'creative_thinking',
          name: '創意思考',
          description: '突破思維限制，產生創意想法',
          level: 1,
          maxLevel: 10,
          requirements: [],
          effects: [
            {
              type: 'buff',
              value: 25,
              duration: 90,
              target: 'self',
              description: '提升創意性 25%'
            }
          ],
          unlockedAt: new Date()
        });
        break;

      case MainProfession.EXECUTION:
        skills.push({
          id: 'task_management',
          name: '任務管理',
          description: '高效管理多個任務的執行',
          level: 1,
          maxLevel: 10,
          requirements: [],
          effects: [
            {
              type: 'buff',
              value: 30,
              duration: 120,
              target: 'self',
              description: '提升執行效率 30%'
            }
          ],
          unlockedAt: new Date()
        });
        break;
    }

    return skills;
  }

  /**
   * 增加職業經驗值
   */
  public addExperience(id: string, amount: number): ProfessionResult {
    const profession = this.professions.get(id);
    if (!profession) {
      return {
        success: false,
        message: '職業不存在'
      };
    }

    profession.progress.experience += amount;

    // 檢查是否升級
    const expNeeded = this.getExperienceNeeded(profession.progress.level);
    while (profession.progress.experience >= expNeeded && profession.progress.level < 50) {
      profession.progress.experience -= expNeeded;
      profession.progress.level++;
      
      // 增加技能點
      profession.progress.skillPoints += 2;
      
      // 增加精通度
      profession.progress.mastery = Math.min(100, profession.progress.mastery + 5);
      
      // 增加聲望
      profession.progress.reputation = Math.min(100, profession.progress.reputation + 3);

      info('ProfessionEvolutionTracker', `Profession level up: ${profession.name} is now level ${profession.progress.level}`);
    }

    profession.lastProgressAt = new Date();

    return {
      success: true,
      newLevel: profession.progress.level,
      newMastery: profession.progress.mastery,
      message: `${profession.name} 獲得 ${amount} 經驗值！`,
      rewards: [
        { type: 'experience', amount: 0, description: '等級提升' },
        { type: 'skill_point', amount: 2, description: '技能點增加' },
        { type: 'reputation', amount: 3, description: '聲望增加' }
      ]
    };
  }

  /**
   * 獲取升級所需經驗值
   */
  private getExperienceNeeded(level: number): number {
    return Math.floor(100 * Math.pow(1.5, level - 1));
  }

  /**
   * 學習技能
   */
  public learnSkill(professionId: string, skillId: string): ProfessionResult {
    const profession = this.professions.get(professionId);
    if (!profession) {
      return {
        success: false,
        message: '職業不存在'
      };
    }

    const skill = profession.skills.find(s => s.id === skillId);
    if (!skill) {
      return {
        success: false,
        message: '技能不存在'
      };
    }

    if (skill.level >= skill.maxLevel) {
      return {
        success: false,
        message: '技能已達到最高等級'
      };
    }

    if (profession.progress.skillPoints < 1) {
      return {
        success: false,
        message: '技能點不足'
      };
    }

    // 檢查技能需求
    const canLearn = this.checkSkillRequirements(profession, skill);
    if (!canLearn.success) {
      return canLearn;
    }

    // 學習技能
    skill.level++;
    profession.progress.skillPoints--;
    skill.lastUsedAt = new Date();

    info('ProfessionEvolutionTracker', `Skill learned: ${skill.name} to level ${skill.level}`);

    return {
      success: true,
      newLevel: skill.level,
      newMastery: profession.progress.mastery,
      message: `${skill.name} 學習到等級 ${skill.level}！`,
      rewards: [
        { type: 'skill_point', amount: -1, description: '消耗 1 技能點' }
      ]
    };
  }

  /**
   * 檢查技能需求
   */
  private checkSkillRequirements(profession: ProfessionEvolution, skill: ProfessionSkill): ProfessionResult {
    for (const requirement of skill.requirements) {
      switch (requirement.type) {
        case 'level':
          if (profession.progress.level < requirement.value as number) {
            return {
              success: false,
              message: `需要等級 ${requirement.value} 才能學習此技能`
            };
          }
          break;
        case 'skill':
          const requiredSkill = profession.skills.find(s => s.id === requirement.target);
          if (!requiredSkill || requiredSkill.level < requirement.value as number) {
            return {
              success: false,
              message: `需要技能 ${requirement.target} 等級 ${requirement.value}`
            };
          }
          break;
      }
    }

    return { success: true, message: '技能需求滿足' };
  }

  /**
   * 接受任務
   */
  public acceptQuest(questId: string, professionId: string): ProfessionResult {
    const quest = this.availableQuests.get(questId);
    const profession = this.professions.get(professionId);

    if (!quest || !profession) {
      return {
        success: false,
        message: '任務或職業不存在'
      };
    }

    if (quest.profession !== profession.mainProfession) {
      return {
        success: false,
        message: '任務與職業不匹配'
      };
    }

    quest.status = 'active';
    quest.progress = 0;

    info('ProfessionEvolutionTracker', `Quest accepted: ${quest.title} by ${profession.name}`);

    return {
      success: true,
      newLevel: profession.progress.level,
      newMastery: profession.progress.mastery,
      message: `成功接受任務：${quest.title}`,
      rewards: []
    };
  }

  /**
   * 更新任務進度
   */
  public updateQuestProgress(questId: string, objectiveId: string, progress: number): ProfessionResult {
    const quest = this.availableQuests.get(questId);
    if (!quest || quest.status !== 'active') {
      return {
        success: false,
        message: '任務不存在或未激活'
      };
    }

    const objective = quest.objectives.find(o => o.id === objectiveId);
    if (!objective) {
      return {
        success: false,
        message: '目標不存在'
      };
    }

    objective.progress = Math.min(progress, objective.required);
    if (objective.progress >= objective.required) {
      objective.completed = true;
    }

    // 更新總體進度
    const totalProgress = quest.objectives.reduce((sum, obj) => sum + obj.progress, 0);
    const totalRequired = quest.objectives.reduce((sum, obj) => sum + obj.required, 0);
    quest.progress = (totalProgress / totalRequired) * 100;

    // 檢查任務是否完成
    if (quest.objectives.every(obj => obj.completed)) {
      quest.status = 'completed';
      this.completeQuestRewards(quest);
    }

    return {
      success: true,
      newLevel: 0,
      newMastery: 0,
      message: `任務進度更新：${objective.description}`,
      rewards: []
    };
  }

  /**
   * 完成任務獎勵
   */
  private completeQuestRewards(quest: ProfessionQuest): void {
    quest.rewards.forEach(reward => {
      info('ProfessionEvolutionTracker', `Quest reward: ${reward.description}`);
    });

    info('ProfessionEvolutionTracker', `Quest completed: ${quest.title}`);
  }

  /**
   * 創建職業關係
   */
  public createProfessionRelationship(professionId1: string, professionId2: string, relationshipType: 'mentor' | 'student' | 'colleague' | 'rival'): boolean {
    const profession1 = this.professions.get(professionId1);
    const profession2 = this.professions.get(professionId2);

    if (!profession1 || !profession2) {
      error('ProfessionEvolutionTracker', 'One or both professions not found');
      return false;
    }

    // 創建關係
    const relationship1: ProfessionRelationship = {
      partnerId: professionId2,
      relationshipType,
      synergyLevel: 50,
      sharedSkills: [],
      collaborationBonus: 10
    };

    const relationship2: ProfessionRelationship = {
      partnerId: professionId1,
      relationshipType: relationshipType === 'mentor' ? 'student' : relationshipType === 'student' ? 'mentor' : relationshipType,
      synergyLevel: 50,
      sharedSkills: [],
      collaborationBonus: 10
    };

    // 將關係添加到職業中
    (profession1 as any).relationships = (profession1 as any).relationships || [];
    (profession1 as any).relationships.push(relationship1);

    (profession2 as any).relationships = (profession2 as any).relationships || [];
    (profession2 as any).relationships.push(relationship2);

    info('ProfessionEvolutionTracker', `Created relationship: ${profession1.name} <-> ${profession2.name} (${relationshipType})`);

    return true;
  }

  /**
   * 獲取系統統計信息
   */
  public getSystemStats(): ProfessionStats {
    const professions = Array.from(this.professions.values());
    const activeProfessions = this.getActiveProfessions();
    const averageLevel = professions.reduce((sum, p) => sum + p.progress.level, 0) / professions.length;
    
    const professionDistribution: Record<MainProfession, number> = {} as any;
    const specializationDistribution: Record<Specialization, number> = {} as any;
    
    Object.values(MainProfession).forEach(prof => {
      professionDistribution[prof] = professions.filter(p => p.mainProfession === prof).length;
    });
    
    Object.values(Specialization).forEach(spec => {
      specializationDistribution[spec] = professions.filter(p => p.specialization === spec).length;
    });

    return {
      totalProfessions: professions.length,
      activeProfessions: activeProfessions.length,
      averageLevel: parseFloat(averageLevel.toFixed(2)),
      totalMastery: professions.reduce((sum, p) => sum + p.progress.mastery, 0),
      totalReputation: professions.reduce((sum, p) => sum + p.progress.reputation, 0),
      professionDistribution,
      specializationDistribution
    };
  }

  /**
   * 獲取職業網絡
   */
  public getProfessionNetwork(): ProfessionNetwork {
    return { ...this.professionNetwork };
  }

  /**
   * 獲取可用任務
   */
  public getAvailableQuests(): ProfessionQuest[] {
    return Array.from(this.availableQuests.values()).filter(quest => quest.status === 'available');
  }

  /**
   * 獲取激活任務
   */
  public getActiveQuests(): ProfessionQuest[] {
    return Array.from(this.availableQuests.values()).filter(quest => quest.status === 'active');
  }
}
