/**
 * JunAiKey 永久即時智能雙向自動追蹤生成式標籤機制
 * 實現智能標籤生成、雙向追蹤、自我學習的完整系統
 */
import { EventEmitter } from 'events';
export interface Tag {
    id: string;
    name: string;
    weight: number;
    semanticType: string;
    source: 'ai' | 'user' | 'system';
    confidence: number;
    createdAt: Date;
    updatedAt: Date;
    metadata?: Record<string, any>;
}
export interface DataItem {
    id: string;
    content: any;
    type: 'text' | 'image' | 'audio' | 'video' | 'structured';
    tags: Tag[];
    version: number;
    createdAt: Date;
    updatedAt: Date;
    source: string;
}
export interface TaggingEvent {
    type: 'data_ingested' | 'tag_generated' | 'tag_updated' | 'tag_deleted' | 'user_feedback';
    dataId: string;
    tags?: Tag[];
    timestamp: Date;
    userId?: string;
    feedback?: {
        action: 'accept' | 'reject' | 'modify';
        originalTags?: Tag[];
        correctedTags?: Tag[];
        reason?: string;
    };
}
export interface SystemMetrics {
    totalDataItems: number;
    totalTags: number;
    averageTaggingTime: number;
    tagAccuracy: number;
    systemThroughput: number;
    activeUsers: number;
}
export interface ITagGenerator {
    generateTags(content: any, context?: any): Promise<Tag[]>;
    retrainFromFeedback(feedback: any): Promise<void>;
}
export interface ITagIndex {
    indexData(dataId: string, tags: Tag[]): Promise<void>;
    queryByTags(tagNames: string[]): Promise<string[]>;
    queryDataByTags(dataId: string): Promise<Tag[]>;
    removeDataIndex(dataId: string): Promise<void>;
}
export interface IDataStorage {
    saveData(data: DataItem): Promise<void>;
    getData(dataId: string): Promise<DataItem | null>;
    updateData(dataId: string, updates: Partial<DataItem>): Promise<void>;
    deleteData(dataId: string): Promise<void>;
    getHistory(dataId: string): Promise<DataItem[]>;
}
export interface IUserFeedback {
    collectFeedback(event: TaggingEvent): Promise<void>;
    getFeedbackStats(timeRange: {
        start: Date;
        end: Date;
    }): Promise<any>;
}
export declare class IntelligentTaggingSystem extends EventEmitter {
    private tagGenerator;
    private tagIndex;
    private dataStorage;
    private userFeedback;
    private eventBus;
    private metrics;
    private isRunning;
    constructor(tagGenerator: ITagGenerator, tagIndex: ITagIndex, dataStorage: IDataStorage, userFeedback: IUserFeedback);
    /**
     * 設置事件處理器
     */
    private setupEventHandlers;
    /**
     * 處理數據攝取
     */
    private handleDataIngested;
    /**
     * 處理用戶反饋
     */
    private handleUserFeedback;
    /**
     * 處理標籤生成
     */
    private handleTagGenerated;
    /**
     * 攝取新數據
     */
    ingestData(data: DataItem): Promise<void>;
    /**
     * 用戶反饋處理
     */
    submitUserFeedback(event: TaggingEvent): Promise<void>;
    /**
     * 根據標籤查詢數據
     */
    queryByTags(tagNames: string[]): Promise<string[]>;
    /**
     * 根據數據ID查詢標籤
     */
    getTagsForData(dataId: string): Promise<Tag[]>;
    /**
     * 更新系統指標
     */
    private updateMetrics;
    /**
     * 獲取系統統計信息
     */
    getMetrics(): SystemMetrics;
    /**
     * 啟動系統
     */
    start(): Promise<void>;
    /**
     * 停止系統
     */
    stop(): Promise<void>;
}
export declare class AITagGenerator implements ITagGenerator {
    private model;
    private knowledgeGraph;
    private promptTemplates;
    constructor(model: any, knowledgeGraph: any);
    private initializePromptTemplates;
    generateTags(content: any, context?: any): Promise<Tag[]>;
    retrainFromFeedback(feedback: any): Promise<void>;
    private detectDataType;
    private buildPrompt;
    private enhanceTagsWithKnowledgeGraph;
}
export declare class BidirectionalTagIndex implements ITagIndex {
    private dataToTags;
    private tagToData;
    private lock;
    indexData(dataId: string, tags: Tag[]): Promise<void>;
    queryByTags(tagNames: string[]): Promise<string[]>;
    queryDataByTags(dataId: string): Promise<Tag[]>;
    removeDataIndex(dataId: string): Promise<void>;
}
export declare class UserFeedbackSystem implements IUserFeedback {
    private feedbackStore;
    collectFeedback(event: TaggingEvent): Promise<void>;
    getFeedbackStats(timeRange: {
        start: Date;
        end: Date;
    }): Promise<any>;
}
//# sourceMappingURL=index.d.ts.map