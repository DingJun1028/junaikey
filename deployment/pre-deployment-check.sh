#!/bin/bash

# 🔍 JunAiKey 部署前檢查腳本
# 在推送代碼前運行此腳本，確保部署不會失敗

set -e

# 顏色定義
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# 計數器
PASSED=0
FAILED=0
WARNINGS=0

echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo -e "${BLUE}🔍 JunAiKey 部署前檢查${NC}"
echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo ""

# 函數：打印成功訊息
print_success() {
    echo -e "${GREEN}✅ $1${NC}"
    ((PASSED++))
}

# 函數：打印失敗訊息
print_error() {
    echo -e "${RED}❌ $1${NC}"
    ((FAILED++))
}

# 函數：打印警告訊息
print_warning() {
    echo -e "${YELLOW}⚠️  $1${NC}"
    ((WARNINGS++))
}

# 函數：打印資訊訊息
print_info() {
    echo -e "${BLUE}ℹ️  $1${NC}"
}

# 檢查 1: Git 狀態
echo -e "\n${BLUE}━━━ 1️⃣  檢查 Git 狀態 ━━━${NC}"
if [ -d .git ]; then
    print_success "Git 倉庫存在"
    
    # 檢查未提交的更改
    if [ -n "$(git status --porcelain)" ]; then
        print_warning "有未提交的更改，請先提交"
        git status --short
    else
        print_success "沒有未提交的更改"
    fi
    
    # 檢查當前分支
    CURRENT_BRANCH=$(git branch --show-current)
    print_info "當前分支: $CURRENT_BRANCH"
    
    # 檢查與遠端的差異
    git fetch origin --quiet 2>/dev/null || true
    BEHIND=$(git rev-list --count HEAD..origin/$CURRENT_BRANCH 2>/dev/null || echo "0")
    AHEAD=$(git rev-list --count origin/$CURRENT_BRANCH..HEAD 2>/dev/null || echo "0")
    
    if [ "$BEHIND" -gt 0 ]; then
        print_warning "本地落後遠端 $BEHIND 個提交"
    fi
    
    if [ "$AHEAD" -gt 0 ]; then
        print_info "本地領先遠端 $AHEAD 個提交（待推送）"
    fi
    
    if [ "$BEHIND" -eq 0 ] && [ "$AHEAD" -eq 0 ]; then
        print_success "與遠端同步"
    fi
else
    print_error "不是 Git 倉庫"
fi

# 檢查 2: Node.js 和 npm
echo -e "\n${BLUE}━━━ 2️⃣  檢查開發環境 ━━━${NC}"
if command -v node &> /dev/null; then
    NODE_VERSION=$(node --version)
    print_success "Node.js 已安裝: $NODE_VERSION"
    
    # 檢查 Node.js 版本
    NODE_MAJOR=$(echo $NODE_VERSION | cut -d'.' -f1 | sed 's/v//')
    if [ "$NODE_MAJOR" -ge 18 ]; then
        print_success "Node.js 版本符合要求 (>= 18)"
    else
        print_error "Node.js 版本過低，需要 >= 18"
    fi
else
    print_error "Node.js 未安裝"
fi

if command -v npm &> /dev/null; then
    NPM_VERSION=$(npm --version)
    print_success "npm 已安裝: $NPM_VERSION"
else
    print_error "npm 未安裝"
fi

# 檢查 3: package.json 和依賴
echo -e "\n${BLUE}━━━ 3️⃣  檢查依賴項 ━━━${NC}"
if [ -f package.json ]; then
    print_success "package.json 存在"
    
    if [ -f package-lock.json ]; then
        print_success "package-lock.json 存在"
    else
        print_warning "package-lock.json 不存在，建議運行 'npm install'"
    fi
    
    # 檢查 node_modules
    if [ -d node_modules ]; then
        print_success "node_modules 目錄存在"
        
        # 檢查依賴是否同步
        if npm ci --dry-run &> /dev/null; then
            print_success "依賴項已同步"
        else
            print_warning "依賴項可能不同步，建議運行 'npm ci'"
        fi
    else
        print_error "node_modules 不存在，請運行 'npm install'"
    fi
    
    # 檢查缺失的依賴（如果安裝了 depcheck）
    if command -v depcheck &> /dev/null; then
        print_info "正在檢查缺失的依賴..."
        DEPCHECK_OUTPUT=$(depcheck --json 2>/dev/null || echo "{}")
        MISSING_COUNT=$(echo "$DEPCHECK_OUTPUT" | grep -o '"missing":{[^}]*}' | grep -o ':' | wc -l)
        
        if [ "$MISSING_COUNT" -gt 1 ]; then
            print_error "發現缺失的依賴項，請查看 depcheck 輸出"
            depcheck 2>/dev/null || true
        else
            print_success "沒有發現缺失的依賴項"
        fi
    else
        print_info "depcheck 未安裝，跳過深度依賴檢查"
        print_info "可選：npm install -g depcheck"
    fi
else
    print_error "package.json 不存在"
fi

