'use client';

import { motion } from 'framer-motion';
import { Volume2, VolumeX } from 'lucide-react';
import { useVoice } from '@/lib/useVoice';

interface DialogueBoxProps {
  speaker: string;
  text: string;
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

export function DialogueBox({ speaker, text, effect, isTyping }: DialogueBoxProps) {
  const speakerColor = speakerColors[speaker] || '#00d9ff';
  const lang = speakerVoices[speaker] || 'en';
  const { speak, isSpeaking, isEnabled } = useVoice();
  const dialogueId = `dialogue-${speaker}-${text.slice(0, 20)}`;
  
  const getEffectClass = () => {
    switch (effect) {
      case 'glitch': return 'glitch-text';
      case 'whisper': return 'text-gray-400 italic';
      case 'shout': return 'text-[#ff3333] font-bold uppercase';
      case 'static': return 'opacity-90';
      default: return '';
    }
  };

  const handleSpeak = () => {
    speak(text, dialogueId, lang);
  };

  return (
    <motion.div
      initial={{ y: 50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: 50, opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="dialogue-box relative mx-4 mb-4 p-6"
    >
      {/* Speaker name and voice button */}
      <div 
        className="text-sm font-bold tracking-widest mb-3 flex items-center justify-between"
      >
        <div className="flex items-center gap-2" style={{ color: speakerColor }}>
          <span className="w-2 h-2 rounded-full animate-pulse" style={{ background: speakerColor }} />
          {speaker}
        </div>
        
        {/* Voice button */}
        {isEnabled && text && !isTyping && (
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={(e) => {
              e.stopPropagation();
              handleSpeak();
            }}
            className={`p-1.5 rounded transition-colors ${
              isSpeaking === dialogueId 
                ? 'bg-[#00d9ff]/30 border border-[#00d9ff]' 
                : 'bg-slate-800/50 border border-slate-700 hover:border-[#00d9ff]/50'
            }`}
            title={isSpeaking === dialogueId ? 'Speaking...' : 'Click to hear dialogue'}
          >
            {isSpeaking === dialogueId ? (
              <VolumeX className="w-3.5 h-3.5 text-[#00d9ff]" />
            ) : (
              <Volume2 className="w-3.5 h-3.5 text-gray-400 hover:text-[#00d9ff]" />
            )}
          </motion.button>
        )}
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
