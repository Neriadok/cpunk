import {
  Skill,
  maxRoleSkillPoints,
  skillFamilies,
} from '../interfaces/skills.interface';
import { Character } from '../interfaces/character.interface';
import { getBonifiedSkills, getBonus } from '../lib/lifepath';
import { Role } from '../interfaces/role.interface';

export function isRoleSkill(role: Role, skill: Skill) {
  return role?.skills.includes(skill);
}

export function getElectionSkills({ role }: Character) {
  return skillFamilies.filter(
    ({ stat, skill }) => stat !== 'special' && !isRoleSkill(role, skill)
  );
}

export function getActionSkills() {
  return skillFamilies.filter(({ stat }) => stat !== 'special');
}

export function getSkillValue(character: Character, skill: string): number {
  const stat = skillFamilies.find((s) => s.skill === skill)?.stat;
  const statValue = stat ? character.stats[stat] : 0;
  const bonusValue =
    stat && stat !== 'special' ? getBonus(character, stat, 'stats') : 0;
  const skillValue = character.skills[skill] || 0;
  return skillValue + statValue + bonusValue;
}

export function getElectionSkillPoints({ stats }: Character) {
  return stats.REF + stats.INT;
}

export function sumOfRoleSkills(character: Character): number {
  return sumOfSkills(character, character.role.skills);
}

export function getSkillsBonified(character: Character) {
  return getBonifiedSkills(character).reduce(
    (skills, skill) => ({
      ...skills,
      [skill]: getSkillMinValue(character, skill as Skill),
    }),
    character.skills
  );
}

export function getSkillMinValue(character: Character, skill: Skill): number {
  return Math.max(
    character.skills[skill] || 0,
    getBonus(character, skill, 'skills') || 0
  );
}

export function sumOfSkills(
  character: Character,
  skills: Skill[] = []
): number {
  return skills.reduce((sum, skill) => intoSkillSum(sum, skill, character), 0);
}

export function intoSkillSum(
  sum: number,
  skill: Skill,
  character: Character
): number {
  return (
    sum +
    Math.round(character.skills[skill] || 0) -
    getBonus(character, skill, 'skills')
  );
}

export function isSpecialSkill(target: Skill): boolean {
  return skillFamilies.some(
    ({ stat, skill }) => target === skill && stat === 'special'
  );
}

export function getSpecialSkill(skills: Skill[]): Skill | undefined {
  return (skills || []).find(isSpecialSkill);
}

export function getPayroll(character: Partial<Character>): number {
  const skill = getSpecialSkill(character.role?.skills || []);
  const moneyRange =
    (skill && Math.max(0, ((character.skills || {})[skill] || 0) - 5)) || 0;
  return character.role?.money[moneyRange] || 0;
}

export function getSpecialSkillMoney(character: Partial<Character>): number {
  if (!character.role) return 0;
  return (
    getPayroll(character) * (character?.workedMonths || 0) +
    getBonus(character, 'money')
  );
}

export function getRoleSkills(role: Role) {
  return skillFamilies.filter(({ skill }) => isRoleSkill(role, skill));
}

export function getAverageRoleSkills(role: Role): {
  [property: string]: number;
} {
  const roleSkills = getRoleSkills(role);
  return roleSkills.reduce(
    (result, { skill }) => ({
      ...result,
      [skill]: Math.floor(maxRoleSkillPoints / roleSkills.length),
    }),
    {}
  );
}
