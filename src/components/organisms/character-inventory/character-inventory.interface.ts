import { Character } from '../../../interfaces/character.interface';

export interface CharacterInventoryProps {
  character: Character;
  onChange: (character: Character) => void;
}
