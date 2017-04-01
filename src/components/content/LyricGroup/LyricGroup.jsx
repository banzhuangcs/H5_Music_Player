/**
 * 歌词容器组件
*/

import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Lyric from '../Lyric/Lyric';
import { getLyricInfo, modifyLaricUseTime } from '../../../actions/lyricActionCreators';
import style from './LyricGroup.css';

class LyricGroup extends Component {
  static propTypes = {
    songlrc: PropTypes.string,
    list: PropTypes.array,
    isVisible: PropTypes.bool,
    getLyricInfo: PropTypes.func
  };

  constructor(props) {
    super(props);

    const matchTime = /\[(\d{1,}):(\d{1,})\.\d{1,}\]/g;
    const splitter = /(?=\s+\[)/;

    this._getLyricList = (lyric) =>
      lyric.split(splitter).map(text => {
        matchTime.lastIndex = 0;
        return {
          useTime: matchTime.exec(text)[0].replace(/\[\]/g, ''),
          part: text.replace(/\[.*?\]/, '').trim()
        };
      })
    this._getLyricTotalTime = (lyric) => {
      const times = lyric.match(this.matchTime);
      const totalTime = times.pop().replace(/[\[\]]/g, '');

      return `${ totalTime }`;
    };
  }

  componentWillReceiveProps(nextProps) {
    const { getLyricInfo, songlrc } = nextProps;

    if (songlrc !== this.props.songlrc) {
      getLyricInfo(songlrc, this._getLyricList, this._getLyricTotalTime);
    }
  }

  render() {
    return (
      <div className={ style['lyric-group'] }>
        <div className={ style['lyric-group-inner'] }>
          <div className={ style['lyric-group-panel'] }>
            { this.props.list.map((lyric, index) =>
              <Lyric key={ index } text={ lyric.part } />
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default connect(
  ({ lyric: { list = [], isVisible } }) => ({ list, isVisible }),
  (dispatch) => bindActionCreators({ getLyricInfo, modifyLaricUseTime }, dispatch)
)(LyricGroup);
