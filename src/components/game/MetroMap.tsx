'use client';

import { motion } from 'framer-motion';
import { useGameStore } from '@/lib/store';
import { MapPin, Train, AlertCircle } from 'lucide-react';
import { FACTIONS, METRO_STATIONS } from '@/lib/story/scenes';

export function MetroMap() {
  const { currentScene, currentAct, flags } = useGameStore();

  // Determine current station based on scene
  // Robust station detection based on scene hierarchy
  const getCurrentStation = () => {
    // Exact scene ID matches first
    if (currentScene === 'intro' || currentScene === 'transmission' || currentScene === 'council_chamber' || currentScene === 'preparation') return 'rajiv_chowk';
    if (currentScene === 'tunnels_entrance') return 'kashmere_gate';
    if (currentScene === 'act2_transition') return 'kashmere_gate';

    // Pattern matches
    const sceneLower = currentScene.toLowerCase();

    // Act 3 (The End)
    if (sceneLower.includes('surface') || sceneLower.includes('ending') || sceneLower.includes('final') || sceneLower.includes('act3') || sceneLower.includes('ascension') || sceneLower.includes('rebirth') || sceneLower.includes('iron')) {
      return 'india_gate';
    }

    // Act 2 (The Branching)
    if (sceneLower.includes('yamuna') || sceneLower.includes('purist')) return 'yamuna_bank';
    if (sceneLower.includes('red_line') || sceneLower.includes('syndicate') || sceneLower.includes('khan')) return 'red_fort';
    if (sceneLower.includes('abandoned') || sceneLower.includes('junction') || sceneLower.includes('transition')) return 'kashmere_gate';

    // Act 1 (The Beginning)
    if (sceneLower.includes('rajiv') || sceneLower.includes('hub') || sceneLower.includes('home') || sceneLower.includes('initial')) return 'rajiv_chowk';
    if (sceneLower.includes('kashmere') || sceneLower.includes('gate') || sceneLower.includes('tunnel') || sceneLower.includes('first_contact')) return 'kashmere_gate';

    // Act-based fallbacks to prevent jumping back
    if (currentAct === 3) return 'india_gate';
    if (currentAct === 2) return 'yamuna_bank'; // Default for mid-game if unknown

    return 'rajiv_chowk';
  };

  const currentStation = getCurrentStation();
  const station = METRO_STATIONS[currentStation];

  // High-precision completion logic
  const stationsOrder = ['rajiv_chowk', 'kashmere_gate', 'yamuna_bank', 'red_fort', 'india_gate'];
  const stationIndex = stationsOrder.indexOf(currentStation);

  // Progress components: 
  // 1. Act Progress (30% per act)
  // 2. Station Progress within the story sequence
  // 3. Dialogue Progress within the current scene (subtle addition)

  const actProgress = (currentAct - 1) * 33;
  const stationProgress = (stationIndex / (stationsOrder.length - 1)) * 33;

  // Total calculated percentage
  let rawPercentage = actProgress + stationProgress;

  // Ensure the progress is at least consistent with the act
  if (currentAct === 1) rawPercentage = Math.max(5, Math.min(30, rawPercentage));
  if (currentAct === 2) rawPercentage = Math.max(35, Math.min(65, rawPercentage));
  if (currentAct === 3) rawPercentage = Math.max(70, Math.min(98, rawPercentage));

  let completionPercentage = Math.round(rawPercentage);

  // Final ending state
  const isEnding = currentScene.includes('ending') || currentScene === 'credits';
  if (isEnding) completionPercentage = 100;

  return (
    <motion.div
      initial={{ x: 50, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      className="radiation-meter p-3 pointer-events-auto min-w-[140px]"
    >
      <div className="flex items-center justify-between gap-2 mb-3">
        <div className="flex items-center gap-2">
          <Train className="w-4 h-4 text-[#00d9ff]" />
          <span className="text-xs text-gray-400 tracking-wider">METRO NETWORK</span>
        </div>
        <span className="text-[10px] font-mono text-[#00ff88]">
          {completionPercentage}%
        </span>
      </div>

      {/* Completion bar */}
      <div className="w-full h-1 bg-slate-800 rounded-full overflow-hidden mb-4">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${completionPercentage}%` }}
          className="h-full bg-[#00ff88] transition-all duration-1000"
        />
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
        {stationsOrder.map((id, i) => {
          const stationData = METRO_STATIONS[id as keyof typeof METRO_STATIONS];
          const isActive = currentStation === id;
          const isPast = i < stationIndex;

          return (
            <div
              key={id}
              className={`flex items-center gap-2 text-[10px] ${isActive ? 'text-[#00d9ff]' : isPast ? 'text-gray-500' : 'text-gray-600'
                }`}
            >
              <div
                className={`w-1.5 h-1.5 rounded-full ${isActive ? 'bg-[#00d9ff] animate-pulse' : isPast ? 'bg-gray-500' : 'bg-gray-700'
                  }`}
              />
              <span className={i > 0 && i < 4 ? 'hidden sm:inline' : 'inline'}>
                {stationData?.name}
              </span>
              {id === 'india_gate' && flags.hasReachedSurface && (
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
              className={`w-4 h-4 rounded text-[10px] flex items-center justify-center ${act <= currentAct
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
