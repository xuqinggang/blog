1. webpack Path variable [contenthash:8] not implemented in this context: css/[name].[contenthash:8].css
> webpack4.x不支持contenthash和chunkhash统一为hash。所以修改为`css/[name].[hash:8].css`

1. Module build failed: TypeError: this.setDynamic is not a function
> 由于我们babel使用了7,所以`plugin-transform-runtime`也需要安装@babel7以上
`npm i --save-dev @babel/plugin-transform-runtime`

1. Error: Cannot find module 'babel-runtime/helpers/interop-require-default'
> 解决: 不光需要安装 npm i --save-dev @babel/plugin-transform-runtime,还需要安装 npm i --save @babel/runtime.
`Why should we store babel-runtime in dependencies instead of devDependencies even for running tests?` 看[官方解释(下面的例子)](https://babeljs.io/docs/plugins/transform-runtime/).
