'use client';

import { motion } from 'framer-motion';
import { useGameStore } from '@/lib/store';
import { ENDINGS } from '@/lib/story/scenes';
import { Sunrise, Shield, Sparkles, RotateCcw, Home } from 'lucide-react';

const endingIcons = {
  hope: Sunrise,
  dark: Shield,
  transcendence: Sparkles,
};

const endingColors = {
  hope: '#00ff88',
  dark: '#ff3333',
  transcendence: '#ffb800',
};

export function EndingScreen() {
  const { decisions, morality, resetGame, setGamePhase } = useGameStore();

  // Determine ending based on morality
  const determineEnding = () => {
    const { humanity, authority, faith, evolution } = morality;
    
    // Check for Rebirth ending (high humanity + evolution)
    if (humanity >= 60 && evolution >= 40) {
      return ENDINGS.find(e => e.id === 'rebirth')!;
    }
    
    // Check for Iron Metro ending (high authority)
    if (authority >= 70) {
      return ENDINGS.find(e => e.id === 'iron_metro')!;
    }
    
    // Check for Radiant Ascension (high faith + evolution)
    if (faith >= 60 && evolution >= 70) {
      return ENDINGS.find(e => e.id === 'radiant_ascension')!;
    }
    
    // Default to Rebirth if humanity is highest
    if (humanity >= authority && humanity >= faith && humanity >= evolution) {
      return ENDINGS.find(e => e.id === 'rebirth')!;
    }
    
    // Default to Iron Metro if authority is highest
    if (authority >= humanity && authority >= faith && authority >= evolution) {
      return ENDINGS.find(e => e.id === 'iron_metro')!;
    }
    
    // Default to Radiant Ascension
    return ENDINGS.find(e => e.id === 'radiant_ascension')!;
  };

  const ending = determineEnding();
  const Icon = endingIcons[ending.theme];
  const color = endingColors[ending.theme];

  const handleNewGame = () => {
    resetGame();
    setGamePhase('title');
  };

  const handleTitle = () => {
    setGamePhase('title');
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="ending-screen min-h-screen flex flex-col items-center justify-center p-8"
    >
      {/* Background effects */}
      <div 
        className="absolute inset-0 overflow-hidden"
        style={{
          background: `radial-gradient(ellipse at center, ${color}10 0%, transparent 50%)`,
        }}
      />

      {/* Ending icon */}
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.5 }}
        className="mb-8"
      >
        <div 
          className="w-24 h-24 rounded-full flex items-center justify-center"
          style={{
            background: `radial-gradient(circle, ${color}30 0%, transparent 70%)`,
            boxShadow: `0 0 60px ${color}40`,
          }}
        >
          <Icon 
            className="w-12 h-12"
            style={{ color }}
          />
        </div>
      </motion.div>

      {/* Title */}
      <motion.h1
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.8 }}
        className="text-4xl md:text-5xl font-bold tracking-wider text-center mb-2"
        style={{ color }}
      >
        {ending.title}
      </motion.h1>

      {/* Subtitle */}
      <motion.p
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, delay: 1 }}
        className="text-lg text-gray-400 tracking-widest mb-8"
      >
        {ending.subtitle}
      </motion.p>

      {/* Description */}
      <motion.p
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, delay: 1.2 }}
        className="text-gray-300 text-center max-w-lg mb-12 leading-relaxed"
      >
        {ending.description}
      </motion.p>

      {/* Epilogue */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, delay: 1.5 }}
        className="space-y-2 mb-12 text-center"
      >
        {ending.epilogue.map((line, index) => (
          <motion.p
            key={index}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4, delay: 1.8 + index * 0.3 }}
            className="text-gray-500 italic text-sm"
          >
            {line}
          </motion.p>
        ))}
      </motion.div>

      {/* Stats summary */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, delay: 2.5 }}
        className="dialogue-box p-4 mb-8"
      >
        <div className="text-xs text-gray-500 tracking-wider mb-3">FINAL STATS</div>
        <div className="grid grid-cols-4 gap-4 text-center">
          <div>
            <div className="text-lg font-bold text-[#00d9ff]">{morality.humanity}</div>
            <div className="text-xs text-gray-500">Humanity</div>
          </div>
          <div>
            <div className="text-lg font-bold text-[#ff3333]">{morality.authority}</div>
            <div className="text-xs text-gray-500">Authority</div>
          </div>
          <div>
            <div className="text-lg font-bold text-[#ffb800]">{morality.faith}</div>
            <div className="text-xs text-gray-500">Faith</div>
          </div>
          <div>
            <div className="text-lg font-bold text-[#39ff14]">{morality.evolution}</div>
            <div className="text-xs text-gray-500">Evolution</div>
          </div>
        </div>
        <div className="mt-3 pt-3 border-t border-slate-700/50 text-center">
          <span className="text-xs text-gray-500">
            {decisions.length} decisions made
          </span>
        </div>
      </motion.div>

      {/* Action buttons */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, delay: 3 }}
        className="flex gap-4"
      >
        <button
          onClick={handleNewGame}
          className="choice-button flex items-center gap-2 text-gray-300 hover:text-[#00d9ff]"
        >
          <RotateCcw className="w-4 h-4" />
          <span className="tracking-wider text-sm">NEW GAME</span>
        </button>
        <button
          onClick={handleTitle}
          className="choice-button flex items-center gap-2 text-gray-300 hover:text-[#00d9ff]"
        >
          <Home className="w-4 h-4" />
          <span className="tracking-wider text-sm">TITLE SCREEN</span>
        </button>
      </motion.div>

      {/* Credits */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 3.5 }}
        className="absolute bottom-8 text-center text-gray-600 text-xs tracking-wider"
      >
        <p className="text-[#00d9ff]">DILLI 2047: THE LAST METRO</p>
        <p className="mt-1">An Indian Sci-Fi Visual Novel</p>
      </motion.div>
    </motion.div>
  );
}
