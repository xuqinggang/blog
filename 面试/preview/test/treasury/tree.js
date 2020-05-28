//     1
//    /\
//   2  3
//  /\  /\
// 4 5 6  7
/* ================遍历二叉树=============== */
// 先序递归，根左右
function preorderTraversal(root) {
	if (!root) {
		return;
	}
	console.log(root.val);
	var left = root.left;
	var right = root.right;
	left && preorderTraversal(left);
	right && preorderTraversal(right);
}
preorderTraversal(node1); //1 2 4 5 3 6 7 
// 先序非递归
function preorderTraversal1(root) {
	if (!root) {
		return;
	}
	var stack = [root];
	while (stack.length > 0) {
		//取第一个。
		var item = stack.shift(); // shift() 方法从数组中删除第一个元素，并返回该元素的值。
		console.log(item.val);
		if (item.right) {
			stack.unshift(item.right); // unshift() 方法将一个或多个元素添加到数组的开头
		}
		if (item.left) {
			stack.unshift(item.left);
		}
	}
}
preorderTraversal1(node1); //1 2 4 5 3 6 7 

// 中序递归，左根右
function inorderTraversal(root) {
	if (!root) {
		return;
	}
	var left = root.left;
	var right = root.right;
	left && inorderTraversal(left);
	console.log(root.val);
	right && inorderTraversal(right);
}
console.log(inorderTraversal(node1)); //4 2 5 1 6 3 7
//中序遍历迭代方式。
function inorderTraversal1(root) {
	if (!root) {
		return;
	}
	var stack = [root];
	while (stack.length > 0) {

		var item = stack[stack.length - 1];

		if (!item.left || (item.left && item.left.isOk)) {
			stack.pop();
			item.isOk = true;
			console.log(item.val);
			item.right && stack.push(item.right);
		} else if (item.left && !item.left.isOk) {
			stack.push(item.left);
		}

	}
}
inorderTraversal1(node1); //4 2 5 1 6 3 7

// 后序递归 左右根
function postorderTraversal(root) {
	if (!root) {
		return;
	}
	var left = root.left;
	var right = root.right;
	left && postorderTraversal(left);
	right && postorderTraversal(right);
	console.log(root.val);
}
postorderTraversal(node1);//4 5 2 6 7 3 1
// 后序遍历迭代实现
function postorderTraversal1(root) {
	if (!root) {
		return;
	}
	var stack = [root];
	while (stack.length > 0) {
		var item = stack[stack.length - 1];
		//满足这些就可以直接输出它了。它是叶子节点。或它的子节点都ok了。
		if ((item.left == null && item.right == null) || (item.left && item.left.isOk && item.right && item.right.isOk) || (item.left && item.left.isOk && item.right == null) || (item.left == null && item.right && item.right.isOk)) {
			item.isOk = true;
			console.log(item.val);
			stack.pop();
		} else if (item.left && !item.left.isOk) {
			//如果左边的没ok，就把左边的入栈
			stack.push(item.left);
		} else if (item.right && !item.right.isOk) {
			//如果右边的没ok就把右边的入栈。
			stack.push(item.right);
		}
	}
}
postorderTraversal1(node1);//4 5 2 6 7 3 1

// 层次遍历
var levelOrder = function(root) {
	if(!root){
		return;
	}
	var checkArr = [root];
	while (checkArr.length > 0) {
		var newCheckArr = [];
		for (var i = 0; i < checkArr.length; i++) {
			var item = checkArr[i];
			console.log(item.val);
			item.left && newCheckArr.push(item.left);	
			item.right && newCheckArr.push(item.right);	
		}
		checkArr = newCheckArr;
	}
};
levelOrder(node1);//1 2 3 4 5 6 7


/* ================判断完全二叉树=============== */
var isCompleteTree = function(root) {
    if(root === null) return true   //如果是空树，也是完全二叉树
    let queue = [root]
    while(queue.length != 0){        //层序遍历
        let p = queue.shift()
        if(p){                //区别正常层序遍历判空左右，不判空左右孩子直接进队列
            queue.push(p.left)
            queue.push(p.right)
        }
        else{                //如果当前结点为空，则将队列剩下元素全部弹出，如果非空，则不是完全二叉树。
            while(queue.length != 0){
                let pson = queue.shift()
                if(pson)
                    return false
            }
        }
    }
    return true        //如果为空，跳出循环并返回是完全二叉树
};

/* ================二叉树深度=============== */
var maxDepth = function(root) {
  if (root === null) {
    return 0;
  } else {
    var leftDepth = maxDepth(root.left),
        rightDepth = maxDepth(root.right);
    var childDepth = leftDepth > rightDepth ? leftDepth : rightDepth;
    return 1 + childDepth;
  }
};

/* ================二叉树左视图=============== */



/* ================链表闭环=============== */
//判断是否有环
// 使用两个指针 ： slow和fast ， slow每次移动一位，fast每次移动两位，当发生以下条件之一时结束，时间复杂度为O(n)。

// 首先一个终止的条件是指针p2遇到NULL节点.这说明不存在闭环
// 另外一个条件式当两个指针相遇就终止,这说明有闭环
// 为什么有环的情况下二者一定会相遇呢？因为fast先进入环，在slow进入之后，如果把slow看作在前面，
// fast在后面每次循环都向slow靠近1，所以一定会相遇，而不会出现fast直接跳过slow的情况。  
bool isLoop(pNode pHead)  
{  
    pNode fast = pHead;  
    pNode slow = pHead;  
    //如果无环，则fast先走到终点  
    //当链表长度为奇数时，fast->Next为空  
    //当链表长度为偶数时，fast为空  
    while( fast != NULL && fast->next != NULL)  
    {  
  
        fast = fast->next->next;  
        slow = slow->next;  
        //如果有环，则fast会超过slow一圈  
        if(fast == slow)  
        {  
            break;  
        }  
    }  
  
    if(fast == NULL || fast->next == NULL  )  
        return false;  
    else
        return true;  
}

// 计算环的长度
// 如果有环两个指针相遇，那么在相遇后让fast不动，slow继续走，
//并开始计数，直到在两个指针重新相遇，这个长度就是环的长度。
int loopLength(pNode pHead)  
{  
    if(isLoop(pHead) == false)  
        return 0;  
    pNode fast = pHead;  
    pNode slow = pHead;  
    int length = 0;  
    bool begin = false;  
    bool agian = false;  
    while( fast != NULL && fast->next != NULL)  
    {  
        fast = fast->next->next;  
        slow = slow->next;  
        //超两圈后停止计数，挑出循环  
        if(fast == slow && agian == true)  
            break;  
        //超一圈后开始计数  
        if(fast == slow && agian == false)  
        {             
            begin = true;  
            agian = true;  
        }  
  
        //计数  
        if(begin == true)  
            ++length;  
          
    }  
    return length;  
}