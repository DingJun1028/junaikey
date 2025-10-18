# ❓ JunAiKey Frequently Asked Questions

## Table of Contents

- [Basic Questions](#basic-questions)
- [Installation & Configuration](#installation--configuration)
- [Feature Usage](#feature-usage)
- [Troubleshooting](#troubleshooting)
- [Development Related](#development-related)
- [Security & Privacy](#security--privacy)
- [Other Questions](#other-questions)

## Basic Questions

### Q: What is JunAiKey?

**A**: JunAiKey (君愛心鑰) is a revolutionary "OmniKey" system designed to initiate a new era of human-AI symbiosis. It is a self-evolving unified genesis engine that integrates:
- 12 elemental spirit systems
- 11 omnipotent avatar collaboration
- Six-way platform synchronization
- AI intelligent agents
- Knowledge management and heritage

For more details: [System Overview](./System-Overview.md)

### Q: Who is JunAiKey suitable for?

**A**: JunAiKey is suitable for:
- **Knowledge Workers** - Managing large amounts of information and knowledge
- **Creative Workers** - Collecting inspiration and organizing creativity
- **Developers** - Technical learning and code management
- **Researchers** - Literature management and research notes
- **Team Collaborators** - Sharing knowledge and collaborative work

### Q: Is JunAiKey free?

**A**: Yes! JunAiKey is an open-source project under the MIT license, completely free to use. You can:
- ✅ Personal use
- ✅ Commercial use
- ✅ Modify source code
- ✅ Secondary development

The only requirement is to retain the copyright notice.

### Q: Do I need programming knowledge?

**A**: No! JunAiKey provides:
- **Graphical Interface** - Can be used without programming
- **One-Click Deployment** - Simple and fast
- **Detailed Documentation** - Just follow the tutorials

If you want to participate in development, knowledge of TypeScript/React will be helpful.

## Installation & Configuration

### Q: Which operating systems are supported?

**A**: JunAiKey supports all major operating systems:
- ✅ **Windows** 10/11
- ✅ **macOS** 10.15+
- ✅ **Linux** (Ubuntu, Debian, Fedora, etc.)
- ✅ **iOS** Safari
- ✅ **Android** Chrome

### Q: What are the minimum system requirements?

**A**:
- **Processor**: Dual-core 1.5GHz+
- **Memory**: 4GB RAM (8GB recommended)
- **Storage**: 500MB available space
- **Network**: Stable internet connection
- **Browser**: Chrome 90+, Safari 14+, Firefox 88+

### Q: How do I configure environment variables?

**A**:
1. Copy the example file:
   ```bash
   cp .env.example .env
   ```

2. Edit the `.env` file:
   ```env
   PORT=3000
   NODE_ENV=development
   ```

3. Configure third-party services (optional):
   ```env
   VITE_SUPABASE_URL=your_url
   VITE_SUPABASE_ANON_KEY=your_key
   ```

Detailed configuration: [Environment Configuration Guide](./Quick-Start.md#environment-configuration)

**⚠️ Security Note:**
- Never commit `.env` files to version control
- Use environment variables or secrets management in production
- Keep API keys and credentials secure

### Q: Can I use JunAiKey without Supabase?

**A**: Yes! JunAiKey supports local storage mode:
- Uses browser's IndexedDB
- Data stored locally
- No service configuration required

But using Supabase provides:
- ☁️ Cloud backup
- 🔄 Cross-device sync
- 👥 Team collaboration features

## Feature Usage

### Q: What is "No Interruption State"?

**A**: "No Interruption State" is one of JunAiKey's core design philosophies:
- The system won't interrupt you with open-ended questions
- Intelligently predicts your needs based on context
- Replaces "asking and waiting" with "predicting and presenting"
- Maintains user flow state

Learn more: [Design Philosophy](./Design-Philosophy.md)

### Q: What is "Home Anchor"?

**A**: The OmniKey Sphere is the "Home Anchor":
- Always present in the center of the screen
- One-click return to a simple "home" state
- Clears all temporary content
- Provides a sense of peace

### Q: How do I use the element system?

**A**: Steps to use the element system:

1. **Understand Elements** - View the 12 elemental spirits
2. **Select Elements** - Choose corresponding elements based on tasks
3. **Gain Experience** - Complete tasks using elements
4. **Spirit Awakening** - Unlock new stages by reaching experience thresholds
5. **Element Synergy** - Combine multiple elements for synergistic effects

Detailed guide: [Element Card System](./Trinity-Architecture.md#element-mastery-system)

### Q: Which platforms does six-way sync include?

**A**: Currently supports 6 platforms:

| Platform | Function | Direction |
|---------|----------|-----------|
| **Capacities** | Note Repository | ↔ |
| **Notion** | Database Core | ↔ |
| **Boost.Space** | Automation Center | → |
| **Supabase** | Data Lake | ↔ |
| **AITable** | Structured Tables | ↔ |
| **Upnote** | Static Collection | ← |

Setup guide: [Six-Way Sync System](../README.md#six-way-sync)

### Q: How do I choose a profession major?

**A**: Choose based on your interests and needs:

- **🔍 Insight Major** - Enjoy analyzing data and discovering trends
- **⚙️ Build Major** - Like building systems and maintaining stability
- **🎨 Create Major** - Enjoy creating content and managing knowledge
- **⚡ Execute Major** - Prefer quick action and innovation
- **🌌 Omni Path** - Pursue comprehensive development (requires long-term investment)

Detailed explanation: [Profession Evolution System](./Trinity-Architecture.md#profession-evolution-system)

## Troubleshooting

### Q: What if startup fails?

**A**: Follow these steps to troubleshoot:

1. **Check Node.js version**
   ```bash
   node --version  # Should be >= v18.0.0
   ```

2. **Clean and reinstall**
   ```bash
   rm -rf node_modules package-lock.json
   npm install
   ```

3. **Check port occupation**
   ```bash
   # macOS/Linux
   lsof -ti:3000 | xargs kill -9
   
   # Windows
   netstat -ano | findstr :3000
   taskkill /PID <PID> /F
   ```

4. **View detailed errors**
   ```bash
   npm run dev -- --debug
   ```

### Q: What if sync fails?

**A**:

1. **Check network connection**
2. **Verify API keys** - Ensure correct configuration
3. **View error logs** - Console will display detailed errors
4. **Retry sync** - Sometimes it's a temporary network issue
5. **Contact support** - If the problem persists

### Q: What if data is lost?

**A**: JunAiKey has multiple protection mechanisms:

1. **Local Backup** - Auto-save to IndexedDB
2. **Cloud Backup** - Real-time sync with Supabase
3. **Version History** - Retains multiple versions
4. **Manual Recovery** - Can restore from backups

Recovery steps:
```text
Settings → Data Management → Restore Backup → Select Time Point
```

### Q: What if pages load slowly?

**A**: Optimization methods:

1. **Clear browser cache**
2. **Check network speed**
3. **Reduce simultaneously open element cards**
4. **Close unnecessary browser extensions**
5. **Use the latest version of your browser**

Performance optimization: [Performance Optimization Guide](../best-practices-improvement-plan.md)

## Development Related

### Q: How do I participate in development?

**A**: Welcome to participate! Follow these steps:

1. **Fork the project** - Fork on GitHub
2. **Clone locally** - `git clone your-fork`
3. **Install dependencies** - `npm install`
4. **Create branch** - `git checkout -b feature/your-feature`
5. **Develop features** - Write code and tests
6. **Submit PR** - Submit Pull Request

Detailed guide: [Contributing Guide](./Contributing.md)

### Q: How do I add new elements?

**A**: Creating new elements requires:

1. **Define element properties**
   ```typescript
   const newElement: Element = {
     id: 'new-element',
     name: '新元素',
     spirit: 'NewSpirit',
     color: '#COLOR',
     domain: '領域',
   };
   ```

2. **Add spirit icon** - Add icon in assets
3. **Implement element logic** - Write element behavior
4. **Add tests** - Ensure functionality works
5. **Update documentation** - Document the new element

### Q: Which plugins are supported?

**A**: Plugin system is under development (planned for v7.0). Future support for:
- Custom element plugins
- Sync platform plugins
- AI model plugins
- Theme plugins

### Q: How do I contribute documentation?

**A**: Documentation contribution is very important!

1. **Find issues** - Discover errors or unclear sections while reading
2. **Edit documentation** - Directly edit on GitHub
3. **Submit PR** - Submit documentation improvement PR
4. **Wait for review** - Maintainers will review quickly

Documentation location: `docs/wiki/` directory

## Security & Privacy

### Q: Is my data secure?

**A**: Very secure!

**Security Measures**:
- 🔒 HTTPS/TLS encrypted transmission
- 🔐 Encrypted data storage
- 🚫 No collection of personal information
- 💾 Local-first storage
- 🌐 Open-source and auditable

**Data Sovereignty**:
- You fully own your data
- Can export at any time
- Can delete at any time
- Not locked to any platform

### Q: Are there any sensitive information in the documentation?

**A**: All documentation has been reviewed to ensure:
- ✅ No API keys or credentials
- ✅ All examples use placeholder values
- ✅ Security best practices highlighted
- ✅ Proper handling of environment variables

If you find any security issues, please report them immediately to: security@junaikey.com

## Other Questions

### Q: How does it differ from Notion/Obsidian?

**A**: JunAiKey's unique features:

| Feature | JunAiKey | Notion | Obsidian |
|---------|----------|--------|----------|
| Element System | ✅ | ❌ | ❌ |
| Avatar Synergy | ✅ | ❌ | ❌ |
| Six-Way Sync | ✅ | Partial | Partial |
| AI Native | ✅ | Partial | Plugin |
| Open Source Free | ✅ | ❌ | ✅ |
| Local First | ✅ | ❌ | ✅ |

JunAiKey doesn't aim to replace them but serves as a unified hub connecting all tools.

### Q: Is multilingual support available?

**A**: Currently supports:
- ✅ Traditional Chinese (Primary)
- ✅ Simplified Chinese
- 🚧 English (In Progress)

Planned for v7.0+:
- 📅 Complete English support
- 📅 Japanese support
- 📅 Korean support

*We welcome community contributions for localization.*

### Q: Is authorization needed for commercial use?

**A**: No! MIT license allows:
- ✅ Personal commercial use
- ✅ Internal company use
- ✅ Providing commercial services
- ✅ Secondary development and sales

Only requirement: Retain copyright notice

### Q: How do I report bugs?

**A**:

1. **Search existing issues** - See if someone has reported it
2. **Create new issue** - [Issue Tracker](https://github.com/DingJun1028/junaikey/issues/new)
3. **Provide detailed information**:
   - Problem description
   - Steps to reproduce
   - Expected behavior
   - Actual behavior
   - System environment
   - Error screenshots

### Q: Are there official communication groups?

**A**: Yes! Welcome to join:
- 💬 [Discord Community](https://discord.gg/junaikey) *(planned)*
- 📱 [Telegram Group](https://t.me/junaikey) *(planned)*
- 💬 [GitHub Discussions](https://github.com/DingJun1028/junaikey/discussions)

---

## Can't Find the Answer?

If your question isn't answered here:

1. 📖 View [Complete Documentation](../INDEX.md)
2. 💬 Ask in [Discussions](https://github.com/DingJun1028/junaikey/discussions)
3. 🐛 Create [Issue](https://github.com/DingJun1028/junaikey/issues)
4. 📧 Send email to team@junaikey.com

We'll respond as soon as possible!

---

*This FAQ is continuously updated. Welcome to propose new questions.*  
*Last Updated: 2025-10-18*
