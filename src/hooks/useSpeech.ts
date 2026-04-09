"use client";

import { useCallback, useRef } from "react";

// Custom hook for text-to-speech with Spanish voice
export function useSpeech() {
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);

  const speak = useCallback((text: string, rate: number = 1, onEnd?: () => void) => {
    if (typeof window === "undefined" || !window.speechSynthesis) return;

    // Cancel any ongoing speech
    window.speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "es-ES";
    utterance.rate = rate;
    utterance.pitch = 1;
    utterance.volume = 1;

    // Try to find a Spanish voice
    const voices = window.speechSynthesis.getVoices();
    const spanishVoice = voices.find(
      (v) => v.lang.startsWith("es") && v.name.includes("Google")
    ) || voices.find(
      (v) => v.lang.startsWith("es")
    );
    if (spanishVoice) {
      utterance.voice = spanishVoice;
    }

    if (onEnd) {
      utterance.onend = onEnd;
    }

    utteranceRef.current = utterance;
    window.speechSynthesis.speak(utterance);
  }, []);

  const cancel = useCallback(() => {
    if (typeof window !== "undefined" && window.speechSynthesis) {
      window.speechSynthesis.cancel();
    }
  }, []);

  return { speak, cancel };
}

// Sound effects using Web Audio API
export function useSounds() {
  const audioContextRef = useRef<AudioContext | null>(null);

  const getContext = useCallback(() => {
    if (!audioContextRef.current) {
      audioContextRef.current = new AudioContext();
    }
    return audioContextRef.current;
  }, []);

  const playBeep = useCallback((frequency: number = 800, duration: number = 150, volume: number = 0.3) => {
    try {
      const ctx = getContext();
      const oscillator = ctx.createOscillator();
      const gainNode = ctx.createGain();
      oscillator.connect(gainNode);
      gainNode.connect(ctx.destination);
      oscillator.frequency.value = frequency;
      oscillator.type = "sine";
      gainNode.gain.value = volume;
      oscillator.start();
      gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + duration / 1000);
      oscillator.stop(ctx.currentTime + duration / 1000);
    } catch {}
  }, [getContext]);

  const playCountdown = useCallback(() => {
    // Short beep for countdown
    playBeep(600, 100, 0.2);
  }, [playBeep]);

  const playStartExercise = useCallback(() => {
    // Two ascending beeps = START
    playBeep(600, 120, 0.3);
    setTimeout(() => playBeep(900, 200, 0.4), 150);
  }, [playBeep]);

  const playRestEnd = useCallback(() => {
    // Three quick beeps = rest ending
    playBeep(700, 80, 0.25);
    setTimeout(() => playBeep(700, 80, 0.25), 120);
    setTimeout(() => playBeep(1000, 150, 0.35), 240);
  }, [playBeep]);

  const playSetComplete = useCallback(() => {
    // Happy completion sound
    playBeep(500, 100, 0.2);
    setTimeout(() => playBeep(700, 100, 0.25), 100);
    setTimeout(() => playBeep(900, 200, 0.3), 200);
  }, [playBeep]);

  const playWorkoutComplete = useCallback(() => {
    // Victory fanfare
    const notes = [523, 659, 784, 1047];
    notes.forEach((freq, i) => {
      setTimeout(() => playBeep(freq, 250, 0.35), i * 200);
    });
  }, [playBeep]);

  return { playBeep, playCountdown, playStartExercise, playRestEnd, playSetComplete, playWorkoutComplete };
}