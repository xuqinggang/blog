// react hook 优势

// hoc


// 微服务介绍

// 组件库按需加载原理
// [](https://juejin.im/post/5dd60b53f265da47d67c215e)

// TS 泛型概念

// TS 给 React 扩展属性/方法

// 不固定宽高，自适应，水平垂直居中

// 如何判断链表有环
function Node(value) {
  this.value = value;
  this.next = null;
}

class List {
  head = null;

  append(value) {
    const node = new Node(value);
    if (head === null) {
      head = node;
      return;
    }
    let current = head;
    while (current.next) {
      current = current.next;
    }
    current.next = node;
  }

  insert(position, value) {
    if (position >= 0) {
      const node = new Node(value);
      if (position === 0) {
        node.next = head;
        head = node;
        return;
      }
      let index = 0;
      let current = head;
      let previous = null;
      while (index < position) {
        previous = current;
        current = current.next;
        index++;
      }
      previous.next = node;
      node.next = current;
    }

  }

  judgeIsCircly() {
    let current = head;
    let slow = head;
    let fast = head;
    while (current.next) {
      slow = current.next;
      head = current.next.next;
      if (slow === head) {
        return true;
      }
      current = current.next;
    }
    return false;
  }
}

// redux middleware
function thunkMiddleware({ dispatch, getState }) {
  return next =>
    action => {
      return typeof action === 'function' ?
        action(dispatch, getState)
        : next(action)
    }
}
function dispatch1(next) {
  console.log('dispatch1', next)
  return action => {
    console.log('dispatch1');
    next(action);
  }
}
function dispatch2(next) {
  console.log('dispatch2', next);
  return action => {
    console.log('dispatch2');
    next(action);
  }
}
function dispatch(action) {
  console.log('dispatch', action);
}
function compose(...funcs) {
  return (...args) => {
    return funcs.reduce((a, b) => {
      return a(b(...args))
    });
  }
}
let newDispatch = compose(dispatch1, dispatch2)(dispatch);
newDispatch('test111222');