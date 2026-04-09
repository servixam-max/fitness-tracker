"use client";

import React from "react";
import { getExerciseMedia } from "@/data/workouts";
import { Dumbbell } from "lucide-react";

interface ExerciseGIFProps {
  exerciseId: string;
  size?: "sm" | "md" | "lg" | "full";
  showVideo?: boolean;
}

export default function ExerciseGIF({ exerciseId, size = "md", showVideo = false }: ExerciseGIFProps) {
  const media = getExerciseMedia(exerciseId);
  const [loaded, setLoaded] = React.useState(false);
  const [error, setError] = React.useState(false);

  const sizeClasses = {
    sm: "w-16 h-16",
    md: "w-24 h-24",
    lg: "w-40 h-40",
    full: "w-full aspect-video",
  };

  if (showVideo && media.videoId) {
    return null; // YouTube component handles this separately
  }

  return (
    <div className={`${sizeClasses[size]} relative bg-gradient-to-br from-zinc-800 to-zinc-900 rounded-2xl overflow-hidden flex-shrink-0 border border-zinc-700`}>
      {!loaded && !error && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-8 h-8 rounded-full border-2 border-orange-500 border-t-transparent animate-spin" />
        </div>
      )}
      {!error ? (
        <img
          src={media.gif}
          alt="Ejercicio"
          className={`w-full h-full object-cover transition-opacity duration-300 ${loaded ? "opacity-100" : "opacity-0"}`}
          onLoad={() => setLoaded(true)}
          onError={() => {
            setError(true);
            setLoaded(true);
          }}
          loading="lazy"
        />
      ) : (
        <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-orange-500/20 to-red-500/20">
          <Dumbbell size={size === "sm" ? 24 : size === "md" ? 32 : 48} className="text-orange-400 mb-1" />
          {size === "full" && <p className="text-xs text-zinc-500" >GIF no disponible</p>}
        </div>
      )}
    </div>
  );
}