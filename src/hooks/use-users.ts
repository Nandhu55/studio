
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
      localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(updatedUsers));
    } catch (error) {
      console.error("Failed to save users to local storage:", error);
    }
  };

  const addUser = (user: Omit<User, 'avatarUrl'>) => {
    const newUser: User = {
      ...user,
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
