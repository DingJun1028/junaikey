/**
 * JunAiKey 元素精靈系統核心實現
 * 實現 Element Mastery - 元素精通系統的核心邏輯
 */

import { 
  ElementSpirit, 
  ElementType, 
  SpiritStage, 
  SpiritAbility,
  AbilityEffect,
  SpiritEvolutionResult,
  SpiritCombatData,
  CombatEffect,
  SPIRIT_CONFIG 
} from '../types/elementSpirit';
import { logger, info, debug, error } from '../utils/logger';

export class ElementSpiritSystem {
  private spirits: Map<string, ElementSpirit> = new Map();
  private activeSpirits: Set<string> = new Set();
  
  constructor() {
    info('ElementSpiritSystem', 'Initializing Element Spirit System');
    this.initializeDefaultSpirits();
  }

  /**
   * 初始化預設的元素精靈
   */
  private initializeDefaultSpirits(): void {
    const defaultSpirits: Omit<ElementSpirit, 'id'>[] = [
      {
        name: '鋒靈',
        type: ElementType.ORDER,
        color: '#FFD700',
        description: '系統架構、規則制定秩序的守護者',
        stage: SpiritStage.SLEEPING,
        level: 1,
        experience: 0,
        experienceToNext: 100,
        mastery: 0,
        abilities: [],
        passiveEffects: ['秩序加成'],
        unlockedAt: new Date(),
        synergy: 0
      },
      {
        name: '森靈',
        type: ElementType.GROWTH,
        color: '#00FF00',
        description: '學習進化、能力擴展的生命之源',
        stage: SpiritStage.SLEEPING,
        level: 1,
        experience: 0,
        experienceToNext: 100,
        mastery: 0,
        abilities: [],
        passiveEffects: ['成長加成'],
        unlockedAt: new Date(),
        synergy: 0
      },
      {
        name: '湧靈',
        type: ElementType.THOUGHT,
        color: '#0080FF',
        description: '邏輯分析、知識探索的智慧化身',
        stage: SpiritStage.SLEEPING,
        level: 1,
        experience: 0,
        experienceToNext: 100,
        mastery: 0,
        abilities: [],
        passiveEffects: ['思緒加成'],
        unlockedAt: new Date(),
        synergy: 0
      },
      {
        name: '焰靈',
        type: ElementType.ACTION,
        color: '#FF0000',
        description: '執行效率、任務完成的行動之力',
        stage: SpiritStage.SLEEPING,
        level: 1,
        experience: 0,
        experienceToNext: 100,
        mastery: 0,
        abilities: [],
        passiveEffects: ['行動加成'],
        unlockedAt: new Date(),
        synergy: 0
      },
      {
        name: '磐靈',
        type: ElementType.STABILITY,
        color: '#8B4513',
        description: '基礎建設、穩定運營的堅實基礎',
        stage: SpiritStage.SLEEPING,
        level: 1,
        experience: 0,
        experienceToNext: 100,
        mastery: 0,
        abilities: [],
        passiveEffects: ['穩定加成'],
        unlockedAt: new Date(),
        synergy: 0
      },
      {
        name: '光靈',
        type: ElementType.GUIDANCE,
        color: '#FFFFFF',
        description: '指導教學、路徑規劃的引路明燈',
        stage: SpiritStage.SLEEPING,
        level: 1,
        experience: 0,
        experienceToNext: 100,
        mastery: 0,
        abilities: [],
        passiveEffects: ['導引加成'],
        unlockedAt: new Date(),
        synergy: 0
      },
      {
        name: '暗靈',
        type: ElementType.CHAOS,
        color: '#800080',
        description: '創新突破、規則重構的混沌之力',
        stage: SpiritStage.SLEEPING,
        level: 1,
        experience: 0,
        experienceToNext: 100,
        mastery: 0,
        abilities: [],
        passiveEffects: ['混沌加成'],
        unlockedAt: new Date(),
        synergy: 0
      },
      {
        name: '無靈',
        type: ElementType.NULL,
        color: '#C0C0C0',
        description: '萬能適應、系統整合的通用之力',
        stage: SpiritStage.SLEEPING,
        level: 1,
        experience: 0,
        experienceToNext: 100,
        mastery: 0,
        abilities: [],
        passiveEffects: ['通用加成'],
        unlockedAt: new Date(),
        synergy: 0
      },
      {
        name: '時風靈',
        type: ElementType.CHANGE,
        color: '#00FFFF',
        description: '流程優化、資源管理的變革之力',
        stage: SpiritStage.SLEEPING,
        level: 1,
        experience: 0,
        experienceToNext: 100,
        mastery: 0,
        abilities: [],
        passiveEffects: ['變革加成'],
        unlockedAt: new Date(),
        synergy: 0
      },
      {
        name: '魂靈',
        type: ElementType.ESSENCE,
        color: '#FF00FF',
        description: '記憶管理、核心洞察的本質之魂',
        stage: SpiritStage.SLEEPING,
        level: 1,
        experience: 0,
        experienceToNext: 100,
        mastery: 0,
        abilities: [],
        passiveEffects: ['本質加成'],
        unlockedAt: new Date(),
        synergy: 0
      },
      {
        name: '械靈',
        type: ElementType.MACHINE,
        color: '#808080',
        description: '自動化、系統連結的機械之力',
        stage: SpiritStage.SLEEPING,
        level: 1,
        experience: 0,
        experienceToNext: 100,
        mastery: 0,
        abilities: [],
        passiveEffects: ['機械加成'],
        unlockedAt: new Date(),
        synergy: 0
      },
      {
        name: '星靈',
        type: ElementType.ASTRAL,
        color: '#FF1493',
        description: '超越維度、終極融合的星辰之力',
        stage: SpiritStage.SLEEPING,
        level: 1,
        experience: 0,
        experienceToNext: 500,
        mastery: 0,
        abilities: [],
        passiveEffects: ['星辰加成'],
        unlockedAt: new Date(),
        synergy: 0
      }
    ];

    defaultSpirits.forEach((spirit, index) => {
      // spirit.type 已為 ElementType 的字串值 (例如 'order')，直接使用即可
      const typeName = String(spirit.type).toLowerCase();
      const id = `spirit_${typeName}_${index + 1}`;
      this.spirits.set(id, { ...spirit, id });
    });

    debug('ElementSpiritSystem', `Initialized ${defaultSpirits.length} default spirits`);
  }

