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
  Ammunition,
  MeleeWeapon,
  Cyberware,
} from '../interfaces/item.interface';
import { anyStats } from '../interfaces/stats.interface';
import {
  calculateComplementPrice,
  calculateCyberwarePrice,
  calculateFirearmPrice,
  calculateMagazinePrice,
  calculateMeleeWeaponPrice,
} from './item.price';
import { getRandomFrom, randomNum } from './utils';
import Chance from 'chance';
const chance = new Chance();

export function getRandomItem(empty?: boolean): Item {
  return [
    getRandomFirearm,
    getRandomMeleeWeapon,
    getRandomComplement,
    getRandomAmmunition,
    getRandomCyberware,
  ][Math.floor(Math.random() * 5)](empty);
}

export function getRandomFirearm(empty?: boolean): Firearms {
  const item: Omit<Firearms, 'price'> = {
    uid: v4(),
    shop: 'firearms',
    name: '',
    description: '',
    precision: empty ? 0 : randomNum(10) * 5,
    burst: empty ? null : chance.bool() ? getRandomFrom(dices) : null,
  };
  return { ...item, price: calculateFirearmPrice(item) };
}

export function getRandomMeleeWeapon(empty?: boolean): MeleeWeapon {
  const meleeWeapon: Omit<MeleeWeapon, 'price'> = {
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
  return { ...meleeWeapon, price: calculateMeleeWeaponPrice(meleeWeapon) };
}

export function getRandomComplement(empty?: boolean): Complement {
  const activable = chance.bool();
  const item: Omit<Complement, 'price'> = {
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
  return { ...item, price: calculateComplementPrice(item) };
}

export function getRandomCyberware(empty?: boolean): Cyberware {
  const activable = chance.bool();
  const item: Omit<Cyberware, 'price'> = {
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
  return { ...item, price: calculateCyberwarePrice(item) };
}

export function getRandomAmmunition(empty?: boolean): Ammunition {
  const item: Omit<Ammunition, 'price'> = {
    uid: v4(),
    shop: 'ammunition',
    name: '',
    description: '',
    piercing: empty ? 0 : (randomNum(3) as LowValue),
    bleed: empty ? 0 : (randomNum(3) as LowValue),
    shock: empty ? 0 : (randomNum(3) as LowValue),
    poison: empty ? 0 : (randomNum(3) as LowValue),
    randomDamage: empty ? null : chance.bool() ? getRandomFrom(dices) : null,
    capacity: randomNum(24, 2),
    cyberware: empty ? null : chance.bool() ? getRandomFrom(bodyParts) : null,
  };
  return { ...item, price: calculateMagazinePrice(item) };
}
