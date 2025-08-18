/**
 * Utility functions for the JunAiKey Agent SDK
 */

/**
 * Generate a unique request ID
 */
export function generateRequestId(): string {
  return `req_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;
}

/**
 * Create a timestamp
 */
export function createTimestamp(): number {
  return Date.now();
}

/**
 * Validate configuration object
 */
export function validateConfig<T>(config: unknown, schema: { parse: (val: unknown) => T }): T {
  try {
    return schema.parse(config);
  } catch (error) {
    throw new Error(`Configuration validation failed: ${error}`);
  }
}