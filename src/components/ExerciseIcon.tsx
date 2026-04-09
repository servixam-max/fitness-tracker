"use client";

import React from "react";

// Map exercise IDs to SVG illustrations
// Style: minimalist stick figures, white/orange on dark, gym instruction style

interface ExerciseIconProps {
  exerciseId: string;
  className?: string;
  size?: number;
}

function PressBancaMancuernas({ size = 80 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Bench */}
      <rect x="15" y="50" width="50" height="4" rx="2" fill="#f97316" opacity="0.4" />
      <rect x="20" y="54" width="6" height="16" rx="2" fill="#f97316" opacity="0.3" />
      <rect x="54" y="54" width="6" height="16" rx="2" fill="#f97316" opacity="0.3" />
      {/* Body on bench */}
      <circle cx="30" cy="35" r="5" stroke="white" strokeWidth="2" fill="none" />
      <line x1="35" y1="35" x2="55" y2="35" stroke="white" strokeWidth="2" />
      {/* Legs */}
      <line x1="55" y1="35" x2="60" y2="55" stroke="white" strokeWidth="2" />
      <line x1="55" y1="35" x2="50" y2="55" stroke="white" strokeWidth="2" />
      {/* Arms up with dumbbells */}
      <line x1="35" y1="35" x2="28" y2="22" stroke="white" strokeWidth="2" />
      <line x1="35" y1="35" x2="48" y2="22" stroke="white" strokeWidth="2" />
      {/* Dumbbells */}
      <rect x="23" y="17" width="10" height="4" rx="1" fill="#f97316" />
      <rect x="43" y="17" width="10" height="4" rx="1" fill="#f97316" />
      {/* Arrow up */}
      <path d="M38 14 L40 10 L42 14" stroke="#f97316" strokeWidth="1.5" fill="none" />
    </svg>
  );
}

function AperturasFlyes({ size = 80 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Bench */}
      <rect x="15" y="50" width="50" height="4" rx="2" fill="#f97316" opacity="0.4" />
      <rect x="20" y="54" width="6" height="16" rx="2" fill="#f97316" opacity="0.3" />
      <rect x="54" y="54" width="6" height="16" rx="2" fill="#f97316" opacity="0.3" />
      {/* Body */}
      <circle cx="30" cy="35" r="5" stroke="white" strokeWidth="2" fill="none" />
      <line x1="35" y1="35" x2="55" y2="35" stroke="white" strokeWidth="2" />
      <line x1="55" y1="35" x2="60" y2="55" stroke="white" strokeWidth="2" />
      <line x1="55" y1="35" x2="50" y2="55" stroke="white" strokeWidth="2" />
      {/* Arms spread open */}
      <line x1="35" y1="35" x2="12" y2="28" stroke="white" strokeWidth="2" />
      <line x1="35" y1="35" x2="62" y2="28" stroke="white" strokeWidth="2" />
      {/* Dumbbells at ends */}
      <rect x="6" y="23" width="10" height="4" rx="1" fill="#f97316" />
      <rect x="58" y="23" width="10" height="4" rx="1" fill="#f97316" />
      {/* Arrows closing */}
      <path d="M18 30 L22 28" stroke="#f97316" strokeWidth="1.5" fill="none" />
      <path d="M56 30 L52 28" stroke="#f97316" strokeWidth="1.5" fill="none" />
    </svg>
  );
}

function Pullovers({ size = 80 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Bench */}
      <rect x="15" y="50" width="50" height="4" rx="2" fill="#f97316" opacity="0.4" />
      <rect x="20" y="54" width="6" height="16" rx="2" fill="#f97316" opacity="0.3" />
      <rect x="54" y="54" width="6" height="16" rx="2" fill="#f97316" opacity="0.3" />
      {/* Body */}
      <circle cx="32" cy="38" r="5" stroke="white" strokeWidth="2" fill="none" />
      <line x1="37" y1="38" x2="57" y2="38" stroke="white" strokeWidth="2" />
      <line x1="57" y1="38" x2="62" y2="55" stroke="white" strokeWidth="2" />
      <line x1="57" y1="38" x2="52" y2="55" stroke="white" strokeWidth="2" />
      {/* Arms going back over head */}
      <line x1="34" y1="38" x2="18" y2="20" stroke="white" strokeWidth="2" />
      {/* Single dumbbell held with both hands */}
      <rect x="12" y="14" width="12" height="4" rx="1" fill="#f97316" />
      {/* Arrow curving back */}
      <path d="M22 12 L18 8" stroke="#f97316" strokeWidth="1.5" fill="none" />
    </svg>
  );
}

function RemoUnaMano({ size = 80 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Bench side */}
      <rect x="10" y="45" width="25" height="4" rx="2" fill="#f97316" opacity="0.4" />
      <rect x="12" y="49" width="5" height="18" rx="2" fill="#f97316" opacity="0.3" />
      {/* Body bent over */}
      <circle cx="55" cy="25" r="5" stroke="white" strokeWidth="2" fill="none" />
      <line x1="50" y1="25" x2="30" y2="42" stroke="white" strokeWidth="2" />
      {/* Supporting arm on bench */}
      <line x1="45" y1="30" x2="22" y2="44" stroke="white" strokeWidth="2" />
      {/* Back leg */}
      <line x1="30" y1="42" x2="22" y2="60" stroke="white" strokeWidth="2" />
      {/* Front leg */}
      <line x1="30" y1="42" x2="42" y2="60" stroke="white" strokeWidth="2" />
      {/* Rowing arm pulling up */}
      <line x1="55" y1="25" x2="60" y2="38" stroke="white" strokeWidth="2" />
      {/* Dumbbell */}
      <rect x="56" y="38" width="8" height="4" rx="1" fill="#f97316" />
      {/* Arrow pulling up */}
      <path d="M62 42 L62 36" stroke="#f97316" strokeWidth="1.5" fill="none" />
    </svg>
  );
}

