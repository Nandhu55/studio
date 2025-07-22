
'use client';

import { useState, useEffect } from 'react';
import { useTheme } from 'next-themes';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { User, Mail, Sun, Moon, Palette } from 'lucide-react';
import { Separator } from '@/components/ui/separator';

function AdminProfileContent() {
  const { setTheme, theme } = useTheme();

  const adminUser = {
    name: 'Admin User',
    email: 'gnreddy3555@gmail.com',
    avatarUrl: 'https://placehold.co/100x100.png',
  };

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
        <h1 className="font-headline text-4xl font-bold tracking-tight">Admin Profile</h1>
        <p className="mt-2 text-muted-foreground">View your administrator account details.</p>
      </div>

      <Card>
        <CardHeader className="flex flex-col items-center text-center">
          <Avatar className="h-24 w-24 mb-4 border-4 border-primary">
            <AvatarImage src={adminUser.avatarUrl} alt={adminUser.name} data-ai-hint="person portrait" />
            <AvatarFallback>
              <User className="w-10 h-10" />
            </AvatarFallback>
          </Avatar>
          <CardTitle className="text-2xl">{adminUser.name}</CardTitle>
          <CardDescription>{adminUser.email}</CardDescription>
        </CardHeader>
        <Separator />
        <CardContent className="pt-6">
          <div className="space-y-6">
             <div className="grid md:grid-cols-2 gap-6">
                <ProfileDetailItem icon={User} label="Username" value={adminUser.name} />
                <ProfileDetailItem icon={Mail} label="Email Address" value={adminUser.email} />
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
          <CardDescription>Choose how the admin panel looks to you.</CardDescription>
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
    </div>
  );
}

export default function AdminProfilePage() {
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        setIsClient(true);
    }, []);

    if (!isClient) {
        return <div className="flex justify-center items-center h-96"><p>Loading profile...</p></div>;
    }

    return <AdminProfileContent />;
}
