import { CatDialogue } from '../../shared/dialogue/CatDialogue';
import { useEffect, useRef, useState } from 'react';
import { storyPages } from '../../content/story';
import './story.css';

interface StoryProps {
  onContinue: () => void;
}

export function Story({ onContinue }: StoryProps) {
  const [page, setPage] = useState(0);
  const heading = useRef<HTMLHeadingElement>(null);
  const current = storyPages[page];

  useEffect(() => {
    if (page > 0) {
      heading.current?.focus({ preventScroll: true });
      window.scrollTo({ top: 0, behavior: 'instant' });
    }
  }, [page]);

  return (
    <>
      <div className="step">ПРОЛОГ · ТИШКА ЗНАЕТ СЕКРЕТ</div>
      <div className="story-layout" key={page}>
        <figure className="story-photo" key={current.photo}>
          <img src={current.photo} alt={current.alt} decoding="async" />
          <figcaption>
            {current.caption} <span aria-hidden="true">♡</span>
            <CatDialogue text={current.dialogue} />
          </figcaption>
        </figure>
        <div className="story-copy">
          <span className="speaker-label">
            ТИШКА · ПЕРЕДАЁТ ПРИЗНАНИЯ ИКСИКА
          </span>
          <h2 ref={heading} id="story-title" tabIndex={-1}>
            {current.title}
          </h2>
          {current.paragraphs.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
          <div
            className="story-pagination"
            aria-label={`Страница ${page + 1} из ${storyPages.length}`}
          >
            {storyPages.map((_, index) => (
              <span
                key={index}
                className={page === index ? 'active' : ''}
                aria-hidden="true"
              />
            ))}
          </div>
          <button
            className="primary"
            onClick={() =>
              page === storyPages.length - 1
                ? onContinue()
                : setPage((value) => value + 1)
            }
          >
            {page === storyPages.length - 1
              ? 'Открыть признания Иксика'
              : page === 0
                ? 'Какое дело, Тишка?'
                : 'Расскажи, куда идти'}{' '}
            <span>→</span>
          </button>
          {page > 0 && (
            <button
              className="text-button"
              onClick={() => setPage((value) => value - 1)}
            >
              Предыдущая страница
            </button>
          )}
        </div>
      </div>
    </>
  );
}
