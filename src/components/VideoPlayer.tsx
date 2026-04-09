"use client";

import React, { useState } from "react";
import { Play, Maximize } from "lucide-react";

interface VideoPlayerProps {
  videoId: string;
  title?: string;
  className?: string;
}

export default function VideoPlayer({ videoId, title = "Video demostrativo", className = "" }: VideoPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [loaded, setLoaded] = useState(false);

  const thumbnailUrl = `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;

  return (
    <div className={`relative group ${className}`}>
      {/* Main Container */}
      <div className="relative aspect-video bg-zinc-900 rounded-2xl overflow-hidden shadow-2xl border border-zinc-800">
        {!isPlaying ? (
          /* Thumbnail View */
          <button
            onClick={() => setIsPlaying(true)}
            className="relative w-full h-full group"
          >
            {/* High-Quality Thumbnail */}
            <img
              src={thumbnailUrl}
              alt={title}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              loading="lazy"
              onError={(e) => {
                // Fallback to hqdefault if maxresdefault fails
                (e.target as HTMLImageElement).src = `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;
              }}
            />
            
            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />
            
            {/* Play Button */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="relative">
                {/* Outer Ring */}
                <div className="absolute inset-0 rounded-full bg-red-600 blur-xl opacity-60 group-hover:opacity-80 transition-opacity" />
                
                {/* Main Button */}
                <div className="relative w-24 h-24 rounded-full bg-red-600 flex items-center justify-center shadow-2xl shadow-red-600/50 group-hover:scale-110 transition-all duration-300">
                  <Play size={40} className="text-white ml-1" fill="white" />
                </div>
              </div>
            </div>

            {/* Title & Info */}
            <div className="absolute bottom-0 left-0 right-0 p-4">
              <p className="text-white font-bold text-lg drop-shadow-lg mb-1">{title}</p>
              <div className="flex items-center gap-2 text-white/80 text-sm">
                <span className="flex items-center gap-1">
                  <Play size={12} />
                  YouTube
                </span>
                <span>•</span>
                <span className="flex items-center gap-1">
                  <Maximize size={12} />
                  HD
                </span>
              </div>
            </div>

            {/* Quality Badge */}
            <div className="absolute top-3 right-3 px-2 py-1 rounded-md bg-red-600 text-white text-xs font-bold">
              VIDEO
            </div>
          </button>
        ) : (
          /* Iframe View */
          <iframe
            src={`https://www.youtube-nocookie.com/embed/${videoId}?rel=0&modestbranding=1&playsinline=1&autoplay=1`}
            title={title}
            className="w-full h-full"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            onLoad={() => setLoaded(true)}
          />
        )}
      </div>

      {/* Loading Indicator */}
      {!loaded && isPlaying && (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="w-12 h-12 rounded-full border-4 border-red-600 border-t-transparent animate-spin" />
        </div>
      )}
    </div>
  );
}