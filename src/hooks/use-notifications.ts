
import { useState, useEffect, useCallback } from 'react';

export interface Notification {
  id: string;
  title: string;
  description: string;
  read: boolean;
}

const NOTIFICATIONS_STORAGE_KEY = 'b-tech-hub-notifications';
const MAX_NOTIFICATIONS = 10;

export function useNotifications() {
  const [notifications, setNotifications] = useState<Notification[]>([]);

  useEffect(() => {
    try {
      const storedNotifications = localStorage.getItem(NOTIFICATIONS_STORAGE_KEY);
      if (storedNotifications) {
        setNotifications(JSON.parse(storedNotifications));
      }
    } catch (error) {
      console.error("Failed to access local storage for notifications:", error);
      setNotifications([]);
    }
  }, []);

  const updateStoredNotifications = useCallback((updatedNotifications: Notification[]) => {
    setNotifications(updatedNotifications);
    try {
      localStorage.setItem(NOTIFICATIONS_STORAGE_KEY, JSON.stringify(updatedNotifications));
    } catch (error) {
      console.error("Failed to save notifications to local storage:", error);
    }
  }, []);

  const addNotification = useCallback((notification: Omit<Notification, 'id' | 'read'>) => {
    const newNotification: Notification = {
      ...notification,
      id: String(Date.now()),
      read: false,
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
