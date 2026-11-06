import { useEffect, useId, useRef, useState } from 'react';
import type { CSSProperties } from 'react';
import { alinaStars, constellationLinks } from '../../content/constellation';
import { CatDialogue } from '../../shared/dialogue/CatDialogue';
import './constellation.css';

export function Constellation() {
  const [selected, setSelected] = useState<number | null>(null);
  const [opened, setOpened] = useState<readonly number[]>([]);
  const noteId = useId();
  const titleId = useId();
  const note = useRef<HTMLDivElement>(null);
  const sky = useRef<HTMLDivElement>(null);
  const [revealed, setRevealed] = useState(false);
  useEffect(() => {
    if (!sky.current) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setRevealed(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 },
    );
    observer.observe(sky.current);
    return () => observer.disconnect();
  }, []);
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
      <p className="constellation-zodiac">
        <span aria-hidden="true">♏</span> 8 ноября · Моя любимая
        девочка-Скорпион
      </p>
      <p className="constellation-intro">
        Моя Алина, эти звёзды сложились в букву А, первую букву твоего имени и
        ника Alluka. Коснись каждой, я оставил там несколько слов только для
        тебя.
      </p>
      <div
        ref={sky}
        className={`constellation-sky${revealed ? ' is-visible' : ''}`}
        role="group"
        aria-label="Шесть звёзд в форме буквы А, первой буквы имени Алины"
      >
        <svg
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          {constellationLinks.map(([from, to], index) => {
            const star = alinaStars[from];
            const next = alinaStars[to];
            return (
              <line
                key={`${from}-${to}`}
                pathLength={1}
                style={{ animationDelay: `${index * 0.18}s` }}
                x1={star.x}
                y1={star.y}
                x2={next.x}
                y2={next.y}
                className={
                  opened.includes(from) && opened.includes(to) ? 'lit' : ''
                }
              />
            );
          })}
        </svg>
        {alinaStars.map((star, index) => (
          <button
            key={star.title}
            className={`constellation-star${opened.includes(index) ? ' opened' : ''}`}
            style={
              {
                left: `${star.x}%`,
                top: `${star.y}%`,
                '--twinkle-delay': `${index * -0.6}s`,
              } as CSSProperties
            }
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
            <small aria-hidden="true">
              {String(index + 1).padStart(2, '0')}
            </small>
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
          <>
            <strong className="constellation-note-title">
              {alinaStars[selected].title}
            </strong>
            <CatDialogue text={alinaStars[selected].message} />
          </>
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
