import { CyberwarePart, Dice } from '../interfaces/game.interface';
import {
  Complement,
  Firearms,
  MeleeWeapon,
  Item,
  Cyberware,
  Weapon,
} from '../interfaces/item.interface';
import { AnyStat, states, stats } from '../interfaces/stats.interface';

export function calculateItemPrice(item: Omit<Item, 'price'>) {
  const calculateFunctions = {
    firearms: calculateFirearmPrice,
    'melee-weapons': calculateMeleeWeaponPrice,
    complements: calculateComplementPrice,
    cyberware: calculateCyberwarePrice,
  };
  return calculateFunctions[item.shop as keyof typeof calculateFunctions]?.(
    item as any
  );
}

export function calculateCyberwarePrice(
  item: Omit<Cyberware, 'price'>
): number {
  const operationPrice = getOperationPrice(item.part);
  const statMultiplier = getAllStatMultiplier(item);
  const icePrice = getIcePrice(item);
  const ACTIVABLE_MULTIPLIER = (item.cooldown + 1) * 0.5;
  const price = Math.ceil(
    statMultiplier * item.bonus * (item.activable ? ACTIVABLE_MULTIPLIER : 1)
  );
  return price + icePrice + operationPrice + item.extraPrice;
}

export function calculateMeleeWeaponPrice(
  item: Omit<MeleeWeapon, 'price'>
): number {
  const MELEE_MULTIPLIER = 5;
  const operationPrice = getOperationPrice(item.cyberware);
  return (
    Math.ceil(
      getDamageMultiplier(item, item.damage, 'randomDamage') * MELEE_MULTIPLIER
    ) + operationPrice
  );
}

export function calculateFirearmPrice(item: Omit<Firearms, 'price'>): number {
  const operationPrice = getOperationPrice(item.cyberware);
  const BASE_DAMAGE = 1;
  const BASE_PRECISION = 5;
  const precisionValue = (item.precision + BASE_PRECISION) / 10;
  const damageMultiplier = getDamageMultiplier(item, BASE_DAMAGE, 'burst');
  return (
    Math.ceil(damageMultiplier * precisionValue) * item.capacity +
    operationPrice
  );
}

export function calculateComplementPrice(
  item: Omit<Complement, 'price'>
): number {
  const statMultiplier = getAllStatMultiplier(item);
  const ACTIVABLE_MULTIPLIER = item.numberOfUses
    ? 0.5 - 0.4 / item.numberOfUses
    : 0.5;
  const price = Math.ceil(
    statMultiplier * item.bonus * (item.activable ? ACTIVABLE_MULTIPLIER : 1)
  );
  return price + item.extraPrice;
}

function getAllStatMultiplier({
  stats,
}: Omit<Complement | Cyberware, 'price'>) {
  const STAT_BASE_PRICE = 10;
  return stats.reduce(intoAllStatMultiplier, STAT_BASE_PRICE);
}

export function getStatMultiplier(stat: AnyStat): number {
  return stats.includes(stat as any)
    ? 25
    : states.includes(stat as any)
      ? 10
      : stat === 'actions'
        ? 50
        : stat === 'health'
          ? 25
          : 5;
}

export function intoAllStatMultiplier(
  multiplier: number,
  stat: string
): number {
  return multiplier * getStatMultiplier(stat as AnyStat);
}

function getEffectMultiplier(item: Omit<Weapon, 'price'>): number {
  return (item.bleed + 1) * (item.shock + 1) * (item.poison + 1);
}

function getDamageMultiplier(
  item: Omit<Firearms | MeleeWeapon, 'price'>,
  damage: number = 1,
  randomDamage: 'burst' | 'randomDamage'
): number {
  return (
    (damage +
      getDiceAverageValue(item[randomDamage as keyof typeof item] as Dice) +
      item.piercing / 2) *
    getEffectMultiplier(item)
  );
}

function getDiceAverageValue(dice: Dice | null): number {
  return dice
    ? {
        '1D4': 2,
        '1D6': 3,
        '1D8': 4,
        '1D10': 5,
        '1D12': 6,
        '1D20': 10,
      }[dice]
    : 0;
}

function getOperationPrice(part: CyberwarePart | null): number {
  return part
    ? {
        head: 8000,
        trunk: 5000,
        armR: 3000,
        armL: 3000,
        legR: 2000,
        legL: 2000,
        eyes: 1000,
        fullBody: 21000,
      }[part]
    : 0;
}

function getIcePrice({ ice, bonus }: Omit<Cyberware, 'price'>): number {
  return ice
    ? {
        instant: 0,
        easy: 500,
        complex: 1000,
        hard: 2000,
        'very-hard': 3000,
      }[ice] * bonus
    : 0;
}
