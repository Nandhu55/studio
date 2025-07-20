// Summarize the content of a book or chapter using generative AI.

'use server';

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SummarizeBookInputSchema = z.object({
  content: z.string().describe('The content of the book or chapter to summarize.'),
  bookTitle: z.string().describe('The title of the book.'),
  chapterTitle: z.string().optional().describe('The title of the chapter, if summarizing a specific chapter.'),
});
export type SummarizeBookInput = z.infer<typeof SummarizeBookInputSchema>;

const SummarizeBookOutputSchema = z.object({
  summary: z.string().describe('The summary of the book or chapter.'),
});
export type SummarizeBookOutput = z.infer<typeof SummarizeBookOutputSchema>;

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
