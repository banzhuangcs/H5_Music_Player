/**
 * 播放控制
*/

import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { modifySongPlayCondition, modifySongPlayIndex } from '../../../actions/songActionCreators';
import style from './play_control.css';

class PlayerControl extends Component {
  constructor(props) {
    super(props);

    this.handlePlayPrev = () =>
      this.props.modifySongPlayIndex(this.props.playIndex - 1)
    this.handlePlayCondition= () =>
      this.props.modifySongPlayCondition(!this.props.playCondition)
    this.handlePlayNext = () =>
      this.props.modifySongPlayIndex(this.props.playIndex + 1)
  }

  render() {
    return (
      <div className={ style['player-control'] }>
        <i className={ style['player-control-prev'] }
           onClick={ this.handlePlayPrev }></i>
        <i className={ style[`${ this.props.playCondition ? 'player-control-visible-pause' : 'player-control-visible-play' }`] }
           onClick={ this.handlePlayCondition }></i>
        <i className={ style['player-control-next'] }
           onClick={ this.handlePlayNext }></i>
      </div>
    );
  }
}

export default connect(
  ({ song }) => ({ playIndex: song.playIndex, playCondition: song.playCondition }),
  (dispatch) => bindActionCreators({ modifySongPlayIndex, modifySongPlayCondition }, dispatch)
)(PlayerControl);
