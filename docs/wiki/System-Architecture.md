# 🏗️ JunAiKey System Architecture Design

## Table of Contents

- [Architecture Overview](#architecture-overview)
- [Frontend Architecture](#frontend-architecture)
- [Backend Architecture](#backend-architecture)
- [Data Flow Architecture](#data-flow-architecture)
- [Security Architecture](#security-architecture)
- [Performance Optimization](#performance-optimization)
- [Deployment Architecture](#deployment-architecture)

## Architecture Overview

JunAiKey adopts modern frontend-backend separation architecture, combined with multi-layered design patterns, implementing a highly scalable and maintainable system structure.

### Technology Stack

**Frontend**:
- React 19 - Modern UI framework
- TypeScript 5 - Type-safe development
- Tailwind CSS 3 - Utility-first CSS
- Zustand - Lightweight state management
- React Router 6 - Routing management

**Backend & Data**:
- Supabase - Backend-as-a-Service (PostgreSQL + Realtime)
- Boost.Space - Integration platform (2000+ services)
- Google Gemini API - AI capabilities
- OpenAI API - Diverse AI functionalities

**Development & Deployment**:
- Vite - Fast build tool
- ESLint + Prettier - Code quality
- Jest - Testing framework
- GitHub Actions - CI/CD automation

## Frontend Architecture

### Component Hierarchy

```text
App
├── Providers (Theme, Auth, Sync)
├── Layout
│   ├── Header
│   ├── Sidebar
│   ├── MainContent
│   └── Footer
└── Modals
```

### State Management Architecture

Using Zustand for lightweight state management:

```typescript
interface AppState {
  // User state
  user: User | null;
  isAuthenticated: boolean;
  
  // Element state
  elements: Element[];
  activeElement: Element | null;
  
  // Avatar state
  avatars: Avatar[];
  activeAvatars: Avatar[];
  
  // Sync state
  syncStatus: SyncStatus;
  lastSyncTime: Date | null;
  
  // UI state
  isOmniKeyOpen: boolean;
  sidebarCollapsed: boolean;
}
```

## Backend Architecture

### Service Layer Design

#### 1. Element Management Service

```typescript
class ElementService {
  async getElements(): Promise<Element[]>
  async updateElementState(id: string, state: ElementState): Promise<void>
  async calculateExperience(id: string, action: Action): Promise<number>
  async checkAwakening(id: string): Promise<AwakeningResult>
}
```

#### 2. Sync Engine Service

```typescript
class SyncEngineService {
  async syncToAllPlatforms(data: SyncData): Promise<SyncResult[]>
  async syncToPlatform(platform: Platform, data: SyncData): Promise<SyncResult>
  async getSyncStatus(): Promise<SyncStatus>
  async resolveConflict(conflict: Conflict): Promise<Resolution>
}
```

#### 3. AI Agent Service

```typescript
class AIAgentService {
  async analyze(context: Context): Promise<Analysis>
  async generate(prompt: Prompt): Promise<Content>
  async recommend(user: User): Promise<Recommendation[]>
}
```

## Data Flow Architecture

### User Action Flow

```text
User Action
    ↓
UI Component
    ↓
Event Handler
    ↓
State Update (Zustand)
    ↓
Side Effects
    ↓
API Call
    ↓
Backend Service
    ↓
Database/External API
    ↓
Response
    ↓
State Update
    ↓
UI Re-render
```

### Six-Way Sync Flow

```text
Sync Trigger
    ↓
Sync Engine
    ├→ Capacities API
    ├→ Notion API
    ├→ Boost.Space Webhook
    ├→ Supabase REST
    ├→ AITable API
    └→ Upnote API
    ↓
Parallel Execution
    ↓
Result Collection
    ↓
Conflict Detection
    ↓
Conflict Resolution
    ↓
Status Update
```

## Security Architecture

### Authentication & Authorization

```typescript
interface AuthFlow {
  login(credentials: Credentials): Promise<AuthToken>
  verifyToken(token: string): Promise<User>
  refreshToken(refreshToken: string): Promise<AuthToken>
  logout(): Promise<void>
}
```

### Data Encryption

- **Transmission Encryption**: All API communications use HTTPS/TLS
- **Storage Encryption**: Sensitive data encrypted in Supabase
- **Key Management**: API keys managed via environment variables

## Performance Optimization

### Frontend Optimization

1. **Code Splitting**: Using React.lazy and Suspense
2. **Image Optimization**: WebP format and lazy loading
3. **Caching Strategy**: Service Worker and IndexedDB
4. **Virtual Scrolling**: For large lists

### Backend Optimization

1. **Database Indexing**: Index key query fields
2. **Query Optimization**: Use JOINs instead of multiple queries
3. **Cache Layer**: Redis for hot data
4. **CDN Acceleration**: Static assets via CDN

## Deployment Architecture

### Production Environment

```text
┌─────────────────┐
│   Cloudflare    │  CDN & DDoS Protection
└────────┬────────┘
         │
┌────────┴────────┐
│   Vercel        │  Frontend Hosting
└────────┬────────┘
         │
┌────────┴────────┐
│   Supabase      │  Backend & Database
└────────┬────────┘
         │
┌────────┴────────┐
│  External APIs  │  Third-party Integrations
└─────────────────┘
```

### CI/CD Pipeline

```text
Code Push
    ↓
GitHub Actions
    ↓
├─ Lint & Type Check
├─ Unit Tests
├─ Integration Tests
└─ Build
    ↓
Deploy to Vercel (Frontend)
Deploy to Supabase (Backend)
    ↓
Health Check
    ↓
Production Ready
```

---

*This document reflects the current system architecture and is continuously updated as the system evolves.*  
*Last Updated: 2025-10-18*
