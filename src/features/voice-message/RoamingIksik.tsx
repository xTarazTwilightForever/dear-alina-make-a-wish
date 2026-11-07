import { useLayoutEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { CatCharacter } from '../../shared/characters/CatCharacter';
import './roaming-iksik.css';

const phrases = [
  'Моя Алина, твой зайка рядом ♡',
  'Хозяйка-Пантерка, можно на ручки?',
  'Ты зовёшь меня зайкой, а я таю ♡',
  'Твоё вхвхвхвх делает мой день лучше.',
  'Моя Алина, я тебя очень люблю.',
  'Прыг! И ещё немножко ближе к тебе ♡',
  'Хвхвхвхв… Это я пытаюсь смеяться как ты.',
  'Твой Никита сейчас бы тебя обнял ♡',
] as const;
type Point = { x: number; y: number };

function viewport() {
  const view = window.visualViewport;
  return {
    left: view?.offsetLeft ?? 0,
    top: view?.offsetTop ?? 0,
    width: view?.width ?? document.documentElement.clientWidth,
    height: view?.height ?? window.innerHeight,
  };
}
function fit(point: Point): Point {
  const v = viewport();
  const bottom = v.top + Math.max(12, v.height - 116);
  return {
    x: Math.max(v.left + 12, Math.min(point.x, v.left + v.width - 92)),
    y: Math.max(Math.min(v.top + 135, bottom), Math.min(point.y, bottom)),
  };
}

export function RoamingIksik() {
  const dock = useRef<HTMLSpanElement>(null);
  const kitten = useRef<HTMLDivElement>(null);
  const flight = useRef<Animation | null>(null);
  const phraseIndex = useRef(0);
  const [visible, setVisible] = useState(false);
  const [resting, setResting] = useState(false);
  const [point, setPoint] = useState<Point | null>(null);
  const [phrase, setPhrase] = useState(0);
  const [bubble, setBubble] = useState(true);

  function dockPosition() {
    const rect = dock.current?.getBoundingClientRect();
    return fit({ x: rect?.left ?? 16, y: rect?.top ?? 160 });
  }

  function jump() {
    setBubble(true);
    phraseIndex.current = (phraseIndex.current + 1) % phrases.length;
    setPhrase(phraseIndex.current);
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const v = viewport();
    const obstacles = [
      ...document.querySelectorAll<HTMLElement>(
        '[data-personal-message], .ending-replay',
      ),
    ].map((element) => element.getBoundingClientRect());
    let target = dockPosition();
    for (let attempt = 0; attempt < 20; attempt++) {
      const candidate = fit({
        x: v.left + Math.random() * (v.width - 96),
        y: v.top + 150 + Math.random() * Math.max(0, v.height - 280),
      });
      if (
        !obstacles.some(
          (rect) =>
            candidate.x - 70 < rect.right &&
            candidate.x + 150 > rect.left &&
            candidate.y - 115 < rect.bottom &&
            candidate.y + 100 > rect.top,
        )
      ) {
        target = candidate;
        break;
      }
    }
    const rect = kitten.current?.getBoundingClientRect();
    flight.current?.cancel();
    setPoint(target);
    if (kitten.current && rect) {
      setBubble(false);
      flight.current = kitten.current.animate(
        [
          { transform: `translate(${rect.left}px, ${rect.top}px)` },
          {
            transform: `translate(${(rect.left + target.x) / 2}px, ${Math.max(v.top + 125, (rect.top + target.y) / 2 - 35)}px)`,
          },
          { transform: `translate(${target.x}px, ${target.y}px)` },
        ],
        { duration: 1050, easing: 'ease-in-out' },
      );
      flight.current.onfinish = () => setBubble(true);
    }
  }
  const jumpRef = useRef(jump);
  jumpRef.current = jump;

  useLayoutEffect(() => {
    const section = dock.current?.closest('.voice-message');
    if (!section) return;
    const observer = new IntersectionObserver(([entry]) =>
      setVisible(entry.isIntersecting && !document.hidden),
    );
    observer.observe(section);
    function onVisibility() {
      const rect = section!.getBoundingClientRect();
      setVisible(
        !document.hidden && rect.bottom > 0 && rect.top < window.innerHeight,
      );
    }
    document.addEventListener('visibilitychange', onVisibility);
    return () => {
      observer.disconnect();
      document.removeEventListener('visibilitychange', onVisibility);
    };
  }, []);

  useLayoutEffect(() => {
    if (!visible) {
      flight.current?.cancel();
      return;
    }
    setPoint((current) =>
      resting ? dockPosition() : fit(current ?? dockPosition()),
    );
    setBubble(!resting);
    function reposition() {
      flight.current?.cancel();
      setBubble(!resting);
      setPoint((current) =>
        resting ? dockPosition() : fit(current ?? dockPosition()),
      );
    }
    const timer =
      !resting && !window.matchMedia('(prefers-reduced-motion: reduce)').matches
        ? window.setInterval(() => jumpRef.current(), 10_000)
        : undefined;
    window.addEventListener('scroll', reposition, true);
    window.addEventListener('resize', reposition);
    window.visualViewport?.addEventListener('resize', reposition);
    window.visualViewport?.addEventListener('scroll', reposition);
    return () => {
      window.clearInterval(timer);
      flight.current?.cancel();
      window.removeEventListener('scroll', reposition, true);
      window.removeEventListener('resize', reposition);
      window.visualViewport?.removeEventListener('resize', reposition);
      window.visualViewport?.removeEventListener('scroll', reposition);
    };
  }, [visible, resting]);

  const v = visible ? viewport() : null;
  const bubbleWidth = Math.min(240, (v?.width ?? 264) - 24);
  const bubbleLeft =
    point && v
      ? Math.max(
          v.left + 12,
          Math.min(
            point.x + 40 - bubbleWidth / 2,
            v.left + v.width - bubbleWidth - 12,
          ),
        ) - point.x
      : 0;
  return (
    <>
      <span ref={dock} className="iksik-voice-dock" aria-hidden="true">
        {!visible && <CatCharacter character="white" />}
      </span>
      {visible &&
        point &&
        createPortal(
          <div
            ref={kitten}
            className="roaming-iksik"
            style={{ transform: `translate(${point.x}px, ${point.y}px)` }}
          >
            {bubble && (
              <aside
                className="roaming-iksik-bubble"
                style={{ left: bubbleLeft, width: bubbleWidth }}
                aria-label="Иксик говорит"
              >
                <p>{phrases[phrase]}</p>
                <button
                  aria-label="Уложить зайку рядом с голосовым"
                  onClick={() => {
                    setResting(true);
                    setBubble(false);
                  }}
                >
                  ×
                </button>
              </aside>
            )}
            <button
              className="roaming-iksik-touch"
              aria-label="Погладить Иксика, своего зайку"
              onClick={() => {
                setResting(false);
                jump();
              }}
            >
              <CatCharacter character="white" />
            </button>
          </div>,
          document.body,
        )}
    </>
  );
}
