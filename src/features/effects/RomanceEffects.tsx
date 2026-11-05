import { useEffect, useRef, useState } from 'react';
import type { CSSProperties } from 'react';
import './effects.css';

interface HeartBurst {
  id: number;
  x: number;
  y: number;
}

const fireflies = Array.from({ length: 12 }, (_, id) => ({
  id,
  style: {
    left: `${id % 2 ? 92 + (id % 6) : 2 + (id % 7)}%`,
    '--flight-delay': `${-id * 2.1}s`,
    '--flight-duration': `${14 + (id % 5)}s`,
    '--flight-size': `${7 + (id % 4)}px`,
  } as CSSProperties,
}));

export function RomanceEffects() {
  const [bursts, setBursts] = useState<readonly HeartBurst[]>([]);
  const sequence = useRef(0);

  useEffect(() => {
    const motion = window.matchMedia('(prefers-reduced-motion: reduce)');
    const timers = new Set<number>();
    function emit(event: MouseEvent) {
      if (motion.matches || !(event.target instanceof Element)) return;
      const button = event.target.closest('button');
      if (!button || button.disabled || button.closest('dialog')) return;
      const bounds = button.getBoundingClientRect();
      const id = sequence.current++;
      const x =
        event.detail === 0 ? bounds.left + bounds.width / 2 : event.clientX;
      const y =
        event.detail === 0 ? bounds.top + bounds.height / 2 : event.clientY;
      setBursts((current) => [...current.slice(-4), { id, x, y }]);
      const timer = window.setTimeout(() => {
        setBursts((current) => current.filter((burst) => burst.id !== id));
        timers.delete(timer);
      }, 1400);
      timers.add(timer);
    }
    document.addEventListener('click', emit);
    return () => {
      document.removeEventListener('click', emit);
      timers.forEach((timer) => window.clearTimeout(timer));
    };
  }, []);

  return (
    <div className="romance-effects" aria-hidden="true">
      <div className="romance-ambient">
        {fireflies.map((firefly) => (
          <span key={firefly.id} style={firefly.style}>
            {firefly.id % 3 === 0 ? '♡' : '✧'}
          </span>
        ))}
      </div>
      {bursts.map((burst) => (
        <span
          className="romance-burst"
          key={burst.id}
          style={{ left: burst.x, top: burst.y }}
        >
          {Array.from({ length: 7 }, (_, index) => (
            <i
              key={index}
              style={
                {
                  '--burst-x': `${Math.cos((index * Math.PI * 2) / 7) * (38 + index * 4)}px`,
                  '--burst-y': `${Math.sin((index * Math.PI * 2) / 7) * 50 - 30}px`,
                  '--burst-angle': `${index * 35}deg`,
                } as CSSProperties
              }
            >
              {index % 2 ? '♡' : '✧'}
            </i>
          ))}
        </span>
      ))}
    </div>
  );
}
