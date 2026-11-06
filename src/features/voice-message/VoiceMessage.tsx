import { useEffect } from 'react';
import './voice-message.css';

const recordings = import.meta.glob<string>(
  '../../assets/audio/nikita-message.{m4a,mp3,ogg,wav}',
  { eager: true, query: '?url', import: 'default' },
);
const recording = Object.values(recordings)[0];

interface VoiceMessageProps {
  onPlaybackChange: (playing: boolean) => void;
}

export function VoiceMessage({ onPlaybackChange }: VoiceMessageProps) {
  useEffect(() => () => onPlaybackChange(false), [onPlaybackChange]);

  return (
    <section className="voice-message" aria-labelledby="voice-message-title">
      <span className="voice-message-heart" aria-hidden="true">
        ♡
      </span>
      <h3 id="voice-message-title" tabIndex={-1}>
        Моим голосом, только для тебя
      </h3>
      <p>
        Моя Алина, есть слова, которые мне хочется произнести, чтобы ты услышала
        всю мою нежность. Твой Никита.
      </p>
      {recording ? (
        <audio
          controls
          preload="metadata"
          src={recording}
          aria-label="Голосовое поздравление Никиты для Алины"
          onPlay={() => onPlaybackChange(true)}
          onPause={() => onPlaybackChange(false)}
          onEnded={() => onPlaybackChange(false)}
          onError={() => onPlaybackChange(false)}
        >
          <a href={recording}>Открыть голосовое поздравление</a>
        </audio>
      ) : (
        <div className="voice-message-placeholder">
          <span className="voice-message-wave" aria-hidden="true">
            <i />
            <i />
            <i />
            <i />
            <i />
            <i />
            <i />
          </span>
          <span>Здесь будет моё голосовое для тебя ♡</span>
        </div>
      )}
    </section>
  );
}
