
'use client';

import { useState } from 'react';
import { summarizeBook } from '@/ai/flows/summarize-book';
import type { Book } from '@/lib/data';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { FileText, Loader2 } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

interface BookSummarizerProps {
  book: Book;
}

export default function BookSummarizer({ book }: BookSummarizerProps) {
  const [summary, setSummary] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const canGenerateSummary = book.description && book.description.trim().length > 20;

  const handleGenerateSummary = async () => {
    if (!canGenerateSummary) return;
    
    setIsLoading(true);
    setError(null);
    setSummary(null);

    try {
      const result = await summarizeBook({
        content: book.description,
        bookTitle: book.title,
      });
      setSummary(result.summary);
    } catch (e: any) {
      setError(e.message || 'An unexpected error occurred. Please try again.');
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="bg-card/80 backdrop-blur-sm">
      <CardHeader>
        <div className="flex items-center gap-3">
          <FileText className="h-8 w-8 text-accent" />
          <div>
            <CardTitle className="font-headline text-2xl">AI Book Summary</CardTitle>
            <CardDescription>Get a quick overview of the book's content.</CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        {error && (
          <Alert variant="destructive" className="mb-4">
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {summary ? (
          <div className="space-y-4">
            <div className="prose prose-sm dark:prose-invert max-w-none rounded-md border bg-muted/50 p-4">
              <p>{summary}</p>
            </div>
            <Button onClick={handleGenerateSummary} disabled={isLoading} variant="outline" className="w-full">
                {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
                Regenerate Summary
            </Button>
          </div>
        ) : (
          <Button onClick={handleGenerateSummary} disabled={isLoading || !canGenerateSummary} className="w-full">
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Generating Summary...
              </>
            ) : (
              !canGenerateSummary ? 'Not enough content to summarize' : 'Generate Summary'
            )}
          </Button>
        )}
      </CardContent>
    </Card>
  );
}
