
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

  const updateStoredMessages = (updatedMessages: ChatMessage[]) => {
    setMessages(updatedMessages);
    try {
        localStorage.setItem(CHAT_STORAGE_KEY, JSON.stringify(updatedMessages));
        // Manually dispatch a storage event to notify other tabs/windows
        window.dispatchEvent(
            new StorageEvent('storage', {
                key: CHAT_STORAGE_KEY,
                newValue: JSON.stringify(updatedMessages),
            })
        );
    } catch (error) {
        console.error('Failed to save chat messages to localStorage:', error);
    }
  };

  const sendMessage = useCallback((text: string, user: User) => {
    const newMessage: ChatMessage = {
      id: String(Date.now()),
      text,
      userId: user.id,
      userName: user.name,
      avatarUrl: user.avatarUrl,
      timestamp: new Date().toISOString(),
    };

    const currentMessages = getStoredMessages();
    const updatedMessages = [...currentMessages, newMessage].slice(-MAX_MESSAGES);
    
    updateStoredMessages(updatedMessages);

  }, [getStoredMessages]);

  const deleteMessage = useCallback((messageId: string, currentUserId: string) => {
    const currentMessages = getStoredMessages();
    const messageToDelete = currentMessages.find((m: ChatMessage) => m.id === messageId);
    
    if (messageToDelete && messageToDelete.userId === currentUserId) {
        const updatedMessages = currentMessages.filter((m: ChatMessage) => m.id !== messageId);
        updateStoredMessages(updatedMessages);
    }
  }, [getStoredMessages]);

  return { messages, sendMessage, deleteMessage };
}
