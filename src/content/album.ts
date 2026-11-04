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
  alt: string;
  width: number;
  height: number;
}

export const albumIllustrations: readonly AlbumIllustration[] = [
  {
    id: 'starry-evening',
    src: starryEvening,
    title: 'Там, где тепло',
    note: 'Иксик: «Мечтаю впервые обнять тебя»',
    alt: 'Девушка обнимает белого котика с фиолетовой чёлкой у окна под звёздным небом',
    width: 1086,
    height: 1448,
  },
  {
    id: 'cup-of-love',
    src: cupOfLove,
    title: 'Одна чашка нежности',
    note: 'Иксик: «Я люблю тебя, Хозяйка-Пантерка»',
    alt: 'Белый котик с розовой прядью сидит в фиолетовой кружке с надписью I love Alina',
    width: 1100,
    height: 1430,
  },
  {
    id: 'sunlit-afternoon',
    src: sunlitAfternoon,
    title: 'Солнечная сторона',
    note: 'Иксик: «Я мечтаю о нашей первой прогулке»',
    alt: 'Девушка держит белого котика на залитой солнцем улице',
    width: 574,
    height: 600,
  },
  {
    id: 'warm-embrace',
    src: warmEmbrace,
    title: 'Ещё пять минуточек',
    note: 'Иксик: «Ты мой дом. Я хочу быть рядом»',
    alt: 'Девушка нежно обнимает белого котика с нимбом под тёплым одеялом',
    width: 1242,
    height: 1174,
  },
  {
    id: 'little-sweetheart',
    src: littleSweetheart,
    title: 'Сладкое настроение',
    note: 'Иксик: «Влюблён в тебя. Очень»',
    alt: 'Белый котик с крылышками обнимает красную банку напитка среди розовых сердечек',
    width: 1010,
    height: 1320,
  },
  {
    id: 'white-kitten',
    src: whiteKitten,
    title: 'Тот самый котик',
    note: 'Иксик: «Твой котик, Хозяйка-Пантерка»',
    alt: 'Портрет белого котика с тёмно-фиолетовой чёлкой, розовой прядью и кулоном',
    width: 608,
    height: 606,
  },
  {
    id: 'little-shelter',
    src: littleShelter,
    title: 'Маленькое укрытие',
    note: 'Иксик: «Мечтаю обнять тебя по-настоящему»',
    alt: 'Девушка бережно держит белого котика с крылышками среди облаков и фантастического тёмного мира',
    width: 582,
    height: 611,
  },
];
