"use client";

import React from "react";
import { motion } from "framer-motion";
import { Trophy, Star, Flame, Target, Zap, Heart, Award, Medal } from "lucide-react";

interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  color: string;
  unlocked: boolean;
  progress: number;
  target: number;
}

interface AchievementsProps {
  totalWorkouts: number;
  streak: number;
  totalCalories: number;
  completedExercises: number;
}

export default function Achievements({ 
  totalWorkouts, 
  streak, 
  totalCalories,
  completedExercises 
}: AchievementsProps) {
  const achievements: Achievement[] = [
    {
      id: "first_workout",
      title: "Primer Entrenamiento",
      description: "Completa tu primer entrenamiento",
      icon: <Star size={24} />,
      color: "from-yellow-400 to-orange-500",
      unlocked: totalWorkouts >= 1,
      progress: Math.min(totalWorkouts, 1),
      target: 1,
    },
    {
      id: "week_warrior",
      title: "Guerrero Semanal",
      description: "Entrena 7 días seguidos",
      icon: <Flame size={24} />,
      color: "from-red-500 to-orange-600",
      unlocked: streak >= 7,
      progress: Math.min(streak, 7),
      target: 7,
    },
    {
      id: "calorie_crusher",
      title: "Quema Calorías",
      description: "Quema 1000 calorías totales",
      icon: <Zap size={24} />,
      color: "from-purple-500 to-pink-600",
      unlocked: totalCalories >= 1000,
      progress: Math.min(totalCalories, 1000),
      target: 1000,
    },
    {
      id: "exercise_master",
      title: "Maestro de Ejercicios",
      description: "Completa 50 ejercicios",
      icon: <Target size={24} />,
      color: "from-blue-500 to-cyan-600",
      unlocked: completedExercises >= 50,
      progress: Math.min(completedExercises, 50),
      target: 50,
    },
    {
      id: "month_master",
      title: "Maestro Mensual",
      description: "Entrena 30 días",
      icon: <Award size={24} />,
      color: "from-green-500 to-emerald-600",
      unlocked: totalWorkouts >= 30,
      progress: Math.min(totalWorkouts, 30),
      target: 30,
    },
    {
      id: "heart_hero",
      title: "Héroe del Corazón",
      description: "Quema 5000 calorías",
      icon: <Heart size={24} />,
      color: "from-red-600 to-pink-700",
      unlocked: totalCalories >= 5000,
      progress: Math.min(totalCalories, 5000),
      target: 5000,
    },
    {
      id: "legend",
      title: "Leyenda Fitness",
      description: "Completa 100 entrenamientos",
      icon: <Trophy size={24} />,
      color: "from-amber-400 to-yellow-600",
      unlocked: totalWorkouts >= 100,
      progress: Math.min(totalWorkouts, 100),
      target: 100,
    },
    {
      id: "streak_king",
      title: "Rey de la Racha",
      description: "30 días consecutivos",
      icon: <Medal size={24} />,
      color: "from-indigo-500 to-purple-700",
      unlocked: streak >= 30,
      progress: Math.min(streak, 30),
      target: 30,
    },
  ];

  const unlockedCount = achievements.filter(a => a.unlocked).length;

  return (
    <div className="p-6 bg-gradient-to-br from-zinc-900 to-black rounded-3xl border border-zinc-800">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-2xl font-bold text-white">Logros</h3>
          <p className="text-zinc-400 text-sm">
            {unlockedCount} de {achievements.length} desbloqueados
          </p>
        </div>
        <div className="px-4 py-2 rounded-full bg-gradient-to-r from-orange-500 to-red-500 text-white font-bold text-sm">
          {Math.round((unlockedCount / achievements.length) * 100)}%
        </div>
      </div>

      {/* Achievement Grid */}
      <div className="grid grid-cols-2 gap-4">
        {achievements.map((achievement) => (
          <motion.div
            key={achievement.id}
            className={`relative p-4 rounded-2xl border transition-all ${
              achievement.unlocked
                ? `bg-gradient-to-br ${achievement.color} border-transparent shadow-lg`
                : "bg-zinc-800/30 border-zinc-700 opacity-60"
            }`}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            whileHover={{ scale: achievement.unlocked ? 1.05 : 1 }}
          >
            {/* Icon */}
            <div className={`mb-3 ${achievement.unlocked ? "text-white" : "text-zinc-500"}`}>
              {achievement.icon}
            </div>

            {/* Title */}
            <h4 className={`font-bold text-sm mb-1 ${achievement.unlocked ? "text-white" : "text-zinc-400"}`}>
              {achievement.title}
            </h4>

            {/* Description */}
            <p className={`text-xs mb-3 ${achievement.unlocked ? "text-white/80" : "text-zinc-500"}`}>
              {achievement.description}
            </p>

            {/* Progress Bar */}
            <div className="relative h-1.5 bg-black/30 rounded-full overflow-hidden">
              <div
                className={`absolute inset-y-0 left-0 rounded-full transition-all ${
                  achievement.unlocked ? "bg-white/50" : "bg-zinc-600"
                }`}
                style={{ width: `${(achievement.progress / achievement.target) * 100}%` }}
              />
            </div>

            {/* Progress Text */}
            <p className={`text-xs mt-2 text-right ${achievement.unlocked ? "text-white/70" : "text-zinc-500"}`}>
              {achievement.progress} / {achievement.target}
            </p>

            {/* Unlocked Badge */}
            {achievement.unlocked && (
              <div className="absolute top-2 right-2">
                <div className="w-6 h-6 rounded-full bg-white/30 backdrop-blur flex items-center justify-center">
                  <Trophy size={12} className="text-white" />
                </div>
              </div>
            )}
          </motion.div>
        ))}
      </div>
    </div>
  );
}
