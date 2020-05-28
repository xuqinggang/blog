/*
[回溯算法](http://www.conardli.top/docs/dataStructure/%E5%AD%97%E7%AC%A6%E4%B8%B2/%E5%AD%97%E7%AC%A6%E4%B8%B2%E7%9A%84%E6%8E%92%E5%88%97.html#%E9%A2%98%E7%9B%AE)
输入一个字符串,按字典序打印出该字符串中字符的所有排列。例如输入字符串abc,则打印出由字符a,b,c所能排列出来的所有字符串abc,acb,bac,bca,cab和cb
 */

function permutation(str) {
  let result = [];
  let queue = str.split('');
  permutationCore(queue, result);
  return result;
}

function permutationCore(queue, result, temp = '', current = '') {
  current += temp;
  if (queue.length === 0) {
    result.push(current);
    return;
  }

  const len = queue.length;
  for (let i = 0; i < len; i++) {
    temp = queue.shift();
    permutationCore(queue, result, temp, current);
    queue.push(temp);
  }
}