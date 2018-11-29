### 基于[qrcode](https://github.com/soldair/node-qrcode)用node实现二维码的美化(logo+随机色)

<img width="100" height="100" src="https://user-images.githubusercontent.com/13174560/49071997-2f5ed780-f26a-11e8-96c6-6eb558e7a42d.png" alt="">    
上图是暂时实现的美化效果，二维码的位置探测图形和数据区域（满足周围module都是白色的中间module）随机上色.    

**大家在看具体实现之前可以看下[上文二维码基本原理小知识](https://github.com/xuqinggang/blog/issues/12)，便于更好的理解实现**

[具体实现代码链接](https://github.com/xuqinggang/qrcode-color/blob/master/index.ts#L3-L53)
```javascript
/**
主要原理：利用QRCode.create创建的二维码矩阵数据，寻找可染色的module，填充img元素
*/
/**
 * 利用qrcode modules Bitmatrix，向pngImage.data填充rgba
 * @param imgData
 * @param qr 利用[QRCode.create](https://github.com/soldair/node-qrcode#createtext-options)创建返回的qrObj
 * @param opts
 */
export function qrToImageData (imgData, qr, opts) {
  // different version(1~40) have different different size
  // version 1 : 21 * 21
  // version 2 : 25 * 25
  const size = qr.modules.size;
  // data每个元素表示每个module的色值,0白色，1黑色；总共size * size个module 是个一维数组
  // NOTICE：不包含margin区域
  const data = qr.modules.data;
  // 每个modules，所占据多少像素
  // scale = x ( per module have x pixel)
  // eg: scale = 4; 每个module占据：4x4=16个像素
  const scale = getScale(size, opts);
  // 生成图片后的像素尺寸(宽高一致)
  const symbolSize = Math.floor((size + opts.margin * 2) * scale);
  // margin所占据的像素宽度
  const scaledMargin = opts.margin * scale;
  const palette = [opts.color.light, opts.color.dark];

  // 横轴i, 纵轴j，遍历的是每个像素值
  for (let i = 0; i < symbolSize; i++) {
    for (let j = 0; j < symbolSize; j++) {
      let posDst = (i * symbolSize + j) * 4;
      let pxColor = opts.color.light;

      if (i >= scaledMargin && j >= scaledMargin &&
        i < symbolSize - scaledMargin && j < symbolSize - scaledMargin) {
        // 利用i、j判断每个像素所处的module位置
        const iSrc = Math.floor((i - scaledMargin) / scale);
        const jSrc = Math.floor((j - scaledMargin) / scale);
        // 取出该module所代表的颜色值
        pxColor = palette[data[iSrc * size + jSrc] ? 1 : 0];

        if (opts.randomColor && (
          // 判断数据区域module是否满足上色条件
          judgeIsCanColor(iSrc, jSrc, data, size) ||
          // 判断区域是否为位置探测区域
          judgeFinderPattern(i, j, {
            margin: opts.margin,
            size,
            scale,
          })
        )
        ) {
          pxColor = hex2rgba(opts.randomColor);
        }
      }

      // img元素填充rgba,每4个元素为一个像素
      imgData[posDst++] = pxColor.r;
      imgData[posDst++] = pxColor.g;
      imgData[posDst++] = pxColor.b;
      imgData[posDst] = pxColor.a;
    }
  }
}
```

### 有更多的beautify qr code
![image](https://user-images.githubusercontent.com/13174560/48657986-4d138c00-ea75-11e8-95b9-93eb91ce0aa1.png)
![image](https://user-images.githubusercontent.com/13174560/48657988-5a307b00-ea75-11e8-92be-e409c815e22d.png)
![image](https://user-images.githubusercontent.com/13174560/48657996-66b4d380-ea75-11e8-966f-81d1041f1390.png)

后期如果有业务驱动或时间精力充沛的话，会实现诸如以上有趣的二维码（类似草料二维码的各种定制化）    
- [ ] 背景图
- [ ] module more colorful
- [ ] ...

后续会参考[awesome-qr](https://github.com/SumiMakito/Awesome-qr.js/blob/master/README-zh_CN.md)在浏览器端有更多多样化的实现，利用[qrcode](https://github.com/soldair/node-qrcode)库用node实现二维码的更多的美化。   
**做这一切主要是服务于海报系统，让海报系统更加丰富**


参考文献
> **[二维码中间+logo](https://www.jianshu.com/p/000d4a63f9ca)**   
> [python-qrcode](https://pypi.org/project/qrcode/)   
> [c#-qrcode](https://github.com/codebude/QRCoder)    
> **[zxing-支持logo，圆角logo，背景图，颜色配置](https://my.oschina.net/u/566591/blog/1491697)**
> [python-qrcode colorful](https://github.com/lincolnloop/python-qrcode/blob/master/qrcode/image/pil.py)
> [[Python]使用QRCode生成彩色二维码](https://www.cnblogs.com/syh6324/p/9497135.html)
