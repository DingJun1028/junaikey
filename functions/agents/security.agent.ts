import axios, { AxiosResponse } from 'axios';

const GEMINI_API_KEY: string = process.env.GEMINI_API_KEY as string;
const API_URL: string = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${GEMINI_API_KEY}`;

// Type definitions for the security scanner's response
interface Vulnerability {
  line: number;
  vulnerability: string;
  severity: 'critical' | 'high' | 'medium' | 'low';
}

interface SecurityResponse {
  vulnerabilities: Vulnerability[];
}

const systemInstruction: string = `
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

async function scan(code: string): Promise<SecurityResponse> {
  try {
    const prompt = `Scan this code for vulnerabilities:\n\`\`\`\n${code}\n\`\`\``;

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
    return JSON.parse(responseText) as SecurityResponse;

  } catch (error: any) {
    console.error("Error calling Gemini API for security scanning:", error.response ? error.response.data : error.message);
    return {
      vulnerabilities: [{
        line: 0,
        vulnerability: `Error communicating with Security Agent: ${error.message}`,
        severity: 'critical'
      }]
    };
  }
}

export { scan };
