// 合并区间

// 输入: [[1,3],[2,6],[8,10],[15,18]]
// 输出: [[1,6],[8,10],[15,18]]
// 解释: 区间 [1,3] 和 [2,6] 重叠, 将它们合并为 [1,6].
/**
 * Definition for an interval.
 * public class Interval {
 *     int start;
 *     int end;
 *     Interval() { start = 0; end = 0; }
 *     Interval(int s, int e) { start = s; end = e; }
 * }
 */

// [1,2,8,15];
// [3,6,10,18];
// class Solution {
//     public List<Interval> merge(List<Interval> intervals) {
//         int n=intervals.size();
//         int[] starts=new int[n];
//         int[] ends=new int[n];
//         for(int i=0;i<n;i++){
//             starts[i]=intervals.get(i).start;
//             ends[i]=intervals.get(i).end;
//         }
//         Arrays.sort(starts);
//         Arrays.sort(ends);
//         List<Interval> res=new ArrayList<Interval>();
//         for(int i=0,j=0;i<n;i++){
//             if(i==n-1||starts[i+1]>ends[i]){
//                 res.add(new Interval(starts[j],ends[i]));
//                 j=i+1;
//             }
//         }
//         return res;
//     }
//   }
// }

var arr = [[1,3],[8,10],[2,6],[15,18]];
var brr = [[1, 10], [15, 18]];
function mergeQujian(arr) {
  const start = [];
  const end = [];
  const res = [];
  const len = arr.length;
  arr.forEach(item => {
    start.push(item[0]);
    end.push(item[1]);
  });
  start.sort((x,y) => x-y); // [1,2,8,15]
  end.sort((x,y) => x-y); //   [3,6,10,18]

  for(let i=0; i<len; i++) {
    j=i+1;
    while(start[j] < end[i]) {
      j++;
    }
    if (i==len-1 || start[j] > end[i]) {
      res.push([start[i], end[j]]);
    }
  }
  return res;
}


// 最长子序列之和
const arr = [-2, 11, -4, 13, -5, -2];

function getMaxSum(arr) {
  let sum = 0;
  let max = 0;
  for (let i=0; i<arr.length; i++) {
    sum += arr[i];
    if (sum > max) {
      max = sum;
    } 
    if (sum < 0) {
      sum = 0;
    }
  }
  console.log(max);
  return max;
}
 
const obj = {
  x: 1
}

/******************** 查找两个串的最长回文 ********************/
//'google' => 'elgoog'
// 'abcshugcba' => 'abcguhscba'
// 'g#o#o#g#l#e'
    g o o g l e
 e  0 0 0 0 0 1
 l  0 0 0 0 1 0
 g  1 0 0 1 0 0
 o  0 1 1 0 0 0
 o  0 1 1 0 1 0
 g  1 0 0 1 0 0
 var str = 'google'
function findMaxCallback(str) {
  if (str.length === 1) return str;
  if (str.length === 2 && str[0] === str[1]) return str;
  let isCallback = []; // isCallback[i][j] 用来记录从下标i到下标j是不是回文
  let beginIndex = 0;
  let lastIndex = 0;
  let maxLen = 0;
  for(let i=0; i<str.length; i++) {
    isCallback[i] = [];
    for (let j=0; j<str.length; j++) {
      isCallback[i][j] = false;  
    }
  }
  for(let i=0; i<str.length; i++) {
    let j = i;
    while (j > 0) {
      if (str[i] === str[j] && ( i-j < 2 ||  isCallback[j+1][i-1]) ) {
        isCallback[j][i] = true;
        if (maxLen < i-j+1) {
          beginIndex = j;
          lastIndex = i;
          maxLen = i-j+1;
        }
      }
      j--;
    }
  }
  console.log(str.slice(beginIndex, lastIndex));
  return str.slice(beginIndex, lastIndex);
}
findMaxCallback(str)



