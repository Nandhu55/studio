
'use server';

import { notFound } from 'next/navigation';
import { books } from '@/lib/data';
import BookDisplay from '@/components/features/book-display';

interface BookDetailPageProps {
  params: {
    id: string;
  };
}

// This is now a SERVER component for faster initial loads.
export default async function BookDetailPage({ params }: BookDetailPageProps) {
  const { id } = params;
  
  // Data fetching happens on the server.
  const book = books.find(b => b.id === id);

  if (!book) {
    notFound();
  }
  
  // The UI that requires state is now in a separate client component.
  return <BookDisplay book={book} />;
}
