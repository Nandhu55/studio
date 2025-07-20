
'use client';

import Image from 'next/image';
import { useParams } from 'next/navigation';
import { Download, Share2, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import SummarizationTool from '@/components/features/summarization-tool';
import { useBooks } from '@/hooks/use-books';
import { useToast } from '@/hooks/use-toast';
import dynamic from 'next/dynamic';

const PdfViewer = dynamic(() => import('@/components/features/pdf-viewer'), {
  ssr: false,
  loading: () => (
    <div className="flex justify-center items-center h-96 border rounded-lg bg-muted/20">
      <Loader2 className="h-8 w-8 animate-spin text-primary" />
    </div>
  ),
});


export default function BookDetailPage() {
  const params = useParams();
  const { id } = params;
  const { books } = useBooks();
  const { toast } = useToast();
  const book = books.find(b => b.id === id);

  if (!book) {
    return <div>Loading book details...</div>;
  }

  const downloadFileName = `${book.title.replace(/\s+/g, '_')}.pdf`;

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: book.title,
          text: `Check out this book: ${book.title} by ${book.author}`,
          url: window.location.href,
        });
      } catch (error) {
        console.error('Error sharing book:', error);
        toast({
            title: "Sharing Failed",
            description: "There was an error trying to share this book.",
            variant: "destructive"
        });
      }
    } else {
      navigator.clipboard.writeText(window.location.href);
      toast({
        title: "Link Copied",
        description: "A link to this book has been copied to your clipboard.",
      });
    }
  };

  const handleDownload = async () => {
    if (!book.pdfUrl || book.pdfUrl === '#') {
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
        console.error('Download failed:', error);
        toast({
            title: "Download Failed",
            description: "There was an error preparing the file for download.",
            variant: "destructive"
        });
    }
  };
  
  return (
    <div className="max-w-6xl mx-auto space-y-12">
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
            <div className="mt-6 flex gap-2">
                <Button className="w-full" variant="secondary" size="lg" onClick={handleDownload}>
                    <Download className="mr-2 h-5 w-5" />
                    Download
                </Button>
                <Button className="w-full" variant="secondary" size="lg" onClick={handleShare}>
                    <Share2 className="mr-2 h-5 w-5" />
                    Share
                </Button>
            </div>
          </div>
        </div>
        <div className="md:col-span-2">
          <div className="flex flex-wrap gap-2 mb-2">
            <Badge variant="secondary">{book.category}</Badge>
            <Badge variant="outline">{book.year}</Badge>
          </div>
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

      <div>
        <h2 className="font-headline text-3xl font-bold mb-4">Read The Book</h2>
        <PdfViewer file={book.pdfUrl} />
      </div>
    </div>
  );
}