public String longestPalindrome(String s) {
  //  长度为1，返回当前串
  if (s.length()==1){
      return s;
  }
  //长度为2并且两个字符相等则返回
  if (s.length()==2&&s.charAt(0)==s.charAt(1)){
      return s;
  }
  //用于标记isLongestPalindrome[j][i]即从j到i是否是回文串；
  //如isLongestPalindrome[1][5]＝＝true则表示字符串索引位置从1到5的子串是回文串。
  boolean[][] isLongestPalindrome = new boolean[s.length()][s.length()];
  //最长回文串初始最大为0
  int maxlen = 0;
  //对应的maxlen的开始索引位置
  int beginIndex = 0;
  //对应的maxlen的结束索引位置
  int lastIndex = 0;
  for (int i=0;i<s.length();i++){
      int j=i;
      while(j>=0){
          //满足上述的第三个条件，即当前s.charAt(i)==s.charAt(j)并
          //且s[j＋1到i－1]也是回文串
          if (s.charAt(i)==s.charAt(j)&&(i-j<2||isLongestPalindrome[j+1][i-1])){
              isLongestPalindrome[j][i]=true;
              if (maxlen < i-j+1) {
                  beginIndex = j;
                  lastIndex = i+1;
                  maxlen = i-j+1;
              }
          }
          j--;
      }
  }

  return s.substring(beginIndex,lastIndex);
}


// atob

// atoi
function atoi() {

}

// 整数相加   12 + 29
function add (num1, num2) {
  var arr1 = ('' + num1).split('').reverse(); // [2,1, 0]
  var arr2 = ('' + num2).split('').reverse(); // [9, 2, 1]
  let len1 = arr1.length;
  let len2 = arr2.length;
  
  if (len1 < len2) {
    for (let i=len1; i<len2; i++) {
      arr1[i] = 0;
    }
  }
  if (len2 < len1) {
    for (let i=len2; i<len1; i++) {
      arr2[i] = 0;
    }
  }

  var arr3 = new Array(arr1.length + 1);

  let isFull = false;
  for (let i=0; i<arr1.length; i++) {
    let sum;
    if (!isFull) {
      sum = +arr1[i] + +arr2[i]
    } else {
      sum = +arr1[i] + +arr2[i] + 1;
    }
    if (i===arr1.length && sum >= 10) {
      arr3[arr1.length] = 1;
    }
    if (sum >= 10) {
      arr3[i] = sum - 10;
      isFull = true;
    } else {
      arr3[i] = sum;
      isFull = false;
    }
  }
  return arr3.reverse().join('');
}

// 找出两个已排好序的数组的中位数
// 时间复杂度O(n)
function findMedianSortedArrays (nums1, nums2) {
  // 合并数组，返回有序数组
  var s = merge(nums1, nums2);

  var len = s.length;

  // 根据数组长度求中位数
  if (len & 1) return s[~~(len / 2)];
  else return (s[len / 2 - 1] + s[len / 2]) / 2;
};

function merge(left, right) {
  var tmp = [];

  while (left.length && right.length) {
    if (left[0] < right[0])
      tmp.push(left.shift());
    else
      tmp.push(right.shift());
  }

  return tmp.concat(left, right);
}



/*************************最长公共子序列*************** */
// LCS str1='ABCBDAB'  str2='BDCABA'  => 'BCBA'
// 时间复杂度 ???
function getMaxChild(str1, str2, m, n) {
  if (m===-1 || n=== -1) {
    return 0;
  }
  if (str1[m] === str2[n]) {
    return getMaxChild(str1, str2, m-1, n-1) + 1;
  } else {
    return Math.max(getMaxChild(str1, str2, m, n-1), getMaxChild(str1, str2, m-1, n));
  }
}

getMaxChild(str1, str2, str1.length-1, str2.length-1)

var str1 = 'BDCABA';
var str2 = 'ABCBDAB';


public class LCS {

