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

export function getRandomItem(): Item {
  return [
    getRandomFirearm,
    getRandomMeleeWeapon,
    getRandomComplement,
    getRandomAmmunition,
    getRandomCyberware,
  ][Math.floor(Math.random() * 5)]();
}

export function getRandomFirearm(): Firearms {
  const item: Omit<Firearms, 'price'> = {
    shop: 'firearms',
    name: '',
    description: '',
    precision: randomNum(10) * 5,
    burst: chance.bool() ? getRandomFrom(dices) : null,
  };
  return { ...item, price: calculateFirearmPrice(item) };
}

export function getRandomMeleeWeapon(): MeleeWeapon {
  const meleeWeapon: Omit<MeleeWeapon, 'price'> = {
    shop: 'melee-weapons',
    name: '',
    description: '',
    piercing: randomNum(3) as LowValue,
    damage: randomNum(5) as MidValue,
    randomDamage: chance.bool() ? getRandomFrom(dices) : null,
    bleed: randomNum(3) as LowValue,
    shock: randomNum(3) as LowValue,
    poison: randomNum(3) as LowValue,
    cyberware: chance.bool() ? getRandomFrom(bodyParts) : null,
  };
  return { ...meleeWeapon, price: calculateMeleeWeaponPrice(meleeWeapon) };
}

export function getRandomComplement(): Complement {
  const activable = chance.bool();
  const item: Omit<Complement, 'price'> = {
    shop: 'complements',
    name: '',
    description: '',
    stats: chance.bool()
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
    numberOfUses: activable ? randomNum(20) : 0,
  };
  return { ...item, price: calculateComplementPrice(item) };
}

export function getRandomCyberware(): Cyberware {
  const activable = chance.bool();
  const item: Omit<Cyberware, 'price'> = {
    shop: 'cyberware',
    name: '',
    description: '',
    ice: getRandomFrom(difficulties),
    stats: chance.bool()
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
    cooldown: activable ? (randomNum(3) as LowValue) : 0,
    part: getRandomFrom(cyberwareParts),
  };
  return { ...item, price: calculateCyberwarePrice(item) };
}

export function getRandomAmmunition(): Ammunition {
  const item: Omit<Ammunition, 'price'> = {
    shop: 'ammunition',
    name: '',
    description: '',
    piercing: randomNum(3) as LowValue,
    bleed: randomNum(3) as LowValue,
    shock: randomNum(3) as LowValue,
    poison: randomNum(3) as LowValue,
    randomDamage: chance.bool() ? getRandomFrom(dices) : null,
    capacity: randomNum(24, 2),
    cyberware: chance.bool() ? getRandomFrom(bodyParts) : null,
  };
  return { ...item, price: calculateMagazinePrice(item) };
}
