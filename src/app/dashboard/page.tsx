
import { books as allBooks, years, initialCategories } from '@/lib/data';
import BookCard from '@/components/common/book-card';
import { Terminal } from 'lucide-react';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import { Separator } from '@/components/ui/separator';
import BookFilters from '@/components/features/book-filters';

// This is a Server Component. It fetches data and passes it to Client Components.
export default function LibraryPage() {
  const featuredBooks = allBooks.slice(0, 10);
  const academicBooks = allBooks.filter(book => book.category !== 'Finance' && book.category !== 'Motivation');
  const academicCategories = initialCategories.filter(c => c !== 'Finance' && c !== 'Motivation');
  const displayYears = ['All', ...years];

  return (
    <div className="space-y-8 sm:space-y-12">
        <div className="space-y-8">
            <div className="text-center p-6 sm:p-8 border border-primary/20 rounded-lg bg-card/50 relative overflow-hidden">
                <div className="absolute inset-0 bg-grid-cyan bg-cyan-950/10 [mask-image:linear-gradient(to_bottom,white_5%,transparent_80%)]"></div>
                <div className="relative">
                <h1 className="font-headline text-4xl sm:text-5xl font-bold tracking-tighter text-primary drop-shadow-[0_0_10px_rgba(var(--primary-rgb),0.5)]">B-TECH HUB</h1>
                <p className="text-muted-foreground mt-2 text-base sm:text-lg">Welcome back, Student. Access your digital library.</p>
                </div>
            </div>

            <div>
                <h2 className="font-headline text-2xl sm:text-3xl font-bold tracking-tight text-primary mb-4 sm:mb-6 flex items-center gap-3">
                <Terminal />
                Featured Books
                </h2>
                <Carousel
                opts={{
                    align: "start",
                    loop: true,
                }}
                className="w-full"
                >
                <CarouselContent className="-ml-2 sm:-ml-4">
                    {featuredBooks.map((book) => (
                    <CarouselItem key={book.id} className="basis-1/2 sm:basis-1/3 md:basis-1/4 lg:basis-1/3 xl:basis-1/4 pl-2 sm:pl-4">
                        <div className="p-1 h-full">
                        <BookCard book={book} />
                        </div>
                    </CarouselItem>
                    ))}
                </CarouselContent>
                <CarouselPrevious className="hover:bg-primary/20 hidden sm:flex" />
                <CarouselNext className="hover:bg-primary/20 hidden sm:flex" />
                </Carousel>
            </div>
        </div>
      
      <Separator className="my-6 bg-primary/20" />
      
      {/* The filtering UI and book grid are now handled by this client component */}
      {/* We pass the server-fetched data as props for the initial render. */}
      <BookFilters 
        initialBooks={academicBooks} 
        categories={academicCategories}
        years={displayYears}
      />
    </div>
  );
}
