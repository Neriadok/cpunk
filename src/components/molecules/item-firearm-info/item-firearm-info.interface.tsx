import { Firearms, Item } from '../../../interfaces/item.interface';

export interface ItemFirearmInfoProps {
  item: Firearms;
  onChange?: (item: Item) => void;
}
