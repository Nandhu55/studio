
'use client';

import Image from 'next/image';
import Link from 'next/link';
import type { Book } from '@/lib/data';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface BookCardProps {
  book: Book;
}

export default function BookCard({ book }: BookCardProps) {

  const cardContent = (
    <Card className="h-full flex flex-col overflow-hidden transition-all duration-300 ease-in-out bg-card/60 backdrop-blur-sm border-primary/20 hover:border-primary/80 hover:shadow-[0_0_20px_theme(colors.primary.DEFAULT)] hover:-translate-y-1">
      <div className="relative aspect-[2/3] w-full">
        <Image
          src={book.coverImage}
          alt={`Cover of ${book.title}`}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, (max-width: 1024px) 25vw, 20vw"
          data-ai-hint={book.dataAiHint}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent group-hover:from-black/40 transition-all duration-300"></div>
      </div>
      <CardContent className="p-2 flex-grow flex flex-col justify-between">
        <div>
          <div className="flex flex-wrap gap-1 mb-1">
            <Badge variant="secondary" className="text-xs bg-accent/10 text-accent border-accent/20">{book.category}</Badge>
            {book.year !== 'All' && <Badge variant="outline" className="text-xs">{book.year}</Badge>}
          </div>
          <h3 className="font-headline text-xs font-bold leading-tight line-clamp-2 text-foreground">{book.title}</h3>
        </div>
        <p className="text-xs text-muted-foreground mt-0.5 line-clamp-1">{book.author}</p>
      </CardContent>
    </Card>
  );

  return (
    <Link href={`/book/${book.id}`} className="group block h-full">
      {cardContent}
    </Link>
  );
}
