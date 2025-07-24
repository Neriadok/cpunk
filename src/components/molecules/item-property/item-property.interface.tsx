import {
  Ammunition,
  Complement,
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
    | keyof Ammunition;
  onChange?: (item: Item) => void;
}
