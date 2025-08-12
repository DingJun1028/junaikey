'use server';

/**
 * @fileOverview AI-powered theme engine that allows users to generate UI/UX and a suitable vocabulary.
 * This file uses the Vercel AI SDK to generate a theme based on a user's prompt.
 *
 * - generateUiTheme - A function that handles the UI theme generation process.
 * - GenerateUiThemeInput - The input type for the generateUiTheme function.
 * - GenerateUiThemeOutput - The return type for the generateUiTheme function.
 */

import { openai } from '@ai-sdk/openai';
import { generateObject } from 'ai';
import { z } from 'zod';

// Define the input schema for the theme generation prompt.
const GenerateUiThemeInputSchema = z.object({
  themePrompt: z
    .string()
    .describe(
      'A prompt describing the desired UI theme, including colors, fonts, and vocabulary.'
    ),
});
export type GenerateUiThemeInput = z.infer<typeof GenerateUiThemeInputSchema>;

// Define the output schema for the generated theme.
// This ensures the AI returns data in a structured, predictable format.
const GenerateUiThemeOutputSchema = z.object({
  colors: z.object({
    primary: z.string().describe('The primary color for buttons and highlights, as an HSL string (e.g., "210 40% 98%").'),
    background: z.string().describe('The main background color, as an HSL string.'),
    accent: z.string().describe('An accent color for secondary elements, as an HSL string.'),
  }),
  font: z.string().describe('A suitable font name from Google Fonts (e.g., "Inter", "Roboto").'),
  vocabulary: z.object({
      title: z.string().describe("A suitable title for a system with this theme."),
      description: z.string().describe("A short, fitting description for a system with this theme."),
  })
});
export type GenerateUiThemeOutput = z.infer<typeof GenerateUiThemeOutputSchema>;

/**
 * Generates a UI theme using the Vercel AI SDK.
 *
 * @param input - The user's prompt and other input for theme generation.
 * @returns The generated UI theme configuration.
 */
export async function generateUiTheme(input: GenerateUiThemeInput): Promise<GenerateUiThemeOutput> {
  const { object } = await generateObject({
    model: openai('gpt-4-turbo'),
    schema: GenerateUiThemeOutputSchema,
    prompt: `You are a world-class UI/UX designer and branding expert.
      Based on the user's prompt, generate a complete and cohesive UI theme.
      Provide the theme as a JSON object that strictly follows the provided schema.
      The HSL color values should NOT include the "hsl()" wrapper.

      User Prompt: "${input.themePrompt}"
      `,
  });

  return object;
}
