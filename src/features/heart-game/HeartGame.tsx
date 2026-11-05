import './game.css';
import { CatCharacter } from '../../shared/characters/CatCharacter';
import { collectHeart, getJourneyProgress, heartPositions } from './model';
import { useEffect, useRef, useState } from 'react';
import type { CSSProperties } from 'react';
import { trailConfessions, heartPalette } from '../../content/story';
import { JourneyMap } from '../adventure/JourneyMap';

interface HeartGameProps {
  onFinish: () => void;
}

export function HeartGame({ onFinish }: HeartGameProps) {
  const [collected, setCollected] = useState<readonly number[]>([]);
  const [message, setMessage] = useState(
    'Мама, мы на Тропе сердечек. В каждом огоньке тебя ждёт признание Иксика. Тишка',
  );
  const [activeHeart, setActiveHeart] = useState<number | null>(null);
  const finishButton = useRef<HTMLButtonElement>(null);
  const { complete, progress, travelerPosition, companionPosition } =
    getJourneyProgress(collected.length);

  useEffect(() => {
    if (complete) finishButton.current?.focus({ preventScroll: true });
  }, [complete]);

  function collect(index: number) {
    const next = collectHeart(collected, index);
    if (next === collected) return;
    setCollected(next);
    setActiveHeart(index);
    setMessage(trailConfessions[index]);
  }

  return (
    <>
      <JourneyMap stage={0} />
      <div className="step">ЛОКАЦИЯ 01 · ТРОПА СЕРДЕЧЕК</div>
      <h2 id="game-title" tabIndex={-1}>
        У счастья есть
        <br />
        <em>маленькие лапки.</em>
      </h2>
      <p className="section-description">
        Мама, вот и Тропа сердечек. Иксик оставил здесь свои послания. Тишка
        <br />
        Открой пять сердечек и прочитай его признания в любви.
      </p>
      <div
        className={`game-board${complete ? ' game-board-complete' : ''}`}
        aria-label={
          complete
            ? 'Тишка помог маме открыть признания Иксика'
            : 'Тишка показывает маме тропу признаний белого Иксика'
        }
      >
        <div className="path" aria-hidden="true" />
        <div
          className="journey-character journey-character-tishka"
          style={{ left: `${travelerPosition}%` }}
          aria-hidden="true"
        >
          <CatCharacter character="dark" />
        </div>
        <div
          className="journey-character journey-character-white"
          style={{ left: `${companionPosition}%` }}
          aria-hidden="true"
        >
          <CatCharacter character="white" />
        </div>
        <div className="hearts">
          {heartPositions.map(([left, top], index) => (
            <button
              key={index}
              className={`heart${collected.includes(index) ? ' collected' : ''}`}
              style={
                {
                  left: `${left}%`,
                  top: `${top}%`,
                  animationDelay: `-${index * 0.5}s`,
                  '--heart-color': heartPalette[index].color,
                } as CSSProperties
              }
              aria-label={`Собрать ${heartPalette[index].name} сердечко ${index + 1}`}
              disabled={collected.includes(index)}
              onClick={() => collect(index)}
            >
              ♡
            </button>
          ))}
        </div>
        <span className="board-star" aria-hidden="true">
          ✧
        </span>
        <div className="board-ground" />
      </div>
      <div className="game-status">
        <span>
          {collected.length} из {heartPositions.length} сердечек
        </span>
        <div
          className="progress"
          role="progressbar"
          aria-label="Собранные сердечки"
          aria-valuemin={0}
          aria-valuemax={heartPositions.length}
          aria-valuenow={collected.length}
        >
          <div style={{ width: `${progress * 100}%` }} />
        </div>
      </div>
      <p
        className="heart-message"
        aria-live="polite"
        style={
          activeHeart === null
            ? undefined
            : { color: heartPalette[activeHeart].color }
        }
      >
        {message}
      </p>
      <button
        ref={finishButton}
        className="primary"
        disabled={!complete}
        onClick={onFinish}
      >
        {complete ? 'На Мост нежности' : 'Впереди кое-что ещё'} <span>→</span>
      </button>
      <p className="game-help">
        За Тропой сердечек начинается Мост нежности. Там ждут новые послания
        Иксика.
      </p>
    </>
  );
}
