# JunAiKey Deployment Troubleshooting Guide

## Overview

This guide addresses common deployment failures and provides solutions for the JunAiKey MCP Server deployment pipeline.

## Recent Fixes (2025-10-19)

### TypeScript Syntax Errors Fixed

The following TypeScript syntax errors that were blocking deployments have been resolved:

#### 1. **stardust-story-generator.ts** - Missing closing bracket in generic type
**Error:** `z.array(z.string>)` 
**Fixed:** `z.array(z.string())`
**Location:** Line 194

#### 2. **game.ts** - Enum members with spaces
**Error:** 
```typescript
MAIN PHASE = 'main_phase',
COMBAT PHASE = 'combat_phase',
END PHASE = 'end_phase',
```
**Fixed:**
```typescript
MAIN_PHASE = 'main_phase',
COMBAT_PHASE = 'combat_phase',
END_PHASE = 'end_phase',
```
**Location:** Lines 45-47

#### 3. **game.ts** - Missing comment marker
**Error:** `    靈敏度設置類型`
**Fixed:** `// 靈敏度設置類型`
**Location:** Line 684

#### 4. **partner.ts** - Missing comment marker and alignment
**Error:** `modeling: number;                建模`
**Fixed:** `modeling: number;                 // 建模`
**Location:** Line 307

#### 5. **partner.ts** - Incomplete file structure
**Fixed:** Added missing interface definitions and properly closed all structures

## Common Deployment Failures

### 1. SSH_PRIVATE_KEY Not Configured

**Symptom:**
```
ssh: option requires an argument -- i
usage: ssh [-46AaCfGgKkMNnqsTtVvXxYy] [-B bind_interface] ...
```

**Root Cause:**
The `SSH_PRIVATE_KEY` secret is empty or not configured in GitHub repository settings.

**Solution:**

1. Generate an SSH key pair on your deployment server:
   ```bash
   ssh-keygen -t ed25519 -C "github-actions@junaikey" -f ~/.ssh/github_deploy
   ```

2. Add the public key to authorized_keys on the deployment server:
   ```bash
   cat ~/.ssh/github_deploy.pub >> ~/.ssh/authorized_keys
   chmod 600 ~/.ssh/authorized_keys
   ```

3. Add the private key to GitHub Secrets:
   - Go to your repository → Settings → Secrets and variables → Actions
   - Click "New repository secret"
   - Name: `SSH_PRIVATE_KEY`
   - Value: Copy the entire contents of `~/.ssh/github_deploy` (including headers)
   ```bash
   cat ~/.ssh/github_deploy
   ```

4. Also configure these secrets in GitHub:
   - `SERVER_IP`: Your deployment server IP address
   - `SERVER_USER`: SSH username for deployment (e.g., `www-data` or your user)
   - `SERVER_PATH`: Deployment directory path (default: `/opt/junaikey`)

### 2. TypeScript Build Failures

**Symptom:**
```
Parse errors preventing Jest from collecting coverage
TypeScript compiler errors
```

**Root Cause:**
Invalid TypeScript syntax including:
- Malformed generic types
- Enum members with spaces
- Missing comment markers
- Non-ASCII identifiers in invalid positions

**Solution:**
All known TypeScript syntax errors have been fixed in this update. To verify:

```bash
npm run build
```

This should complete successfully now.

### 3. Server Not Accessible via SSH

**Symptom:**
```
Connection timed out
Permission denied (publickey)
```

**Solutions:**

#### Check SSH Access:
```bash
ssh -i ~/.ssh/deploy_key user@server-ip
```

#### Verify Server Configuration:
```bash
# On deployment server
sudo systemctl status sshd
sudo ufw status  # Check firewall
```

#### Update SSH Configuration if Needed:
```bash
# /etc/ssh/sshd_config
PubkeyAuthentication yes
AuthorizedKeysFile .ssh/authorized_keys
PermitRootLogin no  # Use specific user instead
```

