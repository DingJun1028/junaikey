#!/bin/bash
# Quick setup script for JunAiKey MCP Server deployment
# This script automates the server setup process
# Usage: bash setup-server.sh

set -e

echo "🚀 JunAiKey MCP Server - Quick Setup"
echo "====================================="
echo ""

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Configuration
DEPLOY_DIR="/opt/junaikey"
REPO_URL="https://github.com/DingJun1028/junaikey.git"
SERVICE_NAME="mcp-server"
USER_NAME="${USER}"

echo -e "${YELLOW}📋 Configuration:${NC}"
echo "  - Deploy directory: $DEPLOY_DIR"
echo "  - Repository: $REPO_URL"
echo "  - Service name: $SERVICE_NAME"
echo "  - User: $USER_NAME"
echo ""

# Check if running as root
if [ "$EUID" -eq 0 ]; then 
    echo -e "${RED}❌ Please do not run this script as root${NC}"
    echo "Run as a regular user with sudo privileges"
    exit 1
fi

# Check for required commands
echo -e "${YELLOW}🔍 Checking prerequisites...${NC}"
for cmd in git node npm systemctl sudo; do
    if ! command -v $cmd &> /dev/null; then
        echo -e "${RED}❌ $cmd is not installed${NC}"
        echo "Please install it first"
        exit 1
    else
        echo -e "${GREEN}✅ $cmd is installed${NC}"
    fi
done

# Check Node.js version
NODE_VERSION=$(node -v | cut -d 'v' -f 2 | cut -d '.' -f 1)
if [ "$NODE_VERSION" -lt 18 ]; then
    echo -e "${RED}❌ Node.js version 18+ required (found: $(node -v))${NC}"
    exit 1
else
    echo -e "${GREEN}✅ Node.js version: $(node -v)${NC}"
fi

echo ""
read -p "Continue with setup? (yes/no): " -r
echo ""
if [[ ! $REPLY =~ ^[Yy][Ee][Ss]$ ]]; then
    echo "Setup cancelled"
    exit 0
fi

# Create deployment directory
echo -e "${YELLOW}📁 Creating deployment directory...${NC}"
if [ ! -d "$DEPLOY_DIR" ]; then
    sudo mkdir -p "$DEPLOY_DIR"
    sudo chown $USER_NAME:$USER_NAME "$DEPLOY_DIR"
    echo -e "${GREEN}✅ Created $DEPLOY_DIR${NC}"
else
    echo -e "${YELLOW}⚠️  Directory already exists: $DEPLOY_DIR${NC}"
fi

# Clone repository
echo -e "${YELLOW}📥 Cloning repository...${NC}"
cd "$DEPLOY_DIR"
if [ ! -d ".git" ]; then
    git clone "$REPO_URL" .
    echo -e "${GREEN}✅ Repository cloned${NC}"
else
    echo -e "${YELLOW}⚠️  Git repository already exists${NC}"
    git fetch origin
    git reset --hard origin/main
    echo -e "${GREEN}✅ Repository updated${NC}"
fi

# Install dependencies
echo -e "${YELLOW}📦 Installing dependencies...${NC}"
npm ci --production --prefer-offline --no-audit
echo -e "${GREEN}✅ Dependencies installed${NC}"

# Build project
echo -e "${YELLOW}🏗️  Building project...${NC}"
if npm run build; then
    echo -e "${GREEN}✅ Project built successfully${NC}"
else
    echo -e "${YELLOW}⚠️  Build script not found or failed (this might be okay)${NC}"
fi

# Setup systemd service
echo -e "${YELLOW}⚙️  Setting up systemd service...${NC}"
if [ -f "$DEPLOY_DIR/deployment/mcp-server.service" ]; then
    # Update service file with current user and path
    sudo cp "$DEPLOY_DIR/deployment/mcp-server.service" "/etc/systemd/system/$SERVICE_NAME.service"
    sudo sed -i "s|User=www-data|User=$USER_NAME|g" "/etc/systemd/system/$SERVICE_NAME.service"
    sudo sed -i "s|/opt/junaikey|$DEPLOY_DIR|g" "/etc/systemd/system/$SERVICE_NAME.service"
    
    sudo systemctl daemon-reload
    sudo systemctl enable $SERVICE_NAME
    echo -e "${GREEN}✅ Service installed and enabled${NC}"
else
    echo -e "${RED}❌ Service file not found${NC}"
    exit 1
fi

# Configure sudo for systemctl
echo -e "${YELLOW}🔐 Configuring sudo permissions...${NC}"
SUDOERS_FILE="/etc/sudoers.d/$SERVICE_NAME"
if [ ! -f "$SUDOERS_FILE" ]; then
    echo "$USER_NAME ALL=(ALL) NOPASSWD: /bin/systemctl restart $SERVICE_NAME" | sudo tee "$SUDOERS_FILE" > /dev/null
    echo "$USER_NAME ALL=(ALL) NOPASSWD: /bin/systemctl status $SERVICE_NAME" | sudo tee -a "$SUDOERS_FILE" > /dev/null
    echo "$USER_NAME ALL=(ALL) NOPASSWD: /bin/systemctl stop $SERVICE_NAME" | sudo tee -a "$SUDOERS_FILE" > /dev/null
    echo "$USER_NAME ALL=(ALL) NOPASSWD: /bin/systemctl start $SERVICE_NAME" | sudo tee -a "$SUDOERS_FILE" > /dev/null
    sudo chmod 0440 "$SUDOERS_FILE"
    echo -e "${GREEN}✅ Sudo permissions configured${NC}"
else
    echo -e "${YELLOW}⚠️  Sudo permissions already configured${NC}"
fi

# Make deployment scripts executable
echo -e "${YELLOW}🔧 Making deployment scripts executable...${NC}"
chmod +x "$DEPLOY_DIR/deployment/"*.sh
echo -e "${GREEN}✅ Scripts are now executable${NC}"

# Start service
echo -e "${YELLOW}🚀 Starting service...${NC}"
sudo systemctl start $SERVICE_NAME
sleep 2

# Check service status
if sudo systemctl is-active --quiet $SERVICE_NAME; then
    echo -e "${GREEN}✅ Service is running!${NC}"
    sudo systemctl status $SERVICE_NAME --no-pager || true
else
    echo -e "${RED}❌ Service failed to start${NC}"
    echo "Check logs: sudo journalctl -u $SERVICE_NAME -n 50"
    exit 1
fi

echo ""
echo -e "${GREEN}========================================${NC}"
echo -e "${GREEN}✅ Setup completed successfully!${NC}"
echo -e "${GREEN}========================================${NC}"
echo ""
echo "📋 Next steps:"
echo "1. Add your SSH public key to ~/.ssh/authorized_keys"
echo "2. Configure GitHub Secrets (see deployment/README.md)"
echo "3. Push to main branch to trigger deployment"
echo ""
echo "🔧 Useful commands:"
echo "  - Check status: sudo systemctl status $SERVICE_NAME"
echo "  - View logs: sudo journalctl -u $SERVICE_NAME -f"
echo "  - Restart: sudo systemctl restart $SERVICE_NAME"
echo "  - Health check: bash $DEPLOY_DIR/deployment/health-check.sh"
echo ""
