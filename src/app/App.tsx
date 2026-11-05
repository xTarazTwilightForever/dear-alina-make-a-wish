import { ChapterTransition } from '../features/transitions/ChapterTransition';
import { RomanceEffects } from '../features/effects/RomanceEffects';
import { PasswordGate } from '../features/access/PasswordGate';
import { useCallback, useEffect, useRef, useState } from 'react';
import { Welcome } from '../features/welcome/Welcome';
import { Story } from '../features/story/Story';
import { HeartGame } from '../features/heart-game/HeartGame';
import { MemoryGame } from '../features/memory-game/MemoryGame';
import { MessageGame } from '../features/message-game/MessageGame';
import { Album } from '../features/album/Album';
import { Letter } from '../features/letter/Letter';
import { useMusic } from '../features/music/useMusic';
import { chapters } from './chapters';
import type { Chapter } from './chapters';

export function App() {
  const [chapter, setChapter] = useState<Chapter>('intro');
  const [destination, setDestination] = useState<Chapter | null>(null);
  const turning = useRef(false);
  const [unlocked, setUnlocked] = useState(false);
  const [wishGranted, setWishGranted] = useState(() => {
    try {
      return sessionStorage.getItem('alina-wish-made') === 'yes';
    } catch {
      return false;
    }
  });
  const grantWish = useCallback(() => {
    setWishGranted(true);
    try {
      sessionStorage.setItem('alina-wish-made', 'yes');
    } catch {
      /* Keep this visit usable without storage. */
    }
  }, []);
  const unlock = useCallback(() => setUnlocked(true), []);
  const section = useRef<HTMLElement>(null);
  const initialized = useRef(false);
  useMusic();

  const navigate = useCallback(
    (next: Chapter) => {
      if (turning.current || next === chapter) return;
      turning.current = true;
      setDestination(next);
    },
    [chapter],
  );

  useEffect(() => {
    if (!destination) return;
    const reduced = window.matchMedia(
      '(prefers-reduced-motion: reduce)',
    ).matches;
    const covered = window.setTimeout(
      () => setChapter(destination),
      reduced ? 0 : 420,
    );
    const finished = window.setTimeout(
      () => {
        turning.current = false;
        setDestination(null);
      },
      reduced ? 120 : 1800,
    );
    return () => {
      window.clearTimeout(covered);
      window.clearTimeout(finished);
    };
  }, [destination]);

  useEffect(() => {
    if (!initialized.current) {
      initialized.current = true;
      return;
    }
    if (destination) return;
    window.scrollTo({ top: 0, behavior: 'instant' });
    section.current
      ?.querySelector<HTMLElement>('h1,h2')
      ?.focus({ preventScroll: true });
  }, [chapter, unlocked, destination]);

  if (!unlocked)
    return (
      <>
        <RomanceEffects />
        <PasswordGate onUnlock={unlock} />
      </>
    );

  return (
    <>
      <RomanceEffects />
      <div className="paper-grain" aria-hidden="true" />
      {destination && <ChapterTransition destination={destination} />}
      <header inert={destination !== null}>
        <button
          className="wordmark"
          disabled={chapter === 'letter' && wishGranted}
          onClick={() => navigate('intro')}
          aria-label="Вернуться к началу"
        >
          Моя дорогая Алина
        </button>
        <time className="header-date" dateTime="2026-11-08">
          8 ноября 2026
        </time>
      </header>
      <main inert={destination !== null}>
        <section
          ref={section}
          key={chapter}
          className={`screen ${chapter === 'intro' ? 'intro' : `${chapter}-screen`}`}
          aria-labelledby={`${chapter}-title`}
        >
          <div className="page-turn-hearts" aria-hidden="true">
            ✧ ♡ ✧
          </div>
          {chapter === 'intro' && <Welcome onStart={() => navigate('story')} />}
          {chapter === 'story' && <Story onContinue={() => navigate('game')} />}
          {chapter === 'game' && (
            <HeartGame onFinish={() => navigate('memory')} />
          )}
          {chapter === 'memory' && (
            <MemoryGame onContinue={() => navigate('message')} />
          )}
          {chapter === 'message' && (
            <MessageGame onContinue={() => navigate('letter')} />
          )}
          {chapter === 'album' && (
            <Album onContinue={() => navigate('letter')} />
          )}
          {chapter === 'letter' && (
            <Letter
              onAlbum={() => navigate('album')}
              wishGranted={wishGranted}
              onWishGranted={grantWish}
            />
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
