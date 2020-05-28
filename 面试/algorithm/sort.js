/*
排序
 */

// quick sort
// [js算法 - 快速排序(Quicksort)](https://segmentfault.com/a/1190000017814119)
function quickSort(arr) {
  if (arr.length <= 1) {
    return arr;
  }
  const pivoteIndex = Math.floor(arr.length / 2);
  var pivoteValue = arr[pivoteIndex];

  const left = [];
  const right = [];
  for (var i = 0; i < arr.length; i++) {
    if (arr[i] < pivoteValue) {
      left.push(arr[i]);
    } else if (arr[i] > pivoteValue) {
      right.push(arr[i]);
    }
  }
  return quickSort(left).concat([pivoteValue], quickSort(right));
}