"use client";

import React from "react";

// Exercise illustration component using animated SVGs
// Each exercise gets a custom animated illustration showing the movement pattern

interface ExerciseIllustrationProps {
  exerciseId: string;
  name: string;
  size?: number;
}

export default function ExerciseIllustration({ exerciseId, name, size = 280 }: ExerciseIllustrationProps) {
  const illustration = getIllustration(exerciseId);
  
  return (
    <div 
      className="relative bg-gradient-to-br from-zinc-800 to-zinc-900 rounded-xl overflow-hidden flex items-center justify-center"
      style={{ width: size, height: size * 0.65, maxWidth: '100%' }}
    >
      <svg
        viewBox="0 0 400 260"
        width={size}
        height={size * 0.65}
        xmlns="http://www.w3.org/2000/svg"
        className="max-w-full"
      >
        {illustration}
      </svg>
      <div className="absolute bottom-2 left-2 right-2 text-center">
        <span className="text-[10px] text-zinc-500 bg-black/40 px-2 py-0.5 rounded-full backdrop-blur-sm">
          {name}
        </span>
      </div>
    </div>
  );
}

function getIllustration(id: string): React.ReactNode {
  const illustrations: Record<string, React.ReactNode> = {
    // DAY 1 - Pecho, Espalda, Brazos
    "d1e1": <DumbbellBenchPress />,
    "d1e2": <DumbbellFly />,
    "d1e3": <Pullover />,
    "d1e4": <OneArmRow />,
    "d1e5": <BentOverRow />,
    "d1e6": <Shrug />,
    "d1e7": <SeatedShoulderPress />,
    "d1e8": <LateralRaise />,
    "d1e9": <AlternatingCurl />,
    "d1e10": <ConcentrationCurl />,
    "d1e11": <TricepExtension />,
    "d1e12": <LyingTricepExtension />,
    
    // DAY 2 - Piernas y Core
    "d2e1": <GobletSquat />,
    "d2e2": <BulgarianSplitSquat />,
    "d2e3": <RomanianDeadlift />,
    "d2e4": <Lunge />,
    "d2e5": <SingleLegDeadlift />,
    "d2e6": <JumpSquat />,
    "d2e7": <CalfRaise />,
    "d2e8": <GluteBridge />,
    "d2e9": <WeightedCrunch />,
    "d2e10": <Plank />,
    "d2e11": <RussianTwist />,
    
    // DAY 3 - HIIT
    "d3e1": <Thruster />,
    "d3e2": <Burpee />,
    "d3e3": <CleanAndPress />,
    "d3e4": <Swing />,
    "d3e5": <RenegadeRow />,
    "d3e6": <SquatToPress />,
    "d3e7": <MountainClimber />,
    "d3e8": <JumpingJack />,
    "d3e9": <PlankRow />,
    "d3e10": <Burpee />,
  };
  
  return illustrations[id] || <GenericExercise />;
}

// ─── ANIMATED SVG COMPONENTS ────────────────────────────────────────────────

// Shared styles
const COLORS = {
  body: "#e2e8f0",
  bodyDark: "#94a3b8",
  dumbbell: "#f97316",
  dumbbellDark: "#ea580c",
  bench: "#475569",
  floor: "#334155",
  accent: "#3b82f6",
  muscle: "#fb923c",
};

function DumbbellBenchPress() {
  return (
    <g>
      {/* Bench */}
      <rect x="120" y="170" width="160" height="12" rx="3" fill={COLORS.bench} />
      <rect x="140" y="182" width="8" height="40" rx="2" fill={COLORS.bench} />
      <rect x="252" y="182" width="8" height="40" rx="2" fill={COLORS.bench} />
      {/* Body lying on bench */}
      <ellipse cx="200" cy="155" rx="55" ry="14" fill={COLORS.body} />
      {/* Head */}
      <circle cx="145" cy="148" r="14" fill={COLORS.body} />
      {/* Arms + Dumbbells - animated */}
      <g>
        <animateTransform attributeName="transform" type="translate" values="0,0;0,-20;0,0" dur="2s" repeatCount="indefinite" />
        {/* Left arm */}
        <line x1="170" y1="148" x2="155" y2="120" stroke={COLORS.body} strokeWidth="6" strokeLinecap="round" />
        {/* Right arm */}
        <line x1="230" y1="148" x2="245" y2="120" stroke={COLORS.body} strokeWidth="6" strokeLinecap="round" />
        {/* Left dumbbell */}
        <rect x="143" y="108" width="24" height="8" rx="3" fill={COLORS.dumbbell} />
        <rect x="140" y="106" width="8" height="12" rx="2" fill={COLORS.dumbbellDark} />
        <rect x="162" y="106" width="8" height="12" rx="2" fill={COLORS.dumbbellDark} />
        {/* Right dumbbell */}
        <rect x="233" y="108" width="24" height="8" rx="3" fill={COLORS.dumbbell} />
        <rect x="230" y="106" width="8" height="12" rx="2" fill={COLORS.dumbbellDark} />
        <rect x="252" y="106" width="8" height="12" rx="2" fill={COLORS.dumbbellDark} />
      </g>
      {/* Muscle highlight */}
      <ellipse cx="200" cy="145" rx="25" ry="8" fill={COLORS.muscle} opacity="0.3">
        <animate attributeName="opacity" values="0.2;0.5;0.2" dur="2s" repeatCount="indefinite" />
      </ellipse>
    </g>
  );
}

