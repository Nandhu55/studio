
'use client';

import { useState } from 'react';
import { generateQuiz } from '@/ai/flows/generate-quiz';
import type { GenerateQuizOutput } from '@/ai/flows/types';
import type { Book } from '@/lib/data';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Lightbulb, Loader2, CheckCircle2, XCircle, RefreshCw } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';
import { Separator } from '../ui/separator';

interface QuizGeneratorProps {
  book: Book;
}

type AnswerState = 'unanswered' | 'correct' | 'incorrect';

export default function QuizGenerator({ book }: QuizGeneratorProps) {
  const [quiz, setQuiz] = useState<GenerateQuizOutput['quiz'] | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, string>>({});
  const [answerStates, setAnswerStates] = useState<Record<number, AnswerState>>({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleGenerateQuiz = async () => {
    setIsLoading(true);
    setError(null);
    setQuiz(null);
    setSelectedAnswers({});
    setAnswerStates({});
    setIsSubmitted(false);

    try {
      const result = await generateQuiz({
        content: book.description, // Using description as context
        bookTitle: book.title,
        count: 5,
      });
      setQuiz(result.quiz);
      // Initialize answer states
      const initialStates: Record<number, AnswerState> = {};
      result.quiz.forEach((_, index) => {
        initialStates[index] = 'unanswered';
      });
      setAnswerStates(initialStates);
    } catch (e) {
      setError('Sorry, the AI quiz master is busy. Please try again in a moment.');
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmitQuiz = () => {
    if (!quiz) return;
    const newAnswerStates: Record<number, AnswerState> = {};
    quiz.forEach((q, index) => {
      const isCorrect = selectedAnswers[index] === q.correctAnswer;
      newAnswerStates[index] = isCorrect ? 'correct' : 'incorrect';
    });
    setAnswerStates(newAnswerStates);
    setIsSubmitted(true);
  };

  const getScore = () => {
    if (!isSubmitted) return { correct: 0, total: 0 };
    const correctAnswers = Object.values(answerStates).filter(s => s === 'correct').length;
    return { correct: correctAnswers, total: quiz?.length || 0 };
  };

  const score = getScore();

  return (
    <Card className="bg-card/80 backdrop-blur-sm">
      <CardHeader>
        <div className="flex items-center gap-3">
          <Lightbulb className="h-8 w-8 text-accent" />
          <div>
            <CardTitle className="font-headline text-2xl">AI Quiz Generator</CardTitle>
            <CardDescription>Test your knowledge on the book content.</CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        {!quiz && (
          <Button onClick={handleGenerateQuiz} disabled={isLoading} className="w-full">
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Generating Quiz...
              </>
            ) : (
              'Generate a 5-Question Quiz'
            )}
          </Button>
        )}

        {error && (
          <Alert variant="destructive" className="mt-4">
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {quiz && (
          <div className="space-y-6">
            {quiz.map((q, index) => (
              <div key={index} className="space-y-3">
                <p className="font-semibold">
                  {index + 1}. {q.question}
                </p>
                <RadioGroup
                  value={selectedAnswers[index]}
                  onValueChange={(value) =>
                    setSelectedAnswers((prev) => ({ ...prev, [index]: value }))
                  }
                  disabled={isSubmitted}
                  className="space-y-2"
                >
                  {q.options.map((option, optIndex) => {
                    const isCorrect = option === q.correctAnswer;
                    const isSelected = selectedAnswers[index] === option;
                    const state = answerStates[index];
                    
                    return (
                        <div
                            key={optIndex}
                            className={cn(
                                "flex items-center space-x-3 rounded-md border p-3 transition-colors",
                                isSubmitted && isCorrect && "border-green-500 bg-green-500/10",
                                isSubmitted && isSelected && !isCorrect && "border-red-500 bg-red-500/10",
                            )}
                        >
                            <RadioGroupItem value={option} id={`q${index}-opt${optIndex}`} />
                            <Label htmlFor={`q${index}-opt${optIndex}`} className="flex-1 cursor-pointer">
                                {option}
                            </Label>
                            {isSubmitted && isCorrect && <CheckCircle2 className="h-5 w-5 text-green-500" />}
                            {isSubmitted && isSelected && !isCorrect && <XCircle className="h-5 w-5 text-red-500" />}
                        </div>
                    );
                  })}
                </RadioGroup>
              </div>
            ))}
            
            <Separator />

            {isSubmitted ? (
                <div className="text-center space-y-4">
                    <p className="font-headline text-xl font-bold">You scored {score.correct} out of {score.total}!</p>
                    <Button onClick={handleGenerateQuiz} disabled={isLoading}>
                       <RefreshCw className="mr-2 h-4 w-4" />
                        Try Another Quiz
                    </Button>
                </div>
            ) : (
                <Button onClick={handleSubmitQuiz} className="w-full">
                    Submit Quiz
                </Button>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
