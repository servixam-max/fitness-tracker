"use client";

import React from "react";
import { motion } from "framer-motion";
import { ArrowLeft, Calendar, Flame, Clock, Dumbbell, Trophy, Trash2, Award } from "lucide-react";
import { useRouter } from "next/navigation";
import { useWorkoutHistory } from "@/hooks/useWorkoutHistory";
import Achievements from "@/components/Achievements";

export default function HistoryPage() {
  const router = useRouter();
  const { history, streak, getTotalCalories, getTotalWorkouts, clearHistory } = useWorkoutHistory();

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));

    if (days === 0) return "Hoy";
    if (days === 1) return "Ayer";
    if (days < 7) return `Hace ${days} días`;
    
    return date.toLocaleDateString('es-ES', { 
      day: 'numeric', 
      month: 'short',
      year: 'numeric'
    });
  };

  const formatDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    return mins < 60 ? `${mins} min` : `${Math.floor(mins / 60)}h ${mins % 60}min`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-zinc-950 via-zinc-900 to-black pb-24">
      {/* Header */}
      <motion.header
        className="px-6 pt-12 pb-6"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="flex items-center gap-3 mb-6">
          <button 
            onClick={() => router.push('/')}
            className="p-2 rounded-full bg-zinc-800 text-zinc-400"
          >
            <ArrowLeft size={24} />
          </button>
          <div>
            <h1 className="text-2xl font-bold text-white">Historial</h1>
            <p className="text-zinc-400 text-sm">Tu progreso de entrenamientos</p>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          {/* Streak */}
          <motion.div
            className="p-4 rounded-2xl bg-gradient-to-br from-orange-500/20 to-red-500/20 border border-orange-500/30"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1 }}
          >
            <div className="flex items-center gap-2 mb-2">
              <Flame size={20} className="text-orange-400" />
              <span className="text-xs text-orange-300">Racha</span>
            </div>
            <p className="text-3xl font-bold text-white">{streak} días</p>
          </motion.div>

          {/* Total Workouts */}
          <motion.div
            className="p-4 rounded-2xl bg-zinc-800/50 border border-zinc-700"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
          >
            <div className="flex items-center gap-2 mb-2">
              <Trophy size={20} className="text-yellow-400" />
              <span className="text-xs text-zinc-400">Total</span>
            </div>
            <p className="text-3xl font-bold text-white">{getTotalWorkouts()}</p>
          </motion.div>

          {/* Total Calories */}
          <motion.div
            className="p-4 rounded-2xl bg-zinc-800/50 border border-zinc-700 col-span-2"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 }}
          >
            <div className="flex items-center gap-2 mb-2">
              <Flame size={20} className="text-orange-400" />
              <span className="text-xs text-zinc-400">Calorías quemadas</span>
            </div>
            <p className="text-3xl font-bold text-orange-400">~{getTotalCalories()} kcal</p>
          </motion.div>
        </div>

        {/* Achievements */}
        <Achievements 
          totalWorkouts={getTotalWorkouts()}
          streak={streak}
          totalCalories={getTotalCalories()}
          completedExercises={history.reduce((sum, h) => sum + h.completedExercises, 0)}
        />
      </motion.header>

      {/* History List */}
      <div className="px-6 space-y-4">
        <h2 className="text-lg font-semibold text-white mb-4">Entrenamientos recientes</h2>
        
        {history.length === 0 ? (
          <div className="text-center py-12">
            <Calendar size={48} className="mx-auto text-zinc-600 mb-4" />
            <p className="text-zinc-400">Aún no has completado ningún entrenamiento</p>
            <p className="text-zinc-500 text-sm mt-2">¡Empieza hoy mismo!</p>
          </div>
        ) : (
          history.map((session, index) => (
            <motion.div
              key={session.id}
              className="p-4 rounded-2xl bg-zinc-900/50 border border-zinc-800"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.05 }}
            >
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h3 className="font-bold text-white">{session.dayName}</h3>
                  <p className="text-xs text-zinc-500 flex items-center gap-1 mt-1">
                    <Calendar size={12} />
                    {formatDate(session.date)}
                  </p>
                </div>
                <div className="px-3 py-1 rounded-full bg-green-500/20 text-green-400 text-xs font-medium">
                  Completado
                </div>
              </div>

              <div className="grid grid-cols-3 gap-2">
                <div className="flex items-center gap-2 text-sm text-zinc-400">
                  <Dumbbell size={14} />
                  <span>{session.completedExercises}/{session.totalExercises}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-zinc-400">
                  <Clock size={14} />
                  <span>{formatDuration(session.durationSeconds)}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-zinc-400">
                  <Flame size={14} />
                  <span>{session.caloriesBurned} kcal</span>
                </div>
              </div>

              {/* Progress bar */}
              <div className="mt-3 h-1.5 bg-zinc-800 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-green-500 to-emerald-500"
                  style={{ width: `${(session.completedSets / session.totalSets) * 100}%` }}
                />
              </div>
            </motion.div>
          ))
        )}
      </div>

      {/* Clear History Button */}
      {history.length > 0 && (
        <div className="fixed bottom-24 left-0 right-0 p-6 flex justify-center">
          <button
            onClick={() => {
              if (confirm('¿Seguro que quieres borrar todo el historial?')) {
                clearHistory();
              }
            }}
            className="px-6 py-3 rounded-xl bg-red-500/20 text-red-400 border border-red-500/30 flex items-center gap-2"
          >
            <Trash2 size={18} />
            Borrar historial
          </button>
        </div>
      )}
    </div>
  );
}