/**
 * TCG 萬能矩陣・星塵故事生成器
 * 基於《JunAiKey 聖典》Gemini + Genkit 結合・神聖契約
 * 實現可觀測、可追蹤、可擴展的 AI 故事生成工作流
 */

import { configureGenkit } from 'genkit';
import { googleAI } from '@google-ai/genkit/googleai';
import { defineFlow, startFlowsServer, generate } from 'genkit/flow';
import * as z from 'zod';

// 核心配置：締結與 Gemini 的神聖契約
configureGenkit({
  plugins: [
    googleAI({
      apiKey: process.env.GEMINI_API_KEY || 'YOUR_API_KEY_HERE',
    }),
  ],
  logLevel: 'debug',
  enableTracingAndMetrics: true,
});

// 故事生成工作流：編織從「主題」到「故事」的執行緒
export const storyGeneratorFlow = defineFlow(
  {
    name: 'storyGeneratorFlow',
    inputSchema: z.object({ 
      topic: z.string().nonempty("主題不能為空"),
      style: z.enum(['scifi', 'fantasy', 'mystery', 'romance', 'horror']).optional().default('scifi'),
      length: z.enum(['short', 'medium', 'long']).optional().default('medium'),
      hero: z.string().optional(),
      setting: z.string().optional()
    }),
    outputSchema: z.object({
      story: z.string(),
      theme: z.string(),
      genre: z.string(),
      wordCount: z.number(),
      generatedAt: z.string()
    }),
  },
  async (input) => {
    // 構建提示詞
    const prompt = buildPrompt(input);
    
    // 呼叫 Gemini Pro 模型來顯現神跡
    const llmResponse = await generate({
      model: 'geminiPro',
      prompt: prompt,
      config: {
        temperature: 0.8,
        maxOutputTokens: 1024,
      },
    });

    // 提純並返回結構化的結果
    const storyText = llmResponse.text();
    
    return {
      story: storyText,
      theme: input.topic,
      genre: input.style,
      wordCount: storyText.length,
      generatedAt: new Date().toISOString()
    };
  }
);

// 多元化故事生成工作流：支援多種敘事類型
export const narrativeGeneratorFlow = defineFlow(
  {
    name: 'narrativeGeneratorFlow',
    inputSchema: z.object({
      type: z.enum(['hero_dialogue', 'story_mode', 'cutscene', 'lore_entry']),
      context: z.string(),
      character: z.string().optional(),
      trigger: z.string().optional(),
      style: z.string().optional()
    }),
    outputSchema: z.string(),
  },
  async (input) => {
    const prompt = buildNarrativePrompt(input);
    
    const llmResponse = await generate({
      model: 'geminiPro',
      prompt: prompt,
      config: {
        temperature: 0.9,
        maxOutputTokens: 2048,
      },
    });

    return llmResponse.text();
  }
);

// 卡牌描述生成工作流
export const cardDescriptionGeneratorFlow = defineFlow(
  {
    name: 'cardDescriptionGeneratorFlow',
    inputSchema: z.object({
      cardName: z.string(),
      cardType: z.string(),
      faction: z.string(),
      rarity: z.string(),
      keywords: z.array(z.string()),
      power: z.number().optional(),
      health: z.number().optional()
    }),
    outputSchema: z.object({
      effectDescription: z.string(),
      flavorText: z.string(),
      strategicInsight: z.string()
    }),
  },
  async (input) => {
    const prompt = buildCardPrompt(input);
    
    const llmResponse = await generate({
      model: 'geminiPro',
      prompt: prompt,
      config: {
        temperature: 0.7,
        maxOutputTokens: 512,
      },
    });

    const response = JSON.parse(llmResponse.text());
    return {
      effectDescription: response.effectDescription,
      flavorText: response.flavorText,
      strategicInsight: response.strategicInsight
    };
  }
);

// 英雄台詞生成工作流
export const heroDialogueGeneratorFlow = defineFlow(
  {
    name: 'heroDialogueGeneratorFlow',
    inputSchema: z.object({
      heroName: z.string(),
      heroTitle: z.string(),
      faction: z.string(),
      voiceType: z.string(),
      context: z.string(),
      emotion: z.string().optional(),
      intensity: z.number().optional()
    }),
    outputSchema: z.object({
      dialogue: z.string(),
      emotion: z.string(),
      intensity: z.number(),
      duration: z.number()
    }),
  },
  async (input) => {
    const prompt = buildHeroPrompt(input);
    
    const llmResponse = await generate({
      model: 'geminiPro',
      prompt: prompt,
      config: {
        temperature: 0.8,
        maxOutputTokens: 256,
      },
    });

    const response = JSON.parse(llmResponse.text());
    return {
      dialogue: response.dialogue,
      emotion: response.emotion,
      intensity: response.intensity,
      duration: response.duration
    };
  }
);

// 故事擴展工作流
export const storyExpansionFlow = defineFlow(
  {
    name: 'storyExpansionFlow',
    inputSchema: z.object({
      originalStory: z.string(),
      expansionType: z.enum(['prequel', 'sequel', 'side_story', 'backstory']),
      newCharacters: z.array(z.string()).optional(),
      newLocations: z.array(z.string()).optional(),
      themes: z.array(z.string()).optional()
    }),
    outputSchema: z.object({
      expandedStory: z.string(),
      chapterTitle: z.string(),
      newElements: z.array(z.string>)
    }),
  },
  async (input) => {
    const prompt = buildExpansionPrompt(input);
    
    const llmResponse = await generate({
      model: 'geminiPro',
      prompt: prompt,
      config: {
        temperature: 0.85,
        maxOutputTokens: 2048,
      },
    });

    const response = JSON.parse(llmResponse.text());
    return {
      expandedStory: response.expandedStory,
      chapterTitle: response.chapterTitle,
      newElements: response.newElements
    };
  }
);

// 輔助函數：構建提示詞
function buildPrompt(input: any): string {
  const { topic, style, length, hero, setting } = input;
  
  const styleDescriptions = {
    scifi: '充滿未來科技、太空探索和人工智能的科幻故事',
    fantasy: '存在魔法、神怪和奇幻世界的冒險故事',
    mystery: '充滿懸念、謎團和偵探推理的故事',
    romance: '圍繞愛情、情感和人際關係的故事',
    horror: '充滿恐怖、懼怕和超自然現象的故事'
  };

  const lengthDescriptions = {
    short: '50-100字的微型故事',
    medium: '200-500字的中篇故事',
    long: '800-1500字的長篇故事'
  };

  return `請你扮演一位經驗豐富的${style}小說家。請圍繞「${topic}」這個主題，創作一段引人入勝的${styleDescriptions[style]}。要求：${lengthDescriptions[length]}${hero ? '主要角色是：' + hero : ''}${setting ? '故事發生在：' + setting : ''}請確保故事情節完整、人物鮮明、富有想像力。`;
}

function buildNarrativePrompt(input: any): string {
  const { type, context, character, trigger, style } = input;
  
  const typeDescriptions = {
    hero_dialogue: '英雄對話，展現英雄性格和情感',
    story_mode: '劇情模式，推進故事情節',
    cutscene: '過場動畫，描場景和動作',
    lore_entry: '背景敘事，設定世界觀'
  };

  return `作為《JunAiKey》的敘事大師，請創建一段${typeDescriptions[type]}。${character ? '主要角色：' + character : ''}${trigger ? '觸發條件：' + trigger : ''}故事背景：${context}${style ? '風格要求：' + style : ''}請確保內容符合宇宙觀，展現元素特性。`;
}

function buildCardPrompt(input: any): string {
