import {
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
    | keyof Cyberware;
  onChange?: (item: Item) => void;
}
