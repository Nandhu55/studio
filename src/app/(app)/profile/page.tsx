
'use client';

import { useState, useRef, useEffect } from 'react';
import { useTheme } from 'next-themes';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { User, Mail, Sun, Moon, Palette, Camera, BookCopy, CalendarDays, GraduationCap, Phone, LogOut } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import type { User as UserType } from '@/lib/data';
import { useRouter } from 'next/navigation';
import { format } from 'date-fns';

export default function ProfilePage() {
  const { toast } = useToast();
  const { setTheme, theme } = useTheme();
  const [currentUser, setCurrentUser] = useState<UserType | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  useEffect(() => {
    // This effect runs once on component mount to load the user from session storage.
     if (typeof window !== 'undefined') {
      const userJson = sessionStorage.getItem('currentUser');
      if (userJson) {
        try {
          setCurrentUser(JSON.parse(userJson));
        } catch (e) {
          console.error("Failed to parse user data from session storage", e);
          // If parsing fails, the user might not be properly logged in.
          // The layout's auth check will handle redirection.
        }
      }
    }
  }, []);

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && currentUser) {
      if (file.size > 5 * 1024 * 1024) { // 5MB limit
        toast({
          title: 'Image Too Large',
          description: 'Please select an image smaller than 5MB.',
          variant: 'destructive',
        });
        return;
      }
      
      const newAvatarUrl = URL.createObjectURL(file);
      
      // Update the component's state for immediate UI feedback.
      // This change is temporary and will not persist across reloads.
      setCurrentUser({ ...currentUser, avatarUrl: newAvatarUrl });
      
      toast({
        title: 'Avatar Updated',
        description: 'Your new profile picture is shown. This is a temporary preview and will not be saved permanently.',
      });
    }
  };

  const handleLogout = () => {
    if (typeof window !== 'undefined') {
      sessionStorage.removeItem('isLoggedIn');
      sessionStorage.removeItem('isAdmin');
      sessionStorage.removeItem('currentUser');
    }
    router.push('/login');
  };

  if (!currentUser) {
    return (
      <div className="flex justify-center items-center h-96">
        <p>Loading profile...</p>
      </div>
    )
  }
  
  const ProfileDetailItem = ({ icon: Icon, label, value }: { icon: React.ElementType, label: string, value?: string }) => (
    <div className="flex items-start gap-4">
      <Icon className="h-6 w-6 text-muted-foreground mt-1" />
      <div>
        <p className="text-sm text-muted-foreground">{label}</p>
        <p className="font-medium">{value || 'Not set'}</p>
      </div>
    </div>
  );

  return (
    <div className="max-w-2xl mx-auto space-y-8">
      <div className="text-center">
        <h1 className="font-headline text-4xl font-bold tracking-tight">Your Profile</h1>
        <p className="mt-2 text-muted-foreground">View your account details and manage preferences.</p>
      </div>

      <Card>
        <CardHeader className="flex flex-col items-center text-center">
          <div className="relative group">
            <Avatar className="h-24 w-24 mb-4 border-4 border-primary">
              <AvatarImage src={currentUser.avatarUrl} alt={currentUser.name} data-ai-hint="person portrait" />
              <AvatarFallback>
                <User className="w-10 h-10" />
              </AvatarFallback>
            </Avatar>
            <button 
              onClick={() => fileInputRef.current?.click()}
              className="absolute inset-0 bg-black/50 rounded-full flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <Camera className="h-8 w-8" />
              <span className="sr-only">Change profile picture</span>
            </button>
            <Input 
              type="file" 
              ref={fileInputRef} 
              className="hidden" 
              accept="image/*"
              onChange={handleAvatarChange}
            />
          </div>
          <CardTitle className="text-2xl">{currentUser.name}</CardTitle>
          <CardDescription>{currentUser.email}</CardDescription>
        </CardHeader>
        <Separator />
        <CardContent className="pt-6">
          <div className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
                <ProfileDetailItem icon={User} label="Full Name" value={currentUser.name} />
                <ProfileDetailItem icon={Mail} label="Email Address" value={currentUser.email} />
            </div>
            <div className="grid md:grid-cols-2 gap-6">
                <ProfileDetailItem icon={BookCopy} label="Course/Branch" value={currentUser.course} />
                <ProfileDetailItem icon={Phone} label="Phone Number" value={currentUser.phone} />
            </div>
            <div className="grid md:grid-cols-2 gap-6">
                <ProfileDetailItem icon={GraduationCap} label="Year / Semester" value={`${currentUser.year} / ${currentUser.semester}`} />
                <ProfileDetailItem icon={CalendarDays} label="Member Since" value={format(new Date(currentUser.signedUpAt), "PPP")} />
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Palette className="h-5 w-5" />
            <span>Appearance</span>
          </CardTitle>
          <CardDescription>Choose how B-Tech Hub looks to you.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4">
            <Button
              variant={theme === 'light' ? 'default' : 'outline'}
              onClick={() => setTheme('light')}
            >
              <Sun className="mr-2 h-4 w-4" />
              Light
            </Button>
            <Button
              variant={theme === 'dark' ? 'default' : 'outline'}
              onClick={() => setTheme('dark')}
            >
              <Moon className="mr-2 h-4 w-4" />
              Dark
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
            <CardTitle className="flex items-center gap-2">
                <Mail className="h-5 w-5" />
                <span>Contact Us</span>
            </CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
            <p className="text-muted-foreground">Need help? Reach out to support.</p>
            <a href="mailto:gnreddy3555@gmail.com" className="font-medium text-primary hover:underline">
              gnreddy3555@gmail.com
            </a>
        </CardContent>
      </Card>

      <Button variant="destructive" className="w-full" onClick={handleLogout}>
        <LogOut className="mr-2 h-4 w-4" />
        Logout
      </Button>

    </div>
  );
}