function RemoAlto({ size = 80 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Body bent forward */}
      <circle cx="45" cy="20" r="5" stroke="white" strokeWidth="2" fill="none" />
      <line x1="42" y1="24" x2="35" y2="45" stroke="white" strokeWidth="2" />
      {/* Legs */}
      <line x1="35" y1="45" x2="28" y2="65" stroke="white" strokeWidth="2" />
      <line x1="35" y1="45" x2="42" y2="65" stroke="white" strokeWidth="2" />
      {/* Arms pulling up */}
      <line x1="42" y1="30" x2="28" y2="22" stroke="white" strokeWidth="2" />
      <line x1="42" y1="30" x2="62" y2="22" stroke="white" strokeWidth="2" />
      {/* Dumbbells at elbow height */}
      <rect x="22" y="16" width="10" height="4" rx="1" fill="#f97316" />
      <rect x="56" y="16" width="10" height="4" rx="1" fill="#f97316" />
      {/* Arrows up */}
      <path d="M27 20 L27 16" stroke="#f97316" strokeWidth="1.5" fill="none" />
      <path d="M61 20 L61 16" stroke="#f97316" strokeWidth="1.5" fill="none" />
    </svg>
  );
}

function Encogimientos({ size = 80 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Body standing */}
      <circle cx="40" cy="18" r="5" stroke="white" strokeWidth="2" fill="none" />
      <line x1="40" y1="23" x2="40" y2="50" stroke="white" strokeWidth="2" />
      {/* Legs */}
      <line x1="40" y1="50" x2="30" y2="70" stroke="white" strokeWidth="2" />
      <line x1="40" y1="50" x2="50" y2="70" stroke="white" strokeWidth="2" />
      {/* Arms at sides with dumbbells */}
      <line x1="40" y1="28" x2="25" y2="42" stroke="white" strokeWidth="2" />
      <line x1="40" y1="28" x2="55" y2="42" stroke="white" strokeWidth="2" />
      <rect x="20" y="42" width="8" height="4" rx="1" fill="#f97316" />
      <rect x="52" y="42" width="8" height="4" rx="1" fill="#f97316" />
      {/* Shoulders shrugged up - arrows up */}
      <path d="M35 16 L37 12" stroke="#f97316" strokeWidth="1.5" fill="none" />
      <path d="M45 16 L43 12" stroke="#f97316" strokeWidth="1.5" fill="none" />
    </svg>
  );
}

function PressHombros({ size = 80 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Bench with backrest */}
      <rect x="35" y="35" width="4" height="30" rx="2" fill="#f97316" opacity="0.3" />
      <rect x="20" y="50" width="40" height="4" rx="2" fill="#f97316" opacity="0.4" />
      <rect x="22" y="54" width="6" height="14" rx="2" fill="#f97316" opacity="0.3" />
      <rect x="52" y="54" width="6" height="14" rx="2" fill="#f97316" opacity="0.3" />
      {/* Body seated */}
      <circle cx="38" cy="25" r="5" stroke="white" strokeWidth="2" fill="none" />
      <line x1="38" y1="30" x2="38" y2="48" stroke="white" strokeWidth="2" />
      {/* Legs seated */}
      <line x1="38" y1="48" x2="28" y2="62" stroke="white" strokeWidth="2" />
      <line x1="38" y1="48" x2="48" y2="62" stroke="white" strokeWidth="2" />
      {/* Arms pressing up */}
      <line x1="38" y1="32" x2="28" y2="14" stroke="white" strokeWidth="2" />
      <line x1="38" y1="32" x2="52" y2="14" stroke="white" strokeWidth="2" />
      {/* Dumbbells overhead */}
      <rect x="22" y="8" width="10" height="4" rx="1" fill="#f97316" />
      <rect x="46" y="8" width="10" height="4" rx="1" fill="#f97316" />
      {/* Arrow up */}
      <path d="M36 6 L38 2 L40 6" stroke="#f97316" strokeWidth="1.5" fill="none" />
    </svg>
  );
}

function ElevacionesLaterales({ size = 80 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Body standing */}
      <circle cx="40" cy="18" r="5" stroke="white" strokeWidth="2" fill="none" />
      <line x1="40" y1="23" x2="40" y2="50" stroke="white" strokeWidth="2" />
      <line x1="40" y1="50" x2="30" y2="70" stroke="white" strokeWidth="2" />
      <line x1="40" y1="50" x2="50" y2="70" stroke="white" strokeWidth="2" />
      {/* Arms lateral raise */}
      <line x1="40" y1="28" x2="10" y2="28" stroke="white" strokeWidth="2" />
      <line x1="40" y1="28" x2="70" y2="28" stroke="white" strokeWidth="2" />
      {/* Dumbbells */}
      <rect x="4" y="25" width="10" height="4" rx="1" fill="#f97316" />
      <rect x="66" y="25" width="10" height="4" rx="1" fill="#f97316" />
    </svg>
  );
}

