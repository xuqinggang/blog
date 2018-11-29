const http = require('http');
const fs = require('fs');

const url = 'http://img.zcool.cn/community/0117e2571b8b246ac72538120dd8a4.jpg@1280w_1l_2o_100sh.jpg';
const req = http.get(url, res => {
  console.log(`状态码: ${res.statusCode}`);
  console.log(`响应头: ${JSON.stringify(res.headers)}`);

  // res.setEncoding('utf8'); // **注意：默认setEncoding为binary，不需要设置(此处有个坑)
  let rawData = '';
  const chunks = [];
  let size = 0;
  res.on('data', (chunk) => {
    console.log(Buffer.isBuffer(chunk)); // true （每一个chunk都是buffer binary类型)
    size += chunk.length;
    chunks.push(chunk);
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

