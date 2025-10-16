# 🏗️ JunAiKey 系統架構設計

## 架構概述

JunAiKey 採用現代化的前後端分離架構，結合多層次的設計模式，實現高度可擴展、可維護的系統結構。

## 整體架構圖

```
┌─────────────────────────────────────────────────────────────┐
│                        用戶層 (User Layer)                    │
│  Web Browser │ iOS Safari │ Desktop App │ Mobile App         │
└─────────────────────┬───────────────────────────────────────┘
                      │
┌─────────────────────┴───────────────────────────────────────┐
│                    前端層 (Frontend Layer)                    │
│ ┌─────────────────────────────────────────────────────────┐ │
│ │  UI Components (React 19)                               │ │
│ │  ├─ OmniKey 球體介面                                      │ │
│ │  ├─ 元素卡牌展示                                          │ │
│ │  ├─ 化身協同面板                                          │ │
│ │  └─ 心流儀錶盤                                            │ │
│ └─────────────────────────────────────────────────────────┘ │
│ ┌─────────────────────────────────────────────────────────┐ │
│ │  State Management (Zustand)                             │ │
│ │  ├─ 全局狀態                                              │ │
│ │  ├─ 用戶狀態                                              │ │
│ │  ├─ 同步狀態                                              │ │
│ │  └─ UI 狀態                                               │ │
│ └─────────────────────────────────────────────────────────┘ │
│ ┌─────────────────────────────────────────────────────────┐ │
│ │  Routing (React Router 6)                               │ │
│ └─────────────────────────────────────────────────────────┘ │
└─────────────────────┬───────────────────────────────────────┘
                      │
┌─────────────────────┴───────────────────────────────────────┐
│                   API 層 (API Layer)                         │
│ ┌─────────────────────────────────────────────────────────┐ │
│ │  API Gateway                                            │ │
│ │  ├─ REST API                                            │ │
│ │  ├─ GraphQL API                                         │ │
│ │  └─ WebSocket                                           │ │
│ └─────────────────────────────────────────────────────────┘ │
└─────────────────────┬───────────────────────────────────────┘
                      │
┌─────────────────────┴───────────────────────────────────────┐
│                  業務邏輯層 (Business Layer)                  │
│ ┌─────────────────────────────────────────────────────────┐ │
│ │  Core Services                                          │ │
│ │  ├─ 元素管理服務                                          │ │
│ │  ├─ 化身協同服務                                          │ │
│ │  ├─ 同步引擎服務                                          │ │
│ │  ├─ 知識管理服務                                          │ │
│ │  └─ AI 代理服務                                           │ │
│ └─────────────────────────────────────────────────────────┘ │
└─────────────────────┬───────────────────────────────────────┘
                      │
┌─────────────────────┴───────────────────────────────────────┐
│                  數據訪問層 (Data Access Layer)               │
│ ┌──────────────┬──────────────┬──────────────┬────────────┐ │
│ │  Supabase    │  Boost.Space │  Straico AI  │  本地存儲   │ │
│ │  PostgreSQL  │  Webhooks    │  API         │  IndexedDB │ │
│ └──────────────┴──────────────┴──────────────┴────────────┘ │
└─────────────────────┬───────────────────────────────────────┘
                      │
┌─────────────────────┴───────────────────────────────────────┐
│              第三方整合層 (Integration Layer)                 │
│ ┌──────────────┬──────────────┬──────────────┬────────────┐ │
│ │  Capacities  │  Notion      │  AITable     │  Upnote    │ │
│ │  API         │  API         │  API         │  API       │ │
│ └──────────────┴──────────────┴──────────────┴────────────┘ │
└─────────────────────────────────────────────────────────────┘
```

## 前端架構

### 組件層次結構

