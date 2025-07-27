import { Role } from './role.interface';
import { LifePath } from './lifepath.interface';
import { Item } from './item.interface';

export interface Character extends LifePath {
  uid: string;
  name: string;
  notes: string;
  role: Role;
  age: number;
  workedMonths: number;
  money: number;
  health?: BodyParts;
  armor?: BodyParts;
  shock?: number;
  bleed?: number;
  poison?: number;
  stats: { [property: string]: number };
  skills: { [property: string]: number };
  inventory?: Item[];
  [property: string]: any;
}

export interface BodyParts {
  head: number;
  trunk: number;
  armR: number;
  armL: number;
  legR: number;
  legL: number;
}

export interface Experience {
  rep: number;
  pp: number;
  humanity: number;
}
