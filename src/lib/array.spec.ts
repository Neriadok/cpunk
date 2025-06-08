import { toggleArrayValue } from './array';
import { describe, it, expect } from 'vitest';

describe('array', () => {
  it('should add Item', assertArrayAdd);
  it('should remove item', assertArrayRemove);

  function assertArrayAdd() {
    const given = { array: [], value: 1 };
    const actual = toggleArrayValue(given.array, given.value);
    expect(actual.length).toBe(1);
    expect(actual[0]).toBe(1);
  }

  function assertArrayRemove() {
    const given = { array: [1], value: 1 };
    const actual = toggleArrayValue(given.array, given.value);
    expect(actual.length).toBe(0);
  }
});
