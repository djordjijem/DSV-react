export function makeId(length: number, chars: string) {
  let result = '';
  let counter = 0;
  while (counter < length) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
    counter += 1;
  }
  return result;
}
