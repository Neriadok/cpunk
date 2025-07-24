import {
  Ammunition,
  Complement,
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
    | keyof Ammunition;
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
