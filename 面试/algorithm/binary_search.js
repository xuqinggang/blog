/*
[【刷题】二叉树非递归遍历](https://juejin.im/post/59e3fde451882578c20858a5#heading-2)
[二叉树前中后序遍历非递归实现（JavaScript）](https://juejin.im/post/5e1181445188253a5b3cd5cf)
[js实现数据结构及算法之二叉树](https://juejin.im/post/5b8a58da51882542b03e6e23#heading-8)
[使用JS实现二叉树](https://zhuanlan.zhihu.com/p/109720018)
 */
/**
 * 二分查找，指定的数，在不在一个数组里
 * @param {*} searchNum
 * @param {*} toSortedArrays
 */
// function binarySearch(searchNum, toSortedArrays) {
//   const sortedArrays = toSortedArrays.sort((a, b) => a - b);
//   let lo = 0;
//   let hi = sortedArrays.length - 1;
//   while (lo <= hi) {
//     let mid = Math.round(lo + (hi - lo) / 2);
//     if (searchNum < sortedArrays[mid]) {
//       hi = mid - 1;
//     } else if (searchNum > sortedArrays[mid]) {
//       lo = mid + 1;
//     } else {
//       console.log('mid', mid);
//       return true;
//     }
//   }
//   return false;
// }

// binarySearch(1, [2, 3, 1, 4]);
// binarySearch(5, [2, 3, 1, 4]);

/*
leetcode 题
704\34
 */
/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
var searchRange = function (nums, target) {
  let lo = 0;
  let hi = nums.length - 1;
  while (lo <= hi) {
    let mid = Math.floor(lo + (hi - lo) / 2);
    if (nums[mid] === target) {
      let left = right = mid;
      while (--left && nums[left] === target) { }
      while (++right && nums[right] === target) { }
      return [left + 1, right - 1];
    } else if (target > nums[mid]) {
      lo = mid + 1;
    } else {
      hi = mid - 1;
    }
  }
  return [-1, -1];
};