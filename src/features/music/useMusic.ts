import { useEffect, useState } from 'react';

const melody = [
  523.25, 659.25, 783.99, 659.25, 587.33, 698.46, 880, 698.46, 523.25, 659.25,
  783.99, 1046.5, 880, 783.99, 659.25, 587.33,
];
type MusicStatus = 'waiting' | 'playing' | 'unavailable';

/** One soundtrack for the whole adventure, unlocked by the first user gesture. */
export function useMusic() {
  const [status, setStatus] = useState<MusicStatus>('waiting');

  useEffect(() => {
    let audio: AudioContext | null = null;
    let volume: GainNode | null = null;
    let timer: ReturnType<typeof window.setInterval> | undefined;
    let note = 0;
    let started = false;
    let disposed = false;
    let pending = false;

    function stopScheduler() {
      if (timer !== undefined) window.clearInterval(timer);
      timer = undefined;
    }

    function playNote() {
      if (!audio || !volume || audio.state !== 'running') return;
      const oscillator = audio.createOscillator();
      const gain = audio.createGain();
      oscillator.type = 'sine';
      oscillator.frequency.value = melody[note++ % melody.length];
      gain.gain.setValueAtTime(0, audio.currentTime);
      gain.gain.linearRampToValueAtTime(0.1, audio.currentTime + 0.04);
      gain.gain.exponentialRampToValueAtTime(0.001, audio.currentTime + 1.9);
      oscillator.connect(gain);
      gain.connect(volume);
      oscillator.start();
      oscillator.stop(audio.currentTime + 2);
      oscillator.onended = () => {
        oscillator.disconnect();
        gain.disconnect();
      };
    }

    function syncPlayback() {
      if (disposed || !audio) return;
      if (audio.state !== 'running' || document.hidden) {
        stopScheduler();
        setStatus('waiting');
        return;
      }
      if (timer === undefined) {
        playNote();
        timer = window.setInterval(playNote, 760);
      }
      setStatus('playing');
    }

    async function start() {
      if (disposed || pending || document.hidden) return;
      started = true;
      if (audio?.state === 'running') {
        syncPlayback();
        return;
      }
      pending = true;
      try {
        if (!audio) {
          audio = new AudioContext();
          volume = audio.createGain();
          volume.gain.value = 0.27;
          volume.connect(audio.destination);
          audio.addEventListener('statechange', syncPlayback);
        }
        await audio.resume();
        syncPlayback();
      } catch {
        if (!disposed) setStatus('unavailable');
      } finally {
        pending = false;
      }
    }

    function onInteraction(event: Event) {
      if (
        event instanceof KeyboardEvent &&
        !['Enter', ' ', 'ArrowRight', 'ArrowLeft'].includes(event.key)
      )
        return;
      void start();
    }

    function onVisibility() {
      if (document.hidden) {
        stopScheduler();
        if (audio?.state === 'running') void audio.suspend().catch(() => {});
      } else if (started) void start();
    }

    document.addEventListener('click', onInteraction, true);
    document.addEventListener('keydown', onInteraction, true);
    document.addEventListener('visibilitychange', onVisibility);
    return () => {
      disposed = true;
      stopScheduler();
      document.removeEventListener('click', onInteraction, true);
      document.removeEventListener('keydown', onInteraction, true);
      document.removeEventListener('visibilitychange', onVisibility);
      audio?.removeEventListener('statechange', syncPlayback);
      if (audio && audio.state !== 'closed') void audio.close().catch(() => {});
    };
  }, []);

  return { status };
}
