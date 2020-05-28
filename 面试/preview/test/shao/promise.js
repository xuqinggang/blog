function MyPromise(executor){
  let self = this
  self.value = undefined
  self.reason = undefined
  // 默认promise状态是pending
  self.status = 'pending'
  // 用来保存then 方法中，第一个参数
  self.onResolvedCallbacks = []
  // 用来保存then 方法中，第二个参数
  self.onRejectedCallbacks = []
  function resolve(value){
    if(self.status === 'pending'){ //保证状态一旦变更，不能再次修改
      self.value = value
      self.status = 'resolved' // 成功状态
      self.onResolvedCallbacks.forEach(fn => {
        fn()
      })
    }
  }
  function reject(reason){
    if(self.status === 'pending'){
      self.reason = reason
      self.status = 'rejected' //失败状态
      self.onRejectedCallbacks.forEach(fn => {
        fn()
      })
    }
  }
  executor(resolve, reject) // 因为会立即执行这个执行器函数
}

MyPromise.prototype.then = function(onFulfilled, onRejected){
  let self = this
  if(self.status === 'resolved'){
    onFulfilled(self.value)
  }
  if(self.status === 'rejected'){
    onRejected(self.reason)
  }
  if(self.status === 'pending'){
  // 订阅
    self.onResolvedCallbacks.push(function(){
      onFulfilled(self.value)
    })
    self.onRejectedCallbacks.push(function(){
      onRejected(self.reason)
    })
  }
}

// 例子：

let p = new MyPromise(function (resolve, reject) {
  console.log('start')
  setTimeout(function(){
      resolve('data1')
  },2000)
})
p.then(
  (v) => {
    console.log('success： ' + v)
  },
  (v) => {
    console.log('error： ' + v)
  }
)
p.then(
  (v) => {
    console.log('success： ' + v)
  },
  (v) => {
    console.log('error： ' + v)
  }
)
console.log('end')


// ---------引入链式调用-------

readFile('./name.txt')
.then(
  (data) => {
    console.log(data)
    return readFile(data)
  },
  (err) => {console.log(err)}
)
.then(
  (data) => { console.log(data) },
  (err) => { console.log(err) }
);

MyPromise.prototype.then = function(onFulfilled, onRejected){
  let self = this
  let promise2 = new MyPromise(function(resolve, reject){  //返回一个新promise
  // then 函数的成功回调函数的执行结果 与 promise2的关系
  if(self.status === 'resolved'){
    try{
      let x = onFulfilled(self.value)
        resolve(x) // 这是 x 是常量的时候，但x可能是一个新的promise，
    }catch(e){
       reject(e)
    }
  }
  if(self.status === 'rejected'){
    try{
      let x = onRejected(self.reason)
        resolve(x)
      }catch(e){
        reject(e)
      }
  }
  if(self.status === 'pending'){
    self.onResolvedCallbacks.push(function(){
      try{
        let x = onFulfilled(self.value)
        resolve(x)
      }catch(e){
        reject(e)
      }
    })
    self.onRejectedCallbacks.push(function(){
      try{
        let x = onRejected(self.reason)
        resolve(x)
      }catch(e){
        reject(e)
      }
    })
 }
})
return promise2
}