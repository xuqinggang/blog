
// typescript 题
// 1. 提取 function name
interface Module {
  a: number;
  b: string;
  c(): any;
  d(): any;
}

// 答案
type FuncName<T> = { [P in keyof T]: T[P] extends Function ? P : never }[keyof T];

type A = FuncName<Module>
