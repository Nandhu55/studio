
'use server';

import {ai} from '@/ai/genkit';
import {
  SummarizeBookInputSchema,
  type SummarizeBookInput,
  SummarizeBookOutputSchema,
  type SummarizeBookOutput,
} from '@/ai/flows/types';

export async function summarizeBook(input: SummarizeBookInput): Promise<SummarizeBookOutput> {
  return summarizeBookFlow(input);
}

const prompt = ai.definePrompt({
  name: 'summarizeBookPrompt',
  input: {schema: SummarizeBookInputSchema},
  output: {schema: SummarizeBookOutputSchema},
  prompt: `You are a helpful AI assistant that summarizes books or chapters for students.

  Summarize the following content from the book "{{bookTitle}}".
  {% if chapterTitle %}The content is from chapter "{{chapterTitle}}".{% endif %}

  Content: {{{content}}}`,
});

const summarizeBookFlow = ai.defineFlow(
  {
    name: 'summarizeBookFlow',
    inputSchema: SummarizeBookInputSchema,
    outputSchema: SummarizeBookOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
