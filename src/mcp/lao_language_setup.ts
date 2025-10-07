
// Add a placeholder resource
server.registerResource(
  "system-config",
  new ResourceTemplate("system://config", { list: undefined }),
  {
    title: "System Configuration",
    description: "Configuration data for JunAIKey system"
  },
  async (uri) => ({
    contents: [{
      uri: uri.href,
      text: "JunAIKey System Configuration\n\nCurrent version: 1.0.0\nMCP SDK: @modelcontextprotocol/sdk v1.0.4"
    }]
  })
);

// Connect to stdin/stdout transport
const transport = new StdioServerTransport();
await server.connect(transport);

console.log("MCP server started successfully");
