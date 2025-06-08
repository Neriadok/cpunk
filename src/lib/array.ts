export function toggleArrayValue(
  array: Array<any>,
  value: any,
  property?: string
): Array<any> {
  const index = array.findIndex((arrayValue) =>
    isSame(arrayValue, value, property)
  );
  if (index > -1) {
    array.splice(index, 1);
    return [...array];
  } else {
    return [...array, value];
  }
}

export function isSame(itemA: any, itemB: any, property?: string) {
  return (
    itemA === itemB ||
    (property && itemA && itemB && itemA[property] === itemB[property])
  );
}

export function randomly(): number {
  return Math.random() - 0.5;
}

export function deleteDuplicates(array: Array<any>) {
  return array.filter(isFirstValue);
}

export function isFirstValue(item: any, index: number, array: any[]) {
  const itemIndex = item.key
    ? array.findIndex((arrayItem) => isSame(item, arrayItem, 'key'))
    : array.indexOf(item);
  return itemIndex === index;
}
