import { BehaviorSubject } from 'rxjs';
import { Character } from '../../../interfaces/character.interface';

export interface CharacterInfoInputProps {
  subject: BehaviorSubject<Character>;
  character: Character;
  readonly?: boolean;
}
