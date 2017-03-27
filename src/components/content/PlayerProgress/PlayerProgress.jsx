/**
 * 播放进度组件
 */

import React, { Component, PropTypes } from 'react';
import playerProgressStyle from './player_progress.css';

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

    this.state = {
      remainTime: this.props.remainTime
    };
  }

  render() {
    return (
      <div className={ playerProgressStyle['player-progress'] }>
        <div className={ playerProgressStyle['player-progress-sidebar'] }>
          <i className={ playerProgressStyle['player-progress-regulator'] } onClick={ this.handleProgress.bind(this) }></i>
        </div>
        <div className={ playerProgressStyle['player-progress-time'] }>
          <label>{ this.state.remainTime }</label>/
          <label>{ this.props.totalTime }</label>
        </div>
      </div>
    );
  }

  handleProgress() {

  }
}
