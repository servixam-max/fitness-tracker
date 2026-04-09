"use client";

import { useState, useEffect, useCallback } from "react";
import { useParams, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { 
  ArrowLeft, Clock, Dumbbell, ChevronDown, ChevronUp, 
  Check, RotateCcw, Trophy, Flame, Timer, Play, Pause,
  AlertCircle, ChevronRight, Headphones, TrendingUp
} from "lucide-react";
import { WORKOUT_DAYS, toggleExerciseComplete, getProgress, resetProgress, Equipment } from "@/data/workouts";
import ExerciseIcon from "@/components/ExerciseIcon";
import ExerciseGIF from "@/components/ExerciseGIF";
import LiteYouTube from "@/components/LiteYouTube";
import VideoPlayer from "@/components/VideoPlayer";
import GuidedSession from "@/components/GuidedSession";
import WeightTracker from "@/components/WeightTracker";

// Timer hook
function useTimer() {
  const [seconds, setSeconds] = useState(0);
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isActive && seconds > 0) {
      interval = setInterval(() => {
        setSeconds(prev => {
          if (prev <= 1) {
            setIsActive(false);
            if (typeof navigator !== 'undefined' && 'vibrate' in navigator) {
              try {
                navigator.vibrate([200, 100, 200]);
              } catch (e) {}
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
  const [showGuidedSession, setShowGuidedSession] = useState(false);
  const [workoutStartTime, setWorkoutStartTime] = useState<number | null>(null);
  const [showWeightTracker, setShowWeightTracker] = useState<{ exerciseId: string; exerciseName: string; reps: string } | null>(null);
  const globalTimer = useTimer();

  useEffect(() => {
    if (dayId) {
      const saved = getProgress(dayId);
      setCompletedSets(saved);
    }
  }, [dayId]);

  if (!day) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center p-6">
        <div className="text-center">
          <p className="text-zinc-400 mb-4">Entrenamiento no encontrado</p>
          <button 
            onClick={() => router.push('/')}
            className="px-4 py-2 rounded-xl bg-zinc-800 text-white"
          >
            Volver al inicio
          </button>
        </div>
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
    
    if (!current.includes(setIndex) 
        && updated.length < (day.exercises.find(e => e.id === exerciseId)?.sets || 1)) {
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

  return (
    <div className="min-h-screen bg-black">
      {/* Weight Tracker Modal */}
      {showWeightTracker && (
        <WeightTracker
          exerciseId={showWeightTracker.exerciseId}
          exerciseName={showWeightTracker.exerciseName}
          defaultReps={showWeightTracker.reps}
          onClose={() => setShowWeightTracker(null)}
        />
      )}

      {/* Guided Session Overlay */}
      {showGuidedSession && day && (
        <GuidedSession
          day={day}
          startTime={workoutStartTime || undefined}
          onComplete={() => {
            setShowGuidedSession(false);
            setWorkoutStartTime(null);
            router.push('/');
          }}
          onExit={() => {
            setShowGuidedSession(false);
            setWorkoutStartTime(null);
          }}
        />
      )}

      {/* Sticky Timer Bar */}
      <AnimatePresence>
        {globalTimer.seconds > 0 && (
          <motion.div
            className="fixed top-0 left-0 right-0 z-[60] bg-gradient-to-r from-orange-500 to-red-500 px-4 py-3 shadow-lg"
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            exit={{ y: -100 }}
          >
            <div className="flex items-center justify-between max-w-md mx-auto">
              <div className="flex items-center gap-2">
                <Timer size={24} className={globalTimer.isActive ? "animate-pulse" : ""} />
                <span className="text-xl font-bold text-white">{formatTime(globalTimer.seconds)}</span>
                <span className="text-white/80 text-sm">Descanso</span>
              </div>
              <div className="flex items-center gap-2">
                <button 
                  onClick={globalTimer.isActive ? globalTimer.pause : globalTimer.resume}
                  className="p-2 rounded-full bg-white/20 hover:bg-white/30"
                >
                  {globalTimer.isActive ? <Pause size={20} /> : <Play size={20} />}
                </button>
                <button 
                  onClick={globalTimer.reset}
                  className="p-2 rounded-full bg-white/20 hover:bg-white/30"
                >
                  <RotateCcw size={20} />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Header */}
      <motion.header
        className={`bg-gradient-to-b ${day.color} px-6 pt-12 pb-6 ${globalTimer.seconds > 0 ? 'mt-16' : ''}`}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <div className="flex items-center justify-between mb-4">
          <button 
            onClick={() => router.push('/')}
            className="p-2 rounded-full bg-white/20 backdrop-blur-sm hover:bg-white/30 transition-colors"
          >
            <ArrowLeft size={24} className="text-white" />
          </button>
          
          <div className="flex items-center gap-2 text-white">
            <Flame size={20} />
            <span className="font-semibold">{day.subtitle}</span>
          </div>
        </div>

        <h1 className="text-3xl font-bold text-white mb-1">{day.name}</h1>
        <p className="text-white/70 text-sm mb-4">{day.exercises.length} ejercicios • {day.duration}</p>
        
        {/* Guided Session Button */}
        <button
          onClick={() => {
            setWorkoutStartTime(Date.now());
            setShowGuidedSession(true);
          }}
          className="w-full py-4 rounded-2xl bg-gradient-to-r from-orange-500 to-red-500 text-white font-bold flex items-center justify-center gap-3 shadow-lg shadow-orange-500/25 active:scale-95 transition-transform"
        >
          <Headphones size={24} />
          Iniciar Sesión Guiada
        </button>
        
        {/* Progress */}
        <div>
          <div className="flex justify-between text-sm text-white/80 mb-2">
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
          <p className="text-right text-white font-bold mt-1">{progressPercent}%</p>
        </div>
      </motion.header>

      {/* Exercises */}
      <div className="px-4 py-6 space-y-4 pb-32">
        {day.exercises.map((exercise, index) => {
          const isExpanded = expandedExercise === exercise.id;
          const completed = completedSets[exercise.id] || [];
          const allSetsDone = completed.length >= exercise.sets;

          return (
            <motion.div
              key={exercise.id}
              className={`rounded-2xl border ${
                allSetsDone 
                  ? 'bg-zinc-800/50 border-green-500/30' 
                  : 'bg-zinc-900 border-zinc-800'
              }`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
            >
              {/* Header */}
              <button
                onClick={() => setExpandedExercise(isExpanded ? null : exercise.id)}
                className="w-full p-4 flex items-center gap-4"
              >
                {/* Exercise GIF */}
                <ExerciseGIF exerciseId={exercise.id} size="md" />

                {/* Info */}
                <div className="flex-1 text-left min-w-0">
                  <h3 className="font-bold text-lg text-white leading-tight">{exercise.name}</h3>
                  <div className="flex items-center gap-3 mt-1 text-sm">
                    <span className="text-zinc-400 flex items-center gap-1">
                      <Dumbbell size={14} />
                      {exercise.sets}×{exercise.reps}
                    </span>
                    <span className="text-zinc-600">•</span>
                    <span className="text-zinc-500">{exercise.muscleGroup}</span>
                  </div>
                  {/* Equipment tags */}
                  <div className="flex items-center gap-1.5 mt-1.5 flex-wrap">
                    {exercise.equipment.map((eq: Equipment) => (
                      <span
                        key={eq}
                        className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium ${
                          eq === "mancuernas" 
                            ? "bg-orange-500/20 text-orange-400"
                            : eq === "banco"
                            ? "bg-blue-500/20 text-blue-400"
                            : "bg-green-500/20 text-green-400"
                        }`}
                      >
                        {eq === "mancuernas" && "🏋️"}
                        {eq === "banco" && "🪑"}
                        {eq === "sin_peso" && "🦶"}
                        {eq === "mancuernas" ? "Mancuernas" : eq === "banco" ? "Banco" : "Sin peso"}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Expand Icon */}
                <div className="text-zinc-500">
                  {isExpanded ? <ChevronUp size={24} /> : <ChevronRight size={24} />}
                </div>
              </button>

              {/* Expanded Content */}
              <AnimatePresence>
                {isExpanded && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="border-t border-zinc-800 overflow-hidden"
                  >
                    <div className="p-4 space-y-4">
                      {/* Video Section */}
                      {exercise.videoId && (
                        <div>
                          <h4 className="font-semibold mb-2 text-blue-400 flex items-center gap-2">
                            <Play size={16} />
                            Video Demostrativo
                          </h4>
                          <VideoPlayer videoId={exercise.videoId} title={exercise.name} />
                        </div>
                      )}

                      {/* Instructions */}
                      <div className="bg-zinc-800/50 rounded-xl p-4">
                        <h4 className="font-semibold mb-2 text-orange-400 flex items-center gap-2">
                          <AlertCircle size={16} />
                          Instrucciones
                        </h4>
                        <p className="text-zinc-300 leading-relaxed">{exercise.instruction}</p>
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
                              <span className="text-orange-400 mt-0.5">•</span>
                              <span>{tip}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Sets */}
                      <div>
                        <h4 className="font-semibold mb-3 text-white">Marcar series:</h4>
                        <div className="flex flex-wrap gap-2">
                          {Array.from({ length: exercise.sets }).map((_, setIndex) => (
                            <button
                              key={setIndex}
                              onClick={() => toggleSet(exercise.id, setIndex)}
                              className={`w-14 h-14 rounded-xl font-bold text-lg transition-all active:scale-95 ${
                                completed.includes(setIndex)
                                  ? 'bg-green-500 text-white shadow-lg shadow-green-500/25'
                                  : 'bg-zinc-800 text-zinc-400 border border-zinc-700 hover:bg-zinc-700'
                              }`}
                            >
                              {completed.includes(setIndex) ? <Check size={24} /> : setIndex + 1}
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Rest Timer */}
                      <button
                        onClick={() => startRestTimer(exercise.id)}
                        className="w-full py-3 rounded-xl bg-gradient-to-r from-orange-500 to-red-500 text-white font-bold flex items-center justify-center gap-2 active:scale-95 transition-transform"
                      >
                        <Timer size={20} />
                        Descanso: {exercise.rest}
                      </button>

                      {/* Weight Tracker Button */}
                      <button
                        onClick={() => setShowWeightTracker({ exerciseId: exercise.id, exerciseName: exercise.name, reps: exercise.reps })}
                        className="w-full py-3 rounded-xl bg-gradient-to-r from-green-500 to-emerald-500 text-white font-bold flex items-center justify-center gap-2 active:scale-95 transition-transform"
                      >
                        <TrendingUp size={20} />
                        Registrar Peso
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          );
        })}
      </div>

      {/* Complete Button */}
      {progressPercent === 100 && (
        <motion.div
          className="fixed bottom-28 left-4 right-4 z-50"
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
      <div className="fixed bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black via-black/95 to-transparent pt-8 z-40">
        <div className="flex gap-3 max-w-md mx-auto">
          <button
            onClick={() => {
              if (confirm('¿Reiniciar todo el progreso?')) {
                resetProgress(dayId);
                setCompletedSets({});
                globalTimer.reset();
              }
            }}
            className="flex-1 py-3 rounded-xl bg-zinc-800 text-zinc-400 text-sm font-medium flex items-center justify-center gap-2"
          >
            <RotateCcw size={16} />
            Reiniciar
          </button>
        </div>
      </div>
    </div>
  );
}
