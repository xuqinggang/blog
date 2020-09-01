// 基础题
// 1、请写出你了解的Array的⽅法(⾄少6个)

// 2、请写出下题的输出结果？
// 考察 eventloop，宏任务\微任务

console.log(1);
setTimeout(() => {
  console.log(2);
});
var p = new Promise((resolve, reject) => {
  console.log(3);
  resolve(4);
});
p.then(rs => {
  console.log(rs);
});
console.log(5);

// 1、3、5、4、2

// 3、下列 console 输出什什么?
var name = "The Window";
var object = {
  name: 'My Object',
  getNameFunc: function () {
    console.log(this.name);
    return function () {
      return this.name;
    };
  }
};
console.log(object.getNameFunc()());

// 'My Object' 'The Window'

// 4、请写出下题打印的值
// 考察，对象引用, 函数传值/引用
let object = { a: 0 };
function fun(obj) {
  obj.a = 1;
  obj = { a: 2 };
  obj.b = 2;
}
fun(object);
console.log(object); // ==> 输出:__________________

// {a:1}

// 5、请写出下题打印的内容(浏览器器环境)
var count = 3;
function fn() {
  console.log(this.count);
}
var User = {
  count: 1,
  getCount: function (fn) {
    fn()
    return this.count;
  }
};
console.log(User.getCount(fn)); // ==> 输出:__________________
// 3, 1
var func = User.getCount;
console.log(func(fn)); // ==> 输出:__________________
// 3, 3

// 非/严格模式
'use strict'
function a() {
  return () => {
    return () => {
      console.log(this)
    }
  }
}
a()()() // ==> 输出:__________________

// 编程题
// 1、求⼆叉树的深度。
/* 示例: 给定⼆叉树 [3, 9, 20, null, null, 15, 7]，返回它的最⼤深度 3。二叉树的结构示意图如下:
 3
/\
9 20
  /\
 15 7
*/
class TreeNode { // 树节点结构
  constructor(val, left = null, right = null) {
    this.val = val;
    this.left = left; // TreeNode 实例
    this.right = right; // TreeNode 实例
  }
  maxDepth(root) {
    if (root == null) {
      return 0;
    } else {
      const leftDepth = this.maxDepth(root.left);
      const rightDepth = this.maxDepth(root.right);

      const childDepth = leftDepth > rightDepth ? leftDepth : rightDepth;
      return 1 + childDepth;
    }
  }
}
const n9 = new TreeNode(9);
const n15 = new TreeNode(15);
const n7 = new TreeNode(7);
const n20 = new TreeNode(20, n15, n7);
const n3 = new TreeNode(3, n9, n20);
n3.maxDepth(n3);
// 扩展, 最小深度
/*
题目二：二叉树的最小深度
给定一个二叉树，找出其最小深度。
最小深度是从根节点到最近叶子节点的最短路径上的节点数量。
说明: 叶子节点是指没有子节点的节点。
示例:
给定二叉树 [3,9,20,null,null,15,7],
    3
   / \
  9  20
    /  \
   15   7
复制代码返回它的最小深度  2.


解题思路：

当root不存在时，返回0，当左右节点不存在时，返回1，当右叶节点不存在时，则此时最短为左叶节点，当左叶节点不存在时，则此时最短为右叶节点，当左右节点都存在时，比较左右节点的值，返回小的值

var minDepth = function(root) {
    if(!root){
        return 0
    }
    if(root.right==null&&root.left==null){
        return 1
    }
    if (root.left&&!root.right){
        return 1+minDepth(root.left);
    }
    if (!root.left&&root.right){
        return 1+minDepth(root.right);
    }
    return 1+Math.min(minDepth(root.left),minDepth(root.right)) //存在两个字节点

};
*/

// 2、使⽤ Javascript 实现⼀一个 LazyMan，可以按照以下⽅式调⽤:

// 考察队列,链式调用

LazyMan("Hank");
// => Hi! This is Hank!
LazyMan("Hank").sleep(10).eat('dinner'); // => Hi! This is Hank!
// 等待10秒
// => Wake up after 10
// => Eat dinner.
LazyMan("Hank").eat('dinner').eat('supper'); // => Hi! This is Hank!
// => Eat dinner.
// => Eat supper.
LazyMan("Hank").sleepFirst(5).eat('supper'); // 等待5秒
// => Hi! This is Hank!
// => Eat supper.

