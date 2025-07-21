
'use client';

import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Code, Server, Cloud, BrainCircuit, Shield, Database, ArrowLeft, Layers, AppWindow, Cpu } from 'lucide-react';
import { Button } from '@/components/ui/button';

const careerPaths = [
  {
    icon: Code,
    title: 'Frontend Developer',
    description: 'Build user interfaces and experiences for web applications. Focus on HTML, CSS, JavaScript, and modern frameworks like React or Vue.',
    href: 'https://roadmap.sh/frontend',
  },
  {
    icon: Server,
    title: 'Backend Developer',
    description: 'Work on server-side logic, databases, and APIs. Master languages like Node.js, Python, or Java and understand system architecture.',
    href: 'https://roadmap.sh/backend',
  },
  {
    icon: Layers,
    title: 'MERN Stack Developer',
    description: 'Become a full-stack developer specializing in MongoDB, Express.js, React, and Node.js to build end-to-end applications.',
    href: 'https://roadmap.sh/full-stack',
  },
  {
    icon: Cloud,
    title: 'DevOps Engineer',
    description: 'Bridge the gap between development and operations. Focus on CI/CD pipelines, cloud infrastructure, and automation tools.',
    href: 'https://roadmap.sh/devops',
  },
  {
    icon: BrainCircuit,
    title: 'Machine Learning Engineer',
    description: 'Design and build intelligent systems. Learn about algorithms, data structures, and frameworks like TensorFlow or PyTorch.',
    href: 'https://roadmap.sh/ai-data-scientist',
  },
  {
    icon: Cpu,
    title: 'AI Engineer',
    description: 'Focus on developing AI models and integrating them into applications. Work with large language models, NLP, and computer vision.',
    href: 'https://roadmap.sh/ai-and-data-scientist',
  },
  {
    icon: Shield,
    title: 'Cybersecurity Specialist',
    description: 'Protect computer systems and networks from security threats. Understand cryptography, security protocols, and ethical hacking.',
    href: 'https://roadmap.sh/cyber-security',
  },
  {
    icon: Database,
    title: 'Data Scientist',
    description: 'Analyze and interpret complex data to help organizations make better decisions. Master statistics, machine learning, and data visualization.',
    href: 'https://roadmap.sh/data-scientist',
  },
  {
    icon: AppWindow,
    title: 'Salesforce Developer',
    description: 'Customize and build applications on the Salesforce platform. Work with Apex, Lightning Web Components, and declarative tools.',
    href: 'https://trailhead.salesforce.com/en/career-path/developer',
  },
];

export default function CareerPathsPage() {
  return (
    <div className="space-y-8">
        <div className="flex items-center gap-4">
            <Button asChild variant="outline" size="icon">
                <Link href="/career-guidance">
                    <ArrowLeft className="h-4 w-4" />
                    <span className="sr-only">Back to Career Guidance</span>
                </Link>
            </Button>
            <div>
                 <h1 className="font-headline text-4xl font-bold tracking-tight">Explore Career Paths</h1>
                 <p className="text-muted-foreground">Find roadmaps to guide your journey in tech.</p>
            </div>
        </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {careerPaths.map((path, index) => (
          <a href={path.href} target="_blank" rel="noopener noreferrer" key={index} className="block h-full">
            <Card className="hover:shadow-lg hover:border-primary/50 transition-all h-full">
              <CardHeader className="flex flex-row items-center gap-4">
                <path.icon className="h-8 w-8 text-primary" />
                <CardTitle>{path.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">{path.description}</p>
              </CardContent>
            </Card>
          </a>
        ))}
      </div>
    </div>
  );
}
