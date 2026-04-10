import { getExerciseMedia } from "@/data/workouts";

export function getYouTubeVideo(videoId: string) {
  return {
    thumbnail: `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`,
    thumbnailHQ: `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`,
    embedUrl: `https://www.youtube.com/embed/${videoId}?rel=0&modestbranding=1&playsinline=1`,
    watchUrl: `https://www.youtube.com/watch?v=${videoId}`,
  };
}

export function getVideoInfo(exerciseId: string) {
  const media = getExerciseMedia(exerciseId);
  if (!media?.videoId) return null;
  
  return {
    videoId: media.videoId,
    ...getYouTubeVideo(media.videoId),
    isTimeBased: media.isTimeBased || false,
  };
}

export function checkVideoAvailability(videoId: string): Promise<boolean> {
  return new Promise((resolve) => {
    const img = new Image();
    img.onload = () => resolve(true);
    img.onerror = () => resolve(false);
    img.src = `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;
    setTimeout(() => resolve(false), 5000);
  });
}

export const VIDEO_QUALITY = {
  LOW: 'hqdefault.jpg',
  MEDIUM: 'sddefault.jpg', 
  HIGH: 'maxresdefault.jpg',
  DEFAULT: 'maxresdefault.jpg'
} as const;