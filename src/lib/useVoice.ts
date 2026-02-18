"use client";

import { useState, useCallback, useEffect } from "react";
import { useGameStore } from "./store";

export const useVoice = () => {
    const [isSpeaking, setIsSpeaking] = useState<string | null>(null);
    const { voiceEnabled: isEnabled, setVoiceEnabled } = useGameStore();

    const stop = useCallback(() => {
        if (typeof window !== "undefined") {
            window.speechSynthesis.cancel();
            setIsSpeaking(null);
        }
    }, []);

    const speak = useCallback((text: string, id: string, lang: "hi" | "en" = "en") => {
        if (typeof window === "undefined" || !isEnabled) return;

        // Clean text - remove markdown and technical markers
        const cleanText = text
            .replace(/\[STATIC\]/g, '')
            .replace(/\[.*?\]/g, '')
            .replace(/\*\*/g, '')
            .replace(/[^\w\s.,!?'"-]/g, ' ')
            .replace(/\s+/g, ' ')
            .trim();

        if (!cleanText) return;

        // If we're already speaking this exact ID, don't restart it (prevents stuttering)
        if (isSpeaking === id && window.speechSynthesis.speaking) {
            return;
        }

        // Browser quirk: ensure speech synthesis isn't paused
        if (window.speechSynthesis.paused) {
            window.speechSynthesis.resume();
        }

        // Force stop any current speech
        window.speechSynthesis.cancel();

        // Small timeout for browser stability
        const timer = setTimeout(() => {
            const utterance = new SpeechSynthesisUtterance(cleanText);

            const setVoice = () => {
                const voices = window.speechSynthesis.getVoices();

                if (lang === "hi") {
                    utterance.voice = voices.find(v => v.lang.includes("hi-IN")) ||
                        voices.find(v => v.lang.includes("hi")) ||
                        null;
                    utterance.rate = 0.9;
                    utterance.pitch = 1;
                } else {
                    utterance.voice = voices.find(v => v.lang.includes("en-IN")) ||
                        voices.find(v => v.lang.includes("en-GB")) ||
                        voices.find(v => v.lang.includes("en-US")) ||
                        null;
                    utterance.rate = 0.95;
                    utterance.pitch = 1.05;
                }
            };

            if (window.speechSynthesis.getVoices().length === 0) {
                window.speechSynthesis.onvoiceschanged = setVoice;
            } else {
                setVoice();
            }

            utterance.onstart = () => setIsSpeaking(id);
            utterance.onend = () => setIsSpeaking(null);
            utterance.onerror = (event) => {
                // 'interrupted' and 'canceled' are common when moving fast - ignore them
                if (event.error !== 'interrupted' && event.error !== 'canceled') {
                    console.error('SpeechSynthesis Error:', event.error, event);
                }
                setIsSpeaking(null);
            };

            window.speechSynthesis.speak(utterance);
        }, 80); // Increased buffer slightly for slower browsers

        return () => clearTimeout(timer);
    }, [isSpeaking, isEnabled]);

    const toggleVoice = useCallback(() => {
        if (isEnabled) stop();
        setVoiceEnabled(!isEnabled);
    }, [isEnabled, stop, setVoiceEnabled]);

    // Cleanup on unmount
    useEffect(() => {
        return () => {
            if (typeof window !== "undefined") {
                window.speechSynthesis.cancel();
            }
        };
    }, []);

    return { speak, stop, isSpeaking, isEnabled, toggleVoice };
};
