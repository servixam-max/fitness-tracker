"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Droplets, Plus, Minus, Trash2, Trophy } from "lucide-react";

const GOAL_ML = 3000; // 3L daily goal
const GLASS_ML = 250; // Standard glass

interface WaterEntry {
  id: string;
  amount: number;
  timestamp: number;
}

export default function WaterTracker() {
  const [entries, setEntries] = useState<WaterEntry[]>([]);
  const [showAdd, setShowAdd] = useState(false);

  // Load from localStorage
  useEffect(() => {
    const today = new Date().toDateString();
    const stored = localStorage.getItem('water-tracker');
    if (stored) {
      const data = JSON.parse(stored);
      // Filter only today's entries
      const todayEntries = data.filter((e: WaterEntry) => 
        new Date(e.timestamp).toDateString() === today
      );
      setEntries(todayEntries);
    }
  }, []);

  // Save to localStorage
  useEffect(() => {
    localStorage.setItem('water-tracker', JSON.stringify(entries));
  }, [entries]);

  const totalMl = entries.reduce((sum, e) => sum + e.amount, 0);
  const progressPercent = Math.min((totalMl / GOAL_ML) * 100, 100);
  const glasses = Math.round(totalMl / GLASS_ML);

  const addWater = (amount: number) => {
    const entry: WaterEntry = {
      id: Date.now().toString(),
      amount,
      timestamp: Date.now(),
    };
    setEntries(prev => [...prev, entry]);
  };

  const removeEntry = (id: string) => {
    setEntries(prev => prev.filter(e => e.id !== id));
  };

  const resetToday = () => {
    setEntries([]);
  };

  const formatTime = (timestamp: number) => {
    return new Date(timestamp).toLocaleTimeString('es-ES', { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  const quickAmounts = [250, 500, 750];

  return (
    <div className="p-6 bg-gradient-to-br from-blue-900/50 to-cyan-900/50 rounded-3xl border border-blue-500/30">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="p-3 rounded-2xl bg-blue-500/30">
            <Droplets size={24} className="text-blue-400" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-white">Agua</h3>
            <p className="text-blue-300 text-sm">
              {totalMl}ml / {GOAL_ML}ml
            </p>
          </div>
        </div>
        <button
          onClick={resetToday}
          className="p-2 rounded-xl bg-red-500/20 text-red-400 hover:bg-red-500/30"
        >
          <Trash2 size={18} />
        </button>
      </div>

      {/* Progress Circle */}
      <div className="flex justify-center mb-6">
        <div className="relative w-40 h-40">
          {/* Background circle */}
          <svg className="w-full h-full transform -rotate-90">
            <circle
              cx="80"
              cy="80"
              r="70"
              stroke="currentColor"
              strokeWidth="12"
              fill="none"
              className="text-blue-900/50"
            />
            {/* Progress circle */}
            <motion.circle
              cx="80"
              cy="80"
              r="70"
              stroke="currentColor"
              strokeWidth="12"
              fill="none"
              strokeDasharray={440}
              strokeDashoffset={440 - (progressPercent / 100) * 440}
              strokeLinecap="round"
              className="text-blue-400"
              initial={{ strokeDashoffset: 440 }}
              animate={{ strokeDashoffset: 440 - (progressPercent / 100) * 440 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            />
          </svg>
          
          {/* Center content */}
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-4xl font-bold text-white">{glasses}</span>
            <span className="text-xs text-blue-300">vasos</span>
          </div>
        </div>
      </div>

      {/* Goal reached badge */}
      {progressPercent >= 100 && (
        <motion.div
          className="mb-6 p-4 rounded-2xl bg-gradient-to-r from-blue-500/30 to-cyan-500/30 border border-blue-400/30 text-center"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
        >
          <Trophy size={24} className="mx-auto text-yellow-400 mb-2" />
          <p className="text-white font-semibold">¡Objetivo alcanzado! 🎉</p>
          <p className="text-blue-300 text-sm">Hidratación perfecta</p>
        </motion.div>
      )}

      {/* Quick add buttons */}
      <div className="grid grid-cols-3 gap-3 mb-4">
        {quickAmounts.map((amount) => (
          <motion.button
            key={amount}
            onClick={() => addWater(amount)}
            className="py-3 rounded-xl bg-blue-500/20 text-blue-300 font-semibold hover:bg-blue-500/30 transition-colors"
            whileTap={{ scale: 0.95 }}
          >
            +{amount}ml
          </motion.button>
        ))}
      </div>

      {/* Today's entries */}
      {entries.length > 0 && (
        <div className="mt-4">
          <h4 className="text-sm font-semibold text-blue-300 mb-2">Hoy</h4>
          <div className="space-y-2 max-h-32 overflow-y-auto">
            <AnimatePresence>
              {entries.slice().reverse().map((entry) => (
                <motion.div
                  key={entry.id}
                  className="flex items-center justify-between p-2 rounded-lg bg-blue-900/30"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                >
                  <div className="flex items-center gap-2">
                    <Droplets size={14} className="text-blue-400" />
                    <span className="text-white text-sm">{entry.amount}ml</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-blue-300 text-xs">{formatTime(entry.timestamp)}</span>
                    <button
                      onClick={() => removeEntry(entry.id)}
                      className="p-1 rounded hover:bg-red-500/20"
                    >
                      <Minus size={14} className="text-red-400" />
                    </button>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>
      )}
    </div>
  );
}
