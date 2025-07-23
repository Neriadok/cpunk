import { Character } from '../../../interfaces/character.interface';

export interface CharacterDiartProps {
  character: Character;
  onChange: (character: Character) => void;
}