  public static int[][] lengthofLCS(char[] X, char[] Y){
      /* 构造二维数组c[][]记录X[i]和Y[j]的LCS长度 (i,j)是前缀
       * c[i][j]=0; 当 i = j = 0;
       * c[i][j]=c[i-1][j-1]+1; 当 i = j > 0; Xi == Y[i]
       * c[i][j]=max(c[i-1][j],c[i][j+1]); 当 i = j > 0; Xi != Y[i]
       * 需要计算 m*n 个子问题的长度 即 任意c[i][j]的长度
       * -- 填表过程
       */
      int[][]c = new int[X.length+1][Y.length+1];

      // 动态规划计算所有子问题
      for(int i=1;i<=X.length;i++){
          for (int j=1;j<=Y.length;j++){
              if(X[i-1]==Y[j-1]){
                  c[i][j] = c[i-1][j-1]+1;
              }
              else if(c[i-1][j] >= c[i][j-1]){
                  c[i][j] = c[i-1][j];
              }
              else{
                  c[i][j] = c[i][j-1];
              }
          }
      }

      // 打印C数组
      for(int i=0;i<=X.length;i++){
          for (int j=0;j<=Y.length;j++){
              System.out.print(c[i][j]+" ");
          }
          System.out.println();
      }
      return c;
  }
  // 输出LCS序列
  public static void print(int[][] arr, char[] X, char[] Y, int i, int j) {
      if(i == 0 || j == 0)
          return;
      if(X[i-1] == Y[j-1]) {
          System.out.print("element " + X[i-1] + " ");
          // 寻找的
          print(arr, X, Y, i-1, j-1);
      }else if(arr[i-1][j] >= arr[i][j-1]) {
          print(arr, X, Y, i-1, j);
      }else{
          print(arr, X, Y, i, j-1);
      }
  }
  public static void main(String[] args) {
      // TODO Auto-generated method stub
      char[] x ={'A','B','C','B','D','A','B'}; 
      char[] y ={'B','D','C','A','B','A'}; 
      int[][] c = lengthofLCS(x,y);
      print(c, x, y, x.length, y.length);
  }
}



function lcs(str1, str2) {
  let m = str1.length-1;
  let n = str2.length-1;
  var arrLen = []; // count矩阵
  var arrDirection = []; // direction矩阵  利用子问题的值
  for (let i=0; i<m; i++) { // 初始化矩阵
    arrLen[i] = [];
    arrDirection[i] = [];
    for (let j=0; j<n; j++) {
      arrLen[i][j] = 0; 
      arrDirection[i][j] = '-';
    }
  }

  for (let i=0; i<str1.length; i++) {
    for(let j=0; j<str2.length; j++) {
      if (str1[i] === str2[j]) {
        arrLen[i][j] = 1;
        arrDirection[i][j] = '↖️';
      } else {
        if (i > 0) {
          
        }
      }
    }
  }

}


//如对于num=[1,2,3,2]来说，dict={3:[(0,1),(0,3)], 4:[(0,2),(1,3)], 5:[(1,2),(2,3)]}。这样就可以检查target-key这个值在不在dict的key值中，如果target-key在dict中并且下标符合要求，那么就找到了这样的一组解。

// 由于需要去重，这里选用set()类型的数据结构，即无序无重复元素集。最后将每个找出来的解(set()类型)转换成list类型输出即可




// flat深层嵌套的数组
([1,2,[3, [4,5]]] + '').split(',');



/*** 找出两个数组的中位数 ****/

