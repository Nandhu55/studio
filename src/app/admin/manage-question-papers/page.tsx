
'use client';

import { useState } from 'react';
import { PlusCircle, Trash2, MoreHorizontal } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { type QuestionPaper, years } from '@/lib/data';
import { useToast } from '@/hooks/use-toast';
import { useQuestionPapers } from '@/hooks/use-question-papers';
import { useCategories } from '@/hooks/use-categories';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

export default function ManageQuestionPapersPage() {
  const { questionPapers, addQuestionPaper, deleteQuestionPaper } = useQuestionPapers();
  const { categories } = useCategories();
  const [isUploadDialogOpen, setIsUploadDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [paperToDelete, setPaperToDelete] = useState<QuestionPaper | null>(null);
  const { toast } = useToast();

  const handleAddPaper = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);
    const paperFile = formData.get('paperFile') as File;

    if (!paperFile || paperFile.size === 0) {
        toast({
            title: "Upload Error",
            description: "A document file (PDF, Word, PPT) is required.",
            variant: "destructive"
        });
        return;
    }

    const readFileAsDataURL = (file: File): Promise<string> => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = () => resolve(reader.result as string);
            reader.onerror = (error) => reject(error);
            reader.readAsDataURL(file);
        });
    }

    try {
        const fileUri = await readFileAsDataURL(paperFile);

        const newPaper: QuestionPaper = {
            id: String(Date.now()),
            subject: formData.get('subject') as string,
            category: formData.get('category') as string,
            year: formData.get('year') as string,
            university: formData.get('university') as string,
            type: formData.get('type') as 'Midterm' | 'Final' | 'Quiz',
            downloadUrl: fileUri,
        };
        
        addQuestionPaper(newPaper);
        
        setIsUploadDialogOpen(false);
        form.reset();
        toast({
            title: "Paper Uploaded",
            description: `"${newPaper.subject}" paper has been added.`,
        });

    } catch (error) {
        console.error("File reading error:", error);
        toast({
            title: "Upload Error",
            description: "There was an error processing the file. Please try again.",
            variant: "destructive"
        });
    }
  };
  
  const openDeleteDialog = (paper: QuestionPaper) => {
    setPaperToDelete(paper);
    setIsDeleteDialogOpen(true);
  };

  const handleDeletePaper = () => {
    if (paperToDelete) {
      deleteQuestionPaper(paperToDelete.id);
      toast({
        title: "Paper Deleted",
        description: `"${paperToDelete.subject}" paper has been removed.`,
        variant: "destructive",
      });
      setIsDeleteDialogOpen(false);
      setPaperToDelete(null);
    }
  };

  const paperCategories = categories.filter(c => c !== 'All');

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-start">
        <div>
          <h2 className="text-2xl font-semibold tracking-tight">Manage Exam Papers</h2>
          <p className="text-muted-foreground">Upload, view, and delete question papers.</p>
        </div>
        <Button onClick={() => setIsUploadDialogOpen(true)}>
          <PlusCircle className="mr-2 h-4 w-4" /> Upload Paper
        </Button>
      </div>
      
      {/* Table for Desktop */}
      <div className="border rounded-lg hidden md:block">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Subject</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Year</TableHead>
              <TableHead>Type</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {questionPapers.map(paper => (
              <TableRow key={paper.id}>
                <TableCell className="font-medium">{paper.subject}</TableCell>
                <TableCell>{paper.category}</TableCell>
                <TableCell>{paper.year}</TableCell>
                <TableCell><Badge variant="outline">{paper.type}</Badge></TableCell>
                <TableCell className="text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" className="h-8 w-8 p-0">
                        <span className="sr-only">Open menu</span>
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={() => openDeleteDialog(paper)} className="text-destructive">
                        <Trash2 className="mr-2 h-4 w-4" /> Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
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
            <CardContent className="space-y-2 text-sm">
                <div className="flex flex-wrap gap-2">
                    <Badge variant="outline">{paper.category}</Badge>
                    <Badge variant="secondary">{paper.year}</Badge>
                    <Badge variant="secondary">{paper.type}</Badge>
                </div>
                <div className="pt-2">
                    <Button
                        variant="ghost"
                        size="sm"
                        className="w-full justify-start text-destructive hover:bg-destructive/10 hover:text-destructive"
                        onClick={() => openDeleteDialog(paper)}
                    >
                        <Trash2 className="mr-2 h-4 w-4" /> Delete Paper
                    </Button>
                </div>
            </CardContent>
          </Card>
        ))}
      </div>


      {/* Upload Dialog */}
      <Dialog open={isUploadDialogOpen} onOpenChange={setIsUploadDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <form onSubmit={handleAddPaper}>
            <DialogHeader>
              <DialogTitle>Upload New Question Paper</DialogTitle>
              <DialogDescription>Fill in the details for the new paper. Click upload when you're done.</DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="subject" className="text-right">Subject</Label>
                <Input id="subject" name="subject" className="col-span-3" required/>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="university" className="text-right">University</Label>
                <Input id="university" name="university" className="col-span-3" required/>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="category" className="text-right">Category</Label>
                <Select name="category" required>
                    <SelectTrigger className="col-span-3">
                        <SelectValue placeholder="Select a category" />
                    </SelectTrigger>
                    <SelectContent>
                        {paperCategories.map(cat => <SelectItem key={cat} value={cat}>{cat}</SelectItem>)}
                    </SelectContent>
                </Select>
              </div>
               <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="year" className="text-right">Year</Label>
                <Select name="year" required>
                    <SelectTrigger className="col-span-3">
                        <SelectValue placeholder="Select a year" />
                    </SelectTrigger>
                    <SelectContent>
                        {years.map(y => <SelectItem key={y} value={y}>{y}</SelectItem>)}
                    </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="type" className="text-right">Type</Label>
                <Select name="type" required>
                    <SelectTrigger className="col-span-3">
                        <SelectValue placeholder="Select paper type" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="Midterm">Midterm</SelectItem>
                        <SelectItem value="Final">Final</SelectItem>
                        <SelectItem value="Quiz">Quiz</SelectItem>
                    </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="paperFile" className="text-right">Document</Label>
                <Input id="paperFile" name="paperFile" type="file" accept=".pdf,.doc,.docx,.ppt,.pptx" className="col-span-3" required />
              </div>
            </div>
            <DialogFooter>
              <Button type="submit">Upload</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
      
      {/* Delete Confirmation Dialog */}
      <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the paper
              for "{paperToDelete?.subject}".
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDeletePaper} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
