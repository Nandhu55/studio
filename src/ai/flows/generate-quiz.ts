
'use server';

import {ai} from '@/ai/genkit';
import {
  GenerateQuizInputSchema,
  type GenerateQuizInput,
  GenerateQuizOutputSchema,
  type GenerateQuizOutput,
} from '@/ai/flows/types';

export async function generateQuiz(input: GenerateQuizInput): Promise<GenerateQuizOutput> {
  return generateQuizFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateQuizPrompt',
  input: {schema: GenerateQuizInputSchema},
  output: {schema: GenerateQuizOutputSchema},
  prompt: `You are an expert teacher creating a multiple-choice quiz for B.Tech students.

  Generate a quiz with {{count}} questions based on the following content from the book "{{bookTitle}}".
  {{#if chapterTitle}}The content is from the chapter titled "{{chapterTitle}}".{{/if}}

  For each question, provide 4 options and clearly indicate the correct answer. The questions should test the key concepts from the provided content.

  Content:
  ---
  {{{content}}}
  ---
  `,
});

const generateQuizFlow = ai.defineFlow(
  {
    name: 'generateQuizFlow',
    inputSchema: GenerateQuizInputSchema,
    outputSchema: GenerateQuizOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
