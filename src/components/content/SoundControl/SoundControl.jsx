/**
 * 音量控制组件
 */

import React, { Component, PropTypes } from 'react';
import Progress from '../../global/Progress';
import style from './SoundControl.css';

export default class SoundControl extends Component {
  static propTypes = {
    width: PropTypes.number.isRequired
  };

  constructor(props) {
    super(props);

    this.state = {
      showProgress: false
    };

    this.handleMouseOver = () =>
      this.setState({ showProgress: true })
    this.handleMouseOut = () =>
      this.setState({ showProgress: false })
  }

  render() {
    const { width, height } = this.props;

    return (
      <div
        className={ style['sound-control'] }
        style={{ width, height, fontSize: width }}
        onMouseOver={ this.handleMouseOver }
        onMouseOut={ this.handleMouseOut }>
        <div
          className={ style['sound-popup'] }
          style={{ opacity: this.state.showProgress ? 1 : 0 }}>
          <div className={ style['sound-popup-inner'] }>
            <Progress
              direction="vertical"
              width={ 3 }
              height={ 100 }
              circleWidth={ 10 }
              circleHeight={ 10 }
              onProgress={ (percent) => {} } />
          </div>
        </div>
      </div>
    );
  }
}
