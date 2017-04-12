/**
 * 播放组件
*/

import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { modifyPlayProgress, modifyPlayIndex } from '../../../actionCreators/play';
import { modifyLyricTotalTime, modifyLyricRemainTime } from '../../../actionCreators/lyric';

const bind = (el, type, handle) =>
  el.addEventListener(type, handle, false)

class Play extends Component {
  static propTypes = {
    audio: PropTypes.string,
    playModel: PropTypes.string,
    playCondition: PropTypes.string,
    playVolume: PropTypes.number,
    playProgress: PropTypes.number,
    autoProgress: PropTypes.bool,
    totalTime: PropTypes.string,
    onTimeUpdate: PropTypes.func
  };

  _playStatus() {
    const { playCondition } = this.props;
    this.audioEl[playCondition]();
  }

  _controlVolume() {
    const { playVolume } = this.props;
    this.audioEl.volume = playVolume;
  }

  _playModel() {
    const { playModel } = this.props;
    this.audioEl.loop = playModel === 'loop' ? true : false;
  }

  _playProgress() {
    const { playProgress } = this.props;
    const remainSecond = Math.floor(this._getTotalTimeSecond() * playProgress);
    this.audioEl.currentTime = remainSecond;
  }

  _getTotalTimeSecond() {
    const { totalTime } = this.props;
    const [ minute, second ] = totalTime.split(':');

    return +minute * 60 + (+second);
  }

  _calcTime(time) {
    const minute = Math.floor(time / 60);
    const second = Math.floor(time % 60);

    return [
      minute < 10 ? '0' + minute : minute,
      second < 10 ? '0' + second : second
    ];
  }

  _playNext() {
    const {
      playIndex,
      playMode,
      songs,
      modifyPlayIndex } = this.props;

    if (songs.length
      && playIndex !== songs.length - 1
      && playMode !== 'loop') {
      modifyPlayIndex(playIndex + 1);
    }
  }

  constructor(props) {
    super(props);

    this.handleTimeUpdate = () => {
      const currentTime = this.audioEl.currentTime;
      const totalTime = this.audioEl.duration;
      const { onTimeUpdate, modifyPlayProgress, modifyLyricRemainTime } = this.props;
      const [ minute, second ] = this._calcTime(currentTime);

      modifyLyricRemainTime(`${ minute }:${ second }`);
      onTimeUpdate(currentTime / totalTime);
    };
    this.handleEnded = () =>
      this._playNext()
    this.handleCanPlay = () => {
      const [ minute, second ] = this._calcTime(this.audioEl.duration);

      this.props.modifyLyricTotalTime(`${ minute }:${ second }`);
      this._playStatus();
      this._controlVolume();
      this._playModel();
    }
  }

  componentDidUpdate(prevProps) {
    const { playCondition, playVolume, playModel, playProgress } = prevProps;

    if (this.props.playCondition !== playCondition) {
      this._playStatus();
    } else if (this.props.playVolume !== playVolume) {
      this._controlVolume();
    } else if (this.props.playModel !== playModel) {
      this._playModel();
    } else if (this.props.playProgress !== playProgress) {
      this._playProgress();
    }
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

  componentDidMount() {
    bind(this.audioEl, 'canplay', this.handleCanPlay);
    bind(this.audioEl, 'ended', this.handleEnded);
    bind(this.audioEl, 'timeupdate', this.handleTimeUpdate);
  }
}

export default connect(
  null,
  (dispatch) => bindActionCreators({
    modifyPlayProgress,
    modifyPlayIndex,
    modifyLyricTotalTime,
    modifyLyricRemainTime
  }, dispatch)
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
