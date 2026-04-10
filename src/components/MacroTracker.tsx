"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Apple, Utensils, Plus, Trash2, TrendingUp, Target } from "lucide-react";

interface MacroEntry {
  id: string;
  name: string;
  calories: number;
  protein: number;
  carbs: number;
  fats: number;
  timestamp: number;
}

interface MacroGoals {
  calories: number;
  protein: number;
  carbs: number;
  fats: number;
}

const DEFAULT_GOALS: MacroGoals = {
  calories: 2500,
  protein: 180,
  carbs: 250,
  fats: 80,
};

export default function MacroTracker() {
  const [entries, setEntries] = useState<MacroEntry[]>([]);
  const [showAdd, setShowAdd] = useState(false);
  const [newMeal, setNewMeal] = useState({
    name: "",
    calories: "",
    protein: "",
    carbs: "",
    fats: "",
  });

  // Load from localStorage
  useEffect(() => {
    const today = new Date().toDateString();
    const stored = localStorage.getItem('macro-tracker');
    if (stored) {
      const data = JSON.parse(stored);
      const todayEntries = data.filter((e: MacroEntry) => 
        new Date(e.timestamp).toDateString() === today
      );
      setEntries(todayEntries);
    }
  }, []);

  // Save to localStorage
  useEffect(() => {
    localStorage.setItem('macro-tracker', JSON.stringify(entries));
  }, [entries]);

  const totals = entries.reduce(
    (acc, e) => ({
      calories: acc.calories + e.calories,
      protein: acc.protein + e.protein,
      carbs: acc.carbs + e.carbs,
      fats: acc.fats + e.fats,
    }),
    { calories: 0, protein: 0, carbs: 0, fats: 0 }
  );

  const addMeal = () => {
    const calories = parseInt(newMeal.calories) || 0;
    const protein = parseInt(newMeal.protein) || 0;
    const carbs = parseInt(newMeal.carbs) || 0;
    const fats = parseInt(newMeal.fats) || 0;

    if (!calories && !protein && !carbs && !fats) return;

    const entry: MacroEntry = {
      id: Date.now().toString(),
      name: newMeal.name || 'Sin nombre',
      calories,
      protein,
      carbs,
      fats,
      timestamp: Date.now(),
    };

    setEntries(prev => [...prev, entry]);
    setNewMeal({ name: "", calories: "", protein: "", carbs: "", fats: "" });
    setShowAdd(false);
  };

  const removeEntry = (id: string) => {
    setEntries(prev => prev.filter(e => e.id !== id));
  };

  const formatTime = (timestamp: number) => {
    return new Date(timestamp).toLocaleTimeString('es-ES', { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  const getProgressColor = (current: number, goal: number) => {
    const percent = (current / goal) * 100;
    if (percent > 110) return 'text-red-400';
    if (percent >= 90) return 'text-green-400';
    return 'text-yellow-400';
  };

  const macros = [
    { label: 'Calorías', value: totals.calories, goal: DEFAULT_GOALS.calories, unit: 'kcal', color: 'from-orange-500 to-red-500' },
    { label: 'Proteína', value: totals.protein, goal: DEFAULT_GOALS.protein, unit: 'g', color: 'from-blue-500 to-cyan-500' },
    { label: 'Carbos', value: totals.carbs, goal: DEFAULT_GOALS.carbs, unit: 'g', color: 'from-green-500 to-emerald-500' },
    { label: 'Grasas', value: totals.fats, goal: DEFAULT_GOALS.fats, unit: 'g', color: 'from-yellow-500 to-amber-500' },
  ];

  return (
    <div className="p-6 bg-gradient-to-br from-orange-900/50 to-red-900/50 rounded-3xl border border-orange-500/30">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="p-3 rounded-2xl bg-orange-500/30">
            <Apple size={24} className="text-orange-400" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-white">Nutrición</h3>
            <p className="text-orange-300 text-sm">
              {totals.calories} / {DEFAULT_GOALS.calories} kcal
            </p>
          </div>
        </div>
        <button
          onClick={() => setShowAdd(true)}
          className="p-2 rounded-xl bg-orange-500/30 text-orange-300 hover:bg-orange-500/40"
        >
          <Plus size={18} />
        </button>
      </div>

      {/* Add Meal Modal */}
      <AnimatePresence>
        {showAdd && (
          <motion.div
            className="mb-4 p-4 rounded-2xl bg-zinc-800/50 border border-zinc-700"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
          >
            <div className="space-y-3">
              <input
                type="text"
                value={newMeal.name}
                onChange={(e) => setNewMeal(prev => ({ ...prev, name: e.target.value }))}
                placeholder="Nombre (ej: Desayuno)"
                className="w-full px-4 py-3 rounded-xl bg-zinc-900 border border-zinc-700 text-white placeholder-zinc-500 focus:border-orange-500 focus:outline-none"
              />
              <div className="grid grid-cols-2 gap-3">
                <input
                  type="number"
                  value={newMeal.calories}
                  onChange={(e) => setNewMeal(prev => ({ ...prev, calories: e.target.value }))}
                  placeholder="Calorías"
                  className="px-4 py-3 rounded-xl bg-zinc-900 border border-zinc-700 text-white placeholder-zinc-500 focus:border-orange-500 focus:outline-none"
                />
                <input
                  type="number"
                  value={newMeal.protein}
                  onChange={(e) => setNewMeal(prev => ({ ...prev, protein: e.target.value }))}
                  placeholder="Proteína (g)"
                  className="px-4 py-3 rounded-xl bg-zinc-900 border border-zinc-700 text-white placeholder-zinc-500 focus:border-blue-500 focus:outline-none"
                />
                <input
                  type="number"
                  value={newMeal.carbs}
                  onChange={(e) => setNewMeal(prev => ({ ...prev, carbs: e.target.value }))}
                  placeholder="Carbos (g)"
                  className="px-4 py-3 rounded-xl bg-zinc-900 border border-zinc-700 text-white placeholder-zinc-500 focus:border-green-500 focus:outline-none"
                />
                <input
                  type="number"
                  value={newMeal.fats}
                  onChange={(e) => setNewMeal(prev => ({ ...prev, fats: e.target.value }))}
                  placeholder="Grasas (g)"
                  className="px-4 py-3 rounded-xl bg-zinc-900 border border-zinc-700 text-white placeholder-zinc-500 focus:border-yellow-500 focus:outline-none"
                />
              </div>
              <div className="flex gap-2">
                <button
                  onClick={addMeal}
                  className="flex-1 py-3 rounded-xl bg-orange-500 text-white font-semibold hover:bg-orange-600"
                >
                  Añadir
                </button>
                <button
                  onClick={() => setShowAdd(false)}
                  className="px-4 py-3 rounded-xl bg-zinc-700 text-zinc-400 hover:bg-zinc-600"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Macro Progress Bars */}
      <div className="space-y-4 mb-4">
        {macros.map((macro) => {
          const percent = Math.min((macro.value / macro.goal) * 100, 100);
          const isOver = macro.value > macro.goal * 1.1;
          
          return (
            <div key={macro.label}>
              <div className="flex items-center justify-between mb-1">
                <span className="text-sm text-zinc-300">{macro.label}</span>
                <span className={`text-sm font-bold ${getProgressColor(macro.value, macro.goal)}`}>
                  {macro.value}{macro.unit} / {macro.goal}{macro.unit}
                </span>
              </div>
              <div className="h-2 bg-zinc-800 rounded-full overflow-hidden">
                <motion.div
                  className={`h-full bg-gradient-to-r ${macro.color} rounded-full`}
                  initial={{ width: 0 }}
                  animate={{ width: `${percent}%` }}
                  transition={{ duration: 0.5 }}
                />
              </div>
              {isOver && (
                <p className="text-xs text-red-400 mt-1">⚠️ Por encima del objetivo</p>
              )}
            </div>
          );
        })}
      </div>

      {/* Meal History */}
      {entries.length > 0 && (
        <div>
          <h4 className="text-sm font-semibold text-orange-300 mb-2 flex items-center gap-2">
            <Utensils size={14} />
            Comidas de hoy
          </h4>
          <div className="space-y-2 max-h-40 overflow-y-auto">
            <AnimatePresence>
              {entries.slice().reverse().map((entry, index) => (
                <motion.div
                  key={entry.id}
                  className="flex items-center justify-between p-3 rounded-xl bg-zinc-800/30"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <div>
                    <p className="text-white font-semibold text-sm">{entry.name}</p>
                    <p className="text-zinc-500 text-xs">
                      {entry.calories} kcal • P: {entry.protein}g • C: {entry.carbs}g • G: {entry.fats}g
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-zinc-600 text-xs">{formatTime(entry.timestamp)}</span>
                    <button
                      onClick={() => removeEntry(entry.id)}
                      className="p-2 rounded-lg hover:bg-red-500/20"
                    >
                      <Trash2 size={14} className="text-red-400" />
                    </button>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>
      )}

      {/* Empty state */}
      {entries.length === 0 && (
        <div className="text-center py-8">
          <Apple size={48} className="mx-auto text-orange-700 mb-3" />
          <p className="text-zinc-500 text-sm">Sin comidas registradas</p>
          <p className="text-zinc-600 text-xs mt-1">Añade tu primera comida</p>
        </div>
      )}
    </div>
  );
}
