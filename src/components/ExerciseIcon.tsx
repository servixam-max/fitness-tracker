"use client";

import React from "react";

interface ExerciseIconProps {
  exerciseId: string;
  className?: string;
  size?: number;
}

const EXERCISE_META: Record<string, { emoji: string; name: string; color: string }> = {
  "d1e1": { emoji: "🏋️", name: "Press Banca", color: "from-blue-500 to-cyan-500" },
  "d1e2": { emoji: "🦅", name: "Aperturas", color: "from-blue-400 to-cyan-400" },
  "d1e3": { emoji: "🔄", name: "Pullovers", color: "from-blue-600 to-purple-500" },
  "d1e4": { emoji: "💪", name: "Remo", color: "from-emerald-500 to-teal-500" },
  "d1e5": { emoji: "⬆️", name: "Remo Alto", color: "from-emerald-400 to-teal-400" },
  "d1e6": { emoji: "⬆️", name: "Encogimientos", color: "from-emerald-600 to-teal-600" },
  "d1e7": { emoji: "🦾", name: "Press Hombros", color: "from-violet-500 to-purple-500" },
  "d1e8": { emoji: "🦅", name: "Laterales", color: "from-violet-400 to-purple-400" },
  "d1e9": { emoji: "💪", name: "Curl Bíceps", color: "from-amber-500 to-orange-500" },
  "d1e10": { emoji: "💪", name: "Curl Conc.", color: "from-amber-600 to-orange-400" },
  "d1e11": { emoji: "🦾", name: "Copa Tríceps", color: "from-red-500 to-pink-500" },
  "d1e12": { emoji: "🦾", name: "Ext. Tríceps", color: "from-red-400 to-pink-400" },
  "d2e1": { emoji: "🦵", name: "Goblet Squat", color: "from-orange-500 to-red-500" },
  "d2e2": { emoji: "🦵", name: "Búlgara", color: "from-orange-600 to-red-400" },
  "d2e3": { emoji: "📉", name: "Peso Muerto", color: "from-amber-600 to-orange-600" },
  "d2e4": { emoji: "🚶", name: "Estocadas", color: "from-orange-400 to-amber-500" },
  "d2e5": { emoji: "🦵", name: "PM 1 Pierna", color: "from-amber-500 to-red-500" },
  "d2e6": { emoji: "⚡", name: "Jump Squat", color: "from-yellow-500 to-orange-500" },
  "d2e7": { emoji: "🦶", name: "Gemelos", color: "from-amber-400 to-yellow-500" },
  "d2e8": { emoji: "🍑", name: "Glúteo", color: "from-pink-500 to-rose-500" },
  "d2e9": { emoji: "🔥", name: "Crunch", color: "from-green-500 to-emerald-500" },
  "d2e10": { emoji: "⏱️", name: "Plancha", color: "from-green-600 to-emerald-400" },
  "d2e11": { emoji: "🔄", name: "Russian Twist", color: "from-green-400 to-lime-500" },
  "d3e1": { emoji: "⚡", name: "Thruster", color: "from-orange-500 to-red-600" },
  "d3e2": { emoji: "🏋️", name: "Burpee DB", color: "from-red-500 to-orange-600" },
  "d3e3": { emoji: "💪", name: "Clean&Press", color: "from-violet-500 to-red-500" },
  "d3e4": { emoji: "🔄", name: "Swing", color: "from-amber-600 to-red-600" },
  "d3e5": { emoji: "💪", name: "Renegade", color: "from-emerald-500 to-blue-500" },
  "d3e6": { emoji: "⚡", name: "Squat+Press", color: "from-orange-400 to-purple-500" },
  "d3e7": { emoji: "🏃", name: "Mountain Cl.", color: "from-green-500 to-yellow-500" },
  "d3e8": { emoji: "⭐", name: "Jumping Jack", color: "from-red-500 to-orange-500" },
  "d3e9": { emoji: "💪", name: "Plank Row", color: "from-emerald-400 to-teal-500" },
  "d3e10": { emoji: "🔥", name: "Burpees!", color: "from-red-600 to-orange-600" },
};

export default function ExerciseIcon({ exerciseId, className = "", size = 64 }: ExerciseIconProps) {
  const meta = EXERCISE_META[exerciseId] || { emoji: "🏋️", name: "Ejercicio", color: "from-zinc-500 to-zinc-600" };

  return (
    <div
      className={`relative bg-gradient-to-br ${meta.color} rounded-xl flex items-center justify-center overflow-hidden ${className}`}
      style={{ width: size, height: size }}
    >
      <span style={{ fontSize: size * 0.5 }} role="img" aria-label={meta.name}>
        {meta.emoji}
      </span>
    </div>
  );
}