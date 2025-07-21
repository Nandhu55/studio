
import { useState, useEffect, useCallback } from 'react';
import { books as initialBooks, type Book } from '@/lib/data';
import { useNotifications } from '@/hooks/use-notifications';

const BOOKS_STORAGE_KEY = 'b-tech-hub-books';
const MAX_USER_BOOKS = 10; // Limit the number of user-added books to prevent storage overflow

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
    setBooks(updatedBooks);
    try {
      localStorage.setItem(BOOKS_STORAGE_KEY, JSON.stringify(updatedBooks));
       // Manually dispatch a storage event to notify other tabs/windows
      window.dispatchEvent(
        new StorageEvent('storage', {
          key: BOOKS_STORAGE_KEY,
          newValue: JSON.stringify(updatedBooks),
        })
      );
    } catch (error) {
      console.error("Failed to save books to local storage:", error);
    }
  };
  
  const addBook = (book: Book): { success: boolean; message?: string } => {
    const currentBooks = JSON.parse(localStorage.getItem(BOOKS_STORAGE_KEY) || '[]');
    const userBooks = currentBooks.filter((b: Book) => !initialBooks.some(ib => ib.id === b.id));

    if (userBooks.length >= MAX_USER_BOOKS) {
      return {
        success: false,
        message: `Storage limit reached. You can only store up to ${MAX_USER_BOOKS} uploaded books.`
      };
    }
    
    const updatedBooks = [book, ...currentBooks];
    updateStoredBooks(updatedBooks);
    
    addNotification({
        title: 'New Book Added! 📚',
        description: `"${book.title}" is now available in the library.`,
        type: 'new_book'
    });

    return { success: true };
  };

  const deleteBook = (bookId: string) => {
    const currentBooks = JSON.parse(localStorage.getItem(BOOKS_STORAGE_KEY) || '[]');
    const updatedBooks = currentBooks.filter((book: Book) => book.id !== bookId);
    updateStoredBooks(updatedBooks);
  };

  return { books, addBook, deleteBook };
}
