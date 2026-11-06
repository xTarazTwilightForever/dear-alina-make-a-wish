import { useEffect, useId, useLayoutEffect, useRef, useState } from 'react';
import type { CSSProperties } from 'react';
import { createPortal } from 'react-dom';
import { catDialogues } from '../../content/catDialogues';
import { CatCharacter } from './CatCharacter';
import './talking-cat.css';

interface TalkingCatProps {
  character: 'white' | 'dark';
}

export function TalkingCat({ character }: TalkingCatProps) {
  const trigger = useRef<HTMLButtonElement>(null);
  const bubble = useRef<HTMLElement>(null);
  const nextLine = useRef(0);
  const [line, setLine] = useState(0);
  const [open, setOpen] = useState(false);
  const [position, setPosition] = useState<CSSProperties>({
    visibility: 'hidden',
  });
  const bubbleId = useId();
  const lines = catDialogues[character];
  const name = character === 'white' ? 'Иксик' : 'Тишка';

  function speak() {
    setLine(nextLine.current % lines.length);
    nextLine.current += 1;
    setOpen(true);
    document.dispatchEvent(
      new CustomEvent('cat-speech-open', { detail: bubbleId }),
    );
  }

  useLayoutEffect(() => {
    if (!open) return;
    function place() {
      if (!trigger.current || !bubble.current) return;
      const cat = trigger.current.getBoundingClientRect();
      const viewport = window.visualViewport;
      const viewportLeft = viewport?.offsetLeft ?? 0;
      const viewportTop = viewport?.offsetTop ?? 0;
      const viewportWidth =
        viewport?.width ?? document.documentElement.clientWidth;
      const viewportHeight = viewport?.height ?? window.innerHeight;
      const width = Math.min(320, viewportWidth - 24);
      const left = Math.max(
        viewportLeft + 12,
        Math.min(
          cat.left + cat.width / 2 - width / 2,
          viewportLeft + viewportWidth - width - 12,
        ),
      );
      const height = bubble.current.getBoundingClientRect().height;
      const top = Math.max(
        viewportTop + 12,
        Math.min(
          cat.top - height - 14,
          viewportTop + viewportHeight - height - 12,
        ),
      );
      const tail = Math.max(
        22,
        Math.min(cat.left + cat.width / 2 - left, width - 22),
      );
      setPosition({
        left,
        top,
        width,
        '--tail-left': `${tail}px`,
        '--speech-available-height': `${Math.max(60, viewportHeight - 160)}px`,
        visibility: 'visible',
      } as CSSProperties);
    }
    place();
    const observer = new ResizeObserver(place);
    if (bubble.current) observer.observe(bubble.current);
    window.addEventListener('resize', place);
    window.addEventListener('scroll', place, true);
    window.visualViewport?.addEventListener('resize', place);
    window.visualViewport?.addEventListener('scroll', place);
    return () => {
      observer.disconnect();
      window.removeEventListener('resize', place);
      window.removeEventListener('scroll', place, true);
      window.visualViewport?.removeEventListener('resize', place);
      window.visualViewport?.removeEventListener('scroll', place);
    };
  }, [open, line]);

  useEffect(() => {
    if (!open) return;
    function onOutside(event: PointerEvent) {
      if (
        event.target instanceof Node &&
        !trigger.current?.contains(event.target) &&
        !bubble.current?.contains(event.target)
      )
        setOpen(false);
    }
    function onKey(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        setOpen(false);
        if (bubble.current?.contains(document.activeElement))
          trigger.current?.focus({ preventScroll: true });
      }
    }
    function onOtherCat(event: Event) {
      if ((event as CustomEvent<string>).detail !== bubbleId) setOpen(false);
    }
    document.addEventListener('pointerdown', onOutside);
    document.addEventListener('keydown', onKey);
    document.addEventListener('cat-speech-open', onOtherCat);
    return () => {
      document.removeEventListener('pointerdown', onOutside);
      document.removeEventListener('keydown', onKey);
      document.removeEventListener('cat-speech-open', onOtherCat);
    };
  }, [open, bubbleId]);

  return (
    <>
      <button
        ref={trigger}
        type="button"
        className="talking-cat"
        aria-label={`Погладить котика: ${name}`}
        aria-expanded={open}
        aria-controls={open ? bubbleId : undefined}
        onClick={speak}
      >
        <CatCharacter character={character} />
        <span className="talking-cat-heart" aria-hidden="true">
          ♡
        </span>
      </button>
      {open &&
        createPortal(
          <aside
            ref={bubble}
            id={bubbleId}
            className="cat-speech"
            style={position}
            aria-label={name}
          >
            <strong className="cat-speech-name">{name} ♡</strong>
            <p aria-live="polite">{lines[line]}</p>
            <div className="cat-speech-actions">
              <button onClick={speak}>А ещё? ♡</button>
              <button
                onClick={() => {
                  setOpen(false);
                  trigger.current?.focus({ preventScroll: true });
                }}
                aria-label="Закрыть реплику котика"
              >
                ×
              </button>
            </div>
          </aside>,
          document.body,
        )}
    </>
  );
}
