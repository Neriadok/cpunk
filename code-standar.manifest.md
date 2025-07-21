# Code standard

## Paradigm

- We use object oriented programing for components and pages
- We use functional programming for methods and triggers

## Files Structure

- We segregate methods in files by domain
- We use atomic design for components
- We use lib/_.ts for business logic and components/\*\*/_.ts for representation level
- We use atomic design

## Clean code

- We use self explained code
- We create methods with no more than 5 declarations
- We create methods with no more than 5 params
- We create methods with no more than 2 control structure levels
- We use meaningfull methods
- We use prefixes for array methods:
  - to: Array.map(toX);
  - into: Array.reduce(intoX);
  - by: Array.sort(byX);
  - is: Array.find(isX); Array.some(isX); Array.every(isX); Array.filter(isX);
- We prioritize reactive behaviour over asynchronous and asynchronous over schedulled, when possible.
- We prioritize vanilla JS when possible.

## Testing

- We use BDD over TDD
- We test acceptance criteria, coverage is not a priority
- We test specific use cases
- We only test what is exported
- We test what have previously failed
- We prioritize unit testing over integration testing and integration over e2e

### Unit testing

Sample:

```typescript
import { describe, it, expect } from 'vitest';
import { alphabetically } from './utils';

describe('utils library', () => {
  it('sort alphabetically', testSortAlphabetically);
});

function testSortAlphabetically() {
  const given = ['ba', 'c', 'bb', 'alpha', 'a'];
  const expected = ['a', 'alpha', 'ba', 'bb', 'c'];
  const actual = given.sort(alphabetically);
  expect(actual).toEqual(expected);
}
```
