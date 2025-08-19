import { GoogleGenerativeAI, GenerativeModel } from "@google/generative-ai";

// Note: These imports will point to the .ts files once they are converted.
// TypeScript will resolve the module without the extension.
import * as linter from './linter.agent';
import * as security from './security.agent';
import * as perplexity from './perplexity.agent';

// Define types for clarity
interface Agent {
  name: string;
  agent: (code: string) => Promise<any>;
  description: string;
}

interface Command {
  user: string;
  endpoint: string;
  context: string;
  params?: {
    code?: string;
  };
}

const genAI: GoogleGenerativeAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY as string);
const model: GenerativeModel = genAI.getGenerativeModel({ model: "gemini-pro" });

// Define all available agents that can be orchestrated.
const agents: Agent[] = [
  { name: "Linter", agent: linter.lint, description: "Code Linting Agent" },
  { name: "Security", agent: security.scan, description: "Security Scanner Agent" },
  { name: "Perplexity", agent: perplexity.analyze, description: "Perplexity Sonar Agent" },
];

const systemInstruction: string = `
You are a supervisor AI.
Your role is to orchestrate other AI agents (linter, security scanner, perplexity analyzer) to analyze user-provided code.

1.  First, receive the user's command object.
2.  Call all available agents in parallel with the code from the 'params' of the command.
3.  Receive the JSON or text responses from all agents.
4.  Synthesize the results into a final, human-readable summary.
5.  Format the summary in clear, well-structured markdown. Include the findings from each agent under a separate heading.
`;

async function generate(command: Command): Promise<string> {
  try {
    const code = command.params?.code || "";
    if (!code) {
      throw new Error("No code provided in command parameters.");
    }

    // Dynamically call all registered agents in parallel.
    const agentPromises = agents.map(agentInfo => agentInfo.agent(code));
    const agentResults = await Promise.allSettled(agentPromises);

    // Prepare the context for the synthesis prompt.
    let reportContent = "";
    agentResults.forEach((result, index) => {
        const agentName = agents[index].name;
        reportContent += `\n\n## Findings from ${agentName} Agent\n\n`;
        if (result.status === 'fulfilled') {
            if (typeof result.value === 'object') {
                reportContent += `\`\`\`json\n${JSON.stringify(result.value, null, 2)}\n\`\`\``;
            } else {
                reportContent += result.value;
            }
        } else {
            reportContent += `The ${agentName} agent failed to execute: ${result.reason}`;
        }
    });

    const synthesisPrompt = `
Context: The user '${command.user}' initiated a '${command.endpoint}' command with the following context: "${command.context}".

The user provided the following code:
\`\`\`
${code}
\`\`\`

Agent reports are as follows:
${reportContent}

Based on all these findings, provide a comprehensive summary in well-structured markdown format.
`;

    const genkitResult = await model.generateContent([
      systemInstruction,
      synthesisPrompt,
    ]);
    const response = await genkitResult.response;
    const text = response.text();
    return text;
  } catch (error) {
    console.error("Error in supervisor agent processing:", error);
    throw new Error("Failed to synthesize agent reports.");
  }
}

export { generate };
