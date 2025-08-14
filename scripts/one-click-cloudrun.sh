#!/usr/bin/env bash
# One-click Google Cloud Run deployment script for JunAiKey
# Usage: bash scripts/one-click-cloudrun.sh
# Prerequisites: gcloud CLI installed and .env file configured
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
ENV_FILE="${ROOT_DIR}/.env"

# Check if .env file exists
if [ ! -f "$ENV_FILE" ]; then 
    echo "❌ Missing .env file. Copy .env.example to .env and fill values."
    echo "   cp .env.example .env"
    echo "   # Edit .env with your values"
    exit 1
fi

# Load environment variables from .env file
# shellcheck disable=SC2046
export $(grep -E '^[A-Za-z_][A-Za-z0-9_]*=' "$ENV_FILE" | sed 's/^/export /')

# Validate required variables
req=(GCP_PROJECT_ID CLOUD_RUN_SERVICE REGION ARTIFACT_REPO)
for v in "${req[@]}"; do 
    if [ -z "${!v:-}" ]; then 
        echo "❌ Missing required variable $v in .env"
        exit 1
    fi
done

echo "🚀 Starting JunAiKey deployment to Google Cloud Run..."
echo "   Project: $GCP_PROJECT_ID"
echo "   Service: $CLOUD_RUN_SERVICE"
echo "   Region: $REGION"
echo "   Allow Unauthenticated: ${ALLOW_UNAUTH:-false}"

# Handle service account authentication if provided
tmp_key=""
if [ -n "${GCP_SA_KEY:-}" ]; then
    echo "🔐 Using service account authentication..."
    tmp_key="$(mktemp)"
    echo -n "$GCP_SA_KEY" | base64 -d > "$tmp_key"
    gcloud auth activate-service-account --key-file="$tmp_key"
else
    echo "🔐 Using current gcloud authentication..."
fi

# Set project and enable required services
echo "🔧 Setting up GCP project and services..."
gcloud config set project "$GCP_PROJECT_ID"
gcloud services enable artifactregistry.googleapis.com run.googleapis.com cloudbuild.googleapis.com --quiet

# Ensure Artifact Registry repository exists
echo "📦 Checking Artifact Registry repository..."
if ! gcloud artifacts repositories describe "$ARTIFACT_REPO" --location="$REGION" >/dev/null 2>&1; then
    echo "📦 Creating Artifact Registry repository: $ARTIFACT_REPO"
    gcloud artifacts repositories create "$ARTIFACT_REPO" \
        --repository-format=docker \
        --location="$REGION" \
        --description="JunAiKey images" \
        --quiet
else
    echo "📦 Artifact Registry repository already exists: $ARTIFACT_REPO"
fi

# Submit Cloud Build with substitutions
echo "🏗️  Submitting Cloud Build..."
subs="_CLOUD_RUN_SERVICE=${CLOUD_RUN_SERVICE},_REGION=${REGION},_ARTIFACT_REPO=${ARTIFACT_REPO},_ALLOW_UNAUTH=${ALLOW_UNAUTH:-false}"
gcloud builds submit "$ROOT_DIR" --config "$ROOT_DIR/cloudbuild.yaml" --substitutions="$subs"

# Clean up temporary service account key file
if [ -n "$tmp_key" ]; then
    shred -u "$tmp_key" 2>/dev/null || rm -f "$tmp_key"
fi

echo ""
echo "✅ Deployment complete!"
echo "🌐 Check your Cloud Run service in the Google Cloud Console:"
echo "   https://console.cloud.google.com/run/detail/${REGION}/${CLOUD_RUN_SERVICE}/metrics?project=${GCP_PROJECT_ID}"
echo ""
echo "📋 Next steps:"
if [ "${ALLOW_UNAUTH:-false}" = "true" ]; then
    echo "   • Your service allows unauthenticated access"
    echo "   • Find the service URL in the Cloud Run console"
else
    echo "   • Your service requires authentication"
    echo "   • Configure IAM bindings to allow access"
    echo "   • See docs/DEPLOY_CLOUDRUN_ONECLICK.md for details"
fi
echo ""
echo "🏗️  Check Cloud Build logs: https://console.cloud.google.com/cloud-build/builds?project=${GCP_PROJECT_ID}"