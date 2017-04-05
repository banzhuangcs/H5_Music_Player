/**
 * 歌词组件
*/

import React, { Component, PropTypes } from 'react';

export default class Lyric extends Component {
  static propTypes = {
    text: PropTypes.string,
    isHighLight: PropTypes.bool
  };

  static defaultProps = {
    isHighLight: false
  };

  constructor(props) {
    super(props);

    this.getStyles = (isHighLight) => ({
      display: '-webkit-box',
      WebkitBoxPack: 'center',
      marginBottom: 16,
      color: isHighLight ? '#e03a3a' : '#666'
    });
  }

  render() {
    const { text, isHighLight } = this.props;

    return (
      <div style={ this.getStyles(isHighLight) }>{ text }</div>
    );
  }
}
