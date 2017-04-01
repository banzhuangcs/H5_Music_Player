/**
 * 歌词组件
*/

import React, { Component, PropTypes } from 'react';

export default class Lyric extends Component {
  static propTypes = {
    text: PropTypes.string,
    isFadeOut: PropTypes.bool,
    isHighLight: PropTypes.bool
  };

  static defaultProps = {
    isFadeOut: false,
    isHighLight: false
  };

  constructor(props) {
    super(props);

    this.getStyles = (isFadeOut, isHighLight) => ({
      display: '-webkit-box',
      WebkitBoxPack: 'center',
      marginBottom: 16,
      transition: 'opacity .5s linear',
      opacity: isFadeOut ? 0 : 1,
      color: isHighLight ? '#e03a3a' : '#666'
    });
  }

  shouldComponentUpdate(nextProps) {
    return nextProps.text !== this.props.text;
  }

  render() {
    const { text, isFadeOut, isHightLight } = this.props;

    return (
      <div style={ this.getStyles(isFadeOut, isHightLight) }>{ text }</div>
    );
  }
}
