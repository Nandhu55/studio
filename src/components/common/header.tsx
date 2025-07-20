
'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { BookMarked, LogOut, User, LayoutDashboard, Terminal, Home, Bell, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuGroup,
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useUsers } from '@/hooks/use-users';
import { useNotifications } from '@/hooks/use-notifications';
import { Badge } from '@/components/ui/badge';

export default function Header() {
  const [isAdmin, setIsAdmin] = useState(false);
  const { users } = useUsers();
  const { notifications, clearNotifications, markAsRead } = useNotifications();
  
  // In a real app, you'd get the current user from session/auth context
  const currentUser = users[0]; 

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setIsAdmin(sessionStorage.getItem('isAdmin') === 'true');
    }
  }, []);

  const unreadCount = notifications.filter(n => !n.read).length;

  const handleOpenChange = (open: boolean) => {
    if (open && unreadCount > 0) {
      markAsRead();
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-primary/10 bg-background/80 backdrop-blur-sm">
      <div className="container flex h-16 items-center justify-between px-4">
        <Link href="/dashboard" className="flex items-center gap-3 group">
          <Terminal className="h-8 w-8 text-cyan-400 group-hover:text-primary transition-colors duration-300" />
          <span className="font-headline text-2xl font-bold text-primary-foreground tracking-tighter group-hover:text-primary transition-colors duration-300">
            B-Tech Hub
          </span>
        </Link>
        <div className="flex items-center gap-2">
            <Button asChild variant="ghost" size="icon" className="text-cyan-400 hover:text-primary hover:bg-primary/10">
                <Link href="/dashboard">
                    <Home className="h-5 w-5" />
                    <span className="sr-only">Home</span>
                </Link>
            </Button>
            
            <DropdownMenu onOpenChange={handleOpenChange}>
                <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="text-cyan-400 hover:text-primary hover:bg-primary/10 relative">
                        <Bell className="h-5 w-5" />
                        {unreadCount > 0 && (
                            <Badge variant="destructive" className="absolute -top-1 -right-1 h-5 w-5 p-0 flex items-center justify-center text-xs">{unreadCount}</Badge>
                        )}
                        <span className="sr-only">Notifications</span>
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-80" align="end">
                    <DropdownMenuLabel>Notifications</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuGroup>
                    {notifications.length === 0 ? (
                        <DropdownMenuItem disabled>No new notifications</DropdownMenuItem>
                    ) : (
                        notifications.map((n) => (
                            <DropdownMenuItem key={n.id} className="flex flex-col items-start gap-1 whitespace-normal">
                                <p className="font-semibold">{n.title}</p>
                                <p className="text-xs text-muted-foreground">{n.description}</p>
                            </DropdownMenuItem>
                        ))
                    )}
                    </DropdownMenuGroup>
                    {notifications.length > 0 && (
                        <>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem onSelect={clearNotifications} className="text-destructive">
                                <Trash2 className="mr-2 h-4 w-4" />
                                <span>Clear all notifications</span>
                            </DropdownMenuItem>
                        </>
                    )}
                </DropdownMenuContent>
            </DropdownMenu>

           <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="relative h-10 w-10 rounded-full">
                <Avatar className="h-10 w-10 border-2 border-cyan-400/50 hover:border-primary transition-colors duration-300">
                  <AvatarImage src={currentUser?.avatarUrl} alt={currentUser?.name} data-ai-hint="person portrait" />
                  <AvatarFallback>
                    <User />
                  </AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="end" forceMount>
              <DropdownMenuLabel className="font-normal">
                <div className="flex flex-col space-y-1">
                  <p className="text-sm font-medium leading-none">{currentUser?.name || 'Student'}</p>
                  <p className="text-xs leading-none text-muted-foreground">
                    {currentUser?.email || 'student@example.com'}
                  </p>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                  <Link href="/profile">
                    <User className="mr-2 h-4 w-4" />
                    <span>Profile</span>
                  </Link>
                </DropdownMenuItem>
              {isAdmin && (
                <DropdownMenuItem asChild>
                  <Link href="/admin/dashboard">
                    <LayoutDashboard className="mr-2 h-4 w-4" />
                    <span>Admin Dashboard</span>
                  </Link>
                </DropdownMenuItem>
              )}
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <Link href="/login">
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Log out</span>
                </Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}
