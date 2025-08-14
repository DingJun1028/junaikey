# 🔑 JunaiKey - AI Key Management & Deployment System

**一見即一鍵｜完美版智能體落地包** - One-click install → auto generate → healthy startup → secure workflows → cost governance → auto PR → Docs online.

JunaiKey is a comprehensive, secure, and automated delivery system for AI-powered applications with built-in cost governance, health checks, and deployment automation.

## ✨ Features

- **🔒 Security First**: All GitHub Actions pinned to commit SHAs, dependency security scanning
- **🚀 One-Click Deployment**: Automated Cloud Run deployment with health checks
- **💰 Cost Governance**: Intelligent Straico pricing mode optimization and budget controls
- **🔄 Healthy Startup**: Docker Compose with dependency health checks (DB → Migration → API)
- **📚 Auto Documentation**: Self-updating documentation with GitHub Pages
- **🛠️ Developer Tools**: One-click PR creation and local development setup

## 🚀 Quick Start

### 1. Local Development Setup

```bash
# Clone the repository
git clone <repository-url>
cd junaikey

# Start the development environment
docker-compose up -d

# Check service health
curl http://localhost:8080/health

# View the development interface
open http://localhost:8080
```

### 2. Cloud Deployment Setup

Configure the following GitHub Secrets for automated Cloud Run deployment:

#### Required Secrets

| Secret Name | Description | Example |
|-------------|-------------|---------|
| `GCP_PROJECT_ID` | Your Google Cloud project ID | `my-project-123` |
| `GCP_SA_KEY` | Service account JSON key | `{"type": "service_account"...}` |
| `CLOUD_RUN_SERVICE` | Cloud Run service name | `junaikey-service` |
| `REGION` | Deployment region | `asia-east1` |
| `ARTIFACT_REPO` | Artifact Registry repository | `junaikey-repo` |

#### Optional Secrets

| Secret Name | Description | Default |
|-------------|-------------|---------|
| `ALLOW_UNAUTH` | Allow public access to Cloud Run | `false` |

#### Required GCP Service Account Roles

Your service account needs these IAM roles:

- **Cloud Run Admin** (`roles/run.admin`)
- **Artifact Registry Writer** (`roles/artifactregistry.writer`) 
- **Storage Admin** (`roles/storage.admin`) *(if using Cloud Storage)*

#### Setting up the Service Account

```bash
# Create service account
gcloud iam service-accounts create junaikey-deploy \
    --display-name="JunaiKey Deployment Service Account"

# Assign required roles
gcloud projects add-iam-policy-binding YOUR_PROJECT_ID \
    --member="serviceAccount:junaikey-deploy@YOUR_PROJECT_ID.iam.gserviceaccount.com" \
    --role="roles/run.admin"

gcloud projects add-iam-policy-binding YOUR_PROJECT_ID \
    --member="serviceAccount:junaikey-deploy@YOUR_PROJECT_ID.iam.gserviceaccount.com" \
    --role="roles/artifactregistry.writer"

# Create and download key
gcloud iam service-accounts keys create key.json \
    --iam-account=junaikey-deploy@YOUR_PROJECT_ID.iam.gserviceaccount.com

# Add the key content to GitHub Secrets as GCP_SA_KEY
```

### 3. Straico Cost Governance Setup

```bash
# Copy the configuration template
cp ops/straico/config.example.env .env

# Edit the configuration
nano .env
```

Key environment variables:

```bash
# Required
STRAICO_API_KEY=your_api_key_here
STRAICO_DEFAULT_MODE=per_word  # or per_message
STRAICO_MODEL=gpt-4-turbo

# Budget controls
STRAICO_DAILY_BUDGET=100.00
STRAICO_MONTHLY_BUDGET=2000.00
STRAICO_WARN_THRESHOLD=0.8
STRAICO_HARD_LIMIT=1.0

# Fallback strategies
STRAICO_ENABLE_FALLBACKS=true
STRAICO_FALLBACK_MODEL=gpt-3.5-turbo
STRAICO_ENABLE_RAG=true
```

## 📋 Architecture Overview

### Local Development Stack

```
┌─────────────────────────────────────────────┐
│                Docker Compose              │
├─────────────────────────────────────────────┤
│  ┌─────────┐  ┌──────────────┐  ┌────────┐  │
│  │   DB    │→ │  Migration   │→ │  API   │  │
│  │ (PG 16) │  │  (Flyway)    │  │ Service│  │
│  └─────────┘  └──────────────┘  └────────┘  │
└─────────────────────────────────────────────┘
```

