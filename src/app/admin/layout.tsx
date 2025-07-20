'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { BookMarked, LayoutDashboard, LogOut, Users, Book, Shapes, Home, User } from 'lucide-react';
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

  const getPageTitle = () => {
    if (pathname === '/admin/dashboard') return 'Dashboard';
    if (pathname === '/admin/manage-books') return 'Manage Books';
    if (pathname === '/admin/manage-users') return 'Manage Users';
    if (pathname === '/admin/manage-categories') return 'Manage Categories';
    return 'Admin Panel';
  }

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
                <SidebarMenuButton asChild tooltip="Home" isActive={pathname === '/dashboard'}>
                  <Link href="/dashboard">
                    <Home />
                    <span>Home</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
               <SidebarMenuItem>
                <SidebarMenuButton asChild tooltip="Profile" isActive={pathname === '/profile'}>
                  <Link href="/profile">
                    <User />
                    <span>Profile</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild tooltip="Dashboard" isActive={pathname === '/admin/dashboard'}>
                  <Link href="/admin/dashboard">
                    <LayoutDashboard />
                    <span>Dashboard</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild tooltip="Manage Books" isActive={pathname === '/admin/manage-books'}>
                  <Link href="/admin/manage-books">
                    <Book />
                    <span>Manage Books</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild tooltip="Manage Users" isActive={pathname === '/admin/manage-users'}>
                  <Link href="/admin/manage-users">
                    <Users />
                    <span>Manage Users</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild tooltip="Manage Categories" isActive={pathname === '/admin/manage-categories'}>
                  <Link href="/admin/manage-categories">
                    <Shapes />
                    <span>Manage Categories</span>
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
                <h1 className="font-headline text-2xl font-bold ml-4 md:ml-0">{getPageTitle()}</h1>
            </header>
            <main className="flex-1 p-4 sm:p-6 lg:p-8">{children}</main>
        </SidebarInset>
    </SidebarProvider>
  );
}
