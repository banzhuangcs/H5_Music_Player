/**
 * 播放进度组件
 */

import React, { Component, PropTypes } from 'react';
import Progress from '../global/Progress';

export default class PlayerProgress extends Component {
  static propTypes = {
    totalTime: PropTypes.string.isRequired,
    remainTime: PropTypes.string.isRequired
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
        flex: 1,
        textAlign: 'right',
      }
    };
    this.state = {
      remainTime: this.props.remainTime
    };
  }

  render() {
    return (
      <div style={ this.style.root }>

        {/* 进度条 */}
        <Progress
          width={ 400 }
          height={ 5 }
          circleWidth={ 18 }
          circleHeight={ 18 }
          onProgress={ () => {} } />

        <div style={ this.style.time }>
          <label>{ this.state.remainTime }</label>/
          <label>{ this.props.totalTime }</label>
        </div>
      </div>
    );
  }

  handleMouseOver() {

  }

  handleMouseMove() {

  }

  handleMouseOut() {

  }
}
