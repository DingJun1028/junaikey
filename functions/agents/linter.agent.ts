import axios, { AxiosResponse } from 'axios';

const GEMINI_API_KEY: string = process.env.GEMINI_API_KEY as string;
const API_URL: string = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${GEMINI_API_KEY}`;

// Type definitions for the linter's response
interface LintingIssue {
  line: number;
  message: string;
  severity: 'error' | 'warning' | 'info';
}

interface LinterResponse {
  issues: LintingIssue[];
}

const systemInstruction: string = `
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

async function lint(code: string): Promise<LinterResponse> {
  try {
    const prompt = `Analyze the following code:\n\`\`\`\n${code}\n\`\`\``;

    const response: AxiosResponse = await axios.post(API_URL, {
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

    const responseText: string = response.data.candidates[0].content.parts[0].text;
    return JSON.parse(responseText) as LinterResponse;

  } catch (error: any) {
    console.error("Error calling Gemini API for linting:", error.response ? error.response.data : error.message);
    return {
      issues: [{
        line: 0,
        message: `Error communicating with Linter Agent: ${error.message}`,
        severity: 'error'
      }]
    };
  }
}

export { lint };
