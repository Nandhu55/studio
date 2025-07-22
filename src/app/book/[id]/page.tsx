
'use client';

import { notFound, useRouter } from 'next/navigation';
import { useBooks } from '@/hooks/use-books';
import BookDisplay from '@/components/features/book-display';
import { useEffect } from 'react';

interface BookDetailPageProps {
  params: {
    id: string;
  };
}

export default function BookDetailPage({ params: { id } }: BookDetailPageProps) {
  const { books } = useBooks(); // Use the hook to get all books
  const router = useRouter();

  useEffect(() => {
    // Auth check for client component
    if (typeof window !== 'undefined') {
      const isLoggedIn = sessionStorage.getItem('isLoggedIn');
      if (isLoggedIn !== 'true') {
        router.replace('/login');
      }
    }
  }, [router]);

  // Find the book from the comprehensive list from the hook
  const book = books.find(b => b.id === id);

  if (!book) {
    // If the book isn't found after the hook has loaded, show 404.
    // We can add a loading state here if books load asynchronously.
    // For now, returning null while waiting for books hook to populate.
    if(books.length > 0) {
      notFound();
    }
    return null; // or a loading spinner
  }
  
  // The UI that requires state is in a separate client component.
  return <BookDisplay book={book} />;
}
