'use client';

import { useState } from 'react';
import { books, categories } from '@/lib/data';
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


export default function LibraryPage() {
  const [selectedCategory, setSelectedCategory] = useState('All');

  const filteredBooks = selectedCategory === 'All'
    ? books
    : books.filter(book => book.category === selectedCategory);

  const featuredBooks = books.slice(0, 5);

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
        <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
            <h2 className="font-headline text-3xl font-bold tracking-tight text-primary">Full Library Access</h2>
            <div className="flex items-center gap-2 flex-wrap">
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
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {filteredBooks.map(book => (
            <BookCard key={book.id} book={book} />
          ))}
        </div>
      </div>
    </div>
  );
}
