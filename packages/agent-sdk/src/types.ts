import { z } from 'zod';

/**
 * Core agent configuration schema
 */
export const AgentConfigSchema = z.object({
  name: z.string(),
  version: z.string(),
  description: z.string().optional(),
  capabilities: z.array(z.string()).optional().default([]),
});

// Create a more flexible interface for input that matches what users provide
export interface AgentConfigInput {
  name: string;
  version: string;
  description?: string;
  capabilities?: string[];
}

export type AgentConfig = z.infer<typeof AgentConfigSchema>;

/**
 * Agent execution context
 */
export interface AgentContext {
  requestId: string;
  timestamp: number;
  metadata?: Record<string, unknown>;
}

/**
 * Agent response interface
 */
export interface AgentResponse<T = unknown> {
  success: boolean;
  data?: T;
  error?: string;
  metadata?: Record<string, unknown>;
}