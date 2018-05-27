## npm package版本更新引发的问题
（而且还是react版本升级16.2->16.4引发的问题，其实是某个包与react16.4版本不兼容引发的）

#### 问题发生经过
新开了个分支，项目需要添加数据统计的功能，开发完，本地完全正常。提测（我们环境完全基于docker）,部署.......等待中.....，完蛋出问题了，页面无法点击了，所有的点击事件都坏了。。。思考中，难道是新加的数据统计功能导致的，（这里先了解下我们项目是h5项目，为了解决onClick300ms延迟问题，采用了基于[react-tap-event-plugin](https://github.com/zilverline/react-tap-event-plugin)这个库实现的onTouchTap事件）。所以我们数据统计不能采用监听onClick事件，就必须监听touchstart事件，想难道是这里出了问题，难道是阻止冒泡了(what!不应该，是document上监听呀)，查看代码也没有啥阻止冒泡。。。迫不得已，先把数据统计这块代码注释掉了，再提测....心想能恢复正常了....如果正常那数据统计哪到底有问题....结果还是无法点击，页面死死的。。。数据统计功能又给恢复了，发现document上监听的touchstart事件完全正常，可以发送统计pv。

哪里出问题了。。。？难道是`react-tap-event-plugin`这个库，作者更新了，导致出bug了，onTouchTap事件不好使了。。。查看npm版本，也没更新呀。起初也没想是react的问题，所以也就真的没想，还是想是不是react-tap-event-plugin出的问题，然后在测试环境上，找到该包文件所在,打断点调试发现...有重大发现`extractEvents`函数调用传递的参数topLevelType是'touchstart'竟然不是'topTouchstart'，不应该呀。。看[react-tap-event-plugin库TapEventPlugin.js文件extractEvents函数实现](https://github.com/zilverline/react-tap-event-plugin/blob/master/src/TapEventPlugin.js)可以看下图:
![3](https://user-images.githubusercontent.com/13174560/40577030-8e099de4-6131-11e8-842d-b7e172e6368c.jpeg)
> 之所以会发现这个问题是之前有[研究react event体系](https://github.com/xuqinggang/blog/issues/2)和修改[react-event-tap-plugin存在的几个bug](https://github.com/xuqinggang/blog/issues/1)

问题找到了原来是react-tap-event-plugin这个库出问题了....等等不对呀，之前还是好好地..为啥会出问题...为啥extractEvents函数接收的参数变了.....然后发现，我凑，react版本升级了从16.2.0->16.4.0，还是几天前刚更新的版本，
![image](https://user-images.githubusercontent.com/13174560/40577113-afd2050a-6132-11e8-8342-fa4f693e8804.png)
难道是此版本升级导致兼容性问题啦,应该是了。然后查看16.4这个版本的代码，相比16.2这个版本代码果真不一样了，而且还不兼容。如下:
[react-16.4版本一个文件代码](https://github.com/facebook/react/blob/v16.4.0/packages/react-dom/src/events/SimpleEventPlugin.js)图片如下:
![image](https://user-images.githubusercontent.com/13174560/40577190-097f5390-6134-11e8-8703-deedead54775.png)

[这里也看下react-16.2版本的同一文件代码](https://github.com/facebook/react/blob/v16.2.0/packages/react-dom/src/events/SimpleEventPlugin.js)
![image](https://user-images.githubusercontent.com/13174560/40577234-df588e3c-6134-11e8-9728-88fbd3ad34af.png)

**问题找到了就是react次版本升级导致与`react-tap-event-plugin这个库不兼容了`**

### 解决问题
问题找到了，现在要么修改`react-tap-event-plugin`这个库兼容最新的react（有点麻烦，也无法快速解决问题），所以只能固定react版本了，禁止提测的时候react安装16.4的包，应继续安装16.2。等等好像又有问题呀~~~，我现在npm版本已经是5以上，支持package-lock.json，可以锁定版本安装依赖的时候保持一致的依赖环境，所以按理说npm install的时候，react版本不会升级呀。。。。查看了本地的package-lock.json，react锁定的版本也确实是16.2如下图:
![image](https://user-images.githubusercontent.com/13174560/40584236-02b31708-61d0-11e8-9477-589ddf99f86d.png)
那测试docker环境的packge-lock.json中react锁定的版本呢，what!，怎么是16.4呢...不应该呀。思考中.....想起了之前编写docker环境部署的Dockerfile文件时，只是先将package.json COPY了，然后npm install，那么由于没有packaga-lock.json文件，也就不会有什么锁定的版本安装了。Dockerfile文件如下图:
![image](https://user-images.githubusercontent.com/13174560/40584285-ef251ea6-61d0-11e8-82bc-c2da561fc264.png)
所以，应该也把package-lock.json文件给COPY过去，然后npm install，这样应该解决问题了。
**完整的Dockerfile文件编写:**
```sh
FROM private-registry.sohucs.com/nangua/nangua_front_node:v8.9.3

WORKDIR /pumpkin-c/
COPY ./package.json /pumpkin-c/package.json
COPY ./package-lock.json /pumpkin-c/package-lock.json
RUN npm install pumpkin-font-c --registry=xxxxx && \
    npm install nangua-js-statistics --registry=xxxx && \
    npm install

COPY ./ /pumpkin-c/
RUN npm run build_test && \
        npm run build_render_test

EXPOSE 3000
ENTRYPOINT cd /pumpkin-c/ && \
    npm run server
```
[至于为什么不先执行`COPY ./ /pumpkin-c/`，然后npm install，这样不就没问题了，请看docker的这篇文章](https://github.com/xuqinggang/blog/issues/7)
