/* ================instanceof=============== */

// typeof instanceof
function instance_of(L, R) {//L 表示左表达式，R 表示右表达式
  var O = R.prototype;
  L = L.__proto__;
  while (true) { 
      if (L === null) 
        return false; 
      if (O === L) // 这里重点：当 O 严格等于 L 时，返回true 
        return true; 
      L = L.__proto__; 
  } 
}

// js在底层存储变量的时候，会在变量的机器码的低位1-3位存储其类型信息

// 000：对象
// 010：浮点数
// 100： 字符串
// 110：布尔值
// 1： 整数

// 但是，对于undefined和null来说，这两个的信息存储比较特殊。
// null所有机器码均为0，undefined为-2^30整数，所以typeof判断时null均为0，因此被当做对象。
// 所以一般用typeof判断基本数据类型。
// 还可以通过Object.prototype.toString来判断

/* ================原型链=============== */

// 原型链
// 1.在JS里，万物皆对象。方法（Function）是对象，方法的原型(Function.prototype)是对象。
// 因此，它们都会具有对象共有的特点。即：对象具有属性__proto__，可称为隐式原型，
// 一个对象的隐式原型指向构造该对象的构造函数的原型，这也保证了实例能够访问在构造函数原型中定义的属性和方法。
// 2.方法(Function)方法这个特殊的对象，除了和其他对象一样有上述_proto_属性之外，
// 还有自己特有的属性——原型属性（prototype），
// 这个属性是一个指针，指向一个对象，这个对象的用途就是包含所有实例共享的属性和方法（我们把这个对象叫做原型对象）。
// 原型对象也有一个属性，叫做constructor，这个属性包含了一个指针，指回原构造函数。

Object.__proto__ === Function.prototype // true
Function.prototype.__proto__ === Object.prototype // true

/* ==============this================= */

// this指向
// 全局上下文 非严格模式和严格模式中this都是指向顶层对象
this === window // true

// 函数上下文

// 非严格模式
var name = 'window';
var doSth = function(){
    console.log(this.name);
}
doSth(); // 'window'

// 非严格模式，let没有变量提升
let name2 = 'window2';
let doSth2 = function(){
    console.log(this === window);
    console.log(this.name2);
}
doSth2() // true, undefined

// 严格模式下， 禁止this关键字指向全局对象
// 严格模式的限制
// （1）不允许使用为声明的变量
// （2）不允许删除变量或对象
// （4）不允许变量重名
// ....
'use strict'
var name = 'window';
var doSth = function(){
    console.log(typeof this === 'undefined');
    console.log(this.name);
}
doSth(); // true，// 报错，因为this是undefined

// 箭头函数
// 箭头函数中没有this绑定，必须通过查找作用域链来决定其值。 如果箭头函数被非箭头函数包含，
// 则this绑定的是最近一层非箭头函数的this，否则this的值则被设置为全局对象。
var name = 'window';
var student = {
    name: '若川',
    doSth: function(){
        // var self = this;
        var arrowDoSth = () => {
            // console.log(self.name);
            console.log(this.name);
        }
        arrowDoSth();
    },
    arrowDoSth2: () => {
        console.log(this.name);
    }
}
student.doSth(); // '若川'
student.arrowDoSth2(); // 'window'

//总结：
// 如果要判断一个运行中函数的 this 绑定， 就需要找到这个函数的直接调用位置。 找到之后
// 就可以顺序应用下面这四条规则来判断 this 的绑定对象。

// 1、new 调用：绑定到新创建的对象，注意：显示return函数或对象，返回值不是新创建的对象，而是显式返回的函数或对象。
// 2、call 或者 apply（ 或者 bind） 调用：严格模式下，绑定到指定的第一个参数。非严格模式下，null和undefined，指向全局对象（浏览器中是window），
// 其余值指向被new Object()包装的对象。
// 3、对象上的函数调用：绑定到那个对象。
// 4、普通函数调用： 在严格模式下绑定到 undefined，否则绑定到全局对象。

// ES6 中的箭头函数：不会使用上文的四条标准的绑定规则， 而是根据当前的词法作用域来决定this， 
// 具体来说， 箭头函数会继承外层函数，调用的 this 绑定（ 无论 this 绑定到什么），没有外层函数，
// 则是绑定到全局对象（浏览器中是window）。 这其实和 ES6 之前代码中的 self = this 机制一样。
// DOM事件函数：一般指向绑定事件的DOM元素，但有些情况绑定到全局对象


/* ================bind=============== */

// bind 实现
var slice = Array.prototype.slice;
  Function.prototype.bind = function() {
    var thatFunc = this, thatArg = arguments[0];
    var args = slice.call(arguments, 1);
    if (typeof thatFunc !== 'function') {
      // closest thing possible to the ECMAScript 5
      // internal IsCallable function
      throw new TypeError('Function.prototype.bind - ' +
             'what is trying to be bound is not callable');
    }
    return function(){
      var funcArgs = args.concat(slice.call(arguments))
      return thatFunc.apply(thatArg, funcArgs);
    };
  };

/* ================闭包=============== */

// 闭包可以让你从内部函数访问外部函数作用域。
// 在 JavaScript 中，每当函数被创建，就会在函数生成时生成闭包。
for(var i=1;i<=5;i++){
  (function(){
      setTimeout(function(){
          console.log(i);
      },1000);
  })(i);
}
