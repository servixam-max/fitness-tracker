"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Dumbbell, ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";

export default function SplashPage() {
  const router = useRouter();
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    setShowContent(true);
    const timer = setTimeout(() => {
      router.push('/');
    }, 2500);
    return () => clearTimeout(timer);
  }, [router]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-zinc-950 via-zinc-900 to-black flex flex-col items-center justify-center p-6">
      {/* Logo Animation */}
      <motion.div
        className="mb-8"
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.6, type: "spring" }}
      >
        <div className="relative">
          {/* Glow effect */}
          <div className="absolute inset-0 bg-gradient-to-br from-orange-500 to-red-600 blur-3xl opacity-30 rounded-full" />
          
          {/* Main logo */}
          <div className="relative p-8 rounded-3xl bg-gradient-to-br from-orange-500 to-red-600 shadow-2xl shadow-orange-500/30">
            <Dumbbell size={80} className="text-white" />
          </div>
        </div>
      </motion.div>

      {/* Title */}
      <motion.div
        className="text-center mb-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.6 }}
      >
        <h1 className="text-4xl font-bold text-white mb-2">Fitness Tracker</h1>
        <p className="text-xl text-zinc-400">Tu rutina de fuerza</p>
      </motion.div>

      {/* Features */}
      <motion.div
        className="flex flex-col items-center gap-3 mb-12"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6, duration: 0.6 }}
      >
        <div className="flex items-center gap-2 text-zinc-400">
          <span className="w-2 h-2 rounded-full bg-orange-500" />
          <span>3 días de entrenamiento</span>
        </div>
        <div className="flex items-center gap-2 text-zinc-400">
          <span className="w-2 h-2 rounded-full bg-blue-500" />
          <span>Sesión guiada con voz</span>
        </div>
        <div className="flex items-center gap-2 text-zinc-400">
          <span className="w-2 h-2 rounded-full bg-green-500" />
          <span>Seguimiento de progreso</span>
        </div>
      </motion.div>

      {/* Loading indicator */}
      <motion.div
        className="flex items-center gap-3 text-zinc-500"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.9 }}
      >
        <div className="flex gap-1">
          <motion.div
            className="w-2 h-2 rounded-full bg-orange-500"
            animate={{ y: [0, -8, 0] }}
            transition={{ duration: 0.6, repeat: Infinity, delay: 0 }}
          />
          <motion.div
            className="w-2 h-2 rounded-full bg-orange-500"
            animate={{ y: [0, -8, 0] }}
            transition={{ duration: 0.6, repeat: Infinity, delay: 0.2 }}
          />
          <motion.div
            className="w-2 h-2 rounded-full bg-orange-500"
            animate={{ y: [0, -8, 0] }}
            transition={{ duration: 0.6, repeat: Infinity, delay: 0.4 }}
          />
        </div>
        <span className="text-sm">Cargando...</span>
      </motion.div>

      {/* Skip button */}
      <motion.button
        onClick={() => router.push('/')}
        className="mt-8 px-6 py-3 rounded-full bg-white/10 text-white flex items-center gap-2 hover:bg-white/20 transition-colors"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        whileTap={{ scale: 0.95 }}
      >
        Saltar
        <ArrowRight size={18} />
      </motion.button>
    </div>
  );
}