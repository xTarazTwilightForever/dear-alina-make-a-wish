import { useEffect, useState } from 'react';
import { chapters } from '../../app/chapters';
import type { Chapter } from '../../app/chapters';
import './bookmarks.css';

const progressKey = 'alina-opened-chapter';

export function useOpenedChapters(chapter: Chapter) {
  const [furthest, setFurthest] = useState(() => {
    try {
      const saved = Number(localStorage.getItem(progressKey));
      return Number.isInteger(saved) && saved >= 0 && saved < chapters.length
        ? saved
        : 0;
    } catch {
      return 0;
    }
  });

  useEffect(() => {
    setFurthest((current) => Math.max(current, chapters.indexOf(chapter)));
  }, [chapter]);

  useEffect(() => {
    try {
      localStorage.setItem(progressKey, String(furthest));
    } catch {
      /* Navigation remains available for this visit without storage. */
    }
  }, [furthest]);

  return furthest;
}

interface ChapterBookmarksProps {
  chapter: Chapter;
  furthest: number;
  turning: boolean;
  wishPending: boolean;
  onSelect: (chapter: Chapter, voice?: boolean) => void;
}

export function ChapterBookmarks({
  chapter,
  furthest,
  turning,
  wishPending,
  onSelect,
}: ChapterBookmarksProps) {
  if (furthest < chapters.indexOf('letter')) return null;
  return (
    <nav
      className="chapter-bookmarks"
      aria-label="Вернуться к любимой странице"
      inert={turning}
    >
      <span>Твои любимые странички ♡</span>
      <div>
        {(
          [
            ['letter', 'Письмо'],
            ['album', 'Альбом'],
            ['ending', 'Голосовое и финал'],
          ] as const
        ).map(([target, label]) => (
          <button
            key={target}
            disabled={
              chapters.indexOf(target) > furthest ||
              (wishPending && target !== 'album')
            }
            aria-current={chapter === target ? 'page' : undefined}
            onClick={() => onSelect(target, target === 'ending')}
          >
            {label}
          </button>
        ))}
      </div>
    </nav>
  );
}
