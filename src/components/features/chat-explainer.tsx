
'use client';

import { useState } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Bot, Loader2, Send, User } from 'lucide-react';
import { explainText } from '@/ai/flows/explain-text';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

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

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage: Message = { sender: 'user', text: input };
    const newMessages = [...messages, userMessage];
    setMessages(newMessages);
    setInput('');
    setIsLoading(true);
    setError(null);

    try {
      const result = await explainText({
        messages: newMessages,
        context: bookContext,
      });
      const aiMessage: Message = { sender: 'ai', text: result.explanation };
      setMessages(prev => [...prev, aiMessage]);
    } catch (e) {
      console.error('Error getting explanation:', e);
      setError('Sorry, I had trouble getting an explanation. Please try again.');
       // remove the user's message if the API call fails
      setMessages(messages);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="font-headline text-2xl md:text-3xl font-bold flex items-center gap-3">
          <Bot className="h-8 w-8 text-accent" />
          AI Explainer
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="h-80 overflow-y-auto p-4 border rounded-md space-y-4 bg-muted/20">
            {messages.length === 0 ? (
                <div className="flex h-full items-center justify-center text-muted-foreground">
                    <p>Ask a question about the book content to get started.</p>
                </div>
            ) : (
                messages.map((message, index) => (
                <div key={index} className={`flex items-start gap-3 ${message.sender === 'user' ? 'justify-end' : ''}`}>
                    {message.sender === 'ai' && (
                    <Avatar className="h-8 w-8 border-2 border-accent">
                        <AvatarFallback><Bot className="h-4 w-4" /></AvatarFallback>
                    </Avatar>
                    )}
                    <div className={`rounded-lg px-4 py-2 max-w-sm ${message.sender === 'user' ? 'bg-primary text-primary-foreground' : 'bg-secondary'}`}>
                        <p className="text-sm whitespace-pre-wrap">{message.text}</p>
                    </div>
                     {message.sender === 'user' && (
                    <Avatar className="h-8 w-8">
                        <AvatarFallback><User className="h-4 w-4" /></AvatarFallback>
                    </Avatar>
                    )}
                </div>
                ))
            )}
            {isLoading && (
                 <div className="flex items-start gap-3">
                    <Avatar className="h-8 w-8 border-2 border-accent">
                        <AvatarFallback><Bot className="h-4 w-4" /></AvatarFallback>
                    </Avatar>
                    <div className="rounded-lg px-4 py-2 bg-secondary flex items-center gap-2">
                        <Loader2 className="h-4 w-4 animate-spin" />
                        <p className="text-sm">Thinking...</p>
                    </div>
                </div>
            )}
          </div>
          {error && (
            <Alert variant="destructive">
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
          <form onSubmit={handleSendMessage} className="flex items-center gap-2">
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask anything about the book..."
              disabled={isLoading}
              className="flex-grow"
            />
            <Button type="submit" disabled={isLoading || !input.trim()} size="icon">
              <Send className="h-4 w-4" />
              <span className="sr-only">Send message</span>
            </Button>
          </form>
        </div>
      </CardContent>
    </Card>
  );
}
