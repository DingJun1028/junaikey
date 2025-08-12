'use server';

/**
 * @fileOverview AI-powered theme engine that allows users to generate UI/UX and a suitable vocabulary.
 *
 * - generateUiTheme - A function that handles the UI theme generation process.
 * - GenerateUiThemeInput - The input type for the generateUiTheme function.
 * - GenerateUiThemeOutput - The return type for the generateUiTheme function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateUiThemeInputSchema = z.object({
  themePrompt: z
    .string()
    .describe(
      'A prompt describing the desired UI theme, including colors, fonts, and vocabulary.'
    ),
});
export type GenerateUiThemeInput = z.infer<typeof GenerateUiThemeInputSchema>;

const GenerateUiThemeOutputSchema = z.object({
  theme: z
    .string()
    .describe(
      'The generated UI theme configuration, including colors, fonts, and vocabulary.'
    ),
});
export type GenerateUiThemeOutput = z.infer<typeof GenerateUiThemeOutputSchema>;

export async function generateUiTheme(input: GenerateUiThemeInput): Promise<GenerateUiThemeOutput> {
  return generateUiThemeFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateUiThemePrompt',
  input: {schema: GenerateUiThemeInputSchema},
  output: {schema: GenerateUiThemeOutputSchema},
  prompt: `You are a UI/UX design expert. Generate a UI theme configuration based on the user's prompt. Consider colors, fonts, and vocabulary.

Theme Prompt: {{{themePrompt}}}

UI Theme Configuration:`,
});

const generateUiThemeFlow = ai.defineFlow(
  {
    name: 'generateUiThemeFlow',
    inputSchema: GenerateUiThemeInputSchema,
    outputSchema: GenerateUiThemeOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
