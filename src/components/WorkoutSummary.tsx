"use client";

import React from "react";
import { motion } from "framer-motion";
import { Trophy, Flame, Clock, Dumbbell, Star, TrendingUp, Check } from "lucide-react";

interface WorkoutSummaryProps {
  dayName: string;
  daySubtitle: string;
  completedExercises: number;
  totalExercises: number;
  completedSets: number;
  totalSets: number;
  durationSeconds: number;
  calories: number;
  isPersonalBest?: boolean;
  onContinue: () => void;
}

export default function WorkoutSummary({
  dayName,
  daySubtitle,
  completedExercises,
  totalExercises,
  completedSets,
  totalSets,
  durationSeconds,
  calories,
  isPersonalBest = false,
  onContinue,
}: WorkoutSummaryProps) {
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    return mins < 60 ? `${mins} min` : `${Math.floor(mins / 60)}h ${mins % 60}min`;
  };

  const exercisePercent = Math.round((completedExercises / totalExercises) * 100);
  const setsPercent = Math.round((completedSets / totalSets) * 100);

  return (
    <motion.div
      className="fixed inset-0 z-[100] bg-gradient-to-b from-green-900/95 via-black to-black flex items-center justify-center p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <div className="w-full max-w-md">
        {/* Celebration Animation */}
        <motion.div
          className="text-center mb-6"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", delay: 0.2, damping: 15 }}
        >
          <div className="text-8xl mb-4">🎉</div>
          {isPersonalBest && (
            <motion.div
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-yellow-500 to-amber-500 text-white font-bold text-sm mb-4"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              <Star size={16} fill="white" />
              ¡RÉCORD PERSONAL!
            </motion.div>
          )}
        </motion.div>

        {/* Title */}
        <motion.h1
          className="text-3xl font-bold text-white text-center mb-2"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          ¡Entrenamiento Completado!
        </motion.h1>
        <motion.p
          className="text-zinc-400 text-center mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          {dayName} - {daySubtitle}
        </motion.p>

        {/* Stats Grid */}
        <motion.div
          className="grid grid-cols-2 gap-3 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          {/* Duration */}
          <div className="p-4 rounded-2xl bg-zinc-800/50 border border-zinc-700">
            <div className="flex items-center gap-2 text-blue-400 mb-2">
              <Clock size={18} />
              <span className="text-xs">Tiempo</span>
            </div>
            <p className="text-2xl font-bold text-white">{formatTime(durationSeconds)}</p>
          </div>

          {/* Calories */}
          <div className="p-4 rounded-2xl bg-zinc-800/50 border border-zinc-700">
            <div className="flex items-center gap-2 text-orange-400 mb-2">
              <Flame size={18} />
              <span className="text-xs">Calorías</span>
            </div>
            <p className="text-2xl font-bold text-white">~{calories}</p>
          </div>

          {/* Exercises */}
          <div className="p-4 rounded-2xl bg-zinc-800/50 border border-zinc-700">
            <div className="flex items-center gap-2 text-green-400 mb-2">
              <Dumbbell size={18} />
              <span className="text-xs">Ejercicios</span>
            </div>
            <p className="text-2xl font-bold text-white">{completedExercises}/{totalExercises}</p>
            <div className="mt-1 h-1 bg-zinc-700 rounded-full overflow-hidden">
              <div className="h-full bg-green-500 rounded-full" style={{ width: `${exercisePercent}%` }} />
            </div>
          </div>

          {/* Sets */}
          <div className="p-4 rounded-2xl bg-zinc-800/50 border border-zinc-700">
            <div className="flex items-center gap-2 text-purple-400 mb-2">
              <TrendingUp size={18} />
              <span className="text-xs">Series</span>
            </div>
            <p className="text-2xl font-bold text-white">{completedSets}/{totalSets}</p>
            <div className="mt-1 h-1 bg-zinc-700 rounded-full overflow-hidden">
              <div className="h-full bg-purple-500 rounded-full" style={{ width: `${setsPercent}%` }} />
            </div>
          </div>
        </motion.div>

        {/* Motivational Message */}
        <motion.div
          className="p-4 rounded-2xl bg-gradient-to-r from-green-500/20 to-emerald-500/20 border border-green-500/30 mb-8 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
        >
          <div className="flex items-center justify-center gap-2 text-green-400 mb-2">
            <Check size={20} />
            <span className="font-semibold">¡Gran trabajo!</span>
          </div>
          <p className="text-sm text-zinc-400">
            {completedExercises === totalExercises
              ? "Has completado todos los ejercicios. ¡Eres una máquina!"
              : completedExercises > totalExercises / 2
              ? "Vas por muy buen camino. ¡Sigue así!"
              : "Cada entrenamiento cuenta. ¡Mañana más!"}
          </p>
        </motion.div>

        {/* Continue Button */}
        <motion.button
          onClick={onContinue}
          className="w-full py-4 rounded-2xl bg-gradient-to-r from-green-500 to-emerald-500 text-white font-bold text-lg flex items-center justify-center gap-3 shadow-lg shadow-green-500/25 active:scale-95 transition-transform"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          whileHover={{ scale: 1.02 }}
        >
          <Trophy size={24} />
          Continuar
        </motion.button>
      </div>
    </motion.div>
  );
}
