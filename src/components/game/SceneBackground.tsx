'use client';

import { motion } from 'framer-motion';

interface SceneBackgroundProps {
  sceneId: string;
  location: string;
}

const sceneImages: Record<string, { image: string; accent: string }> = {
  intro: { 
    image: '/images/backgrounds/metro_station.png',
    accent: '#00d9ff'
  },
  transmission: { 
    image: '/images/backgrounds/comm_room.png',
    accent: '#00d9ff'
  },
  council_chamber: { 
    image: '/images/backgrounds/council_chamber.png',
    accent: '#00d9ff'
  },
  signal_investigation: { 
    image: '/images/backgrounds/comm_room.png',
    accent: '#00d9ff'
  },
  preparation: { 
    image: '/images/backgrounds/metro_station.png',
    accent: '#ffb800'
  },
  tunnels_entrance: { 
    image: '/images/backgrounds/tunnel.png',
    accent: '#00d9ff'
  },
  act2_transition: { 
    image: '/images/backgrounds/junction.png',
    accent: '#ff006e'
  },
  yamuna_station: { 
    image: '/images/backgrounds/purist_temple.png',
    accent: '#ffb800'
  },
  red_line_station: { 
    image: '/images/backgrounds/military_base.png',
    accent: '#ff3333'
  },
  abandoned_tunnels: { 
    image: '/images/backgrounds/tunnel.png',
    accent: '#39ff14'
  },
  first_contact: { 
    image: '/images/backgrounds/tunnel.png',
    accent: '#39ff14'
  },
  purist_initiation: { 
    image: '/images/backgrounds/purist_temple.png',
    accent: '#ffb800'
  },
  purist_assistance: { 
    image: '/images/backgrounds/purist_temple.png',
    accent: '#ffb800'
  },
  syndicate_mission: { 
    image: '/images/backgrounds/military_base.png',
    accent: '#ff3333'
  },
  syndicate_pragmatic: { 
    image: '/images/backgrounds/military_base.png',
    accent: '#ff3333'
  },
  forced_departure: { 
    image: '/images/backgrounds/tunnel.png',
    accent: '#00d9ff'
  },
  mutant_departure: { 
    image: '/images/backgrounds/tunnel.png',
    accent: '#39ff14'
  },
  combat_result: { 
    image: '/images/backgrounds/tunnel.png',
    accent: '#ff3333'
  },
  act3_transition: { 
    image: '/images/backgrounds/surface.png',
    accent: '#39ff14'
  },
  surface_truth: { 
    image: '/images/backgrounds/surface.png',
    accent: '#39ff14'
  },
  final_choice: { 
    image: '/images/backgrounds/surface.png',
    accent: '#ff006e'
  },
  ending_rebirth: { 
    image: '/images/backgrounds/surface.png',
    accent: '#00ff88'
  },
  ending_iron: { 
    image: '/images/backgrounds/military_base.png',
    accent: '#ff3333'
  },
  ending_ascension: { 
    image: '/images/backgrounds/purist_temple.png',
    accent: '#ffb800'
  },
  council_explanation: {
    image: '/images/backgrounds/council_chamber.png',
    accent: '#00d9ff'
  },
};

export function SceneBackground({ sceneId, location }: SceneBackgroundProps) {
  const sceneConfig = sceneImages[sceneId] || sceneImages.intro;

  return (
    <motion.div
      key={sceneId}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8 }}
      className="fixed inset-0 z-0"
    >
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{ 
          backgroundImage: `url(${sceneConfig.image})`,
          filter: 'brightness(0.6) contrast(1.1)',
        }}
      />

      {/* Atmospheric overlay */}
      <div 
        className="absolute inset-0"
        style={{
          background: `linear-gradient(180deg, 
            rgba(5, 8, 16, 0.7) 0%, 
            rgba(5, 8, 16, 0.3) 40%, 
            rgba(5, 8, 16, 0.5) 70%, 
            rgba(5, 8, 16, 0.95) 100%)`,
        }}
      />

      {/* Accent glow */}
      <div 
        className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[800px] h-[400px] opacity-20 rounded-full blur-3xl"
        style={{ background: sceneConfig.accent }}
      />

      {/* Scan line effect */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-10"
        style={{
          background: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0, 217, 255, 0.1) 2px, rgba(0, 217, 255, 0.1) 4px)',
        }}
      />

      {/* Vignette effect */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at center, transparent 0%, rgba(0,0,0,0.5) 100%)',
        }}
      />

      {/* Location indicator */}
      <motion.div
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="absolute top-20 left-1/2 -translate-x-1/2 z-10 text-center"
      >
        <div className="text-xs text-gray-500 tracking-widest mb-1 uppercase">Location</div>
        <div className="text-sm text-gray-200 tracking-wide font-medium" style={{ textShadow: `0 0 20px ${sceneConfig.accent}` }}>
          {location}
        </div>
      </motion.div>
    </motion.div>
  );
}
