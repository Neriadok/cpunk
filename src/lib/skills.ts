import {Skill, skillFamilies} from "../interfaces/skills.interface";
import {Character} from "../interfaces/character.interface";
import {getBonus} from "../lib/lifepath";

export function skills(...args: any[]): any {
  // TODO
  return args.join();
}

export function isRoleSkill({role}: Character, skill: Skill) {
  return role.skills.includes(skill)
}

export function getElectionSkillPoints({stats}: Character) {
  return stats.REF + stats.INT;
}

export function sumOfRoleSkills(character: Character): number {
  return sumOfSkills(character, character.role.skills);
}

export function sumOfSkills(character: Character, skills: Skill[] = []): number {
  return skills.reduce((sum, skill) => intoSkillSum(sum, skill, character), 0)
}

export function intoSkillSum(sum: number, skill: Skill, character: Character): number {
  return sum + Math.round(character.skills[skill] || 0) - getBonus(character, skill, 'skills');
}

export function isSpecialSkill(target: Skill): boolean {
  return skillFamilies.some(({stat, skill}) => target === skill && stat === 'special')
}

export function getSpecialSkill(skills: Skill[]): Skill | undefined {
  return (skills || []).find(isSpecialSkill);
}

export function getPayroll(character: Character): number {
  const skill = getSpecialSkill(character.role.skills);
  const moneyRange = skill && Math.max(0, character.skills[skill] - 5);
  return moneyRange ? character.role.money[moneyRange] : 0;
}

export function getSpecialSkillMoney(character: Character): number {
  if(!character.role) return 0;
  return getPayroll(character) * character.workedMonths + getBonus(character, 'money');
}
