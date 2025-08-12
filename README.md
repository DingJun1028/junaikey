# JunAiKey_Omnikey_萬能系統_終焉奇點 — v0.1.0 skeleton

以《Jun.Ai.Key API 聖典》v6.0 三位一體理念與「奧義六式」流程為核心的最小可行骨架。

## 快速開始（本地）

1) 需求
- Node.js 20+
- npm 10+

2) 安裝
```bash
cp .env.example .env
npm ci
npm run dev
```

3) 訪問
- Health: http://localhost:8080/healthz
- Swagger UI: http://localhost:8080/api/docs
- OpenAPI JSON: http://localhost:8080/api/docs/json

4) 授權
- 受保護路由需在 Header 加入：`X-Sacred-Api-Key: <你的密鑰>`
- `.env` 內 `SACRED_API_KEY` 請務必改為非預設值

## Docker 本地觀測堆疊
```bash
docker-compose up --build
```
- API: http://localhost:8080
- Jaeger UI: http://localhost:16686

## 範例請求
```bash
curl -X POST http://localhost:8080/api/execute-sacred-command \
  -H "Content-Type: application/json" \
  -H "X-Sacred-Api-Key: replace-with-non-default-secret" \
  -d '{
    "command": {
      "endpoint": "process-note-creation",
      "params": {"noteContent":"這是一份關於 JunAiKey_Omnikey_萬能系統_終焉奇點 的筆記。"},
      "user": "PrimeArchitect",
      "context": "創建 AI 架構筆記"
    }
  }'
```

## NPM 指令
- `npm run dev` 開發啟動（熱重載）
- `npm run build && npm start` 編譯 + 生產模式啟動
- `npm run lint` 程式碼檢查
- `npm test` 單元測試
- `npm run openapi:gen` 由 openapi.yaml 生成 openapi.json

## 結構概覽
- `src/` 服務端主程式與奧義六式流程
- `config/` 環境可覆寫設定（YAML）
- `ops/` OTEL Collector 設定
- `.github/workflows/` CI 流程
- `openapi.yaml` API 規格源
- `docker-compose.yml` 本地觀測堆疊
- `db/schema.sql` Supabase 參考表結構（可選）

## 安全建議
- 切勿在版本庫提交真實密鑰
- 生產環境使用雲端密鑰管家（GitHub Secrets / AWS / GCP）
- 強制 90 天密鑰輪換

## 授權
MIT
