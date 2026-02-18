"use client";

import { useState, useCallback, useEffect } from "react";

export const useVoice = () => {
    const [isSpeaking, setIsSpeaking] = useState<string | null>(null);
    const [isEnabled, setIsEnabled] = useState(true);

    const stop = useCallback(() => {
        if (typeof window !== "undefined") {
            window.speechSynthesis.cancel();
            setIsSpeaking(null);
        }
    }, []);

    const speak = useCallback((text: string, id: string, lang: "hi" | "en" = "en") => {
        if (typeof window === "undefined" || !isEnabled) return;

        // Stop current speech if clicking same text
        if (isSpeaking === id) {
            stop();
            return;
        }

        // Clean text - remove markdown and special characters
        const cleanText = text
            .replace(/\*\*/g, '')
            .replace(/\[STATIC\]/g, '')
            .replace(/\[.*?\]/g, '')
            .replace(/[^\w\s.,!?'"-]/g, ' ')
            .replace(/\s+/g, ' ')
            .trim();

        if (!cleanText) return;

        window.speechSynthesis.cancel();
        const utterance = new SpeechSynthesisUtterance(cleanText);

        // Wait for voices to load
        const setVoice = () => {
            const voices = window.speechSynthesis.getVoices();
            
            if (lang === "hi") {
                // Hindi voice for Indian context
                utterance.voice = voices.find(v => v.lang.includes("hi-IN")) || 
                                  voices.find(v => v.lang.includes("hi")) || 
                                  null;
                utterance.rate = 0.85;
                utterance.pitch = 1;
            } else {
                // English with Indian accent preference
                utterance.voice = voices.find(v => v.lang.includes("en-IN")) || 
                                  voices.find(v => v.lang.includes("en-GB")) || 
                                  voices.find(v => v.lang.includes("en-US")) || 
                                  voices.find(v => v.lang.includes("en")) ||
                                  null;
                utterance.rate = 0.9;
                utterance.pitch = 1;
            }
        };

        // Voices might not be loaded yet
        if (window.speechSynthesis.getVoices().length === 0) {
            window.speechSynthesis.onvoiceschanged = setVoice;
        } else {
            setVoice();
        }

        utterance.onend = () => setIsSpeaking(null);
        utterance.onerror = () => setIsSpeaking(null);

        setIsSpeaking(id);
        window.speechSynthesis.speak(utterance);
    }, [isSpeaking, stop, isEnabled]);

    const toggleVoice = useCallback(() => {
        setIsEnabled(prev => {
            if (prev) stop();
            return !prev;
        });
    }, [stop]);

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
