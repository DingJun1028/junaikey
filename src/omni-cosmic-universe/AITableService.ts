import { AITableIntegration } from './AITableIntegration';
import { logger } from '../utils/logger';

/**
 * AITable 服務層 - 實現《萬能開發光耀聖典》中的創元實錄功能
 * 提供完整的 AITable API 操作封裝，支持多種字段類型操作
 */
export class AITableService {
  private integration: AITableIntegration;
  private logger: typeof logger;
  private isRunning: boolean = false;
  private spaceId: string = '';
  private datasheetId: string = '';
  private genesisChronicleId: string = '';

  constructor(integration: AITableIntegration) {
    this.integration = integration;
    this.logger = logger;
  }

  /**
   * 啟動 AITable 服務
   */
  public async start(): Promise<void> {
    this.logger.info('Starting AITable Service...');
    
    try {
      // 初始化 AITable 整合
      await this.integration.initialize();
      
      // 獲取空間和表格信息
      this.spaceId = await this.integration.getSpaceId();
      this.datasheetId = await this.integration.getDatasheetId();
      
      // 檢查創元實錄是否存在，不存在則創建
      await this.ensureGenesisChronicle();
      
      this.isRunning = true;
      this.logger.info('AITable Service started successfully', {
        spaceId: this.spaceId,
        datasheetId: this.datasheetId
      });
    } catch (error) {
      this.logger.error('Failed to start AITable Service', error);
      throw error;
    }
  }

  /**
   * 停止 AITable 服務
   */
  public async stop(): Promise<void> {
    this.isRunning = false;
    this.logger.info('AITable Service stopped');
  }

  /**
   * 檢查服務是否運行中
   */
  public isAITableServiceRunning(): boolean {
    return this.isRunning;
  }

  /**
   * 獲取服務統計信息
   */
  public getAITableServiceStats(): any {
    return {
      isRunning: this.isRunning,
      spaceId: this.spaceId,
      datasheetId: this.datasheetId,
      genesisChronicleId: this.genesisChronicleId,
      timestamp: new Date()
    };
  }

  /**
   * 確保創元實錄存在
   */
  private async ensureGenesisChronicle(): Promise<void> {
    try {
      // 檢查創元實錄是否存在
      const existingChronicle = await this.findRecordByFilter('type', 'equals', 'GenesisChronicle');
      
      if (existingChronicle && existingChronicle.length > 0) {
        this.genesisChronicleId = existingChronicle[0].recordId;
        this.logger.info('Existing GenesisChronicle found', { recordId: this.genesisChronicleId });
      } else {
        // 創建創元實錄
        this.genesisChronicleId = await this.createGenesisChronicle();
        this.logger.info('Created new GenesisChronicle', { recordId: this.genesisChronicleId });
      }
    } catch (error) {
      this.logger.error('Failed to ensure GenesisChronicle', error);
      throw error;
    }
  }

  /**
   * 創建創元實錄
   */
  private async createGenesisChronicle(): Promise<string> {
    const record = {
      type: 'GenesisChronicle',
      name: '創元實錄',
      description: '記錄萬能宇宙的所有變更與進化',
      status: 'active',
      createdAt: new Date().toISOString(),
      totalGraceLevel: 0,
      elementCount: 12,
      activeSystems: 'OmniCosmicUniverse'
    };

    const response = await this.integration.createRecord(record);
    return response.recordId;
  }

  /**
   * 創建記錄到創元實錄
   */
  public async createRecord(tableName: string, data: any): Promise<any> {
    try {
      const record = {
        ...data,
        tableName,
        recordedAt: new Date().toISOString(),
        sacredTomeVersion: 'v4.5',
        graceLevel: this.getCurrentGraceLevel()
      };

      const response = await this.integration.createRecord(record);
      
      // 記錄到創元實錄
      await this.recordToGenesisChronicle({
        type: 'createRecord',
        tableName,
        recordData: data,
        timestamp: new Date()
      });

      return response;
    } catch (error) {
      this.logger.error('Failed to create record', { tableName, error });
      throw error;
    }
  }

  /**
   * 更新記錄
   */
  public async updateRecord(recordId: string, data: any): Promise<any> {
    try {
      const response = await this.integration.updateRecord(recordId, data);
      
      // 記錄到創元實錄
      await this.recordToGenesisChronicle({
        type: 'updateRecord',
        recordId,
        updateData: data,
        timestamp: new Date()
      });

      return response;
    } catch (error) {
      this.logger.error('Failed to update record', { recordId, error });
      throw error;
    }
  }

  /**
   * 刪除記錄
   */
  public async deleteRecord(recordId: string): Promise<any> {
    try {
      const response = await this.integration.deleteRecord(recordId);
      
      // 記錄到創元實錄
      await this.recordToGenesisChronicle({
        type: 'deleteRecord',
        recordId,
        timestamp: new Date()
      });

      return response;
    } catch (error) {
      this.logger.error('Failed to delete record', { recordId, error });
      throw error;
    }
  }

