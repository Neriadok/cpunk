import { Item, MeleeWeapon } from '../../../interfaces/item.interface';

export interface ItemMeleeWeaponInfoProps {
  item: MeleeWeapon;
  onChange?: (item: Item) => void;
}
