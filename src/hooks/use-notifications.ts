
import { useState, useEffect, useCallback } from 'react';

export interface Notification {
  id: string;
  title: string;
  description: string;
  read: boolean;
  timestamp: string;
  type: 'welcome' | 'new_book' | 'security' | 'general';
}

const NOTIFICATIONS_STORAGE_KEY = 'b-tech-hub-notifications';
const MAX_NOTIFICATIONS = 10;

const initialNotifications: Notification[] = [
    {
        id: '1',
        title: 'Welcome to B-Tech Hub!',
        description: 'Your account has been created successfully.',
        read: true,
        timestamp: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(), // 5 days ago
        type: 'welcome',
    },
     {
        id: '2',
        title: 'Security Alert',
        description: 'Your password was changed successfully.',
        read: true,
        timestamp: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(), // 5 days ago
        type: 'security',
    },
    {
        id: '3',
        title: 'New Book Added!',
        description: '"Java Fundamentals" is now available in the library.',
        read: true,
        timestamp: new Date(Date.now() - 6 * 24 * 60 * 60 * 1000).toISOString(), // 6 days ago
        type: 'new_book',
    }
];


export function useNotifications() {
  const [notifications, setNotifications] = useState<Notification[]>([]);

  useEffect(() => {
    const fetchNotifications = () => {
      try {
        const storedNotifications = localStorage.getItem(NOTIFICATIONS_STORAGE_KEY);
        if (storedNotifications) {
          setNotifications(JSON.parse(storedNotifications));
        } else {
            setNotifications(initialNotifications);
            localStorage.setItem(NOTIFICATIONS_STORAGE_KEY, JSON.stringify(initialNotifications));
        }
      } catch (error) {
        console.error("Failed to access local storage for notifications:", error);
        setNotifications([]);
      }
    };
    
    fetchNotifications();

    // Listen for storage changes to update notifications across tabs/windows
    window.addEventListener('storage', fetchNotifications);
    return () => {
      window.removeEventListener('storage', fetchNotifications);
    };

  }, []);

  const updateStoredNotifications = useCallback((updatedNotifications: Notification[]) => {
    setNotifications(updatedNotifications);
    try {
      // This will trigger the 'storage' event for other tabs
      localStorage.setItem(NOTIFICATIONS_STORAGE_KEY, JSON.stringify(updatedNotifications));
      // Manually trigger a storage event so the current tab also updates, e.g., the header.
       window.dispatchEvent(
            new StorageEvent('storage', {
                key: NOTIFICATIONS_STORAGE_KEY,
                newValue: JSON.stringify(updatedNotifications),
            })
        );
    } catch (error) {
      console.error("Failed to save notifications to local storage:", error);
    }
  }, []);

  const addNotification = useCallback((notification: Omit<Notification, 'id' | 'read' | 'timestamp'>) => {
    const newNotification: Notification = {
      ...notification,
      id: String(Date.now()),
      read: false,
      timestamp: new Date().toISOString(),
    };
    
    setNotifications(prev => {
        const updated = [newNotification, ...prev].slice(0, MAX_NOTIFICATIONS);
        updateStoredNotifications(updated);
        return updated;
    });
  }, [updateStoredNotifications]);

  const clearNotifications = useCallback(() => {
    updateStoredNotifications([]);
  }, [updateStoredNotifications]);

  const markAsRead = useCallback(() => {
    const updated = notifications.map(n => ({ ...n, read: true }));
    updateStoredNotifications(updated);
  }, [notifications, updateStoredNotifications]);

  return { notifications, addNotification, clearNotifications, markAsRead };
}
