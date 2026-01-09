#!/bin/bash
# Health check script for JunAiKey MCP Server
# Usage: ./health-check.sh

set -e

SERVICE_NAME="mcp-server"
EXIT_CODE=0

echo "🏥 JunAiKey MCP Server Health Check"
echo "===================================="
echo ""

# Check if service exists
if ! systemctl list-unit-files | grep -q "$SERVICE_NAME.service"; then
    echo "❌ Service $SERVICE_NAME is not installed"
    exit 1
fi

# Check if service is active
if systemctl is-active --quiet $SERVICE_NAME; then
    echo "✅ Service Status: RUNNING"
else
    echo "❌ Service Status: NOT RUNNING"
    EXIT_CODE=1
fi

# Check if service is enabled
if systemctl is-enabled --quiet $SERVICE_NAME; then
    echo "✅ Auto-start: ENABLED"
else
    echo "⚠️  Auto-start: DISABLED"
fi

# Get service uptime
UPTIME=$(systemctl show $SERVICE_NAME --property=ActiveEnterTimestamp --value)
if [ -n "$UPTIME" ]; then
    echo "⏰ Service started: $UPTIME"
fi

# Check recent logs for errors
echo ""
echo "📋 Recent logs (last 5 lines):"
echo "------------------------------"
journalctl -u $SERVICE_NAME -n 5 --no-pager --output=cat || true

# Check if there are recent errors
ERROR_COUNT=$(journalctl -u $SERVICE_NAME --since "5 minutes ago" -p err --no-pager | wc -l)
if [ "$ERROR_COUNT" -gt 0 ]; then
    echo ""
    echo "⚠️  Warning: Found $ERROR_COUNT errors in the last 5 minutes"
    EXIT_CODE=1
else
    echo ""
    echo "✅ No errors in the last 5 minutes"
fi

echo ""
echo "===================================="
if [ $EXIT_CODE -eq 0 ]; then
    echo "✅ Health Check: PASSED"
else
    echo "❌ Health Check: FAILED"
fi

exit $EXIT_CODE
