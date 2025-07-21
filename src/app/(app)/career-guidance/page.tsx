
'use client';

import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Briefcase, Lightbulb, Compass } from 'lucide-react';

export default function CareerGuidancePage() {
  const guidanceTopics = [
    {
      icon: Briefcase,
      title: 'Resume Building',
      description: 'Learn how to craft a professional resume that stands out to recruiters. Tips on formatting, content, and keywords.',
      href: 'https://www.resume-now.com/build-resume/choose-template',
      external: true,
    },
    {
      icon: Compass,
      title: 'Interview Preparation',
      description: 'Master common interview questions, learn the STAR method, and get tips on how to present yourself confidently.',
      href: 'https://www.geeksforgeeks.org/tag/interview-preparation/',
      external: true,
    },
    {
      icon: Lightbulb,
      title: 'Exploring Career Paths',
      description: 'Discover various career paths available for your engineering discipline. Understand roles, responsibilities, and future scope.',
      href: '/career-guidance/paths',
      external: false,
    },
  ];

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h1 className="font-headline text-4xl font-bold tracking-tight">Career Guidance</h1>
        <p className="mt-2 text-muted-foreground">Resources to help you build a successful career after graduation.</p>
      </div>
      
      <div className="grid md:grid-cols-3 gap-6">
        {guidanceTopics.map((topic, index) => {
          const cardContent = (
            <Card className="hover:shadow-lg transition-shadow h-full">
              <CardHeader className="flex flex-row items-center gap-4">
                <topic.icon className="h-8 w-8 text-primary" />
                <CardTitle>{topic.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">{topic.description}</p>
              </CardContent>
            </Card>
          );

          if (topic.href) {
            if (topic.external) {
                 return (
                    <a href={topic.href} target="_blank" rel="noopener noreferrer" key={index} className="block h-full">
                        {cardContent}
                    </a>
                );
            }
            if (topic.href !== '#') {
                return (
                    <Link href={topic.href} key={index} className="block h-full">
                        {cardContent}
                    </Link>
                );
            }
          }

          return (
            <div key={index} className="opacity-50 cursor-not-allowed">
              {cardContent}
            </div>
          );
        })}
      </div>
    </div>
  );
}
