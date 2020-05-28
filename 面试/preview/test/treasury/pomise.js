// 手写promise


// promise.race 实现
function PromiseRace(arr) {
  return new Promise((resolve, reject) => {
    arr.forEach((p, index) => {
      // 使用 Promise.resolve()将不是Promise对象转换为Promise对象
      // 调用每一个promise对象的then方法
      // 之后直接resolve或reject
      Promise.resolve(p).then(result => {
        resolve(result)      
      }, (err) => {
        reject(err)
      })
    })
  })
}

// promise.all 实现
// 总结 promise.all 的特点
// 1、接收一个 Promise 实例的数组或具有 Iterator 接口的对象，
// 2、如果元素不是 Promise 对象，则使用 Promise.resolve 转成 Promise 对象
// 3、如果全部成功，状态变为 resolved，返回值将组成一个数组传给回调
// 4、只要有一个失败，状态就变为 rejected，返回值将直接传递给回调all() 的返回值也是新的 Promise 对象
function promiseAll(promises) {
  return new Promise(function(resolve, reject) {
    if (!isArray(promises)) {
      return reject(new TypeError('arguments must be an array'));
    }
    var resolvedCounter = 0;
    var promiseNum = promises.length;
    var resolvedValues = new Array(promiseNum);
    for (var i = 0; i < promiseNum; i++) {
      (function(i) {
        Promise.resolve(promises[i]).then(function(value) {
          resolvedCounter++
          resolvedValues[i] = value
          if (resolvedCounter == promiseNum) {
            return resolve(resolvedValues)
          }
        }, function(reason) {
          return reject(reason)
        })
      })(i)
    }
  })
}
