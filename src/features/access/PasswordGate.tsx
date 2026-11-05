import { useState } from 'react';
import type { FormEvent } from 'react';
import { CatCharacter } from '../../shared/characters/CatCharacter';
import './access.css';

interface PasswordGateProps {
  onUnlock: () => void;
}

export function PasswordGate({ onUnlock }: PasswordGateProps) {
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);

  function unlock(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (password.normalize('NFC').trim().toLocaleLowerCase('ru') === 'иксик')
      onUnlock();
    else setError(true);
  }

  return (
    <main className="access-screen">
      <time dateTime="2026-11-08">8 ноября 2026</time>
      <div className="access-card">
        <div className="access-kitten">
          <CatCharacter character="white" />
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
            type="password"
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
          <button className="primary" type="submit">
            Открыть нашу историю <span>♡</span>
          </button>
        </form>
        <p className="access-signature">С любовью, Никита. Твой Иксик.</p>
      </div>
    </main>
  );
}
