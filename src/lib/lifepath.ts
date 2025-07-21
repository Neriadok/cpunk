import {
  badLuck,
  feelings,
  goodLuck,
  LifePathEvent,
  LuckEvent,
  Modifier,
  problematicLove,
  relationEnemy,
  relationEnemyCause,
  relationEnemyFeelings,
  relationEnemyWhatToDo,
  relationEnemyWhatToExpect,
  relationFriend,
  tragicLove,
} from '../interfaces/lifepath.interface';
import { getRandomFrom, randomBool, randomNum } from '../lib/utils';
import { Character } from '../interfaces/character.interface';
import { Skill } from '../interfaces/skills.interface';
import { Stat } from '../interfaces/stats.interface';

export function getRandomEvent(): LifePathEvent {
  const type = Math.random() * 10;
  // return getGoodLuckEvent();
  return type < 3
    ? getRandomLuckEvent()
    : type < 6
      ? getRandomRelationEvent()
      : type < 8
        ? getRandomLoveEvent()
        : { type: 'none', facts: [] };
}

export function getRandomLoveEvent(): LifePathEvent {
  const event = Math.random() * 10;
  const facts =
    event < 4
      ? ['life-path.event-love-happy']
      : event < 5
        ? [
            'life-path.event-love-tragedy-' + getRandomFrom(tragicLove),
            'life-path.event-love-feelings-' + getRandomFrom(feelings),
          ]
        : event < 7
          ? [
              'life-path.event-love-problematic-' +
                getRandomFrom(problematicLove),
            ]
          : ['life-path.event-love-affairs'];
  return { type: 'love', facts };
}

export function getRandomRelationEvent(): LifePathEvent {
  return randomBool() ? getRandomEnemyEvent() : getRandomFriendEvent();
}

export function getRandomEnemyEvent(): LifePathEvent {
  return {
    type: 'relation-enemy',
    facts: [
      'life-path.event-relation-enemy-is-' + getRandomFrom(relationEnemy),
      'life-path.event-relation-enemy-what-to-expect-' +
        getRandomFrom(relationEnemyWhatToExpect),
      'life-path.event-relation-enemy-hate-' +
        getRandomFrom(relationEnemyFeelings),
      'life-path.event-relation-enemy-cause-' +
        getRandomFrom(relationEnemyCause),
      'life-path.event-relation-enemy-what-to-do-' +
        getRandomFrom(relationEnemyWhatToDo),
    ],
  };
}

export function getRandomFriendEvent(): LifePathEvent {
  return {
    type: 'relation-friend',
    facts: [
      'life-path.event-relation-friend-is-' + getRandomFrom(relationFriend),
    ],
  };
}

export function getRandomLuckEvent(): LifePathEvent {
  return randomBool() ? getBadLuckEvent() : getGoodLuckEvent();
}

export function getBadLuckEvent(): LifePathEvent {
  const event = getRandomFrom(badLuck);
  return getLuckEvent(event, 'luck-bad');
}

export function getGoodLuckEvent(): LifePathEvent {
  const event = getRandomFrom(goodLuck);
  return getLuckEvent(event, 'luck-good');
}

export function getLuckEvent(
  event: LuckEvent,
  type: 'luck-good' | 'luck-bad'
): LifePathEvent {
  const baseLifePathEvent: LifePathEvent = { type, facts: [], modifiers: [] };
  return intoLuckEvents([], event).reduce(
    (lifePathEvent, e) => intoLifePathLuckEvent(lifePathEvent, e, type),
    baseLifePathEvent
  );
}

export function intoLuckEvents(
  luckEvents: LuckEvent[],
  event: LuckEvent
): LuckEvent[] {
  const events = event.extraFact
    ? intoLuckEvents([event], getRandomFrom(event.extraFact))
    : [event];
  return luckEvents.concat(events);
}

export function intoLifePathLuckEvent(
  lifePathEvent: LifePathEvent,
  event: LuckEvent,
  prefix: 'luck-good' | 'luck-bad'
): LifePathEvent {
  const facts = lifePathEvent.facts.concat([
    `life-path.event-${prefix}-${event.label}`,
  ]);
  const modifiers = lifePathEvent.modifiers?.concat(
    (event.modifiers || []).map(toFinalModifier)
  );
  return { ...lifePathEvent, facts, modifiers };
}

export function toFinalModifier(modifier: Modifier): Modifier {
  const amount = modifier.random ? randomNum(modifier.amount) : modifier.amount;
  const property =
    typeof modifier.property === 'string'
      ? modifier.property
      : getRandomFrom(modifier.property);
  return { kind: modifier.kind, property, amount };
}

export function getBonus(
  character: Partial<Character>,
  property: Skill | Stat | string,
  kind?: 'skills' | 'stats'
): number {
  const modifiers = getModifiers(character, property, kind);
  return modifiers.reduce((sum, { amount }) => sum + (amount || 0), 0);
}

export function getBonifiedSkills({ events }: Partial<Character>): string[] {
  return (events || [])
    .reduce(intoModifiers, [])
    .filter(({ kind }) => kind === 'skills')
    .reduce(
      (modified: string[], { property }) =>
        typeof property === 'string'
          ? [...modified, property]
          : [...modified, ...property],
      []
    );
}

export function getModifiers(
  { events }: Partial<Character>,
  property: Skill | Stat | string,
  kind?: 'skills' | 'stats'
): Modifier[] {
  return (events || [])
    .reduce(intoModifiers, [])
    .filter((modifier: Modifier) => isModifying(property, modifier, kind));
}

export function intoModifiers(
  allModifiers: Modifier[],
  { modifiers }: LifePathEvent
): Modifier[] {
  return allModifiers.concat(modifiers || []);
}

export function isModifying(
  property: string,
  modifier: Modifier,
  kind?: 'skills' | 'stats'
): boolean {
  return (
    !kind ||
    (modifier.kind === kind &&
      (typeof modifier.property === 'string'
        ? modifier.property === property
        : modifier.property.includes(property)))
  );
}
