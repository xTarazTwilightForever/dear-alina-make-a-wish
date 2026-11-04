import { CatCharacter } from '../../shared/characters/CatCharacter';
import './welcome.css';
interface WelcomeProps {
  onStart: () => void;
}

export function Welcome({ onStart }: WelcomeProps) {
  return (
    <>
      <div className="date-label">
        <span></span> 8 НОЯБРЯ · ТВОЙ ДЕНЬ <span></span>
      </div>
      <div className="intro-layout">
        <div className="intro-copy">
          <p className="eyebrow">признание Иксика для Хозяйки-Пантерки</p>
          <h1 id="intro-title" tabIndex={-1}>
            Алина,
            <br />
            сегодня мир
            <br />
            чуть <em>нежнее.</em>
          </h1>
          <p className="lede">
            Хозяйка-Пантерка, я люблю тебя.
            <br />С днём рождения. Твой Иксик ♡
          </p>
          <button className="primary" onClick={onStart}>
            Открыть нашу историю <span>↗</span>
          </button>
          <p className="footnote">
            Тишка покажет путь. Все признания — от Иксика.
          </p>
        </div>
        <div
          className="scene"
          role="img"
          aria-label="Тишка ждёт маму, а Иксик — Хозяйку-Пантерку. Они ждут Алину домой в Павлодар."
        >
          <span className="scene-star star-one">✧</span>
          <span className="scene-star star-two">✦</span>
          <span className="scene-star star-three">✧</span>
          <div className="moon"></div>
          <div className="orbit orbit-one"></div>
          <div className="orbit orbit-two"></div>
          <div className="pink-planet"></div>
          <div className="scene-character scene-character-tishka">
            <CatCharacter character="dark" />
          </div>
          <div className="scene-character scene-character-white">
            <CatCharacter character="white" />
          </div>
          <div className="floating-heart">♡</div>
          <div className="ground"></div>
          <p className="scene-note">
            «мой дом — это ты»
            <br />
            Твой Иксик ♡
          </p>
          <span className="hand-arrow">↶</span>
        </div>
      </div>

      <div className="intro-bottom">
        <span>СОЗДАНО С ТЕПЛОМ, В ОДНОМ ЭКЗЕМПЛЯРЕ</span>
        <span>01 / 08</span>
      </div>
    </>
  );
}
