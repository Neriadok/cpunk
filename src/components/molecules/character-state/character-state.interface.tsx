import { Character } from '../../../interfaces/character.interface';

export interface CharacterStateProps {
  character: Character;
  onChange: (character: Character) => void;
}
