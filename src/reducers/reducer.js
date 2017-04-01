import { combineReducers } from 'redux';
import song from './song';
import lyric from './lyric';

const reducers = {
  song,
  lyric
};

export default combineReducers(reducers);

/*
  合并reducers采取的是一个声明高阶函数的写法，接收一个key为reducer文件名和值为函数的对象
  返回的新函数接收state(应用状态)、和action
  改变全局的状态
  记录上一次状态
  调用reducer，传入上一次状态和action得到新状态
  新状态必须不能为undefined，只要有一个返回的状态和上一次状态不同，就返回一个新的状态对象
*/
