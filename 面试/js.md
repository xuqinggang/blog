## js 基础

### 作用域/闭包
[JavaScript执行环境 + 变量对象 + 作用域链 + 闭包](https://www.cnblogs.com/no-particular/archive/2013/01/31/2887293.html)
- 变量对象
进入执行环境
执行代码

### 宏观/微观

### 函数

**实现 bind**
```
Function.prototype.bind = function(bindObj, ...extraArgs) {
  let self = this;
  return function(...args) {
    self.apply(bindObj, [...extraArgs, ...args]);
  };
}
```

### this

### 原型链

**instanceof**
[JavaScript instanceof 运算符深入剖析](https://www.ibm.com/developerworks/cn/web/1306_jiangjj_jsinstanceof/#icomments)

**__proto__/prototype**
[从__proto__和prototype来深入理解JS对象和原型链](https://github.com/creeperyang/blog/issues/9)

### 函数式编程
纯函数 无副作用 易测试 并发执行

**函数柯里化**
[JavaScript Infinite Currying](http://note.youdao.com/noteshare?id=9fca8a288c89fba04f7910c70b4e7de4)

### js 垃圾回收机制
垃圾回收机制依赖引用计数

### throttle/debounce
throttle 每隔一定时间执行 mousemove
debounce 空闲时间执行 延迟执行, input xhr

### promise
[从如何停掉 Promise 链说起](https://github.com/xieranmaya/blog/issues/5)

### xhr
abort
ready
status
xhr.send