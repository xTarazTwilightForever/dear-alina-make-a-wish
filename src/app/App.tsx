import { useEffect, useRef, useState } from 'react';
import { Welcome } from '../features/welcome/Welcome';
import { HeartGame } from '../features/heart-game/HeartGame';
import { Album } from '../features/album/Album';
import { Letter } from '../features/letter/Letter';
import { useMusic } from '../features/music/useMusic';

type Chapter = 'intro' | 'game' | 'album' | 'letter';

export function App() {
  const [chapter, setChapter] = useState<Chapter>('intro');
  const section = useRef<HTMLElement>(null);
  const initialized = useRef(false);
  const music = useMusic();

  useEffect(() => {
    if (!initialized.current) {
      initialized.current = true;
      return;
    }
    window.scrollTo({ top: 0, behavior: 'instant' });
    section.current
      ?.querySelector<HTMLElement>('h1,h2')
      ?.focus({ preventScroll: true });
  }, [chapter]);

  return (
    <>
      <div className="paper-grain" aria-hidden="true" />
      <header>
        <button
          className="wordmark"
          onClick={() => setChapter('intro')}
          aria-label="Вернуться к началу"
        >
          маленькое чудо<span> для Алины</span>
        </button>
        <button
          className="sound"
          onClick={() => void music.toggle()}
          aria-label={music.playing ? 'Выключить музыку' : 'Включить музыку'}
          aria-pressed={music.playing}
        >
          <span aria-hidden="true">♫</span>
          <span>
            {music.unavailable
              ? 'звук недоступен'
              : music.playing
                ? 'музыка играет'
                : 'без музыки'}
          </span>
        </button>
      </header>
      <main>
        <section
          ref={section}
          key={chapter}
          className={`screen ${chapter === 'intro' ? 'intro' : `${chapter}-screen`}`}
          aria-labelledby={`${chapter}-title`}
        >
          {chapter === 'intro' && (
            <Welcome onStart={() => setChapter('game')} />
          )}
          {chapter === 'game' && (
            <HeartGame onFinish={() => setChapter('album')} />
          )}
          {chapter === 'album' && (
            <Album onContinue={() => setChapter('letter')} />
          )}
          {chapter === 'letter' && (
            <Letter onRestart={() => setChapter('intro')} />
          )}
        </section>
      </main>
      <footer>
        <span>8 / 11 / 2026</span>
        <span>маленький сайт. много тепла. ♡</span>
        <span>для тебя</span>
      </footer>
    </>
  );
}
