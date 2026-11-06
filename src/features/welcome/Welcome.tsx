import { TalkingCat } from '../../shared/characters/TalkingCat';
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
          <p className="eyebrow">моей Алине · Alluka, с любовью от Иксика</p>
          <h1 id="intro-title" tabIndex={-1}>
            Алина,
            <br />
            сегодня мир
            <br />
            чуть <em>нежнее.</em>
          </h1>
          <p className="lede">
            Моя Алина, я люблю тебя.
            <br />С днём рождения. Твой Иксик ♡
          </p>
          <button className="primary" onClick={onStart}>
            Открыть нашу историю <span>↗</span>
          </button>
          <p className="footnote">
            Тишка покажет дорогу к тому, что я так хочу тебе сказать.
          </p>
        </div>
        <div
          className="scene"
          role="group"
          aria-label="Тишка ждёт маму, а Иксик ждёт свою Пантерку. Они ждут Алину домой в Павлодар."
        >
          <span className="scene-star star-one">✧</span>
          <span className="scene-star star-two">✦</span>
          <span className="scene-star star-three">✧</span>
          <div className="moon"></div>
          <div className="orbit orbit-one"></div>
          <div className="orbit orbit-two"></div>
          <div className="pink-planet"></div>
          <div className="scene-character scene-character-tishka">
            <TalkingCat character="dark" />
          </div>
          <div className="scene-character scene-character-white">
            <TalkingCat character="white" />
          </div>
          <div className="floating-heart">♡</div>
          <div className="ground"></div>
          <p className="scene-note">
            Погладь котиков, им есть что сказать
            <br />
            Твой Иксик ♡
          </p>
          <span className="hand-arrow">↶</span>
        </div>
      </div>

      <div className="intro-bottom">
        <span>СОЗДАНО С ТЕПЛОМ, В ОДНОМ ЭКЗЕМПЛЯРЕ</span>
        <span>01 / 07</span>
      </div>
    </>
  );
}
