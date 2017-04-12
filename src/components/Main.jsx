/**
 * 入口组件
*/

import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { getSongs } from '../actionCreators/song';
import SongDetail from './mainContent/SongDetail/SongDetail';
import SoundControl from './mainContent/SoundControl/SoundControl';
import PlayProgress from './mainContent/PlayProgress/PlayProgress';
import PlayModel from './content/PlayModel/PlayModel';
import LyricControl from './content/LyricControl/LyricControl';
import Play from './content/Play/Play';
import style from '../statics/styles/global.css';
import data from '../songs.json';

class Main extends Component {
  constructor(props) {
     super(props);

     this.handleTimeUpdate = (currentTimeRatio) =>
       this.refs['playProgress'].updateProgressPos(currentTimeRatio);
  }

  componentWillMount() {
    const { getSongs } = this.props;

    if (process.env.NODE_ENV === 'pro') {
      getSongs(data);
    }
  }

  render() {
    const {
      songs,
      playIndex,
      playCondition,
      playModel,
      playVolume,
      playSound,
      playProgress,
      autoProgress,
      totalTime,
      dispatch,
      remainTime } = this.props;

    return (
      <div className={ style['wrapper'] }>
        <div className={ style['wrapper-inner'] }>
          <div className={ style['sound-detail'] }>
            <SongDetail { ...songs[ playIndex ] } />
          </div>
          <div className={ style['sound-progress'] }>
            <div className={ style['sound-control-panel'] }>
              <SoundControl
                width={ 30 }
                height={ 30 }
                playVolume={ playVolume } />
            </div>
            <div className={ style['play-model-panel'] }>
              <PlayModel
                width={ 20 }
                height={ 20 }
                playModel={ playModel } />
            </div>
            <div className={ style['play-progress-panel'] }>
              <PlayProgress
                ref="playProgress"
                width={ 475 }
                height={ 30 }
                dispatch={ dispatch }
                totalTime={ totalTime }
                remainTime={ remainTime }
                playProgress={ playProgress }
                autoProgress={ autoProgress } />
            </div>
            <div className={ style['lyric-control-panel'] }>
              <LyricControl
                width={ 20 }
                height={ 20 } />
            </div>
          </div>
          <div className={ style['sound-audio'] }>
            <Play
              songs={ songs }
              audio={ (songs[playIndex] || {}).audio }
              playIndex={ playIndex }
              playModel={ playModel }
              playCondition={ playCondition }
              playVolume={ playVolume }
              playProgress={ playProgress }
              autoProgress={ autoProgress }
              totalTime={ totalTime }
              onTimeUpdate={ this.handleTimeUpdate } />
          </div>
        </div>
      </div>
    );
  }
}

export default connect(
  ({
    song: { songs = [] },
    play: {
      playIndex = 0,
      playCondition = 'play',
      playVolume = 0.4,
      playModel = 'order',
      playProgress = 0,
      autoProgress = false
    },
    lyric: {
      totalTime = '00:00',
      remainTime = '00:00'
    }
  }) => ({
    songs,
    playIndex,
    playCondition,
    playVolume,
    playModel,
    playProgress,
    autoProgress,
    totalTime,
    remainTime
   }),
  (dispatch) => ({ getSongs: bindActionCreators(getSongs, dispatch), dispatch })
)(Main);