### 4. MCP Server Service Failures

**Symptom:**
```
Failed to start mcp-server service
```

**Solutions:**

#### Check Service Status:
```bash
sudo systemctl status mcp-server
sudo journalctl -u mcp-server -n 50
```

#### Verify Service File:
```bash
cat /etc/systemd/system/mcp-server.service
```

#### Common Issues:
- Node.js not installed or wrong version (need ≥18)
- Missing dependencies
- Incorrect paths in service file
- Permission issues

## Deployment Workflow Verification

### Pre-Deployment Checklist

- [ ] TypeScript builds successfully locally: `npm run build`
- [ ] Tests pass (or known failures are documented): `npm test`
- [ ] All required GitHub Secrets are configured:
  - [ ] `SSH_PRIVATE_KEY`
  - [ ] `SERVER_IP`
  - [ ] `SERVER_USER`
  - [ ] `SERVER_PATH` (optional, defaults to `/opt/junaikey`)
- [ ] Deployment server is accessible via SSH
- [ ] Node.js ≥18 installed on deployment server
- [ ] Deployment directory exists and has correct permissions

### Testing Deployment Locally

You can test the deployment steps manually:

```bash
# 1. Build the project
npm ci
npm run build

# 2. Test SSH connection
ssh -i /path/to/private/key user@server-ip "echo 'SSH works'"

# 3. Test service operations
ssh -i /path/to/private/key user@server-ip "sudo systemctl status mcp-server"
```

## Automated Deployment Pipeline

The deployment workflow (`deploy.yml`) performs these steps:

1. **Checkout** - Fetches latest code
2. **Setup Node.js** - Installs Node.js 20
3. **Install Dependencies** - Runs `npm ci`
4. **Build Project** - Runs `npm run build`
5. **Run Tests** - Runs `npm test` (continues on error)
6. **Setup SSH** - Configures SSH key from secrets
7. **Deploy to Server** - SSHs to server and:
   - Pulls latest code
   - Installs dependencies
   - Builds project
   - Restarts mcp-server service
8. **Cleanup** - Removes SSH key

## Monitoring Deployments

### View Deployment Status

- GitHub Actions tab shows workflow runs
- Each run shows detailed logs for each step
- Failed steps are highlighted in red

### Check Server Logs

```bash
# View recent logs
sudo journalctl -u mcp-server -n 100 -f

# Check service status
sudo systemctl status mcp-server

# View application logs if configured
tail -f /opt/junaikey/logs/app.log
```

## Rolling Back Failed Deployments

If a deployment fails and you need to rollback:

```bash
# SSH to server
ssh user@server-ip

# Navigate to deployment directory
cd /opt/junaikey

# Check recent commits
git log --oneline -10

# Rollback to previous commit
git reset --hard <previous-commit-sha>

# Rebuild
npm ci --production
npm run build

# Restart service
sudo systemctl restart mcp-server
```

## Getting Help

If you encounter issues not covered in this guide:

1. Check GitHub Actions logs for detailed error messages
2. Review deployment script: `.github/workflows/deploy.yml`
3. Check server logs: `sudo journalctl -u mcp-server`
4. Verify all prerequisites are met
5. Open an issue with:
   - Error message
   - Deployment workflow run link
   - Server configuration details

## Security Notes

- Never commit SSH private keys to the repository
- Use GitHub Secrets for all sensitive data
- Regularly rotate SSH keys
- Use least-privilege principles (don't deploy as root)
- Enable RLS (Row Level Security) on Supabase
- Keep Node.js and dependencies updated

## Additional Resources

- [GitHub Actions Documentation](https://docs.github.com/en/actions)
- [SSH Key Setup Guide](./SSH_KEYS.md)
- [Server Setup Guide](./COMPLETE_SETUP_GUIDE.md)
- [Health Check Script](./health-check.sh)
