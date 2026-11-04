export const chapters = [
  'intro',
  'story',
  'game',
  'memory',
  'message',
  'reunion',
  'album',
  'letter',
] as const;
export type Chapter = (typeof chapters)[number];
