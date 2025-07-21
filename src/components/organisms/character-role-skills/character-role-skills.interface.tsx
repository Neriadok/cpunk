import { BehaviorSubject } from 'rxjs';
import { Character } from '../../../interfaces/character.interface';

export interface CharacterSkillsProps {
  subject: BehaviorSubject<Character>;
  character: Character;
  readonly?: boolean;
}
