import { Complement, Item } from '../../../interfaces/item.interface';

export interface ItemComplementInfoProps {
  item: Complement;
  onChange?: (item: Item) => void;
}
