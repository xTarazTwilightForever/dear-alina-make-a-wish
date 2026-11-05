import birthdaySurprise from '../assets/illustrations/iksik-creates-alinas-surprise.png';
import gamingNight from '../assets/illustrations/alina-and-iksik-gaming-night.png';
import mirrorHug from '../assets/illustrations/alina-and-iksik-mirror-hug.png';
import favoritePonies from '../assets/illustrations/alina-and-iksik-favorite-ponies.png';
import choosingOutfits from '../assets/illustrations/alina-and-iksik-choosing-outfits.png';
import bakingCakes from '../assets/illustrations/alina-and-iksik-baking-cakes.png';
import curlyHair from '../assets/illustrations/alina-iksik-and-tishka-curly-hair.png';
import paintedGift from '../assets/illustrations/iksik-paints-for-alina.png';
import treadmill from '../assets/illustrations/iksik-runs-to-alina.png';
import gentleSupport from '../assets/illustrations/iksik-cares-for-alina.png';
import tishkaCare from '../assets/illustrations/alina-cares-for-tishka.png';
import thousandKittens from '../assets/illustrations/alina-and-a-thousand-iksiks.png';
import acrossDistance from '../assets/illustrations/alina-and-iksik-across-the-distance.png';
import starryEvening from '../assets/illustrations/alina-and-iksik-starry-evening.png';
import cupOfLove from '../assets/illustrations/iksik-in-alinas-cup.png';
import littleSweetheart from '../assets/illustrations/iksik-and-alinas-sweet-mood.png';
import warmEmbrace from '../assets/illustrations/alina-and-iksik-five-more-minutes.png';
import sunlitAfternoon from '../assets/illustrations/alina-and-iksik-sunny-day.png';
import whiteKitten from '../assets/illustrations/iksik-portrait-for-alina.png';
import littleShelter from '../assets/illustrations/alina-and-iksik-little-shelter.png';

