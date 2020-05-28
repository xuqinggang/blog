co是如何判断是否是promise 或者 generator 对象的
function isPromise(obj) {
  return 'function' == typeof obj.then;
}

function isGenerator(obj) {
  return 'function' === typeof obj.next && 'function' === typeof obj.throw;
}

function A () {

}

function B() {

}

A.prototype = Object.create(B.prototype);
A.prototype.constructor = A;


