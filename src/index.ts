/**
 * Junaikey TypeScript + Markdown 開發工具鏈
 * 主要程式入口點
 */

import { Calculator } from './utils';

console.log('🚀 歡迎使用 Junaikey 開發工具鏈！');
console.log('📝 正在初始化 TypeScript 環境...');

// 創建計算器實例
const calc = new Calculator();

// 測試基本功能
console.log('\n🔢 測試計算器功能:');
console.log(`   5 + 3 = ${calc.add(5, 3)}`);
console.log(`   10 - 4 = ${calc.subtract(10, 4)}`);
console.log(`   6 × 7 = ${calc.multiply(6, 7)}`);
console.log(`   15 ÷ 3 = ${calc.divide(15, 3)}`);

// 測試進階功能
console.log('\n🎯 測試進階功能:');
try {
  console.log(`   √16 = ${calc.squareRoot(16)}`);
  console.log(`   2³ = ${calc.power(2, 3)}`);
  console.log(`   10% = ${calc.percentage(10, 100)}`);
} catch (error) {
  if (error instanceof Error) {
    console.log(`   ❌ 錯誤: ${error.message}`);
  }
}

// 測試錯誤處理
console.log('\n⚠️  測試錯誤處理:');
try {
  console.log(`   5 ÷ 0 = ${calc.divide(5, 0)}`);
} catch (error) {
  if (error instanceof Error) {
    console.log(`   ✅ 正確捕獲錯誤: ${error.message}`);
  }
}

// 顯示系統資訊
console.log('\n📊 系統資訊:');
console.log(`   Node.js 版本: ${process.version}`);
console.log(`   作業系統: ${process.platform}`);
console.log(`   架構: ${process.arch}`);

console.log('\n✨ TypeScript 環境初始化完成！');
console.log('📚 請查看 docs/guide.md 獲取更多使用說明');
console.log('🧪 運行 npm test 來執行測試');
console.log('🔍 運行 npm run lint 來檢查代碼質量');

export { Calculator };
