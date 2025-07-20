import { Dice } from '../interfaces/game.interface';
import {
  Complement,
  Firearms,
  Magazine,
  MeleeWeapon,
} from '../interfaces/item.interface';
import { states, stats } from '../interfaces/stats.interface';

export function calculateMeleeWeaponPrice(
  meleeWeapon: Omit<MeleeWeapon, 'price'>
): number {
  const MELEE_MULTIPLIER = 5;
  const damageValue =
    getDiceAverageValue(meleeWeapon.randomDamage) +
    meleeWeapon.damage +
    meleeWeapon.piercing / 3;
  return Math.ceil(
    damageValue *
      meleeWeapon.bleed *
      meleeWeapon.shock *
      meleeWeapon.poison *
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
  const ACTIVABLE_MULTIPLIER = 0.5;
  const price = Math.ceil(
    statMultiplier * item.bonus * (item.activable ? ACTIVABLE_MULTIPLIER : 1)
  );
  return price + item.extraPrice;
}

export function calculateMagazinePrice(item: Omit<Magazine, 'price'>): number {
  const bulletPrice = calculateBulletPrice(item);
  return Math.ceil(bulletPrice * item.capacity);
}

export function calculateBulletPrice(item: Omit<Magazine, 'price'>): number {
  const AMMUNITION_MULTIPLIER = 0.5;
  return (
    item.bleed *
    item.shock *
    item.poison *
    item.piercing *
    getDiceAverageValue(item.randomDamage) *
    AMMUNITION_MULTIPLIER
  );
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
