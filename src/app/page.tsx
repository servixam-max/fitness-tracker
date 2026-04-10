"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Dumbbell, Flame, Timer, ChevronRight, Trophy, Droplets, Info, History, Settings } from "lucide-react";
import { WORKOUT_DAYS, TIPS } from "@/data/workouts";
import Link from "next/link";
import { useWorkoutHistory } from "@/hooks/useWorkoutHistory";
import HomeStats from "@/components/HomeStats";
import QuickActions from "@/components/QuickActions";
import ExerciseSearch from "@/components/ExerciseSearch";
import WaterTracker from "@/components/WaterTracker";
import BodyWeightTracker from "@/components/BodyWeightTracker";
import MacroTracker from "@/components/MacroTracker";

export default function Home() {
  const [selectedDay, setSelectedDay] = useState<number | null>(null);
  const [showTips, setShowTips] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const { history, streak, getTotalCalories, getTotalWorkouts } = useWorkoutHistory();

  // Calculate weekly workouts
  const getWeeklyWorkouts = () => {
    const now = new Date();
    const startOfWeek = new Date(now);
    startOfWeek.setDate(now.getDate() - now.getDay());
    startOfWeek.setHours(0, 0, 0, 0);
    
    return history.filter(h => new Date(h.date) >= startOfWeek).length;
  };

  const weeklyWorkouts = getWeeklyWorkouts();

  return (
    <div className="min-h-screen bg-gradient-to-b from-zinc-950 via-zinc-900 to-black">
      {/* Header */}
      <motion.header
        className="px-6 pt-12 pb-6"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="flex items-center gap-3 mb-2">
          <div className="p-3 rounded-2xl bg-gradient-to-br from-orange-500 to-red-600">
            <Dumbbell size={28} className="text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-bold">Fitness Tracker</h1>
            <p className="text-zinc-400 text-sm">Tu rutina de fuerza</p>
          </div>
        </div>
        
        <div className="flex items-center gap-2 mt-4">
          <Link href="/history">
            <motion.button
              className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 text-sm"
              whileTap={{ scale: 0.95 }}
            >
              <History size={16} />
              Historial
            </motion.button>
          </Link>
          <Link href="/settings">
            <motion.button
              className="p-2 rounded-full bg-white/10"
              whileTap={{ scale: 0.95 }}
            >
              <Settings size={18} />
            </motion.button>
          </Link>
          <motion.button
            onClick={() => setShowSearch(true)}
            className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 text-sm"
            whileTap={{ scale: 0.95 }}
          >
            <Info size={16} />
            Buscar
          </motion.button>
          <div className="flex items-center gap-1 px-3 py-1 rounded-full bg-blue-500/20 text-blue-400 text-sm">
            <Droplets size={14} />
            <span>3L agua</span>
          </div>
        </div>
      </motion.header>

      {/* Search Overlay */}
      <AnimatePresence>
        {showSearch && (
          <ExerciseSearch onClose={() => setShowSearch(false)} />
        )}
      </AnimatePresence>

      {/* Tips Section */}
      <AnimatePresence>
        {showTips && (
          <motion.div
            className="mx-6 mb-6"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
          >
            <div className="p-4 rounded-2xl bg-gradient-to-br from-zinc-800 to-zinc-900 border border-zinc-700">
              <h3 className="font-semibold mb-3 flex items-center gap-2">
                <Trophy size={18} className="text-yellow-400" />
                Consejos de Oro
              </h3>
              <ul className="space-y-2">
                {TIPS.map((tip, i) => (
                  <li key={i} className="text-sm text-zinc-300 flex items-start gap-2">
                    <span className="text-orange-400">•</span>
                    {tip}
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Home Stats */}
      <HomeStats
        totalWorkouts={getTotalWorkouts()}
        streak={streak}
        totalCalories={getTotalCalories()}
        weeklyWorkouts={weeklyWorkouts}
      />

      {/* Quick Actions */}
      <QuickActions />

      {/* Water Tracker */}
      <WaterTracker />

      {/* Body Weight Tracker */}
      <BodyWeightTracker />

      {/* Macro Tracker */}
      <MacroTracker />

      {/* Workout Days */}
      <div className="px-6 pb-24 space-y-4">
        <p className="text-zinc-400 text-sm mb-4">Selecciona tu entrenamiento:</p>
        
        {WORKOUT_DAYS.map((day, index) => (
          <Link href={`/workout/${day.id}`} key={day.id}>
            <motion.div
              className="group relative overflow-hidden rounded-3xl bg-gradient-to-br from-zinc-900 to-zinc-950 border border-zinc-800 p-6 cursor-pointer"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              {/* Background gradient on hover */}
              <div className={`absolute inset-0 bg-gradient-to-br ${day.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500`} />
              
              <div className="relative flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${day.color} flex items-center justify-center shadow-lg`}>
                    {index === 0 && <Dumbbell size={28} className="text-white" />}
                    {index === 1 && <Flame size={28} className="text-white" />}
                    {index === 2 && <Timer size={28} className="text-white" />}
                  </div>
                  
                  <div>
                    <h2 className="text-xl font-bold">{day.name}</h2>
                    <p className="text-zinc-400 text-sm">{day.subtitle}</p>
                    <div className="flex items-center gap-3 mt-1">
                      <span className="text-xs text-zinc-500">{day.exercises.length} ejercicios</span>
                      <span className="text-xs text-zinc-600">•</span>
                      <span className="text-xs text-zinc-500">{day.duration}</span>
                    </div>
                  </div>
                </div>
                
                <ChevronRight size={24} className="text-zinc-600 group-hover:text-white transition-colors" />
              </div>
            </motion.div>
          </Link>
        ))}
      </div>

      {/* Footer */}
      <footer className="fixed bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black via-black/90 to-transparent">
        <p className="text-center text-xs text-zinc-600">
          Rutina personalizada • 3 días semanales
        </p>
      </footer>
    </div>
  );
}