function DumbbellFly() {
  return (
    <g>
      <rect x="120" y="170" width="160" height="12" rx="3" fill={COLORS.bench} />
      <rect x="140" y="182" width="8" height="40" rx="2" fill={COLORS.bench} />
      <rect x="252" y="182" width="8" height="40" rx="2" fill={COLORS.bench} />
      <ellipse cx="200" cy="155" rx="55" ry="14" fill={COLORS.body} />
      <circle cx="145" cy="148" r="14" fill={COLORS.body} />
      <g>
        <animateTransform attributeName="transform" type="rotate" values="0 200 148;-40 200 148;0 200 148" dur="2.5s" repeatCount="indefinite" />
        <line x1="170" y1="148" x2="140" y2="135" stroke={COLORS.body} strokeWidth="6" strokeLinecap="round" />
        <rect x="128" y="127" width="24" height="8" rx="3" fill={COLORS.dumbbell} />
        <rect x="125" y="125" width="8" height="12" rx="2" fill={COLORS.dumbbellDark} />
        <rect x="147" y="125" width="8" height="12" rx="2" fill={COLORS.dumbbellDark} />
      </g>
      <g>
        <animateTransform attributeName="transform" type="rotate" values="0 200 148;40 200 148;0 200 148" dur="2.5s" repeatCount="indefinite" />
        <line x1="230" y1="148" x2="260" y2="135" stroke={COLORS.body} strokeWidth="6" strokeLinecap="round" />
        <rect x="248" y="127" width="24" height="8" rx="3" fill={COLORS.dumbbell} />
        <rect x="245" y="125" width="8" height="12" rx="2" fill={COLORS.dumbbellDark} />
        <rect x="267" y="125" width="8" height="12" rx="2" fill={COLORS.dumbbellDark} />
      </g>
      <ellipse cx="200" cy="145" rx="30" ry="8" fill={COLORS.muscle} opacity="0.3">
        <animate attributeName="opacity" values="0.2;0.5;0.2" dur="2.5s" repeatCount="indefinite" />
      </ellipse>
    </g>
  );
}

function Pullover() {
  return (
    <g>
      <rect x="120" y="170" width="160" height="12" rx="3" fill={COLORS.bench} />
      <ellipse cx="200" cy="155" rx="55" ry="14" fill={COLORS.body} />
      <circle cx="145" cy="148" r="14" fill={COLORS.body} />
      <g>
        <animateTransform attributeName="transform" type="rotate" values="0 170 148;-30 170 148;0 170 148" dur="2.5s" repeatCount="indefinite" />
        <line x1="170" y1="148" x2="170" y2="110" stroke={COLORS.body} strokeWidth="6" strokeLinecap="round" />
        <rect x="158" y="98" width="24" height="8" rx="3" fill={COLORS.dumbbell} />
        <rect x="155" y="96" width="8" height="12" rx="2" fill={COLORS.dumbbellDark} />
        <rect x="177" y="96" width="8" height="12" rx="2" fill={COLORS.dumbbellDark} />
      </g>
    </g>
  );
}

