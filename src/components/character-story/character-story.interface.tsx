import { BehaviorSubject } from 'rxjs';
import { Character } from '../../interfaces/character.interface';

export interface CharacterStoryProps {
  character: Character;
  subject?: BehaviorSubject<Character>;
  readonly?: boolean;
}