function CurlBicepsAlterno({ size = 80 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Body standing */}
      <circle cx="40" cy="18" r="5" stroke="white" strokeWidth="2" fill="none" />
      <line x1="40" y1="23" x2="40" y2="50" stroke="white" strokeWidth="2" />
      <line x1="40" y1="50" x2="30" y2="70" stroke="white" strokeWidth="2" />
      <line x1="40" y1="50" x2="50" y2="70" stroke="white" strokeWidth="2" />
      {/* Left arm curled up */}
      <line x1="40" y1="30" x2="28" y2="30" stroke="white" strokeWidth="2" />
      <line x1="28" y1="30" x2="28" y2="42" stroke="white" strokeWidth="2" />
      <rect x="22" y="42" width="10" height="4" rx="1" fill="#f97316" />
      {/* Right arm straight down */}
      <line x1="40" y1="30" x2="55" y2="30" stroke="white" strokeWidth="2" />
      <line x1="55" y1="30" x2="55" y2="50" stroke="white" strokeWidth="2" />
      <rect x="50" y="50" width="10" height="4" rx="1" fill="#f97316" opacity="0.5" />
      {/* Curl arrow */}
      <path d="M22 38 L28 34" stroke="#f97316" strokeWidth="1.5" fill="none" />
    </svg>
  );
}

function CurlConcentrado({ size = 80 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Bench */}
      <rect x="20" y="45" width="40" height="4" rx="2" fill="#f97316" opacity="0.4" />
      <rect x="22" y="49" width="5" height="18" rx="2" fill="#f97316" opacity="0.3" />
      <rect x="53" y="49" width="5" height="18" rx="2" fill="#f97316" opacity="0.3" />
      {/* Body seated */}
      <circle cx="38" cy="28" r="5" stroke="white" strokeWidth="2" fill="none" />
      <line x1="38" y1="33" x2="38" y2="44" stroke="white" strokeWidth="2" />
      {/* Legs */}
      <line x1="38" y1="44" x2="28" y2="62" stroke="white" strokeWidth="2" />
      <line x1="38" y1="44" x2="48" y2="62" stroke="white" strokeWidth="2" />
      {/* Elbow on inner thigh, arm curling */}
      <line x1="38" y1="35" x2="30" y2="44" stroke="white" strokeWidth="2" />
      <line x1="30" y1="44" x2="30" y2="32" stroke="white" strokeWidth="2" />
      <rect x="24" y="26" width="10" height="4" rx="1" fill="#f97316" />
    </svg>
  );
}

function CopaTriceps({ size = 80 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Body standing */}
      <circle cx="40" cy="20" r="5" stroke="white" strokeWidth="2" fill="none" />
      <line x1="40" y1="25" x2="40" y2="50" stroke="white" strokeWidth="2" />
      <line x1="40" y1="50" x2="30" y2="70" stroke="white" strokeWidth="2" />
      <line x1="40" y1="50" x2="50" y2="70" stroke="white" strokeWidth="2" />
      {/* Arms overhead holding one DB behind head */}
      <line x1="40" y1="22" x2="40" y2="10" stroke="white" strokeWidth="2" />
      <line x1="40" y1="10" x2="40" y2="30" stroke="white" strokeWidth="2" />
      {/* Dumbbell behind head */}
      <rect x="34" y="30" width="12" height="5" rx="1" fill="#f97316" />
      {/* Both hands holding */}
      <circle cx="40" cy="10" r="2" fill="white" />
      {/* Arrow extending up */}
      <path d="M38 30 L38 24" stroke="#f97316" strokeWidth="1.5" fill="none" />
    </svg>
  );
}

function ExtensionTricepsBanco({ size = 80 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Bench */}
      <rect x="15" y="50" width="50" height="4" rx="2" fill="#f97316" opacity="0.4" />
      <rect x="20" y="54" width="6" height="16" rx="2" fill="#f97316" opacity="0.3" />
      <rect x="54" y="54" width="6" height="16" rx="2" fill="#f97316" opacity="0.3" />
      {/* Body on bench */}
      <circle cx="30" cy="38" r="5" stroke="white" strokeWidth="2" fill="none" />
      <line x1="35" y1="38" x2="55" y2="38" stroke="white" strokeWidth="2" />
      <line x1="55" y1="38" x2="60" y2="55" stroke="white" strokeWidth="2" />
      <line x1="55" y1="38" x2="50" y2="55" stroke="white" strokeWidth="2" />
      {/* Arms extending with DBs toward shoulders */}
      <line x1="35" y1="38" x2="25" y2="38" stroke="white" strokeWidth="2" />
      <line x1="25" y1="38" x2="25" y2="28" stroke="white" strokeWidth="2" />
      <rect x="20" y="22" width="10" height="4" rx="1" fill="#f97316" />
      <line x1="35" y1="38" x2="45" y2="38" stroke="white" strokeWidth="2" />
      <line x1="45" y1="38" x2="45" y2="28" stroke="white" strokeWidth="2" />
      <rect x="40" y="22" width="10" height="4" rx="1" fill="#f97316" />
      {/* Extend arrow */}
      <path d="M25 20 L25 14" stroke="#f97316" strokeWidth="1.5" fill="none" />
    </svg>
  );
}

