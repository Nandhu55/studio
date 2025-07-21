
'use client';

import Link from 'next/link';
import { useEffect, useState, useCallback } from 'react';
import { formatDistanceToNow } from 'date-fns';
import { BookMarked, LogOut, User, LayoutDashboard, Terminal, Home, Bell, Trash2, FileText, Shapes, Briefcase, BookHeart, UserPlus, BookCheck, Shield } from 'lucide-react';
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
import { useNotifications } from '@/hooks/use-notifications';
import { Badge } from '@/components/ui/badge';
import type { User as UserType } from '@/lib/data';
import type { Notification } from '@/hooks/use-notifications';
import { ScrollArea } from '@/components/ui/scroll-area';

function NotificationIcon({ type }: { type: Notification['type'] }) {
    const iconProps = { className: "h-5 w-5" };
    switch (type) {
        case 'welcome':
            return <UserPlus {...iconProps} />;
        case 'new_book':
            return <BookCheck {...iconProps} />;
        case 'security':
             return <Shield {...iconProps} />;
        default:
            return <Bell {...iconProps} />;
    }
}

export default function Header() {
  const [isAdmin, setIsAdmin] = useState(false);
  const { notifications, clearNotifications, markAsRead } = useNotifications();
  const [currentUser, setCurrentUser] = useState<UserType | null>(null);

  const updateUserFromSession = useCallback(() => {
    setIsAdmin(sessionStorage.getItem('isAdmin') === 'true');
    const userJson = sessionStorage.getItem('currentUser');
    if (userJson) {
      try {
        setCurrentUser(JSON.parse(userJson));
      } catch (e) {
        console.error("Could not parse user JSON from session storage", e);
        setCurrentUser(null);
      }
    } else {
      setCurrentUser(null);
    }
  }, []);

  useEffect(() => {
    updateUserFromSession();

    // Listen for storage changes to update UI across tabs (e.g., when avatar changes)
    const handleStorageChange = (event: StorageEvent) => {
      if (event.key === 'currentUser' || event.key === 'isLoggedIn' || event.key === 'isAdmin') {
        updateUserFromSession();
      }
    };

    window.addEventListener('storage', handleStorageChange);
    
    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, [updateUserFromSession]);

  const unreadCount = notifications.filter(n => !n.read).length;

  const handleOpenChange = (open: boolean) => {
    if (open && unreadCount > 0) {
      markAsRead();
    }
  };

  const formatTimestamp = (timestamp: string) => {
    try {
      const date = new Date(timestamp);
      if (isNaN(date.getTime())) {
        return "a moment ago";
      }
      return formatDistanceToNow(date, { addSuffix: true });
    } catch (e) {
      return "a moment ago";
    }
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b border-primary/10 bg-background/80 backdrop-blur-sm">
      <div className="container flex h-16 items-center justify-between px-4">
        <Link href="/dashboard" className="flex items-center gap-3 group">
          <Terminal className="h-8 w-8 text-primary group-hover:text-primary/80 transition-colors duration-300" />
          <span className="font-headline text-2xl font-bold text-foreground tracking-tighter group-hover:text-primary transition-colors duration-300">
            B-Tech Hub
          </span>
        </Link>
        <div className="flex items-center gap-2">
            <Button asChild variant="ghost" size="icon" className="text-foreground hover:text-primary hover:bg-primary/10">
                <Link href="/dashboard">
                    <Home className="h-5 w-5" />
                    <span className="sr-only">Home</span>
                </Link>
            </Button>

            <Button asChild variant="ghost" size="icon" className="text-foreground hover:text-primary hover:bg-primary/10">
                <Link href="/exam-papers">
                    <FileText className="h-5 w-5" />
                    <span className="sr-only">Exam Papers</span>
                </Link>
            </Button>
            
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="text-foreground hover:text-primary hover:bg-primary/10">
                    <Shapes className="h-5 w-5" />
                    <span className="sr-only">Resources</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>Extra Resources</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link href="/career-guidance">
                    <Briefcase className="mr-2 h-4 w-4" />
                    <span>Career Guidance</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/other-books">
                    <BookHeart className="mr-2 h-4 w-4" />
                    <span>Other Books</span>
                  </Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <DropdownMenu onOpenChange={handleOpenChange}>
                <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="text-foreground hover:text-primary hover:bg-primary/10 relative">
                        <Bell className="h-5 w-5" />
                        {unreadCount > 0 && (
                            <Badge variant="destructive" className="absolute -top-1 -right-1 h-5 w-5 p-0 flex items-center justify-center text-xs">{unreadCount}</Badge>
                        )}
                        <span className="sr-only">Notifications</span>
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-80 md:w-96" align="end">
                    <DropdownMenuLabel className="flex justify-between items-center">
                        <span className="font-semibold">Notifications</span>
                         {notifications.length > 0 && (
                            <Button variant="ghost" size="sm" onClick={clearNotifications} className="text-xs text-muted-foreground h-auto p-1">
                                <Trash2 className="mr-1 h-3 w-3" />
                                Clear all
                            </Button>
                        )}
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <ScrollArea className="h-[300px]">
                        <DropdownMenuGroup>
                        {notifications.length === 0 ? (
                            <p className="text-center text-sm text-muted-foreground py-10">No new notifications</p>
                        ) : (
                            notifications.map((n) => (
                                <DropdownMenuItem key={n.id} className="flex items-start gap-3 p-3 whitespace-normal cursor-default" onSelect={(e) => e.preventDefault()}>
                                    <div className="rounded-full bg-primary/10 text-primary p-2">
                                        <NotificationIcon type={n.type} />
                                    </div>
                                    <div className="flex-1">
                                        <p className="font-semibold">{n.title}</p>

                                        <p className="text-sm text-muted-foreground">{n.description}</p>
                                        <p className="text-xs text-muted-foreground mt-1">
                                            {formatTimestamp(n.timestamp)}
                                        </p>
                                    </div>
                                </DropdownMenuItem>
                            ))
                        )}
                        </DropdownMenuGroup>
                    </ScrollArea>
                </DropdownMenuContent>
            </DropdownMenu>

           <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="relative h-10 w-10 rounded-full">
                <Avatar className="h-10 w-10 border-2 border-primary/50 hover:border-primary transition-colors duration-300">
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
