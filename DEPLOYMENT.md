# 🚀 Deployment Guide

This document provides instructions for deploying the JunAiKey MCP Server using the automated GitHub Actions workflow.

## Overview

The deployment workflow (`.github/workflows/deploy.yml`) automatically builds and deploys your project to a server when changes are pushed to the `main` branch. The workflow can also be triggered manually.

## Prerequisites

Before you can use the automated deployment, you need:

1. A server with SSH access (Linux/Unix)
2. Node.js installed on the server (version 18 or higher)
3. Git installed on the server
4. The repository cloned on your server
5. A process manager (systemd or pm2) to manage the MCP server

## Configuration

### Step 1: Setup GitHub Secrets

To enable automated deployment, you need to configure the following secrets in your GitHub repository:

1. Go to your repository on GitHub
2. Navigate to: **Settings** → **Secrets and variables** → **Actions**
3. Click **New repository secret**
4. Add the following secrets:

| Secret Name | Description | Example |
|-------------|-------------|---------|
| `DEPLOY_SERVER_HOST` | Your server's hostname or IP address | `example.com` or `192.168.1.100` |
| `DEPLOY_SERVER_USER` | SSH username for connecting to the server | `ubuntu`, `root`, or your username |
| `DEPLOY_SERVER_PATH` | Absolute path to the project directory on the server | `/home/ubuntu/junaikey` |
| `DEPLOY_SSH_KEY` | Private SSH key for authentication | (see below) |

### Step 2: Generate SSH Key

If you don't already have an SSH key for deployment:

```bash
# Generate a new SSH key (on your local machine)
ssh-keygen -t ed25519 -C "github-actions-deploy" -f ~/.ssh/junaikey-deploy

# Copy the public key to your server
ssh-copy-id -i ~/.ssh/junaikey-deploy.pub user@your-server-ip

# Display the private key (copy this entire output)
cat ~/.ssh/junaikey-deploy
```

Copy the **entire private key** (including `-----BEGIN` and `-----END` lines) and add it as the `DEPLOY_SSH_KEY` secret in GitHub.

### Step 3: Server Setup

On your deployment server, ensure the following:

1. **Clone the repository** (if not already done):
   ```bash
   cd /home/your-username
   git clone https://github.com/DingJun1028/junaikey.git
   cd junaikey
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Build the project**:
   ```bash
   npm run build
   ```

4. **Setup process manager** (choose one):

   **Option A: Using systemd**
   ```bash
   # Create a systemd service file
   nano ~/.config/systemd/user/mcp-server.service
   ```
   
   Add the following content:
   ```ini
   [Unit]
   Description=JunAiKey MCP Server
   After=network.target

   [Service]
   Type=simple
   WorkingDirectory=/home/your-username/junaikey
   ExecStart=/usr/bin/node /home/your-username/junaikey/dist/mcpServer.js
   Restart=always
   RestartSec=10

   [Install]
   WantedBy=default.target
   ```
   
   Enable and start the service:
   ```bash
   systemctl --user daemon-reload
   systemctl --user enable mcp-server
   systemctl --user start mcp-server
   ```

   **Option B: Using PM2**
   ```bash
   # Install PM2 globally
   npm install -g pm2
   
   # Start the MCP server
   pm2 start dist/mcpServer.js --name mcp-server
   
   # Save PM2 configuration
   pm2 save
   
   # Setup PM2 to start on boot
   pm2 startup
   ```

## Usage

### Automatic Deployment

Once configured, the deployment happens automatically:

1. Push changes to the `main` branch
2. GitHub Actions will:
   - Check out the code
   - Install dependencies
   - Build the project
   - Deploy to your server via SSH
   - Restart the MCP server

### Manual Deployment

You can also trigger deployment manually:

1. Go to your repository on GitHub
2. Navigate to: **Actions** → **Deploy MCP Server**
3. Click **Run workflow**
4. Select the `main` branch
5. Click **Run workflow**

## Troubleshooting

### Deployment is Skipped

If you see "⚠️ Deployment skipped: Server configuration not found", it means the GitHub secrets are not configured. Follow Step 1 above.

### SSH Connection Failed

- Verify `DEPLOY_SERVER_HOST` is correct
- Ensure the SSH key has been added to the server's `~/.ssh/authorized_keys`
- Check that the server allows SSH connections

### Build Failed on Server

- Ensure Node.js is installed on the server
- Verify the `DEPLOY_SERVER_PATH` points to the correct directory
- Check server logs: `systemctl --user status mcp-server` or `pm2 logs mcp-server`

### Permission Denied

- Ensure the SSH user has write access to the deployment directory
- For systemd: Make sure the user has permission to restart services
- For PM2: Ensure PM2 is installed and accessible

## Security Best Practices

1. **Use a dedicated deployment key**: Don't use your personal SSH key
2. **Limit key permissions**: The deployment key should only have access to the project directory
3. **Use SSH key authentication**: Never use password-based authentication
4. **Keep secrets secure**: Never commit secrets to the repository
5. **Regular key rotation**: Periodically generate new SSH keys

## Alternative Deployment Methods

If you prefer not to use the automated workflow, you can deploy manually:

```bash
# On your server
cd /home/your-username/junaikey
git pull
npm ci
npm run build
systemctl --user restart mcp-server  # or: pm2 restart mcp-server
```

## Support

For issues with the deployment workflow:
- Check the [GitHub Actions logs](../../actions)
- Review server logs: `journalctl --user -u mcp-server -f` or `pm2 logs mcp-server`
- Open an issue in the repository

## References

- [GitHub Actions Documentation](https://docs.github.com/en/actions)
- [GitHub Encrypted Secrets](https://docs.github.com/en/actions/security-guides/encrypted-secrets)
- [SSH Key Authentication](https://www.ssh.com/academy/ssh/key)
