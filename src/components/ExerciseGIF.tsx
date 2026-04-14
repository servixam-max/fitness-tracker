"use client";

import React from "react";
import { getExerciseMedia } from "@/data/workouts";

interface ExerciseGIFProps {
  exerciseId: string;
  size?: "sm" | "md" | "lg" | "full";
  showVideo?: boolean;
}

const MUSCLE_STYLES: Record<string, { gradient: string; emoji: string; label: string }> = {
  "Pecho": { gradient: "from-blue-500 via-blue-600 to-cyan-500", emoji: "💪", label: "Pecho" },
  "Pecho/Dorsal": { gradient: "from-blue-500 via-purple-500 to-cyan-400", emoji: "🫁", label: "Pecho/Dorsal" },
  "Espalda": { gradient: "from-emerald-500 via-green-600 to-teal-500", emoji: "🔙", label: "Espalda" },
  "Trapecios": { gradient: "from-emerald-600 via-green-700 to-teal-600", emoji: "⬆️", label: "Trapecios" },
  "Hombros": { gradient: "from-violet-500 via-purple-500 to-fuchsia-500", emoji: "🏋️", label: "Hombros" },
  "Bíceps": { gradient: "from-amber-500 via-orange-500 to-yellow-500", emoji: "💪", label: "Bíceps" },
  "Tríceps": { gradient: "from-rose-500 via-red-500 to-pink-500", emoji: "🦾", label: "Tríceps" },
  "Cuádriceps": { gradient: "from-orange-500 via-red-500 to-amber-500", emoji: "🦵", label: "Cuádriceps" },
  "Pierna": { gradient: "from-orange-400 via-amber-500 to-red-400", emoji: "🦵", label: "Pierna" },
  "Pierna/Glúteos": { gradient: "from-orange-500 via-red-400 to-pink-500", emoji: "🍑", label: "Pierna/Glúteos" },
  "Pierna/Potencia": { gradient: "from-yellow-500 via-orange-500 to-red-500", emoji: "⚡", label: "Pierna/Potencia" },
  "Isquiotibiales": { gradient: "from-amber-500 via-orange-600 to-red-500", emoji: "🦵", label: "Isquiotibiales" },
  "Isquiotibiales/Glúteos": { gradient: "from-amber-500 via-red-400 to-pink-500", emoji: "🍑", label: "Isq/Glúteos" },
  "Gemelos": { gradient: "from-yellow-400 via-amber-500 to-orange-400", emoji: "🦶", label: "Gemelos" },
  "Glúteos": { gradient: "from-pink-500 via-rose-500 to-fuchsia-400", emoji: "🍑", label: "Glúteos" },
  "Core": { gradient: "from-green-400 via-emerald-500 to-teal-500", emoji: "🔥", label: "Core" },
  "Core/Oblicuos": { gradient: "from-lime-400 via-green-500 to-emerald-500", emoji: "🔄", label: "Core/Oblicuos" },
  "Core/Cardio": { gradient: "from-green-400 via-yellow-400 to-red-400", emoji: "❤️‍🔥", label: "Cardio" },
  "Core/Espalda": { gradient: "from-emerald-400 via-teal-500 to-green-600", emoji: "💪", label: "Core/Espalda" },
  "Full Body": { gradient: "from-orange-500 via-red-500 to-purple-600", emoji: "🏋️", label: "Full Body" },
  "Posterior": { gradient: "from-amber-600 via-red-600 to-rose-600", emoji: "🔙", label: "Cadena Posterior" },
  "Cardio": { gradient: "from-red-500 via-orange-400 to-yellow-400", emoji: "🏃", label: "Cardio" },
};