  /**
   * 獲取記錄
   */
  public async getRecord(recordId: string): Promise<any> {
    try {
      return await this.integration.getRecord(recordId);
    } catch (error) {
      this.logger.error('Failed to get record', { recordId, error });
      throw error;
    }
  }

  /**
   * 獲取所有記錄
   */
  public async getAllRecords(): Promise<any[]> {
    try {
      return await this.integration.getAllRecords();
    } catch (error) {
      this.logger.error('Failed to get all records', error);
      throw error;
    }
  }

  /**
   * 根據過濾器查找記錄
   */
  public async findRecordByFilter(field: string, operator: string, value: any): Promise<any[]> {
    try {
      return await this.integration.findRecordByFilter(field, operator, value);
    } catch (error) {
      this.logger.error('Failed to find records by filter', { field, operator, value, error });
      throw error;
    }
  }

  /**
   * 記錄到創元實錄
   */
  private async recordToGenesisChronicle(record: { type: string; timestamp: Date; [key: string]: any }): Promise<void> {
    try {
      if (!this.genesisChronicleId) {
        this.logger.warn('GenesisChronicle not initialized, skipping record');
        return;
      }

      const chronicleRecord = {
        type: 'ChronicleEntry',
        action: record.type,
        timestamp: record.timestamp,
        details: JSON.stringify(record),
        graceLevel: this.getCurrentGraceLevel(),
        sacredTomeVersion: 'v4.5'
      };

      await this.integration.createRecord(chronicleRecord);
      this.logger.info('Recorded to GenesisChronicle', { action: record.type });
    } catch (error) {
      this.logger.error('Failed to record to GenesisChronicle', error);
      // 不拋出錯誤，避免影響主要功能
    }
  }

  /**
   * 獲取當前恩典等級
   */
  private getCurrentGraceLevel(): number {
    // 這裡可以從 OmniCosmicUniverse 獲取當前的恩典等級
    // 暫時返回默認值
    return 7949;
  }

  /**
   * 創建萬能卡牌記錄
   */
  public async createOmniCard(cardData: any): Promise<any> {
    try {
      const card = {
        type: 'OmniCard',
        cardType: cardData.cardType,
        name: cardData.name,
        description: cardData.description,
        rarity: cardData.rarity,
        element: cardData.element,
        cost: cardData.cost || 0,
        power: cardData.power || 0,
        health: cardData.health || 0,
        abilities: cardData.abilities || [],
        createdAt: new Date().toISOString()
      };

      const response = await this.createRecord('OmniCards', card);
      
      // 記錄到創元實錄
      await this.recordToGenesisChronicle({
        type: 'createOmniCard',
        cardData,
        timestamp: new Date()
      });

      return response;
    } catch (error) {
      this.logger.error('Failed to create OmniCard', { cardData, error });
      throw error;
    }
  }

  /**
   * 獲取萬能卡牌列表
   */
  public async getOmniCards(filters?: any): Promise<any[]> {
    try {
      const cards = await this.integration.findRecordByFilter('type', 'equals', 'OmniCard');
      
      if (filters) {
        // 應用過濾器
        return cards.filter(card => {
          return Object.keys(filters).every(key => {
            const filterValue = filters[key];
            const cardValue = card.fields[key];
            
            if (Array.isArray(filterValue)) {
              return filterValue.includes(cardValue);
            }
            
            return cardValue === filterValue;
          });
        });
      }
      
      return cards;
    } catch (error) {
      this.logger.error('Failed to get OmniCards', error);
      throw error;
    }
  }

  /**
   * 更新萬能卡牌
   */
  public async updateOmniCard(recordId: string, updates: any): Promise<any> {
    try {
      const response = await this.updateRecord(recordId, updates);
      
      // 記錄到創元實錄
      await this.recordToGenesisChronicle({
        type: 'updateOmniCard',
        recordId,
        updates,
        timestamp: new Date()
      });

      return response;
    } catch (error) {
      this.logger.error('Failed to update OmniCard', { recordId, updates, error });
      throw error;
    }
  }

  /**
   * 創建元素精靈記錄
   */
  public async createElementSpirit(elementData: any): Promise<any> {
    try {
      const spirit = {
        type: 'ElementSpirit',
        element: elementData.element,
        name: elementData.name,
        description: elementData.description,
        graceLevel: elementData.graceLevel,
        properties: elementData.properties || [],
        abilities: elementData.abilities || [],
        createdAt: new Date().toISOString()
      };

      const response = await this.createRecord('ElementSpirits', spirit);
      
      // 記錄到創元實錄
      await this.recordToGenesisChronicle({
        type: 'createElementSpirit',
        elementData,
        timestamp: new Date()
      });

      return response;
    } catch (error) {
      this.logger.error('Failed to create ElementSpirit', { elementData, error });
      throw error;
    }
  }

  /**
   * 獲取元素精靈列表
   */
  public async getElementSpirits(): Promise<any[]> {
    try {
      return await this.integration.findRecordByFilter('type', 'equals', 'ElementSpirit');
    } catch (error) {
      this.logger.error('Failed to get ElementSpirits', error);
      throw error;
    }
  }

