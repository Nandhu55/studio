
'use server';

import {ai} from '@/ai/genkit';
import {
  ExplainTextInputSchema,
  type ExplainTextInput,
  ExplainTextOutputSchema,
  type ExplainTextOutput,
} from '@/ai/flows/types';

export async function explainText(input: ExplainTextInput): Promise<ExplainTextOutput> {
  return explainTextFlow(input);
}

const prompt = ai.definePrompt({
  name: 'explainTextPrompt',
  input: {schema: ExplainTextInputSchema},
  output: {schema: ExplainTextOutputSchema},
  prompt: `You are an expert tutor AI. Your goal is to explain concepts to a B.Tech student clearly and concisely, like a helpful chatbot. You should maintain a conversational tone and remember the context of previous messages.

  Use the following book content as the primary context to answer questions. If the context is not sufficient, use your general knowledge but mention that the information is not from the provided text.

  Context from the book:
  ---
  {{{context}}}
  ---

  Conversation History:
  ---
  {{#each messages}}
  {{#if (eq sender 'user')}}Student: {{text}}{{/if}}
  {{#if (eq sender 'ai')}}Tutor: {{text}}{{/if}}
  {{/each}}
  ---

  Based on the history and context, provide a helpful and conversational response to the last student message.
  `,
});

const explainTextFlow = ai.defineFlow(
  {
    name: 'explainTextFlow',
    inputSchema: ExplainTextInputSchema,
    outputSchema: ExplainTextOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
