import {
  BodyPart,
  CyberwarePart,
  Dice,
  Difficulty,
  LowValue,
  MidValue,
} from './game.interface';
import { AnyStat } from './stats.interface';

export type Shop = 'firearms' | 'melee-weapons' | 'complements' | 'cyberware';

/**
 * Base interface containing common properties for all items.
 */
interface ItemBase {
  uid: string;
  shop: Shop;
  name: string;
  description: string;
}

export interface Weapon extends ItemBase {
  piercing: LowValue;
  bleed: LowValue;
  shock: LowValue;
  poison: LowValue;
  cyberware: BodyPart | null;
}

export interface Firearms extends Weapon {
  shop: 'firearms';
  precision: number;
  burst: Dice | null;
  capacity: number;
}

export interface MeleeWeapon extends Weapon {
  shop: 'melee-weapons';
  damage: MidValue;
  randomDamage: Dice | null;
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

export type Item = Firearms | Weapon | Complement | Cyberware;