function SentadillaGoblet({ size = 80 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Head */}
      <circle cx="40" cy="14" r="5" stroke="white" strokeWidth="2" fill="none" />
      {/* Torso */}
      <line x1="40" y1="19" x2="40" y2="42" stroke="white" strokeWidth="2" />
      {/* Legs in squat */}
      <line x1="40" y1="42" x2="26" y2="58" stroke="white" strokeWidth="2" />
      <line x1="26" y1="58" x2="28" y2="72" stroke="white" strokeWidth="2" />
      <line x1="40" y1="42" x2="54" y2="58" stroke="white" strokeWidth="2" />
      <line x1="54" y1="58" x2="52" y2="72" stroke="white" strokeWidth="2" />
      {/* Arms holding DB at chest */}
      <line x1="40" y1="24" x2="32" y2="32" stroke="white" strokeWidth="2" />
      <line x1="40" y1="24" x2="48" y2="32" stroke="white" strokeWidth="2" />
      {/* DB vertical at chest */}
      <rect x="36" y="32" width="8" height="8" rx="2" fill="#f97316" />
      {/* Squat arrow down */}
      <path d="M20 36 L16 42" stroke="#f97316" strokeWidth="1.5" fill="none" />
      <path d="M60 36 L64 42" stroke="#f97316" strokeWidth="1.5" fill="none" />
    </svg>
  );
}

function SentadillaBulgara({ size = 80 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Head */}
      <circle cx="48" cy="14" r="5" stroke="white" strokeWidth="2" fill="none" />
      {/* Torso */}
      <line x1="48" y1="19" x2="46" y2="42" stroke="white" strokeWidth="2" />
      {/* Front leg */}
      <line x1="46" y1="42" x2="55" y2="58" stroke="white" strokeWidth="2" />
      <line x1="55" y1="58" x2="58" y2="72" stroke="white" strokeWidth="2" />
      {/* Back foot on bench */}
      <line x1="46" y1="42" x2="22" y2="55" stroke="white" strokeWidth="2" />
      {/* Bench behind */}
      <rect x="10" y="55" width="20" height="4" rx="2" fill="#f97316" opacity="0.4" />
      <rect x="12" y="59" width="5" height="14" rx="2" fill="#f97316" opacity="0.3" />
      {/* Arms with DBs */}
      <line x1="48" y1="24" x2="36" y2="38" stroke="white" strokeWidth="2" />
      <line x1="48" y1="24" x2="60" y2="38" stroke="white" strokeWidth="2" />
      <rect x="31" y="38" width="8" height="4" rx="1" fill="#f97316" />
      <rect x="56" y="38" width="8" height="4" rx="1" fill="#f97316" />
    </svg>
  );
}

function PesoMuertoRumano({ size = 80 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Head */}
      <circle cx="40" cy="14" r="5" stroke="white" strokeWidth="2" fill="none" />
      {/* Torso leaning forward */}
      <line x1="40" y1="19" x2="40" y2="45" stroke="white" strokeWidth="2" />
      {/* Legs slightly bent */}
      <line x1="40" y1="45" x2="32" y2="68" stroke="white" strokeWidth="2" />
      <line x1="40" y1="45" x2="48" y2="68" stroke="white" strokeWidth="2" />
      {/* Arms hanging with DBs */}
      <line x1="40" y1="25" x2="32" y2="52" stroke="white" strokeWidth="2" />
      <line x1="40" y1="25" x2="48" y2="52" stroke="white" strokeWidth="2" />
      <rect x="26" y="52" width="10" height="4" rx="1" fill="#f97316" />
      <rect x="44" y="52" width="10" height="4" rx="1" fill="#f97316" />
      {/* Forward lean arrow */}
      <path d="M34 16 L28 18" stroke="#f97316" strokeWidth="1.5" fill="none" />
    </svg>
  );
}

function Estocadas({ size = 80 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Head */}
      <circle cx="40" cy="12" r="5" stroke="white" strokeWidth="2" fill="none" />
      {/* Torso */}
      <line x1="40" y1="17" x2="40" y2="40" stroke="white" strokeWidth="2" />
      {/* Front leg lunge */}
      <line x1="40" y1="40" x2="55" y2="52" stroke="white" strokeWidth="2" />
      <line x1="55" y1="52" x2="58" y2="72" stroke="white" strokeWidth="2" />
      {/* Back leg */}
      <line x1="40" y1="40" x2="22" y2="56" stroke="white" strokeWidth="2" />
      <line x1="22" y1="56" x2="18" y2="72" stroke="white" strokeWidth="2" />
      {/* Arms with DBs */}
      <line x1="40" y1="22" x2="28" y2="36" stroke="white" strokeWidth="2" />
      <line x1="40" y1="22" x2="52" y2="36" stroke="white" strokeWidth="2" />
      <rect x="23" y="36" width="8" height="4" rx="1" fill="#f97316" />
      <rect x="48" y="36" width="8" height="4" rx="1" fill="#f97316" />
    </svg>
  );
}

function PesoMuertoUnaPierna({ size = 80 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Head */}
      <circle cx="38" cy="14" r="5" stroke="white" strokeWidth="2" fill="none" />
      {/* Torso leaning */}
      <line x1="38" y1="19" x2="42" y2="42" stroke="white" strokeWidth="2" />
      {/* Standing leg */}
      <line x1="42" y1="42" x2="44" y2="68" stroke="white" strokeWidth="2" />
      {/* Back leg raised */}
      <line x1="38" y1="19" x2="62" y2="32" stroke="white" strokeWidth="2" />
      {/* Arms with DBs hanging */}
      <line x1="40" y1="25" x2="32" y2="50" stroke="white" strokeWidth="2" />
      <line x1="40" y1="25" x2="50" y2="50" stroke="white" strokeWidth="2" />
      <rect x="26" y="50" width="10" height="4" rx="1" fill="#f97316" />
      <rect x="46" y="50" width="10" height="4" rx="1" fill="#f97316" />
    </svg>
  );
}

