#!/bin/bash

# GitHub Projects (beta) 管理腳本
# 用途：快速管理 GitHub Projects 的常用操作
# 使用方式：./projects-manager.sh [command] [options]

set -e

# 顏色定義
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# 配置檢查
check_config() {
    if [ -z "$GITHUB_TOKEN" ]; then
        echo -e "${RED}錯誤: GITHUB_TOKEN 環境變數未設置${NC}"
        echo "請設置您的 GitHub Personal Access Token:"
        echo "export GITHUB_TOKEN='your_token_here'"
        exit 1
    fi
}

# GraphQL API 調用
graphql_query() {
    local query=$1
    curl -s -X POST https://api.github.com/graphql \
        -H "Authorization: bearer $GITHUB_TOKEN" \
        -H "Content-Type: application/json" \
        -d "{\"query\": \"$query\"}" | jq .
}

# 顯示使用說明
show_help() {
    cat << EOF
${GREEN}GitHub Projects (beta) 管理工具${NC}

${YELLOW}使用方式:${NC}
  ./projects-manager.sh [command] [options]

${YELLOW}命令:${NC}
  ${BLUE}list${NC}              列出所有專案
  ${BLUE}info${NC} <number>     查看專案詳情
  ${BLUE}create${NC} <name>     創建新專案
  ${BLUE}add-item${NC}          添加項目到專案
  ${BLUE}update-status${NC}     更新項目狀態
  ${BLUE}export${NC}            導出專案資料
  ${BLUE}help${NC}              顯示此幫助訊息

${YELLOW}環境變數:${NC}
  GITHUB_TOKEN         GitHub Personal Access Token (必需)
  GITHUB_OWNER         GitHub 用戶名或組織名 (預設: DingJun1028)
  GITHUB_REPO          倉庫名稱 (預設: junaikey)

${YELLOW}範例:${NC}
  # 列出所有專案
  ./projects-manager.sh list

  # 查看專案 #1 的詳情
  ./projects-manager.sh info 1

  # 創建新專案
  ./projects-manager.sh create "Documentation Roadmap"

  # 導出專案資料
  ./projects-manager.sh export > project-export.json

${YELLOW}需求:${NC}
  - curl
  - jq (JSON 處理工具)
  - GitHub Personal Access Token (具有 repo 和 project scope)

EOF
}

# 列出所有專案
list_projects() {
    echo -e "${BLUE}正在獲取專案列表...${NC}"
    
    local owner=${GITHUB_OWNER:-"DingJun1028"}
    local repo=${GITHUB_REPO:-"junaikey"}
    
    local query="query { repository(owner: \\\"$owner\\\", name: \\\"$repo\\\") { projectsV2(first: 10) { nodes { id title number url } } } }"
    
    local result=$(graphql_query "$query")
    
    echo -e "${GREEN}專案列表:${NC}"
    echo "$result" | jq -r '.data.repository.projectsV2.nodes[] | "  #\(.number) - \(.title)\n    URL: \(.url)"'
}

# 查看專案詳情
show_project_info() {
    local project_number=$1
    
    if [ -z "$project_number" ]; then
        echo -e "${RED}錯誤: 請提供專案編號${NC}"
        exit 1
    fi
    
    echo -e "${BLUE}正在獲取專案 #$project_number 的詳情...${NC}"
    
    local owner=${GITHUB_OWNER:-"DingJun1028"}
    local repo=${GITHUB_REPO:-"junaikey"}
    
    local query="query { repository(owner: \\\"$owner\\\", name: \\\"$repo\\\") { projectV2(number: $project_number) { id title number url shortDescription items(first: 10) { totalCount nodes { id type } } fields(first: 10) { nodes { ... on ProjectV2Field { id name } ... on ProjectV2SingleSelectField { id name options { id name } } } } } } }"
    
    local result=$(graphql_query "$query")
    
    echo -e "${GREEN}專案資訊:${NC}"
    echo "$result" | jq '.data.repository.projectV2'
}

# 創建新專案
create_project() {
    local title=$1
    
    if [ -z "$title" ]; then
        echo -e "${RED}錯誤: 請提供專案名稱${NC}"
        exit 1
    fi
    
    echo -e "${BLUE}正在創建專案: $title${NC}"
    
    local owner=${GITHUB_OWNER:-"DingJun1028"}
    local repo=${GITHUB_REPO:-"junaikey"}
    
    # 首先獲取 owner 和 repo 的 ID
    local query1="query { repository(owner: \\\"$owner\\\", name: \\\"$repo\\\") { id owner { id } } }"
    local result1=$(graphql_query "$query1")
    
    local owner_id=$(echo "$result1" | jq -r '.data.repository.owner.id')
    local repo_id=$(echo "$result1" | jq -r '.data.repository.id')
    
    if [ "$owner_id" == "null" ] || [ "$repo_id" == "null" ]; then
        echo -e "${RED}錯誤: 無法獲取倉庫資訊${NC}"
        exit 1
    fi
    
    # 創建專案
    local query2="mutation { createProjectV2(input: { ownerId: \\\"$owner_id\\\", title: \\\"$title\\\", repositoryId: \\\"$repo_id\\\" }) { projectV2 { id title number url } } }"
    
    local result2=$(graphql_query "$query2")
    
    if echo "$result2" | jq -e '.data.createProjectV2.projectV2' > /dev/null; then
        echo -e "${GREEN}✓ 專案創建成功！${NC}"
        echo "$result2" | jq '.data.createProjectV2.projectV2'
    else
        echo -e "${RED}✗ 專案創建失敗${NC}"
        echo "$result2" | jq '.errors'
    fi
}

