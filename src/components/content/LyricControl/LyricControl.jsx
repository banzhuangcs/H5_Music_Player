/**
 * 歌词控制组件
*/

import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { toggleLyric } from '../../../actions/lyricActionCreators';
import style from './LyricControl.css';

class LyricControl extends Component {
  static propTypes = {
    width: PropTypes.number,
    height: PropTypes.number
  };

  constructor(props) {
    super(props);

    this.handleToggle = () =>
      this.props.toggleLyric(!this.props.isVisible)
  }

  render() {
    const { width, height } = this.props;

    return (
      <i
        className={ style['lyric-control'] }
        style={{ width, lineHeight: `${ height }px` }}
        onClick={ this.handleToggle }>词</i>
    );
  }
}

export default connect(
  ({ lyric: { isVisible } }) => ({ isVisible }),
  (dispatch) => ({ toggleLyric: bindActionCreators(toggleLyric, dispatch) })
)(LyricControl);
