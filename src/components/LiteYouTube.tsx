"use client";

import React from "react";

interface LiteYouTubeProps {
  videoId: string;
  title?: string;
  className?: string;
}

export default function LiteYouTube({ videoId, title = "Exercise video", className = "" }: LiteYouTubeProps) {
  const [loaded, setLoaded] = React.useState(false);

  return (
    <div className={`relative aspect-video bg-zinc-800 rounded-xl overflow-hidden ${className}`}>
      {!loaded && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-16 h-16 rounded-full bg-red-600 flex items-center justify-center animate-pulse">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="white">
              <path d="M8 5v14l11-7z" />
            </svg>
          </div>
        </div>
      )}
      <iframe
        src={`https://www.youtube-nocookie.com/embed/${videoId}?rel=0&modestbranding=1&playsinline=1`}
        title={title}
        className="w-full h-full"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        loading="lazy"
        onLoad={() => setLoaded(true)}
      />
    </div>
  );
}