
'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Download, Share2, BookOpen, ArrowLeft, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { cn, transformGoogleDriveLink } from '@/lib/utils';
import type { Book } from '@/lib/data';
import Remarks from '@/components/features/remarks';

interface BookDisplayProps {
  book: Book;
}

export default function BookDisplay({ book }: BookDisplayProps) {
  const { toast } = useToast();
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

  const hasPdf = book.pdfUrl && book.pdfUrl !== '#';

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
        fallbackCopyLink();
      }
    } else {
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
    
    // Get the direct download URL
    const downloadUrl = transformGoogleDriveLink(book.pdfUrl, false);
    window.open(downloadUrl, '_blank');
  };

  const handleRead = () => {
     if (!hasPdf) {
      toast({
          title: "Read Unavailable",
          description: "No PDF document is available for this book.",
          variant: "destructive"
      });
      return;
    }
    const readUrl = transformGoogleDriveLink(book.pdfUrl, true);
    window.open(readUrl, '_blank');
  }
  
  return (
      <div className="max-w-5xl mx-auto space-y-8 md:space-y-12">
        <Button variant="ghost" onClick={() => router.back()} className="mb-4">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to library
        </Button>
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

            <div className="my-6 space-y-2">
              
              <Button className="w-full md:w-auto" size="lg" onClick={handleRead} disabled={!hasPdf}>
                  <BookOpen className="mr-2 h-5 w-5" />
                  {hasPdf ? 'Read Now' : 'Reading not available'}
              </Button>
            
              <div className="flex flex-col sm:flex-row gap-2">
                  <Button className="w-full md:w-auto" variant="secondary" onClick={handleDownload} disabled={!hasPdf}>
                      <Download className="mr-2 h-5 w-5" />
                      Download
                  </Button>
                  <Button className="w-full md:w-auto" variant="secondary" onClick={handleShare}>
                      <Share2 className="mr-2 h-5 w-5" />
                      Share
                  </Button>
              </div>
            </div>

            <div className="prose dark:prose-invert max-w-none">
              <h2 className="font-headline text-2xl font-semibold">Description</h2>
              <p>{book.description}</p>
            </div>

          </div>
        </div>
        <Remarks bookId={book.id} />
      </div>
  );
}
