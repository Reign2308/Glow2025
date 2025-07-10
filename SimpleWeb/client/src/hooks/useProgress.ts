import { useState, useEffect } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";

interface UserProgress {
  currentProgress: number;
  completedSections: string[];
  quizScores: Record<string, number>;
}

export function useProgress(userId: number = 1) {
  const queryClient = useQueryClient();

  const { data: progress, isLoading } = useQuery<UserProgress>({
    queryKey: ['/api/progress', userId],
    queryFn: async () => {
      const response = await fetch(`/api/progress/${userId}`);
      if (!response.ok) {
        throw new Error('Failed to fetch progress');
      }
      return response.json();
    },
  });

  const updateProgressMutation = useMutation({
    mutationFn: async (updates: Partial<UserProgress>) => {
      const response = await apiRequest('POST', `/api/progress/${userId}`, updates);
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/progress', userId] });
    },
  });

  const updateProgress = (updates: Partial<UserProgress>) => {
    updateProgressMutation.mutate(updates);
  };

  const completeSection = (sectionId: string) => {
    if (progress) {
      const completedSections = [...progress.completedSections];
      if (!completedSections.includes(sectionId)) {
        completedSections.push(sectionId);
        const currentProgress = Math.min(100, (completedSections.length / 7) * 100);
        updateProgress({
          completedSections,
          currentProgress
        });
      }
    }
  };

  const updateQuizScore = (quizId: string, score: number) => {
    if (progress) {
      const quizScores = { ...progress.quizScores, [quizId]: score };
      updateProgress({ quizScores });
    }
  };

  return {
    progress: progress || { currentProgress: 0, completedSections: [], quizScores: {} },
    isLoading,
    updateProgress,
    completeSection,
    updateQuizScore,
  };
}
