"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Moon, Sun, Coffee, BedDouble, AlarmClock, Clock } from "lucide-react";

interface SleepEntry {
  id: string;
  bedtime: string;   // HH:MM
  wakeup: string;    // HH:MM
  date: string;      // YYYY-MM-DD
  timestamp: number;
  quality: number;   // 1-5
}

const QUALITY_EMOJIS = ['😫', '😟', '😐', '😊', '😴'];
const QUALITY_LABELS = ['Muy mala', 'Mala', 'Normal', 'Buena', 'Excelente'];

export default function SleepTracker() {
  const [entries, setEntries] = useState<SleepEntry[]>([]);
  const [showAdd, setShowAdd] = useState(false);
  const [newEntry, setNewEntry] = useState({
    bedtime: "23:00",
    wakeup: "07:00",
    quality: 3,
  });

  useEffect(() => {
    const stored = localStorage.getItem('sleep-tracker');
    if (stored) {
      setEntries(JSON.parse(stored));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('sleep-tracker', JSON.stringify(entries));
  }, [entries]);

  const calculateHours = (bedtime: string, wakeup: string) => {
    const [bh, bm] = bedtime.split(':').map(Number);
    const [wh, wm] = wakeup.split(':').map(Number);
    
    let bedMinutes = bh * 60 + bm;
    let wakeMinutes = wh * 60 + wm;
    
    if (wakeMinutes <= bedMinutes) wakeMinutes += 24 * 60;
    
    return (wakeMinutes - bedMinutes) / 60;
  };

  const addEntry = () => {
    const today = new Date().toISOString().split('T')[0];
    const existingIndex = entries.findIndex(e => e.date === today);
    
    const entry: SleepEntry = {
      id: Date.now().toString(),
      bedtime: newEntry.bedtime,
      wakeup: newEntry.wakeup,
      date: today,
      timestamp: Date.now(),
      quality: newEntry.quality,
    };

    if (existingIndex >= 0) {
      const updated = [...entries];
      updated[existingIndex] = entry;
      setEntries(updated);
    } else {
      setEntries(prev => [entry, ...prev]);
    }
    
    setShowAdd(false);
  };

  const lastNight = entries.length > 0 ? entries[0] : null;
  const lastNightHours = lastNight ? calculateHours(lastNight.bedtime, lastNight.wakeup) : 0;
  
  const avgHours = entries.length > 0 
    ? entries.slice(0, 7).reduce((sum, e) => sum + calculateHours(e.bedtime, e.wakeup), 0) / Math.min(entries.length, 7)
    : 0;

  const avgQuality = entries.length > 0
    ? entries.slice(0, 7).reduce((sum, e) => sum + e.quality, 0) / Math.min(entries.length, 7)
    : 0;

  const sleepGoal = 8; // 8 hours
  const progressPercent = lastNight ? Math.min((lastNightHours / sleepGoal) * 100, 100) : 0;

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr + 'T00:00:00');
    const today = new Date().toDateString();
    const yesterday = new Date(Date.now() - 86400000).toDateString();
    
    if (date.toDateString() === today) return 'Hoy';
    if (date.toDateString() === yesterday) return 'Ayer';
    return date.toLocaleDateString('es-ES', { day: 'numeric', month: 'short' });
  };

  // Last 7 days chart
  const last7 = entries.slice(0, 7).reverse();

  return (
    <div className="p-6 bg-gradient-to-br from-indigo-900/50 to-violet-900/50 rounded-3xl border border-indigo-500/30">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="p-3 rounded-2xl bg-indigo-500/30">
            <Moon size={24} className="text-indigo-400" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-white">Sueño</h3>
            <p className="text-indigo-300 text-sm">
              {lastNight ? `${lastNightHours.toFixed(1)}h última noche` : 'Sin registros'}
            </p>
          </div>
        </div>
        <button
          onClick={() => setShowAdd(true)}
          className="px-4 py-2 rounded-xl bg-indigo-500/30 text-indigo-300 hover:bg-indigo-500/40 text-sm font-semibold"
        >
          + Registrar
        </button>
      </div>

      {/* Add Entry */}
      {showAdd && (
        <motion.div
          className="mb-4 p-4 rounded-2xl bg-zinc-800/50 border border-zinc-700"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <div className="space-y-3">
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-xs text-indigo-300 mb-1 block flex items-center gap-1">
                  <Moon size={12} /> Acostarse
                </label>
                <input
                  type="time"
                  value={newEntry.bedtime}
                  onChange={(e) => setNewEntry(prev => ({ ...prev, bedtime: e.target.value }))}
                  className="w-full px-4 py-3 rounded-xl bg-zinc-900 border border-zinc-700 text-white focus:border-indigo-500 focus:outline-none"
                />
              </div>
              <div>
                <label className="text-xs text-indigo-300 mb-1 block flex items-center gap-1">
                  <Sun size={12} /> Despertar
                </label>
                <input
                  type="time"
                  value={newEntry.wakeup}
                  onChange={(e) => setNewEntry(prev => ({ ...prev, wakeup: e.target.value }))}
                  className="w-full px-4 py-3 rounded-xl bg-zinc-900 border border-zinc-700 text-white focus:border-indigo-500 focus:outline-none"
                />
              </div>
            </div>

            {/* Quality selector */}
            <div>
              <label className="text-xs text-indigo-300 mb-2 block">Calidad</label>
              <div className="flex gap-2">
                {QUALITY_EMOJIS.map((emoji, i) => (
                  <button
                    key={i}
                    onClick={() => setNewEntry(prev => ({ ...prev, quality: i + 1 }))}
                    className={`flex-1 py-2 rounded-xl text-center transition-all ${
                      newEntry.quality === i + 1
                        ? 'bg-indigo-500/50 border-indigo-400 border-2 scale-110'
                        : 'bg-zinc-800/50 border border-zinc-700'
                    }`}
                  >
                    <span className="text-xl">{emoji}</span>
                  </button>
                ))}
              </div>
            </div>

            <div className="flex gap-2">
              <button
                onClick={addEntry}
                className="flex-1 py-3 rounded-xl bg-indigo-500 text-white font-semibold hover:bg-indigo-600"
              >
                Guardar
              </button>
              <button
                onClick={() => setShowAdd(false)}
                className="px-4 py-3 rounded-xl bg-zinc-700 text-zinc-400 hover:bg-zinc-600"
              >
                ✕
              </button>
            </div>
          </div>
        </motion.div>
      )}

      {/* Last Night Summary */}
      {lastNight && (
        <div className="mb-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-indigo-300">Última noche</span>
            <span className={`text-sm font-bold ${lastNightHours >= sleepGoal ? 'text-green-400' : 'text-yellow-400'}`}>
              {lastNightHours >= sleepGoal ? '✅' : '⚠️'} {lastNightHours.toFixed(1)}h / {sleepGoal}h
            </span>
          </div>
          <div className="h-2 bg-zinc-800 rounded-full overflow-hidden">
            <motion.div
              className={`h-full rounded-full ${lastNightHours >= sleepGoal ? 'bg-gradient-to-r from-indigo-500 to-violet-500' : 'bg-gradient-to-r from-yellow-500 to-orange-500'}`}
              initial={{ width: 0 }}
              animate={{ width: `${progressPercent}%` }}
              transition={{ duration: 0.5 }}
            />
          </div>
        </div>
      )}

      {/* Weekly Chart */}
      {last7.length > 0 && (
        <div className="mb-4">
          <h4 className="text-sm font-semibold text-indigo-300 mb-3 flex items-center gap-2">
            <Clock size={14} />
            Últimos 7 días
          </h4>
          <div className="flex items-end gap-1 h-24">
            {last7.map((entry, i) => {
              const hours = calculateHours(entry.bedtime, entry.wakeup);
              const height = Math.min((hours / 10) * 100, 100);
              const isGood = hours >= sleepGoal;
              
              return (
                <div key={entry.id} className="flex-1 flex flex-col items-center gap-1">
                  <span className="text-xs text-zinc-500">{hours.toFixed(0)}h</span>
                  <div className="w-full relative" style={{ height: '60px' }}>
                    <motion.div
                      className={`absolute bottom-0 w-full rounded-t-lg ${isGood ? 'bg-indigo-500' : 'bg-yellow-500/60'}`}
                      initial={{ height: 0 }}
                      animate={{ height: `${height}%` }}
                      transition={{ delay: i * 0.05 }}
                    />
                    {/* Goal line */}
                    <div className="absolute w-full border-t border-dashed border-indigo-400/30" style={{ bottom: `${(sleepGoal / 10) * 100}%` }} />
                  </div>
                  <span className="text-xs text-zinc-600">{formatDate(entry.date).charAt(0)}</span>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Stats */}
      {entries.length > 0 && (
        <div className="grid grid-cols-2 gap-3">
          <div className="p-3 rounded-xl bg-zinc-800/50 text-center">
            <p className="text-xs text-indigo-300 mb-1">Media semanal</p>
            <p className="text-lg font-bold text-white">{avgHours.toFixed(1)}h</p>
          </div>
          <div className="p-3 rounded-xl bg-zinc-800/50 text-center">
            <p className="text-xs text-indigo-300 mb-1">Calidad media</p>
            <p className="text-lg font-bold text-white">
              {QUALITY_EMOJIS[Math.round(avgQuality) - 1]} {avgQuality.toFixed(1)}/5
            </p>
          </div>
        </div>
      )}

      {/* Empty state */}
      {!lastNight && (
        <div className="text-center py-6">
          <BedDouble size={48} className="mx-auto text-indigo-700 mb-3" />
          <p className="text-zinc-500 text-sm">Sin registros de sueño</p>
          <p className="text-zinc-600 text-xs mt-1">Registra tu primera noche</p>
        </div>
      )}
    </div>
  );
}
