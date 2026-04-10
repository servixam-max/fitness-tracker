"use client";

import React, { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Scale, TrendingDown, TrendingUp, Minus, Plus, Trash2, Calendar } from "lucide-react";

interface WeightEntry {
  id: string;
  weight: number;
  date: string; // YYYY-MM-DD
  timestamp: number;
}

export default function BodyWeightTracker() {
  const [entries, setEntries] = useState<WeightEntry[]>([]);
  const [showAdd, setShowAdd] = useState(false);
  const [newWeight, setNewWeight] = useState("");

  // Load from localStorage
  useEffect(() => {
    const stored = localStorage.getItem('body-weight-tracker');
    if (stored) {
      const data = JSON.parse(stored);
      setEntries(data.sort((a: WeightEntry, b: WeightEntry) => b.timestamp - a.timestamp));
    }
  }, []);

  // Save to localStorage
  useEffect(() => {
    localStorage.setItem('body-weight-tracker', JSON.stringify(entries));
  }, [entries]);

  const currentWeight = entries.length > 0 ? entries[0].weight : null;
  const previousWeight = entries.length > 1 ? entries[1].weight : null;
  
  const weightChange = currentWeight && previousWeight 
    ? currentWeight - previousWeight 
    : 0;

  const TrendIcon = weightChange > 0 ? TrendingUp : weightChange < 0 ? TrendingDown : Minus;
  const trendColor = weightChange > 0 ? 'text-red-400' : weightChange < 0 ? 'text-green-400' : 'text-zinc-400';

  const addWeight = () => {
    const weight = parseFloat(newWeight);
    if (!weight || weight <= 0) return;

    const today = new Date().toISOString().split('T')[0];
    
    // Replace today's entry if exists
    const existingTodayIndex = entries.findIndex(e => e.date === today);
    if (existingTodayIndex >= 0) {
      const updated = [...entries];
      updated[existingTodayIndex] = {
        ...updated[existingTodayIndex],
        weight,
        timestamp: Date.now(),
      };
      setEntries(updated.sort((a, b) => b.timestamp - a.timestamp));
    } else {
      const entry: WeightEntry = {
        id: Date.now().toString(),
        weight,
        date: today,
        timestamp: Date.now(),
      };
      setEntries(prev => [entry, ...prev].sort((a, b) => b.timestamp - a.timestamp));
    }
    
    setNewWeight("");
    setShowAdd(false);
  };

  const removeEntry = (id: string) => {
    setEntries(prev => prev.filter(e => e.id !== id));
  };

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr + 'T00:00:00');
    const today = new Date().toDateString();
    const yesterday = new Date(Date.now() - 86400000).toDateString();
    
    if (date.toDateString() === today) return 'Hoy';
    if (date.toDateString() === yesterday) return 'Ayer';
    
    return date.toLocaleDateString('es-ES', { day: 'numeric', month: 'short' });
  };

  // Calculate stats
  const stats = useMemo(() => {
    if (entries.length < 2) return null;
    
    const sorted = [...entries].sort((a, b) => a.timestamp - b.timestamp);
    const startWeight = sorted[0].weight;
    const endWeight = sorted[sorted.length - 1].weight;
    const totalChange = endWeight - startWeight;
    
    const maxWeight = Math.max(...entries.map(e => e.weight));
    const minWeight = Math.min(...entries.map(e => e.weight));
    
    return { totalChange, maxWeight, minWeight };
  }, [entries]);

  return (
    <div className="p-6 bg-gradient-to-br from-purple-900/50 to-pink-900/50 rounded-3xl border border-purple-500/30">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="p-3 rounded-2xl bg-purple-500/30">
            <Scale size={24} className="text-purple-400" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-white">Peso Corporal</h3>
            <p className="text-purple-300 text-sm">
              {currentWeight ? `${currentWeight.toFixed(1)} kg` : 'Sin registros'}
            </p>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          {weightChange !== 0 && currentWeight && previousWeight && (
            <div className={`flex items-center gap-1 px-3 py-1.5 rounded-full bg-zinc-800/50 ${trendColor}`}>
              <TrendIcon size={16} />
              <span className="text-sm font-semibold">
                {weightChange > 0 ? '+' : ''}{weightChange.toFixed(1)} kg
              </span>
            </div>
          )}
          <button
            onClick={() => setShowAdd(true)}
            className="p-2 rounded-xl bg-purple-500/30 text-purple-300 hover:bg-purple-500/40"
          >
            <Plus size={18} />
          </button>
        </div>
      </div>

      {/* Add Entry Modal */}
      <AnimatePresence>
        {showAdd && (
          <motion.div
            className="mb-4 p-4 rounded-2xl bg-zinc-800/50 border border-zinc-700"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
          >
            <div className="flex items-center gap-3">
              <input
                type="number"
                step="0.1"
                value={newWeight}
                onChange={(e) => setNewWeight(e.target.value)}
                placeholder="Ej: 75.5"
                className="flex-1 px-4 py-3 rounded-xl bg-zinc-900 border border-zinc-700 text-white placeholder-zinc-500 focus:border-purple-500 focus:outline-none text-lg"
                autoFocus
                onKeyDown={(e) => e.key === 'Enter' && addWeight()}
              />
              <button
                onClick={addWeight}
                className="px-4 py-3 rounded-xl bg-purple-500 text-white font-semibold hover:bg-purple-600"
              >
                Guardar
              </button>
              <button
                onClick={() => setShowAdd(false)}
                className="p-3 rounded-xl bg-zinc-700 text-zinc-400 hover:bg-zinc-600"
              >
                <Trash2 size={18} />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Stats */}
      {stats && (
        <div className="grid grid-cols-3 gap-3 mb-4">
          <div className="p-3 rounded-xl bg-zinc-800/50 text-center">
            <p className="text-xs text-purple-300 mb-1">Total</p>
            <p className={`text-lg font-bold ${stats.totalChange > 0 ? 'text-red-400' : stats.totalChange < 0 ? 'text-green-400' : 'text-white'}`}>
              {stats.totalChange > 0 ? '+' : ''}{stats.totalChange.toFixed(1)} kg
            </p>
          </div>
          <div className="p-3 rounded-xl bg-zinc-800/50 text-center">
            <p className="text-xs text-purple-300 mb-1">Máximo</p>
            <p className="text-lg font-bold text-white">{stats.maxWeight.toFixed(1)}</p>
          </div>
          <div className="p-3 rounded-xl bg-zinc-800/50 text-center">
            <p className="text-xs text-purple-300 mb-1">Mínimo</p>
            <p className="text-lg font-bold text-white">{stats.minWeight.toFixed(1)}</p>
          </div>
        </div>
      )}

      {/* History */}
      {entries.length > 0 && (
        <div>
          <h4 className="text-sm font-semibold text-purple-300 mb-2 flex items-center gap-2">
            <Calendar size={14} />
            Historial
          </h4>
          <div className="space-y-2 max-h-48 overflow-y-auto">
            <AnimatePresence>
              {entries.slice(0, 10).map((entry, index) => (
                <motion.div
                  key={entry.id}
                  className="flex items-center justify-between p-3 rounded-xl bg-zinc-800/30"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-purple-400" />
                    <div>
                      <p className="text-white font-semibold">{entry.weight.toFixed(1)} kg</p>
                      <p className="text-zinc-500 text-xs">{formatDate(entry.date)}</p>
                    </div>
                  </div>
                  <button
                    onClick={() => removeEntry(entry.id)}
                    className="p-2 rounded-lg hover:bg-red-500/20"
                  >
                    <Trash2 size={14} className="text-red-400" />
                  </button>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>
      )}

      {/* Empty state */}
      {entries.length === 0 && (
        <div className="text-center py-8">
          <Scale size={48} className="mx-auto text-purple-700 mb-3" />
          <p className="text-zinc-500 text-sm">Sin registros de peso</p>
          <p className="text-zinc-600 text-xs mt-1">Añade tu primer peso</p>
        </div>
      )}
    </div>
  );
}
