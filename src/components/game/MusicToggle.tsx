'use client';

import { motion } from 'framer-motion';
import { Music, Music2, Music4 } from 'lucide-react';
import { useGameStore } from '@/lib/store';
import { useAudio } from '@/lib/audio';

export function MusicToggle() {
    const { musicEnabled, setMusicEnabled } = useGameStore();
    const { playClick } = useAudio();

    const handleToggle = () => {
        playClick();
        setMusicEnabled(!musicEnabled);
    };

    return (
        <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleToggle}
            className={`p-2 rounded transition-colors ${musicEnabled
                    ? 'bg-[#39ff14]/20 border border-[#39ff14]/50'
                    : 'bg-slate-800/80 border border-slate-700'
                }`}
            title={musicEnabled ? 'Ambient Audio enabled - Click to mute' : 'Ambient Audio muted - Click to enable'}
        >
            {musicEnabled ? (
                <Music className="w-4 h-4 text-[#39ff14]" />
            ) : (
                <Music4 className="w-4 h-4 text-gray-500" />
            )}
        </motion.button>
    );
}
