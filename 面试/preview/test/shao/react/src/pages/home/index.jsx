import React, { Component } from "react";
import { Tab } from "../../components";
import { get } from "http";
//import Counter from "../../components/counter";

export class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      count: 0
    };
  }
  componentDidMount() {
    debugger
    this.setState({
      count: this.state.count++
    });
    console.log("1", this.state.count);
    this.setState({
      count: this.state.count++
    });
    console.log("2", this.state.count); 
    setTimeout(() => {
      this.setState({
        count: this.state.count++
      });
      console.log("3", this.state.count);
      this.setState({
        count: this.state.count++
      });
      console.log("4", this.state.count);
    }, 3000);
    setTimeout(() => {
      for (let i=0;i < 100; i++) {
        this.setState({
          address: `ppp${i}`
        });
        console.log('address',this.state.address);
      }

    }, 0)
  }
  render() {
    const { address } = this.state;
    console.log(11);
    return (
      <div>
        123
        <div>{address}</div>
        <Tab />

      </div>
    );
  }
}


const vm = new Mvvm({
  el: 'app',
  data: {
    text: 'hello world',
  },
  method: {
    reset() {
      this.text = '';
    }
  }
})

class Mvvm {
  constructor(options) {
    const { el, data, methods } = options;
    this.el = el;
    this.methods = methods;
    this.observe(this, data); 
    // 初始化watcher
    this.compile(document.getElementById(el));
  }
  observe() {
    Object.keys(data).forEach(key => {
      const dep = new Dispatcher();
      Object.defineProperty(this, key, {
        set(newValue) {
          if (data[key] === newValue) return;
          // 发布
          dep.notify()
          data[key] = newValue;
        },
        get() {
          // 订阅
          dep.add(this.target);
          return data[key];
        }
      })
    })
  }
  compile(dom) {
    const nodes = dom.childNodes;
    for (const node of nodes) {
        // 元素节点
        if (node.nodeType == 1) {
            const attrs = node.attributes;
            for (const attr of attrs) {
                if (attr.name == 'v-model') {
                    const name = attr.value;
                    node.addEventListener('input', e => {
                        this[name] = e.target.value;
                    });
                    this.target = new Watcher(node, 'input');
                    this[name];
                }
                if (attr.name == '@click') {
                    const name = attr.value;
                    node.addEventListener('click', this.methods[name].bind(this));
                }
            }
        }
        // text节点
        if (node.nodeType == 3) {
            const reg = /\{\{(.*)\}\}/;
            const match = node.nodeValue.match(reg);
            if (match) {
                const name = match[1].trim();
                this.target = new Watcher(node, 'text');
                this[name];
            }
        }
    }
}
}

class Dispatcher {
  constructor() {
    this.watchers = [];
  }
  add(watcher) {
    this.watchers.push(watcher);
  }
  notify(value) {
    this.watchers.forEach(watcher => watcher.update(value))
  }
}

class Watcher {
  constructor(node, type) {
    this.node = node;
    this.type = type;
  }
  update(value) {
    if (this.type === 'input') {
      this.node.value = value;
    } else if (this.type === 'text') {
      this.node.nodeValue = value;
    }
  }
}
