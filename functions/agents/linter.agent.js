const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash-latest" });

const systemInstruction = `
You are an expert code linter.
Your role is to analyze provided code snippets and return a JSON object with linting suggestions.
The JSON object must follow this schema:
{
  "issues": [
    {
      "line": <line_number>,
      "message": "<linting_message>",
      "severity": "<'error'|'warning'|'info'>"
    }
  ]
}
If there are no issues, return an empty "issues" array.
Do not provide any explanations or text outside of the JSON object.
`;

async function lint(code) {
  const prompt = `Analyze the following code:\n\`\`\`\n${code}\n\`\`\``;
  const result = await model.generateContent([systemInstruction, prompt]);
  const response = await result.response;
  const text = response.text();
  return JSON.parse(text);
}

module.exports = { lint };
