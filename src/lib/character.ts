import { faker } from '@faker-js/faker';
import {Character} from "../interfaces/character.interface";
import {Role, roles} from "../interfaces/role.interface";
import {stats} from "../interfaces/stats.interface";
import {LifePath, LifePathEvent} from "../interfaces/lifepath.interface";
import {randomBool, randomNum} from "../lib/utils";
import {getRandomEvent} from "./lifepath";

export function getRandomCharacter(): Character {
  const age = getRandomAge();
  return {
    name: faker.person.fullName(),
    age,
    workedMonths: Math.round(Math.random() * 3) + 1,
    role: getRandomRole(),
    money: 0,
    stats: getRandomStats(),
    skills: {},
    state: {
      shock0: 0,
      shock1: 0,
      shock2: 0,
      shock3: 0,
      shock4: 0,
      shock5: 0,
      shock6: 0,
      shock7: 0,
      shock8: 0,
      shock9: 0,
    },
    experience: {
      rep: 0,
      pp: 0,
      humanity: 0,
    },
    armor: {
      head: 0,
      body: 0,
      armR: 0,
      armL: 0,
      legR: 0,
      legL: 0,
    },
    equipment: [],
    ...getRandomLifePath(age)
  }
}

export function getRandomAge(): number {
  return Math.floor(Math.random() * 11 + 18);
}

export function getRandomRole(): Role {
  return roles[Math.floor(Math.random() * roles.length)];
}

export function getRandomStats(): { [stat: string]: number } {
  return stats.reduce((randomStats, stat) => {
    return {...randomStats, [stat]: randomNum(11, 2)};
  }, {});
}

export function getRandomLifePath(age: number): LifePath {
  return {
    gender: randomBool(),
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
  for (let i = 16; i < age; i++) {
    events.push(getRandomEvent())
  }
  return events;
}
