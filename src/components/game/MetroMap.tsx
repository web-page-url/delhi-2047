'use client';

import { motion } from 'framer-motion';
import { useGameStore } from '@/lib/store';
import { MapPin, Train, AlertCircle } from 'lucide-react';
import { FACTIONS, METRO_STATIONS } from '@/lib/story/scenes';

export function MetroMap() {
  const { currentScene, currentAct, flags } = useGameStore();

  // Determine current station based on scene
  const getCurrentStation = () => {
    if (currentScene.includes('rajiv') || currentScene === 'intro' || currentScene === 'transmission' || currentScene === 'council_chamber' || currentScene === 'preparation') {
      return 'rajiv_chowk';
    }
    if (currentScene.includes('yamuna') || currentScene.includes('purist')) {
      return 'yamuna_bank';
    }
    if (currentScene.includes('red_line') || currentScene.includes('syndicate')) {
      return 'red_fort';
    }
    if (currentScene.includes('surface') || currentScene.includes('ending') || currentScene.includes('final') || currentScene.includes('act3')) {
      return 'india_gate';
    }
    if (currentScene.includes('abandoned') || currentScene.includes('first_contact')) {
      return 'kashmere_gate';
    }
    return 'rajiv_chowk';
  };

  const currentStation = getCurrentStation();
  const station = METRO_STATIONS[currentStation];

  return (
    <motion.div
      initial={{ x: 50, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      className="radiation-meter p-3 pointer-events-auto"
    >
      <div className="flex items-center gap-2 mb-3">
        <Train className="w-4 h-4 text-[#00d9ff]" />
        <span className="text-xs text-gray-400 tracking-wider">METRO NETWORK</span>
      </div>

      {/* Current station */}
      <div className="bg-slate-800/50 p-2 rounded border border-slate-700/50 mb-3">
        <div className="flex items-center gap-2">
          <MapPin className="w-3 h-3 text-[#00d9ff]" />
          <span className="text-xs text-[#00d9ff]">{station?.name}</span>
        </div>
        {station?.faction && (
          <div className="text-[10px] text-gray-500 mt-1 flex items-center gap-1">
            <span style={{ color: FACTIONS[station.faction].color }}>
              {FACTIONS[station.faction].icon}
            </span>
            {FACTIONS[station.faction].name}
          </div>
        )}
      </div>

      {/* Metro line visualization */}
      <div className="space-y-1">
        {['Rajiv Chowk', 'Kashmere Gate', 'Yamuna Bank', 'Lal Qila', 'Surface'].map((name, i) => {
          const isActive = name.toLowerCase().includes(currentStation.replace('_', ' '));
          const isPast = i < ['rajiv chowk', 'kashmere gate', 'yamuna bank', 'lal qila', 'surface'].indexOf(currentStation.replace('_', ' '));
          
          return (
            <div 
              key={name}
              className={`flex items-center gap-2 text-[10px] ${
                isActive ? 'text-[#00d9ff]' : isPast ? 'text-gray-500' : 'text-gray-600'
              }`}
            >
              <div 
                className={`w-2 h-2 rounded-full ${
                  isActive ? 'bg-[#00d9ff] animate-pulse' : isPast ? 'bg-gray-500' : 'bg-gray-700'
                }`}
              />
              <span>{name}</span>
              {name === 'Surface' && flags.hasReachedSurface && (
                <AlertCircle className="w-3 h-3 text-[#39ff14]" />
              )}
            </div>
          );
        })}
      </div>

      {/* Act indicator */}
      <div className="mt-3 pt-2 border-t border-slate-700/50 flex items-center justify-between">
        <span className="text-[10px] text-gray-500">ACT</span>
        <div className="flex gap-1">
          {[1, 2, 3].map(act => (
            <div 
              key={act}
              className={`w-4 h-4 rounded text-[10px] flex items-center justify-center ${
                act <= currentAct 
                  ? 'bg-[#00d9ff]/20 text-[#00d9ff] border border-[#00d9ff]/50' 
                  : 'bg-slate-800 text-gray-600'
              }`}
            >
              {act}
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
