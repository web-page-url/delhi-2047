'use client';

import { motion } from 'framer-motion';
import { useGameStore } from '@/lib/store';
import { Train, Radio, Settings, Save, BookOpen, Zap } from 'lucide-react';
import { useAudio } from '@/lib/audio';
import { useState } from 'react';
import Image from 'next/image';

export function TitleScreen() {
  const { startNewGame, setGamePhase } = useGameStore();
  const { initAudio, startAmbient, playClick, playGlitch } = useAudio();
  const [showCredits, setShowCredits] = useState(false);

  const handleNewGame = () => {
    playClick();
    playGlitch();
    initAudio();
    startAmbient(0.1);
    startNewGame();
  };

  const handleContinue = () => {
    playClick();
    // Check if there's saved data
    const savedData = localStorage.getItem('dilli-2047-storage');
    if (savedData) {
      initAudio();
      startAmbient(0.1);
      setGamePhase('playing');
    }
  };

  const handleSettings = () => {
    playClick();
    setGamePhase('menu');
  };

  const handleCredits = () => {
    playClick();
    setShowCredits(true);
  };

  const menuItems = [
    { label: 'NEW JOURNEY', icon: Train, action: handleNewGame },
    { label: 'CONTINUE', icon: Save, action: handleContinue },
    { label: 'SETTINGS', icon: Settings, action: handleSettings },
    { label: 'CREDITS', icon: BookOpen, action: handleCredits },
  ];

  if (showCredits) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="min-h-screen flex flex-col items-center justify-center p-8"
      >
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="text-center max-w-lg"
        >
          <h2 className="text-3xl font-bold text-[#00d9ff] mb-8 tracking-wider">CREDITS</h2>

          <div className="space-y-6 text-gray-400">
            <div>
              <div className="text-[#ff006e] text-sm tracking-wider mb-2">CREATED BY</div>
              <div className="text-gray-300 text-lg">
                <a
                  href="https://www.linkedin.com/in/anubhav-chaudhary-4bba7918b/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#00d9ff] transition-colors underline decoration-[#ff006e]/30 underline-offset-4"
                >
                  Anubhav
                </a>
              </div>
            </div>

            <div>
              <div className="text-[#ff006e] text-sm tracking-wider mb-2">STORY & DESIGN</div>
              <div className="text-gray-300">Inspired by the resilience of Delhi Metro</div>
            </div>

            <div>
              <div className="text-[#ff006e] text-sm tracking-wider mb-2">SPECIAL THANKS</div>
              <div className="text-gray-300 text-sm leading-relaxed">
                To the engineers, workers, and dreamers who built the Delhi Metro -
                a symbol of modern India connecting millions every day.
              </div>
            </div>

            <div className="pt-6 border-t border-slate-700">
              <div className="text-xs text-gray-500">
                Set in 2047 — 100 years after India&apos;s independence
              </div>
            </div>
          </div>

          <button
            onClick={() => setShowCredits(false)}
            className="choice-button mt-8 px-8 text-gray-300 hover:text-[#00d9ff]"
          >
            BACK
          </button>
        </motion.div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen flex flex-col items-center justify-center p-8 relative"
    >
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/ui/title_bg.png"
          alt="Delhi Metro 2047"
          fill
          className="object-cover"
          style={{ filter: 'brightness(0.4) contrast(1.1)' }}
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#050810] via-[#050810]/70 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#050810]/80 via-transparent to-[#050810]" />
      </div>

      {/* Background effects */}
      <div className="absolute inset-0 overflow-hidden z-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#00d9ff] opacity-5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#ff006e] opacity-5 rounded-full blur-3xl" />
      </div>

      {/* Title */}
      <motion.div
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="text-center mb-16 relative z-10"
      >
        <h1 className="text-6xl md:text-8xl font-bold tracking-wider mb-4">
          <span className="text-[#00d9ff] glitch-text">DILLI</span>
        </h1>
        <h2 className="text-3xl md:text-4xl font-light tracking-widest text-[#ff006e] mb-2">
          2047
        </h2>
        <div className="h-px w-48 mx-auto bg-gradient-to-r from-transparent via-[#00d9ff] to-transparent my-4" />
        <p className="text-lg text-gray-400 tracking-wide">
          THE LAST METRO
        </p>
      </motion.div>

      {/* Subtitle */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.5 }}
        className="text-gray-500 text-center max-w-lg mb-12 relative z-10"
      >
        An Indian Sci-Fi Interactive Visual Novel
        <br />
        <span className="text-sm">
          100 years after independence. 15 years after the end of the world.
        </span>
      </motion.p>

      {/* Menu */}
      <motion.div
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.8 }}
        className="space-y-4 relative z-10"
      >
        {menuItems.map((item, index) => (
          <motion.button
            key={item.label}
            initial={{ x: -30, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.4, delay: 0.9 + index * 0.1 }}
            onClick={item.action}
            onMouseEnter={() => playClick()}
            className="choice-button w-64 flex items-center gap-4 text-gray-300 hover:text-[#00d9ff] transition-all"
          >
            <item.icon className="w-5 h-5 text-[#00d9ff]" />
            <span className="tracking-widest text-sm">{item.label}</span>
          </motion.button>
        ))}
      </motion.div>

      {/* Footer */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 1.5 }}
        className="absolute bottom-8 text-center text-gray-600 text-xs tracking-wider z-10"
      >
        <p>DELHI METRO UNDERGROUND</p>
        <p className="text-[#00d9ff] mt-1">RAJIV CHOWK COLLECTIVE</p>
      </motion.div>

      {/* Radio animation */}
      <motion.div
        animate={{
          opacity: [0.3, 0.7, 0.3],
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        className="absolute top-8 right-8 z-10"
      >
        <Radio className="w-6 h-6 text-[#00d9ff]" />
      </motion.div>

      {/* Zap effect */}
      <motion.div
        animate={{
          opacity: [0, 0.5, 0],
        }}
        transition={{
          duration: 0.1,
          repeat: Infinity,
          repeatDelay: 5 + Math.random() * 10,
        }}
        className="absolute top-8 left-8 z-10"
      >
        <Zap className="w-6 h-6 text-[#ffb800]" />
      </motion.div>
    </motion.div>
  );
}
