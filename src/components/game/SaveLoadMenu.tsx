'use client';

import { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useGameStore } from '@/lib/store';
import { Trash2, X, Download, Upload } from 'lucide-react';

interface SaveSlot {
  id: string;
  playerName: string;
  currentAct: number;
  currentScene: string;
  savedAt: string;
}

const STORAGE_KEY = 'dilli-2047-saves';

function getInitialSlots(): SaveSlot[] {
  if (typeof window === 'undefined') return [];
  const saved = localStorage.getItem(STORAGE_KEY);
  if (saved) {
    try {
      return JSON.parse(saved);
    } catch {
      return [];
    }
  }
  return [];
}

export function SaveLoadMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const [mode, setMode] = useState<'save' | 'load'>('save');
  const [slots, setSlots] = useState<SaveSlot[]>([]);
  const { getSaveData, loadGame } = useGameStore();

  const refreshSlots = useCallback(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        setSlots(JSON.parse(saved));
      } catch {
        setSlots([]);
      }
    } else {
      setSlots([]);
    }
  }, []);

  const openModal = useCallback((newMode: 'save' | 'load') => {
    setMode(newMode);
    refreshSlots();
    setIsOpen(true);
  }, [refreshSlots]);

  const handleSave = useCallback((slotIndex: number) => {
    const data = getSaveData();
    const newSlot: SaveSlot = {
      id: `slot-${slotIndex}`,
      playerName: data.playerName,
      currentAct: data.currentAct,
      currentScene: data.currentScene,
      savedAt: new Date().toISOString(),
    };

    const newSlots = [...slots];
    newSlots[slotIndex] = newSlot;
    setSlots(newSlots);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(newSlots));
    
    // Save actual game data to a separate key
    localStorage.setItem(`dilli-2047-slot-slot-${slotIndex}`, JSON.stringify(data));
    
    setIsOpen(false);
  }, [getSaveData, slots]);

  const handleLoad = useCallback((slot: SaveSlot) => {
    const saved = localStorage.getItem(`dilli-2047-slot-${slot.id}`);
    if (saved) {
      try {
        const data = JSON.parse(saved);
        loadGame(data);
        setIsOpen(false);
      } catch (e) {
        console.error('Failed to load save:', e);
      }
    }
  }, [loadGame]);

  const handleDelete = useCallback((slotIndex: number) => {
    const slot = slots[slotIndex];
    if (slot) {
      localStorage.removeItem(`dilli-2047-slot-${slot.id}`);
    }
    const newSlots = slots.filter((_, i) => i !== slotIndex);
    setSlots(newSlots);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(newSlots));
  }, [slots]);

  return (
    <>
      {/* Save/Load buttons - shown during gameplay */}
      <div className="fixed bottom-4 left-4 z-50 flex gap-2">
        <button
          onClick={() => openModal('save')}
          className="p-2 bg-slate-800/80 border border-[#00d9ff]/30 rounded hover:bg-[#00d9ff]/10 transition-colors pointer-events-auto"
          title="Save Game"
        >
          <Download className="w-4 h-4 text-[#00d9ff]" />
        </button>
        <button
          onClick={() => openModal('load')}
          className="p-2 bg-slate-800/80 border border-[#00d9ff]/30 rounded hover:bg-[#00d9ff]/10 transition-colors pointer-events-auto"
          title="Load Game"
        >
          <Upload className="w-4 h-4 text-[#00d9ff]" />
        </button>
      </div>

      {/* Modal */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80"
            onClick={() => setIsOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="dialogue-box max-w-lg w-full mx-4 p-6 relative"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-[#00d9ff] tracking-wider">
                  {mode === 'save' ? 'SAVE GAME' : 'LOAD GAME'}
                </h2>
                <button
                  onClick={() => setIsOpen(false)}
                  className="text-gray-500 hover:text-[#00d9ff] transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Slots */}
              <div className="space-y-3">
                {[0, 1, 2].map((index) => {
                  const slot = slots[index];
                  
                  return (
                    <div
                      key={index}
                      className="save-slot p-4 relative group"
                    >
                      {slot ? (
                        <>
                          <div className="flex items-start justify-between">
                            <div>
                              <div className="text-sm font-bold text-gray-200">
                                {slot.playerName}
                              </div>
                              <div className="text-xs text-gray-500 mt-1">
                                Act {slot.currentAct} • {slot.currentScene.replace(/_/g, ' ')}
                              </div>
                              <div className="text-xs text-gray-600 mt-2">
                                {new Date(slot.savedAt).toLocaleString()}
                              </div>
                            </div>
                            <div className="flex gap-2">
                              {mode === 'load' && (
                                <button
                                  onClick={() => handleLoad(slot)}
                                  className="px-3 py-1 bg-[#00d9ff]/20 text-[#00d9ff] text-xs rounded hover:bg-[#00d9ff]/30 transition-colors"
                                >
                                  LOAD
                                </button>
                              )}
                              {mode === 'save' && (
                                <button
                                  onClick={() => handleSave(index)}
                                  className="px-3 py-1 bg-[#00d9ff]/20 text-[#00d9ff] text-xs rounded hover:bg-[#00d9ff]/30 transition-colors"
                                >
                                  OVERWRITE
                                </button>
                              )}
                              <button
                                onClick={() => handleDelete(index)}
                                className="p-1 text-gray-500 hover:text-[#ff3333] transition-colors"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          </div>
                        </>
                      ) : (
                        <div className="flex items-center justify-between">
                          <div className="text-gray-500 text-sm">Empty Slot {index + 1}</div>
                          {mode === 'save' && (
                            <button
                              onClick={() => handleSave(index)}
                              className="px-3 py-1 bg-[#00d9ff]/20 text-[#00d9ff] text-xs rounded hover:bg-[#00d9ff]/30 transition-colors"
                            >
                              SAVE
                            </button>
                          )}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
