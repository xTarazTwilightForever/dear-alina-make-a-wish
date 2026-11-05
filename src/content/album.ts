import starryEvening from '../assets/illustrations/starry-evening.png';
import cupOfLove from '../assets/illustrations/cup-of-love.png';
import littleSweetheart from '../assets/illustrations/little-sweetheart.png';
import warmEmbrace from '../assets/illustrations/warm-embrace.png';
import sunlitAfternoon from '../assets/illustrations/sunlit-afternoon.png';
import whiteKitten from '../assets/illustrations/white-kitten.png';
import littleShelter from '../assets/illustrations/our-little-shelter.png';

export interface AlbumIllustration {
  id: string;
  src: string;
  title: string;
  note: string;
  dialogue: string;
  alt: string;
  width: number;
  height: number;
}

export const albumIllustrations: readonly AlbumIllustration[] = [
  {
    id: 'starry-evening',
    src: starryEvening,
    title: 'Там, где тепло',
    note: 'Никита мечтает впервые обнять тебя',
    dialogue:
      'Моя Алина, я мечтаю о таком вечере: ты рядом, за окном звёзды, а мне больше не нужно скучать по тебе через экран.',
    alt: 'Девушка обнимает белого котика с фиолетовой чёлкой у окна под звёздным небом',
    width: 1086,
    height: 1448,
  },
  {
    id: 'cup-of-love',
    src: cupOfLove,
    title: 'Одна чашка нежности',
    note: 'В каждой чашке немного нежности',
    dialogue:
      'Пантерка, если бы любовь можно было налить в чашку, я бы каждое утро приносил тебе самую полную. Твой Никита.',
    alt: 'Белый котик с розовой прядью сидит в фиолетовой кружке с надписью I love Alina',
    width: 1100,
    height: 1430,
  },
  {
    id: 'sunlit-afternoon',
    src: sunlitAfternoon,
    title: 'Солнечный день',
    note: 'Наша первая прогулка пока живёт в мечтах',
    dialogue:
      'Моя Алина, хочу однажды гулять с тобой по солнечным улицам, держать тебя за руку и никуда не спешить. Просто быть твоим Никитой рядом.',
    alt: 'Девушка держит белого котика на залитой солнцем улице',
    width: 1254,
    height: 1254,
  },
  {
    id: 'warm-embrace',
    src: warmEmbrace,
    title: 'Ещё пять минуточек',
    note: 'Ещё немного побыть рядом с тобой',
    dialogue:
      'Хозяйка, можно я попрошу ещё пять минуточек в твоих объятиях? Кажется, Никита совсем не умеет отпускать свою самую любимую мечту.',
    alt: 'Девушка нежно обнимает белого котика с нимбом под тёплым одеялом',
    width: 1289,
    height: 1221,
  },
  {
    id: 'little-sweetheart',
    src: littleSweetheart,
    title: 'Сладкое настроение',
    note: 'Влюблённый котик немного смущается',
    dialogue:
      'Пантерка, ты умеешь заставить меня улыбнуться одним сообщением. Представляешь, что будет с Никитой, когда ты улыбнёшься ему при встрече?',
    alt: 'Белый котик с крылышками обнимает красную банку напитка среди розовых сердечек',
    width: 1010,
    height: 1320,
  },
  {
    id: 'white-kitten',
    src: whiteKitten,
    title: 'Тот самый котик',
    note: 'Твой Никита и твой белый котик',
    dialogue:
      'Моя Алина, за этой розовой прядью прячется Никита, который очень любит тебя. И очень ждёт, когда ты наконец погладишь своего Иксика по голове.',
    alt: 'Портрет белого котика с тёмно-фиолетовой чёлкой, розовой прядью и кулоном',
    width: 608,
    height: 606,
  },
  {
    id: 'little-shelter',
    src: littleShelter,
    title: 'Маленькое укрытие',
    note: 'Место, где можно просто обнять друг друга',
    dialogue:
      'Моя Алина, мне хочется быть рядом, когда тебе нужна тишина. Обнять тебя, выслушать и напомнить, как сильно твой Никита тебя любит.',
    alt: 'Девушка бережно держит белого котика с крылышками среди облаков и фантастического тёмного мира',
    width: 1254,
    height: 1254,
  },
];
