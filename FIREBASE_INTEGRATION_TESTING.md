# Firebase/Next.js Integration Testing Guide

This document describes how to test the Firebase Hosting → Cloud Functions integration with dual route support.

## Changes Made

### 1. firebase.json
- Added Hosting rewrites to forward `/api/**` to Cloud Function named `api` in `asia-east1` region
- Ensures consistency with `frameworksBackend.region` setting

### 2. functions/index.js  
- Updated Cloud Function export to use `functions.region('asia-east1').https.onRequest(app)`
- Added dual route support for backwards compatibility:
  - `/execute-sacred-command` (for Hosting rewrites)
  - `/api/execute-sacred-command` (for direct calls)
  - `/add-knowledge` (for Hosting rewrites)
  - `/api/add-knowledge` (for direct calls)

## Testing Instructions

### Option 1: Local Firebase Emulators (Recommended)

```bash
# Start Firebase emulators
firebase emulators:start --only hosting,functions

# Test the rewritten route (via Hosting)
curl -X POST http://127.0.0.1:5001/PROJECT_ID/asia-east1/api/execute-sacred-command \
  -H 'Content-Type: application/json' \
  -d '{
    "command": {
      "endpoint": "code-analysis",
      "params": {"code": "console.log(1)"},
      "user": "PrimeArchitect",
      "context": "Analyze code"
    }
  }'

# Test the direct route (without Hosting)
curl -X POST http://127.0.0.1:5001/PROJECT_ID/asia-east1/api/api/execute-sacred-command \
  -H 'Content-Type: application/json' \
  -d '{
    "command": {
      "endpoint": "code-analysis", 
      "params": {"code": "console.log(1)"},
      "user": "PrimeArchitect",
      "context": "Analyze code"
    }
  }'
```

### Option 2: Deployed Site

```bash
# Deploy functions and hosting
firebase deploy --only functions,hosting

# Test via Hosting (rewritten route)
curl -X POST https://YOUR_DOMAIN/api/execute-sacred-command \
  -H 'Content-Type: application/json' \
  -d '{
    "command": {
      "endpoint": "code-analysis",
      "params": {"code": "console.log(1)"},
      "user": "PrimeArchitect", 
      "context": "Analyze code"
    }
  }'
```

## Expected Results

- Both routes should return HTTP 200
- Response should contain a `response` field with the generated content
- No errors in Firebase Functions logs

## Route Compatibility Matrix

| Route Path | Source | Supported |
|------------|---------|-----------|
| `/api/execute-sacred-command` | Direct Function call | ✅ (backwards compatible) |
| `/execute-sacred-command` | Hosting rewrite | ✅ (new functionality) |
| `/api/add-knowledge` | Direct Function call | ✅ (backwards compatible) |
| `/add-knowledge` | Hosting rewrite | ✅ (new functionality) |

## Regional Consistency

- **Hosting frameworksBackend**: `asia-east1`
- **Cloud Function region**: `asia-east1`  
- **Hosting rewrite target**: `asia-east1`

This ensures minimal latency and consistent regional deployment.