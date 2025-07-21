import { Character } from '../interfaces/character.interface';
import { Skill, skillFamilies } from '../interfaces/skills.interface';
import { Stat } from '../interfaces/stats.interface';
import { getModifiers, intoModifiers } from './lifepath';

export function getBonus(
  character: Partial<Character>,
  property: Skill | Stat | string,
  kind?: 'skills' | 'stats'
): number {
  const modifiers = getModifiers(character, property, kind);
  return modifiers.reduce((sum, { amount }) => sum + (amount || 0), 0);
}

export function getBonifiedSkills({ events }: Partial<Character>): string[] {
  return (events || [])
    .reduce(intoModifiers, [])
    .filter(({ kind }) => kind === 'skills')
    .reduce(
      (modified: string[], { property }) =>
        typeof property === 'string'
          ? [...modified, property]
          : [...modified, ...property],
      []
    );
}

export function getSkillValue(character: Character, skill: string): number {
  const stat = skillFamilies.find((s) => s.skill === skill)?.stat;
  const statValue = stat ? character.stats[stat] : 0;
  const bonusValue =
    stat && stat !== 'special' ? getBonus(character, stat, 'stats') : 0;
  const skillValue = character.skills[skill] || 0;
  return skillValue + statValue + bonusValue;
}

export function getRunValue(character: Character): number {
  return Math.floor(
              (character.stats.MOV + getBonus(character, 'MOV', 'stats')) * 3
            );
}

export function getJumpValue(character: Character): number{
return Math.floor(
              ((character.stats.MOV + getBonus(character, 'MOV', 'stats')) *
                3) /
                4
            )
}

export function getHealth(character: Character){
    return Math.ceil(
              (character.stats.TCO + getBonus(character, 'TCO', 'stats')) / 2
            )
}