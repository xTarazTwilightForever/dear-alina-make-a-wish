import './game.css';
import { CatCharacter } from '../../shared/characters/CatCharacter';
import { collectHeart, getJourneyProgress, heartPositions } from './model';
import { useEffect, useRef, useState } from 'react';
import { birthdayContent } from '../../content/birthday';

interface HeartGameProps {
  onFinish: () => void;
}

export function HeartGame({ onFinish }: HeartGameProps) {
  const [collected, setCollected] = useState<readonly number[]>([]);
  const [message, setMessage] = useState(
    'Каждое сердечко хранит одно маленькое пожелание.',
  );
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
    setMessage(
      next.length === heartPositions.length
        ? 'Нашлись. Вместе всегда немного теплее ♡'
        : birthdayContent.wishes[index],
    );
  }

  return (
    <>
      <div className="step">ГЛАВА 01 · НАЙТИ ДРУГ ДРУГА</div>
      <h2 id="game-title" tabIndex={-1}>
        У счастья есть
        <br />
        <em>маленькие лапки.</em>
      </h2>
      <p className="section-description">
        Он уже ждёт её на другом конце дорожки.
        <br />
        Помоги кошечке дойти до своего белого котика.
      </p>
      <div
        className={`game-board${complete ? ' game-board-complete' : ''}`}
        aria-label={
          complete
            ? 'Кошечка добралась до белого котика'
            : 'Кошечка идёт к белому котику'
        }
      >
        <div className="path" aria-hidden="true" />
        <div
          className="journey-character journey-character-alina"
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
              style={{
                left: `${left}%`,
                top: `${top}%`,
                animationDelay: `-${index * 0.5}s`,
              }}
              aria-label={`Собрать сердечко ${index + 1}`}
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
      <p className="heart-message" aria-live="polite">
        {message}
      </p>
      <button
        ref={finishButton}
        className="primary"
        disabled={!complete}
        onClick={onFinish}
      >
        {complete ? 'Посмотреть наш маленький мир' : 'Впереди кое-что ещё'}{' '}
        <span>→</span>
      </button>
      <button className="text-button" onClick={onFinish}>
        Продолжить без игры
      </button>
    </>
  );
}
