/**
 * 入口组件
*/

import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getSongs } from '../actions/songActionCreators';
import SongDetail from './mainContent/SongDetail/SongDetail';
import SoundControl from './mainContent/SoundControl/SoundControl';
import PlayProgress from './mainContent/PlayProgress/PlayProgress';
import PlayModel from './content/PlayModel/PlayModel';
import LyricControl from './content/LyricControl/LyricControl';
import style from '../statics/styles/global.css';
import songs from '../songs.json';

class Main extends Component {
  componentWillMount() {
    const { getSongs } = this.props;

    if (process.env.NODE_ENV === 'dev') {
      getSongs(songs);
    }
  }

  render() {
    const {
      list = [],
      playIndex,
      playModel,
      playSound,
      playProgress } = this.props.song;

    return (
      <div className={ style['wrapper'] }>
        <div className={ style['wrapper-inner'] }>
          <div className={ style['sound-detail'] }>
            <SongDetail { ...list[ playIndex ] } />
          </div>
          <div className={ style['sound-progress'] }>
            <div className={ style['sound-control-panel'] }>
              <SoundControl
                width={ 30 }
                height={ 30 } />
            </div>
            <div className={ style['play-model-panel'] }>
              <PlayModel
                width={ 20 }
                height={ 20 } />
            </div>
            <div className={ style['play-progress-panel'] }>
              <PlayProgress
                width={ 475 }
                height={ 30 } />
            </div>
            <div className={ style['lyric-control-panel'] }>
              <LyricControl
                width={ 20 }
                height={ 20 } />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default connect(
  ({ song }) => ({ song }),
  (dispatch) => ({ getSongs: bindActionCreators(getSongs, dispatch) })
)(Main);
