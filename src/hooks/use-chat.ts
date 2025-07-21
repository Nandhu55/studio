
'use client';

import { useState, useEffect, useCallback } from 'react';
import type { User } from '@/lib/data';

export interface ChatMessage {
  id: string;
  text: string;
  userId: string;
  userName: string;
  avatarUrl?: string;
  timestamp: string;
}

const CHAT_STORAGE_KEY = 'b-tech-hub-chat-messages';
const MAX_MESSAGES = 50; // Limit chat history to prevent storage overflow

export function useChat() {
  const [messages, setMessages] = useState<ChatMessage[]>([]);

  const getStoredMessages = useCallback(() => {
    try {
      const stored = localStorage.getItem(CHAT_STORAGE_KEY);
      return stored ? JSON.parse(stored) : [];
    } catch (error) {
      console.error('Failed to parse chat messages from localStorage:', error);
      return [];
    }
  }, []);

  useEffect(() => {
    setMessages(getStoredMessages());

    const handleStorageChange = (event: StorageEvent) => {
      if (event.key === CHAT_STORAGE_KEY && event.newValue) {
        try {
          setMessages(JSON.parse(event.newValue));
        } catch (error) {
          console.error('Failed to parse updated chat messages:', error);
        }
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, [getStoredMessages]);

  const sendMessage = useCallback((text: string, user: User) => {
    const newMessage: ChatMessage = {
      id: String(Date.now()),
      text,
      userId: user.id,
      userName: user.name,
      avatarUrl: user.avatarUrl,
      timestamp: new Date().toISOString(),
    };

    const updatedMessages = [...getStoredMessages(), newMessage].slice(-MAX_MESSAGES);
    
    try {
      localStorage.setItem(CHAT_STORAGE_KEY, JSON.stringify(updatedMessages));
      // Manually update state for the current tab, as 'storage' event doesn't fire on the same tab
      setMessages(updatedMessages);
    } catch (error) {
      console.error('Failed to save message to localStorage:', error);
    }
  }, [getStoredMessages]);

  return { messages, sendMessage };
}
