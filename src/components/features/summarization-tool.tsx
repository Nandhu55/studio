'use client';

import { useState } from 'react';
import { useForm, type SubmitHandler } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { summarizeBook, type SummarizeBookOutput } from '@/ai/flows/summarize-book';
import type { Book } from '@/lib/data';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Sparkles, Loader2 } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

const formSchema = z.object({
  chapterTitle: z.string().optional(),
});
type FormValues = z.infer<typeof formSchema>;

interface SummarizationToolProps {
  book: Book;
}

export default function SummarizationTool({ book }: SummarizationToolProps) {
  const [summary, setSummary] = useState<SummarizeBookOutput | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const { register, handleSubmit, formState: { errors } } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
  });

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    setIsLoading(true);
    setError(null);
    setSummary(null);
    try {
      const result = await summarizeBook({
        content: book.description,
        bookTitle: book.title,
        chapterTitle: data.chapterTitle,
      });
      setSummary(result);
    } catch (e) {
      setError('Failed to generate summary. Please try again.');
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="bg-card/80 backdrop-blur-sm">
      <CardHeader>
        <div className="flex items-center gap-3">
            <Sparkles className="h-8 w-8 text-accent" />
            <div>
                <CardTitle className="font-headline text-2xl">AI-Powered Summary</CardTitle>
                <CardDescription>Get a quick preview of the content.</CardDescription>
            </div>
        </div>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <Label htmlFor="chapterTitle">Chapter Title (Optional)</Label>
            <Input
              id="chapterTitle"
              placeholder="e.g., Introduction to Algorithms"
              {...register('chapterTitle')}
            />
            {errors.chapterTitle && <p className="text-sm text-destructive mt-1">{errors.chapterTitle.message}</p>}
          </div>
          <Button type="submit" disabled={isLoading} className="w-full">
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Generating...
              </>
            ) : (
              'Summarize Content'
            )}
          </Button>
        </form>

        {error && (
            <Alert variant="destructive" className="mt-4">
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>{error}</AlertDescription>
            </Alert>
        )}

        {summary && (
          <div className="mt-6">
            <h3 className="font-headline text-lg font-semibold">Summary:</h3>
            <div className="prose dark:prose-invert mt-2 text-sm max-w-none">
                <p>{summary.summary}</p>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
