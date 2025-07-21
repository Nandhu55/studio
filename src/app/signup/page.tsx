
'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { BookMarked, User, Mail, Lock, BookCopy, CalendarDays, GraduationCap, Phone } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useUsers } from '@/hooks/use-users';
import { useToast } from '@/hooks/use-toast';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { years, semesters, courses } from '@/lib/data';

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
    const password = formData.get('password') as string;
    const course = formData.get('course') as string;
    const year = formData.get('year') as string;
    const semester = formData.get('semester') as string;
    const phone = formData.get('phone') as string;

    if (!name || !email || !password || !course || !year || !semester || !phone) {
      toast({
        title: "Incomplete Form",
        description: "Please fill out all the fields to sign up.",
        variant: "destructive",
      });
      return;
    }

    const newUser = addUser({
      name,
      email,
      password,
      course,
      year,
      semester,
      phone,
    });

    if (typeof window !== 'undefined') {
        sessionStorage.setItem('isLoggedIn', 'true');
        sessionStorage.setItem('currentUser', JSON.stringify(newUser));
    }

    toast({
        title: `Welcome, ${name}!`,
        description: "Your account has been created successfully.",
    });

    router.push('/dashboard');
  };

  return (
    <div className="flex min-h-screen w-full items-center justify-center bg-background p-4 relative overflow-hidden">
       <div className="absolute inset-0 bg-grid-cyan bg-cyan-950/10 [mask-image:linear-gradient(to_bottom,white_10%,transparent_90%)]"></div>
       <div className="absolute inset-[-100%] animate-shimmer bg-[length:200%_200%] shimmer-bg"></div>
      <div 
        className={`transition-all duration-700 ease-out ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
      >
        <Card className="w-full max-w-lg mx-auto shadow-2xl bg-card/80 backdrop-blur-sm">
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
              <div className="grid md:grid-cols-2 gap-4">
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
              </div>
               <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                  <Input id="password" name="password" type="password" placeholder="••••••••" required className="pl-10" />
                </div>
              </div>
               <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="course">Course/Branch</Label>
                   <Select name="course" required>
                      <SelectTrigger id="course">
                          <SelectValue placeholder="Select course" />
                      </SelectTrigger>
                      <SelectContent>
                          {courses.map(c => <SelectItem key={c} value={c}>{c}</SelectItem>)}
                      </SelectContent>
                  </Select>
                </div>
                 <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                    <Input id="phone" name="phone" type="tel" placeholder="123-456-7890" required className="pl-10" />
                  </div>
                </div>
              </div>

               <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="year">Year</Label>
                  <Select name="year" required>
                      <SelectTrigger id="year">
                          <SelectValue placeholder="Select year" />
                      </SelectTrigger>
                      <SelectContent>
                          {years.map(y => <SelectItem key={y} value={y}>{y}</SelectItem>)}
                      </SelectContent>
                  </Select>
                </div>
                 <div className="space-y-2">
                  <Label htmlFor="semester">Semester</Label>
                   <Select name="semester" required>
                        <SelectTrigger id="semester">
                            <SelectValue placeholder="Select semester" />
                        </SelectTrigger>
                        <SelectContent>
                            {semesters.map(s => <SelectItem key={s} value={s}>{s}</SelectItem>)}
                        </SelectContent>
                    </Select>
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