function OneArmRow() {
  return (
    <g>
      <rect x="140" y="180" width="8" height="50" rx="2" fill={COLORS.bench} />
      <rect x="120" y="175" width="50" height="10" rx="3" fill={COLORS.bench} />
      {/* Body bent over */}
      <line x1="200" y1="140" x2="200" y2="180" stroke={COLORS.body} strokeWidth="8" strokeLinecap="round" />
      <line x1="200" y1="140" x2="240" y2="160" stroke={COLORS.body} strokeWidth="8" strokeLinecap="round" />
      <circle cx="240" cy="155" r="12" fill={COLORS.body} />
      {/* Supporting arm */}
      <line x1="200" y1="155" x2="155" y2="175" stroke={COLORS.body} strokeWidth="5" strokeLinecap="round" />
      {/* Rowing arm */}
      <g>
        <animateTransform attributeName="transform" type="translate" values="0,15;0,0;0,15" dur="1.5s" repeatCount="indefinite" />
        <line x1="240" y1="160" x2="255" y2="145" stroke={COLORS.body} strokeWidth="5" strokeLinecap="round" />
        <rect x="243" y="133" width="24" height="8" rx="3" fill={COLORS.dumbbell} />
        <rect x="240" y="131" width="8" height="12" rx="2" fill={COLORS.dumbbellDark} />
        <rect x="262" y="131" width="8" height="12" rx="2" fill={COLORS.dumbbellDark} />
      </g>
      <ellipse cx="230" cy="140" rx="15" ry="8" fill={COLORS.muscle} opacity="0.3">
        <animate attributeName="opacity" values="0.2;0.5;0.2" dur="1.5s" repeatCount="indefinite" />
      </ellipse>
    </g>
  );
}

function BentOverRow() {
  return (
    <g>
      <line x1="180" y1="200" x2="180" y2="160" stroke={COLORS.body} strokeWidth="8" strokeLinecap="round" />
      <line x1="180" y1="160" x2="230" y2="140" stroke={COLORS.body} strokeWidth="8" strokeLinecap="round" />
      <circle cx="235" cy="135" r="12" fill={COLORS.body} />
      <g>
        <animateTransform attributeName="transform" type="translate" values="0,12;0,0;0,12" dur="1.5s" repeatCount="indefinite" />
        <line x1="215" y1="145" x2="195" y2="130" stroke={COLORS.body} strokeWidth="5" strokeLinecap="round" />
        <line x1="215" y1="145" x2="245" y2="130" stroke={COLORS.body} strokeWidth="5" strokeLinecap="round" />
        <rect x="183" y="118" width="24" height="8" rx="3" fill={COLORS.dumbbell} />
        <rect x="233" y="118" width="24" height="8" rx="3" fill={COLORS.dumbbell} />
      </g>
    </g>
  );
}

function Shrug() {
  return (
    <g>
      <line x1="200" y1="220" x2="200" y2="150" stroke={COLORS.body} strokeWidth="8" strokeLinecap="round" />
      <line x1="200" y1="150" x2="200" y2="130" stroke={COLORS.body} strokeWidth="10" strokeLinecap="round" />
      <circle cx="200" cy="120" r="14" fill={COLORS.body} />
      <g>
        <animateTransform attributeName="transform" type="translate" values="0,0;0,-8;0,0" dur="1.2s" repeatCount="indefinite" />
        <line x1="200" y1="150" x2="170" y2="165" stroke={COLORS.body} strokeWidth="6" strokeLinecap="round" />
        <line x1="200" y1="150" x2="230" y2="165" stroke={COLORS.body} strokeWidth="6" strokeLinecap="round" />
        <rect x="155" y="163" width="30" height="8" rx="3" fill={COLORS.dumbbell} />
        <rect x="215" y="163" width="30" height="8" rx="3" fill={COLORS.dumbbell} />
      </g>
    </g>
  );
}

function SeatedShoulderPress() {
  return (
    <g>
      <rect x="150" y="180" width="100" height="12" rx="3" fill={COLORS.bench} />
      <rect x="155" y="130" width="8" height="62" rx="2" fill={COLORS.bench} />
      <line x1="200" y1="175" x2="200" y2="140" stroke={COLORS.body} strokeWidth="8" strokeLinecap="round" />
      <circle cx="200" cy="128" r="14" fill={COLORS.body} />
      <g>
        <animateTransform attributeName="transform" type="translate" values="0,0;0,-25;0,0" dur="2s" repeatCount="indefinite" />
        <line x1="200" y1="145" x2="170" y2="125" stroke={COLORS.body} strokeWidth="6" strokeLinecap="round" />
        <line x1="200" y1="145" x2="230" y2="125" stroke={COLORS.body} strokeWidth="6" strokeLinecap="round" />
        <rect x="155" y="113" width="30" height="8" rx="3" fill={COLORS.dumbbell} />
        <rect x="215" y="113" width="30" height="8" rx="3" fill={COLORS.dumbbell} />
      </g>
      <ellipse cx="200" cy="135" rx="20" ry="8" fill={COLORS.muscle} opacity="0.3">
        <animate attributeName="opacity" values="0.2;0.5;0.2" dur="2s" repeatCount="indefinite" />
      </ellipse>
    </g>
  );
}

