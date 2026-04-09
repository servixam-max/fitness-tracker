"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { TrendingUp, Plus, X, Save, Dumbbell } from "lucide-react";
import { useWeightTracking } from "@/hooks/useWeightTracking";

interface WeightTrackerProps {
  exerciseId: string;
  exerciseName: string;
  defaultReps: string;
  onClose: () => void;
}

export default function WeightTracker({ exerciseId, exerciseName, defaultReps, onClose }: WeightTrackerProps) {
  const { addWeight, getLatestWeight, getProgress } = useWeightTracking();
  const [weight, setWeight] = useState("");
  const [reps, setReps] = useState(defaultReps);
  const [notes, setNotes] = useState("");
  const [saved, setSaved] = useState(false);

  const latest = getLatestWeight(exerciseId);
  const progress = getProgress(exerciseId);

  const handleSave = () => {
    if (!weight) return;
    addWeight(exerciseId, exerciseName, parseFloat(weight), reps, notes || undefined);
    setSaved(true);
    setTimeout(() => {
      onClose();
    }, 1000);
  };

  return (
    <motion.div
      className="fixed inset-0 z-[100] bg-black/90 backdrop-blur-sm flex items-end sm:items-center justify-center p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div
        className="w-full max-w-md bg-gradient-to-b from-zinc-900 to-zinc-950 rounded-3xl border border-zinc-800 p-6"
        initial={{ y: 100 }}
        animate={{ y: 0 }}
        transition={{ type: "spring", damping: 25 }}
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-gradient-to-br from-green-500 to-emerald-500">
              <TrendingUp size={24} className="text-white" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white">Registrar Peso</h3>
              <p className="text-sm text-zinc-400">{exerciseName}</p>
            </div>
          </div>
          <button onClick={onClose} className="p-2 rounded-full bg-zinc-800 text-zinc-400">
            <X size={20} />
          </button>
        </div>

        {/* Progress Summary */}
        {progress && (
          <div className="mb-6 p-4 rounded-2xl bg-green-500/10 border border-green-500/30">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-green-300 mb-1">Progreso</p>
                <p className="text-2xl font-bold text-white">
                  {progress.startWeight}kg → {progress.endWeight}kg
                </p>
              </div>
              <div className="text-right">
                <p className="text-xs text-green-300 mb-1">Cambio</p>
                <p className={`text-2xl font-bold ${progress.change >= 0 ? "text-green-400" : "text-red-400"}`}>
                  {progress.change >= 0 ? "+" : ""}{progress.change.toFixed(1)}kg
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Latest Weight */}
        {latest && !progress && (
          <div className="mb-6 p-4 rounded-2xl bg-zinc-800/50 border border-zinc-700">
            <p className="text-xs text-zinc-400 mb-1">Último registro</p>
            <p className="text-2xl font-bold text-white">{latest.weight}kg × {latest.reps}</p>
            <p className="text-xs text-zinc-500 mt-1">
              {new Date(latest.date).toLocaleDateString('es-ES')}
            </p>
          </div>
        )}

        {/* Input Form */}
        <div className="space-y-4">
          <div>
            <label className="block text-sm text-zinc-400 mb-2">Peso (kg)</label>
            <div className="relative">
              <input
                type="number"
                step="0.5"
                value={weight}
                onChange={(e) => setWeight(e.target.value)}
                placeholder="0.0"
                className="w-full px-4 py-3 rounded-xl bg-zinc-800 border border-zinc-700 text-white text-lg focus:border-green-500 focus:outline-none"
              />
              <Dumbbell size={20} className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-500" />
            </div>
          </div>

          <div>
            <label className="block text-sm text-zinc-400 mb-2">Repeticiones</label>
            <input
              type="text"
              value={reps}
              onChange={(e) => setReps(e.target.value)}
              placeholder="Ej: 10-12"
              className="w-full px-4 py-3 rounded-xl bg-zinc-800 border border-zinc-700 text-white focus:border-green-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-sm text-zinc-400 mb-2">Notas (opcional)</label>
            <input
              type="text"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Ej: Fácil, difícil, nueva PR..."
              className="w-full px-4 py-3 rounded-xl bg-zinc-800 border border-zinc-700 text-white focus:border-green-500 focus:outline-none"
            />
          </div>
        </div>

        {/* Save Button */}
        <button
          onClick={handleSave}
          disabled={!weight || saved}
          className={`w-full mt-6 py-4 rounded-2xl font-bold text-lg flex items-center justify-center gap-3 transition-all ${
            saved
              ? "bg-green-500 text-white"
              : weight
              ? "bg-gradient-to-r from-green-500 to-emerald-500 text-white shadow-lg shadow-green-500/25 active:scale-95"
              : "bg-zinc-800 text-zinc-500 cursor-not-allowed"
          }`}
        >
          {saved ? (
            <>
              <Save size={24} />
              ¡Guardado!
            </>
          ) : (
            <>
              <Plus size={24} />
              Registrar
            </>
          )}
        </button>
      </motion.div>
    </motion.div>
  );
}