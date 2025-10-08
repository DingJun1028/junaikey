// src/api/clients/IApiClient.ts
import type { OmniCard } from '../../models/OmniCard';

/**
 * @interface IApiClient
 * @description 與萬能全知記錄庫 (AITable) 溝通的神聖契約。
 * @author JunAiKey - 創世編織者
 * @version 1.0.0
 */
export interface IApiClient {
  /**
   * 根據卡牌ID獲取單張萬能符文的完整數據。
   * @param cardId - 聖典中卡牌的唯一ID。
   * @returns A Promise resolving to an OmniCard object or null if not found.
   */
  getCardById(cardId: string): Promise<OmniCard | null>;

  /**
   * 獲取所有萬能符文的列表（支持過濾與分頁）。
   * @returns A Promise resolving to an array of OmniCard objects.
   */
  getAllCards(): Promise<OmniCard[]>;

  // 後續可擴展：createCard, updateCard, deleteCard, createFieldsForSchema 等
}
