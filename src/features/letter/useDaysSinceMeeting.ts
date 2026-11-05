import { useEffect, useState } from 'react';

const firstMeeting = Date.UTC(2026, 10, 1);
const dayLength = 86_400_000;
const calendar = new Intl.DateTimeFormat('en-US', {
  timeZone: 'Asia/Almaty',
  year: 'numeric',
  month: 'numeric',
  day: 'numeric',
});
const plurals = new Intl.PluralRules('ru');

function countDays() {
  const parts = calendar.formatToParts(new Date());
  const value = (type: Intl.DateTimeFormatPartTypes) =>
    Number(parts.find((part) => part.type === type)?.value);
  const today = Date.UTC(value('year'), value('month') - 1, value('day'));
  return Math.max(0, Math.floor((today - firstMeeting) / dayLength));
}

export function useDaysSinceMeeting() {
  const [days, setDays] = useState(countDays);

  useEffect(() => {
    const update = () => setDays(countDays());
    const onVisible = () => {
      if (document.visibilityState === 'visible') update();
    };
    update();
    const interval = window.setInterval(update, 30_000);
    window.addEventListener('focus', update);
    document.addEventListener('visibilitychange', onVisible);
    return () => {
      window.clearInterval(interval);
      window.removeEventListener('focus', update);
      document.removeEventListener('visibilitychange', onVisible);
    };
  }, []);

  const form = plurals.select(days);
  const word = form === 'one' ? 'день' : form === 'few' ? 'дня' : 'дней';
  return `${days} ${word}`;
}
