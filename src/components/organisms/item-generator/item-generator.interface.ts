import { Item } from '../../../interfaces/item.interface';

export interface ItemGeneratorProps {
  onSave: (item: Item) => void;
  onAbort: () => void;
}
