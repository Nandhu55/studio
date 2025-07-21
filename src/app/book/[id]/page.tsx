
'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { useParams, useRouter } from 'next/navigation';
import { Download, Share2, Loader2, BookOpen, ArrowLeft, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import QuizGenerator from '@/components/features/quiz-generator';
import { useBooks } from '@/hooks/use-books';
import { useToast } from '@/hooks/use-toast';
import dynamic from 'next/dynamic';
import { Separator } from '@/components/ui/separator';
import ChatExplainer from '@/components/features/chat-explainer';
import { cn } from '@/lib/utils';

const PdfViewer = dynamic(() => import('@/components/features/pdf-viewer'), {
  ssr: false,
  loading: () => (
    <div className="flex justify-center items-center min-h-96 border rounded-lg bg-muted/20">
      <Loader2 className="h-8 w-8 animate-spin text-primary" />
    </div>
  ),
});


export default function BookDetailPage() {
  const params = useParams();
  const { id } = params;
  const { books } = useBooks();
  const { toast } = useToast();
  const [isReading, setIsReading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const isLoggedIn = sessionStorage.getItem('isLoggedIn');
      const isAdmin = sessionStorage.getItem('isAdmin');
      if (isLoggedIn !== 'true' && isAdmin !== 'true') {
        router.replace('/login');
      }
    }
  }, [router]);


  const book = books.find(b => b.id === id);

  if (!book) {
    return (
      <div className="flex justify-center items-center h-96">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
        <p className="ml-2">Loading book details...</p>
      </div>
    );
  }

  const hasPdf = book.pdfUrl && book.pdfUrl.startsWith('data:application/pdf;base64,');
  const downloadFileName = `${book.title.replace(/\s+/g, '_')}.pdf`;

  const handleShare = async () => {
    const fallbackCopyLink = () => {
      navigator.clipboard.writeText(window.location.href);
      toast({
        title: "Link Copied",
        description: "A link to this book has been copied to your clipboard.",
      });
    };

    if (navigator.share) {
      try {
        await navigator.share({
          title: book.title,
          text: `Check out this book: ${book.title} by ${book.author}`,
          url: window.location.href,
        });
      } catch (error) {
        // If navigator.share fails (e.g., permission denied), fall back to copying the link.
        fallbackCopyLink();
      }
    } else {
      // If navigator.share is not supported, fall back to copying the link.
      fallbackCopyLink();
    }
  };

  const handleDownload = async () => {
    if (!hasPdf) {
      toast({
          title: "Download Unavailable",
          description: "No PDF document is available for this book.",
          variant: "destructive"
      });
      return;
    }
    try {
        const response = await fetch(book.pdfUrl);
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = downloadFileName;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        window.URL.revokeObjectURL(url);
    } catch (error) {
        toast({
            title: "Download Failed",
            description: "There was an error preparing the file for download.",
            variant: "destructive"
        });
    }
  };

  if (isReading) {
    return (
      <div className="max-w-5xl mx-auto space-y-4">
        <div className="flex justify-between items-center">
            <h1 className="font-headline text-2xl font-bold truncate">{book.title}</h1>
            <Button onClick={() => setIsReading(false)}>
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Details
            </Button>
        </div>
        <PdfViewer file={book.pdfUrl} />
      </div>
    );
  }
  
  return (
    <div className="max-w-5xl mx-auto space-y-8 md:space-y-12">
      <div className="grid md:grid-cols-3 gap-8 md:gap-12">
        <div className="md:col-span-1">
          <div className="md:sticky md:top-24">
            <div className="relative aspect-[2/3] w-full max-w-xs mx-auto shadow-lg rounded-lg overflow-hidden">
              <Image
                src={book.coverImage}
                alt={`Cover of ${book.title}`}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 33vw"
                data-ai-hint={book.dataAiHint}
              />
            </div>
            <div className="mt-6 space-y-2">
                {hasPdf ? (
                    <Button className="w-full" size="lg" onClick={() => setIsReading(true)}>
                        <BookOpen className="mr-2 h-5 w-5" />
                        Read Now
                    </Button>
                ) : (
                   <Button className="w-full" size="lg" disabled>
                        <BookOpen className="mr-2 h-5 w-5" />
                        Reading not available
                    </Button>
                )}
                <div className="flex flex-col sm:flex-row gap-2">
                    <Button className="w-full" variant="secondary" onClick={handleDownload} disabled={!hasPdf}>
                        <Download className="mr-2 h-5 w-5" />
                        Download
                    </Button>
                    <Button className="w-full" variant="secondary" onClick={handleShare}>
                        <Share2 className="mr-2 h-5 w-5" />
                        Share
                    </Button>
                </div>
            </div>
          </div>
        </div>
        <div className="md:col-span-2">
          <Badge variant="secondary">{book.category}</Badge>
          <h1 className="font-headline text-3xl md:text-5xl font-bold mt-2">{book.title}</h1>
          <p className="mt-2 text-lg md:text-xl text-muted-foreground">by {book.author}</p>
          
          <div className="mt-4 flex items-center gap-2">
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                    <Star
                    key={i}
                    className={cn(
                        'h-6 w-6',
                        book.rating && i < Math.floor(book.rating)
                        ? 'text-yellow-400 fill-yellow-400'
                        : 'text-gray-300'
                    )}
                    />
                ))}
              </div>
              <span className="text-muted-foreground font-medium">{book.rating?.toFixed(1)}</span>
          </div>

          <div className="mt-8 prose dark:prose-invert max-w-none">
            <h2 className="font-headline text-2xl font-semibold">Description</h2>
            <p>{book.description}</p>
          </div>

          <div className="mt-12">
            <QuizGenerator book={book} />
          </div>
        </div>
      </div>

      <div className="space-y-8">
        <Separator className="my-8 bg-primary/20" />
        <div>
            <ChatExplainer bookContext={book.description} />
        </div>
      </div>
    </div>
  );
}
