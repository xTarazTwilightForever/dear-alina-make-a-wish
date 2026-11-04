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
          <p className="eyebrow">кое-что только для тебя</p>
          <h1 id="intro-title" tabIndex={-1}>
            Алина,
            <br />
            сегодня мир
            <br />
            чуть <em>нежнее.</em>
          </h1>
          <p className="lede">
            Потому что в нём есть ты.
            <br />И потому что тебе сегодня восемнадцать.
          </p>
          <button className="primary" onClick={onStart}>
            Открыть маленькое чудо <span>↗</span>
          </button>
          <p className="footnote">пара минут, два котика и одно письмо</p>
        </div>
        <div className="scene" role="img" aria-label="Два котика под звёздами">
          <span className="scene-star star-one">✧</span>
          <span className="scene-star star-two">✦</span>
          <span className="scene-star star-three">✧</span>
          <div className="moon"></div>
          <div className="orbit orbit-one"></div>
          <div className="orbit orbit-two"></div>
          <div className="pink-planet"></div>
          <div className="cat cat-dark">
            <div className="ear left"></div>
            <div className="ear right"></div>
            <div className="cat-body"></div>
            <div className="cat-head">
              <i className="eye left"></i>
              <i className="eye right"></i>
              <i className="nose"></i>
              <i className="cheek left"></i>
              <i className="cheek right"></i>
            </div>
            <div className="tail"></div>
          </div>
          <div className="cat cat-cream">
            <div className="ear left"></div>
            <div className="ear right"></div>
            <div className="cat-body"></div>
            <div className="cat-head">
              <i className="eye left"></i>
              <i className="eye right"></i>
              <i className="nose"></i>
              <i className="cheek left"></i>
              <i className="cheek right"></i>
            </div>
            <div className="tail"></div>
          </div>
          <div className="floating-heart">♡</div>
          <div className="ground"></div>
          <p className="scene-note">
            даже через расстояние
            <br />
            можно быть рядом
          </p>
          <span className="hand-arrow">↶</span>
        </div>
      </div>

      <div className="intro-bottom">
        <span>СОЗДАНО С ТЕПЛОМ, В ОДНОМ ЭКЗЕМПЛЯРЕ</span>
        <span>01 / 03</span>
      </div>
    </>
  );
}
