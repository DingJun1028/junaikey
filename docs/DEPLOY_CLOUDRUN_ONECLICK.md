# One-Click Google Cloud Run Deployment

This guide provides a streamlined, secure deployment process for JunAiKey to Google Cloud Run using Cloud Build. The deployment is fully driven by environment variables and can be executed with a single command.

## Prerequisites

### 1. Google Cloud CLI
Install the [Google Cloud CLI](https://cloud.google.com/sdk/docs/install) and authenticate:

```bash
# Install gcloud (platform-specific instructions at link above)
gcloud auth login
gcloud config set project YOUR_PROJECT_ID
```

### 2. Application Code
**TODO**: Ensure your application includes a `Dockerfile` in the root directory. The deployment process requires a containerized application.

### 3. Required APIs
The deployment script automatically enables these APIs, but you can enable them manually:

```bash
gcloud services enable artifactregistry.googleapis.com
gcloud services enable run.googleapis.com  
gcloud services enable cloudbuild.googleapis.com
```

### 4. Service Account (Optional but Recommended)
Create a service account with the following roles for automated deployments:

- **Cloud Run Admin** (`roles/run.admin`)
- **Artifact Registry Admin** (`roles/artifactregistry.admin`) or Writer with proper permissions
- **Cloud Build Editor** (`roles/cloudbuild.builds.editor`) - if using Cloud Build triggers

```bash
# Create service account
gcloud iam service-accounts create junaikey-deployer \
    --description="JunAiKey deployment service account" \
    --display-name="JunAiKey Deployer"

# Grant required roles
gcloud projects add-iam-policy-binding YOUR_PROJECT_ID \
    --member="serviceAccount:junaikey-deployer@YOUR_PROJECT_ID.iam.gserviceaccount.com" \
    --role="roles/run.admin"

gcloud projects add-iam-policy-binding YOUR_PROJECT_ID \
    --member="serviceAccount:junaikey-deployer@YOUR_PROJECT_ID.iam.gserviceaccount.com" \
    --role="roles/artifactregistry.admin"

gcloud projects add-iam-policy-binding YOUR_PROJECT_ID \
    --member="serviceAccount:junaikey-deployer@YOUR_PROJECT_ID.iam.gserviceaccount.com" \
    --role="roles/cloudbuild.builds.editor"

# Create and download key
gcloud iam service-accounts keys create key.json \
    --iam-account=junaikey-deployer@YOUR_PROJECT_ID.iam.gserviceaccount.com
```

## Configuration

### 1. Create Environment File
Copy the example environment file and customize it:

```bash
cp .env.example .env
```

### 2. Configure Variables
Edit `.env` with your specific values:

```bash
# Required
GCP_PROJECT_ID="your-actual-project-id"        # Replace with your GCP project ID
GCP_SA_KEY=""                                  # Base64-encoded service account JSON (optional)
CLOUD_RUN_SERVICE="junaikey-service"           # Cloud Run service name
REGION="asia-east1"                           # GCP region for deployment
ARTIFACT_REPO="junaikey-docker-repo"          # Artifact Registry repository name

# Optional
ALLOW_UNAUTH="true"                           # Allow unauthenticated access
```

### 3. Base64 Encode Service Account Key (Optional)
If using a service account key file:

**Linux:**
```bash
base64 -w0 < key.json
```

**macOS:**
```bash
base64 -i key.json
```

Copy the output and paste it as the value for `GCP_SA_KEY` in your `.env` file.

## Usage

### Deploy with One Command
```bash
bash scripts/one-click-cloudrun.sh
```

The script will:
1. ✅ Validate your `.env` configuration
2. 🔐 Authenticate with Google Cloud (using service account or current auth)
3. 🔧 Enable required Google Cloud APIs
4. 📦 Create Artifact Registry repository (if it doesn't exist)
5. 🏗️ Submit Cloud Build job to build, push, and deploy
6. 🧹 Clean up temporary files securely

### Monitor Progress
- **Cloud Build Logs**: https://console.cloud.google.com/cloud-build/builds
- **Cloud Run Console**: https://console.cloud.google.com/run

## Configuration Options

### Region Selection
Change the `REGION` variable in `.env` to deploy to a different region:
```bash
REGION="us-central1"     # North America
REGION="europe-west1"    # Europe
REGION="asia-southeast1" # Southeast Asia
```

### Authentication Settings
Control public access with the `ALLOW_UNAUTH` setting:

**Public Access (Default):**
```bash
ALLOW_UNAUTH="true"
```
- Service will be publicly accessible
- No authentication required

**Private Access:**
```bash
ALLOW_UNAUTH="false"
```
- Service requires authentication
- Configure IAM bindings for access (see below)

### Custom Service Names
Customize the service and repository names:
```bash
CLOUD_RUN_SERVICE="my-custom-service-name"
ARTIFACT_REPO="my-custom-repo-name"
```

## Managing Access

### Public Services (ALLOW_UNAUTH="true")
Your service URL will be available in the Cloud Run console. The service will be publicly accessible.

### Private Services (ALLOW_UNAUTH="false")
Grant access to specific users or service accounts:

```bash
# Allow a specific user
gcloud run services add-iam-policy-binding junaikey-service \
    --region=asia-east1 \
    --member="user:someone@example.com" \
    --role="roles/run.invoker"

# Allow all authenticated users in your organization
gcloud run services add-iam-policy-binding junaikey-service \
    --region=asia-east1 \
    --member="domain:your-domain.com" \
    --role="roles/run.invoker"
```

## Coexistence with GitHub Actions

This one-click deployment complements the existing GitHub Actions workflow from PR #2. Use each method as appropriate:

### Use One-Click Deployment When:
- 🧪 Testing local changes quickly  
- 🚀 Manual deployments from development environment
- 🛠️ Initial setup and configuration
- 🔧 Debugging deployment issues

### Use GitHub Actions When:
- 🔄 Automated CI/CD pipeline
- 🏷️ Production releases with proper versioning
- 👥 Team-based deployments with reviews
- 🔒 Enhanced security with GitHub secrets management

Both methods deploy to the same Cloud Run service and can be used interchangeably.

## Troubleshooting

### Common Issues

**"Missing .env file"**
```bash
cp .env.example .env
# Edit .env with your values
```

**"Permission denied" errors**
- Verify your service account has the required roles
- Check that APIs are enabled in your project
- Ensure your gcloud CLI is authenticated

**"Dockerfile not found"**
- Ensure your application has a `Dockerfile` in the root directory
- The Dockerfile should expose the correct port for Cloud Run

**Build failures**
- Check Cloud Build logs in the Google Cloud Console
- Verify your Dockerfile builds successfully locally
- Ensure all application dependencies are properly specified

### Platform Compatibility

**Linux/macOS**: Fully supported
**Windows**: Use WSL (Windows Subsystem for Linux) or Git Bash

### Security Best Practices

1. **Never commit `.env` files** - they contain sensitive data
2. **Use service account keys securely** - store them outside your repository
3. **Rotate service account keys regularly**
4. **Use least-privilege IAM roles**
5. **Enable audit logging** for production deployments

## Validation Checklist

After deployment, verify:

- [ ] `.env` file is properly configured
- [ ] `bash scripts/one-click-cloudrun.sh` completes successfully
- [ ] Artifact Registry repository exists with tagged image
- [ ] Cloud Run service is deployed and running in specified region
- [ ] Service is accessible according to `ALLOW_UNAUTH` setting
- [ ] Cloud Build logs show successful build and deployment

## Support

For issues or questions:
1. Check Cloud Build logs for build failures
2. Check Cloud Run logs for runtime issues  
3. Verify IAM permissions and enabled APIs
4. Ensure Dockerfile exists and builds correctly