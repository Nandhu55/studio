'use client';

import { notFound, useRouter } from 'next/navigation';
import { useBooks } from '@/hooks/use-books';
import { useEffect, useState, use } from 'react';
import BookDisplay from '@/components/features/book-display';
import React from 'react';
import { Loader2 } from 'lucide-react';

interface BookDetailPageProps {
  params: {
    id: string;
  };
}

export default function BookDetailPage({ params }: BookDetailPageProps) {
  const { id } = use(params);
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

  const book = books.find(b => b.id === id);

  // Still loading books from storage or waiting for auth check
  if (books.length === 0 || authStatus === 'checking') {
    return (
      <div className="flex justify-center items-center h-96">
        <Loader2 className="h-8 w-8 animate-spin text-primary mr-2" />
        <span>Loading book details...</span>
      </div>
    );
  }
  
  // Auth has finished, books are loaded, but the specific book wasn't found
  if (!book) {
    notFound();
  }

  // If we get here, auth is good and the book is found
  return <BookDisplay book={book} />;
}
