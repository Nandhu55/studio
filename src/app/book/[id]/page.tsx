'use client';

import { notFound, useRouter } from 'next/navigation';
import { useBooks } from '@/hooks/use-books';
import { useEffect } from 'react';
import BookDisplay from '@/components/features/book-display';
import React from 'react';

interface BookDetailPageProps {
  params: {
    id: string;
  };
}

export default function BookDetailPage({ params }: BookDetailPageProps) {
  const { id } = params;
  const { books } = useBooks();
  const router = useRouter();

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const isLoggedIn = sessionStorage.getItem('isLoggedIn');
      if (isLoggedIn !== 'true') {
        router.replace('/login');
      }
    }
  }, [router]);

  const book = books.find(b => b.id === id);

  if (books.length > 0 && !book) {
    notFound();
  }

  if (!book) {
    return null; // or a loading spinner
  }
  
  return <BookDisplay book={book} />;
}
