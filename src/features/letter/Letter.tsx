import signatureImage from '../../assets/personal/nikita-signature.png';
import { WishMoment } from '../wish/WishMoment';
import './letter.css';
import { useState } from 'react';
import { birthdayContent } from '../../content/birthday';
import { useDaysSinceMeeting } from './useDaysSinceMeeting';

interface LetterProps {
  onAlbum: () => void;
  wishGranted: boolean;
  onWishGranted: () => void;
}
export function Letter({ onAlbum, wishGranted, onWishGranted }: LetterProps) {
  const { elapsed, dayLabel } = useDaysSinceMeeting();
  const [wishOpen, setWishOpen] = useState(false);
  const [celebration, setCelebration] = useState(0);
  function celebrate() {
    if (wishGranted) return;
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
      <article className="letter-paper" aria-label="Личное письмо Никиты Алине">
        <div className="letter-stationery-head">
          <span className="letter-sender">
            ЛИЧНОЕ ПИСЬМО
            <br />
            <strong>От Никиты, для Алины</strong>
          </span>
          <time className="letter-date" dateTime="2026-11-08">
            8 ноября 2026
          </time>
        </div>
        <div className="letter-rule" aria-hidden="true" />
        <h3 className="letter-salutation">
          <strong>{birthdayContent.salutation.replace('❤️', '').trim()}</strong>
          <span aria-hidden="true">♡</span>
        </h3>
        <div className="meeting-clock">
          <p className="meeting-clock-title">
            С того самого первого приветствия ♡
          </p>
          <div className="meeting-clock-values" role="timer" aria-live="off">
            {(
              [
                ['days', 'дней'],
                ['hours', 'часов'],
                ['minutes', 'минут'],
                ['seconds', 'секунд'],
              ] as const
            ).map(([unit, label]) => (
              <span key={unit}>
                <strong>{String(elapsed[unit]).padStart(2, '0')}</strong>
                <small>{label}</small>
              </span>
            ))}
          </div>
          <time dateTime="2026-11-01T11:10:00+05:00">
            1 ноября 2026 · 11:10 · Павлодар
          </time>
        </div>
        <div className="letter-body">
          {birthdayContent.paragraphs.map((paragraph, index) => (
            <p key={index}>
              {paragraph.replace('{daysSinceMeeting}', dayLabel)}
            </p>
          ))}
        </div>
        <p className="letter-closing">
          <strong>{birthdayContent.closing}</strong>
        </p>
        <div className="letter-signoff">
          <p className="signature-intro">
            {birthdayContent.signature}
            <br />
            {birthdayContent.signatureRole}
          </p>
          <p className="signature-name">{birthdayContent.signatureName}</p>
          <div className="signature-ink">
            <img
              src={signatureImage}
              width="3440"
              height="1440"
              alt="Личная подпись Никиты"
            />
          </div>
        </div>
        <p className="letter-postscript">
          P. S. Моя Алина, я очень жду нашей первой встречи.
        </p>
      </article>
      <p className="ending">
        Моя Алина, я люблю тебя. Как же я жду, когда смогу сказать это, глядя
        тебе в глаза. Иксик
      </p>
      <button
        className="primary wish-trigger"
        aria-haspopup="dialog"
        onClick={celebrate}
        disabled={wishGranted}
      >
        {wishGranted ? 'Желание загадано' : 'Загадать желание'} <span>✧</span>
      </button>
      <p className="wish-note" aria-live="polite">
        {wishGranted
          ? 'Моя Алина, твоё желание обязательно сбудется. А Никита будет беречь своё: впервые обнять тебя и почувствовать, что ты рядом. Твой Иксик.'
          : 'Загадай желание, Пантерка. Мне так хочется видеть тебя счастливой. Иксик'}
      </p>
      <button
        className="primary album-continue"
        disabled={!wishGranted}
        onClick={onAlbum}
      >
        Заглянуть в альбом Иксика <span>→</span>
      </button>
      {!wishGranted && (
        <p className="game-help">
          Загадай желание и задуй свечку, чтобы открыть альбом.
        </p>
      )}
      <WishMoment
        key={celebration}
        open={wishOpen}
        onClose={() => setWishOpen(false)}
        onComplete={onWishGranted}
        onAlbum={onAlbum}
      />
    </>
  );
}