export default function ExerciseGIF({ exerciseId, size = "md", showVideo = false }: ExerciseGIFProps) {
  const media = getExerciseMedia(exerciseId);
  const [thumbLoaded, setThumbLoaded] = React.useState(false);
  const [thumbError, setThumbError] = React.useState(false);
  const [gifLoaded, setGifLoaded] = React.useState(false);
  const [gifError, setGifError] = React.useState(false);

  const sizeClasses = {
    sm: "w-16 h-16",
    md: "w-24 h-24",
    lg: "w-40 h-40",
    full: "w-full aspect-video",
  };

  const fontSizes = {
    sm: "text-xl",
    md: "text-3xl",
    lg: "text-5xl",
    full: "text-6xl",
  };

  const labelSizes = {
    sm: "text-[8px]",
    md: "text-[10px]",
    lg: "text-xs",
    full: "text-sm",
  };

  const style = MUSCLE_STYLES[media.muscleGroup || ""] || MUSCLE_STYLES["Full Body"] || MUSCLE_STYLES["Full Body"];
  const muscleGroup = media.muscleGroup || "Full Body";
  const muscleStyle = MUSCLE_STYLES[muscleGroup] || MUSCLE_STYLES["Full Body"];
  const hasThumb = !!media.videoId && !thumbError;

  if (showVideo && media.videoId) {
    return null;
  }

  // For "full" size, show enhanced card with YouTube thumbnail if available
  if (size === "full") {
    return (
      <div className="w-full aspect-video relative rounded-2xl overflow-hidden border border-zinc-700 bg-gradient-to-br from-zinc-800 to-zinc-900">
        {hasThumb && !gifLoaded ? (
          <img
            src={`https://img.youtube.com/vi/${media.videoId}/maxresdefault.jpg`}
            alt="Ejercicio"
            className="w-full h-full object-cover"
            onLoad={() => setThumbLoaded(true)}
            onError={() => setThumbError(true)}
            loading="lazy"
          />
        ) : null}
        {gifLoaded ? (
          <img
            src={media.gif}
            alt="Ejercicio"
            className="w-full h-full object-cover"
            onError={() => setGifError(true)}
            loading="lazy"
          />
        ) : null}
        {(!hasThumb || thumbError) && !gifLoaded && (
          <div className={`w-full h-full bg-gradient-to-br ${muscleStyle.gradient} flex flex-col items-center justify-center gap-2`}>
            <span className="text-7xl">{muscleStyle.emoji}</span>
            <span className="text-white/80 text-sm font-medium px-3 py-1 rounded-full bg-black/30 backdrop-blur-sm">{muscleStyle.label}</span>
          </div>
        )}
        {hasThumb && thumbLoaded && !gifLoaded && (
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent">
            <div className="absolute bottom-2 left-2 px-2 py-1 rounded bg-black/50 backdrop-blur-sm text-white text-xs font-medium">
              ▶ Ver demostración
            </div>
          </div>
        )}
      </div>
    );
  }

  // For sm, md, lg sizes: show gradient card with emoji, or thumbnail if available
  return (
    <div className={`${sizeClasses[size]} relative rounded-2xl overflow-hidden flex-shrink-0 border border-zinc-700/50`}>
      {hasThumb && !gifError ? (
        <>
          <img
            src={`https://img.youtube.com/vi/${media.videoId}/mqdefault.jpg`}
            alt=""
            className="w-full h-full object-cover"
            onError={() => setThumbError(true)}
            loading="lazy"
          />
          <div className={`absolute inset-0 bg-gradient-to-br ${muscleStyle.gradient} opacity-30`} />
          <div className="absolute inset-0 flex items-center justify-center">
            <span className={`${size === 'sm' ? 'text-xs' : 'text-xs'} bg-black/40 backdrop-blur-sm text-white px-1.5 py-0.5 rounded-full font-bold uppercase tracking-wider`}>
              {muscleStyle.label}
            </span>
          </div>
        </>
      ) : (
        <div className={`w-full h-full bg-gradient-to-br ${muscleStyle.gradient} flex flex-col items-center justify-center gap-0.5`}>
          <span className={fontSizes[size]}>{muscleStyle.emoji}</span>
          {size !== "sm" && (
            <span className={`${labelSizes[size]} text-white/90 font-bold uppercase tracking-wider`}>{muscleStyle.label}</span>
          )}
        </div>
      )}
    </div>
  );
}