# SSH Key Setup Guide for GitHub Actions Deployment

## Overview

This guide explains how to set up SSH keys for automated deployment of the JunAiKey MCP Server using GitHub Actions.

## Prerequisites

- Access to your deployment server
- GitHub repository admin access
- SSH client installed locally
- Deployment server running Ubuntu/Debian Linux

## Step-by-Step Setup

### 1. Generate SSH Key Pair on Deployment Server

SSH into your deployment server and generate a new SSH key pair:

```bash
# SSH to your server
ssh your-username@your-server-ip

# Generate SSH key pair (use Ed25519 for better security)
ssh-keygen -t ed25519 -C "github-actions@junaikey" -f ~/.ssh/github_deploy

# When prompted:
# - Press Enter to use default location
# - Leave passphrase empty (required for GitHub Actions)
```

This creates two files:
- `~/.ssh/github_deploy` - Private key (keep secret!)
- `~/.ssh/github_deploy.pub` - Public key

### 2. Add Public Key to Authorized Keys

Still on the deployment server, authorize the key:

```bash
# Add public key to authorized_keys
cat ~/.ssh/github_deploy.pub >> ~/.ssh/authorized_keys

# Set correct permissions (very important!)
chmod 700 ~/.ssh
chmod 600 ~/.ssh/authorized_keys
chmod 600 ~/.ssh/github_deploy
chmod 644 ~/.ssh/github_deploy.pub
```

### 3. Test SSH Key Locally

From your local machine, copy the private key and test it:

```bash
# Copy private key from server to local machine
scp your-username@your-server-ip:~/.ssh/github_deploy /tmp/github_deploy

# Test SSH connection
ssh -i /tmp/github_deploy your-username@your-server-ip "echo 'SSH key works!'"

# If successful, you should see: "SSH key works!"
```

### 4. Add SSH Private Key to GitHub Secrets

1. **Copy the private key content:**
   ```bash
   # Display the private key (on server or from local copy)
   cat ~/.ssh/github_deploy
   ```

2. **Go to GitHub Repository:**
   - Navigate to your repository on GitHub
   - Click **Settings** → **Secrets and variables** → **Actions**

3. **Add the SSH_PRIVATE_KEY secret:**
   - Click **New repository secret**
   - Name: `SSH_PRIVATE_KEY`
   - Value: Paste the ENTIRE private key content, including:
     ```
     -----BEGIN OPENSSH PRIVATE KEY-----
     [key content]
     -----END OPENSSH PRIVATE KEY-----
     ```
   - Click **Add secret**

### 5. Add Other Required Secrets

Add these additional secrets in the same way:

| Secret Name | Description | Example Value |
|-------------|-------------|---------------|
| `SERVER_IP` | Your server's IP address | `192.168.1.100` or `server.example.com` |
| `SERVER_USER` | SSH username for deployment | `deploy` or `www-data` |
| `SERVER_PATH` | Deployment directory (optional) | `/opt/junaikey` (default) |

### 6. Clean Up Temporary Files

Remove the private key from your local machine:

```bash
# Delete temporary private key file
rm /tmp/github_deploy

# Verify it's deleted
ls /tmp/github_deploy 2>/dev/null && echo "Still exists!" || echo "Deleted successfully"
```

## Verification

### Test the Complete Workflow

1. **Trigger a deployment:**
   - Push to main branch, or
   - Manually trigger workflow from GitHub Actions tab

2. **Monitor the deployment:**
   - Go to **Actions** tab in your repository
   - Click on the running workflow
   - Expand the "🚢 Deploy to Server" step
   - Look for: "🎉 Deployment completed successfully!"

### Manual SSH Test

Test that GitHub Actions can SSH to your server:

```bash
# From your local machine (simulating GitHub Actions)
ssh -i /path/to/github_deploy -o StrictHostKeyChecking=no your-username@your-server-ip "hostname && whoami"
```

Expected output:
```
your-server-hostname
your-username
```

## Troubleshooting

### "Permission denied (publickey)"

**Cause:** SSH key not properly authorized or wrong permissions

**Solutions:**

1. Check authorized_keys file:
   ```bash
   cat ~/.ssh/authorized_keys | grep github-actions
   ```

2. Verify permissions:
   ```bash
   ls -la ~/.ssh/
   # Should show:
   # drwx------ (700) for ~/.ssh
   # -rw------- (600) for authorized_keys
   # -rw------- (600) for github_deploy
   ```

3. Check SSH daemon configuration:
   ```bash
   sudo grep -E "PubkeyAuthentication|AuthorizedKeysFile" /etc/ssh/sshd_config
   # Should show:
   # PubkeyAuthentication yes
   # AuthorizedKeysFile .ssh/authorized_keys
   ```

4. Restart SSH daemon if you made changes:
   ```bash
   sudo systemctl restart sshd
   ```

### "Connection timed out"

**Cause:** Firewall blocking SSH port or wrong server IP

**Solutions:**

1. Check firewall:
   ```bash
   sudo ufw status
   # Should show: 22/tcp ALLOW
   ```

2. Allow SSH if needed:
   ```bash
   sudo ufw allow 22/tcp
   sudo ufw reload
   ```

3. Verify server IP:
   ```bash
   ip addr show
   # Check your public IP
   curl ifconfig.me
   ```

### "Host key verification failed"

**Cause:** Server's host key changed or not in known_hosts

**Solution:** The workflow uses `-o StrictHostKeyChecking=no` to bypass this, but for manual testing:

```bash
# Remove old host key
ssh-keygen -R your-server-ip

# Connect again to add new key
ssh -i /path/to/github_deploy your-username@your-server-ip
```

### "ssh: option requires an argument -- i"

