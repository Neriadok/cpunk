export type Dice = '1D4' | '1D6' | '1D8' | '1D10' | '1D12' | '1D20';
export type BodyPart = 'head' | 'trunk' | 'armR' | 'armL' | 'legR' | 'legL';
export type CyberwarePart = BodyPart | 'eyes' | 'fullBody';
export type Difficulty = 'instant' | 'easy' | 'complex' | 'hard' | 'very-hard';
export type State = 'poison' | 'bleed' | 'shock';
export type LowValue = 0 | 1 | 2 | 3;
export type MidValue = 0 | 1 | 2 | 3 | 4 | 5;
export type HighValue = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10;

export const dices: Dice[] = ['1D4', '1D6', '1D8', '1D10', '1D12', '1D20'];
export const difficulties: Difficulty[] = [
  'instant',
  'easy',
  'complex',
  'hard',
  'very-hard',
];
export const bodyParts: BodyPart[] = [
  'head',
  'trunk',
  'armR',
  'armL',
  'legR',
  'legL',
];
export const cyberwareParts: CyberwarePart[] = [
  ...bodyParts,
  'eyes',
  'fullBody',
];
