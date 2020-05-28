/*
动态规划
文章:
[问题集锦](https://segmentfault.com/a/1190000004498566)
[状态转义方程](https://blog.csdn.net/somenzz/article/details/86027719)
 */

// 1.数字三角形问题 - 非递归
// https://blog.csdn.net/zwhlxl/article/details/46225947
let twoDimensionalArra = [
  [1],
  [3, 5],
  [2, 4, 7],
  [3, 8, 1, 10],
  [6, 7, 1, 2, 5],
  [9, 2, 3, 9, 8, 7],
];
function dynamicTriangle(twoDimensionalArra, num) {
  let D = twoDimensionalArra.slice();
  console.log('D', D)
  for (let i = num - 2; i >= 0; i--) {
    for (let j = 0; j <= i; j++) {
      D[i][j] = Math.max(D[i + 1][j], D[i + 1][j + 1]) + D[i][j]
    }
  }
  return D[0][0]
}

dynamicTriangle(twoDimensionalArra, 6);