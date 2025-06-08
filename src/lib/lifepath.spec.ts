import { getRandomEvent } from './lifepath';
import { describe, it, expect } from 'vitest';

describe('lifepath', () => {
  it('should return an event', assertLifepath);

  function assertLifepath() {
    const actual = getRandomEvent();
    expect(actual).toBeTypeOf('object');
    expect(actual).toHaveProperty('type');
    expect(actual).toHaveProperty('facts');
    expect(actual.type).toBeTypeOf('string');
    expect(actual.facts).toBeInstanceOf(Array);
  }
});
