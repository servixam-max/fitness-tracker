"use client";

import React, { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Maximize2, Minimize2, Check, SkipForward, Pause, Play, 
  Volume2, VolumeX, X, Timer, Flame
} from "lucide-react";
import { Exercise, getExerciseMedia } from "@/data/workouts";
import ExerciseGIF from "./ExerciseGIF";
import LiteYouTube from "./LiteYouTube";

interface FocusModeProps {
  exercise: Exercise;
  setNumber: number;
  totalSets: number;
  onComplete: () => void;
  onSkip: () => void;
  onClose: () => void;
  isMuted?: boolean;
  onToggleMute?: () => void;
}

export default function FocusMode({
  exercise,
  setNumber,
  totalSets,
  onComplete,
  onSkip,
  onClose,
  isMuted = false,
  onToggleMute,
}: FocusModeProps) {
  const [isPlaying, setIsPlaying] = useState(true);
  const [timeElapsed, setTimeElapsed] = useState(0);
  const media = getExerciseMedia(exercise.id);
  const isTimeBased = exercise.isTimeBased || false;
  const duration = exercise.duration || 60;

  // Timer for time-based exercises
  useEffect(() => {
    if (!isTimeBased || !isPlaying) return;

    const interval = setInterval(() => {
      setTimeElapsed(t => {
        if (t >= duration) {
          clearInterval(interval);
          return duration;
        }
        return t + 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [isTimeBased, isPlaying, duration]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const progress = isTimeBased 
    ? (timeElapsed / duration) * 100 
    : ((setNumber) / totalSets) * 100;

  return (
    <motion.div
      className="fixed inset-0 z-[100] bg-black flex flex-col"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {/* Top Bar */}
      <div className="flex items-center justify-between p-4 bg-gradient-to-b from-black/80 to-transparent">
        <button 
          onClick={onClose}
          className="p-2 rounded-full bg-white/10 backdrop-blur text-white"
        >
          <Minimize2 size={24} />
        </button>
        
        <div className="text-center">
          <p className="text-sm text-zinc-400">Serie {setNumber + 1} de {totalSets}</p>
          <p className="text-lg font-bold text-white">{exercise.name}</p>
        </div>

        {onToggleMute && (
          <button 
            onClick={onToggleMute}
            className="p-2 rounded-full bg-white/10 backdrop-blur text-white"
          >
            {isMuted ? <VolumeX size={24} /> : <Volume2 size={24} />}
          </button>
        )}
      </div>

      {/* Main Content - Centered */}
      <div className="flex-1 flex flex-col items-center justify-center p-6">
        {/* Exercise Media */}
        <div className="w-full max-w-lg mb-8">
          {media?.videoId ? (
            <LiteYouTube videoId={media.videoId} className="w-full" />
          ) : (
            <div className="w-full aspect-video bg-zinc-900 rounded-2xl overflow-hidden flex items-center justify-center">
              <ExerciseGIF exerciseId={exercise.id} size="full" />
            </div>
          )}
        </div>

        {/* Exercise Info */}
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-white mb-2">{exercise.name}</h2>
          <div className="flex items-center justify-center gap-4 text-zinc-400">
            <span className="flex items-center gap-1">
              <Flame size={16} />
              {exercise.muscleGroup}
            </span>
            {!isTimeBased && (
              <span className="flex items-center gap-1">
                <Timer size={16} />
                {exercise.sets} × {exercise.reps}
              </span>
            )}
          </div>
        </div>

        {/* Timer for Time-Based */}
        {isTimeBased && (
          <motion.div
            className="text-center mb-8"
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
          >
            <div className={`text-8xl font-bold mb-2 ${
              timeElapsed >= duration 
                ? "text-green-500" 
                : "text-orange-500"
            }`}>
              {formatTime(isPlaying ? timeElapsed : timeElapsed)}
            </div>
            <p className="text-zinc-400">
              {isPlaying ? "Tiempo transcurrido" : "Pausado"}
            </p>
          </motion.div>
        )}

        {/* Progress Bar */}
        <div className="w-full max-w-md mb-8">
          <div className="h-2 bg-zinc-800 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-orange-500 to-red-500"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.3 }}
            />
          </div>
          <div className="flex justify-between mt-2 text-xs text-zinc-500">
            <span>Progreso</span>
            <span>{Math.round(progress)}%</span>
          </div>
        </div>
      </div>

      {/* Bottom Controls */}
      <div className="p-6 bg-gradient-to-t from-black via-black/90 to-transparent">
        <div className="flex items-center justify-center gap-4">
          {/* Play/Pause */}
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className="p-4 rounded-full bg-white/10 backdrop-blur text-white"
          >
            {isPlaying ? <Pause size={32} /> : <Play size={32} />}
          </button>

          {/* Complete Button */}
          <button
            onClick={onComplete}
            className="px-10 py-5 rounded-2xl bg-gradient-to-r from-green-500 to-emerald-500 text-white font-bold text-xl flex items-center gap-3 shadow-lg shadow-green-500/25 active:scale-95 transition-transform"
          >
            <Check size={32} />
            {isTimeBased ? "Terminado" : `Serie ${setNumber + 1}`}
          </button>

          {/* Skip */}
          <button
            onClick={onSkip}
            className="p-4 rounded-full bg-white/10 backdrop-blur text-zinc-400"
          >
            <SkipForward size={32} />
          </button>
        </div>

        {/* Instructions */}
        <div className="mt-6 p-4 rounded-2xl bg-zinc-900/50 border border-zinc-800">
          <h4 className="font-semibold text-orange-400 mb-2 flex items-center gap-2">
            <Flame size={16} />
            Instrucciones
          </h4>
          <p className="text-zinc-300 text-sm leading-relaxed">{exercise.instruction}</p>
        </div>

        {/* Tips */}
        {exercise.tips.length > 0 && (
          <div className="mt-4 p-4 rounded-2xl bg-zinc-900/50 border border-zinc-800">
            <h4 className="font-semibold text-yellow-400 mb-2 flex items-center gap-2">
              <span className="text-lg">💡</span>
              Consejos
            </h4>
            <ul className="space-y-1">
              {exercise.tips.slice(0, 3).map((tip, i) => (
                <li key={i} className="text-sm text-zinc-400 flex items-start gap-2">
                  <span className="text-orange-400 mt-0.5">•</span>
                  {tip}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </motion.div>
  );
}