function LateralRaise() {
  return (
    <g>
      <line x1="200" y1="220" x2="200" y2="150" stroke={COLORS.body} strokeWidth="8" strokeLinecap="round" />
      <circle cx="200" cy="138" r="14" fill={COLORS.body} />
      <g>
        <animateTransform attributeName="transform" type="rotate" values="0 200 155;-45 200 155;0 200 155" dur="2s" repeatCount="indefinite" />
        <line x1="200" y1="155" x2="165" y2="145" stroke={COLORS.body} strokeWidth="6" strokeLinecap="round" />
        <rect x="148" y="137" width="24" height="8" rx="3" fill={COLORS.dumbbell} />
      </g>
      <g>
        <animateTransform attributeName="transform" type="rotate" values="0 200 155;45 200 155;0 200 155" dur="2s" repeatCount="indefinite" />
        <line x1="200" y1="155" x2="235" y2="145" stroke={COLORS.body} strokeWidth="6" strokeLinecap="round" />
        <rect x="228" y="137" width="24" height="8" rx="3" fill={COLORS.dumbbell} />
      </g>
    </g>
  );
}

function AlternatingCurl() {
  return (
    <g>
      <line x1="200" y1="220" x2="200" y2="150" stroke={COLORS.body} strokeWidth="8" strokeLinecap="round" />
      <circle cx="200" cy="138" r="14" fill={COLORS.body} />
      {/* Left arm curling */}
      <g>
        <animateTransform attributeName="transform" type="rotate" values="0 200 155;-90 200 155;0 200 155" dur="2s" repeatCount="indefinite" />
        <line x1="200" y1="155" x2="175" y2="175" stroke={COLORS.body} strokeWidth="6" strokeLinecap="round" />
        <rect x="163" y="167" width="24" height="8" rx="3" fill={COLORS.dumbbell} />
      </g>
      {/* Right arm */}
      <line x1="200" y1="155" x2="225" y2="175" stroke={COLORS.body} strokeWidth="6" strokeLinecap="round" />
      <rect x="223" y="167" width="24" height="8" rx="3" fill={COLORS.dumbbell} />
    </g>
  );
}

function ConcentrationCurl() {
  return (
    <g>
      <rect x="150" y="190" width="100" height="12" rx="3" fill={COLORS.bench} />
      <line x1="200" y1="185" x2="200" y2="150" stroke={COLORS.body} strokeWidth="8" strokeLinecap="round" />
      <circle cx="200" cy="138" r="14" fill={COLORS.body} />
      <line x1="200" y1="155" x2="175" y2="175" stroke={COLORS.body} strokeWidth="6" strokeLinecap="round" />
      <g>
        <animateTransform attributeName="transform" type="rotate" values="0 175 175;-80 175 175;0 175 175" dur="1.8s" repeatCount="indefinite" />
        <line x1="175" y1="175" x2="175" y2="150" stroke={COLORS.body} strokeWidth="5" strokeLinecap="round" />
        <rect x="163" y="140" width="24" height="8" rx="3" fill={COLORS.dumbbell} />
      </g>
    </g>
  );
}

function TricepExtension() {
  return (
    <g>
      <line x1="200" y1="220" x2="200" y2="150" stroke={COLORS.body} strokeWidth="8" strokeLinecap="round" />
      <circle cx="200" cy="138" r="14" fill={COLORS.body} />
      <g>
        <animateTransform attributeName="transform" type="rotate" values="0 200 145;30 200 145;0 200 145" dur="2s" repeatCount="indefinite" />
        <line x1="200" y1="145" x2="185" y2="120" stroke={COLORS.body} strokeWidth="6" strokeLinecap="round" />
        <g>
          <animateTransform attributeName="transform" type="rotate" values="0 185 120;-40 185 120;0 185 120" dur="2s" repeatCount="indefinite" />
          <line x1="185" y1="120" x2="185" y2="95" stroke={COLORS.body} strokeWidth="5" strokeLinecap="round" />
          <rect x="173" y="83" width="24" height="8" rx="3" fill={COLORS.dumbbell} />
        </g>
      </g>
    </g>
  );
}

