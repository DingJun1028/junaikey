const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash-latest" });

const systemInstruction = `
You are a security vulnerability scanner.
Your task is to analyze the provided code for potential security issues and return a JSON object.
The JSON object must conform to this schema:
{
  "vulnerabilities": [
    {
      "line": <line_number>,
      "vulnerability": "<description_of_the_vulnerability>",
      "severity": "<'critical'|'high'|'medium'|'low'>"
    }
  ]
}
If no vulnerabilities are found, return an empty "vulnerabilities" array.
Do not add any text or explanations outside the JSON object.
`;

async function scan(code) {
  const prompt = `Scan this code for vulnerabilities:\n\`\`\`\n${code}\n\`\`\``;
  const result = await model.generateContent([systemInstruction, prompt]);
  const response = await result.response;
  const text = response.text();
  return JSON.parse(text);
}

module.exports = { scan };
