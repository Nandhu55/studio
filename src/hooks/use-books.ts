
import { useState, useEffect } from 'react';
import { books as initialBooks, type Book } from '@/lib/data';
import type { Notification } from '@/hooks/use-notifications';

const BOOKS_STORAGE_KEY = 'b-tech-hub-books';
const NOTIFICATIONS_STORAGE_KEY = 'b-tech-hub-notifications';
const MAX_USER_BOOKS = 5; // Limit the number of user-added books to prevent storage overflow

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
    try {
        const storedNotifications = localStorage.getItem(NOTIFICATIONS_STORAGE_KEY);
        const currentNotifications: Notification[] = storedNotifications ? JSON.parse(storedNotifications) : [];
        const newNotification: Notification = {
            id: String(Date.now() + 1), // ensure unique id
            title: 'New Book Added! 📚',
            description: `"${book.title}" is now available in the library.`,
            read: false,
        };
        const updatedNotifications = [newNotification, ...currentNotifications].slice(0, 10);
        localStorage.setItem(NOTIFICATIONS_STORAGE_KEY, JSON.stringify(updatedNotifications));
    } catch (error) {
        console.error("Failed to create global notification:", error);
    }

    return { success: true };
  };

  const deleteBook = (bookId: string) => {
    const updatedBooks = books.filter(book => book.id !== bookId);
    updateStoredBooks(updatedBooks);
  };

  return { books, addBook, deleteBook };
}
