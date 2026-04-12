"use client";

import React, { useState, useEffect } from "react";
import { Play, Maximize, Youtube, AlertCircle } from "lucide-react";

interface VideoPlayerProps {
  videoId: string;
  title?: string;
  className?: string;
}

export default function VideoPlayer({ videoId, title = "Video demostrativo", className = "" }: VideoPlayerProps) {
  const [thumbnailLoaded, setThumbnailLoaded] = useState(false);
  const [thumbnailError, setThumbnailError] = useState(false);

  const thumbnailUrl = `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;
  const watchUrl = `https://www.youtube.com/watch?v=${videoId}`;

  // Preload thumbnail
  useEffect(() => {
    const img = new Image();
    img.src = thumbnailUrl;
    img.onload = () => setThumbnailLoaded(true);
    img.onerror = () => setThumbnailError(true);
  }, [thumbnailUrl]);

  return (
    <a
      href={watchUrl}
      target="_blank"
      rel="noopener noreferrer"
      className={`relative overflow-hidden rounded-2xl shadow-2xl block ${className}`}
    >
      <div className="relative aspect-video bg-gradient-to-br from-zinc-900 to-black">
        {/* Thumbnail View */}
        <div className="relative w-full h-full group">
          {/* Background Image */}
          <div 
            className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
            style={{ 
              backgroundImage: thumbnailError 
                ? `linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)`
                : `url(${thumbnailUrl})`,
            }}
          />
          
          {/* Overlay Gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-black/20" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-transparent to-black/60" />
          
          {/* Loading State */}
          {!thumbnailLoaded && !thumbnailError && (
            <div className="absolute inset-0 flex items-center justify-center bg-zinc-900">
              <Play size={32} className="text-orange-500" />
            </div>
          )}
          
          {/* Content Container */}
          <div className="absolute inset-0 flex flex-col items-center justify-center p-6">
            {/* Play Button */}
            <div className="relative mb-4">
              {/* Pulsing Ring */}
              <div className="absolute inset-0 rounded-full bg-red-600 animate-ping opacity-75" />
              <div className="absolute inset-0 rounded-full bg-gradient-to-r from-red-600 to-orange-600 blur-md" />
              
              {/* Main Button */}
              <div className="relative w-20 h-20 rounded-full bg-gradient-to-br from-red-600 to-red-700 flex items-center justify-center shadow-2xl group-hover:scale-110 transition-all duration-300">
                <Play size={36} className="text-white ml-1" fill="white" />
              </div>
            </div>

            {/* Title */}
            <p className="text-white font-bold text-center text-lg drop-shadow-2xl px-4">
              {title}
            </p>

            {/* Badge */}
            <div className="mt-3 flex items-center gap-2 px-3 py-1.5 rounded-full bg-red-600/90 backdrop-blur text-white text-xs font-semibold">
              <Youtube size={14} />
              <span>ABRIR EN YOUTUBE</span>
            </div>
          </div>

          {/* Corner Badge */}
          <div className="absolute top-3 right-3 flex items-center gap-2">
            <div className="px-2 py-1 rounded-md bg-black/60 backdrop-blur text-white text-xs font-bold flex items-center gap-1">
              <Maximize size={12} />
              HD
            </div>
          </div>

          {/* Info Badge */}
          <div className="absolute bottom-3 right-3 px-2 py-1 rounded-md bg-black/80 backdrop-blur text-white text-xs font-medium">
            ▶️ Click para abrir
          </div>
        </div>
      
        {/* Error State */}
        {thumbnailError && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-br from-red-900/30 to-orange-900/30 backdrop-blur-sm">
            <AlertCircle size={48} className="text-red-400 mb-4" />
            <p className="text-white font-semibold">Click para ver en YouTube</p>
            <p className="text-white/70 text-sm">Se abrirá en una nueva pestaña</p>
          </div>
        )}
      </div>
    </a>
  );
}
