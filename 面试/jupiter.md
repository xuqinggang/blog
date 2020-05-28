## 围绕 Jupiter 框架相关知识点面试复习

### reduck
1. reduck 是基于 redux 生态的 react 状态管理，提供全局单一状态树，主要就是方便跨组件之间共享数据。
Reduck 也是一个运行时框架，以 MVC 模式组织 React 开发。
M, Model 层，一个纯对象 通过 createModel 调用。类似 Rematch。

createApp
createModel
useModel

#### dva
redux-saga
操作函数
generator语法

#### hox


#### Context useReducer 实现状态管理
[用 useContext + useReducer 替代 redux](https://juejin.im/post/5ceb37c851882520724c7504)
弊端：
reducer 结构本身就是(state, action) switch action type 来处理

#### Redux
**弊端**
- 样板代码/文件  actions reducer const types
去到管理 redux 的文件夹，思考把这个状态放到状态树的哪个位置，然后新建一个文件夹并命名 myFeature。
创建三个文件 my-feature/actions.js 、my-feature/reducer.js、my-feature/type.js
combineReducer 和并 reduce
将 action 引入到组件中
通过 connect HOC 与你的组件相连
增加两个方法 mapStateToProps 和 mapDispatchToProps
- 

**combineReducers**
reducers -> reducer
**compose**
function compose(...funcs) {
  return funcs.reduce((a, b) => (...args) => a(b(...args)));
}
**中间件机制 applyMiddleware**


**Flux**

#### Model 层与 Rematch 对比
Rematch Model 结构

state （Model 的初始状态）
reducers （Model 同步修改 State 的地方）
effects (Model 管理异步的地方）
而 Reduck 的 Model 结构

namespace ( Model 的命名空间)
state （Model 的初始状态）
actions （Model 同步修改 State 的地方）
effects (Model 管理副作用的地方）
computed (计算派生数据的地方）
Rematch 有的功能，Reduck 都已集成。但 Reduck 某些功能特性是 Rematch 不包含的

Reduck 特性：
- 提供 computed。有些数据并不是 state 中的数据，而是有 state 派生计算得到。请看用法。
- 一个副作用的通常有三种状态 pending\fulfilled\rejected，Reduck 对这三种状态的触发完全是自动的。你只需要在这三种状态处理函数中编写修改 state 的逻辑，然后触发了一个副作用的 action，会自动调用这三种状态的处理。 而 Rematch 需要在 effect 函数中自己来手动调用三种状态的 action.
- 提供了很多有用的工具函数。
handleEffect。自动生成处理异步的 action 函数。
updateState。提供自动操作 state 数据的 action 函数。
extend。实现 Model 复用
- Rematch 还是使用的 react-redux connect API。而 Reduck 接管了 ViewController 层（将组件与 Model 建立直接的连接），提供了更简化的 connect 用法，以及 Hook API useModel。

**immer**
Model action 同步修改 state 地方，也提供了 immer 插件，用 mutable 的操作方式来返回 immutable state。因为react/redux 要求返回 immutable 数据，通常我们是用层层返回新的对象方式(修改层级越深越麻烦)，有些麻烦。借助 immer 就可以简化。

提供 produce 函数，produce(state, (draft) => {}) draft 可以通过 mutable 方式修改。。但是无需再 return new object（这样是错误的）。

Map/Set 通过 enableMapSet() 开启即可.

enableFreeze(false) 性能更好

代理拦截，draft 是一层代理，生成属性修改 data.a.b 通过代理懒初始化，访问 data.a 会生成 dataA 代理，以此来访问 dataA.b

[精读《Immer.js》源码](https://zhuanlan.zhihu.com/p/34691516)
[精读 Immutable 结构共享](https://juejin.im/entry/59b5e4916fb9a00a3b3bd52d)

**computed**
通过 reslector 提供缓存能力

通过属性描述符，来实时访问 computed 数据。
其实通过代理 proxy 性能会比属性描述符更好。

### i18n

### Garr

#### 微服务
独石/单体 应用
更关注解决的是项目独立开发/部署(秒级)，子Module 版本控制（版本列表/uid/AB测）

#### 业界方案
single-spa

#### Garr-SSR
- ssr 打包
- loadable(子Module) 资源收集、注入到 html
- loadable(子 Module) 资源预加载

**webpack dynamic import(target=web/node)**

**loadable/component**
react-loadable 不再维护

babel plugin  代码

webpack plugin 
loadable-stats.json 作用

#### Garr-CSR
css/js_soucrce_url
new Function

**仿写 react-loadable**
loader 是个promise，返回 Component 即可，支持SSR为非 Promise 来同步加载

**Master/Moduel传递数据**

**garr.setExternal/webpack.externals公共库**

**沙盒**
变量保护: window / 样式，前后快照保存


### SSR

**loadable(css/js)**
[React Loadable SSR](https://www.jianshu.com/p/462bb9d1c982)

**SSR Runtime**
browser/node entry
node bundle -> App entry
context 同构(避免访问window)
loader 收集(额外的一次渲染)

SSR_DATA {
  i18nData,
  loadersData,
  storeState,
  garrlistData,
}

**支持功能**
- .node.ts 同构
- react-helemet SEO
- loadable/component
- styledComponent
- Router Redirect
  StaticRouter context
  location、basename
- Router dynamic params

**hydrate vs render**
[stackoverflow](https://stackoverflow.com/questions/46516395/whats-the-difference-between-hydrate-and-render-in-react-16)

**renderToStaticMarkUp**
[从renderToStaticMarkup入手优化React同构性能](https://juejin.im/post/5cc7c12b6fb9a031f525d20c)
静态页面

**stream**
流的形式返回给浏览器，将浏览器解析和渲染DOM的时间提前，缩短了TTFB(Time To First Byte)，同时流的形式可以减少内存占用，减轻了服务端的压力


**注水+直出**


### i18n


### tsdx
**rollup**
rollup -> rollup typescript plugin && babel plugin

**package.json**
package.json 字段含义
polyfill，库标识出，业务项目自行注入
webpack mainFiled 决定加载顺序 browser module main

**export default**
[](https://juejin.im/post/5c4acd646fb9a049b5072f0e)
[深入解析ES Module（二）：彻底禁用default export)(https://zhuanlan.zhihu.com/p/97335917)
[typescript编译选项esModuleInterop的作用](https://blog.csdn.net/juzipidemimi/article/details/103438437)