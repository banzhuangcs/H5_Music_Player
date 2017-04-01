import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import Main from './components/Main';
import store from './stores/store';
import './statics/styles/reset.css';

ReactDOM.render(
  <Provider store={ store }>
    <Main />
  </Provider>,
  document.querySelector('#app')
);

/*
  Provider组件，让组件通过React Context特性避免层级嵌套
   首先利用React在父组件声明的childContextTypes对需要传递给子组件的数据进行数据声明
   然后在子组件中需要声明contextTypes对父组件传递的数据进行数据声明
   如果是extends Component的话，
   需要在子组件中用静态表示
   并且在构造函数中写入props, context，在super(props, context), this.context方式去调用

  Connect：将组件变成容器组件，并且把store的state和dispatch传给原始属性

  Connect在ComponentDidMount中，会监听handleChange，当dispatch时候，会调用reducer得到新的state，然后重新绘制组件


  mapStateToProps:转换store的state到组件的props
  mapStateToProps会订阅store，每当状态改变

*/
