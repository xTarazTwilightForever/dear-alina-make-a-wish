import { CatCharacter } from '../../shared/characters/CatCharacter';
import './reunion.css';

interface ReunionProps {
  onContinue: () => void;
}

export function Reunion({ onContinue }: ReunionProps) {
  return (
    <>
      <div className="step">ПРИЗНАНИЕ ИКСИКА · НАША ВСТРЕЧА ЕЩЁ ВПЕРЕДИ</div>
      <h2 id="reunion-title" tabIndex={-1}>
        Хозяйка-Пантерка,
        <br />
        <em>мой дом — это ты.</em>
      </h2>
      <div
        className="reunion-scene"
        role="img"
        aria-label="Тишка ждёт маму у Кристины, а белый Иксик мечтает о первой встрече с Алиной"
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
          <span>ИКСИК · ДЛЯ ХОЗЯЙКИ-ПАНТЕРКИ</span>«Я люблю тебя,
          Хозяйка-Пантерка. Эта дорога из сердечек — моя попытка стать к тебе
          чуть ближе. Мы ещё не встретились, но ты уже стала моим домом. Я очень
          жду тебя в Павлодаре. И того первого мгновения, когда наконец увижу
          тебя рядом».
        </p>
        <p>
          <span>ИКСИК</span>«Тишка пока у твоей сестры Кристины и ждёт свою
          маму. А я жду свою Хозяйку-Пантерку. Мы оба хотим домой — к тебе.
          Только я ещё мечтаю впервые взять тебя за руку и обнять.
          По-настоящему, без экрана между нами».
        </p>
        <p className="reunion-ending">
          «С днём рождения, моя любимая.
          <br />Я люблю тебя. И жду нашей первой встречи».
          <br />
          <span>Твой Иксик ♡</span>
        </p>
      </div>
      <button className="primary" onClick={onContinue}>
        Открыть мечты Иксика <span>→</span>
      </button>
      <p className="game-help">
        Впереди — альбом его мечтаний о вас и личное письмо.
      </p>
    </>
  );
}
