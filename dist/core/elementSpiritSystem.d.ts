/**
 * JunAiKey 元素精靈系統核心實現
 * 實現 Element Mastery - 元素精通系統的核心邏輯
 */
import { ElementSpirit, ElementType, SpiritStage, SpiritEvolutionResult } from '../types/elementSpirit';
export declare class ElementSpiritSystem {
    private spirits;
    private activeSpirits;
    constructor();
    /**
     * 初始化預設的元素精靈
     */
    private initializeDefaultSpirits;
    /**
     * 獲取元素精靈
     */
    getSpirit(id: string): ElementSpirit | undefined;
    /**
     * 獲取所有元素精靈
     */
    getAllSpirits(): ElementSpirit[];
    /**
     * 喚醒元素精靈
     */
    awakenSpirit(id: string): SpiritEvolutionResult;
    /**
     * 生成預設能力
     */
    private generateDefaultAbilities;
    /**
     * 增加元素精靈經驗值
     */
    addExperience(id: string, amount: number): SpiritEvolutionResult;
    /**
     * 計算下一級所需經驗值
     */
    private calculateExperienceToNext;
    /**
     * 進化元素精靈
     */
    evolveSpirit(id: string, targetStage: SpiritStage): SpiritEvolutionResult;
    /**
     * 檢查進化條件
     */
    private checkEvolutionConditions;
    /**
     * 生成進階能力
     */
    private generateAdvancedAbilities;
    /**
     * 激活元素精靈
     */
    activateSpirit(id: string): boolean;
    /**
     * 停用元素精靈
     */
    deactivateSpirit(id: string): boolean;
    /**
     * 獲取激活的元素精靈
     */
    getActiveSpirits(): ElementSpirit[];
    /**
     * 進行元素精靈戰鬥
     */
    performSpiritCombat(attackerId: string, defenderId: string): {
        attacker: ElementSpirit;
        defender: ElementSpirit;
        damage: number;
        result: string;
    };
    /**
     * 獲取系統統計信息
     */
    getSystemStats(): {
        totalSpirits: number;
        awakenedSpirits: number;
        activeSpirits: number;
        averageLevel: number;
        totalMastery: number;
        elementDistribution: Record<ElementType, number>;
    };
}
//# sourceMappingURL=elementSpiritSystem.d.ts.map