@decorator
class A {}

// 等同于

class A {}
A = decorator(A) || A;

// 修饰器可以修饰类和类方法 但是不能修饰function 。因为function会被函数提升
// 如果同一个方法有多个修饰器，会像剥洋葱一样，先从外到内进入，然后由内向外执行。
function addAddress(addr) {
	return function(target) {
		console.log(target);
		console.log(this);
		target.address = addr;
		target.prototype.showAddress = function() {
			console.log(target.address)
		}
	}
}

function unenumable(target, property, descriptor) {
	descriptor.enumerable = false;
	return descriptor;
}


@addAddress('mengcheng')
class My {
	constructor(name) {
		this.name = name;
	}
	showName() {
		console.log(this.name);
	}
}

var m = new My('shx');
m.showAddress();

//// wets-graphql
function Provider(config) {
  return (target) => {
    target.store = config.store; // redux store
    target.clent = config.client; // graphql client
  }
}

class NetworkInterface {
  constructor(options) {
    this.url = options.url;
    
  }
  send(data) {
    return new Promise((resolve, reject) => {
      wx.request({
        url: this.url,
        data,
        success: (res) => {
          resolve(res)
        },
        fail: reject
      })
    })
  }
}

class Client {
  mutation(gqldocument, variable) {
    this.query(gqldocument, variable);
  }
  query(gqldocument, variable) {
    this.options.networkInterface.send(JSON.stringify({
      query: gqldocument,
      variable,
    }))
  }
}

var client = new Client({
  networkInterface,
})

@Provider({
  client,
})
class App {

}

getApp().client.query(gql, variable)// 前端这样发出请求

// 到达服务端之后，一个处理graphql的中间件 

import { Source, execute, parse } from 'graphql';
const graphql = (options) => async (ctx, next) => {
  const { schema } = options; // 就是我们server里写的query  mutation
  const { query, variable } = ctx.request.body; // query 就是一个gql的字符串
  const source = new Source(query);
  ctx.body = await execute(schema, parse(source));
}

app.use(graphql({
  schema,
  context,
}))

// server里定义了 gql 的名字
const addAddress = {
  type: xxx, // 我们定义的type
  args: {

  },
  resolve: (atgs, ctx) => {
    // 这里可以调用后端服务
  }
}


welcomeGqlDocument:
query home {
  home {
    address
    tel
  }
}

// wets-redux
@graphql(welcomeGqlDocument)
@connect(
  () => ({}), // mapstatetodata
  (dispatch) => bindActionCreators({
    setOrderId: CheckoutActions.setOrderId
  },dispatch)
)
class Welcome {
  this.props.home.refetch(); // @graphql的作用
  this.props.setOrderId() // @connect的作用
}

function connect (
  mapstatetodata = () => ({}), 
  mapdispatchtoprops = (dispatch) => ({ dispatch }),
) {
  return class Page {
    props = mapDispatchToProps(getApp().store.dispatch);
    onLoad() {
      const state = app.store.getState();
      const nextData = mapstatetodata(state)
      const handleChage = function() {
        if (state !== nextData) {
          this.setData(nextData);
        }
      }
      this.unsubscribe = app.store.subscribe(handleChage);
    }
  }
}

// 修饰类的方法
class Person {
  @readonly
  name() { return `${this.first} ${this.last}` }
}

function readonly(target, name, descriptor){
  // descriptor对象原来的值如下
  // {
  //   value: specifiedFunction,
  //   enumerable: false,
  //   configurable: true,
  //   writable: true
  // };
  descriptor.writable = false;
  return descriptor;
}

readonly(Person.prototype, 'name', descriptor);
// 类似于
Object.defineProperty(Person.prototype, 'name', descriptor);

class Math {
  @log
  add(a, b) {
    return a + b;
  }
}
// @log修饰器，可以起到输出日志的作用
function log(target, name, descriptor) {
  var oldValue = descriptor.value;

  descriptor.value = function() {
    console.log(`Calling ${name} with`, arguments);
    return oldValue.apply(this, arguments);
  };

  return descriptor;
}

const math = new Math();

// passed parameters should get logged now
math.add(2, 4);

