import './letter.css';
import { useState } from 'react';
import type { CSSProperties } from 'react';
import { birthdayContent } from '../../content/birthday';

interface LetterProps {
  onRestart: () => void;
}
interface ConfettiPiece {
  id: number;
  style: CSSProperties;
  symbol: string;
}

function createConfetti(): ConfettiPiece[] {
  return Array.from({ length: 45 }, (_, id) => ({
    id,
    symbol: ['♡', '✧', '·'][id % 3],
    style: {
      left: `${Math.random() * 100}%`,
      '--duration': `${2 + Math.random() * 3}s`,
      '--drift': `${Math.random() * 160 - 80}px`,
      '--color': ['#b36676', '#c2a569', '#d6a8b2'][id % 3],
      '--size': `${14 + Math.random() * 20}px`,
      animationDelay: `${Math.random() * 0.7}s`,
    } as CSSProperties,
  }));
}

export function Letter({ onRestart }: LetterProps) {
  const [wished, setWished] = useState(false);
  const [pieces, setPieces] = useState<ConfettiPiece[]>([]);
  const [celebration, setCelebration] = useState(0);
  function celebrate() {
    setWished(true);
    setCelebration((value) => value + 1);
    setPieces(
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
        ? []
        : createConfetti(),
    );
  }

  return (
    <>
      <div className="step">ГЛАВА 03 · СЛОВА ДЛЯ ТЕБЯ</div>
      <div className="envelope" aria-hidden="true">
        ♡
      </div>
      <h2 id="letter-title" tabIndex={-1}>
        Тебе. <em>С теплом.</em>
      </h2>
      <p className="section-description">
        Некоторые вещи хочется сказать чуть тише.
        <br />И сохранить чуть дольше.
      </p>
      <article className="letter-paper">
        <time className="letter-date" dateTime="2026-11-08">
          8 ноября 2026
        </time>
        <h3>{birthdayContent.salutation}</h3>
        {birthdayContent.paragraphs.map((paragraph, index) => (
          <p key={index}>{paragraph}</p>
        ))}
        <p className="signature">{birthdayContent.signature}</p>
        <span className="letter-doodle" aria-hidden="true">
          ♡
        </span>
      </article>
      <p className="ending">Пусть твоя новая глава будет очень твоей.</p>
      <button className="primary" onClick={celebrate}>
        Загадать желание <span>✧</span>
      </button>
      <p className="wish-note" aria-live="polite">
        {wished
          ? 'Желание загадано. Пусть у него всё получится ♡'
          : 'Можно не рассказывать. Пусть сбудется.'}
      </p>
      <button className="text-button" onClick={onRestart}>
        Пройти ещё раз ↺
      </button>
      <div id="confetti" aria-hidden="true">
        {pieces.map((piece) => (
          <span
            key={`${celebration}-${piece.id}`}
            className="confetti-piece"
            style={piece.style}
            onAnimationEnd={() =>
              setPieces((current) =>
                current.filter((item) => item.id !== piece.id),
              )
            }
          >
            {piece.symbol}
          </span>
        ))}
      </div>
    </>
  );
}
