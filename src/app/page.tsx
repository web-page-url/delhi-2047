'use client';

import { useEffect, useState, useRef } from 'react';
import { useGameStore } from '@/lib/store';
import { TitleScreen } from '@/components/game/TitleScreen';
import { GameScene } from '@/components/game/GameScene';
import { SettingsMenu } from '@/components/game/SettingsMenu';
import { SaveLoadMenu } from '@/components/game/SaveLoadMenu';
import { EndingScreen } from '@/components/game/EndingScreen';
import { GlitchOverlay } from '@/components/game/GlitchOverlay';
import { RadiationMeter } from '@/components/game/RadiationMeter';
import { MetroMap } from '@/components/game/MetroMap';
import { VoiceToggle } from '@/components/game/VoiceToggle';
import { MusicToggle } from '@/components/game/MusicToggle';
import { AnimatePresence } from 'framer-motion';

export default function Dilli2047() {
  const { gamePhase, showGlitchEffects } = useGameStore();
  const [mounted, setMounted] = useState(false);
  const hasMounted = useRef(false);

  useEffect(() => {
    if (!hasMounted.current) {
      hasMounted.current = true;
      // Use requestAnimationFrame to defer setState
      requestAnimationFrame(() => {
        setMounted(true);
      });
    }
  }, []);

  if (!mounted) {
    return (
      <div className="min-h-screen bg-[#050810] flex items-center justify-center">
        <div className="text-[#00d9ff] animate-pulse">Loading...</div>
      </div>
    );
  }

  return (
    <main className="relative min-h-screen bg-[#050810] overflow-hidden">
      {/* Atmospheric overlays */}
      {showGlitchEffects && <GlitchOverlay />}
      <div className="noise-overlay" />
      <div className="metro-map-overlay" />

      {/* Main content */}
      <AnimatePresence mode="wait">
        {gamePhase === 'title' && <TitleScreen key="title" />}
        {gamePhase === 'playing' && (
          <div key="game" className="relative min-h-screen flex flex-col">
            {/* Top HUD */}
            <div className="fixed top-0 left-0 right-0 z-40 p-4 flex justify-between items-start pointer-events-none">
              <RadiationMeter />
              <MetroMap />
            </div>

            {/* Game Scene */}
            <GameScene />

            {/* Voice Toggle - Fixed position */}
            <div className="fixed bottom-4 right-4 z-50 flex gap-2">
              <MusicToggle />
              <VoiceToggle />
            </div>
          </div>
        )}
        {gamePhase === 'ending' && <EndingScreen key="ending" />}
        {gamePhase === 'menu' && <SettingsMenu key="menu" />}
      </AnimatePresence>

      {/* Save/Load overlay */}
      <SaveLoadMenu />
    </main>
  );
}