[12,24] [8, 9] // (2 + 1) / 2
[8,9,12,24] // (2 + 2) / 2   (2+2)/2 -1
// 下面代码有问题 死循环了
function findMid(arr, brr) {
  let i=0, j=0;
  arr.sort();
  brr.sort();
  let res = [];
  let count =0;
  const lenSum = arr.length + brr.length;
  while(count <= lenSum/ 2 && i < arr.length && j < brr.length) {
    while(arr[i] < brr[j]) {
      res.push(arr[i++]);
      count ++;
    }
    while(arr[i] > brr[j]) {
      res.push(arr[j++]);
      count ++;
    }
  }
  if (lenSum % 2 === 0) {
    return [res[res.length-1], res[res.length]]
  } else {
    return res[res.length];
  }
}
// 利用折半查找的思想，假设两个数组的中位数分别是vec1[m1], vec2[m2]   
// 1、如果vec1[m1] = vec2[m2] ，那么刚好有一半元素不超过vec1[m1]，则vec1[m1]就是要找的中位数。
// 2、如果vec1[m1] < vec2[m2] 
// 根据结论1很容易可以推理出，这个中位数只可能出现在vec1[n1/2,…,n1-1]或vec2[0,…,(n2-1)/2]中，
// 那么vec1[n1/2,…,n1-1]和vec2[0,…,(n2-1)/2]的中位数是不是和原来两个数组的中位数相同呢？根据结论2，如果原数组长度相等，即n1=n2，那么中位数不变；如果长度不相等，vec2中去掉的大于中位数的数的个数 > vec1中去掉的小于中位数的数的个数 ，则中位数不一定不变。因此我们要在两个数组中去掉相同个数的元素。如下图所示，假设n1 < n2, 两个数组都去掉n1/2个元素，则子数组vec1[n1/2,…,n1-1]和vec2[0,…,n2-1-n1/2]的中位数和原来的中位数相同，图中红色方框里是去掉的元素。
// 注意：在n1<n2的假设下，不管我们是求上中位数还是下中位数，我们每次去掉的元素都是n1/2（整数除法）个。例如vec1 = [1,3,5,7],vec2 = [2,4,6,8], 如果我们要求的是上中位数，m1 = m2 =1，即3 < 4, 要删掉vec1的前半段，这里vec1[m1] = 3 要不要删除呢，我们只要判断一下3能否可能成为中位数，假设3是中位数，不超过3的数只有3个（1,2,3），总得元素有8个，因此3不可能成为上中位数，我们可以在vec1中删除2两个元素。如果是求下中位数，即m1 = m2 = 2，即5 < 6,删除vec1前半段时要不要删除5呢？注意到比不超过5的数有5个，不低于5的数有4个，因此5有可能成为下中位数，因此5不能删除，vec1中只能删除左边两个元素。同理当vec1的个数是奇数时，vec1的中位数永远不能删除，即只能删除vec1的n1/2（整数除法）个元素




// 有N件物品和一个容量为V的背包。第i件物品的费用是c[i]，价值是w[i]。求解将哪些物品装入背包可使价值总和最大。
main(){
	
	var v = 10;  // 重量
	var n = 5;  // 数量  
 	var valueArr = [0, 8 , 10 , 4 , 5 , 5]; // 物品价值
  var weightArr= [0, 6 , 4 , 2 , 4 , 3]; // 物品重量
  
	int i,j;
	int dp[n+1][v+1];
	for(i = 0; i < n+1; i++)
		for(j = 0; j < v+1; j++)
			dp[i][j] = 0;
 
	for(i = 1; i <= n; i++){ // 物品数量
		for(j = 1; j <= v; j++){ // 背包容量
			if(j >= weight[i])  // 每个物品
				dp[i][j] = max(dp[i-1][j],dp[i-1][j-weight[i]] + value[i]);
			else
				dp[i][j] = dp[i-1][j];
		}
	}
 
	printf("%d",dp[n][v]);
}


// 最长公共子序列

// 最长递增子序列

// 最长公共子串

// 对称字符串的最大长度



// 查找最长连续数列 要求时间复杂度O(n)
[100, 4, 200, 1, 3, 2] => [1,2,3,4]

function getLogLianxuQueue(arr) {
  for
}

