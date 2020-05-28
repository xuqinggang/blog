// function sleep(i, time){
// 	return new Promise((resolve, reject) => {
// 		setTimeout(() => {
// 			console.log(new Date());
//             console.log(i);
//             resolve();
// 		}, time)
// 	})
// }
// async function f(){
//     for(let i = 0; i < 4; i++){
//         await sleep(i, i*1000);
//     };
// }
// f();

// var obj = new Proxy({}, {
//     get: function (target, key, receiver) {
//       console.log(`getting ${key}!`);
//       return Reflect.get(target, key, receiver);
//     },
//     set: function (target, key, value, receiver) {
//       console.log(`setting ${key}!`);
//       return Reflect.set(target, key, value, receiver);
//     }
// });
// obj.hello ='abc';
// console.log(obj.hello);


const node7 = {
  value: 7,
  left: null,
  right: null,
  child:[]
};
const node6 = {
  value: 6,
  left: null,
  right: null,
  child:[]
};
const node5 = {
  value: 5,
  left: null,
  right: null,
  child:[]
};
const node4 = {
  value: 4,
  left: node6,
  right: node7,
  child: [node6, node7]
};
const node3 = {
  value: 3,
  left: node5,
  right: null,
  child:[node5]
};
const node2 = {
  value: 2,
  left: null,
  right: node4,
  child: [node4]
};
const node1 = {
  value: 1,
  left: null,
  right: node3,
  child: [node3]
};
const root = {
  value: 0,
  left: node1,
  right: node2,
  child: [node1, node2]
};

// 先序递归 (根左右)
function callback(node) {
  console.log(node.value);
};
function preTravel(node, callback){
  if(node){
    callback(node);
    preTravel(node.left, callback);
    preTravel(node.right, callback);
  }
}
// preTravel(root, callback);

// 先序非递归
function preTravel1(node, callback){
  let stack = [];
  while(node || stack.length != 0){
    while(node){
      stack.push(node);
      callback(node);
      node = node.left;
    }
    node = stack.pop();
    node = node.right;
  }
}
// preTravel1(root, callback);

// 中序递归（左根右）
function midTravel(node, callback){
  if(node){
    midTravel(node.left, callback);
    callback(node);
    midTravel(node.right, callback);
  }
}
// midTravel(root, callback);

// 中序非递归
function midTravel1(node, callback){
  let stack = [];
  while(node || stack.length!=0){
    while(node){
      stack.push(node);
      node = node.left;
    }
    node = stack.pop();
    callback(node);
    node = node.right;
  }
}
// midTravel1(root, callback);

//后序递归
function postTravel(node, callback){
  if(node){
    postTravel(node.left, callback);
    postTravel(node.right, callback);
    callback(node);
  }
}
// postTravel(root, callback);

//后序非递归（左右根）
function postTravel1(node, callback){
  var stack = [];
    stack.push(node);
    stack.push(node);
    while (stack.length != 0) {
      node = stack.pop();
      if (stack.length != 0 && node == stack[stack.length - 1]) {
        if (node.right) {
          stack.push(node.right);
          stack.push(node.right);
        }
        if (node.left) {
          stack.push(node.left);
          stack.push(node.left);
        }
      } else
        callback(node);
    }
}
// postTravel1(root, callback);

// 广搜（借助队列）
function BFSearch(node, callback){
  let queue = [];
  while(node){
    callback(node);
    if(node.child.length != 0){
      for(let i=0; i<node.child.length; i++){
        queue.push(node.child[i]);
      }
    }
    node = queue.shift(); //先入先出，借助队列
  }
}
// BFSearch(root, callback);

//深搜（借助栈）
function DFSearch(node, callback) {
  let stack = [];
  while(node){
    callback(node);
    if(node.child.length != 0){
      for(let i=node.child.length -1; i>=0; i--){
        stack.push(node.child[i])
      }
    }
    node = stack.pop();
  }
}
// DFSearch(root, callback);
