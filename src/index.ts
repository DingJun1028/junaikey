/**
 * JunAiKey Main Entry Point
 * Exports MCP server and client functionality
 */

export { Server } from "@modelcontextprotocol/sdk/server/index.js";
export { Client } from "@modelcontextprotocol/sdk/client/index.js";

// Re-export main modules for easy access
export * from "./mcpServer.js";
export * from "./mcpClient.js";

console.log("JunAiKey MCP SDK loaded successfully");
