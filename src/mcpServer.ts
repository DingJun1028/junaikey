import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import {
  CallToolRequestSchema,
  ListToolsRequestSchema,
} from "@modelcontextprotocol/sdk/types.js";

/**
 * JunAiKey MCP Server
 * Provides Model Context Protocol server functionality for the JunAiKey Esoteric System
 */

// Create MCP server instance
const server = new Server(
  {
    name: "junaikey-mcp-server",
    version: "1.0.0",
  },
  {
    capabilities: {
      tools: {},
    },
  }
);

// Define available tools
server.setRequestHandler(ListToolsRequestSchema, async () => {
  return {
    tools: [
      {
        name: "junaikey_analyze",
        description: "Analyze text using the JunAiKey Esoteric System",
        inputSchema: {
          type: "object",
          properties: {
            text: {
              type: "string",
              description: "Text to analyze with JunAiKey system",
            },
          },
          required: ["text"],
        },
      },
      {
        name: "junaikey_transform",
        description: "Transform data using JunAiKey principles",
        inputSchema: {
          type: "object",
          properties: {
            input: {
              type: "string",
              description: "Input data to transform",
            },
            mode: {
              type: "string",
              description: "Transformation mode (encode/decode)",
              enum: ["encode", "decode"],
            },
          },
          required: ["input", "mode"],
        },
      },
    ],
  };
});

// Handle tool calls
server.setRequestHandler(CallToolRequestSchema, async (request) => {
  const { name, arguments: args } = request.params;

  if (!args) {
    throw new Error("No arguments provided");
  }

  switch (name) {
    case "junaikey_analyze": {
      const text = args.text as string;
      return {
        content: [
          {
            type: "text",
            text: `JunAiKey Analysis Result:\nText: "${text}"\nLength: ${text.length} characters\nAnalysis: Applied JunAiKey Esoteric System principles`,
          },
        ],
      };
    }

    case "junaikey_transform": {
      const input = args.input as string;
      const mode = args.mode as string;
      const transformedData =
        mode === "encode"
          ? Buffer.from(input).toString("base64")
          : Buffer.from(input, "base64").toString("utf-8");
      
      return {
        content: [
          {
            type: "text",
            text: `JunAiKey Transformation (${mode}):\nResult: ${transformedData}`,
          },
        ],
      };
    }

    default:
      throw new Error(`Unknown tool: ${name}`);
  }
});

// Start the server
async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
  
  console.error("JunAiKey MCP Server running on stdio");
}

main().catch((error) => {
  console.error("Server error:", error);
  process.exit(1);
});
