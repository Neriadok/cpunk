import { Item } from '../interfaces/item.interface';
import { getRandomFrom, randomNum } from './utils';
import Chance from 'chance';
const chance = new Chance();

export function getRandomItem(): Item {
  return [
    getRandomFirearm,
    getRandomMeleeWeapon,
    getRandomFirstAidKitItem,
    getRandomComplement,
    getRandomAmmunition,
  ][Math.round(Math.random() * 5)]();
}

function getRandomFirearm(): Item {
  return {
    shop: 'firearms',
    name: chance.sentence({ words: 2 }),
    description: chance.paragraph({ sentences: 1 }),
    precision: randomNum(10),
    rafaga: getRandomFrom(['1D4', '1D6', '1D8', '1D10', '1D12', '1D20']),
  } as any;
}

function calculateMeleeWeaponPrice(meleeWeapon: any): number {
  const damageValue = extractAverageDamage(meleeWeapon.dano);
  return damageValue * meleeWeapon.sangrado * meleeWeapon.contusion * 5;
}

function extractAverageDamage(damageString: string): number {
  const [num, dice] = damageString.split('D');
  const numberOfDice = parseInt(num, 10);
  const diceValue = parseInt(dice, 10);
  return (numberOfDice * (diceValue + 1)) / 2; // Formula para el promedio de un dado
}

function getRandomMeleeWeapon(): Item {
  const meleeWeapon = {
    shop: 'melee-weapons',
    name: chance.sentence({ words: 2 }),
    description: chance.paragraph({ sentences: 1 }),
    dano: chance.d6().toString(),
    sangrado: randomNum(5),
    contusion: randomNum(5),
  } as any;
  return { ...meleeWeapon, price: calculateMeleeWeaponPrice(meleeWeapon) };
}

function getRandomFirstAidKitItem(): Item {
  // Implementa la lógica para generar un suministro de botiquín aleatorio
  return {
    shop: 'first-aid-kit',
    name: chance.sentence({ words: 2 }),
    description: chance.paragraph({ sentences: 1 }),
    tipo: getRandomFrom([
      'adrenaline',
      'transfusion-liquids',
      'cauterizer',
      'antidote',
    ]),
  } as any; // Ajusta "as any" al tipo correcto "SuministroBotiquin"
}

function getRandomComplement(): Item {
  // Implementa la lógica para generar un complemento aleatorio
  return {
    shop: 'complements',
    name: chance.sentence({ words: 2 }),
    description: chance.paragraph({ sentences: 1 }),
    precision: randomNum(10),
  } as any; // Ajusta "as any" al tipo correcto "Complemento"
}

function getRandomAmmunition(): Item {
  return {
    shop: 'ammunition',
    name: chance.sentence({ words: 2 }),
    description: chance.paragraph({ sentences: 1 }),
    capacidad: randomNum(50, 10),
    perforante: randomNum(5),
    punta_hueca: chance.bool(),
    explosivo: chance.bool(),
    toxico: chance.bool(),
    dano: chance.d6().toString(),
    danoAleatorio: chance.bool(),
  } as any;
}