function SentadillaSalto({ size = 80 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Head */}
      <circle cx="40" cy="10" r="5" stroke="white" strokeWidth="2" fill="none" />
      {/* Torso */}
      <line x1="40" y1="15" x2="40" y2="35" stroke="white" strokeWidth="2" />
      {/* Legs tucked from jump */}
      <line x1="40" y1="35" x2="30" y2="48" stroke="white" strokeWidth="2" />
      <line x1="30" y1="48" x2="28" y2="58" stroke="white" strokeWidth="2" />
      <line x1="40" y1="35" x2="50" y2="48" stroke="white" strokeWidth="2" />
      <line x1="50" y1="48" x2="52" y2="58" stroke="white" strokeWidth="2" />
      {/* Arms with DB at chest */}
      <line x1="40" y1="20" x2="32" y2="28" stroke="white" strokeWidth="2" />
      <line x1="40" y1="20" x2="48" y2="28" stroke="white" strokeWidth="2" />
      <rect x="36" y="28" width="8" height="8" rx="2" fill="#f97316" />
      {/* Jump lines */}
      <line x1="24" y1="62" x2="20" y2="72" stroke="#f97316" strokeWidth="1" opacity="0.5" />
      <line x1="40" y1="62" x2="40" y2="72" stroke="#f97316" strokeWidth="1" opacity="0.5" />
      <line x1="56" y1="62" x2="60" y2="72" stroke="#f97316" strokeWidth="1" opacity="0.5" />
    </svg>
  );
}

function ElevacionTalones({ size = 80 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Head */}
      <circle cx="40" cy="16" r="5" stroke="white" strokeWidth="2" fill="none" />
      {/* Torso */}
      <line x1="40" y1="21" x2="40" y2="48" stroke="white" strokeWidth="2" />
      {/* Legs straight */}
      <line x1="40" y1="48" x2="32" y2="60" stroke="white" strokeWidth="2" />
      <line x1="40" y1="48" x2="48" y2="60" stroke="white" strokeWidth="2" />
      {/* Feet on toes */}
      <line x1="32" y1="60" x2="30" y2="72" stroke="white" strokeWidth="2" />
      <line x1="48" y1="60" x2="50" y2="72" stroke="white" strokeWidth="2" />
      {/* Arms with DBs */}
      <line x1="40" y1="26" x2="28" y2="38" stroke="white" strokeWidth="2" />
      <line x1="40" y1="26" x2="52" y2="38" stroke="white" strokeWidth="2" />
      <rect x="22" y="38" width="10" height="4" rx="1" fill="#f97316" />
      <rect x="48" y="38" width="10" height="4" rx="1" fill="#f97316" />
      {/* Up arrow on heels */}
      <path d="M28 72 L30 66" stroke="#f97316" strokeWidth="1.5" fill="none" />
      <path d="M52 72 L50 66" stroke="#f97316" strokeWidth="1.5" fill="none" />
    </svg>
  );
}

function PuenteGluteo({ size = 80 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Body lying down, hips raised */}
      <circle cx="18" cy="42" r="5" stroke="white" strokeWidth="2" fill="none" />
      {/* Back on floor to hips up */}
      <path d="M23 44 Q40 30 52 44" stroke="white" strokeWidth="2" fill="none" />
      {/* Knees bent */}
      <line x1="52" y1="44" x2="52" y2="58" stroke="white" strokeWidth="2" />
      <line x1="52" y1="58" x2="52" y2="72" stroke="white" strokeWidth="2" />
      <line x1="52" y1="44" x2="40" y2="58" stroke="white" strokeWidth="2" />
      <line x1="40" y1="58" x2="40" y2="72" stroke="white" strokeWidth="2" />
      {/* DB on hips */}
      <rect x="42" y="30" width="10" height="6" rx="2" fill="#f97316" />
      {/* Arrow up */}
      <path d="M47 28 L47 22" stroke="#f97316" strokeWidth="1.5" fill="none" />
    </svg>
  );
}

function CrunchConMancuerna({ size = 80 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Body lying, knees bent */}
      <circle cx="22" cy="36" r="5" stroke="white" strokeWidth="2" fill="none" />
      <line x1="27" y1="38" x2="55" y2="40" stroke="white" strokeWidth="2" />
      {/* Upper body curling up */}
      <path d="M27 38 Q24 30 22 28" stroke="white" strokeWidth="2" fill="none" />
      {/* Knees bent */}
      <line x1="55" y1="40" x2="55" y2="55" stroke="white" strokeWidth="2" />
      <line x1="55" y1="55" x2="55" y2="72" stroke="white" strokeWidth="2" />
      <line x1="55" y1="40" x2="42" y2="55" stroke="white" strokeWidth="2" />
      <line x1="42" y1="55" x2="42" y2="72" stroke="white" strokeWidth="2" />
      {/* DB on chest */}
      <rect x="26" y="32" width="8" height="5" rx="1" fill="#f97316" />
      {/* Curl arrow */}
      <path d="M20 40 L18 34" stroke="#f97316" strokeWidth="1.5" fill="none" />
    </svg>
  );
}

