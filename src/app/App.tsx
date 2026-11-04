import { useEffect, useRef, useState } from 'react';
import { Welcome } from '../features/welcome/Welcome';
import { Story } from '../features/story/Story';
import { HeartGame } from '../features/heart-game/HeartGame';
import { MemoryGame } from '../features/memory-game/MemoryGame';
import { MessageGame } from '../features/message-game/MessageGame';
import { Reunion } from '../features/reunion/Reunion';
import { Album } from '../features/album/Album';
import { Letter } from '../features/letter/Letter';
import { useMusic } from '../features/music/useMusic';
import { chapters } from './chapters';
import type { Chapter } from './chapters';

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
          маленькое чудо<span> для Хозяйки-Пантерки</span>
        </button>
        <div
          className={`music-status${music.status === 'playing' ? ' is-playing' : ''}`}
          role="status"
        >
          <span className="music-notes" aria-hidden="true">
            ♫
          </span>
          <span>
            {music.status === 'playing'
              ? 'наша мелодия'
              : music.status === 'unavailable'
                ? 'коснись открытки ♡'
                : 'история с музыкой'}
          </span>
        </div>
      </header>
      <main>
        <section
          ref={section}
          key={chapter}
          className={`screen ${chapter === 'intro' ? 'intro' : `${chapter}-screen`}`}
          aria-labelledby={`${chapter}-title`}
        >
          {chapter === 'intro' && (
            <Welcome onStart={() => setChapter('story')} />
          )}
          {chapter === 'story' && (
            <Story onContinue={() => setChapter('game')} />
          )}
          {chapter === 'game' && (
            <HeartGame onFinish={() => setChapter('memory')} />
          )}
          {chapter === 'memory' && (
            <MemoryGame onContinue={() => setChapter('message')} />
          )}
          {chapter === 'message' && (
            <MessageGame onContinue={() => setChapter('reunion')} />
          )}
          {chapter === 'reunion' && (
            <Reunion onContinue={() => setChapter('album')} />
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
        <span>Признание Иксика в любви к Алине ♡</span>
        <span>
          {String(chapters.indexOf(chapter) + 1).padStart(2, '0')} /{' '}
          {String(chapters.length).padStart(2, '0')}
        </span>
      </footer>
    </>
  );
}
