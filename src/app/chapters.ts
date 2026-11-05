export const chapters = [
  'intro',
  'story',
  'game',
  'memory',
  'message',
  'letter',
  'album',
  'ending',
] as const;
export type Chapter = (typeof chapters)[number];
