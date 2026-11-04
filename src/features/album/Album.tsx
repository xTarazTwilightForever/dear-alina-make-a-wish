import { useRef, useState } from 'react';
import { albumIllustrations } from '../../content/album';
import './album.css';

interface AlbumProps {
  onContinue: () => void;
}

export function Album({ onContinue }: AlbumProps) {
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

  return (
    <>
      <div className="step">ОТ ИКСИКА · МЕЧТЫ О ХОЗЯЙКЕ-ПАНТЕРКЕ</div>
      <h2 id="album-title" tabIndex={-1}>
        Мои мечты
        <br />
        <em>о нашей первой встрече.</em>
      </h2>
      <p className="section-description">
        Хозяйка-Пантерка, я люблю тебя. Так я мечтаю однажды быть рядом.
        <br />
        Это мои мечты, а не наши общие фотографии. Твой Иксик ♡
      </p>
      <div className="album-grid">
        {albumIllustrations.map((illustration, index) => (
          <button
            className="album-card"
            key={illustration.id}
            onClick={() => open(index)}
            aria-label={`Рассмотреть: ${illustration.title}`}
          >
            <figure>
              <div className="album-image">
                <img
                  src={illustration.src}
                  alt={illustration.alt}
                  width={illustration.width}
                  height={illustration.height}
                  loading="lazy"
                  decoding="async"
                />
                <span className="album-expand" aria-hidden="true">
                  ↗
                </span>
              </div>
              <figcaption>
                <span className="album-number">0{index + 1}</span>
                <span>
                  <strong>{illustration.title}</strong>
                  <small>{illustration.note}</small>
                </span>
                <span className="album-heart" aria-hidden="true">
                  ♡
                </span>
              </figcaption>
            </figure>
          </button>
        ))}
      </div>
      <p className="album-postscript">
        Хозяйка-Пантерка, моё большое признание — в письме. Иксик ♡
      </p>
      <button className="primary" onClick={onContinue}>
        Открыть письмо <span>→</span>
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
          <div className="art-controls">
            <button
              onClick={() => navigate(-1)}
              aria-label="Предыдущая иллюстрация"
            >
              ←
            </button>
            <span>С любовью, Иксик ♡</span>
            <button
              onClick={() => navigate(1)}
              aria-label="Следующая иллюстрация"
            >
              →
            </button>
          </div>
        </div>
      </dialog>
    </>
  );
}