function LyingTricepExtension() {
  return (
    <g>
      <rect x="120" y="170" width="160" height="12" rx="3" fill={COLORS.bench} />
      <ellipse cx="200" cy="155" rx="55" ry="14" fill={COLORS.body} />
      <circle cx="145" cy="148" r="14" fill={COLORS.body} />
      <g>
        <animateTransform attributeName="transform" type="rotate" values="0 185 148;30 185 148;0 185 148" dur="2s" repeatCount="indefinite" />
        <line x1="170" y1="148" x2="185" y2="125" stroke={COLORS.body} strokeWidth="6" strokeLinecap="round" />
        <rect x="173" y="113" width="24" height="8" rx="3" fill={COLORS.dumbbell} />
      </g>
    </g>
  );
}

// DAY 2 - Legs & Core

function GobletSquat() {
  return (
    <g>
      <g>
        <animateTransform attributeName="transform" type="translate" values="0,0;0,25;0,0" dur="2s" repeatCount="indefinite" />
        <line x1="200" y1="130" x2="200" y2="100" stroke={COLORS.body} strokeWidth="8" strokeLinecap="round" />
        <circle cx="200" cy="88" r="14" fill={COLORS.body} />
        {/* Dumbbell at chest */}
        <rect x="185" y="115" width="30" height="8" rx="3" fill={COLORS.dumbbell} />
        <rect x="182" y="113" width="8" height="12" rx="2" fill={COLORS.dumbbellDark} />
        <rect x="210" y="113" width="8" height="12" rx="2" fill={COLORS.dumbbellDark} />
        {/* Legs */}
        <line x1="200" y1="130" x2="180" y2="170" stroke={COLORS.body} strokeWidth="7" strokeLinecap="round" />
        <line x1="200" y1="130" x2="220" y2="170" stroke={COLORS.body} strokeWidth="7" strokeLinecap="round" />
      </g>
      <ellipse cx="200" cy="155" rx="25" ry="10" fill={COLORS.muscle} opacity="0.3">
        <animate attributeName="opacity" values="0.2;0.5;0.2" dur="2s" repeatCount="indefinite" />
      </ellipse>
    </g>
  );
}

function BulgarianSplitSquat() {
  return (
    <g>
      <rect x="240" y="170" width="50" height="10" rx="3" fill={COLORS.bench} />
      <g>
        <animateTransform attributeName="transform" type="translate" values="0,0;0,20;0,0" dur="2.5s" repeatCount="indefinite" />
        <line x1="180" y1="130" x2="180" y2="95" stroke={COLORS.body} strokeWidth="8" strokeLinecap="round" />
        <circle cx="180" cy="83" r="14" fill={COLORS.body} />
        <line x1="180" y1="130" x2="165" y2="175" stroke={COLORS.body} strokeWidth="7" strokeLinecap="round" />
        <line x1="180" y1="130" x2="255" y2="165" stroke={COLORS.body} strokeWidth="7" strokeLinecap="round" />
        <rect x="165" y="110" width="30" height="8" rx="3" fill={COLORS.dumbbell} />
        <rect x="195" y="110" width="30" height="8" rx="3" fill={COLORS.dumbbell} />
      </g>
    </g>
  );
}

function RomanianDeadlift() {
  return (
    <g>
      <g>
        <animateTransform attributeName="transform" type="rotate" values="0 200 130;25 200 130;0 200 130" dur="2.5s" repeatCount="indefinite" />
        <line x1="200" y1="130" x2="200" y2="95" stroke={COLORS.body} strokeWidth="8" strokeLinecap="round" />
        <circle cx="200" cy="83" r="14" fill={COLORS.body} />
        <line x1="200" y1="130" x2="185" y2="175" stroke={COLORS.body} strokeWidth="7" strokeLinecap="round" />
        <line x1="200" y1="130" x2="215" y2="175" stroke={COLORS.body} strokeWidth="7" strokeLinecap="round" />
        <line x1="200" y1="95" x2="185" y2="130" stroke={COLORS.body} strokeWidth="5" strokeLinecap="round" />
        <line x1="200" y1="95" x2="215" y2="130" stroke={COLORS.body} strokeWidth="5" strokeLinecap="round" />
        <rect x="170" y="125" width="30" height="8" rx="3" fill={COLORS.dumbbell} />
        <rect x="200" y="125" width="30" height="8" rx="3" fill={COLORS.dumbbell} />
      </g>
    </g>
  );
}

