'use client';

import { useEffect, useState } from 'react';

export function GlitchOverlay() {
  const [glitchActive, setGlitchActive] = useState(false);

  useEffect(() => {
    // Random glitch effect
    const glitchInterval = setInterval(() => {
      if (Math.random() > 0.95) {
        setGlitchActive(true);
        setTimeout(() => setGlitchActive(false), 100);
      }
    }, 1000);

    return () => clearInterval(glitchInterval);
  }, []);

  return (
    <>
      {/* Scanline overlay */}
      <div className="scanline-overlay" />
      
      {/* Random glitch effect */}
      {glitchActive && (
        <div 
          className="fixed inset-0 z-[100] pointer-events-none"
          style={{
            background: 'rgba(0, 217, 255, 0.03)',
            mixBlendMode: 'overlay',
          }}
        />
      )}
    </>
  );
}
