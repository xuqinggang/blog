// 求最长不重复子字符串
function maxSubString(str) {
  const arr = str.split('');

  let maxSubStr = '';
  let index = 0;
  while (index <= str.length) {
    let rtArr = [];


    arr.slice(index).forEach(s => {

      if (rtArr.indexOf(s) !== -1) {
        if (index === 2) {
          console.log('rt', rtArr, rtArr.indexOf(s), s);
        }

        let tempMaxSubStr = rtArr.join('');
        if (tempMaxSubStr.length > maxSubStr.length) {
          maxSubStr = tempMaxSubStr;
        }
        return;
      }

      rtArr.push(s);
    });

    index++;
  }
  return maxSubStr;
}
console.log(maxSubString('abcbefgfe'));