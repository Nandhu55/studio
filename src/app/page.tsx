
'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { BookMarked, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function LandingPage() {
    const [mounted, setMounted] = useState(false);
    const router = useRouter();

    useEffect(() => {
        setMounted(true);
        // Check if user is already logged in and redirect to dashboard
        if (typeof window !== 'undefined') {
            const isLoggedIn = sessionStorage.getItem('isLoggedIn') === 'true';
            const isAdmin = sessionStorage.getItem('isAdmin') === 'true';
            if (isLoggedIn) {
                router.replace('/dashboard');
            } else if (isAdmin) {
                router.replace('/admin/dashboard');
            }
        }
    }, [router]);

    return (
        <div className="flex min-h-screen w-full flex-col">
            <header className="sticky top-0 z-50 w-full border-b border-primary/10 bg-background/80 backdrop-blur-sm">
                <div className="container flex h-16 items-center px-4">
                    <Link href="/" className="flex items-center gap-3 group">
                        <BookMarked className="h-8 w-8 text-primary group-hover:text-primary/80 transition-colors duration-300" />
                        <span className="font-headline text-2xl font-bold text-foreground tracking-tighter group-hover:text-primary transition-colors duration-300">
                            B-Tech Hub
                        </span>
                    </Link>
                    <div className="ml-auto">
                        <Button asChild>
                            <Link href="/login">
                                <span>Get Started</span>
                                <ArrowRight className="ml-2 h-4 w-4" />
                            </Link>
                        </Button>
                    </div>
                </div>
            </header>
            <main className="flex-1">
                <section className="container grid lg:grid-cols-2 gap-12 items-center py-12 md:py-24 lg:py-32">
                    <div 
                        className={`space-y-6 transition-all duration-700 ease-out ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
                    >
                        <div className="inline-block rounded-lg bg-secondary px-3 py-1 text-sm">
                            AI-Powered Learning
                        </div>
                        <h1 className="font-headline text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl text-primary">
                            Your Digital Library, Reimagined
                        </h1>
                        <p className="max-w-[600px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                            Access a vast collection of academic books, past exam papers, and career resources. All powered by AI to help you study smarter.
                        </p>
                        <Button asChild size="lg">
                            <Link href="/login">
                                <span>Login & Explore</span>
                                <ArrowRight className="ml-2 h-5 w-5" />
                            </Link>
                        </Button>
                    </div>
                     <div 
                        className={`transition-all duration-700 ease-out delay-200 ${mounted ? 'opacity-100 scale-100' : 'opacity-0 scale-90'}`}
                    >
                        <img
                          src="https://placehold.co/600x400.png"
                          alt="B-Tech Hub Platform"
                          className="mx-auto aspect-video overflow-hidden rounded-xl object-cover"
                          data-ai-hint="library technology"
                        />
                    </div>
                </section>
            </main>
        </div>
    );
}
