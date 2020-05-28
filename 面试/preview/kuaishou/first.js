// 有序数组合并为一个数组
function merge(arr1, arr2) {
  const result = [];
  let index1 = 0;
  let index2 = 0;
  let k = 0;

  while (index1 < arr1.length && index2 < arr2.length) {
    if (arr1[index1] <= arr2[index2]) {
      result[k++] = arr1[index1++];
    } else {
      result[k++] = arr2[index2++];
    }
  }
  if (index1 !== arr1.length) {
    while (index1 < arr1.length) {
      result[k++] = arr1[index1++];
    }
  }
  if (index2 !== arr2.length) {
    while (index2 < arr2.length) {
      result[k++] = arr2[index2++]
    }
  }
  return result
}
merge([1, 2, 3], [1, 3, 3, 4, 7])

// 0.1 + 0.2 === 0.3
// 如何实现浮点数 + -* / 判断机制
// https://juejin.im/post/5d7107356fb9a06b084d1703#heading-1


// node.js cluster多进程、负载均衡和平滑重启
// https://cloud.tencent.com/developer/article/1155727
// https://juejin.im/post/5e9452f251882573b330b913