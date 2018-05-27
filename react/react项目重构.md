## react项目重构
> 先说下问题，我们项目是一个移动端项目，起初为了考虑资源文件的大小，决定只用react和react-router，对于页面、组件需要共享的数据简单的存放在window上。并尽量不用第三方组件库，简单封装项目本身需要的公共组件。一开始项目体量不大，完全可以应对。但随着项目越来越复杂，组件，页面之间需要传递的数据越来越多、交互越来越复杂。决定要开始重构了，也就是要加入redux了（一是对reudx比较熟悉、redux生态更广而且更适用于复杂大型项目状态的管理，所以未考虑mobx）
> 这里放几篇redux和mobx比较的文章
[MobX 和 Redux 的比较](https://github.com/sorrycc/blog/issues/5)
[react 的数据管理方案：redux 还是 mobx？](http://imweb.io/topic/59f4833db72024f03c7f49b4)
[你需要Mobx还是Redux？](https://juejin.im/post/5a7fd72c5188257a766324ae)
[Mobx 思想的实现原理，及与 Redux 对比](https://zhuanlan.zhihu.com/p/25585910)

> 现在由于我们加入了服务器端渲染，所以也可以不用太过考虑资源文件的大小，好好地调研下基于react+redux技术栈，添加哪些有用的库来进行重构。
> 有关项目重构的想法:
> 1. 前期某些组件设计不是很合理，先进行组件的重构与优化。[对组件的重构请看这篇文章](https://github.com/xuqinggang/blog/issues/3)
> 2. 项目结构的优化（目录组织）。一个页面组件，应该由各个模块组件（业务组件）组成，提取出通用的共享组件（如:弹窗组件等）。业务组件内可能调用某个通用组件。
> 3. 基于上面目录结构的优化，想:业务组件或许也会被复用，本人非常赞同纯组件的概念（就是组件内不包含业务逻辑），业务组件中也不应包含业务逻辑，把业务逻辑提取出来，放在页面组件中去实现，页面组件是不太有复用的场景。
> 4. 逻辑提取出来了，把所有逻辑都放在页面组件中，会将页面组件弄得很大、臃肿。所以应该有一个专门处理组织逻辑的地方。了解到redux-saga一个十分强大的redux中间件，主要是用来管理异步操作的，各种强大的指令也可以用来管理组织业务逻辑。[不了解redux-saga的可以先看下这篇文章](https://github.com/xuqinggang/blog/issues/6)
> 5. 其实要是想更好的维护项目，采用基于MVC、MVVM的架构组织项目是十分不错的。
现在View层(面向用户的视图层)有react，redux的store作为Model层负责管理数据，现在只差一个Control层或者View-Model层，负责连接View层和Model层，这一层其实主要是来处理业务逻辑的。View层发出指令，在Control层或者View-Modle层接收来自View层的指令进行业务的处理在发送指令修改Model上的数据，Model层数据改变了势必要影响到View层，那么这里Model层是直接关联到View层，还是通过Control层再关联到View层，我认为是Model层通过react-redux提供的connect直接更改View层。([可以了解下MVC，MVP 和 MVVM](http://www.ruanyifeng.com/blog/2015/02/mvcmvp_mvvm.html))。看下图(参照MVC设计的一个模式)可以更直观的了解下:![1](https://user-images.githubusercontent.com/13174560/40575757-6aeb47a4-611d-11e8-9106-622caa1812d9.jpeg)
下图为一个更详细的数据流动图:![2](https://user-images.githubusercontent.com/13174560/40575976-a9fda7ee-6121-11e8-9b38-c6b42960460f.jpeg)
