"use client";

import { useState, useEffect, useCallback } from "react";

export interface WorkoutSession {
  id: string;
  dayId: string;
  dayName: string;
  date: string; // ISO string
  completedExercises: number;
  totalExercises: number;
  completedSets: number;
  totalSets: number;
  durationSeconds: number;
  caloriesBurned: number;
}

const STORAGE_KEY = "fitness-tracker-history";

export function useWorkoutHistory() {
  const [history, setHistory] = useState<WorkoutSession[]>([]);
  const [streak, setStreak] = useState(0);

  // Load history on mount
  useEffect(() => {
    if (typeof window === "undefined") return;
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setHistory(parsed);
        calculateStreak(parsed);
      } catch {}
    }
  }, []);

  const calculateStreak = (sessions: WorkoutSession[]) => {
    if (sessions.length === 0) {
      setStreak(0);
      return;
    }

    // Sort by date descending
    const sorted = [...sessions].sort(
      (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
    );

    let currentStreak = 1;
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    
    let lastDate = new Date(sorted[0].date);
    lastDate = new Date(lastDate.getFullYear(), lastDate.getMonth(), lastDate.getDate());

    // Check if last workout was today or yesterday
    const daysDiff = Math.floor((today.getTime() - lastDate.getTime()) / (1000 * 60 * 60 * 24));
    if (daysDiff > 1) {
      setStreak(0);
      return;
    }

    // Count consecutive days
    for (let i = 1; i < sorted.length; i++) {
      const currentDate = new Date(sorted[i].date);
      const diff = Math.floor((lastDate.getTime() - currentDate.getTime()) / (1000 * 60 * 60 * 24));
      
      if (diff === 1) {
        currentStreak++;
        lastDate = currentDate;
      } else if (diff > 1) {
        break;
      }
    }

    setStreak(currentStreak);
  };

  const addSession = useCallback((session: Omit<WorkoutSession, "id" | "date">) => {
    if (typeof window === "undefined") return;

    const newSession: WorkoutSession = {
      ...session,
      id: `session-${Date.now()}`,
      date: new Date().toISOString(),
    };

    const updated = [newSession, ...history].slice(0, 100); // Keep last 100
    setHistory(updated);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    calculateStreak(updated);

    return newSession;
  }, [history]);

  const getHistoryByDay = useCallback((dayId: string) => {
    return history.filter(h => h.dayId === dayId);
  }, [history]);

  const getLastSession = useCallback((dayId?: string) => {
    if (dayId) {
      return history.find(h => h.dayId === dayId);
    }
    return history[0];
  }, [history]);

  const getTotalWorkouts = useCallback(() => {
    return history.length;
  }, [history]);

  const getTotalCalories = useCallback(() => {
    return history.reduce((sum, h) => sum + h.caloriesBurned, 0);
  }, [history]);

  const clearHistory = useCallback(() => {
    if (typeof window === "undefined") return;
    setHistory([]);
    setStreak(0);
    localStorage.removeItem(STORAGE_KEY);
  }, []);

  return {
    history,
    streak,
    addSession,
    getHistoryByDay,
    getLastSession,
    getTotalWorkouts,
    getTotalCalories,
    clearHistory,
  };
}