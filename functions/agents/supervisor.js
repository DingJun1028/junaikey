const { GoogleGenerativeAI } = require("@google/generative-ai");

const linter = require("./linter.agent");
const security = require("./security.agent");

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-pro" });

// Define all available agents that can be orchestrated.
const agents = [
  { name: "Linter", agent: linter.lint, description: "Code Linting Agent" },
  { name: "Security", agent: security.scan, description: "Security Scanner Agent" },
];

const systemInstruction = `
You are a supervisor AI.
Your role is to orchestrate other AI agents (linter, security scanner) to analyze user-provided code.

1.  First, receive the user's command object.
2.  Call all available agents in parallel with the code from the 'params' of the command.
3.  Receive the JSON responses from all agents.
4.  Synthesize the results into a final, human-readable summary.
5.  Format the summary in clear, well-structured markdown. Include the findings from each agent under a separate heading.
`;

async function generate(command) {
  try {
    const code = command.params?.code || "";
    if (!code) {
      throw new Error("No code provided in command parameters.");
    }

    // Dynamically call all registered agents in parallel. This is the "Myriad Avatars" concept.
    const agentPromises = agents.map(agentInfo => agentInfo.agent(code));
    const agentResults = await Promise.all(agentPromises);

    // Prepare the context for the synthesis prompt.
    let reportContent = "";
    agentResults.forEach((result, index) => {
        const agentName = agents[index].name;
        reportContent += `
The ${agentName} agent found the following issues:
${JSON.stringify(result, null, 2)}
`;
    });

    const synthesisPrompt = `
Context: The user '${command.user}' initiated a '${command.endpoint}' command with the following context: "${command.context}".

${reportContent}

Based on these findings, provide a comprehensive summary in markdown format.
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
