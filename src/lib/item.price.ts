import { CyberwarePart, Dice } from '../interfaces/game.interface';
import {
  Complement,
  Firearms,
  Ammunition,
  MeleeWeapon,
  Item,
  Cyberware,
} from '../interfaces/item.interface';
import { AnyStat, states, stats } from '../interfaces/stats.interface';

export function calculateItemPrice(item: Omit<Item, 'price'>) {
  const calculateFunctions = {
    firearms: calculateFirearmPrice,
    'melee-weapons': calculateMeleeWeaponPrice,
    complements: calculateComplementPrice,
    ammunition: calculateMagazinePrice,
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
  const statMultiplier = item.stats.reduce(intoAllStatMultiplier, 1);
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
      getDamageMultiplier(item, item.damage) *
        getEffectMultiplier(item) *
        MELEE_MULTIPLIER
    ) + operationPrice
  );
}

export function calculateFirearmPrice(item: Omit<Firearms, 'price'>): number {
  const BASE_DAMAGE = 3;
  const BURST_MULTIPLIER = 10;
  const BASE_PRECISION = 5;
  const PRECISION_MULTIPLIER = 2;
  const precisionValue = item.precision * PRECISION_MULTIPLIER + BASE_PRECISION;
  const damageMultiplier =
    getDiceAverageValue(item.burst) * BURST_MULTIPLIER + BASE_DAMAGE;
  return Math.ceil(damageMultiplier * precisionValue);
}

export function calculateComplementPrice(
  item: Omit<Complement, 'price'>
): number {
  const statMultiplier = item.stats.reduce(intoAllStatMultiplier, 1);
  const ACTIVABLE_MULTIPLIER = item.numberOfUses
    ? 0.50001 - 0.5 / item.numberOfUses
    : 0.5;
  const price = Math.ceil(
    statMultiplier * item.bonus * (item.activable ? ACTIVABLE_MULTIPLIER : 1)
  );
  return price + item.extraPrice;
}

export function getStatMultiplier(stat: AnyStat): number {
  return stats.includes(stat as any)
    ? 25
    : states.includes(stat as any)
      ? 10
      : stat === 'actions'
        ? 100
        : 5;
}

export function intoAllStatMultiplier(
  multiplier: number,
  stat: string
): number {
  return multiplier * getStatMultiplier(stat as AnyStat);
}

export function calculateMagazinePrice(
  item: Omit<Ammunition, 'price'>
): number {
  const bulletPrice = calculateBulletPrice(item);
  return Math.ceil(bulletPrice * item.capacity);
}

export function calculateBulletPrice(item: Omit<Ammunition, 'price'>): number {
  const AMMUNITION_MULTIPLIER = 0.5;
  const BASE_DAMAGE = 1;
  return (
    getDamageMultiplier(item, BASE_DAMAGE) *
    getEffectMultiplier(item) *
    AMMUNITION_MULTIPLIER
  );
}

function getEffectMultiplier(
  item: Omit<Ammunition | MeleeWeapon, 'price'>
): number {
  return (item.bleed + 1) * (item.shock + 1) * (item.poison + 1);
}

function getDamageMultiplier(
  item: Omit<Ammunition | MeleeWeapon, 'price'>,
  damage: number = 1
): number {
  return damage + getDiceAverageValue(item.randomDamage) + item.piercing / 2;
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
