"use client";

import React, { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, X, Dumbbell, Flame, Timer, ChevronRight } from "lucide-react";
import { WORKOUT_DAYS, Exercise } from "@/data/workouts";
import ExerciseGIF from "./ExerciseGIF";
import Link from "next/link";

interface ExerciseSearchProps {
  onClose: () => void;
}

export default function ExerciseSearch({ onClose }: ExerciseSearchProps) {
  const [query, setQuery] = useState("");

  // Flatten all exercises with their day info
  const allExercises = useMemo(() => {
    return WORKOUT_DAYS.flatMap((day) =>
      day.exercises.map((exercise) => ({
        ...exercise,
        dayName: day.name,
        dayId: day.id,
        dayColor: day.color,
      }))
    );
  }, []);

  // Filter exercises
  const filteredExercises = useMemo(() => {
    if (!query.trim()) return allExercises.slice(0, 20); // Show first 20 if no search
    
    const q = query.toLowerCase().trim();
    return allExercises.filter(
      (ex) =>
        ex.name.toLowerCase().includes(q) ||
        ex.muscleGroup.toLowerCase().includes(q) ||
        ex.instruction.toLowerCase().includes(q)
    ).slice(0, 50);
  }, [query, allExercises]);

  // Group by muscle
  const byMuscle = useMemo(() => {
    const groups: Record<string, typeof filteredExercises> = {};
    filteredExercises.forEach((ex) => {
      if (!groups[ex.muscleGroup]) groups[ex.muscleGroup] = [];
      groups[ex.muscleGroup].push(ex);
    });
    return groups;
  }, [filteredExercises]);

  return (
    <motion.div
      className="fixed inset-0 z-[100] bg-black flex flex-col"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {/* Header */}
      <div className="p-4 border-b border-zinc-800">
        <div className="flex items-center gap-3 mb-4">
          <div className="flex-1 relative">
            <Search size={20} className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Buscar ejercicio, músculo..."
              className="w-full pl-10 pr-4 py-3 rounded-xl bg-zinc-900 border border-zinc-800 text-white placeholder-zinc-500 focus:border-orange-500 focus:outline-none"
              autoFocus
            />
            {query && (
              <button
                onClick={() => setQuery("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 p-1 rounded-full hover:bg-zinc-800"
              >
                <X size={16} className="text-zinc-500" />
              </button>
            )}
          </div>
          <button
            onClick={onClose}
            className="p-3 rounded-xl bg-zinc-800 text-zinc-400 hover:bg-zinc-700"
          >
            <X size={20} />
          </button>
        </div>

        {/* Results count */}
        <p className="text-sm text-zinc-500">
          {filteredExercises.length} ejercicios{query && ` para "${query}"`}
        </p>
      </div>

      {/* Results */}
      <div className="flex-1 overflow-y-auto p-4">
        {filteredExercises.length === 0 ? (
          <div className="text-center py-12">
            <Search size={48} className="mx-auto text-zinc-700 mb-4" />
            <p className="text-zinc-500">No se encontraron ejercicios</p>
            <p className="text-zinc-600 text-sm mt-2">Prueba con otro término</p>
          </div>
        ) : (
          <div className="space-y-6">
            {Object.entries(byMuscle).map(([muscle, exercises]) => (
              <div key={muscle}>
                <div className="flex items-center gap-2 mb-3">
                  <Flame size={16} className="text-orange-400" />
                  <h3 className="font-semibold text-white">{muscle}</h3>
                  <span className="text-xs text-zinc-500">({exercises.length})</span>
                </div>
                
                <div className="space-y-2">
                  {exercises.map((exercise) => (
                    <Link
                      key={exercise.id}
                      href={`/workout/${exercise.dayId}`}
                      className="block"
                    >
                      <motion.div
                        className="flex items-center gap-3 p-3 rounded-xl bg-zinc-900/50 border border-zinc-800 hover:border-zinc-700 transition-colors"
                        whileHover={{ x: 4 }}
                      >
                        {/* GIF */}
                        <ExerciseGIF exerciseId={exercise.id} size="sm" />

                        {/* Info */}
                        <div className="flex-1 min-w-0">
                          <h4 className="font-medium text-white text-sm truncate">
                            {exercise.name}
                          </h4>
                          <div className="flex items-center gap-2 mt-1">
                            <span className={`text-xs px-2 py-0.5 rounded-full bg-gradient-to-r ${exercise.dayColor} text-white`}>
                              {exercise.dayName}
                            </span>
                            <span className="text-xs text-zinc-500 flex items-center gap-1">
                              <Dumbbell size={10} />
                              {exercise.sets}×{exercise.reps}
                            </span>
                            {exercise.isTimeBased && (
                              <span className="text-xs text-zinc-500 flex items-center gap-1">
                                <Timer size={10} />
                                {exercise.duration}s
                              </span>
                            )}
                          </div>
                        </div>

                        {/* Arrow */}
                        <ChevronRight size={16} className="text-zinc-600" />
                      </motion.div>
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </motion.div>
  );
}