function Lunge() {
  return (
    <g>
      <g>
        <animateTransform attributeName="transform" type="translate" values="0,0;0,15;0,0" dur="2s" repeatCount="indefinite" />
        <line x1="200" y1="130" x2="200" y2="95" stroke={COLORS.body} strokeWidth="8" strokeLinecap="round" />
        <circle cx="200" cy="83" r="14" fill={COLORS.body} />
        <line x1="200" y1="130" x2="170" y2="175" stroke={COLORS.body} strokeWidth="7" strokeLinecap="round" />
        <line x1="200" y1="130" x2="235" y2="175" stroke={COLORS.body} strokeWidth="7" strokeLinecap="round" />
        <rect x="185" y="110" width="30" height="8" rx="3" fill={COLORS.dumbbell} />
        <rect x="195" y="110" width="30" height="8" rx="3" fill={COLORS.dumbbell} />
      </g>
    </g>
  );
}

function SingleLegDeadlift() {
  return <RomanianDeadlift />; // Similar movement
}

function JumpSquat() {
  return (
    <g>
      <g>
        <animateTransform attributeName="transform" type="translate" values="0,20;0,-10;0,20" dur="1.5s" repeatCount="indefinite" />
        <line x1="200" y1="130" x2="200" y2="100" stroke={COLORS.body} strokeWidth="8" strokeLinecap="round" />
        <circle cx="200" cy="88" r="14" fill={COLORS.body} />
        <rect x="185" y="115" width="30" height="8" rx="3" fill={COLORS.dumbbell} />
        <line x1="200" y1="130" x2="180" y2="165" stroke={COLORS.body} strokeWidth="7" strokeLinecap="round" />
        <line x1="200" y1="130" x2="220" y2="165" stroke={COLORS.body} strokeWidth="7" strokeLinecap="round" />
      </g>
    </g>
  );
}

function CalfRaise() {
  return (
    <g>
      <line x1="200" y1="160" x2="200" y2="100" stroke={COLORS.body} strokeWidth="8" strokeLinecap="round" />
      <circle cx="200" cy="88" r="14" fill={COLORS.body} />
      <g>
        <animateTransform attributeName="transform" type="translate" values="0,0;0,-8;0,0" dur="1.2s" repeatCount="indefinite" />
        <line x1="200" y1="160" x2="190" y2="195" stroke={COLORS.body} strokeWidth="7" strokeLinecap="round" />
        <line x1="200" y1="160" x2="210" y2="195" stroke={COLORS.body} strokeWidth="7" strokeLinecap="round" />
        <rect x="175" y="155" width="24" height="8" rx="3" fill={COLORS.dumbbell} />
        <rect x="201" y="155" width="24" height="8" rx="3" fill={COLORS.dumbbell} />
      </g>
    </g>
  );
}

function GluteBridge() {
  return (
    <g>
      <g>
        <animateTransform attributeName="transform" type="translate" values="0,10;0,-5;0,10" dur="2s" repeatCount="indefinite" />
        <ellipse cx="200" cy="155" rx="50" ry="12" fill={COLORS.body} />
        <circle cx="150" cy="150" r="12" fill={COLORS.body} />
        <line x1="230" y1="155" x2="250" y2="195" stroke={COLORS.body} strokeWidth="7" strokeLinecap="round" />
        <line x1="230" y1="155" x2="210" y2="195" stroke={COLORS.body} strokeWidth="7" strokeLinecap="round" />
        <rect x="185" y="140" width="30" height="8" rx="3" fill={COLORS.dumbbell} />
      </g>
    </g>
  );
}

function WeightedCrunch() {
  return (
    <g>
      <g>
        <animateTransform attributeName="transform" type="translate" values="0,5;0,0;0,5" dur="1.5s" repeatCount="indefinite" />
        <ellipse cx="200" cy="170" rx="55" ry="12" fill={COLORS.body} />
        <circle cx="200" cy="155" r="14" fill={COLORS.body} />
        <rect x="185" y="145" width="30" height="8" rx="3" fill={COLORS.dumbbell} />
        <line x1="200" y1="180" x2="180" y2="210" stroke={COLORS.body} strokeWidth="6" strokeLinecap="round" />
        <line x1="200" y1="180" x2="220" y2="210" stroke={COLORS.body} strokeWidth="6" strokeLinecap="round" />
      </g>
    </g>
  );
}

