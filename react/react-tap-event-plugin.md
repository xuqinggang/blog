### react实现onTouchTap事件，react-tap-event-plugin原理讲解与改进

我们项目里采用了[react-tap-event-plugin](https://github.com/zilverline/react-tap-event-plugin)来实现tap事件，解决ios上300毫秒延时问题，但目前大多数机型上使用meta标签`<meta name="viewport" content="width=device-width,initial-scale=1,minimum-scale=1,maximum-scale=1,user-scalable=no">`禁止缩放基本可以解决300毫秒延时问题。但为了兼容性问题还是采用了`react-tap-event-plugin`

这里先说下碰到的问题吧，在一些主流的机型上比如iphone6、7、8,三星s8...**手指快速滑动让列表滚动的时候，很容易误触点击进去到详情页**由于这个问题是偶现问题，当时没仔细思考，暂且搁置。近来空余时间研究下了这个问题。

简单说下react事件原理，我们通过jsx语法注册的事件比如onclick，react实际上把事件委托在document上，当我们触发click执行回调函数时，react把参数event封装成SyntheticEvent，根据当前点击的instance（这里是指react元素实例）向上遍历找到注册的回调函数((根据当前instance,一层层向上寻找parent instance找到顶部,每个instance push到数组里，然后根据buddle和capture从不同方向遍历这个instance数组并寻找每个instance上对应的listener, push到listeners数组里))，然后批量执行listeners数组并传入SyntheticEvent。这里解释的很简单，深入了解请看[react事件系统源码](https://github.com/xuqinggang/blog/issues/2)。

##### react-tap-event-plugin核心文件
1. TapEventPlugin.js 用来实现onTouchTap事件
2. SyntheticEvent.js 合成事件的构造函数

TapEventPlugin.js，用来实现onTouchTap事件，其实很简单。原理是移动端根据touchStart、touchMove、touchEnd，同理pc根据mouseDown、mouseMove、mouseUp。

核心代码在于下面这个函数(以touch事件讲解为例, 请看注释)[源文件 TapEventPlugin.js](https://github.com/xuqinggang/react-tap-event-plugin/blob/master/src/TapEventPlugin.js)
```
function createTapEventPlugin(shouldRejectClick) {
  return {
    tapMoveThreshold: tapMoveThreshold,

    eventTypes: eventTypes,
    // extractEvents函数的调用时机，是在触发eventTypes.dependencies
    // ['topMouseDown', 'topMouseMove', 'topMouseUp', 'topTouchStart', 
    // 'topTouchCancel', 'topTouchEnd', 'topTouchMove'] 以上事件。
    // 至于这些事件是何时注册到document上的，请看[react事件系统源码](https://github.com/xuqinggang/blog/issues/2)
    extractEvents: function(
      topLevelType,
      targetInst,
      nativeEvent,
      nativeEventTarget
    ) {
        // 除了isStartish和isEndish函数中排除的事件，进来的时候直接返回不做任何处理
        if (!isStartish(topLevelType) && !isEndish(topLevelType)) {
        return null;
      }
      // on ios, there is a delay after touch event and synthetic
      // mouse events, so that user can perform double tap
      // solution: ignore mouse events following touchevent within small timeframe
      if (touchEvents.indexOf(topLevelType) !== -1) {
        usedTouchTime = Date.now();
      } else {
        if (shouldRejectClick(usedTouchTime, Date.now())) {
          return null;
        }
      }
      var event = null;
      // touchEnd事件进来的时候，计算和起点坐标中之间的距离 下面发现有个判断 distance < tapMoveThreshold
      // 这里如果移动的距离小于tapMoveThreshold值,那么就会触发touchTap事件。作者这里设置tapMoveThreshold为10
      // 测试发现，在iphone系列手机上，你移动的距离很难小于10，所以移动了不会触发ontouchTap事件
      // 但是在三星s8上测试，你手指移动相同的物理像素（很小的移动），结果计算出来的distance就会很容易达到10以上，
      // 那么就会触发onTouchTap事件.猜测这就是问题所在(滚动的时候容易误触点进去),所以先暂时吧tapMoveThreshold调小
      // 其实移动相同的物理像素，计算出来的distance不同，是由于设备像素比不同.
      var distance = getDistance(startCoords, nativeEvent);
      if (isEndish(topLevelType) && distance < tapMoveThreshold) {
        // touchend事件触发，就会生成合成事件
        // 然后调用EventPropagators.accumulateTwoPhaseDispatches(event); 遍历寻找相应的onTouchTap事件,触发绑定的回调函数
        event = SyntheticEvent.getPooled(
          eventTypes.touchTap,
          targetInst,
          nativeEvent,
          nativeEventTarget
        );
      }
      // touchStart事件进来的时候，记录触发的x,y坐标
      if (isStartish(topLevelType)) {
        startCoords.x = getAxisCoordOfEvent(Axis.x, nativeEvent);
        startCoords.y = getAxisCoordOfEvent(Axis.y, nativeEvent);
      } else if (isEndish(topLevelType)) {
        startCoords.x = 0;
        startCoords.y = 0;
      }
      EventPropagators.accumulateTwoPhaseDispatches(event);
      return event;
    }
  };
}
```

*问题基本找到了，就是由于作者设置的tapMoveThreshold值过大导致，解决方案[请看](https://github.com/xuqinggang/react-tap-event-plugin)*
