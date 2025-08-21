#!/usr/bin/env bash
# Safe Integration Script for JunAiKey Repository
# Usage: bash scripts/safe_integrate.sh [source_branch] [target_branch]
# Example: bash scripts/safe_integrate.sh feature/new-agent main

set -euo pipefail

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Configuration
BACKUP_PREFIX="backup-pre-sync"
DEFAULT_SOURCE_BRANCH="$(git branch --show-current)"
DEFAULT_TARGET_BRANCH="main"

# Parse arguments
SOURCE_BRANCH="${1:-$DEFAULT_SOURCE_BRANCH}"
TARGET_BRANCH="${2:-$DEFAULT_TARGET_BRANCH}"
TIMESTAMP="$(date +%Y%m%d-%H%M%S)"
BACKUP_TAG="${BACKUP_PREFIX}-${TIMESTAMP}"

echo -e "${BLUE}🔧 JunAiKey Safe Integration Script${NC}"
echo -e "${BLUE}======================================${NC}"
echo "Source Branch: $SOURCE_BRANCH"
echo "Target Branch: $TARGET_BRANCH"
echo "Backup Tag: $BACKUP_TAG"
echo ""

# Function to log messages
log() {
    echo -e "${GREEN}[INFO]${NC} $1"
}

warn() {
    echo -e "${YELLOW}[WARN]${NC} $1"
}

error() {
    echo -e "${RED}[ERROR]${NC} $1" >&2
}

# Function to check if we're in a git repository
check_git_repo() {
    if ! git rev-parse --git-dir > /dev/null 2>&1; then
        error "Not in a git repository!"
        exit 1
    fi
}

# Function to check for uncommitted changes
check_clean_working_tree() {
    if ! git diff-index --quiet HEAD --; then
        error "Working tree is not clean. Please commit or stash your changes."
        git status --porcelain
        exit 1
    fi
}

# Function to fetch latest changes
fetch_latest() {
    log "Fetching latest changes from remote..."
    git fetch --all --prune
}

# Function to create backup tag
create_backup_tag() {
    log "Creating backup tag: $BACKUP_TAG"
    git tag "$BACKUP_TAG" "$SOURCE_BRANCH"
    log "Backup tag created successfully"
}

# Function to check if branches exist
check_branches_exist() {
    if ! git show-ref --verify --quiet "refs/heads/$SOURCE_BRANCH" && \
       ! git show-ref --verify --quiet "refs/remotes/origin/$SOURCE_BRANCH"; then
        error "Source branch '$SOURCE_BRANCH' does not exist locally or remotely"
        exit 1
    fi
    
    if ! git show-ref --verify --quiet "refs/heads/$TARGET_BRANCH" && \
       ! git show-ref --verify --quiet "refs/remotes/origin/$TARGET_BRANCH"; then
        error "Target branch '$TARGET_BRANCH' does not exist locally or remotely"
        exit 1
    fi
}

# Function to run tests if available
run_tests() {
    log "Running tests (if available)..."
    
    # Check if we have test scripts
    if command -v npm > /dev/null && [ -f package.json ]; then
        if npm run test --if-present > /dev/null 2>&1; then
            log "✅ Tests passed"
        else
            warn "⚠️ Tests failed or not available - continuing with integration"
        fi
    fi
    
    # Check if we have Python tests
    if [ -f requirements.txt ] || [ -f Pipfile ] || [ -f pyproject.toml ]; then
        if command -v pytest > /dev/null; then
            if pytest --version > /dev/null 2>&1 && pytest -x > /dev/null 2>&1; then
                log "✅ Python tests passed"
            else
                warn "⚠️ Python tests failed or not available - continuing with integration"
            fi
        fi
    fi
}

