<<<<<<< HEAD
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
=======
# Use an official Python runtime as a parent image
FROM python:3.11-slim

# Set environment variables
ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1

# Set the working directory in the container
WORKDIR /code

# Copy the requirements file into the container at /code
COPY ./app/requirements.txt /code/requirements.txt

# Install any needed packages specified in requirements.txt
RUN pip install --no-cache-dir --upgrade -r requirements.txt

# Copy the rest of the application code into the container at /code
COPY ./app /code/app
COPY ./scripts /code/scripts
COPY ./config /code/config

# Expose port 8080 to the outside world
EXPOSE 8080

# Command to run the application
# Use 0.0.0.0 to make it accessible from outside the container
# The default port for Cloud Run is 8080
CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8080"]
>>>>>>> 8352e3d1d83c6c8823a269d5109bccf640e4585c
