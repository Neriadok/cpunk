import { Character } from '../../../interfaces/character.interface';
import { BodyPart } from '../../../interfaces/game.interface';

export interface CharacterHealthPartProps {
  part: BodyPart;
  character: Character;
  setArmor: (part: BodyPart, value: number) => void;
  setHealth: (part: BodyPart, value: number) => void;
}
