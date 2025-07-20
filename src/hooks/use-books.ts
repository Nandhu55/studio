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
      localStorage.setItem(BOOKS_STORAGE_KEY, JSON.stringify(updatedBooks));
    } catch (error) {
      console.error("Failed to save books to local storage:", error);
    }
  };

  const addBook = (book: Book) => {
    const updatedBooks = [book, ...books];
    updateStoredBooks(updatedBooks);
  };

  const deleteBook = (bookId: string) => {
    const updatedBooks = books.filter(book => book.id !== bookId);
    updateStoredBooks(updatedBooks);
  };

  return { books, addBook, deleteBook };
}
