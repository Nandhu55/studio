
'use client';

import { useState, useRef } from 'react';
import { useTheme } from 'next-themes';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { User, Mail, Edit, Sun, Moon, Palette, Camera, BookCopy, CalendarDays, GraduationCap, Phone } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import { useUsers } from '@/hooks/use-users';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { years, semesters } from '@/lib/data';

export default function ProfilePage() {
  const { toast } = useToast();
  const { setTheme, theme } = useTheme();
  const { users, updateUser } = useUsers();
  
  // For this demo, we'll assume the first user is the logged-in user.
  const currentUser = users[0];

  const [name, setName] = useState(currentUser?.name || 'B.Tech Student');
  const [email, setEmail] = useState(currentUser?.email || 'student@example.com');
  const [avatarUrl, setAvatarUrl] = useState(currentUser?.avatarUrl || 'https://placehold.co/100x100.png');
  const [course, setCourse] = useState(currentUser?.course || '');
  const [year, setYear] = useState(currentUser?.year || '');
  const [semester, setSemester] = useState(currentUser?.semester || '');
  const [phone, setPhone] = useState(currentUser?.phone || '');


  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleProfileUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    if (currentUser) {
      updateUser(currentUser.id, { name, course, year, semester, phone });
      toast({
        title: 'Profile Updated',
        description: 'Your profile information has been successfully updated.',
      });
    }
  };

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && currentUser) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const newAvatarUrl = reader.result as string;
        setAvatarUrl(newAvatarUrl);
        updateUser(currentUser.id, { avatarUrl: newAvatarUrl });
        toast({
            title: 'Avatar Updated',
            description: 'Your new profile picture has been saved.',
        })
      };
      reader.readAsDataURL(file);
    }
  };

  if (!currentUser) {
    return <div>Loading profile...</div>
  }

  return (
    <div className="max-w-2xl mx-auto space-y-8">
      <div className="text-center">
        <h1 className="font-headline text-4xl font-bold tracking-tight">Your Profile</h1>
        <p className="mt-2 text-muted-foreground">Manage your account settings and preferences.</p>
      </div>

      <Card>
        <CardHeader className="flex flex-col items-center text-center">
          <div className="relative group">
            <Avatar className="h-24 w-24 mb-4 border-4 border-cyan-400">
              <AvatarImage src={avatarUrl} alt="User" data-ai-hint="person portrait" />
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
          <CardTitle className="text-2xl">{name}</CardTitle>
          <CardDescription>{email}</CardDescription>
        </CardHeader>
        <Separator />
        <CardContent className="pt-6">
          <form onSubmit={handleProfileUpdate} className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="name" className="flex items-center gap-2">
                  <User className="h-4 w-4" />
                  <span>Full Name</span>
                </Label>
                <Input id="name" value={name} onChange={(e) => setName(e.target.value)} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email" className="flex items-center gap-2">
                  <Mail className="h-4 w-4" />
                  <span>Email Address</span>
                </Label>
                <Input id="email" type="email" value={email} disabled />
              </div>
            </div>
             <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                    <Label htmlFor="course" className="flex items-center gap-2">
                        <BookCopy className="h-4 w-4" />
                        <span>Course/Branch</span>
                    </Label>
                    <Input id="course" value={course} onChange={(e) => setCourse(e.target.value)} placeholder="e.g., Computer Science"/>
                </div>
                 <div className="space-y-2">
                    <Label htmlFor="phone" className="flex items-center gap-2">
                        <Phone className="h-4 w-4" />
                        <span>Phone Number</span>
                    </Label>
                    <Input id="phone" type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="e.g., 123-456-7890"/>
                </div>
            </div>
            <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                    <Label htmlFor="year" className="flex items-center gap-2">
                        <CalendarDays className="h-4 w-4" />
                        <span>Year</span>
                    </Label>
                    <Select value={year} onValueChange={setYear}>
                        <SelectTrigger id="year">
                            <SelectValue placeholder="Select your year" />
                        </SelectTrigger>
                        <SelectContent>
                            {years.map(y => <SelectItem key={y} value={y}>{y}</SelectItem>)}
                        </SelectContent>
                    </Select>
                </div>
                <div className="space-y-2">
                    <Label htmlFor="semester" className="flex items-center gap-2">
                        <GraduationCap className="h-4 w-4" />
                        <span>Semester</span>
                    </Label>
                    <Select value={semester} onValueChange={setSemester}>
                        <SelectTrigger id="semester">
                            <SelectValue placeholder="Select your semester" />
                        </SelectTrigger>
                        <SelectContent>
                            {semesters.map(s => <SelectItem key={s} value={s}>{s}</SelectItem>)}
                        </SelectContent>
                    </Select>
                </div>
            </div>

            <Button type="submit" className="w-full !mt-8">
              <Edit className="mr-2 h-4 w-4" />
              Update Profile
            </Button>
          </form>
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
    </div>
  );
}
