## node http原生模块下载图片

**注意知识点:**
> 1. 在node发请求，默认情况下响应体设置的编码为buffer binary，监听response的data事件拼接chunk，最终调用Buffer.concat合并成一个Buffer对象
> 2. Buffer对象，与多种编码(常见的:ascii、utf8、base64、hex、binary)字符串类型之间的转换
> 3. utf8编码字符串独特的工作方式, Buffer二进制转化为utf8后，是无法再转换为其他编码的（因为buffer转换为utf8已经是乱码）
> 4. 对于不能识别的字节流会解码成�，重点是�这货竟然有相应的utf8编码，编码为0xFFFD。这里有个关键点，很多字节流是无法正确解码的，但他们都会用�表示，而�字符又只有一种编码，所以对二进制数据如：图片，视频等，通过utf8编码并保存到变量后，是无法通过utf8原样解码成原来二进制的。


### 直接上代码，看注释即可
```javascript
const http = require('http');
const fs = require('fs');

const url = 'http://img.zcool.cn/community/0117e2571b8b246ac72538120dd8a4.jpg@1280w_1l_2o_100sh.jpg';
const req = http.get(url, res => {
  console.log(`状态码: ${res.statusCode}`);
  console.log(`响应头: ${JSON.stringify(res.headers)}`);

  // res.setEncoding('utf8'); // **注意：默认setEncoding为binary，不需要设置(此处有个坑)
  let rawData = '';
  const chunks = [];
  const tmpChunk = '';
  const size = 0;
  res.on('data', (chunk) => {
    console.log(Buffer.isBuffer(chunk)); // true （每一个chunk都是buffer binary类型)
    size += chunk.length;
    chunks.push(chunk);
    /*
      // 在这里解释下，如果res.setEncoding为utf8
      // chunk此处，会调用chunk.toString('utf8')转换为utf8编码字符串
      tmpChunk += chunk; // 最终为utf8编码类型字符串
      // 保存为utf8是无法解码为原来的二进制数据
    */
  });
  res.on('end', () => {
    const imgBuf = Buffer.concat(chunks, size);
    // 已经有了图片的Buffer对象，可以有多种选择
    // 1. 转换成base64
    /*
      const type = res.headers['content-type'];
      const prefix = `data:${type};base64,`;
      const base64 = imgBuf.toString('base64');
      const imgBase64 = `${prefix}${base64}`;
    */

    // 2. base64或者Buffer存储到本地
    /*
      fs.writeFile('./__TEST__/images/1.jpg', imgBuf, function(err) {
          if(err) { console.log(err); }
      });
    */
    console.log('响应中已无数据。');
  });
});

```


## node request模块下载图片
**注意: **
> 1. request模块默认设置encoding为utf8，需要手动设置为null(下图为[request模块encoding说明](https://github.com/request/request))
![image](https://user-images.githubusercontent.com/13174560/45041202-4ee6c980-b09a-11e8-9e70-4a010f53935c.png)

```javascript
request.get({
  url: url,
  encoding: null // **指定编码
  }, (err, response, body) => {
    console.log(Buffer.isBuffer(body)); // true
  });
```

> 参考资料
> [node http](https://nodejs.org/api/http.html)
> [node utf8 to binary](https://stackoverflow.com/questions/25223776/node-buffers-from-utf8-to-binary)
