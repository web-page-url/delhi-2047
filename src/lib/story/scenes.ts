// DILLI 2047: The Last Metro - Complete Story Data
import { StoryScene, Ending } from './types';

export const FACTIONS = {
  rajiv_chowk: {
    name: 'Rajiv Chowk Collective',
    description: 'Democratic survivor hub. Engineers, traders, teachers. They believe civilization can be rebuilt.',
    color: '#00d9ff',
    icon: '👥',
  },
  yamuna: {
    name: 'The Yamuna Purists',
    description: 'Believe radiation is divine purification. Worship "The Radiant Light". See mutation as evolution.',
    color: '#ffb800',
    icon: '☀️',
  },
  red_line: {
    name: 'The Red Line Syndicate',
    description: 'Militarized faction controlling key tunnels. Order through strength. Freedom is weakness.',
    color: '#ff3333',
    icon: '⚔️',
  },
  surface: {
    name: 'The Surface Whisperers',
    description: 'Mutated beings evolving above ground. Not mindless. Learning. Attempting first contact.',
    color: '#39ff14',
    icon: '🌱',
  },
};

export const METRO_STATIONS = {
  rajiv_chowk: {
    name: 'Rajiv Chowk Station',
    description: 'Once the busiest metro station in Delhi. Now the heart of humanity\'s last hope.',
    faction: 'rajiv_chowk' as const,
    status: 'safe' as const,
  },
  kashmere_gate: {
    name: 'Kashmere Gate',
    description: 'Abandoned sector. Something is moving in the tunnels here.',
    faction: undefined,
    status: 'dangerous' as const,
  },
  yamuna_bank: {
    name: 'Yamuna Bank Station',
    description: 'Holy ground for the Purists. Glowing with strange bioluminescence.',
    faction: 'yamuna' as const,
    status: 'contested' as const,
  },
  red_fort: {
    name: 'Lal Qila Station',
    description: 'Fortress of the Red Line Syndicate. Armed trains patrol the tunnels.',
    faction: 'red_line' as const,
    status: 'dangerous' as const,
  },
  india_gate: {
    name: 'India Gate Surface',
    description: 'Ruins of the old monument. The surface. Where the truth awaits.',
    faction: 'surface' as const,
    status: 'dangerous' as const,
  },
};