  /**
   * 獲取元素精靈
   */
  public getSpirit(id: string): ElementSpirit | undefined {
    return this.spirits.get(id);
  }

  /**
   * 獲取所有元素精靈
   */
  public getAllSpirits(): ElementSpirit[] {
    return Array.from(this.spirits.values());
  }

  /**
   * 喚醒元素精靈
   */
  public awakenSpirit(id: string): SpiritEvolutionResult {
    const spirit = this.spirits.get(id);
    if (!spirit) {
      error('ElementSpiritSystem', `Spirit not found: ${id}`);
      return {
        success: false,
        message: '元素精靈不存在'
      };
    }

    if (spirit.stage !== SpiritStage.SLEEPING) {
      return {
        success: false,
        message: `${spirit.name} 已經覺醒`
      };
    }

    spirit.stage = SpiritStage.AWAKENED;
    spirit.lastUsedAt = new Date();
    spirit.abilities = this.generateDefaultAbilities(spirit.type);

    info('ElementSpiritSystem', `Spirit awakened: ${spirit.name}`);
    
    return {
      success: true,
      newStage: SpiritStage.AWAKENED,
      message: `${spirit.name} 已覺醒！`,
      rewards: ['獲得基礎能力', '解鎖第一個技能']
    };
  }

  /**
   * 生成預設能力
   */
  private generateDefaultAbilities(type: ElementType): SpiritAbility[] {
    const abilities: SpiritAbility[] = [];
    
    switch (type) {
      case ElementType.ORDER:
        abilities.push({
          id: 'order_stability',
          name: '秩序穩定',
          description: '提供秩序穩定效果',
          cooldown: 3000,
          manaCost: 10,
          effects: [
            {
              type: 'buff',
              value: 20,
              duration: 30,
              target: 'self'
            }
          ]
        });
        break;
      
      case ElementType.GROWTH:
        abilities.push({
          id: 'growth_nourish',
          name: '成長滋養',
          description: '加速成長和恢復',
          cooldown: 5000,
          manaCost: 15,
          effects: [
            {
              type: 'heal',
              value: 25,
              duration: 20,
              target: 'self'
            }
          ]
        });
        break;
      
      case ElementType.THOUGHT:
        abilities.push({
          id: 'thought_insight',
          name: '思緒洞察',
          description: '增強洞察力和分析能力',
          cooldown: 4000,
          manaCost: 12,
          effects: [
            {
              type: 'buff',
              value: 30,
              duration: 25,
              target: 'self'
            }
          ]
        });
        break;
      
      default:
        abilities.push({
          id: 'basic_strike',
          name: '基礎攻擊',
          description: '基礎攻擊技能',
          cooldown: 2000,
          manaCost: 5,
          effects: [
            {
              type: 'damage',
              value: 10,
              target: 'enemy'
            }
          ]
        });
    }

    return abilities;
  }

