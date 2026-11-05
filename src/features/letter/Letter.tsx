import { WishMoment } from '../wish/WishMoment';
import './letter.css';
import { useState } from 'react';
import { birthdayContent } from '../../content/birthday';

interface LetterProps {
  onAlbum: () => void;
  onRestart: () => void;
}
export function Letter({ onAlbum, onRestart }: LetterProps) {
  const [wished, setWished] = useState(false);
  const [wishOpen, setWishOpen] = useState(false);
  const [celebration, setCelebration] = useState(0);
  function celebrate() {
    setWished(true);
    setCelebration((value) => value + 1);
    setWishOpen(true);
  }

  return (
    <>
      <div className="step">ОТ НИКИТЫ · ТВОЕГО ИКСИКА</div>
      <div className="envelope" aria-hidden="true">
        ♡
      </div>
      <h2 id="letter-title" tabIndex={-1}>
        Тебе. <em>С любовью.</em>
      </h2>
      <p className="section-description">
        Моя Алина, я люблю тебя.
        <br />В этом письме всё, что я так хочу сказать тебе при встрече.
      </p>
      <article className="letter-paper">
        <time className="letter-date" dateTime="2026-11-08">
          8 ноября 2026
        </time>
        <h3>
          <strong>{birthdayContent.salutation}</strong>
        </h3>
        {birthdayContent.paragraphs.map((paragraph, index) => (
          <p key={index}>{paragraph}</p>
        ))}
        <p className="letter-closing">
          <strong>{birthdayContent.closing}</strong>
        </p>
        <p className="signature">
          {birthdayContent.signature}
          <br />
          {birthdayContent.signatureRole}
          <br />
          <strong>{birthdayContent.signatureName}</strong>
        </p>
        <span className="letter-doodle" aria-hidden="true">
          ♡
        </span>
      </article>
      <p className="ending">
        Моя Алина, я люблю тебя. Как же я жду, когда смогу сказать это, глядя
        тебе в глаза. Иксик
      </p>
      <button
        className="primary wish-trigger"
        aria-haspopup="dialog"
        onClick={celebrate}
      >
        Загадать желание <span>✧</span>
      </button>
      <p className="wish-note" aria-live="polite">
        {wished
          ? 'Моя Алина, твоё желание обязательно сбудется. А Никита будет беречь своё: впервые обнять тебя и почувствовать, что ты рядом. Твой Иксик.'
          : 'Загадай желание, Пантерка. Мне так хочется видеть тебя счастливой. Иксик'}
      </p>
      <button className="primary" onClick={onAlbum}>
        Заглянуть в альбом Иксика <span>→</span>
      </button>
      <button className="text-button" onClick={onRestart}>
        Пройти ещё раз ↺
      </button>
      <WishMoment
        key={celebration}
        open={wishOpen}
        onClose={() => setWishOpen(false)}
      />
    </>
  );
}