export interface AlbumIllustration {
  id: string;
  priority?: boolean;
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
    src: birthdaySurprise,
    id: 'iksik-creates-alinas-surprise',
    title: 'Иксик готовит сюрприз Алине',
    note: 'В каждой строчке немного любви',
    dialogue:
      'Моя Алина, я собирал эту историю и думал, как ты будешь улыбаться. За каждым сердечком здесь прячется твой Никита, который очень любит тебя.',
    alt: 'Иксик в наушниках создаёт сайт для Алины за компьютером в уютной комнате с розовой подсветкой',
    width: 1424,
    height: 1105,
    priority: true,
  },
  {
    src: gamingNight,
    id: 'alina-and-iksik-gaming-night',
    title: 'Вечер Алины и Иксика',
    note: 'Одна команда в любой игре',
    dialogue:
      'Пантерка, я мечтаю однажды устроиться рядом с тобой, взять второй геймпад и смеяться над нашими неудачными попытками. С тобой мне хочется быть одной командой. Твой Никита.',
    alt: 'Алина и Иксик с геймпадами играют в It Takes Two на кровати среди мягких подушек',
    width: 1672,
    height: 941,
    priority: true,
  },
  {
    src: mirrorHug,
    id: 'alina-and-iksik-mirror-hug',
    title: 'Объятия Алины и Иксика',
    note: 'Мечта о нашем первом общем снимке',
    dialogue:
      'Моя Алина, как же я жду дня, когда мы сможем сделать наше первое фото вместе. А потом я ещё немного обниму тебя, даже когда камера уже будет убрана.',
    alt: 'Алина фотографирует себя в зеркале, а большой белый Иксик нежно обнимает её со спины',
    width: 941,
    height: 1672,
    priority: true,
  },
  {
    src: favoritePonies,
    id: 'alina-and-iksik-favorite-ponies',
    title: 'Любимые истории Алины и Иксика',
    note: 'Радоваться тому, что любишь ты',
    dialogue:
      'Моя Алина, мне хочется узнавать всё, от чего у тебя загораются глаза. Слушать про любимые истории, запоминать мелочи и радоваться рядом с тобой. Никита.',
    alt: 'Алина с Иксиком на плече любуется большим флагом с любимыми пони в комнате со звёздными украшениями',
    width: 1086,
    height: 1448,
    priority: true,
  },
  {
    src: choosingOutfits,
    id: 'alina-and-iksik-choosing-outfits',
    title: 'Алина выбирает, Иксик любуется',
    note: 'Самая красивая часть любого дня',
    dialogue:
      'Пантерка, можешь долго выбирать наряд, а я буду смотреть на тебя и всё равно думать об одном: какая же ты у меня красивая. Даже когда просто улыбаешься своему котику.',
    alt: 'Алина улыбается Иксику, который устроился среди платьев, юбок и розовых пакетов на кровати',
    width: 1254,
    height: 1254,
    priority: true,
  },
  {
    src: bakingCakes,
    id: 'alina-and-iksik-baking-cakes',
    title: 'Алина печёт, Иксик помогает',
    note: 'Любовь с ароматом домашнего торта',
    dialogue:
      'Моя Алина, я бы с радостью стал твоим помощником на кухне. Подавал бы всё нужное, пробовал крем и придумывал повод ещё раз обнять тебя. Твой Никита.',
    alt: 'Алина в розовом фартуке показывает два готовых торта, а сияющий Иксик с крылышками радуется рядом',
    width: 1086,
    height: 1448,
    priority: true,
  },
  {
    src: curlyHair,
    id: 'alina-iksik-and-tishka-curly-hair',
    title: 'Локоны Алины и два котика',
    note: 'Хозяйка собирается, котики волнуются',
    dialogue:
      'Хозяйка, мы с Тишкой, кажется, слишком впечатлительные. Ты только взялась за локоны, а у нас уже важное совещание: кто первым скажет, что ты невероятно красивая. Никита просит первое слово.',
    alt: 'Алина делает локоны перед зеркалом, а Иксик и серый Тишка забавно волнуются внизу',
    width: 1335,
    height: 1178,
    priority: true,
  },
  {
    src: paintedGift,
    id: 'iksik-paints-for-alina',
    title: 'Иксик рисует для Алины',
    note: 'Когда очень хочется сделать красиво',
    dialogue:
      'Моя Алина, если у меня получится немного криво, знай: я всё равно старался от всего сердца. Мне так хочется подарить тебе что-то особенное, чего больше ни у кого не будет. Твой Никита.',
    alt: 'Иксик старательно выводит надпись ALLUKA на большой розовой коробочке, окружённый баночками с краской и сердечками',
    width: 1335,
    height: 1178,
    priority: true,
  },
  {
    src: treadmill,
    id: 'iksik-runs-to-alina',
    title: 'Иксик спешит к Алине',
    note: 'Котик немного переоценил скорость',
    dialogue:
      'Пантерка, кажется, Никита выбрал слишком быстрый способ добраться к тебе. Пока я разбираюсь со своими лапками, можно мне одно твоё сообщение? Оно всегда помогает мне улыбнуться.',
    alt: 'Иксик комично спотыкается на беговой дорожке рядом с пролитым напитком и книгой о том, как гладить котов',
    width: 1536,
    height: 1024,
    priority: true,
  },
  {
    src: gentleSupport,
    id: 'iksik-cares-for-alina',
    title: 'Иксик заботится об Алине',
    note: 'Иногда любовь говорит совсем тихо',
    dialogue:
      'Моя Алина, когда тебе нехорошо, мне хочется быть рядом. Принести воды, укрыть тебя, говорить потише и просто подержать за руку. Я люблю тебя и в самые тихие дни. Никита.',
    alt: 'Алина отдыхает под одеялом с закрытыми глазами, а сияющий Иксик с крылышками держит рядом сумочку заботы',
    width: 1254,
    height: 1254,
    priority: true,
  },
  {
    src: tishkaCare,
    id: 'alina-cares-for-tishka',
    title: 'Алина заботится о Тишке',
    note: 'Столько нежности в твоих руках',
    dialogue:
      'Моя Алина, меня трогает, как бережно ты заботишься о Тишке. В твоих руках столько нежности. Мне хочется заботиться о тебе так же внимательно. Твой Никита.',
    alt: 'Алина осторожно ухаживает за серым Тишкой с белой грудкой, который спокойно лежит на мягкой кровати',
    width: 1086,
    height: 1448,
    priority: true,
  },
  {
    src: thousandKittens,
    id: 'alina-and-a-thousand-iksiks',
    title: 'Алина и тысяча Иксиков',
    note: 'Тысяча маленьких способов сказать люблю',
    dialogue:
      'Моя Алина, даже если бы у меня была тысяча маленьких котиков, каждому я поручил бы сказать тебе одно и то же: Никита очень тебя любит. И все они попросились бы к тебе на ручки.',
    alt: 'Алина обнимает Иксика в солнечном лесу, где вокруг, на ветках и среди цветов устроились сотни похожих на него котят',
    width: 1254,
    height: 1254,
    priority: true,
  },
  {
    src: acrossDistance,
    id: 'alina-and-iksik-across-the-distance',
    title: 'Иксик скучает, Алина улыбается',
    note: 'Между сообщениями я думаю о тебе',
    dialogue:
      'Пантерка, пока ты занята своим днём, я иногда смотрю на твою фотографию и скучаю. Но мне так хорошо от мысли, что где-то сейчас улыбается моя Алина. Я дождусь твоего сообщения. Никита.',
    alt: 'Слева Иксик скучает у фотографии Алины дождливым вечером, а справа Алина улыбается детям за столом в солнечный день',
    width: 1672,
    height: 941,
    priority: true,
  },
  {
    id: 'starry-evening',
    src: starryEvening,
    title: 'Звёздный вечер Алины и Иксика',
    note: 'Никита мечтает впервые обнять тебя',
    dialogue:
      'Моя Алина, я мечтаю о таком вечере: ты рядом, за окном звёзды, а мне больше не нужно скучать по тебе через экран.',
    alt: 'Алина обнимает Иксика с фиолетовой чёлкой у окна под звёздным небом',
    width: 1086,
    height: 1448,
  },
  {
    id: 'cup-of-love',
    src: cupOfLove,
    title: 'Иксик в чашке для Алины',
    note: 'В каждой чашке немного нежности',
    dialogue:
      'Пантерка, если бы любовь можно было налить в чашку, я бы каждое утро приносил тебе самую полную. Твой Никита.',
    alt: 'Иксик с розовой прядью сидит в фиолетовой кружке с надписью I love Alina',
    width: 1100,
    height: 1430,
  },
  {
    id: 'sunlit-afternoon',
    src: sunlitAfternoon,
    title: 'Солнечный день Алины и Иксика',
    note: 'Наша первая прогулка пока живёт в мечтах',
    dialogue:
      'Моя Алина, хочу однажды гулять с тобой по солнечным улицам, держать тебя за руку и никуда не спешить. Просто быть твоим Никитой рядом.',
    alt: 'Алина держит Иксика на залитой солнцем улице',
    width: 1254,
    height: 1254,
  },
  {
    id: 'warm-embrace',
    src: warmEmbrace,
    title: 'Алина и Иксик: ещё пять минуточек',
    note: 'Ещё немного побыть рядом с тобой',
    dialogue:
      'Хозяйка, можно я попрошу ещё пять минуточек в твоих объятиях? Кажется, Никита совсем не умеет отпускать свою самую любимую мечту.',
    alt: 'Алина нежно обнимает Иксика с нимбом под тёплым одеялом',
    width: 1289,
    height: 1221,
  },
  {
    id: 'little-sweetheart',
    src: littleSweetheart,
    title: 'Сладкое настроение Иксика',
    note: 'Влюблённый котик немного смущается',
    dialogue:
      'Пантерка, ты умеешь заставить меня улыбнуться одним сообщением. Представляешь, что будет с Никитой, когда ты улыбнёшься ему при встрече?',
    alt: 'Иксик с крылышками обнимает красную банку напитка среди розовых сердечек',
    width: 1010,
    height: 1320,
  },
  {
    id: 'white-kitten',
    src: whiteKitten,
    title: 'Твой Иксик, моя Алина',
    note: 'Твой Никита и твой белый котик',
    dialogue:
      'Моя Алина, за этой розовой прядью прячется Никита, который очень любит тебя. И очень ждёт, когда ты наконец погладишь своего Иксика по голове.',
    alt: 'Портрет Иксика с тёмно-фиолетовой чёлкой, розовой прядью и кулоном',
    width: 608,
    height: 606,
  },
  {
    id: 'little-shelter',
    src: littleShelter,
    title: 'Укрытие Алины и Иксика',
    note: 'Место, где можно просто обнять друг друга',
    dialogue:
      'Моя Алина, мне хочется быть рядом, когда тебе нужна тишина. Обнять тебя, выслушать и напомнить, как сильно твой Никита тебя любит.',
    alt: 'Алина бережно держит Иксика с крылышками среди облаков и фантастического тёмного мира',
    width: 1254,
    height: 1254,
  },
];

export const priorityIllustrationCount = albumIllustrations.filter(
  (illustration) => illustration.priority,
).length;
