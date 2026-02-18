'use client';

import { motion } from 'framer-motion';
import { useGameStore } from '@/lib/store';
import { Radio, AlertTriangle } from 'lucide-react';

export function RadiationMeter() {
  const { currentAct, morality, reputation } = useGameStore();

  // Calculate overall "threat level" based on story progress
  const threatLevel = Math.min(100, 
    (currentAct - 1) * 30 + 
    Math.max(0, 100 - morality.humanity) * 0.3
  );

  const getThreatColor = () => {
    if (threatLevel < 30) return '#00ff88';
    if (threatLevel < 60) return '#ffb800';
    return '#ff3333';
  };

  return (
    <motion.div
      initial={{ x: -50, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      className="radiation-meter p-3 pointer-events-auto"
    >
      <div className="flex items-center gap-3 mb-2">
        <Radio className="w-4 h-4 text-[#00d9ff] animate-pulse" />
        <span className="text-xs text-gray-400 tracking-wider">RADIATION</span>
      </div>
      
      {/* Radiation bar */}
      <div className="w-32 h-2 bg-slate-800 rounded-full overflow-hidden">
        <motion.div
          className="h-full rounded-full"
          style={{ 
            width: `${threatLevel}%`,
            background: `linear-gradient(90deg, #00ff88, #ffb800, #ff3333)`,
          }}
          animate={{
            opacity: [0.7, 1, 0.7],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      </div>

      {/* Warning indicator */}
      {threatLevel > 60 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex items-center gap-1 mt-2"
        >
          <AlertTriangle className="w-3 h-3 text-[#ff3333]" />
          <span className="text-xs text-[#ff3333]">HIGH THREAT</span>
        </motion.div>
      )}

      {/* Hidden morality stats (for debug/development) */}
      <div className="mt-3 pt-2 border-t border-slate-700/50 opacity-50">
        <div className="grid grid-cols-2 gap-1 text-[10px] text-gray-500">
          <span>HUM: {morality.humanity}</span>
          <span>AUT: {morality.authority}</span>
          <span>FAI: {morality.faith}</span>
          <span>EVO: {morality.evolution}</span>
        </div>
      </div>
    </motion.div>
  );
}
