import { TalkingCat } from '../../shared/characters/TalkingCat';
import './journey.css';

const stages = ['Тропа сердечек', 'Мост нежности', 'Признание Иксика'] as const;
interface JourneyMapProps {
  stage: 0 | 1 | 2;
}

export function JourneyMap({ stage }: JourneyMapProps) {
  return (
    <>
      <aside className="tishka-guide" aria-label="Подсказка Тишки">
        <span className="tishka-guide-avatar">
          <TalkingCat character="dark" />
        </span>
        <span>
          <strong>Тишка рядом</strong>
          <span>
            {
              [
                'Мама, мы на Тропе сердечек. Я помогу найти послания Иксика.',
                'Мама, вот Мост нежности. Давай найдём все пары вместе.',
                'Мама, это Признание Иксика. Ещё немного, и откроем его письмо.',
              ][stage]
            }
          </span>
        </span>
      </aside>
      <ol className="journey-map" aria-label="Путь к Иксику">
        {stages.map((label, index) => (
          <li
            key={label}
            className={
              index === stage ? 'current' : index < stage ? 'completed' : ''
            }
            aria-current={index === stage ? 'step' : undefined}
          >
            <span aria-hidden="true">
              {index < stage ? '♡' : `0${index + 1}`}
            </span>
            <span>{label}</span>
          </li>
        ))}
      </ol>
    </>
  );
}
