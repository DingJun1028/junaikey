# 🚀 JunAiKey Omni-Tag System - Deployment Guide

Complete deployment guide for the JunAiKey Omni-Tag System, covering backend tag server, frontend components, and full-stack integration.

---

## 📑 Table of Contents

1. [System Overview](#system-overview)
2. [Prerequisites](#prerequisites)
3. [Backend Deployment (Tag Server)](#backend-deployment-tag-server)
4. [Frontend Integration (TagPanel)](#frontend-integration-tagpanel)
5. [Environment Configuration](#environment-configuration)
6. [Testing & Validation](#testing--validation)
7. [Production Deployment](#production-deployment)
8. [Monitoring & Maintenance](#monitoring--maintenance)
9. [Troubleshooting](#troubleshooting)

---

## System Overview

### Architecture

The JunAiKey Omni-Tag System consists of three main components:

```
┌─────────────────────────────────────────────────────────────────┐
│                    JunAiKey Omni-Tag System                      │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│  ┌────────────────┐  ┌────────────────┐  ┌─────────────────┐   │
│  │   TagPanel     │  │  Tag Server    │  │  Intelligent    │   │
│  │  (Frontend)    │◄─┤  (Backend)     │◄─┤  Tagging System │   │
│  │   React/TSX    │  │   Node.js/     │  │  (Core Engine)  │   │
│  │                │  │   Express      │  │                 │   │
│  └────────────────┘  └────────────────┘  └─────────────────┘   │
│         │                    │                      │           │
│         │                    │                      │           │
│         ▼                    ▼                      ▼           │
│  ┌────────────────────────────────────────────────────────┐    │
│  │              Bidirectional Tag Index                   │    │
│  │  • Tag → Data mapping                                  │    │
│  │  • Data → Tag mapping                                  │    │
│  │  • Real-time sync & updates                            │    │
│  └────────────────────────────────────────────────────────┘    │
└─────────────────────────────────────────────────────────────────┘
```

### Key Features

✅ **Bidirectional Tagging** - Map tags to data and data to tags  
✅ **Real-time Updates** - Instant tag generation and indexing  
✅ **Self-Learning** - User feedback integration for continuous improvement  
✅ **RESTful API** - Complete HTTP API for all operations  
✅ **React Component** - Ready-to-use UI component  
✅ **Multi-source Tags** - AI-generated, user-provided, and system tags  

---

## Prerequisites

### Required Software

- **Node.js**: v18.0.0 or higher
- **npm**: v9.0.0 or higher
- **Git**: For version control
- **TypeScript**: v5.0.0 or higher (included in dependencies)

### System Requirements

- **Memory**: Minimum 2GB RAM (4GB recommended)
- **Storage**: 1GB free disk space
- **Network**: Port 3001 for tag server (configurable)
- **OS**: Linux, macOS, or Windows

### Dependencies

Install all project dependencies:

```bash
npm install
```

---

## Backend Deployment (Tag Server)

### 1. Server Setup

The tag server (`tag-server.cjs`) provides RESTful API endpoints for tag management.

#### File Location
```
/tag-server.cjs
```

#### Environment Variables

Create or update `.env` file:

```bash
# Tag Server Configuration
TAG_SERVER_PORT=3001
TAG_SERVER_HOST=0.0.0.0
NODE_ENV=production

# Optional: Database connection (for future persistence)
# DATABASE_URL=postgresql://user:password@localhost:5432/junaikey
```

### 2. Start the Server

#### Development Mode

```bash
node tag-server.cjs
```

#### Production Mode (with PM2)

```bash
# Install PM2 globally
npm install -g pm2

# Start server with PM2
pm2 start tag-server.cjs --name "junaikey-tag-server"

# Enable auto-restart on system boot
pm2 startup
pm2 save
```

#### Using systemd (Linux)

Create a systemd service file `/etc/systemd/system/junaikey-tag-server.service`:

```ini
[Unit]
Description=JunAiKey Tag Server
After=network.target

[Service]
Type=simple
User=junaikey
WorkingDirectory=/opt/junaikey
Environment=NODE_ENV=production
Environment=TAG_SERVER_PORT=3001
ExecStart=/usr/bin/node /opt/junaikey/tag-server.cjs
Restart=on-failure
RestartSec=10
StandardOutput=journal
StandardError=journal

[Install]
WantedBy=multi-user.target
```

Enable and start the service:

```bash
sudo systemctl daemon-reload
sudo systemctl enable junaikey-tag-server
sudo systemctl start junaikey-tag-server
sudo systemctl status junaikey-tag-server
```

### 3. API Endpoints

The tag server exposes the following endpoints:

#### Health Check
```http
GET /health
```

#### Ingest Data and Generate Tags
```http
POST /api/data/ingest
Content-Type: application/json

{
  "id": "data_001",
  "content": "Your content here",
  "type": "text",
  "source": "user"
}
```

#### Get Data by ID
```http
GET /api/data/:id
```

#### Query Data by Tags
```http
GET /api/tags/query?tags=tag1,tag2,tag3
```

#### Get Tags for Data
```http
GET /api/data/:id/tags
```

#### Submit Feedback
```http
POST /api/feedback
Content-Type: application/json

{
  "dataId": "data_001",
  "action": "accept|reject|modify",
  "correctedTags": [...],
  "reason": "Optional reason"
}
```

#### Get System Metrics
```http
GET /api/metrics
```

#### Get All Tags
```http
GET /api/tags
```

#### Delete Data
```http
DELETE /api/data/:id
```

### 4. Server Validation

Test the server is running:

```bash
# Health check
curl http://localhost:3001/health

# Ingest test data
curl -X POST http://localhost:3001/api/data/ingest \
  -H "Content-Type: application/json" \
  -d '{
    "id": "test_001",
    "content": "This is a test document about machine learning and AI",
    "type": "text",
    "source": "test"
  }'

# Query by tags
curl http://localhost:3001/api/tags/query?tags=machine,learning
```

---

## Frontend Integration (TagPanel)

### 1. Component Location

```
/src/components/TagPanel.tsx
```

### 2. Import and Usage

#### Basic Usage

```tsx
import React from 'react';
import TagPanel from './components/TagPanel';

function App() {
  return (
    <div>
      <h1>JunAiKey Tag Management</h1>
      <TagPanel 
        dataId="data_001"
        serverUrl="http://localhost:3001"
        onTagClick={(tag) => console.log('Tag clicked:', tag)}
        onFeedbackSubmit={(feedback) => console.log('Feedback:', feedback)}
      />
    </div>
  );
}

export default App;
```

#### Advanced Usage with State Management

```tsx
import React, { useState } from 'react';
import TagPanel from './components/TagPanel';
import type { Tag } from './intelligent-tagging-system';

function DataManager() {
  const [selectedDataId, setSelectedDataId] = useState<string>('data_001');
  const [selectedTag, setSelectedTag] = useState<Tag | null>(null);

  const handleTagClick = (tag: Tag) => {
    setSelectedTag(tag);
    console.log('Selected tag:', tag);
  };

  const handleFeedbackSubmit = (feedback: any) => {
    console.log('Feedback submitted:', feedback);
    // Handle feedback submission
  };

  return (
    <div className="data-manager">
      <TagPanel 
        dataId={selectedDataId}
        serverUrl={process.env.REACT_APP_TAG_SERVER_URL || 'http://localhost:3001'}
        onTagClick={handleTagClick}
        onFeedbackSubmit={handleFeedbackSubmit}
        className="my-tag-panel"
      />
      
      {selectedTag && (
        <div className="tag-details">
          <h3>Selected Tag Details</h3>
          <pre>{JSON.stringify(selectedTag, null, 2)}</pre>
        </div>
      )}
    </div>
  );
}
```

### 3. Component Props

| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `dataId` | string | No | - | ID of the data item to display tags for |
| `serverUrl` | string | No | `http://localhost:3001` | URL of the tag server |
| `onTagClick` | `(tag: Tag) => void` | No | - | Callback when a tag is clicked |
| `onFeedbackSubmit` | `(feedback: FeedbackData) => void` | No | - | Callback when feedback is submitted |
| `className` | string | No | `''` | Additional CSS class names |

### 4. Styling

The TagPanel component uses inline styles but supports custom styling via className prop.

Custom CSS example:

```css
.my-tag-panel {
  max-width: 800px;
  margin: 0 auto;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.my-tag-panel .tag-badge:hover {
  transform: scale(1.05);
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
}
```

---

## Environment Configuration

### Development Environment

Create `.env.development`:

```bash
# Tag Server
TAG_SERVER_PORT=3001
TAG_SERVER_HOST=localhost
NODE_ENV=development

# Frontend
REACT_APP_TAG_SERVER_URL=http://localhost:3001
REACT_APP_API_TIMEOUT=5000
```

### Production Environment

Create `.env.production`:

```bash
# Tag Server
TAG_SERVER_PORT=3001
TAG_SERVER_HOST=0.0.0.0
NODE_ENV=production

# Frontend
REACT_APP_TAG_SERVER_URL=https://tags.junaikey.com
REACT_APP_API_TIMEOUT=10000

# Security
ENABLE_CORS=true
ALLOWED_ORIGINS=https://junaikey.com,https://www.junaikey.com
```

### External Configuration Options

The system supports external configuration through:

1. **Environment Variables** - Standard Node.js env vars
2. **Config Files** - JSON configuration files
3. **Command Line Arguments** - Runtime parameters
4. **External Config Service** - Integration with config management tools

---

## Testing & Validation

### 1. Unit Tests

Run the test suite:

```bash
npm test
```

### 2. Integration Tests

Test the full stack:

```bash
# Start the tag server
node tag-server.js &

# Run integration tests
npm run test:integration

# Stop the server
pkill -f tag-server.js
```

### 3. Manual Testing

#### Test Tag Server

```bash
# Terminal 1: Start server
node tag-server.cjs

# Terminal 2: Test endpoints
# Ingest data
curl -X POST http://localhost:3001/api/data/ingest \
  -H "Content-Type: application/json" \
  -d '{"id":"test_001","content":"AI and machine learning","type":"text"}'

# Get data
curl http://localhost:3001/api/data/test_001

# Query by tags
curl http://localhost:3001/api/tags/query?tags=ai,machine

# Get metrics
curl http://localhost:3001/api/metrics
```

#### Test Frontend Component

```bash
# Start development server
npm run dev

# Open browser to http://localhost:3000
# Test TagPanel component interactions
```

### 4. Load Testing

Use tools like Apache Bench or Artillery:

```bash
# Install artillery
npm install -g artillery

# Run load test
artillery quick --count 100 --num 10 http://localhost:3001/health
```

---

## Production Deployment

### 1. Build for Production

```bash
# Build TypeScript
npm run build:ts

# Build frontend
npm run build
```

### 2. Deployment Options

#### Option A: Traditional Server Deployment

```bash
# Copy files to server
scp -r dist/ user@server:/opt/junaikey/
scp tag-server.cjs user@server:/opt/junaikey/
scp package.json user@server:/opt/junaikey/

# SSH to server
ssh user@server

# Install dependencies
cd /opt/junaikey
npm ci --production

# Start services
pm2 start tag-server.cjs
```

#### Option B: Docker Deployment

Create `Dockerfile`:

```dockerfile
FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm ci --production

COPY tag-server.cjs ./
COPY dist ./dist

EXPOSE 3001

CMD ["node", "tag-server.cjs"]
```

Build and run:

```bash
docker build -t junaikey-tag-server .
docker run -d -p 3001:3001 --name tag-server junaikey-tag-server
```

#### Option C: Cloud Platform (Vercel/Netlify)

See the existing deployment guides in `/deployment/` directory for detailed cloud deployment instructions.

### 3. Reverse Proxy Setup (Nginx)

```nginx
server {
    listen 80;
    server_name tags.junaikey.com;

    location / {
        proxy_pass http://localhost:3001;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    }
}
```

### 4. SSL/TLS Configuration

Use Let's Encrypt for free SSL certificates:

```bash
sudo apt-get install certbot python3-certbot-nginx
sudo certbot --nginx -d tags.junaikey.com
```

---

## Monitoring & Maintenance

### 1. Health Checks

Set up automated health checks:

```bash
# Create health check script
cat > /opt/junaikey/health-check.sh << 'EOF'
#!/bin/bash
HEALTH_URL="http://localhost:3001/health"
RESPONSE=$(curl -s -o /dev/null -w "%{http_code}" $HEALTH_URL)

if [ "$RESPONSE" -eq 200 ]; then
    echo "✅ Tag Server is healthy"
    exit 0
else
    echo "❌ Tag Server is down (HTTP $RESPONSE)"
    exit 1
fi
EOF

chmod +x /opt/junaikey/health-check.sh

# Add to crontab for monitoring
*/5 * * * * /opt/junaikey/health-check.sh
```

### 2. Logging

Configure logging:

```javascript
// In tag-server.cjs, add logging middleware
const morgan = require('morgan');
const fs = require('fs');
const path = require('path');

// Create a write stream
const accessLogStream = fs.createWriteStream(
  path.join(__dirname, 'access.log'),
  { flags: 'a' }
);

// Setup logger
app.use(morgan('combined', { stream: accessLogStream }));
```

### 3. Metrics Collection

View system metrics:

```bash
curl http://localhost:3001/api/metrics
```

Expected response:
```json
{
  "success": true,
  "metrics": {
    "totalDataItems": 1234,
    "totalTags": 567,
    "averageTaggingTime": 45,
    "tagAccuracy": 0.92,
    "systemThroughput": 100,
    "activeUsers": 25,
    "feedbackCount": 89,
    "dataStoreSize": 1234,
    "tagIndexSize": 567
  }
}
```

### 4. Backup Strategy

Create automated backups:

```bash
# Backup script
cat > /opt/junaikey/backup.sh << 'EOF'
#!/bin/bash
BACKUP_DIR="/opt/junaikey/backups"
DATE=$(date +%Y%m%d_%H%M%S)

mkdir -p $BACKUP_DIR
tar -czf $BACKUP_DIR/junaikey_$DATE.tar.gz \
  /opt/junaikey/*.cjs \
  /opt/junaikey/dist \
  /opt/junaikey/package.json

# Keep only last 7 days
find $BACKUP_DIR -name "junaikey_*.tar.gz" -mtime +7 -delete
EOF

chmod +x /opt/junaikey/backup.sh

# Schedule daily backup
0 2 * * * /opt/junaikey/backup.sh
```

---

## Troubleshooting

### Common Issues

#### Issue 1: Server won't start

**Symptoms**: `Error: listen EADDRINUSE`

**Solution**:
```bash
# Check if port is in use
lsof -i :3001

# Kill process using the port
kill -9 <PID>

# Or use different port
TAG_SERVER_PORT=3002 node tag-server.cjs
```

#### Issue 2: CORS errors in browser

**Symptoms**: `Access to fetch blocked by CORS policy`

**Solution**: Enable CORS in tag-server.cjs (already implemented):
```javascript
app.use(cors());
```

Or configure specific origins:
```javascript
app.use(cors({
  origin: ['http://localhost:3000', 'https://junaikey.com'],
  credentials: true
}));
```

#### Issue 3: Frontend can't connect to backend

**Symptoms**: Network error in TagPanel

**Solution**:
1. Verify tag server is running: `curl http://localhost:3001/health`
2. Check serverUrl prop in TagPanel
3. Verify CORS is enabled
4. Check browser console for errors

#### Issue 4: Tags not generating

**Symptoms**: Empty tags array returned

**Solution**:
1. Check content type is supported
2. Verify content is not empty
3. Check server logs for errors
4. Test with simple text content first

### Debug Mode

Enable debug logging:

```bash
DEBUG=* node tag-server.cjs
```

### Performance Issues

If experiencing slow performance:

1. **Enable caching**
2. **Add database persistence** (currently in-memory)
3. **Implement pagination** for large datasets
4. **Add Redis** for session management
5. **Use clustering** for multi-core CPUs

---

## Next Steps

After successful deployment:

1. ✅ Verify all endpoints work correctly
2. ✅ Test frontend component integration
3. ✅ Set up monitoring and alerts
4. ✅ Configure automated backups
5. ✅ Review security settings
6. ✅ Document custom configurations
7. ✅ Train team on system usage

---

## Support & Resources

- **Documentation**: `/docs` directory
- **API Reference**: `JUNAIKEY_API_LIBRARY.md`
- **Best Practices**: `JUNAIKEY_BEST_PRACTICES.md`
- **System Manifest**: `SYSTEM_MANIFEST.md`
- **Integration Guide**: `INTEGRATION.md`

---

## Version

- **Document Version**: 1.0.0
- **Last Updated**: 2026-02-15
- **Compatibility**: JunAiKey v5.0.0+

---

**🎯 Zero-friction, beginning-to-end unity deployment complete!**
