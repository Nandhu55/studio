'use client';

import { useState } from 'react';
import { books, categories } from '@/lib/data';
import BookCard from '@/components/common/book-card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

export default function LibraryPage() {
  const [selectedCategory, setSelectedCategory] = useState('All');

  const filteredBooks = selectedeCategory === 'All'
    ? books
    : books.filter(book => book.category === selectedCategory);

  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-headline text-4xl font-bold tracking-tight">Your Digital Library</h1>
        <p className="text-muted-foreground mt-2">Browse, read, and explore your collection of B.Tech eBooks.</p>
      </div>
      
      <div className="flex items-center space-x-4">
        <h2 className="font-headline text-lg font-medium">Filter by Category</h2>
        <Select value={selectedCategory} onValueChange={setSelectedCategory}>
          <SelectTrigger className="w-[200px] shadow-sm">
            <SelectValue placeholder="Select a category" />
          </SelectTrigger>
          <SelectContent>
            {categories.map(category => (
              <SelectItem key={category} value={category}>
                {category}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
        {filteredBooks.map(book => (
          <BookCard key={book.id} book={book} />
        ))}
      </div>
    </div>
  );
}
