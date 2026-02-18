'use client';

import { motion } from 'framer-motion';
import { Choice } from '@/lib/story/types';
import { ChevronRight } from 'lucide-react';
import { useAudio } from '@/lib/audio';

interface ChoicePanelProps {
  choices: Choice[];
  onChoice: (choice: Choice) => void;
}

export function ChoicePanel({ choices, onChoice }: ChoicePanelProps) {
  const { playClick, playGlitch } = useAudio();

  const handleHover = () => {
    // Subtle sound on hover
  };

  return (
    <motion.div
      initial={{ y: 50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: 50, opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="p-4 pb-10 space-y-3"
    >
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="text-xs text-[#00d9ff] tracking-widest mb-4 px-4 opacity-70 flex items-center gap-2"
      >
        <ChevronRight className="w-3 h-3" />
        CHOOSE YOUR PATH
      </motion.div>

      {choices.map((choice, index) => (
        <motion.button
          key={choice.id}
          initial={{ x: -30, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.3, delay: index * 0.1 }}
          onClick={(e) => {
            e.stopPropagation();
            playClick();
            // Play a subtle effect for major choices
            if (choice.id.includes('choose_') || choice.id.includes('join_') || choice.id.includes('embrace_')) {
              playGlitch();
            }
            onChoice(choice);
          }}
          onMouseEnter={handleHover}
          className="choice-button w-full text-gray-300 hover:text-[#00d9ff] group relative overflow-hidden"
        >
          <motion.div
            initial={{ width: 0 }}
            whileHover={{ width: '100%' }}
            className="absolute inset-0 bg-gradient-to-r from-[#00d9ff]/10 to-transparent"
          />

          <ChevronRight className="w-4 h-4 text-[#00d9ff] opacity-0 group-hover:opacity-100 transition-opacity absolute left-2" />
          <span className="pl-6 relative z-10">{choice.text}</span>

          {/* Glitch effect on important choices */}
          {(choice.id.includes('choose_') || choice.id.includes('join_') || choice.id.includes('attack_')) && (
            <motion.div
              initial={{ opacity: 0 }}
              whileHover={{ opacity: 0.5 }}
              className="absolute inset-0 pointer-events-none"
              style={{
                background: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,0,110,0.1) 2px, rgba(255,0,110,0.1) 4px)',
              }}
            />
          )}
        </motion.button>
      ))}
    </motion.div>
  );
}
