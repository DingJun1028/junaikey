#!/bin/bash

# One-click PR helper script for JunaiKey
# Creates feature branch, commits staged changes, pushes, and opens PR

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
PURPLE='\033[0;35m'
CYAN='\033[0;36m'
NC='\033[0m' # No Color

# Helper functions
print_header() {
    echo -e "${PURPLE}🚀 JunaiKey One-Click PR Helper${NC}"
    echo -e "${PURPLE}===============================${NC}"
    echo ""
}

print_success() {
    echo -e "${GREEN}✅ $1${NC}"
}

print_error() {
    echo -e "${RED}❌ $1${NC}"
}

print_warning() {
    echo -e "${YELLOW}⚠️ $1${NC}"
}

print_info() {
    echo -e "${BLUE}ℹ️ $1${NC}"
}

# Check prerequisites
check_prerequisites() {
    print_info "Checking prerequisites..."
    
    # Check if we're in a git repository
    if ! git rev-parse --git-dir > /dev/null 2>&1; then
        print_error "Not in a git repository"
        exit 1
    fi
    
    # Check if GitHub CLI is installed
    if ! command -v gh &> /dev/null; then
        print_warning "GitHub CLI (gh) not found"
        print_info "Install with: brew install gh (macOS) or see https://cli.github.com/"
        print_info "Will create branch and push, but you'll need to create PR manually"
        USE_GH=false
    else
        # Check if authenticated
        if ! gh auth status &> /dev/null; then
            print_warning "GitHub CLI not authenticated"
            print_info "Run: gh auth login"
            USE_GH=false
        else
            USE_GH=true
        fi
    fi
    
    # Check if there are staged changes
    if ! git diff --cached --quiet; then
        STAGED_FILES=$(git diff --cached --name-only | wc -l)
        print_success "Found $STAGED_FILES staged file(s)"
    else
        print_error "No staged changes found"
        print_info "Stage your changes first with: git add <files>"
        exit 1
    fi
}

# Get branch name from user
get_branch_name() {
    echo -e "${CYAN}Enter branch name (or press Enter for auto-generated):${NC}"
    read -r BRANCH_NAME
    
    if [[ -z "$BRANCH_NAME" ]]; then
        # Auto-generate branch name
        TIMESTAMP=$(date +"%Y%m%d-%H%M%S")
        CURRENT_USER=$(git config user.name | tr ' ' '-' | tr '[:upper:]' '[:lower:]')
        BRANCH_NAME="feature/${CURRENT_USER}-${TIMESTAMP}"
        print_info "Auto-generated branch name: $BRANCH_NAME"
    fi
}

# Get commit message
get_commit_message() {
    echo -e "${CYAN}Enter commit message:${NC}"
    read -r COMMIT_MESSAGE
    
    if [[ -z "$COMMIT_MESSAGE" ]]; then
        print_error "Commit message cannot be empty"
        exit 1
    fi
}

# Get PR details
get_pr_details() {
    if [[ "$USE_GH" == true ]]; then
        echo -e "${CYAN}Enter PR title (or press Enter to use commit message):${NC}"
        read -r PR_TITLE
        
        if [[ -z "$PR_TITLE" ]]; then
            PR_TITLE="$COMMIT_MESSAGE"
        fi
        
        echo -e "${CYAN}Enter PR description (optional):${NC}"
        read -r PR_DESCRIPTION
        
        if [[ -z "$PR_DESCRIPTION" ]]; then
            PR_DESCRIPTION="Automated PR created with one-click-pr.sh"
        fi
    fi
}

# Create and switch to feature branch
create_branch() {
    print_info "Creating and switching to branch: $BRANCH_NAME"
    
    # Check if branch already exists
    if git show-ref --verify --quiet refs/heads/"$BRANCH_NAME"; then
        print_error "Branch '$BRANCH_NAME' already exists"
        echo -e "${CYAN}Do you want to switch to it? (y/N):${NC}"
        read -r SWITCH_CONFIRM
        if [[ "$SWITCH_CONFIRM" =~ ^[Yy]$ ]]; then
            git checkout "$BRANCH_NAME"
            print_success "Switched to existing branch: $BRANCH_NAME"
        else
            print_error "Aborting"
            exit 1
        fi
    else
        git checkout -b "$BRANCH_NAME"
        print_success "Created and switched to branch: $BRANCH_NAME"
    fi
}

# Commit staged changes
commit_changes() {
    print_info "Committing staged changes..."
    
    # Show what will be committed
    echo -e "${CYAN}Files to be committed:${NC}"
    git diff --cached --name-status | while read -r status file; do
        case $status in
            A) echo -e "  ${GREEN}A${NC} $file (new file)" ;;
            M) echo -e "  ${YELLOW}M${NC} $file (modified)" ;;
            D) echo -e "  ${RED}D${NC} $file (deleted)" ;;
            *) echo -e "  ${BLUE}$status${NC} $file" ;;
        esac
    done
    echo ""
    
    # Confirm commit
    echo -e "${CYAN}Proceed with commit? (Y/n):${NC}"
    read -r COMMIT_CONFIRM
    if [[ ! "$COMMIT_CONFIRM" =~ ^[Nn]$ ]]; then
        git commit -m "$COMMIT_MESSAGE"
        print_success "Changes committed"
    else
        print_error "Commit cancelled"
        exit 1
    fi
}

