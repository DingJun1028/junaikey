#!/bin/bash
set -e

# Generate documentation script for JunaiKey
# This script generates docs/site/index.md with current system status

echo "🔄 Generating JunaiKey documentation..."

# Create docs directory if it doesn't exist
mkdir -p docs/site

# Start generating the documentation
cat > docs/site/index.md << 'EOF'
# JunaiKey Documentation

*Generated automatically on $(date '+%Y-%m-%d %H:%M:%S UTC')*

## System Overview

JunaiKey is a secure, automated AI key management and deployment system with comprehensive cost governance.

## Current Configuration

### Environment Status
EOF

# Check and report environment variables (without exposing secrets)
echo "" >> docs/site/index.md
echo "### Environment Variables" >> docs/site/index.md
echo "" >> docs/site/index.md

# Function to check if env var is set (without showing value)
check_env_var() {
    local var_name=$1
    local description=$2
    
    if [ -n "${!var_name:-}" ]; then
        echo "- ✅ **$var_name**: $description (configured)" >> docs/site/index.md
    else
        echo "- ❌ **$var_name**: $description (not set)" >> docs/site/index.md
    fi
}

# Check key environment variables
check_env_var "STRAICO_API_KEY" "Straico API authentication"
check_env_var "GCP_PROJECT_ID" "Google Cloud project identifier"
check_env_var "GCP_SA_KEY" "Google Cloud service account key"
check_env_var "CLOUD_RUN_SERVICE" "Cloud Run service name"
check_env_var "REGION" "Deployment region"
check_env_var "ARTIFACT_REPO" "Artifact Registry repository"

# Straico Configuration
echo "" >> docs/site/index.md
echo "### Straico Configuration" >> docs/site/index.md
echo "" >> docs/site/index.md

STRAICO_MODE=${STRAICO_DEFAULT_MODE:-"per_word"}
STRAICO_MODEL=${STRAICO_MODEL:-"gpt-4-turbo"}
STRAICO_BUDGET=${STRAICO_DAILY_BUDGET:-"100.00"}

echo "- **Default Pricing Mode**: \`$STRAICO_MODE\`" >> docs/site/index.md
echo "- **Default Model**: \`$STRAICO_MODEL\`" >> docs/site/index.md
echo "- **Daily Budget**: \$${STRAICO_BUDGET}" >> docs/site/index.md

# Check if RAG is enabled
if [ "${STRAICO_ENABLE_RAG:-true}" = "true" ]; then
    echo "- **RAG Status**: ✅ Enabled (cost optimization active)" >> docs/site/index.md
else
    echo "- **RAG Status**: ❌ Disabled" >> docs/site/index.md
fi

# Check if fallbacks are enabled
if [ "${STRAICO_ENABLE_FALLBACKS:-true}" = "true" ]; then
    echo "- **Fallback Strategy**: ✅ Enabled (automatic cost management)" >> docs/site/index.md
else
    echo "- **Fallback Strategy**: ❌ Disabled" >> docs/site/index.md
fi

# Docker Compose Status
echo "" >> docs/site/index.md
echo "### Local Development" >> docs/site/index.md
echo "" >> docs/site/index.md

if [ -f "docker-compose.yml" ]; then
    echo "- ✅ **Docker Compose**: Available for local development" >> docs/site/index.md
    echo "  - PostgreSQL database with health checks" >> docs/site/index.md
    echo "  - Flyway database migrations" >> docs/site/index.md
    echo "  - API service with health endpoints" >> docs/site/index.md
else
    echo "- ❌ **Docker Compose**: Not configured" >> docs/site/index.md
fi

# GitHub Actions Status
echo "" >> docs/site/index.md
echo "### CI/CD Status" >> docs/site/index.md
echo "" >> docs/site/index.md

if [ -d ".github/workflows" ]; then
    echo "- ✅ **GitHub Actions**: Configured" >> docs/site/index.md
    
    # Count workflow files
    workflow_count=$(find .github/workflows -name "*.yml" -o -name "*.yaml" 2>/dev/null | wc -l)
    echo "  - **Workflow Count**: $workflow_count workflows" >> docs/site/index.md
    
    # List workflows
    for workflow in .github/workflows/*.yml; do
        if [ -f "$workflow" ]; then
            workflow_name=$(basename "$workflow" .yml)
            echo "  - \`$workflow_name\`: $(grep '^name:' "$workflow" | sed 's/name: *//' | tr -d '"' || echo "GitHub Action")" >> docs/site/index.md
        fi
    done
else
    echo "- ❌ **GitHub Actions**: Not configured" >> docs/site/index.md
fi

# Security Status
echo "" >> docs/site/index.md
echo "### Security Status" >> docs/site/index.md
echo "" >> docs/site/index.md

if [ -f ".github/workflows/ensure-sha-pinned.yml" ]; then
    echo "- ✅ **Action Pinning**: SHA pinning guard workflow active" >> docs/site/index.md
else
    echo "- ❌ **Action Pinning**: No SHA pinning guard configured" >> docs/site/index.md
fi

if [ -f ".github/dependabot.yml" ]; then
    echo "- ✅ **Dependency Updates**: Dependabot configured for security updates" >> docs/site/index.md
else
    echo "- ❌ **Dependency Updates**: No automated dependency updates" >> docs/site/index.md
