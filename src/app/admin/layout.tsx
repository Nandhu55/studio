'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { BookMarked, LayoutDashboard, LogOut } from 'lucide-react';
import {
  SidebarProvider,
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarFooter,
  SidebarTrigger,
  SidebarInset,
} from '@/components/ui/sidebar';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const isAdmin = sessionStorage.getItem('isAdmin');
      if (isAdmin !== 'true') {
        router.replace('/login');
      }
    }
  }, [router]);

  return (
    <SidebarProvider>
        <Sidebar>
          <SidebarContent>
            <SidebarHeader>
              <div className="flex items-center gap-2">
                <BookMarked className="h-8 w-8 text-primary" />
                <span className="font-headline text-xl font-bold text-primary group-data-[collapsible=icon]:hidden">
                  Admin Panel
                </span>
              </div>
            </SidebarHeader>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild tooltip="Dashboard" isActive={pathname === '/admin/dashboard'}>
                  <Link href="/admin/dashboard">
                    <LayoutDashboard />
                    <span>Dashboard</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarContent>
          <SidebarFooter>
            <SidebarMenu>
              <SidebarMenuItem>
                 <SidebarMenuButton asChild tooltip="Logout">
                  <Link href="/login">
                    <LogOut />
                    <span>Logout</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarFooter>
        </Sidebar>
        <SidebarInset>
            <header className="flex h-16 items-center border-b px-4 lg:px-6 sticky top-0 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 z-40">
                <div className="md:hidden">
                    <SidebarTrigger />
                </div>
                <h1 className="font-headline text-2xl font-bold ml-4 md:ml-0">Dashboard</h1>
            </header>
            <main className="flex-1 p-4 sm:p-6 lg:p-8">{children}</main>
        </SidebarInset>
    </SidebarProvider>
  );
}
