/**
 * JunAiKey 化身協同引擎核心實現
 * 實現 Avatar Synergy - 化身協同系統的核心邏輯
 */

import {
  AvatarRole,
  AvatarSynergy,
  AvatarStats,
  AvatarAbility,
  AbilityEffect,
  ActiveEffect,
  Partnership,
  Mission,
  Reward,
  SynergyCombo,
  AvatarEvolutionResult,
  CoordinationResult,
  SynergyNetwork,
  NetworkEffect
} from '../types/avatarSynergy';
import { logger, info, debug, error } from '../utils/logger';

export class AvatarSynergyEngine {
  private avatars: Map<string, AvatarSynergy> = new Map();
  private activeAvatars: Set<string> = new Set();
  private synergyNetwork: SynergyNetwork;
  private availableCombos: Map<string, SynergyCombo> = new Map();

  constructor() {
    this.synergyNetwork = {
      nodes: new Map(),
      edges: new Map(),
      totalSynergy: 0,
      activeCoordinates: 0,
      networkEffects: []
    };
    this.initializeDefaultAvatars();
    this.initializeSynergyNetwork();
    this.initializeDefaultCombos();
  }

  /**
   * 初始化預設化身
   */
  private initializeDefaultAvatars(): void {
    const defaultAvatars: Omit<AvatarSynergy, 'id'>[] = [
      {
        role: AvatarRole.SYNTHESIS_GUIDE,
        name: '無靈-協同引導者',
        description: '統籌協調所有化身，引領協同之道',
        color: '#C0C0C0',
        element: '通用',
        stats: {
          level: 1,
          experience: 0,
          energy: 100,
          maxEnergy: 100,
          health: 100,
          maxHealth: 100,
          coordination: 0,
          synergy: 0,
          mastery: 0
        },
        abilities: [],
        activeEffects: [],
        unlockedAt: new Date(),
        isActive: false,
        partnerships: []
      },
      {
        role: AvatarRole.TRUTH_OBSERVER,
        name: '湧靈-真理觀測者',
        description: '數據洞察與分析，洞悉真相本質',
        color: '#0080FF',
        element: '思緒',
        stats: {
          level: 1,
          experience: 0,
          energy: 120,
          maxEnergy: 120,
          health: 80,
          maxHealth: 80,
          coordination: 0,
          synergy: 0,
          mastery: 0
        },
        abilities: [],
        activeEffects: [],
        unlockedAt: new Date(),
        isActive: false,
        partnerships: []
      },
      {
        role: AvatarRole.CREATION_PROGRAMMER,
        name: '森靈-創世程式設計師',
        description: '創新與生成，編寫創世程式碼',
        color: '#00FF00',
        element: '成長',
        stats: {
          level: 1,
          experience: 0,
          energy: 125,
          maxEnergy: 125,
          health: 88,
          maxHealth: 88,
          coordination: 0,
          synergy: 0,
          mastery: 0
        },
        abilities: [],
        activeEffects: [],
        unlockedAt: new Date(),
        isActive: false,
        partnerships: []
      }
    ];

    defaultAvatars.forEach((avatar, index) => {
      const id = `avatar_${index + 1}`;
      this.avatars.set(id, { ...avatar, id });
    });

    debug('AvatarSynergyEngine', `Initialized ${defaultAvatars.length} default avatars`);
  }

  /**
   * 初始化協同網絡
   */
  private initializeSynergyNetwork(): void {
    this.avatars.forEach((avatar, id) => {
      this.synergyNetwork.nodes.set(id, avatar);
    });

    debug('AvatarSynergyEngine', 'Initialized synergy network');
  }

  /**
   * 初始化預設協同組合
   */
  private initializeDefaultCombos(): void {
    const defaultCombos: SynergyCombo[] = [
      {
        id: 'basic_combo',
        name: '基礎協同',
        description: '化身間的基本協同攻擊',
        requiredAvatars: [AvatarRole.SYNTHESIS_GUIDE, AvatarRole.TRUTH_OBSERVER],
        effects: [
          {
            type: 'coordinate',
            value: 50,
            duration: 60,
            target: 'all',
            area: 'all'
          }
        ],
        cooldown: 30000,
        energyCost: 80,
        unlockLevel: 5
      }
    ];

    defaultCombos.forEach(combo => {
      this.availableCombos.set(combo.id, combo);
    });

    debug('AvatarSynergyEngine', `Initialized ${defaultCombos.length} default combos`);
  }

  /**
   * 獲取化身
   */
  public getAvatar(id: string): AvatarSynergy | undefined {
    return this.avatars.get(id);
  }

