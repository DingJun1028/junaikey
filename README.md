# JunAiKey 奧義系統 (JunAiKey Esoteric System)

This project is a web-based comparison tool for the "JunAiKey Esoteric System" with **Model Context Protocol (MCP)** integration. The primary language of this project is Traditional Chinese.

## 🚀 Features

- **MCP Server**: Full Model Context Protocol server implementation
- **MCP Client**: Example client for connecting to MCP servers
- **TypeScript SDK**: Type-safe Node.js/TypeScript integration
- **JunAiKey Tools**: Custom tools for analyzing and transforming data

## 📦 Installation

```bash
# Install dependencies
npm install

# Build the project
npm run build
```

## 🔧 Usage

### Running the MCP Server

```bash
npm run mcp-server
```

The server runs on stdio and provides the following tools:
- `junaikey_analyze`: Analyze text using the JunAiKey Esoteric System
- `junaikey_transform`: Transform data (encode/decode) using JunAiKey principles

### Running the MCP Client

```bash
npm run mcp-client
```

The client demonstrates how to:
- Connect to the MCP server
- List available tools
- Call tools with parameters
- Handle responses

### Development Mode

```bash
# Run with ts-node for development
npm run dev
```

## 📁 Project Structure

```
junaikey/
├── src/
│   ├── index.ts          # Main entry point
│   ├── mcpServer.ts      # MCP server implementation
│   └── mcpClient.ts      # MCP client example
├── dist/                 # Compiled JavaScript (generated)
├── index.html            # Web interface
├── package.json          # Node.js dependencies
├── tsconfig.json         # TypeScript configuration
└── README.md            # This file
```

## 📚 Documentation Files

*   `# Jun.Ai.Key The OmniKey (萬能元鑰).pdf`: Main documentation for the "OmniKey"
*   `JunAiKey # API 文件庫.pdf`: API documentation for JunAiKey
*   `JunAiKey TypeScript SDK 架構分析與最佳實踐參考.pdf`: Architecture and best practices reference

## 🔗 MCP Integration

This project integrates the **Model Context Protocol (MCP)** for AI-powered interactions. MCP is a standard protocol that enables seamless communication between AI models and applications.

### Key Technologies

- **Node.js** with **TypeScript**: Type-safe development
- **@modelcontextprotocol/sdk**: Official MCP SDK
- **Stdio Transport**: Standard input/output communication

## 📄 License

MIT License - see `LICENSE` file for details.