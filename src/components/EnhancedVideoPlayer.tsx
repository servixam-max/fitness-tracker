"use client";

import React, { useState, useEffect } from "react";
import { Play, Youtube, AlertCircle, RefreshCw } from "lucide-react";
import { getExerciseMedia } from "@/data/workouts";

interface EnhancedVideoPlayerProps {
  exerciseId: string;
  title?: string;
  className?: string;
  showPlaceholder?: boolean;
}

export default function EnhancedVideoPlayer({ 
  exerciseId, 
  title = "Video demostrativo", 
  className = "",
  showPlaceholder = true 
}: EnhancedVideoPlayerProps) {
  const [videoId, setVideoId] = useState<string | null>(null);
  const [thumbnail, setThumbnail] = useState("");
  const [embedUrl, setEmbedUrl] = useState("");
  const [isPlaying, setIsPlaying] = useState(false);
  const [thumbnailLoaded, setThumbnailLoaded] = useState(false);
  const [thumbnailError, setThumbnailError] = useState(false);

  useEffect(() => {
    const media = getExerciseMedia(exerciseId);
    if (media?.videoId) {
      const vid = media.videoId;
      setVideoId(vid);
      setThumbnail(`https://img.youtube.com/vi/${vid}/hqdefault.jpg`);
      setEmbedUrl(`https://piped.video/embed/${vid}?rel=0&modestbranding=1&playsinline=1`);
      
      // Preload thumbnail
      const img = new Image();
      img.src = `https://img.youtube.com/vi/${vid}/hqdefault.jpg`;
      img.onload = () => setThumbnailLoaded(true);
      img.onerror = () => setThumbnailError(true);
    }
  }, [exerciseId]);

  if (!videoId) {
    if (!showPlaceholder) return null;
    
    return (
      <div className={`aspect-video bg-gradient-to-br from-zinc-900 to-black rounded-2xl flex flex-col items-center justify-center p-6 border border-zinc-800 ${className}`}>
        <Youtube size={48} className="text-zinc-700 mb-4" />
        <p className="text-zinc-600 text-center font-medium mb-2">Video no disponible</p>
        <p className="text-zinc-500 text-sm text-center">
          Este ejercicio no tiene video demostrativo.
        </p>
      </div>
    );
  }

  return (
    <div className={`relative overflow-hidden rounded-2xl shadow-2xl ${className}`}>
      <div className="relative aspect-video bg-gradient-to-br from-zinc-900 to-black">
        {!isPlaying ? (
          <button
            onClick={() => setIsPlaying(true)}
            className="relative w-full h-full group text-left"
            type="button"
          >
            {/* Background Image with Fallback */}
            <div 
              className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
              style={{ 
                backgroundImage: thumbnailError 
                  ? `linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)`
                  : `url(${thumbnail})`,
              }}
            />
            
            {/* Overlay Gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-black/20" />
            <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-transparent to-black/60" />
            
            {/* Loading State */}
            {!thumbnailLoaded && !thumbnailError && (
              <div className="absolute inset-0 flex items-center justify-center bg-zinc-900">
                <RefreshCw size={32} className="text-orange-500 animate-spin" />
              </div>
            )}
            
            {/* Content Container */}
            <div className="absolute inset-0 flex flex-col items-center justify-center p-6">
              {/* Play Button */}
              <div className="relative mb-4">
                <div className="absolute inset-0 rounded-full bg-red-600 animate-ping opacity-50" />
                <div className="absolute inset-0 rounded-full bg-gradient-to-r from-red-600 to-orange-600 blur-lg opacity-60" />
                <div className="relative w-20 h-20 rounded-full bg-gradient-to-br from-red-600 to-red-700 flex items-center justify-center shadow-2xl group-hover:scale-110 transition-all duration-300">
                  <Play size={36} className="text-white ml-1" fill="white" />
                </div>
              </div>

              {/* Title */}
              <p className="text-white font-bold text-center text-lg drop-shadow-2xl px-4 mb-3">
                {title}
              </p>

              {/* Badge */}
              <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-black/60 backdrop-blur text-white text-sm font-semibold">
                <Youtube size={16} />
                <span>VIDEO DEMOSTRATIVO</span>
              </div>
            </div>

            {/* Quality Badge */}
            <div className="absolute top-3 right-3">
              <div className="px-3 py-1.5 rounded-full bg-black/70 backdrop-blur text-white text-xs font-bold flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-green-500" />
                <span>HD</span>
              </div>
            </div>
          </button>
        ) : (
          <div className="relative w-full h-full">
            <iframe
              src={embedUrl}
              title={title}
              className="absolute inset-0 w-full h-full"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              sandbox="allow-same-origin allow-scripts allow-presentation"
            />
          </div>
        )}
      </div>

      {/* Error State */}
      {thumbnailError && !isPlaying && (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-br from-red-900/30 to-orange-900/30 backdrop-blur-sm">
          <AlertCircle size={48} className="text-red-400 mb-4" />
          <p className="text-white font-semibold mb-2">Video no disponible</p>
          <button
            onClick={() => setIsPlaying(true)}
            className="px-4 py-2 rounded-xl bg-red-600 text-white text-sm font-medium hover:bg-red-700 transition-colors"
          >
            Intentar reproducir directamente
          </button>
        </div>
      )}
    </div>
  );
}
