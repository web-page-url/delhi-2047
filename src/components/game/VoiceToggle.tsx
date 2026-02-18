'use client';

import { motion } from 'framer-motion';
import { Volume2, VolumeX, Loader2 } from 'lucide-react';
import { useVoice } from '@/lib/useVoice';

export function VoiceToggle() {
  const { isEnabled, toggleVoice, isSpeaking } = useVoice();

  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={toggleVoice}
      className={`p-2 rounded transition-colors ${
        isSpeaking 
          ? 'bg-[#00d9ff]/20 border border-[#00d9ff]' 
          : isEnabled 
            ? 'bg-slate-800/80 border border-[#00d9ff]/30' 
            : 'bg-slate-800/80 border border-slate-700'
      }`}
      title={isEnabled ? 'Voice enabled - Click to disable' : 'Voice disabled - Click to enable'}
    >
      {isSpeaking ? (
        <Loader2 className="w-4 h-4 text-[#00d9ff] animate-spin" />
      ) : isEnabled ? (
        <Volume2 className="w-4 h-4 text-[#00d9ff]" />
      ) : (
        <VolumeX className="w-4 h-4 text-gray-500" />
      )}
    </motion.button>
  );
}