function _LazyMan(name) {
  this.tasks = [];
  var self = this;
  var fn = (function (n) {
    var name = n;
    return function () {
      console.log("Hi! this is " + name + "!");
      self.next();
    }
  })(name);
  this.tasks.push(fn);
  setTimeout(function () {
    console.log('开始启动')
    self.next();
  }, 0);  // 在下一个事件循环启动任务
}
/* 事件调度函数 */
_LazyMan.prototype.next = function () {
  var fn = this.tasks.shift();
  console.log('执行', fn)
  fn && fn();
}
_LazyMan.prototype.eat = function (name) {
  var self = this;
  var fn = (function (name) {
    return function () {
      console.log("Eat " + name + " ~");
      self.next()
    }
  })(name);
  console.log('推进堆栈 eat')
  this.tasks.push(fn);
  return this; // 实现链式调用
}
_LazyMan.prototype.sleep = function (time) {
  var self = this;
  var fn = (function (time) {
    return function () {
      setTimeout(function () {
        console.log("Wake up after " + time + " s!");
        self.next();
      }, time * 1000);
    }
  })(time);
  console.log('推进堆栈 sleep')
  this.tasks.push(fn);
  return this;
}
_LazyMan.prototype.sleepFirst = function (time) {
  var self = this;
  var fn = (function (time) {
    return function () {
      setTimeout(function () {
        console.log("Wake up after " + time + " s!");
        self.next();
      }, time * 1000);
    }
  })(time);
  console.log('推进堆栈 sleepFirst')
  this.tasks.unshift(fn);
  return this;
}
/* 封装 */
function LazyMan(name) {
  return new _LazyMan(name);
}
class _LazyMan_ {
  constructor(name) {
    const func = () => {
      console.log(`Hey ${name}`);
      this.next();
    }
    this.tasks.push(func);
    this.next();
  }
  next() {
    const task = this.tasks.shift();
    task();
  }
  eat(something) {
    const func = () => {
      console.log(`eat ${something}`);
      this.next();
    };
    this.tasks.push(func);
  }
  sleep(time) {
    const func = () => {
      setTimeout(() => {
        console.log(`sleep ${time}s`);
        this.next();
      }, time);
    }
    this.tasks.push(func);
    return this;
  }
  sleepFirst(time) {
    const func = () => {
      setTimeout(() => {
        console.log(`sleepFirst ${time}s`);
        this.next();
      }, time);
    }
    this.tasks.unshift(func);
    return this;
  }
}

// 3、给定⼀个包含红⾊、⽩色和蓝⾊，⼀共 n 个元素的数组， 原地对它们进⾏排序，使得相同颜色的元素相邻，并按照红色、⽩色、蓝⾊顺序排列。我们使⽤整数 0、 1 和 2 分别表示红色、⽩色和蓝色。

// 考察算法思路

// 注意: 不能使⽤代码库中的排序函数(sort、reverse)来解决这道题。
// 示例: 输⼊: [2,0,2,1,1,0] 输出: [0,0,1,1,2,2]
/**
 *
 * @param {number[]} nums
 * @return {void} 不返回任何数据，原地修改nums
 */
var sortColors = function (nums) {
  var i = 0; // 遍历
  var j = nums.length - 1; // 右指针
  var n = 0; // 左指针
  while (i <= j) {
    if (nums[i] === 2) {
      console.log('nums[xx]', nums[i], nums[j]);
      [nums[i], nums[j--]] = [nums[j], nums[i]];
      console.log('nums[]', nums[i], nums[j]);
    } else if (nums[i] === 0) {
      [nums[i++], nums[n++]] = [nums[n], nums[i]];
    } else if (nums[i] === 1) {
      i++;
    }
  }
  return nums;
};
sortColors([2, 0, 2, 1, 1, 0]);


/* 解题思路 用双指针的思想，维护左右指针分别指向数组首尾，对数组从左向右进行遍历：

若遇到0，则与左指针指向元素交换，并将左指针右移一位
若遇到2，则与右指针指向元素交换，并将右指针左移一位，因为交换过来的元素仍可能为2，所以再次对此元素进行判断

class Solution {
public:
    void sortColors(vector<int>& nums) {
        int right = nums.size() - 1, left = 0;
        for(int i = 0; i <= right; i++){
            if(nums[i] == 0)
                swap(nums[i], nums[left++]);
            else if(nums[i] == 2){
                swap(nums[i], nums[right--]);
                i--;
            }
        }
    }
};

如果按 [1, 1, 0, 0, 2, 2] 排序呢
*/