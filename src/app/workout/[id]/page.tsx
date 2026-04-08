"use client";

import { useState, useEffect, useCallback } from "react";
import { useParams, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { 
  ArrowLeft, Clock, Dumbbell, ChevronDown, ChevronUp, 
  Check, RotateCcw, Trophy, Flame, Timer, Play, Pause,
  ExternalLink, AlertCircle
} from "lucide-react";
import { WORKOUT_DAYS, toggleExerciseComplete, getProgress, resetProgress } from "@/data/workouts";
import Image from "next/image";

// Timer hook for individual exercise timers
function useExerciseTimer(initialSeconds: number = 0) {
  const [seconds, setSeconds] = useState(initialSeconds);
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isActive && seconds > 0) {
      interval = setInterval(() => {
        setSeconds(prev => {
          if (prev <= 1) {
            setIsActive(false);
            // Play sound or vibrate when timer ends
            if (typeof navigator !== 'undefined' && 'vibrate' in navigator) {
              navigator.vibrate([200, 100, 200, 100, 400]);
            }
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isActive, seconds]);

  const start = useCallback((secs: number) => {
    setSeconds(secs);
    setIsActive(true);
  }, []);

  const pause = useCallback(() => setIsActive(false), []);
  const resume = useCallback(() => setIsActive(true), []);
  const reset = useCallback(() => {
    setIsActive(false);
    setSeconds(0);
  }, []);

  return { seconds, isActive, start, pause, resume, reset };
}

export default function WorkoutPage() {
  const params = useParams();
  const router = useRouter();
  const dayId = params.id as string;
  
  const day = WORKOUT_DAYS.find(d => d.id === dayId);
  const [expandedExercise, setExpandedExercise] = useState<string | null>(null);
  const [completedSets, setCompletedSets] = useState<Record<string, number[]>>({});
  const [activeTimers, setActiveTimers] = useState<Record<string, boolean>>({});
  const [showVideoModal, setShowVideoModal] = useState<string | null>(null);
  
  // Global rest timer
  const globalTimer = useExerciseTimer();
  
  // Individual exercise timers
  const [exerciseTimers, setExerciseTimers] = useState<Record<string, ReturnType<typeof useExerciseTimer>>>({});

  useEffect(() => {
    if (dayId) {
      const saved = getProgress(dayId);
      setCompletedSets(saved);
    }
  }, [dayId]);

  if (!day) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <p className="text-zinc-400">Entrenamiento no encontrado</p>
      </div>
    );
  }

  const parseRestTime = (rest: string): number => {
    const match = rest.match(/(\d+)/);
    return match ? parseInt(match[1]) : 90;
  };

  const startRestTimer = (exerciseId: string) => {
    const exercise = day.exercises.find(e => e.id === exerciseId);
    if (exercise) {
      const restSeconds = parseRestTime(exercise.rest);
      globalTimer.start(restSeconds);
    }
  };

  const toggleSet = (exerciseId: string, setIndex: number) => {
    const current = completedSets[exerciseId] || [];
    const updated = current.includes(setIndex)
      ? current.filter(s => s !== setIndex)
      : [...current, setIndex];
    
    const newCompleted = { ...completedSets, [exerciseId]: updated };
    setCompletedSets(newCompleted);
    toggleExerciseComplete(dayId, exerciseId, updated);
    
    // Auto-start rest timer when completing a set (except last set)
    if (!current.includes(setIndex) && updated.length < (day.exercises.find(e => e.id === exerciseId)?.sets || 1)) {
      startRestTimer(exerciseId);
    }
  };

  const completedExercises = Object.keys(completedSets).filter(
    id => completedSets[id]?.length >= (day.exercises.find(e => e.id === id)?.sets || 1)
  ).length;

  const progressPercent = Math.round((completedExercises / day.exercises.length) * 100);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const openVideo = (videoUrl: string) => {
    window.open(videoUrl, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="min-h-screen bg-black pb-32">
      {/* Sticky Timer Bar */}
      {globalTimer.seconds > 0 && (
        <motion.div
          className="fixed top-0 left-0 right-0 z-[60] bg-gradient-to-r from-orange-500 to-red-500 px-4 py-3"
          initial={{ y: -100 }}
          animate={{ y: 0 }}
          exit={{ y: -100 }}
        >
          <div className="flex items-center justify-between max-w-md mx-auto">
            <div className="flex items-center gap-2">
              <Timer size={24} className={globalTimer.isActive ? "animate-pulse" : ""} />
              <span className="text-xl font-bold">Descanso: {formatTime(globalTimer.seconds)}</span>
            </div>
            <div className="flex items-center gap-2">
              {globalTimer.isActive ? (
                <button onClick={globalTimer.pause} className="p-2 rounded-full bg-white/20">
                  <Pause size={20} />
                </button>
              ) : (
                <button onClick={globalTimer.resume} className="p-2 rounded-full bg-white/20">
                  <Play size={20} />
                </button>
              )}
              <button onClick={globalTimer.reset} className="p-2 rounded-full bg-white/20">
                <RotateCcw size={20} />
              </button>
            </div>
          </div>
        </motion.div>
      )}

      {/* Header */}
      <motion.header
        className={`sticky top-0 z-50 bg-gradient-to-b ${day.color} px-6 pt-12 pb-6 ${globalTimer.seconds > 0 ? 'mt-16' : ''}`}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <div className="flex items-center justify-between mb-4">
          <button 
            onClick={() => router.push('/')}
            className="p-2 rounded-full bg-white/20 backdrop-blur-sm"
          >
            <ArrowLeft size={24} className="text-white" />
          </button>
          
          <div className="flex items-center gap-2">
            <Flame size={20} className="text-white" />
            <span className="text-white font-semibold">{day.subtitle}</span>
          </div>
        </div>

        <h1 className="text-3xl font-bold text-white mb-1">{day.name}</h1>
        
        <div className="flex items-center gap-4 mt-4">
          <div className="flex-1">
            <div className="flex justify-between text-sm text-white/80 mb-1">
              <span>Progreso</span>
              <span>{completedExercises}/{day.exercises.length}</span>
            </div>
            <div className="h-2 bg-black/30 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-white rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${progressPercent}%` }}
                transition={{ duration: 0.5 }}
              />
            </div>
          </div>
          <div className="text-2xl font-bold">{progressPercent}%</div>
        </div>
      </motion.header>

      {/* Exercises */}
      <div className="px-4 mt-6 space-y-4">
        {day.exercises.map((exercise, index) => {
          const isExpanded = expandedExercise === exercise.id;
          const completed = completedSets[exercise.id] || [];
          const allSetsCompleted = completed.length >= exercise.sets;
          const isTimerRunning = globalTimer.isActive && expandedExercise === exercise.id;

          return (
            <motion.div
              key={exercise.id}
              className={`rounded-3xl overflow-hidden border ${
                allSetsCompleted 
                  ? 'bg-zinc-800/50 border-green-500/30' 
                  : 'bg-zinc-900 border-zinc-800'
              }`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              {/* Exercise Header */}
              <button
                onClick={() => setExpandedExercise(isExpanded ? null : exercise.id)}
                className="w-full p-4 flex items-center gap-4"
              >
                <div className="relative w-20 h-20 rounded-2xl overflow-hidden flex-shrink-0">
                  <Image
                    src={exercise.imageUrl}
                    alt={exercise.name}
                    fill
                    className="object-cover"
                    sizes="80px"
                  />
                  {allSetsCompleted && (
                    <div className="absolute inset-0 bg-green-500/80 flex items-center justify-center">
                      <Check size={32} className="text-white" />
                    </div>
                  )}
                </div>

                <div className="flex-1 text-left">
                  <h3 className="font-bold text-lg">{index + 1}. {exercise.name}</h3>
                  <div className="flex items-center gap-3 mt-1 text-sm text-zinc-400">
                    <span className="flex items-center gap-1">
                      <Dumbbell size={14} />
                      {exercise.sets} × {exercise.reps}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-xs px-2 py-1 rounded-full bg-zinc-800 text-zinc-400">
                      {exercise.muscleGroup}
                    </span>
                    <span className="text-xs flex items-center gap-1 text-zinc-500">
                      <Clock size={12} />
                      {exercise.rest}
                    </span>
                  </div>
                </div>

                <div className="flex flex-col items-center gap-1">
                  {isExpanded ? (
                    <ChevronUp size={24} className="text-zinc-400" />
                  ) : (
                    <ChevronDown size={24} className="text-zinc-400" />
                  )}
                </div>
              </button>

              {/* Expanded Content */}
              <AnimatePresence>
                {isExpanded && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="border-t border-zinc-800"
                  >
                    <div className="p-4 space-y-4">
                      {/* Video Button */}
                      <button
                        onClick={() => openVideo(exercise.videoUrl)}
                        className="w-full flex items-center justify-center gap-2 py-3 rounded-2xl bg-red-600 hover:bg-red-700 text-white font-semibold transition-colors"
                      >
                        <Play size={20} />
                        Ver Video Tutorial
                        <ExternalLink size={16} />
                      </button>

                      {/* Instructions */}
                      <div className="bg-zinc-800/50 rounded-2xl p-4">
                        <h4 className="font-semibold mb-2 text-orange-400 flex items-center gap-2">
                          <AlertCircle size={16} />
                          Instrucciones
                        </h4>
                        <p className="text-zinc-300">{exercise.instruction}</p>
                      </div>

                      {/* Tips */}
                      <div>
                        <h4 className="font-semibold mb-2 text-yellow-400 flex items-center gap-2">
                          <Flame size={16} />
                          Consejos
                        </h4>
                        <ul className="space-y-2">
                          {exercise.tips.map((tip, i) => (
                            <li key={i} className="text-sm text-zinc-400 flex items-start gap-2">
                              <span className="text-orange-400 mt-1">•</span>
                              {tip}
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Sets Tracker */}
                      <div>
                        <h4 className="font-semibold mb-3">Marcar series completadas:</h4>
                        <div className="flex flex-wrap gap-2">
                          {Array.from({ length: exercise.sets }).map((_, setIndex) => (
                            <button
                              key={setIndex}
                              onClick={() => toggleSet(exercise.id, setIndex)}
                              className={`w-14 h-14 rounded-xl font-bold text-lg transition-all ${
                                completed.includes(setIndex)
                                  ? 'bg-green-500 text-white shadow-lg shadow-green-500/25'
                                  : 'bg-zinc-800 text-zinc-400 hover:bg-zinc-700 border border-zinc-700'
                              }`}
                            >
                              {completed.includes(setIndex) ? <Check size={24} /> : setIndex + 1}
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Quick Rest Timer */}
                      <button
                        onClick={() => startRestTimer(exercise.id)}
                        className="w-full py-3 rounded-2xl bg-gradient-to-r from-orange-500 to-red-500 text-white font-bold flex items-center justify-center gap-2"
                      >
                        <Timer size={20} />
                        Iniciar Descanso ({exercise.rest})
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          );
        })}
      </div>

      {/* Completed Workout Button */}
      {progressPercent === 100 && (
        <motion.div
          className="fixed bottom-28 left-4 right-4"
          initial={{ y: 100 }}
          animate={{ y: 0 }}
        >
          <button
            onClick={() => router.push('/')}
            className="w-full py-4 rounded-2xl bg-gradient-to-r from-green-500 to-emerald-500 text-white font-bold flex items-center justify-center gap-2 shadow-lg shadow-green-500/25"
          >
            <Trophy size={24} />
            ¡Entrenamiento Completado!
          </button>
        </motion.div>
      )}

      {/* Bottom Actions */}
      <div className="fixed bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black via-black/95 to-transparent">
        <div className="flex gap-3">
          <button
            onClick={() => {
              if (confirm('¿Reiniciar todo el progreso de este entrenamiento?')) {
                resetProgress(dayId);
                setCompletedSets({});
                globalTimer.reset();
              }
            }}
            className="flex-1 py-3 rounded-xl bg-zinc-800 text-zinc-400 text-sm flex items-center justify-center gap-2"
          >
            <RotateCcw size={16} />
            Reiniciar
          </button>
          <button
            onClick={() => router.push('/')}
            className="flex-1 py-3 rounded-xl bg-zinc-800 text-white text-sm"
          >
            Volver
          </button>
        </div>
      </div>
    </div>
  );
}
