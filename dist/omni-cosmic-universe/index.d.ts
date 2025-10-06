/**
 * 萬能世界卡牌互動系統：宇宙全息圖
 * 整合奧義開發系統與自我最佳實踐化系統的Web應用
 *
 * 實現四大宇宙公理與四大聖柱的完美融合
 */
type ElementColor = '🔵' | '🔴' | '🟢' | '⚪' | '⚫' | '💫' | '🟡' | '🩶' | '🌪';
interface LifecycleNode {
    id?: string;
    name: string;
    type: 'event' | 'problem' | 'solution';
    y: number;
    color?: ElementColor;
}
export declare const CosmicGenerator: React.FC;
export declare const LifecycleFlow: React.FC<{
    data: LifecycleNode[];
}>;
export default CosmicGenerator;
//# sourceMappingURL=index.d.ts.map