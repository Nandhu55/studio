
'use client';

import { useState, useEffect, useCallback } from 'react';
import type { Remark, User } from '@/lib/data';

const REMARKS_STORAGE_KEY = 'b-tech-hub-remarks';

export function useRemarks(bookId: string) {
  const [remarks, setRemarks] = useState<Remark[]>([]);
  const [allRemarks, setAllRemarks] = useState<Record<string, Remark[]>>({});

  useEffect(() => {
    try {
      const storedRemarks = localStorage.getItem(REMARKS_STORAGE_KEY);
      const parsedRemarks = storedRemarks ? JSON.parse(storedRemarks) : {};
      setAllRemarks(parsedRemarks);
      setRemarks(parsedRemarks[bookId] || []);
    } catch (error) {
      console.error("Failed to access local storage for remarks:", error);
    }
  }, [bookId]);

  const updateStoredRemarks = (updatedAllRemarks: Record<string, Remark[]>) => {
    try {
      localStorage.setItem(REMARKS_STORAGE_KEY, JSON.stringify(updatedAllRemarks));
      setAllRemarks(updatedAllRemarks);
      setRemarks(updatedAllRemarks[bookId] || []);
    } catch (error) {
      console.error("Failed to save remarks to local storage:", error);
    }
  };

  const addRemark = (text: string) => {
    const userJson = sessionStorage.getItem('currentUser');
    if (!userJson) {
      console.error("No current user found in session storage.");
      // Optionally, prompt user to log in
      return;
    }
    
    try {
        const currentUser: User = JSON.parse(userJson);
        const newRemark: Remark = {
            id: String(Date.now()),
            bookId,
            text,
            authorName: currentUser.name,
            authorAvatarUrl: currentUser.avatarUrl || 'https://placehold.co/100x100.png',
            timestamp: new Date().toISOString(),
        };

        const updatedRemarksForBook = [...(allRemarks[bookId] || []), newRemark];
        const updatedAllRemarks = { ...allRemarks, [bookId]: updatedRemarksForBook };
        
        updateStoredRemarks(updatedAllRemarks);

    } catch (error) {
        console.error("Failed to parse user data or add remark:", error);
    }
  };

  return { remarks, addRemark };
}
