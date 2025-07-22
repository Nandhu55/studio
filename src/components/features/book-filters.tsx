
'use client';

import { useState, useMemo } from 'react';
import type { Book } from '@/lib/data';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';
import BookCard from '@/components/common/book-card';

interface BookFiltersProps {
    initialBooks: Book[];
    categories: string[];
    years: string[];
}

// This is now a CLIENT component that handles its own state for filtering.
export default function BookFilters({ initialBooks, categories, years }: BookFiltersProps) {
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [selectedYear, setSelectedYear] = useState('All');
    const [searchQuery, setSearchQuery] = useState('');

    const filteredBooks = useMemo(() => {
        return initialBooks.filter(book => {
            const categoryMatch = selectedCategory === 'All' || book.category === selectedCategory;
            const yearMatch = selectedYear === 'All' || book.year === selectedYear;
            const searchMatch = searchQuery.trim() === '' || 
                                book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                                book.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
                                book.category.toLowerCase().includes(searchQuery.toLowerCase());
            
            return categoryMatch && yearMatch && searchMatch;
        });
    }, [initialBooks, selectedCategory, selectedYear, searchQuery]);


    return (
        <div>
            <div className="mb-6">
                <h2 className="font-headline text-2xl sm:text-3xl font-bold tracking-tight text-primary">Full Library Access</h2>
                <div className="mt-4 flex flex-col gap-4">
                    <div className="relative rounded-lg bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 p-0.5">
                        <div className="relative flex items-center bg-background rounded-[calc(0.5rem-2px)]">
                            <Search className="absolute left-3 h-5 w-5 text-muted-foreground" />
                            <Input
                                placeholder="Search by title, author, or category..."
                                className="pl-10 border-none focus-visible:ring-0 focus-visible:ring-offset-0"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                        </div>
                    </div>
                    <div className="flex items-baseline gap-2 flex-wrap">
                        <span className="text-sm font-medium text-muted-foreground w-full sm:w-20 shrink-0">Category:</span>
                        {categories.map(category => (
                            <Button 
                                key={category}
                                size="sm"
                                variant={selectedCategory === category ? 'default' : 'outline'}
                                onClick={() => setSelectedCategory(category)}
                            >
                                {category}
                            </Button>
                        ))}
                    </div>
                    <div className="flex items-baseline gap-2 flex-wrap">
                        <span className="text-sm font-medium text-muted-foreground w-full sm:w-20 shrink-0">Year:</span>
                        {years.map(year => (
                            <Button 
                                key={year}
                                size="sm"
                                variant={selectedYear === year ? 'default' : 'outline'}
                                onClick={() => setSelectedYear(year)}
                            >
                                {year}
                            </Button>
                        ))}
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-2 sm:gap-4">
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
    )
}
