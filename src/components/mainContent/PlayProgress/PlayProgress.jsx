/**
 * 播放进度组件
 */

import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { modifyPlayProgress } from '../../../actionCreators/play';
import { modifyLyricRemainTime } from '../../../actionCreators/lyric';
import Progress from '../../global/Progress/Progress';
import style from './play_progress.css';

export default class PlayerProgress extends Component {
  static propTypes = {
    width: PropTypes.number,
    height: PropTypes.number,
    totalTime: PropTypes.string,
    remainTime: PropTypes.string,
    playProgress: PropTypes.number,
    autoProgress: PropTypes.bool,
    dispatch: PropTypes.func
  };

  updateProgressPos(value) {
    this.refs['progress'].setProgressState(400 * value, null, true);
  }

  _calcTime(time) {
    const minute = Math.floor(time / 60);
    const second = Math.floor(time % 60);

    return [
      minute < 10 ? '0' + minute : minute,
      second < 10 ? '0' + second : second
    ];
  }

  constructor(props) {
    super(props);

    this.handleProgress = (percent) => {
      const { totalTime } = this.props;
      const [ minute, second ] = totalTime.split(':');
      const remainTime = ((+minute) * 60 + (+second)) * percent;
      const [ remainMinute, remainSecond ] = this._calcTime(remainTime);
      const { dispatch } = this.props;

      dispatch(modifyLyricRemainTime(`${ remainMinute }:${ remainSecond }`));
      dispatch(modifyPlayProgress(percent));
    };
  }

  render() {
    const {
      width,
      height,
      totalTime,
      remainTime,
       } = this.props;

    return (
      <div
        className={ style['play-progress'] }
        style={{ width, height }}>
        <div className={ style['play-progress-panel'] }>
          <Progress
            ref="progress"
            width={ 400 }
            height={ 5 }
            circleWidth={ 16 }
            circleHeight={ 16 }
            onProgress={ this.handleProgress } />
        </div>
        <div className={ style['play-progress-timeline'] }>
          <label>{ remainTime }</label>/
          <label>{ totalTime }</label>
        </div>
      </div>
    );
  }
}
