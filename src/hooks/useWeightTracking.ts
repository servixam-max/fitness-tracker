"use client";

import { useState, useEffect, useCallback } from "react";

export interface WeightEntry {
  date: string;
  weight: number;
  reps: string;
  notes?: string;
}

export interface ExerciseWeightHistory {
  exerciseId: string;
  exerciseName: string;
  entries: WeightEntry[];
}

const STORAGE_KEY = "fitness-tracker-weights";

export function useWeightTracking() {
  const [weights, setWeights] = useState<Record<string, ExerciseWeightHistory>>({});

  // Load on mount
  useEffect(() => {
    if (typeof window === "undefined") return;
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        setWeights(JSON.parse(saved));
      } catch {}
    }
  }, []);

  const addWeight = useCallback((exerciseId: string, exerciseName: string, weight: number, reps: string, notes?: string) => {
    if (typeof window === "undefined") return;

    const newEntry: WeightEntry = {
      date: new Date().toISOString(),
      weight,
      reps,
      notes,
    };

    setWeights(prev => {
      const existing = prev[exerciseId] || { exerciseId, exerciseName, entries: [] };
      const updated = {
        ...prev,
        [exerciseId]: {
          ...existing,
          entries: [newEntry, ...existing.entries].slice(0, 100), // Keep last 100
        },
      };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      return updated;
    });
  }, []);

  const getHistory = useCallback((exerciseId: string): ExerciseWeightHistory | undefined => {
    return weights[exerciseId];
  }, [weights]);

  const getLatestWeight = useCallback((exerciseId: string): WeightEntry | undefined => {
    return weights[exerciseId]?.entries[0];
  }, [weights]);

  const getProgress = useCallback((exerciseId: string): { startWeight: number; endWeight: number; change: number } | null => {
    const history = weights[exerciseId];
    if (!history || history.entries.length < 2) return null;

    const entries = history.entries;
    const startWeight = entries[entries.length - 1].weight;
    const endWeight = entries[0].weight;
    
    return {
      startWeight,
      endWeight,
      change: endWeight - startWeight,
    };
  }, [weights]);

  const clearExercise = useCallback((exerciseId: string) => {
    if (typeof window === "undefined") return;
    setWeights(prev => {
      const updated = { ...prev };
      delete updated[exerciseId];
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      return updated;
    });
  }, []);

  const clearAll = useCallback(() => {
    if (typeof window === "undefined") return;
    setWeights({});
    localStorage.removeItem(STORAGE_KEY);
  }, []);

  return {
    weights,
    addWeight,
    getHistory,
    getLatestWeight,
    getProgress,
    clearExercise,
    clearAll,
  };
}