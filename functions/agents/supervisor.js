const { GoogleGenerativeAI } = require("@google/generative-ai");

const linter = require("./linter.agent");
const security = require("./security.agent");
const perplexity = require("./perplexity.agent");

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-pro" });

// Define all available agents that can be orchestrated. This is the "Myriad Avatars" concept.
const agents = [
  { name: "Linter", agent: linter.lint, description: "Code Linting Agent" },
  { name: "Security", agent: security.scan, description: "Security Scanner Agent" },
  { name: "Perplexity", agent: perplexity.analyze, description: "Perplexity Sonar Agent" },
];

const systemInstruction = `
You are a supervisor AI.
Your role is to orchestrate other AI agents (linter, security scanner, perplexity analyzer) to analyze user-provided code.

1.  First, receive the user's command object.
2.  Call all available agents in parallel with the code from the 'params' of the command.
3.  Receive the JSON or text responses from all agents.
4.  Synthesize the results into a final, human-readable summary.
5.  Format the summary in clear, well-structured markdown. Include the findings from each agent under a separate heading.
`;

async function generate(command) {
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

    const result = await model.generateContent([
      systemInstruction,
      synthesisPrompt,
    ]);
    const response = await result.response;
    const text = response.text();
    return text;
  } catch (error) {
    console.error("Error in supervisor agent processing:", error);
    throw new Error("Failed to synthesize agent reports.");
  }
}

module.exports = { generate };
