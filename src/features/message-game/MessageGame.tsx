import { useEffect, useRef, useState } from 'react';
import { loveMessage } from '../../content/story';
import { shuffle } from '../../shared/lib/shuffle';
import { JourneyMap } from '../adventure/JourneyMap';
import './message.css';

interface MessageGameProps {
  onContinue: () => void;
}

export function MessageGame({ onContinue }: MessageGameProps) {
  const [words] = useState(() => {
    const shuffled = shuffle(
      loveMessage.map((word, index) => ({ word, id: index })),
    );
    if (shuffled.every((word, index) => word.id === index)) shuffled.reverse();
    return shuffled;
  });
  const [selected, setSelected] = useState<readonly number[]>([]);
  const [hint, setHint] = useState(false);
  const [complete, setComplete] = useState(false);
  const [message, setMessage] = useState(
    '«Мама, слова Иксика перемешались. Собери его признание по порядку». — Тишка',
  );
  const continueButton = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (complete) continueButton.current?.focus({ preventScroll: true });
  }, [complete]);

  function select(id: number) {
    if (complete || selected.includes(id)) return;
    setSelected((current) => [...current, id]);
  }

  function verify() {
    if (selected.length !== loveMessage.length) return;
    if (selected.every((id, index) => id === index)) {
      setComplete(true);
      setMessage(
        '«Хозяйка-Пантерка, я люблю тебя. Ты мой дом. И я так жду нашей первой встречи». — Иксик',
      );
    } else
      setMessage(
        '«Мама, нажми на слово в письме, чтобы вернуть его вниз, и попробуй другой порядок». — Тишка',
      );
  }

  return (
    <>
      <JourneyMap stage={2} />
      <div className="step">ИСПЫТАНИЕ 03 · ПРИЗНАНИЕ ИКСИКА</div>
      <h2 id="message-title" tabIndex={-1}>
        Семь слов.
        <br />
        <em>И всё — о тебе.</em>
      </h2>
      <p className="section-description">
        Собери из слов маленькое признание белого котика.
        <br />
        Начни с «Хозяйка-Пантерка,», а закончи «дом.».
      </p>
      <div className={`message-paper${complete ? ' message-complete' : ''}`}>
        <span className="message-address">МОЕЙ ХОЗЯЙКЕ-ПАНТЕРКЕ</span>
        <div className="message-slots" aria-label="Собранное признание">
          {selected.map((id, index) => (
            <button
              key={id}
              className="message-word selected"
              disabled={complete}
              aria-label={`Убрать слово ${loveMessage[id]}`}
              onClick={() =>
                setSelected((current) =>
                  current.filter((_, position) => position !== index),
                )
              }
            >
              {loveMessage[id]}
            </button>
          ))}
          {Array.from(
            { length: loveMessage.length - selected.length },
            (_, index) => (
              <span className="message-slot" key={index} aria-hidden="true">
                {selected.length === 0 && index === 0 ? 'Хозяйка…' : '·'}
              </span>
            ),
          )}
        </div>
        <span className="message-signature">Твой Иксик ♡</span>
      </div>
      {!complete && (
        <>
          <div className="word-bank" aria-label="Слова для признания">
            {words.map(({ word, id }) => (
              <button
                key={id}
                className="message-word"
                onClick={() => select(id)}
                disabled={selected.includes(id)}
              >
                {word}
              </button>
            ))}
          </div>
          <button
            className="primary"
            disabled={selected.length !== loveMessage.length}
            onClick={verify}
          >
            Прочитать признание <span>♡</span>
          </button>
          <button
            className="text-button"
            onClick={() => setHint((value) => !value)}
            aria-expanded={hint}
          >
            Попросить подсказку у Тишки
          </button>
          {hint && (
            <p className="message-hint">
              «{loveMessage.join(' ')}»<br />
              <span>
                «Мама, вот слова Иксика в правильном порядке». — Тишка
              </span>
            </p>
          )}
        </>
      )}
      <p className="game-quote" aria-live="polite">
        {message}
      </p>
      {complete && (
        <button ref={continueButton} className="primary" onClick={onContinue}>
          Прочитать признание Иксика <span>→</span>
        </button>
      )}
    </>
  );
}
