"use client";

import React from "react";
import { motion } from "framer-motion";
import { Trophy, Clock, Flame, TrendingUp, Calendar, Dumbbell } from "lucide-react";

interface WorkoutStatsProps {
  dayName: string;
  completedExercises: number;
  totalExercises: number;
  totalSets: number;
  completedSets: number;
  estimatedCalories: number;
  workoutDuration?: number;
  streak?: number;
}

export default function WorkoutStats({
  dayName,
  completedExercises,
  totalExercises,
  totalSets,
  completedSets,
  estimatedCalories,
  workoutDuration,
  streak = 0,
}: WorkoutStatsProps) {
  const setProgress = totalSets > 0 ? Math.round((completedSets / totalSets) * 100) : 0;

  return (
    <motion.div
      className="p-6 bg-gradient-to-br from-zinc-800 to-zinc-900 rounded-3xl border border-zinc-700"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-2xl font-bold text-white">{dayName}</h3>
          <p className="text-zinc-400 text-sm">Resumen del entrenamiento</p>
        </div>
        <div className="p-3 rounded-2xl bg-gradient-to-br from-green-500 to-emerald-500">
          <Trophy size={32} className="text-white" />
        </div>
      </div>

      {/* Main Stats Grid */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        {/* Exercises */}
        <div className="p-4 rounded-2xl bg-zinc-900/50 border border-zinc-700">
          <div className="flex items-center gap-2 text-zinc-400 mb-2">
            <Dumbbell size={18} />
            <span className="text-xs">Ejercicios</span>
          </div>
          <p className="text-2xl font-bold text-white">
            {completedExercises}/{totalExercises}
          </p>
        </div>

        {/* Sets */}
        <div className="p-4 rounded-2xl bg-zinc-900/50 border border-zinc-700">
          <div className="flex items-center gap-2 text-zinc-400 mb-2">
            <TrendingUp size={18} />
            <span className="text-xs">Series</span>
          </div>
          <p className="text-2xl font-bold text-white">
            {completedSets}/{totalSets}
          </p>
          <div className="mt-2 h-1.5 bg-zinc-700 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-blue-500 to-cyan-500"
              initial={{ width: 0 }}
              animate={{ width: `${setProgress}%` }}
              transition={{ duration: 0.5 }}
            />
          </div>
        </div>

        {/* Calories */}
        <div className="p-4 rounded-2xl bg-zinc-900/50 border border-zinc-700">
          <div className="flex items-center gap-2 text-zinc-400 mb-2">
            <Flame size={18} />
            <span className="text-xs">Calorías</span>
          </div>
          <p className="text-2xl font-bold text-orange-400">
            ~{estimatedCalories}
          </p>
          <p className="text-xs text-zinc-500">estimadas</p>
        </div>

        {/* Duration */}
        <div className="p-4 rounded-2xl bg-zinc-900/50 border border-zinc-700">
          <div className="flex items-center gap-2 text-zinc-400 mb-2">
            <Clock size={18} />
            <span className="text-xs">Duración</span>
          </div>
          <p className="text-2xl font-bold text-blue-400">
            {workoutDuration ? `${Math.round(workoutDuration / 60)} min` : '--'}
          </p>
        </div>
      </div>

      {/* Streak (if available) */}
      {streak > 0 && (
        <div className="p-4 rounded-2xl bg-gradient-to-r from-orange-500/20 to-red-500/20 border border-orange-500/30">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-orange-500">
              <Calendar size={20} className="text-white" />
            </div>
            <div>
              <p className="text-sm text-orange-300">Racha actual</p>
              <p className="text-xl font-bold text-white">{streak} días 🔥</p>
            </div>
          </div>
        </div>
      )}

      {/* Motivational Message */}
      <div className="mt-4 text-center">
        <p className="text-sm text-zinc-400">
          {completedExercises === totalExercises
            ? "🎉 ¡Entrenamiento completado! ¡Sigue así!"
            : completedExercises > totalExercises / 2
            ? "💪 ¡Vas por buen camino! Sigue así."
            : "🚀 ¡Gran comienzo! A por el resto."}
        </p>
      </div>
    </motion.div>
  );
}