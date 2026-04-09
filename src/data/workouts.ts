// Rutina de entrenamiento - SOLO MANCUERNAS Y BANCO
// Equipo necesario: Par de mancuernas + Banco plano

export type Equipment = "mancuernas" | "banco" | "sin_peso";

export interface Exercise {
  id: string;
  name: string;
  sets: number;
  reps: string;
  rest: string;
  instruction: string;
  tips: string[];
  muscleGroup: string;
  equipment: Equipment[];
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
    subtitle: "Pecho, Espalda y Brazos",
    color: "from-blue-500 to-cyan-500",
    duration: "45-60 min",
    completed: false,
    exercises: [
      // PECHO - En banco plano con mancuernas
      {
        id: "d1e1",
        name: "Press de Banca con Mancuernas",
        sets: 4,
        reps: "10-12",
        rest: "90 seg",
        instruction: "Acostado en banco plano, mancuernas a los lados del pecho. Empuja hacia arriba juntando las mancuernas al final.",
        tips: [
          "Movimiento controlado, sin rebotes",
          "Juntar las mancuernas arriba contrae más el pecho",
          "Muñecas rectas, no dobladas",
          "Codos a 45° del cuerpo"
        ],
        muscleGroup: "Pecho",
        equipment: ["mancuernas", "banco"]
      },
      {
        id: "d1e2",
        name: "Aperturas con Mancuernas (Flyes)",
        sets: 3,
        reps: "12-15",
        rest: "60 seg",
        instruction: "En banco plano, brazos extendidos con ligera flexión. Abre los brazos hasta sentir estiramiento, cierra juntando las mancuernas.",
        tips: [
          "Ligera flexión en los codos (fija)",
          "Baja hasta sentir estiramiento en pecho",
          "Movimiento como abrazando un árbol",
          "No bajes más allá de la línea del pecho"
        ],
        muscleGroup: "Pecho",
        equipment: ["mancuernas", "banco"]
      },
      {
        id: "d1e3",
        name: "Pullovers con Mancuerna",
        sets: 3,
        reps: "12",
        rest: "60 seg",
        instruction: "Acostado en banco, sostén una mancuerna con ambas manos sobre el pecho. Lleva la mancuerna tras la cabeza y vuelve.",
        tips: [
          "Brazos casi extendidos, ligeramente flexionados",
          "Siente el estiramiento en dorsal",
          "Mantén caderas en el banco",
          "Usa peso moderado, controlado"
        ],
        muscleGroup: "Pecho/Dorsal",
        equipment: ["mancuernas", "banco"]
      },
      
      // ESPALDA - Con mancuernas
      {
        id: "d1e4",
        name: "Remo con Mancuerna a una Mano",
        sets: 4,
        reps: "10-12",
        rest: "90 seg",
        instruction: "Apoya rodilla y mano en el banco, otra pierna en suelo. Sostén mancuerna, tira el codo hacia el techo apretando dorsal.",
        tips: [
          "Espalda recta, paralela al suelo",
          "No gires el tronco",
          "Contrae el dorsal en la subida",
          "Alterna brazos cada serie o haz todas con uno y cambias"
        ],
        muscleGroup: "Espalda",
        equipment: ["mancuernas", "banco"]
      },
      {
        id: "d1e5",
        name: "Remo Alto con Mancuernas",
        sets: 3,
        reps: "12",
        rest: "90 seg",
        instruction: "De pie, inclinado hacia adelante desde caderas. Mancuernas colgando. Tira codos arriba, hacia el techo.",
        tips: [
          "Inclinación de 45°",
          "Codos altos, por encima de manos",
          "Contrae trapecios y deltoides posteriores",
          "No uses impulso de piernas"
        ],
        muscleGroup: "Espalda",
        equipment: ["mancuernas"]
      },
      {
        id: "d1e6",
        name: "Encogimientos con Mancuernas",
        sets: 3,
        reps: "15",
        rest: "60 seg",
        instruction: "De pie, mancuernas a los lados. Encoge hombros hacia arriba como diciendo 'no sé', baja controlado.",
        tips: [
          "No balancees el cuerpo",
          "Mantenlo arriba 1-2 segundos",
          "Baja controlado",
          "Peso moderado, muchas reps"
        ],
        muscleGroup: "Trapecios",
        equipment: ["mancuernas"]
      },
      
      // HOMBROS - Con mancuernas
      {
        id: "d1e7",
        name: "Press de Hombros Sentado",
        sets: 4,
        reps: "10-12",
        rest: "90 seg",
        instruction: "Sentado en el banco (espaldar recto), mancuernas a altura de hombros. Empuja hacia arriba juntando al final.",
        tips: [
          "Espalda apoyada en el respaldo",
          "No arquees la espalda al empujar",
          "Core activado",
          "Juntar mancuernas arriba"
        ],
        muscleGroup: "Hombros",
        equipment: ["mancuernas", "banco"]
      },
      {
        id: "d1e8",
        name: "Elevaciones Laterales",
        sets: 3,
        reps: "12-15",
        rest: "60 seg",
        instruction: "De pie o sentado en banco, mancuernas a los lados. Eleva brazos laterales hasta altura de hombros, codos ligeramente flexionados.",
        tips: [
          "Codos ligeramente flexionados",
          "No subas más allá de hombros",
          "Controla la bajada",
          "Peso ligero, forma estricta"
        ],
        muscleGroup: "Hombros",
        equipment: ["mancuernas"]
      },
      
      // BÍCEPS - Con mancuernas
      {
        id: "d1e9",
        name: "Curl de Bíceps Alterno",
        sets: 3,
        reps: "10 c/b",
        rest: "60 seg",
        instruction: "De pie, mancuernas a los lados. Sube una mancuerna rotando muñeca, baja controlado. Alterna brazos.",
        tips: [
          "No balancees el cuerpo",
          "Rotación de muñeca (supinación)",
          "Baja en 2-3 segundos",
          "Contrae bíceps arriba"
        ],
        muscleGroup: "Bíceps",
        equipment: ["mancuernas"]
      },
      {
        id: "d1e10",
        name: "Curl Concentrado Sentado",
        sets: 3,
        reps: "12 c/b",
        rest: "60 seg",
        instruction: "Sentado en banco, piernas separadas. Apoya codo en interior del muslo. Curl con mancuerna subiendo hacia el hombro.",
        tips: [
          "Codo fijo contra el muslo",
          "Movimiento estricto, sin balanceo",
          "Contrae arriba 1 segundo",
          "Peso moderado, control total"
        ],
        muscleGroup: "Bíceps",
        equipment: ["mancuernas", "banco"]
      },
      
      // TRÍCEPS - Con mancuernas
      {
        id: "d1e11",
        name: "Copa de Tríceps (Overhead)",
        sets: 3,
        reps: "12",
        rest: "60 seg",
        instruction: "Sentado o de pie, sostén mancuerna con ambas manos sobre cabeza. Baja detrás de la nuca extendiendo codos, sube.",
        tips: [
          "Codos apuntan al frente, no abiertos",
          "Baja controlado",
          "Extiende completamente arriba",
          "Usa peso moderado"
        ],
        muscleGroup: "Tríceps",
        equipment: ["mancuernas"]
      },
      {
        id: "d1e12",
        name: "Extensión de Tríceps en Banco",
        sets: 3,
        reps: "12",
        rest: "60 seg",
        instruction: "Acostado en banco, mancuernas extendidas sobre pecho. Baja mancuernas hacia los hombros doblando codos, extiende.",
        tips: [
          "Codos fijos, no se mueven",
          "Movimiento solo en codos",
          "Contrae tríceps arriba",
          "Alterna o simultáneo"
        ],
        muscleGroup: "Tríceps",
        equipment: ["mancuernas", "banco"]
      }
    ]
  },
  {
    id: "day2",
    name: "Día 2",
    subtitle: "Piernas y Core",
    color: "from-red-500 to-orange-500",
    duration: "50-65 min",
    completed: false,
    exercises: [
      // PIERNAS - Con mancuernas
      {
        id: "d2e1",
        name: "Sentadilla Goblet",
        sets: 4,
        reps: "12",
        rest: "2 min",
        instruction: "De pie, sostén una mancuerna vertical contra el pecho. Baja en sentadilla hasta muslos paralelos, sube.",
        tips: [
          "Mancuerna pegada al pecho",
          "Codos dentro de rodillas",
          "Espalda recta, pecho arriba",
          "No levantes talones"
        ],
        muscleGroup: "Cuádriceps",
        equipment: ["mancuernas"]
      },
      {
        id: "d2e2",
        name: "Sentadilla Búlgara con Mancuernas",
        sets: 3,
        reps: "10 c/p",
        rest: "90 seg",
        instruction: "Pie trasero sobre el banco (tobillo), mancuernas a los lados. Baja en zancada profunda, sube.",
        tips: [
          "Paso largo hacia adelante",
          "Torso ligeramente inclinado",
          "Rodilla trasera casi toca suelo",
          "Empuja con talón delantero"
        ],
        muscleGroup: "Pierna/Glúteos",
        equipment: ["mancuernas", "banco"]
      },
      {
        id: "d2e3",
        name: "Peso Muerto Rumano con Mancuernas",
        sets: 4,
        reps: "12",
        rest: "90 seg",
        instruction: "De pie, mancuernas frente a muslos. Inclina torso hacia adelante bajando mancuernas por piernas, vuelve.",
        tips: [
          "Rodillas ligeramente flexionadas",
          "Espalda recta, neutra",
          "Siente estiramiento en isquios",
          "Contrae glúteos arriba"
        ],
        muscleGroup: "Isquiotibiales",
        equipment: ["mancuernas"]
      },
      {
        id: "d2e4",
        name: "Estocadas con Mancuernas",
        sets: 3,
        reps: "12 c/p",
        rest: "90 seg",
        instruction: "De pie, mancuernas a los lados. Paso largo adelante, baja hasta rodilla trasera casi toca suelo, vuelve.",
        tips: [
          "Paso largo, no corto",
          "Rodilla delantera no pase punta pie",
          "Torso vertical",
          "Alterna piernas o haz todas con una y cambias"
        ],
        muscleGroup: "Pierna",
        equipment: ["mancuernas"]
      },
      {
        id: "d2e5",
        name: "Peso Muerto a una Pierna (Romanian)",
        sets: 3,
        reps: "10 c/p",
        rest: "90 seg",
        instruction: "De pie sobre una pierna, mancuernas colgando. Inclina torso, pierna libre va hacia atrás, baja mancuernas, vuelve.",
        tips: [
          "Equilibrio es clave, controla",
          "Rodilla de soporte ligeramente flexionada",
          "Baja hasta paralelo al suelo",
          "Contrae glúteo al subir"
        ],
        muscleGroup: "Isquiotibiales/Glúteos",
        equipment: ["mancuernas"]
      },
      {
        id: "d2e6",
        name: "Sentadilla con Salto (Goblet)",
        sets: 3,
        reps: "10",
        rest: "2 min",
        instruction: "Sostén mancuerna contra pecho. Sentadilla y explota hacia arriba en salto. Aterriza suave.",
        tips: [
          "Aterriza suave, rodillas flexionadas",
          "No bloquees rodillas",
          "Mantén mancuerna pegada al pecho",
          "Controla el descenso"
        ],
        muscleGroup: "Pierna/Potencia",
        equipment: ["mancuernas"]
      },
      {
        id: "d2e7",
        name: "Elevación de Talones con Mancuernas",
        sets: 4,
        reps: "15",
        rest: "60 seg",
        instruction: "De pie, mancuernas a los lados o una contra el pecho. Elevación de talones subiendo en puntas, baja controlado.",
        tips: [
          "Puedes hacerlo en escalón o suelo",
          "Rango completo: talón debajo del nivel",
          "Contrae gemelos arriba",
          "Peso moderado, muchas reps"
        ],
        muscleGroup: "Gemelos",
        equipment: ["mancuernas"]
      },
      {
        id: "d2e8",
        name: "Puente de Glúteo con Mancuerna",
        sets: 3,
        reps: "15",
        rest: "60 seg",
        instruction: "Acostado boca arriba, pies en suelo. Mancuerna sobre caderas. Eleva caderas apretando glúteos, baja.",
        tips: [
          "Mancuerna sobre huesos de cadera",
          "No arquees espalda baja",
          "Aprieta glúteos arriba 1-2 seg",
          "Solo eleva caderas, no espalda"
        ],
        muscleGroup: "Glúteos",
        equipment: ["mancuernas"]
      },
      
      // CORE - Solo peso corporal o mancuernas
      {
        id: "d2e9",
        name: "Crunch con Mancuerna (Peso en Pecho)",
        sets: 3,
        reps: "20",
        rest: "45 seg",
        instruction: "Acostado, rodillas flexionadas. Sostén mancuerna sobre pecho. Eleva hombros contrayendo abdomen.",
        tips: [
          "No tires del cuello",
          "Contrae abdomen, no uses impulso",
          "Mancuerna ligera",
          "Espira en la subida"
        ],
        muscleGroup: "Core",
        equipment: ["mancuernas"]
      },
      {
        id: "d2e10",
        name: "Plancha (Plank)",
        sets: 3,
        reps: "45-60s",
        rest: "60 seg",
        instruction: "Posición de flexión apoyando antebrazos. Cuerpo recto, core activado. Mantén.",
        tips: [
          "No hundas cadera ni la eleves",
          "Respira normal",
          "Mira al suelo",
          "Contrae abdomen y glúteos"
        ],
        muscleGroup: "Core",
        equipment: ["sin_peso"]
      },
      {
        id: "d2e11",
        name: "Russian Twists con Mancuerna",
        sets: 3,
        reps: "20",
        rest: "45 seg",
        instruction: "Sentado, rodillas flexionadas, inclínate ligeramente atrás. Sostén mancuerna, gira torso lado a lado.",
        tips: [
          "Inclinación de 45°",
          "Gira solo torso, no solo brazos",
          "Puedes levantar pies o apoyarlos",
          "Controla el movimiento"
        ],
        muscleGroup: "Core/Oblicuos",
        equipment: ["mancuernas"]
      }
    ]
  },
  {
    id: "day3",
    name: "Día 3",
    subtitle: "Full Body HIIT con Mancuernas",
    color: "from-green-500 to-emerald-500",
    duration: "30-40 min",
    completed: false,
    exercises: [
      // HIIT - Circuito completo
      {
        id: "d3e1",
        name: "Thrusters con Mancuernas",
        sets: 4,
        reps: "15",
        rest: "45 seg",
        instruction: "Circuito: De pie, mancuernas a altura de hombros. Sentadilla profunda y al subir empújalas overhead.",
        tips: [
          "Usa impulso de piernas para subir",
          "No pares entre reps",
          "Mantén ritmo constante",
          "Respira: baja inspira, sube expulsa"
        ],
        muscleGroup: "Full Body",
        equipment: ["mancuernas"]
      },
      {
        id: "d3e2",
        name: "Burpees con Mancuernas (Sin push-up)",
        sets: 4,
        reps: "10",
        rest: "45 seg",
        instruction: "Circuito: Mancuernas en suelo, manos en ellas. Salta pies atrás, salta adelante, levanta y salta con mancuernas.",
        tips: [
          "Caída controlada en sentadilla",
          "Explota en la subida",
          "No redondees espalda",
          "Sincroniza con respiración"
        ],
        muscleGroup: "Full Body",
        equipment: ["mancuernas"]
      },
      {
        id: "d3e3",
        name: "Clean and Press con Mancuernas",
        sets: 4,
        reps: "8 c/b",
        rest: "45 seg",
        instruction: "Circuito: De pie, mancuernas colgando. Lleva a hombros (clean) y empuja arriba (press). Alterna o simultáneo.",
        tips: [
          "Explota desde caderas para el clean",
          "Aterriza suave con mancuernas en hombros",
          "Press completo arriba",
          "Controla la bajada"
        ],
        muscleGroup: "Full Body",
        equipment: ["mancuernas"]
      },
      {
        id: "d3e4",
        name: "Swing con Mancuernas",
        sets: 4,
        reps: "20",
        rest: "30 seg",
        instruction: "Circuito: De pie, mancuernas entre piernas. Impulso de caderas hacia adelante llevándolas a altura de hombros.",
        tips: [
          "Cadera genera TODO el movimiento",
          "Brazos solo guían, no empujan",
          "Contrae glúteos al impulsar",
          "Rodillas ligeramente flexionadas"
        ],
        muscleGroup: "Posterior",
        equipment: ["mancuernas"]
      },
      {
        id: "d3e5",
        name: "Renegade Rows con Mancuernas",
        sets: 4,
        reps: "10 c/b",
        rest: "45 seg",
        instruction: "Circuito: Posición de flexión apoyando manos en mancuernas. Tira una mancuerna hacia el pecho, baja. Alterna.",
        tips: [
          "Caderas quietas, no gires",
          "Core súper activado",
          "Movimiento controlado",
          "Alterna brazos"
        ],
        muscleGroup: "Core/Espalda",
        equipment: ["mancuernas"]
      },
      {
        id: "d3e6",
        name: "Sentadillas y Press (Combinación)",
        sets: 4,
        reps: "12",
        rest: "30 seg",
        instruction: "Circuito: Sentadilla profunda, al subir curl de bíceps, luego press de hombros. Movimiento fluido.",
        tips: [
          "Enlace fluido de movimientos",
          "No pareces entre ellos",
          "Control en todo momento",
          "Peso moderado, no máximo"
        ],
        muscleGroup: "Full Body",
        equipment: ["mancuernas"]
      },
      {
        id: "d3e7",
        name: "Mountain Climbers (Sin peso)",
        sets: 4,
        reps: "40 seg",
        rest: "20 seg",
        instruction: "Circuito: Posición de flexión. Rodillas alternas al pecho rápido.",
        tips: [
          "Caderas no suban demasiado",
          "Rápido y constante",
          "Mantén ritmo estable",
          "Respira, no aguantes"
        ],
        muscleGroup: "Core/Cardio",
        equipment: ["sin_peso"]
      },
      {
        id: "d3e8",
        name: "Jumping Jacks con Mancuernas Ligeras",
        sets: 4,
        reps: "30 seg",
        rest: "20 seg",
        instruction: "Circuito: Sostén mancuernas ligeras. Jumping jacks clásicos moviendo brazos y piernas.",
        tips: [
          "Peso muy ligero (1-2kg)",
          "Ritmo rápido",
          "Mantén ritmo cardíaco alto",
          "No pareces hasta el tiempo"
        ],
        muscleGroup: "Cardio",
        equipment: ["mancuernas"]
      },
      {
        id: "d3e9",
        name: "Plancha con Row",
        sets: 4,
        reps: "8 c/b",
        rest: "45 seg",
        instruction: "Circuito: Posición plank con mancuernas. Tira alternando hacia el pecho. Core activado.",
        tips: [
          "No gires las caderas",
          "Core super fuerte",
          "Alterna brazos",
          "Control total del cuerpo"
        ],
        muscleGroup: "Core/Espalda",
        equipment: ["mancuernas"]
      },
      {
        id: "d3e10",
        name: "Burpees al Fallo",
        sets: 1,
        reps: "Al fallo",
        rest: "Fin",
        instruction: "FINAL: Máximo de burpees hasta que no puedas más. Sin mancuernas. Da todo lo que te queda.",
        tips: [
          "Caída controlada",
          "Explota en la subida",
          "No pares hasta el verdadero fallo",
          "Sprint final, vacía el tanque"
        ],
        muscleGroup: "Full Body",
        equipment: ["sin_peso"]
      }
    ]
  }
];

// Consejos específicos para entrenamiento con mancuernas
export const TIPS = [
  "Equilibrio: Trabaja ambos lados por igual, especialmente en unilaterales",
  "Progresión: Aumenta peso cuando puedas hacer 2-3 reps más de las indicadas",
  "Rango: Prioriza rango completo sobre peso máximo",
  "Control: Fase excéntrica (bajada) en 2-3 segundos siempre",
  "Estabilidad: Activa core en todos los ejercicios de pie",
  "Agarre: Varía entre neutral y supinado según el ejercicio",
  "Calentamiento: 5-10 min antes, especialmente con peso",
  "Seguridad: Si no puedes mantener forma, baja el peso",
  "Equipamiento: Par de mancuernas ajustables ideal, o varios pares",
  "Recuperación: 48h entre sesiones del mismo grupo muscular"
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