function Plancha({ size = 80 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Head */}
      <circle cx="14" cy="44" r="5" stroke="white" strokeWidth="2" fill="none" />
      {/* Body straight - plank position */}
      <line x1="19" y1="44" x2="62" y2="44" stroke="white" strokeWidth="2" />
      {/* Forearms on ground */}
      <line x1="22" y1="44" x2="22" y2="52" stroke="white" strokeWidth="2" />
      <line x1="14" y1="52" x2="28" y2="52" stroke="white" strokeWidth="2" />
      {/* Toes */}
      <line x1="62" y1="44" x2="62" y2="52" stroke="white" strokeWidth="2" />
      {/* Ground line */}
      <line x1="8" y1="52" x2="72" y2="52" stroke="#f97316" strokeWidth="1" opacity="0.3" />
      {/* Core engagement arrows */}
      <path d="M40 40 L40 34" stroke="#f97316" strokeWidth="1.5" fill="none" />
    </svg>
  );
}

function RussianTwists({ size = 80 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Body seated, leaning back */}
      <circle cx="40" cy="22" r="5" stroke="white" strokeWidth="2" fill="none" />
      <line x1="40" y1="27" x2="40" y2="48" stroke="white" strokeWidth="2" />
      {/* Legs */}
      <line x1="40" y1="48" x2="28" y2="68" stroke="white" strokeWidth="2" />
      <line x1="40" y1="48" x2="52" y2="68" stroke="white" strokeWidth="2" />
      {/* Torso twisted, arms with DB */}
      <line x1="40" y1="30" x2="26" y2="36" stroke="white" strokeWidth="2" />
      <rect x="20" y="34" width="10" height="4" rx="1" fill="#f97316" />
      {/* Twist arrows */}
      <path d="M55 30 L62 34" stroke="#f97316" strokeWidth="1.5" fill="none" />
      <path d="M25 38 L18 42" stroke="#f97316" strokeWidth="1.5" fill="none" />
    </svg>
  );
}

function Thrusters({ size = 80 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Head */}
      <circle cx="40" cy="10" r="5" stroke="white" strokeWidth="2" fill="none" />
      {/* Torso */}
      <line x1="40" y1="15" x2="40" y2="38" stroke="white" strokeWidth="2" />
      {/* Legs in squat */}
      <line x1="40" y1="38" x2="28" y2="52" stroke="white" strokeWidth="2" />
      <line x1="28" y1="52" x2="30" y2="68" stroke="white" strokeWidth="2" />
      <line x1="40" y1="38" x2="52" y2="52" stroke="white" strokeWidth="2" />
      <line x1="52" y1="52" x2="50" y2="68" stroke="white" strokeWidth="2" />
      {/* Arms pressing DB overhead */}
      <line x1="40" y1="18" x2="30" y2="8" stroke="white" strokeWidth="2" />
      <line x1="40" y1="18" x2="50" y2="8" stroke="white" strokeWidth="2" />
      <rect x="24" y="4" width="10" height="4" rx="1" fill="#f97316" />
      <rect x="46" y="4" width="10" height="4" rx="1" fill="#f97316" />
      {/* Combined arrow: squat up + press */}
      <path d="M20 55 L16 60" stroke="#f97316" strokeWidth="1" opacity="0.5" />
      <path d="M60 55 L64 60" stroke="#f97316" strokeWidth="1" opacity="0.5" />
    </svg>
  );
}

function BurpeesConMancuernas({ size = 80 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Figure in squat/burpee position */}
      <circle cx="40" cy="20" r="5" stroke="white" strokeWidth="2" fill="none" />
      <line x1="40" y1="25" x2="40" y2="42" stroke="white" strokeWidth="2" />
      {/* Legs back in plank */}
      <line x1="40" y1="42" x2="28" y2="52" stroke="white" strokeWidth="2" />
      <line x1="40" y1="42" x2="52" y2="52" stroke="white" strokeWidth="2" />
      <line x1="28" y1="52" x2="28" y2="72" stroke="white" strokeWidth="2" />
      <line x1="52" y1="52" x2="52" y2="72" stroke="white" strokeWidth="2" />
      {/* Hands on DBs on ground */}
      <line x1="40" y1="25" x2="28" y2="32" stroke="white" strokeWidth="2" />
      <line x1="40" y1="25" x2="52" y2="32" stroke="white" strokeWidth="2" />
      <rect x="22" y="30" width="8" height="4" rx="1" fill="#f97316" />
      <rect x="48" y="30" width="8" height="4" rx="1" fill="#f97316" />
      {/* Jump arrow up */}
      <path d="M38 16 L40 8 L42 16" stroke="#f97316" strokeWidth="1.5" fill="none" />
    </svg>
  );
}

function CleanAndPress({ size = 80 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Head */}
      <circle cx="40" cy="14" r="5" stroke="white" strokeWidth="2" fill="none" />
      {/* Torso */}
      <line x1="40" y1="19" x2="40" y2="48" stroke="white" strokeWidth="2" />
      {/* Legs */}
      <line x1="40" y1="48" x2="32" y2="68" stroke="white" strokeWidth="2" />
      <line x1="40" y1="48" x2="48" y2="68" stroke="white" strokeWidth="2" />
      {/* Arms - one at shoulder (clean), one pressed up */}
      <line x1="40" y1="24" x2="28" y2="32" stroke="white" strokeWidth="2" />
      <rect x="22" y="30" width="10" height="4" rx="1" fill="#f97316" />
      <line x1="40" y1="22" x2="52" y2="8" stroke="white" strokeWidth="2" />
      <rect x="48" y="4" width="10" height="4" rx="1" fill="#f97316" />
      {/* Arrow */}
      <path d="M38 6 L40 2 L42 6" stroke="#f97316" strokeWidth="1.5" fill="none" />
    </svg>
  );
}

