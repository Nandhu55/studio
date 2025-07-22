
'use client';

import { useEffect, useState } from 'react';
import { notFound, useRouter } from 'next/navigation';
import { useBooks } from '@/hooks/use-books';
import BookDisplay from '@/components/features/book-display';
import { Loader2 } from 'lucide-react';

interface BookDetailsProps {
  bookId: string;
}

// This client component safely handles data loading, auth checks, and rendering.
export default function BookDetails({ bookId }: BookDetailsProps) {
  const { books } = useBooks();
  const router = useRouter();
  const [authStatus, setAuthStatus] = useState('checking');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // This effect handles client-side authentication check
    if (typeof window !== 'undefined') {
      const isLoggedIn = sessionStorage.getItem('isLoggedIn');
      if (isLoggedIn === 'true') {
        setAuthStatus('authenticated');
      } else {
        setAuthStatus('unauthenticated');
        router.replace('/login');
      }
    }
  }, [router]);

  useEffect(() => {
    // This effect determines if we are done loading.
    // It waits for auth check and for books to be loaded from storage.
    if (authStatus !== 'checking' && books.length > 0) {
      setIsLoading(false);
    }
  }, [authStatus, books]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-96">
        <Loader2 className="h-8 w-8 animate-spin text-primary mr-2" />
        <span>Loading book details...</span>
      </div>
    );
  }

  // If auth has failed, the redirect is in flight, so we render nothing.
  if (authStatus !== 'authenticated') {
    return null;
  }

  const book = books.find(b => b.id === bookId);

  // After loading, if the book is not found, show the 404 page.
  if (!book) {
    notFound();
    return null; // notFound() throws an error, so this is for type safety.
  }

  // If auth is good and the book is found, render the display component.
  return <BookDisplay book={book} />;
}
