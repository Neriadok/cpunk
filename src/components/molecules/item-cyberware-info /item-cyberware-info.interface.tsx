import { Cyberware, Item } from '../../../interfaces/item.interface';

export interface ItemCyberwareInfoProps {
  item: Cyberware;
  onChange?: (item: Item) => void;
}
