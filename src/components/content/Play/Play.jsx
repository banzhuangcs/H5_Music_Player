/**
 * 播放组件
*/

import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { modifyPlayProgress, modifyPlayIndex } from '../../../actionCreators/play';


const bind = (el, type, handle) =>
  el.addEventListener(type, handle, false)

class Play extends Component {
  static propTypes = {
    audio: PropTypes.string,
    playModel: PropTypes.string,
    playCondition: PropTypes.string,
    playVolume: PropTypes.number,
    playProgress: PropTypes.number
  };

  _playStatus() {
    const { playCondition } = this.props;
    this.audioEl[playCondition]();
  }

  _controlVolume() {
    const { playVolume } = this.props;
    this.audioEl.volume = playVolume;
  }

  constructor(props) {
    super(props);

    this.handleTimeUpdate = () => {

    };
    this.handleEnded = () => {

    };
    this.handleCanPlay = () =>
      this._playStatus();

  }

  render() {
    const { audio, playModel } = this.props;

    return (
      <audio
        ref={ el => this.audioEl = el }
        src={ this.props.audio }
        preload={ true }></audio>
    );
  }

  componentDidUpdate() {
    this._controlVolume();
  }

  componentDidMount() {
    bind(this.audioEl, 'canplay', this.handleCanPlay);
  }
}

export default connect(
  null,
  (dispatch) => bindActionCreators({ modifyPlayProgress, modifyPlayIndex }, dispatch)
)(Play);
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
