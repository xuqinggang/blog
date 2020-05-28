
//从小到大 arr = [12,34,65,67,4,78,12,0] 时间复杂度为O(nlogn)
function quickSort(arr, left, right) {
  let i=left;
  let j=right;
  if (left>right) return;
  const tmp = arr[left];
  while(i!==j) {
    while(arr[i] <= tmp && i<j) i++;
    while(arr[j] >= tmp && i<j) j--;
    if (i<j) {
      let t = arr[i];
      arr[i] = arr[j];
      arr[j] = t;
    } 
  }
  arr[left] = arr[i];
  arr[i] = tmp;
  console.log(i);
  quickSort(arr, left, i-1);
  quickSort(arr, i+1, right);
}

//归并排序 时间复杂度为 O(nlogn)
// 融合两个有序数组，这里实际上是将数组 arr 分为两个数组
function mergeArray(arr, first, mid, last, temp) {
  let i = first; 
  let m = mid;
  let j = mid+1;
  let n = last;
  let k = 0;
  while(i<=m && j<=n) {
    if(arr[i] < arr[j]) {
      temp[k++] = arr[i++];
    } else {
      temp[k++] = arr[j++];
    }
  }
  while(i<=m) {
    temp[k++] = arr[i++];
  }
  while(j<=n) {
    temp[k++] = arr[j++];
  } 
  for(let l=0; l<k; l++) {
    arr[first+l] = temp[l];
  }
  return arr;
}
// 递归实现归并排序
function mergeSort(arr, first, last, temp) {
  if(first<last) {
    let mid = Math.floor((first+last)/2);
    mergeSort(arr, first, mid, temp);    // 左子数组有序
    mergeSort(arr, mid+1, last, temp);   // 右子数组有序
    arr = mergeArray(arr, first, mid, last, temp);  
  }
  return arr;
}

// example
let arr = [10, 3, 1, 5, 11, 2, 0, 6, 3];
let temp = new Array();
let SortedArr = mergeSort(arr, 0 ,arr.length-1, temp);
alert(SortedArr);



/////////////////
// <ul> <li className='m'>haha</li> <li>laa</li>  </ul>
// <ul> <li>dididi</li> <li>laa</li>  </ul>
class Element {
  constructor(tagName, props, children) {
    this.tagName = tagName;
    this.props = props;
    this.children = children;
  }
  render() {
    const el = document.createElement(this.tagName);
    Object.keys(this.props).forEach(prop => {
      el.setAttribute(prop, this.props[prop]);
    });
    (this.children || []).forEach(child => {
      let cel;
      if (child instanceof Element) {
        cel = child.render()
      } else {
        cel = document.createTextNode(child);
      }
      el.appendChild(cel)
    })
    return el;
  }
}

new Element('ul', null, [
  new Element('li', {
    className: 'm',
  }, ['haha']),
  new Element('li', null, ['laa'])
])

const type = {
  replace: 1,
  reorder: 2,
  props: 3,
  text: 4,
}

function diff(oldTree, newTree) {
  const index = 0;
  const patches = {}; // diff的结果
  diffWalk(oldTree, newTree, index, patches);
  return patches;
}

function diffWalk(oldNode, newNode, index, patches) {
  const currentPatch = [];
  if (typeof oldNode === 'string' && typeof newNode === 'string' && oldNode !== newNode) {
    currentPatch.push({
      type: 'text',
      content: newNode,
    })
  } else if(oldNode.tagName === newNode.tagName && oldNode.key === newNode.key) {
    const propPatch = diffProp(oldNode, newNode);
    if (propPatch) {
      currentPatch.push({
        type: 'props',
        props: propPatch
      })
    }
    diffChildren(oldNode.children, newNode.children, index, patches, currentPatch)
  } else {
    currentPatch.push({
      type: 'replace',
      node: newNode
    })
  }
  currentPatch.lenth > 0 && (patches[index] = currentPatch);
}

function diffChildren(oldChildren, newChildren, index, patches, currentPatch) {
  var diffs = listDiff(oldChildren, newChildren, 'key')
  newChildren = diffs.children

  if (diffs.moves.length) {
    var reorderPatch = { type: patch.REORDER, moves: diffs.moves }
    currentPatch.push(reorderPatch)
  }

  var leftNode = null
  var currentNodeIndex = index;
  oldChildren.forEach((oldChild, i) => {
    var newChild = newChildren[i]
    currentNodeIndex = (leftNode && leftNode.count)
      ? currentNodeIndex + leftNode.count + 1
      : currentNodeIndex + 1
    dfsWalk(oldChild, newChild, currentNodeIndex, patches)
    leftNode = oldChild
  })
}
////////////// generator函数在yield的时候返回
function* getName() {
  console.log(111);
  yield 'hahah';
  console.log(222);
}
getName() // return 一个迭代器 有next 属性
getName().next() // 返回的{value: xxx, done: false}


function generator() {

}

function throttle() {

}

function debounce() {

}

function compose() {

}

function redux() {

}


function addPackage(obj, el) {
  Object.keys(obj).forEach(key => {
    const tr = document.createElement('tr');
    tr.innerHTML = `<td><p><span>${key}</span></p></td><td><p><span>${obj[key]}</span></p></td>`
    el.appendChild(tr)
  })
}