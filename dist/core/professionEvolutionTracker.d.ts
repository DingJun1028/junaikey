/**
 * JunAiKey 職業進化追蹤器核心實現
 * 實現 Profession Evolution - 職業進化系統的核心邏輯
 */
import { ProfessionEvolution, ProfessionQuest, ProfessionNetwork, ProfessionResult, ProfessionStats } from '../types/professionEvolution';
export declare class ProfessionEvolutionTracker {
    private professions;
    private activeProfessions;
    private professionNetwork;
    private availableQuests;
    constructor();
    /**
     * 初始化預設職業
     */
    private initializeDefaultProfessions;
    /**
     * 初始化職業網絡
     */
    private initializeProfessionNetwork;
    /**
     * 初始化預設任務
     */
    private initializeDefaultQuests;
    /**
     * 獲取職業
     */
    getProfession(id: string): ProfessionEvolution | undefined;
    /**
     * 獲取所有職業
     */
    getAllProfessions(): ProfessionEvolution[];
    /**
     * 激活職業
     */
    activateProfession(id: string): boolean;
    /**
     * 停用職業
     */
    deactivateProfession(id: string): boolean;
    /**
     * 獲取激活的職業
     */
    getActiveProfessions(): ProfessionEvolution[];
    /**
     * 生成預設技能
     */
    private generateDefaultSkills;
    /**
     * 增加職業經驗值
     */
    addExperience(id: string, amount: number): ProfessionResult;
    /**
     * 獲取升級所需經驗值
     */
    private getExperienceNeeded;
    /**
     * 學習技能
     */
    learnSkill(professionId: string, skillId: string): ProfessionResult;
    /**
     * 檢查技能需求
     */
    private checkSkillRequirements;
    /**
     * 接受任務
     */
    acceptQuest(questId: string, professionId: string): ProfessionResult;
    /**
     * 更新任務進度
     */
    updateQuestProgress(questId: string, objectiveId: string, progress: number): ProfessionResult;
    /**
     * 完成任務獎勵
     */
    private completeQuestRewards;
    /**
     * 創建職業關係
     */
    createProfessionRelationship(professionId1: string, professionId2: string, relationshipType: 'mentor' | 'student' | 'colleague' | 'rival'): boolean;
    /**
     * 獲取系統統計信息
     */
    getSystemStats(): ProfessionStats;
    /**
     * 獲取職業網絡
     */
    getProfessionNetwork(): ProfessionNetwork;
    /**
     * 獲取可用任務
     */
    getAvailableQuests(): ProfessionQuest[];
    /**
     * 獲取激活任務
     */
    getActiveQuests(): ProfessionQuest[];
}
//# sourceMappingURL=professionEvolutionTracker.d.ts.map