# JunAiKey AI Coding Assistant - Development Instructions

Always reference these instructions first and only fallback to additional search and context gathering if the information in the instructions is incomplete or found to be in error.

## Project Overview

JunAiKey is a multi-technology AI-powered platform with several components:
- **Frontend**: Next.js 15 with React 18, TypeScript 5, Tailwind CSS, and Shadcn UI components
- **Backend**: Python FastAPI with TensorZero, Firebase Admin SDK, and ClickHouse
- **AI Integration**: Google Gemini API via Firebase Functions
- **Infrastructure**: Docker, Docker Compose, Firebase Hosting/Functions, Google Cloud Run

## Working Effectively

### Initial Setup and Dependencies

**NEVER CANCEL any npm install or build commands - they may take 10+ minutes. Set timeout to 20+ minutes.**

Bootstrap the development environment:
```bash
# Install Next.js frontend dependencies - NEVER CANCEL: Takes 2-3 minutes
npm install

# Install Firebase Functions dependencies - NEVER CANCEL: Takes 2-3 minutes  
cd functions && npm install && cd ..

# Install Python backend dependencies - Takes 45 seconds
python3 -m pip install -r app/requirements.txt

# Create environment file
cp .env.example .env
```

### Build Commands

**CRITICAL: All build times are measured - use appropriate timeouts**

```bash
# Build Next.js application - Takes 20-30 seconds
npm run build

# Type checking - Takes 6 seconds (expect TypeScript errors in current codebase)
npm run typecheck

# Docker build - FAILS due to SSL certificate issues in container environment
# DO NOT USE: docker build . fails with PyPI SSL errors
```

### Development Servers

```bash
# Start Next.js development server - READY in <1 second
npm run dev
# Access at: http://localhost:9002

# Start Python backend (requires ClickHouse and Firebase setup)
python3 -m uvicorn app.main:app --host 0.0.0.0 --port 8080
# Will fail without proper .env configuration
```

### Docker and Container Management

**Using the provided Makefile system (requires bash path fix):**

```bash
# Fix Makefile bash path issue first:
sed -i 's|/usr/bin/env bash|/usr/bin/bash|g' Makefile

# Full deployment stack - NEVER CANCEL: May take 15+ minutes
make deploy

# Build containers - NEVER CANCEL: Takes 10+ minutes, expect SSL failures
make genesis-weaver-build

# Start services
make agentus-start

# Clean containers (soft clean)
make clean

# Monitor logs
make veritas-monitor

# Health check
make sentinel-health
```

## Validation

**Always manually validate code changes using these scenarios:**

### Frontend Validation
1. Start Next.js dev server: `npm run dev`
2. Navigate to http://localhost:9002
3. Test navigation between pages
4. Verify UI components render correctly
5. Check browser console for errors

### Backend Validation
1. Set up ClickHouse: `docker compose up clickhouse -d`
2. Configure .env with proper Firebase and API keys
3. Start Python backend: `python3 -m uvicorn app.main:app --host 0.0.0.0 --port 8080`
4. Test health endpoint: `curl http://localhost:8080/health`

### Integration Testing
**After making changes, ALWAYS run through this complete scenario:**
1. Install all dependencies
2. Build Next.js application
3. Start both frontend and backend servers
4. Test AI agent endpoints if available
5. Verify no new TypeScript errors introduced

## Known Issues and Limitations

**Docker Build Issues:**
- Docker build fails with SSL certificate errors when installing Python packages
- **Workaround**: Install Python dependencies locally instead of in container
- Container builds work locally but fail in CI/sandbox environments

**Firebase Setup:**
- Firebase CLI installation takes 10+ minutes and may timeout
- Requires manual authentication and project configuration
- Functions require Node.js 18 (current system has Node.js 20 - expect warnings)

**TypeScript Errors:**
- Current codebase has 25 TypeScript errors across 5 files
- Duplicate import errors in agent-network page
- Missing type declarations for omni_center modules
- Always run `npm run typecheck` to verify no NEW errors introduced

## Common Tasks

### Adding New Features
1. For frontend: Add components to `src/app/` following Next.js 15 App Router structure
2. For backend: Add endpoints to `app/main.py` or new modules in `app/`
3. For AI agents: Modify files in `functions/agents/`
4. Always test both frontend and backend integration

### API Integration
- All external APIs (Gemini, TensorZero) are configured via environment variables
- Firebase Admin SDK requires service account key file
- ClickHouse connection string format: `http://user:password@host:port/database`

### Code Quality
- TypeScript checking: `npm run typecheck` (6 seconds)
- Linting: `npm run lint` (requires ESLint configuration setup)
- No pytest testing framework installed - tests run directly with Python

## File Structure Navigation

**Key directories:**
- `src/app/` - Next.js pages and components
- `app/` - Python FastAPI backend
- `functions/` - Firebase Functions for AI integration
- `functions/agents/` - AI agent implementations (linter, security, supervisor)
- `tests/` - Python test files
- `docs/` - Documentation including deployment guides

**Configuration files:**
- `package.json` - Next.js dependencies and scripts
- `functions/package.json` - Firebase Functions dependencies  
- `app/requirements.txt` - Python backend dependencies
- `docker-compose.yml` - ClickHouse and API service containers
- `Dockerfile` - Python backend container (has SSL issues)
- `.env.example` - Environment variable template

## Environment Variables Required

```bash
# Google Cloud and Firebase
GCP_PROJECT_ID="junaikey"
GOOGLE_APPLICATION_CREDENTIALS="/path/to/service-account.json"

# AI Services  
GEMINI_API_KEY="your-gemini-api-key"
OPENAI_API_KEY="sk-your-openai-key"

# Database
TENSORZERO_CLICKHOUSE_URL="http://chuser:chpassword@localhost:8123/tensorzero"

# Cloud Run Deployment
CLOUD_RUN_SERVICE="junaikey-service"
REGION="asia-east1"
```

## Troubleshooting

**"Docker build fails with SSL errors"**
- This is a known limitation in sandbox environments
- Use local Python package installation instead
- Alternative: Use pre-built base images with packages

**"Firebase Functions require Node 18"**
- Current system has Node 20, expect engine warnings
- Functions still work despite version mismatch

**"TypeScript errors on build"**
- 25 existing errors are expected in current codebase
- Focus on not introducing NEW errors
- Check `npm run typecheck` output carefully

**"Cannot start backend without ClickHouse"**
- Start ClickHouse first: `docker compose up clickhouse -d`
- Wait for health check to pass (30+ seconds)
- Verify connection with: `curl http://localhost:8123/ping`