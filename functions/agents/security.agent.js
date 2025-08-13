const axios = require('axios');

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
const API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${GEMINI_API_KEY}`;


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
  try {
    const prompt = `Scan this code for vulnerabilities:\n\`\`\`\n${code}\n\`\`\``;

    const response = await axios.post(API_URL, {
      "contents": [
        { "parts": [{ "text": systemInstruction }] },
        { "parts": [{ "text": prompt }] }
      ],
      "generationConfig": {
        "responseMimeType": "application/json",
      }
    }, {
      headers: { 'Content-Type': 'application/json' }
    });

    const responseText = response.data.candidates[0].content.parts[0].text;
    return JSON.parse(responseText);

  } catch (error) {
    console.error("Error calling Gemini API for security scanning:", error.response ? error.response.data : error.message);
    return { vulnerabilities: [{ line: 0, vulnerability: `Error communicating with Security Agent: ${error.message}`, severity: 'critical' }] };
  }
}

module.exports = { scan };
