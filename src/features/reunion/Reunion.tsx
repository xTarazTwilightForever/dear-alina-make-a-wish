import { CatCharacter } from '../../shared/characters/CatCharacter';
import './reunion.css';

interface ReunionProps {
  onContinue: () => void;
}

export function Reunion({ onContinue }: ReunionProps) {
  return (
    <>
      <div className="step">ВСТРЕЧА · ХОЗЯЙКА ДОМА</div>
      <h2 id="reunion-title" tabIndex={-1}>
        Хозяйка,
        <br />
        <em>я тебя дождался.</em>
      </h2>
      <div
        className="reunion-scene"
        role="img"
        aria-label="Серый Тишка и белый Иксик встречают свою любимую хозяйку"
      >
        <span className="reunion-stars" aria-hidden="true">
          ✧　♡　✧
        </span>
        <div className="reunion-characters">
          <CatCharacter character="dark" />
          <CatCharacter character="white" />
        </div>
        <div className="reunion-names">
          <span>Тишка</span>
          <span>Иксик</span>
        </div>
      </div>
      <div className="reunion-dialogue">
        <p>
          <span>ИКСИК</span>«Моя хозяйка… Ты пришла. Я приготовил столько слов,
          а сейчас хочется только прижаться к тебе и мурчать. С днём рождения,
          моя самая любимая».
        </p>
        <p>
          <span>ТИШКА</span>«Мама хозяйка, я же говорил — найдём. Теперь у тебя
          сразу два котика рядом. Один греет лапками, второй — сердцем. А любить
          тебя умеем оба».
        </p>
        <p className="reunion-ending">
          И в их маленьком мире всё стало на своих местах.
          <br />
          Потому что хозяйка была рядом.
        </p>
      </div>
      <button className="primary" onClick={onContinue}>
        Сохранить это тепло <span>→</span>
      </button>
      <p className="game-help">
        Впереди — маленький альбом и письмо от твоего Иксика.
      </p>
    </>
  );
}
