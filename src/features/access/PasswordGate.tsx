import { useEffect, useState } from 'react';
import type { FormEvent } from 'react';
import { TalkingCat } from '../../shared/characters/TalkingCat';
import './access.css';

interface PasswordGateProps {
  onUnlock: () => void;
}

export function PasswordGate({ onUnlock }: PasswordGateProps) {
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);
  const [unlocking, setUnlocking] = useState(false);
  useEffect(() => {
    if (!unlocking) return;
    const timer = window.setTimeout(onUnlock, 650);
    return () => window.clearTimeout(timer);
  }, [unlocking, onUnlock]);

  function unlock(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const normalized = password.normalize('NFC').trim().toLocaleLowerCase('ru');
    if (normalized === 'иксик' || normalized === 'brcbr') setUnlocking(true);
    else setError(true);
  }

  return (
    <main className="access-screen">
      <time dateTime="2026-11-08">8 ноября 2026</time>
      <div className={`access-card${unlocking ? ' access-unlocking' : ''}`}>
        <div className="access-kitten">
          <TalkingCat character="white" />
        </div>
        <p className="step">ТОЛЬКО ДЛЯ ТЕБЯ</p>
        <h1>
          Моя дорогая
          <br />
          <em>Алина</em>
        </h1>
        <p className="access-message">
          Я спрятал здесь маленький мир для нас двоих.
          <br />
          Назови своего белого котика, и я открою тебе эту историю.
        </p>
        <form onSubmit={unlock}>
          <label htmlFor="postcard-password">Наш маленький пароль</label>
          <input
            id="postcard-password"
            type="text"
            disabled={unlocking}
            value={password}
            onChange={(event) => {
              setPassword(event.target.value);
              setError(false);
            }}
            placeholder="Имя белого котика"
            autoComplete="off"
            autoCapitalize="none"
            spellCheck={false}
            aria-invalid={error}
            aria-describedby={error ? 'password-error' : undefined}
            required
          />
          <p className="access-error" id="password-error" aria-live="polite">
            {error
              ? 'Попробуй ещё раз, Пантерка. Как ты зовёшь своего белого котика?'
              : ''}
          </p>
          <button className="primary" type="submit" disabled={unlocking}>
            {unlocking ? 'Узнал тебя, моя Алина' : 'Открыть нашу историю'}{' '}
            <span>♡</span>
          </button>
        </form>
        <p className="access-signature">С любовью, Никита. Твой Иксик.</p>
      </div>
    </main>
  );
}
