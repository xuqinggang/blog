/* 项目 */
// 海报 优化
// jupiter 优劣势、功能特点

/* 算法 */
// 给定一个数组 和 n，每个元素值可随意切割，求 n 个相同值, 该值最大可以是多大
// 语义化：一个整数数组，每个元素都是每个木头对应的长度，**每个木头都可以随意切割**，有一位老板来买木头，想买 n 根相同长度的木头，满足该老板要求同时木头最大长度可以为多少？
/* 比如:
数组为: [245, 142, 456] , 买 7 根. 那木头最大长度可以为多少?
现在木头长度范围是: 1 ~ 456
二分查找，比如
(1)先找到的是 228，那么每个数组元素， item / 228 商取整数，然后累加是否 >7，   1 + 0 + 2 不满足，如果大于其向右空间查找
(2) 不满足，向左空间查找 1~228 -> mid = 114

 */

/* js */
// 原型链
// 原型链实现继承
https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Inheritance_and_the_prototype_chain

// 原因?
// 解决方式

/* css */
// flex

/* 设计模式 */
// 单例\工厂\