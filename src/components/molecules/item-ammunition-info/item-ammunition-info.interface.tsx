import { Ammunition, Item } from '../../../interfaces/item.interface';

export interface ItemAmmunitionInfoProps {
  item: Ammunition;
  onChange?: (item: Item) => void;
}
