import { Dice } from '../interfaces/game.interface';
import {
  Complement,
  Firearms,
  Ammunition,
  MeleeWeapon,
} from '../interfaces/item.interface';
import { states, stats } from '../interfaces/stats.interface';

export function calculateMeleeWeaponPrice(
  item: Omit<MeleeWeapon, 'price'>
): number {
  const MELEE_MULTIPLIER = 5;
  return Math.ceil(
    getDamageMultiplier(item, item.damage) *
      getEffectMultiplier(item) *
      MELEE_MULTIPLIER
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
  const statMultiplier = stats.includes(item.stat as any)
    ? 25
    : states.includes(item.stat as any)
      ? 10
      : item.stat === 'actions'
        ? 100
        : 5;
  const ACTIVABLE_MULTIPLIER = item.numberOfUses
    ? 0.501 - 0.5 / item.numberOfUses
    : 0.5;
  const price = Math.ceil(
    statMultiplier * item.bonus * (item.activable ? ACTIVABLE_MULTIPLIER : 1)
  );
  return price + item.extraPrice;
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
        '1D10': 5,
        '1D12': 6,
        '1D20': 10,
        '1D4': 2,
        '1D6': 3,
        '1D8': 4,
      }[dice]
    : 0;
}
