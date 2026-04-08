# 🏋️ Fitness Tracker - Tu Rutina Personal

## 📱 URL de la App
**Desplegada en:** https://[URL-VERCEL].vercel.app

## ✨ Características

### 📋 3 Días de Entrenamiento

#### **Día 1: Tronco Superior** (Fuerza y Detalle de Brazos)
- Press de Banca Plano
- Remo a una Mano
- Press Militar Sentado
- Aperturas (Flyes)
- Copa de Tríceps
- Patada de Tríceps
- Curl de Bíceps
- Curl Martillo

#### **Día 2: Tronco Inferior y Core** (Pierna y Abdomen)
- Sentadilla Goblet
- Zancada Búlgara
- Peso Muerto Rumano
- Step-Up
- Puente de Glúteo
- Crunch Abdominal
- Plancha (Plank)

#### **Día 3: HIIT / Metabólico** (Quema de Grasa)
- Dumbbell Thrusters
- Devil Press
- Swing con Mancuerna
- Mountain Climbers
- Burpees

### 🎯 Funcionalidades

| Feature | Descripción |
|---------|-------------|
| **Imágenes de Ejercicios** | Cada ejercicio tiene foto de referencia |
| **Instrucciones Detalladas** | Paso a paso para cada ejercicio |
| **Consejos (Tips)** | Técnicas para maximizar resultados |
| **Timer de Descanso** | Cuenta regresiva integrada entre series |
| **Marcar Series** | Botones para marcar cada set completado |
| **Progreso Visual** | Barra de progreso del entrenamiento |
| **Diseño Mobile-First** | Optimizado para usar en el gimnasio |

### 🎨 Diseño
- **Tema Oscuro:** Fondo negro, perfecto para gimnasio
- **Gradientes Coloridos:** Cada día tiene su color distintivo
- **Animaciones Suaves:** Framer Motion para transiciones fluidas
- **Tipografía Clara:** Inter font, legible en móvil

## 🚀 Cómo Usar

### En el Gimnasio:
1. Abre la app en tu móvil
2. Selecciona el día de entrenamiento
3. Ve ejercicio por ejercicio
4. Expande cada uno para ver instrucciones y tips
5. Marca las series completadas
6. Usa el timer para descansos
7. Al terminar, vuelve al inicio

### Consejos Integrados:
- Sobrecarga progresiva
- Proteína e hidratación
- Descanso y recuperación
- Técnica correcta

## 📁 Estructura del Proyecto

```
fitness-tracker/
├── src/
│   ├── app/
│   │   ├── page.tsx              # Pantalla principal (selector de días)
│   │   ├── layout.tsx            # Layout base
│   │   └── workout/
│   │       └── [id]/
│   │           └── page.tsx      # Detalle del entrenamiento
│   └── data/
│       └── workouts.ts           # Datos de ejercicios y rutinas
├── package.json
├── tsconfig.json
├── next.config.js
└── README.md
```

## 🛠️ Tecnologías
- **Next.js 14** - Framework React
- **TypeScript** - Tipado fuerte
- **Tailwind CSS** - Estilos
- **Framer Motion** - Animaciones
- **Lucide React** - Iconos

## 📝 Notas de Desarrollo
- Totalmente responsive
- Sin dependencias de backend (localStorage para progreso)
- Optimizado para móvil (PWA ready)
- Imágenes de Unsplash (referencias visuales)

## 🎉 Próximas Mejoras (Opcional)
- [ ] Videos de ejercicios
- [ ] Cronómetro de entrenamiento completo
- [ ] Historial de entrenamientos
- [ ] Progresión de pesos
- [ ] Integración con Apple Health / Google Fit

---

**Creado:** 2026-04-08
**Para:** Entrenamiento personal de fuerza
**Peso inicial:** 94 kg → Objetivo: 82 kg