# 添加項目到專案
add_item() {
    echo -e "${BLUE}添加項目到專案${NC}"
    echo -e "${YELLOW}此功能需要互動式輸入${NC}"
    
    read -p "專案 ID: " project_id
    read -p "項目標題: " title
    read -p "項目描述: " body
    
    local query="mutation { addProjectV2DraftIssue(input: { projectId: \\\"$project_id\\\", title: \\\"$title\\\", body: \\\"$body\\\" }) { projectV2Item { id } } }"
    
    local result=$(graphql_query "$query")
    
    if echo "$result" | jq -e '.data.addProjectV2DraftIssue' > /dev/null; then
        echo -e "${GREEN}✓ 項目添加成功！${NC}"
        echo "$result" | jq '.data.addProjectV2DraftIssue'
    else
        echo -e "${RED}✗ 項目添加失敗${NC}"
        echo "$result" | jq '.errors'
    fi
}

# 更新項目狀態
update_status() {
    echo -e "${BLUE}更新項目狀態${NC}"
    echo -e "${YELLOW}此功能需要互動式輸入${NC}"
    
    read -p "專案 ID: " project_id
    read -p "項目 ID: " item_id
    read -p "狀態欄位 ID: " field_id
    read -p "狀態選項 ID: " option_id
    
    local query="mutation { updateProjectV2ItemFieldValue(input: { projectId: \\\"$project_id\\\", itemId: \\\"$item_id\\\", fieldId: \\\"$field_id\\\", value: { singleSelectOptionId: \\\"$option_id\\\" } }) { projectV2Item { id } } }"
    
    local result=$(graphql_query "$query")
    
    if echo "$result" | jq -e '.data.updateProjectV2ItemFieldValue' > /dev/null; then
        echo -e "${GREEN}✓ 狀態更新成功！${NC}"
        echo "$result" | jq '.data.updateProjectV2ItemFieldValue'
    else
        echo -e "${RED}✗ 狀態更新失敗${NC}"
        echo "$result" | jq '.errors'
    fi
}

# 導出專案資料
export_project() {
    echo -e "${BLUE}正在導出專案資料...${NC}" >&2
    
    local owner=${GITHUB_OWNER:-"DingJun1028"}
    local repo=${GITHUB_REPO:-"junaikey"}
    
    local query="query { repository(owner: \\\"$owner\\\", name: \\\"$repo\\\") { projectsV2(first: 10) { nodes { id title number url items(first: 100) { nodes { id type content { ... on Issue { title number state } ... on PullRequest { title number state } ... on DraftIssue { title body } } } } fields(first: 20) { nodes { ... on ProjectV2Field { id name } ... on ProjectV2SingleSelectField { id name options { id name } } } } } } } }"
    
    graphql_query "$query"
    
    echo -e "${GREEN}✓ 資料導出完成${NC}" >&2
}

# 檢查依賴
check_dependencies() {
    if ! command -v curl &> /dev/null; then
        echo -e "${RED}錯誤: curl 未安裝${NC}"
        exit 1
    fi
    
    if ! command -v jq &> /dev/null; then
        echo -e "${RED}錯誤: jq 未安裝${NC}"
        echo "請安裝 jq: sudo apt-get install jq (Ubuntu) 或 brew install jq (macOS)"
        exit 1
    fi
}

# 主函數
main() {
    check_dependencies
    
    local command=${1:-help}
    
    # 幫助命令不需要 token
    if [ "$command" != "help" ] && [ "$command" != "--help" ] && [ "$command" != "-h" ]; then
        check_config
    fi
    
    case $command in
        list)
            list_projects
            ;;
        info)
            show_project_info "$2"
            ;;
        create)
            create_project "$2"
            ;;
        add-item)
            add_item
            ;;
        update-status)
            update_status
            ;;
        export)
            export_project
            ;;
        help|--help|-h)
            show_help
            ;;
        *)
            echo -e "${RED}未知命令: $command${NC}"
            echo "使用 './projects-manager.sh help' 查看可用命令"
            exit 1
            ;;
    esac
}

# 執行主函數
main "$@"
