/**
 * 歌词容器组件
*/

import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { getLyricInfo } from '../../../actionCreators/lyric';
import Lyric from '../../content/Lyric/Lyric';
import style from './lyric_group.css';

class LyricGroup extends Component {
  static propTypes = {
    songlrc: PropTypes.string
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
  }

  componentWillReceiveProps(nextProps) {
    const { getLyricInfo, songlrc } = nextProps;

    if (songlrc !== this.props.songlrc) {
      getLyricInfo(songlrc, this._getLyricList);
    }
  }

  render() {
    const { isVisible, lyrics } = this.props;

    if (isVisible) {
      return (
        <div className={ style['lyric-group'] }>
          <div className={ style['lyric-group-inner'] }>
            <div className={ style['lyric-group-panel'] }>
              { lyrics.map((lyric, index) =>
                <Lyric key={ index } text={ lyric.part } />
              ) }
            </div>
          </div>
        </div>
      );
    }

    return null;
  }
}

export default connect(
  ({
    lyric: {
      lyrics = [],
      isVisible = true } }) => ({ lyrics, isVisible }),
  (dispatch) => bindActionCreators({ getLyricInfo }, dispatch)
)(LyricGroup);
