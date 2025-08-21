# 🌟 JunAiKey - Universal AI Agent System (Terminus Matrix v6.0)

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![GitHub Repository](https://img.shields.io/badge/GitHub-Repo-blue?logo=github)](https://github.com/DingJun1028/junaikey)
[![Node.js](https://img.shields.io/badge/Node.js-20-green?logo=node.js)](https://nodejs.org/)
[![Python](https://img.shields.io/badge/Python-3.11-blue?logo=python)](https://www.python.org/)
[![Docker](https://img.shields.io/badge/Docker-Ready-blue?logo=docker)](https://www.docker.com/)
[![Firebase](https://img.shields.io/badge/Firebase-Enabled-orange?logo=firebase)](https://firebase.google.com/)

## 🚀 Quick Start

### Local Development

```bash
# Clone the repository
git clone https://github.com/DingJun1028/junaikey.git
cd junaikey

# Install Node.js dependencies
npm install

# Copy environment template
cp .env.example .env
# Edit .env with your configuration

# Start development server
npm run dev

# Start Python API (optional)
cd app && pip install -r requirements.txt
uvicorn main:app --host 0.0.0.0 --port 8080
```

### Docker Deployment

```bash
# Start the full stack with docker-compose
docker-compose up -d

# Or build individual services
docker build -f Dockerfile.node -t junaikey-web .
docker build -f Dockerfile.api -t junaikey-api .
```

---

## 🏗️ Architecture Overview

JunAiKey is a **hybrid Node.js + Python** system implementing the **Terminus Matrix** architecture - a dynamic, multi-dimensional framework for AI agent orchestration and universal task automation.

### Primary Stack (Node.js)
- **Frontend**: Next.js 15 with React 18 + TypeScript
- **Backend**: Firebase Functions + Firestore
- **AI Integration**: Google Gemini API, OpenAI integration
- **State Management**: Zustand
- **UI Components**: Shadcn/UI + Tailwind CSS
- **Build System**: Turborepo with Next.js

### Optional API Layer (Python)
- **Framework**: FastAPI with async/await
- **AI Orchestration**: TensorZero Gateway
- **Database**: ClickHouse for observability
- **Authentication**: Firebase Admin SDK
- **Deployment**: Container-ready for Cloud Run

---

## 🌐 System Endpoints

### Node.js Application (Primary)
- **Frontend**: `http://localhost:3000` - Next.js web application
- **API Routes**: `/api/*` - Next.js API routes for client interactions

### Python API (Optional)
- **Health Check**: `GET /health` - Service status and dependencies
- **AI Queries**: `POST /api/v1/ask` - Philosophical AI guidance
- **User Management**: 
  - `POST /api/v1/users` - Create user
  - `GET /api/v1/users/{id}` - Get user
- **Card System**:
  - `POST /api/v1/cards` - Create card
  - `GET /api/v1/cards/{id}` - Get card

---

## 🔄 Development Workflows

### Node.js Development
```bash
# Development with hot reload
npm run dev

# Type checking
npm run typecheck

# Linting
npm run lint

# Production build
npm run build

# Start production server
npm run start
```

### Python API Development
```bash
cd app
pip install -r requirements.txt

# Development server with auto-reload
uvicorn main:app --reload --host 0.0.0.0 --port 8080

# Production server
uvicorn main:app --host 0.0.0.0 --port 8080 --workers 4
```

### Testing
```bash
# Node.js tests (if available)
npm test

# Python tests
cd app && pytest

# Integration tests with Docker
docker-compose up --build
```

---

## 🐳 Docker Strategy

### Multi-Container Architecture

**Dockerfile.node** - Multi-stage Next.js build:
- Base: Node.js 20 Alpine
- Builder: Turborepo pruning + pnpm installation
- Runner: Optimized production image with non-root user
- Output: Standalone Next.js application

**Dockerfile.api** - Python FastAPI service:
- Base: Python 3.11 slim
- Port: 8080 (Cloud Run compatible)
- Features: Auto-installs requirements if present
- Command: Uvicorn ASGI server

**docker-compose.yml** Services:
- `api-service`: Python FastAPI (Dockerfile.api)
- `clickhouse`: ClickHouse database with health checks
- `web-service`: Optional Node.js container (commented)

### Build Commands
```bash
# Build Node.js application
docker build -f Dockerfile.node -t junaikey-web .

# Build Python API
docker build -f Dockerfile.api -t junaikey-api .

# Start all services
docker-compose up -d

# View logs
docker-compose logs -f api-service
```

---

## ⚙️ CI/CD Pipeline

### GitHub Actions Workflows

**Node.js Build & Test** (`.github/workflows/node-build-test.yml`):
- Triggers: Push to main/develop, PRs to main
- Container: node:20-alpine
- Steps: Install → TypeCheck → Lint → Build → Test
- Security: All actions pinned to commit SHAs

**Firebase Preview Deploy** (`.github/workflows/firebase-preview.yml`):
- Triggers: PRs to main
- Features: Preview channel deployment + Functions deploy
- Secrets: `FIREBASE_SERVICE_ACCOUNT`, `FIREBASE_PROJECT_ID`
- Output: Preview URL in PR comments

**Security Workflows** (Existing):
- `check-pinned-actions.yml`: Ensures all actions are SHA-pinned
- `codeql.yml`: Code quality and security analysis
- `credo.yml`: Additional security checks

### Deployment Options

1. **Firebase Hosting** (Primary)
   ```bash
   npm run build && firebase deploy
   ```

2. **Google Cloud Run** (One-click)
   ```bash
   bash scripts/one-click-cloudrun.sh
   ```

3. **Docker Compose** (Local/Staging)
   ```bash
   docker-compose up -d
   ```

---

## 🔐 Security & Configuration

### Environment Variables

Required for **Firebase**:
```bash
FIREBASE_PROJECT_ID="your-project-id"
FIREBASE_API_KEY="your-api-key"
FIREBASE_SERVICE_ACCOUNT="" # Base64 encoded for CI/CD
```

Required for **AI Models**:
```bash
OPENAI_API_KEY="sk-..."
GOOGLE_AI_API_KEY="your-gemini-key"
TENSORZERO_CLICKHOUSE_URL="http://chuser:chpassword@localhost:8123/tensorzero"
```

Required for **Google Cloud**:
```bash
GCP_PROJECT_ID="junaikey"
CLOUD_RUN_SERVICE="junaikey-service"
REGION="asia-east1"
GOOGLE_APPLICATION_CREDENTIALS="/path/to/service-account.json"
```

### Security Features
- **Non-root containers**: All Docker images run as non-privileged users
- **Environment isolation**: Separate .env files for different environments
- **SHA-pinned actions**: All GitHub Actions pinned to immutable references
- **Firebase Admin SDK**: Secure backend authentication
- **CORS protection**: Configured for production domains

---

## 🌳 Branch Strategy

### Branch Types
- `main`: Production-ready code, protected branch
- `develop`: Integration branch for features
- `feature/*`: Individual feature development
- `hotfix/*`: Critical production fixes
- `release/*`: Release preparation

### Safe Integration
Use the provided script for safe merging:
```bash
# Merge current branch into main safely
bash scripts/safe_integrate.sh

# Merge specific feature branch
bash scripts/safe_integrate.sh feature/new-agent main

# Get help
bash scripts/safe_integrate.sh --help
```

### Integration Features
- ✅ Automatic backup tag creation
- ✅ Pre-integration testing
- ✅ Build verification
- ✅ Conflict detection
- ✅ Rollback instructions

---

## 🎯 Roadmap

### Phase 1: Core Platform (Current)
- [x] Next.js frontend with TypeScript
- [x] Firebase integration
- [x] Docker containerization
- [x] CI/CD pipeline
- [x] Python API layer

### Phase 2: AI Agent Network
- [ ] Agent SDK implementation
- [ ] Multi-model AI integration
- [ ] Agent orchestration system
- [ ] Dynamic workflow generation

### Phase 3: Terminus Matrix
- [ ] Node-based architecture
- [ ] Energy flow simulation
- [ ] Pattern weaving system
- [ ] Meta-architecture generation

### Phase 4: Production Scale
- [ ] Multi-region deployment
- [ ] Performance optimization
- [ ] Advanced monitoring
- [ ] Enterprise features

---

## 🤔 Philosophy & Core Principles

### 終始矩陣 (Terminus Matrix)
The Terminus Matrix represents our core philosophy: **"以終為始，始終如一"** (Begin with the end in mind, and maintain consistency throughout). Every component, from the smallest function to the largest system, embodies this principle of unified beginning and end.

### Axiom of Unified Terminus & Origin
All operations within JunAiKey follow the ancient axiom ensuring balance and flow of value and energy in an endless cycle. The system is designed as a "Living Universe" that continuously evolves and adapts.

### MECE Architecture
The system follows **Mutually Exclusive, Collectively Exhaustive** principles with 12 core functional dimensions across 5 concentric layers:

1. **Core Layer**: Evolution Loop, Meta Architecture
2. **Control Layer**: Core Engine, Agent Network, Sync Matrix  
3. **Service Layer**: Rune System, Knowledge Hub, Tagging System
4. **Interface Layer**: Interface Protocol, Theme Engine
5. **Boundary Layer**: Security Domain, Monitoring Body

---

## ❓ Frequently Asked Questions

### Q: Do I need both Node.js and Python?
**A**: No! The **Node.js stack is primary and self-sufficient**. The Python API is **optional** and only needed for:
- Advanced AI model orchestration with TensorZero
- Specialized data processing with ClickHouse
- Microservice architecture requirements

### Q: How do I deploy to production?
**A**: Multiple options available:
1. **Firebase Hosting** (recommended): `npm run deploy`
2. **Google Cloud Run**: `bash scripts/one-click-cloudrun.sh`
3. **Docker**: `docker-compose up -d`

### Q: Can I use my own AI models?
**A**: Yes! The system supports:
- OpenAI GPT models (via TensorZero)
- Google Gemini (via Google AI SDK)
- Custom model endpoints (modify configuration)

### Q: How do I contribute?
**A**: 
1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Use safe integration: `bash scripts/safe_integrate.sh`
4. Submit a Pull Request

### Q: Is this production-ready?
**A**: The Node.js stack is production-ready with Firebase. The Python API is experimental and should be thoroughly tested before production use.

---

## 📊 Secrets & Configuration Table

| Secret/Variable | Required | Component | Description |
|----------------|----------|-----------|-------------|
| `FIREBASE_PROJECT_ID` | ✅ | Node.js | Firebase project identifier |
| `FIREBASE_SERVICE_ACCOUNT` | ✅ | CI/CD | Base64 encoded service account JSON |
| `OPENAI_API_KEY` | ⚠️ | Python API | Required for TensorZero AI features |
| `TENSORZERO_CLICKHOUSE_URL` | ⚠️ | Python API | ClickHouse database connection |
| `GCP_PROJECT_ID` | ⚠️ | Cloud Run | Google Cloud project for deployment |
| `GOOGLE_APPLICATION_CREDENTIALS` | ⚠️ | Local Dev | Path to service account JSON file |
| `GITHUB_TOKEN` | ✅ | CI/CD | Automatically provided by GitHub Actions |

**Legend**: ✅ = Required, ⚠️ = Optional/Conditional

---

## 🤝 Contributing

We welcome contributions to the JunAiKey ecosystem! Please see our contributing guidelines and join our Discord community for collaboration.

### Development Setup
1. Read the [WORKFLOW_GUIDE.md](./WORKFLOW_GUIDE.md)
2. Set up your environment with `.env.example`
3. Run the development servers
4. Use our safe integration tools

### Code Style
- TypeScript with strict mode
- ESLint with Next.js recommended rules
- Prettier for code formatting
- Conventional commits for Git messages

---

## 📄 License

JunAiKey is open source software licensed under the [MIT License](./LICENSE).

---

## 🆘 Support

- **Documentation**: Check the `docs/` directory
- **Issues**: GitHub Issues for bug reports
- **Discussions**: GitHub Discussions for questions
- **Security**: See [SECURITY.md](./SECURITY.md) for security policies

---

*Built with ❤️ by the JunAiKey Team - Empowering the future of AI agent systems through the Terminus Matrix architecture.*