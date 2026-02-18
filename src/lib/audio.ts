'use client';

import { useEffect, useRef, useCallback } from 'react';
import { useGameStore } from '@/lib/store';

// Web Audio API based sound generator for atmospheric effects
class AudioManager {
  private audioContext: AudioContext | null = null;
  private masterGain: GainNode | null = null;
  private ambientOscillator: OscillatorNode | null = null;
  private ambientGain: GainNode | null = null;
  private isInitialized = false;

  init() {
    if (this.isInitialized) return;

    try {
      this.audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
      this.masterGain = this.audioContext.createGain();
      this.masterGain.connect(this.audioContext.destination);
      this.isInitialized = true;
    } catch (e) {
      console.warn('Audio not supported:', e);
    }
  }

  setMasterVolume(volume: number) {
    if (this.masterGain) {
      this.masterGain.gain.value = volume;
    }
  }

  // Metro tunnel ambient hum
  startAmbientHum(volume: number = 0.1) {
    if (!this.audioContext || !this.masterGain) return;

    // Stop existing ambient
    this.stopAmbient();

    // Create low frequency hum
    this.ambientOscillator = this.audioContext.createOscillator();
    this.ambientGain = this.audioContext.createGain();

    this.ambientOscillator.type = 'sine';
    this.ambientOscillator.frequency.value = 60; // Low hum

    this.ambientGain.gain.value = volume;

    this.ambientOscillator.connect(this.ambientGain);
    this.ambientGain.connect(this.masterGain);

    this.ambientOscillator.start();

    // Add secondary layer
    const osc2 = this.audioContext.createOscillator();
    const gain2 = this.audioContext.createGain();

    osc2.type = 'sine';
    osc2.frequency.value = 120;
    gain2.gain.value = volume * 0.3;

    osc2.connect(gain2);
    gain2.connect(this.masterGain);
    osc2.start();
  }

  stopAmbient() {
    if (this.ambientOscillator) {
      try {
        this.ambientOscillator.stop();
      } catch { }
      this.ambientOscillator = null;
    }
  }

  // Radio static effect
  playStatic(duration: number = 500, volume: number = 0.3) {
    if (!this.audioContext || !this.masterGain) return;

    const bufferSize = this.audioContext.sampleRate * (duration / 1000);
    const buffer = this.audioContext.createBuffer(1, bufferSize, this.audioContext.sampleRate);
    const data = buffer.getChannelData(0);

    // Generate noise
    for (let i = 0; i < bufferSize; i++) {
      data[i] = Math.random() * 2 - 1;
    }

    const source = this.audioContext.createBufferSource();
    const gain = this.audioContext.createGain();
    const filter = this.audioContext.createBiquadFilter();

    filter.type = 'bandpass';
    filter.frequency.value = 1000;
    filter.Q.value = 0.5;

    source.buffer = buffer;
    gain.gain.value = volume;
    gain.gain.exponentialRampToValueAtTime(0.01, this.audioContext.currentTime + duration / 1000);

    source.connect(filter);
    filter.connect(gain);
    gain.connect(this.masterGain);

    source.start();
    source.stop(this.audioContext.currentTime + duration / 1000);
  }

  // Glitch sound
  playGlitch(volume: number = 0.2) {
    if (!this.audioContext || !this.masterGain) return;

    const oscillator = this.audioContext.createOscillator();
    const gain = this.audioContext.createGain();

    oscillator.type = 'square';
    oscillator.frequency.value = 440;

    // Quick frequency sweep
    oscillator.frequency.exponentialRampToValueAtTime(100, this.audioContext.currentTime + 0.1);

    gain.gain.value = volume;
    gain.gain.exponentialRampToValueAtTime(0.01, this.audioContext.currentTime + 0.1);

    oscillator.connect(gain);
    gain.connect(this.masterGain);

    oscillator.start();
    oscillator.stop(this.audioContext.currentTime + 0.1);
  }

  // Choice selection click
  playClick(volume: number = 0.15) {
    if (!this.audioContext || !this.masterGain) return;

    const oscillator = this.audioContext.createOscillator();
    const gain = this.audioContext.createGain();

    oscillator.type = 'sine';
    oscillator.frequency.value = 800;

    gain.gain.value = volume;
    gain.gain.exponentialRampToValueAtTime(0.01, this.audioContext.currentTime + 0.05);

    oscillator.connect(gain);
    gain.connect(this.masterGain);

    oscillator.start();
    oscillator.stop(this.audioContext.currentTime + 0.05);
  }

