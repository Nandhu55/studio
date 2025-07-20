import {z} from 'zod';

// Types for explain-text flow
export const ExplainTextInputSchema = z.object({
  messages: z.array(z.object({
    sender: z.enum(['user', 'ai']),
    text: z.string(),
  })).describe('The history of the conversation.'),
  context: z.string().describe('The content of the book or chapter to provide context for the question.'),
});
export type ExplainTextInput = z.infer<typeof ExplainTextInputSchema>;

export const ExplainTextOutputSchema = z.object({
  explanation: z.string().describe('The explanation of the text.'),
});
export type ExplainTextOutput = z.infer<typeof ExplainTextOutputSchema>;


// Types for summarize-book flow
export const SummarizeBookInputSchema = z.object({
  content: z.string().describe('The content of the book or chapter to summarize.'),
  bookTitle: z.string().describe('The title of the book.'),
  chapterTitle: z.string().optional().describe('The title of the chapter, if summarizing a specific chapter.'),
});
export type SummarizeBookInput = z.infer<typeof SummarizeBookInputSchema>;

export const SummarizeBookOutputSchema = z.object({
  summary: z.string().describe('The summary of the book or chapter.'),
});
export type SummarizeBookOutput = z.infer<typeof SummarizeBookOutputSchema>;
