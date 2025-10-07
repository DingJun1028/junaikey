import OpenAI from "openai";

export interface OpenAIConfig {
  apiKey: string;
  model?: string;
  baseURL?: string;
}

export interface ChatMessage {
  role: 'system' | 'user' | 'assistant';
  content: string;
}

export interface FunctionTool {
  type: 'function';
  name: string;
  description: string;
  parameters: any;
  strict?: boolean;
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

export type Tool = FunctionTool | WebSearchTool | FileSearchTool | MCPTool;

export interface ChatOptions {
  model?: string;
  messages: ChatMessage[];
  tools?: Tool[];
  stream?: boolean;
}

export interface ChatResponse {
  content?: string;
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
        messages: messages,
        tools: options.tools,
        stream: options.stream,
      });

      if (options.stream) {
        return this.handleStreamResponse(response);
      }

      return {
        content: response.choices[0]?.message?.content,
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
              { type: 'image_url', image_url: { url: imageUrl } },
            ],
          },
        ],
      });

      return {
        content: response.choices[0]?.message?.content,
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
              { type: 'file_url', file_url: { url: fileUrl } },
            ],
          },
        ],
      });

      return {
        content: response.choices[0]?.message?.content,
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
      const file = await this.client.files.create({
        file: filePath,
        purpose: purpose,
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
      const response = await this.client.chat.completions.create({
        model: model || this.config.model || 'gpt-4',
        messages: [{ role: 'user', content: input }],
        tools: tools,
      });

      return {
        content: response.choices[0]?.message?.content,
        tool_calls: response.choices[0]?.message?.tool_calls,
        finish_reason: response.choices[0]?.finish_reason,
      };
    } catch (error) {
      console.error('Tool Usage Error:', error);
      throw error;
    }
  }

  /**
   * 流式響應處理
   */
  private async handleStreamResponse(
    response: any
  ): Promise<ChatResponse> {
    let content = '';
    const tool_calls: any[] = [];

    for await (const event of response) {
      if (event.choices[0]?.delta?.content) {
        content += event.choices[0].delta.content;
      }
      if (event.choices[0]?.delta?.tool_calls) {
        tool_calls.push(...event.choices[0].delta.tool_calls);
      }
    }

    return {
      content,
      tool_calls,
      finish_reason: response.choices[0]?.finish_reason,
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
