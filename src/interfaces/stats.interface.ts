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
  | 'concussion'
  | 'bleeding'
  | 'shock'
  | 'armor'
  | 'CPU'
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

export const anyStats: AnyStat[] = [
  ...stats,
  'actions',
  'precision',
  'concussion',
  'bleeding',
  'shock',
  'armor',
  'CPU',
  'movement',
];
