## 克隆nodebb项目，在nodebb上本地开发插件
+ plugins目录结构大概如下
![image](https://user-images.githubusercontent.com/13174560/46583417-5deddc80-ca89-11e8-87b6-80d79325a649.png)

+ 一个plugin其实就是一个npm包，此处是在nodebb项目基础上再次开发，所以没必要做成独立的npm包，直接新建一个plugins目录开发即可。
package.json简写即可，示例：
![image](https://user-images.githubusercontent.com/13174560/46583448-f8e6b680-ca89-11e8-895c-cb5f220abaa7.png)

+ 注意一定要编写plugin.json文件，可声明要注册的钩子
nodebb项目，会读取plugin.json文件中声明的钩子函数，在触发某个钩子时候，主动调用声明的钩子函数，并传入相应参数
比如：在编写第三方sso授权登录插件时候，要声明{ "hook": "filter:auth.init", "method": "getStrategy" }钩子
nodebb会src/routes/authentication.js文件中触发 filter:auth:init钩子，会主动调用实现plugins中声明的相应函数
![image](https://user-images.githubusercontent.com/13174560/46583568-dc4b7e00-ca8b-11e8-88cb-640b8ada2f65.png)

+ 在入口文件（library.js）中，编写相应的钩子函数

## 本地调试plugin
```sh
// In your plugin directory (I'll use nodebb-plugin-example as an example here), you need to run npm link:
~/nodebb-plugin-example > npm link

// In your nodebb directory, you then run npm link [plugin package name]
~/nodebb > npm link nodebb-plugin-example

// You can then activate it via CLI, or restart NodeBB and activate it in the ACP
~/nodebb > ./nodebb activate example
```
