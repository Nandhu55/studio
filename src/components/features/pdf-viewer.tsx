
'use client';

import { useState } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import { useResizeDetector } from 'react-resize-detector';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight, Loader2, AlertTriangle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import 'react-pdf/dist/esm/Page/AnnotationLayer.css';
import 'react-pdf/dist/esm/Page/TextLayer.css';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  'pdfjs-dist/build/pdf.worker.min.mjs',
  import.meta.url,
).toString();

interface PdfViewerProps {
  file: string;
}

export default function PdfViewer({ file }: PdfViewerProps) {
  const [numPages, setNumPages] = useState<number | null>(null);
  const [pageNumber, setPageNumber] = useState(1);
  const { toast } = useToast();
  const { width, ref } = useResizeDetector();

  const onDocumentLoadSuccess = ({ numPages }: { numPages: number }) => {
    setNumPages(numPages);
  };

  const onDocumentLoadError = (error: Error) => {
    console.error('PDF Load Error:', error);
    toast({
      title: 'Error loading PDF',
      description: 'The document could not be loaded. It may be corrupted or unavailable.',
      variant: 'destructive',
    });
  };
  
  const goToPrevPage = () => setPageNumber(prev => Math.max(prev - 1, 1));
  const goToNextPage = () => setPageNumber(prev => Math.min(prev + 1, numPages!));

  if (!file || !file.startsWith('data:application/pdf;base64,')) {
    return (
        <Alert variant="destructive">
          <AlertTriangle className="h-4 w-4" />
          <AlertTitle>PDF Not Available</AlertTitle>
          <AlertDescription>
            A readable PDF document is not available for this book. It may need to be uploaded again.
          </AlertDescription>
        </Alert>
    );
  }

  return (
    <div className="space-y-4">
        <div className="flex items-center justify-center gap-4">
            <Button onClick={goToPrevPage} disabled={pageNumber <= 1} variant="outline">
                <ChevronLeft /> Previous
            </Button>
            <span className="font-medium text-center">
                Page {pageNumber} of {numPages ?? '...'}
            </span>
            <Button onClick={goToNextPage} disabled={numPages === null || pageNumber >= numPages} variant="outline">
                Next <ChevronRight />
            </Button>
        </div>

        <div ref={ref} className="border rounded-lg overflow-hidden">
             <Document
                file={file}
                onLoadSuccess={onDocumentLoadSuccess}
                onLoadError={onDocumentLoadError}
                loading={
                    <div className="flex justify-center items-center h-96">
                        <Loader2 className="h-8 w-8 animate-spin text-primary" />
                    </div>
                }
                className="flex justify-center"
             >
                <Page 
                    key={`page_${pageNumber}`}
                    pageNumber={pageNumber} 
                    width={width ? width : 1}
                    renderTextLayer={true}
                    renderAnnotationLayer={true}
                    loading={
                         <div className="flex justify-center items-center h-96">
                            <Loader2 className="h-6 w-6 animate-spin text-primary" />
                        </div>
                    }
                />
            </Document>
        </div>
        
         <div className="flex items-center justify-center gap-4">
            <Button onClick={goToPrevPage} disabled={pageNumber <= 1} variant="outline">
                <ChevronLeft /> Previous
            </Button>
            <span className="font-medium text-center">
                Page {pageNumber} of {numPages ?? '...'}
            </span>
            <Button onClick={goToNextPage} disabled={numPages === null || pageNumber >= numPages} variant="outline">
                Next <ChevronRight />
            </Button>
        </div>
    </div>
  );
}
