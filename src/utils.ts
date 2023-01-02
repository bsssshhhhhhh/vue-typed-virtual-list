// https://gist.github.com/robertleeplummerjr/1cc657191d34ecd0a324
export function binaryClosest(arr: Record<number | 'length', number>, num: number) {
  let high = arr.length - 1;
  let low = 0;
  let mid = 0;
  let item = null;
  let target = -1;

  if (arr[high]! < num) {
    return num;
  }

  while (low <= high) {
    mid = (low + high) >> 1;
    item = arr[mid]!;
    if (item === num) {
      return mid;
    }

    if (item > num) {
      high = mid - 1;
    } else if (item < num) {
      target = mid;
      low = mid + 1;
    } else {
      return low;
    }
  }

  return target;
}
