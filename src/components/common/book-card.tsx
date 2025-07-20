import Image from 'next/image';
import Link from 'next/link';
import type { Book } from '@/lib/data';
import { Card, CardContent } from '@/components/ui/card';

interface BookCardProps {
  book: Book;
}

export default function BookCard({ book }: BookCardProps) {
  return (
    <Link href={`/book/${book.id}`} className="group block h-full">
      <Card className="h-full flex flex-col overflow-hidden transition-all duration-300 ease-in-out hover:-translate-y-2 hover:shadow-xl dark:hover:shadow-primary/20">
        <div className="relative aspect-[2/3] w-full">
          <Image
            src={book.coverImage}
            alt={`Cover of ${book.title}`}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            data-ai-hint={book.dataAiHint}
          />
        </div>
        <CardContent className="p-4 flex-grow flex flex-col justify-between">
          <div>
            <h3 className="font-headline text-md font-semibold leading-tight line-clamp-2">{book.title}</h3>
            <p className="text-sm text-muted-foreground mt-1 line-clamp-1">{book.author}</p>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
