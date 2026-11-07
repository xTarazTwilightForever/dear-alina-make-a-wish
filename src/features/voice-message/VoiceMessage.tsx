import { useEffect, useRef, useState } from 'react';
import './voice-message.css';
import { CatCharacter } from '../../shared/characters/CatCharacter';
import { pauseOtherPersonalMedia } from '../../shared/lib/pauseOtherPersonalMedia';

const recordings = import.meta.glob<string>(
  '../../assets/audio/nikita-message.{m4a,mp3,ogg,wav}',
  { eager: true, query: '?url', import: 'default' },
);
const recording = Object.values(recordings)[0];

interface VoiceMessageProps {
  onPlaybackChange: (playing: boolean) => void;
}

export function VoiceMessage({ onPlaybackChange }: VoiceMessageProps) {
  const player = useRef<HTMLAudioElement>(null);
  const [playing, setPlaying] = useState(false);
  const [error, setError] = useState(false);
  useEffect(() => {
    const audio = player.current;
    return () => {
      audio?.pause();
      onPlaybackChange(false);
    };
  }, [onPlaybackChange]);

  return (
    <section
      className={`voice-message${playing ? ' voice-message-playing' : ''}`}
      aria-labelledby="voice-message-title"
    >
      <span className="voice-message-heart" aria-hidden="true">
        ♡
      </span>
      <span className="voice-message-dedication">
        ДЛЯ МОЕЙ АЛИНЫ · ГОЛОС НИКИТЫ
      </span>
      <h3 id="voice-message-title" tabIndex={-1}>
        Моим голосом, только для тебя
      </h3>
      <p>
        Моя Алина, есть слова, которые мне хочется произнести, чтобы ты услышала
        всю мою нежность. Твой Никита.
      </p>
      {recording ? (
        <div className="voice-message-player">
          <span className="voice-message-kitten" aria-hidden="true">
            <CatCharacter character="white" />
          </span>
          <audio
            ref={player}
            controls
            preload="metadata"
            src={recording}
            aria-label="Голосовое поздравление Никиты для Алины"
            data-personal-message
            onPlay={(event) => {
              pauseOtherPersonalMedia(event.currentTarget);
              setPlaying(true);
              setError(false);
              onPlaybackChange(true);
            }}
            onPause={() => {
              setPlaying(false);
              onPlaybackChange(false);
            }}
            onEnded={() => {
              setPlaying(false);
              onPlaybackChange(false);
            }}
            onError={() => {
              setPlaying(false);
              setError(true);
              onPlaybackChange(false);
            }}
          >
            <a href={recording}>Открыть голосовое поздравление</a>
          </audio>
          <span className="voice-message-listen-note">
            Устройся поудобнее, моя Алина. Я хочу сказать тебе кое-что важное ♡
          </span>
        </div>
      ) : (
        <div className="voice-message-placeholder">
          <span className="voice-message-kitten" aria-hidden="true">
            <CatCharacter character="white" />
          </span>
          <span>Здесь будет моё голосовое для тебя ♡</span>
        </div>
      )}
      {recording && error && (
        <p className="voice-message-error" role="status">
          Если запись не включилась,{' '}
          <a href={recording}>открой моё голосовое отдельно ♡</a>
        </p>
      )}
    </section>
  );
}
