// 实现 instanceof
function instance_of(ins, cla) {
  let prototype = ins.__proto__;
  while (prototype) {
    if (prototype === cla.prototype) {
      return true;
    }
    prototype = prototype.__proto__;
  }
  return false;
}

// 数组扁平
function arrayFlat(arr) {
  return arr.toString().split(',');
}
function arrayFlat1(arr) {
  const newArr = [];
  arr.forEach(item => {
    if (item instanceof Array) {
      const rt = arrayFlat1(item);
      newArr.push(...rt);
    } else {
      newArr.push(item);
    }
  });
  return newArr;
}