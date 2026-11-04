export const chapters = [
  'intro',
  'story',
  'game',
  'memory',
  'message',
  'letter',
  'album',
] as const;
export type Chapter = (typeof chapters)[number];