class Solution {
  public:
        int longestConsecutive(const vector<int> &nums) {
            unordered_map<int, bool> used;
            for (auto i : nums) used[i] = false;
            int longest = 0;
            for (auto i : nums) {
                if (used[i]) continue;
                int length = 1;
                used[i] = true;
                for (int j = i + 1; used.find(j) != used.end(); ++j) {
                    used[j] = true;
                    ++length; 
}          
                for (int j = i - 1; used.find(j) != used.end(); --j) {
                    used[j] = true;
  ++length; }
                longest = max(longest, length);
            }
            return longest;
        }
  };


/** 最长递增子序列 */

public int lengthOfLIS(int[] nums) {
  if(nums==null||nums.length==0)
      return 0;
  int[] h=new int[nums.length];
  h[0]=nums[0];
  int max=0;//最长子序列最右边的位置
  for(int i=1;i<nums.length;i++){
      if(nums[i]>h[max]){
          h[++max]=nums[i];
          continue;
      }
      else{
          int pos=findFirstBigger(h,0,max,nums[i]);
          h[pos]=nums[i];
      }
  }
  return max+1;
}
public int findFirstBigger(int[] h,int left,int right,int target){
  if(left==right)
      return left;
  int mid=(left+right)/2;
  if(h[mid]<target)
      return findFirstBigger(h,mid+1,right,target);
  else
      return findFirstBigger(h,left,mid,target);
}




public static int LongestSubString(int arr[])
    {
        int len=0;
        if(arr==null||arr.length==0)
            return 0;
        int dp[]=new int[arr.length];
        dp[0]=1;
        //dp[i] 表示到i为止是最长递增子序列的长度
        for(int i=1;i<arr.length;i++)
        {
            dp[i]=1;
            for(int j=0;j<i;j++)
            {
                if(arr[i]>arr[j])
                {
                //求dp[i]时遍历，dp[0...i-1],找出arr[j]<arr[i]小且dp[j]是最大的
                //dp[i]=dp[j]+1;
                    dp[i]=Math.max(dp[i],dp[j]+1);
                }
            }
        }
        for(int i=0;i<arr.length;i++)
        {
            len=Math.max(dp[i],len);
        }
     return len;

    //最优值，求出dp[i]之后要求出递增子序列[10,22,33,41,60,80]
    //先找到最大dp[i]，从后往前，如果dp[i]==dp[j]+1,且arr[i]>arr[j]，则可知arr[j]是子序列中
    //arr[i]前面的数.

    public  generateLIS(int arr[],int dp[])
    {
        int k=0;
        int index=0;
        int len=0;
        for(int i=0;i<arr.length;i++)
        {
            if(dp[i]>len)
            {
                len=dp[i];
                index=i;
                //找到递增子序列中的最后一个元素[10,22,33,41,60,80]中的80，
            }
        }
        int subArr[]=new int[len];
        subArr[k++]=arr[index]; 
        for(int j=index-1;j>=0;j--)
        {
            if((dp[index]==dp[j]+1)&&(arr[index]>arr[j]))
            {
                //从后向前,将属于递增子序列的元素加入到subArr中。
                subArr[k++]=arr[j];
                index=j;
            }
        }
        for(int j=subArr.length-1;j>=0;j--)
        {
            System.out.print(subArr[j]+" ");
        }

    }
}


/*******************   ksum 2sum ********************** */
// 2sum
// Input: numbers=[2, 7, 11, 15], target=9
// Output: index1=0, index2=1
// 两种方法：1.双指针  2.hashmap
// 12 34 45 7 43  ==> 90 找到数组中和为90的两个数
// 排好序 7 12 34 43 45  然后双指针分别指向开头和末尾

function twosum(arr, target) {
  arr.sort();
  let i=0, j=arr.length-1;
  while(i<=j) {
    if (arr[i] + arr[j] > target) {
      j--;
    } else if (arr[i] + arr[j] < target) {
      i++;
    } else {
      return [arr[i], arr[j]];
    }
  }
  return null
}

