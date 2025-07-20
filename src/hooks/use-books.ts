import { useState, useEffect } from 'react';
import { books as initialBooks, type Book } from '@/lib/data';

const BOOKS_STORAGE_KEY = 'b-tech-hub-books';

export function useBooks() {
  const [books, setBooks] = useState<Book[]>([]);

  useEffect(() => {
    try {
      const storedBooks = localStorage.getItem(BOOKS_STORAGE_KEY);
      if (storedBooks) {
        setBooks(JSON.parse(storedBooks));
      } else {
        // If nothing in storage, initialize with default books
        setBooks(initialBooks);
        localStorage.setItem(BOOKS_STORAGE_KEY, JSON.stringify(initialBooks));
      }
    } catch (error) {
      // If any error (e.g. in SSR), use initial books
      console.error("Failed to access local storage:", error);
      setBooks(initialBooks);
    }
  }, []);

  const updateStoredBooks = (updatedBooks: Book[]) => {
    setBooks(updatedBooks);
    try {
        // Create a version of the books without the large data URI fields
        const booksForStorage = updatedBooks.map(book => {
            const { coverImage, pdfUrl, ...rest } = book;
            const isInitialBook = initialBooks.some(ib => ib.id === book.id);
            if (isInitialBook) {
                // Keep the original placeholder URL for initial books
                 return book;
            }
            // For new books, use placeholders to avoid storage overflow
            return { ...rest, coverImage: 'https://placehold.co/300x450.png', pdfUrl: '#' };
        });
      localStorage.setItem(BOOKS_STORAGE_KEY, JSON.stringify(booksForStorage));
    } catch (error) {
      console.error("Failed to save books to local storage:", error);
    }
  };

  const addBook = (book: Book) => {
    const updatedBooks = [book, ...books];
    setBooks(updatedBooks); // Update state immediately with full data for UI
    
    // Create a storage-safe version for localStorage
    const booksForStorage = updatedBooks.map(b => {
        if (initialBooks.some(ib => ib.id === b.id)) {
            return b;
        }
        const { coverImage, pdfUrl, ...rest } = b;
        return { ...rest, coverImage: 'https://placehold.co/300x450.png', pdfUrl: '#' };
    });

    try {
        localStorage.setItem(BOOKS_STORAGE_KEY, JSON.stringify(booksForStorage));
    } catch (error) {
      console.error("Failed to save books to local storage:", error);
       // Show a toast or some feedback to the user that storage failed
    }
  };

  const deleteBook = (bookId: string) => {
    const updatedBooks = books.filter(book => book.id !== bookId);
    updateStoredBooks(updatedBooks);
  };

  return { books, addBook, deleteBook };
}
