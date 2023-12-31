import { faker } from '@faker-js/faker';
import { Character } from "../interfaces/character.interface";
import { Role, roles } from "../interfaces/role.interface";
import { stats } from "../interfaces/stats.interface";
import { LifePath, LifePathEvent } from "../interfaces/lifepath.interface";
import { randomBool, randomNum } from "../lib/utils";
import { getRandomEvent } from "./lifepath";
import { getSkillsBonified, getAverageRoleSkills, getSpecialSkillMoney } from './skills';
import { v4 } from 'uuid';

export const baseAge = 18;
export const ageRange = 11;

export function getRandomCharacter(): Character {
  const age = getRandomAge();
  const gender = randomBool();
  const role = getRandomRole();
  const skills = getAverageRoleSkills(role);
  const stats = getRandomStats();
  const baseCharacter: Character = {
    uid: v4(),
    name: faker.person.fullName({ sex: gender ? 'male' : 'female' }),
    notes: '',
    age,
    role,
    workedMonths: Math.round(Math.random() * 3) + 1,
    stats,
    money: 0,
    skills,
    ...getDefaultBodystate(stats),
    ...getRandomLifePath(age, gender)
  };
  return { ...baseCharacter, skills: getSkillsBonified(baseCharacter), money: getSpecialSkillMoney(baseCharacter) }
}

export function getDefaultBodystate(stats: { [stat: string]: number }) {
  return {
    health: {
      head: stats.TCO,
      trunk: stats.TCO,
      armR: stats.TCO,
      armL: stats.TCO,
      legR: stats.TCO,
      legL: stats.TCO,
    },
    armor: {
      head: 0,
      trunk: 0,
      armR: 0,
      armL: 0,
      legR: 0,
      legL: 0,
    },
    shock: 0,
    bleed: 0,
    poison: 0
  }
}

export function getRandomAge(): number {
  return Math.floor(Math.random() * ageRange + baseAge);
}

export function getRandomRole(): Role {
  return roles[Math.floor(Math.random() * roles.length)];
}

export function getRandomStats(): { [stat: string]: number } {
  return stats.reduce((randomStats, stat) => {
    return { ...randomStats, [stat]: randomNum(11, 2) };
  }, {});
}

export function getRandomLifePath(age: number, gender: boolean): LifePath {
  return {
    gender,
    ethnic: randomNum(10),
    family: {
      familyClass: randomNum(10),
      parentalTragedy: randomBool() ? randomNum(11, 1) : 0,
      familyTragedy: randomBool() ? randomNum(11, 1) : 0,
      childhood: randomNum(10),
      brothers: []
    },
    motivations: {
      personality: randomNum(10),
      mainMotivation: randomNum(10),
      lovedPerson: randomNum(10),
      lovedStuff: randomNum(10),
      societyThought: randomNum(10)
    },
    events: getRandomEvents(age)
  }
}

export function getRandomEvents(age: number): LifePathEvent[] {
  const events: LifePathEvent[] = []
  for (let i = baseAge - 2; i < age; i++) {
    events.push(getRandomEvent())
  }
  return events;
}