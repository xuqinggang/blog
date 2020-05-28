// 请求队列 最多并发5个请求
async function test() {
  for (let i = 0; i < 10; i++) {
    const ret = await queueRequest(`/api/test/${i}`);
    console.log(i, ret);
  }
}

class Req {
  constructor() {
    this.queue = [];
  }
  queueRequest(url) {
    this.queue.push(url);
  }
}


async function queueRequest(url) {
  this.queue = [];
  this.pendingQueue = [];

  for (let i = 0; i < 10; i++) {
    new Promise((res, rej) => {
      setTimeout(() => {
        console.log(url);
        res(url);
      }, 1000);
    });
  }
}
test();


const queueRequest = (totalReq, maxCount) => {
  const toReq = totalReq.slice(0, maxCount);
  const pendingQueue = totalReq.slice(maxCount);
  let count = toReq.length;
  const res = [];
  if (count === 0) {
    resolve();
  }
  return new Promise((resolve, reject) => {
    for (let i=0; i<toReq.length; i++) {
      let fn = toReq[i];
      fn().then(() => {
        --count;
        const run = function(count) {
          if (count === 0) resolve();
          const f = pendingQueue.shift();
          f().then(() => {
            return run(--count);
          })
        }
        run(count);
      })
    }
  })
}

// 一步一步实现promise
function Promise(callback) {
  var self = this
  self.status = 'PENDING' // Promise当前的状态
  self.data = undefined  // Promise的值
  self.onResolvedCallback = [] // Promise resolve时的回调函数集
  self.onRejectedCallback = [] // Promise reject时的回调函数集
  callback(resolve, reject) // 执行executor并传入相应的参数

  function resolve(value){

  }
  function rejecte(error){

  }
}
// 添加我们的then方法
Promise.prototype.then=function(){

}
