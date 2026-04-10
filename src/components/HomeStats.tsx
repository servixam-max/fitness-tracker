"use client";

import React from "react";
import { motion } from "framer-motion";
import { Flame, Trophy, Clock, TrendingUp, Calendar, Zap } from "lucide-react";

interface HomeStatsProps {
  totalWorkouts: number;
  streak: number;
  totalCalories: number;
  weeklyWorkouts: number;
}

export default function HomeStats({ 
  totalWorkouts, 
  streak, 
  totalCalories,
  weeklyWorkouts 
}: HomeStatsProps) {
  const stats = [
    {
      icon: <Flame size={20} />,
      label: "Racha actual",
      value: `${streak} días`,
      color: "from-orange-500 to-red-500",
      bg: "from-orange-500/20 to-red-500/20",
      border: "border-orange-500/30",
      text: "text-orange-400",
    },
    {
      icon: <Trophy size={20} />,
      label: "Entrenamientos",
      value: totalWorkouts.toString(),
      color: "from-yellow-500 to-amber-500",
      bg: "from-yellow-500/20 to-amber-500/20",
      border: "border-yellow-500/30",
      text: "text-yellow-400",
    },
    {
      icon: <Zap size={20} />,
      label: "Calorías",
      value: `~${totalCalories}`,
      color: "from-purple-500 to-pink-500",
      bg: "from-purple-500/20 to-pink-500/20",
      border: "border-purple-500/30",
      text: "text-purple-400",
    },
    {
      icon: <Calendar size={20} />,
      label: "Esta semana",
      value: `${weeklyWorkouts}/3`,
      color: "from-green-500 to-emerald-500",
      bg: "from-green-500/20 to-emerald-500/20",
      border: "border-green-500/30",
      text: "text-green-400",
    },
  ];

  return (
    <div className="px-6 mb-6">
      <h2 className="text-lg font-semibold text-white mb-4">Tu Progreso</h2>
      
      <div className="grid grid-cols-2 gap-3">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.label}
            className={`p-4 rounded-2xl bg-gradient-to-br ${stat.bg} border ${stat.border} backdrop-blur-sm`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ scale: 1.02 }}
          >
            {/* Icon */}
            <div className={`mb-2 ${stat.text}`}>
              {stat.icon}
            </div>

            {/* Value */}
            <p className="text-2xl font-bold text-white mb-1">
              {stat.value}
            </p>

            {/* Label */}
            <p className="text-xs text-zinc-400">
              {stat.label}
            </p>
          </motion.div>
        ))}
      </div>

      {/* Quick Tip */}
      <motion.div
        className="mt-4 p-4 rounded-2xl bg-gradient-to-r from-blue-500/20 to-cyan-500/20 border border-blue-500/30"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.4 }}
      >
        <div className="flex items-start gap-3">
          <div className="p-2 rounded-xl bg-blue-500/30">
            <TrendingUp size={16} className="text-blue-400" />
          </div>
          <div>
            <p className="text-sm font-semibold text-blue-300 mb-1">
              Consejo del día
            </p>
            <p className="text-xs text-zinc-400 leading-relaxed">
              {streak >= 3 
                ? "¡Vas genial! Mantén la constancia para ver resultados reales." 
                : "Empieza hoy. Solo 30 minutos pueden cambiar tu día."}
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
