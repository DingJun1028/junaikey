# JunAiKey 命名約定和規範

## 🎯 總體原則

### 核心理念
- **清晰性**: 名稱應清晰表達其用途和功能
- **一致性**: 遵循統一的命名約定
- **簡潔性**: 避免過於冗長或簡化的名稱
- **可讀性**: 使用有意義的單詞組合

### 命名語言
- **主要**: 英文（技術標準化）
- **輔助**: 中文註釋和文檔（提升可讀性）

## 📝 代碼命名約定

### TypeScript/JavaScript

#### 類別 (Classes)
- **格式**: PascalCase
- **範例**: `UserService`, `DataProcessor`, `EventBus`
- **規則**: 
  - 使用名詞或名詞短語
  - 每個單詞首字母大寫
  - 避免縮寫（除非是廣泛認知的縮寫）

#### 介面 (Interfaces)
- **格式**: PascalCase + 前綴 `I`
- **範例**: `IUserService`, `IDataProcessor`, `IEventBus`
- **規則**:
  - 前綴 `I` 表示介面
  - 其他規則與類別相同

#### 變量 (Variables)
- **格式**: camelCase
- **範例**: `userName`, `totalCount`, `isActive`
- **規則**:
  - 第一個單詞小寫，後續單詞首字母大寫
  - 使用有意義的名稱
  - 避免單字母變量（除迴圈計數器外）

#### 常量 (Constants)
- **格式**: UPPER_SNAKE_CASE
- **範例**: `MAX_RETRY_COUNT`, `API_BASE_URL`
- **規則**:
  - 全部大寫
  - 單詞間用下劃線分隔
  - 只用於不會改變的值

#### 函數/方法 (Functions/Methods)
- **格式**: camelCase
- **範例**: `getUserData`, `processRequest`, `calculateTotal`
- **規則**:
  - 使用動詞或動詞短語
  - 清晰表達操作行為
  - 避免過於簡化的名稱

#### 私有成員 (Private Members)
- **格式**: camelCase + 前綴 `_`
- **範例**: `_internalState`, `_privateMethod`
- **規則**:
  - 前綴 `_` 表示私有成員
  - 遵循變量命名規則

#### 參數 (Parameters)
- **格式**: camelCase
- **範例**: `requestData`, `userId`, `options`
- **規則**:
  - 清楚描述參數用途
  - 避免單字母參數名稱

#### 事件 (Events)
- **格式**: camelCase + 前綴 `on`
- **範例**: `onUserCreated`, `onDataLoaded`
- **規則**:
  - 使用事件觸發的動作
  - 包含受影響的對象

### 文件命名

#### TypeScript 文件
- **格式**: kebab-case
- **範例**: `user-service.ts`, `data-processor.ts`
- **規則**:
  - 全部小寫
  - 單詞間用連字符分隔
  - 反映文件內容和功能

#### 配置文件
- **格式**: kebab-case
- **範例**: `tsconfig.json`, `.eslintrc.json`
- **規則**:
  - 遵循框架或工具的約定

#### 文檔文件
- **格式**: kebab-case
- **範例**: `api-guide.md`, `deployment-guide.md`
- **規則**:
  - 包含文件類型和主題

## 🏗️ 架構組件命名

### 目錄結構
- **格式**: kebab-case 或 PascalCase（對於類別目錄）
- **範例**: 
  - `src/utils/`（工具類）
  - `src/services/`（服務類）
  - `src/models/`（模型類）
  - `src/components/`（組件類）

### 模塊命名
- **格式**: PascalCase
- **範例**: `UserServiceModule`, `DataProcessorModule`
- **規則**:
  - 明確表達模塊功能
  - 避免過於通用的名稱

### 服務層
- **格式**: `[功能]Service`
- **範例**: `UserService`, `AuthService`, `NotificationService`
- **規則**:
  - 以 `Service` 結尾
  - 表達具體業務功能

### 數據層
- **格式**: `[功能]Repository` 或 `[功能]Model`
- **範例**: `UserRepository`, `DataModel`
- **規則**:
  - Repository 用於數據訪問層
  - Model 用於數據結構定義

### API 相關
- **格式**: kebab-case
- **範例**: `/api/users`, `/api/v1/auth`
- **規則**:
  - RESTful 風格
  - 使用名詞複數形式
  - 版本控制使用 `v1`, `v2` 等

## 🗄️ 數據庫命名

### 表名
- **格式**: snake_case
- **範例**: `user_accounts`, `order_items`
- **規則**:
  - 全部小寫
  - 單詞間用下劃線分隔
  - 使用名詞複數形式
  - 避免保留字

