// DILLI 2047: The Last Metro - Story Types

export type FactionId = 'rajiv_chowk' | 'yamuna' | 'red_line' | 'alone' | 'surface';

export interface MoralityStats {
  humanity: number;    // 0-100
  authority: number;   // 0-100
  faith: number;       // 0-100
  evolution: number;   // 0-100
}

export interface FactionReputation {
  rajivChowk: number;
  yamunaPurist: number;
  redLine: number;
  surface: number;
}

export interface GameState {
  playerName: string;
  currentAct: 1 | 2 | 3;
  currentScene: string;
  morality: MoralityStats;
  reputation: FactionReputation;
  flags: GameFlags;
  decisions: Decision[];
}

export interface GameFlags {
  hasSeenTransmission: boolean;
  hasInvestigatedSignal: boolean;
  hasChosenPath: boolean;
  chosenFaction: FactionId | null;
  hasReachedSurface: boolean;
  hasMadeContact: boolean;
}

export interface Decision {
  sceneId: string;
  choiceId: string;
  choiceText: string;
  actNumber: 1 | 2 | 3;
  moralityChanges: Partial<MoralityStats>;
}

export interface StoryScene {
  id: string;
  act: 1 | 2 | 3;
  location: string;
  background: string;
  characters: Character[];
  dialogue: DialogueLine[];
  choices?: Choice[];
  nextScene?: string;
  effects?: SceneEffect[];
}

export interface Character {
  id: string;
  name: string;
  faction?: FactionId;
  portrait: CharacterPortrait;
  mood: 'neutral' | 'concerned' | 'angry' | 'hopeful' | 'fearful' | 'determined';
}

export interface CharacterPortrait {
  // Placeholder for portrait generation
  description: string;
  style: 'survivor' | 'purist' | 'soldier' | 'mutant' | 'council';
}

export interface DialogueLine {
  speaker: string;
  speakerId?: string;
  text: string;
  mood?: Character['mood'];
  effect?: 'glitch' | 'static' | 'whisper' | 'shout';
  delay?: number;
}

export interface Choice {
  id: string;
  text: string;
  requirements?: ChoiceRequirement[];
  effects: ChoiceEffect[];
  nextScene: string;
}

export interface ChoiceRequirement {
  stat: keyof MoralityStats;
  min?: number;
  max?: number;
  flag?: keyof GameFlags;
  flagValue?: boolean;
}

export interface ChoiceEffect {
  type: 'morality' | 'reputation' | 'flag';
  stat?: keyof MoralityStats;
  faction?: keyof FactionReputation;
  flag?: keyof GameFlags;
  value: number | boolean | string | null;
}

export interface SceneEffect {
  type: 'sound' | 'visual' | 'transition';
  name: string;
  duration?: number;
}

export interface Ending {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  requirements: EndingRequirement;
  epilogue: string[];
  theme: 'hope' | 'dark' | 'transcendence';
}

export interface EndingRequirement {
  primaryStat: keyof MoralityStats;
  minValue: number;
  faction?: FactionId;
  flags?: Partial<GameFlags>;
}

// Metro station locations
export interface MetroStation {
  id: string;
  name: string;
  description: string;
  faction?: FactionId;
  status: 'safe' | 'dangerous' | 'abandoned' | 'contested';
  connections: string[];
}

// Audio cues
export interface AudioCue {
  id: string;
  type: 'ambient' | 'music' | 'sfx' | 'voice';
  source: string;
  loop?: boolean;
  volume?: number;
}
