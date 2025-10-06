/**
 * JunAiKey 化身協同引擎核心實現
 * 實現 Avatar Synergy - 化身協同系統的核心邏輯
 */
import { AvatarSynergy, AvatarEvolutionResult, CoordinationResult, SynergyNetwork } from '../types/avatarSynergy';
export declare class AvatarSynergyEngine {
    private avatars;
    private activeAvatars;
    private synergyNetwork;
    private availableCombos;
    constructor();
    /**
     * 初始化預設化身
     */
    private initializeDefaultAvatars;
    /**
     * 初始化協同網絡
     */
    private initializeSynergyNetwork;
    /**
     * 初始化預設協同組合
     */
    private initializeDefaultCombos;
    /**
     * 獲取化身
     */
    getAvatar(id: string): AvatarSynergy | undefined;
    /**
     * 獲取所有化身
     */
    getAllAvatars(): AvatarSynergy[];
    /**
     * 激活化身
     */
    activateAvatar(id: string): boolean;
    /**
     * 停用化身
     */
    deactivateAvatar(id: string): boolean;
    /**
     * 獲取激活的化身
     */
    getActiveAvatars(): AvatarSynergy[];
    /**
     * 生成預設能力
     */
    private generateDefaultAbilities;
    /**
     * 創建協同夥伴關係
     */
    createPartnership(avatarId1: string, avatarId2: string): boolean;
    /**
     * 執行協同攻擊
     */
    performSynergyAttack(attackerIds: string[], targetId: string): CoordinationResult;
    /**
     * 計算協同加成
     */
    private calculateSynergyBonus;
    /**
     * 使用協同組合
     */
    useSynergyCombo(comboId: string, avatarIds: string[]): CoordinationResult;
    /**
     * 增加化身經驗值
     */
    addExperience(id: string, amount: number): AvatarEvolutionResult;
    /**
     * 獲取系統統計信息
     */
    getSystemStats(): {
        totalAvatars: number;
        activeAvatars: number;
        averageLevel: number;
        totalSynergy: number;
        activeCoordinates: number;
        elementDistribution: Record<string, number>;
    };
    /**
     * 獲取協同網絡
     */
    getSynergyNetwork(): SynergyNetwork;
}
//# sourceMappingURL=avatarSynergyEngine.d.ts.map