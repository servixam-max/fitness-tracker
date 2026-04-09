"use client";

import React, { useState } from "react";
import { Play } from "lucide-react";

interface LiteYouTubeProps {
  videoId: string;
  title?: string;
  className?: string;
  autoPlay?: boolean;
}

export default function LiteYouTube({ videoId, title = "Video demostrativo", className = "", autoPlay = false }: LiteYouTubeProps) {
  const [loaded, setLoaded] = useState(false);
  const [showThumbnail, setShowThumbnail] = useState(true);

  const thumbnailUrl = `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;

  return (
    <div className={`relative aspect-video bg-zinc-800 rounded-2xl overflow-hidden shadow-xl ${className}`}>
      {/* Thumbnail with Play Button */}
      {showThumbnail && (
        <button
          onClick={() => setShowThumbnail(false)}
          className="absolute inset-0 w-full h-full group"
        >
          {/* YouTube Thumbnail */}
          <img
            src={thumbnailUrl}
            alt={title}
            className="w-full h-full object-cover"
            loading="lazy"
          />
          {/* Overlay Gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
          {/* Play Button */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-20 h-20 rounded-full bg-red-600 flex items-center justify-center shadow-2xl shadow-red-600/40 group-hover:scale-110 transition-transform duration-300">
              <Play size={36} className="text-white ml-1" fill="white" />
            </div>
          </div>
          {/* Title */}
          <div className="absolute bottom-4 left-4 right-4">
            <p className="text-white font-semibold text-sm drop-shadow-lg">{title}</p>
          </div>
        </button>
      )}

      {/* YouTube Iframe */}
      <iframe
        src={`https://www.youtube-nocookie.com/embed/${videoId}?rel=0&modestbranding=1&playsinline=1${autoPlay ? '&autoplay=1' : ''}`}
        title={title}
        className={`w-full h-full ${showThumbnail ? 'hidden' : 'block'}`}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        loading="lazy"
        onLoad={() => setLoaded(true)}
      />
    </div>
  );
}