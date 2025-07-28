import { State } from './game.interface';

export type Stat =
  | 'INT'
  | 'REF'
  | 'TEC'
  | 'FRI'
  | 'ATR'
  | 'SUE'
  | 'MOV'
  | 'TCO'
  | 'EMP';

export type AnyStat =
  | Stat
  | State
  | 'actions'
  | 'precision'
  | 'armor'
  | 'CPU'
  | 'health'
  | 'movement';

export const stats: Stat[] = [
  'INT',
  'REF',
  'TEC',
  'FRI',
  'ATR',
  'SUE',
  'MOV',
  'TCO',
  'EMP',
];

export const states: State[] = ['bleed', 'shock', 'poison'];

export const anyStats: AnyStat[] = [
  ...stats,
  ...states,
  'actions',
  'precision',
  'armor',
  'CPU',
  'health',
  'movement',
];
