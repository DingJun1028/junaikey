#!/usr/bin/env bash
# Test script for HMAC generation and API testing
# Usage: ./test_hmac.sh <sacred_api_key> [body] [endpoint]

set -euo pipefail

SACRED_API_KEY="${1:-}"
BODY="${2:-{\"test\":\"data\"}}"
ENDPOINT="${3:-/api/execute-sacred-command}"

if [ -z "$SACRED_API_KEY" ]; then
    echo "Usage: $0 <sacred_api_key> [body] [endpoint]"
    echo "Example: $0 sk_sacred_abcd123 '{\"test\":\"data\"}' /api/execute-sacred-command"
    exit 1
fi

echo "Generating HMAC for API request..."
echo "Sacred API Key: $SACRED_API_KEY"
echo "Body: $BODY"
echo "Endpoint: $ENDPOINT"
echo ""

# Generate timestamp
TS=$(date +%s)
echo "Timestamp: $TS"

# Generate HMAC signature
SIGN=$(echo -n "$BODY$TS" | openssl dgst -sha256 -hmac "$SACRED_API_KEY" -hex | sed 's/^.* //')
echo "HMAC Signature: $SIGN"
echo ""

echo "Headers for curl request:"
echo "  -H 'Content-Type: application/json'"
echo "  -H 'X-Sacred-Key: $SACRED_API_KEY'"
echo "  -H 'X-Ts: $TS'"
echo "  -H 'X-Sign: $SIGN'"
echo ""

echo "Complete curl command (update URL as needed):"
echo "curl -X POST localhost:5001/PROJECT/REGION$ENDPOINT \\"
echo "  -H 'Content-Type: application/json' \\"
echo "  -H 'X-Sacred-Key: $SACRED_API_KEY' \\"
echo "  -H 'X-Ts: $TS' \\"
echo "  -H 'X-Sign: $SIGN' \\"
echo "  -d '$BODY'"