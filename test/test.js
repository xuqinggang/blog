// /**
//  * unix路径简化
//  * @param {String} unixPath原始输入 eg: '/a/./b/../../c/'
//  * @return {String} 简化后的输入 eg: '/c'
//  */
// function unixPathSimplify(unixPath) {
//     const pathArr =  unixPath.split('/');
//     const stack = [];
//     pathArr.forEach(item => {
//         if (item) {
//             if (item === '..') {
//                 stack.pop();
//             } else if (item !== '.') {
//                 stack.push(item)
//             }
//         }
//     });
//     return stack.reduce((rt, item) => `${rt}/${item}`, '');
//     console.log(pathArr, stack);
// }

// console.log(unixPathSimplify('/a/./b/../../c'));

const cluster = require('cluster');
const http = require('http');
const numCPUs = require('os').cpus().length;
console.log(cluster.isMaster);
if (cluster.isMaster) {

    console.log(`主进程 ${process.pid} 正在运行`);

    // 衍生工作进程。
    for (let i = 0; i < numCPUs; i++) {
        cluster.fork();
    }

    cluster.on('exit', (worker, code, signal) => {
        console.log(`工作进程 ${worker.process.pid} 已退出`);
    });
} else {
    http.createServer((req, res) => {
        res.writeHead(200);
        res.end('你好世界\n');
    }).listen(8000);

    console.log(`工作进程 ${process.pid} 已启动`);
}