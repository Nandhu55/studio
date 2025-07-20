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
      // Create a version of the books for storage, stripping large data URIs from non-initial books
      const booksForStorage = updatedBooks.map(book => {
        const isInitialBook = initialBooks.some(ib => ib.id === book.id);
        if (isInitialBook) {
            // Keep the original data for initial books
            return book;
        }
        // For new books, strip large data to avoid storage overflow, but keep other details.
        // We no longer store the file content itself, just metadata.
        const { coverImage, pdfUrl, ...rest } = book;
        return { ...rest, coverImage: 'https://placehold.co/300x450.png', pdfUrl: '#', dataAiHint: 'book cover' };
      });
      localStorage.setItem(BOOKS_STORAGE_KEY, JSON.stringify(booksForStorage));
    } catch (error) {
      console.error("Failed to save books to local storage:", error);
    }
  };
  
  const addBook = (book: Book) => {
    // 1. Update the component state immediately with the full book data (including data URIs)
    // This makes the newly uploaded book viewable in the current session.
    const updatedBooks = [book, ...books];
    setBooks(updatedBooks);
    
    // 2. Create a storage-safe version for localStorage to prevent quota errors.
    const booksForStorage = updatedBooks.map(b => {
        const isInitialBook = initialBooks.some(ib => ib.id === b.id);
        if (isInitialBook) {
            return b; // Keep original initial books as they are
        }
        // For any new book (including the one just added), replace file data with placeholders for storage.
        const { coverImage, pdfUrl, ...rest } = b;
        return { ...rest, coverImage: 'https://placehold.co/300x450.png', pdfUrl: '#', dataAiHint: 'book cover' };
    });

    try {
        localStorage.setItem(BOOKS_STORAGE_KEY, JSON.stringify(booksForStorage));
    } catch (error) {
      console.error("Failed to save books to local storage:", error);
    }
  };

  const deleteBook = (bookId: string) => {
    const updatedBooks = books.filter(book => book.id !== bookId);
    updateStoredBooks(updatedBooks);
  };

  return { books, addBook, deleteBook };
}
