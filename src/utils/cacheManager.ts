/**
 * JunAiKey 緩存管理系統
 * 提供統一的緩存接口和管理功能
 */

import { logger } from './logger';
import { performanceMonitor } from './performanceMonitor';

export interface CacheOptions {
  ttl?: number; // Time to live in milliseconds
  maxSize?: number; // Maximum number of items
  cleanupInterval?: number; // Cleanup interval in milliseconds
  strategy?: 'lru' | 'fifo' | 'lfu' | 'ttl'; // Cache strategy
}

export interface CacheEntry<T> {
  key: string;
  value: T;
  timestamp: number;
  ttl?: number;
  accessCount: number;
  lastAccessed: number;
}

export class CacheManager {
  private cache: Map<string, CacheEntry<any>>;
  private options: Required<CacheOptions>;
  private cleanupTimer: NodeJS.Timeout | null = null;
  private stats = {
    hits: 0,
    misses: 0,
    evictions: 0,
    totalItems: 0
  };

  constructor(options: CacheOptions = {}) {
    this.options = {
      ttl: 5 * 60 * 1000, // 5 minutes default
      maxSize: 1000,
      cleanupInterval: 60 * 1000, // 1 minute
      strategy: 'lru',
      ...options
    };

    this.cache = new Map();
    this.startCleanupTimer();
  }

  /**
   * 獲取緩存值
   */
  get<T>(key: string): T | null {
    const timerId = performanceMonitor.startTimer(`cache_get_${key}`);
    
    const entry = this.cache.get(key);
    if (!entry) {
      performanceMonitor.endTimer(timerId);
      this.stats.misses++;
      return null;
    }

    // 檢查是否過期
    if (entry.ttl && Date.now() - entry.timestamp > entry.ttl) {
      this.delete(key);
      performanceMonitor.endTimer(timerId);
      this.stats.misses++;
      return null;
    }

    // 更新訪問信息
    entry.accessCount++;
    entry.lastAccessed = Date.now();
    
    performanceMonitor.endTimer(timerId);
    this.stats.hits++;
    
    logger.debug('CacheManager', `Cache hit for key: ${key}`, {
      accessCount: entry.accessCount,
      age: Date.now() - entry.timestamp
    });

    return entry.value;
  }

  /**
   * 設置緩存值
   */
  set<T>(key: string, value: T, options?: Partial<CacheOptions>): void {
    const timerId = performanceMonitor.startTimer(`cache_set_${key}`);
    
    // 檢查緩存大小限制
    if (this.cache.size >= this.options.maxSize) {
      this.evict();
    }

    const entry: CacheEntry<T> = {
      key,
      value,
      timestamp: Date.now(),
      ttl: options?.ttl || this.options.ttl,
      accessCount: 0,
      lastAccessed: Date.now()
    };

    this.cache.set(key, entry);
    this.stats.totalItems++;

    logger.debug('CacheManager', `Cache set for key: ${key}`, {
      cacheSize: this.cache.size,
      ttl: entry.ttl
    });

    performanceMonitor.endTimer(timerId);
  }

  /**
   * 刪除緩存值
   */
  delete(key: string): boolean {
    const deleted = this.cache.delete(key);
    if (deleted) {
      this.stats.totalItems--;
      this.stats.evictions++;
    }
    return deleted;
  }

  /**
   * 清空緩存
   */
  clear(): void {
    this.cache.clear();
    this.stats.totalItems = 0;
    logger.info('CacheManager', 'Cache cleared');
  }

  /**
   * 檢查鍵是否存在
   */
  has(key: string): boolean {
    const entry = this.cache.get(key);
    if (!entry) return false;

    // 檢查是否過期
    if (entry.ttl && Date.now() - entry.timestamp > entry.ttl) {
      this.delete(key);
      return false;
    }

    return true;
  }

  /**
   * 獲取緩存大小
   */
  size(): number {
    return this.cache.size;
  }

  /**
   * 獲取緩存統計信息
   */
  getStats() {
    return {
      ...this.stats,
      hitRate: this.stats.hits / (this.stats.hits + this.stats.misses) || 0,
      cacheSize: this.cache.size,
      maxSize: this.options.maxSize
    };
  }

  /**
   * 獲取所有鍵
   */
  keys(): string[] {
    return Array.from(this.cache.keys());
  }

  /**
   * 獲取所有值
   */
  values(): any[] {
    return Array.from(this.cache.values()).map(entry => entry.value);
  }

  /**
   * 獲取所有條目
   */
  entries(): Array<[string, any]> {
    return Array.from(this.cache.entries()).map(([key, entry]) => [key, entry.value]);
  }

  /**
   * 遍歷緩存
   */
  forEach(callback: (value: any, key: string, map: Map<string, any>) => void): void {
    this.cache.forEach((entry, key) => callback(entry.value, key, this.cache));
  }

  /**
   * 根據策略淘汰緩存
   */
  private evict(): void {
    switch (this.options.strategy) {
      case 'lru':
        this.evictLRU();
        break;
      case 'fifo':
        this.evictFIFO();
        break;
      case 'lfu':
        this.evictLFU();
        break;
      case 'ttl':
        this.evictTTL();
        break;
      default:
        this.evictLRU();
    }
  }

  /**
   * LRU 淘汰策略
   */
  private evictLRU(): void {
    let oldestKey: string | null = null;
    let oldestTime = Infinity;

    this.cache.forEach((entry, key) => {
      if (entry.lastAccessed < oldestTime) {
        oldestTime = entry.lastAccessed;
        oldestKey = key;
      }
    });

    if (oldestKey) {
      this.delete(oldestKey);
      logger.debug('CacheManager', 'Evicted LRU item', { key: oldestKey });
    }
  }

