import { useState } from 'react';
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
  const [message, setMessage] = useState(
    'Мама, мы добрались до Признания Иксика. Собери слова по порядку, и откроется его письмо. Тишка',
  );

  function isComplete(ids: readonly number[]) {
    return (
      ids.length === loveMessage.length &&
      ids.every((id, index) => id === index)
    );
  }

  function select(id: number) {
    if (selected.includes(id)) return;
    const next = [...selected, id];
    setSelected(next);
    if (isComplete(next)) onContinue();
  }

  function verify() {
    if (isComplete(selected)) onContinue();
    else
      setMessage(
        'Мама, кажется, слова немного перепутались. Нажми на слово в письме, чтобы вернуть его вниз. Если захочешь, я подскажу. Тишка',
      );
  }

  return (
    <>
      <JourneyMap stage={2} />
      <div className="step">ЛОКАЦИЯ 03 · ПРИЗНАНИЕ ИКСИКА</div>
      <h2 id="message-title" tabIndex={-1}>
        Несколько слов.
        <br />
        <em>Вся моя любовь.</em>
      </h2>
      <p className="section-description">
        Собери признание Иксика, чтобы открыть его письмо.
        <br />
        Начни с Моя Алина,, а закончи дом..
      </p>
      <div className="message-paper">
        <span className="message-address">МОЕЙ АЛИНЕ, С ЛЮБОВЬЮ</span>
        <div className="message-slots" aria-label="Собранное признание">
          {selected.map((id, index) => (
            <button
              key={id}
              className="message-word selected"
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
        Открыть письмо Иксика <span>♡</span>
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
          {loveMessage.join(' ')}
          <br />
          <span>
            Мама, вот как Никита хотел сказать… ой, Иксик, конечно. Тишка
          </span>
        </p>
      )}
      <p className="game-quote" aria-live="polite">
        {message}
      </p>
    </>
  );
}
