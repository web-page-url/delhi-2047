import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useGameStore } from '@/lib/store';
import { Radio, AlertTriangle, Zap } from 'lucide-react';

function StatValue({ value, label }: { value: number; label: string }) {
  return (
    <div className="flex flex-col">
      <span className="text-[9px] text-gray-500 font-mono tracking-tighter uppercase">{label}</span>
      <motion.span
        key={value}
        initial={{ y: 5, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="text-sm font-mono font-bold text-[#00d9ff]"
      >
        {value}
      </motion.span>
    </div>
  );
}

export function RadiationMeter() {
  const { currentAct, morality } = useGameStore();
  const [jitter, setJitter] = useState(0);

  // Enhanced Geiger counter jitter for better visual feedback
  useEffect(() => {
    const interval = setInterval(() => {
      // Larger range (±8) for more visible movement
      setJitter(Math.random() * 16 - 8);
    }, 100);
    return () => clearInterval(interval);
  }, []);

  const baseThreat = Math.min(100,
    30 + // Minimum baseline
    (currentAct - 1) * 20 +
    Math.max(0, 100 - morality.humanity) * 0.2
  );

  const threatLevel = Math.max(0, Math.min(100, baseThreat + jitter));

  return (
    <motion.div
      initial={{ x: -50, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      className="radiation-meter p-3 pointer-events-auto min-w-[150px] border-[#00d9ff]/20"
    >
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <Radio className="w-3 h-3 text-[#00d9ff] animate-pulse" />
          <span className="text-[10px] text-gray-400 tracking-widest font-bold">RADIATION</span>
        </div>
        <div className="flex items-center gap-1 font-mono text-[10px] text-[#ff3333] w-[70px] justify-end tabular-nums">
          <Zap className="w-2 h-2 fill-[#ff3333]" />
          <span>{threatLevel.toFixed(1)} mSv/h</span>
        </div>
      </div>

      {/* Radiation bar - Stays stable */}
      <div className="w-full h-1.5 bg-slate-900 rounded-full overflow-hidden mb-4 border border-slate-800">
        <motion.div
          animate={{
            width: `${baseThreat}%`,
          }}
          transition={{ type: 'spring', stiffness: 50, damping: 20 }}
          className="h-full rounded-full"
          style={{
            background: `linear-gradient(90deg, #00ff88, #ffb800, #ff3333)`,
            boxShadow: `0 0 10px ${baseThreat > 60 ? '#ff3333' : '#00ff88'}40`,
          }}
        />
      </div>

      {/* Warning indicator - Now based on stable baseThreat to prevent UI flickering */}
      <AnimatePresence>
        {baseThreat > 65 && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="flex items-center gap-1 mb-3 bg-[#ff3333]/10 p-1 rounded border border-[#ff3333]/20"
          >
            <AlertTriangle className="w-3 h-3 text-[#ff3333]" />
            <span className="text-[9px] font-bold text-[#ff3333] tracking-tighter uppercase">Radiation Warning</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Morality stats - Now dynamic and visible */}
      <div className="grid grid-cols-2 gap-3 pt-2 border-t border-slate-700/50">
        <StatValue label="Humanity" value={morality.humanity} />
        <StatValue label="Authority" value={morality.authority} />
        <StatValue label="Faith" value={morality.faith} />
        <StatValue label="Evolution" value={morality.evolution} />
      </div>
    </motion.div>
  );
}
