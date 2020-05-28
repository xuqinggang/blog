// 改变数组的函数
// 改变原数组的函数：pop、push、reverse、shift、sort、splice
// 不改变原数组的函数：concat、join、slice

// 拍平数组（数组扁平化）
// 法一：
function iterator(arr){
  let newarr = []
  arr.forEach(el => {
    if(el instanceof Array){
      newarr=newarr.concat(iterator(el))
    }else{
      newarr.push(el)
    }
  });
  return newarr
}

// 法二：
arr.flat(Infinity)

// 法三
function ToString(arrays){
  return arrays.toString().split(',').map(item=>{
      return parseInt(item)
   })
}

// 用reduce实现map
Array.prototype._map = function(fn, callbackThis) {
  // 最终返回的新数组
  let res = [];
  // 定义回调函数的执行环境
  // call第一个参数传入null，则 this指向全局对象，同 map的规则
  let CBThis = callbackThis || null;
  this.reduce((before, after, idx, arr) => {
      // 传入map回调函数拥有的参数
      // 把每一项的执行结果push进res中
      res.push(fn.call(CBThis, after, idx, arr));
  }, null);
  return res;
};

// 数组去重
// 法一： 利用 set
function unique(arr) {
  if (!Array.isArray(arr)) {
      console.log('type error!')
      return
  }
  return [...new Set(arr)] // return Array.from(new Set(arr))
}
// 法二： 先排序，在相邻元素去重
function unique(arr) {
  if (!Array.isArray(arr)) {
      console.log('type error!')
      return
  }
  arr = arr.sort()
  let res = []
  for (let i = 0; i < arr.length; i++) {
      if (arr[i] !== arr[i-1]) {
          res.push(arr[i])
      }
  }
  return res
}

/* ================有序数组合并=============== */
function mergeArray(arr1,arr2){
	var ind1=0; //标记arr1的对比元素的初始索引值
	var ind2=0; //标记arr2的对比元素的初始索引值
	var arr=[]; //作为输出的新数组
	while(ind1<arr1.length && ind2<arr2.length){ //当arr1和arr2元素均未全部存入arr中，则从第一个元素开始进行比较，将较小的那个元素存入arr
		if(arr1[ind1]<=arr2[ind2]){
			arr.push(arr1.slice(ind1,ind1+1)[0]); //若arr1的对比元素小于arr2的对比元素，则将arr1的对比元素存入arr中
			ind1++;
		}else{
			arr.push(arr2.slice(ind2,ind2+1)[0]);
			ind2++;
		}
	}
	while(ind1<arr1.length){ //当arr2的元素已全部存入arr中，则直接将arr1剩余的所有元素依次存入arr
		arr.push(arr1.slice(ind1,ind1+1)[0]);
		ind1++;
	}
	while(ind2<arr2.length){ //当arr1的元素已全部存入arr中,则直接将arr2剩余的所有元素依次存入arr
		arr.push(arr2.slice(ind2,ind2+1)[0]);
		ind2++;
	}
	return arr;
}

// 类数组转数组
// 1、slice
var arr = Array.prototype.slice.call(arguments);
var arr = [].slice.call(arguments)
Array.from()
var args = [...arguments];


// 判断是否是数组
Array.isArray()
Object.prototype.toString.call(arg)==='[object Array]'

// 字符串反转
var a = 'abcdef'
console.log(a.split('').reverse().join('')) //fedcba


/* ================原地快排=============== */
var quickSort=function(arr,left,right){

  // 如果左边界比右边界大，返回结果，排序结束
  if(left>right){
    return;
  }

  // 默认值处理，如果有传入left和right参数，就赋值这个参数，否则就赋值后面的默认值
  left=left||0;
  right=right||arr.length-1;

  // 定义移动的左游标和右游标
  var leftPoint=left;
  var rightPoint=right;

  // 定义一个基准数
  var temp=arr[left];

  // 判断左右游标是否重合，如果重合，循环结束
  while(leftPoint!=rightPoint){

    // 基准数在左边，因此从右边开始一个个扫描
    // 从右到左，寻找小于基准数的数，且左游标要小于右游标
    // 如果数字大于基准数（证明不符合条件），寻找下一个
    // 直到找到比基准数小的数，游标停止递减
    while(arr[rightPoint]>=temp&&leftPoint<rightPoint){
      rightPoint--;
    }
    // 从左到右，寻找大于基准数的数，且左游标要小于右游标
    // 如果数字小于基准数（证明不符合条件），寻找下一个
    // 直到找到比基准数小的数，游标停止递增
    while(arr[leftPoint]<=temp&&leftPoint<rightPoint){
      leftPoint++;
    }

    // 如果左游标小于右游标，则交换两个数字的位置
    if(leftPoint<rightPoint){
      var changeNumber=arr[leftPoint];
      arr[leftPoint]=arr[rightPoint];
      arr[rightPoint]=changeNumber;
    }
    // 进行下一次循环，直到两个游标重合位置
  }

  // 重合之后，交换基准数
  arr[left]=arr[leftPoint];
  arr[leftPoint]=temp;

  // 递归操作左右两个数组
  quickSort(arr,left,leftPoint-1);
  quickSort(arr,leftPoint+1,right);

  return arr;
};
