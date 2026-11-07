import { useEffect, useLayoutEffect, useRef, useState } from 'react';
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

// Document coordinates keep the kitten at his place when the page scrolls.
function viewport() {
  const view = window.visualViewport;
  return {
    left: window.scrollX + (view?.offsetLeft ?? 0),
    top: window.scrollY + (view?.offsetTop ?? 0),
    width: view?.width ?? document.documentElement.clientWidth,
    height: view?.height ?? window.innerHeight,
  };
}

export function RoamingIksik() {
  const dock = useRef<HTMLSpanElement>(null);
  const kitten = useRef<HTMLDivElement>(null);
  const flight = useRef<Animation | null>(null);
  const nextSide = useRef<'left' | 'right'>('left');
  const [point, setPoint] = useState<Point | null>(null);
  const [visible, setVisible] = useState(false);
  const [resting, setResting] = useState(false);
  const [moving, setMoving] = useState(false);
  const [phrase, setPhrase] = useState(0);
  const [cycle, setCycle] = useState(0);
  const [bounds, setBounds] = useState(viewport);
  const placed = point !== null;

  useLayoutEffect(() => {
    const rect = dock.current?.getBoundingClientRect();
    if (rect)
      setPoint({ x: rect.left + window.scrollX, y: rect.top + window.scrollY });
  }, []);

  useLayoutEffect(() => {
    const node = kitten.current;
    if (!placed || !node) return;
    function updateVisibility() {
      const rect = node!.getBoundingClientRect();
      const v = viewport();
      const left = rect.left + window.scrollX;
      const top = rect.top + window.scrollY;
      setBounds(v);
      setVisible(
        !document.hidden &&
          left >= v.left &&
          left + rect.width <= v.left + v.width &&
          top >= v.top &&
          top + rect.height <= v.top + v.height,
      );
    }
    const observer = new IntersectionObserver(updateVisibility, {
      threshold: [0, 0.5, 1],
    });
    observer.observe(node);
    let frame = 0;
    function scheduleVisibility() {
      window.cancelAnimationFrame(frame);
      frame = window.requestAnimationFrame(updateVisibility);
    }
    updateVisibility();
    window.addEventListener('scroll', scheduleVisibility, true);
    window.addEventListener('resize', scheduleVisibility);
    window.visualViewport?.addEventListener('scroll', scheduleVisibility);
    window.visualViewport?.addEventListener('resize', scheduleVisibility);
    document.addEventListener('visibilitychange', updateVisibility);
    return () => {
      observer.disconnect();
      window.cancelAnimationFrame(frame);
      window.removeEventListener('scroll', scheduleVisibility, true);
      window.removeEventListener('resize', scheduleVisibility);
      window.visualViewport?.removeEventListener('scroll', scheduleVisibility);
      window.visualViewport?.removeEventListener('resize', scheduleVisibility);
      document.removeEventListener('visibilitychange', updateVisibility);
    };
  }, [placed]);

  useLayoutEffect(() => {
    if (!flight.current) return;
    if (!visible || resting) flight.current.pause();
    else if (flight.current.playState === 'paused') flight.current.play();
  }, [visible, resting]);

  function jump(manual = false) {
    if (!visible || document.hidden || (resting && !manual)) return;
    if (manual) setResting(false);
    setCycle((value) => value + 1);
    setPhrase((value) => (value + 1) % phrases.length);
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const node = kitten.current;
    if (!node) return;
    const v = viewport();
    const obstacles = [
      ...document.querySelectorAll<HTMLElement>(
        '[data-personal-message], .ending-replay',
      ),
    ].map((element) => element.getBoundingClientRect());
    let target: Point | null = null;
    if (v.height < 270 || v.width < 140) return;
    for (let attempt = 0; attempt < 24; attempt++) {
      const candidate = {
        x:
          nextSide.current === 'left'
            ? v.left + 16 + Math.random() * 24
            : v.left + v.width - 96 - Math.random() * 24,
        y: v.top + 140 + Math.random() * (v.height - 260),
      };
      const x = candidate.x - window.scrollX;
      const y = candidate.y - window.scrollY;
      if (
        !obstacles.some(
          (rect) =>
            x - 70 < rect.right &&
            x + 150 > rect.left &&
            y - 115 < rect.bottom &&
            y + 100 > rect.top,
        )
      ) {
        target = candidate;
        break;
      }
    }
    if (!target) return;
    nextSide.current = nextSide.current === 'left' ? 'right' : 'left';
    const rect = node.getBoundingClientRect();
    const start = {
      x: rect.left + window.scrollX,
      y: rect.top + window.scrollY,
    };
    flight.current?.cancel();
    setPoint(target);
    setBounds(v);
    setMoving(true);
    const animation = node.animate(
      [
        { transform: `translate(${start.x}px, ${start.y}px)` },
        {
          transform: `translate(${(start.x + target.x) / 2}px, ${Math.max(v.top + 8, (start.y + target.y) / 2 - 35)}px)`,
        },
        { transform: `translate(${target.x}px, ${target.y}px)` },
      ],
      { duration: 1150, easing: 'ease-in-out' },
    );
    flight.current = animation;
    animation.onfinish = () => {
      if (flight.current === animation) {
        flight.current = null;
        setMoving(false);
      }
    };
  }
  const jumpRef = useRef(jump);
  jumpRef.current = jump;

  useEffect(() => {
    if (
      !visible ||
      resting ||
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
    )
      return;
    const timer = window.setTimeout(() => jumpRef.current(), 10_000);
    return () => window.clearTimeout(timer);
  }, [visible, resting, cycle]);
  useEffect(() => () => flight.current?.cancel(), []);

  function rest() {
    const rect = kitten.current?.getBoundingClientRect();
    if (rect)
      setPoint({ x: rect.left + window.scrollX, y: rect.top + window.scrollY });
    flight.current?.cancel();
    flight.current = null;
    setMoving(false);
    setResting(true);
  }

  const bubbleWidth = Math.min(240, bounds.width - 24);
  const bubbleLeft = point
    ? Math.max(
        bounds.left + 12,
        Math.min(
          point.x + 40 - bubbleWidth / 2,
          bounds.left + bounds.width - bubbleWidth - 12,
        ),
      ) - point.x
    : 0;
  const bubbleFits = point && point.y - 125 >= bounds.top;
  return (
    <>
      <span ref={dock} className="iksik-voice-dock" aria-hidden="true">
        {!placed && <CatCharacter character="white" />}
      </span>
      {point &&
        createPortal(
          <div
            ref={kitten}
            className="roaming-iksik"
            style={{ transform: `translate(${point.x}px, ${point.y}px)` }}
          >
            {visible && !resting && !moving && bubbleFits && (
              <aside
                className="roaming-iksik-bubble"
                style={{ left: bubbleLeft, width: bubbleWidth }}
                aria-label="Иксик говорит"
              >
                <p>{phrases[phrase]}</p>
                <button aria-label="Дать зайке отдохнуть" onClick={rest}>
                  ×
                </button>
              </aside>
            )}
            <button
              className="roaming-iksik-touch"
              aria-label="Погладить Иксика, своего зайку"
              onClick={() => jump(true)}
            >
              <CatCharacter character="white" />
            </button>
          </div>,
          document.body,
        )}
    </>
  );
}
