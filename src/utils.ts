export function makeId(length: number, chars: string) {
  let result = '';
  let counter = 0;
  while (counter < length) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
    counter += 1;
  }
  return result;
}

export function randomInteger(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function incrementToNearestOdd(value: number): number {
  if (value % 2 === 0) {
    return value + 1;
  }
  return value + 2;
}
