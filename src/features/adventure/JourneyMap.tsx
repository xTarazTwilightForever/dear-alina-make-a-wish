import './journey.css';

const stages = ['Тропа сердечек', 'Мост нежности', 'Признание Иксика'] as const;
interface JourneyMapProps {
  stage: 0 | 1 | 2;
}

export function JourneyMap({ stage }: JourneyMapProps) {
  return (
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
  );
}