function twosum(arr, target) {
  var m = new Map();
  let res = [];
  for (let i=0; i<arr.length; i++) {
    m.set(arr[i], true);
  }
  for (let i=0; i<arr.length; i++) {
    if (m.get(target-arr[i])) {
      res.push([arr[i], target-arr[i]]); 
    }
  }
  return res;
}
var arr = [7,12,34,43,45];
twosum(arr, 19);

// 3sum
threesum(arr, 62) 7, 12, 43

function threeSum(arr, target) {
  let res = [];
  if (arr.length < 3) return res;
  arr.sort();
  for (let i=0; i<arr.length-2; i++) {
    let j = i+1;
    let k = arr.length - 1;
    if (i>1 && arr[i] === arr[i-1]) continue; 
    while(j< k) {
      if (arr[i] + arr[j] + arr[k] < target) {
        ++j;
        while (arr[j] === arr[j-1] && j<k) {
          ++j;
        }
      } else if(arr[i] + arr[j] + arr[k] > target) {
        --k;
        while (arr[k] === arr[k+1] && j<k) {
          --k;
        }
      } else {
        res.push(arr[i], arr[j], arr[k]);
        ++j;
        --k;
      }
    }
  }
  return res;
}

// LeetCode, 3SumCloest
function threeSumCloest(arr, target) {
  let minGap = MAX_SAFE_INTEGET;
  let result = 0;
  arr.sort();
  for (let i=0; i<arr.length; i++) {
    let j = i+1;
    let k = arr.length - 1;
    while (j < k) {
      const sum = arr[i] + arr[j] + arr[k];
      const gap = Math.abs(sum - target);
      if (gap < minGap) {
        result = sum;
        minGap = gap;
      }
      if (sum < target) {
        ++j
      } else {
        --k;
      }
    }
  }
  return result;
}


/**** */

/****************  数组去重 **************/
// 时间复杂度较高 O(n^2)
var array = [3, '1', 4, 1, 1, '1', 3];
function unique(arr) {
  const res = [];
  for (let i=0; i< array.length; i++) {
    if (res.indexOf(array[i]) === -1) { // indexOf又有一层循环
      res.push(array[i])
    }
  }
  return res;
}

function uniqueV2(arr) {
  const sortedarr = Array.from(arr).sort(); // 先排序
  const res = [];
  for (let i=0; i<sortedarr.length; i++) {
    if (i===0 || seen !== sortedarr[i]) {
      res.push(sortedarr[i]);
      seen = sortedarr[i];
    }
  }
  return res;
}


//去重 数组元素出现次数大于2的元素 [1,3,3,2,3] => [1,3,3,2] [1,2,3,3,3] 或者用map
function limitCountEle(arr) {
  if (arr.length <= 2) return arr;
  const res = [];
  arr.sort(); // sort 会改变原数组
  res.push(arr[0],arr[1]);
  for (let i=2; i<arr.length; i++) {
    if (arr[i] !== arr[i-2]) {
      res.push(arr[i]);
    }
  }
  return res;
}


/************* 全排列  ********/ 
// 到n = 3时可以看出全排列有以下规律
// 固定第一个元素，将剩下的元素进行全排列处理；
// 将第一个元素与依次与第i（1<i<=arr.length）个元素互换，将剩下的元素进行全排列处理；

function getOrderList(arr) {
  let res = [];
  function run (index) {
    if(index === arr.length - 1) {
      res.push([...arr]); //这里一定要拷贝一份arr, 不能直接res.push(arr) 因为后面会改变arr 影响res
      return;
    }
    for(let i=index; i<arr.length; i++) {
      [arr[index], arr[i]] = [arr[i], arr[index]]; // 与下标为i的元素交换位置
      run(index + 1); // 剩下元素全排列
      [arr[index], arr[i]] = [arr[i], arr[index]]; // 复原数组
    }
  }
  run(0);
  console.log(res);
}

