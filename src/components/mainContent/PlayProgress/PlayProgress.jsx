/**
 * 播放进度组件
 */

import React, { Component, PropTypes } from 'react';
import Progress from '../../global/Progress/Progress';
import style from './play_progress.css';

export default class PlayerProgress extends Component {
  static propTypes = {
    width: PropTypes.number,
    height: PropTypes.number,
    totalTime: PropTypes.string,
    remainTime: PropTypes.string
  };

  static defaultProps = {
    totalTime: '05:00',
    remainTime: '00:00'
  };

  constructor(props) {
    super(props);

    this.style = {
      root: {
        display: 'flex',
        flexFlow: 'nowrap row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        width: 465,
        height: 18
      },
      time: {
        flex: 1
      }
    };
    this.state = {
      remainTime: this.props.remainTime
    };
  }

  render() {
    const { width, height, totalTime } = this.props;

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
            onProgress={ (percent) => { console.log(percent)  } } />
        </div>
        <div className={ style['play-progress-timeline'] }>
          <label>{ this.state.remainTime }</label>/
          <label>{ totalTime }</label>
        </div>
      </div>
    );
  }
}
