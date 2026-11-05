import { useEffect, useRef, useState } from 'react';
import type { CSSProperties } from 'react';
import './wish.css';

interface WishMomentProps {
  open: boolean;
  onClose: () => void;
}

export function WishMoment({ open, onClose }: WishMomentProps) {
  const dialog = useRef<HTMLDialogElement>(null);
  const [stars] = useState(() =>
    Array.from({ length: 65 }, (_, id) => ({
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

  useEffect(() => {
    if (open && !dialog.current?.open) dialog.current?.showModal();
    else if (!open && dialog.current?.open) dialog.current.close();
  }, [open]);

  return (
    <dialog
      ref={dialog}
      className="wish-dialog"
      onClose={onClose}
      aria-labelledby="wish-title"
      aria-describedby="wish-promise"
    >
      <div className="wish-universe">
        <div className="wish-stars" aria-hidden="true">
          {stars.map((star) => (
            <span key={star.id} style={star.style} />
          ))}
        </div>
        <div className="wish-shooting-star" aria-hidden="true" />
        <div className="wish-orbits" aria-hidden="true">
          <span />
          <span />
          <span />
          <b>♡</b>
        </div>
        <p className="wish-from">ОТ НИКИТЫ · ТВОЕГО ИКСИКА</p>
        <h2 id="wish-title">
          Моя Алина,
          <br />
          <em>желание обязательно сбудется.</em>
        </h2>
        <p id="wish-promise">
          Я оставил для него целое небо звёзд.
          <br />
          Загадай самое заветное и сохрани это мгновение.
          <br />Я люблю тебя, моя девочка.
        </p>
        <button className="wish-keep" autoFocus onClick={onClose}>
          Сохранить это мгновение <span>✧</span>
        </button>
        <span className="wish-autograph">Твой Никита ♡</span>
      </div>
    </dialog>
  );
}
