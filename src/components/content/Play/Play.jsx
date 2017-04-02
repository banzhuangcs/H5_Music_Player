/**
 * 播放组件
*/

import React, { Component, PropTypes } from 'react';

export default class Play extends Component {
  static propTypes = {
        
  };
}
/*
H5 Audio Api

属性：
  src:播放源地址，chrome支持mp3和ogg格式的音频
  loop：是否循环播放
  controls: 是否显示默认控制条
  autoplay: 是否自动播放

  duration: 歌曲总时间，以s为单位
  paused: 是否暂停
  ended: 是否播放完毕
  muted: 获取或设置是否静音
  volume: 音量 0-1
  startTime: 起始播放时间
  currentTime: 当前播放时间
  currentSrc: 播放源地址
方法：
  load: 开始加载播放源
  play: 开始播放
  pause: 暂停播放
事件
  play: 开始播放事件
  pause: 暂停播放事件
  ended: 播放结束事件
  timeupdate: 播放中



*/
