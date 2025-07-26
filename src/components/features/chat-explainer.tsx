
'use client';

import { useState, useRef, useEffect } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Bot, Loader2, Send, User, CornerDownLeft, Mic } from 'lucide-react';
import { explainText } from '@/ai/flows/explain-text';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Textarea } from '@/components/ui/textarea';
import { cn } from '@/lib/utils';

interface Message {
  sender: 'user' | 'ai';
  text: string;
}

interface ChatExplainerProps {
  bookContext: string;
}

export default function ChatExplainer({ bookContext }: ChatExplainerProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const chatContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Scroll to bottom when messages change
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages, isLoading]);


  const handleSendMessage = async (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage: Message = { sender: 'user', text: input };
    const newMessages = [...messages, userMessage];
    setMessages(newMessages);
    setInput('');
    setIsLoading(true);
    setError(null);

    try {
      const result = await explainText({
        messages: newMessages.map(m => ({sender: m.sender, text: m.text})),
        context: bookContext,
      });
      const aiMessage: Message = { sender: 'ai', text: result.response };
      setMessages(prev => [...prev, aiMessage]);
    } catch (e) {
      console.error('Error getting explanation:', e);
      setError('Sorry, the AI tutor seems to be overloaded at the moment. Please try again in a little bit.');
      setMessages(messages); // Revert to previous messages on error
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        handleSendMessage();
    }
  }

  return (
    <div className="flex flex-col h-[70vh] rounded-xl border bg-card text-card-foreground shadow-sm">
        <header className="flex items-center gap-3 border-b p-4">
            <div className="relative">
                 <Avatar className="h-10 w-10 border-2 border-accent">
                    <AvatarFallback><Bot className="h-5 w-5" /></AvatarFallback>
                </Avatar>
                <span className="absolute bottom-0 right-0 block h-2.5 w-2.5 rounded-full bg-green-500 ring-2 ring-white"></span>
            </div>
            <div>
                <h2 className="font-headline text-xl font-bold">AI Explainer</h2>
                <p className="text-xs text-muted-foreground">Online</p>
            </div>
        </header>

        <div ref={chatContainerRef} className="flex-1 space-y-4 overflow-y-auto p-4">
             {messages.length === 0 && !isLoading ? (
                <div className="flex h-full items-center justify-center text-muted-foreground">
                    <p>Ask a question about the book content to get started.</p>
                </div>
            ) : (
                messages.map((message, index) => (
                    <div key={index} className={cn(
                        "flex items-end gap-2 w-full",
                        message.sender === 'user' ? "justify-end" : "justify-start"
                    )}>
                        {message.sender === 'ai' && (
                             <Avatar className="h-8 w-8 self-start">
                                <AvatarFallback><Bot className="h-4 w-4" /></AvatarFallback>
                            </Avatar>
                        )}
                        <p className={cn(
                            "rounded-lg px-4 py-2 max-w-sm whitespace-pre-wrap",
                             message.sender === 'user'
                                ? 'bg-primary text-primary-foreground rounded-br-none'
                                : 'bg-secondary rounded-bl-none'
                        )}>
                            {message.text}
                        </p>
                         {message.sender === 'user' && (
                             <Avatar className="h-8 w-8 self-start">
                                <AvatarFallback><User className="h-4 w-4" /></AvatarFallback>
                            </Avatar>
                        )}
                    </div>
                ))
            )}
             {isLoading && (
                 <div className="flex items-end gap-2 w-full justify-start">
                    <Avatar className="h-8 w-8 self-start">
                        <AvatarFallback><Bot className="h-4 w-4" /></AvatarFallback>
                    </Avatar>
                     <div className="rounded-lg rounded-bl-none px-4 py-2 bg-secondary flex items-center gap-2">
                        <span className="h-2 w-2 block rounded-full bg-muted-foreground animate-bounce [animation-delay:-0.3s]"></span>
                        <span className="h-2 w-2 block rounded-full bg-muted-foreground animate-bounce [animation-delay:-0.15s]"></span>
                        <span className="h-2 w-2 block rounded-full bg-muted-foreground animate-bounce"></span>
                    </div>
                </div>
            )}
        </div>
        
        {error && (
            <div className="p-4 pt-0">
                <Alert variant="destructive">
                <AlertTitle>Error</AlertTitle>
                <AlertDescription>{error}</AlertDescription>
                </Alert>
            </div>
          )}

        <div className="border-t p-2">
            <form onSubmit={handleSendMessage} className="relative">
                <Textarea
                    placeholder="Ask anything about the book..."
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={handleKeyDown}
                    disabled={isLoading}
                    className="min-h-12 resize-none pr-24"
                    rows={1}
                />
                <div className="absolute bottom-2 right-2 flex items-center gap-2">
                     <Button type="button" size="icon" variant="ghost" className="h-8 w-8" disabled>
                        <Mic className="h-4 w-4" />
                        <span className="sr-only">Use Microphone</span>
                    </Button>
                    <Button type="submit" size="icon" className="h-8 w-8" disabled={isLoading || !input.trim()}>
                        <Send className="h-4 w-4" />
                        <span className="sr-only">Send Message</span>
                    </Button>
                </div>
            </form>
        </div>
    </div>
  );
}
