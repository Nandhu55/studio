
'use client';

import { useState, useEffect, useCallback } from 'react';
import { books as initialBooks, type Book } from '@/lib/data';
import { useNotifications } from '@/hooks/use-notifications';

const BOOKS_STORAGE_KEY = 'b-tech-hub-books';

export function useBooks() {
  const [books, setBooks] = useState<Book[]>([]);
  const { addNotification } = useNotifications();

  const fetchBooksFromStorage = useCallback(() => {
    try {
      const storedBooks = localStorage.getItem(BOOKS_STORAGE_KEY);
      if (storedBooks) {
        setBooks(JSON.parse(storedBooks));
      } else {
        setBooks(initialBooks);
        localStorage.setItem(BOOKS_STORAGE_KEY, JSON.stringify(initialBooks));
      }
    } catch (error) {
      console.error("Failed to access local storage:", error);
      setBooks(initialBooks);
    }
  }, []);

  useEffect(() => {
    fetchBooksFromStorage();
    
    const handleStorageChange = (e: StorageEvent) => {
        if (e.key === BOOKS_STORAGE_KEY) {
            fetchBooksFromStorage();
        }
    };

    window.addEventListener('storage', handleStorageChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, [fetchBooksFromStorage]);

  const updateStoredBooks = (updatedBooks: Book[]) => {
    localStorage.setItem(BOOKS_STORAGE_KEY, JSON.stringify(updatedBooks));
    setBooks(updatedBooks);
    // Manually dispatch a storage event to notify other tabs/windows
    window.dispatchEvent(
      new StorageEvent('storage', {
        key: BOOKS_STORAGE_KEY,
        newValue: JSON.stringify(updatedBooks),
      })
    );
  };
  
  const addBook = (book: Book): { success: boolean; message?: string } => {
    const currentBooks = JSON.parse(localStorage.getItem(BOOKS_STORAGE_KEY) || '[]');
    
    const updatedBooks = [book, ...currentBooks];
    
    try {
        updateStoredBooks(updatedBooks);
        addNotification({
            title: 'New Book Added! 📚',
            description: `"${book.title}" is now available in the library.`,
            type: 'new_book'
        });
        return { success: true };
    } catch (error: any) {
        // Check if the error is a QuotaExceededError
        if (error.name === 'QuotaExceededError' || (error.code && (error.code === 22 || error.code === 1014))) {
            console.error("Quota Exceeded Error:", error);
            // Revert state to before the failed addition by re-fetching from storage
            fetchBooksFromStorage();
            return {
              success: false,
              message: "Storage limit reached. Could not save the new book."
            };
        } else {
            // Re-throw other errors
            console.error("Failed to save book:", error);
            fetchBooksFromStorage();
            return {
              success: false,
              message: "An unexpected error occurred while saving the book."
            };
        }
    }
  };

  const deleteBook = (bookId: string) => {
    const currentBooks = JSON.parse(localStorage.getItem(BOOKS_STORAGE_KEY) || '[]');
    const updatedBooks = currentBooks.filter((book: Book) => book.id !== bookId);
    updateStoredBooks(updatedBooks);
  };

  return { books, addBook, deleteBook };
}
