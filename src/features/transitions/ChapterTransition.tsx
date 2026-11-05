import { CatCharacter } from '../../shared/characters/CatCharacter';
import type { Chapter } from '../../app/chapters';
import './transitions.css';

interface ChapterTransitionProps {
  destination: Chapter;
}

const captions: Record<Chapter, { title: string; message: string }> = {
  intro: {
    title: 'Начнём нашу историю снова',
    message: 'Мама, я покажу дорогу с самого начала.',
  },
  story: {
    title: 'У Тишки есть секрет',
    message: 'Мама, у меня важное поручение от Никиты. То есть от Иксика!',
  },
  game: {
    title: 'Тропа сердечек',
    message: 'Мама, пойдём за мной. Вот где Иксик оставил первые послания.',
  },
  memory: {
    title: 'Мост нежности',
    message:
      'Мама, Тропа сердечек позади. Теперь найдём пары на Мосту нежности.',
  },
  message: {
    title: 'Признание Иксика',
    message:
      'Мы прошли Мост нежности, мама. Осталось собрать его самые важные слова.',
  },
  letter: {
    title: 'Письмо для моей Алины',
    message:
      'Мама, всё получилось. Сейчас откроется письмо Никиты. Ой, Иксика, конечно.',
  },
  album: {
    title: 'Маленький альбом Иксика',
    message:
      'Мама, давай посмотрим, что ещё он приготовил для тебя. Я пойду рядом.',
  },
};

export function ChapterTransition({ destination }: ChapterTransitionProps) {
  const caption = captions[destination];
  return (
    <div
      className="chapter-transition"
      role="status"
      aria-live="polite"
      aria-label={caption.title}
    >
      <div className="chapter-turn-sheet" aria-hidden="true" />
      <div className="chapter-guide">
        <span className="chapter-guide-stars" aria-hidden="true">
          ✧ ♡ ✧
        </span>
        <div className="chapter-guide-kitten">
          <CatCharacter character="dark" />
        </div>
        <span className="chapter-guide-name">ТИШКА ПОКАЗЫВАЕТ ДОРОГУ</span>
        <h2>{caption.title}</h2>
        <p>{caption.message}</p>
        <div className="chapter-paw-trail" aria-hidden="true">
          <span>♡</span>
          <span>♡</span>
          <span>♡</span>
        </div>
      </div>
    </div>
  );
}
