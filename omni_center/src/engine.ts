import * as fs from 'fs';
import * as path from 'path';

// ==================================================
//  「創世引擎」 (Genesis Engine) v2.0 (TS)
//  與「萬能中心」互動的自動化腳本
// ==================================================

const BLUEPRINT_PATH = path.join(__dirname, 'blueprints');

function printUsage(): void {
  console.log("用法: ts-node src/engine.ts <command> [arguments]");
  console.log("");
  console.log("指令:");
  console.log("  list              列出「藍圖專區」中的所有藍圖");
  console.log("  validate <name>   驗證指定藍圖的結構 (通過導入檢查)");
  console.log("  deploy <name>     模擬將藍圖提交至生產管線");
  console.log("");
}

async function listBlueprints(): Promise<void> {
  console.log("正在列出「藍圖專區」中的所有藍圖...");
  try {
    const files = fs.readdirSync(BLUEPRINT_PATH);
    files.forEach(file => console.log(file));
  } catch (error) {
    console.error("錯誤: 無法讀取藍圖專區:", error);
  }
}

async function validateBlueprint(name: string): Promise<void> {
  console.log(`正在驗證藍圖 '${name}'...`);
  const filePath = path.join(BLUEPRINT_PATH, name);

  if (!fs.existsSync(filePath)) {
    console.error(`錯誤: 找不到藍圖 '${name}'。`);
    return;
  }

  try {
    // 動態導入模組。如果成功，代表文件語法正確且可被解析。
    await import(filePath);
    console.log(`驗證成功: '${name}' 是一個有效的 TypeScript 模組。`);
  } catch (error) {
    console.error(`驗證失敗: '${name}' 導入時發生錯誤。`, error);
  }
}

async function deployBlueprint(name: string): Promise<void> {
  console.log(`正在部署藍圖 '${name}'...`);
  const filePath = path.join(BLUEPRINT_PATH, name);

  if (!fs.existsSync(filePath)) {
    console.error(`錯誤: 找不到藍圖 '${name}'。`);
    return;
  }

  console.log("...");
  await new Promise(res => setTimeout(res, 500));
  console.log("模擬提交至視覺化引擎...");
  await new Promise(res => setTimeout(res, 500));
  console.log("部署流程完成 (模擬)。");
}


async function main() {
  const [,, command, blueprintName] = process.argv;

  if (!command) {
    console.error("錯誤: 未提供指令。");
    printUsage();
    process.exit(1);
  }

  switch (command) {
    case 'list':
      await listBlueprints();
      break;
    case 'validate':
      if (!blueprintName) {
        console.error("錯誤: 'validate' 指令需要提供藍圖名稱。");
        process.exit(1);
      }
      await validateBlueprint(blueprintName);
      break;
    case 'deploy':
      if (!blueprintName) {
        console.error("錯誤: 'deploy' 指令需要提供藍圖名稱。");
        process.exit(1);
      }
      await deployBlueprint(blueprintName);
      break;
    default:
      console.error(`錯誤: 未知的指令 '${command}'。`);
      printUsage();
      process.exit(1);
  }
}

main();
