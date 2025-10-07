/**
 * Junaikey TypeScript 工具函式庫
 * 包含計算器、數學工具、驗證器等功能
 * 
 * 這是一個獨立的工具類別庫，用於 TypeScript + Markdown 開發工具鏈的示範
 */

/**
 * 計算器類別 - 提供基本的數學運算功能
 */
export class Calculator {
  /**
   * 兩數相加
   * @param a 第一個數字
   * @param b 第二個數字
   * @returns 相加結果
   */
  add(a: number, b: number): number {
    return a + b;
  }

  /**
   * 兩數相減
   * @param a 第一個數字
   * @param b 第二個數字
   * @returns 相減結果
   */
  subtract(a: number, b: number): number {
    return a - b;
  }

  /**
   * 兩數相乘
   * @param a 第一個數字
   * @param b 第二個數字
   * @returns 相乘結果
   */
  multiply(a: number, b: number): number {
    return a * b;
  }

  /**
   * 兩數相除
   * @param a 第一個數字
   * @param b 第二個數字
   * @returns 相除結果
   * @throws 當除數為 0 時拋出錯誤
   */
  divide(a: number, b: number): number {
    if (b === 0) {
      throw new Error('除數不能為 0');
    }
    return a / b;
  }

  /**
   * 計算平方根
   * @param number 要計算的數字
   * @returns 平方根結果
   * @throws 當數字為負數時拋出錯誤
   */
  squareRoot(number: number): number {
    if (number < 0) {
      throw new Error('不能計算負數的平方根');
    }
    return Math.sqrt(number);
  }

  /**
   * 計算次方
   * @param base 底數
   * @param exponent 指數
   * @returns 次方結果
   */
  power(base: number, exponent: number): number {
    return Math.pow(base, exponent);
  }

  /**
   * 計算百分比
   * @param part 部分
   * @param whole 整體
   * @returns 百分比結果
   */
  percentage(part: number, whole: number): number {
    if (whole === 0) {
      throw new Error('整體不能為 0');
    }
    return (part / whole) * 100;
  }
}

/**
 * 數學工具類別 - 提供進階數學功能
 */
export class MathUtils {
  /**
   * 生成斐波那契數列
   * @param n 項數
   * @returns 斐波那契數列
   */
  static fibonacci(n: number): number[] {
    if (n <= 0) return [];
    if (n === 1) return [0];
    
    const sequence: number[] = [0, 1];
    for (let i = 2; i < n; i++) {
      sequence.push(sequence[i - 1] + sequence[i - 2]);
    }
    return sequence;
  }

  /**
   * 檢查是否為質數
   * @param number 要檢查的數字
   * @returns 是否為質數
   */
  static isPrime(number: number): boolean {
    if (number <= 1) return false;
    if (number <= 3) return true;
    
    if (number % 2 === 0 || number % 3 === 0) return false;
    
    for (let i = 5; i * i <= number; i += 6) {
      if (number % i === 0 || number % (i + 2) === 0) return false;
    }
    return true;
  }

  /**
   * 計算階乘
   * @param n 數字
   * @returns 階乘結果
   */
  static factorial(n: number): number {
    if (n < 0) throw new Error('階乘不能計算負數');
    if (n === 0 || n === 1) return 1;
    
    let result = 1;
    for (let i = 2; i <= n; i++) {
      result *= i;
    }
    return result;
  }
}

/**
 * 驗證器類別 - 提供各種驗證功能
 */
export class Validator {
  /**
   * 驗證 Email 格式
   * @param email Email 位址
   * @returns 是否為有效的 Email
   */
  static isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  /**
   * 驗證手機號碼格式
   * @param phone 手機號碼
   * @returns 是否為有效的手機號碼
   */
  static isValidPhone(phone: string): boolean {
    const phoneRegex = /^09\d{8}$/;
    return phoneRegex.test(phone);
  }

  /**
   * 驗證身分證字號格式
   * @param id 身分證字號
   * @returns 是否為有效的身分證字號
   */
  static isValidIdCard(id: string): boolean {
    const idRegex = /^[A-Z][12]\d{8}$/;
    return idRegex.test(id);
  }

