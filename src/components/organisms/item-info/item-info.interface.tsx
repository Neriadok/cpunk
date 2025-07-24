import { Item } from '../../../interfaces/item.interface';

export interface ItemInfoProps {
  item: Item;
  editable?: boolean;
  onChange?: (item: Item) => void;
}
