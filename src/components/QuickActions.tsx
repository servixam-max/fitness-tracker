"use client";

import React from "react";
import { motion } from "framer-motion";
import { Play, History, TrendingUp, Award, Settings, Volume2, Dumbbell } from "lucide-react";
import Link from "next/link";

interface QuickActionsProps {
  onQuickStart?: () => void;
}

export default function QuickActions({ onQuickStart }: QuickActionsProps) {
  const actions = [
    {
      icon: <Play size={24} />,
      label: "Inicio Rápido",
      description: "Empezar Día 1",
      color: "from-orange-500 to-red-500",
      href: "/workout/day1",
      onClick: onQuickStart,
    },
    {
      icon: <History size={24} />,
      label: "Historial",
      description: "Ver progreso",
      color: "from-blue-500 to-cyan-500",
      href: "/history",
    },
    {
      icon: <TrendingUp size={24} />,
      label: "Pesos",
      description: "Registrar peso",
      color: "from-green-500 to-emerald-500",
      href: "/workout/day1",
    },
    {
      icon: <Award size={24} />,
      label: "Logros",
      description: "Ver medallas",
      color: "from-purple-500 to-pink-500",
      href: "/history",
    },
    {
      icon: <Volume2 size={24} />,
      label: "Audio",
      description: "Configurar sonido",
      color: "from-yellow-500 to-amber-500",
      href: "/settings",
    },
    {
      icon: <Settings size={24} />,
      label: "Ajustes",
      description: "Preferencias",
      color: "from-zinc-600 to-zinc-700",
      href: "/settings",
    },
  ];

  return (
    <div className="px-6 mb-6">
      <h2 className="text-lg font-semibold text-white mb-4">Accesos Rápidos</h2>
      
      <div className="grid grid-cols-3 gap-3">
        {actions.map((action, index) => (
          <Link href={action.href} key={action.label} onClick={action.onClick}>
            <motion.div
              className={`p-4 rounded-2xl bg-gradient-to-br ${action.color} cursor-pointer shadow-lg`}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.05 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {/* Icon */}
              <div className="text-white mb-2">
                {action.icon}
              </div>

              {/* Label */}
              <p className="text-white font-bold text-sm mb-0.5">
                {action.label}
              </p>

              {/* Description */}
              <p className="text-white/70 text-xs">
                {action.description}
              </p>
            </motion.div>
          </Link>
        ))}
      </div>
    </div>
  );
}
