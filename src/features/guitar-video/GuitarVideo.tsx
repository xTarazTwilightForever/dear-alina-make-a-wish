import { useEffect, useRef } from 'react';
import { birthdayGuitarVideo } from '../../content/birthdayGuitar';
import { pauseOtherPersonalMedia } from '../../shared/lib/pauseOtherPersonalMedia';
import './guitar-video.css';

interface GuitarVideoProps {
  onPlaybackChange: (playing: boolean) => void;
}

export function GuitarVideo({ onPlaybackChange }: GuitarVideoProps) {
  const player = useRef<HTMLVideoElement>(null);
  useEffect(() => {
    const media = player.current;
    return () => {
      media?.pause();
      onPlaybackChange(false);
    };
  }, [onPlaybackChange]);

  return (
    <section className="guitar-video" aria-labelledby="guitar-video-title">
      <span className="guitar-video-heart" aria-hidden="true">
        ♡
      </span>
      <h3 id="guitar-video-title">На гитаре, для моей Алины</h3>
      <p>
        Моя Алина, я хочу сыграть для тебя эту мелодию. Пусть в каждой ноте
        будет немного моего тепла. С днём рождения, моя любимая. Твой Никита.
      </p>
      {birthdayGuitarVideo ? (
        <video
          ref={player}
          src={birthdayGuitarVideo}
          controls
          playsInline
          preload="metadata"
          data-personal-message
          aria-label="Никита играет Happy Birthday на гитаре для Алины"
          onPlay={(event) => {
            pauseOtherPersonalMedia(event.currentTarget);
            onPlaybackChange(true);
          }}
          onPause={() => onPlaybackChange(false)}
          onEnded={() => onPlaybackChange(false)}
          onError={() => onPlaybackChange(false)}
        >
          <a href={birthdayGuitarVideo}>Открыть видео Никиты</a>
        </video>
      ) : (
        <div className="guitar-video-placeholder">
          <span aria-hidden="true">♫</span>
          <span>Здесь будет моя маленькая гитарная серенада для тебя ♡</span>
        </div>
      )}
    </section>
  );
}
