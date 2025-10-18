# 🚀 JunAiKey Quick Start Guide

Welcome to JunAiKey! This guide will help you get started in 5 minutes.

## Table of Contents

- [Prerequisites](#prerequisites)
- [5-Minute Quick Start](#5-minute-quick-start)
- [Core Features Experience](#core-features-experience)
- [Environment Configuration](#environment-configuration)
- [Verify Installation](#verify-installation)
- [Mobile Usage](#mobile-usage)
- [Common Issues](#common-issues)
- [Next Steps](#next-steps)

## Prerequisites

Before starting, ensure your system has the following installed:

- **Node.js** >= 18.0.0
- **npm** >= 8.0.0
- **Git** >= 2.30.0

### Check Versions

```bash
node --version   # Should be >= v18.0.0
npm --version    # Should be >= 8.0.0
git --version    # Should be >= 2.30.0
```

### Install Missing Tools

**Node.js & npm:**
- Download from [nodejs.org](https://nodejs.org/)
- Recommended: Install the LTS (Long Term Support) version

**Git:**
- Download from [git-scm.com](https://git-scm.com/)

## 5-Minute Quick Start

### Step 1: Clone Repository (1 minute)

```bash
# Clone the project
git clone https://github.com/DingJun1028/junaikey.git

# Navigate to project directory
cd junaikey
```

### Step 2: Install Dependencies (2 minutes)

```bash
npm install
```

This will install all necessary dependencies. The first install may take a few minutes.

### Step 3: Configure Environment (1 minute)

```bash
# Copy example environment file
cp .env.example .env
```

Basic functionality works without configuration. For full features, see [Environment Configuration](#environment-configuration).

### Step 4: Start Development Server (1 minute)

```bash
npm run dev
```

You should see output similar to:

```text
  VITE v5.0.0  ready in 1234 ms

  ➜  Local:   http://localhost:3000/
  ➜  Network: use --host to expose
  ➜  press h to show help
```

### Step 5: Start Using!

Open http://localhost:3000 in your browser to see JunAiKey's welcome page!

## Core Features Experience

### 1. OmniKey Sphere

Click the glowing sphere in the center of the screen—this is your "Home Anchor":

- **Single Click**: Return to homepage
- **Long Press**: Open quick menu
- **Drag**: Move position (mobile only)

### 2. Element Card System

In the left sidebar, you can see the 12 element spirits:

1. 🟡 **Aurex (Order)** - Brilliant Gold
2. 🟢 **Sylfa (Growth)** - Emerald Green
3. 🔵 **Aquare (Thought)** - Deep Sea Blue
4. 🔴 **Pyra (Action)** - Crimson Red
5. 🟤 **Terrax (Stability)** - Ochre Brown

Click any card to view details and unlock progress.

### 3. Six-Way Sync

Navigate to the "Sync Center" to experience one-click sync to multiple platforms:

```text
Homepage → Sync Center → Add Platform → Test Sync
```

## Environment Configuration

### Basic Configuration (Optional)

Edit the `.env` file:

```env
# Server port (default: 3000)
PORT=3000

# Environment mode (development/production)
NODE_ENV=development
```

### Full Configuration (Advanced Features)

To use all features, configure the following services:

#### 1. Supabase (Data Storage)

```env
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_key
```

**How to Get:**
1. Go to [Supabase](https://supabase.com/)
2. Create a new project
3. Find URL and Key in Settings > API

#### 2. AI Services (Optional)

```env
# Straico AI
VITE_STRAICO_API_KEY=your_straico_key

# OpenAI
VITE_OPENAI_API_KEY=your_openai_key

# Google Gemini
VITE_GEMINI_API_KEY=your_gemini_key
```

#### 3. Sync Platforms (Optional)

```env
# Notion
NOTION_TOKEN=your_notion_token
NOTION_DB_FAVORITES=your_database_id

# Capacities
CAPACITIES_TOKEN=your_capacities_token

# AITable
AITABLE_TOKEN=your_aitable_token
AITABLE_TABLE_ID=your_table_id
```

For detailed configuration instructions, see [Environment Configuration Documentation](#).

**⚠️ Important Security Note:**
- Never commit the `.env` file to version control
- Use environment variables or secrets management services in production
- GitHub Actions uses GitHub Secrets for credential management

## Verify Installation

### Run Tests

```bash
# Run all tests
npm test

# Run tests with watch mode
npm run test:watch

# Run server tests only
npm run test:server
```

You should see all tests passing:

```text
 PASS  src/components/Button.test.tsx
 PASS  src/utils/format.test.ts

Test Suites: 2 passed, 2 total
Tests:       10 passed, 10 total
```

### Check Health Status

Visit the health check endpoint:

```bash
curl http://localhost:3000/health
```

Should return:

```json
{
  "status": "ok",
  "version": "6.6.0",
  "timestamp": "2025-10-18T23:00:00.000Z"
}
```

## Mobile Usage

### iOS Safari

JunAiKey fully supports iOS Safari:

1. Open http://localhost:3000 in Safari
2. Tap the share button
3. Select "Add to Home Screen"
4. Enjoy a native app-like experience!

### Android Chrome

1. Open the website in Chrome
2. Tap the menu (three dots)
3. Select "Add to home screen"
4. Done!

## Common Issues

### Q1: `npm install` fails

**Solution:**

```bash
# Clear npm cache
npm cache clean --force

# Delete node_modules
rm -rf node_modules package-lock.json

# Reinstall
npm install
```

### Q2: Port already in use

**Solution:**

```bash
# Method 1: Change port
PORT=3001 npm run dev

# Method 2: Kill process using port (macOS/Linux)
lsof -ti:3000 | xargs kill -9

# Method 2: Kill process using port (Windows)
netstat -ano | findstr :3000
taskkill /PID <PID> /F
```

### Q3: Module not found error

**Solution:**

```bash
# Ensure you're in the project root directory
pwd

# Reinstall dependencies
npm install

# Rebuild
npm run build
```

### Q4: TypeScript type errors

**Solution:**

```bash
# Clear build cache
npm run clean

# Rebuild
npm run build
```

## Next Steps

### Deep Learning

- 📖 [System Overview](./System-Overview.md) - Understand JunAiKey architecture
- 🎮 [Six Sacred Arts Cycle](../../OMNIKEY_HOLY_MANIFEST.md#six-sacred-arts) - Master core concepts
- 🃏 [Element Card System](./Trinity-Architecture.md#element-mastery-system) - Understand element mechanics

### Feature Exploration

- 🔄 [Six-Way Sync Guide](#) - Set up multi-platform sync *(planned)*
- 🧠 [AI Agent Usage](#) - Use AI features *(planned)*
- 📊 [Data Management](#) - Manage your data *(planned)*

### Development Participation

- 🛠️ [Development Guide](../readme.md) - Set up development environment
- 🤝 [Contributing Guide](./Contributing.md) - Participate in project development
- 💡 [Best Practices](../../JUNAIKEY_BEST_PRACTICES.md) - Coding standards

## 🎓 Tutorials & Examples

### Video Tutorials *(Planned)*
- 🎥 [5-Minute JunAiKey Introduction](#)
- 🎥 [Element System Explained](#)
- 🎥 [Six-Way Sync Setup](#)

### Practical Examples
- 📝 [Personal Knowledge Management](#) - Use JunAiKey to manage notes
- 🎨 [Creative Workflow](#) - Collect and organize inspiration
- 👥 [Team Collaboration](#) - Team knowledge sharing

## 🆘 Getting Help

### Community Support
- 💬 [GitHub Discussions](https://github.com/DingJun1028/junaikey/discussions) - Ask questions and discuss
- 🐛 [Issue Tracker](https://github.com/DingJun1028/junaikey/issues) - Report problems
- 📧 Email: team@junaikey.com

### Real-time Communication
- 💬 [Discord Community](https://discord.gg/junaikey) - Instant chat *(planned)*
- 📱 [Telegram Group](https://t.me/junaikey) - Chinese community *(planned)*

## 🎉 Congratulations!

You've successfully completed the JunAiKey quick start!

Now you can:
- ✅ Use the OmniKey Sphere
- ✅ Explore the Element Card System
- ✅ Experience Six-Way Sync features
- ✅ Start your JunAiKey journey

**Next Step**: Read [System Overview](./System-Overview.md) to deeply understand JunAiKey's core concepts!

---

*Have any questions? Check the [FAQ](./FAQ.md) or ask in the [Discussion Area](https://github.com/DingJun1028/junaikey/discussions)*  
*Last Updated: 2025-10-18*
