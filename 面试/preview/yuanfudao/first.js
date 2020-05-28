// Promise
let t = Promise.reject('test'); // failed
function f1() {
  console.log('f1');
}
function f2() {
  console.log('f2');
  // return Promise.reject('f2')
}
function f3(data) {
  console.log('f3', data, 'data');
}
t.then(f1).catch(f2).then(f3); // f2 f3
t.then(f1).then(f3).catch(f2); // f2 f3

// setTimeout/clearTimeout 实现 setInterval/clearInterval
const timerMap = {};

function setInterval(cb, delay) {
  const key = Symbol();
  const wrapper = () => {
    timerMap[key] = setTimeout(() => {
      cb()
      wrapper();
    }, delay);
  }

  wrapper();
  return key;
}

function clearInterval(key) {
  if (key in timerMap) {
    clearTimeout(timerMap[key]);
    delete timerMap[key];
  }
}

// vim 宏、模式

// 箭头函数 与 函数声明区别
// 执行上下文 https://www.cnblogs.com/no-particular/archive/2013/01/31/2887293.html
// arraw funciton cannot new, why
// arrow funciton this
/*
() => {} vs function () {}
let obj = {
  f1: () => console.log(this),
  f2() {console.log(this)}
}

obj.f1() // window or undefined

obj.f2() // obj
new obj.f1(); // {}

new obj.f2(); // {}
 */


// react 生命周期
/*
<A> --> <div>

  <B /> --> <span>i'm b</span>

</A> </div>

a.render
b.render
a.didMount
b.didMount
*/

// promise 理解, 调用顺序
const promiseFun = function (param1) {
  return new Promise((resolve, reject) => {
    resolve(param1);
  });
}
const promiseTest = function (param1, param2) {
  return new Promise((resolve, reject) => {
    promiseFun(1).then((number) => {
      console.info(`fun1 result:${number}`);
      return promiseFun(2);
    }).then((number) => {
      console.info(`fun2 result:${number}`);
      if (number === 2) {
        reject(number)
      }
      else {
        return promiseFun(3);
      }
    }).then((number) => {
      console.info(`fun3 result:${number}`);
      return promiseFun(4);
    }).then((number) => {
      console.info(`fun4 result:${number}`);
    }).catch((err) => {
      console.info(`promiseTest error:${err}`);
    });
  });
}
promiseTest('1', '2').then((number) => {
  console.info(`promiseTest:${number}`);
}).catch((err) => {
  console.info(`promiseTest failed:${err}`);
});

// 中断 promise
var STOP = {}
Promise.stop = function () {
  return Promise.resolve(STOP)
}

Promise.prototype.next = function (onResolved, onRejected) {
  return this.then(function (value) {
    if (value === STOP) {
      return STOP
    } else {
      return onResolved(value)
    }
  }, onRejected)
}

const doSth = function () {
  return new Promise((resolve, reject) => {
    resolve('stop2');
  });
}
doSth()
  .next(function (value) {
    if (value === 'stop') {
      return Promise.stop()
    }
    console.log('next1');
    // normal logic
  })
  .next(value => {
    console.log('next2');
    // will never get called
  })