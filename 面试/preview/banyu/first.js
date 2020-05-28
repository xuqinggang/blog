// 2. 宏任务/微任务
console.log(1);
async function async1() {
  console.log(2);
  await console.log(3);
  console.log(4);
}

setTimeout(() => {
  console.log(5);
}, 0);

async1();

new Promise(function (resolve) {
  console.log(6);
  resolve();
}).then(function () {
  console.log(7);
});
console.log(8);

// 3.
var name = 'The Win';
function func() {
  console.log(this.name);
}
var object = {
  name: 'My',
  getNameFunc: function (fn) {
    fn && fn();
    return function () {
      console.log(this.name);
    }
  }
}

// 4. 对象引用
let object = { a: 0 };
function fun(obj) {
  obj.a = 1;
  obj = { a: 2 }
  obj.b = 2;
}
fun(object);
console.log(object);

// 5. 原生 bind 实现