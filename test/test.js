/**
 * unix路径简化
 * @param {String} unixPath原始输入 eg: '/a/./b/../../c/'
 * @return {String} 简化后的输入 eg: '/c'
 */
function unixPathSimplify(unixPath) {
    const pathArr =  unixPath.split('/');
    const stack = [];
    pathArr.forEach(item => {
        if (item) {
            if (item === '..') {
                stack.pop();
            } else if (item !== '.') {
                stack.push(item)
            }
        }
    });
    return stack.reduce((rt, item) => `${rt}/${item}`, '');
    console.log(pathArr, stack);
}

console.log(unixPathSimplify('/a/./b/../../c'));
