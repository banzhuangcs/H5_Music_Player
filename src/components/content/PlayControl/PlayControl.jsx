/**
 * 播放控制
*/

import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { modifyPlayCondition, modifyPlayIndex } from '../../../actionCreators/play';
import style from './play_control.css';

class PlayControl extends Component {
  constructor(props) {
    super(props);

    this.handlePlayPrev = () =>
      this.props.modifyPlayIndex(this.props.playIndex - 1)
    this.handlePlayCondition= () =>
      this.props.modifyPlayCondition(this.props.playCondition === 'play' ? 'pause' : 'play')
    this.handlePlayNext = () =>
      this.props.modifyPlayIndex(this.props.playIndex + 1)
  }

  render() {
    return (
      <div className={ style['player-control'] }>
        <i className={ style['player-control-prev'] }
           onClick={ this.handlePlayPrev }></i>
        <i className={ style[`player-control-condition-${ this.props.playCondition }`] }
           onClick={ this.handlePlayCondition }></i>
        <i className={ style['player-control-next'] }
           onClick={ this.handlePlayNext }></i>
      </div>
    );
  }
}

export default connect(
  ({
    play: {
      playIndex = 0,
      playCondition = 'play'
    }
  }) => ({ playIndex, playCondition }),
  (dispatch) => bindActionCreators({ modifyPlayIndex, modifyPlayCondition }, dispatch)
)(PlayControl);
