class MVVM {
  constructor(options) {
    this.data = options.data;
    this.el = options.el;
    if (this.el) {
      
      // 观察数据 setter  getter
      new Observer(this.data);
      new Compile(this.el, this);
    }
  }
}


// 用过vue的人都知道，html中有各种v-开头的指令，也有类似mustache的模板。这部分内容都是要用自定义的data数据进行绑定的。
// 因此，模板的编译就是把你自定义的无论是v-（还是k-，你随意~）开头的指令，还是mustache，用你想要的data去替换。这是编译模板最开始需要想到的。
// 如何进行编译，我们都知道频繁的操作dom是导致性能低下的一大原因，相对于拼接字符串无法操作dom节点来讲，把dom放到内存中操作可以大大提升速度，这就涉及document.createDocumentFragment方法。
// 另外，还会要用到诸如appendChild, childNodes, node.attributes, node.textContent, node.nodeType, firstChild等原生js操作dom的方法。
// 由于处理的dom集合都是类数组，所以一个频繁涉及到的原生js方法是Array.from，把类数组转化成数组；还有一个高频方法的是Array.prototype.reduce。
// 还需要特别掌握的是，递归在项目中的运用。
// 在具体处理的代码中就会考察你的基础知识啦。所以，光会用vue、react、angular啥的不行哦，就像你光知道这个机器怎么使用，一旦停电了或机器故障了，你就只能两手一摊了。
// 在内存中处理好之后，再把fragment放回到页面中即可。至此，页面最初始的模板编译完成。



//观察者 observe data 用object.defineProperty 在setter里 通知发布者订阅者



// Compile.js 文件
class Compile {
  constructor(el, vm) {
      this.el = this.isElementNode(el) ? el : document.querySelector(el);
      this.vm = vm;

      // 如过传入的根元素存在，才开始编译
      if (this.el) {
          // 1、把这些真实的 Dom 移动到内存中，即 fragment（文档碎片）
          let fragment = this.node2fragment(this.el);
             // 2、将模板中的指令中的变量和 {{}} 中的变量替换成真实的数据
          this.compile(fragment);
             // 3、把编译好的 fragment 再塞回页面中
          this.el.appendChild(fragment);
             // ********** 以上为新增代码 *********
      }
  }

  /* 辅助方法 */
  // 判断是否是元素节点
  isElementNode(node) {
      return node.nodeType === 1;
  }

  /* 核心方法 */
  // 将根节点转移至文档碎片
  node2fragment(el) {
      // 创建文档碎片
      let fragment = document.createDocumentFragment();
      // 第一个子节点
      let firstChild;

      // 循环取出根节点中的节点并放入文档碎片中
      while (firstChild = el.firstChild) {
          fragment.appendChild(firstChild);
      }
      return fragment;
  }

     // 解析文档碎片
     compile(fragment) {
      // 当前父节点节点的子节点，包含文本节点，类数组对象
      let childNodes = fragment.childNodes;

      // 转换成数组并循环判断每一个节点的类型
      Array.from(childNodes).forEach(node => {
          if (this.isElementNode(node)) { // 是元素节点
              // 递归编译子节点
              this.compile(node);

              // 编译元素节点的方法
              this.compileElement(node);
          } else { // 是文本节点
              // 编译文本节点的方法
              this.compileText(node);
          }
      });
  }
  // 编译元素
  compileElement(node) {
      // 取出当前节点的属性，类数组
      let attrs = node.attributes;
      Array.form(attrs).forEach(attr => {
          // 获取属性名，判断属性是否为指令，即含 v-
          let attrName = attr.name;

          if (this.isDirective(attrName)) {
              // 如果是指令，取到该属性值得变量在 data 中对应得值，替换到节点中
              let exp = attr.value;

              // 取出方法名
              let [, type] = attrName.split("-");

              // 调用指令对应得方法
              CompileUtil[type](node, this.vm, exp);
          }
      });

  }
  // 编译文本
  compileText(node) {
      // 获取文本节点的内容
      let exp = node.contentText;

      // 创建匹配 {{}} 的正则表达式
      let reg = /\{\{([^}+])\}\}/g;

      // 如果存在 {{}} 则使用 text 指令的方法
      if (reg.test(exp)) {
          CompileUtil["text"](node, this.vm, exp);
      }
  }
}

// 通过上面代码，我们可以看出，在我们 new 一个 MVVM 的时候，在参数 options 中传入了一个 Dom 的根元素节点和数据 data 并挂在了当前的 MVVM 实例上。
// 当存在根节点的时候，通过 Observer 类对 data 数据进行了劫持，并通过 MVVM 实例的方法 proxyData 把 data 中的数据挂在当前 MVVM 实例上，同样对数据进行了劫持，
//是因为我们在获取和修改数据的时候可以直接通过 this 或 this.$data，在 Vue 中实现数据劫持的核心方法是 Object.defineProperty，我们也使用这个方式通过添加 getter 和 setter 来实现数据劫持。
// 最后使用 Compile 类对模板和绑定的数据进行了解析和编译，并渲染在根节点上，之所以数据劫持和模板解析都使用类的方式实现，是因为代码方便维护和扩展，其实不难看出，MVVM 类其实作为了 Compile 类和 Observer 类的一个桥梁。








