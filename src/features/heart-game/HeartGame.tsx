import './game.css';
import { useEffect, useRef, useState } from 'react';
import { birthdayContent } from '../../content/birthday';

const positions = [
  [12, 32],
  [29, 16],
  [45, 34],
  [61, 16],
  [77, 32],
] as const;
interface HeartGameProps {
  onFinish: () => void;
}

export function HeartGame({ onFinish }: HeartGameProps) {
  const [collected, setCollected] = useState<readonly number[]>([]);
  const [message, setMessage] = useState(
    'Каждое сердечко хранит одно маленькое пожелание.',
  );
  const finishButton = useRef<HTMLButtonElement>(null);
  const complete = collected.length === positions.length;

  useEffect(() => {
    if (complete) finishButton.current?.focus({ preventScroll: true });
  }, [complete]);

  function collect(index: number) {
    if (collected.includes(index)) return;
    const next = [...collected, index];
    setCollected(next);
    setMessage(
      next.length === positions.length
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
        Два котика немного разминулись.
        <br />
        Собери пять сердечек, чтобы они встретились.
      </p>
      <div className="game-board">
        <div className="path" aria-hidden="true" />
        <div
          className="mini-cat dark"
          style={{ left: `${4 + collected.length * 12}%` }}
          aria-hidden="true"
        >
          ฅ^•ﻌ•^ฅ
        </div>
        <div className="mini-cat light" aria-hidden="true">
          ฅ^•ﻌ•^ฅ
        </div>
        <div className="hearts">
          {positions.map(([left, top], index) => (
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
          {collected.length} из {positions.length} сердечек
        </span>
        <div
          className="progress"
          role="progressbar"
          aria-label="Собранные сердечки"
          aria-valuemin={0}
          aria-valuemax={positions.length}
          aria-valuenow={collected.length}
        >
          <div
            style={{ width: `${(collected.length / positions.length) * 100}%` }}
          />
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
        {complete ? 'Открыть письмо' : 'Впереди кое-что ещё'} <span>→</span>
      </button>
      <button className="text-button" onClick={onFinish}>
        Сразу к письму
      </button>
    </>
  );
}
