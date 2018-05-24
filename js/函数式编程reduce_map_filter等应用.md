### 函数式编程reduce、map、filter、find等应用实践

> 对reduce、map、filter等方法的讲解，可以看这篇文章[https://github.com/ccforward/cc/issues/59](https://github.com/ccforward/cc/issues/59)

```js
// 输入为state和originData变量
// 输出为:
{
    houseTypeShared: '2居_3居',
    houseTypeWhole: '2居',
};
// state和originData变量如下:
// state
const state = {
    sharedRooms: { 0: false, 1: true, 2:true },
    wholeRooms: { 2: false, 3: true },
};

// 源数据
const originData = {
    sharedRooms: [
        {
            unique: true,
            text: '不限',
            value: 'UNLIMITED',
        },
        {
            text: '2居',
            value: 'TWO',
        },
        {
            text: '3居',
            value: 'THREE',
        },
        {
            text: '3居+',
            value: 'THREE_MORE',
        },
    ],
    wholeRooms: [
        {
            unique: true,
            text: '不限',
            value: 'UNLIMITED',
        },
        {
            text: '1居',
            value: 'ONE',
        },
        {
            text: '2居',
            value: 'TWO',
        },
        {
            text: '2居+',
            value: 'TWO_MORE',
        },
    ]
};
// (1)正常写法，可能会像下面这样
function compute(state, originData) {
    const TypeMapParamKey = {
        sharedRooms: 'houseTypeShared',
        wholeRooms: 'houseTypeWhole',
    };

    const paramArr = Object.keys(state)
        .map(type => {
            const typeDataArr = originData[type];
            const typeStateObj = state[type];
            const textArr = [];
            Object.keys(typeStateObj)
                .forEach((index) => {
                        const bool = typeStateObj[index];
                        if (bool) {
                            textArr.push(typeDataArr[index].text);
                        }
                })
            const textRt = textArr.split('_');
            return {
                [TypeMapParamKey[type]]: textRt,
            };
        });
    const paramsObj = {};
    paramArr.forEach(param => Object.assign(paramsObj, param));

    return paramsObj;
}

// (2)利用map, reduce, filter等函数式方法，计算出结果。
function compute(state, originData) {
    const TypeMapParamKey = {
        sharedRooms: 'houseTypeShared',
        wholeRooms: 'houseTypeWhole',
    };

    retrun Object.keys(state)
        .map(type => {
            const rtText = Object.keys(state[type])
                .filter(index => state[type][index])
                .map(index => originData[type][index].text)
                .reduce((rt, text, index) =>
                    (`${rt}` + (index === 0 ? '' : '_') + `${text}`),
                    '',
                );
            return {
                [TypeMapParamKey[type]]: rtText,
            };
        })
        .reduce((rt, item) => Object.assign(rt, item), {})
}
```
比较上述两者写法，从代码行数上来说，二者差不读。

方法(1)更加的过程式，一步步的计算出需要的结果，利用上一步结果计算出下一步的。可能也比较易读。

方法(2)更加的函数式，充分利用各种函数式方法，简化操作，计算出需要的。

其实感觉方法(2)比方法(1)更加充分的利用reduce，把数组中的多个数据通过某种操作合并成一个数据,而不是简单的遍历数组。
细心的同学发现：方法(2)利用filter和map其实遍历了两遍数组，而方法(1)遍历一遍筛选出`text数组`。
可以看下[JavaScript 函数式编程存在性能问题么？](https://www.zhihu.com/question/54637225/answer/140362071)解决疑惑。

### 在这里强调，大家还是应该尽可能从函数式编程的角度，多利用函数式方法（filter,map,reduce等）解决问题
优点:
1. 通过链式调用，代码精简
2. map,reduce,filter等方法更具语义化,

坏处:
1. 初次阅读，难以阅读理解(其实写习惯，就很容易理解了)
2. 性能会有损牺牲(但性能从现在以后来讲，应该更不是问题，毕竟硬件性能会越来越高，或许以后也会加入惰性计算优化map、reduce等方法)。性能问题可以利用[loadsh库](https://github.com/lodash/lodash)、[ramda库](https://github.com/ramda/ramda)
