import { useEffect, useRef, useState } from 'react';
import {
  birthdayGuitarVideo,
  birthdayGuitarPoster,
} from '../../content/birthdayGuitar';
import { pauseOtherPersonalMedia } from '../../shared/lib/pauseOtherPersonalMedia';
import './guitar-video.css';

interface GuitarVideoProps {
  onPlaybackChange: (playing: boolean) => void;
}

export function GuitarVideo({ onPlaybackChange }: GuitarVideoProps) {
  const player = useRef<HTMLVideoElement>(null);
  const [started, setStarted] = useState(false);
  const [error, setError] = useState(false);
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
        Моя Алина, эту мелодию я сыграл для тебя. Пусть в каждой ноте будет
        немного моего тепла. С днём рождения, моя любимая. Твой Никита.
      </p>
      {birthdayGuitarVideo ? (
        <div className="guitar-video-stage">
          <video
            ref={player}
            src={birthdayGuitarVideo}
            poster={birthdayGuitarPoster}
            controls={started}
            playsInline
            preload="metadata"
            data-personal-message
            aria-label="Никита играет Happy Birthday на гитаре для Алины"
            onPlay={(event) => {
              setStarted(true);
              setError(false);
              pauseOtherPersonalMedia(event.currentTarget);
              onPlaybackChange(true);
            }}
            onPause={() => onPlaybackChange(false)}
            onEnded={() => onPlaybackChange(false)}
            onError={() => {
              setError(true);
              onPlaybackChange(false);
            }}
          >
            <a href={birthdayGuitarVideo}>Открыть видео Никиты</a>
          </video>
          {!started && !error && (
            <button
              className="guitar-video-play"
              onClick={() => {
                const video = player.current;
                if (video)
                  void video.play().catch(() => {
                    setStarted(true);
                    setError(true);
                  });
              }}
              aria-label="Посмотреть, как Никита играет для Алины"
            >
              <span className="guitar-play-icon" aria-hidden="true">
                ▶
              </span>
              <span>Нажми, я сыграю для тебя ♡</span>
            </button>
          )}
          <span className="guitar-video-dedication">
            ДЛЯ ALLUKA · С ЛЮБОВЬЮ, НИКИТА
          </span>
        </div>
      ) : (
        <div className="guitar-video-placeholder">
          <span aria-hidden="true">♫</span>
          <span>Здесь будет моя маленькая гитарная серенада для тебя ♡</span>
        </div>
      )}
      {birthdayGuitarVideo && error && (
        <p className="guitar-video-error" role="status">
          Если видео не включилось,{' '}
          <a href={birthdayGuitarVideo}>открой мою запись отдельно ♡</a>
        </p>
      )}
    </section>
  );
}
