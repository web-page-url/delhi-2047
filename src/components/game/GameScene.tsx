'use client';

import { useEffect, useState, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useGameStore } from '@/lib/store';
import { STORY_SCENES } from '@/lib/story/scenes';
import { StoryScene, DialogueLine, Choice } from '@/lib/story/types';
import { CharacterPortrait } from './CharacterPortrait';
import { DialogueBox } from './DialogueBox';
import { ChoicePanel } from './ChoicePanel';
import { SceneBackground } from './SceneBackground';
import { ChevronRight } from 'lucide-react';
import { useAudio } from '@/lib/audio';

export function GameScene() {
  const {
    currentScene,
    dialogueIndex,
    isTyping,
    showChoices,
    setIsTyping,
    advanceDialogue,
    setShowChoices,
    setCurrentScene,
    updateMorality,
    updateReputation,
    setFlag,
    addDecision,
    textSpeed,
    currentAct,
  } = useGameStore();

  const [displayedText, setDisplayedText] = useState('');
  const [currentText, setCurrentText] = useState('');
  const scene = STORY_SCENES[currentScene] as StoryScene | undefined;
  const lastEffectRef = useRef<string | null>(null);
  
  const { 
    initAudio, 
    startAmbient, 
    playStatic, 
    playGlitch, 
    playClick, 
    playWhisper,
    playHeartbeat,
    playTension 
  } = useAudio();

  // Initialize audio on first interaction
  useEffect(() => {
    const handleFirstInteraction = () => {
      initAudio();
      startAmbient(0.1);
      window.removeEventListener('click', handleFirstInteraction);
    };
    window.addEventListener('click', handleFirstInteraction);
    return () => window.removeEventListener('click', handleFirstInteraction);
  }, [initAudio, startAmbient]);

  // Play audio effects based on dialogue effect type
  useEffect(() => {
    if (!scene) return;
    const dialogue = scene.dialogue[dialogueIndex];
    if (!dialogue || !dialogue.effect) return;

    // Avoid repeating the same effect
    const effectKey = `${currentScene}-${dialogueIndex}-${dialogue.effect}`;
    if (lastEffectRef.current === effectKey) return;
    lastEffectRef.current = effectKey;

    switch (dialogue.effect) {
      case 'static':
        playStatic(300);
        break;
      case 'glitch':
        playGlitch();
        break;
      case 'whisper':
        playWhisper(1500);
        break;
      case 'shout':
        playTension();
        break;
    }
  }, [scene, dialogueIndex, currentScene, playStatic, playGlitch, playWhisper, playTension]);

  // Play tension audio for important scenes
  useEffect(() => {
    if (currentScene.includes('final') || currentScene.includes('ending')) {
      playHeartbeat();
    }
  }, [currentScene, playHeartbeat]);

  // Typewriter effect
  useEffect(() => {
    if (!scene) return;
    
    const dialogue = scene.dialogue[dialogueIndex];
    if (!dialogue) {
      // Check for choices or next scene
      if (scene.choices && scene.choices.length > 0) {
        setShowChoices(true);
      } else if (scene.nextScene) {
        // Handle special transitions
        if (scene.nextScene === 'ending_rebirth' || 
            scene.nextScene === 'ending_iron' || 
            scene.nextScene === 'ending_ascension') {
          // Transition to ending
          setCurrentScene(scene.nextScene);
        } else if (scene.nextScene === 'credits') {
          // Show ending screen
          useGameStore.getState().setGamePhase('ending');
        } else if (scene.nextScene === 'title') {
          // Return to title
          useGameStore.getState().setGamePhase('title');
        } else {
          setCurrentScene(scene.nextScene);
        }
      }
      return;
    }

    setCurrentText(dialogue.text);
    setDisplayedText('');
    setIsTyping(true);

    let charIndex = 0;
    const interval = setInterval(() => {
      if (charIndex < dialogue.text.length) {
        setDisplayedText(dialogue.text.slice(0, charIndex + 1));
        charIndex++;
      } else {
        setIsTyping(false);
        clearInterval(interval);
      }
    }, textSpeed);

    return () => clearInterval(interval);
  }, [dialogueIndex, scene, textSpeed, setIsTyping, setShowChoices, setCurrentScene]);

  // Check if we need to show choices
  useEffect(() => {
    if (!scene) return;
    
    if (dialogueIndex >= scene.dialogue.length && scene.choices && scene.choices.length > 0) {
      setShowChoices(true);
    }
  }, [dialogueIndex, scene, setShowChoices]);

  const handleAdvance = useCallback(() => {
    if (!scene) return;
    
    if (isTyping) {
      // Skip to end of text
      setDisplayedText(currentText);
      setIsTyping(false);
      return;
    }

    if (showChoices) return;

    playClick();
    advanceDialogue();
  }, [isTyping, currentText, showChoices, scene, advanceDialogue, setIsTyping, playClick]);

  const handleChoice = useCallback((choice: Choice) => {
    playClick();
    
    // Apply effects
    choice.effects.forEach((effect) => {
      if (effect.type === 'morality' && effect.stat) {
        updateMorality({ [effect.stat]: effect.value as number });
      }
      if (effect.type === 'reputation' && effect.faction) {
        updateReputation({ [effect.faction]: effect.value as number });
      }
      if (effect.type === 'flag' && effect.flag) {
        setFlag(effect.flag, effect.value as boolean);
      }
    });

    // Record decision
    addDecision({
      sceneId: currentScene,
      choiceId: choice.id,
      choiceText: choice.text,
      actNumber: scene?.act || 1,
      moralityChanges: choice.effects
        .filter(e => e.type === 'morality')
        .reduce((acc, e) => ({ ...acc, [e.stat!]: e.value as number }), {}),
    });

    // Navigate to next scene
    setShowChoices(false);
    setCurrentScene(choice.nextScene);
  }, [currentScene, scene, updateMorality, updateReputation, setFlag, addDecision, setCurrentScene, setShowChoices, playClick]);

  if (!scene) {
    return (
      <div className="flex items-center justify-center min-h-screen text-[#ff3333]">
        Scene not found: {currentScene}
      </div>
    );
  }

  const currentDialogue = scene.dialogue[dialogueIndex];
  const speaker = currentDialogue?.speakerId 
    ? scene.characters.find(c => c.id === currentDialogue.speakerId)
    : null;

  return (
    <div 
      className="min-h-screen flex flex-col cursor-pointer"
      onClick={handleAdvance}
    >
      {/* Background */}
      <SceneBackground sceneId={scene.id} location={scene.location} />

      {/* Character Portrait */}
      <AnimatePresence mode="wait">
        {speaker && (
          <CharacterPortrait 
            key={speaker.id}
            character={speaker}
            mood={currentDialogue?.mood}
            effect={currentDialogue?.effect}
          />
        )}
      </AnimatePresence>

      {/* Bottom section - Dialogue and Choices */}
      <div className="mt-auto relative z-30">
        <AnimatePresence>
          {showChoices && scene.choices ? (
            <ChoicePanel 
              choices={scene.choices} 
              onChoice={handleChoice}
            />
          ) : (
            <DialogueBox
              speaker={currentDialogue?.speaker || 'Narrator'}
              text={displayedText}
              effect={currentDialogue?.effect}
              isTyping={isTyping}
            />
          )}
        </AnimatePresence>

        {/* Continue indicator */}
        {!showChoices && !isTyping && dialogueIndex < scene.dialogue.length && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="absolute bottom-4 right-4 flex items-center gap-2 text-[#00d9ff] text-sm"
          >
            <span className="tracking-wider">CONTINUE</span>
            <ChevronRight className="w-4 h-4 animate-pulse" />
          </motion.div>
        )}
      </div>
    </div>
  );
}
