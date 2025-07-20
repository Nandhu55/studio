
'use client';

import { Download } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { useQuestionPapers } from '@/hooks/use-question-papers';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';

export default function ExamPapersPage() {
  const { questionPapers } = useQuestionPapers();
  const { toast } = useToast();
  
  const handleDownload = (paper: { downloadUrl: string, subject: string, type: string }) => {
    if (paper.downloadUrl === '#') {
        toast({
            title: "Download Unavailable",
            description: "A file for this question paper is not available yet.",
            variant: "destructive"
        });
        return;
    }
    // In a real app, this would trigger a file download.
    // For this demo, we'll just show a toast.
    toast({
        title: "Download Started",
        description: `Downloading ${paper.subject} ${paper.type} paper.`
    })
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-headline text-4xl font-bold tracking-tight">Exam Question Papers</h1>
        <p className="mt-2 text-muted-foreground">Browse and download previous year question papers.</p>
      </div>
      
      {/* Table for Desktop */}
      <div className="border rounded-lg hidden md:block">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Subject</TableHead>
              <TableHead>Year</TableHead>
              <TableHead>University</TableHead>
              <TableHead>Type</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {questionPapers.map(paper => (
              <TableRow key={paper.id}>
                <TableCell className="font-medium">{paper.subject}</TableCell>
                <TableCell>{paper.year}</TableCell>
                <TableCell>{paper.university}</TableCell>
                <TableCell><Badge variant="outline">{paper.type}</Badge></TableCell>
                <TableCell className="text-right">
                  <Button size="sm" onClick={() => handleDownload(paper)}>
                    <Download className="mr-2 h-4 w-4" /> Download
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Cards for Mobile */}
      <div className="grid gap-4 md:hidden">
        {questionPapers.map(paper => (
          <Card key={paper.id}>
            <CardHeader>
              <CardTitle className="text-lg">{paper.subject}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
                <div className="flex flex-wrap gap-2 text-sm">
                    <Badge variant="secondary">{paper.year}</Badge>
                    <Badge variant="secondary">{paper.university}</Badge>
                    <Badge variant="outline">{paper.type}</Badge>
                </div>
                <Button className="w-full" onClick={() => handleDownload(paper)}>
                    <Download className="mr-2 h-4 w-4" />
                    Download Paper
                </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
