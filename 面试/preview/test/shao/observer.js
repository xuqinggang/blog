// 代理
var a = { x: 1, y: { z: 2 } };
var proxy = new Proxy(a, {
  get: function(target, key) {
    console.log("target", target);
    console.log("key", key);
    console.log("hhh", target[key]);
    return Reflect.get(target, key);
  },
  set: function(target, key, value) {
    console.log("is setting");
    return Reflect.set(target, key, value);
  }
});




function foo() {
  var a = {
    x: 1,
  }
  let prx =  new Proxy(a, {
    get: function(target, key) {
      return target[key]
    },
    set: function(target, key, newValue) {
      console.log(target); // {x: 1}
      console.log(key); // x
      console.log(`you are setting  ${target}.${key}`)
      target[key] = newValue;
      return target[key]
    }
  });
  prx.x = 2;
}

/*************************************** */
function fn() {
  var a = GenIterator.yield(1 + 1);
  var b = GenIterator.yield(a + 3);
  return b;
}

class GenIterator {
  constructor(fn) {
    this.fun = fn;
    this.value = undefined;
    this.done = false;
    this.inst = [];
    this.fun();
  }
  next() {
    const instruction = this.inst.pop();
    this.value = instruction;
    this.done = this.inst.length === 0;
    return {
      value: this.value,
      done: this.done
    };
  }
  static yield(instruction) {
    this.inst.push(instruction);
  }
}

new GenIterator(fn).next();

/*************************************** */
async function asyncWhile(condition, callback, ret) {
  ret = await condition();
  if (ret) {
    return await asyncWhile(condition, callback, ret);
  } else {
    callback();
    return;
  }
}

const pagesize = 10;
async function fun() {
  let x = 1;
  let resData = [];
  let ret = await req(url, {
    data: {
      pageNo: x,
      pagesize
    }
  });
  resData.push(ret);

  await asyncWhile(req, callback, ret); // ...传给req的参数先不写了

  return resData;
}
/*************************************** */
const dishes = [
  { name: "fish", time: 1 },
  { name: "fish1", time: 2 },
  { name: "fish3", time: 3 }
];


// for循环串行异步
async function syncMakeDishes(dishes) {
  for (let i = 0; i < dishes.length; i++) {
    console.log(`开始做第${i}道菜`);
    await new Promise(res => {
      setTimeout(() => {
        res();
        console.log(`第${i}道菜做完了`);
      }, 3 * 1000);
    });
  }
}

/*************************************** */
// promise化的ajax
function ajax(option) {
  const method = (option.method || "POST").toLocaleLowerCase();
  const url = option.url;
  const data = option.data;
  const xhr = new XMLHttpRequest();
  return new Promise((resolve, reject) => {
    xhr.onreadystatechange = function() {
      if (xhr.readyState === 4) {
        if (xhr.status === 200) {
          resolve(xhr.responseText);
        } else {
          reject();
        }
      }
    };
    if (method === "get") {
      const queryUrl =
        url +
        "?" +
        Object.keys(data)
          .map(key => `${key}=${data[key]}`)
          .join("&");
      xhr.open(method, queryUrl);
      xhr.send(null);
    } else {
      xhr.open(methos, url);
      xhr.send(data);
    }
  });
}

ajax({
  url: "/get/name",
  method: "POST",
  data: {
    x: 1
  }
});

// generator

function* fun(x) {
  console.log("x", x);
  const y = yield x + 1;
  console.log("y", y);
  return y;
}
var f = fun(1);
console.log(f);

// generator自动执行
function run(f) {
  const [, ...args] = arguments;
  let it = f(...args); // 拿到迭代器
  res = it.next();
  while (!res.done) {
    res = it.next(res.value);
  }
  return res.value;
}


// 事件订阅发布实现Event

class Event {
  constructor() {
    this.hooks = new Map();
  }
  on(type, callback) {
    const typeHook = this.hooks.get(type) || [];
    typeHook.push(callback);
    this.hooks.set(type, typeHook);
  }
  emit() {
    const [type, ...args] = arguments;
    const typeHook = this.hooks.get(type) || [];
    typeHook.forEach(hook => {
      hook.apply(this, args);
    })
  }
}

var e = new Event();
e.on('spark', function(who) {
  console.log(`${who} are spqrking`);
})
e.emit('spark', 'dog');