function Plank() {
  return (
    <g>
      <g>
        <animateTransform attributeName="transform" type="translate" values="0,0;0,2;0,0" dur="3s" repeatCount="indefinite" />
        <line x1="140" y1="170" x2="260" y2="170" stroke={COLORS.body} strokeWidth="8" strokeLinecap="round" />
        <circle cx="140" cy="165" r="12" fill={COLORS.body} />
        <line x1="140" y1="170" x2="130" y2="210" stroke={COLORS.body} strokeWidth="6" strokeLinecap="round" />
        <line x1="260" y1="170" x2="270" y2="210" stroke={COLORS.body} strokeWidth="6" strokeLinecap="round" />
      </g>
      <ellipse cx="200" cy="165" rx="30" ry="8" fill={COLORS.muscle} opacity="0.3">
        <animate attributeName="opacity" values="0.2;0.4;0.2" dur="3s" repeatCount="indefinite" />
      </ellipse>
    </g>
  );
}

function RussianTwist() {
  return (
    <g>
      <g>
        <animateTransform attributeName="transform" type="rotate" values="0 200 155;15 200 155;-15 200 155;0 200 155" dur="2s" repeatCount="indefinite" />
        <ellipse cx="200" cy="165" rx="40" ry="12" fill={COLORS.body} />
        <circle cx="200" cy="150" r="12" fill={COLORS.body} />
        <line x1="200" y1="155" x2="180" y2="140" stroke={COLORS.body} strokeWidth="5" strokeLinecap="round" />
        <line x1="200" y1="155" x2="220" y2="140" stroke={COLORS.body} strokeWidth="5" strokeLinecap="round" />
        <rect x="168" y="130" width="24" height="8" rx="3" fill={COLORS.dumbbell} />
      </g>
    </g>
  );
}

// DAY 3 - HIIT

function Thruster() {
  return (
    <g>
      <g>
        <animateTransform attributeName="transform" type="translate" values="0,20;0,-10;0,20" dur="2s" repeatCount="indefinite" />
        <line x1="200" y1="130" x2="200" y2="100" stroke={COLORS.body} strokeWidth="8" strokeLinecap="round" />
        <circle cx="200" cy="88" r="14" fill={COLORS.body} />
        <line x1="200" y1="130" x2="185" y2="170" stroke={COLORS.body} strokeWidth="7" strokeLinecap="round" />
        <line x1="200" y1="130" x2="215" y2="170" stroke={COLORS.body} strokeWidth="7" strokeLinecap="round" />
        <line x1="200" y1="100" x2="175" y2="80" stroke={COLORS.body} strokeWidth="5" strokeLinecap="round" />
        <line x1="200" y1="100" x2="225" y2="80" stroke={COLORS.body} strokeWidth="5" strokeLinecap="round" />
        <rect x="160" y="68" width="30" height="8" rx="3" fill={COLORS.dumbbell} />
        <rect x="210" y="68" width="30" height="8" rx="3" fill={COLORS.dumbbell} />
      </g>
    </g>
  );
}

function Burpee() {
  return (
    <g>
      <g>
        <animateTransform attributeName="transform" type="translate" values="0,-20;0,20;0,0;0,-20" dur="3s" repeatCount="indefinite" />
        <line x1="200" y1="130" x2="200" y2="100" stroke={COLORS.body} strokeWidth="8" strokeLinecap="round" />
        <circle cx="200" cy="88" r="14" fill={COLORS.body} />
        <line x1="200" y1="130" x2="185" y2="170" stroke={COLORS.body} strokeWidth="7" strokeLinecap="round" />
        <line x1="200" y1="130" x2="215" y2="170" stroke={COLORS.body} strokeWidth="7" strokeLinecap="round" />
      </g>
    </g>
  );
}

function CleanAndPress() {
  return <Thruster />;
}