### Cloud Deployment Pipeline

```
GitHub → Actions → Artifact Registry → Cloud Run
   ↓         ↓            ↓             ↓
   📝       🔒          📦           🚀
  Code   Security    Container    Service
        Scanning     Storage      Hosting
```

### Cost Management Flow

```
Request → Estimate → Mode Selection → API Call → Tracking
   ↓         ↓           ↓            ↓         ↓
   📝       💰         📊          🤖       📈
  Input   Cost      Per-word/    Straico   Usage
         Calc     Per-message     API      Stats
```

## 🛠️ Development Workflow

### Making Changes

```bash
# 1. Make your changes
git add .

# 2. Use the one-click PR helper
./scripts/one-click-pr.sh

# The script will:
# - Create a feature branch
# - Commit your changes  
# - Push to GitHub
# - Create a pull request
```

### Running Tests

```bash
# Start the development environment
docker-compose up -d

# Run health checks
docker-compose exec api curl -f http://localhost/health

# Check database connectivity
docker-compose exec db pg_isready -U junaikey

# View logs
docker-compose logs -f
```

### Cost Testing

```bash
# Test the cost orchestrator
cd ops/straico
python3 example_orchestrator.py

# Monitor usage
python3 -c "
from example_orchestrator import StraicoOrchestrator
orchestrator = StraicoOrchestrator()
print(orchestrator.get_usage_report())
"
```

## 📖 Documentation

Auto-generated documentation is available at:
- **GitHub Pages**: [Your repository pages URL]
- **Local**: Run `scripts/generate_docs.sh` and open `docs/site/index.html`

The documentation includes:
- Current system configuration status
- Environment variable status (without exposing secrets)
- Straico mode and budget information
- Service health status
- Setup and troubleshooting guides

## 🔒 Security Features

### GitHub Actions Security
- **SHA Pinning**: All third-party actions pinned to full commit SHAs
- **Guard Workflow**: Automatic blocking of unpinned actions in PRs
- **Dependabot**: Weekly security updates for actions and dependencies

### Secrets Management
- No secrets in code or logs
- Environment-based configuration
- Secure GitHub Secrets integration
- Safe documentation generation (secrets status only)

### Docker Security
- Health checks for all services
- Non-root containers where possible
- Minimal base images
- Dependency scanning

## 💰 Cost Management

### Pricing Modes

**Per-Word Mode**: Best for short interactions
- Charges based on token count
- More predictable for brief exchanges
- Better for chatbots and quick queries

**Per-Message Mode**: Best for long content
- Fixed rate per request
- More economical for lengthy documents
- Better for document analysis and generation

### Automatic Optimization

The system automatically:
1. **Estimates costs** for both pricing modes
2. **Selects the cheaper option** based on content length
3. **Applies fallback strategies** when approaching budget limits:
   - Switch to cheaper models
   - Enable RAG to reduce tokens
   - Queue requests for off-peak processing
   - Graceful degradation with cached responses

### Budget Controls

- **Warning thresholds** at 80% of budget
- **Hard limits** at 100% to prevent overage
- **Per-request limits** for cost control
- **Daily/monthly tracking** with alerts

## 🔧 Troubleshooting

### Common Issues

**Docker Compose Issues**
```bash
# Check service status
docker-compose ps

# View service logs
docker-compose logs <service-name>

# Reset environment
docker-compose down -v
docker-compose up -d
```

**Cloud Run Deployment Issues**
```bash
# Check GitHub Actions logs in the Actions tab
# Verify GCP credentials in repository settings
# Ensure Artifact Registry is enabled in your GCP project
```

**Cost Governance Issues**
```bash
# Check API key validity
# Verify budget configurations in .env
# Review usage reports in logs
```

### Getting Help

- **Issues**: Create a GitHub issue with detailed information
- **Discussions**: Use GitHub Discussions for questions
- **Documentation**: Check the auto-generated docs
- **Logs**: Always include relevant logs when reporting issues

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Use `./scripts/one-click-pr.sh` to create a PR
5. Ensure all security checks pass

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

**一見即一鍵** - See it, click it, done! 🚀
