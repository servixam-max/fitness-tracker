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
  videoUrl: string;
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

// Videos de referencia de canales de fitness profesionales
const VIDEOS = {
  // Día 1 - Tronco Superior
  pressBanca: "https://www.youtube.com/watch?v=gRVjAtPip0Y", // Jeff Nippard
  remoMancuerna: "https://www.youtube.com/watch?v=roCP6wCXPqo", // Alan Thrall
  pressMilitar: "https://www.youtube.com/watch?v=2yjwXTZZEIU", // Jeff Nippard
  aperturas: "https://www.youtube.com/watch?v=eozdVDA78P0", // Scott Herman
  copaTriceps: "https://www.youtube.com/watch?v=ns-R5z-h-Pw", // Scott Herman
  patadaTriceps: "https://www.youtube.com/watch?v=KCjY1rEC-Uo", // Jeff Nippard
  curlBiceps: "https://www.youtube.com/watch?v=yaPIVe8I8Tw", // Alan Thrall
  curlMartillo: "https://www.youtube.com/watch?v=TwD-YGVP4bs", // Jeff Nippard
  
  // Día 2 - Pierna y Core
  sentadillaGoblet: "https://www.youtube.com/watch?v=MeIiIdhvXT4", // Jeff Nippard
  zancadaBulgara: "https://www.youtube.com/watch?v=2C-uNgKwPLE", // Jeff Nippard
  pesoMuertoRumano: "https://www.youtube.com/watch?v=JCXUYuzwOoU", // Alan Thrall
  stepUp: "https://www.youtube.com/watch?v=v8Ym0p1rCkE", // Jeff Nippard
  puenteGluteo: "https://www.youtube.com/watch?v=8l71Ll9wWHc", // Jeff Nippard
  crunch: "https://www.youtube.com/watch?v=MKmrqcoCZdc", // Scott Herman
  plank: "https://www.youtube.com/watch?v=ASdvNXX8zwM", // Jeff Nippard
  
  // Día 3 - HIIT
  thrusters: "https://www.youtube.com/watch?v=l7rM1_8VYQc", // CrossFit
  devilPress: "https://www.youtube.com/watch?v=1V9z-mYHN8E", // CrossFit
  swing: "https://www.youtube.com/watch?v=sxVtnT78NCY", // Jeff Nippard
  mountainClimbers: "https://www.youtube.com/watch?v=nmwgirgVHQ4", // Scott Herman
  burpees: "https://www.youtube.com/watch?v=au4y-3sTtQQ", // CrossFit
};

