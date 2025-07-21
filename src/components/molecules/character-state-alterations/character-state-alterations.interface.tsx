import { Character } from '../../../interfaces/character.interface';

export interface CharacterStateAlterationsProps {
  character: Character;
  onChange: (character: Character) => void;
}
