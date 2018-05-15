### react实现onTouchTap事件，react-tap-event-plugin原理讲解与改进

我们项目里采用了[react-tap-event-plugin](https://github.com/zilverline/react-tap-event-plugin)来实现tap事件，解决ios上300毫秒延时问题，但目前大多数机型上使用meta标签`<meta name="viewport" content="width=device-width,initial-scale=1,minimum-scale=1,maximum-scale=1,user-scalable=no">`禁止缩放基本可以解决300毫秒延时问题。但为了兼容性问题还是采用了`react-tap-event-plugin`

这里先说下碰到的问题吧，在一些主流的机型上比如iphone6、7、8,三星s8...手指快速滑动让列表滚动的时候，很容易误触点击进去到详情页由于这个问题是偶先问题，当时没仔细思考，暂且搁置。近来空余时间研究下了这个问题。

简单说下react事件原理，我们通过jsx语法注册的事件比如onclick，react实际上把事件委托在document上，当我们触发click执行回调函数时，react把参数event封装成SyntheticEvent，根据当前点击的instance（这里是指react元素实例）向上遍历找到注册的回调函数，然后主动执行回调函数传入SyntheticEvent。之前也在研究[react事件系统源码](https://github.com/xuqinggang/blog/issues/2), 可前往深入了解下,以便更好的了解事件插件机制。
