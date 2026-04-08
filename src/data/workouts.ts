// Rutina de entrenamiento personalizada
// Versión simplificada y robusta

export interface Exercise {
  id: string;
  name: string;
  sets: number;
  reps: string;
  rest: string;
  instruction: string;
  tips: string[];
  muscleGroup: string;
}

export interface WorkoutDay {
  id: string;
  name: string;
  subtitle: string;
  color: string;
  duration: string;
  exercises: Exercise[];
  completed: boolean;
}

export const WORKOUT_DAYS: WorkoutDay[] = [
  {
    id: "day1",
    name: "Día 1",
    subtitle: "Tronco Superior",
    color: "from-blue-500 to-cyan-500",
    duration: "45-60 min",
    completed: false,
    exercises: [
      // Bloque 1: Empuje horizontal + Tirón horizontal
      {
        id: "d1e1",
        name: "Press de Banca Plano",
        sets: 3,
        reps: "10-12",
        rest: "90 seg",
        instruction: "Baja la barra al pecho controlado, sube explosivo. Codos a 45° del cuerpo.",
        tips: [
          "Mantén los pies firmes en el suelo",
          "No rebotes la barra en el pecho",
          "Respira: baja inspirando, sube expulsando"
        ],
        muscleGroup: "Pecho"
      },
      {
        id: "d1e2",
        name: "Remo a una Mano",
        sets: 3,
        reps: "10-12",
        rest: "90 seg",
        instruction: "Espalda paralela al suelo, tira del codo hacia el techo apretando el dorsal.",
        tips: [
          "Mantén la espalda recta, no arquees",
          "No uses impulso con el cuerpo",
          "Contrae el dorsal en la subida"
        ],
        muscleGroup: "Espalda"
      },
      
      // Bloque 2: Empuje vertical + Tirón vertical
      {
        id: "d1e3",
        name: "Press Militar Sentado",
        sets: 3,
        reps: "10",
        rest: "90 seg",
        instruction: "Core activado, baja hasta la barbilla sin arquear la espalda.",
        tips: [
          "Core activado todo el tiempo",
          "No bloquees los codos arriba",
          "Mira ligeramente hacia arriba"
        ],
        muscleGroup: "Hombros"
      },
      {
        id: "d1e4",
        name: "Remo Alto con Mancuerna",
        sets: 3,
        reps: "12",
        rest: "90 seg",
        instruction: "Tira los codos hacia arriba, contrayendo trapecios y deltoides posteriores.",
        tips: [
          "Codos altos, más que las manos",
          "No uses impulso de piernas",
          "Contrae trapecios arriba"
        ],
        muscleGroup: "Espalda"
      },
      
      // Bloque 3: Aislamiento Pecho + Tríceps
      {
        id: "d1e5",
        name: "Aperturas (Flyes)",
        sets: 3,
        reps: "12-15",
        rest: "60 seg",
        instruction: "Ligera flexión en codos. Controla la bajada sintiendo el estiramiento.",
        tips: [
          "Mantén ligera flexión en codos",
          "Baja hasta sentir el estiramiento en pecho",
          "Junta las mancuernas arriba contrayendo"
        ],
        muscleGroup: "Pecho"
      },
      {
        id: "d1e6",
        name: "Copa de Tríceps",
        sets: 3,
        reps: "12",
        rest: "60 seg",
        instruction: "Codos pegados a las orejas, baja la pesa tras nuca controlado.",
        tips: [
          "Codos fijos, no se separen",
          "Baja controlado (2-3 segundos)",
          "Extiende completamente arriba"
        ],
        muscleGroup: "Tríceps"
      },
      
      // Bloque 4: Aislamiento Bíceps + Tríceps
      {
        id: "d1e7",
        name: "Curl de Bíceps",
        sets: 3,
        reps: "12",
        rest: "60 seg",
        instruction: "Palmas arriba. Sube rotando, baja controlado (fase negativa).",
        tips: [
          "No balancees el cuerpo",
          "Sube rotando las muñecas",
          "Baja en 2-3 segundos"
        ],
        muscleGroup: "Bíceps"
      },
      {
        id: "d1e8",
        name: "Patada de Tríceps",
        sets: 3,
        reps: "12",
        rest: "60 seg",
        instruction: "Codo quieto, extiende el brazo atrás apretando 1 segundo.",
        tips: [
          "Codo fijo, solo mueve antebrazo",
          "Aprieta tríceps en extensión",
          "Movimiento controlado"
        ],
        muscleGroup: "Tríceps"
      },
      
      // Bloque 5: Aislamiento final
      {
        id: "d1e9",
        name: "Curl Martillo",
        sets: 3,
        reps: "12",
        rest: "45 seg",
        instruction: "Palmas enfrentadas. Trabaja braquial y antebrazo.",
        tips: [
          "Mantén los codos al costado",
          "No uses impulso",
          "Contrae en la subida"
        ],
        muscleGroup: "Bíceps"
      }
    ]
  },
  {
    id: "day2",
    name: "Día 2",
    subtitle: "Pierna y Core",
    color: "from-red-500 to-orange-500",
    duration: "50-65 min",
    completed: false,
    exercises: [
      {
        id: "d2e1",
        name: "Sentadilla Goblet",
        sets: 4,
        reps: "12",
        rest: "2 min",
        instruction: "Pesa pegada al pecho. Baja hasta romper el paralelo.",
        tips: [
          "Codos dentro de las rodillas",
          "Mantén torso upright",
          "No levantes los talones"
        ],
        muscleGroup: "Cuádriceps"
      },
      {
        id: "d2e2",
        name: "Peso Muerto Rumano",
        sets: 4,
        reps: "12",
        rest: "90 seg",
        instruction: "Espalda recta. Baja las pesas por las espinillas hasta sentir estiramiento.",
        tips: [
          "Rodillas ligeramente flexionadas",
          "Baja hasta sentir estiramiento en isquios",
          "Contrae glúteos arriba"
        ],
        muscleGroup: "Isquiotibiales"
      },
      {
        id: "d2e3",
        name: "Zancada Búlgara",
        sets: 3,
        reps: "10 c/p",
        rest: "90 seg",
        instruction: "Pie trasero en banco. Torso inclinado trabaja más glúteo.",
        tips: [
          "Torso ligeramente inclinado",
          "Rodilla trasera casi toca suelo",
          "Empuja con el talón delantero"
        ],
        muscleGroup: "Glúteos/Pierna"
      },
      {
        id: "d2e4",
        name: "Step-Up",
        sets: 3,
        reps: "12 c/p",
        rest: "90 seg",
        instruction: "Sube con fuerza de pierna. Controla la bajada.",
        tips: [
          "Paso completo en el banco",
          "No empujes con el pie atrás",
          "Controla la bajada"
        ],
        muscleGroup: "Cuádriceps"
      },
      {
        id: "d2e5",
        name: "Puente de Glúteo",
        sets: 3,
        reps: "15",
        rest: "60 seg",
        instruction: "Pesa en cadera. Eleva apretando glúteos arriba 1-2 segundos.",
        tips: [
          "Solo sube caderas",
          "Aprieta glúteos arriba",
          "No apoyes peso en cuello"
        ],
        muscleGroup: "Glúteos"
      },
      {
        id: "d2e6",
        name: "Sentadilla con Salto",
        sets: 3,
        reps: "10",
        rest: "2 min",
        instruction: "Sentadilla normal y explota hacia arriba en salto.",
        tips: [
          "Aterriza suave",
          "No bloquees rodillas",
          "Controla el descenso"
        ],
        muscleGroup: "Pierna/Potencia"
      },
      {
        id: "d2e7",
        name: "Crunch Abdominal",
        sets: 3,
        reps: "20",
        rest: "45 seg",
        instruction: "Eleva hombros del suelo. No tires del cuello.",
        tips: [
          "Manos ligeramente detrás de orejas",
          "Contrae abdomen",
          "Espira en la subida"
        ],
        muscleGroup: "Core"
      },
      {
        id: "d2e8",
        name: "Plancha (Plank)",
        sets: 3,
        reps: "45-60s",
        rest: "60 seg",
        instruction: "Mantén cuerpo recto. Core activado.",
        tips: [
          "No hundas la cadera",
          "Respira normal",
          "Contrae abdomen y glúteos"
        ],
        muscleGroup: "Core"
      }
    ]
  },
  {
    id: "day3",
    name: "Día 3",
    subtitle: "HIIT Metabólico",
    color: "from-green-500 to-emerald-500",
    duration: "30-40 min",
    completed: false,
    exercises: [
      {
        id: "d3e1",
        name: "Dumbbell Thrusters",
        sets: 5,
        reps: "15",
        rest: "30 seg",
        instruction: "Sentadilla + press overhead. Movimiento fluido.",
        tips: [
          "Usa impulso de piernas",
          "No pares",
          "Mantén ritmo constante"
        ],
        muscleGroup: "Full Body"
      },
      {
        id: "d3e2",
        name: "Devil Press",
        sets: 5,
        reps: "10",
        rest: "30 seg",
        instruction: "Burpee con pesas + snatch hasta overhead.",
        tips: [
          "Caída en sentadilla profunda",
          "Explota hacia arriba",
          "Sincroniza respiración"
        ],
        muscleGroup: "Full Body"
      },
      {
        id: "d3e3",
        name: "Swing con Mancuerna",
        sets: 5,
        reps: "20",
        rest: "30 seg",
        instruction: "Balanceo explosivo de cadera. Cadera genera el movimiento.",
        tips: [
          "Cadera genera TODO el movimiento",
          "No uses brazos",
          "Contrae glúteos"
        ],
        muscleGroup: "Posterior"
      },
      {
        id: "d3e4",
        name: "Mountain Climbers",
        sets: 5,
        reps: "40 seg",
        rest: "20 seg",
        instruction: "Rodillas al pecho rápido. Caderas bajas.",
        tips: [
          "Caderas no suban",
          "Rápido y constante",
          "Mantén ritmo"
        ],
        muscleGroup: "Core/Cardio"
      },
      {
        id: "d3e5",
        name: "Burpees",
        sets: 5,
        reps: "Al fallo",
        rest: "90 seg",
        instruction: "Máximo de burpees hasta el fallo muscular.",
        tips: [
          "Caída controlada",
          "Explota en la subida",
          "No pares hasta el fallo"
        ],
        muscleGroup: "Full Body"
      }
    ]
  }
];

// Consejos generales
export const TIPS = [
  "Sobrecarga Progresiva: Cada 2 semanas aumenta peso o repeticiones",
  "Proteína: 1.6-2.2g por kg de peso corporal",
  "Hidratación: Bebe al menos 3 litros de agua al día",
  "Descanso: Duerme 7-8 horas para recuperación óptima",
  "Técnica: Prioriza forma correcta sobre peso",
  "Calentamiento: 5-10 min cardio ligero antes de empezar",
  "Estiramiento: 5 min de cool-down al finalizar"
];

// Funciones
export function toggleExerciseComplete(dayId: string, exerciseId: string, completedSets: number[]) {
  const key = `workout-${dayId}`;
  const data = JSON.parse(localStorage.getItem(key) || '{}');
  data[exerciseId] = completedSets;
  localStorage.setItem(key, JSON.stringify(data));
}

export function getProgress(dayId: string): Record<string, number[]> {
  const key = `workout-${dayId}`;
  return JSON.parse(localStorage.getItem(key) || '{}');
}

export function resetProgress(dayId: string) {
  const key = `workout-${dayId}`;
  localStorage.removeItem(key);
}