function SwingMancuernas({ size = 80 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Head */}
      <circle cx="40" cy="18" r="5" stroke="white" strokeWidth="2" fill="none" />
      {/* Torso */}
      <line x1="40" y1="23" x2="40" y2="48" stroke="white" strokeWidth="2" />
      {/* Legs wide */}
      <line x1="40" y1="48" x2="28" y2="68" stroke="white" strokeWidth="2" />
      <line x1="40" y1="48" x2="52" y2="68" stroke="white" strokeWidth="2" />
      {/* Arms swinging DB forward */}
      <line x1="40" y1="26" x2="40" y2="18" stroke="white" strokeWidth="2" />
      <line x1="40" y1="18" x2="40" y2="6" stroke="white" strokeWidth="2" />
      {/* DB at top of swing */}
      <rect x="34" y="2" width="12" height="4" rx="1" fill="#f97316" />
      {/* Swing arc */}
      <path d="M26 55 Q40 35 54 55" stroke="#f97316" strokeWidth="1.5" fill="none" opacity="0.5" />
    </svg>
  );
}

function RenegadeRows({ size = 80 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Plank position */}
      <circle cx="16" cy="30" r="5" stroke="white" strokeWidth="2" fill="none" />
      <line x1="21" y1="30" x2="60" y2="30" stroke="white" strokeWidth="2" />
      {/* One hand on DB pulling row */}
      <line x1="18" y1="30" x2="18" y2="18" stroke="white" strokeWidth="2" />
      <rect x="13" y="14" width="8" height="4" rx="1" fill="#f97316" />
      {/* Other hand on DB on ground */}
      <line x1="24" y1="30" x2="24" y2="38" stroke="white" strokeWidth="2" />
      <rect x="19" y="38" width="8" height="4" rx="1" fill="#f97316" opacity="0.5" />
      {/* Feet */}
      <line x1="60" y1="30" x2="60" y2="38" stroke="white" strokeWidth="2" />
      {/* Ground */}
      <line x1="10" y1="38" x2="68" y2="38" stroke="#f97316" strokeWidth="1" opacity="0.3" />
      {/* Row arrow */}
      <path d="M16 16 L16 10" stroke="#f97316" strokeWidth="1.5" fill="none" />
    </svg>
  );
}

function SentadillaCurlPress({ size = 80 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Head */}
      <circle cx="40" cy="12" r="5" stroke="white" strokeWidth="2" fill="none" />
      {/* Torso */}
      <line x1="40" y1="17" x2="40" y2="42" stroke="white" strokeWidth="2" />
      {/* Squat legs */}
      <line x1="40" y1="42" x2="28" y2="55" stroke="white" strokeWidth="2" />
      <line x1="28" y1="55" x2="30" y2="70" stroke="white" strokeWidth="2" />
      <line x1="40" y1="42" x2="52" y2="55" stroke="white" strokeWidth="2" />
      <line x1="52" y1="55" x2="50" y2="70" stroke="white" strokeWidth="2" />
      {/* Arms: one curled, one pressed */}
      <line x1="40" y1="22" x2="28" y2="30" stroke="white" strokeWidth="2" />
      <line x1="28" y1="30" x2="28" y2="22" stroke="white" strokeWidth="2" />
      <rect x="22" y="18" width="10" height="4" rx="1" fill="#f97316" />
      <line x1="40" y1="20" x2="52" y2="6" stroke="white" strokeWidth="2" />
      <rect x="48" y="2" width="10" height="4" rx="1" fill="#f97316" />
    </svg>
  );
}

function MountainClimbers({ size = 80 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Plank position */}
      <circle cx="16" cy="28" r="5" stroke="white" strokeWidth="2" fill="none" />
      <line x1="21" y1="28" x2="58" y2="30" stroke="white" strokeWidth="2" />
      {/* Hands on ground */}
      <line x1="22" y1="28" x2="22" y2="36" stroke="white" strokeWidth="2" />
      {/* One knee driving forward */}
      <line x1="58" y1="30" x2="58" y2="42" stroke="white" strokeWidth="2" />
      <line x1="58" y1="42" x2="58" y2="55" stroke="white" strokeWidth="2" />
      {/* Other leg back */}
      <line x1="38" y1="30" x2="38" y2="42" stroke="white" strokeWidth="2" />
      <line x1="38" y1="42" x2="30" y2="60" stroke="white" strokeWidth="2" />
      {/* Knee drive arrow */}
      <path d="M55 32 L48 28" stroke="#f97316" strokeWidth="1.5" fill="none" />
    </svg>
  );
}

function JumpingJacks({ size = 80 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Head */}
      <circle cx="40" cy="12" r="5" stroke="white" strokeWidth="2" fill="none" />
      {/* Torso */}
      <line x1="40" y1="17" x2="40" y2="45" stroke="white" strokeWidth="2" />
      {/* Legs apart */}
      <line x1="40" y1="45" x2="22" y2="68" stroke="white" strokeWidth="2" />
      <line x1="40" y1="45" x2="58" y2="68" stroke="white" strokeWidth="2" />
      {/* Arms up and out */}
      <line x1="40" y1="22" x2="18" y2="8" stroke="white" strokeWidth="2" />
      <line x1="40" y1="22" x2="62" y2="8" stroke="white" strokeWidth="2" />
      {/* Light DBs */}
      <rect x="12" y="4" width="10" height="3" rx="1" fill="#f97316" opacity="0.6" />
      <rect x="58" y="4" width="10" height="3" rx="1" fill="#f97316" opacity="0.6" />
    </svg>
  );
}

