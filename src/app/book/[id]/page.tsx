'use client';

import { notFound, useRouter } from 'next/navigation';
import { useBooks } from '@/hooks/use-books';
import { useEffect, useState } from 'react';
import BookDisplay from '@/components/features/book-display';
import React from 'react';
import { Loader2 } from 'lucide-react';

interface BookDetailPageProps {
  params: {
    id: string;
  };
}

// This is a new client component that safely handles data loading and rendering.
function BookDetails({ bookId }: { bookId: string }) {
  const { books } = useBooks();
  const router = useRouter();
  const [authStatus, setAuthStatus] = useState('checking');

  useEffect(() => {
    // This effect handles client-side authentication check
    if (typeof window !== 'undefined') {
      const isLoggedIn = sessionStorage.getItem('isLoggedIn');
      const isAdmin = sessionStorage.getItem('isAdmin');
      if (isLoggedIn === 'true' || isAdmin === 'true') {
        setAuthStatus('authenticated');
      } else {
        setAuthStatus('unauthenticated');
        router.replace('/login');
      }
    }
  }, [router]);

  // While books are loading from storage or auth is being checked
  if (books.length === 0 || authStatus === 'checking') {
    return (
      <div className="flex justify-center items-center h-96">
        <Loader2 className="h-8 w-8 animate-spin text-primary mr-2" />
        <span>Loading book details...</span>
      </div>
    );
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


// The main page component is now simpler.
// It ensures the component is mounted on the client before rendering the logic.
export default function BookDetailPage({ params }: BookDetailPageProps) {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return isClient ? <BookDetails bookId={params.id} /> : null;
}