**Cause:** `SSH_PRIVATE_KEY` secret is empty or not set

**Solution:** Follow Step 4 above to properly add the secret

## Security Best Practices

### 1. Use Dedicated Deployment User

Don't deploy as root or your personal user:

```bash
# Create dedicated deployment user
sudo useradd -m -s /bin/bash deploy

# Add to necessary groups
sudo usermod -aG sudo deploy  # Only if needed

# Setup SSH keys for this user
sudo su - deploy
ssh-keygen -t ed25519 -C "github-actions@junaikey" -f ~/.ssh/github_deploy
```

### 2. Limit sudo Permissions

Allow specific commands only:

```bash
# Edit sudoers file for deploy user
sudo visudo -f /etc/sudoers.d/deploy

# Add these lines:
deploy ALL=(ALL) NOPASSWD: /bin/systemctl restart mcp-server
deploy ALL=(ALL) NOPASSWD: /bin/systemctl status mcp-server
deploy ALL=(ALL) NOPASSWD: /bin/systemctl stop mcp-server
deploy ALL=(ALL) NOPASSWD: /bin/systemctl start mcp-server
```

### 3. Rotate SSH Keys Regularly

Change SSH keys every 3-6 months:

```bash
# Generate new key
ssh-keygen -t ed25519 -C "github-actions@junaikey-$(date +%Y%m%d)" -f ~/.ssh/github_deploy_new

# Add new public key
cat ~/.ssh/github_deploy_new.pub >> ~/.ssh/authorized_keys

# Update GitHub Secret with new private key
# Test deployment works
# Remove old key from authorized_keys
```

### 4. Monitor SSH Access

Enable logging and monitor access:

```bash
# View SSH login attempts
sudo grep 'sshd' /var/log/auth.log | tail -20

# Monitor in real-time
sudo tail -f /var/log/auth.log | grep sshd
```

### 5. Use Firewall Rules

Restrict SSH access to GitHub Actions IPs if possible:

```bash
# Example: Allow SSH only from specific IPs
sudo ufw allow from GitHub.Actions.IP.Range to any port 22

# Or use rate limiting
sudo ufw limit 22/tcp
```

## Advanced Configuration

### Using SSH Agent Forwarding

Not recommended for production, but useful for testing:

```bash
# Start SSH agent
eval "$(ssh-agent -s)"

# Add key
ssh-add ~/.ssh/github_deploy

# Connect with forwarding
ssh -A your-username@your-server-ip
```

### Using SSH Config File

For easier local testing:

```bash
# Edit ~/.ssh/config
cat >> ~/.ssh/config << EOF

Host junaikey-deploy
    HostName your-server-ip
    User your-username
    IdentityFile ~/.ssh/github_deploy
    StrictHostKeyChecking no
EOF

# Now you can simply:
ssh junaikey-deploy
```

### Multiple Deployment Environments

For staging and production:

```bash
# Generate separate keys for each environment
ssh-keygen -t ed25519 -C "github-actions@junaikey-staging" -f ~/.ssh/github_deploy_staging
ssh-keygen -t ed25519 -C "github-actions@junaikey-production" -f ~/.ssh/github_deploy_prod

# Add both to GitHub Secrets:
# - SSH_PRIVATE_KEY_STAGING
# - SSH_PRIVATE_KEY_PRODUCTION

# Use in workflow with conditionals
```

## Alternative: Using SSH Certificates

For advanced users, SSH certificates provide better security:

```bash
# Generate CA key (one time)
ssh-keygen -t ed25519 -f ~/.ssh/github_ca

# Sign deployment key
ssh-keygen -s ~/.ssh/github_ca -I "github-actions" -n deploy -V +52w ~/.ssh/github_deploy.pub

# Configure SSH to trust the CA
echo "TrustedUserCAKeys /etc/ssh/github_ca.pub" | sudo tee -a /etc/ssh/sshd_config
sudo cp ~/.ssh/github_ca.pub /etc/ssh/github_ca.pub
sudo systemctl restart sshd
```

## Quick Reference

### Essential Commands

```bash
# Generate key
ssh-keygen -t ed25519 -C "github-actions@junaikey" -f ~/.ssh/github_deploy

# Add to authorized_keys
cat ~/.ssh/github_deploy.pub >> ~/.ssh/authorized_keys

# Test connection
ssh -i ~/.ssh/github_deploy user@server "echo Works"

# View private key (for GitHub Secret)
cat ~/.ssh/github_deploy

# Check permissions
ls -la ~/.ssh/

# Monitor SSH logs
sudo tail -f /var/log/auth.log | grep sshd
```

### GitHub Actions Workflow Reference

The deploy workflow uses these environment variables from secrets:

- `${{ secrets.SSH_PRIVATE_KEY }}` - Private SSH key
- `${{ secrets.SERVER_IP }}` - Server IP address
- `${{ secrets.SERVER_USER }}` - SSH username
- `${{ secrets.SERVER_PATH }}` - Deployment path (optional)

## Getting Help

If you encounter issues:

1. Check the [Deployment Troubleshooting Guide](./DEPLOYMENT_TROUBLESHOOTING.md)
2. Review GitHub Actions logs for specific error messages
3. Verify all secrets are set correctly in repository settings
4. Test SSH connection manually using the commands above
5. Check server logs: `sudo journalctl -u sshd -n 50`

## Resources

- [GitHub Actions Documentation](https://docs.github.com/en/actions)
- [SSH Key Best Practices](https://www.ssh.com/academy/ssh/key-management)
- [OpenSSH Manual](https://www.openssh.com/manual.html)
- [Deployment Setup Guide](./COMPLETE_SETUP_GUIDE.md)
