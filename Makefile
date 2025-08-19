# ====================================================================
# JunAiKey 智慧總體 主控程序 (MCP) v5.0
# ====================================================================

SHELL := /usr/bin/env bash
.ONESHELL:
.SHELLFLAGS := -eu -o pipefail -c
MAKEFLAGS += --no-builtin-rules
.DEFAULT_GOAL := help

# ---------------- 基礎變數區 ----------------

PROJECT_DIR ?= junaikey-system
REPO_URL ?= https://github.com/DingJun1028/junaikey-omnikey.git
REPO_BRANCH ?= main
PYTHON ?= python3
VENV_DIR ?= .venv
API_SERVICE ?= api-service
DOCKER_COMPOSE ?= docker compose
BUILD_PARALLEL ?= 1
DOCKER_BUILDKIT ?= 1
PULL_LATEST ?= 1
CI ?= 0
LOG_LINES ?= 150
HEALTHCHECK_ENDPOINT ?= http://localhost:8080/health
TIMESTAMP := $(shell date +'%Y-%m-%d_%H-%M-%S')

# ---------------- 顏色與格式 ----------------

ifeq ($(CI),1)
NO_COLOR :=
BOLD :=
WARN :=
OK :=
ERR :=
else
NO_COLOR := \033[0m
BOLD := \033[1m
OK := \033[32m✔\033[0m
WARN := \033[33m⚠\033[0m
ERR := \033[31m✘\033[0m
CYAN := \033[36m
endif

define banner
@echo ""
@echo "$(BOLD)➤ $(1)$(NO_COLOR)"
@echo ""
endef

# ---------------- 檢查前置 ----------------

.PHONY: preflight
preflight:
	$(call banner,環境前置檢查 (Preflight))
	command -v git >/dev/null 2>&1 || (echo "$(ERR) 缺少 git"; exit 1)
	command -v docker >/dev/null 2>&1 || (echo "$(ERR) 缺少 docker"; exit 1)
	$(DOCKER_COMPOSE) version >/dev/null 2>&1 || (echo "$(ERR) 缺少 docker compose"; exit 1)
	@if [ ! -d "$(PROJECT_DIR)" ]; then echo "✦ 初始化：克隆 $(REPO_URL) -> $(PROJECT_DIR)"; git clone -b $(REPO_BRANCH) $(REPO_URL) $(PROJECT_DIR); elif [ "$(PULL_LATEST)" = "1" ]; then echo "✦ 更新：進入 $(PROJECT_DIR) 拉取最新"; cd $(PROJECT_DIR) && git fetch --all --quiet && git pull --rebase --autostash --quiet || true; else echo "✦ 跳過更新 (PULL_LATEST=0)"; fi
	@echo "$(OK) Preflight 完成"

# ---------------- 核心職業：Architect (總統籌) ----------------

.PHONY: architect-deploy deploy
architect-deploy: preflight alchemist-clean genesis-weaver-build agentus-start
	$(call banner,第一建築師 完成創世圓舞曲)
	@echo "$(OK) JunAiKey 智慧總體部署完成"
deploy: architect-deploy

# ---------------- 熵減煉金師：清理 ----------------

.PHONY: alchemist-clean clean soft-clean deep-clean
alchemist-clean: soft-clean

soft-clean:
	$(call banner,熵減煉金師 Soft Clean)
	@echo "✦ 停止容器 (ignore errors)"
	@$(DOCKER_COMPOSE) down --remove-orphans >/dev/null 2>&1 || true
	@echo "✦ 移除暫存虛擬環境與編譯遺留"
	@rm -rf $(VENV_DIR) $(PROJECT_DIR)/.pytest_cache $(PROJECT_DIR)/dist || true
	@find . -type d -name '**pycache**' -prune -exec rm -rf {} + 2>/dev/null || true
	@echo "$(OK) Soft Clean 完成"

deep-clean:
	$(call banner,熵減煉金師 Deep Clean)
	@$(DOCKER_COMPOSE) down -v --remove-orphans || true
	@docker image prune -f || true
	@docker builder prune -f || true
	@rm -rf $(PROJECT_DIR) $(VENV_DIR)
	@echo "$(OK) Deep Clean 完成 (鏡像/Volumes 亦已處理)"

clean: soft-clean

# ---------------- 創世編織者：構建 ----------------

.PHONY: genesis-weaver-build build
genesis-weaver-build: preflight
	$(call banner,創世編織者 編織神聖代碼契約)
	@echo "✦ 設定 BuildKit: DOCKER_BUILDKIT=$(DOCKER_BUILDKIT)"
	@export DOCKER_BUILDKIT=$(DOCKER_BUILDKIT)
	@if [ "$(BUILD_PARALLEL)" = "1" ]; then echo "✦ 啟用併行構建 (如果 docker compose 支援)"; fi
	@$(DOCKER_COMPOSE) build
	@echo "$(OK) 系統骨架與容器鏡像已鑄造完成"
build: genesis-weaver-build

# ---------------- 代理執行官：啟動 ----------------

.PHONY: agentus-start start up
agentus-start:
	$(call banner,代理執行官 啟動代理網絡)
	@$(DOCKER_COMPOSE) up -d
	@echo "$(OK) 萬能代理網絡已啟動"
start: agentus-start
up: agentus-start

# ---------------- 真理探測者：監控 ----------------

.PHONY: veritas-monitor logs tail
veritas-monitor:
	$(call banner,真理探測者 監控日誌)
	@$(DOCKER_COMPOSE) logs -f --tail=$(LOG_LINES)
logs: veritas-monitor
tail: veritas-monitor

# ---------------- 秩序守衛者：安全 ----------------

.PHONY: aegis-secure security-audit
aegis-secure:
	$(call banner,秩序守衛者 安全域審視)
	@if $(DOCKER_COMPOSE) exec -T $(API_SERVICE) bash -c "npm run | grep -q security-audit"; then $(DOCKER_COMPOSE) exec -T $(API_SERVICE) npm run security-audit; else echo "$(WARN) 未定義 npm run security-audit，跳過 (可添加)"; fi
	@echo "$(OK) 安全檢查流程完成"
security-audit: aegis-secure

# ---------------- 符文連結師：API 外部連通性 ----------------

.PHONY: rune-binder-check-api api-check
rune-binder-check-api:
	$(call banner,符文連結師 外部 API 連線檢測)
	@if $(DOCKER_COMPOSE) ps | grep -q $(API_SERVICE); then if $(DOCKER_COMPOSE) exec -T $(API_SERVICE) test -f check_api_connections.py; then $(DOCKER_COMPOSE) exec -T $(API_SERVICE) $(PYTHON) check_api_connections.py; else echo "$(WARN) 未找到 check_api_connections.py，請後續加入實作"; fi; else echo "$(ERR) 服務 $(API_SERVICE) 未啟動"; exit 1; fi
	@echo "$(OK) 外部 API 連結檢測階段結束"
api-check: rune-binder-check-api

# ---------------- 啓蒙導師：文檔生成 ----------------

.PHONY: luminar-document docs
luminar-document:
	$(call banner,啓蒙導師 生成啟蒙詩篇)
	@if $(DOCKER_COMPOSE) exec -T $(API_SERVICE) test -f generate_docs.py; then $(DOCKER_COMPOSE) exec -T $(API_SERVICE) $(PYTHON) generate_docs.py; else echo "$(WARN) generate_docs.py 缺失：可建立 scripts/generate_docs.py"; fi
	@echo "$(OK) 文檔生成階段完成"
docs: luminar-document

# ---------------- 哨兵 (Sentinel)：健康檢測 ----------------

.PHONY: sentinel-health health
sentinel-health:
	$(call banner,哨兵 Sentinel 健康巡檢)
	@echo "✦ 檢查健康端點: $(HEALTHCHECK_ENDPOINT)"
	@set +e; \
	status=$$(curl -s -o /dev/null -w '%{http_code}' "$(HEALTHCHECK_ENDPOINT)" || true); \
	if [ "$$status" = "200" ]; then echo "$(OK) Healthcheck 通過 (200)"; else echo "$(ERR) Healthcheck 失敗 (HTTP $$status)"; exit 1; fi
health: sentinel-health

# ---------------- 預留：Oracle (將來智能診斷) ----------------

.PHONY: oracle-diagnose
oracle-diagnose:
	$(call banner,Oracle 預留節點)
	@echo "$(WARN) Oracle 智能診斷尚未啟動，未來版本將注入 AI 報告。"

# ---------------- 幫助頁 ----------------

.PHONY: help
help:
	@echo ""
	@echo "$(BOLD)JunAiKey MCP 指令矩陣$(NO_COLOR)"
	@echo " architect-deploy : 全流程部署（清理→構建→啟動）"
	@echo " alchemist-clean : Soft Clean（不刪 volumes）"
	@echo " deep-clean : 刪容器+鏡像+Volumes+源碼目錄"
	@echo " genesis-weaver-build: 構建/重建鏡像"
	@echo " agentus-start : 啟動代理網絡 (docker compose up -d)"
	@echo " veritas-monitor : 追蹤日誌 (tail=$(LOG_LINES))"
	@echo " aegis-secure : 安全稽核（存在則執行 security-audit）"
	@echo " rune-binder-check-api : 外部 API 連線檢查"
	@echo " luminar-document : 文檔生成（generate_docs.py）"
	@echo " sentinel-health : 健康檢測 (HEALTHCHECK_ENDPOINT)"
	@echo " oracle-diagnose : 預留智能診斷節點"
	@echo ""
	@echo "$(BOLD)環境變數可覆蓋：$(NO_COLOR)"
	@echo " PROJECT_DIR, REPO_URL, REPO_BRANCH, API_SERVICE, PULL_LATEST"
	@echo " LOG_LINES, HEALTHCHECK_ENDPOINT, BUILD_PARALLEL, DOCKER_BUILDKIT"
	@echo ""
	@echo "示例： PULL_LATEST=0 LOG_LINES=50 make veritas-monitor"
	@echo ""
