"use client";

import React, { useState, useRef, useEffect } from "react";
import { Play, Maximize, Youtube } from "lucide-react";

interface VideoPlayerProps {
  videoId: string;
  title?: string;
  className?: string;
}

export default function VideoPlayer({ videoId, title = "Video demostrativo", className = "" }: VideoPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [thumbnailLoaded, setThumbnailLoaded] = useState(false);
  const [thumbnailError, setThumbnailError] = useState(false);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  const thumbnailUrl = `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;

  // Preload thumbnail
  useEffect(() => {
    const img = new Image();
    img.src = thumbnailUrl;
    img.onload = () => setThumbnailLoaded(true);
    img.onerror = () => setThumbnailError(true);
  }, [thumbnailUrl]);

  return (
    <div className={`relative overflow-hidden rounded-2xl shadow-2xl ${className}`}>
      {/* Main Container */}
      <div className="relative aspect-video bg-gradient-to-br from-zinc-900 to-black">
        {!isPlaying ? (
          /* Thumbnail View */
          <button
            onClick={() => setIsPlaying(true)}
            className="relative w-full h-full group text-left"
            type="button"
          >
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
                <span>VIDEO DEMOSTRATIVO</span>
              </div>
            </div>

            {/* Corner Badge */}
            <div className="absolute top-3 right-3 flex items-center gap-2">
              <div className="px-2 py-1 rounded-md bg-black/60 backdrop-blur text-white text-xs font-bold flex items-center gap-1">
                <Maximize size={12} />
                HD
              </div>
            </div>

            {/* Duration Badge (fake, for aesthetics) */}
            <div className="absolute bottom-3 right-3 px-2 py-1 rounded-md bg-black/80 backdrop-blur text-white text-xs font-medium">
              ▶️ Click para reproducir
            </div>
          </button>
        ) : (
          /* Iframe View */
          <div className="relative w-full h-full">
            <iframe
              ref={iframeRef}
              src={`https://www.youtube.com/embed/${videoId}?rel=0&modestbranding=1&playsinline=1&autoplay=1`}
              title={title}
              className="absolute inset-0 w-full h-full"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        )}
      </div>
    </div>
  );
}