### 列名
- **格式**: snake_case
- **範例**: `user_id`, `created_at`
- **規則**:
  - 遵循表名命名規則
  - 外鍵使用 `[表名]_id` 格式

### 索引名
- **格式**: `idx_[表名]_[列名]`
- **範例**: `idx_users_email`
- **規則**:
  - 以 `idx_` 開頭
  - 包含表名和列名

## 🧪 測試相關命名

### 測試文件
- **格式**: `[文件名].test.ts` 或 `[文件名].spec.ts`
- **範例**: `user-service.test.ts`, `data-processor.spec.ts`
- **規則**:
  - 與源文件同名
  - 添加 `.test.` 或 `.spec.` 後綴

### 測試用例
- **格式**: `should [行為] when [條件]`
- **範例**: `should return user when user exists`
- **規則**:
  - 描述測試的行為和條件
  - 使用 `should` 開頭

### 測試數據
- **格式**: `mock[對象名]` 或 `test[對象名]`
- **範例**: `mockUser`, `testData`
- **規則**:
  - 清楚表示是測試數據
  - 避免與生產數據混淆

## 🎨 UI/UX 命名

### CSS 類名
- **格式**: kebab-case
- **範例**: `.btn-primary`, `.container-fluid`
- **規則**:
  - 使用 BEM 方法論（可選）
  - 避免過於通用的名稱

### React 組件
- **格式**: PascalCase
- **範例**: `UserProfile`, `DataGrid`
- **規則**:
  - 首字母大寫
  - 描述組件功能

### Props 屬性
- **格式**: camelCase
- **範例**: `userId`, `isActive`
- **規則**:
  - 遵循 JavaScript 命名約定
  - 避免與內建屬性衝突

## 🔧 配置和環境變量

### 環境變量
- **格式**: UPPER_SNAKE_CASE
- **範例**: `NODE_ENV`, `DATABASE_URL`
- **規則**:
  - 全部大寫
  - 單詞間用下劃線分隔
  - 使用項目前綴（如 `JUNAIKEY_`）

### 配置文件鍵
- **格式**: kebab-case 或 camelCase
- **範例**: `api-version`, `databaseConfig`
- **規則**:
  - 保持一致性
  - 避免特殊字符

## 📚 錯誤和日誌命名

### 錯誤類型
- **格式**: PascalCase + `Error` 後綴
- **範例**: `ValidationError`, `AuthenticationError`
- **規則**:
  - 明確表達錯誤類型
  - 遵循類別命名規則

### 日誌級別
- **格式**: 全大寫
- **範例**: `DEBUG`, `INFO`, `WARN`, `ERROR`
- **規則**:
  - 遵循標準日誌級別
  - 保持一致性

### 日誌類別
- **格式**: PascalCase
- **範例**: `UserService`, `DatabaseConnection`
- **規則**:
  - 對應模塊或服務名稱
  - 便於日誌分類和過濾

## 🎯 最佳實踐建議

### 避免的情況
1. **縮寫過多**: 避免使用不直觀的縮寫
2. **過長名稱**: 保持名稱簡潔但有意義
3. **不一致**: 混用不同的命名風格
4. **數字前綴**: 避免使用 `func1`, `func2` 之類的名稱
5. **通用名稱**: 避免使用 `temp`, `data`, `info` 等過於通用的名稱

### 推薦做法
1. **使用詞典**: 統一術語和詞彙
2. **保持簡潔**: 在清晰的前提下保持簡潔
3. **考慌上下文**: 根據上下文選擇合適的名稱長度
4. **文檔化**: 對於複雜概念提供註釋
5. **重構**: 定期檢查和重命名不合理的名稱

### 檢查清單
- [ ] 名稱是否清晰表達用途？
- [ ] 是否遵循項目的命名約定？
- [ ] 是否避免使用魔術數字或硬編碼？
- [ ] 名稱長度是否適當？
- [ ] 是否與相關組件的名稱保持一致？

## 🔍 常見問題

### 問題：什麼時候使用縮寫？
**回答**：只有當縮寫是廣泛認知的時候才使用，如 `URL`, `HTTP`, `ID` 等。

### 問題：如何處理第三方庫的名稱？
**回答**：保持第三方庫的原有名稱，避免修改。

### 問題：常量和變量的區別？
**回答**：常量用於不會改變的值（如配置），變量用於可能改變的值（如運行時數據）。

### 問題：如何處理歷史代碼的不一致命名？
**回答**：在重構時逐步統一，避免一次性大規模修改。

### 問題：命名約定的例外情況？
**回答**：某些框架或庫可能有特定約定，應優先遵循框架約定。