export const WORKOUT_DAYS: WorkoutDay[] = [
  {
    id: "day1",
    name: "Día 1",
    subtitle: "Tronco Superior",
    color: "from-blue-500 to-cyan-500",
    duration: "45-60 min",
    completed: false,
    exercises: [
      // Bloque 1: Empuje horizontal + Tirón horizontal (superserie)
      {
        id: "d1e1",
        name: "Press de Banca Plano",
        sets: 3,
        reps: "10-12",
        rest: "60 seg",
        instruction: "Baja la barra al pecho controlado, sube explosivo. Codos a 45° del cuerpo.",
        tips: [
          "Mantén los pies firmes en el suelo",
          "No rebotes la barra en el pecho",
          "Respira: baja inspirando, sube expulsando",
          "Mantén muñecas rectas"
        ],
        imageUrl: "https://images.unsplash.com/photo-1571019614242-c5c5dee9a50e?w=800&q=80",
        videoUrl: VIDEOS.pressBanca,
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
          "Contrae el dorsal en la subida",
          "Estira completamente en la bajada"
        ],
        imageUrl: "https://images.unsplash.com/photo-1603287681836-e3f3e75e6902?w=800&q=80",
        videoUrl: VIDEOS.remoMancuerna,
        muscleGroup: "Espalda"
      },
      
      // Bloque 2: Empuje vertical + Tirón vertical
      {
        id: "d1e3",
        name: "Press Militar Sentado",
        sets: 3,
        reps: "10",
        rest: "60 seg",
        instruction: "Core activado, baja hasta la barbilla sin arquear la espalda.",
        tips: [
          "Core activado todo el tiempo",
          "No bloquees los codos arriba",
          "Mira ligeramente hacia arriba, no el cuello",
          "Sube en línea recta"
        ],
        imageUrl: "https://images.unsplash.com/photo-1532029837066-7549e9428b71?w=800&q=80",
        videoUrl: VIDEOS.pressMilitar,
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
          "Contrae trapecios arriba",
          "Controla la bajada"
        ],
        imageUrl: "https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?w=800&q=80",
        videoUrl: VIDEOS.remoMancuerna,
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
          "Junta las mancuernas arriba contrayendo",
          "No bajes más allá de la altura del pecho"
        ],
        imageUrl: "https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?w=800&q=80",
        videoUrl: VIDEOS.aperturas,
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
          "Extiende completamente arriba",
          "No uses demasiado peso"
        ],
        imageUrl: "https://images.unsplash.com/photo-1583454156664-23a03127e9e9?w=800&q=80",
        videoUrl: VIDEOS.copaTriceps,
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
          "Sube rotando las muñecas (supinación)",
          "Baja en 2-3 segundos",
          "Contrae bíceps arriba 1 segundo"
        ],
        imageUrl: "https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?w=800&q=80",
        videoUrl: VIDEOS.curlBiceps,
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
          "Movimiento controlado, no balancees",
          "Alterna brazos o haz simultáneo"
        ],
        imageUrl: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&q=80",
        videoUrl: VIDEOS.patadaTriceps,
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
          "Mantén los codos al costado del cuerpo",
          "No uses impulso",
          "Contrae en la subida",
          "Movimiento estricto"
        ],
        imageUrl: "https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?w=800&q=80",
        videoUrl: VIDEOS.curlMartillo,
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
      // Bloque 1: Cuádriceps + Posterior
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
          "No levantes los talones",
          "Rodillas siguen la dirección de los pies"
        ],
        imageUrl: "https://images.unsplash.com/photo-1574680096145-d05d474e2155?w=800&q=80",
        videoUrl: VIDEOS.sentadillaGoblet,
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
          "Rodillas ligeramente flexionadas (soft)",
          "Baja hasta sentir estiramiento en isquios",
          "Contrae glúteos arriba",
          "Barra cerca del cuerpo"
        ],
        imageUrl: "https://images.unsplash.com/photo-1603287681836-e3f3e75e6902?w=800&q=80",
        videoUrl: VIDEOS.pesoMuertoRumano,
        muscleGroup: "Isquiotibiales"
      },
      
      // Bloque 2: Unilateral
      {
        id: "d2e3",
        name: "Zancada Búlgara",
        sets: 3,
        reps: "10 c/p",
        rest: "90 seg",
        instruction: "Pie trasero en banco. Torso inclinado trabaja más glúteo.",
        tips: [
          "Torso ligeramente inclinado hacia adelante",
          "Rodilla trasera casi toca suelo",
          "Empuja con el talón delantero",
          "Mantén equilibrio, core activado"
        ],
        imageUrl: "https://images.unsplash.com/photo-1574680178050-55e9f5350f4c?w=800&q=80",
        videoUrl: VIDEOS.zancadaBulgara,
        muscleGroup: "Glúteos/Pierna"
      },
      {
        id: "d2e4",
        name: "Step-Up",
        sets: 3,
        reps: "12 c/p",
        rest: "90 seg",
        instruction: "Sube con fuerza de pierna, no te impulses. Controla la bajada.",
        tips: [
          "Paso completo en el banco",
          "No empujes con el pie atrás",
          "Controla la bajada (2-3 seg)",
          "Rodilla no pase la punta del pie"
        ],
        imageUrl: "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=800&q=80",
        videoUrl: VIDEOS.stepUp,
        muscleGroup: "Cuádriceps"
      },
      
      // Bloque 3: Glúteos + Core
      {
        id: "d2e5",
        name: "Puente de Glúteo",
        sets: 3,
        reps: "15",
        rest: "60 seg",
        instruction: "Pesa en cadera. Eleva apretando glúteos arriba 1-2 segundos.",
        tips: [
          "Solo sube caderas, no la espalda baja",
          "Aprieta glúteos arriba 1-2 segundos",
          "No apoyues peso en cuello",
          "Mantenlo 1-2 seg arriba"
        ],
        imageUrl: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=800&q=80",
        videoUrl: VIDEOS.puenteGluteo,
        muscleGroup: "Glúteos"
      },
      {
        id: "d2e6",
        name: "Sentadilla con Salto",
        sets: 3,
        reps: "10",
        rest: "2 min",
        instruction: "Sentadilla normal y explota hacia arriba en salto. Aterriza suave.",
        tips: [
          "Aterriza suave con rodillas flexionadas",
          "No bloquees rodillas al aterrizar",
          "Controla el descenso",
          "Respira: baja inspira, salta expulsa"
        ],
        imageUrl: "https://images.unsplash.com/photo-1566241440091-ec10de8db2e1?w=800&q=80",
        videoUrl: VIDEOS.sentadillaGoblet,
        muscleGroup: "Pierna/Potencia"
      },
      
      // Bloque 4: Core
      {
        id: "d2e7",
        name: "Crunch Abdominal",
        sets: 3,
        reps: "20",
        rest: "45 seg",
        instruction: "Eleva hombros del suelo contrayendo abdomen. No tires del cuello.",
        tips: [
          "Manos ligeramente detrás de orejas, no cuello",
          "Contrae abdomen, no uses espalda",
          "Espira en la subida",
          "Movimiento controlado"
        ],
        imageUrl: "https://images.unsplash.com/photo-1571019614242-c5c5dee9a50e?w=800&q=80",
        videoUrl: VIDEOS.crunch,
        muscleGroup: "Core"
      },
      {
        id: "d2e8",
        name: "Plancha (Plank)",
        sets: 3,
        reps: "45-60s",
        rest: "60 seg",
        instruction: "Mantén cuerpo recto desde talones hasta cabeza. Core activado.",
        tips: [
          "No hundas la cadera",
          "Respira normal, no aguantes",
          "Mira al suelo, neutro",
          "Contrae abdomen y glúteos"
        ],
        imageUrl: "https://images.unsplash.com/photo-1566241440091-ec10de8db2e1?w=800&q=80",
        videoUrl: VIDEOS.plank,
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
        instruction: "Circuito: Sentadilla profunda + press overhead en un movimiento fluido.",
        tips: [
          "Usa impulso de piernas para subir",
          "No pares entre repeticiones",
          "Mantén ritmo constante",
          "Respira: sube expulsando"
        ],
        imageUrl: "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=800&q=80",
        videoUrl: VIDEOS.thrusters,
        muscleGroup: "Full Body"
      },
      {
        id: "d3e2",
        name: "Devil Press",
        sets: 5,
        reps: "10",
        rest: "30 seg",
        instruction: "Circuito: Burpee con pesas + snatch hasta overhead. Movimiento explosivo.",
        tips: [
          "Caída en sentadilla profunda",
          "Explota hacia arriba",
          "Sincroniza respiración",
          "Controla pesas en todo momento"
        ],
        imageUrl: "https://images.unsplash.com/photo-1517963879466-e1b54ebd64b2?w=800&q=80",
        videoUrl: VIDEOS.devilPress,
        muscleGroup: "Full Body"
      },
      {
        id: "d3e3",
        name: "Swing con Mancuerna",
        sets: 5,
        reps: "20",
        rest: "30 seg",
        instruction: "Circuito: Balanceo de cadera tipo kettlebell. Cadera genera el movimiento.",
        tips: [
          "Cadera genera TODO el movimiento",
          "No uses brazos para impulsar",
          "Contrae glúteos en extensión",
          "Rodillas ligeramente flexionadas"
        ],
        imageUrl: "https://images.unsplash.com/photo-1517963879466-e1b54ebd64b2?w=800&q=80",
        videoUrl: VIDEOS.swing,
        muscleGroup: "Posterior"
      },
      {
        id: "d3e4",
        name: "Mountain Climbers",
        sets: 5,
        reps: "40 seg",
        rest: "20 seg",
        instruction: "Circuito: Rodillas al pecho rápido. Caderas bajas, core fuerte.",
        tips: [
          "Caderas no suban mucho",
          "Rápido y constante",
          "Mantén ritmo estable",
          "Respira, no aguantes"
        ],
        imageUrl: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&q=80",
        videoUrl: VIDEOS.mountainClimbers,
        muscleGroup: "Core/Cardio"
      },
      {
        id: "d3e5",
        name: "Burpees",
        sets: 5,
        reps: "Al fallo",
        rest: "90 seg",
        instruction: "Circuito final: Haz máximo de burpees hasta el fallo muscular.",
        tips: [
          "Caída controlada (sentadilla profunda)",
          "Explota en la subida",
          "No pares hasta el verdadero fallo",
          "Sincroniza con respiración"
        ],
        imageUrl: "https://images.unsplash.com/photo-1517963879466-e1b54ebd64b2?w=800&q=80",
        videoUrl: VIDEOS.burpees,
        muscleGroup: "Full Body"
      }
    ]
  }
];

