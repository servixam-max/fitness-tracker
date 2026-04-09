"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Wifi, WifiOff, CheckCircle, AlertCircle } from "lucide-react";

export default function OfflineMode() {
  const [isOnline, setIsOnline] = useState(true);
  const [showBanner, setShowBanner] = useState(false);

  useEffect(() => {
    const handleOnline = () => {
      setIsOnline(true);
      setShowBanner(true);
      setTimeout(() => setShowBanner(false), 3000);
    };
    
    const handleOffline = () => {
      setIsOnline(false);
      setShowBanner(true);
    };

    setIsOnline(navigator.onLine);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  return (
    <AnimatePresence>
      {showBanner && (
        <motion.div
          className={`fixed top-4 left-4 right-4 z-[60] p-4 rounded-2xl flex items-center gap-3 shadow-xl ${
            isOnline
              ? "bg-green-500/20 border border-green-500/30 text-green-400"
              : "bg-orange-500/20 border border-orange-500/30 text-orange-400"
          }`}
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -50 }}
        >
          {isOnline ? (
            <CheckCircle size={24} />
          ) : (
            <WifiOff size={24} />
          )}
          <div className="flex-1">
            <p className="font-semibold">
              {isOnline ? "¡Conexión restaurada!" : "Sin conexión"}
            </p>
            <p className="text-sm opacity-80">
              {isOnline
                ? "Todos los datos se sincronizarán"
                : "Puedes seguir entrenando, los datos se guardan localmente"}
            </p>
          </div>
          {isOnline && (
            <Wifi size={20} className="text-green-400" />
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}