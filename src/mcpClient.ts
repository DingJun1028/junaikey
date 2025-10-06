import { Client } from "@modelcontextprotocol/sdk/client/index.js";
import { StdioClientTransport } from "@modelcontextprotocol/sdk/client/stdio.js";

/**
 * JunAiKey MCP Client
 * Demonstrates how to connect to and use the JunAiKey MCP Server
 */

async function main() {
  console.log("Initializing JunAiKey MCP Client...");

  // Create client instance
  const client = new Client(
    {
      name: "junaikey-mcp-client",
      version: "1.0.0",
    },
    {
      capabilities: {},
    }
  );

  // Connect to server via stdio (you would typically spawn the server process)
  const transport = new StdioClientTransport({
    command: "node",
    args: ["dist/mcpServer.js"],
  });

  await client.connect(transport);
  console.log("Connected to JunAiKey MCP Server");

  try {
    // List available tools
    const toolsResult = await client.listTools();
    console.log("\nAvailable Tools:");
    toolsResult.tools.forEach((tool) => {
      console.log(`- ${tool.name}: ${tool.description}`);
    });

    // Example 1: Analyze text
    console.log("\n--- Example 1: Analyzing text ---");
    const analyzeResult = await client.callTool({
      name: "junaikey_analyze",
      arguments: {
        text: "JunAiKey 奧義系統測試",
      },
    });
    console.log(((analyzeResult as any).content[0] as any).text);

    // Example 2: Transform (encode)
    console.log("\n--- Example 2: Encoding data ---");
    const encodeResult = await client.callTool({
      name: "junaikey_transform",
      arguments: {
        input: "Hello from JunAiKey!",
        mode: "encode",
      },
    });
    console.log(((encodeResult as any).content[0] as any).text);

    // Example 3: Transform (decode)
    console.log("\n--- Example 3: Decoding data ---");
    const decodeResult = await client.callTool({
      name: "junaikey_transform",
      arguments: {
        input: "SGVsbG8gZnJvbSBKdW5BaUtleSE=",
        mode: "decode",
      },
    });
    console.log(((decodeResult as any).content[0] as any).text);

  } catch (error) {
    console.error("Error during client operations:", error);
  } finally {
    await client.close();
    console.log("\nClient closed");
  }
}

main().catch((error) => {
  console.error("Client error:", error);
  process.exit(1);
});
