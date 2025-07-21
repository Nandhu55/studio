
import { useState, useEffect } from 'react';
import { type User, initialUsers } from '@/lib/data';

const USERS_STORAGE_KEY = 'b-tech-hub-users';

export function useUsers() {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    try {
      const storedUsers = localStorage.getItem(USERS_STORAGE_KEY);
      if (storedUsers) {
        setUsers(JSON.parse(storedUsers));
      } else {
        // If nothing in storage, initialize with default users
        setUsers(initialUsers);
        localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(initialUsers));
      }
    } catch (error) {
      // If any error (e.g. in SSR), use initial users
      console.error("Failed to access local storage for users:", error);
      setUsers(initialUsers);
    }
  }, []);

  const updateStoredUsers = (updatedUsers: User[]) => {
    setUsers(updatedUsers);
    try {
      // Create a version of the users array for storage that doesn't include large data URIs
      const sanitizedUsers = updatedUsers.map(u => {
        if (u.avatarUrl && u.avatarUrl.startsWith('data:image')) {
          // If a large data URI is found, replace it with a placeholder for storage.
          // The actual image is managed by the profile page in sessionStorage.
          return { ...u, avatarUrl: 'user-uploaded' };
        }
        return u;
      });
      localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(sanitizedUsers));
    } catch (error) {
      console.error("Failed to save users to local storage:", error);
      // This catch block is important to prevent the app from crashing on quota errors.
    }
  };

  const addUser = (user: Omit<User, 'id' | 'avatarUrl' | 'signedUpAt'>) => {
    const newUser: User = {
      ...user,
      id: String(Date.now()),
      signedUpAt: new Date().toISOString(),
      avatarUrl: 'https://placehold.co/100x100.png',
    }
    const updatedUsers = [...users, newUser];
    updateStoredUsers(updatedUsers);
  };

  const deleteUser = (userId: string) => {
    const updatedUsers = users.filter(user => user.id !== userId);
    updateStoredUsers(updatedUsers);
  };

  const updateUser = (userId: string, updates: Partial<User>) => {
    const updatedUsers = users.map(user =>
      user.id === userId ? { ...user, ...updates } : user
    );
    updateStoredUsers(updatedUsers);
  };

  return { users, addUser, deleteUser, updateUser };
}
