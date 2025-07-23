import { Character } from '../../../interfaces/character.interface';

export interface CharacterHealthProps {
  character: Character;
  onChange: (character: Character) => void;
}
