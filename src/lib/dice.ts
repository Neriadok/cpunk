import { Dice } from '../interfaces/game.interface';

export function getDiceAverageValue(dice: Dice | null): number {
  return dice
    ? {
        '1D4': 2,
        '1D6': 3,
        '1D8': 4,
        '1D10': 5,
        '1D12': 6,
        '1D20': 10,
      }[dice]
    : 0;
}

export function getRollDiceValue(dice: Dice): number {
  return Math.floor(Math.random() * getDiceMaxValue(dice)) + 1;
}

export function getDiceMaxValue(dice: Dice): number {
  return parseInt(dice.split('D')[1]);
}
