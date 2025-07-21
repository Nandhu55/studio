
import { useState, useEffect } from 'react';
import { books as initialBooks, type Book } from '@/lib/data';
import { useNotifications } from '@/hooks/use-notifications';

const BOOKS_STORAGE_KEY = 'b-tech-hub-books';
const MAX_USER_BOOKS = 10; // Limit the number of user-added books to prevent storage overflow

export function useBooks() {
  const [books, setBooks] = useState<Book[]>([]);
  const { addNotification } = useNotifications();

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
  
  const addBook = (book: Book): { success: boolean; message?: string } => {
    const userBooks = books.filter(b => !initialBooks.some(ib => ib.id === b.id));
    if (userBooks.length >= MAX_USER_BOOKS) {
      return {
        success: false,
        message: `Storage limit reached. You can only store up to ${MAX_USER_BOOKS} uploaded books.`
      };
    }
    
    const updatedBooks = [book, ...books];
    updateStoredBooks(updatedBooks);
    
    // Create a global notification for all users
    addNotification({
        title: 'New Book Added! 📚',
        description: `"${book.title}" is now available in the library.`,
        type: 'new_book'
    });

    return { success: true };
  };

  const deleteBook = (bookId: string) => {
    const updatedBooks = books.filter(book => book.id !== bookId);
    updateStoredBooks(updatedBooks);
  };

  return { books, addBook, deleteBook };
}
