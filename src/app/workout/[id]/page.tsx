"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { 
  ArrowLeft, Clock, Dumbbell, ChevronDown, ChevronUp, 
  Check, RotateCcw, Trophy, Flame, Timer 
} from "lucide-react";
import { WORKOUT_DAYS, toggleExerciseComplete, getProgress } from "@/data/workouts";
import Image from "next/image";

export default function WorkoutPage() {
  const params = useParams();
  const router = useRouter();
  const dayId = params.id as string;
  
  const day = WORKOUT_DAYS.find(d => d.id === dayId);
  const [expandedExercise, setExpandedExercise] = useState<string | null>(null);
  const [completedSets, setCompletedSets] = useState<Record<string, number[]>>({});
  const [timerActive, setTimerActive] = useState(false);
  const [timerSeconds, setTimerSeconds] = useState(0);

  useEffect(() => {
    if (dayId) {
      const saved = getProgress(dayId);
      setCompletedSets(saved);
    }
  }, [dayId]);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (timerActive && timerSeconds > 0) {
      interval = setInterval(() => {
        setTimerSeconds(prev => {
          if (prev <= 1) {
            setTimerActive(false);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [timerActive, timerSeconds]);

  if (!day) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <p className="text-zinc-400">Entrenamiento no encontrado</p>
      </div>
    );
  }

  const startRestTimer = (seconds: number) => {
    setTimerSeconds(seconds);
    setTimerActive(true);
  };

  const toggleSet = (exerciseId: string, setIndex: number) => {
    const current = completedSets[exerciseId] || [];
    const updated = current.includes(setIndex)
      ? current.filter(s => s !== setIndex)
      : [...current, setIndex];
    
    const newCompleted = { ...completedSets, [exerciseId]: updated };
    setCompletedSets(newCompleted);
    toggleExerciseComplete(dayId, exerciseId, updated);
  };

  const completedExercises = Object.keys(completedSets).filter(
    id => completedSets[id]?.length === day.exercises.find(e => e.id === id)?.sets
  ).length;

  const progressPercent = Math.round((completedExercises / day.exercises.length) * 100);

  return (
    <div className="min-h-screen bg-black pb-24">
      <motion.header
        className={`sticky top-0 z-50 bg-gradient-to-b ${day.color} px-6 pt-12 pb-6`}
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
          
          {timerSeconds > 0 && (
            <motion.div
              className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/20 backdrop-blur-sm"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
            >
              <Timer size={20} className={timerActive ? "animate-pulse" : ""} />
              <span className="font-mono text-xl font-bold">
                {Math.floor(timerSeconds / 60)}:{(timerSeconds % 60).toString().padStart(2, '0')}
              </span>
            </motion.div>
          )}
        </div>

        <h1 className="text-3xl font-bold text-white mb-1">{day.name}</h1>
        <p className="text-white/80">{day.subtitle}</p>
        
        <div className="mt-4">
          <div className="flex justify-between text-sm text-white/80 mb-2">
            <span>Progreso</span>
            <span>{progressPercent}%</span>
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
      </motion.header>

      <div className="px-6 mt-6 space-y-4">
        {day.exercises.map((exercise, index) => {
          const isExpanded = expandedExercise === exercise.id;
          const completed = completedSets[exercise.id] || [];
          const allSetsCompleted = completed.length >= exercise.sets;

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
                  <h3 className="font-bold text-lg">{exercise.name}</h3>
                  <div className="flex items-center gap-3 mt-1 text-sm text-zinc-400">
                    <span className="flex items-center gap-1">
                      <Dumbbell size={14} />
                      {exercise.sets} series
                    </span>
                    <span>x</span>
                    <span>{exercise.reps}</span>
                  </div>
                  <div className="flex items-center gap-1 mt-1 text-xs text-zinc-500">
                    <Clock size={12} />
                    Descanso: {exercise.rest}
                  </div>
                </div>

                {isExpanded ? (
                  <ChevronUp size={24} className="text-zinc-400" />
                ) : (
                  <ChevronDown size={24} className="text-zinc-400" />
                )}
              </button>

              <AnimatePresence>
                {isExpanded && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="border-t border-zinc-800"
                  >
                    <div className="p-4 space-y-4">
                      <div className="bg-zinc-800/50 rounded-2xl p-4">
                        <p className="text-zinc-300">{exercise.instruction}</p>
                      </div>

                      <div>
                        <h4 className="text-sm font-semibold text-orange-400 mb-2 flex items-center gap-1">
                          <Flame size={14} />
                          Consejos
                        </h4>
                        <ul className="space-y-1">
                          {exercise.tips.map((tip, i) => (
                            <li key={i} className="text-sm text-zinc-400 flex items-start gap-2">
                              <span className="text-orange-400">•</span>
                              {tip}
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div>
                        <h4 className="text-sm font-semibold mb-3">Marcar series completadas:</h4>
                        <div className="flex gap-2">
                          {Array.from({ length: exercise.sets }).map((_, setIndex) => (
                            <button
                              key={setIndex}
                              onClick={() => toggleSet(exercise.id, setIndex)}
                              className={`w-12 h-12 rounded-xl font-bold transition-all ${
                                completed.includes(setIndex)
                                  ? 'bg-green-500 text-white'
                                  : 'bg-zinc-800 text-zinc-400 hover:bg-zinc-700'
                              }`}
                            >
                              {setIndex + 1}
                            </button>
                          ))}
                        </div>
                      </div>

                      <button
                        onClick={() => {
                          const restSeconds = parseInt(exercise.rest) || 90;
                          startRestTimer(restSeconds);
                        }}
                        className="w-full py-3 rounded-2xl bg-gradient-to-r from-orange-500 to-red-500 text-white font-bold flex items-center justify-center gap-2"
                      >
                        <Timer size={20} />
                        Iniciar descanso ({exercise.rest})
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          );
        })}
      </div>

      {progressPercent === 100 && (
        <motion.div
          className="fixed bottom-24 left-6 right-6"
          initial={{ y: 100 }}
          animate={{ y: 0 }}
        >
          <button
            onClick={() => router.push('/')}
            className="w-full py-4 rounded-2xl bg-gradient-to-r from-green-500 to-emerald-500 text-white font-bold flex items-center justify-center gap-2 shadow-lg shadow-green-500/25"
          >
            <Trophy size={24} />
            Entrenamiento Completado!
          </button>
        </motion.div>
      )}

      <div className="px-6 mt-8 text-center">
        <button
          onClick={() => {
            localStorage.removeItem(`workout-${dayId}`);
            setCompletedSets({});
          }}
          className="text-zinc-500 text-sm flex items-center gap-1 mx-auto hover:text-zinc-300"
        >
          <RotateCcw size={14} />
          Reiniciar progreso
        </button>
      </div>
    </div>
  );
}
