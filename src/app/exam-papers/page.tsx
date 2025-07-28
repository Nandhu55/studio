
'use client';

import { useState } from 'react';
import { Download, BookOpen, X } from 'lucide-react';
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
import { useCategories } from '@/hooks/use-categories';
import { years } from '@/lib/data';
import { Separator } from '@/components/ui/separator';
import type { QuestionPaper } from '@/lib/data';
import { transformGoogleDriveLink } from '@/lib/utils';

export default function ExamPapersPage() {
  const { questionPapers } = useQuestionPapers();
  const { toast } = useToast();
  const { categories } = useCategories();
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedYear, setSelectedYear] = useState('All');
  const [readingPaper, setReadingPaper] = useState<QuestionPaper | null>(null);

  const handleDownload = (paper: QuestionPaper) => {
    if (paper.downloadUrl === '#') {
        toast({
            title: "Download Unavailable",
            description: "A file for this question paper is not available yet.",
            variant: "destructive"
        });
        return;
    }
    const downloadUrl = transformGoogleDriveLink(paper.downloadUrl, true);
    window.open(downloadUrl, '_blank');
  }

  const handleRead = (paper: QuestionPaper) => {
    if (paper.downloadUrl && paper.downloadUrl !== '#') {
      setReadingPaper(paper);
    } else {
       toast({
            title: "Read Unavailable",
            description: "A readable document for this paper is not available.",
            variant: "destructive"
        });
    }
  };

  const filteredPapers = questionPapers.filter(paper => {
    const categoryMatch = selectedCategory === 'All' || paper.category === selectedCategory;
    const yearMatch = selectedYear === 'All' || paper.year === selectedYear;
    return categoryMatch && yearMatch;
  });

  const displayYears = ['All', ...years];
  
  if (readingPaper) {
    const readUrl = transformGoogleDriveLink(readingPaper.downloadUrl, false);
    return (
       <div className="fixed inset-0 bg-background z-50 flex flex-col">
          <header className="flex items-center justify-between p-2 sm:p-4 border-b bg-card">
              <div>
                  <h1 className="font-bold text-lg line-clamp-1">{readingPaper.subject}</h1>
                  <p className="text-sm text-muted-foreground">{readingPaper.category} - {readingPaper.year}</p>
              </div>
              <Button variant="ghost" size="icon" onClick={() => setReadingPaper(null)}>
                  <X className="h-5 w-5" />
                  <span className="sr-only">Close Reader</span>
              </Button>
          </header>
          <div className="flex-1 overflow-auto">
             <iframe src={readUrl} className="w-full h-full" title={readingPaper.subject} />
          </div>
      </div>
    )
  }

  return (
    <>
      <div className="space-y-6">
        <div>
          <h1 className="font-headline text-4xl font-bold tracking-tight">Exam Question Papers</h1>
          <p className="mt-2 text-muted-foreground">Browse and download previous year question papers.</p>
        </div>
        
        <div className="space-y-4">
          <div className="flex items-baseline gap-2 flex-wrap">
              <span className="text-sm font-medium text-muted-foreground w-full sm:w-20 shrink-0">Branch:</span>
              {categories.map(category => (
              <Button 
                  key={category}
                  size="sm"
                  variant={selectedCategory === category ? 'default' : 'outline'}
                  onClick={() => setSelectedCategory(category)}
              >
                  {category}
              </Button>
              ))}
          </div>
          <div className="flex items-baseline gap-2 flex-wrap">
              <span className="text-sm font-medium text-muted-foreground w-full sm:w-20 shrink-0">Year:</span>
              {displayYears.map(year => (
              <Button 
                  key={year}
                  size="sm"
                  variant={selectedYear === year ? 'default' : 'outline'}
                  onClick={() => setSelectedYear(year)}
              >
                  {year}
              </Button>
              ))}
          </div>
        </div>
        
        <Separator />

        {filteredPapers.length > 0 ? (
          <>
            {/* Table for Desktop */}
            <div className="border rounded-lg hidden md:block">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Subject</TableHead>
                    <TableHead>Year</TableHead>
                    <TableHead>Semester</TableHead>
                    <TableHead>University</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredPapers.map(paper => (
                    <TableRow key={paper.id}>
                      <TableCell className="font-medium">{paper.subject}</TableCell>
                      <TableCell>{paper.year}</TableCell>
                      <TableCell>{paper.semester}</TableCell>
                      <TableCell>{paper.university}</TableCell>
                      <TableCell><Badge variant="outline">{paper.type}</Badge></TableCell>
                      <TableCell className="text-right space-x-2">
                        <Button size="sm" variant="outline" onClick={() => handleRead(paper)}>
                          <BookOpen className="mr-2 h-4 w-4" /> Read
                        </Button>
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
              {filteredPapers.map(paper => (
                <Card key={paper.id}>
                  <CardHeader>
                    <CardTitle className="text-lg">{paper.subject}</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                      <div className="flex flex-wrap gap-2 text-sm">
                          <Badge variant="secondary">{paper.category}</Badge>
                          <Badge variant="secondary">{paper.year}</Badge>
                          <Badge variant="secondary">{paper.semester}</Badge>
                          <Badge variant="secondary">{paper.university}</Badge>
                          <Badge variant="outline">{paper.type}</Badge>
                      </div>
                      <div className="grid grid-cols-2 gap-2">
                          <Button variant="outline" onClick={() => handleRead(paper)}>
                              <BookOpen className="mr-2 h-4 w-4" /> Read
                          </Button>
                          <Button onClick={() => handleDownload(paper)}>
                              <Download className="mr-2 h-4 w-4" /> Download
                          </Button>
                      </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </>
        ) : (
          <div className="text-center py-12">
              <p className="text-muted-foreground">No question papers found for the selected filters.</p>
          </div>
        )}
      </div>
    </>
  );
}
