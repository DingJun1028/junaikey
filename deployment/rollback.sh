#!/bin/bash
# Rollback script for JunAiKey MCP Server
# Usage: ./rollback.sh [backup_name]
# Example: ./rollback.sh junaikey_20240101_120000

set -e

BACKUP_DIR="/opt/junaikey-backups"
SOURCE_DIR="/opt/junaikey"
SERVICE_NAME="mcp-server"

echo "🔄 JunAiKey MCP Server Rollback"
echo "==============================="
echo ""

# Check if backup directory exists
if [ ! -d "$BACKUP_DIR" ]; then
    echo "❌ Backup directory not found: $BACKUP_DIR"
    exit 1
fi

# If no backup name provided, show available backups
if [ -z "$1" ]; then
    echo "📋 Available backups:"
    ls -lht "$BACKUP_DIR"
    echo ""
    echo "Usage: $0 <backup_name>"
    echo "Example: $0 junaikey_20240101_120000"
    exit 1
fi

BACKUP_NAME="$1"
BACKUP_PATH="$BACKUP_DIR/$BACKUP_NAME"

# Check if backup exists
if [ ! -d "$BACKUP_PATH" ]; then
    echo "❌ Backup not found: $BACKUP_PATH"
    echo ""
    echo "📋 Available backups:"
    ls -lht "$BACKUP_DIR"
    exit 1
fi

echo "📦 Backup found: $BACKUP_NAME"
echo "📍 Backup path: $BACKUP_PATH"
echo ""

# Confirm rollback
read -p "⚠️  This will replace current deployment. Continue? (yes/no): " -r
echo ""
if [[ ! $REPLY =~ ^[Yy][Ee][Ss]$ ]]; then
    echo "❌ Rollback cancelled"
    exit 0
fi

# Stop service
echo "🛑 Stopping service..."
sudo systemctl stop $SERVICE_NAME || true

# Create backup of current version
TIMESTAMP=$(date +%Y%m%d_%H%M%S)
CURRENT_BACKUP="$BACKUP_DIR/current_before_rollback_$TIMESTAMP"
echo "💾 Backing up current version to: $CURRENT_BACKUP"
cp -r "$SOURCE_DIR" "$CURRENT_BACKUP"

# Remove current deployment
echo "🗑️  Removing current deployment..."
rm -rf "${SOURCE_DIR:?}"/*

# Restore from backup
echo "📥 Restoring from backup..."
cp -r "$BACKUP_PATH/"* "$SOURCE_DIR/"

# Restart service
echo "🔄 Restarting service..."
sudo systemctl start $SERVICE_NAME

# Check service status
sleep 2
if systemctl is-active --quiet $SERVICE_NAME; then
    echo ""
    echo "✅ Rollback completed successfully!"
    echo "📍 Service is running"
    sudo systemctl status $SERVICE_NAME --no-pager || true
else
    echo ""
    echo "❌ Rollback completed but service failed to start"
    echo "📋 Check logs: journalctl -u $SERVICE_NAME -n 50"
    exit 1
fi