  /**
   * FIFO 淘汰策略
   */
  private evictFIFO(): void {
    const firstKey = this.cache.keys().next().value;
    if (firstKey) {
      this.delete(firstKey);
      logger.debug('CacheManager', 'Evicted FIFO item', { key: firstKey });
    }
  }

  /**
   * LFU 淘汰策略
   */
  private evictLFU(): void {
    let leastUsedKey: string | null = null;
    let leastUsedCount = Infinity;

    this.cache.forEach((entry, key) => {
      if (entry.accessCount < leastUsedCount) {
        leastUsedCount = entry.accessCount;
        leastUsedKey = key;
      }
    });

    if (leastUsedKey) {
      this.delete(leastUsedKey);
      logger.debug('CacheManager', 'Evicted LFU item', { key: leastUsedKey });
    }
  }

  /**
   * TTL 淘汰策略
   */
  private evictTTL(): void {
    const now = Date.now();
    let oldestKey: string | null = null;
    let oldestTimestamp = now - (this.options.ttl * 2); // Evict items older than 2x TTL

    this.cache.forEach((entry, key) => {
      if (entry.timestamp < oldestTimestamp) {
        oldestTimestamp = entry.timestamp;
        oldestKey = key;
      }
    });

    if (oldestKey) {
      this.delete(oldestKey);
      logger.debug('CacheManager', 'Evicted TTL item', { key: oldestKey });
    }
  }

  /**
   * 清理過期緩存
   */
  private cleanup(): void {
    const now = Date.now();
    let deletedCount = 0;

    this.cache.forEach((entry, key) => {
      if (entry.ttl && now - entry.timestamp > entry.ttl) {
        this.delete(key);
        deletedCount++;
      }
    });

    if (deletedCount > 0) {
      logger.debug('CacheManager', `Cleaned up ${deletedCount} expired items`);
    }
  }

  /**
   * 啟動清理計時器
   */
  private startCleanupTimer(): void {
    if (this.cleanupTimer) {
      clearInterval(this.cleanupTimer);
    }

    this.cleanupTimer = setInterval(() => {
      this.cleanup();
    }, this.options.cleanupInterval);
  }

  /**
   * 停止清理計時器
   */
  stopCleanupTimer(): void {
    if (this.cleanupTimer) {
      clearInterval(this.cleanupTimer);
      this.cleanupTimer = null;
    }
  }

  /**
   * 更新緩存配置
   */
  updateOptions(newOptions: Partial<CacheOptions>): void {
    this.options = { ...this.options, ...newOptions };
    logger.info('CacheManager', 'Cache options updated', this.options);
  }

  /**
   * 銷毀緩存管理器
   */
  destroy(): void {
    this.stopCleanupTimer();
    this.clear();
    logger.info('CacheManager', 'Cache manager destroyed');
  }
}

// 建立全局緩存管理器實例
export const cacheManager = new CacheManager({
  ttl: 5 * 60 * 1000, // 5 minutes
  maxSize: 1000,
  strategy: 'lru'
});

// 裝飾器：緩存方法結果
export function cacheable(key?: string, options?: CacheOptions) {
  return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    const originalMethod = descriptor.value;

    descriptor.value = async function (...args: any[]) {
      const cacheKey = key || `${target.constructor.name}.${propertyKey}.${JSON.stringify(args)}`;
      
      // 嘗試從緩存獲取
      const cachedResult = cacheManager.get(cacheKey);
      if (cachedResult !== null) {
        return cachedResult;
      }

      // 執行原方法
      const result = await originalMethod.apply(this, args);
      
      // 存儲到緩存
      cacheManager.set(cacheKey, result, options);
      
      return result;
    };

    return descriptor;
  };
}

// 裝飾器：緩存類方法
export function cacheClass(options?: CacheOptions) {
  return function <T extends new (...args: any[]) => any>(constructor: T) {
    return class extends constructor {
      constructor(...args: any[]) {
        super(...args);
        
        // 為類的所有方法添加緩存
        const prototype = constructor.prototype;
        const propertyNames = Object.getOwnPropertyNames(prototype).filter(
          name => name !== 'constructor' && typeof prototype[name] === 'function'
        );

        propertyNames.forEach(propertyName => {
          const originalMethod = prototype[propertyName];
          if (typeof originalMethod === 'function') {
            prototype[propertyName] = function (...args: any[]) {
              const cacheKey = `${constructor.name}.${propertyName}.${JSON.stringify(args)}`;
              
              // 嘗試從緩存獲取
              const cachedResult = cacheManager.get(cacheKey);
              if (cachedResult !== null) {
                return cachedResult;
              }

              // 執行原方法
              const result = originalMethod.apply(this, args);
              
              // 存儲到緩存
              cacheManager.set(cacheKey, result, options);
              
              return result;
            };
          }
        });
      }
    };
  };
}

// 快捷方法
export const getCache = cacheManager.get.bind(cacheManager);
export const setCache = cacheManager.set.bind(cacheManager);
export const deleteCache = cacheManager.delete.bind(cacheManager);
export const clearCache = cacheManager.clear.bind(cacheManager);
export const hasCache = cacheManager.has.bind(cacheManager);
export const getCacheStats = cacheManager.getStats.bind(cacheManager);
