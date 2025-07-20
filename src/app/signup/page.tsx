'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { BookMarked, User, Mail, Lock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useUsers } from '@/hooks/use-users';
import { useToast } from '@/hooks/use-toast';

export default function SignupPage() {
  const [mounted, setMounted] = useState(false);
  const router = useRouter();
  const { addUser } = useUsers();
  const { toast } = useToast();

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleSignup = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const name = formData.get('name') as string;
    const email = formData.get('email') as string;

    addUser({
      id: String(Date.now()),
      name,
      email,
      signedUpAt: new Date().toISOString(),
    });

    toast({
        title: "Account Created",
        description: "You can now log in with your credentials.",
    });

    router.push('/login');
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
            <CardTitle className="font-headline text-2xl">Create an Account</CardTitle>
            <CardDescription>Join our community of learners today</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSignup} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                 <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                  <Input id="name" name="name" placeholder="John Doe" required className="pl-10" />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                  <Input id="email" name="email" type="email" placeholder="student@example.com" required className="pl-10" />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                  <Input id="password" name="password" type="password" placeholder="••••••••" required className="pl-10" />
                </div>
              </div>
              <Button type="submit" className="w-full !mt-6">Create Account</Button>
            </form>
            <div className="mt-4 text-center text-sm">
              Already have an account?{' '}
              <Link href="/login" className="underline text-primary hover:text-primary/80">
                Sign in
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
