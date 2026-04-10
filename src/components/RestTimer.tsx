"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Timer, Play, Pause, RotateCcw, SkipForward, Bell, BellOff } from "lucide-react";

interface RestTimerProps {
  durationSeconds: number;
  onComplete: () => void;
  onSkip: () => void;
  exerciseName?: string;
  showSoundToggle?: boolean;
}

export default function RestTimer({
  durationSeconds,
  onComplete,
  onSkip,
  exerciseName = "Siguiente ejercicio",
  showSoundToggle = true,
}: RestTimerProps) {
  const [timeLeft, setTimeLeft] = useState(durationSeconds);
  const [isRunning, setIsRunning] = useState(true);
  const [isMuted, setIsMuted] = useState(false);
  const [vibrateOn, setVibrateOn] = useState(true);

  useEffect(() => {
    if (!isRunning || timeLeft <= 0) return;

    const interval = setInterval(() => {
      setTimeLeft((t) => {
        if (t <= 1) {
          clearInterval(interval);
          // Vibration pattern at end
          if (vibrateOn && typeof navigator !== 'undefined' && 'vibrate' in navigator) {
            try {
              navigator.vibrate([200, 100, 200, 100, 300]);
            } catch {}
          }
          onComplete();
          return 0;
        }
        // Vibration warning at 3 seconds
        if (t === 4 && vibrateOn && typeof navigator !== 'undefined' && 'vibrate' in navigator) {
          try {
            navigator.vibrate([100, 50, 100]);
          } catch {}
        }
        return t - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [isRunning, timeLeft, onComplete, vibrateOn]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const progress = ((durationSeconds - timeLeft) / durationSeconds) * 100;
  const isWarning = timeLeft <= 5;
  const isCritical = timeLeft <= 3;

  return (
    <AnimatePresence>
      <motion.div
        className="fixed top-0 left-0 right-0 z-[70] bg-gradient-to-r from-orange-600 via-red-600 to-orange-600 shadow-2xl"
        initial={{ y: -200 }}
        animate={{ y: 0 }}
        exit={{ y: -200 }}
        transition={{ type: "spring", damping: 25 }}
      >
        {/* Progress Bar */}
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-black/30">
          <motion.div
            className="h-full bg-white/50"
            initial={{ width: "100%" }}
            animate={{ width: `${100 - progress}%` }}
            transition={{ duration: 0.1 }}
          />
        </div>

        <div className="px-4 py-3">
          <div className="flex items-center justify-between">
            {/* Left: Timer Display */}
            <div className="flex items-center gap-3">
              <div className={`p-2 rounded-full ${isWarning ? 'bg-white/30 animate-pulse' : 'bg-white/20'}`}>
                <Timer size={24} className={`text-white ${isWarning ? 'animate-bounce' : ''}`} />
              </div>
              
              <div>
                <p className="text-white/80 text-xs mb-0.5">Descanso</p>
                <div className="flex items-baseline gap-2">
                  <span className={`text-3xl font-bold text-white tabular-nums ${isCritical ? 'animate-pulse' : ''}`}>
                    {formatTime(timeLeft)}
                  </span>
                  <span className="text-white/60 text-sm">segundos</span>
                </div>
              </div>
            </div>

            {/* Center: Next Exercise */}
            <div className="hidden sm:block text-center flex-1">
              <p className="text-white/60 text-xs mb-0.5">Siguiente</p>
              <p className="text-white font-semibold text-sm truncate">{exerciseName}</p>
            </div>

            {/* Right: Controls */}
            <div className="flex items-center gap-2">
              {/* Sound Toggle */}
              {showSoundToggle && (
                <button
                  onClick={() => setIsMuted(!isMuted)}
                  className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
                >
                  {isMuted ? (
                    <BellOff size={18} className="text-white/60" />
                  ) : (
                    <Bell size={18} className="text-white" />
                  )}
                </button>
              )}

              {/* Play/Pause */}
              <button
                onClick={() => setIsRunning(!isRunning)}
                className="p-2 rounded-full bg-white/20 hover:bg-white/30 transition-colors"
              >
                {isRunning ? (
                  <Pause size={20} className="text-white" />
                ) : (
                  <Play size={20} className="text-white" />
                )}
              </button>

              {/* Reset */}
              <button
                onClick={() => {
                  setTimeLeft(durationSeconds);
                  setIsRunning(true);
                }}
                className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
              >
                <RotateCcw size={18} className="text-white/80" />
              </button>

              {/* Skip */}
              <button
                onClick={onSkip}
                className="px-3 py-2 rounded-full bg-white/20 hover:bg-white/30 transition-colors flex items-center gap-2"
              >
                <SkipForward size={18} className="text-white" />
                <span className="text-white text-sm font-medium hidden sm:inline">Saltar</span>
              </button>
            </div>
          </div>
        </div>

        {/* Warning Overlay */}
        <AnimatePresence>
          {isWarning && (
            <motion.div
              className="absolute inset-0 bg-red-500/20 pointer-events-none"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <div className="absolute inset-0 flex items-center justify-center">
                <motion.span
                  className="text-8xl font-bold text-white/30"
                  animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.6, 0.3] }}
                  transition={{ duration: 1, repeat: Infinity }}
                >
                  {timeLeft}
                </motion.span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </AnimatePresence>
  );
}
