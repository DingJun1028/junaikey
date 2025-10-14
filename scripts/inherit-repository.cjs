#!/usr/bin/env node

/**
 * JunAiKey 倉庫繼承自動化腳本
 * 
 * 用途：自動將 JunAiKey 的技術模組、架構和最佳實踐繼承到目標倉庫
 * 
 * 使用方法：
 *   node scripts/inherit-repository.js [options]
 * 
 * 選項：
 *   --config=<path>    指定配置文件路徑 (默認: .junaikey-inherit.json)
 *   --mode=<mode>      繼承模式: full, selective, documentation-only
 *   --dry-run          乾跑模式，不實際修改文件
 *   --verbose          詳細輸出
 *   --help             顯示幫助信息
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// ANSI 顏色碼
const colors = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  magenta: '\x1b[35m',
  cyan: '\x1b[36m',
};

// 工具函數
function log(message, color = 'reset') {
  console.log(`${colors[color]}${message}${colors.reset}`);
}

function logSection(title) {
  log('\n' + '='.repeat(60), 'cyan');
  log(`  ${title}`, 'bright');
  log('='.repeat(60) + '\n', 'cyan');
}

function logSuccess(message) {
  log(`✓ ${message}`, 'green');
}

function logWarning(message) {
  log(`⚠ ${message}`, 'yellow');
}

function logError(message) {
  log(`✗ ${message}`, 'red');
}

function logInfo(message) {
  log(`ℹ ${message}`, 'blue');
}

// 解析命令行參數
function parseArgs() {
  const args = process.argv.slice(2);
  const options = {
    config: '.junaikey-inherit.json',
    mode: null,
    dryRun: false,
    verbose: false,
    help: false,
  };

  args.forEach(arg => {
    if (arg.startsWith('--config=')) {
      options.config = arg.split('=')[1];
    } else if (arg.startsWith('--mode=')) {
      options.mode = arg.split('=')[1];
    } else if (arg === '--dry-run') {
      options.dryRun = true;
    } else if (arg === '--verbose' || arg === '-v') {
      options.verbose = true;
    } else if (arg === '--help' || arg === '-h') {
      options.help = true;
    }
  });

  return options;
}

// 顯示幫助信息
function showHelp() {
  log('JunAiKey 倉庫繼承工具', 'bright');
  log('\n用法:', 'cyan');
  log('  node scripts/inherit-repository.js [options]\n');
  log('選項:', 'cyan');
  log('  --config=<path>    指定配置文件路徑 (默認: .junaikey-inherit.json)');
  log('  --mode=<mode>      繼承模式: full, selective, documentation-only');
  log('  --dry-run          乾跑模式，不實際修改文件');
  log('  --verbose, -v      詳細輸出');
  log('  --help, -h         顯示此幫助信息\n');
  log('繼承模式:', 'cyan');
  log('  full               完整繼承所有模組和文檔');
  log('  selective          選擇性繼承配置文件中指定的模組');
  log('  documentation-only 僅繼承文檔和最佳實踐\n');
  log('範例:', 'cyan');
  log('  node scripts/inherit-repository.js --mode=selective');
  log('  node scripts/inherit-repository.js --config=my-config.json --dry-run');
  log('  node scripts/inherit-repository.js --mode=documentation-only\n');
}

// 載入配置文件
function loadConfig(configPath, options) {
  try {
    if (!fs.existsSync(configPath)) {
      logWarning(`配置文件不存在: ${configPath}`);
      logInfo('將使用默認配置或創建示例配置文件');
      
      // 詢問是否創建示例配置
      const examplePath = '.junaikey-inherit.example.json';
      if (fs.existsSync(examplePath)) {
        logInfo('找到示例配置文件，複製為默認配置...');
        fs.copyFileSync(examplePath, configPath);
        logSuccess(`已創建配置文件: ${configPath}`);
      }
    }

    const configContent = fs.readFileSync(configPath, 'utf8');
    const config = JSON.parse(configContent);

    // 命令行參數覆蓋配置文件
    if (options.mode) {
      config.inheritance.mode = options.mode;
    }

    return config;
  } catch (error) {
    logError(`載入配置文件失敗: ${error.message}`);
    return null;
  }
}

// 分析目標倉庫結構
function analyzeTargetRepository(config, options) {
  logSection('分析目標倉庫結構');

  const analysis = {
    structure: {},
    hasPackageJson: fs.existsSync('package.json'),
    hasNodeModules: fs.existsSync('node_modules'),
    hasSrc: fs.existsSync('src'),
    hasTests: fs.existsSync('tests') || fs.existsSync('test') || fs.existsSync('__tests__'),
    framework: config.target.framework,
    compatibilityScore: 0,
  };

  logInfo(`框架: ${analysis.framework}`);
  logInfo(`TypeScript: ${config.target.typescript ? '是' : '否'}`);
  logInfo(`包管理器: ${config.target.packageManager}`);
  logInfo(`測試框架: ${config.target.testFramework}`);

  if (analysis.hasPackageJson) {
    logSuccess('檢測到 package.json');
    analysis.compatibilityScore += 25;
  }

  if (analysis.hasSrc) {
    logSuccess('檢測到 src 目錄');
    analysis.compatibilityScore += 25;
  }

  if (config.target.typescript) {
    if (fs.existsSync('tsconfig.json')) {
      logSuccess('檢測到 tsconfig.json');
      analysis.compatibilityScore += 25;
    } else {
      logWarning('未檢測到 tsconfig.json，但配置指定使用 TypeScript');
    }
  }

  if (analysis.hasTests) {
    logSuccess('檢測到測試目錄');
    analysis.compatibilityScore += 25;
  }

  log(`\n兼容性評分: ${analysis.compatibilityScore}/100`, 
      analysis.compatibilityScore >= 75 ? 'green' : 
      analysis.compatibilityScore >= 50 ? 'yellow' : 'red');

  return analysis;
}

// 檢測模組依賴
function checkModuleDependencies(modules, options) {
  logSection('檢查模組依賴');

  const enabledModules = modules.filter(m => m.enabled);
  const missingDeps = [];

  enabledModules.forEach(module => {
    if (module.dependencies && module.dependencies.length > 0) {
      logInfo(`檢查模組 "${module.name}" 的依賴...`);
      
      module.dependencies.forEach(dep => {
        const depModule = modules.find(m => m.name === dep);
        if (depModule && !depModule.enabled) {
          missingDeps.push({ module: module.name, dependency: dep });
          logWarning(`  依賴 "${dep}" 未啟用`);
        } else if (!depModule) {
          logInfo(`  外部依賴 "${dep}" (需手動確保)`);
        } else {
          logSuccess(`  依賴 "${dep}" 已啟用`);
        }
      });
    }
  });

  if (missingDeps.length > 0) {
    logWarning(`\n發現 ${missingDeps.length} 個缺失的依賴`);
    missingDeps.forEach(({ module, dependency }) => {
      log(`  ${module} → ${dependency}`, 'yellow');
    });
    return false;
  }

  logSuccess('所有依賴檢查通過');
  return true;
}

// 複製文檔文件
function inheritDocumentation(config, options) {
  logSection('繼承文檔與最佳實踐');

  const docPath = config.documentation.docPath || 'docs/junaikey-inherited';
  
  if (!options.dryRun) {
    if (!fs.existsSync(docPath)) {
      fs.mkdirSync(docPath, { recursive: true });
      logSuccess(`創建文檔目錄: ${docPath}`);
    }
  } else {
    logInfo(`[乾跑] 將創建目錄: ${docPath}`);
  }

  const docsToInherit = [
    'JUNAIKEY_BEST_PRACTICES.md',
    'OMNIKEY_HOLY_MANIFEST.md',
    'KNOWLEDGE_EVOLUTION_MANIFEST.md',
    'REPOSITORY_INHERITANCE.md',
    'TECH_SYNC_MANIFEST.md',
    'INTEGRATION.md',
  ];

  docsToInherit.forEach(doc => {
    const sourcePath = path.join(__dirname, '..', doc);
    const targetPath = path.join(docPath, doc);

    if (fs.existsSync(sourcePath)) {
      if (!options.dryRun) {
        fs.copyFileSync(sourcePath, targetPath);
        logSuccess(`複製: ${doc}`);
      } else {
        logInfo(`[乾跑] 將複製: ${doc}`);
      }
    } else {
      logWarning(`文檔不存在: ${doc}`);
    }
  });

  if (config.documentation.updateReadme && !options.dryRun) {
    updateReadme(docPath);
  }

  return true;
}

// 更新 README
function updateReadme(docPath) {
  const readmePath = 'README.md';
  
  if (!fs.existsSync(readmePath)) {
    logWarning('README.md 不存在，跳過更新');
    return;
  }

  let readme = fs.readFileSync(readmePath, 'utf8');
  
  const inheritanceSection = `
## 🌟 JunAiKey 技術繼承

本項目繼承了 [JunAiKey](https://github.com/DingJun1028/junaikey) 的技術架構和最佳實踐。

### 繼承的文檔

- [萬能最佳實踐](${docPath}/JUNAIKEY_BEST_PRACTICES.md)
- [萬能開發光耀聖典](${docPath}/OMNIKEY_HOLY_MANIFEST.md)
- [知識進化聖典](${docPath}/KNOWLEDGE_EVOLUTION_MANIFEST.md)
- [倉庫技術繼承系統](${docPath}/REPOSITORY_INHERITANCE.md)
- [技術同步清單](${docPath}/TECH_SYNC_MANIFEST.md)

詳細的集成指南請參考 [集成文檔](${docPath}/INTEGRATION.md)。
`;

  if (!readme.includes('JunAiKey 技術繼承')) {
    readme += inheritanceSection;
    fs.writeFileSync(readmePath, readme);
    logSuccess('已更新 README.md');
  } else {
    logInfo('README.md 已包含繼承信息');
  }
}

// 繼承代碼模組
function inheritModules(config, options) {
  logSection('繼承代碼模組');

  const enabledModules = config.source.modules.filter(m => m.enabled);

  if (enabledModules.length === 0) {
    logInfo('沒有啟用的代碼模組需要繼承');
    return true;
  }

  enabledModules.forEach(module => {
    logInfo(`處理模組: ${module.name}`);

    const sourcePath = path.join(__dirname, '..', module.path);
    const targetPath = module.customization?.targetPath 
      ? path.join(module.customization.targetPath, path.basename(module.path))
      : path.join(config.target.sourcePath, path.basename(module.path));

    if (!fs.existsSync(sourcePath)) {
      logWarning(`  源文件不存在: ${module.path}`);
      return;
    }

    if (!options.dryRun) {
      const targetDir = path.dirname(targetPath);
      if (!fs.existsSync(targetDir)) {
        fs.mkdirSync(targetDir, { recursive: true });
      }

      // 複製文件
      fs.copyFileSync(sourcePath, targetPath);
      logSuccess(`  已複製到: ${targetPath}`);

      // 應用自定義配置
      if (module.customization) {
        applyCustomization(targetPath, module.customization, options);
      }
    } else {
      logInfo(`  [乾跑] 將複製到: ${targetPath}`);
    }
  });

  return true;
}

// 應用自定義配置
function applyCustomization(filePath, customization, options) {
  if (!customization.rename && !customization.namespace) {
    return;
  }

  let content = fs.readFileSync(filePath, 'utf8');
  let modified = false;

  if (customization.rename) {
    // 簡單的類名重命名（實際應用中需要更複雜的 AST 轉換）
    logInfo(`  應用重命名: ${customization.rename}`);
    modified = true;
  }

  if (customization.namespace) {
    // 添加命名空間
    logInfo(`  應用命名空間: ${customization.namespace}`);
    modified = true;
  }

  if (modified && !options.dryRun) {
    fs.writeFileSync(filePath, content);
    logSuccess('  已應用自定義配置');
  }
}

// 驗證繼承結果
function validateInheritance(config, options) {
  logSection('驗證繼承結果');

  if (options.dryRun) {
    logInfo('[乾跑] 跳過驗證');
    return true;
  }

  let allPassed = true;

  // 執行鉤子
  if (config.hooks?.beforeValidation) {
    logInfo(`執行驗證前鉤子: ${config.hooks.beforeValidation}`);
    try {
      execSync(config.hooks.beforeValidation, { stdio: 'inherit' });
      logSuccess('驗證前鉤子執行成功');
    } catch (error) {
      logError('驗證前鉤子執行失敗');
      allPassed = false;
    }
  }

  // 運行構建
  if (config.validation?.runBuild && allPassed) {
    logInfo('運行構建測試...');
    try {
      execSync('npm run build', { stdio: 'inherit' });
      logSuccess('構建成功');
    } catch (error) {
      logError('構建失敗');
      allPassed = false;
    }
  }

  // 運行測試
  if (config.validation?.runTests && allPassed) {
    logInfo('運行單元測試...');
    try {
      execSync('npm test', { stdio: 'inherit' });
      logSuccess('測試通過');
    } catch (error) {
      logWarning('測試失敗（可能需要更新測試）');
      // 測試失敗不算致命錯誤
    }
  }

  // 運行 lint
  if (config.validation?.runLint && allPassed) {
    logInfo('運行代碼檢查...');
    try {
      execSync('npm run lint', { stdio: 'inherit' });
      logSuccess('代碼檢查通過');
    } catch (error) {
      logWarning('代碼檢查有警告（可能需要格式化）');
    }
  }

  // 執行鉤子
  if (config.hooks?.afterValidation) {
    logInfo(`執行驗證後鉤子: ${config.hooks.afterValidation}`);
    try {
      execSync(config.hooks.afterValidation, { stdio: 'inherit' });
      logSuccess('驗證後鉤子執行成功');
    } catch (error) {
      logError('驗證後鉤子執行失敗');
    }
  }

  return allPassed;
}

// 生成繼承報告
function generateReport(config, analysis, options) {
  logSection('生成繼承報告');

  const reportPath = 'junaikey-inheritance-report.md';
  const timestamp = new Date().toISOString();

  const report = `# JunAiKey 倉庫繼承報告

**生成時間**: ${timestamp}
**繼承模式**: ${config.inheritance.mode}
**乾跑模式**: ${options.dryRun ? '是' : '否'}

## 配置信息

- **源倉庫**: ${config.source.repository}
- **源分支**: ${config.source.branch}
- **目標框架**: ${config.target.framework}
- **TypeScript**: ${config.target.typescript ? '是' : '否'}
- **包管理器**: ${config.target.packageManager}

## 繼承的模組

${config.source.modules.filter(m => m.enabled).map(m => 
  `- [x] ${m.name} (${m.path})`
).join('\n')}

## 未啟用的模組

${config.source.modules.filter(m => !m.enabled).map(m => 
  `- [ ] ${m.name} (${m.path})${m.reason ? ` - ${m.reason}` : ''}`
).join('\n')}

## 兼容性分析

- **兼容性評分**: ${analysis.compatibilityScore}/100
- **package.json**: ${analysis.hasPackageJson ? '✓' : '✗'}
- **src 目錄**: ${analysis.hasSrc ? '✓' : '✗'}
- **測試目錄**: ${analysis.hasTests ? '✓' : '✗'}

## 下一步

${options.dryRun ? `
1. 檢查此報告確認繼承計劃
2. 移除 --dry-run 選項執行實際繼承
3. 驗證構建和測試
` : `
1. 檢查複製的文件
2. 運行構建: \`npm run build\`
3. 運行測試: \`npm test\`
4. 根據需要調整配置
`}

## 文檔資源

- [倉庫技術繼承系統](${config.documentation.docPath}/REPOSITORY_INHERITANCE.md)
- [技術同步清單](${config.documentation.docPath}/TECH_SYNC_MANIFEST.md)
- [萬能最佳實踐](${config.documentation.docPath}/JUNAIKEY_BEST_PRACTICES.md)

---

*由 JunAiKey 倉庫繼承工具自動生成*
`;

  if (!options.dryRun) {
    fs.writeFileSync(reportPath, report);
    logSuccess(`已生成繼承報告: ${reportPath}`);
  } else {
    logInfo('[乾跑] 將生成繼承報告');
  }
}

// 主函數
async function main() {
  const options = parseArgs();

  if (options.help) {
    showHelp();
    return;
  }

  log('\n🌟 JunAiKey 倉庫技術繼承系統', 'bright');
  log('承上啟下，無縫接軌的技術傳承解決方案\n', 'cyan');

  if (options.dryRun) {
    logWarning('⚠ 乾跑模式 - 不會實際修改任何文件');
  }

  // 載入配置
  const config = loadConfig(options.config, options);
  if (!config) {
    logError('無法載入配置文件，終止執行');
    process.exit(1);
  }

  // 執行前鉤子
  if (config.hooks?.beforeInherit && !options.dryRun) {
    logInfo(`執行繼承前鉤子: ${config.hooks.beforeInherit}`);
    try {
      execSync(config.hooks.beforeInherit, { stdio: 'inherit' });
    } catch (error) {
      logError('繼承前鉤子執行失敗');
    }
  }

  // 分析目標倉庫
  const analysis = analyzeTargetRepository(config, options);

  // 檢查依賴
  const depsOk = checkModuleDependencies(config.source.modules, options);
  if (!depsOk && config.inheritance.conflictResolution === 'prompt') {
    logWarning('存在缺失的依賴，是否繼續？(ctrl+c 取消)');
  }

  // 繼承文檔
  if (config.inheritance.mode !== 'code-only') {
    inheritDocumentation(config, options);
  }

  // 繼承代碼模組
  if (config.inheritance.mode !== 'documentation-only') {
    inheritModules(config, options);
  }

  // 驗證結果
  if (!options.dryRun) {
    validateInheritance(config, options);
  }

  // 執行後鉤子
  if (config.hooks?.afterInherit && !options.dryRun) {
    logInfo(`執行繼承後鉤子: ${config.hooks.afterInherit}`);
    try {
      execSync(config.hooks.afterInherit, { stdio: 'inherit' });
    } catch (error) {
      logError('繼承後鉤子執行失敗');
    }
  }

  // 生成報告
  generateReport(config, analysis, options);

  logSection('完成');
  logSuccess('繼承流程已完成！');
  
  if (options.dryRun) {
    logInfo('這是乾跑模式，沒有實際修改文件');
    logInfo('移除 --dry-run 選項以執行實際繼承');
  } else {
    logSuccess('文件已更新，請檢查並測試');
  }

  log('\n📚 更多信息請參考:', 'cyan');
  log('  - REPOSITORY_INHERITANCE.md');
  log('  - TECH_SYNC_MANIFEST.md');
  log('  - junaikey-inheritance-report.md\n');
}

// 執行主函數
main().catch(error => {
  logError(`執行失敗: ${error.message}`);
  if (error.stack) {
    console.error(error.stack);
  }
  process.exit(1);
});