  /**
   * 增加元素精靈經驗值
   */
  public addExperience(id: string, amount: number): SpiritEvolutionResult {
    const spirit = this.spirits.get(id);
    if (!spirit) {
      error('ElementSpiritSystem', `Spirit not found: ${id}`);
      return {
        success: false,
        message: '元素精靈不存在'
      };
    }

    const config = SPIRIT_CONFIG[spirit.type];
    const actualAmount = amount * config.experienceMultiplier;
    
    spirit.experience += actualAmount;
    
    // 檢查是否升級
    while (spirit.experience >= spirit.experienceToNext && spirit.level < config.maxLevel) {
      spirit.experience -= spirit.experienceToNext;
      spirit.level++;
      spirit.experienceToNext = this.calculateExperienceToNext(spirit.level, config);
      
      // 增加精通度
      spirit.mastery = Math.min(100, spirit.mastery + config.masteryRate);
      
      info('ElementSpiritSystem', `Spirit level up: ${spirit.name} is now level ${spirit.level}`);
    }

    spirit.lastUsedAt = new Date();
    
    return {
      success: true,
      newStage: spirit.stage,
      message: `${spirit.name} 獲得 ${actualAmount.toFixed(1)} 經驗值！`,
      rewards: spirit.level > 1 ? [`等級提升到 ${spirit.level}`, `精通度提升到 ${spirit.mastery.toFixed(1)}%`] : []
    };
  }

  /**
   * 計算下一級所需經驗值
   */
  private calculateExperienceToNext(level: number, config: any): number {
    return Math.floor(100 * Math.pow(1.5, level - 1));
  }

  /**
   * 進化元素精靈
   */
  public evolveSpirit(id: string, targetStage: SpiritStage): SpiritEvolutionResult {
    const spirit = this.spirits.get(id);
    if (!spirit) {
      error('ElementSpiritSystem', `Spirit not found: ${id}`);
      return {
        success: false,
        message: '元素精靈不存在'
      };
    }

    const currentStageIndex = Object.values(SpiritStage).indexOf(spirit.stage);
    const targetStageIndex = Object.values(SpiritStage).indexOf(targetStage);

    if (targetStageIndex <= currentStageIndex) {
      return {
        success: false,
        message: '無法進化到較低或相同的階段'
      };
    }

    // 檢查進化條件
    const canEvolve = this.checkEvolutionConditions(spirit, targetStage);
    if (!canEvolve.success) {
      return canEvolve;
    }

    spirit.stage = targetStage;
    
    // 根據階段獲得獎勵
    const rewards: string[] = [];
    switch (targetStage) {
      case SpiritStage.RESONANCE:
        spirit.synergy = Math.min(100, spirit.synergy + 20);
        rewards.push('獲得協同能力');
        break;
      case SpiritStage.FUSION:
        spirit.abilities = [...spirit.abilities, ...this.generateAdvancedAbilities(spirit.type)];
        rewards.push('獲得進階能力');
        break;
      case SpiritStage.TRANSCENDENCE:
        spirit.mastery = Math.min(100, spirit.mastery + 30);
        rewards.push('精通度大幅提升');
        break;
      case SpiritStage.LEGEND:
        rewards.push('傳說級能力覺醒');
        break;
      case SpiritStage.ETERNAL:
        rewards.push('永恆之境達成');
        break;
    }

    info('ElementSpiritSystem', `Spirit evolved: ${spirit.name} to ${targetStage}`);

    return {
      success: true,
      newStage: targetStage,
      message: `${spirit.name} 進化到 ${targetStage} 階段！`,
      rewards
    };
  }

  /**
   * 檢查進化條件
   */
  private checkEvolutionConditions(spirit: ElementSpirit, targetStage: SpiritStage): SpiritEvolutionResult {
    const stageIndex = Object.values(SpiritStage).indexOf(targetStage);
    
    switch (stageIndex) {
      case 2: // RESONANCE
        if (spirit.level < 10) {
          return {
            success: false,
            message: '需要等級 10 才能進化到共鳴階段'
          };
        }
        if (spirit.mastery < 30) {
          return {
            success: false,
            message: '需要精通度 30% 才能進化到共鳴階段'
          };
        }
        break;
      
      case 3: // FUSION
        if (spirit.level < 20) {
          return {
            success: false,
            message: '需要等級 20 才能進化到融合階段'
          };
        }
        if (spirit.mastery < 60) {
          return {
            success: false,
            message: '需要精通度 60% 才能進化到融合階段'
          };
        }
        break;
      
      case 4: // TRANSCENDENCE
        if (spirit.level < 35) {
          return {
            success: false,
            message: '需要等級 35 才能進化到超越階段'
          };
        }
        if (spirit.mastery < 80) {
          return {
            success: false,
            message: '需要精通度 80% 才能進化到超越階段'
          };
        }
        break;
      
      case 5: // LEGEND
        if (spirit.level < 45) {
          return {
            success: false,
            message: '需要等級 45 才能進化到傳說階段'
          };
        }
        if (spirit.mastery < 95) {
          return {
            success: false,
            message: '需要精通度 95% 才能進化到傳說階段'
          };
        }
        break;
      
      case 6: // ETERNAL
        if (spirit.level < 50) {
          return {
            success: false,
            message: '需要等級 50 才能進化到永恆階段'
          };
        }
        if (spirit.mastery < 99) {
          return {
            success: false,
            message: '需要精通度 99% 才能進化到永恆階段'
          };
        }
        break;
    }

    return { success: true, message: '進化條件滿足' };
  }

