import assert from 'node:assert/strict';
import { test } from 'node:test';
import {
  collectHeart,
  getJourneyProgress,
  heartCount,
} from '../src/features/heart-game/model.ts';

test('hearts can be collected in any order, but each counts once', () => {
  let collected = [];
  for (const index of [4, 1, 3, 0, 2])
    collected = collectHeart(collected, index);
  assert.equal(collected.length, heartCount);
  assert.strictEqual(collectHeart(collected, 1), collected);
  assert.equal(getJourneyProgress(collected.length).complete, true);
});

test('invalid heart indexes cannot advance the journey', () => {
  const collected = [];
  for (const index of [-1, heartCount, 1.5, NaN])
    assert.strictEqual(collectHeart(collected, index), collected);
});

test('only the dark cat approaches; the white cat stays in place', () => {
  const start = getJourneyProgress(0);
  let previousDistance = Infinity;
  for (let count = 0; count <= heartCount; count++) {
    const current = getJourneyProgress(count);
    assert.equal(current.companionPosition, start.companionPosition);
    const distance = current.companionPosition - current.travelerPosition;
    assert.ok(distance < previousDistance);
    assert.ok(distance > 0);
    assert.equal(current.complete, count === heartCount);
    previousDistance = distance;
  }
});

test('progress stays within the endpoints', () => {
  assert.deepEqual(getJourneyProgress(-1), getJourneyProgress(0));
  assert.deepEqual(
    getJourneyProgress(heartCount + 1),
    getJourneyProgress(heartCount),
  );
});
