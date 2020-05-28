// 微信请求并发数量限制了10个，如何突破这个限制。可以采用
// 超过是个请求则排队发出

var request = function(option) {
  const { url, method, data} = option;
  return new Promise((resolve, reject) => {
    wx.request({
      url,
      method,
      data,
      success: res => resolve(res),
      fail: error => reject(error)
    })
  })
}

function queueRequest(fns, maxLen) {
  return new Promise((resolve, reject) => {
    const count = fns.length;
    const res = [];
    const firstQueue = fns.slice(0, maxLen);
    const lastQueue = fns.slice(maxLen);
    
    if(count === 0) {
      resolve();
    }

    for (let fn of firstQueue) {
      fn().then(data => {
        --count;
        const next = function(count) {
          if (count === 0) resolve();
          const f = lastQueue.shift();
          f().then(() => {
            return next(--count)
          })
        }
        return next(count);
      })
    }
  })


}