# TypeScript Migration Test Commands

## Local Development & Testing

### 1. Build and Test Functions
```bash
cd functions/
npm install
npm run build
```

### 2. Test Build Output
```bash
# Verify the compiled function
node -e "const api = require('./lib/index.js'); console.log('API exported:', typeof api.api);"
```

### 3. Firebase Emulator (when Firebase CLI is available)
```bash
# From functions/ directory
npm run serve
# Or from project root
firebase emulators:start --only functions
```

### 4. Test API Endpoint (replace PROJECT_ID with actual project ID)
```bash
curl -X POST http://localhost:5001/PROJECT_ID/asia-east1/api/execute-sacred-command \
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

## Production Deployment

### Deploy Functions
```bash
cd functions/
npm run deploy
```

### Production API Access
After deployment, the API will be available at:
- `https://YOUR_DOMAIN/api/execute-sacred-command`
- `https://YOUR_DOMAIN/api/add-knowledge`

## Key Features Implemented

1. **TypeScript Migration**: `functions/src/index.ts` → `functions/lib/index.js`
2. **Region Configuration**: Function deploys to `asia-east1`
3. **Hosting Rewrites**: `/api/**` routes to the function in `asia-east1`
4. **API Preservation**: Both endpoints maintained with same paths
5. **Agent Integration**: Supervisor and agents work unchanged

## File Structure
```
functions/
├── src/
│   └── index.ts          # TypeScript source
├── lib/                  # Build output (gitignored)
│   └── index.js         # Compiled JavaScript
├── agents/              # Existing agent files (unchanged)
├── package.json         # Updated with TypeScript deps
├── tsconfig.json        # TypeScript configuration
└── .gitignore          # Excludes build artifacts
```