function PlanchaConRow({ size = 80 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Plank position */}
      <circle cx="16" cy="30" r="5" stroke="white" strokeWidth="2" fill="none" />
      <line x1="21" y1="30" x2="58" y2="30" stroke="white" strokeWidth="2" />
      {/* One hand on DB rowing */}
      <line x1="18" y1="28" x2="18" y2="16" stroke="white" strokeWidth="2" />
      <rect x="13" y="12" width="8" height="4" rx="1" fill="#f97316" />
      {/* Other hand on ground */}
      <line x1="24" y1="30" x2="24" y2="38" stroke="white" strokeWidth="2" />
      {/* Feet */}
      <line x1="58" y1="30" x2="58" y2="38" stroke="white" strokeWidth="2" />
      {/* Ground */}
      <line x1="10" y1="38" x2="68" y2="38" stroke="#f97316" strokeWidth="1" opacity="0.3" />
    </svg>
  );
}

function BurpeesAlFallo({ size = 80 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Jumping figure - no weights */}
      <circle cx="40" cy="10" r="5" stroke="white" strokeWidth="2" fill="none" />
      <line x1="40" y1="15" x2="40" y2="38" stroke="white" strokeWidth="2" />
      {/* Legs jumping */}
      <line x1="40" y1="38" x2="28" y2="50" stroke="white" strokeWidth="2" />
      <line x1="28" y1="50" x2="24" y2="60" stroke="white" strokeWidth="2" />
      <line x1="40" y1="38" x2="52" y2="50" stroke="white" strokeWidth="2" />
      <line x1="52" y1="50" x2="56" y2="60" stroke="white" strokeWidth="2" />
      {/* Arms up celebrating */}
      <line x1="40" y1="20" x2="26" y2="8" stroke="white" strokeWidth="2" />
      <line x1="40" y1="20" x2="54" y2="8" stroke="white" strokeWidth="2" />
      {/* Fire/energy lines */}
      <path d="M30 65 L28 72" stroke="#f97316" strokeWidth="1.5" fill="none" />
      <path d="M40 65 L40 74" stroke="#f97316" strokeWidth="1.5" fill="none" />
      <path d="M50 65 L52 72" stroke="#f97316" strokeWidth="1.5" fill="none" />
    </svg>
  );
}

// Icon mapping by exercise ID
const ICON_MAP: Record<string, React.FC<{ size?: number }>> = {
  // Day 1
  d1e1: PressBancaMancuernas,
  d1e2: AperturasFlyes,
  d1e3: Pullovers,
  d1e4: RemoUnaMano,
  d1e5: RemoAlto,
  d1e6: Encogimientos,
  d1e7: PressHombros,
  d1e8: ElevacionesLaterales,
  d1e9: CurlBicepsAlterno,
  d1e10: CurlConcentrado,
  d1e11: CopaTriceps,
  d1e12: ExtensionTricepsBanco,
  // Day 2
  d2e1: SentadillaGoblet,
  d2e2: SentadillaBulgara,
  d2e3: PesoMuertoRumano,
  d2e4: Estocadas,
  d2e5: PesoMuertoUnaPierna,
  d2e6: SentadillaSalto,
  d2e7: ElevacionTalones,
  d2e8: PuenteGluteo,
  d2e9: CrunchConMancuerna,
  d2e10: Plancha,
  d2e11: RussianTwists,
  // Day 3
  d3e1: Thrusters,
  d3e2: BurpeesConMancuernas,
  d3e3: CleanAndPress,
  d3e4: SwingMancuernas,
  d3e5: RenegadeRows,
  d3e6: SentadillaCurlPress,
  d3e7: MountainClimbers,
  d3e8: JumpingJacks,
  d3e9: PlanchaConRow,
  d3e10: BurpeesAlFallo,
};

export default function ExerciseIcon({ exerciseId, className = "", size = 64 }: ExerciseIconProps) {
  const IconComponent = ICON_MAP[exerciseId];
  
  if (!IconComponent) {
    // Fallback generic icon
    return (
      <svg width={size} height={size} viewBox="0 0 80 80" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
        <circle cx="40" cy="20" r="5" stroke="white" strokeWidth="2" fill="none" />
        <line x1="40" y1="25" x2="40" y2="50" stroke="white" strokeWidth="2" />
        <line x1="40" y1="50" x2="30" y2="70" stroke="white" strokeWidth="2" />
        <line x1="40" y1="50" x2="50" y2="70" stroke="white" strokeWidth="2" />
        <line x1="40" y1="30" x2="28" y2="42" stroke="white" strokeWidth="2" />
        <line x1="40" y1="30" x2="52" y2="42" stroke="white" strokeWidth="2" />
        <rect x="22" y="42" width="10" height="4" rx="1" fill="#f97316" />
        <rect x="48" y="42" width="10" height="4" rx="1" fill="#f97316" />
      </svg>
    );
  }
  
  return (
    <div className={className}>
      <IconComponent size={size} />
    </div>
  );
}