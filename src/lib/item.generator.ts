import { v4 } from 'uuid';
import {
  bodyParts,
  cyberwareParts,
  dices,
  difficulties,
  LowValue,
  MidValue,
} from '../interfaces/game.interface';
import {
  Complement,
  Firearms,
  Item,
  MeleeWeapon,
  Cyberware,
} from '../interfaces/item.interface';
import { anyStats } from '../interfaces/stats.interface';
import { getRandomFrom, randomNum } from './utils';
import Chance from 'chance';
const chance = new Chance();

export function getRandomItem(empty?: boolean): Item {
  return [
    getRandomFirearm,
    getRandomMeleeWeapon,
    getRandomComplement,
    getRandomCyberware,
  ][Math.floor(Math.random() * 4)](empty);
}

export function getRandomFirearm(empty?: boolean): Firearms {
  return {
    uid: v4(),
    shop: 'firearms',
    name: '',
    description: '',
    precision: empty ? 0 : (randomNum(5) as MidValue),
    range: empty ? 0 : randomNum(100),
    burst: empty ? null : chance.bool() ? getRandomFrom(dices) : null,
    piercing: empty ? 0 : (randomNum(3) as LowValue),
    bleed: empty ? 0 : (randomNum(3) as LowValue),
    shock: empty ? 0 : (randomNum(3) as LowValue),
    poison: empty ? 0 : (randomNum(3) as LowValue),
    capacity: randomNum(24, 2),
    cyberware: empty ? null : chance.bool() ? getRandomFrom(bodyParts) : null,
  };
}

export function getRandomMeleeWeapon(empty?: boolean): MeleeWeapon {
  return {
    uid: v4(),
    shop: 'melee-weapons',
    name: '',
    description: '',
    piercing: empty ? 0 : (randomNum(3) as LowValue),
    damage: empty ? 0 : (randomNum(5) as MidValue),
    randomDamage: empty ? null : chance.bool() ? getRandomFrom(dices) : null,
    bleed: empty ? 0 : (randomNum(3) as LowValue),
    shock: empty ? 0 : (randomNum(3) as LowValue),
    poison: empty ? 0 : (randomNum(3) as LowValue),
    cyberware: empty ? null : chance.bool() ? getRandomFrom(bodyParts) : null,
  };
}

export function getRandomComplement(empty?: boolean): Complement {
  const activable = chance.bool();
  return {
    uid: v4(),
    shop: 'complements',
    name: '',
    description: '',
    stats: empty
      ? []
      : chance.bool()
        ? [
            getRandomFrom(anyStats),
            getRandomFrom(anyStats),
            getRandomFrom(anyStats),
          ]
        : [getRandomFrom(anyStats), getRandomFrom(anyStats)],
    bonus: randomNum(5) as LowValue,
    activable,
    extraPrice: 0,
    extraEffects: '',
    numberOfUses: empty ? 0 : activable ? randomNum(20) : 0,
  };
}

export function getRandomCyberware(empty?: boolean): Cyberware {
  const activable = chance.bool();
  return {
    uid: v4(),
    shop: 'cyberware',
    name: '',
    description: '',
    ice: getRandomFrom(difficulties),
    stats: empty
      ? []
      : chance.bool()
        ? [
            getRandomFrom(anyStats),
            getRandomFrom(anyStats),
            getRandomFrom(anyStats),
          ]
        : [getRandomFrom(anyStats), getRandomFrom(anyStats)],
    bonus: empty ? 0 : (randomNum(5) as LowValue),
    activable,
    extraPrice: 0,
    extraEffects: '',
    cooldown: activable ? (randomNum(3) as LowValue) : 0,
    part: getRandomFrom(cyberwareParts),
  };
}
