// 队列 && 栈
// [awesome-coding-js-栈和队列](http://www.conardli.top/docs/dataStructure/%E6%A0%88%E5%92%8C%E9%98%9F%E5%88%97)

/*
双端队列
https://juejin.im/post/5e9125d26fb9a03c6f66fd42#heading-14
 */
// 检查字符串是否是回文
function isHuiWen(str) {
  const arr = str.split('');
  while (arr.length > 1) {
    let first = arr.shift();
    let last = arr.pop();
    if (first !== last) {
      return false;
    }
  }
  return true;
}

function IsPopOrder(pushV, popV) {
  if (!pushV || !popV || pushV.length == 0 || popV.length == 0) {
    return;
  }
  var stack = [];
  var idx = 0;
  for (var i = 0; i < pushV.length; i++) {
    stack.push(pushV[i]);
    console.log('stack', stack.slice())
    while (stack.length && stack[stack.length - 1] == popV[idx]) {
      stack.pop();
      idx++;
    }
  }
  return stack.length == 0;
}