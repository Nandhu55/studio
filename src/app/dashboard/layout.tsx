
'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Header from '@/components/common/header';

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const isLoggedIn = sessionStorage.getItem('isLoggedIn');
      const isAdmin = sessionStorage.getItem('isAdmin');
      if (isLoggedIn !== 'true' && isAdmin !== 'true') {
        router.replace('/login');
      }
    }
  }, [router]);
  
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container py-6 sm:py-8">{children}</main>
    </div>
  );
}
