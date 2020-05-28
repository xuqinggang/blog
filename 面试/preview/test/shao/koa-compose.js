compose([mida,midb])();

function koaCompose(mids) {
  return async (ctx, next) => {
    execute(0);
    function execute(index) {
      let fn = mids[index];
      if (index === mids.length) {
        fn = next
      }
      return Promise.resolve(fn(ctx, () => {
        return execute(index + 1);
      }))
    }
  }
}

//递归

function compose(mids) {
  // for(let i=0; i<mids.length; i++) {
  //   const fn = mids[i];
  // }
  return async (ctx, next) => {
    execute(0);
    function execute (index) {
      let fn = mids[index];
      if (index === mids.length) {
        fn = next; 
        // 最后一层的next，别想多。相当于compose([mida,midb])({}, () => {console.log(0)})
        // 里面的 （）=> {console.log(0)} 执行一下。
      }
      if (typeof fn !== 'function') return;
      console.log(11,fn.toString())
      return Promise.resolve(fn(ctx, function () {
       return execute(index + 1);
      }))
    }
  }
}


myCompose([mida, midb])();
function myCompose(mids) {
  if (!Array.isArray(mids)) throw new Error('you should give an array');
  if (mids.length === 0) return;
  return (ctx, next) => {
    return execute(0);
    function execute (index) {
      let fn = mids[index];
      if (index === mids.length) {
        fn = next;
      }
      if (typeof fn !== 'function') return;
      return Promise.resolve(fn(ctx, () => {
        return execute(index + 1)
      }))
    }
  }
}


async function mida(ctx, next) {
  console.log('mida start');
  await next();
  console.log('mida back');
}

async function midb(ctx, next) {
  console.log('midb start');
  await next();
  console.log('midb back');
}

///////////////////////////////////串联执行
// (10 + 1) * 3 -2 = 31;
const add = (x) => x+1;
const multipe = (x) => x * 3;
const minus = x => x - 2;

function reduxCompose(...args) {
  return args.reduce((prev, cur) => (...param) => cur(prev(...param)))
}

reduxCompose(add, multipe, minus)(10);

// 如果reduce没有提供initvalue,第一次执行的prev是0下标的值，cur是1下标的值
function reduxCompose(...args) { // ...args 就是把多个参数传入的场景。通过args数组能拿到
  console.log(args);
  return args.reduce((prev, cur) => (...param) => cur(prev(...param)));
}

////// 