export const STORY_SCENES: Record<string, StoryScene> = {
  // ===== ACT I - THE SIGNAL =====
  intro: {
    id: 'intro',
    act: 1,
    location: 'Rajiv Chowk Station - Central Hub',
    background: 'station_hub',
    characters: [],
    dialogue: [
      {
        speaker: 'Narrator',
        text: 'The year is 2047. One hundred years since independence.',
        effect: 'static',
      },
      {
        speaker: 'Narrator',
        text: 'Fifteen years since the sky turned grey.',
      },
      {
        speaker: 'Narrator',
        text: 'You are Veer. Born before the war. Raised in Rajiv Chowk Station.',
      },
      {
        speaker: 'Narrator',
        text: 'You barely remember sunlight.',
        effect: 'whisper',
      },
      {
        speaker: 'Narrator',
        text: 'Your world is flickering emergency lights... recycled air... rusted tracks...',
      },
      {
        speaker: 'Narrator',
        text: 'And stories of a sky no one believes in anymore.',
        effect: 'glitch',
      },
    ],
    nextScene: 'transmission',
  },

  transmission: {
    id: 'transmission',
    act: 1,
    location: 'Rajiv Chowk Station - Communication Room',
    background: 'comm_room',
    characters: [
      {
        id: 'priya',
        name: 'Priya',
        faction: 'rajiv_chowk',
        portrait: { description: 'Young technician with cybernetic eye implant', style: 'survivor' },
        mood: 'concerned',
      },
    ],
    dialogue: [
      {
        speaker: 'Priya',
        speakerId: 'priya',
        text: 'Veer! You need to hear this. We picked something up on the old frequencies.',
        mood: 'concerned',
      },
      {
        speaker: 'Narrator',
        text: 'Static fills the room. Then, fragments of a voice break through...',
        effect: 'static',
      },
      {
        speaker: '???',
        text: '[STATIC] ...gate sector... they are not animals... [STATIC] ...learning... [STATIC]',
        effect: 'glitch',
      },
      {
        speaker: '???',
        text: '[STATIC] ...first contact... [STATIC] ...they want to... [STATIC]',
        effect: 'glitch',
      },
      {
        speaker: 'Priya',
        speakerId: 'priya',
        text: 'It\'s coming from near Kashmere Gate. That sector\'s been abandoned for years.',
        mood: 'fearful',
      },
      {
        speaker: 'Priya',
        speakerId: 'priya',
        text: 'The council is panicking. They want someone to investigate.',
        mood: 'concerned',
      },
      {
        speaker: 'Priya',
        speakerId: 'priya',
        text: 'They\'re... they\'re asking for you, Veer.',
        mood: 'neutral',
      },
    ],
    effects: [{ type: 'sound', name: 'radio_static', duration: 3000 }],
    nextScene: 'council_chamber',
  },

  council_chamber: {
    id: 'council_chamber',
    act: 1,
    location: 'Rajiv Chowk Station - Council Chamber',
    background: 'council_room',
    characters: [
      {
        id: 'chairman_mehra',
        name: 'Chairman Mehra',
        faction: 'rajiv_chowk',
        portrait: { description: 'Elderly man with grey beard and tired eyes', style: 'council' },
        mood: 'concerned',
      },
      {
        id: 'commander_singh',
        name: 'Commander Singh',
        faction: 'rajiv_chowk',
        portrait: { description: 'Military woman with scarred face', style: 'soldier' },
        mood: 'angry',
      },
    ],
    dialogue: [
      {
        speaker: 'Chairman Mehra',
        speakerId: 'chairman_mehra',
        text: 'Veer. Thank you for coming. We have a... situation.',
        mood: 'concerned',
      },
      {
        speaker: 'Commander Singh',
        speakerId: 'commander_singh',
        text: 'Situation? It\'s a threat! Those surface mutants are organizing!',
        mood: 'angry',
      },
      {
        speaker: 'Chairman Mehra',
        speakerId: 'chairman_mehra',
        text: 'We don\'t know that. The transmission was... unclear.',
        mood: 'concerned',
      },
      {
        speaker: 'Commander Singh',
        speakerId: 'commander_singh',
        text: '"They are learning." What else could it mean?',
        mood: 'angry',
      },
      {
        speaker: 'Chairman Mehra',
        speakerId: 'chairman_mehra',
        text: 'Veer, we need someone to travel to Kashmere Gate. Investigate. Report back.',
        mood: 'hopeful',
      },
      {
        speaker: 'Chairman Mehra',
        speakerId: 'chairman_mehra',
        text: 'The journey will be dangerous. The tunnels between here and there... not all are safe.',
        mood: 'concerned',
      },
      {
        speaker: 'Commander Singh',
        speakerId: 'commander_singh',
        text: 'Take a weapon. And don\'t trust anything you see out there.',
        mood: 'neutral',
      },
    ],
    choices: [
      {
        id: 'obey_council',
        text: '"I\'ll do as the council asks. I\'ll investigate and report back."',
        effects: [
          { type: 'morality', stat: 'authority', value: 5 },
          { type: 'flag', flag: 'hasSeenTransmission', value: true },
        ],
        nextScene: 'preparation',
      },
      {
        id: 'investigate_signal',
        text: '"Before I go, I want to examine the transmission myself. There might be more to it."',
        effects: [
          { type: 'morality', stat: 'humanity', value: 5 },
          { type: 'flag', flag: 'hasInvestigatedSignal', value: true },
          { type: 'flag', flag: 'hasSeenTransmission', value: true },
        ],
        nextScene: 'signal_investigation',
      },
      {
        id: 'question_motives',
        text: '"Why me? Surely you have scouts more experienced with the tunnels."',
        effects: [
          { type: 'morality', stat: 'authority', value: -5 },
          { type: 'morality', stat: 'humanity', value: 5 },
        ],
        nextScene: 'council_explanation',
      },
    ],
  },

  signal_investigation: {
    id: 'signal_investigation',
    act: 1,
    location: 'Rajiv Chowk Station - Communication Room',
    background: 'comm_room',
    characters: [
      {
        id: 'priya',
        name: 'Priya',
        faction: 'rajiv_chowk',
        portrait: { description: 'Young technician with cybernetic eye implant', style: 'survivor' },
        mood: 'neutral',
      },
    ],
    dialogue: [
      {
        speaker: 'Priya',
        speakerId: 'priya',
        text: 'You want to examine the raw signal? I... okay. Let me play the full recording.',
        mood: 'neutral',
      },
      {
        speaker: 'Narrator',
        text: 'The static plays again, but this time you hear something more...',
        effect: 'static',
      },
      {
        speaker: '???',
        text: '[STATIC] ...Kashmere Gate... we mean no harm... [STATIC] ...Surface Whisperers...',
        effect: 'glitch',
      },
      {
        speaker: '???',
        text: '[STATIC] ...first contact protocol... [STATIC] ...we remember humanity...',
        effect: 'glitch',
      },
      {
        speaker: 'Priya',
        speakerId: 'priya',
        text: 'Did you hear that? "We mean no harm." "We remember humanity."',
        mood: 'fearful',
      },
      {
        speaker: 'Priya',
        speakerId: 'priya',
        text: 'Veer... that wasn\'t just a warning. That was... an invitation?',
        mood: 'concerned',
      },
      {
        speaker: 'Narrator',
        text: 'The implications settle heavily in the recycled air.',
      },
    ],
    nextScene: 'preparation',
  },

  council_explanation: {
    id: 'council_explanation',
    act: 1,
    location: 'Rajiv Chowk Station - Council Chamber',
    background: 'council_room',
    characters: [
      {
        id: 'chairman_mehra',
        name: 'Chairman Mehra',
        faction: 'rajiv_chowk',
        portrait: { description: 'Elderly man with grey beard and tired eyes', style: 'council' },
        mood: 'neutral',
      },
    ],
    dialogue: [
      {
        speaker: 'Chairman Mehra',
        speakerId: 'chairman_mehra',
        text: 'A fair question. The truth is... you\'re one of the few who remembers the Before.',
        mood: 'neutral',
      },
      {
        speaker: 'Chairman Mehra',
        speakerId: 'chairman_mehra',
        text: 'You know what humanity was. What it can be.',
        mood: 'hopeful',
      },
      {
        speaker: 'Chairman Mehra',
        speakerId: 'chairman_mehra',
        text: 'The others... they\'ve only known the tunnels. Only known survival.',
        mood: 'concerned',
      },
      {
        speaker: 'Chairman Mehra',
        speakerId: 'chairman_mehra',
        text: 'We need someone who can make the hard choices. Someone who remembers the sky.',
        mood: 'determined',
      },
    ],
    nextScene: 'preparation',
  },

  preparation: {
    id: 'preparation',
    act: 1,
    location: 'Rajiv Chowk Station - Supply Depot',
    background: 'supply_depot',
    characters: [
      {
        id: 'old_vikram',
        name: 'Old Vikram',
        faction: 'rajiv_chowk',
        portrait: { description: 'Grizzled old man with mechanical arm', style: 'survivor' },
        mood: 'neutral',
      },
    ],
    dialogue: [
      {
        speaker: 'Old Vikram',
        speakerId: 'old_vikram',
        text: 'So. They\'re sending you into the dark, eh?',
        mood: 'neutral',
      },
      {
        speaker: 'Old Vikram',
        speakerId: 'old_vikram',
        text: 'The tunnels ain\'t what they used to be. Flooded sections. Collapsed platforms.',
        mood: 'concerned',
      },
      {
        speaker: 'Old Vikram',
        speakerId: 'old_vikram',
        text: 'And the factions... they don\'t take kindly to travelers.',
        mood: 'neutral',
      },
      {
        speaker: 'Old Vikram',
        speakerId: 'old_vikram',
        text: 'Here. Take this map. Shows the old routes. Some might still be passable.',
        mood: 'hopeful',
      },
      {
        speaker: 'Old Vikram',
        speakerId: 'old_vikram',
        text: 'Watch yourself out there, Veer. Remember who you are.',
        mood: 'concerned',
      },
    ],
    nextScene: 'tunnels_entrance',
  },

  tunnels_entrance: {
    id: 'tunnels_entrance',
    act: 1,
    location: 'Delhi Metro - Main Tunnel Network',
    background: 'tunnel',
    characters: [],
    dialogue: [
      {
        speaker: 'Narrator',
        text: 'The heavy blast door groans open. The tunnel stretches before you into darkness.',
      },
      {
        speaker: 'Narrator',
        text: 'Emergency lights flicker at irregular intervals, casting long shadows.',
        effect: 'glitch',
      },
      {
        speaker: 'Narrator',
        text: 'Somewhere in the distance, you hear the low hum of... something.',
      },
      {
        speaker: 'Narrator',
        text: 'The journey to Kashmere Gate begins.',
      },
    ],
    nextScene: 'act2_transition',
  },

  act2_transition: {
    id: 'act2_transition',
    act: 2,
    location: 'Delhi Metro - Junction Point',
    background: 'junction',
    characters: [],
    dialogue: [
      {
        speaker: 'Narrator',
        text: 'ACT II - THE BROKEN LINES',
        effect: 'glitch',
      },
      {
        speaker: 'Narrator',
        text: 'You\'ve traveled through flooded tunnels and collapsed platforms.',
      },
      {
        speaker: 'Narrator',
        text: 'Abandoned train cars line the tracks like forgotten coffins.',
      },
      {
        speaker: 'Narrator',
        text: 'Now, you stand at a junction. Three paths diverge.',
      },
    ],
    choices: [
      {
        id: 'path_yamuna',
        text: 'Take the Yellow Line toward Yamuna Bank (Purist Territory)',
        effects: [
          { type: 'morality', stat: 'faith', value: 10 },
          { type: 'reputation', faction: 'yamunaPurist', value: 10 },
        ],
        nextScene: 'yamuna_station',
      },
      {
        id: 'path_red_line',
        text: 'Take the Red Line toward Lal Qila (Syndicate Territory)',
        effects: [
          { type: 'morality', stat: 'authority', value: 10 },
          { type: 'reputation', faction: 'redLine', value: 10 },
        ],
        nextScene: 'red_line_station',
      },
      {
        id: 'path_alone',
        text: 'Navigate the abandoned tunnels alone, avoiding all factions',
        effects: [
          { type: 'morality', stat: 'humanity', value: 5 },
          { type: 'morality', stat: 'evolution', value: 5 },
        ],
        nextScene: 'abandoned_tunnels',
      },
    ],
  },

  yamuna_station: {
    id: 'yamuna_station',
    act: 2,
    location: 'Yamuna Bank Station - Purist Sanctuary',
    background: 'purist_temple',
    characters: [
      {
        id: 'guru_nirvan',
        name: 'Guru Nirvan',
        faction: 'yamuna',
        portrait: { description: 'Bald man with glowing veins and peaceful expression', style: 'purist' },
        mood: 'neutral',
      },
    ],
    dialogue: [
      {
        speaker: 'Narrator',
        text: 'The station glows with strange bioluminescence. The air tastes different here.',
        effect: 'glitch',
      },
      {
        speaker: 'Guru Nirvan',
        speakerId: 'guru_nirvan',
        text: 'Welcome, traveler. The Radiant Light has guided you to us.',
        mood: 'neutral',
      },
      {
        speaker: 'Guru Nirvan',
        speakerId: 'guru_nirvan',
        text: 'I see the question in your eyes. You wonder about our... transformation.',
        mood: 'hopeful',
      },
      {
        speaker: 'Guru Nirvan',
        speakerId: 'guru_nirvan',
        text: 'Radiation is not poison, child. It is purification. Evolution.',
        mood: 'determined',
      },
      {
        speaker: 'Guru Nirvan',
        speakerId: 'guru_nirvan',
        text: 'The Surface Whisperers... they understand. They have transcended.',
        mood: 'hopeful',
      },
      {
        speaker: 'Guru Nirvan',
        speakerId: 'guru_nirvan',
        text: 'We can help you reach Kashmere Gate. But first... will you embrace the Light?',
        mood: 'neutral',
      },
    ],
    choices: [
      {
        id: 'embrace_purists',
        text: '"I wish to understand. Show me the way of the Light."',
        effects: [
          { type: 'morality', stat: 'faith', value: 15 },
          { type: 'morality', stat: 'evolution', value: 10 },
          { type: 'flag', flag: 'chosenFaction', value: 'yamuna' },
          { type: 'flag', flag: 'hasChosenPath', value: true },
        ],
        nextScene: 'purist_initiation',
      },
      {
        id: 'respect_decline',
        text: '"I respect your beliefs, but I must complete my mission. Can you still help me?"',
        effects: [
          { type: 'morality', stat: 'humanity', value: 5 },
          { type: 'reputation', faction: 'yamunaPurist', value: 5 },
        ],
        nextScene: 'purist_assistance',
      },
      {
        id: 'reject_purists',
        text: '"This is madness. I\'ll find my own way."',
        effects: [
          { type: 'morality', stat: 'authority', value: 5 },
          { type: 'morality', stat: 'faith', value: -10 },
          { type: 'reputation', faction: 'yamunaPurist', value: -20 },
        ],
        nextScene: 'forced_departure',
      },
    ],
  },

  red_line_station: {
    id: 'red_line_station',
    act: 2,
    location: 'Lal Qila Station - Syndicate Fortress',
    background: 'military_base',
    characters: [
      {
        id: 'general_khan',
        name: 'General Khan',
        faction: 'red_line',
        portrait: { description: 'Imposing figure in tactical armor with cybernetic jaw', style: 'soldier' },
        mood: 'neutral',
      },
    ],
    dialogue: [
      {
        speaker: 'Narrator',
        text: 'Armed guards patrol the platforms. Armored trains rest on the tracks like sleeping beasts.',
      },
      {
        speaker: 'General Khan',
        speakerId: 'general_khan',
        text: 'So. The Collective sends a messenger.',
        mood: 'neutral',
      },
      {
        speaker: 'General Khan',
        speakerId: 'general_khan',
        text: 'We intercepted the same transmission. "They are learning."',
        mood: 'concerned',
      },
      {
        speaker: 'General Khan',
        speakerId: 'general_khan',
        text: 'The mutants are organizing. This is a threat we must eliminate.',
        mood: 'angry',
      },
      {
        speaker: 'General Khan',
        speakerId: 'general_khan',
        text: 'Join us, and we will help you reach Kashmere Gate. Together, we can protect humanity.',
        mood: 'determined',
      },
      {
        speaker: 'General Khan',
        speakerId: 'general_khan',
        text: 'But know this: we do not negotiate with abominations.',
        mood: 'angry',
      },
    ],
    choices: [
      {
        id: 'join_syndicate',
        text: '"You\'re right. We need strength to survive. I\'m with you."',
        effects: [
          { type: 'morality', stat: 'authority', value: 15 },
          { type: 'morality', stat: 'humanity', value: -10 },
          { type: 'flag', flag: 'chosenFaction', value: 'red_line' },
          { type: 'flag', flag: 'hasChosenPath', value: true },
        ],
        nextScene: 'syndicate_mission',
      },
      {
        id: 'pragmatic_alliance',
        text: '"I\'ll work with you, but I won\'t commit to war without understanding the situation."',
        effects: [
          { type: 'morality', stat: 'authority', value: 5 },
          { type: 'morality', stat: 'humanity', value: 5 },
          { type: 'reputation', faction: 'redLine', value: 10 },
        ],
        nextScene: 'syndicate_pragmatic',
      },
      {
        id: 'reject_syndicate',
        text: '"I won\'t be part of a military agenda. I\'ll find my own way."',
        effects: [
          { type: 'morality', stat: 'humanity', value: 10 },
          { type: 'morality', stat: 'authority', value: -10 },
          { type: 'reputation', faction: 'redLine', value: -20 },
        ],
        nextScene: 'forced_departure',
      },
    ],
  },

  abandoned_tunnels: {
    id: 'abandoned_tunnels',
    act: 2,
    location: 'Delhi Metro - Abandoned Sector',
    background: 'dark_tunnel',
    characters: [],
    dialogue: [
      {
        speaker: 'Narrator',
        text: 'You navigate through collapsed tunnels, avoiding faction territory.',
        effect: 'static',
      },
      {
        speaker: 'Narrator',
        text: 'The darkness here is absolute. Only your emergency light cuts through.',
      },
      {
        speaker: 'Narrator',
        text: 'Then you hear it. Low, rhythmic pulses. Like... breathing.',
        effect: 'whisper',
      },
      {
        speaker: '???',
        text: '...human...',
        effect: 'whisper',
      },
      {
        speaker: 'Narrator',
        text: 'A figure emerges from the shadows. Luminescent skin. Eyes that hold... intelligence.',
        effect: 'glitch',
      },
    ],
    choices: [
      {
        id: 'approach_mutant',
        text: 'Lower your weapon. "You\'re a Surface Whisperer. You can speak?"',
        effects: [
          { type: 'morality', stat: 'evolution', value: 15 },
          { type: 'morality', stat: 'humanity', value: 10 },
          { type: 'flag', flag: 'chosenFaction', value: 'alone' },
          { type: 'flag', flag: 'hasChosenPath', value: true },
        ],
        nextScene: 'first_contact',
      },
      {
        id: 'retreat_carefully',
        text: 'Back away slowly, keeping your weapon ready.',
        effects: [
          { type: 'morality', stat: 'authority', value: 5 },
          { type: 'morality', stat: 'humanity', value: -5 },
        ],
        nextScene: 'mutant_departure',
      },
      {
        id: 'attack_mutant',
        text: 'Fire your weapon. This is what the council warned about.',
        effects: [
          { type: 'morality', stat: 'authority', value: 10 },
          { type: 'morality', stat: 'humanity', value: -20 },
          { type: 'morality', stat: 'evolution', value: -15 },
        ],
        nextScene: 'combat_result',
      },
    ],
  },

  first_contact: {
    id: 'first_contact',
    act: 2,
    location: 'Delhi Metro - Abandoned Sector',
    background: 'dark_tunnel',
    characters: [
      {
        id: 'whisperer',
        name: 'Surface Whisperer',
        faction: 'surface',
        portrait: { description: 'Luminescent being with gentle eyes and shifted features', style: 'mutant' },
        mood: 'neutral',
      },
    ],
    dialogue: [
      {
        speaker: 'Surface Whisperer',
        speakerId: 'whisperer',
        text: 'We... remember. The Before. We were... human once.',
        mood: 'neutral',
        effect: 'whisper',
      },
      {
        speaker: 'Surface Whisperer',
        speakerId: 'whisperer',
        text: 'The radiation changed us. But it did not destroy us.',
        mood: 'hopeful',
      },
      {
        speaker: 'Surface Whisperer',
        speakerId: 'whisperer',
        text: 'We have evolved. Grown. We think together now.',
        mood: 'neutral',
      },
      {
        speaker: 'Surface Whisperer',
        speakerId: 'whisperer',
        text: 'The transmission... it was us. We want to meet. To talk.',
        mood: 'hopeful',
      },
      {
        speaker: 'Surface Whisperer',
        speakerId: 'whisperer',
        text: 'Come to the surface. India Gate. See the truth for yourself.',
        mood: 'determined',
      },
      {
        speaker: 'Surface Whisperer',
        speakerId: 'whisperer',
        text: 'Then decide. War... or peace.',
        mood: 'neutral',
      },
    ],
    nextScene: 'act3_transition',
  },

  purist_initiation: {
    id: 'purist_initiation',
    act: 2,
    location: 'Yamuna Bank Station - Inner Sanctum',
    background: 'purist_temple',
    characters: [
      {
        id: 'guru_nirvan',
        name: 'Guru Nirvan',
        faction: 'yamuna',
        portrait: { description: 'Bald man with glowing veins and peaceful expression', style: 'purist' },
        mood: 'hopeful',
      },
    ],
    dialogue: [
      {
        speaker: 'Guru Nirvan',
        speakerId: 'guru_nirvan',
        text: 'You have chosen wisely, child.',
        mood: 'hopeful',
      },
      {
        speaker: 'Guru Nirvan',
        speakerId: 'guru_nirvan',
        text: 'The Surface Whisperers are not monsters. They are what we will become.',
        mood: 'determined',
      },
      {
        speaker: 'Guru Nirvan',
        speakerId: 'guru_nirvan',
        text: 'Go to India Gate. Meet them. Embrace the future.',
        mood: 'hopeful',
      },
      {
        speaker: 'Narrator',
        text: 'You feel a strange warmth spreading through you. A vision of light.',
        effect: 'glitch',
      },
    ],
    nextScene: 'act3_transition',
  },

  syndicate_mission: {
    id: 'syndicate_mission',
    act: 2,
    location: 'Lal Qila Station - Command Center',
    background: 'military_base',
    characters: [
      {
        id: 'general_khan',
        name: 'General Khan',
        faction: 'red_line',
        portrait: { description: 'Imposing figure in tactical armor with cybernetic jaw', style: 'soldier' },
        mood: 'determined',
      },
    ],
    dialogue: [
      {
        speaker: 'General Khan',
        speakerId: 'general_khan',
        text: 'Good. You understand what\'s at stake.',
        mood: 'determined',
      },
      {
        speaker: 'General Khan',
        speakerId: 'general_khan',
        text: 'Take this weapon. When you find the mutant nest, eliminate the threat.',
        mood: 'neutral',
      },
      {
        speaker: 'General Khan',
        speakerId: 'general_khan',
        text: 'Go to India Gate. That\'s where they gather. End this before it begins.',
        mood: 'angry',
      },
      {
        speaker: 'Narrator',
        text: 'The weight of the weapon feels heavy. But so does responsibility.',
      },
    ],
    nextScene: 'act3_transition',
  },

  purist_assistance: {
    id: 'purist_assistance',
    act: 2,
    location: 'Yamuna Bank Station',
    background: 'purist_temple',
    characters: [
      {
        id: 'guru_nirvan',
        name: 'Guru Nirvan',
        faction: 'yamuna',
        portrait: { description: 'Bald man with glowing veins and peaceful expression', style: 'purist' },
        mood: 'neutral',
      },
    ],
    dialogue: [
      {
        speaker: 'Guru Nirvan',
        speakerId: 'guru_nirvan',
        text: 'A fair choice. The Light does not force. It illuminates.',
        mood: 'neutral',
      },
      {
        speaker: 'Guru Nirvan',
        speakerId: 'guru_nirvan',
        text: 'I will guide you through our tunnels to India Gate.',
        mood: 'hopeful',
      },
      {
        speaker: 'Guru Nirvan',
        speakerId: 'guru_nirvan',
        text: 'See for yourself. Then choose.',
        mood: 'determined',
      },
    ],
    nextScene: 'act3_transition',
  },

  syndicate_pragmatic: {
    id: 'syndicate_pragmatic',
    act: 2,
    location: 'Lal Qila Station',
    background: 'military_base',
    characters: [
      {
        id: 'general_khan',
        name: 'General Khan',
        faction: 'red_line',
        portrait: { description: 'Imposing figure in tactical armor with cybernetic jaw', style: 'soldier' },
        mood: 'neutral',
      },
    ],
    dialogue: [
      {
        speaker: 'General Khan',
        speakerId: 'general_khan',
        text: 'Pragmatic. I respect that.',
        mood: 'neutral',
      },
      {
        speaker: 'General Khan',
        speakerId: 'general_khan',
        text: 'Go to India Gate. Assess the threat. Then report back.',
        mood: 'determined',
      },
      {
        speaker: 'General Khan',
        speakerId: 'general_khan',
        text: 'But don\'t let their "peaceful" words fool you.',
        mood: 'concerned',
      },
    ],
    nextScene: 'act3_transition',
  },

  forced_departure: {
    id: 'forced_departure',
    act: 2,
    location: 'Delhi Metro - Service Tunnels',
    background: 'service_tunnel',
    characters: [],
    dialogue: [
      {
        speaker: 'Narrator',
        text: 'You leave without faction support. The tunnels are dangerous alone.',
      },
      {
        speaker: 'Narrator',
        text: 'But sometimes, the hardest path reveals the clearest truth.',
      },
      {
        speaker: 'Narrator',
        text: 'India Gate awaits. The surface. And the truth.',
      },
    ],
    nextScene: 'act3_transition',
  },

  mutant_departure: {
    id: 'mutant_departure',
    act: 2,
    location: 'Delhi Metro - Abandoned Sector',
    background: 'dark_tunnel',
    characters: [],
    dialogue: [
      {
        speaker: 'Narrator',
        text: 'The figure watches you retreat. Its eyes hold something... sad.',
      },
      {
        speaker: '???',
        text: 'We will be waiting. At India Gate. The choice will be yours.',
        effect: 'whisper',
      },
      {
        speaker: 'Narrator',
        text: 'The shadows swallow the luminescent being. You continue alone.',
      },
    ],
    nextScene: 'act3_transition',
  },

  combat_result: {
    id: 'combat_result',
    act: 2,
    location: 'Delhi Metro - Abandoned Sector',
    background: 'dark_tunnel',
    characters: [],
    dialogue: [
      {
        speaker: 'Narrator',
        text: 'Your shot echoes through the tunnels.',
        effect: 'static',
      },
      {
        speaker: 'Narrator',
        text: 'The figure crumples. But before it falls, you see its face.',
      },
      {
        speaker: 'Narrator',
        text: 'It was crying. Not with fear. With... disappointment.',
        effect: 'glitch',
      },
      {
        speaker: 'Narrator',
        text: 'Something inside you breaks. But you push forward.',
      },
    ],
    nextScene: 'act3_transition',
  },

  act3_transition: {
    id: 'act3_transition',
    act: 3,
    location: 'India Gate - The Surface',
    background: 'surface',
    characters: [],
    dialogue: [
      {
        speaker: 'Narrator',
        text: 'ACT III - THE SURFACE',
        effect: 'glitch',
      },
      {
        speaker: 'Narrator',
        text: 'You climb the emergency stairs. Higher. Higher.',
      },
      {
        speaker: 'Narrator',
        text: 'Then, for the first time in years, you see it.',
        effect: 'static',
      },
      {
        speaker: 'Narrator',
        text: 'The sky.',
      },
      {
        speaker: 'Narrator',
        text: 'Grey. Heavy. But still... the sky.',
      },
      {
        speaker: 'Narrator',
        text: 'Before you stand the ruins of India Gate. And around it...',
      },
      {
        speaker: 'Narrator',
        text: 'Dozens of luminescent figures. Waiting.',
        effect: 'glitch',
      },
    ],
    nextScene: 'surface_truth',
  },

  surface_truth: {
    id: 'surface_truth',
    act: 3,
    location: 'India Gate - Surface Ruins',
    background: 'india_gate',
    characters: [
      {
        id: 'elder_one',
        name: 'The Elder One',
        faction: 'surface',
        portrait: { description: 'Tall luminescent being with ancient, knowing eyes', style: 'mutant' },
        mood: 'neutral',
      },
    ],
    dialogue: [
      {
        speaker: 'The Elder One',
        speakerId: 'elder_one',
        text: 'Welcome, Veer. We have been waiting for you.',
        mood: 'neutral',
      },
      {
        speaker: 'The Elder One',
        speakerId: 'elder_one',
        text: 'You have traveled far. Seen the factions. Made your choices.',
        mood: 'neutral',
      },
      {
        speaker: 'The Elder One',
        speakerId: 'elder_one',
        text: 'Now you must make one final choice.',
        mood: 'determined',
      },
      {
        speaker: 'The Elder One',
        speakerId: 'elder_one',
        text: 'We are not invaders. We are not animals.',
        mood: 'concerned',
      },
      {
        speaker: 'The Elder One',
        speakerId: 'elder_one',
        text: 'We are what humanity becomes when it embraces change.',
        mood: 'hopeful',
      },
      {
        speaker: 'The Elder One',
        speakerId: 'elder_one',
        text: 'We offer coexistence. Evolution without destruction.',
        mood: 'determined',
      },
      {
        speaker: 'The Elder One',
        speakerId: 'elder_one',
        text: 'What will you choose, Veer? For yourself. For underground India.',
        mood: 'neutral',
      },
    ],
    nextScene: 'final_choice',
  },

  final_choice: {
    id: 'final_choice',
    act: 3,
    location: 'India Gate - Surface Ruins',
    background: 'india_gate',
    characters: [
      {
        id: 'elder_one',
        name: 'The Elder One',
        faction: 'surface',
        portrait: { description: 'Tall luminescent being with ancient, knowing eyes', style: 'mutant' },
        mood: 'neutral',
      },
    ],
    dialogue: [
      {
        speaker: 'Narrator',
        text: 'The Elder One extends a luminescent hand.',
      },
      {
        speaker: 'Narrator',
        text: 'Behind you, you hear the distant rumble of an approaching train.',
      },
      {
        speaker: 'Narrator',
        text: 'Above, the grey clouds part slightly. A hint of something beyond.',
      },
      {
        speaker: 'Narrator',
        text: 'The moment stretches. The future hangs in the balance.',
        effect: 'glitch',
      },
    ],
    choices: [
      {
        id: 'choose_peace',
        text: 'Take the hand. "I will help build a bridge between our peoples."',
        effects: [
          { type: 'morality', stat: 'humanity', value: 20 },
          { type: 'morality', stat: 'evolution', value: 20 },
          { type: 'flag', flag: 'hasMadeContact', value: true },
        ],
        nextScene: 'ending_rebirth',
      },
      {
        id: 'choose_military',
        text: 'Draw your weapon. "This ends now. For the safety of the Metro."',
        effects: [
          { type: 'morality', stat: 'authority', value: 20 },
          { type: 'morality', stat: 'humanity', value: -20 },
        ],
        nextScene: 'ending_iron',
      },
      {
        id: 'choose_transcendence',
        text: 'Kneel before the Elder. "Show me the way. I am ready to evolve."',
        effects: [
          { type: 'morality', stat: 'faith', value: 20 },
          { type: 'morality', stat: 'evolution', value: 30 },
          { type: 'flag', flag: 'hasMadeContact', value: true },
        ],
        nextScene: 'ending_ascension',
      },
    ],
  },

  // ===== ENDINGS =====
  ending_rebirth: {
    id: 'ending_rebirth',
    act: 3,
    location: 'India Gate - Surface Ruins',
    background: 'india_gate',
    characters: [
      {
        id: 'elder_one',
        name: 'The Elder One',
        faction: 'surface',
        portrait: { description: 'Tall luminescent being with ancient, knowing eyes', style: 'mutant' },
        mood: 'hopeful',
      },
    ],
    dialogue: [
      {
        speaker: 'Narrator',
        text: 'ENDING: REBIRTH OF BHARAT',
        effect: 'glitch',
      },
      {
        speaker: 'The Elder One',
        speakerId: 'elder_one',
        text: 'You have chosen wisely, Veer. You have chosen hope.',
        mood: 'hopeful',
      },
      {
        speaker: 'Narrator',
        text: 'In the months that follow, a fragile alliance forms.',
      },
      {
        speaker: 'Narrator',
        text: 'The Whisperers share their knowledge of the surface.',
      },
      {
        speaker: 'Narrator',
        text: 'Humans slowly adapt to radiation zones.',
      },
      {
        speaker: 'Narrator',
        text: 'The metro expands upward, not just downward.',
      },
      {
        speaker: 'Narrator',
        text: 'And one morning, for the first time in decades...',
        effect: 'static',
      },
      {
        speaker: 'Narrator',
        text: 'A child looks up and sees the sunrise.',
      },
      {
        speaker: 'Narrator',
        text: 'Humanity survives. And begins to live again.',
        mood: 'hopeful',
      },
    ],
    nextScene: 'credits',
  },

  ending_iron: {
    id: 'ending_iron',
    act: 3,
    location: 'India Gate - Surface Ruins',
    background: 'india_gate',
    characters: [],
    dialogue: [
      {
        speaker: 'Narrator',
        text: 'ENDING: IRON METRO',
        effect: 'glitch',
      },
      {
        speaker: 'Narrator',
        text: 'The shot rings out across the ruins.',
        effect: 'static',
      },
      {
        speaker: 'Narrator',
        text: 'The Elder falls. The Whisperers scatter.',
      },
      {
        speaker: 'Narrator',
        text: 'The Red Line Syndicate rises to power.',
      },
      {
        speaker: 'Narrator',
        text: 'The Metro is unified. Order is restored.',
      },
      {
        speaker: 'Narrator',
        text: 'But the tunnels grow quieter each year.',
      },
      {
        speaker: 'Narrator',
        text: 'Fear becomes law. Paranoia becomes policy.',
      },
      {
        speaker: 'Narrator',
        text: 'Humanity survives.',
      },
      {
        speaker: 'Narrator',
        text: 'But it does not live.',
      },
    ],
    nextScene: 'credits',
  },

  ending_ascension: {
    id: 'ending_ascension',
    act: 3,
    location: 'India Gate - Surface Ruins',
    background: 'india_gate',
    characters: [
      {
        id: 'elder_one',
        name: 'The Elder One',
        faction: 'surface',
        portrait: { description: 'Tall luminescent being with ancient, knowing eyes', style: 'mutant' },
        mood: 'hopeful',
      },
    ],
    dialogue: [
      {
        speaker: 'Narrator',
        text: 'ENDING: RADIANT ASCENSION',
        effect: 'glitch',
      },
      {
        speaker: 'The Elder One',
        speakerId: 'elder_one',
        text: 'Rise, child. The Light has chosen you.',
        mood: 'hopeful',
      },
      {
        speaker: 'Narrator',
        text: 'The change begins slowly. A warmth. A glow.',
        effect: 'glitch',
      },
      {
        speaker: 'Narrator',
        text: 'The Purists welcome you as a prophet.',
      },
      {
        speaker: 'Narrator',
        text: 'The Metro follows the new teaching.',
      },
      {
        speaker: 'Narrator',
        text: 'Mutation is embraced. Evolution accelerated.',
      },
      {
        speaker: 'Narrator',
        text: 'One by one, humanity steps into the Light.',
      },
      {
        speaker: 'Narrator',
        text: 'Civilization as we knew it ends.',
      },
      {
        speaker: 'Narrator',
        text: 'But a new species begins.',
      },
    ],
    nextScene: 'credits',
  },

  credits: {
    id: 'credits',
    act: 3,
    location: 'DILLI 2047',
    background: 'credits',
    characters: [],
    dialogue: [
      {
        speaker: 'Narrator',
        text: 'THE END',
        effect: 'glitch',
      },
      {
        speaker: 'Narrator',
        text: 'Thank you for playing DILLI 2047: The Last Metro',
      },
      {
        speaker: 'Narrator',
        text: 'An Indian Sci-Fi Visual Novel',
      },
      {
        speaker: 'Narrator',
        text: 'Set in the Delhi Metro, 2047',
      },
      {
        speaker: 'Narrator',
        text: '100 years after independence. 15 years after the end of the world.',
      },
    ],
    nextScene: 'title',
  },
};

