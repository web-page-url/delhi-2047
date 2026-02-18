'use client';

import { motion } from 'framer-motion';
import { Character } from '@/lib/story/types';
import { FACTIONS } from '@/lib/story/scenes';
import Image from 'next/image';

interface CharacterPortraitProps {
  character: Character;
  mood?: 'neutral' | 'concerned' | 'angry' | 'hopeful' | 'fearful' | 'determined';
  effect?: 'glitch' | 'static' | 'whisper' | 'shout';
}

const moodColors = {
  neutral: '#00d9ff',
  concerned: '#ffb800',
  angry: '#ff3333',
  hopeful: '#00ff88',
  fearful: '#ff006e',
  determined: '#00d9ff',
};

const portraitImages: Record<string, string> = {
  survivor: '/images/portraits/survivor_female.png',
  purist: '/images/portraits/purist_leader.png',
  soldier: '/images/portraits/soldier_female.png',
  mutant: '/images/portraits/mutant.png',
  council: '/images/portraits/council_elder.png',
};

// Character ID to portrait mapping
const characterPortraits: Record<string, string> = {
  priya: '/images/portraits/survivor_female.png',
  chairman_mehra: '/images/portraits/council_elder.png',
  commander_singh: '/images/portraits/soldier_female.png',
  guru_nirvan: '/images/portraits/purist_leader.png',
  general_khan: '/images/portraits/soldier_female.png',
  old_vikram: '/images/portraits/old_survivor.png',
  whisperer: '/images/portraits/mutant.png',
  elder_one: '/images/portraits/mutant.png',
};

export function CharacterPortrait({ character, mood = 'neutral', effect }: CharacterPortraitProps) {
  const faction = character.faction ? FACTIONS[character.faction] : null;
  const moodColor = moodColors[mood];
  const portraitSrc = characterPortraits[character.id] || portraitImages[character.portrait.style] || portraitImages.survivor;

  return (
    <motion.div
      initial={{ x: -100, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: -100, opacity: 0 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className="fixed left-4 top-[35%] md:left-8 md:top-1/4 z-20 pointer-events-none"
    >
      <div className={`character-frame p-1 relative ${effect === 'glitch' ? 'glitch-text' : ''}`}>
        {/* Portrait image */}
        <div
          className="w-48 h-64 relative overflow-hidden"
          style={{
            boxShadow: `0 0 30px ${moodColor}40, inset 0 0 30px rgba(0,0,0,0.5)`
          }}
        >
          <Image
            src={portraitSrc}
            alt={character.name}
            fill
            className="object-cover"
            style={{
              filter: `drop-shadow(0 0 10px ${moodColor}50)`,
            }}
          />

          {/* Overlay gradient */}
          <div
            className="absolute inset-0"
            style={{
              background: `linear-gradient(180deg, transparent 0%, transparent 50%, ${moodColor}20 100%)`,
            }}
          />

          {/* Scan lines effect */}
          <div className="absolute inset-0 opacity-20 pointer-events-none">
            {Array.from({ length: 20 }).map((_, i) => (
              <div
                key={i}
                className="w-full h-px bg-white/10"
                style={{ marginTop: i * 12 }}
              />
            ))}
          </div>

          {/* Glitch effect overlay */}
          {effect === 'glitch' && (
            <motion.div
              animate={{
                x: [0, -2, 2, -1, 1, 0],
                opacity: [1, 0.8, 1, 0.9, 1],
              }}
              transition={{
                duration: 0.2,
                repeat: Infinity,
                repeatDelay: 0.5,
              }}
              className="absolute inset-0"
              style={{
                background: `linear-gradient(90deg, transparent 0%, ${moodColor}20 50%, transparent 100%)`,
              }}
            />
          )}
        </div>

        {/* Character info */}
        <div className="mt-2 px-2">
          <div
            className="text-sm font-bold tracking-wide"
            style={{ color: moodColor, textShadow: `0 0 10px ${moodColor}50` }}
          >
            {character.name}
          </div>
          {faction && (
            <div className="text-xs text-gray-500 flex items-center gap-1 mt-1">
              <span style={{ color: faction.color }}>{faction.icon}</span>
              <span>{faction.name}</span>
            </div>
          )}
        </div>

        {/* HUD corners */}
        <div className="hud-corner hud-corner-tl" style={{ borderColor: moodColor }} />
        <div className="hud-corner hud-corner-tr" style={{ borderColor: moodColor }} />
        <div className="hud-corner hud-corner-bl" style={{ borderColor: moodColor }} />
        <div className="hud-corner hud-corner-br" style={{ borderColor: moodColor }} />
      </div>
    </motion.div>
  );
}
