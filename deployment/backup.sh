#!/bin/bash
# Backup script for JunAiKey MCP Server
# Usage: ./backup.sh

set -e

BACKUP_DIR="/opt/junaikey-backups"
SOURCE_DIR="/opt/junaikey"
TIMESTAMP=$(date +%Y%m%d_%H%M%S)
BACKUP_NAME="junaikey_$TIMESTAMP"
MAX_BACKUPS=5

echo "🔄 Starting backup process..."

# Create backup directory if it doesn't exist
mkdir -p "$BACKUP_DIR"

# Create backup
echo "📦 Creating backup: $BACKUP_NAME"
cp -r "$SOURCE_DIR" "$BACKUP_DIR/$BACKUP_NAME"

# Remove old backups (keep only the latest MAX_BACKUPS)
echo "🧹 Cleaning up old backups..."
cd "$BACKUP_DIR"
ls -t | tail -n +$((MAX_BACKUPS + 1)) | xargs -r rm -rf

echo "✅ Backup completed successfully!"
echo "📍 Backup location: $BACKUP_DIR/$BACKUP_NAME"

# List all backups
echo ""
echo "📋 Available backups:"
ls -lht "$BACKUP_DIR" | head -n $((MAX_BACKUPS + 1))
