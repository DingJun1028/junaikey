const axios = require('axios');

const systemInstruction = `
You are a senior code analyst.
Your role is to analyze provided code snippets and provide a human-readable analysis.
Focus on code quality, potential improvements, and overall structure.
Respond in clear, well-structured markdown.
`;

async function analyze(code) {
  try {
    const response = await axios.post(
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
      },
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

  } catch (error) {
    console.error("Error calling Perplexity API:", error.response ? error.response.data : error.message);
    // Return a structured error message that the supervisor can display.
    return `Error communicating with Perplexity Sonar Agent: ${error.message}`;
  }
}

module.exports = { analyze };
