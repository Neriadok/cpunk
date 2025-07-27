import {
  Ammunition,
  Complement,
  Cyberware,
  Firearms,
  Item,
  MeleeWeapon,
} from '../../../interfaces/item.interface';

export interface ItemPropertyProps {
  item: Item;
  property:
    | keyof Firearms
    | keyof MeleeWeapon
    | keyof Complement
    | keyof Ammunition
    | keyof Cyberware;
  onChange?: (item: Item) => void;
}
