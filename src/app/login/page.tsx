
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
import { useToast } from '@/hooks/use-toast';
import { useUsers } from '@/hooks/use-users';

export default function LoginPage() {
  const [mounted, setMounted] = useState(false);
  const router = useRouter();
  const { toast } = useToast();
  const { users } = useUsers();

  const [studentEmail, setStudentEmail] = useState('');
  const [studentPassword, setStudentPassword] = useState('');
  const [adminEmail, setAdminEmail] = useState('');
  const [adminPassword, setAdminPassword] = useState('');

  useEffect(() => {
    setMounted(true);
    // On mount, clear any session state
    if (typeof window !== 'undefined') {
      sessionStorage.removeItem('isAdmin');
      sessionStorage.removeItem('isLoggedIn');
    }
  }, []);

  const handleStudentLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const userExists = users.some(user => user.email === studentEmail);
    // In a real app, you'd check a hashed password. For demo, we use a simple check.
    if (userExists && studentPassword === 'password123') {
        if (typeof window !== 'undefined') {
            sessionStorage.setItem('isLoggedIn', 'true');
        }
        router.push('/dashboard');
    } else {
        toast({
            title: 'Login Failed',
            description: 'Invalid student credentials. Please try again.',
            variant: 'destructive',
        });
    }
  };
  
  const handleAdminLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (adminEmail === 'gnreddy3555@gmail.com' && adminPassword === 'nandhu@sunny') {
      if (typeof window !== 'undefined') {
        sessionStorage.setItem('isAdmin', 'true');
      }
      router.push('/admin/dashboard');
    } else {
      toast({
        title: 'Login Failed',
        description: 'Invalid admin credentials. Please try again.',
        variant: 'destructive',
      });
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
              <h1 className="font-headline text-3xl font-bold text-primary">B-Tech Hub</h1>
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
                <form onSubmit={handleStudentLogin} className="space-y-4 pt-4">
                  <div className="space-y-2">
                    <Label htmlFor="student-email">Email</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                      <Input id="student-email" type="email" placeholder="student@example.com" required className="pl-10" value={studentEmail} onChange={(e) => setStudentEmail(e.target.value)} />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="student-password">Password</Label>
                     <div className="relative">
                      <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                      <Input id="student-password" type="password" placeholder="••••••••" required className="pl-10" value={studentPassword} onChange={(e) => setStudentPassword(e.target.value)} />
                    </div>
                    <p className="text-xs text-muted-foreground pt-1">Demo password: password123</p>
                  </div>
                  <Button type="submit" className="w-full !mt-6">Login as Student</Button>
                </form>
              </TabsContent>
              <TabsContent value="admin">
                <form onSubmit={handleAdminLogin} className="space-y-4 pt-4">
                  <div className="space-y-2">
                    <Label htmlFor="admin-email">Admin Email</Label>
                    <div className="relative">
                       <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                      <Input id="admin-email" type="email" placeholder="admin@example.com" required className="pl-10" value={adminEmail} onChange={(e) => setAdminEmail(e.target.value)} />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="admin-password">Admin Password</Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                      <Input id="admin-password" type="password" placeholder="••••••••" required className="pl-10" value={adminPassword} onChange={(e) => setAdminPassword(e.target.value)} />
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
