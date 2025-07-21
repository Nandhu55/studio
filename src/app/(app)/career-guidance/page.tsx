
'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Briefcase, Lightbulb, Compass } from 'lucide-react';

export default function CareerGuidancePage() {
  const guidanceTopics = [
    {
      icon: Briefcase,
      title: 'Resume Building',
      description: 'Learn how to craft a professional resume that stands out to recruiters. Tips on formatting, content, and keywords.',
    },
    {
      icon: Compass,
      title: 'Interview Preparation',
      description: 'Master common interview questions, learn the STAR method, and get tips on how to present yourself confidently.',
    },
    {
      icon: Lightbulb,
      title: 'Exploring Career Paths',
      description: 'Discover various career paths available for your engineering discipline. Understand roles, responsibilities, and future scope.',
    },
  ];

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h1 className="font-headline text-4xl font-bold tracking-tight">Career Guidance</h1>
        <p className="mt-2 text-muted-foreground">Resources to help you build a successful career after graduation.</p>
      </div>
      
      <div className="grid md:grid-cols-3 gap-6">
        {guidanceTopics.map((topic, index) => (
          <Card key={index} className="hover:shadow-lg transition-shadow">
            <CardHeader className="flex flex-row items-center gap-4">
              <topic.icon className="h-8 w-8 text-primary" />
              <CardTitle>{topic.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">{topic.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
