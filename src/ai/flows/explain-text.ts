
'use server';

import {ai} from '@/ai/genkit';
import {
  ExplainTextInputSchema,
  type ExplainTextInput,
  ExplainTextOutputSchema,
  type ExplainTextOutput,
  MessageSchema,
} from '@/ai/flows/types';
import {z} from 'zod';

export async function explainText(input: ExplainTextInput): Promise<ExplainTextOutput> {
  return explainTextFlow(input);
}

const explainTextPromptInputSchema = ExplainTextInputSchema.extend({
  messages: z.array(MessageSchema.extend({
    isUser: z.boolean().optional(),
    isAi: z.boolean().optional(),
  })),
});

const prompt = ai.definePrompt({
  name: 'explainTextPrompt',
  input: {schema: explainTextPromptInputSchema},
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
  {{#if isUser}}Student: {{text}}{{/if}}
  {{#if isAi}}Tutor: {{text}}{{/if}}
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
    const processedMessages = input.messages.map(message => ({
        ...message,
        isUser: message.sender === 'user',
        isAi: message.sender === 'ai'
    }));
    
    const {output} = await prompt({...input, messages: processedMessages});
    return output!;
  }
);