export const ENDINGS: Ending[] = [
  {
    id: 'rebirth',
    title: 'Rebirth of Bharat',
    subtitle: 'A New Dawn',
    description: 'You initiated communication between humans and mutants. A fragile alliance forms. The first sunrise is witnessed in decades.',
    requirements: {
      primaryStat: 'humanity',
      minValue: 60,
    },
    epilogue: [
      'The Metro expands upward.',
      'Children learn about sunlight from books... then see it for themselves.',
      'Humanity evolves without destroying itself.',
    ],
    theme: 'hope',
  },
  {
    id: 'iron_metro',
    title: 'Iron Metro',
    subtitle: 'Order Through Strength',
    description: 'You sided with the Syndicate. The Surface Whisperers were hunted. Humanity survives, but fear becomes law.',
    requirements: {
      primaryStat: 'authority',
      minValue: 70,
    },
    epilogue: [
      'The tunnels are safe. The tunnels are silent.',
      'No one speaks of the creatures anymore.',
      'No one speaks of anything anymore.',
    ],
    theme: 'dark',
  },
  {
    id: 'radiant_ascension',
    title: 'Radiant Ascension',
    subtitle: 'The Light Embraces All',
    description: 'You embraced the Purist ideology. Mutation was accepted. Civilization ended. A new species began.',
    requirements: {
      primaryStat: 'evolution',
      minValue: 70,
      faction: 'yamuna',
    },
    epilogue: [
      'The old humanity is gone.',
      'In its place, something new.',
      'Something luminous.',
    ],
    theme: 'transcendence',
  },
];
