'use client';

import { motion } from 'framer-motion';
import { useGameStore } from '@/lib/store';
import { X, Volume2, VolumeX, Zap, Eye, EyeOff, Mic } from 'lucide-react';
import { VoiceToggle } from './VoiceToggle';

export function SettingsMenu() {
  const { 
    textSpeed, 
    musicVolume, 
    sfxVolume, 
    showGlitchEffects,
    setTextSpeed,
    setMusicVolume,
    setSfxVolume,
    setGlitchEffects,
    setGamePhase,
  } = useGameStore();

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen flex items-center justify-center p-8"
    >
      <div className="dialogue-box max-w-md w-full p-6 relative">
        {/* Close button */}
        <button
          onClick={() => setGamePhase('title')}
          className="absolute top-4 right-4 text-gray-500 hover:text-[#00d9ff] transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <h2 className="text-xl font-bold text-[#00d9ff] tracking-wider mb-6">
          SETTINGS
        </h2>

        <div className="space-y-6">
          {/* Voice Narration Toggle */}
          <div className="flex items-center justify-between p-3 bg-slate-800/50 rounded border border-slate-700/50">
            <div className="flex items-center gap-2">
              <Mic className="w-4 h-4 text-[#00d9ff]" />
              <span className="text-sm text-gray-300">Voice Narration</span>
            </div>
            <VoiceToggle />
          </div>
          
          <div className="text-xs text-gray-500 px-1">
            Voice uses browser&apos;s built-in speech synthesis (free). Click the speaker icon on dialogue to hear it read aloud.
          </div>

          {/* Text Speed */}
          <div>
            <label className="text-sm text-gray-400 mb-2 block">
              TEXT SPEED
            </label>
            <div className="flex items-center gap-4">
              <input
                type="range"
                min="10"
                max="100"
                value={100 - textSpeed}
                onChange={(e) => setTextSpeed(100 - Number(e.target.value))}
                className="flex-1 accent-[#00d9ff]"
              />
              <span className="text-xs text-gray-500 w-12">
                {textSpeed < 20 ? 'FAST' : textSpeed < 40 ? 'NORMAL' : 'SLOW'}
              </span>
            </div>
          </div>

          {/* Music Volume */}
          <div>
            <label className="text-sm text-gray-400 mb-2 flex items-center gap-2">
              <Volume2 className="w-4 h-4" />
              MUSIC VOLUME
            </label>
            <input
              type="range"
              min="0"
              max="100"
              value={musicVolume * 100}
              onChange={(e) => setMusicVolume(Number(e.target.value) / 100)}
              className="w-full accent-[#00d9ff]"
            />
          </div>

          {/* SFX Volume */}
          <div>
            <label className="text-sm text-gray-400 mb-2 flex items-center gap-2">
              <Zap className="w-4 h-4" />
              SFX VOLUME
            </label>
            <input
              type="range"
              min="0"
              max="100"
              value={sfxVolume * 100}
              onChange={(e) => setSfxVolume(Number(e.target.value) / 100)}
              className="w-full accent-[#00d9ff]"
            />
          </div>

          {/* Glitch Effects Toggle */}
          <div className="flex items-center justify-between">
            <label className="text-sm text-gray-400 flex items-center gap-2">
              {showGlitchEffects ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
              GLITCH EFFECTS
            </label>
            <button
              onClick={() => setGlitchEffects(!showGlitchEffects)}
              className={`w-12 h-6 rounded-full transition-colors ${
                showGlitchEffects ? 'bg-[#00d9ff]' : 'bg-slate-700'
              }`}
            >
              <div 
                className={`w-5 h-5 rounded-full bg-white transition-transform ${
                  showGlitchEffects ? 'translate-x-6' : 'translate-x-0.5'
                }`}
              />
            </button>
          </div>
        </div>

        {/* Back button */}
        <button
          onClick={() => setGamePhase('title')}
          className="choice-button w-full mt-6 text-center text-gray-300 hover:text-[#00d9ff]"
        >
          BACK TO TITLE
        </button>
      </div>
    </motion.div>
  );
}