// 爬楼梯 n个台阶 每次只能上1格或者两格  共有几种爬上去的方法
f(n) = f(n-1) + f(n-2)



/************ 二叉树宽度 ************/
// 在这个方法中，我们在队列中保存了当前层的所有孩子节点，然后在指定层的层级遍历完成之后计算这一层节点的个数
// 。因为队列现在保存了下一层的所有节点，所以我们用队列的大小很容易地得到下一层节点的总数。
// 然后我们根据相同的过程处理下一层。我们存储并更新每一层找到的节点最大数目。

var tree = {
  node: 'a',
  left: {
    node: 'b',
    right: 'c',
    left: 'd'
  },
  right: {
    node: 'f',
  }
}

function treeWidth(tree) {
  if (tree == null) return 0;
  const queue = []; // 记录下一层的宽度
  let nLastLevelWidth = 0; // 记录上一层的宽度
  let nCurLevelWidth = 0; 
  let nLastLevelWidth = 1;
  queue.push(tree);
  while(queue.length > 0) {
    while (nLastLevelWidth != 0) {
      const node = queue.pop();
      node.left && queue.push(node.left);
      node.right && queue.push(node.right);
      nLastLevelWidth --;
    }
    nCurLevelWidth = queue.size();
    nWidth = nCurLevelWidth > nLastLevelWidth ? nCurLevelWidth : nLastLevelWidth;
    nLastLevelWidth = nCurLevelWidth;
  };
  return nWidth;
}

/***  二叉树深度 *****/
function getDepth(tree) {
  if (!tree) {
    return 0;
  }
  let nLeft = getDepth(tree.left);
  let nRight = getDepth(tree.right);
  return nLeft > nRight ? nLeft + 1 : nRight + 1;
}

/******************** 查找两个串的最大公共子串 ********************/
function findMaxCommonChild(str1, str2) {
  const m = str1.length;
  const n = str2.length;
  let arr = [];
  let len = 0;
  let res = '';
  for (let i=0; i<m; i++) { // 初始化矩阵
    arr[i] = [];
    for (let j=0; j<n; j++) {
      arr[i][j] = 0;
    }
  }
  
  for (let i=0; i<m; i++) {
    for (let j=0; j<n; j++) {
      if (str1[i] === str2[j]) {
        if (i>0 && j>0) {
          arr[i][j] = arr[i-1][j-1] + 1;
          
        } else {
          arr[i][j] = 1;
        }
        if (arr[i][j] > len) {
          len = arr[i][j];
          res += str1[i];
        }
      } else {
        arr[i][j] = 0;
      }
    }
  }
  return {
    commonChild: res,
    len,
  };
}
/********   二叉树广度优先   深度优先遍历  ********** */
     a
   b   c
d   e

// 广度优先遍历：a b c d e
// 深度优先  前序遍历: a b d e c 
let tree = {
  node: 'a',
  left: {
    node: 'b',
    left: {
      node: 'd',
    },
    right: {
      node: 'e'
    }
  },
  right: {
    node: 'c'
  }
}

// 递归实现深度优先遍历
function BFS(tree, res=[]) {
  if (!tree) return;
  res.push(tree.node);
  tree.left && BFS(tree.left, res);
  tree.right && BFS(tree.right, res);
  return res;
}

// 非递归实现深度优先遍历（前序
function DFS(tree) {
  const queue = [];
  const res = [];
  queue.push(tree);
  while (queue.length > 0) {
    const node = queue.pop(); // [a,c,b,d,e]
    node.left && queue.push(node.right);
    node.right && queue.push(node.left);
    res.push(node.node);
  }
  return res;
}

// 非递归实现广度优先遍历
function BFC(tree) {
  const queue = [];
  const res = [];
  queue.push(tree);
  while (queue.length > 0) {
    const node = queue.shift();
    node.left && queue.push(node.left);
    node.right && queue.push(node.right);
    res.push(node.node);
  }
  return res;
}


