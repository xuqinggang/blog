function Tree() {
    // 定义树结点
    var Node = function(element) {
       this.element = element;
       this.left = null;
       this.right = null;
    }
    // 定义根结点
    var root = null;
 }

 // (递归)前序遍历 根左右 
Tree.prototype.preOrderTraverse = function(callback) {
    preOrder(root, callback);
  }

  var preOrder = function(node, callback) {
    if (node !== null) {
      callback(node.element);
      preOrder(node.left, callback);
      preOrder(node.right, callback);
    }
  } 
  
// DOM的前序遍历 递归方法
var preOrder = function(node,callback) {  
    callback(node);  
    if(node.firstElementChild) {//先判断子元素节点是否存在  
         this.preOrder(node.firstElementChild,callback);  
    }  
    if(node.lastElementChild) {  
        this.preOrder(node.lastElementChild,callback);  
    }  
};

// DOM的前序遍历 非递归方法 借助于栈
Tree.prototype.preOrder = function(node,callback) {  
    var stack=[];  
    while(node!== null || stack.length!=0){  
        while(node!==null){  
            stack.push(node);  
            callback(node);  
            node=node.firstElementChild;  
        }  
        node=stack.pop();  
        node=node.lastElementChild;  
    }  
};

// DOM中序遍历 左根右 非递归方法
Tree.prototype.inOrder = function(node,callback) {  
    var stack=[];  
    while(node!== null || stack.length!=0){  
        while(node!==null){  
            stack.push(node);  
            node=node.firstElementChild;  
        }  
        node=stack.pop();  
        callback(node);  
        node=node.lastElementChild;  
    }  
};  

// 多叉树的遍历，广度优先遍历
// 层序遍历，借助队列，非递归方式
Tree.prototype.BFSearch = function(node, callback) {
    var queue = [];
    while (node != null) {
      callback(node);
      if (node.children.length != 0) {
        for (var i = 0; i < node.children.length; i++) {
          queue.push(node.children[i]); //借助于队列,暂存当前节点的所有子节点  
        }
      }
      node = queue.shift(); //先入先出，借助于数据结构：队列  
    }
  };

  // 多叉树的遍历，深度优先遍历
// 借助栈，首先遍历根节点，然后沿着一条路径遍历到最深的一层，最后在逐层返回
Tree.prototype.DFSearch = function(node, callback) {
    var stack = [];
    while (node != null) {
      callback(node);
      if (node.children.length != 0) {
        for (var i = node.children.length - 1; i >= 0; i--) { //按照相反的子节点顺序压入栈  
          stack.push(node.children[i]); //将该节点的所有子节点压入栈  
        }
      }
      node = stack.pop(); //弹出栈的子节点顺序就是原来的正确顺序(因为栈是先入后出的)        
    }
  };

//   前序+中序:
// 思路：通过前序获得根节点的位置，利用根节点将中序序列分为左子树和右子树，然后不断的递归划分即可。
/**
     * 根据前序和中序排序表获取树
     */
    private static Node buildTreeByPreMid(char[] pre, int preBegin, int preEnd, char[] mid, int midBegin, int midEnd) {
        Node root = new Node();
        root.setName(pre[preBegin] + "");

        int midRootLoc = 0;
        for (int i = midBegin; i <= midEnd; i++) {
            if (mid[i] == pre[preBegin]) {
                midRootLoc = i;
                break;
            }
        }

        //递归得到左子树
        if (preBegin + (midRootLoc - midBegin) >= preBegin + 1 && (midRootLoc - 1) >= midBegin) {
            Node leftChild = buildTreeByPreMid(pre, preBegin + 1, preBegin + (midRootLoc - midBegin),
                    mid, midBegin, midRootLoc - 1);
            root.leftChild = leftChild;
        }

        //递归得到右子树
        if (preEnd >= (preEnd - (midEnd - midRootLoc) + 1) && (midEnd >= midRootLoc + 1)) {
            Node rightChild = buildTreeByPreMid(pre, preEnd - (midEnd - midRootLoc) + 1, preEnd,
                    mid, midRootLoc + 1, midEnd);
            root.rightChild = rightChild;
        }

        return root;
    }