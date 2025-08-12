
'use server';

/**
 * @fileOverview AI-powered content generator.
 * This file uses the Vercel AI SDK to generate a course plan based on a user's prompt.
 *
 * - generateContent - A function that handles the course plan generation process.
 * - GenerateContentInput - The input type for the generateContent function.
 * - GenerateContentOutput - The return type for the generateContent function.
 */

import { openai } from '@ai-sdk/openai';
import { generateObject } from 'ai';
import { z } from 'zod';

const GenerateContentInputSchema = z.object({
  topic: z
    .string()
    .describe('A topic for which to generate a course plan.'),
});
export type GenerateContentInput = z.infer<typeof GenerateContentInputSchema>;

const GenerateContentOutputSchema = z.object({
  courseTitle: z.string().describe('A suitable title for the course.'),
  targetAudience: z.string().describe('A description of the target audience for this course.'),
  learningObjectives: z.array(z.string()).describe('A list of 3-5 key learning objectives.'),
  activities: z.array(z.object({
    title: z.string().describe('The title of the activity.'),
    description: z.string().describe('A brief description of the activity.'),
    durationMinutes: z.number().describe('The estimated duration of the activity in minutes.'),
  })).describe('A list of 3-4 course activities.'),
});
export type GenerateContentOutput = z.infer<typeof GenerateContentOutputSchema>;

/**
 * Generates a course plan using the Vercel AI SDK.
 *
 * @param input - The user's topic for content generation.
 * @returns The generated course plan.
 */
export async function generateContent(input: GenerateContentInput): Promise<GenerateContentOutput> {
  const { object } = await generateObject({
    model: openai('gpt-4-turbo'),
    schema: GenerateContentOutputSchema,
    prompt: `You are an expert curriculum designer.
      Based on the user's topic, generate a complete and engaging course plan.
      Provide the plan as a JSON object that strictly follows the provided schema.

      User Topic: "${input.topic}"
      `,
  });

  return object;
}
