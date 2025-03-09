export function formatAmount(amount: number): string {
  const value = Math.abs(amount).toLocaleString("en-US", {
    minimumFractionDigits: 2,
  });
  return amount < 0 ? `(${value})` : value;
}

/**
 * Use binary search to search for a given value (n) in a sorted array of [x, y] mappings.
 * If n is not present, should return the y mapped to the greatest x that is less than n
 * (i.e. the n within the range)
 *
 * @param arr array containing the [x, y] mapping sorted by x in ascending order
 * @param n value to find within the array
 * @returns y - the correspoding value of n
 */
export function getValueInRange(arr: Array<Array<number>>, n: number) {
  const from = 0;
  const to = arr.length;
  return (function search(from, to) {
    if (from >= to) {
      return 0;
    }
    const mid = Math.floor((from + to) / 2);
    if (arr[mid][0] > n) {
      return search(from, mid);
    }
    if (arr[mid][0] < n && mid > from) {
      return search(mid, to);
    }
    return arr[mid][1];
  })(from, to);
}
