import { useCallback, useEffect, useRef, useState } from 'react';

type BlowStatus = 'idle' | 'requesting' | 'listening' | 'unavailable';

/** The microphone is opened only by the dedicated button; no audio is recorded. */
export function useCandleBlow(onBlow: () => void) {
  const [status, setStatus] = useState<BlowStatus>('idle');
  const callback = useRef(onBlow);
  const stream = useRef<MediaStream | null>(null);
  const context = useRef<AudioContext | null>(null);
  const frame = useRef<number | null>(null);
  const generation = useRef(0);

  useEffect(() => {
    callback.current = onBlow;
  }, [onBlow]);

  const stop = useCallback(() => {
    generation.current++;
    if (frame.current !== null) cancelAnimationFrame(frame.current);
    frame.current = null;
    stream.current?.getTracks().forEach((track) => track.stop());
    stream.current = null;
    const audio = context.current;
    context.current = null;
    if (audio && audio.state !== 'closed') void audio.close().catch(() => {});
  }, []);

  useEffect(() => {
    function pause() {
      if (document.hidden) {
        stop();
        setStatus('idle');
      }
    }
    document.addEventListener('visibilitychange', pause);
    return () => {
      document.removeEventListener('visibilitychange', pause);
      stop();
    };
  }, [stop]);

  const start = useCallback(async () => {
    stop();
    const request = generation.current;
    setStatus('requesting');
    let audio: AudioContext | null = null;
    try {
      if (!navigator.mediaDevices?.getUserMedia)
        throw new Error('Microphone unavailable');
      audio = new AudioContext();
      context.current = audio;
      await audio.resume();
      if (request !== generation.current) return;
      const input = await navigator.mediaDevices.getUserMedia({
        audio: {
          echoCancellation: true,
          noiseSuppression: false,
          autoGainControl: false,
        },
      });
      if (request !== generation.current) {
        input.getTracks().forEach((track) => track.stop());
        return;
      }
      stream.current = input;
      const source = audio.createMediaStreamSource(input);
      const analyser = audio.createAnalyser();
      analyser.fftSize = 1024;
      source.connect(analyser);
      const samples = new Uint8Array(analyser.fftSize);
      let loudSince: number | null = null;
      setStatus('listening');
      function listen(now: number) {
        if (request !== generation.current) return;
        analyser.getByteTimeDomainData(samples);
        const level = Math.sqrt(
          samples.reduce(
            (sum, sample) => sum + ((sample - 128) / 128) ** 2,
            0,
          ) / samples.length,
        );
        if (level > 0.06) {
          loudSince ??= now;
          if (now - loudSince > 220) {
            stop();
            setStatus('idle');
            callback.current();
            return;
          }
        } else loudSince = null;
        frame.current = requestAnimationFrame(listen);
      }
      frame.current = requestAnimationFrame(listen);
    } catch {
      if (request === generation.current) {
        stop();
        setStatus('unavailable');
      } else if (audio && audio.state !== 'closed')
        void audio.close().catch(() => {});
    }
  }, [stop]);

  return { status, start, stop };
}