// Consejos generales
export const TIPS = [
  "Sobrecarga Progresiva: Cada 2 semanas, aumenta peso o repeticiones",
  "Proteína: 1.6-2.2g por kg de peso corporal para mantener músculo",
  "Hidratación: Bebe al menos 3 litros de agua al día (más en HIIT)",
  "Descanso: Duerme 7-8 horas para recuperación óptima",
  "Técnica: Prioriza forma correcta sobre peso levantado",
  "Calentamiento: 5-10 min cardio ligero antes de empezar",
  "Estiramiento: 5 min de cool-down al finalizar",
  "Rendimiento: Si no puedes completar las series con buena forma, baja el peso",
  "Progreso: Lleva registro de pesos para ver mejoras"
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

// Función para resetear progreso
export function resetProgress(dayId: string) {
  const key = `workout-${dayId}`;
  localStorage.removeItem(key);
}

// Función para obtener estadísticas
export function getWorkoutStats() {
  const stats = {
    totalWorkouts: 0,
    completedWorkouts: 0,
    totalExercises: 0,
    completedExercises: 0
  };
  
  WORKOUT_DAYS.forEach(day => {
    const progress = getProgress(day.id);
    const completedExercises = Object.keys(progress).filter(
      id => progress[id]?.length === day.exercises.find(e => e.id === id)?.sets
    ).length;
    
    stats.totalExercises += day.exercises.length;
    stats.completedExercises += completedExercises;
    
    if (completedExercises === day.exercises.length) {
      stats.completedWorkouts++;
    }
    stats.totalWorkouts++;
  });
  
  return stats;
}