# 檢查 4: 構建測試
echo -e "\n${BLUE}━━━ 4️⃣  測試構建 ━━━${NC}"
if [ -f package.json ]; then
    # 檢查是否有 build 腳本
    if grep -q '"build"' package.json; then
        print_info "正在運行構建..."
        if npm run build &> /tmp/build-output.log; then
            print_success "構建成功"
            rm -f /tmp/build-output.log
        else
            print_error "構建失敗，請查看錯誤："
            tail -n 20 /tmp/build-output.log
            rm -f /tmp/build-output.log
        fi
    else
        print_warning "未找到 build 腳本"
    fi
else
    print_error "無法測試構建：package.json 不存在"
fi

# 檢查 5: 測試
echo -e "\n${BLUE}━━━ 5️⃣  運行測試 ━━━${NC}"
if [ -f package.json ]; then
    if grep -q '"test"' package.json; then
        print_info "正在運行測試..."
        if npm test &> /tmp/test-output.log; then
            print_success "測試通過"
            rm -f /tmp/test-output.log
        else
            # 檢查是否是因為沒有測試
            if grep -q "no test specified" /tmp/test-output.log; then
                print_warning "沒有配置測試"
            else
                print_error "測試失敗，請查看錯誤："
                tail -n 20 /tmp/test-output.log
            fi
            rm -f /tmp/test-output.log
        fi
    else
        print_warning "未找到 test 腳本"
    fi
else
    print_error "無法運行測試：package.json 不存在"
fi

# 檢查 6: Lint（可選）
echo -e "\n${BLUE}━━━ 6️⃣  代碼質量檢查 ━━━${NC}"
if [ -f package.json ]; then
    if grep -q '"lint"' package.json; then
        print_info "正在運行 lint..."
        if npm run lint &> /tmp/lint-output.log; then
            print_success "Lint 檢查通過"
            rm -f /tmp/lint-output.log
        else
            print_warning "Lint 檢查失敗或有警告"
            tail -n 10 /tmp/lint-output.log
            rm -f /tmp/lint-output.log
        fi
    else
        print_info "未配置 lint，跳過"
    fi
fi

# 檢查 7: GitHub Secrets（僅提醒）
echo -e "\n${BLUE}━━━ 7️⃣  GitHub Secrets 提醒 ━━━${NC}"
print_info "請確保以下 Secrets 已在 GitHub 中設置："
echo "   • SSH_PRIVATE_KEY - SSH 私鑰"
echo "   • SERVER_IP - 伺服器 IP 地址"
echo "   • SERVER_USER - SSH 登入用戶名"
echo "   • SERVER_PATH - 部署目錄路徑（可選）"
print_info "檢查方法：前往 GitHub 倉庫 → Settings → Secrets and variables → Actions"

# 檢查 8: SSH 連接測試（可選）
echo -e "\n${BLUE}━━━ 8️⃣  SSH 連接測試（可選）━━━${NC}"
if [ -f ~/.ssh/junaikey_deploy ]; then
    print_info "找到 SSH 金鑰: ~/.ssh/junaikey_deploy"
    
    # 讀取用戶輸入
    read -p "是否測試 SSH 連接？[y/N] " -n 1 -r
    echo
    if [[ $REPLY =~ ^[Yy]$ ]]; then
        read -p "請輸入 SERVER_USER: " SERVER_USER
        read -p "請輸入 SERVER_IP: " SERVER_IP
        
        if [ -n "$SERVER_USER" ] && [ -n "$SERVER_IP" ]; then
            print_info "正在測試 SSH 連接..."
            if ssh -i ~/.ssh/junaikey_deploy -o ConnectTimeout=5 -o StrictHostKeyChecking=no \
                ${SERVER_USER}@${SERVER_IP} "echo 'SSH 連接成功'" 2>/dev/null; then
                print_success "SSH 連接測試成功"
            else
                print_error "SSH 連接失敗"
            fi
        fi
    else
        print_info "跳過 SSH 連接測試"
    fi
else
    print_info "未找到 SSH 金鑰，跳過 SSH 連接測試"
    print_info "如需測試，請確保 SSH 金鑰位於 ~/.ssh/junaikey_deploy"
fi

# 總結
echo -e "\n${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo -e "${BLUE}📊 檢查總結${NC}"
echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo -e "${GREEN}✅ 通過: $PASSED${NC}"
echo -e "${YELLOW}⚠️  警告: $WARNINGS${NC}"
echo -e "${RED}❌ 失敗: $FAILED${NC}"
echo ""

if [ $FAILED -eq 0 ]; then
    echo -e "${GREEN}🎉 所有必需檢查都通過了！${NC}"
    echo -e "${GREEN}✨ 您的代碼已準備好部署${NC}"
    echo ""
    echo -e "下一步："
    echo "  1. git add ."
    echo "  2. git commit -m \"Your commit message\""
    echo "  3. git push origin main"
    echo ""
    exit 0
else
    echo -e "${RED}⚠️  發現 $FAILED 個問題，建議修復後再部署${NC}"
    echo ""
    echo -e "建議："
    echo "  • 查看上方的錯誤訊息"
    echo "  • 修復所有標記為 ❌ 的問題"
    echo "  • 再次運行此腳本確認"
    echo "  • 參考：deployment/DEPLOYMENT_BEST_PRACTICES.md"
    echo ""
    exit 1
fi