  /**
   * 生成進階能力
   */
  private generateAdvancedAbilities(type: ElementType): SpiritAbility[] {
    const abilities: SpiritAbility[] = [];
    
    switch (type) {
      case ElementType.ORDER:
        abilities.push({
          id: 'order_perfection',
          name: '秩序完美',
          description: '達到完美的秩序狀態',
          cooldown: 10000,
          manaCost: 50,
          effects: [
            {
              type: 'buff',
              value: 50,
              duration: 60,
              target: 'self'
            }
          ]
        });
        break;
      
      case ElementType.GROWTH:
        abilities.push({
          id: 'growth_acceleration',
          name: '成長加速',
          description: '極速成長和恢復',
          cooldown: 15000,
          manaCost: 40,
          effects: [
            {
              type: 'heal',
              value: 100,
              duration: 60,
              target: 'self'
            }
          ]
        });
        break;
      
      default:
        abilities.push({
          id: 'advanced_strike',
          name: '進階攻擊',
          description: '強力的進階攻擊技能',
          cooldown: 8000,
          manaCost: 25,
          effects: [
            {
              type: 'damage',
              value: 50,
              target: 'enemy'
            }
          ]
        });
    }

    return abilities;
  }

  /**
   * 激活元素精靈
   */
  public activateSpirit(id: string): boolean {
    const spirit = this.spirits.get(id);
    if (!spirit) {
      error('ElementSpiritSystem', `Spirit not found: ${id}`);
      return false;
    }

    this.activeSpirits.add(id);
    info('ElementSpiritSystem', `Spirit activated: ${spirit.name}`);
    
    return true;
  }

  /**
   * 停用元素精靈
   */
  public deactivateSpirit(id: string): boolean {
    if (this.activeSpirits.has(id)) {
      this.activeSpirits.delete(id);
      info('ElementSpiritSystem', `Spirit deactivated: ${id}`);
      return true;
    }
    
    return false;
  }

  /**
   * 獲取激活的元素精靈
   */
  public getActiveSpirits(): ElementSpirit[] {
    return Array.from(this.activeSpirits)
      .map(id => this.spirits.get(id))
      .filter(spirit => spirit !== undefined) as ElementSpirit[];
  }

  /**
   * 進行元素精靈戰鬥
   */
  public performSpiritCombat(attackerId: string, defenderId: string): {
    attacker: ElementSpirit;
    defender: ElementSpirit;
    damage: number;
    result: string;
  } {
    const attacker = this.spirits.get(attackerId);
    const defender = this.spirits.get(defenderId);

    if (!attacker || !defender) {
      error('ElementSpiritSystem', 'Combat participants not found');
      throw new Error('戰鬥參與者不存在');
    }

    // 計算基礎傷害
    const baseDamage = attacker.level * 10;
    const masteryBonus = attacker.mastery / 100;
    const totalDamage = Math.floor(baseDamage * (1 + masteryBonus));

    // 記錄戰鬥結果
    info('ElementSpiritSystem', `Combat: ${attacker.name} vs ${defender.name}, Damage: ${totalDamage}`);

    return {
      attacker,
      defender,
      damage: totalDamage,
      result: `${attacker.name} 對 ${defender.name} 造成了 ${totalDamage} 點傷害！`
    };
  }

  /**
   * 獲取系統統計信息
   */
  public getSystemStats(): {
    totalSpirits: number;
    awakenedSpirits: number;
    activeSpirits: number;
    averageLevel: number;
    totalMastery: number;
    elementDistribution: Record<ElementType, number>;
  } {
    const spirits = Array.from(this.spirits.values());
    const awakenedSpirits = spirits.filter(s => s.stage !== SpiritStage.SLEEPING).length;
    const averageLevel = spirits.reduce((sum, s) => sum + s.level, 0) / spirits.length;
    const totalMastery = spirits.reduce((sum, s) => sum + s.mastery, 0);
    
    const elementDistribution: Record<ElementType, number> = {} as any;
    Object.values(ElementType).forEach(type => {
      elementDistribution[type] = spirits.filter(s => s.type === type).length;
    });

    return {
      totalSpirits: spirits.length,
      awakenedSpirits,
      activeSpirits: this.activeSpirits.size,
      averageLevel: parseFloat(averageLevel.toFixed(2)),
      totalMastery: parseFloat(totalMastery.toFixed(2)),
      elementDistribution
    };
  }
}
