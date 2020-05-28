/*
二叉树
广度/深度遍历: https://segmentfault.com/a/1190000016226334
 */


// 二叉树数组存储转链表存储
/*
    3
   / \
  9  20
    /  \
   15   7
  const binaryTreeArr = [3,9,20,null,null,15,7]
 */

// https://www.pbeta.me/binary-tree-common-method/
function TreeNode(value) {
  this.value = value;
  this.left = null;
  this.right = null;
}
//转换数组项至节点
function toNode(value) {
  if (value === null || value === undefined) { return null }
  else { return new TreeNode(value) }
}
function arrayToTree(_arr) {
  const arr = _arr.slice();
  let queue = [];
  const treeNode = toNode(arr.shift());
  queue.push(treeNode);//入队列第一个元素
  while (arr.length > 0) {
    //当数组里还有项的时候就拿数组的项去填充队列
    let currentNode = queue.shift();
    currentNode.left = toNode(arr.shift());
    currentNode.right = toNode(arr.shift());
    if (currentNode.left) { queue.push(currentNode.left) }
    if (currentNode.right) { queue.push(currentNode.right) }
  }
  return treeNode;
}
let binaryTreeArr = [3, 9, 20, null, null, 15, 7];
let tree = arrayToTree(binaryTreeArr)

// tree 数(链表)转数组存储
function treeToArray(tree) {
  const arr = [];
  const queue = [];
  queue.push(tree);
  arr.push(tree.value);
  while (queue.length !== 0) {
    let cur = queue.shift();
    if (cur.left) {
      queue.push(cur.left);
      arr.push(cur.left.value);
    } else { arr.push(null); }

    if (cur.right) {
      queue.push(cur.right);
      arr.push(cur.right.value);
    } else { arr.push(null) }
  }

  let index = arr.length - 1;
  while (arr[index] === null) {
    arr.pop();
    index--;
  }

  return arr;
}


/*
先序遍历
 */
// 非递归
// https://juejin.im/post/59e3fde451882578c20858a5
let preorderTraversal = function (root) {
  const stack = [], res = [];
  let cur = root;
  while (cur !== null || stack.length !== 0) {
    while (cur !== null) {
      res.push(cur.value);
      stack.push(cur);
      cur = cur.left;
    }
    cur = stack.pop();
    cur = cur.right;
  }
  return res;
}
// 递归
function preOrder(node) {
  if (node !== null) {
    console.log(node.value);
    preOrder(node.left);
    preOrder(node.right);
  }
}

// 中序遍历
// 递归
function inOrder(node) {
  if (node !== null) {
    inOrder(node.left);
    console.log(node.value);
    inOrder(node.right);
  }
}
// 非递归
function inOrderTraversal(node) {
  let arr = [];
  let cur = node;

  while (cur) {
    stack.push(cur);
    cur = cur.left;
  }

  cur = stack.pop();
  arr.push(cur.value);
  cur = cur.right;


}