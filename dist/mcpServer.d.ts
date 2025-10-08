import { Server } from "@modelcontextprotocol/sdk/server/index.js";
/**
 * JunAiKey MCP Server
 * Provides Model Context Protocol server functionality for the JunAiKey Esoteric System
 */
export declare const server: Server<{
    method: string;
    params?: {
        [x: string]: unknown;
        _meta?: {
            [x: string]: unknown;
            progressToken?: string | number | undefined;
        } | undefined;
    } | undefined;
}, {
    method: string;
    params?: {
        [x: string]: unknown;
        _meta?: {
            [x: string]: unknown;
        } | undefined;
    } | undefined;
}, {
    [x: string]: unknown;
    _meta?: {
        [x: string]: unknown;
    } | undefined;
}>;
//# sourceMappingURL=mcpServer.d.ts.map