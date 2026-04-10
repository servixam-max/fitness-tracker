"use client";

import React from "react";
import { motion } from "framer-motion";
import { Check, X } from "lucide-react";

interface WeeklyProgressProps {
  workoutHistory: Array<{ date: string }>;
}

export default function WeeklyProgress({ workoutHistory }: WeeklyProgressProps) {
  // Get last 7 days
  const today = new Date();
  const last7Days = Array.from({ length: 7 }, (_, i) => {
    const date = new Date(today);
    date.setDate(date.getDate() - (6 - i));
    return date;
  });

  const dayNames = ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'];
  const currentMonth = today.toLocaleDateString('es-ES', { month: 'short' });

  const isWorkoutDay = (date: Date) => {
    const dateStr = date.toISOString().split('T')[0];
    return workoutHistory.some(h => h.date.startsWith(dateStr));
  };

  const isToday = (date: Date) => {
    return date.toDateString() === today.toDateString();
  };

  const completedDays = last7Days.filter(isWorkoutDay).length;
  const weeklyGoal = 3; // 3 workouts per week
  const progressPercent = Math.min((completedDays / weeklyGoal) * 100, 100);

  return (
    <div className="p-6 bg-gradient-to-br from-zinc-900 to-black rounded-3xl border border-zinc-800">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-xl font-bold text-white">Esta Semana</h3>
          <p className="text-zinc-400 text-sm">
            {completedDays} de {weeklyGoal} entrenamientos
          </p>
        </div>
        <div className="text-right">
          <p className="text-2xl font-bold text-orange-400">{Math.round(progressPercent)}%</p>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="mb-6">
        <div className="h-3 bg-zinc-800 rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-gradient-to-r from-orange-500 to-red-500 rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${progressPercent}%` }}
            transition={{ duration: 0.5, delay: 0.2 }}
          />
        </div>
        {progressPercent >= 100 && (
          <motion.p
            className="text-center text-green-400 text-sm mt-2 font-semibold"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
          >
            🎉 ¡Objetivo semanal completado!
          </motion.p>
        )}
      </div>

      {/* Day Grid */}
      <div className="grid grid-cols-7 gap-2">
        {last7Days.map((date, index) => {
          const hasWorkout = isWorkoutDay(date);
          const isCurrentDay = isToday(date);
          const dayIndex = date.getDay();

          return (
            <motion.div
              key={index}
              className="flex flex-col items-center"
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.05 }}
            >
              {/* Day Name */}
              <p className="text-xs text-zinc-500 mb-2">{dayNames[dayIndex]}</p>

              {/* Day Circle */}
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all ${
                  hasWorkout
                    ? 'bg-gradient-to-br from-green-500 to-emerald-500 border-green-500 text-white'
                    : isCurrentDay
                    ? 'bg-gradient-to-br from-orange-500 to-red-500 border-orange-500 text-white animate-pulse'
                    : 'bg-zinc-800 border-zinc-700 text-zinc-500'
                }`}
              >
                {hasWorkout ? (
                  <Check size={20} strokeWidth={3} />
                ) : isCurrentDay ? (
                  <span className="text-sm font-bold">{date.getDate()}</span>
                ) : (
                  <X size={16} strokeWidth={3} />
                )}
              </div>

              {/* Date Number */}
              <p className={`text-xs mt-2 ${isCurrentDay ? 'text-orange-400 font-bold' : 'text-zinc-600'}`}>
                {date.getDate()} {currentMonth}
              </p>
            </motion.div>
          );
        })}
      </div>

      {/* Legend */}
      <div className="flex items-center justify-center gap-4 mt-6 pt-4 border-t border-zinc-800">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-gradient-to-br from-green-500 to-emerald-500" />
          <span className="text-xs text-zinc-400">Entrenado</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-gradient-to-br from-orange-500 to-red-500 animate-pulse" />
          <span className="text-xs text-zinc-400">Hoy</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-zinc-800 border border-zinc-700" />
          <span className="text-xs text-zinc-400">Pendiente</span>
        </div>
      </div>
    </div>
  );
}
