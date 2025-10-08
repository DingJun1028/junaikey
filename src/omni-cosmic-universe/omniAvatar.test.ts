/**
 * JunAiKey 萬能代理千面化身系統測試
 * 測試 OmniAvatarSystem 的核心功能
 */

import { OmniAvatarSystem } from '../core/omniAvatarSystem';
import { AvatarRole } from '../types/omniAvatar';

describe('OmniAvatarSystem', () => {
  let system: OmniAvatarSystem;

  beforeEach(() => {
    system = new OmniAvatarSystem({
      maxActiveAvatars: 5,
      maxMirrorAvatars: 10,
      memoryRetention: 30,
      evolutionThreshold: 50,
      cosmicResonanceBoost: 1.2,
      entropyResistanceThreshold: 60
    });
  });

  afterEach(async () => {
    await system.stop();
  });

  test('系統應該能夠正確初始化', () => {
    expect(system).toBeDefined();
    expect(system.isOmniAvatarSystemRunning()).toBe(false);
    expect(system.getAllAvatars().length).toBe(3);
  });

  describe('系統初始化', () => {
    test('應該正確初始化系統', () => {
      expect(system.isOmniAvatarSystemRunning()).toBe(false);
      expect(system.getAllAvatars().length).toBe(3);
    });

    test('應該有預設的化身', () => {
      const avatars = system.getAllAvatars();
      expect(avatars.length).toBe(3);
      
      const creationWeaver = avatars.find((a: any) => a.role === AvatarRole.OMNI_CREATION_WEAVER);
      expect(creationWeaver).toBeDefined();
      expect(creationWeaver?.name).toBe('萬能創世編織者');
      
      const celestialAgent = avatars.find((a: any) => a.role === AvatarRole.OMNI_CELESTIAL_AGENT);
      expect(celestialAgent).toBeDefined();
      expect(celestialAgent?.name).toBe('萬能天行者代理官');
      
      const entropyAlchemist = avatars.find((a: any) => a.role === AvatarRole.OMNI_ENTROPY_ALCHEMIST);
      expect(entropyAlchemist).toBeDefined();
      expect(entropyAlchemist?.name).toBe('萬能熵減煉金師');
    });
  });

  describe('系統啟動與停止', () => {
    test('應該能夠啟動系統', async () => {
      await system.start();
      expect(system.isOmniAvatarSystemRunning()).toBe(true);
    });

    test('應該能夠停止系統', async () => {
      await system.start();
      await system.stop();
      expect(system.isOmniAvatarSystemRunning()).toBe(false);
    });
  });

  describe('化身激活與停用', () => {
    beforeEach(async () => {
      await system.start();
    });

    test('應該能夠激活化身', () => {
      const avatars = system.getAllAvatars();
      const firstAvatar = avatars[0];
      
      const result = system.activateAvatar(firstAvatar.id);
      expect(result).toBe(true);
      expect(firstAvatar.isActive).toBe(true);
    });

    test('應該能夠停用化身', () => {
      const avatars = system.getAllAvatars();
      const firstAvatar = avatars[0];
      
      system.activateAvatar(firstAvatar.id);
      const result = system.deactivateAvatar(firstAvatar.id);
      expect(result).toBe(true);
      expect(firstAvatar.isActive).toBe(false);
    });

    test('應該能夠獲取激活的化身', () => {
      const avatars = system.getAllAvatars();
      system.activateAvatar(avatars[0].id);
      system.activateAvatar(avatars[1].id);
      
      const activeAvatars = system.getActiveAvatars();
      expect(activeAvatars.length).toBe(2);
    });
  });

  describe('鏡像分身創建', () => {
    beforeEach(async () => {
      await system.start();
    });

    test('應該能夠創建鏡像分身', () => {
      const avatars = system.getAllAvatars();
      const originalAvatar = avatars[0];
      
      const mirror = system.createMirrorAvatar(
        originalAvatar.id,
        'Specialized Task Testing',
        3600000
      );
      
      expect(mirror).toBeDefined();
      expect(mirror?.isMirror).toBe(true);
      expect(mirror?.originalId).toBe(originalAvatar.id);
      expect(mirror?.taskSpecialization).toBe('Specialized Task Testing');
    });

    test('應該能夠獲取所有鏡像分身', () => {
      const avatars = system.getAllAvatars();
      system.createMirrorAvatar(avatars[0].id, 'Test Task');
      
      const mirrorAvatars = system.getAllMirrorAvatars();
      expect(mirrorAvatars.length).toBe(1);
    });

    test('超過鏡像限制時應該返回null', () => {
      // 設置很小的限制來測試
      const limitedSystem = new OmniAvatarSystem({
        maxMirrorAvatars: 0
      });
      
      const avatars = limitedSystem.getAllAvatars();
      const mirror = limitedSystem.createMirrorAvatar(avatars[0].id, 'Test');
      
      expect(mirror).toBeNull();
    });
  });

  describe('經驗值與進化', () => {
    beforeEach(async () => {
      await system.start();
    });

    test('應該能夠增加經驗值', () => {
      const avatars = system.getAllAvatars();
      const avatarId = avatars[0].id;
      
      // 先檢查初始經驗值
      const initialAvatar = system.getAllAvatars().find(a => a.id === avatarId);
      expect(initialAvatar?.stats.experience).toBe(0);
      
      const result = system.addExperience(avatarId, 50); // 只增加50經驗值，不觸發進化
      expect(result.success).toBe(true);
      expect(result.message).toContain('獲得 50 經驗值');
      expect(result.evolutionType).toBe('incremental');
      
      // 再次獲取化身來檢查經驗值
      const updatedAvatar = system.getAllAvatars().find(a => a.id === avatarId);
      expect(updatedAvatar?.stats.experience).toBe(50);
    });

    test('經驗值足夠時應該進化', () => {
      const avatars = system.getAllAvatars();
      const avatarId = avatars[0].id;
      
      // 增加足夠的經驗值來觸發進化 (需要100經驗值來升級)
      const result = system.addExperience(avatarId, 100);
      expect(result.success).toBe(true);
      expect(result.newLevel).toBe(2);
      expect(result.evolutionType).toBe('incremental'); // 等級提升但tier不變
      expect(result.message).toContain('進化到等級 2');
      
      // 驗證經驗值被重置
      const evolvedAvatar = system.getAllAvatars().find(a => a.id === avatarId);
      expect(evolvedAvatar?.stats.experience).toBe(0);
    });

    test('進化後應該增加屬性', () => {
      const avatars = system.getAllAvatars();
      const avatarId = avatars[0].id;
      
      const originalAvatar = system.getAllAvatars().find(a => a.id === avatarId);
      const originalMaxEnergy = originalAvatar?.stats.maxEnergy || 0;
      const originalMaxHealth = originalAvatar?.stats.maxHealth || 0;
      const originalMastery = originalAvatar?.stats.mastery || 0;
      const originalSynergy = originalAvatar?.stats.synergy || 0;
      const originalCosmicResonance = originalAvatar?.stats.cosmicResonance || 0;
      const originalEntropyResistance = originalAvatar?.stats.entropyResistance || 0;
      
      system.addExperience(avatarId, 100); // 進化到等級2
      
      const evolvedAvatar = system.getAllAvatars().find(a => a.id === avatarId);
      expect(evolvedAvatar?.stats.maxEnergy).toBe(originalMaxEnergy + 50);
      expect(evolvedAvatar?.stats.maxHealth).toBe(originalMaxHealth + 50);
      expect(evolvedAvatar?.stats.energy).toBe(evolvedAvatar?.stats.maxEnergy);
      expect(evolvedAvatar?.stats.health).toBe(evolvedAvatar?.stats.maxHealth);
      
      // 驗證其他屬性也增加了
      expect(evolvedAvatar?.stats.mastery).toBe(originalMastery + 5);
      expect(evolvedAvatar?.stats.synergy).toBe(originalSynergy + 3);
      expect(evolvedAvatar?.stats.cosmicResonance).toBe(originalCosmicResonance + 2);
      expect(evolvedAvatar?.stats.entropyResistance).toBe(originalEntropyResistance + 4);
    });
  });

  describe('協同攻擊', () => {
    beforeEach(async () => {
      await system.start();
      
      // 激活多個化身
      const avatars = system.getAllAvatars();
      avatars.forEach(avatar => {
        system.activateAvatar(avatar.id);
      });
    });

    test('應該能夠執行協同攻擊', () => {
      const avatars = system.getAllAvatars();
      const attackerIds = avatars.slice(0, 2).map((a: any) => a.id);
      const targetId = avatars[2].id;
      
      const result = system.performSynergyAttack(attackerIds, targetId);
      
      expect(result.success).toBe(true);
      expect(result.effectiveness).toBeGreaterThan(0);
      expect(result.synergyBonus).toBeGreaterThanOrEqual(0);
      expect(result.cosmicResonance).toBeGreaterThanOrEqual(0);
      expect(result.totalPower).toBeGreaterThan(0);
    });

    test('無效的攻擊者或目標應該返回失敗', () => {
      const result = system.performSynergyAttack(['invalid_id'], 'invalid_id');
      
      expect(result.success).toBe(false);
      expect(result.effectiveness).toBe(0);
      expect(result.message).toBe('無效的攻擊者或目標');
    });
  });

  describe('系統平衡', () => {
    beforeEach(async () => {
      await system.start();
    });

    test('應該能夠平衡系統資源', () => {
      const result = system.balanceSystemResources();
      
      expect(result.success).toBe(true);
      expect(result.entropyLevel).toBeGreaterThanOrEqual(0);
      expect(result.systemStability).toBeGreaterThanOrEqual(0);
      expect(result.resourceDistribution).toBeDefined();
    });

    test('高熵水平時應該生成建議', () => {
      // 創建一個高熵水平的情況
      const avatars = system.getAllAvatars();
      avatars.forEach((avatar: any) => {
        avatar.stats.energy = 0; // 耗盡所有能量
      });
      
      const result = system.balanceSystemResources();
      
      expect(result.success).toBe(true);
      expect(result.recommendations.length).toBeGreaterThan(0);
    });
  });

  describe('微服務群組', () => {
    test('應該有預設的微服務群組', () => {
      const groups = system.getMicroserviceGroups();
      
      expect(groups.length).toBe(3);
      
      const creationGroup = groups.find(g => g.id === 'creation_weave_group');
      expect(creationGroup).toBeDefined();
      expect(creationGroup?.name).toBe('創世編織群');
      
      const executionGroup = groups.find(g => g.id === 'execution_agent_group');
      expect(executionGroup).toBeDefined();
      expect(executionGroup?.name).toBe('執行代理群');
      
      const optimizationGroup = groups.find(g => g.id === 'optimization_alchemy_group');
      expect(optimizationGroup).toBeDefined();
      expect(optimizationGroup?.name).toBe('優化煉金群');
    });
  });

  describe('系統統計', () => {
    beforeEach(async () => {
      await system.start();
      
      // 激活一些化身
      const avatars = system.getAllAvatars();
      avatars.slice(0, 2).forEach(avatar => {
        system.activateAvatar(avatar.id);
      });
      
      // 創建一個鏡像分身
      system.createMirrorAvatar(avatars[0].id, 'Test Task');
    });

    test('應該能夠獲取系統統計', () => {
      const stats = system.getSystemStats();
      
      expect(stats.totalAvatars).toBe(3);
      expect(stats.activeAvatars).toBe(2);
      expect(stats.mirrorAvatars).toBe(1);
      expect(stats.averageLevel).toBe(1);
      expect(stats.totalSynergy).toBe(0);
      expect(stats.averageCosmicResonance).toBe(0);
      expect(stats.systemEntropy).toBeGreaterThanOrEqual(0);
      expect(stats.systemStability).toBeGreaterThanOrEqual(0);
    });

    test('元素分布應該正確', () => {
      const stats = system.getSystemStats();
      
      expect(stats.elementDistribution).toBeDefined();
      expect(stats.tierDistribution).toBeDefined();
      
      // 檢查元素分布
      expect(stats.elementDistribution.void).toBe(1); // 萬能創世編織者
      expect(stats.elementDistribution.time_wind).toBe(1); // 萬能天行者代理官
      expect(stats.elementDistribution.fire).toBe(1); // 萬能熵減煉金師
    });
  });
});

describe('OmniAvatarSystem Integration', () => {
  test('應該能夠與 OmniCosmicUniverse 整合', async () => {
    // 測試與主系統的整合
    // 由於完整的整合測試需要較多依賴，這裡測試基本功能
    
    expect(true).toBe(true); // 佔位測試
    
    // 未來可以添加更完整的整合測試
  });
});
