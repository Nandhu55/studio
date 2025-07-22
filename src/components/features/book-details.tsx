
'use client';

import { useEffect, useState } from 'react';
import { notFound, useRouter } from 'next/navigation';
import { useBooks } from '@/hooks/use-books';
import BookDisplay from '@/components/features/book-display';
import { Loader2 } from 'lucide-react';
import type { Book } from '@/lib/data';

interface BookDetailsProps {
  bookId: string;
}

// This client component safely handles data loading, auth checks, and rendering.
export default function BookDetails({ bookId }: BookDetailsProps) {
  const { books } = useBooks();
  const router = useRouter();
  const [authStatus, setAuthStatus] = useState<'checking' | 'authenticated' | 'unauthenticated'>('checking');
  const [bookData, setBookData] = useState<Book | null | undefined>(undefined); // undefined: not checked, null: not found

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
    // This effect finds the book once the books array is populated and auth is checked.
    // It will only run when `books` has loaded or `authStatus` changes.
    if (authStatus === 'authenticated' && books.length > 0) {
      const foundBook = books.find(b => b.id === bookId);
      setBookData(foundBook || null); // Set to the book or null if not found
    }
  }, [authStatus, books, bookId]);

  // Combined loading state: wait for auth and for the book search to complete.
  if (authStatus === 'checking' || bookData === undefined) {
    return (
      <div className="flex justify-center items-center h-96">
        <Loader2 className="h-8 w-8 animate-spin text-primary mr-2" />
        <span>Loading book details...</span>
      </div>
    );
  }

  // If auth fails, we're redirecting, so render nothing.
  if (authStatus !== 'authenticated') {
    return null;
  }

  // After loading, if the book is definitively not found, show the 404 page.
  if (bookData === null) {
    notFound();
    return null; // notFound() throws an error, so this is for type safety.
  }

  // If auth is good and the book is found, render the display component.
  return <BookDisplay book={bookData} />;
}
