"use client";

import React from "react";

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

// Muscle groups mapped to exercise IDs we have local images for
const LOCAL_IMAGES: Record<string, string> = {
  "d1e1": "/exercises/d1e1.png",  // Bench press
  "d1e3": "/exercises/d1e3.png",  // Pullover
  "d1e4": "/exercises/d1e4.png",  // Row
  "d1e5": "/exercises/d1e5.png",  // Upright row
  "d1e7": "/exercises/d1e7.png",  // Shoulder press
  "d2e4": "/exercises/d2e4.png",  // Lunges
  "d3e5": "/exercises/d3e5.png",  // Renegade row
  "d3e9": "/exercises/d3e9.png",  // Plank row
};

const MUSCLE_GROUPS: Record<string, string> = {
  "d1e1": "Pecho", "d1e2": "Pecho", "d1e3": "Pecho/Dorsal",
  "d1e4": "Espalda", "d1e5": "Espalda", "d1e6": "Trapecios",
  "d1e7": "Hombros", "d1e8": "Hombros",
  "d1e9": "Bíceps", "d1e10": "Bíceps", "d1e11": "Tríceps", "d1e12": "Tríceps",
  "d2e1": "Cuádriceps", "d2e2": "Pierna/Glúteos", "d2e3": "Isquiotibiales",
  "d2e4": "Pierna", "d2e5": "Isquiotibiales/Glúteos", "d2e6": "Pierna/Potencia",
  "d2e7": "Gemelos", "d2e8": "Glúteos",
  "d2e9": "Core", "d2e10": "Core", "d2e11": "Core/Oblicuos",
  "d3e1": "Full Body", "d3e2": "Full Body", "d3e3": "Full Body",
  "d3e4": "Posterior", "d3e5": "Core/Espalda", "d3e6": "Full Body",
  "d3e7": "Core/Cardio", "d3e8": "Cardio", "d3e9": "Core/Espalda", "d3e10": "Full Body",
};

export default function ExerciseGIF({ exerciseId, size = "md", showVideo = false }: ExerciseGIFProps) {
  const [localError, setLocalError] = React.useState(false);
  const [localLoaded, setLocalLoaded] = React.useState(false);

  const muscleGroup = MUSCLE_GROUPS[exerciseId] || "Full Body";
  const muscleStyle = MUSCLE_STYLES[muscleGroup] || MUSCLE_STYLES["Full Body"];
  const localImage = LOCAL_IMAGES[exerciseId];

  if (showVideo) {
    return null;
  }

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

  // For "full" size - show large card
  if (size === "full") {
    return (
      <div className={`${sizeClasses[size]} relative rounded-2xl overflow-hidden border border-zinc-700 bg-gradient-to-br from-zinc-800 to-zinc-900`}>
        {localImage && !localError ? (
          <img
            src={localImage}
            alt={muscleGroup}
            className="w-full h-full object-cover"
            onLoad={() => setLocalLoaded(true)}
            onError={() => setLocalError(true)}
          />
        ) : (
          <div className={`w-full h-full bg-gradient-to-br ${muscleStyle.gradient} flex flex-col items-center justify-center gap-2`}>
            <span className="text-7xl">{muscleStyle.emoji}</span>
            <span className="text-white/80 text-sm font-medium px-3 py-1 rounded-full bg-black/30 backdrop-blur-sm">{muscleStyle.label}</span>
          </div>
        )}
        {localImage && localLoaded && !localError && (
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
        )}
      </div>
    );
  }

  // For sm, md, lg sizes
  return (
    <div className={`${sizeClasses[size]} relative rounded-2xl overflow-hidden flex-shrink-0 border border-zinc-700/50`}>
      {localImage && !localError ? (
        <>
          <img
            src={localImage}
            alt=""
            className="w-full h-full object-cover"
            onError={() => setLocalError(true)}
          />
          <div className={`absolute inset-0 bg-gradient-to-br ${muscleStyle.gradient} opacity-20`} />
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