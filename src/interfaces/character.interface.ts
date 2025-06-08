import { Role } from './role.interface';
import { LifePath } from './lifepath.interface';

export interface Character extends LifePath {
  uid: string;
  name: string;
  notes: string;
  role: Role;
  age: number;
  workedMonths: number;
  money: number;
  health?: BodyState;
  armor?: BodyState;
  shock?: number;
  bleed?: number;
  poison?: number;
  stats: { [property: string]: number };
  skills: { [property: string]: number };
  [property: string]: any;
}

export interface BodyState {
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
