
'use client';

import { useState, useEffect } from 'react';
import { Send } from 'lucide-react';
import { useRemarks } from '@/hooks/use-remarks';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { formatDistanceToNow } from 'date-fns';
import { Separator } from '@/components/ui/separator';

interface RemarksProps {
  bookId: string;
}

export default function Remarks({ bookId }: RemarksProps) {
  const { remarks, addRemark } = useRemarks(bookId);
  const [newRemark, setNewRemark] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newRemark.trim()) {
      addRemark(newRemark.trim());
      setNewRemark('');
    }
  };
  
  return (
    <div className="space-y-6">
        <Separator />
        <div>
            <h2 className="font-headline text-2xl font-semibold mb-4">Remarks</h2>
            
            <div className="rounded-lg border bg-card text-card-foreground p-4">
                 <form onSubmit={handleSubmit} className="relative">
                    <Textarea
                        value={newRemark}
                        onChange={(e) => setNewRemark(e.target.value)}
                        placeholder="Leave a remark..."
                        className="pr-16"
                        minRows={2}
                    />
                    <Button type="submit" size="icon" className="absolute right-3 top-3">
                        <Send className="h-4 w-4" />
                        <span className="sr-only">Send Remark</span>
                    </Button>
                </form>

                <div className="mt-6 space-y-6">
                    {remarks.length === 0 ? (
                        <p className="text-muted-foreground text-center py-4">
                            No remarks yet. Be the first to leave one!
                        </p>
                    ) : (
                        remarks.map((remark) => (
                            <div key={remark.id} className="flex items-start gap-4">
                                <Avatar>
                                    <AvatarImage src={remark.authorAvatarUrl} alt={remark.authorName} />
                                    <AvatarFallback>{remark.authorName.charAt(0)}</AvatarFallback>
                                </Avatar>
                                <div className="flex-1">
                                    <div className="flex items-center gap-2">
                                        <p className="font-semibold">{remark.authorName}</p>
                                        <p className="text-xs text-muted-foreground">
                                            {formatDistanceToNow(new Date(remark.timestamp), { addSuffix: true })}
                                        </p>
                                    </div>
                                    <p className="text-muted-foreground whitespace-pre-wrap">{remark.text}</p>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>
    </div>
  );
}
