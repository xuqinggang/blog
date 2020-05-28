// https://www.kancloud.cn/kancloud/the-art-of-programming/41581
// 寻找和为定值的两个数
/*

arr[i] + arr[j] = sum;

sum - arr[i] // 这个值也在序列中
*/
function TwoSum(arr, sum) {
  let subtractionArr = [];
  let map = {};
  arr.forEach(item => {
    const substraction = sum - item;
    map[substraction] = true;
    // subtractionArr.push(sum - item);
  });
  let rt = [];
  arr.forEach(item => {
    if (map[item]) {
      rt.push(item);
    }
  });
  return rt;
}