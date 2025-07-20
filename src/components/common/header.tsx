
'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { BookMarked, LogOut, User, LayoutDashboard, Terminal, Home, Phone } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useUsers } from '@/hooks/use-users';
import { useToast } from '@/hooks/use-toast';

export default function Header() {
  const [isAdmin, setIsAdmin] = useState(false);
  const { users } = useUsers();
  const { toast } = useToast();
  
  // In a real app, you'd get the current user from session/auth context
  const currentUser = users[0]; 

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setIsAdmin(sessionStorage.getItem('isAdmin') === 'true');
    }
  }, []);

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

            <Dialog>
                <DialogTrigger asChild>
                    <Button variant="ghost" size="icon" className="text-cyan-400 hover:text-primary hover:bg-primary/10">
                        <Phone className="h-5 w-5" />
                        <span className="sr-only">Contact Us</span>
                    </Button>
                </DialogTrigger>
                <DialogContent>
                    <DialogHeader>
                    <DialogTitle>Contact Us</DialogTitle>
                    <DialogDescription>
                        For any support or inquiries, please reach out to us.
                    </DialogDescription>
                    </DialogHeader>
                    <div className="space-y-2">
                        <p><strong>Support Email:</strong> support@btech-hub.com</p>
                        <p><strong>Admin Email:</strong> gnreddy3555@gmail.com</p>
                        <p><strong>Contact Email:</strong> gnreddy3555@gmail.com</p>
                    </div>
                </DialogContent>
            </Dialog>


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
