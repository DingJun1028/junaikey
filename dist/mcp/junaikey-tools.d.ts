/**
 * JunAiKey MCP 工具集
 * 整合 Element Mastery、Avatar Synergy、Profession Evolution 三大系統
 */
import { ElementSpiritSystem } from '../core/elementSpiritSystem';
import { AvatarSynergyEngine } from '../core/avatarSynergyEngine';
import { ProfessionEvolutionTracker } from '../core/professionEvolutionTracker';
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
export declare class JunAiKeyTools {
    private elementSpiritSystem;
    private avatarSynergyEngine;
    private professionEvolutionTracker;
    private aiTableService;
    private tools;
    constructor();
    /**
     * 初始化所有工具
     */
    private initializeTools;
    /**
     * 註冊工具
     */
    private registerTool;
    /**
     * 獲取工具列表
     */
    getTools(): JunAiKeyTool[];
    /**
     * 執行工具
     */
    executeTool(name: string, params: any): Promise<any>;
    /**
     * 獲取系統統計信息
     */
    private getSystemStats;
    /**
     * 獲取元素精靈系統
     */
    getElementSpiritSystem(): ElementSpiritSystem;
    /**
     * 獲取化身協同引擎
     */
    getAvatarSynergyEngine(): AvatarSynergyEngine;
    /**
     * 獲取職業進化追蹤器
     */
    getProfessionEvolutionTracker(): ProfessionEvolutionTracker;
}
export declare const junaikeyTools: JunAiKeyTools;
//# sourceMappingURL=junaikey-tools.d.ts.map