import {Role} from "./role.interface";
import {LifePath} from "./lifepath.interface";
import {Item} from "./item.interface";

export interface Character extends LifePath{
  name: string;
  role: Role;
  age: number;
  workedMonths: number;
  money: number;
  stats: {[property: string]: number};
  skills: {[property: string]: number};
  [property: string]: any;
}

export interface Armor {
  head: number;
  body: number;
  armR: number;
  armL: number;
  legR: number;
  legL: number;
}

export interface State {
  shock0: number;
  shock1: number;
  shock2: number;
  shock3: number;
  shock4: number;
  shock5: number;
  shock6: number;
  shock7: number;
  shock8: number;
  shock9: number;
}

export interface Experience {
  rep: number;
  pp: number;
  humanity: number;
}
