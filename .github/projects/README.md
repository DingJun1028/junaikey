# Projects 目錄

此目錄包含 GitHub Projects 相關的配置和說明文件。

## 目錄用途

`.github/projects/` 目錄用於存放與 GitHub Projects 相關的配置文件、模板和自動化腳本。雖然 GitHub Projects (beta) 無法通過配置文件自動創建，但我們可以在此目錄中保存相關的參考資料和說明文檔。

## 相關文件

詳細的 Projects 模板和使用說明請參考：

- **Projects 模板**：[docs/projects/PROJECTS_BETA_TEMPLATE.md](../../docs/projects/PROJECTS_BETA_TEMPLATE.md)
  - 包含 Documentation Roadmap (beta) 專案的完整配置模板
  - 定義了所有欄位、視圖和初始工作項目

- **使用說明**：[docs/PROJECTS_BETA_INSTRUCTIONS.md](../../docs/PROJECTS_BETA_INSTRUCTIONS.md)
  - 詳細的啟用和配置步驟
  - GraphQL API 使用範例
  - 手動操作指南

## 快速開始

1. 閱讀 [PROJECTS_BETA_INSTRUCTIONS.md](../../docs/PROJECTS_BETA_INSTRUCTIONS.md) 了解如何啟用和創建 Projects
2. 參考 [PROJECTS_BETA_TEMPLATE.md](../../docs/projects/PROJECTS_BETA_TEMPLATE.md) 查看建議的欄位和項目配置
3. 在倉庫 Settings 中啟用 Projects 功能
4. 使用 GitHub UI 或 GraphQL API 創建專案

## 注意事項

- Projects (beta) 需要在 GitHub Settings 中手動啟用
- 專案創建和配置需要倉庫管理員權限
- 建議使用 GraphQL API 進行批量操作和自動化
