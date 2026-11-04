import { useEffect, useRef, useState } from 'react';

const melody = [
  523.25, 659.25, 783.99, 659.25, 587.33, 698.46, 880, 698.46, 523.25, 659.25,
  783.99, 1046.5, 880, 783.99, 659.25, 587.33,
];

export function useMusic() {
  const [playing, setPlaying] = useState(false);
  const [unavailable, setUnavailable] = useState(false);
  const context = useRef<AudioContext | null>(null);
  const output = useRef<GainNode | null>(null);
  const note = useRef(0);
  const pending = useRef(false);
  const requested = useRef(false);

  useEffect(() => {
    if (!playing || !context.current || !output.current) return;
    const audio = context.current;
    const volume = output.current;
    volume.gain.setTargetAtTime(0.4, audio.currentTime, 0.08);
    function playNote() {
      const oscillator = audio.createOscillator();
      const gain = audio.createGain();
      oscillator.type = 'sine';
      oscillator.frequency.value = melody[note.current++ % melody.length];
      gain.gain.setValueAtTime(0, audio.currentTime);
      gain.gain.linearRampToValueAtTime(0.11, audio.currentTime + 0.04);
      gain.gain.exponentialRampToValueAtTime(0.001, audio.currentTime + 1.7);
      oscillator.connect(gain);
      gain.connect(volume);
      oscillator.start();
      oscillator.stop(audio.currentTime + 1.8);
      oscillator.onended = () => {
        oscillator.disconnect();
        gain.disconnect();
      };
    }
    playNote();
    const timer = window.setInterval(playNote, 700);
    return () => {
      window.clearInterval(timer);
      volume.gain.setTargetAtTime(0, audio.currentTime, 0.08);
    };
  }, [playing]);

  useEffect(() => {
    const handleVisibility = () => {
      if (document.hidden) {
        requested.current = false;
        setPlaying(false);
      }
    };
    document.addEventListener('visibilitychange', handleVisibility);
    return () => {
      requested.current = false;
      document.removeEventListener('visibilitychange', handleVisibility);
      void context.current?.close();
      context.current = null;
      output.current = null;
    };
  }, []);

  async function toggle() {
    if (pending.current) return;
    if (playing) {
      requested.current = false;
      setPlaying(false);
      return;
    }
    pending.current = true;
    requested.current = true;
    try {
      if (!context.current) {
        context.current = new AudioContext();
        output.current = context.current.createGain();
        output.current.gain.value = 0;
        output.current.connect(context.current.destination);
      }
      await context.current.resume();
      if (requested.current && !document.hidden) {
        setPlaying(true);
        setUnavailable(false);
      }
    } catch {
      setUnavailable(true);
    } finally {
      pending.current = false;
    }
  }

  return { playing, unavailable, toggle };
}
