
'use client';

import { useState } from 'react';
import BookCard from '@/components/common/book-card';
import { books } from '@/lib/data';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';
import { Separator } from '@/components/ui/separator';

export default function OtherBooksPage() {
  const [searchQuery, setSearchQuery] = useState('');

  const otherBooks = books.filter(book => {
    const isOtherBook = book.category === 'Finance' || book.category === 'Motivation';
    if (!isOtherBook) return false;

    const searchMatch = searchQuery.trim() === '' ||
                        book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                        book.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
                        book.category.toLowerCase().includes(searchQuery.toLowerCase());
    return searchMatch;
  });

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h1 className="font-headline text-4xl font-bold tracking-tight">Inspiration & Knowledge</h1>
        <p className="mt-2 text-muted-foreground">Books for personal growth, financial literacy, and motivation.</p>
      </div>

      <div className="max-w-xl mx-auto">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          <Input
            placeholder="Search by title, author, or category..."
            className="pl-10"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>
      
      <Separator />

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-2 sm:gap-4">
        {otherBooks.length > 0 ? (
          otherBooks.map(book => (
              <BookCard key={book.id} book={book} />
          ))
        ) : (
          <div className="col-span-full text-center py-12">
              <p className="text-muted-foreground">No books found for your search.</p>
          </div>
        )}
      </div>
    </div>
  );
}
