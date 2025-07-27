import {
  Ammunition,
  Complement,
  Cyberware,
  Firearms,
  Item,
  MeleeWeapon,
} from '../../../interfaces/item.interface';

export interface ItemPropertyInputProps {
  item: Item;
  property:
    | keyof Firearms
    | keyof MeleeWeapon
    | keyof Complement
    | keyof Ammunition
    | keyof Cyberware;
  onChange: (item: Item) => void;
}

export type ItemPropertyInputTypes =
  | 'highValue'
  | 'midValue'
  | 'lowValue'
  | 'dice'
  | 'stat'
  | 'boolean'
  | 'text'
  | 'number'
  | string;
