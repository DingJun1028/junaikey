# JunAiKey MCP Integration Examples

This document provides examples of integrating the JunAiKey MCP server into your projects.

## Integration Methods

### Method 1: As a Dependency Library (推薦 Recommended)

Install JunAiKey in your project:

```bash
# If published to npm (future)
npm install junaikey

# Or from GitHub
npm install github:DingJun1028/junaikey
```

Use in your code:

```typescript
import { Server, Client } from 'junaikey';

// Use the exported MCP Server and Client
```

### Method 2: As a Git Submodule

Add as a submodule to your repository:

```bash
git submodule add https://github.com/DingJun1028/junaikey.git external/junaikey
git submodule update --init --recursive
```

Install and build:

```bash
cd external/junaikey
npm install
npm run build
```

### Method 3: Fork and Customize

1. Fork the repository on GitHub
2. Clone your fork:
   ```bash
   git clone https://github.com/YOUR-USERNAME/junaikey.git
   ```
3. Make your customizations
4. Build and use

## Using as a Library in TypeScript

### Example: Custom MCP Server

```typescript
import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import {
  CallToolRequestSchema,
  ListToolsRequestSchema,
} from "@modelcontextprotocol/sdk/types.js";

// Create your custom server
const myServer = new Server(
  {
    name: "my-custom-junaikey-server",
    version: "1.0.0",
  },
  {
    capabilities: {
      tools: {},
    },
  }
);

// Add your custom tools
myServer.setRequestHandler(ListToolsRequestSchema, async () => {
  return {
    tools: [
      {
        name: "my_custom_tool",
        description: "My custom JunAiKey tool",
        inputSchema: {
          type: "object",
          properties: {
            data: {
              type: "string",
              description: "Data to process",
            },
          },
          required: ["data"],
        },
      },
    ],
  };
});

// Implement tool logic
myServer.setRequestHandler(CallToolRequestSchema, async (request) => {
  const { name, arguments: args } = request.params;
  
  if (!args) {
    throw new Error("No arguments provided");
  }

  if (name === "my_custom_tool") {
    const data = args.data as string;
    return {
      content: [
        {
          type: "text",
          text: `Processed: ${data}`,
        },
      ],
    };
  }

  throw new Error(`Unknown tool: ${name}`);
});

// Start server
async function main() {
  const transport = new StdioServerTransport();
  await myServer.connect(transport);
  console.error("Custom JunAiKey server running");
}

main().catch(console.error);
```

### Example: Using the Client

```typescript
import { Client } from "@modelcontextprotocol/sdk/client/index.js";
import { StdioClientTransport } from "@modelcontextprotocol/sdk/client/stdio.js";

async function useJunAiKey() {
  const client = new Client(
    {
      name: "my-app",
      version: "1.0.0",
    },
    {
      capabilities: {},
    }
  );

  // Connect to JunAiKey MCP server
  const transport = new StdioClientTransport({
    command: "node",
    args: ["node_modules/junaikey/dist/mcpServer.js"],
  });

  await client.connect(transport);

  // Use JunAiKey tools
  const result = await client.callTool({
    name: "junaikey_analyze",
    arguments: {
      text: "Your data to analyze",
    },
  });

  console.log(result);

  await client.close();
}

useJunAiKey().catch(console.error);
```

## Integration with Different Frameworks

### Express.js Server

```typescript
import express from 'express';
import { spawn } from 'child_process';

const app = express();

app.post('/junaikey/analyze', async (req, res) => {
  const mcpServer = spawn('node', ['dist/mcpServer.js']);
  
  // Send request to MCP server via stdin
  mcpServer.stdin.write(JSON.stringify({
    jsonrpc: "2.0",
    method: "tools/call",
    params: {
      name: "junaikey_analyze",
      arguments: { text: req.body.text }
    }
  }));
  
  // Handle response
  mcpServer.stdout.on('data', (data) => {
    res.json(JSON.parse(data.toString()));
  });
});

app.listen(3000, () => {
  console.log('Server running on port 3000');
});
```

### Next.js API Route

```typescript
// pages/api/junaikey.ts
import { NextApiRequest, NextApiResponse } from 'next';
import { Client } from "@modelcontextprotocol/sdk/client/index.js";
import { StdioClientTransport } from "@modelcontextprotocol/sdk/client/stdio.js";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const client = new Client(
    { name: "nextjs-app", version: "1.0.0" },
    { capabilities: {} }
  );

  const transport = new StdioClientTransport({
    command: "node",
    args: ["node_modules/junaikey/dist/mcpServer.js"],
  });

  await client.connect(transport);

  const result = await client.callTool({
    name: "junaikey_analyze",
    arguments: { text: req.body.text },
  });

  await client.close();

  res.status(200).json(result);
}
```

### React Application

```typescript
// src/hooks/useJunAiKey.ts
import { useState, useEffect } from 'react';

export function useJunAiKey() {
  const [isConnected, setIsConnected] = useState(false);

  const analyze = async (text: string) => {
    const response = await fetch('/api/junaikey', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ 
        tool: 'junaikey_analyze',
        text 
      }),
    });
    return response.json();
  };

  const transform = async (input: string, mode: 'encode' | 'decode') => {
    const response = await fetch('/api/junaikey', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ 
        tool: 'junaikey_transform',
        input,
        mode
      }),
    });
    return response.json();
  };

  return { analyze, transform, isConnected };
}
```

## Docker Integration

Create a `Dockerfile`:

```dockerfile
FROM node:20-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build

EXPOSE 3000

CMD ["npm", "run", "mcp-server"]
```

Build and run:

```bash
docker build -t junaikey-mcp .
docker run -it junaikey-mcp
```

## Environment Variables

Configure MCP server behavior:

```bash
# .env
MCP_SERVER_PORT=3000
MCP_LOG_LEVEL=debug
JUNAIKEY_MODE=production
```

Use in code:

```typescript
const server = new Server(
  {
    name: "junaikey-mcp-server",
    version: process.env.npm_package_version || "1.0.0",
  },
  {
    capabilities: {
      tools: {},
      logging: {
        level: process.env.MCP_LOG_LEVEL || "info"
      }
    },
  }
);
```

## Testing

### Unit Tests Example

```typescript
import { describe, it, expect } from 'vitest';

describe('JunAiKey MCP Tools', () => {
  it('should analyze text', async () => {
    // Test implementation
  });

  it('should transform data', async () => {
    // Test implementation
  });
});
```

## Best Practices

1. **Error Handling**: Always wrap MCP calls in try-catch blocks
2. **Type Safety**: Use TypeScript interfaces for tool arguments
3. **Logging**: Implement proper logging for debugging
4. **Security**: Validate all inputs before processing
5. **Performance**: Cache results when appropriate
6. **Documentation**: Document custom tools clearly

## Troubleshooting

### Common Issues

1. **Module not found**: Ensure dependencies are installed
2. **Connection refused**: Check if server is running
3. **Type errors**: Update TypeScript definitions
4. **Timeout errors**: Increase timeout settings

## Resources

- [MCP Documentation](https://modelcontextprotocol.io)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Node.js Documentation](https://nodejs.org/docs/)

## License

MIT License - See LICENSE file for details
