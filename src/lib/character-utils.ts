import { Character } from '../interfaces/character.interface';
import { maxRoleSkillPoints } from '../interfaces/skills.interface';
import {
  getElectionSkillPoints,
  getElectionSkills,
  sumOfRoleSkills,
  sumOfSkills,
} from './skills';

export function isValidCharacter(character: Character) {
  const electionSkills = getElectionSkills(character);
  const electionSkillPoints = sumOfSkills(
    character,
    electionSkills.map(({ skill }) => skill)
  );
  const maxSkillPoints = getElectionSkillPoints(character);
  return (
    character.name &&
    sumOfRoleSkills(character) === maxRoleSkillPoints &&
    maxSkillPoints === electionSkillPoints
  );
}