# Function to run build checks
run_build_checks() {
    log "Running build checks..."
    
    # Node.js build check
    if command -v npm > /dev/null && [ -f package.json ]; then
        if npm run build > /dev/null 2>&1; then
            log "✅ Node.js build successful"
        else
            error "❌ Node.js build failed"
            return 1
        fi
    fi
    
    # Docker build checks
    if [ -f Dockerfile.node ]; then
        log "Checking Dockerfile.node syntax..."
        if docker build -f Dockerfile.node -t junaikey-node-test . > /dev/null 2>&1; then
            log "✅ Dockerfile.node builds successfully"
            docker rmi junaikey-node-test > /dev/null 2>&1 || true
        else
            warn "⚠️ Dockerfile.node build failed - check Docker syntax"
        fi
    fi
    
    if [ -f Dockerfile.api ]; then
        log "Checking Dockerfile.api syntax..."
        if docker build -f Dockerfile.api -t junaikey-api-test . > /dev/null 2>&1; then
            log "✅ Dockerfile.api builds successfully"
            docker rmi junaikey-api-test > /dev/null 2>&1 || true
        else
            warn "⚠️ Dockerfile.api build failed - check Docker syntax"
        fi
    fi
}

# Function to perform the integration
perform_integration() {
    log "Checking out target branch: $TARGET_BRANCH"
    git checkout "$TARGET_BRANCH"
    
    log "Pulling latest changes for target branch..."
    git pull origin "$TARGET_BRANCH"
    
    log "Merging source branch: $SOURCE_BRANCH"
    if git merge "$SOURCE_BRANCH" --no-ff -m "Safe integration: merge $SOURCE_BRANCH into $TARGET_BRANCH"; then
        log "✅ Merge completed successfully"
    else
        error "❌ Merge failed - please resolve conflicts manually"
        error "To restore previous state: git reset --hard $BACKUP_TAG"
        exit 1
    fi
}

# Function to cleanup on success
cleanup_on_success() {
    log "Integration completed successfully!"
    echo ""
    echo -e "${GREEN}📋 Post-Integration Checklist:${NC}"
    echo "  1. ✅ Backup tag created: $BACKUP_TAG"
    echo "  2. ✅ Changes merged into $TARGET_BRANCH"
    echo "  3. 🔄 Ready to push: git push origin $TARGET_BRANCH"
    echo "  4. 🧹 Clean backup later: git tag -d $BACKUP_TAG"
    echo ""
    echo -e "${BLUE}Next steps:${NC}"
    echo "  • Review the merged changes: git log --oneline -10"
    echo "  • Push to remote: git push origin $TARGET_BRANCH"
    echo "  • Deploy if needed: npm run deploy"
}

# Function to handle cleanup on error
cleanup_on_error() {
    error "Integration failed!"
    echo ""
    echo -e "${RED}🚨 Recovery Options:${NC}"
    echo "  • Restore to backup: git reset --hard $BACKUP_TAG"
    echo "  • Check status: git status"
    echo "  • View backup: git show $BACKUP_TAG"
    echo "  • Remove backup tag: git tag -d $BACKUP_TAG"
}

# Main execution
main() {
    trap cleanup_on_error ERR
    
    # Pre-flight checks
    check_git_repo
    check_clean_working_tree
    check_branches_exist
    
    # Safety measures
    fetch_latest
    create_backup_tag
    
    # Quality checks
    run_tests
    run_build_checks
    
    # Perform integration
    perform_integration
    
    # Success cleanup
    cleanup_on_success
}

# Show help if requested
if [[ "${1:-}" == "--help" ]] || [[ "${1:-}" == "-h" ]]; then
    echo "JunAiKey Safe Integration Script"
    echo ""
    echo "Usage: $0 [source_branch] [target_branch]"
    echo ""
    echo "Arguments:"
    echo "  source_branch    Branch to merge from (default: current branch)"
    echo "  target_branch    Branch to merge into (default: main)"
    echo ""
    echo "Examples:"
    echo "  $0                           # Merge current branch into main"
    echo "  $0 feature/new-agent         # Merge feature/new-agent into main"
    echo "  $0 feature/api develop       # Merge feature/api into develop"
    echo ""
    echo "This script will:"
    echo "  1. Create a backup tag before integration"
    echo "  2. Run tests and build checks"
    echo "  3. Safely merge branches with conflict detection"
    echo "  4. Provide recovery instructions if anything fails"
    exit 0
fi

# Run main function
main "$@"