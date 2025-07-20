import { useState, useEffect } from 'react';
import { initialCategories } from '@/lib/data';

const CATEGORIES_STORAGE_KEY = 'b-tech-hub-categories';

export function useCategories() {
  const [categories, setCategories] = useState<string[]>([]);

  useEffect(() => {
    try {
      const storedCategories = localStorage.getItem(CATEGORIES_STORAGE_KEY);
      if (storedCategories) {
        setCategories(JSON.parse(storedCategories));
      } else {
        // If nothing in storage, initialize with default categories
        setCategories(initialCategories);
        localStorage.setItem(CATEGORIES_STORAGE_KEY, JSON.stringify(initialCategories));
      }
    } catch (error) {
      // If any error (e.g. in SSR), use initial categories
      console.error("Failed to access local storage for categories:", error);
      setCategories(initialCategories);
    }
  }, []);

  const updateStoredCategories = (updatedCategories: string[]) => {
    setCategories(updatedCategories);
    try {
      localStorage.setItem(CATEGORIES_STORAGE_KEY, JSON.stringify(updatedCategories));
    } catch (error) {
      console.error("Failed to save categories to local storage:", error);
    }
  };

  const addCategory = (category: string) => {
    if (!categories.includes(category)) {
      const updatedCategories = [...categories, category];
      updateStoredCategories(updatedCategories);
    }
  };

  const deleteCategory = (categoryToDelete: string) => {
    const updatedCategories = categories.filter(category => category !== categoryToDelete);
    updateStoredCategories(updatedCategories);
  };

  return { categories, addCategory, deleteCategory };
}
