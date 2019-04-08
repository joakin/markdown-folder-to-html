const isPreferent = (x: string, preferences: string[]) =>
  preferences.indexOf(x) > -1;

const strSort = (a: string, b: string) => (a < b ? -1 : a > b ? 1 : 0);

export default function sortByPrecedence(
  preferences: string[],
  a: string,
  b: string
) {
  const aPref = isPreferent(a, preferences);
  const bPref = isPreferent(b, preferences);
  return aPref && bPref
    ? strSort(a, b)
    : aPref
    ? -1
    : bPref
    ? 1
    : strSort(a, b);
}
