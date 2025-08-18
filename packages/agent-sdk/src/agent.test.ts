import { BasicAgent } from './agent';
import { AgentCreationOptions } from './interfaces';

describe('BasicAgent', () => {
  const mockOptions: AgentCreationOptions = {
    name: 'Test Agent',
    description: 'An agent for testing.',
    guidelines: [
      {
        condition: 'user is happy',
        action: 'be happy too',
      },
    ],
    tools: [
        {
            name: 'test_tool',
            description: 'A tool for testing.',
            execute: async () => 'tool output',
        }
    ]
  };

  it('should be created with the correct options', () => {
    const agent = new BasicAgent(mockOptions);
    expect(agent).toBeInstanceOf(BasicAgent);
  });

  it('should construct a valid system prompt', () => {
    const agent = new BasicAgent(mockOptions);
    // Accessing the private method for testing purposes.
    // In a real-world scenario, we might make this method protected or internal
    // or test it through its public effects.
    const systemPrompt = (agent as any).constructSystemPrompt();

    expect(systemPrompt).toContain('You are Test Agent. An agent for testing.');
    expect(systemPrompt).toContain('== BEHAVIORAL GUIDELINES ==');
    expect(systemPrompt).toContain("- If the situation is 'user is happy', then you must 'be happy too'.");
    expect(systemPrompt).toContain('== AVAILABLE TOOLS ==');
    expect(systemPrompt).toContain('- Name: test_tool');
    expect(systemPrompt).toContain('Description: A tool for testing.');
  });

  it('should return a mock response from the chat method', async () => {
    const agent = new BasicAgent(mockOptions);
    const userInput = 'this is a test';
    const response = await agent.chat(userInput);
    expect(response).toBe(`(Mock Response) Hello! I am Test Agent. You said: "${userInput}"`);
  });
});
