
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
  prompt: `You are an expert tutor AI. Your goal is to explain concepts to a B.Tech student clearly and concisely.

  A student has asked the following question: "{{question}}"

  Use the following book content as context to answer the question. If the context is not sufficient, use your general knowledge but mention that the information is not from the provided text.

  Context:
  ---
  {{{context}}}
  ---

  Provide your explanation.
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
