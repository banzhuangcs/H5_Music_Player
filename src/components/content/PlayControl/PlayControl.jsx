/**
 * 播放控制
*/

import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { modifySongPlayVisible, modifySongPlayIndex } from '../../../actions/songActionCreators';
import style from './PlayControl.css';

class PlayerControl extends Component {
  static propTypes = {
    playIndex: PropTypes.number,
    playVisible: PropTypes.bool
  };

  constructor(props) {
    super(props);

    this.handlePlayPrev = () =>
      this.props.modifySongPlayIndex(this.props.playIndex - 1)
    this.handlePlayVisible= () =>
      this.props.modifySongPlayVisible(!this.props.playVisible)
    this.handlePlayNext = () =>
      this.props.modifySongPlayIndex(this.props.playIndex + 1)
  }

  render() {
    return (
      <div className={ style['player-control'] }>
        <i className={ style['player-control-prev'] }
           onClick={ this.handlePlayPrev }></i>
        <i className={ style[`${ this.props.playVisible ? 'player-control-visible-pause' : 'player-control-visible-play' }`] }
           onClick={ this.handlePlayVisible }></i>
        <i className={ style['player-control-next'] }
           onClick={ this.handlePlayNext }></i>
      </div>
    );
  }
}

export default connect(
  ({ song }) => ({ playIndex: song.playIndex, playVisible: song.playVisible }),
  (dispatch) => bindActionCreators({ modifySongPlayIndex, modifySongPlayVisible }, dispatch)
)(PlayerControl);
