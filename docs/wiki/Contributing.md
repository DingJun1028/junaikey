# 🤝 JunAiKey 貢獻指南

歡迎您參與 JunAiKey 的開發！我們非常感激每一位貢獻者的付出。

## 🌟 貢獻方式

### 1. 代碼貢獻
- 修復 Bug
- 開發新功能
- 改進性能
- 重構代碼

### 2. 文檔貢獻
- 完善文檔
- 翻譯文檔
- 編寫教程
- 改進範例

### 3. 設計貢獻
- UI/UX 改進
- 圖標設計
- 視覺規範
- 交互優化

### 4. 測試貢獻
- 編寫測試
- Bug 報告
- 性能測試
- 用戶體驗測試

### 5. 社區貢獻
- 回答問題
- 分享經驗
- 組織活動
- 推廣項目

## 🚀 快速開始

### 1. Fork 項目

在 GitHub 上 Fork [JunAiKey 倉庫](https://github.com/DingJun1028/junaikey)

### 2. 克隆到本地

```bash
git clone https://github.com/YOUR_USERNAME/junaikey.git
cd junaikey
```

### 3. 添加上游倉庫

```bash
git remote add upstream https://github.com/DingJun1028/junaikey.git
```

### 4. 創建分支

```bash
git checkout -b feature/your-feature-name
# 或
git checkout -b fix/your-bug-fix
```

### 5. 安裝依賴

```bash
npm install
```

### 6. 開始開發

```bash
npm run dev
```

## 📋 開發流程

### 1. 同步最新代碼

```bash
git fetch upstream
git rebase upstream/main
```

### 2. 進行開發

- 遵循代碼規範
- 編寫清晰的提交信息
- 添加必要的測試
- 更新相關文檔

### 3. 運行測試

```bash
# 運行所有測試
npm test

# 運行 linter
npm run lint

# 類型檢查
npm run type-check
```

### 4. 提交代碼

```bash
git add .
git commit -m "feat: add new feature"
```

#### 提交信息規範

遵循 [Conventional Commits](https://www.conventionalcommits.org/) 規範：

```
<type>(<scope>): <subject>

<body>

<footer>
```

**類型（type）**：
- `feat`: 新功能
- `fix`: Bug 修復
- `docs`: 文檔更新
- `style`: 代碼格式（不影響功能）
- `refactor`: 重構
- `perf`: 性能優化
- `test`: 測試相關
- `chore`: 構建/工具相關

**範例**：
```
feat(sync): add AITable integration

Add support for syncing data to AITable platform.
Includes API client, data transformation, and error handling.

Closes #123
```

### 5. 推送到 GitHub

```bash
git push origin feature/your-feature-name
```

### 6. 創建 Pull Request

1. 前往你的 Fork 倉庫
2. 點擊 "Compare & pull request"
3. 填寫 PR 描述
4. 等待審查

## 📝 Pull Request 指南

### PR 標題

使用與提交信息相同的格式：
```
feat(sync): add AITable integration
```

### PR 描述模板

```markdown
## 變更類型
- [ ] Bug 修復
- [ ] 新功能
- [ ] 文檔更新
- [ ] 性能優化
- [ ] 其他

## 變更說明
<!-- 描述你的變更 -->

## 相關 Issue
<!-- 關閉的 Issue，例如：Closes #123 -->

## 測試
<!-- 如何測試你的變更 -->

## 截圖
<!-- 如果有 UI 變更，請添加截圖 -->

## 檢查清單
- [ ] 代碼遵循項目規範
- [ ] 已添加必要的測試
- [ ] 所有測試通過
- [ ] 已更新相關文檔
- [ ] 提交信息符合規範
```

## 🎨 代碼規範

### TypeScript 規範

```typescript
// ✅ 好的做法
interface User {
  id: string;
  name: string;
  email: string;
}

function getUserById(id: string): Promise<User> {
  return api.get(`/users/${id}`);
}

// ❌ 避免
function getData(x: any): any {
  return x.y;
}
```

### React 組件規範

```typescript
// ✅ 好的做法
interface ButtonProps {
  label: string;
  onClick: () => void;
  variant?: 'primary' | 'secondary';
  disabled?: boolean;
}

export const Button: React.FC<ButtonProps> = ({ 
  label, 
  onClick, 
  variant = 'primary',
  disabled = false 
}) => {
  return (
    <button 
      className={`btn btn-${variant}`}
      onClick={onClick}
      disabled={disabled}
    >
      {label}
    </button>
  );
};

// ❌ 避免
export function MyButton(props: any) {
  return <button onClick={props.click}>{props.text}</button>;
}
```

### 命名規範

- **組件**: PascalCase - `UserProfile.tsx`
- **Hook**: camelCase + use 前綴 - `useAuth.ts`
- **工具函數**: camelCase - `formatDate.ts`
- **常量**: UPPER_SNAKE_CASE - `MAX_RETRY_COUNT`
- **類型/接口**: PascalCase - `interface UserData`

## 🧪 測試規範

### 單元測試

```typescript
// ✅ 好的測試
describe('formatDate', () => {
  it('should format ISO date to readable format', () => {
    const result = formatDate('2025-10-16');
    expect(result).toBe('2025年10月16日');
  });

  it('should handle invalid date', () => {
    const result = formatDate('invalid');
    expect(result).toBe('Invalid Date');
  });
});
```

### 組件測試

```typescript
// ✅ 好的組件測試
describe('Button', () => {
  it('should call onClick when clicked', () => {
    const handleClick = jest.fn();
    const { getByText } = render(
      <Button label="Click me" onClick={handleClick} />
    );
    
    fireEvent.click(getByText('Click me'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('should be disabled when disabled prop is true', () => {
    const { getByRole } = render(
      <Button label="Click me" onClick={() => {}} disabled />
    );
    
    expect(getByRole('button')).toBeDisabled();
  });
});
```

## 📚 文檔規範

### 代碼註釋

```typescript
/**
 * 格式化日期為可讀字符串
 * 
 * @param date - ISO 格式的日期字符串
 * @param format - 日期格式（可選）
 * @returns 格式化後的日期字符串
 * 
 * @example
 * ```ts
 * formatDate('2025-10-16')  // '2025年10月16日'
 * formatDate('2025-10-16', 'MM/DD/YYYY')  // '10/16/2025'
 * ```
 */
export function formatDate(
  date: string, 
  format?: string
): string {
  // 實現邏輯
}
```

### Markdown 文檔

- 使用清晰的標題層級
- 添加目錄（長文檔）
- 使用代碼塊並標註語言
- 添加適當的示例
- 使用表格組織信息
- 添加鏈接到相關文檔

## 🏆 貢獻者級別系統

### 級別 1：覺醒者 (Awakened)
**條件**：首次貢獻

**權限**：
- 創建 Issue
- 參與討論
- 查看源代碼

**獎勵**：
- 貢獻者徽章
- 出現在貢獻者列表

### 級別 2：共鳴者 (Resonant)
**條件**：5 次有效貢獻

**權限**：
- 創建分支
- 參與 Code Review
- 標記 Issue

**獎勵**：
- 專屬頭像框
- 優先功能體驗

### 級別 3：融合者 (Fused)
**條件**：20 次有效貢獻

**權限**：
- 推送分支
- 關閉 Issue
- 管理 Labels

**獎勵**：
- 核心貢獻者認證
- 項目決策投票權

### 級別 4：傳說者 (Legendary)
**條件**：50 次有效貢獻

**權限**：
- 合併 PR
- 發布版本
- 管理 Milestones

**獎勵**：
- 維護者身份
- 官方推薦信

### 級別 5：永恆者 (Eternal)
**條件**：核心貢獻者，長期參與

**權限**：
- 所有權限
- 決策制定
- 團隊管理

**獎勵**：
- 永久核心團隊成員
- 項目共同所有權

## 🎁 貢獻獎勵

### 即時獎勵
- 每次合併的 PR 獲得經驗值
- 解鎖對應的元素精靈
- 化身等級提升

### 里程碑獎勵
- 10 次貢獻：專屬 T-shirt
- 25 次貢獻：定制周邊禮包
- 50 次貢獻：年度貢獻者獎金
- 100 次貢獻：永久榮譽稱號

### 特殊獎勵
- **最佳新人獎**：新貢獻者中最活躍的
- **最佳貢獻獎**：年度最有影響力的貢獻
- **社區之星**：最熱心幫助他人的成員
- **創新先鋒**：提出最有創意的功能

## 📞 獲取幫助

### 開發問題
- [GitHub Discussions](https://github.com/DingJun1028/junaikey/discussions) - 技術討論
- [Discord 社區](https://discord.gg/junaikey) - 實時交流
- [開發者文檔](./Development-Guide.md) - 開發指南

### Bug 報告
- [Issue Tracker](https://github.com/DingJun1028/junaikey/issues)
- 使用 Bug 報告模板
- 提供復現步驟

### 功能建議
- [Feature Requests](https://github.com/DingJun1028/junaikey/discussions/categories/ideas)
- 詳細描述使用場景
- 說明預期效果

## 📜 行為準則

### 我們的承諾

為了營造開放和友好的環境，我們承諾：

- 尊重所有貢獻者
- 接受建設性批評
- 關注對社區最有利的事情
- 對他人表現同理心

### 我們的標準

積極的行為包括：

- 使用友好和包容的語言
- 尊重不同的觀點和經驗
- 優雅地接受建設性批評
- 關注對社區最有利的事情
- 對其他社區成員表現同理心

不可接受的行為包括：

- 使用性化的語言或圖像
- 人身攻擊或侮辱性評論
- 公開或私下的騷擾
- 未經許可發布他人的私人信息
- 其他不道德或不專業的行為

## 🎯 貢獻重點領域

### 高優先級
- [ ] 性能優化
- [ ] Bug 修復
- [ ] 文檔完善
- [ ] 測試覆蓋率提升

### 中優先級
- [ ] 新功能開發
- [ ] UI/UX 改進
- [ ] 代碼重構
- [ ] 國際化支持

### 低優先級
- [ ] 實驗性功能
- [ ] 代碼註釋補充
- [ ] 範例項目
- [ ] 社區工具

## 📈 貢獻統計

查看你的貢獻統計：
- [貢獻者排行榜](https://github.com/DingJun1028/junaikey/graphs/contributors)
- [個人儀錶板](https://github.com/YOUR_USERNAME)

## 🙏 致謝

感謝所有為 JunAiKey 做出貢獻的人！

[![Contributors](https://contrib.rocks/image?repo=DingJun1028/junaikey)](https://github.com/DingJun1028/junaikey/graphs/contributors)

---

*期待您的貢獻！讓我們一起打造更好的 JunAiKey！* 🚀
