# 奧義：本質提純 - 使用官方 Node.js 20 作為基礎鏡像
FROM node:20-alpine AS base

# 奧義：聖典共鳴 - 設定工作目錄
WORKDIR /app
RUN npm install -g turbo

# 奧義：代理織網 - 複製依賴文件
COPY . .
RUN turbo prune --scope=nextn --docker

# --- Builder ---
FROM node:20-alpine AS builder
WORKDIR /app

# 奧義：神跡顯現 - 安裝依賴並建構
COPY . .
COPY --from=base /app/out/json/ .
COPY --from=base /app/out/pnpm-lock.yaml ./pnpm-lock.yaml
RUN npm install -g pnpm && pnpm install --frozen-lockfile
COPY --from=base /app/out/full/ .
RUN npm run build

# --- Runner ---
# 奧義：永恆刻印 - 創建最終的生產環境鏡像
FROM node:20-alpine AS runner
WORKDIR /app

# Don't run production as root
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs
USER nextjs

COPY --from=builder /app/apps/nextn/next.config.mjs .
COPY --from=builder /app/apps/nextn/package.json .

# Automatically leverage output traces to reduce image size
COPY --from=builder --chown=nextjs:nodejs /app/apps/nextn/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/apps/nextn/.next/static ./apps/nextn/.next/static
COPY --from=builder --chown=nextjs:nodejs /app/apps/nextn/public ./apps/nextn/public

CMD node apps/nextn/server.js
