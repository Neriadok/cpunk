export function delayFunction(fn: () => any, timeout: number): Promise<any> {
  return new Promise((resolve) => {
    setTimeout(() => resolve(fn()), timeout);
  });
}

export function isEmptyValue(value: any): boolean {
  return (
    value === undefined ||
    value === null ||
    value === '' ||
    (typeof value === 'number' && isNaN(value))
  );
}

export function randomBool(): boolean {
  return !Math.floor(Math.random() * 2);
}

export function randomNum(max: number, min: number = 0): number {
  return Math.floor(Math.random() * (max - min)) + min;
}

export function getRandomFrom<T>(arr: T[]): T {
  const index = Math.floor(Math.random() * arr.length);
  return arr[index];
}