# Push branch to origin
push_branch() {
    print_info "Pushing branch to origin..."
    
    # Check if remote origin exists
    if ! git remote get-url origin &> /dev/null; then
        print_error "No 'origin' remote found"
        print_info "Add origin with: git remote add origin <repository-url>"
        exit 1
    fi
    
    git push -u origin "$BRANCH_NAME"
    print_success "Branch pushed to origin"
}

# Create pull request
create_pull_request() {
    if [[ "$USE_GH" == true ]]; then
        print_info "Creating pull request..."
        
        # Get the default branch
        DEFAULT_BRANCH=$(gh repo view --json defaultBranchRef --jq '.defaultBranchRef.name')
        
        # Create PR
        PR_URL=$(gh pr create \
            --title "$PR_TITLE" \
            --body "$PR_DESCRIPTION" \
            --base "$DEFAULT_BRANCH" \
            --head "$BRANCH_NAME")
        
        print_success "Pull request created: $PR_URL"
        
        # Ask if user wants to open PR in browser
        echo -e "${CYAN}Open PR in browser? (Y/n):${NC}"
        read -r OPEN_CONFIRM
        if [[ ! "$OPEN_CONFIRM" =~ ^[Nn]$ ]]; then
            gh pr view --web
        fi
    else
        print_warning "GitHub CLI not available - PR not created"
        print_info "Create PR manually at: $(git remote get-url origin | sed 's/\.git$//')\/compare/main...$BRANCH_NAME"
    fi
}

# Safety checks
safety_checks() {
    print_info "Running safety checks..."
    
    # Check for common secrets patterns
    SECRET_PATTERNS=("password" "secret" "key" "token" "api_key")
    
    for pattern in "${SECRET_PATTERNS[@]}"; do
        if git diff --cached | grep -i "$pattern" | grep -v "example" | grep -v "template" | grep -v "#" > /dev/null; then
            print_warning "Potential secret found containing '$pattern'"
            print_info "Please review your changes to ensure no secrets are committed"
            
            echo -e "${CYAN}Continue anyway? (y/N):${NC}"
            read -r SECRET_CONFIRM
            if [[ ! "$SECRET_CONFIRM" =~ ^[Yy]$ ]]; then
                print_error "Aborting for security"
                exit 1
            fi
        fi
    done
    
    print_success "Safety checks passed"
}

# Display summary
display_summary() {
    echo ""
    echo -e "${PURPLE}📋 Summary${NC}"
    echo -e "${PURPLE}==========${NC}"
    echo -e "Branch: ${CYAN}$BRANCH_NAME${NC}"
    echo -e "Commit: ${CYAN}$COMMIT_MESSAGE${NC}"
    echo -e "Files: ${CYAN}$(git diff --cached --name-only | wc -l) file(s)${NC}"
    
    if [[ "$USE_GH" == true ]]; then
        echo -e "PR Title: ${CYAN}$PR_TITLE${NC}"
    fi
}

# Main execution
main() {
    print_header
    
    # Show usage if help requested
    if [[ "$1" == "--help" || "$1" == "-h" ]]; then
        cat << EOF
${PURPLE}JunaiKey One-Click PR Helper${NC}

This script automates the process of creating a feature branch, committing 
staged changes, pushing to origin, and creating a pull request.

${YELLOW}Prerequisites:${NC}
- Git repository with staged changes
- GitHub CLI (gh) installed and authenticated (optional)
- Origin remote configured

${YELLOW}Usage:${NC}
  ./scripts/one-click-pr.sh [options]

${YELLOW}Options:${NC}
  -h, --help    Show this help message

${YELLOW}Workflow:${NC}
1. Check prerequisites and staged changes
2. Create feature branch (auto-generated or custom name)
3. Commit staged changes with custom message
4. Push branch to origin
5. Create pull request (if GitHub CLI available)

${YELLOW}Example:${NC}
  git add .
  ./scripts/one-click-pr.sh

${YELLOW}Safety Features:${NC}
- Checks for potential secrets in staged changes
- Confirms actions before execution
- Provides manual PR creation instructions if GitHub CLI unavailable

EOF
        exit 0
    fi
    
    # Run the workflow
    check_prerequisites
    safety_checks
    get_branch_name
    get_commit_message
    get_pr_details
    display_summary
    
    echo ""
    echo -e "${CYAN}Proceed with PR creation? (Y/n):${NC}"
    read -r FINAL_CONFIRM
    
    if [[ ! "$FINAL_CONFIRM" =~ ^[Nn]$ ]]; then
        create_branch
        commit_changes
        push_branch
        create_pull_request
        
        echo ""
        print_success "🎉 One-click PR process completed successfully!"
    else
        print_warning "PR creation cancelled"
        exit 0
    fi
}

# Run main function with all arguments
main "$@"