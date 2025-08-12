const { GoogleGenerativeAI } = require("@google/generative-ai");

const linter = require("./linter.agent");
const security = require("./security.agent");

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-pro" });

const systemInstruction = `
You are a supervisor AI.
Your role is to orchestrate other AI agents (linter, security scanner) to analyze user-provided code.

1.  First, receive the user's command object.
2.  Call the linter agent and the security scanner agent with the code from the 'params' of the command.
3.  Receive the JSON responses from both agents.
4.  Synthesize the results into a final, human-readable summary.
5.  Format the summary in clear, well-structured markdown. Include the findings from both agents under separate headings.
`;

async function generate(command) {
  try {
    // In a real scenario, you'd have more complex routing based on command.endpoint
    // For now, we assume the command is for code analysis.
    const code = command.params?.code || "";
    if (!code) {
      throw new Error("No code provided in command parameters.");
    }

    // Call agents in parallel
    const [lintResult, securityResult] = await Promise.all([
      linter.lint(code),
      security.scan(code),
    ]);

    const synthesisPrompt = `
Context: The user '${command.user}' initiated a '${command.endpoint}' command with the following context: "${command.context}".

The linter agent found the following issues:
${JSON.stringify(lintResult, null, 2)}

The security scanner agent found the following vulnerabilities:
${JSON.stringify(securityResult, null, 2)}

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
