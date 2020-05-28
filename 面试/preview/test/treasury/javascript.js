/* ================节流、防抖=============== */
// 函数防抖(debounce),在事件被触发n秒后再执行回调，如果在这n秒内又被触发，则重新计时。(电梯场景, 快速点击)
function debounce(fn, wait) {
  var timeout = null;
  return function() {
      if(timeout !== null) 
              clearTimeout(timeout);
      timeout = setTimeout(fn, wait);
  }
}

// 函数节流(throttle),规定在一个单位时间内，只能触发一次函数。如果这个单位时间内触发多次函数，只有一次生效。(scroll)
// 时间戳
var throttle = function(func, delay) {
  var prev = Date.now();
  return function() {
      var context = this;
      var args = arguments;
      var now = Date.now();
      if (now - prev >= delay) {
          func.apply(context, args);
          prev = Date.now();
      }
  }
}
// 定时器
var throttle = function(func, delay) {
  var timer = null;
  return function() {
      var context = this;
      var args = arguments;
      if (!timer) {
          timer = setTimeout(function() {
              func.apply(context, args);
              timer = null;
          }, delay);
      }
  }
}

/* ================函数柯里化=============== */
var curry = function (fn) {
  var args = [].slice.call(arguments, 1);
  return function() {
      var newArgs = args.concat([].slice.call(arguments));
      return fn.apply(this, newArgs);
  };
};

/* ================setTimeout实现 setinterval=============== */
// 简单版
const mySetInterval = (cb, time) => {
  const fn = () => {
    cb() // 执行传入的回调函数
    setTimeout(() => {
      fn() // 递归调用自己
    }, time)
  }
  setTimeout(fn, time)
}

// 高级版，考虑 clearInterval
let timeMap = {}
let id = 0 // 简单实现id唯一
const mySetInterval = (cb, time) => {
  let timeId = id // 将timeId赋予id
  id++ // id 自增实现唯一id
  let fn = () => {
    cb()
    timeMap[timeId] = setTimeout(() => {
      fn()
    }, time)
  }
  timeMap[timeId] = setTimeout(fn, time)
  return timeId // 返回timeId
}

const myClearInterval = (id) => {
  clearTimeout(timeMap[id]) // 通过timeMap[id]获取真正的id
  delete timeMap[id]
}

/* ================sleep函数=============== */
function sleep(time) {
  return new Promise(resolve => setTimeout(resolve, time))
}

/* ================JS实现add(1)(2)(3)(4)的调用方式=============== */
var add = function (m) {
 
  var temp = function (n) {
      return add(m + n);
  }

  temp.toString = function () {
      return m;
  }

  return temp;
};

add(3)(4)(5); // 12

/* ================深拷贝=============== */
function deepClone(obj) {
  //如果不是复杂数据类型,就直接返回一个一样的对象
  if(typeof obj !="object"){
      return obj
  }
  //如果是,就递归调用
  var newObj = {};
  for (var key in obj) {
    newObj[key] = deepClone(obj[key])
  }
  return newObj;
}

/* ================getUrlParams=============== */
function getUrlParam(location) {
  let url = location ? location : decodeURIComponent(window.location.href);
  let splitIndex = url.indexOf('?') + 1;
  let paramStr = url.substr(splitIndex, url.length);

  let arr = paramStr.split('&');
  let map = {};
  for (let i = 0; i < arr.length; i++) {
    let kv = arr[i].split('=');
    map[kv[0]] = kv[1]
  }
  return map;
}

// 事件循环

// redux 中间件


