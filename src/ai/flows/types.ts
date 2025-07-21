import {z} from 'zod';

// Base Message Schema
export const MessageSchema = z.object({
  sender: z.enum(['user', 'ai']),
  text: z.string(),
});

// Types for explain-text flow
export const ExplainTextInputSchema = z.object({
  messages: z.array(MessageSchema).describe('The history of the conversation.'),
  context: z.string().describe('The content of the book or chapter to provide context for the question.'),
});
export type ExplainTextInput = z.infer<typeof ExplainTextInputSchema>;

export const ExplainTextOutputSchema = z.object({
  response: z.string().describe('The AI tutor\'s response to the user.'),
});
export type ExplainTextOutput = z.infer<typeof ExplainTextOutputSchema>;
