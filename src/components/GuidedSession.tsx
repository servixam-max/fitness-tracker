"use client";

import React, { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play, Pause, SkipForward, Check, X, Volume2, VolumeX, Timer, Flame } from "lucide-react";
import { WorkoutDay, Exercise, getExerciseMedia } from "@/data/workouts";
import { useSpeech, useSounds } from "@/hooks/useSpeech";
import ExerciseGIF from "./ExerciseGIF";
import LiteYouTube from "./LiteYouTube";

interface GuidedSessionProps {
  day: WorkoutDay;
  onComplete: () => void;
  onExit: () => void;
}

type SessionPhase = "intro" | "countdown" | "exercise" | "rest" | "completed";

interface SessionState {
  phase: SessionPhase;
  currentExerciseIndex: number;
  currentSet: number;
  countdown: number;
  isPlaying: boolean;
  isMuted: boolean;
  completedExercises: Set<string>;
  completedSets: Record<string, number[]>;
}

export default function GuidedSession({ day, onComplete, onExit }: GuidedSessionProps) {
  const { speak, cancel: cancelSpeech } = useSpeech();
  const { playStartExercise, playRestEnd, playSetComplete, playWorkoutComplete, playCountdown } = useSounds();
  
  const [state, setState] = useState<SessionState>({
    phase: "intro",
    currentExerciseIndex: 0,
    currentSet: 0,
    countdown: 3,
    isPlaying: false,
    isMuted: false,
    completedExercises: new Set(),
    completedSets: {},
  });

  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const restWarningRef = useRef<NodeJS.Timeout | null>(null);

  const currentExercise = day.exercises[state.currentExerciseIndex];
  const media = currentExercise ? getExerciseMedia(currentExercise.id) : null;
  const isTimeBased = currentExercise?.isTimeBased || false;
  const duration = currentExercise?.duration || 60;

  // Parse rest time in seconds
  const parseRestTime = (rest: string): number => {
    const match = rest.match(/(\d+)/);
    return match ? parseInt(match[1]) : 90;
  };

  // Announce phase with TTS
  const announce = useCallback((text: string, rate: number = 0.9) => {
    if (!state.isMuted) {
      speak(text, rate);
    }
  }, [state.isMuted, speak]);

  // Start intro
  useEffect(() => {
    if (state.phase === "intro") {
      announce(`Bienvenido al entrenamiento de ${day.subtitle}. Vamos a empezar con ${currentExercise?.name}. Prepárate.`);
      setState(s => ({ ...s, countdown: 5, isPlaying: true }));
    }
  }, [state.phase]);

  // Countdown timer
  useEffect(() => {
    if (state.phase === "countdown" && state.countdown > 0 && state.isPlaying) {
      timerRef.current = setTimeout(() => {
        playCountdown();
        setState(s => ({ ...s, countdown: s.countdown - 1 }));
      }, 1000);
    } else if (state.phase === "countdown" && state.countdown === 0) {
      // Start exercise
      setState(s => ({ ...s, phase: "exercise" }));
      playStartExercise();
      if (!isTimeBased) {
        announce(`${currentExercise?.name}. Vamos. ${currentExercise?.sets} series de ${currentExercise?.reps}.`);
      } else {
        announce(`${currentExercise?.name}. ${duration} segundos. Empieza ahora.`);
      }
    }
    return () => { if (timerRef.current) clearTimeout(timerRef.current); };
  }, [state.phase, state.countdown, state.isPlaying]);

  // Rest timer with warning
  useEffect(() => {
    if (state.phase === "rest" && state.countdown > 0 && state.isPlaying) {
      // Warning at 3 seconds
      if (state.countdown <= 3 && !restWarningRef.current) {
        restWarningRef.current = setTimeout(() => {
          playRestEnd();
          announce("Tres, dos, uno... siguiente ejercicio.");
        }, (state.countdown - 3) * 1000);
      }
      timerRef.current = setTimeout(() => {
        setState(s => ({ ...s, countdown: s.countdown - 1 }));
      }, 1000);
    } else if (state.phase === "rest" && state.countdown === 0) {
      // Move to next exercise or set
      moveToNextExercise();
    }
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
      if (restWarningRef.current) clearTimeout(restWarningRef.current);
    };
  }, [state.phase, state.countdown, state.isPlaying]);

  const moveToNextExercise = useCallback(() => {
    const nextIndex = state.currentExerciseIndex + 1;
    if (nextIndex >= day.exercises.length) {
      // Workout complete!
      setState(s => ({ ...s, phase: "completed" }));
      playWorkoutComplete();
      announce(`¡Entrenamiento completado! ${day.name} terminado. ¡Buen trabajo!`);
    } else {
      // Next exercise
      setState(s => ({
        ...s,
        currentExerciseIndex: nextIndex,
        phase: "countdown",
        countdown: 3,
        currentSet: 0,
      }));
    }
  }, [state.currentExerciseIndex, day.exercises.length]);

  const handleSetComplete = useCallback(() => {
    playSetComplete();
    const exerciseId = currentExercise.id;
    const newSets = { ...state.completedSets, [exerciseId]: [...(state.completedSets[exerciseId] || []), state.currentSet] };
    
    const nextSet = state.currentSet + 1;
    if (nextSet >= currentExercise.sets) {
      // All sets done, move to next exercise after rest
      setState(s => ({
        ...s,
        completedSets: newSets,
        phase: "rest",
        countdown: parseRestTime(currentExercise.rest),
      }));
      announce(`Serie completada. Descansa ${currentExercise.rest}.`);
    } else {
      // Next set
      setState(s => ({
        ...s,
        completedSets: newSets,
        currentSet: nextSet,
        phase: "rest",
        countdown: parseRestTime(currentExercise.rest),
      }));
      announce(`Serie ${nextSet} de ${currentExercise.sets}. Descansa ${currentExercise.rest}.`);
    }
  }, [currentExercise, state.currentSet, state.completedSets]);

  const handleTimeBasedComplete = useCallback(() => {
    handleSetComplete();
  }, [handleSetComplete]);

  const togglePlay = useCallback(() => {
    setState(s => ({ ...s, isPlaying: !s.isPlaying }));
    if (state.isPlaying) {
      cancelSpeech();
      if (state.phase === "exercise") {
        announce("Pausa. Toca continuar para reanudar.");
      }
    } else {
      announce("Continuamos.");
    }
  }, [state.isPlaying, state.phase]);

  const toggleMute = useCallback(() => {
    setState(s => ({ ...s, isMuted: !s.isMuted }));
    cancelSpeech();
  }, []);

  const skipExercise = useCallback(() => {
    cancelSpeech();
    moveToNextExercise();
  }, [moveToNextExercise]);

  // Render based on phase
  if (state.phase === "completed") {
    return (
      <motion.div
        className="fixed inset-0 z-50 bg-gradient-to-b from-green-900/90 to-black flex items-center justify-center p-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <div className="text-center">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", delay: 0.2 }}
            className="text-8xl mb-6"
          >
            🏆
          </motion.div>
          <h2 className="text-4xl font-bold text-white mb-4">¡Entrenamiento Completado!</h2>
          <p className="text-xl text-green-300 mb-8">{day.name} - {day.subtitle}</p>
          <div className="flex gap-4 justify-center">
            <button
              onClick={onComplete}
              className="px-8 py-4 rounded-2xl bg-gradient-to-r from-green-500 to-emerald-500 text-white font-bold text-lg"
            >
              Terminar
            </button>
          </div>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      className="fixed inset-0 z-50 bg-black flex flex-col"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      {/* Top Bar */}
      <div className="flex items-center justify-between p-4 bg-zinc-900/80 backdrop-blur">
        <button onClick={onExit} className="p-2 rounded-full bg-zinc-800 text-zinc-400">
          <X size={24} />
        </button>
        <div className="text-center">
          <p className="text-sm text-zinc-400">{day.name}</p>
          <p className="text-lg font-bold text-white">{state.currentExerciseIndex + 1} / {day.exercises.length}</p>
        </div>
        <button onClick={toggleMute} className="p-2 rounded-full bg-zinc-800 text-zinc-400">
          {state.isMuted ? <VolumeX size={24} /> : <Volume2 size={24} />}
        </button>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col items-center justify-center p-6">
        {state.phase === "intro" && (
          <motion.div
            className="text-center"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
          >
            <Flame size={80} className="mx-auto text-orange-500 mb-6" />
            <h2 className="text-3xl font-bold text-white mb-4">Prepárate</h2>
            <p className="text-xl text-zinc-400 mb-8">{currentExercise?.name}</p>
            <div className="text-6xl font-bold text-orange-500 animate-pulse">{state.countdown}</div>
          </motion.div>
        )}

        {(state.phase === "countdown" || state.phase === "exercise") && currentExercise && (
          <div className="w-full max-w-md">
            {/* Exercise GIF/Video */}
            <div className="mb-6 flex justify-center">
              {media?.videoId ? (
                <LiteYouTube videoId={media.videoId} className="w-full max-w-sm" />
              ) : (
                <ExerciseGIF exerciseId={currentExercise.id} size="full" />
              )}
            </div>

            {/* Exercise Info */}
            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold text-white mb-2">{currentExercise.name}</h2>
              <div className="flex items-center justify-center gap-4 text-zinc-400">
                <span className="flex items-center gap-1">
                  <Timer size={16} />
                  {currentExercise.sets} × {currentExercise.reps}
                </span>
                <span className="flex items-center gap-1">
                  <Flame size={16} />
                  {currentExercise.muscleGroup}
                </span>
              </div>
            </div>

            {/* Timer for time-based exercises */}
            {isTimeBased && state.phase === "exercise" && (
              <motion.div
                className="text-center mb-6"
                initial={{ scale: 0.5 }}
                animate={{ scale: 1 }}
              >
                <p className="text-zinc-400 mb-2">Tiempo restante</p>
                <div className="text-7xl font-bold text-orange-500">{duration}s</div>
              </motion.div>
            )}

            {/* Countdown overlay */}
            {state.phase === "countdown" && (
              <motion.div
                className="absolute inset-0 flex items-center justify-center bg-black/80"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                <div className="text-9xl font-bold text-orange-500 animate-pulse">{state.countdown}</div>
              </motion.div>
            )}
          </div>
        )}

        {state.phase === "rest" && (
          <motion.div
            className="text-center"
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
          >
            <Timer size={80} className="mx-auto text-blue-500 mb-6" />
            <h2 className="text-3xl font-bold text-white mb-4">Descanso</h2>
            <div className="text-7xl font-bold text-blue-500 mb-4">{state.countdown}s</div>
            <p className="text-xl text-zinc-400">
              Siguiente: {day.exercises[state.currentExerciseIndex + 1]?.name || "¡Último!"}
            </p>
          </motion.div>
        )}
      </div>

      {/* Controls */}
      <div className="p-6 bg-zinc-900/80 backdrop-blur">
        <div className="flex items-center justify-center gap-4">
          <button
            onClick={togglePlay}
            className="p-4 rounded-full bg-zinc-800 text-white"
          >
            {state.isPlaying ? <Pause size={32} /> : <Play size={32} />}
          </button>

          {state.phase === "exercise" && !isTimeBased && (
            <button
              onClick={handleSetComplete}
              className="px-8 py-4 rounded-2xl bg-gradient-to-r from-green-500 to-emerald-500 text-white font-bold text-lg flex items-center gap-2"
            >
              <Check size={24} />
              Serie Completa
            </button>
          )}

          {state.phase === "exercise" && isTimeBased && (
            <button
              onClick={handleTimeBasedComplete}
              className="px-8 py-4 rounded-2xl bg-gradient-to-r from-green-500 to-emerald-500 text-white font-bold text-lg flex items-center gap-2"
            >
              <Check size={24} />
              Terminar
            </button>
          )}

          <button
            onClick={skipExercise}
            className="p-4 rounded-full bg-zinc-800 text-zinc-400"
          >
            <SkipForward size={32} />
          </button>
        </div>

        {/* Set indicators */}
        {!isTimeBased && state.phase === "exercise" && (
          <div className="flex justify-center gap-2 mt-4">
            {Array.from({ length: currentExercise.sets }).map((_, i) => (
              <div
                key={i}
                className={`w-3 h-3 rounded-full ${
                  i < state.currentSet
                    ? "bg-green-500"
                    : i === state.currentSet
                    ? "bg-orange-500 animate-pulse"
                    : "bg-zinc-700"
                }`}
              />
            ))}
          </div>
        )}
      </div>
    </motion.div>
  );
}