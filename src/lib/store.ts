// DILLI 2047: The Last Metro - Game State Store
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { MoralityStats, FactionReputation, GameFlags, Decision, FactionId } from './story/types';

interface GameStore {
  // Game state
  playerName: string;
  currentAct: 1 | 2 | 3;
  currentScene: string;
  morality: MoralityStats;
  reputation: FactionReputation;
  flags: GameFlags;
  decisions: Decision[];

  // UI state
  dialogueIndex: number;
  isTyping: boolean;
  showChoices: boolean;
  gamePhase: 'title' | 'playing' | 'ending' | 'menu';

  // Settings
  textSpeed: number;
  musicVolume: number;
  sfxVolume: number;
  showGlitchEffects: boolean;
  voiceEnabled: boolean;
  musicEnabled: boolean;

  // Actions
  setPlayerName: (name: string) => void;
  setCurrentScene: (sceneId: string) => void;
  advanceDialogue: () => void;
  setDialogueIndex: (index: number) => void;
  setIsTyping: (typing: boolean) => void;
  setShowChoices: (show: boolean) => void;
  setGamePhase: (phase: 'title' | 'playing' | 'ending' | 'menu') => void;

  // Morality and reputation
  updateMorality: (changes: Partial<MoralityStats>) => void;
  updateReputation: (changes: Partial<FactionReputation>) => void;
  setFlag: (flag: keyof GameFlags, value: boolean | FactionId | null) => void;

  // Decisions
  addDecision: (decision: Decision) => void;

  // Game control
  startNewGame: (playerName?: string) => void;
  loadGame: (saveData: SaveData) => void;
  getSaveData: () => SaveData;
  resetGame: () => void;

  // Settings
  setTextSpeed: (speed: number) => void;
  setMusicVolume: (volume: number) => void;
  setSfxVolume: (volume: number) => void;
  setGlitchEffects: (show: boolean) => void;
  setVoiceEnabled: (enabled: boolean) => void;
  setMusicEnabled: (enabled: boolean) => void;
}

interface SaveData {
  playerName: string;
  currentAct: 1 | 2 | 3;
  currentScene: string;
  morality: MoralityStats;
  reputation: FactionReputation;
  flags: GameFlags;
  decisions: Decision[];
}

const initialState = {
  playerName: 'Veer',
  currentAct: 1 as const,
  currentScene: 'intro',
  morality: {
    humanity: 50,
    authority: 50,
    faith: 50,
    evolution: 50,
  },
  reputation: {
    rajivChowk: 50,
    yamunaPurist: 0,
    redLine: 0,
    surface: 0,
  },
  flags: {
    hasSeenTransmission: false,
    hasInvestigatedSignal: false,
    hasChosenPath: false,
    chosenFaction: null,
    hasReachedSurface: false,
    hasMadeContact: false,
  },
  decisions: [],
  dialogueIndex: 0,
  isTyping: false,
  showChoices: false,
  gamePhase: 'title' as const,
  textSpeed: 30,
  musicVolume: 0.7,
  sfxVolume: 0.8,
  showGlitchEffects: true,
  voiceEnabled: true,
  musicEnabled: true,
};

export const useGameStore = create<GameStore>()(
  persist(
    (set, get) => ({
      ...initialState,

      setPlayerName: (name) => set({ playerName: name }),

      setCurrentScene: (sceneId) => set({
        currentScene: sceneId,
        dialogueIndex: 0,
        showChoices: false
      }),

      advanceDialogue: () => {
        const state = get();
        set({ dialogueIndex: state.dialogueIndex + 1 });
      },

      setDialogueIndex: (index) => set({ dialogueIndex: index }),

      setIsTyping: (typing) => set({ isTyping: typing }),

      setShowChoices: (show) => set({ showChoices: show }),

      setGamePhase: (phase) => set({ gamePhase: phase }),

      updateMorality: (changes) => set((state) => ({
        morality: {
          humanity: Math.max(0, Math.min(100, (changes.humanity !== undefined ? state.morality.humanity + changes.humanity : state.morality.humanity))),
          authority: Math.max(0, Math.min(100, (changes.authority !== undefined ? state.morality.authority + changes.authority : state.morality.authority))),
          faith: Math.max(0, Math.min(100, (changes.faith !== undefined ? state.morality.faith + changes.faith : state.morality.faith))),
          evolution: Math.max(0, Math.min(100, (changes.evolution !== undefined ? state.morality.evolution + changes.evolution : state.morality.evolution))),
        },
      })),

      updateReputation: (changes) => set((state) => ({
        reputation: {
          rajivChowk: Math.max(0, Math.min(100, (changes.rajivChowk !== undefined ? state.reputation.rajivChowk + changes.rajivChowk : state.reputation.rajivChowk))),
          yamunaPurist: Math.max(0, Math.min(100, (changes.yamunaPurist !== undefined ? state.reputation.yamunaPurist + changes.yamunaPurist : state.reputation.yamunaPurist))),
          redLine: Math.max(0, Math.min(100, (changes.redLine !== undefined ? state.reputation.redLine + changes.redLine : state.reputation.redLine))),
          surface: Math.max(0, Math.min(100, (changes.surface !== undefined ? state.reputation.surface + changes.surface : state.reputation.surface))),
        },
      })),

      setFlag: (flag, value) => set((state) => ({
        flags: { ...state.flags, [flag]: value },
      })),

      addDecision: (decision) => set((state) => ({
        decisions: [...state.decisions, decision],
      })),

      startNewGame: (playerName) => set({
        ...initialState,
        playerName: playerName || 'Veer',
        gamePhase: 'playing',
      }),

      loadGame: (saveData) => set({
        ...saveData,
        gamePhase: 'playing',
        dialogueIndex: 0,
        showChoices: false,
      }),

      getSaveData: () => {
        const state = get();
        return {
          playerName: state.playerName,
          currentAct: state.currentAct,
          currentScene: state.currentScene,
          morality: state.morality,
          reputation: state.reputation,
          flags: state.flags,
          decisions: state.decisions,
        };
      },

      resetGame: () => set(initialState),

      setTextSpeed: (speed) => set({ textSpeed: speed }),
      setMusicVolume: (volume) => set({ musicVolume: volume }),
      setSfxVolume: (volume) => set({ sfxVolume: volume }),
      setGlitchEffects: (show) => set({ showGlitchEffects: show }),
      setVoiceEnabled: (enabled) => set({ voiceEnabled: enabled }),
      setMusicEnabled: (enabled) => set({ musicEnabled: enabled }),
    }),
    {
      name: 'dilli-2047-storage',
      partialize: (state) => ({
        playerName: state.playerName,
        currentAct: state.currentAct,
        currentScene: state.currentScene,
        morality: state.morality,
        reputation: state.reputation,
        flags: state.flags,
        decisions: state.decisions,
        textSpeed: state.textSpeed,
        musicVolume: state.musicVolume,
        sfxVolume: state.sfxVolume,
        showGlitchEffects: state.showGlitchEffects,
        voiceEnabled: state.voiceEnabled,
        musicEnabled: state.musicEnabled,
      }),
    }
  )
);