function Swing() {
  return (
    <g>
      <g>
        <animateTransform attributeName="transform" type="rotate" values="15 200 130;-15 200 130;15 200 130" dur="1.5s" repeatCount="indefinite" />
        <line x1="200" y1="130" x2="200" y2="95" stroke={COLORS.body} strokeWidth="8" strokeLinecap="round" />
        <circle cx="200" cy="83" r="14" fill={COLORS.body} />
        <line x1="200" y1="130" x2="185" y2="175" stroke={COLORS.body} strokeWidth="7" strokeLinecap="round" />
        <line x1="200" y1="130" x2="215" y2="175" stroke={COLORS.body} strokeWidth="7" strokeLinecap="round" />
        <line x1="200" y1="95" x2="200" y2="130" stroke={COLORS.body} strokeWidth="5" strokeLinecap="round" />
        <rect x="185" y="125" width="30" height="8" rx="3" fill={COLORS.dumbbell} />
      </g>
    </g>
  );
}

function RenegadeRow() {
  return (
    <g>
      <line x1="140" y1="170" x2="260" y2="170" stroke={COLORS.body} strokeWidth="8" strokeLinecap="round" />
      <circle cx="140" cy="165" r="12" fill={COLORS.body} />
      <g>
        <animateTransform attributeName="transform" type="translate" values="0,0;0,-15;0,0" dur="1.5s" repeatCount="indefinite" />
        <line x1="260" y1="170" x2="260" y2="145" stroke={COLORS.body} strokeWidth="5" strokeLinecap="round" />
        <rect x="248" y="133" width="24" height="8" rx="3" fill={COLORS.dumbbell} />
      </g>
      <rect x="128" y="175" width="24" height="8" rx="3" fill={COLORS.dumbbell} />
    </g>
  );
}

function SquatToPress() {
  return <Thruster />;
}

function MountainClimber() {
  return (
    <g>
      <line x1="140" y1="170" x2="260" y2="170" stroke={COLORS.body} strokeWidth="8" strokeLinecap="round" />
      <circle cx="140" cy="165" r="12" fill={COLORS.body} />
      <line x1="260" y1="170" x2="270" y2="210" stroke={COLORS.body} strokeWidth="6" strokeLinecap="round" />
      <g>
        <animateTransform attributeName="transform" type="translate" values="0,0;20,-20;0,0" dur="1s" repeatCount="indefinite" />
        <line x1="140" y1="170" x2="130" y2="210" stroke={COLORS.body} strokeWidth="6" strokeLinecap="round" />
      </g>
    </g>
  );
}

function JumpingJack() {
  return (
    <g>
      <g>
        <animateTransform attributeName="transform" type="translate" values="0,-5;0,0;0,-5" dur="1s" repeatCount="indefinite" />
        <line x1="200" y1="140" x2="200" y2="105" stroke={COLORS.body} strokeWidth="8" strokeLinecap="round" />
        <circle cx="200" cy="93" r="14" fill={COLORS.body} />
        <g>
          <animateTransform attributeName="transform" type="rotate" values="-30 200 120;30 200 120;-30 200 120" dur="1s" repeatCount="indefinite" />
          <line x1="200" y1="120" x2="170" y2="140" stroke={COLORS.body} strokeWidth="6" strokeLinecap="round" />
          <line x1="200" y1="120" x2="230" y2="140" stroke={COLORS.body} strokeWidth="6" strokeLinecap="round" />
        </g>
        <g>
          <animateTransform attributeName="transform" type="rotate" values="-20 200 140;20 200 140;-20 200 140" dur="1s" repeatCount="indefinite" />
          <line x1="200" y1="140" x2="175" y2="185" stroke={COLORS.body} strokeWidth="7" strokeLinecap="round" />
          <line x1="200" y1="140" x2="225" y2="185" stroke={COLORS.body} strokeWidth="7" strokeLinecap="round" />
        </g>
      </g>
    </g>
  );
}

function PlankRow() {
  return <RenegadeRow />;
}

function GenericExercise() {
  return (
    <g>
      <line x1="200" y1="200" x2="200" y2="130" stroke={COLORS.body} strokeWidth="8" strokeLinecap="round" />
      <circle cx="200" cy="118" r="14" fill={COLORS.body} />
      <line x1="200" y1="150" x2="170" y2="170" stroke={COLORS.body} strokeWidth="6" strokeLinecap="round" />
      <line x1="200" y1="150" x2="230" y2="170" stroke={COLORS.body} strokeWidth="6" strokeLinecap="round" />
      <rect x="155" y="165" width="30" height="8" rx="3" fill={COLORS.dumbbell} />
      <rect x="215" y="165" width="30" height="8" rx="3" fill={COLORS.dumbbell} />
      <text x="200" y="230" textAnchor="middle" fill="#64748b" fontSize="12">Ejercicio</text>
    </g>
  );
}