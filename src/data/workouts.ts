// Rutina de entrenamiento personalizada
// Para usuario: 82kg, objetivo fuerza y definición

export interface Exercise {
  id: string;
  name: string;
  sets: number;
  reps: string;
  rest: string;
  instruction: string;
  tips: string[];
  imageUrl: string;
  videoUrl?: string;
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
      {
        id: "d1e1",
        name: "Press de Banca Plano",
        sets: 3,
        reps: "10-12",
        rest: "90 seg",
        instruction: "Baja las pesas hasta el pecho, sube explosivo",
        tips: [
          "Mantén los pies firmes en el suelo",
          "No rebotes la barra en el pecho",
          "Respira: baja aire, sube expulsando"
        ],
        imageUrl: "https://images.unsplash.com/photo-1571019614242-c5c5dee9a50e?w=800&q=80",
        muscleGroup: "Pecho"
      },
      {
        id: "d1e2",
        name: "Remo a una Mano",
        sets: 3,
        reps: "10-12",
        rest: "90 seg",
        instruction: "Espalda paralela al suelo, tira del codo al techo",
        tips: [
          "Mantén la espalda recta",
          "No uses impulso con el cuerpo",
          "Contrae el dorsal en la subida"
        ],
        imageUrl: "https://images.unsplash.com/photo-1603287681836-e3f3e75e6902?w=800&q=80",
        muscleGroup: "Espalda"
      },
      {
        id: "d1e3",
        name: "Press Militar Sentado",
        sets: 3,
        reps: "10",
        rest: "90 seg",
        instruction: "No arquees la espalda. Baja hasta la barbilla",
        tips: [
          "Core activado",
          "No bloquees los codos arriba",
          "Mira ligeramente hacia arriba"
        ],
        imageUrl: "https://images.unsplash.com/photo-1532029837066-7549e9428b71?w=800&q=80",
        muscleGroup: "Hombros"
      },
      {
        id: "d1e4",
        name: "Aperturas (Flyes)",
        sets: 3,
        reps: "12-15",
        rest: "60 seg",
        instruction: "Controla la bajada para estirar bien el pectoral",
        tips: [
          "Ligera flexión en los codos",
          "Baja hasta sentir el estiramiento",
          "Junta las mancuernas arriba"
        ],
        imageUrl: "https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?w=800&q=80",
        muscleGroup: "Pecho"
      },
      {
        id: "d1e5",
        name: "Copa de Tríceps",
        sets: 3,
        reps: "12",
        rest: "60 seg",
        instruction: "Codos pegados a las orejas, baja la pesa tras nuca",
        tips: [
          "No separes los codos",
          "Baja controlado",
          "Extiende completamente arriba"
        ],
        imageUrl: "https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?w=800&q=80",
        muscleGroup: "Tríceps"
      },
      {
        id: "d1e6",
        name: "Patada de Tríceps",
        sets: 3,
        reps: "12",
        rest: "60 seg",
        instruction: "Estira el brazo atrás y aprieta el músculo 1 seg",
        tips: [
          "Codo quieto, solo mueve antebrazo",
          "Aprieta en la extensión",
          "Movimiento controlado"
        ],
        imageUrl: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&q=80",
        muscleGroup: "Tríceps"
      },
      {
        id: "d1e7",
        name: "Curl de Bíceps",
        sets: 3,
        reps: "12",
        rest: "60 seg",
        instruction: "Palma hacia arriba. Baja lento (fase negativa)",
        tips: [
          "No balancees el cuerpo",
          "Sube rotando las muñecas",
          "Baja en 2-3 segundos"
        ],
        imageUrl: "https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?w=800&q=80",
        muscleGroup: "Bíceps"
      },
      {
        id: "d1e8",
        name: "Curl Martillo",
        sets: 3,
        reps: "12",
        rest: "60 seg",
        instruction: "Palmas enfrentadas. Trabaja antebrazo y bíceps",
        tips: [
          "Mantén los codos al costado",
          "No uses impulso",
          "Contrae en la subida"
        ],
        imageUrl: "https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?w=800&q=80",
        muscleGroup: "Bíceps"
      }
    ]
  },
  {
    id: "day2",
    name: "Día 2",
    subtitle: "Tronco Inferior y Core",
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
        instruction: "Pesa pegada al pecho. Baja hasta romper el paralelo",
        tips: [
          "Codos dentro de las rodillas",
          "Mantén el torso upright",
          "No levantes los talones"
        ],
        imageUrl: "https://images.unsplash.com/photo-1574680096145-d05b474e2155?w=800&q=80",
        muscleGroup: "Cuádriceps"
      },
      {
        id: "d2e2",
        name: "Zancada Búlgara",
        sets: 3,
        reps: "10 c/p",
        rest: "90 seg",
        instruction: "Un pie atrás en el banco. Mejor para glúteo/pierna",
        tips: [
          "Torso ligeramente inclinado",
          "Rodilla trasera casi toca suelo",
          "Empuja con el talón delantero"
        ],
        imageUrl: "https://images.unsplash.com/photo-1574680178050-55e9f5350f4c?w=800&q=80",
        muscleGroup: "Pierna"
      },
      {
        id: "d2e3",
        name: "Peso Muerto Rumano",
        sets: 4,
        reps: "12-15",
        rest: "90 seg",
        instruction: "Espalda recta. Baja las pesas por las espinillas",
        tips: [
          "Rodillas ligeramente flexionadas",
          "Baja hasta sentir estiramiento",
          "Contrae glúteos arriba"
        ],
        imageUrl: "https://images.unsplash.com/photo-1603287681836-e3f3e75e6902?w=800&q=80",
        muscleGroup: "Isquiotibiales"
      },
      {
        id: "d2e4",
        name: "Step-Up",
        sets: 3,
        reps: "12 c/p",
        rest: "90 seg",
        instruction: "Sube con fuerza de pierna, no te impulses con el suelo",
        tips: [
          "Paso completo en el banco",
          "No empujes con el pie atrás",
          "Controla la bajada"
        ],
        imageUrl: "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=800&q=80",
        muscleGroup: "Pierna"
      },
      {
        id: "d2e5",
        name: "Puente de Glúteo",
        sets: 3,
        reps: "15",
        rest: "60 seg",
        instruction: "Pon la pesa en la cadera. Aprieta glúteo arriba",
        tips: [
          "Solo sube caderas, no espalda",
          "Aprieta arriba 1-2 segundos",
          "No apoyes peso en cuello"
        ],
        imageUrl: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=800&q=80",
        muscleGroup: "Glúteos"
      },
      {
        id: "d2e6",
        name: "Crunch Abdominal",
        sets: 3,
        reps: "20",
        rest: "45 seg",
        instruction: "En el suelo o banco. Controla la respiración",
        tips: [
          "No tires del cuello",
          "Contrae abdomen, no espalda",
          "Espira en la subida"
        ],
        imageUrl: "https://images.unsplash.com/photo-1571019614242-c5c5dee9a50e?w=800&q=80",
        muscleGroup: "Core"
      },
      {
        id: "d2e7",
        name: "Plancha (Plank)",
        sets: 3,
        reps: "45-60s",
        rest: "60 seg",
        instruction: "Mantén el cuerpo recto, core activado",
        tips: [
          "No hundas la cadera",
          "Respira normal",
          "Mira al suelo"
        ],
        imageUrl: "https://images.unsplash.com/photo-1566241440091-ec10de8db2e1?w=800&q=80",
        muscleGroup: "Core"
      }
    ]
  },
  {
    id: "day3",
    name: "Día 3",
    subtitle: "HIIT / Metabólico",
    color: "from-green-500 to-emerald-500",
    duration: "30-40 min",
    completed: false,
    exercises: [
      {
        id: "d3e1",
        name: "Dumbbell Thrusters",
        sets: 4,
        reps: "15",
        rest: "Circuito",
        instruction: "Sentadilla + Press de hombro en un solo movimiento",
        tips: [
          "Usa impulso de piernas",
          "No pares entre repes",
          "Respira constantemente"
        ],
        imageUrl: "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=800&q=80",
        muscleGroup: "Full Body"
      },
      {
        id: "d3e2",
        name: "Devil Press",
        sets: 4,
        reps: "10",
        rest: "Circuito",
        instruction: "Burpee con pesas + press overhead",
        tips: [
          "Cae en sentadilla profunda",
          "Explota hacia arriba",
          "Sincroniza respiración"
        ],
        imageUrl: "https://images.unsplash.com/photo-1517963879466-e1b54ebd64b2?w=800&q=80",
        muscleGroup: "Full Body"
      },
      {
        id: "d3e3",
        name: "Swing con Mancuerna",
        sets: 4,
        reps: "20",
        rest: "Circuito",
        instruction: "Balanceo explosivo de cadera (kettlebell style)",
        tips: [
          "Cadera genera el movimiento",
          "No uses brazos",
          "Contrae glúteos arriba"
        ],
        imageUrl: "https://images.unsplash.com/photo-1517963879466-e1b54ebd64b2?w=800&q=80",
        muscleGroup: "Posterior"
      },
      {
        id: "d3e4",
        name: "Mountain Climbers",
        sets: 4,
        reps: "40 seg",
        rest: "Circuito",
        instruction: "Rodillas al pecho rápido en posición de flexión",
        tips: [
          "Caderas no suban mucho",
          "Rápido y constante",
          "Mantén ritmo"
        ],
        imageUrl: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&q=80",
        muscleGroup: "Core/Cardio"
      },
      {
        id: "d3e5",
        name: "Burpees",
        sets: 4,
        reps: "Al fallo",
        rest: "90 seg",
        instruction: "Haz todas las que puedas hasta que no puedas más",
        tips: [
          "Caída controlada",
          "Explota en la subida",
          "No pares hasta el fallo"
        ],
        imageUrl: "https://images.unsplash.com/photo-1517963879466-e1b54ebd64b2?w=800&q=80",
        muscleGroup: "Full Body"
      }
    ]
  }
];

// Consejos generales
export const TIPS = [
  "Sobrecarga Progresiva: Cada 2 semanas, aumenta peso o repeticiones",
  "Proteína: Come suficiente para mantener músculo mientras bajas grasa",
  "Hidratación: Bebe al menos 3 litros de agua al día",
  "Descanso: Duerme 7-8 horas para recuperación óptima",
  "Técnica: Prioriza forma correcta sobre peso",
  "Calentamiento: 5-10 min cardio antes de empezar",
  "Estiramiento: 5 min de cool-down al finalizar"
];

// Función para marcar ejercicio completado
export function toggleExerciseComplete(dayId: string, exerciseId: string, completedSets: number[]) {
  const key = `workout-${dayId}`;
  const data = JSON.parse(localStorage.getItem(key) || '{}');
  data[exerciseId] = completedSets;
  localStorage.setItem(key, JSON.stringify(data));
}

// Función para obtener progreso
export function getProgress(dayId: string): Record<string, number[]> {
  const key = `workout-${dayId}`;
  return JSON.parse(localStorage.getItem(key) || '{}');
}