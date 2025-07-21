
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

  The output MUST be a valid JSON object matching the following schema:
  {
    "quiz": [
      {
        "question": "The quiz question.",
        "options": ["Answer 1", "Answer 2", "Answer 3", "Answer 4"],
        "correctAnswer": "The correct answer from the options."
      }
    ]
  }

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
    try {
        const {output} = await prompt(input);
        if (!output) {
            throw new Error("The AI model returned an empty response.");
        }
        return output;
    } catch (error) {
        console.error("Error in generateQuizFlow:", error);
        throw new Error("The quiz generator is currently unavailable. Please try again later.");
    }
  }
);
