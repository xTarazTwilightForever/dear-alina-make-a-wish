const videos = import.meta.glob<string>(
  '../assets/video/birthday-guitar.{mp4,m4v,mov,webm}',
  { eager: true, query: '?url', import: 'default' },
);

const melodies = import.meta.glob<string>(
  '../assets/audio/birthday-guitar.m4a',
  { eager: true, query: '?url', import: 'default' },
);
const posters = import.meta.glob<string>(
  '../assets/video/birthday-guitar-poster.jpg',
  { eager: true, query: '?url', import: 'default' },
);

export const birthdayGuitarVideo = Object.values(videos)[0];
export const birthdayGuitarMelody =
  Object.values(melodies)[0] ?? birthdayGuitarVideo;
export const birthdayGuitarPoster = Object.values(posters)[0];
