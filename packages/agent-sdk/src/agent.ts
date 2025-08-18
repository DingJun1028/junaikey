import { AgentConfig, AgentConfigInput, AgentContext, AgentResponse, AgentConfigSchema } from './types';

/**
 * Base Agent class for the JunAiKey ecosystem
 */
export abstract class BaseAgent {
  protected config: AgentConfig;

  constructor(configInput: AgentConfigInput) {
    // Parse and validate the configuration with defaults
    this.config = AgentConfigSchema.parse(configInput);
  }

  /**
   * Get agent configuration
   */
  public getConfig(): AgentConfig {
    return { ...this.config };
  }

  /**
   * Execute agent with given context
   */
  public abstract execute(context: AgentContext): Promise<AgentResponse>;

  /**
   * Validate agent health
   */
  public async health(): Promise<boolean> {
    return true;
  }
}

/**
 * Agent factory for creating agents
 */
export class AgentFactory {
  private static agents: Map<string, new (config: AgentConfigInput) => BaseAgent> = new Map();

  /**
   * Register an agent class
   */
  public static register(name: string, agentClass: new (config: AgentConfigInput) => BaseAgent): void {
    this.agents.set(name, agentClass);
  }

  /**
   * Create an agent instance
   */
  public static create(name: string, config: AgentConfigInput): BaseAgent {
    const AgentClass = this.agents.get(name);
    if (!AgentClass) {
      throw new Error(`Agent '${name}' not found`);
    }
    return new AgentClass(config);
  }
}