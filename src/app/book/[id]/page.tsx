'use client';

import Image from 'next/image';
import { notFound } from 'next/navigation';
import { BookOpen } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import SummarizationTool from '@/components/features/summarization-tool';
import { useBooks } from '@/hooks/use-books';

export default function BookDetailPage({ params }: { params: { id: string } }) {
  const { books } = useBooks();
  const book = books.find(b => b.id === params.id);

  if (!book) {
    // Return a loading state or a not found component
    // notFound() should be used in Server Components. For now, we can show a message.
     return <div>Loading book details...</div>;
  }

  return (
    <div className="max-w-6xl mx-auto">
      <div className="grid md:grid-cols-3 gap-8 md:gap-12">
        <div className="md:col-span-1">
          <div className="sticky top-24">
            <div className="relative aspect-[2/3] w-full max-w-sm mx-auto shadow-lg rounded-lg overflow-hidden">
              <Image
                src={book.coverImage}
                alt={`Cover of ${book.title}`}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 33vw"
                data-ai-hint={book.dataAiHint}
              />
            </div>
            <Button className="w-full mt-6" size="lg" asChild>
                <a href={book.pdfUrl} target="_blank" rel="noopener noreferrer">
                    <BookOpen className="mr-2 h-5 w-5" />
                    Read Now
                </a>
            </Button>
          </div>
        </div>
        <div className="md:col-span-2">
          <Badge variant="secondary" className="mb-2">{book.category}</Badge>
          <h1 className="font-headline text-4xl md:text-5xl font-bold">{book.title}</h1>
          <p className="mt-2 text-xl text-muted-foreground">by {book.author}</p>
          
          <div className="mt-8 prose dark:prose-invert max-w-none">
            <h2 className="font-headline text-2xl font-semibold">Description</h2>
            <p>{book.description}</p>
          </div>

          <div className="mt-12">
            <SummarizationTool book={book} />
          </div>
        </div>
      </div>
    </div>
  );
}
