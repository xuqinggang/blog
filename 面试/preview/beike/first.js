// 贝壳一面
// 自我介绍

// jupiter 优势

// 实现 Promise.all
class Promise {
  static all(...promiseArr) {
    return new Promise((resolve, rejected) => {
      const rt = [];
      for (let [index, promise] of promiseArr) {
        promise
          .then(res => {
            rt[index] = res;
            if (rt.length === promiseArr.length) {
              resolve(rt);
            }
          })
          .catch(err => rejected(err))
      }
    });
  }
}
// 实现 Promise.race
function p1() {
  return new Promise(resolve => {
    setTimeout(() => {
      console.log('p1');
      resolve('p1')
    }, 100)
  });
}
function p2() {
  return new Promise(resolve => {
    setTimeout(() => {
      console.log('p2');
      resolve('p2')
    }, 200)
  });
}
Promise.race([p1(), p2()])
  .then((...args) => console.log('race', args));

// test
Promise.all()
  .then([])
// .catch(err => {

// });

// 实现节流
function throttle(cb, delay) {
  const last = 0;
  return (...args) => {
    if (Date.now() - last > delay) {
      cb(...args);
      last = +Date.now();
    }
  };
}

// 节流: 每一定时间间隔执行
// 防抖: 稳定后执行(延迟执行)
function debounc(cb, delay) {
  let timer = null;
  return (...args) => {
    if (timer) {
      clearTimeout(timer);
      timer = null;
    }

    timer = setTimeout(() => {
      cb(...args);
      clearTimeout(timer);
      timer = null;
    }, delay);
  }
}

const fn = throttle(cb, delay);
fn();

('mousemove', fn);

// 创建子进程 exec/spawn
// child_process
// spawn
// exec
// fork

// koa 中间件执行顺序
// app.use();
// app.use();
// app.use();
