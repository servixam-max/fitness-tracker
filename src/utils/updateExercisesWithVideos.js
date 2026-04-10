// Script para añadir videoIds a los ejercicios basados en EXERCISE_IMAGES
const fs = require('fs');
const path = require('path');

const workoutsPath = path.join(__dirname, '../data/workouts.ts');
let content = fs.readFileSync(workoutsPath, 'utf8');

// Extraer EXERCISE_IMAGES
const imagesMatch = content.match(/const EXERCISE_IMAGES: Record<string, \{ gif: string; videoId\?: string; isTimeBased\?: boolean \} > = (\{[^}]+})/s);
if (!imagesMatch) {
  console.error('No se encontró EXERCISE_IMAGES');
  process.exit(1);
}

const imagesStr = imagesMatch[1];
const videoData = {};

// Parsear videoIds
const regex = /"([^"]+)":\s*\{\s*gif:[^,]+,(?: videoId:\s*"([^"]+)",)?/g;
let match;
while ((match = regex.exec(imagesStr)) !== null) {
  const [_, exerciseId, videoId] = match;
  if (videoId) {
    videoData[exerciseId] = videoId;
  }
}

console.log('VideoIds encontrados:', Object.keys(videoData).length);

// Actualizar cada ejercicio
let updatedContent = content;

// Buscar cada ejercicio y añadir videoId si existe
Object.keys(videoData).forEach(exerciseId => {
  const videoId = videoData[exerciseId];
  // Buscar el ejercicio por su id
  const exercisePattern = new RegExp(`(\\{\\s*id:\\s*"${exerciseId}",[^}]+videoId\\?:\\s*string[^}]*?)(\\},?)`, 'g');
  
  if (exercisePattern.test(updatedContent)) {
    // Reemplazar para añadir videoId
    updatedContent = updatedContent.replace(
      exercisePattern,
      `$1,\n  videoId: "${videoId}"$2`
    );
  } else {
    // Buscar más genéricamente
    const genericPattern = new RegExp(`(\\{\\s*id:\\s*"${exerciseId}",[^}]+)(\\},?)`, 'g');
    if (genericPattern.test(updatedContent)) {
      updatedContent = updatedContent.replace(
        genericPattern,
        `$1,\n  videoId: "${videoId}"$2`
      );
    }
  }
});

// Escribir de vuelta
fs.writeFileSync(workoutsPath, updatedContent);
console.log('✓ Ejercicios actualizados con videoIds');