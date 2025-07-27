import {
  BodyPart,
  CyberwarePart,
  Dice,
  Difficulty,
  LowValue,
  MidValue,
} from './game.interface';
import { AnyStat } from './stats.interface';

export type Shop =
  | 'firearms'
  | 'melee-weapons'
  | 'complements'
  | 'ammunition'
  | 'cyberware';

/**
 * Base interface containing common properties for all items.
 */
interface ItemBase {
  shop: Shop;
  price: number;
  name: string;
  description: string;
}

export interface Firearms extends ItemBase {
  shop: 'firearms';
  precision: number;
  burst: Dice | null;
}

export interface Weapon extends ItemBase {
  piercing: LowValue;
  randomDamage: Dice | null;
  bleed: LowValue;
  shock: LowValue;
  poison: LowValue;
  cyberware: BodyPart | null;
}

export interface MeleeWeapon extends Weapon {
  shop: 'melee-weapons';
  damage: MidValue;
}

export interface Complement extends ItemBase {
  shop: 'complements';
  stats: AnyStat[];
  bonus: MidValue;
  activable: boolean;
  extraPrice: number;
  extraEffects: string;
  numberOfUses: number | null;
}

export interface Cyberware extends ItemBase {
  shop: 'cyberware';
  ice: Difficulty;
  part: CyberwarePart;
  stats: AnyStat[];
  bonus: MidValue;
  activable: boolean;
  cooldown: LowValue;
  extraPrice: number;
  extraEffects: string;
}

export interface Ammunition extends Weapon {
  shop: 'ammunition';
  capacity: number;
}

export type Item = Firearms | Weapon | Complement | Ammunition | Cyberware;
