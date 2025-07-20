
'use client';

import { useState } from 'react';
import { format } from 'date-fns';
import { MoreHorizontal, Trash2 } from 'lucide-react';
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
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { useUsers } from '@/hooks/use-users';
import { type User } from '@/lib/data';
import { useToast } from '@/hooks/use-toast';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function ManageUsersPage() {
  const { users, deleteUser } = useUsers();
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [userToDelete, setUserToDelete] = useState<User | null>(null);
  const { toast } = useToast();

  const openDeleteDialog = (user: User) => {
    setUserToDelete(user);
    setIsDeleteDialogOpen(true);
  };

  const handleDeleteUser = () => {
    if (userToDelete) {
      deleteUser(userToDelete.id);
      toast({
        title: "User Deleted",
        description: `User "${userToDelete.name}" has been removed.`,
        variant: "destructive",
      });
      setIsDeleteDialogOpen(false);
      setUserToDelete(null);
    }
  };

  return (
    <div className="space-y-6">
        <div>
          <h2 className="text-2xl font-semibold tracking-tight">Manage Users</h2>
          <p className="text-muted-foreground">View and manage registered student accounts.</p>
        </div>
      
      {/* Table for Desktop */}
      <div className="border rounded-lg hidden md:block">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Signed Up</TableHead>
              <TableHead className="text-right w-[100px]">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {users.map((user) => (
              <TableRow key={user.id}>
                <TableCell className="font-medium">{user.name}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{format(new Date(user.signedUpAt), "PPP")}</TableCell>
                <TableCell className="text-right">
                   <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" className="h-8 w-8 p-0">
                        <span className="sr-only">Open menu</span>
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={() => openDeleteDialog(user)} className="text-destructive">
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
        {users.map(user => (
          <Card key={user.id}>
            <CardHeader>
              <CardTitle className="text-lg">{user.name}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-sm">
                <p className="truncate"><span className="font-semibold">Email:</span> {user.email}</p>
                <p><span className="font-semibold">Signed Up:</span> {format(new Date(user.signedUpAt), "PPP")}</p>
                <div className="pt-2">
                    <Button
                        variant="ghost"
                        size="sm"
                        className="w-full justify-start text-destructive hover:bg-destructive/10 hover:text-destructive"
                        onClick={() => openDeleteDialog(user)}
                    >
                        <Trash2 className="mr-2 h-4 w-4" /> Delete User
                    </Button>
                </div>
            </CardContent>
          </Card>
        ))}
      </div>


       {/* Delete Confirmation Dialog */}
      <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the user account
              for "{userToDelete?.name}".
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDeleteUser} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
