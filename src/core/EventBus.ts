/**
 * EventBus - 事件總線
 * 用於在系統各組件之間進行事件通信
 */
export class EventBus {
  private listeners: Map<string, Function[]>;

  constructor() {
    this.listeners = new Map();
  }

  /**
   * 註冊事件監聽器
   */
  on(event: string, callback: Function): void {
    if (!this.listeners.has(event)) {
      this.listeners.set(event, []);
    }
    this.listeners.get(event)!.push(callback);
  }

  /**
   * 觸發事件
   */
  emit(event: string, data?: any): void {
    const callbacks = this.listeners.get(event);
    if (callbacks) {
      callbacks.forEach(callback => {
        try {
          callback(data);
        } catch (error) {
          console.error(`Error in event handler for '${event}':`, error);
        }
      });
    }
  }

  /**
   * 移除事件監聽器
   */
  off(event: string, callback: Function): void {
    const callbacks = this.listeners.get(event);
    if (callbacks) {
      const index = callbacks.indexOf(callback);
      if (index > -1) {
        callbacks.splice(index, 1);
      }
    }
  }

  /**
   * 移除所有事件監聽器
   */
  removeAllListeners(event?: string): void {
    if (event) {
      this.listeners.delete(event);
    } else {
      this.listeners.clear();
    }
  }

  /**
   * 獲取事件監聽器數量
   */
  listenerCount(event: string): number {
    const callbacks = this.listeners.get(event);
    return callbacks ? callbacks.length : 0;
  }
}
