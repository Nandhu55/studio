import Image from 'next/image';
import Link from 'next/link';
import type { Book } from '@/lib/data';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface BookCardProps {
  book: Book;
}

export default function BookCard({ book }: BookCardProps) {
  return (
    <Link href={`/book/${book.id}`} className="group block h-full">
      <Card className="h-full flex flex-col overflow-hidden transition-all duration-300 ease-in-out bg-card/60 backdrop-blur-sm border-primary/20 hover:border-primary/80 hover:shadow-[0_0_20px_theme(colors.primary.DEFAULT)] hover:-translate-y-1">
        <div className="relative aspect-[2/3] w-full">
          <Image
            src={book.coverImage}
            alt={`Cover of ${book.title}`}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            data-ai-hint={book.dataAiHint}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent group-hover:from-black/20 transition-all duration-300"></div>
        </div>
        <CardContent className="p-4 flex-grow flex flex-col justify-end">
          <div>
            <Badge variant="secondary" className="mb-2 bg-cyan-400/10 text-cyan-400 border-cyan-400/20">{book.category}</Badge>
            <h3 className="font-headline text-md font-bold leading-tight line-clamp-2 text-primary-foreground">{book.title}</h3>
            <p className="text-sm text-muted-foreground mt-1 line-clamp-1">{book.author}</p>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
