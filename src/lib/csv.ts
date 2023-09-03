
export function csvRead<T>(text: string): T[] {
  const [keysString, ...rowsStrings] = text.replace(/\r/gi,'').split(/\n/);
  const keys = keysString.split(';').filter(Boolean);
  const rows = rowsStrings.filter(Boolean).map((row) => row.split(';'));
  return rows.map(( row) => toRowObject<T>(keys, row),[]);
}

function toRowObject<T>(keys: string[], values: any[]):T{
  return keys.reduce((result, key, index) => intoRowObject(result, key, values[index]), {}) as T;
}

function intoRowObject<T>(result: T, key: string, value: any): T{
  return {...result, [key]: value.replace()} as T;
}
