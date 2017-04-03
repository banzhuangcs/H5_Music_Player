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

class PlayerProgress extends Component {
  static propTypes = {
    width: PropTypes.number,
    height: PropTypes.number,
    totalTime: PropTypes.string,
    remainTime: PropTypes.string
  };

  constructor(props) {
    super(props);

    this.handleProgress = (percent) => {
      const { totalTime } = this.props;
      const [ minute, second ] = totalTime.split(':');
      const playProgress = Number((parseInt(percent) / 100).toFixed(2));
      const remainSecond = Math.floor((+minute * 60 + (+second)) * playProgress);
      const resetRemainMinute = Math.floor(remainSecond / 60);
      const resetRemainSecond = remainSecond % 60;
      this.props.modifyPlayProgress(playProgress);
      this.props.modifyLyricRemainTime(`${ resetRemainMinute < 10 ? '0' + resetRemainMinute : resetRemainMinute }:${ resetRemainSecond < 10 ? '0' + resetRemainSecond :resetRemainSecond }`);
    };
  }

  render() {
    const {
      width,
      height,
      totalTime,
      remainTime } = this.props;
 
    return (
      <div
        className={ style['play-progress'] }
        style={{ width, height }}>
        <div className={ style['play-progress-panel'] }>
          <Progress
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

export default connect(
  null,
  (dispatch) => bindActionCreators({ modifyPlayProgress, modifyLyricRemainTime }, dispatch)
)(PlayerProgress);
