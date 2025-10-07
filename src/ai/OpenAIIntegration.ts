import OpenAI from "openai";

export interface OpenAIConfig {
  apiKey: string;
  model?: string;
  baseURL?: string;
}

export interface ChatMessage {
  role: 'system' | 'user' | 'assistant';
  content?: string | null;
}

// 定義符合 OpenAI API 格式的工具介面
export interface OpenAIFunctionTool {
  type: 'function';
  function: {
    name: string;
    description?: string;
    parameters: any;
    strict?: boolean;
  };
}

export interface WebSearchTool {
  type: 'web_search';
}

export interface FileSearchTool {
  type: 'file_search';
  vector_store_ids: string[];
}

export interface MCPTool {
  type: 'mcp';
  server_label: string;
  server_description: string;
  server_url: string;
  require_approval: 'never' | 'always' | 'auto';
}

export type Tool = OpenAIFunctionTool | WebSearchTool | FileSearchTool | MCPTool;

export interface ChatOptions {
  model?: string;
  messages: ChatMessage[];
  tools?: Tool[];
  stream?: boolean;
}

export interface ChatResponse {
  content?: string | null;
  tool_calls?: any[];
  finish_reason?: string;
}

export class OpenAIIntegration {
  private client: OpenAI;
  private config: OpenAIConfig;

  constructor(config: OpenAIConfig) {
    this.config = config;
    this.client = new OpenAI({
      apiKey: config.apiKey,
      baseURL: config.baseURL,
    });
  }

  /**
   * 生成文本回應
   */
  public async generateText(
    input: string, 
    options: Partial<ChatOptions> = {}
  ): Promise<ChatResponse> {
    const messages: ChatMessage[] = options.messages || [];
    messages.push({ role: 'user', content: input });

    try {
      const response = await this.client.chat.completions.create({
        model: options.model || this.config.model || 'gpt-4',
        messages: messages.map(msg => ({
          role: msg.role,
          content: msg.content || undefined
        })) as any,
        tools: options.tools?.map(tool => this.convertToolToOpenAIFormat(tool)),
        stream: options.stream,
      });

      if (options.stream) {
        return this.handleStreamResponse(response as any);
      }

      return {
        content: response.choices[0]?.message?.content || undefined,
        tool_calls: response.choices[0]?.message?.tool_calls,
        finish_reason: response.choices[0]?.finish_reason,
      };
    } catch (error) {
      console.error('OpenAI API Error:', error);
      throw error;
    }
  }

  /**
   * 分析圖像
   */
  public async analyzeImage(
    imageUrl: string,
    question: string,
    model: string = 'gpt-4'
  ): Promise<ChatResponse> {
    try {
      const response = await this.client.chat.completions.create({
        model: model,
        messages: [
          {
            role: 'user',
            content: [
              { type: 'text', text: question },
              { 
                type: 'image_url', 
                image_url: { 
                  url: imageUrl,
                  detail: 'auto'
                } 
              },
            ],
          },
        ],
      });

      return {
        content: response.choices[0]?.message?.content || undefined,
        finish_reason: response.choices[0]?.finish_reason,
      };
    } catch (error) {
      console.error('Image Analysis Error:', error);
      throw error;
    }
  }

  /**
   * 分析文件
   */
  public async analyzeFile(
    fileUrl: string,
    question: string,
    model: string = 'gpt-4'
  ): Promise<ChatResponse> {
    try {
      const response = await this.client.chat.completions.create({
        model: model,
        messages: [
          {
            role: 'user',
            content: [
              { type: 'text', text: question },
              { 
                type: 'text', 
                text: `文件連結: ${fileUrl}`,
              },
            ],
          },
        ],
      });

      return {
        content: response.choices[0]?.message?.content || undefined,
        finish_reason: response.choices[0]?.finish_reason,
      };
    } catch (error) {
      console.error('File Analysis Error:', error);
      throw error;
    }
  }

  /**
   * 上傳文件
   */
  public async uploadFile(
    filePath: string,
    purpose: string = 'assistants'
  ): Promise<any> {
    try {
      // 動態引入 fs 模組
      const fs = await import('fs');
      const fileStream = fs.createReadStream(filePath);
      
      const file = await this.client.files.create({
        file: fileStream,
        purpose: purpose as any,
      });
      return file;
    } catch (error) {
      console.error('File Upload Error:', error);
      throw error;
    }
  }

  /**
   * 使用工具調用
   */
  public async useTools(
    input: string,
    tools: Tool[],
    model?: string
  ): Promise<ChatResponse> {
    try {
      const chatCompletionTools = tools.map(tool => this.convertToolToOpenAIFormat(tool));

      const response = await this.client.chat.completions.create({
        model: model || this.config.model || 'gpt-4',
        messages: [{ role: 'user', content: input }] as any,
        tools: chatCompletionTools,
      });

      return {
        content: response.choices[0]?.message?.content || undefined,
        tool_calls: response.choices[0]?.message?.tool_calls,
        finish_reason: response.choices[0]?.finish_reason,
      };
    } catch (error) {
      console.error('Tool Usage Error:', error);
      throw error;
    }
  }

  /**
   * 將工具轉換為 OpenAI 格式
   */
  private convertToolToOpenAIFormat(tool: Tool): OpenAIFunctionTool {
    if (tool.type === 'function') {
      return tool;
    }
    
    // 將其他類型的工具轉換為 function 格式
    return {
      type: 'function',
      function: {
        name: `${tool.type}_tool`,
        description: `Tool for ${tool.type} operations`,
        parameters: {
          type: 'object',
          properties: {
            action: {
              type: 'string',
              enum: [tool.type]
            },
            input: {
              type: 'object',
              description: 'Input for the tool'
            }
          },
          required: ['action']
        }
      }
    };
  }

  /**
   * 流式響應處理
   */
  private async handleStreamResponse(
    response: any
  ): Promise<ChatResponse> {
    let content = '';
    const tool_calls: any[] = [];

    for await (const chunk of response) {
      if (chunk.choices[0]?.delta?.content) {
        content += chunk.choices[0].delta.content;
      }
      if (chunk.choices[0]?.delta?.tool_calls) {
        tool_calls.push(...chunk.choices[0].delta.tool_calls);
      }
    }

    return {
      content: content || undefined,
      tool_calls,
      finish_reason: undefined, // 流式響應的 finish_reason 通常在最後一個 chunk 中
    };
  }

  /**
   * 獲取模型列表
   */
  public async getModels(): Promise<any> {
    try {
      const models = await this.client.models.list();
      return models;
    } catch (error) {
      console.error('Get Models Error:', error);
      throw error;
    }
  }

  /**
   * 獲取模型信息
   */
  public async getModelInfo(modelId: string): Promise<any> {
    try {
      const model = await this.client.models.retrieve(modelId);
      return model;
    } catch (error) {
      console.error('Get Model Info Error:', error);
      throw error;
    }
  }
}
