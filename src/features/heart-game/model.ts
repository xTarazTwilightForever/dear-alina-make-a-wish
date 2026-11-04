export const heartPositions = [
  [12, 22],
  [29, 7],
  [45, 23],
  [61, 7],
  [77, 22],
] as const;
export const heartCount = heartPositions.length;

export function collectHeart(
  collected: readonly number[],
  index: number,
): readonly number[] {
  if (
    !Number.isInteger(index) ||
    index < 0 ||
    index >= heartCount ||
    collected.includes(index)
  )
    return collected;
  return [...collected, index];
}

/** Alina travels left to right; the white cat waits at the same endpoint. */
export function getJourneyProgress(count: number) {
  const progress = Math.min(heartCount, Math.max(0, count)) / heartCount;
  return {
    progress,
    travelerPosition: 16 + progress * 48,
    companionPosition: 80,
    complete: progress === 1,
  };
}
