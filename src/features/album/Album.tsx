import { CatDialogue } from '../../shared/dialogue/CatDialogue';
import { useRef, useState } from 'react';
import type { CSSProperties } from 'react';
import {
  albumIllustrations,
  priorityIllustrationCount,
  diaryYear,
  futureDiaryPages,
} from '../../content/album';
import './album.css';

interface AlbumProps {
  onFinish: () => void;
}

export function Album({ onFinish }: AlbumProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const dialog = useRef<HTMLDialogElement>(null);
  const active = albumIllustrations[activeIndex];

  function open(index: number) {
    setActiveIndex(index);
    dialog.current?.showModal();
  }

  function navigate(direction: number) {
    setActiveIndex(
      (index) =>
        (index + direction + albumIllustrations.length) %
        albumIllustrations.length,
    );
  }

  function renderCard(index: number) {
    const illustration = albumIllustrations[index];
    return (
      <button
        key={illustration.id}
        className={`album-card${illustration.priority ? ' album-card-priority' : ''}${illustration.main ? ' album-card-main' : ''}`}
        style={
          {
            '--reveal-delay': `${Math.min(index, 8) * 0.045}s`,
          } as CSSProperties
        }
        onClick={() => open(index)}
        aria-label={`Рассмотреть: ${illustration.title}`}
      >
        <figure>
          <div className="album-image">
            {illustration.main && (
              <span className="album-main-label">Самое главное ♡</span>
            )}
            {illustration.priority && (
              <span className="album-new">Новая страничка ♡</span>
            )}
            <img
              src={illustration.src}
              alt={illustration.alt}
              width={illustration.width}
              height={illustration.height}
              loading="lazy"
              decoding="async"
            />
            <span className="album-message-cue">Послание Никиты ниже ♡</span>
            <span className="album-expand" aria-hidden="true">
              ↗
            </span>
          </div>
          <figcaption>
            <span className="album-number">
              {String(index + 1).padStart(2, '0')}
            </span>
            <span>
              <strong>{illustration.title}</strong>
              <small>{illustration.note}</small>
            </span>
            <span className="album-heart" aria-hidden="true">
              ♡
            </span>
          </figcaption>
          <CatDialogue text={illustration.dialogue} />
        </figure>
      </button>
    );
  }

  return (
    <>
      <div className="step">ОТ ИКСИКА · НАША МАЛЕНЬКАЯ ИСТОРИЯ</div>
      <h2 id="album-title" tabIndex={-1}>
        Дневник Иксика.
        <br />
        <em>Наш {diaryYear} год.</em>
      </h2>
      <p className="section-description">
        Моя Алина, здесь твои истории, которые я бережно запомнил, и мои мечты о
        нас.
        <br />
        Это первые страницы нашего {diaryYear} года. А впереди столько
        воспоминаний, которые мы ещё создадим вместе. Твой Никита, твой Иксик ♡
      </p>
      <div className="album-summary">
        <span>{diaryYear} год</span>
        <span>{albumIllustrations.length} страниц о нас</span>
        <span className="album-summary-heart">♡</span>
        <span>{priorityIllustrationCount} новых страничек</span>
      </div>
      <div className="album-grid">
        {albumIllustrations.map((_, index) => renderCard(index))}
      </div>
      <section className="diary-future" aria-labelledby="diary-future-title">
        <h3 id="diary-future-title">
          А дальше <em>будем мы.</em>
        </h3>
        <p className="diary-future-intro">
          Моя Алина, совсем скоро мы создадим новые воспоминания. Я оставил для
          них место, чтобы наша история продолжалась год за годом.
        </p>
        <div className="diary-future-years">
          {futureDiaryPages.map((page) => (
            <article key={page.year} className="diary-future-page">
              <span className="diary-future-year">{page.year}</span>
              <span aria-hidden="true" className="diary-future-heart">
                ♡
              </span>
              <h4>{page.title}</h4>
              <p>{page.text}</p>
              <small>Место для наших будущих воспоминаний</small>
            </article>
          ))}
        </div>
      </section>
      <p className="album-postscript">
        Моя Алина, я люблю тебя. И верю, что впереди у нас будет много настоящих
        счастливых мгновений. Твой Никита ♡
      </p>
      <button className="primary album-finish" onClick={onFinish}>
        Конец <span>♡</span>
      </button>
      <dialog
        className="art-dialog"
        ref={dialog}
        aria-labelledby="art-title"
        onClick={(event) => {
          if (event.target === event.currentTarget) dialog.current?.close();
        }}
        onKeyDown={(event) => {
          if (event.key === 'ArrowRight') {
            event.preventDefault();
            navigate(1);
          }
          if (event.key === 'ArrowLeft') {
            event.preventDefault();
            navigate(-1);
          }
        }}
      >
        <div className="art-viewer">
          <button
            className="art-close"
            autoFocus
            onClick={() => dialog.current?.close()}
            aria-label="Закрыть иллюстрацию"
          >
            ×
          </button>
          <img
            key={active.id}
            src={active.src}
            alt={active.alt}
            width={active.width}
            height={active.height}
          />
          <div className="art-caption" aria-live="polite">
            <p id="art-title">{active.title}</p>
            <span>
              {activeIndex + 1} / {albumIllustrations.length}
            </span>
          </div>
          <CatDialogue text={active.dialogue} />
          <div className="art-controls">
            <button
              onClick={() => navigate(-1)}
              aria-label="Предыдущая иллюстрация"
            >
              ←
            </button>
            <span>С любовью, Никита ♡</span>
            {activeIndex === albumIllustrations.length - 1 ? (
              <button
                className="art-finish"
                onClick={() => {
                  dialog.current?.close();
                  onFinish();
                }}
              >
                Конец ♡
              </button>
            ) : (
              <button
                onClick={() => navigate(1)}
                aria-label="Следующая иллюстрация"
              >
                →
              </button>
            )}
          </div>
        </div>
      </dialog>
    </>
  );
}
