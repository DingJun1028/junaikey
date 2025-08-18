# JunAiKey Agent SDK v6.0

Core library for building AI agents in the JunAiKey ecosystem.

## Installation

### From packages/agent-sdk directory:
```bash
npm install
```

### From repository root:
```bash
npm install --workspace=packages/agent-sdk
```

## Development Workflow

### 1. Dependency Installation
Run from the **packages/agent-sdk directory**:
```bash
cd packages/agent-sdk
npm install
```

### 2. Building the SDK
```bash
npm run build
```

### 3. Running Tests
```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage
npm run test:coverage
```

### 4. Development Mode
```bash
# TypeScript compilation in watch mode
npm run dev
```

### 5. Linting
```bash
# Check for linting errors
npm run lint

# Fix linting errors automatically
npm run lint:fix
```

## Project Structure

```
packages/agent-sdk/
├── src/
│   ├── __tests__/          # Test files
│   ├── agent.ts            # Core agent classes
│   ├── types.ts            # TypeScript type definitions
│   ├── utils.ts            # Utility functions
│   └── index.ts            # Main export file
├── dist/                   # Compiled output (generated)
├── package.json            # Package configuration
├── tsconfig.json           # TypeScript configuration
├── jest.config.js          # Jest test configuration
└── .eslintrc.js           # ESLint configuration
```

## Usage Example

```typescript
import { BaseAgent, AgentConfig, AgentContext, AgentResponse } from '@junaikey/agent-sdk';

class MyAgent extends BaseAgent {
  async execute(context: AgentContext): Promise<AgentResponse> {
    return {
      success: true,
      data: { message: 'Hello from MyAgent!' },
    };
  }
}

// Create and use the agent
const config: AgentConfig = {
  name: 'my-agent',
  version: '1.0.0',
  description: 'My custom agent',
  capabilities: ['greeting'],
};

const agent = new MyAgent(config);
```

## Environment Configuration

No special environment variables are required for basic SDK functionality. The SDK is designed to be framework-agnostic and can be used in any TypeScript/Node.js environment.

## Testing Strategy

- **Unit Tests**: Individual component testing using Jest
- **Integration Tests**: Cross-component interaction testing
- **Coverage Target**: Minimum 80% code coverage
- **Test Environment**: Node.js with Jest runner

## Best Practices

1. **Always run tests** before committing code
2. **Use TypeScript strict mode** for better type safety
3. **Follow the established linting rules** for code consistency
4. **Write tests first** when adding new functionality
5. **Keep dependencies minimal** to avoid bloat