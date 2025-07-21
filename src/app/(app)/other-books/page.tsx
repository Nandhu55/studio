
'use client';

import BookCard from '@/components/common/book-card';
import { books } from '@/lib/data';

export default function OtherBooksPage() {
  const otherBooks = books.filter(book => book.category === 'Finance' || book.category === 'Motivation');

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h1 className="font-headline text-4xl font-bold tracking-tight">Inspiration & Knowledge</h1>
        <p className="mt-2 text-muted-foreground">Books for personal growth, financial literacy, and motivation.</p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-2 sm:gap-4">
        {otherBooks.length > 0 ? (
          otherBooks.map(book => (
              <BookCard key={book.id} book={book} />
          ))
        ) : (
          <div className="col-span-full text-center py-12">
              <p className="text-muted-foreground">No books found in this category yet.</p>
          </div>
        )}
      </div>
    </div>
  );
}
