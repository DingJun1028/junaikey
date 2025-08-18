import { BaseAgent, AgentFactory } from '../agent';
import { AgentConfigSchema, AgentContext, AgentResponse, AgentConfigInput } from '../types';
import { generateRequestId, createTimestamp, validateConfig } from '../utils';

describe('Agent SDK', () => {
  describe('BaseAgent', () => {
    class TestAgent extends BaseAgent {
      async execute(context: AgentContext): Promise<AgentResponse> {
        return {
          success: true,
          data: { message: 'Test agent executed', context },
        };
      }
    }

    it('should create an agent with valid config', () => {
      const config: AgentConfigInput = {
        name: 'test-agent',
        version: '1.0.0',
        description: 'Test agent',
        capabilities: ['test'],
      };

      const agent = new TestAgent(config);
      const agentConfig = agent.getConfig();
      expect(agentConfig.name).toBe(config.name);
      expect(agentConfig.version).toBe(config.version);
      expect(agentConfig.capabilities).toEqual(['test']);
    });

    it('should execute successfully', async () => {
      const config: AgentConfigInput = {
        name: 'test-agent',
        version: '1.0.0',
      };

      const agent = new TestAgent(config);
      const context: AgentContext = {
        requestId: 'test-req',
        timestamp: Date.now(),
      };

      const response = await agent.execute(context);
      expect(response.success).toBe(true);
      expect(response.data).toBeDefined();
    });

    it('should pass health check', async () => {
      const config: AgentConfigInput = {
        name: 'test-agent',
        version: '1.0.0',
      };

      const agent = new TestAgent(config);
      const health = await agent.health();
      expect(health).toBe(true);
    });
  });

  describe('AgentFactory', () => {
    class TestAgent extends BaseAgent {
      async execute(): Promise<AgentResponse> {
        return { success: true };
      }
    }

    it('should register and create agents', () => {
      AgentFactory.register('test', TestAgent);
      
      const config: AgentConfigInput = {
        name: 'test-agent',
        version: '1.0.0',
      };

      const agent = AgentFactory.create('test', config);
      expect(agent).toBeInstanceOf(TestAgent);
      expect(agent.getConfig().name).toBe(config.name);
    });

    it('should throw error for unknown agent', () => {
      const config: AgentConfigInput = {
        name: 'unknown-agent',
        version: '1.0.0',
      };

      expect(() => {
        AgentFactory.create('unknown', config);
      }).toThrow("Agent 'unknown' not found");
    });
  });

  describe('Utilities', () => {
    it('should generate unique request IDs', () => {
      const id1 = generateRequestId();
      const id2 = generateRequestId();
      
      expect(id1).toMatch(/^req_\d+_[a-z0-9]+$/);
      expect(id2).toMatch(/^req_\d+_[a-z0-9]+$/);
      expect(id1).not.toBe(id2);
    });

    it('should create timestamps', () => {
      const timestamp = createTimestamp();
      expect(typeof timestamp).toBe('number');
      expect(timestamp).toBeGreaterThan(0);
    });

    it('should validate configurations', () => {
      const validConfig = {
        name: 'test',
        version: '1.0.0',
      };

      const result = validateConfig(validConfig, AgentConfigSchema);
      expect(result.name).toBe('test');
      expect(result.version).toBe('1.0.0');
    });

    it('should throw error for invalid configuration', () => {
      const invalidConfig = {
        name: 123, // should be string
        version: '1.0.0',
      };

      expect(() => {
        validateConfig(invalidConfig, AgentConfigSchema);
      }).toThrow('Configuration validation failed');
    });
  });
});