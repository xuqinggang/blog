# 具体demo

## install
```js
    "@types/enzyme": "^3.9.1",
    "@types/enzyme-adapter-react-16": "^1.0.5",
    "@types/jest": "^24.0.11",

    "enzyme": "^3.9.0",
    "enzyme-adapter-react-16": "^1.12.1",
    "enzyme-to-json": "^3.3.5",
    "jest": "^24.7.1",
    "jest-dom": "^3.1.3",
    "ts-jest": "^24.0.2",
    "typescript": "^3.4.3"
```


## package.json -> jest 配置
```package.json
{
  "jest": {
    "verbose": true,
    "collectCoverage": false,
    "roots": [
      "./test" // 测试文件所在目录
    ],
    "snapshotSerializers": [
      "enzyme-to-json/serializer"
    ],
    "setupFilesAfterEnv": [ // 配置文件，在运行测试案例代码之前，Jest会先运行这里的配置文件来初始化指定的测试环境
      "./test/setupEnzyme.ts" // Enzyme配置
    ],
    "moduleFileExtensions": [ // 代表支持加载的文件名，与 Webpack 中的 resolve.extensions 类似
      "ts",
      "tsx",
      "js",
      "jsx",
      "json",
      "node"
    ],
    "testRegex": "(/test/*/.*)\\.(ts|tsx|js|jsx)$", // 正则表示的测试文件，测试文件的格式为xxx.test.js
    "transform": { // 
      "^.+\\.tsx?$": "ts-jest",
      "^.+\\.jsx?$": "ts-jest"
    },
    "testPathIgnorePatterns": [ // 用正则来匹配不用测试的文件
      "/node_modules/",
      "/build/",
      "/coverage/"
    ],
    collectCoverage: false, // 是否生成测试覆盖报告，如果开启，会增加测试的时间
    collectCoverageFrom: [ // 生成测试覆盖报告是检测的覆盖文件
      'src/components/**/*.{js}',
    ],
    moduleNameMapper: { // 代表需要被Mock的资源名称
      "\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$": "<rootDir>/__mocks__/fileMock.js",
      "\\.(css|less|scss)$": "<rootDir>/__mocks__/styleMock.js"
    },
    "globals": {
      "ts-jest": {
        "diagnostics": false,
        "tsConfig": "./tsconfig.json"
      }
    }
  }
}

```

## tsconfig.json 配置
```tsconfig.json
{
  "compilerOptions": {
    "outDir": "./lib",
    "allowJs": true,
    "sourceMap": true,
    "target": "es5",
    "lib": ["es2017", "dom"],
    "jsx": "react", // ** 注意设置
    "allowSyntheticDefaultImports": true, // ** 注意: 避免此种导入方式 import * as React from 'react' (blog: https://zhuanlan.zhihu.com/p/29022311)
    "moduleResolution": "node",
    "experimentalDecorators": true, // 支持装饰器语法
    "forceConsistentCasingInFileNames": true,
    "noImplicitReturns": true,
    "noImplicitThis": false,
    "noImplicitAny": false,
    "strictNullChecks": true,
    "suppressImplicitAnyIndexErrors": true,
    "noUnusedLocals": false
  }
}
```

## test 目录下 编写 setupEnzyme.ts
```js
import { configure } from 'enzyme';
import * as EnzymeAdapter from 'enzyme-adapter-react-16';

configure({ adapter: new EnzymeAdapter() });
```


## package.json -> scripts 命令
```package.json
{
  "scripts": {
    "test": "jest", // test all file
    "test-xxxx": "jest ./test/app/xxx.test.tsx", // test single file
  },
}
```

### 参考文献：
> [基于 Jest + Enzyme 的 React 单元测试 | 掘金](https://juejin.im/post/59019ac8b123db260cc6ae91)
> [使用Jest进行React单元测试](https://juejin.im/post/5b6c39bde51d45195c079d62#heading-18)
> [hex](https://www.jianshu.com/p/57c4e8d3f035)
> [Using Jest with TypeScript](https://basarat.gitbooks.io/typescript/docs/testing/jest.html)