```
App
├── Providers
│   ├── ThemeProvider
│   ├── AuthProvider
│   └── SyncProvider
├── Layout
│   ├── Header
│   │   ├── Logo
│   │   ├── Navigation
│   │   └── UserMenu
│   ├── Sidebar
│   │   ├── ElementCards
│   │   ├── AvatarList
│   │   └── QuickActions
│   ├── MainContent
│   │   └── Router
│   │       ├── Dashboard
│   │       ├── Elements
│   │       ├── Avatars
│   │       ├── Sync
│   │       └── Settings
│   └── Footer
└── Modals
    ├── OmniKeyModal
    ├── ElementDetailModal
    └── SettingsModal
```

### 狀態管理架構

使用 Zustand 進行輕量級狀態管理：

```typescript
// stores/index.ts
interface AppState {
  // 用戶狀態
  user: User | null;
  isAuthenticated: boolean;
  
  // 元素狀態
  elements: Element[];
  activeElement: Element | null;
  
  // 化身狀態
  avatars: Avatar[];
  activeAvatars: Avatar[];
  
  // 同步狀態
  syncStatus: SyncStatus;
  lastSyncTime: Date | null;
  
  // UI 狀態
  isOmniKeyOpen: boolean;
  sidebarCollapsed: boolean;
  
  // Actions
  setUser: (user: User) => void;
  setActiveElement: (element: Element) => void;
  triggerSync: () => Promise<void>;
  toggleOmniKey: () => void;
}
```

### 路由設計

```typescript
// routes/index.tsx
const routes = [
  {
    path: '/',
    element: <Dashboard />,
    children: [
      { path: 'elements', element: <ElementsPage /> },
      { path: 'elements/:id', element: <ElementDetailPage /> },
      { path: 'avatars', element: <AvatarsPage /> },
      { path: 'avatars/:id', element: <AvatarDetailPage /> },
      { path: 'sync', element: <SyncPage /> },
      { path: 'knowledge', element: <KnowledgePage /> },
      { path: 'settings', element: <SettingsPage /> },
    ]
  },
  {
    path: '/auth',
    element: <AuthLayout />,
    children: [
      { path: 'login', element: <LoginPage /> },
      { path: 'register', element: <RegisterPage /> },
    ]
  }
];
```

## 後端架構

### 服務層設計

#### 1. 元素管理服務

```typescript
class ElementService {
  // 獲取所有元素
  async getElements(): Promise<Element[]>
  
  // 更新元素狀態
  async updateElementState(id: string, state: ElementState): Promise<void>
  
  // 計算元素經驗值
  async calculateExperience(id: string, action: Action): Promise<number>
  
  // 元素覺醒檢查
  async checkAwakening(id: string): Promise<AwakeningResult>
}
```

#### 2. 同步引擎服務

```typescript
class SyncEngineService {
  // 六向同步
  async syncToAllPlatforms(data: SyncData): Promise<SyncResult[]>
  
  // 單平台同步
  async syncToPlatform(platform: Platform, data: SyncData): Promise<SyncResult>
  
  // 同步狀態查詢
  async getSyncStatus(): Promise<SyncStatus>
  
  // 解決同步衝突
  async resolveConflict(conflict: Conflict): Promise<Resolution>
}
```

#### 3. AI 代理服務

```typescript
class AIAgentService {
  // 調用 AI 分析
  async analyze(context: Context): Promise<Analysis>
  
  // 生成內容
  async generate(prompt: Prompt): Promise<Content>
  
  // 智能推薦
  async recommend(user: User): Promise<Recommendation[]>
}
```

### 數據模型

#### 核心實體

```typescript
// 元素實體
interface Element {
  id: string;
  name: string;
  spirit: Spirit;
  color: Color;
  domain: Domain;
  state: ElementState;
  experience: number;
  level: number;
}

// 化身實體
interface Avatar {
  id: string;
  name: string;
  element: Element;
  profession: Profession;
  skills: Skill[];
  experience: number;
}

// 同步任務實體
interface SyncTask {
  id: string;
  platform: Platform;
  data: any;
  status: 'pending' | 'processing' | 'completed' | 'failed';
  createdAt: Date;
  completedAt?: Date;
}
```

