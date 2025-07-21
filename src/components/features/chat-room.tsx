
'use client';

import { useState, useEffect, useRef } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Send, MessageSquare, User } from 'lucide-react';
import { useChat } from '@/hooks/use-chat';
import type { User as UserType } from '@/lib/data';

export default function ChatRoom() {
  const { messages, sendMessage } = useChat();
  const [currentUser, setCurrentUser] = useState<UserType | null>(null);
  const [input, setInput] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const userJson = sessionStorage.getItem('currentUser');
    if (userJson) {
      setCurrentUser(JSON.parse(userJson));
    }
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || !currentUser) return;
    sendMessage(input, currentUser);
    setInput('');
  };

  return (
    <Card className="w-full h-full flex flex-col">
      <CardHeader>
        <CardTitle className="font-headline text-2xl flex items-center gap-3">
          <MessageSquare className="h-6 w-6 text-accent" />
          Student Chat
        </CardTitle>
        <CardDescription>A global chat room for all students.</CardDescription>
      </CardHeader>
      <CardContent className="flex-grow flex flex-col gap-4 overflow-hidden p-4">
        <div className="flex-grow overflow-y-auto space-y-4 pr-2">
          {messages.length === 0 ? (
            <div className="flex h-full items-center justify-center text-muted-foreground">
              <p>No messages yet. Start the conversation!</p>
            </div>
          ) : (
            messages.map((message) => (
              <div
                key={message.id}
                className={`flex items-start gap-3 ${
                  message.userId === currentUser?.id ? 'justify-end' : ''
                }`}
              >
                {message.userId !== currentUser?.id && (
                  <Avatar className="h-8 w-8 border-2">
                    <AvatarImage src={message.avatarUrl} data-ai-hint="person portrait" />
                    <AvatarFallback>
                        <User className="h-4 w-4" />
                    </AvatarFallback>
                  </Avatar>
                )}
                <div
                  className={`rounded-lg px-3 py-2 max-w-sm ${
                    message.userId === currentUser?.id
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-secondary'
                  }`}
                >
                  {message.userId !== currentUser?.id && (
                    <p className="text-xs font-bold mb-1">{message.userName}</p>
                  )}
                  <p className="text-sm whitespace-pre-wrap">{message.text}</p>
                </div>
                {message.userId === currentUser?.id && (
                  <Avatar className="h-8 w-8">
                     <AvatarImage src={currentUser.avatarUrl} data-ai-hint="person portrait" />
                    <AvatarFallback>
                      <User className="h-4 w-4" />
                    </AvatarFallback>
                  </Avatar>
                )}
              </div>
            ))
          )}
          <div ref={messagesEndRef} />
        </div>
        <form onSubmit={handleSendMessage} className="flex items-center gap-2 pt-2 border-t">
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type your message..."
            disabled={!currentUser}
            className="flex-grow"
          />
          <Button type="submit" disabled={!currentUser || !input.trim()} size="icon">
            <Send className="h-4 w-4" />
            <span className="sr-only">Send message</span>
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