  /**
   * 驗證密碼強度
   * @param password 密碼
   * @returns 密碼強度等級 (0-4)
   */
  static passwordStrength(password: string): number {
    let strength = 0;
    
    if (password.length >= 8) strength++;
    if (/[a-z]/.test(password)) strength++;
    if (/[A-Z]/.test(password)) strength++;
    if (/\d/.test(password)) strength++;
    if (/[^a-zA-Z\d]/.test(password)) strength++;
    
    return strength;
  }
}

/**
 * 日期工具類別 - 提供日期處理功能
 */
export class DateUtils {
  /**
   * 格式化日期
   * @param date 日期物件或時間戳
   * @param format 格式字串
   * @returns 格式化後的日期字串
   */
  static formatDate(date: Date | number, format: string = 'YYYY-MM-DD'): string {
    const d = typeof date === 'number' ? new Date(date) : date;
    
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    const hours = String(d.getHours()).padStart(2, '0');
    const minutes = String(d.getMinutes()).padStart(2, '0');
    const seconds = String(d.getSeconds()).padStart(2, '0');
    
    return format
      .replace('YYYY', String(year))
      .replace('MM', month)
      .replace('DD', day)
      .replace('HH', hours)
      .replace('mm', minutes)
      .replace('ss', seconds);
  }

  /**
   * 計算兩個日期之間的天數
   * @param startDate 開始日期
   * @param endDate 結束日期
   * @returns 天數差異
   */
  static daysBetween(startDate: Date, endDate: Date): number {
    const oneDay = 24 * 60 * 60 * 1000;
    const diffTime = Math.abs(endDate.getTime() - startDate.getTime());
    return Math.floor(diffTime / oneDay);
  }

  /**
   * 檢查是否為今天
   * @param date 日期
   * @returns 是否為今天
   */
  static isToday(date: Date): boolean {
    const today = new Date();
    return date.toDateString() === today.toDateString();
  }
}

/**
 * 陣列工具類別 - 提供陣列操作功能
 */
export class ArrayUtils {
  /**
   * 去除重複元素
   * @param array 陣列
   * @returns 去重後的陣列
   */
  static unique<T>(array: T[]): T[] {
    return [...new Set(array)];
  }

  /**
   * 陣列分塊
   * @param array 陣列
   * @param size 每塊大小
   * @returns 分塊後的陣列
   */
  static chunk<T>(array: T[], size: number): T[][] {
    const chunks: T[][] = [];
    for (let i = 0; i < array.length; i += size) {
      chunks.push(array.slice(i, i + size));
    }
    return chunks;
  }

  /**
   * 隨機打亂陣列
   * @param array 陣列
   * @returns 打亂後的陣列
   */
  static shuffle<T>(array: T[]): T[] {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  }
}

/**
 * 字串工具類別 - 提供字串操作功能
 */
export class StringUtils {
  /**
   * 產生唯一識別碼
   * @returns 售一識別碼
   */
  static generateId(): string {
    return Math.random().toString(36).substr(2, 9) + Date.now().toString(36);
  }

  /**
   * 截斷字串
   * @param str 字串
   * @param maxLength 最大長度
   * @param suffix 後綴
   * @returns 截斷後的字串
   */
  static truncate(str: string, maxLength: number, suffix: string = '...'): string {
    if (str.length <= maxLength) return str;
    return str.substring(0, maxLength - suffix.length) + suffix;
  }

  /**
   * 將字串轉換為駝峰命名
   * @param str 字串
   * @returns 駝峰命名字串
   */
  static toCamelCase(str: string): string {
    return str.replace(/([-_][a-z])/g, group =>
      group.toUpperCase().replace('-', '').replace('_', '')
    );
  }

  /**
   * 將字串轉換為蛇形命名
   * @param str 字串
   * @returns 蛇形命名字串
   */
  static toSnakeCase(str: string): string {
    return str.replace(/([A-Z])/g, '_$1').toLowerCase();
  }
}
