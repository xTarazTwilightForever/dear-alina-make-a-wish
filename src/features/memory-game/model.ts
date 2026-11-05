import { lovePairs } from '../../content/story';
import { shuffle } from '../../shared/lib/shuffle';

export interface MemoryCard {
  id: string;
  pairId: string;
  symbol: string;
  name: string;
  note: string;
}

export function createMemoryDeck(): MemoryCard[] {
  return shuffle(
    lovePairs.flatMap((pair) =>
      [0, 1].map((copy) => ({
        id: `${pair.id}-${copy}`,
        pairId: pair.id,
        symbol: pair.symbol,
        name: pair.name,
        note: pair.note,
      })),
    ),
  );
}
