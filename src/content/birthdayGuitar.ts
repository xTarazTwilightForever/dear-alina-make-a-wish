const videos = import.meta.glob<string>(
  '../assets/video/birthday-guitar.{mp4,m4v,mov,webm}',
  { eager: true, query: '?url', import: 'default' },
);

// One recording supplies both the final video and the candle's guitar melody.
export const birthdayGuitarVideo = Object.values(videos)[0];