fi

# Add usage instructions
cat >> docs/site/index.md << 'EOF'

## Quick Start Guide

### Local Development

1. **Start the development environment:**
   ```bash
   docker-compose up -d
   ```

2. **Check service health:**
   ```bash
   curl http://localhost:8080/health
   ```

3. **View logs:**
   ```bash
   docker-compose logs -f api
   ```

### Cloud Deployment

1. **Configure GitHub Secrets:**
   - `GCP_PROJECT_ID`: Your Google Cloud project ID
   - `GCP_SA_KEY`: Service account JSON key
   - `CLOUD_RUN_SERVICE`: Cloud Run service name
   - `REGION`: Deployment region (e.g., asia-east1)
   - `ARTIFACT_REPO`: Artifact Registry repository name

2. **Deploy to Cloud Run:**
   - Push to main branch for automatic deployment
   - Or trigger manually via GitHub Actions

### Cost Management

1. **Configure Straico settings in environment:**
   ```bash
   cp ops/straico/config.example.env .env
   # Edit .env with your settings
   ```

2. **Monitor usage:**
   ```python
   from ops.straico.example_orchestrator import StraicoOrchestrator
   orchestrator = StraicoOrchestrator()
   report = orchestrator.get_usage_report()
   print(report)
   ```

## Required GCP IAM Roles

Your service account needs these roles:

- **Cloud Run Admin** (`roles/run.admin`)
- **Artifact Registry Writer** (`roles/artifactregistry.writer`)
- **Storage Admin** (`roles/storage.admin`) *(if using Cloud Storage)*

## Troubleshooting

### Common Issues

1. **Docker Compose health checks failing:**
   - Check if PostgreSQL is ready: `docker-compose exec db pg_isready`
   - View service logs: `docker-compose logs <service_name>`

2. **Cloud Run deployment failing:**
   - Verify GCP credentials in GitHub Secrets
   - Check Artifact Registry permissions
   - Review GitHub Actions logs

3. **Cost alerts triggering:**
   - Check current usage with the orchestrator
   - Adjust budget limits in environment configuration
   - Enable fallback strategies if needed

### Support

For issues and questions:
- Check the repository issues
- Review the logs in GitHub Actions
- Consult the Straico documentation for API-specific issues

---

*This documentation is automatically generated. To update, modify the `scripts/generate_docs.sh` script.*
EOF

echo "✅ Documentation generated successfully at docs/site/index.md"

# Create a simple index.html for GitHub Pages
cat > docs/site/index.html << 'EOF'
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>JunaiKey Documentation</title>
    <script src="https://cdn.jsdelivr.net/npm/marked/marked.min.js"></script>
    <style>
        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial, sans-serif;
            line-height: 1.6;
            max-width: 900px;
            margin: 0 auto;
            padding: 20px;
            color: #333;
        }
        
        h1, h2, h3 { color: #2c3e50; }
        h1 { border-bottom: 2px solid #3498db; padding-bottom: 10px; }
        h2 { border-bottom: 1px solid #ecf0f1; padding-bottom: 5px; margin-top: 30px; }
        
        code {
            background: #f8f9fa;
            padding: 2px 6px;
            border-radius: 3px;
            font-family: 'Monaco', 'Consolas', monospace;
        }
        
        pre {
            background: #f8f9fa;
            padding: 15px;
            border-radius: 5px;
            overflow-x: auto;
            border-left: 4px solid #3498db;
        }
        
        pre code {
            background: none;
            padding: 0;
        }
        
        .status-indicator {
            display: inline-block;
            margin-right: 5px;
        }
        
        table {
            width: 100%;
            border-collapse: collapse;
            margin: 20px 0;
        }
        
        table th, table td {
            border: 1px solid #ddd;
            padding: 12px;
            text-align: left;
        }
        
        table th {
            background: #f8f9fa;
            font-weight: 600;
        }
        
        .header {
            text-align: center;
            margin-bottom: 40px;
            padding: 20px;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            border-radius: 10px;
        }
    </style>
</head>
<body>
    <div class="header">
        <h1>🔑 JunaiKey Documentation</h1>
        <p>Secure AI Key Management & Deployment System</p>
    </div>
    
    <div id="content">
        Loading documentation...
    </div>
    
    <script>
        fetch('index.md')
            .then(response => response.text())
            .then(markdown => {
                document.getElementById('content').innerHTML = marked.parse(markdown);
            })
            .catch(error => {
                document.getElementById('content').innerHTML = 
                    '<h2>Error loading documentation</h2><p>Please check that index.md exists in the same directory.</p>';
            });
    </script>
</body>
</html>
EOF

echo "✅ HTML wrapper created at docs/site/index.html"

# Optional: Generate OpenAPI/Swagger docs if API spec exists
if [ -f "api/openapi.yml" ] || [ -f "openapi.yml" ]; then
    echo "📋 OpenAPI specification found - consider integrating with Swagger UI"
fi

echo "🎉 Documentation generation complete!"
echo ""
echo "Generated files:"
echo "  - docs/site/index.md (Markdown documentation)"
echo "  - docs/site/index.html (HTML wrapper for GitHub Pages)"
echo ""
echo "To view locally:"
echo "  cd docs/site && python3 -m http.server 8000"
echo "  Then visit: http://localhost:8000"