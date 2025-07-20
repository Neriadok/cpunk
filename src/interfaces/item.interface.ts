import { Dice, LowValue, MidValue } from './game.interface';
import { AnyStat } from './stats.interface';

export type Shop =
  | 'firearms'
  | 'melee-weapons'
  | 'ripperdoc'
  | 'first-aid-kit'
  | 'complements'
  | 'ammunition';

/**
 * Base interface containing common properties for all items.
 */
interface ItemBase {
  price: number;
  name: string;
  description: string;
}

export interface Firearms extends ItemBase {
  precision: number;
  burst: Dice | null;
}

export interface Weapon extends ItemBase {
  piercing: LowValue;
  randomDamage: Dice | null;
  bleed: LowValue;
  shock: LowValue;
  poison: LowValue;
}

export interface MeleeWeapon extends Weapon {
  shop: 'melee-weapons';
  damage: LowValue;
}

export interface Complement extends ItemBase {
  shop: 'complements';
  stat: AnyStat;
  bonus: MidValue;
  activable: boolean;
  extraEffects: string;
}

export interface Magazine extends Weapon {
  shop: 'ammunition';
  capacity: MagazineCapacity;
}

export type MagazineCapacity = 1 | 2 | 3 | 4 | 6 | 8 | 12 | 16 | 20 | 24;

export type Item = Firearms | Weapon | Complement | Magazine;