  /**
   * 獲取所有化身
   */
  public getAllAvatars(): AvatarSynergy[] {
    return Array.from(this.avatars.values());
  }

  /**
   * 激活化身
   */
  public activateAvatar(id: string): boolean {
    const avatar = this.avatars.get(id);
    if (!avatar) {
      error('AvatarSynergyEngine', `Avatar not found: ${id}`);
      return false;
    }

    avatar.isActive = true;
    avatar.lastActivatedAt = new Date();
    this.activeAvatars.add(id);

    // 添加初始能力
    if (avatar.abilities.length === 0) {
      avatar.abilities = this.generateDefaultAbilities(avatar.role);
    }

    info('AvatarSynergyEngine', `Avatar activated: ${avatar.name}`);

    return true;
  }

  /**
   * 停用化身
   */
  public deactivateAvatar(id: string): boolean {
    const avatar = this.avatars.get(id);
    if (!avatar) {
      error('AvatarSynergyEngine', `Avatar not found: ${id}`);
      return false;
    }

    avatar.isActive = false;
    this.activeAvatars.delete(id);

    info('AvatarSynergyEngine', `Avatar deactivated: ${avatar.name}`);

    return true;
  }

  /**
   * 獲取激活的化身
   */
  public getActiveAvatars(): AvatarSynergy[] {
    return Array.from(this.activeAvatars)
      .map(id => this.avatars.get(id))
      .filter(avatar => avatar !== undefined) as AvatarSynergy[];
  }

  /**
   * 生成預設能力
   */
  private generateDefaultAbilities(role: AvatarRole): AvatarAbility[] {
    const abilities: AvatarAbility[] = [];

    switch (role) {
      case AvatarRole.SYNTHESIS_GUIDE:
        abilities.push({
          id: 'harmony_sync',
          name: '諧和同步',
          description: '與所有激活化身建立同步連結',
          cooldown: 20000,
          energyCost: 30,
          effects: [
            {
              type: 'buff',
              value: 20,
              duration: 45,
              target: 'ally',
              area: 'group'
            }
          ]
        });
        break;

      case AvatarRole.TRUTH_OBSERVER:
        abilities.push({
          id: 'insight_analysis',
          name: '洞察分析',
          description: '深入分析目標的本質',
          cooldown: 15000,
          energyCost: 25,
          effects: [
            {
              type: 'buff',
              value: 35,
              duration: 40,
              target: 'self'
            }
          ]
        });
        break;

      default:
        abilities.push({
          id: 'basic_action',
          name: '基礎行動',
          description: '基礎行動能力',
          cooldown: 5000,
          energyCost: 10,
          effects: [
            {
              type: 'coordinate',
              value: 10,
              duration: 10,
              target: 'self'
            }
          ]
        });
    }

    return abilities;
  }

  /**
   * 創建協同夥伴關係
   */
  public createPartnership(avatarId1: string, avatarId2: string): boolean {
    const avatar1 = this.avatars.get(avatarId1);
    const avatar2 = this.avatars.get(avatarId2);

    if (!avatar1 || !avatar2) {
      error('AvatarSynergyEngine', 'One or both avatars not found');
      return false;
    }

    // 創建新的協同關係
    const synergyLevel = 50; // 簡化計算
    
    const partnership1: Partnership = {
      partnerId: avatarId2,
      partnerRole: avatar2.role,
      synergyLevel,
      sharedAbilities: [],
      coordinationBonus: synergyLevel / 10
    };

    const partnership2: Partnership = {
      partnerId: avatarId1,
      partnerRole: avatar1.role,
      synergyLevel,
      sharedAbilities: [],
      coordinationBonus: synergyLevel / 10
    };

    avatar1.partnerships.push(partnership1);
    avatar2.partnerships.push(partnership2);

    info('AvatarSynergyEngine', `Created partnership: ${avatar1.name} <-> ${avatar2.name}`);

    return true;
  }

  /**
   * 執行協同攻擊
   */
  public performSynergyAttack(attackerIds: string[], targetId: string): CoordinationResult {
    const attackers = attackerIds
      .map(id => this.avatars.get(id))
      .filter(avatar => avatar !== undefined) as AvatarSynergy[];

    const target = this.avatars.get(targetId);

    if (attackers.length === 0 || !target) {
      error('AvatarSynergyEngine', 'Invalid attackers or target');
      return {
        success: false,
        effectiveness: 0,
        synergyBonus: 0,
        totalPower: 0,
        message: '無效的攻擊者或目標'
      };
    }

    // 計算協同加成
    const synergyBonus = this.calculateSynergyBonus(attackers);
    const basePower = attackers.reduce((sum, avatar) => sum + avatar.stats.level * 10, 0);
    const totalPower = basePower * (1 + synergyBonus / 100);

    info('AvatarSynergyEngine', `Synergy attack performed: ${attackers.map(a => a.name).join(', ')} -> ${target.name}`);

    return {
      success: true,
      effectiveness: Math.min(100, totalPower / 10),
      synergyBonus,
      totalPower: Math.floor(totalPower),
      message: `協同攻擊成功！造成 ${Math.floor(totalPower)} 點傷害`
    };
  }

