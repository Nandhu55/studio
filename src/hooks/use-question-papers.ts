
'use client';

import { useState, useEffect } from 'react';
import { initialQuestionPapers, type QuestionPaper } from '@/lib/data';

const QP_STORAGE_KEY = 'b-tech-hub-question-papers';

export function useQuestionPapers() {
  const [questionPapers, setQuestionPapers] = useState<QuestionPaper[]>([]);

  useEffect(() => {
    try {
      const storedPapers = localStorage.getItem(QP_STORAGE_KEY);
      if (storedPapers) {
        setQuestionPapers(JSON.parse(storedPapers));
      } else {
        setQuestionPapers(initialQuestionPapers);
        localStorage.setItem(QP_STORAGE_KEY, JSON.stringify(initialQuestionPapers));
      }
    } catch (error) {
      console.error("Failed to access local storage for question papers:", error);
      setQuestionPapers(initialQuestionPapers);
    }
  }, []);

  const updateStoredPapers = (updatedPapers: QuestionPaper[]) => {
    setQuestionPapers(updatedPapers);
    try {
      localStorage.setItem(QP_STORAGE_KEY, JSON.stringify(updatedPapers));
    } catch (error) {
      console.error("Failed to save question papers to local storage:", error);
    }
  };

  const addQuestionPaper = (paper: QuestionPaper) => {
    const updatedPapers = [paper, ...questionPapers];
    updateStoredPapers(updatedPapers);
  };

  const deleteQuestionPaper = (paperId: string) => {
    const updatedPapers = questionPapers.filter(paper => paper.id !== paperId);
    updateStoredPapers(updatedPapers);
  };

  return { questionPapers, addQuestionPaper, deleteQuestionPaper };
}
