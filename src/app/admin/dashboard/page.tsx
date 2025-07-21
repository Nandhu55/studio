
'use client';

import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Users, Book, Shapes, FileText, BookHeart } from 'lucide-react';
import { useBooks } from '@/hooks/use-books';
import { useUsers } from '@/hooks/use-users';
import { useCategories } from '@/hooks/use-categories';
import { useQuestionPapers } from '@/hooks/use-question-papers';
import { initialCategories } from '@/lib/data';

export default function AdminDashboard() {
  const { books } = useBooks();
  const { users } = useUsers();
  const { categories } = useCategories();
  const { questionPapers } = useQuestionPapers();
  
  const academicBookCategories = initialCategories.filter(c => c !== 'All' && c !== 'Finance' && c !== 'Motivation');
  const otherBookCategories = ['Finance', 'Motivation'];

  const totalAcademicBooks = books.filter(b => academicBookCategories.includes(b.category)).length;
  const totalOtherBooks = books.filter(b => otherBookCategories.includes(b.category)).length;

  const totalUsers = users.length;
  const totalCategories = categories.filter(c => c !== 'All').length;
  const totalQuestionPapers = questionPapers.length;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-start">
        <div>
          <h2 className="text-2xl font-semibold tracking-tight">Dashboard Overview</h2>
          <p className="text-muted-foreground">A quick glance at your library's stats.</p>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Users</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalUsers}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Academic Books</CardTitle>
            <Book className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalAcademicBooks}</div>
          </CardContent>
        </Card>
         <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Other Books</CardTitle>
            <BookHeart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalOtherBooks}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Exam Papers</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalQuestionPapers}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Categories</CardTitle>
            <Shapes className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalCategories}</div>
          </CardContent>
        </Card>
      </div>

       <div className="space-y-4">
        <div>
          <h3 className="text-xl font-semibold">Quick Links</h3>
        </div>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4">
            <Link href="/admin/manage-books" className="block">
                <Card className="hover:bg-muted/50 transition-colors">
                    <CardHeader>
                        <CardTitle>Manage Academic Books</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-muted-foreground">View, upload, and delete course-related books.</p>
                    </CardContent>
                </Card>
            </Link>
            <Link href="/admin/manage-other-books" className="block">
                <Card className="hover:bg-muted/50 transition-colors">
                    <CardHeader>
                        <CardTitle>Manage Other Books</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-muted-foreground">Manage finance, motivation, and other books.</p>
                    </CardContent>
                </Card>
            </Link>
            <Link href="/admin/manage-question-papers" className="block">
                <Card className="hover:bg-muted/50 transition-colors">
                    <CardHeader>
                        <CardTitle>Manage Exam Papers</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-muted-foreground">Upload and manage past exam question papers.</p>
                    </CardContent>
                </Card>
            </Link>
            <Link href="/admin/manage-users" className="block">
                <Card className="hover:bg-muted/50 transition-colors">
                    <CardHeader>
                        <CardTitle>Manage Users</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-muted-foreground">View and manage registered student accounts.</p>
                    </CardContent>
                </Card>
            </Link>
        </div>
       </div>

    </div>
  );
}