  /**
   * 計算協同加成
   */
  private calculateSynergyBonus(attackers: AvatarSynergy[]): number {
    let totalSynergy = 0;
    let partnershipCount = 0;

    attackers.forEach(avatar1 => {
      attackers.forEach(avatar2 => {
        if (avatar1.id !== avatar2.id) {
          const partnership = avatar1.partnerships.find(p => p.partnerId === avatar2.id);
          if (partnership) {
            totalSynergy += partnership.synergyLevel;
            partnershipCount++;
          }
        }
      });
    });

    return partnershipCount > 0 ? totalSynergy / partnershipCount : 0;
  }

  /**
   * 使用協同組合
   */
  public useSynergyCombo(comboId: string, avatarIds: string[]): CoordinationResult {
    const combo = this.availableCombos.get(comboId);
    if (!combo) {
      return {
        success: false,
        effectiveness: 0,
        synergyBonus: 0,
        totalPower: 0,
        message: '協同組合不存在'
      };
    }

    // 計算總效果
    const totalEffectiveness = combo.effects.reduce((sum, effect) => sum + effect.value, 0);

    info('AvatarSynergyEngine', `Synergy combo used: ${combo.name} by ${avatarIds.length} avatars`);

    return {
      success: true,
      effectiveness: totalEffectiveness,
      synergyBonus: totalEffectiveness / 2,
      totalPower: totalEffectiveness,
      message: `成功使用協同組合：${combo.name}`
    };
  }

  /**
   * 增加化身經驗值
   */
  public addExperience(id: string, amount: number): AvatarEvolutionResult {
    const avatar = this.avatars.get(id);
    if (!avatar) {
      return {
        success: false,
        message: '化身不存在'
      };
    }

    avatar.stats.experience += amount;

    // 檢查是否升級
    const expNeeded = 100; // 簡化
    if (avatar.stats.experience >= expNeeded) {
      avatar.stats.level++;
      avatar.stats.experience -= expNeeded;
      
      // 增加最大能量
      avatar.stats.maxEnergy += 10;
      avatar.stats.energy = avatar.stats.maxEnergy;
      
      // 增加精通度
      avatar.stats.mastery = Math.min(100, avatar.stats.mastery + 5);
      
      // 增加協同值
      avatar.stats.synergy = Math.min(100, avatar.stats.synergy + 3);

      info('AvatarSynergyEngine', `Avatar level up: ${avatar.name} is now level ${avatar.stats.level}`);

      return {
        success: true,
        newLevel: avatar.stats.level,
        newSynergy: avatar.stats.synergy,
        message: `${avatar.name} 升級到等級 ${avatar.stats.level}！`,
        rewards: [
          { type: 'experience', amount: 0, description: '等級提升' },
          { type: 'energy', amount: 10, description: '最大能量增加' },
          { type: 'synergy', amount: 3, description: '協同值增加' }
        ]
      };
    }

    return {
      success: true,
      message: `${avatar.name} 獲得 ${amount} 經驗值`
    };
  }

  /**
   * 獲取系統統計信息
   */
  public getSystemStats(): {
    totalAvatars: number;
    activeAvatars: number;
    averageLevel: number;
    totalSynergy: number;
    activeCoordinates: number;
    elementDistribution: Record<string, number>;
  } {
    const avatars = Array.from(this.avatars.values());
    const activeAvatars = this.getActiveAvatars();
    const averageLevel = avatars.reduce((sum, a) => sum + a.stats.level, 0) / avatars.length;
    
    const elementDistribution: Record<string, number> = {};
    avatars.forEach(avatar => {
      elementDistribution[avatar.element] = (elementDistribution[avatar.element] || 0) + 1;
    });

    return {
      totalAvatars: avatars.length,
      activeAvatars: activeAvatars.length,
      averageLevel: parseFloat(averageLevel.toFixed(2)),
      totalSynergy: this.synergyNetwork.totalSynergy,
      activeCoordinates: this.synergyNetwork.activeCoordinates,
      elementDistribution
    };
  }

  /**
   * 獲取協同網絡
   */
  public getSynergyNetwork(): SynergyNetwork {
    return { ...this.synergyNetwork };
  }
}
