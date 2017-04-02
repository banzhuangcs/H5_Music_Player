/**
 * 歌曲详情组件
*/

import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import LyricGroup from '../LyricGroup/LyricGroup';
import PlayControl from '../../content/PlayControl/PlayControl';
import style from './song_detail.css';

export default class SongDetail extends Component {
  static propTypes = {
    author: PropTypes.string,
    title: PropTypes.string,
    thumbnail: PropTypes.string,
    songlrc: PropTypes.string
  };

  render() {
    const { author, title, thumbnail, songlrc } = this.props;

    return (
      <div className={ style['song-wrapper'] }>
        <div className={ style['song-panel'] }>
          <div className={ style['song-panel-title'] }>
            <h3>{ title }</h3>
            <small>{ author }</small>
          </div>
          <figure className={ style['song-panel-thumbnail'] }>
            <img src={ thumbnail } />
          </figure>
          <div className={ style['song-panel-play'] }>
            <div>
              <PlayControl />
            </div>
          </div>
        </div>
        <div className={ style['song-info'] }>
          <LyricGroup songlrc={ songlrc } />
        </div>
      </div>
    );
  }
}
