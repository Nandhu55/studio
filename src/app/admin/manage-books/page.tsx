
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
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { type Book, years } from '@/lib/data';
import { useToast } from '@/hooks/use-toast';
import { useBooks } from '@/hooks/use-books';
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

export default function ManageBooksPage() {
  const { books, addBook, deleteBook } = useBooks();
  const { categories } = useCategories();
  const [isUploadDialogOpen, setIsUploadDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [bookToDelete, setBookToDelete] = useState<Book | null>(null);
  const { toast } = useToast();

  const handleAddBook = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);
    const imageFile = formData.get('coverImage') as File;
    const pdfFile = formData.get('bookPdf') as File;

    if (!pdfFile || pdfFile.size === 0) {
        toast({
            title: "Upload Error",
            description: "A PDF document is required to upload a book.",
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
        const pdfUri = await readFileAsDataURL(pdfFile);
        let coverImageUri = 'https://placehold.co/300x450.png';

        if (imageFile && imageFile.size > 0) {
            coverImageUri = await readFileAsDataURL(imageFile);
        }

        const newBook: Book = {
            id: String(Date.now()),
            title: formData.get('title') as string,
            author: formData.get('author') as string,
            category: formData.get('category') as string,
            year: formData.get('year') as string,
            description: formData.get('description') as string,
            coverImage: coverImageUri,
            pdfUrl: pdfUri,
            dataAiHint: 'book cover'
        };
        
        addBook(newBook);
        setIsUploadDialogOpen(false);
        form.reset();
        toast({
            title: "Book Uploaded",
            description: `"${newBook.title}" has been added to the library.`,
        });

    } catch (error) {
        console.error("File reading error:", error);
        toast({
            title: "Upload Error",
            description: "There was an error processing the files. Please try again.",
            variant: "destructive"
        });
    }
  };
  
  const openDeleteDialog = (book: Book) => {
    setBookToDelete(book);
    setIsDeleteDialogOpen(true);
  };

  const handleDeleteBook = () => {
    if (bookToDelete) {
      deleteBook(bookToDelete.id);
      toast({
        title: "Book Deleted",
        description: `"${bookToDelete.title}" has been removed from the library.`,
        variant: "destructive",
      });
      setIsDeleteDialogOpen(false);
      setBookToDelete(null);
    }
  };

  const bookCategories = categories.filter(c => c !== 'All');

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-start">
        <div>
          <h2 className="text-2xl font-semibold tracking-tight">Manage Library</h2>
          <p className="text-muted-foreground">Upload, edit, and delete books.</p>
        </div>
        <Button onClick={() => setIsUploadDialogOpen(true)}>
          <PlusCircle className="mr-2 h-4 w-4" /> Upload Book
        </Button>
      </div>
      
      {/* Table for Desktop */}
      <div className="border rounded-lg hidden md:block">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Title</TableHead>
              <TableHead>Author</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Year</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {books.map(book => (
              <TableRow key={book.id}>
                <TableCell className="font-medium">{book.title}</TableCell>
                <TableCell>{book.author}</TableCell>
                <TableCell>{book.category}</TableCell>
                <TableCell>{book.year}</TableCell>
                <TableCell className="text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" className="h-8 w-8 p-0">
                        <span className="sr-only">Open menu</span>
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={() => openDeleteDialog(book)} className="text-destructive">
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
        {books.map(book => (
          <Card key={book.id}>
            <CardHeader>
              <CardTitle className="text-lg">{book.title}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-sm">
                <p><span className="font-semibold">Author:</span> {book.author}</p>
                <div className="flex gap-2">
                    <Badge variant="outline">{book.category}</Badge>
                    <Badge variant="secondary">{book.year}</Badge>
                </div>
                <div className="pt-2">
                    <Button
                        variant="ghost"
                        size="sm"
                        className="w-full justify-start text-destructive hover:bg-destructive/10 hover:text-destructive"
                        onClick={() => openDeleteDialog(book)}
                    >
                        <Trash2 className="mr-2 h-4 w-4" /> Delete Book
                    </Button>
                </div>
            </CardContent>
          </Card>
        ))}
      </div>


      {/* Upload Dialog */}
      <Dialog open={isUploadDialogOpen} onOpenChange={setIsUploadDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <form onSubmit={handleAddBook}>
            <DialogHeader>
              <DialogTitle>Upload a New Book</DialogTitle>
              <DialogDescription>Fill in the details for the new book. Click upload when you're done.</DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="title" className="text-right">Title</Label>
                <Input id="title" name="title" className="col-span-3" required/>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="author" className="text-right">Author</Label>
                <Input id="author" name="author" className="col-span-3" required/>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="category" className="text-right">Category</Label>
                <Select name="category" required>
                    <SelectTrigger className="col-span-3">
                        <SelectValue placeholder="Select a category" />
                    </SelectTrigger>
                    <SelectContent>
                        {bookCategories.map(cat => <SelectItem key={cat} value={cat}>{cat}</SelectItem>)}
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
              <div className="grid grid-cols-4 items-start gap-4">
                <Label htmlFor="description" className="text-right pt-2">Description</Label>
                <Textarea id="description" name="description" className="col-span-3" required/>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="coverImage" className="text-right">Cover Image</Label>
                <Input id="coverImage" name="coverImage" type="file" accept="image/*" className="col-span-3" />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="bookPdf" className="text-right">Book PDF</Label>
                <Input id="bookPdf" name="bookPdf" type="file" accept=".pdf" className="col-span-3" required />
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
              This action cannot be undone. This will permanently delete the book
              "{bookToDelete?.title}" from the library.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDeleteBook} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
