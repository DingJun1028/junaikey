// src/models/OmniCard.ts
// 將現有的卡牌型別重新導出為 OmniCard，方便 API 層使用
import { OmniKeyCard } from '../tcg/types/card';

export type OmniCard = OmniKeyCard;

// 確保這個檔案被視為模組
export {};

// 如果需要，這裡可以擴展或添加映射/序列化輔助函式
