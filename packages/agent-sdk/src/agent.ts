import { AgentCreationOptions, Guideline, Tool } from './interfaces';

/**
 * A concrete implementation of an Omni-Agent.
 * This class orchestrates the agent's behavior based on its configuration.
 */
export class BasicAgent {
  private name: string;
  private description: string;
  private guidelines: Guideline[];
  private tools: Map<string, Tool>;

  /**
   * Creates a new instance of a BasicAgent.
   * @param options The configuration for the agent.
   */
  constructor(options: AgentCreationOptions) {
    this.name = options.name;
    this.description = options.description;
    this.guidelines = options.guidelines;
    this.tools = new Map(options.tools?.map(tool => [tool.name, tool]));
  }

  /**
   * The main interaction point with the agent.
   * This method will eventually use an LLM to generate a response.
   * @param userInput The message from the user.
   * @returns A response from the agent.
   */
  public async chat(userInput: string): Promise<string> {
    const systemPrompt = this.constructSystemPrompt();

    // --- LLM Interaction (Placeholder) ---
    // In a real implementation, this is where you would call the LLM
    // with the systemPrompt and userInput.
    // e.g., const llmResponse = await llm.generate(systemPrompt, userInput);
    // For now, we'll return a mock response that shows the prompt.

    console.log("--- System Prompt ---");
    console.log(systemPrompt);
    console.log("--- User Input ---");
    console.log(userInput);
    console.log("--------------------");

    return `(Mock Response) Hello! I am ${this.name}. You said: "${userInput}"`;
  }

  /**
   * Constructs the system prompt to guide the LLM's behavior.
   * @returns The fully constructed system prompt string.
   */
  private constructSystemPrompt(): string {
    let prompt = `You are ${this.name}. ${this.description}\n\n`;

    prompt += "== BEHAVIORAL GUIDELINES ==\n";
    if (this.guidelines.length > 0) {
      for (const guideline of this.guidelines) {
        prompt += `- If the situation is '${guideline.condition}', then you must '${guideline.action}'.\n`;
      }
    } else {
      prompt += "No specific guidelines provided.\n";
    }

    prompt += "\n== AVAILABLE TOOLS ==\n";
    if (this.tools.size > 0) {
      for (const tool of this.tools.values()) {
        prompt += `- Name: ${tool.name}\n  Description: ${tool.description}\n`;
      }
    } else {
      prompt += "You have no tools available.\n";
    }

    return prompt;
  }
}
