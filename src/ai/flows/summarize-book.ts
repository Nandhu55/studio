
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
  prompt: `You are a helpful AI assistant specialized in summarizing academic and technical content for B.Tech students.

  Your task is to provide a concise and clear summary of the provided text from the book titled "{{bookTitle}}".
  {{#if chapterTitle}}
  The text is from the chapter "{{chapterTitle}}".
  {{/if}}

  The summary should be easy to understand, highlight the key concepts, and be written in a neutral, informative tone. Aim for a summary that is about 3-5 paragraphs long, unless the source text is very short.

  Do not add any personal opinions or information that is not present in the provided text.

  Content to summarize:
  ---
  {{{content}}}
  ---
  `,
});

const summarizeBookFlow = ai.defineFlow(
  {
    name: 'summarizeBookFlow',
    inputSchema: SummarizeBookInputSchema,
    outputSchema: SummarizeBookOutputSchema,
  },
  async (input) => {
    try {
        const {output} = await prompt(input);
        if (!output) {
            throw new Error("The AI model returned an empty response.");
        }
        return output;
    } catch (error) {
        console.error("Error in summarizeBookFlow:", error);
        throw new Error("The AI summarizer is currently unavailable. Please try again later.");
    }
  }
);
