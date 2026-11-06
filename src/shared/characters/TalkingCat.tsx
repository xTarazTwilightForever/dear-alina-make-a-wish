import { useId, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { catDialogues } from '../../content/catDialogues';
import { CatCharacter } from './CatCharacter';
import './talking-cat.css';

interface TalkingCatProps {
  character: 'white' | 'dark';
}

export function TalkingCat({ character }: TalkingCatProps) {
  const dialog = useRef<HTMLDialogElement>(null);
  const nextLine = useRef(0);
  const [line, setLine] = useState(0);
  const titleId = useId();
  const lines = catDialogues[character];
  const name = character === 'white' ? 'Иксик' : 'Тишка';

  function speak() {
    setLine(nextLine.current % lines.length);
    nextLine.current += 1;
    if (!dialog.current?.open) dialog.current?.showModal();
  }

  return (
    <>
      <button
        type="button"
        className="talking-cat"
        aria-label={`Погладить котика: ${name}`}
        aria-haspopup="dialog"
        title={`Погладь меня ♡ ${name}`}
        onClick={speak}
      >
        <CatCharacter character={character} />
        <span className="talking-cat-heart" aria-hidden="true">
          ♡
        </span>
      </button>
      {createPortal(
        <dialog
          className="cat-dialog"
          ref={dialog}
          aria-labelledby={titleId}
          onClick={(event) => {
            if (event.target === event.currentTarget) dialog.current?.close();
          }}
        >
          <button
            className="cat-dialog-close"
            onClick={() => dialog.current?.close()}
            aria-label="Закрыть послание котика"
            autoFocus
          >
            ×
          </button>
          <div className="cat-dialog-portrait">
            <CatCharacter character={character} />
          </div>
          <h2 id={titleId}>{name} тихонько говорит…</h2>
          <p key={line} aria-live="polite">
            {lines[line]}
          </p>
          <button className="text-button" onClick={speak}>
            А ещё? <span>♡</span>
          </button>
          <button className="primary" onClick={() => dialog.current?.close()}>
            Погладить и пойти дальше <span>♡</span>
          </button>
        </dialog>,
        document.body,
      )}
    </>
  );
}
