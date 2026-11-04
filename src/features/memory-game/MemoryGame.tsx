import { useEffect, useRef, useState } from 'react';
import { lovePairs } from '../../content/story';
import { JourneyMap } from '../adventure/JourneyMap';
import { createMemoryDeck } from './model';
import './memory.css';

interface MemoryGameProps {
  onContinue: () => void;
}

export function MemoryGame({ onContinue }: MemoryGameProps) {
  const [deck] = useState(createMemoryDeck);
  const [opened, setOpened] = useState<readonly string[]>([]);
  const [matched, setMatched] = useState<readonly string[]>([]);
  const [moves, setMoves] = useState(0);
  const [message, setMessage] = useState(
    '«Мама, мы пришли на Мост нежности. Найди пары карточек, чтобы прочитать слова Иксика». Тишка',
  );
  const continueButton = useRef<HTMLButtonElement>(null);
  const complete = matched.length === lovePairs.length;

  useEffect(() => {
    if (opened.length !== 2) return;
    const first = deck.find((card) => card.id === opened[0]);
    const second = deck.find((card) => card.id === opened[1]);
    if (!first || !second) return;
    const same = first.pairId === second.pairId;
    const timer = window.setTimeout(
      () => {
        if (same) {
          setMatched((current) =>
            current.includes(first.pairId)
              ? current
              : [...current, first.pairId],
          );
          setMessage(`«${first.note}» Иксик`);
        } else
          setMessage(
            '«Мама, эти карточки разные. Запомни их и открой следующую пару». Тишка',
          );
        setOpened([]);
      },
      same ? 450 : 1100,
    );
    return () => window.clearTimeout(timer);
  }, [opened, deck]);

  useEffect(() => {
    if (complete) continueButton.current?.focus({ preventScroll: true });
  }, [complete]);

  function turn(id: string) {
    const card = deck.find((item) => item.id === id);
    if (
      !card ||
      complete ||
      opened.length >= 2 ||
      opened.includes(id) ||
      matched.includes(card.pairId)
    )
      return;
    if (opened.length === 1) setMoves((current) => current + 1);
    setOpened((current) => [...current, id]);
  }

  return (
    <>
      <JourneyMap stage={1} />
      <div className="step">ЛОКАЦИЯ 02 · МОСТ НЕЖНОСТИ</div>
      <h2 id="memory-title" tabIndex={-1}>
        Всему тёплому
        <br />
        <em>нужна своя пара.</em>
      </h2>
      <p className="section-description">
        Открывай по две карточки и находи одинаковые символы.
        <br />
        Найди шесть пар и прочитай признания Иксика в любви.
      </p>
      <div className="memory-grid" aria-label="Карточки моста нежности">
        {deck.map((card, index) => {
          const found = matched.includes(card.pairId);
          const revealed = found || opened.includes(card.id);
          return (
            <button
              key={card.id}
              className={`memory-card${revealed ? ' revealed' : ''}${found ? ' matched' : ''}`}
              onClick={() => turn(card.id)}
              disabled={found || opened.length >= 2 || opened.includes(card.id)}
              aria-label={
                revealed
                  ? `${card.name}${found ? ', пара найдена' : ''}`
                  : `Открыть карточку ${index + 1}`
              }
              aria-pressed={revealed}
            >
              <span className="memory-symbol" aria-hidden="true">
                {revealed ? card.symbol : '♡'}
              </span>
              <span className="memory-label" aria-hidden="true">
                {revealed ? card.name : 'для тебя'}
              </span>
            </button>
          );
        })}
      </div>
      <div className="memory-progress" aria-live="polite">
        <span>
          Найдено {matched.length} из {lovePairs.length} пар
        </span>
        <span>Попыток: {moves}</span>
      </div>
      <p className="game-quote" aria-live="polite">
        {complete
          ? '«Моя Алина, каждое признание приближает меня к тебе хотя бы на одно слово. Я люблю тебя и очень жду нашей первой встречи». Иксик'
          : message}
      </p>
      <button
        ref={continueButton}
        className="primary"
        disabled={!complete}
        onClick={onContinue}
      >
        К Признанию Иксика <span>→</span>
      </button>
      <p className="game-help">
        Тишка поможет найти пары, а Иксик расскажет о своих чувствах.
      </p>
    </>
  );
}
