1. 请用编程方式找出下列最快的 npm 镜像接口, 要求:
  1. 排除请求失败的接口
  2. 耗费时间最短

const apis = [
  'https://registry.npm.taobao.org/fe/latest',
  'https://registry.npmjs.org/fe/latest',
  'https://registry.yarnpkg.com/fe/latest'
]

```javascript
const apis = [
  'https://registry.npmjs.org/fe/latest',
  'https://registry.npm.taobao.org/fe/latest',
  'https://registry.yarnpkg.com/fe/latest'
]

const request = options =>
new Promise((resolve, reject) =>
    require('https')
    .request(options, res => {
      res.on('data', () => {})
      res.on('end', () => resolve(options))
      })
    .on('error', reject)
    .end()
    )

const race = promises => {
  const resolve = Promise.resolve.bind(Promise)
    const reject = Promise.reject.bind(Promise)
    return Promise.all(promises.map(x => x.then(reject, resolve))).then(
        reject,
        resolve
        )
}

race(apis.map(api => request(api))).then(api => console.log('fastest: ', api))
```
