import { useCallback, useEffect, useRef, useState } from 'react';
import type { CSSProperties } from 'react';
import { useCandleBlow } from './useCandleBlow';
import { birthdayGuitarMelody } from '../../content/birthdayGuitar';
import { pauseOtherPersonalMedia } from '../../shared/lib/pauseOtherPersonalMedia';
import './wish.css';

interface WishMomentProps {
  open: boolean;
  onClose: () => void;
  onComplete: () => void;
  onAlbum: () => void;
  onMelodyPlaybackChange: (playing: boolean) => void;
}

export function WishMoment({
  open,
  onClose,
  onComplete,
  onAlbum,
  onMelodyPlaybackChange,
}: WishMomentProps) {
  const dialog = useRef<HTMLDialogElement>(null);
  const completed = useRef(false);
  const [blown, setBlown] = useState(false);
  const melody = useRef<HTMLAudioElement>(null);
  const [melodyPlaying, setMelodyPlaying] = useState(false);
  const [needsTap, setNeedsTap] = useState(false);
  const [melodyError, setMelodyError] = useState(false);
  const [stars] = useState(() =>
    Array.from({ length: 55 }, (_, id) => ({
      id,
      style: {
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * 100}%`,
        '--delay': `${Math.random() * 3}s`,
        '--star-size': `${2 + Math.random() * 5}px`,
        '--duration': `${2 + Math.random() * 4}s`,
      } as CSSProperties,
    })),
  );

  const playMelody = useCallback(() => {
    const player = melody.current;
    if (!player || !birthdayGuitarMelody) return;
    setNeedsTap(false);
    if (player.readyState > 0) player.currentTime = 0;
    void player.play().catch(() => {
      if (dialog.current?.open) setNeedsTap(true);
    });
  }, []);

  const blow = useCallback(() => {
    if (completed.current) return;
    completed.current = true;
    setBlown(true);
    onComplete();
    playMelody();
  }, [onComplete, playMelody]);
  const microphone = useCandleBlow(blow);

  useEffect(() => {
    if (open && !dialog.current?.open) dialog.current?.showModal();
    else if (!open && dialog.current?.open) dialog.current.close();
    if (!open) microphone.stop();
  }, [open, microphone.stop]);

  useEffect(() => {
    const player = melody.current;
    return () => {
      player?.pause();
      onMelodyPlaybackChange(false);
    };
  }, [onMelodyPlaybackChange]);

  function extinguish() {
    microphone.stop();
    blow();
  }
  function close() {
    microphone.stop();
    if (dialog.current?.open) dialog.current.close();
    onClose();
  }

  return (
    <dialog
      ref={dialog}
      className="wish-dialog"
      onClose={close}
      aria-labelledby="wish-title"
      aria-describedby="wish-promise"
    >
      {birthdayGuitarMelody && (
        <audio
          ref={melody}
          src={birthdayGuitarMelody}
          preload="metadata"
          loop
          data-personal-message
          aria-hidden="true"
          onPlay={(event) => {
            pauseOtherPersonalMedia(event.currentTarget);
            setMelodyPlaying(true);
            setNeedsTap(false);
            onMelodyPlaybackChange(true);
          }}
          onPause={() => {
            setMelodyPlaying(false);
            onMelodyPlaybackChange(false);
          }}
          onEnded={() => {
            setMelodyPlaying(false);
            onMelodyPlaybackChange(false);
          }}
          onError={() => {
            setMelodyError(true);
            setMelodyPlaying(false);
            onMelodyPlaybackChange(false);
          }}
        />
      )}
      <div
        className={`wish-universe wish-candle-universe${blown ? ' wish-fulfilled' : ''}`}
      >
        <div className="wish-stars" aria-hidden="true">
          {stars.map((star) => (
            <span key={star.id} style={star.style} />
          ))}
        </div>
        <div className="wish-shooting-star" aria-hidden="true" />
        <p className="wish-from">ОТ НИКИТЫ · ТВОЕГО ИКСИКА</p>
        <h2 id="wish-title">
          Моя Алина,
          <br />
          <em>
            {blown
              ? 'желание обязательно сбудется.'
              : 'загадай самое заветное.'}
          </em>
        </h2>
        {!blown && (
          <p className="candle-instruction">
            Загадай желание и задуй горящую свечку.
            <br />
            Коснись пламени или нажми кнопку под свечой.
          </p>
        )}
        <button
          className={`birthday-candle${blown ? ' extinguished' : ''}`}
          disabled={blown}
          onClick={extinguish}
          aria-label={
            blown ? 'Свеча погасла, желание загадано' : 'Задуть свечу нажатием'
          }
        >
          <span className="candle-halo" aria-hidden="true" />
          <span className="candle-flame" aria-hidden="true" />
          <span className="candle-smoke" aria-hidden="true" />
          <span className="candle-wick" aria-hidden="true" />
          <span className="candle-wax" aria-hidden="true">
            <span>18</span>
          </span>
          <span className="candle-saucer" aria-hidden="true" />
        </button>
        <p id="wish-promise" aria-live="polite">
          {blown ? (
            <>
              Свечка погасла, а твоё желание осталось среди звёзд.
              <br />
              Пусть это маленькое чудо бережёт твою улыбку.
              <br />Я люблю тебя, моя девочка.
            </>
          ) : (
            <>
              Подумай о том, чего тебе хочется больше всего.
              <br />
              Потом коснись свечки, чтобы задуть её.
              <br />
              Или разреши микрофон и подуй по-настоящему.
            </>
          )}
        </p>
        {!blown && (
          <>
            <button className="wish-keep" onClick={extinguish}>
              Задуть свечу <span>♡</span>
            </button>
            <button
              className="text-button candle-microphone"
              disabled={
                microphone.status === 'requesting' ||
                microphone.status === 'listening'
              }
              onClick={() => void microphone.start()}
            >
              {microphone.status === 'requesting'
                ? 'Ожидаю разрешение…'
                : microphone.status === 'listening'
                  ? 'Теперь подуй на свечку…'
                  : 'Задуть дыханием через микрофон'}
            </button>
            <p className="candle-hint" role="status">
              {microphone.status === 'unavailable'
                ? 'Микрофон недоступен. Просто коснись свечки, чудо всё равно случится.'
                : microphone.status === 'listening'
                  ? 'Микрофон включён только для этого мгновения. Запись не сохраняется.'
                  : 'Нажатие работает и без микрофона.'}
            </p>
          </>
        )}
        {blown && birthdayGuitarMelody && (
          <div className="wish-guitar">
            <p role="status">
              {melodyError
                ? 'Запись не удалось включить. Моё видео ждёт тебя в конце истории.'
                : melodyPlaying
                  ? 'Моя Алина, эта мелодия на гитаре звучит для тебя. С днём рождения. Твой Никита ♡'
                  : needsTap
                    ? 'Моя Алина, коснись кнопки, я сыграю для тебя на гитаре ♡'
                    : 'Маленькая гитарная мелодия для моей Алины ♡'}
            </p>
            {!melodyError && (
              <button
                className="text-button"
                onClick={() => {
                  if (melodyPlaying) melody.current?.pause();
                  else playMelody();
                }}
              >
                {melodyPlaying
                  ? 'Приостановить мелодию'
                  : 'Послушать мелодию Никиты'}{' '}
                <span>♫</span>
              </button>
            )}
          </div>
        )}
        {blown && (
          <button
            className="wish-keep wish-album-cta"
            autoFocus
            onClick={() => {
              close();
              onAlbum();
            }}
          >
            Открыть альбом Иксика <span>→</span>
          </button>
        )}
        <span className="wish-autograph">Твой Никита ♡</span>
      </div>
    </dialog>
  );
}