  // Tension drone
  playTension(volume: number = 0.15) {
    if (!this.audioContext || !this.masterGain) return;

    const oscillator = this.audioContext.createOscillator();
    const gain = this.audioContext.createGain();
    const lfo = this.audioContext.createOscillator();
    const lfoGain = this.audioContext.createGain();

    oscillator.type = 'sawtooth';
    oscillator.frequency.value = 80;

    lfo.type = 'sine';
    lfo.frequency.value = 0.5;
    lfoGain.gain.value = 10;

    lfo.connect(lfoGain);
    lfoGain.connect(oscillator.frequency);

    gain.gain.value = volume;
    gain.gain.exponentialRampToValueAtTime(0.01, this.audioContext.currentTime + 2);

    oscillator.connect(gain);
    gain.connect(this.masterGain);

    lfo.start();
    oscillator.start();
    oscillator.stop(this.audioContext.currentTime + 2);
    lfo.stop(this.audioContext.currentTime + 2);
  }

  // Whisper effect (low volume, filtered noise)
  playWhisper(duration: number = 1000, volume: number = 0.1) {
    if (!this.audioContext || !this.masterGain) return;

    const bufferSize = this.audioContext.sampleRate * (duration / 1000);
    const buffer = this.audioContext.createBuffer(1, bufferSize, this.audioContext.sampleRate);
    const data = buffer.getChannelData(0);

    for (let i = 0; i < bufferSize; i++) {
      data[i] = Math.random() * 2 - 1;
    }

    const source = this.audioContext.createBufferSource();
    const gain = this.audioContext.createGain();
    const filter = this.audioContext.createBiquadFilter();

    filter.type = 'lowpass';
    filter.frequency.value = 500;

    source.buffer = buffer;
    gain.gain.value = volume;

    source.connect(filter);
    filter.connect(gain);
    gain.connect(this.masterGain);

    source.start();
    source.stop(this.audioContext.currentTime + duration / 1000);
  }

  // Heartbeat for tension
  playHeartbeat(volume: number = 0.2) {
    if (!this.audioContext || !this.masterGain) return;

    const playBeat = (delay: number) => {
      const osc = this.audioContext!.createOscillator();
      const gain = this.audioContext!.createGain();

      osc.type = 'sine';
      osc.frequency.value = 60;

      gain.gain.value = 0;
      gain.gain.setValueAtTime(0, this.audioContext!.currentTime + delay);
      gain.gain.linearRampToValueAtTime(volume, this.audioContext!.currentTime + delay + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.01, this.audioContext!.currentTime + delay + 0.1);

      osc.connect(gain);
      gain.connect(this.masterGain!);

      osc.start(this.audioContext!.currentTime + delay);
      osc.stop(this.audioContext!.currentTime + delay + 0.15);
    };

    playBeat(0);
    playBeat(0.2);
  }

  cleanup() {
    this.stopAmbient();
    if (this.audioContext) {
      this.audioContext.close();
      this.audioContext = null;
    }
    this.isInitialized = false;
  }
}

// Singleton instance
let audioManager: AudioManager | null = null;

export function useAudio() {
  const { musicVolume, sfxVolume, musicEnabled } = useGameStore();
  const initialized = useRef(false);

  useEffect(() => {
    if (!audioManager) {
      audioManager = new AudioManager();
    }
    return () => {
      // Don't cleanup on unmount, keep audio manager alive
    };
  }, []);

  useEffect(() => {
    if (audioManager) {
      audioManager.setMasterVolume(musicEnabled ? musicVolume : 0);
    }
  }, [musicVolume, musicEnabled]);

  const initAudio = useCallback(() => {
    if (!initialized.current && audioManager) {
      audioManager.init();
      initialized.current = true;
    }
  }, []);

  const startAmbient = useCallback((volume?: number) => {
    if (audioManager) {
      audioManager.startAmbientHum(volume ?? musicVolume * 0.3);
    }
  }, [musicVolume]);

  const stopAmbient = useCallback(() => {
    if (audioManager) {
      audioManager.stopAmbient();
    }
  }, []);

  const playStatic = useCallback((duration?: number) => {
    if (audioManager) {
      audioManager.playStatic(duration, sfxVolume * 0.5);
    }
  }, [sfxVolume]);

  const playGlitch = useCallback(() => {
    if (audioManager) {
      audioManager.playGlitch(sfxVolume * 0.3);
    }
  }, [sfxVolume]);

  const playClick = useCallback(() => {
    if (audioManager) {
      audioManager.playClick(sfxVolume * 0.5);
    }
  }, [sfxVolume]);

  const playTension = useCallback(() => {
    if (audioManager) {
      audioManager.playTension(sfxVolume * 0.4);
    }
  }, [sfxVolume]);

  const playWhisper = useCallback((duration?: number) => {
    if (audioManager) {
      audioManager.playWhisper(duration, sfxVolume * 0.2);
    }
  }, [sfxVolume]);

  const playHeartbeat = useCallback(() => {
    if (audioManager) {
      audioManager.playHeartbeat(sfxVolume * 0.4);
    }
  }, [sfxVolume]);

  return {
    initAudio,
    startAmbient,
    stopAmbient,
    playStatic,
    playGlitch,
    playClick,
    playTension,
    playWhisper,
    playHeartbeat,
  };
}
