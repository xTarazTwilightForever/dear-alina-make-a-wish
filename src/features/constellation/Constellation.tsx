import { useEffect, useId, useRef, useState } from 'react';
import { alinaStars } from '../../content/constellation';
import { CatDialogue } from '../../shared/dialogue/CatDialogue';
import './constellation.css';

export function Constellation() {
  const [selected, setSelected] = useState<number | null>(null);
  const [opened, setOpened] = useState<readonly number[]>([]);
  const noteId = useId();
  const titleId = useId();
  const note = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (selected === null) return;
    const frame = window.requestAnimationFrame(() => {
      note.current?.scrollIntoView({
        block: 'nearest',
        behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches
          ? 'instant'
          : 'smooth',
      });
    });
    return () => window.cancelAnimationFrame(frame);
  }, [selected]);
  return (
    <section className="constellation" aria-labelledby={titleId}>
      <span className="constellation-eyebrow">МОЯ АЛИНА · МОЯ ALLUKA</span>
      <h3 id={titleId}>
        Созвездие <em>Alluka</em>
      </h3>
      <p className="constellation-intro">
        Моя Алина, эти звёздочки о том, что я люблю в тебе. Коснись каждой, я
        оставил там несколько слов только для тебя.
      </p>
      <div
        className="constellation-sky"
        role="group"
        aria-label="Шесть звёзд Алины"
      >
        <svg
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          {alinaStars.map((star, index) => {
            const next = alinaStars[(index + 1) % alinaStars.length];
            return (
              <line
                key={star.title}
                x1={star.x}
                y1={star.y}
                x2={next.x}
                y2={next.y}
                className={
                  opened.includes(index) &&
                  opened.includes((index + 1) % alinaStars.length)
                    ? 'lit'
                    : ''
                }
              />
            );
          })}
        </svg>
        {alinaStars.map((star, index) => (
          <button
            key={star.title}
            className={`constellation-star${opened.includes(index) ? ' opened' : ''}`}
            style={{ left: `${star.x}%`, top: `${star.y}%` }}
            aria-label={`Звёздочка: ${star.title}`}
            aria-pressed={selected === index}
            aria-controls={noteId}
            onClick={() => {
              setSelected(index);
              setOpened((current) =>
                current.includes(index) ? current : [...current, index],
              );
            }}
          >
            <span aria-hidden="true">✦</span>
            <small>{star.title}</small>
          </button>
        ))}
      </div>
      <div
        ref={note}
        id={noteId}
        className="constellation-note"
        aria-live="polite"
        aria-atomic="true"
      >
        {selected === null ? (
          <p>Выбери звёздочку, моя Алина ♡</p>
        ) : (
          <CatDialogue text={alinaStars[selected].message} />
        )}
      </div>
      <p className="constellation-progress">
        {opened.length === alinaStars.length
          ? 'Alluka, целое маленькое небо о тебе. С любовью, Никита ♡'
          : `Зажглось ${opened.length} из ${alinaStars.length} звёздочек ♡`}
      </p>
    </section>
  );
}
