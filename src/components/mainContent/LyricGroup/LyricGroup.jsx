/**
 * 歌词容器组件
*/

import React, { Component, PropTypes } from 'react';
import { findDOMNode } from 'react-dom';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { getLyricInfo } from '../../../actionCreators/lyric';
import Lyric from '../../content/Lyric/Lyric';
import style from './lyric_group.css';

class LyricGroup extends Component {
  static propTypes = {
    songlrc: PropTypes.string
  };

  _calcTime(time) {
    const [ minute, second ] = time.split(':');

    return (+minute) * 60 + (+second);
  }

  _getPlayLyricIndex() {
    const { lyrics, remainTime } = this.props;
    const remainSecond = this._calcTime(remainTime);

    return lyrics.findIndex(lyric => {
      const lyricTime = lyric.remainTime.replace(/[\[\]]/g, '').replace(/\.\d+/, '');
      const lyricSecond = this._calcTime(lyricTime);

      return lyricSecond >= remainSecond;
    });
  }

  constructor(props) {
    super(props);

    const matchTime = /\[(\d{1,}):(\d{1,})\.\d{1,}\]/g;
    const splitter = /(?=\s+\[)/;

    this._getLyricList = (lyric) =>
      lyric.split(splitter).map(text => {
        matchTime.lastIndex = 0;

        return {
          remainTime: matchTime.exec(text)[0].replace(/\[\]/g, ''),
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
        <div
          className={ style['lyric-group'] }
          ref={ el => this.lyricGroupEl = el }>
          <div className={ style['lyric-group-inner'] }>
            <div className={ style['lyric-group-panel'] }>
              { lyrics.map((lyric, index) =>
                  <Lyric
                    ref={ `lyric${ index }` }
                    key={ index }
                    isHighLight={ this._getPlayLyricIndex() === index }
                    text={ lyric.part } />) }
            </div>
          </div>
        </div>
      );
    }

    return null;
  }

  componentDidUpdate() {

    //this.lyricGroupEl.scrollTop = 100;
    // const singleLyricEl = findDOMNode(this.refs['lyric0']);
    //
    // if (singleLyricEl) {
    //   const scrollDistance =
    //     singleLyricEl.offsetHeight + parseInt(singleLyricEl.style.marginBottom);
    //
    //   Object.keys(this.refs).forEach(name => {
    //     const com = this.refs[name];
    //     const el = findDOMNode(com);
    //
    //     if (com.props.isHighLight
    //       && el.offsetTop > this.lyricGroupEl.offsetHeight
    //       && this.shouldScrollBottom) {
    //       this.lyricGroupEl.height = 1000 + 'px';
    //       //this.lyricGroupEl.scrollTop += `${ this.lyricGroupEl.scrollTop + scrollDistance }px`;
    //       //this.lyricGroupEl.scrollTo(0, this.lyricGroupEl.scrollTop + scrollDistance);
    //     }
    //   });
    // }
  }

}

export default connect(
  ({
    lyric: {
      lyrics = [],
      isVisible = true,
      remainTime = '00:00'
    }
  }) => ({
    lyrics,
    isVisible,
    remainTime
  }),
  (dispatch) => bindActionCreators({ getLyricInfo }, dispatch)
)(LyricGroup);
