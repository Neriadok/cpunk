import { dices, LowValue, MidValue } from '../interfaces/game.interface';
import {
  Complement,
  Firearms,
  Item,
  Magazine,
  MeleeWeapon,
} from '../interfaces/item.interface';
import { anyStats } from '../interfaces/stats.interface';
import {
  calculateComplementPrice,
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
  ][Math.round(Math.random() * 5)]();
}

function getRandomFirearm(): Firearms {
  const item: Omit<Firearms, 'price'> = {
    shop: 'firearms',
    name: chance.sentence({ words: 2 }),
    description: '',
    precision: randomNum(10) * 5,
    burst: chance.bool() ? getRandomFrom(dices) : null,
  };
  return { ...item, price: calculateFirearmPrice(item) };
}

function getRandomMeleeWeapon(): MeleeWeapon {
  const meleeWeapon: Omit<MeleeWeapon, 'price'> = {
    shop: 'melee-weapons',
    name: chance.sentence({ words: 2 }),
    description: '',
    piercing: randomNum(3) as LowValue,
    damage: randomNum(5) as MidValue,
    randomDamage: chance.bool() ? getRandomFrom(dices) : null,
    bleed: randomNum(3) as LowValue,
    shock: randomNum(3) as LowValue,
    poison: randomNum(3) as LowValue,
  };
  return { ...meleeWeapon, price: calculateMeleeWeaponPrice(meleeWeapon) };
}

function getRandomComplement(): Complement {
  const item: Omit<Complement, 'price'> = {
    shop: 'complements',
    name: chance.sentence({ words: 2 }),
    description: chance.paragraph({ sentences: 1 }),
    stat: getRandomFrom(anyStats),
    bonus: randomNum(5) as LowValue,
    activable: chance.bool(),
    extraPrice: 0,
    extraEffects: '',
  };
  return { ...item, price: calculateComplementPrice(item) };
}

function getRandomAmmunition(): Magazine {
  const item: Omit<Magazine, 'price'> = {
    shop: 'ammunition',
    name: chance.sentence({ words: 2 }),
    description: '',
    piercing: randomNum(3) as LowValue,
    bleed: randomNum(3) as LowValue,
    shock: randomNum(3) as LowValue,
    poison: randomNum(3) as LowValue,
    randomDamage: chance.bool() ? getRandomFrom(dices) : null,
    capacity: randomNum(24, 2),
  };
  return { ...item, price: calculateMagazinePrice(item) };
}
