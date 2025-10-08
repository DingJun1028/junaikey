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
