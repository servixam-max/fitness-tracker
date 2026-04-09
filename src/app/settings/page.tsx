"use client";

import React from "react";
import { motion } from "framer-motion";
import { ArrowLeft, Bell, Volume2, Moon, Sun, Globe, Trash2, Download, Upload, Info } from "lucide-react";
import { useRouter } from "next/navigation";
import { useWorkoutHistory } from "@/hooks/useWorkoutHistory";
import { useWeightTracking } from "@/hooks/useWeightTracking";

export default function SettingsPage() {
  const router = useRouter();
  const { getTotalWorkouts, clearHistory } = useWorkoutHistory();
  const { clearAll: clearWeights } = useWeightTracking();

  const handleClearAll = () => {
    if (confirm('¿Seguro que quieres borrar TODOS los datos? Esto incluye historial y pesos.')) {
      clearHistory();
      clearWeights();
      alert('Datos borrados correctamente');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-zinc-950 via-zinc-900 to-black pb-24">
      {/* Header */}
      <motion.header
        className="px-6 pt-12 pb-6"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="flex items-center gap-3 mb-6">
          <button 
            onClick={() => router.push('/')}
            className="p-2 rounded-full bg-zinc-800 text-zinc-400"
          >
            <ArrowLeft size={24} />
          </button>
          <div>
            <h1 className="text-2xl font-bold text-white">Configuración</h1>
            <p className="text-zinc-400 text-sm">Preferencias de la app</p>
          </div>
        </div>
      </motion.header>

      {/* Settings Sections */}
      <div className="px-6 space-y-6">
        {/* Notifications */}
        <section>
          <h2 className="text-lg font-semibold text-white mb-4">Notificaciones</h2>
          <div className="space-y-3">
            <div className="p-4 rounded-2xl bg-zinc-900/50 border border-zinc-800 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-xl bg-blue-500/20">
                  <Bell size={20} className="text-blue-400" />
                </div>
                <div>
                  <p className="text-white font-medium">Recordatorios</p>
                  <p className="text-xs text-zinc-500">Avisos de entrenamiento</p>
                </div>
              </div>
              <span className="text-zinc-500 text-sm">Próximamente</span>
            </div>
          </div>
        </section>

        {/* Audio */}
        <section>
          <h2 className="text-lg font-semibold text-white mb-4">Audio</h2>
          <div className="space-y-3">
            <div className="p-4 rounded-2xl bg-zinc-900/50 border border-zinc-800 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-xl bg-orange-500/20">
                  <Volume2 size={20} className="text-orange-400" />
                </div>
                <div>
                  <p className="text-white font-medium">Voz del coach</p>
                  <p className="text-xs text-zinc-500">Español (nativo)</p>
                </div>
              </div>
              <span className="text-green-400 text-sm">Activo</span>
            </div>
            <div className="p-4 rounded-2xl bg-zinc-900/50 border border-zinc-800 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-xl bg-purple-500/20">
                  <Volume2 size={20} className="text-purple-400" />
                </div>
                <div>
                  <p className="text-white font-medium">Efectos de sonido</p>
                  <p className="text-xs text-zinc-500">Beeps y fanfarrias</p>
                </div>
              </div>
              <span className="text-green-400 text-sm">Activo</span>
            </div>
          </div>
        </section>

        {/* App Info */}
        <section>
          <h2 className="text-lg font-semibold text-white mb-4">Acerca de</h2>
          <div className="space-y-3">
            <div className="p-4 rounded-2xl bg-zinc-900/50 border border-zinc-800">
              <div className="flex items-center gap-3 mb-3">
                <div className="p-2 rounded-xl bg-gradient-to-br from-orange-500 to-red-600">
                  <Info size={20} className="text-white" />
                </div>
                <div>
                  <p className="text-white font-bold">Fitness Tracker</p>
                  <p className="text-xs text-zinc-500">Versión 1.0.0</p>
                </div>
              </div>
              <p className="text-sm text-zinc-400 leading-relaxed">
                App de entrenamiento personal con rutina de fuerza y HIIT. 
                Diseñada para usar en el gimnasio con sesiones guiadas por voz.
              </p>
            </div>
            
            <div className="p-4 rounded-2xl bg-zinc-900/50 border border-zinc-800 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-xl bg-green-500/20">
                  <Globe size={20} className="text-green-400" />
                </div>
                <div>
                  <p className="text-white font-medium">Idioma</p>
                  <p className="text-xs text-zinc-500">Español</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Data Management */}
        <section>
          <h2 className="text-lg font-semibold text-white mb-4">Datos</h2>
          <div className="space-y-3">
            <div className="p-4 rounded-2xl bg-zinc-900/50 border border-zinc-800 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-xl bg-blue-500/20">
                  <Download size={20} className="text-blue-400" />
                </div>
                <div>
                  <p className="text-white font-medium">Exportar datos</p>
                  <p className="text-xs text-zinc-500">Descargar historial</p>
                </div>
              </div>
              <span className="text-zinc-500 text-sm">Próximamente</span>
            </div>
            <div className="p-4 rounded-2xl bg-zinc-900/50 border border-zinc-800 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-xl bg-purple-500/20">
                  <Upload size={20} className="text-purple-400" />
                </div>
                <div>
                  <p className="text-white font-medium">Importar datos</p>
                  <p className="text-xs text-zinc-500">Restaurar respaldo</p>
                </div>
              </div>
              <span className="text-zinc-500 text-sm">Próximamente</span>
            </div>
          </div>
        </section>

        {/* Danger Zone */}
        <section>
          <h2 className="text-lg font-semibold text-red-400 mb-4">Zona de peligro</h2>
          <div className="space-y-3">
            <button
              onClick={handleClearAll}
              className="w-full p-4 rounded-2xl bg-red-500/20 border border-red-500/30 flex items-center justify-between text-red-400"
            >
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-xl bg-red-500">
                  <Trash2 size={20} className="text-white" />
                </div>
                <div className="text-left">
                  <p className="font-medium">Borrar todos los datos</p>
                  <p className="text-xs opacity-80">Historial y pesos (irreversible)</p>
                </div>
              </div>
              <ArrowLeft size={20} className="rotate-180" />
            </button>
          </div>
        </section>

        {/* Stats Summary */}
        <div className="mt-8 p-6 rounded-2xl bg-gradient-to-br from-zinc-800 to-zinc-900 border border-zinc-700">
          <h3 className="text-lg font-bold text-white mb-4">Resumen</h3>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-xs text-zinc-400">Entrenamientos</p>
              <p className="text-2xl font-bold text-white">{getTotalWorkouts()}</p>
            </div>
            <div>
              <p className="text-xs text-zinc-400">Versión</p>
              <p className="text-2xl font-bold text-orange-400">1.0.0</p>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="fixed bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black via-black/90 to-transparent">
        <p className="text-center text-xs text-zinc-600">
          Hecho con 💪 para entrenar mejor
        </p>
      </footer>
    </div>
  );
}