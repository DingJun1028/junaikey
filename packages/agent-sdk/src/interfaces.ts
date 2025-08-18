/**
 * @file Defines the core interfaces for the JunAiKey Agent SDK.
 * These structures are inspired by the agentic behavior modeling concepts
 * from Parlant, adapted for the JunAiKey Universe.
 */

/**
 * Represents an external capability that an Omni-Agent can use.
 * This could be anything from a data fetcher to an API call.
 */
export interface Tool {
  /** A unique name for the tool. */
  name: string;
  /** A description of what the tool does, for the agent to understand its purpose. */
  description: string;
  /** The actual function to execute. It's async to handle I/O operations. */
  execute: (args: any) => Promise<any>;
}

/**
 * A behavioral guideline that instructs an agent on how to act in specific situations.
 * These are high-level instructions to be interpreted by the underlying LLM.
 */
export interface Guideline {
  /** The condition that triggers this guideline (e.g., "the user asks for help"). */
  condition: string;
  /** The action the agent should take (e.g., "provide a list of available tools"). */
  action: string;
}

/**
 * The set of options used to configure and create a new Omni-Agent.
 * This is the primary entry point for defining a new agent's identity and capabilities.
 */
export interface AgentCreationOptions {
  /** The name of the agent (e.g., "Otto Carmen"). */
  name: string;
  /** A high-level description of the agent's role and personality. */
  description: string;
  /** A list of behavioral guidelines for the agent to follow. */
  guidelines: Guideline[];
  /** A list of tools the agent is equipped to use. */
  tools?: Tool[];
}
