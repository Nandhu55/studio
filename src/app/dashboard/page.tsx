'use client';

import { useState } from 'react';
import { years } from '@/lib/data';
import BookCard from '@/components/common/book-card';
import { Button } from '@/components/ui/button';
import { Terminal } from 'lucide-react';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import { useBooks } from '@/hooks/use-books';
import { useCategories } from '@/hooks/use-categories';
import { Separator } from '@/components/ui/separator';


export default function LibraryPage() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedYear, setSelectedYear] = useState('All');
  const { books } = useBooks();
  const { categories } = useCategories();

  const filteredBooks = books.filter(book => {
    const categoryMatch = selectedCategory === 'All' || book.category === selectedCategory;
    const yearMatch = selectedYear === 'All' || book.year === selectedYear;
    return categoryMatch && yearMatch;
  });

  const featuredBooks = books.slice(0, 5);
  const displayYears = ['All', ...years];

  return (
    <div className="space-y-12">
      <div className="text-center p-8 border border-primary/20 rounded-lg bg-card/50 relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-cyan opacity-10"></div>
        <div className="relative">
          <h1 className="font-headline text-5xl font-bold tracking-tighter text-cyan-400 drop-shadow-[0_0_10px_rgba(0,255,255,0.5)]">COMMAND CENTER</h1>
          <p className="text-muted-foreground mt-2 text-lg">Welcome back, Student. Access your digital arsenal.</p>
        </div>
      </div>

      <div>
        <h2 className="font-headline text-3xl font-bold tracking-tight text-primary mb-6 flex items-center gap-3">
          <Terminal />
          Featured Transmissions
        </h2>
        <Carousel
          opts={{
            align: "start",
            loop: true,
          }}
          className="w-full"
        >
          <CarouselContent>
            {featuredBooks.map((book) => (
              <CarouselItem key={book.id} className="md:basis-1/2 lg:basis-1/3 xl:basis-1/5">
                <div className="p-1 h-full">
                  <BookCard book={book} />
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="text-cyan-400 border-cyan-400 hover:bg-cyan-400/20" />
          <CarouselNext className="text-cyan-400 border-cyan-400 hover:bg-cyan-400/20" />
        </Carousel>
      </div>
      
      <div>
        <div className="mb-6">
            <h2 className="font-headline text-3xl font-bold tracking-tight text-primary">Full Library Access</h2>
            <div className="mt-4 flex flex-col gap-4">
                 <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-sm font-medium text-muted-foreground w-20">Category:</span>
                    {categories.map(category => (
                    <Button 
                        key={category} 
                        variant={selectedCategory === category ? 'default' : 'outline'}
                        onClick={() => setSelectedCategory(category)}
                        className={`
                            border-cyan-400/50 text-cyan-400 
                            ${selectedCategory === category ? 'bg-cyan-400 text-background shadow-[0_0_15px_rgba(0,255,255,0.4)]' : 'hover:bg-cyan-900/50 hover:text-cyan-300'}
                        `}
                    >
                        {category}
                    </Button>
                    ))}
                </div>
                <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-sm font-medium text-muted-foreground w-20">Year:</span>
                    {displayYears.map(year => (
                    <Button 
                        key={year} 
                        variant={selectedYear === year ? 'default' : 'outline'}
                        onClick={() => setSelectedYear(year)}
                        className={`
                            border-cyan-400/50 text-cyan-400 
                            ${selectedYear === year ? 'bg-cyan-400 text-background shadow-[0_0_15px_rgba(0,255,255,0.4)]' : 'hover:bg-cyan-900/50 hover:text-cyan-300'}
                        `}
                    >
                        {year}
                    </Button>
                    ))}
                </div>
            </div>
        </div>
        
        <Separator className="my-6 bg-primary/20" />

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {filteredBooks.length > 0 ? (
            filteredBooks.map(book => (
                <BookCard key={book.id} book={book} />
            ))
          ) : (
            <div className="col-span-full text-center py-12">
                <p className="text-muted-foreground">No books found for the selected filters.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
