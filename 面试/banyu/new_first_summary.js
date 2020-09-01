// 基础题
// 1. 输出
console.log(1);
setTimeout(() => {
  console.log(2);
  Promise.resolve().then(data => {
    console.log(3);
  });
});
new Promise((resolve) => {
  resolve()
  console.log(4)
}).then(() => {
  console.log(5);
  setTimeout(() => {
    console.log(6);
  });
}).then(() => console.log(7))
console.log(8);
// 1 4 8 5 7 2 3 6

// 考察 eventloop  宏任务/微任务

// 2. 输出
console.log(fish1, fish2, fish3); // undefined function undefined
var fish1 = function () {
  console.log('welcome to Palfish-1')
}
function fish2() {
  console.log('welcome to Palfish-2')
}
var fish3 = 'welcome to Palfish-3'
var fish1, fish2, fish3;
console.log(fish1, fish2, fish3);

// function function 'welcome to P3'


// 3. 输出

var nickname = "LiLei";

function Person(name) {
  this.nickname = name;

  this.sayHi = function () {
    console.log(this.nickname);

    setTimeout(function () {
      console.log(this.nickname);
    }, 0);
  }
}
var Male = {
  nickname: 'xiaofang',

  sayHi: () => {
    console.log(this.nickname);
  }
}

var person = new (Person.bind(Male, 'XiaoHong'));
person.sayHi();

// XiaoHong LiLei

// 4. 输出
let object = { a: 0 };
function fun(obj) {
  obj.a = 1;
  obj = { a: 2 };
  obj.b = 2;
}
fun(object);
console.log(object); // ==> 输出：___ {a:1}

// 编程题
/*1. 阅读以下代码并完善，实现⼀一个简版计算器器 仅实现⼆二元⽆无符号 浮点 计算即可
请优先实现加运算，其他运算请占位，时间条件允许下可以继续实现 输⼊入 9007199254740992 + 3 输出 9007199254740995
输⼊入 1.234567890123456789 + 1.2 输出 2.434567890123456789
问题1: 请补充代码实现:绑定数字按钮、操作按钮点击事件(即在document上做事件委托) 问题2: 请补充代码实现: calculate 函数，补全计算过程
*/
/*
<!-- html -->
<div class="calc-fraction">
<!-- 第一⾏ --> <!-- 第⼆行 - 第四⾏包含数字4,5,6,7,8,9,0,., 代码暂省略略 -->
  <div class="row">
  <!-- 数字按钮 -->
    <span class="col">1</span><span class="col">2</span><spanclass="col">3</span>
  <!-- 操作按钮 -->
  <span class="col operator">+</span></div>
</div>
*/
/*
https://gitlab.pri.ibanyu.com/front/base/doc/blob/master/interview/src/calc/answer.md

1. dom事件绑定
- event.target/currentTarget 区别
- 区分符号(+-*÷)  numberA operator numberB
  - 接受每个字符, numberA+=val  operator=val  numberB+=val
  operator === '=' 则计算

2. 大数相加
 */



//绑定交互事件
document.addEventListener('click', function (e) {
  /* Code Here 问题1:键盘按钮事件绑定，调⽤用calculate(numberA, numberB, operator) */
})

//! print函数已定义;numberA, numberB, operator 需要从DOM中读取
// 数学计算，其中operator为[+, -, *, ÷, =]中的⼀一种
function calculate(numberA, numberB, operator) {
  let result = ''
  /* Code Here 问题2: 请补充代码实现:`calculate`函数，补全计算过程 */ print(result)
}
/*
2. 找出二叉树中某两个节点的第一个共同祖先，不得将其他的节点存储在另外的数据结构中。
例如，给定如下二叉树: root = [3, 5, 1, 6, 2, 0, 8, null, null, 7, 4]，相应的树型结构为：

    3
  /  \
 5    1
/ \   / \
6  2 0  8
  / \
7   4
示例 1:
输入: root = [3, 5, 1, 6, 2, 0, 8, null, null, 7, 4], p = 5, q = 1
输出: 3
解释: 节点 5 和节点 1 的最近公共祖先是节点 3。

示例 2:
输入: root = [3, 5, 1, 6, 2, 0, 8, null, null, 7, 4], p = 5, q = 4
输出: 5
解释: 节点 5 和节点 4 的最近公共祖先是节点 5。因为根据定义最近公共祖先节点可以为节点本身。

说明:

所有节点的值都是唯一的
p、q 为不同节点且均存在于给定的二叉树中。
*/

/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {TreeNode} root
 * @param {TreeNode} p
 * @param {TreeNode} q
 * @return {TreeNode}
 */
var lowestCommonAncestor = function (root, p, q) {
  // 跳出递归的条件：如果当前节点为空，或者当前结点就是p或者q，返回当前节点
  if (root == null || p == root || q == root) {
    return root;
  }
  // 分别去左右子树里面递归查找各自所在位置
  let left = lowestCommonAncestor(root.left, p, q);
  let right = lowestCommonAncestor(root.right, p, q);

  // 整个树已被遍历完/已找到两个节点，开始判断最近公共祖先结点
  if (left != null) {
    // 如果左子树里存在一个p或者q
    if (right != null) {
      // 如果右子树里存在一个p或者q
      // 那么当前就是公共祖先结点
      return root;
    }
    // 否则这个left就是公共祖先（遍历完了整个树）
    return left;
  }
  // 否则这个right就是公共祖先
  return right;
};
