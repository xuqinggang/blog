// function delayPromise(ms) {
//   return new Promise(res => {
//     setTimeout(res, ms);
//   })
// }

// 100个文件分组上传 每10个为一组
function batchUpload(files) {
  if (files.length === 0) {
    Promise.resolve('end')
  }
  return Promise.all(fiels.splice(0, 10).map(file => XMLHttpRequestUpload(file))).then(
    data => {
      if (data !== 'end') {
        batchUpload(files)
      }
    }
  ).catch(e => {
    //...
  })
}

function race(funcs) {
  let fastIndex;
  let errorIndex = [];
  let backCount = 0;
  let tag = false;
  return new Promise((res, rej) => {
    for (let i = 0; i < funcs.length; i++) {
      Promise.resolve(funcs[i])
        .then(() => {
          if (tag === false) {
            falstIndex = i;
            console.log("fastIndex", fastIndex);
            tag = true;
          }
        })
        .catch(() => {
          errorIndex.push(i);
          res();
        })
        .finally(() => {
          ++backCount;
          if (backCount === funcs.length) {
            res();
          }
        });
    }
  }).then(() => {
    console.log("fastIndex", fastIndex);
    console.log("errorIndex", errorIndex);
  });
}

function getName() {
  console.log("start get name");
  return new Promise((res, rej) => {
    setTimeout(() => {
      console.log("name get back");
      res("name is lll");
    }, 3000);
  });
}

function getAge() {
  console.log("start get age");
  return new Promise((res, rej) => {
    setTimeout(() => {
      console.log("age get back");
      res("age is 12");
    }, 2000);
  });
}

race([getName(), getAge()]);

// function fun() {
//   return Promise.race([getName(), getAge()]).then(data => {
//     console.log("done");
//     // console.log(data);
//   });
// }
