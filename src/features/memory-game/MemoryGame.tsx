import { useEffect, useRef, useState } from 'react';
import { lovePairs, lovePairAccents } from '../../content/story';
import type { CSSProperties } from 'react';
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
  const [activePair, setActivePair] = useState<string | null>(null);
  const [message, setMessage] = useState(
    'Мама, мы пришли на Мост нежности. Найди пары карточек, чтобы прочитать слова Иксика. Тишка',
  );
  const messageBox = useRef<HTMLParagraphElement>(null);
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
          setMessage(`${first.note} Никита, твой Иксик.`);
          setActivePair(first.pairId);
        } else {
          setActivePair(null);
          setMessage(
            'Мама, эти карточки разные. Запомни их и открой следующую пару. Тишка',
          );
        }
        setOpened([]);
      },
      same ? 450 : 1100,
    );
    return () => window.clearTimeout(timer);
  }, [opened, deck]);

  useEffect(() => {
    if (complete) continueButton.current?.focus({ preventScroll: true });
  }, [complete]);

  useEffect(() => {
    if (matched.length === 0) return;
    const frame = window.requestAnimationFrame(() => {
      messageBox.current?.scrollIntoView({
        block: 'center',
        behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches
          ? 'instant'
          : 'smooth',
      });
    });
    return () => window.cancelAnimationFrame(frame);
  }, [matched.length]);

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
      <p
        ref={messageBox}
        className="game-quote memory-confession"
        aria-live="polite"
        style={
          activePair
            ? ({
                '--pair-color': lovePairAccents[activePair].color,
              } as CSSProperties)
            : undefined
        }
      >
        {activePair && (
          <span
            className={`memory-confession-symbol${activePair === 'paws' ? ' memory-confession-paws' : ''}`}
            aria-hidden="true"
          >
            {lovePairAccents[activePair].symbol}
          </span>
        )}
        <span>{message}</span>
        {activePair && (
          <span
            className={`memory-confession-symbol${activePair === 'paws' ? ' memory-confession-paws' : ''}`}
            aria-hidden="true"
          >
            {lovePairAccents[activePair].symbol}
          </span>
        )}
      </p>
      <div className="memory-grid" aria-label="Карточки моста нежности">
        {deck.map((card, index) => {
          const found = matched.includes(card.pairId);
          const revealed = found || opened.includes(card.id);
          return (
            <button
              key={card.id}
              className={`memory-card${revealed ? ' revealed' : ''}${found ? ' matched' : ''}`}
              style={
                {
                  '--matched-color': lovePairAccents[card.pairId].color,
                } as CSSProperties
              }
              onClick={() => turn(card.id)}
              disabled={found || opened.length >= 2 || opened.includes(card.id)}
              aria-label={
                revealed
                  ? `${card.name}${found ? ', пара найдена' : ''}`
                  : `Открыть карточку ${index + 1}`
              }
              aria-pressed={revealed}
            >
              <span className="memory-card-inner" aria-hidden="true">
                <span className="memory-card-face memory-card-back">
                  <span className="memory-symbol">♡</span>
                  <span className="memory-label">для тебя</span>
                </span>
                <span className="memory-card-face memory-card-front">
                  <span className="memory-symbol">
                    {card.pairId === 'paws' ? (
                      <svg
                        className="memory-white-paw"
                        viewBox="0 0 48 48"
                        aria-hidden="true"
                      >
                        <ellipse
                          cx="11"
                          cy="14"
                          rx="5"
                          ry="7"
                          transform="rotate(-25 11 14)"
                        />
                        <ellipse cx="22" cy="9" rx="5" ry="7" />
                        <ellipse
                          cx="34"
                          cy="13"
                          rx="5"
                          ry="7"
                          transform="rotate(22 34 13)"
                        />
                        <ellipse
                          cx="41"
                          cy="24"
                          rx="4"
                          ry="6"
                          transform="rotate(35 41 24)"
                        />
                        <path d="M12 32c0-6 7-14 13-14s14 9 14 15c0 8-8 7-13 5-6-2-14 4-14-6Z" />
                      </svg>
                    ) : (
                      card.symbol
                    )}
                  </span>
                  <span className="memory-label">{card.name}</span>
                  <span className="memory-found">
                    {found ? 'пара найдена ♡' : ''}
                  </span>
                </span>
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
