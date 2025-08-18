# JunAiKey v6.0 Architecture - Complete Workflow Guide

## Overview
This guide provides the correct workflow for developing with the new v6.0 architecture, specifically for the `packages/agent-sdk` module.

## 🏗️ Project Structure
```
junaikey/
├── packages/
│   └── agent-sdk/           # New v6.0 SDK
│       ├── src/
│       │   ├── __tests__/
│       │   ├── agent.ts
│       │   ├── types.ts
│       │   ├── utils.ts
│       │   └── index.ts
│       ├── dist/            # Compiled output
│       ├── package.json
│       ├── tsconfig.json
│       ├── jest.config.js
│       └── .eslintrc.js
├── functions/               # Firebase functions
├── omni_center/            # MCP backend
└── [root files]            # Main Next.js app
```

## 🚀 Correct Workflow

### 1. Dependency Installation

**CRITICAL: Run from the SDK directory, NOT the repo root**

```bash
# ✅ CORRECT - Install SDK dependencies
cd packages/agent-sdk
npm install

# ❌ WRONG - Don't run from root for SDK-specific dependencies
cd /path/to/junaikey
npm install  # This installs root app dependencies, not SDK
```

### 2. Development Commands

All commands should be run from `packages/agent-sdk/`:

```bash
# Build the SDK
npm run build

# Run tests
npm test

# Run tests in watch mode (for development)
npm run test:watch

# Run tests with coverage report
npm run test:coverage

# Development mode (TypeScript compilation in watch mode)
npm run dev

# Linting
npm run lint
npm run lint:fix

# Clean build artifacts
npm run clean
```

### 3. Testing the New SDK

The SDK includes comprehensive tests that validate:
- ✅ Agent creation and configuration
- ✅ Agent execution functionality
- ✅ AgentFactory registration and creation
- ✅ Utility functions (ID generation, timestamps, validation)
- ✅ Error handling for invalid configurations

**Test Results:**
```
Test Suites: 1 passed, 1 total
Tests:       9 passed, 9 total
Coverage:    All core functionality covered
```

### 4. Build Process

The build process:
1. TypeScript compilation (`tsc`)
2. Generates `.d.ts` declaration files
3. Creates source maps for debugging
4. Outputs to `dist/` directory

**Build artifacts created:**
- `dist/agent.js` + `agent.d.ts`
- `dist/types.js` + `types.d.ts` 
- `dist/utils.js` + `utils.d.ts`
- `dist/index.js` + `index.d.ts`

## 🔧 Environment Configuration

### No Special Environment Variables Required
The Agent SDK is designed to be framework-agnostic with minimal environmental dependencies.

### Node.js Version
- **Current:** Node.js 18+ (as defined in Firebase functions)
- **TypeScript:** 5.x (configured in `tsconfig.json`)

### Development Environment
The SDK works in any TypeScript/Node.js environment and includes:
- **Jest** for testing
- **ESLint** for code quality
- **TypeScript** for type safety
- **Zod** for runtime validation

## 📝 Key Practices to Avoid Environmental Issues

### 1. Directory Management
- **Always work from the correct directory** (`packages/agent-sdk/`)
- **Never mix dependency installations** between root and packages

### 2. Dependency Isolation
- SDK has its own `package.json` with isolated dependencies
- No conflicts with root Next.js app dependencies
- Clear separation between SDK, functions, and main app

### 3. Build Isolation
- SDK builds independently of the main app
- Can be developed and tested without running the main app
- Compiled output is self-contained

### 4. Testing Strategy
- **Unit tests** for all core functionality
- **TypeScript strict mode** for compile-time safety
- **Runtime validation** using Zod schemas
- **Coverage reporting** to ensure quality

## 🎯 Development Workflow Example

```bash
# 1. Navigate to SDK directory
cd packages/agent-sdk

# 2. Install dependencies (first time)
npm install

# 3. Start development mode
npm run dev  # (in one terminal)

# 4. Run tests in watch mode (in another terminal)
npm run test:watch

# 5. Before committing
npm run build  # Ensure it builds
npm test       # Ensure tests pass
npm run lint   # Ensure code quality
```

## 🔍 Troubleshooting

### Common Issues and Solutions:

1. **"Module not found" errors**
   - Ensure you're in `packages/agent-sdk/` directory
   - Run `npm install` in the SDK directory

2. **TypeScript compilation errors**
   - Check `tsconfig.json` configuration
   - Ensure all dependencies are installed

3. **Test failures**
   - Run `npm run build` first
   - Check that all source files are saved

4. **Linting issues**
   - Run `npm run lint:fix` for auto-fixes
   - Check ESLint configuration if errors persist

This workflow has been tested and verified to work correctly with the new v6.0 architecture.