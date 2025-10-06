import { server } from './mcpServer';
import { ListToolsRequestSchema, CallToolRequestSchema } from '@modelcontextprotocol/sdk/types';

// Mock the transport layer
jest.mock('@modelcontextprotocol/sdk/server/stdio');
jest.mock('@modelcontextprotocol/sdk/server/index.js', () => {
  return {
    Server: jest.fn().mockImplementation(() => {
      let listToolsHandler: any;
      let callToolHandler: any;
      return {
        setRequestHandler: (schema: any, handler: any) => {
          if (schema === ListToolsRequestSchema) {
            listToolsHandler = handler;
          } else if (schema === CallToolRequestSchema) {
            callToolHandler = handler;
          }
        },
        _getListToolsHandler: () => listToolsHandler,
        _getCallToolHandler: () => callToolHandler,
        connect: jest.fn(),
      };
    }),
  };
});

describe('JunAiKey MCP Server', () => {
  let listToolsHandler: any;
  let callToolHandler: any;

  beforeAll(() => {
    // The server instance is created when the module is imported
    // We can now access the handlers via the mock
    const mockServerInstance = require('./mcpServer').server;
    listToolsHandler = mockServerInstance._getListToolsHandler();
    callToolHandler = mockServerInstance._getCallToolHandler();
  });

  describe('ListTools Request Handler', () => {
    it('should return the list of available tools', async () => {
      const result = await listToolsHandler();
      expect(result.tools).toHaveLength(2);
      expect(result.tools[0].name).toBe('junaikey_analyze');
      expect(result.tools[1].name).toBe('junaikey_transform');
    });
  });

  describe('CallTool Request Handler', () => {
    it('should handle junaikey_analyze tool calls', async () => {
      const request = {
        params: {
          name: 'junaikey_analyze',
          arguments: { text: 'test' },
        },
      };
      const result = await callToolHandler(request);
      expect(result.content[0].text).toContain('JunAiKey Analysis Result');
      expect(result.content[0].text).toContain('Text: "test"');
    });

    it('should handle junaikey_transform tool calls for encoding', async () => {
      const request = {
        params: {
          name: 'junaikey_transform',
          arguments: { input: 'test', mode: 'encode' },
        },
      };
      const result = await callToolHandler(request);
      expect(result.content[0].text).toContain('JunAiKey Transformation (encode)');
      expect(result.content[0].text).toContain('dGVzdA==');
    });

    it('should handle junaikey_transform tool calls for decoding', async () => {
      const request = {
        params: {
          name: 'junaikey_transform',
          arguments: { input: 'dGVzdA==', mode: 'decode' },
        },
      };
      const result = await callToolHandler(request);
      expect(result.content[0].text).toContain('JunAiKey Transformation (decode)');
      expect(result.content[0].text).toContain('test');
    });

    it('should throw an error for unknown tools', async () => {
      const request = {
        params: {
          name: 'unknown_tool',
          arguments: {},
        },
      };
      await expect(callToolHandler(request)).rejects.toThrow('Unknown tool: unknown_tool');
    });

    it('should throw an error if arguments are not provided', async () => {
      const request = {
        params: {
          name: 'junaikey_analyze',
          arguments: undefined,
        },
      };
      await expect(callToolHandler(request)).rejects.toThrow('No arguments provided');
    });
  });
});