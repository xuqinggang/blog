'use strict';
function wrapper() {
  function inner() { console.log(ab); if (true) { let ab = 'xx' }; }
  inner()
}
wrapper();
// console.log(b);
// arr = [1, 2];
// arr.forEach(async (item, index) => {
//   console.log('item', item, index);
//   throw new Error('test')
// })
// console.log('tet');
// var STOP = {}
// Promise.stop = function () {
//   return Promise.resolve(STOP)
// }

// Promise.prototype.next = function (onResolved, onRejected) {
//   return this.then(function (value) {
//     console.log('next then', value);
//     if (value === STOP) {
//       return STOP
//     } else {
//       return onResolved(value)
//     }
//   }, onRejected)
// }

// const doSth = function () {
//   return new Promise((resolve, reject) => {
//     resolve('stop');
//   });
// }
// doSth()
//   .next(function (value) {
//     if (value === 'stop') {
//       return Promise.stop()
//     }
//     console.log('next1');
//     // normal logic
//   })
//   .next(value => {
//     console.log('next2');
//     // will never get called
//   })
// const obj = {
//   f1: () => console.log(this),
//   f2() { console.log(this) },
// };

// const d = obj.f2();
// new d();
// let a = {};
// a = null;
// global.gc();
// setTimeout(() => {
//   let b = new WeakSet(); b.add(a, '1');
//   console.log(b.has(a));
// }, 10000);
// function taskA(data) {
//   console.log("Task A", data);
//   throw new Error("throw Error @ Task A")
// }
// function taskB(data) {
//   console.log("Task B", data);// 不会被调用
// }
// function onRejected(error) {
//   console.log(error);// => "throw Error @ Task A"
//   return 'test'
// }
// function finalTask(data) {
//   console.log("Final Task", data);
// }

// var promise = Promise.resolve('data');
// promise
//   .then(taskA)
//   .then(taskB)
//   .catch(onRejected)
//   .then(finalTask);