  /**
   * 創建神聽指令記錄
   */
  public async createSacredCommand(commandData: any): Promise<any> {
    try {
      const command = {
        type: 'SacredCommand',
        command: commandData.command,
        description: commandData.description,
        executionResult: commandData.executionResult || 'pending',
        graceLevel: commandData.graceLevel,
        timestamp: commandData.timestamp || new Date().toISOString(),
        createdAt: new Date().toISOString()
      };

      const response = await this.createRecord('SacredCommands', command);
      
      // 記錄到創元實錄
      await this.recordToGenesisChronicle({
        type: 'createSacredCommand',
        commandData,
        timestamp: new Date()
      });

      return response;
    } catch (error) {
      this.logger.error('Failed to create SacredCommand', { commandData, error });
      throw error;
    }
  }

  /**
   * 獲取神聽指令記錄
   */
  public async getSacredCommands(): Promise<any[]> {
    try {
      return await this.integration.findRecordByFilter('type', 'equals', 'SacredCommand');
    } catch (error) {
      this.logger.error('Failed to get SacredCommands', error);
      throw error;
    }
  }

  /**
   * 創建宇宙進化記錄
   */
  public async createCosmicEvolution(evolutionData: any): Promise<any> {
    try {
      const evolution = {
        type: 'CosmicEvolution',
        stage: evolutionData.stage,
        totalGraceLevel: evolutionData.totalGraceLevel,
        divineAuraLevel: evolutionData.divineAuraLevel,
        activatedSystems: evolutionData.activatedSystems || [],
        timestamp: evolutionData.timestamp || new Date().toISOString(),
        createdAt: new Date().toISOString()
      };

      const response = await this.createRecord('CosmicEvolution', evolution);
      
      // 記錄到創元實錄
      await this.recordToGenesisChronicle({
        type: 'createCosmicEvolution',
        evolutionData,
        timestamp: new Date()
      });

      return response;
    } catch (error) {
      this.logger.error('Failed to create CosmicEvolution', { evolutionData, error });
      throw error;
    }
  }

  /**
   * 獲取宇宙進化記錄
   */
  public async getCosmicEvolutionHistory(): Promise<any[]> {
    try {
      return await this.integration.findRecordByFilter('type', 'equals', 'CosmicEvolution');
    } catch (error) {
      this.logger.error('Failed to get CosmicEvolution history', error);
      throw error;
    }
  }

  /**
   * 創建系統統計記錄
   */
  public async createSystemStats(statsData: any): Promise<any> {
    try {
      const stats = {
        type: 'SystemStats',
        system: statsData.system,
        isRunning: statsData.isRunning,
        sacredTomeActivated: statsData.sacredTomeActivated,
        divineAuraLevel: statsData.divineAuraLevel,
        totalGraceLevel: statsData.totalGraceLevel,
        timestamp: statsData.timestamp || new Date().toISOString(),
        createdAt: new Date().toISOString()
      };

      const response = await this.createRecord('SystemStats', stats);
      
      // 記錄到創元實錄
      await this.recordToGenesisChronicle({
        type: 'createSystemStats',
        statsData,
        timestamp: new Date()
      });

      return response;
    } catch (error) {
      this.logger.error('Failed to create SystemStats', { statsData, error });
      throw error;
    }
  }

  /**
   * 獲取系統統計記錄
   */
  public async getSystemStatsHistory(): Promise<any[]> {
    try {
      return await this.integration.findRecordByFilter('type', 'equals', 'SystemStats');
    } catch (error) {
      this.logger.error('Failed to get SystemStats history', error);
      throw error;
    }
  }

  /**
   * 創建表格
   */
  public async createTable(tableData: any): Promise<any> {
    try {
      const table = {
        type: 'DataTable',
        name: tableData.name,
        description: tableData.description,
        fields: tableData.fields || [],
        createdAt: new Date().toISOString()
      };

      const response = await this.createRecord('DataTables', table);
      
      // 記錄到創元實錄
      await this.recordToGenesisChronicle({
        type: 'createTable',
        tableData,
        timestamp: new Date()
      });

      return response;
    } catch (error) {
      this.logger.error('Failed to create table', { tableData, error });
      throw error;
    }
  }

  /**
   * 查詢表格
   */
  public async queryTable(queryData: any): Promise<any[]> {
    try {
      const records = await this.integration.findRecordByFilter('type', 'equals', 'DataTable');
      
      // 應用查詢過濾器
      const filteredRecords = records.filter(record => {
        return Object.keys(queryData).every(key => {
          const queryValue = queryData[key];
          const recordValue = record.fields[key];
          
          if (Array.isArray(queryValue)) {
            return queryValue.includes(recordValue);
          }
          
          return recordValue === queryValue;
        });
      });

      // 記錄到創元實錄
      await this.recordToGenesisChronicle({
        type: 'queryTable',
        queryData,
        timestamp: new Date()
      });

      return filteredRecords;
    } catch (error) {
      this.logger.error('Failed to query table', { queryData, error });
      throw error;
    }
  }
}