## 數據流架構

### 用戶操作流程

```
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

### 六向同步流程

```
Sync Trigger
    ↓
Sync Engine
    ├─→ Capacities API
    ├─→ Notion API
    ├─→ Boost.Space Webhook
    ├─→ Supabase REST
    ├─→ AITable API
    └─→ Upnote API
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
    ↓
User Notification
```

## 安全架構

### 認證與授權

```typescript
// 認證流程
interface AuthFlow {
  // 1. 用戶登入
  login(credentials: Credentials): Promise<AuthToken>
  
  // 2. Token 驗證
  verifyToken(token: string): Promise<User>
  
  // 3. Token 刷新
  refreshToken(refreshToken: string): Promise<AuthToken>
  
  // 4. 登出
  logout(): Promise<void>
}

// 權限控制
interface Authorization {
  // 檢查權限
  hasPermission(user: User, resource: Resource, action: Action): boolean
  
  // 角色檢查
  hasRole(user: User, role: Role): boolean
}
```

### 數據加密

- **傳輸加密**：所有 API 通訊使用 HTTPS/TLS
- **存儲加密**：敏感數據在 Supabase 中加密存儲
- **密鑰管理**：使用環境變數管理 API 密鑰

## 性能優化

### 前端優化

1. **代碼分割**：使用 React.lazy 和 Suspense
2. **圖片優化**：使用 WebP 格式和懶加載
3. **緩存策略**：使用 Service Worker 和 IndexedDB
4. **虛擬滾動**：大列表使用虛擬滾動技術

### 後端優化

1. **數據庫索引**：關鍵查詢字段建立索引
2. **查詢優化**：使用 JOIN 代替多次查詢
3. **緩存層**：Redis 緩存熱門數據
4. **CDN 加速**：靜態資源使用 CDN

## 可擴展性設計

### 水平擴展

- **無狀態設計**：API 服務器無狀態，支持水平擴展
- **負載均衡**：使用 Nginx 或雲端負載均衡器
- **數據分片**：大規模數據分片存儲

### 垂直擴展

- **服務拆分**：微服務架構，按需擴展
- **數據庫優化**：讀寫分離，主從復制

## 監控與日誌

### 監控指標

```typescript
interface Metrics {
  // 系統指標
  systemMetrics: {
    cpuUsage: number;
    memoryUsage: number;
    diskUsage: number;
  };
  
  // 應用指標
  appMetrics: {
    requestRate: number;
    errorRate: number;
    responseTime: number;
  };
  
  // 業務指標
  businessMetrics: {
    activeUsers: number;
    syncTasksCompleted: number;
    elementsActivated: number;
  };
}
```

### 日誌系統

```typescript
interface LogEntry {
  timestamp: Date;
  level: 'info' | 'warn' | 'error' | 'debug';
  service: string;
  message: string;
  context?: any;
  trace?: string;
}
```

## 災難恢復

### 備份策略

- **數據庫備份**：每日全量備份，每小時增量備份
- **配置備份**：環境配置版本化管理
- **代碼備份**：Git 倉庫多地鏡像

### 恢復計劃

1. **數據恢復**：從最近的備份恢復數據
2. **服務恢復**：快速部署備用服務器
3. **通知機制**：及時通知用戶系統狀態

## 部署架構

### 生產環境

```
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

### CI/CD 流程

```
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

## 相關資源

- 📖 [API 文件庫](./API-Library.md)
- 🔧 [部署指南](./Deployment-Guide.md)
- 📊 [監控與日誌](./Monitoring-and-Logging.md)
- 🔒 [安全最佳實踐](./Security-Best-Practices.md)

---

*本文檔反映當前系統架構，隨系統演進持續更新*
