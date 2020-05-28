class Student {
  constructor(name) {
    this.name = name;
  }
  static showName(desc) {
    console.log(desc, this.name);
  }
}

class Book {
  constructor(name) {
    this.name = name;
  }
}

var s = new Student('shx');
var b = new Book('shuxue');
Student.showName.call(b, 'name');
mycall(Student.showName, b, 'name');
function mycall(method, obj) {
  const [,, ...args] = arguments;
  obj[method] = method;
  obj[method](...args);
  delete obj[method];
}
Student.showName.mycall(b, 'name');
Function.prototype.myCall = function (context) {
  var context = context || window
  // 给 context 添加一个属性
  // getValue.call(a, 'yck', '24') => a.fn = getValue
  context.fn = this; // this 是 Student.showName
  // 将 context 后面的参数取出来
  var args = [...arguments].slice(1)
  // getValue.call(a, 'yck', '24') => a.fn('yck', '24')
  var result = context.fn(...args)
  // 删除 fn
  delete context.fn
  return result
}

// Student.showName.bind(b);
Function.prototype.myBind = function (context) {
  if (typeof this !== 'Function') {
    throw new TypeError('type error');
  }
  const [...args] = arguments;
  const _this = this;
  return function() {
    return _this.apply(context, args);
  }
}

///////
function* gen() {
  const a = yield 1;
  console.log(a);
  const b = yield 4 + 1;
  console.log(b)
  return b
}

function co(fn) {
  let it = fn();
  let res = it.next();
  while(!res.done) {
    res = it.next(res.value);
  }
}

/////
function proColor(color, time) {
  return new Promise((res, rej) => {
    setTimeout(() => {
      console.log(color);
      res();
    }, time);
  })
}
async function fun() {
  await proColor('red', 3000);
  await proColor('yellow', 1000);
  await proColor('blue', 1000);
}


var count = 0;
function nextFrame() {
  count ++;
  if (count < 10) {
    const start = Date.now();
    requestAnimationFrame(function() {
      console.log(Date.now() - start);
      nextFrame();
    })
  }
}


function pinghuaScroll() {
  let btn = document.createElement('button');
  btn.innerHTML = '我是按钮'
  document.body.appendChild(btn);
  btn.setAttribute('onclick', function() {
    cancelAnimationFrame(timer);
    timer = requestAnimationFrame(function fn(){
        var oTop = document.body.scrollTop || document.documentElement.scrollTop;
        if(oTop > 0){
            scrollBy(0,-50);
            timer = requestAnimationFrame(fn);
        }else{
            cancelAnimationFrame(timer);
        }    
    });
    // window.requestAnimationFrame(function fn() {
    //   let top = document.body.scrollTop;
    //   if (top > 0) {
    //     document.body.scrollTop = top - 50;
    //   }
    //   window.requestAnimationFrame(fn);
    // });
  })
}


class A {
  constructor(option) {
    this.name = option.name;
  }
  showName() {
    console.log(this.name);
  }
}

var a = new A('shaohuanxia');
var b = {
  name: 'haha',
};
a.showName.call(b); // 'haha'
Function.prototype.mycall = function (obj) {
  const args = [...arguments].slice(1);
  obj.fn = this; // a.showName
  var result = obj.fn(...args);
  delete obj[fn];
  return result;
}





