import { BehaviorSubject } from "rxjs";
import { Character } from "../../interfaces/character.interface";

export interface CharacterStoryProps {
    subject: BehaviorSubject<Character>;
    character: Character;
    readonly?: boolean;
};
