import axios, { AxiosResponse } from 'axios';

// Type definitions for the Perplexity API
interface PerplexityMessage {
  role: 'system' | 'user' | 'assistant';
  content: string;
}

interface PerplexityRequest {
  model: string;
  messages: PerplexityMessage[];
}

interface PerplexityResponse {
  choices: {
    message: {
      content: string;
    };
  }[];
}

const systemInstruction: string = `
You are a senior code analyst.
Your role is to analyze provided code snippets and provide a human-readable analysis.
Focus on code quality, potential improvements, and overall structure.
Respond in clear, well-structured markdown.
`;

async function analyze(code: string): Promise<string> {
  try {
    const response: AxiosResponse<PerplexityResponse> = await axios.post(
      'https://api.perplexity.ai/chat/completions',
      {
        model: 'sonar-pro',
        messages: [
          { role: 'system', content: systemInstruction },
          {
            role: 'user',
            content: `Please analyze the following code:\n\`\`\`\n${code}\n\`\`\``
          }
        ]
      } as PerplexityRequest,
      {
        headers: {
          'Authorization': `Bearer ${process.env.PERPLEXITY_API_KEY}`,
          'Content-Type': 'application/json'
        }
      }
    );
    
    if (response.data.choices && response.data.choices.length > 0) {
      return response.data.choices[0].message.content;
    }
    throw new Error("No response choices from Perplexity API.");

  } catch (error: any) {
    console.error("Error calling Perplexity API:", error.response ? error.response.data : error.message);
    return `Error communicating with Perplexity Sonar Agent: ${error.message}`;
  }
}

export { analyze };
