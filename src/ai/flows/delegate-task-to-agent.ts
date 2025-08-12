'use server';
/**
 * @fileOverview This file defines a Genkit flow for delegating tasks to an AI agent.
 *
 * - delegateTaskToAgent - A function that handles the task delegation process.
 * - DelegateTaskToAgentInput - The input type for the delegateTaskToAgent function.
 * - DelegateTaskToAgentOutput - The return type for the delegateTaskToAgent function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const DelegateTaskToAgentInputSchema = z.object({
  taskDescription: z
    .string()
    .describe('A description of the task to be delegated to the AI agent.'),
  parameters: z
    .string()
    .describe(
      'A JSON string containing the parameters and constraints for the task.'
    ),
});
export type DelegateTaskToAgentInput = z.infer<typeof DelegateTaskToAgentInputSchema>;

const DelegateTaskToAgentOutputSchema = z.object({
  agentResponse: z.string().describe('The response from the AI agent.'),
  status: z.string().describe('The status of the delegated task.'),
});
export type DelegateTaskToAgentOutput = z.infer<typeof DelegateTaskToAgentOutputSchema>;

export async function delegateTaskToAgent(
  input: DelegateTaskToAgentInput
): Promise<DelegateTaskToAgentOutput> {
  return delegateTaskToAgentFlow(input);
}

const prompt = ai.definePrompt({
  name: 'delegateTaskToAgentPrompt',
  input: {schema: DelegateTaskToAgentInputSchema},
  output: {schema: DelegateTaskToAgentOutputSchema},
  prompt: `You are an AI agent responsible for executing tasks based on user-defined parameters and constraints.

  Task Description: {{{taskDescription}}}
  Parameters and Constraints: {{{parameters}}}

  Please provide a response indicating the status of the task and any relevant information.
  Return your answer in a JSON format that matches the DelegateTaskToAgentOutputSchema. The status field should be one of 'completed', 'pending', or 'error'.`,
});

const delegateTaskToAgentFlow = ai.defineFlow(
  {
    name: 'delegateTaskToAgentFlow',
    inputSchema: DelegateTaskToAgentInputSchema,
    outputSchema: DelegateTaskToAgentOutputSchema,
  },
  async input => {
    try {
      const {output} = await prompt(input);
      return output!;
    } catch (error: any) {
      console.error('Error in delegateTaskToAgentFlow:', error);
      return {
        agentResponse: `Task delegation failed: ${error.message}`,
        status: 'error',
      };
    }
  }
);
