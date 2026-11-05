import { useEffect, useState } from 'react';

// November 1, 2026 at 11:10 in Pavlodar (UTC+05:00).
const firstMeeting = Date.parse('2026-11-01T11:10:00+05:00');
const plurals = new Intl.PluralRules('ru');

function elapsedTime() {
  const totalSeconds = Math.max(
    0,
    Math.floor((Date.now() - firstMeeting) / 1000),
  );
  return {
    days: Math.floor(totalSeconds / 86_400),
    hours: Math.floor((totalSeconds % 86_400) / 3600),
    minutes: Math.floor((totalSeconds % 3600) / 60),
    seconds: totalSeconds % 60,
  };
}

export function useDaysSinceMeeting() {
  const [elapsed, setElapsed] = useState(elapsedTime);

  useEffect(() => {
    const update = () => setElapsed(elapsedTime());
    const onVisible = () => {
      if (document.visibilityState === 'visible') update();
    };
    update();
    const interval = window.setInterval(update, 1000);
    window.addEventListener('focus', update);
    document.addEventListener('visibilitychange', onVisible);
    return () => {
      window.clearInterval(interval);
      window.removeEventListener('focus', update);
      document.removeEventListener('visibilitychange', onVisible);
    };
  }, []);

  const form = plurals.select(elapsed.days);
  const word = form === 'one' ? 'день' : form === 'few' ? 'дня' : 'дней';
  return {
    elapsed,
    dayLabel: `${elapsed.days} ${word}`,
  };
}
