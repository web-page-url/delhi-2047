'use client';

import { useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Volume2, VolumeX } from 'lucide-react';
import { useVoice } from '@/lib/useVoice';

interface DialogueBoxProps {
  speaker: string;
  text: string;
  fullText?: string;
  effect?: 'glitch' | 'static' | 'whisper' | 'shout';
  isTyping?: boolean;
}

const speakerColors: Record<string, string> = {
  'Narrator': '#8b949e',
  '???': '#ffb800',
};

const speakerVoices: Record<string, 'hi' | 'en'> = {
  'Narrator': 'en',
  '???': 'en',
};

export function DialogueBox({ speaker, text, fullText, effect, isTyping }: DialogueBoxProps) {
  const speakerColor = speakerColors[speaker] || '#00d9ff';
  const lang = speakerVoices[speaker] || 'en';
  const { speak, isSpeaking, isEnabled } = useVoice();
  const dialogueId = `dialogue-${speaker}-${(fullText || '').slice(0, 30)}`;

  const getEffectClass = () => {
    switch (effect) {
      case 'glitch': return 'glitch-text';
      case 'whisper': return 'text-gray-400 italic';
      case 'shout': return 'text-[#ff3333] font-bold uppercase';
      case 'static': return 'opacity-90';
      default: return '';
    }
  };

  const handleSpeak = useCallback(() => {
    if (!fullText) return;
    speak(fullText, dialogueId, lang);
  }, [fullText, speak, dialogueId, lang]);

  // Auto-play voice when a new dialogue scene starts
  useEffect(() => {
    if (isEnabled && fullText) {
      // Use a slightly longer delay to ensure the previous speech is fully cancelled
      const timer = setTimeout(() => {
        const textToSpeak = fullText;
        speak(textToSpeak, dialogueId, lang);
      }, 150);
      return () => clearTimeout(timer);
    }
  }, [fullText, isEnabled]); // Crucially removed handleSpeak and dialogueId from dependencies to avoid re-triggering while typing

  return (
    <motion.div
      initial={{ y: 50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: 50, opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="dialogue-box relative mx-4 mb-10 p-6 md:mx-8 md:mb-14"
    >
      {/* Speaker name and voice button */}
      <div
        className="text-sm font-bold tracking-widest mb-3 flex items-center justify-between"
      >
        <div className="flex items-center gap-2" style={{ color: speakerColor }}>
          <span className="w-2 h-2 rounded-full animate-pulse" style={{ background: speakerColor }} />
          {speaker}
        </div>


      </div>

      {/* Dialogue text */}
      <div className={`text-gray-200 leading-relaxed text-lg ${getEffectClass()}`}>
        {text}
        {isTyping && (
          <span className="typewriter-cursor" />
        )}
      </div>

      {/* Effect overlay */}
      {effect === 'static' && (
        <div className="absolute inset-0 pointer-events-none opacity-10">
          <div
            className="w-full h-full"
            style={{
              background: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,255,255,0.1) 2px, rgba(255,255,255,0.1) 4px)',
            }}
          />
        </div>
      )}

      {/* HUD corners */}
      <div className="hud-corner hud-corner-tl" />
      <div className="hud-corner hud-corner-tr" />
      <div className="hud-corner hud-corner-bl" />
      <div className="hud-corner hud-corner-br" />
    </motion.div>
  );
}
