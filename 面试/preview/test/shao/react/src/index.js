import ReactDOM from 'react-dom';
import React from 'react';
import { App } from './app.jsx';

const connect = (mapStateToData, mapDispatchToProps) => {
  return (target) => {
    const oldOnload = target.prototype.onLoad;
    Object.defineProperty(target.prototype, 'onLoad', {
      value: function () {
        oldOnload.apply(this, arguments);
        console.log('loading---------');
      }
    })
  }
}

const mapStateToData = () => ({
  name: 'shao'
})
const mapDispatchToProps = () => {

}
//@connect(mapStateToData, mapDispatchToProps)
class Page {
  onLoad() {
    console.log('loading')
  }
}

const p = new Page();
console.log(p);



ReactDOM.render(<App />, document.getElementById("main"));

if (module.hot) {

  // 当 App.js 更新了

  module.hot.accept('./app', function () {

    // require 进来更新的 App.js 重新render


    var NextApp = require('./app.jsx').App

    ReactDOM.render(<NextApp />, document.getElementById("main"))

  })

}
