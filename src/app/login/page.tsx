'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { BookMarked, Mail, Lock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export default function LoginPage() {
  const [mounted, setMounted] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleLogin = (userType: 'student' | 'admin') => {
    if (userType === 'student') {
      router.push('/dashboard');
    } else {
      router.push('/admin/dashboard');
    }
  };

  return (
    <div className="flex min-h-screen w-full items-center justify-center bg-gradient-to-br from-background to-purple-100 dark:from-background dark:to-purple-900/20 p-4">
      <div 
        className={`transition-all duration-700 ease-out ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
      >
        <Card className="w-full max-w-md mx-auto shadow-2xl">
          <CardHeader className="text-center">
            <div className="flex justify-center items-center gap-2 mb-2">
              <BookMarked className="h-10 w-10 text-primary" />
              <h1 className="font-headline text-3xl font-bold text-primary">B-Tech eBooks Hub</h1>
            </div>
            <CardTitle className="font-headline text-2xl">Welcome Back</CardTitle>
            <CardDescription>Sign in to access your digital library</CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="student" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="student">Student</TabsTrigger>
                <TabsTrigger value="admin">Admin</TabsTrigger>
              </TabsList>
              <TabsContent value="student">
                <form onSubmit={(e) => { e.preventDefault(); handleLogin('student'); }} className="space-y-4 pt-4">
                  <div className="space-y-2">
                    <Label htmlFor="student-email">Email</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                      <Input id="student-email" type="email" placeholder="student@example.com" required className="pl-10" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="student-password">Password</Label>
                     <div className="relative">
                      <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                      <Input id="student-password" type="password" placeholder="••••••••" required className="pl-10" />
                    </div>
                  </div>
                  <Button type="submit" className="w-full !mt-6">Login as Student</Button>
                </form>
              </TabsContent>
              <TabsContent value="admin">
                <form onSubmit={(e) => { e.preventDefault(); handleLogin('admin'); }} className="space-y-4 pt-4">
                  <div className="space-y-2">
                    <Label htmlFor="admin-email">Admin Email</Label>
                    <div className="relative">
                       <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                      <Input id="admin-email" type="email" placeholder="admin@example.com" required className="pl-10"/>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="admin-password">Admin Password</Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                      <Input id="admin-password" type="password" placeholder="••••••••" required className="pl-10"/>
                    </div>
                  </div>
                  <Button type="submit" className="w-full !mt-6">Login as Admin</Button>
                </form>
              </TabsContent>
            </Tabs>
            <div className="mt-4 text-center text-sm">
              Don&apos;t have an account?{' '}
              <Link href="/signup" className="underline text-primary hover:text-primary/80">
                Sign up
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
