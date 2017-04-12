/**
 * 播放控制
*/

import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { modifyPlayCondition, modifyPlayIndex } from '../../../actionCreators/play';
import style from './play_control.css';

class PlayControl extends Component {
  _isMinPlayIndex() {
    const { playIndex } = this.props;

    return playIndex === 0;
  }

  _isMaxPlayIndex() {
    const { playIndex, songs } = this.props;

    return !songs.length || playIndex === songs.length - 1;
  }

  constructor(props) {
    super(props);

    const { modifyPlayIndex, modifyPlayCondition } = this.props;

    this.handlePlayPrev = () => {
      if (!this._isMinPlayIndex()) {
        modifyPlayIndex(this.props.playIndex - 1);
        modifyPlayCondition('play');
      }
    };
    this.handlePlayCondition= () =>
      modifyPlayCondition(this.props.playCondition === 'play' ? 'pause' : 'play')
    this.handlePlayNext = () => {
      if (!this._isMaxPlayIndex()) {
        modifyPlayIndex(this.props.playIndex + 1);
        modifyPlayCondition('play');
      }
    };
  }

  render() {
    const { playIndex, songs, playCondition } = this.props;

    return (
      <div className={ style['player-control'] }>
        <i className={ style[`player-control-prev${ this._isMinPlayIndex() ? '-outline' : '' }`] }
           onClick={ this.handlePlayPrev }></i>
        <i className={ style[`player-control-condition-${ playCondition }`] }
           onClick={ this.handlePlayCondition }></i>
        <i className={ style[`player-control-next${ this._isMaxPlayIndex() ?  '-outline' : '' }`] }
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
    },
   song: {
     songs = []
   }
  }) => ({
    playIndex,
    playCondition,
    songs
  }),
  (dispatch) => bindActionCreators({ modifyPlayIndex, modifyPlayCondition }, dispatch)
)(PlayControl);
