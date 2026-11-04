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
    '«Он так волновался, мама хозяйка, что перепутал все слова. Давай соберём их вместе?»',
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
        '«Вот что он хотел сказать! Хозяйка, рядом с тобой и правда хочется быть дома. Пойдём, он совсем близко». — Тишка',
      );
    } else
      setMessage(
        '«Почти, мама хозяйка. Нажми на слово в письме, чтобы вернуть его вниз, и попробуй другой порядок. Мы никуда не спешим». — Тишка',
      );
  }

  return (
    <>
      <JourneyMap stage={2} />
      <div className="step">ИСПЫТАНИЕ 03 · ПРИЗНАНИЕ ИКСИКА</div>
      <h2 id="message-title" tabIndex={-1}>
        Шесть слов.
        <br />
        <em>И всё — о тебе.</em>
      </h2>
      <p className="section-description">
        Собери из слов маленькое признание белого котика.
        <br />
        Начни с «Моя», а закончи «дома.».
      </p>
      <div className={`message-paper${complete ? ' message-complete' : ''}`}>
        <span className="message-address">САМОЙ ЛЮБИМОЙ ХОЗЯЙКЕ</span>
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
                {selected.length === 0 && index === 0 ? 'Моя…' : '·'}
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
                Тишка шепчет совсем тихо. Это наш секрет, мама хозяйка.
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
          Иксик, мы пришли <span>→</span>
        </button>
      )}
    </>
  );
}
